// ─── Types ────────────────────────────────────────────────────────────────────

export interface ShopifyImage {
  url: string;
  altText: string | null;
}

export interface ShopifyMoneyV2 {
  amount: string;
  currencyCode: string;
}

export interface ShopifyProductVariant {
  id: string;
  title: string;
  price: ShopifyMoneyV2;
  compareAtPrice: ShopifyMoneyV2 | null;
  availableForSale: boolean;
  quantityAvailable: number;
  selectedOptions: { name: string; value: string }[];
  image: ShopifyImage | null;
}

export interface ShopifyProductOption {
  id: string;
  name: string;
  values: string[];
}

export interface ShopifyProduct {
  id: string;
  title: string;
  handle: string;
  description: string;
  descriptionHtml?: string;
  productType?: string;
  availableForSale?: boolean;
  featuredImage: ShopifyImage | null;
  images: { edges: { node: ShopifyImage }[] };
  priceRange: {
    minVariantPrice: ShopifyMoneyV2;
    maxVariantPrice: ShopifyMoneyV2;
  };
  variants: { edges: { node: ShopifyProductVariant }[] };
  options?: ShopifyProductOption[];
}

// ─── Filter / sort types ──────────────────────────────────────────────────────

export interface ShopifyFilterValue {
  id: string;
  label: string;
  count: number;
  /** JSON-encoded ProductFilter input — use directly as Shopify filter variable */
  input: string;
}

export interface ShopifyFilter {
  id: string;
  label: string;
  type: 'LIST' | 'PRICE_RANGE' | 'BOOLEAN';
  values: ShopifyFilterValue[];
}

export interface ShopifyPageInfo {
  hasNextPage: boolean;
  endCursor: string | null;
}

export interface ShopifyProductsPage {
  products: ShopifyProduct[];
  filters: ShopifyFilter[];
  pageInfo: ShopifyPageInfo;
}

export type SortOption = 'featured' | 'best-selling' | 'price-asc' | 'price-desc' | 'newest';

export const SORT_OPTIONS: Record<SortOption, { sortKey: string; reverse: boolean }> = {
  featured:      { sortKey: 'RELEVANCE',   reverse: false },
  'best-selling':{ sortKey: 'BEST_SELLING',reverse: false },
  'price-asc':   { sortKey: 'PRICE',       reverse: false },
  'price-desc':  { sortKey: 'PRICE',       reverse: true  },
  newest:        { sortKey: 'CREATED_AT',  reverse: true  },
};

// ProductCollectionSortKeys differs from ProductSortKeys — CREATED_AT → CREATED, featured → COLLECTION_DEFAULT
const COLLECTION_SORT_OPTIONS: Record<SortOption, { sortKey: string; reverse: boolean }> = {
  featured:      { sortKey: 'COLLECTION_DEFAULT', reverse: false },
  'best-selling':{ sortKey: 'BEST_SELLING',        reverse: false },
  'price-asc':   { sortKey: 'PRICE',               reverse: false },
  'price-desc':  { sortKey: 'PRICE',               reverse: true  },
  newest:        { sortKey: 'CREATED',             reverse: true  },
};

/** Convert URL-param values into a Shopify ProductFilter array */
export function buildShopifyFilters(params: {
  filterJsons?: string[];
  minPrice?: string | null;
  maxPrice?: string | null;
  inStock?: boolean;
  onSale?: boolean;
}): Record<string, unknown>[] {
  const filters: Record<string, unknown>[] = [];
  for (const json of params.filterJsons ?? []) {
    try { filters.push(JSON.parse(json)); } catch { /* skip malformed */ }
  }
  if (params.minPrice || params.maxPrice) {
    const price: Record<string, number> = {};
    if (params.minPrice) price.min = parseFloat(params.minPrice);
    if (params.maxPrice) price.max = parseFloat(params.maxPrice);
    filters.push({ price });
  }
  if (params.inStock) filters.push({ available: true });
  if (params.onSale) filters.push({ onSale: true });
  return filters;
}

export interface ShopifyCartLine {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    title: string;
    price: ShopifyMoneyV2;
    product: {
      title: string;
      handle: string;
      featuredImage: ShopifyImage | null;
    };
    selectedOptions: { name: string; value: string }[];
  };
  cost: {
    totalAmount: ShopifyMoneyV2;
  };
}

export interface ShopifyCart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  lines: { edges: { node: ShopifyCartLine }[] };
  cost: {
    subtotalAmount: ShopifyMoneyV2;
    totalAmount: ShopifyMoneyV2;
    totalTaxAmount: ShopifyMoneyV2 | null;
  };
}

// ─── Shared fetch helper (works server + client) ───────────────────────────────

const CART_FIELDS = `
  id
  checkoutUrl
  totalQuantity
  lines(first: 100) {
    edges {
      node {
        id
        quantity
        merchandise {
          ... on ProductVariant {
            id
            title
            price { amount currencyCode }
            product {
              title
              handle
              featuredImage { url altText }
            }
            selectedOptions { name value }
          }
        }
        cost { totalAmount { amount currencyCode } }
      }
    }
  }
  cost {
    subtotalAmount { amount currencyCode }
    totalAmount { amount currencyCode }
    totalTaxAmount { amount currencyCode }
  }
`;

// ─── Locale / language helpers ────────────────────────────────────────────────

const LOCALE_LANGUAGE_MAP: Record<string, string> = {
  en: 'EN',
  pt: 'PT',
};

/** Convert a next-intl locale string (e.g. "pt") to a Shopify LanguageCode (e.g. "PT"). */
export function localeToLanguageCode(locale: string): string {
  return LOCALE_LANGUAGE_MAP[locale.toLowerCase()] ?? 'EN';
}

/**
 * Inject an `@inContext(language: XX)` directive onto the operation definition
 * so Shopify returns translated content for the active locale.
 *
 * The directive must be placed between the variable definitions and the opening
 * `{` of the selection set, e.g.:
 *   query GetProducts($first: Int!) @inContext(language: PT) { ... }
 */
function withLanguageContext(query: string, language: string): string {
  // Find "query|mutation Name" in the query string
  const opMatch = /\b(?:query|mutation)\s+\w+/.exec(query);
  if (!opMatch) return query;

  let i = opMatch.index + opMatch[0].length;

  // Skip whitespace
  while (i < query.length && /\s/.test(query[i])) i++;

  // Skip balanced variable definitions: ( ... )
  if (query[i] === '(') {
    let depth = 0;
    while (i < query.length) {
      if (query[i] === '(') depth++;
      else if (query[i] === ')') { depth--; if (depth === 0) { i++; break; } }
      i++;
    }
  }

  // Skip whitespace before the opening `{`
  while (i < query.length && /\s/.test(query[i])) i++;

  return `${query.slice(0, i)}@inContext(language: ${language}) ${query.slice(i)}`;
}

async function storefrontFetch<T>(
  query: string,
  variables?: Record<string, unknown>,
  language?: string
): Promise<T> {
  const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!;
  const token = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN!;
  const url = `https://${domain}/api/2025-01/graphql.json`;

  const finalQuery = language ? withLanguageContext(query, language) : query;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': token,
    },
    body: JSON.stringify({ query: finalQuery, variables }),
    next: { revalidate: 60 }, // cache for 60 s on the server
  });

  if (!response.ok) {
    throw new Error(`Shopify API error: ${response.status}`);
  }

  const json = await response.json();
  if (json.errors) {
    throw new Error(json.errors.map((e: { message: string }) => e.message).join(', '));
  }

  return json.data as T;
}

// ─── Products ─────────────────────────────────────────────────────────────────

export async function getFeaturedProducts(first = 8, locale?: string): Promise<ShopifyProduct[]> {
  const language = locale ? localeToLanguageCode(locale) : undefined;
  const query = `
    query GetFeaturedProducts($first: Int!, $query: String!) {
      products(first: $first, query: $query) {
        edges {
          node {
            id title handle description
            featuredImage { url altText }
            images(first: 1) { edges { node { url altText } } }
            priceRange {
              minVariantPrice { amount currencyCode }
              maxVariantPrice { amount currencyCode }
            }
            variants(first: 1) {
              edges {
                node {
                  id
                  availableForSale
                  price { amount currencyCode }
                  compareAtPrice { amount currencyCode }
                  selectedOptions { name value }
                  image { url altText }
                }
              }
            }
            options { id name values }
          }
        }
      }
    }
  `;
  const data = await storefrontFetch<{ products: { edges: { node: ShopifyProduct }[] } }>(
    query,
    { first, query: 'tag:Destaque' },
    language
  );
  return data.products.edges.map((e) => e.node);
}

export async function getProducts(first = 24, locale?: string): Promise<ShopifyProduct[]> {
  const language = locale ? localeToLanguageCode(locale) : undefined;
  const query = `
    query GetProducts($first: Int!) {
      products(first: $first) {
        edges {
          node {
            id title handle description
            featuredImage { url altText }
            images(first: 1) { edges { node { url altText } } }
            priceRange {
              minVariantPrice { amount currencyCode }
              maxVariantPrice { amount currencyCode }
            }
            variants(first: 1) {
              edges {
                node {
                  id
                  availableForSale
                  price { amount currencyCode }
                  compareAtPrice { amount currencyCode }
                  selectedOptions { name value }
                  image { url altText }
                }
              }
            }
            options { id name values }
          }
        }
      }
    }
  `;
  const data = await storefrontFetch<{ products: { edges: { node: ShopifyProduct }[] } }>(
    query,
    { first },
    language
  );
  return data.products.edges.map((e) => e.node);
}

export async function getProductByHandle(handle: string, locale?: string): Promise<ShopifyProduct | null> {
  const language = locale ? localeToLanguageCode(locale) : undefined;
  const query = `
    query GetProduct($handle: String!) {
      product(handle: $handle) {
        id title handle description descriptionHtml
        featuredImage { url altText }
        images(first: 10) { edges { node { url altText } } }
        priceRange {
          minVariantPrice { amount currencyCode }
          maxVariantPrice { amount currencyCode }
        }
        options { id name values }
        variants(first: 100) {
          edges {
            node {
              id title availableForSale quantityAvailable
              price { amount currencyCode }
              compareAtPrice { amount currencyCode }
              selectedOptions { name value }
              image { url altText }
            }
          }
        }
      }
    }
  `;
  const data = await storefrontFetch<{ product: ShopifyProduct | null }>(query, { handle }, language);
  return data.product;
}

// ─── Cart mutations ────────────────────────────────────────────────────────────

export async function cartCreate(): Promise<ShopifyCart> {
  const query = `
    mutation CartCreate {
      cartCreate {
        cart { ${CART_FIELDS} }
        userErrors { field message }
      }
    }
  `;
  const data = await storefrontFetch<{ cartCreate: { cart: ShopifyCart } }>(query);
  return data.cartCreate.cart;
}

export async function cartLinesAdd(
  cartId: string,
  lines: { merchandiseId: string; quantity: number }[]
): Promise<ShopifyCart> {
  const query = `
    mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart { ${CART_FIELDS} }
        userErrors { field message }
      }
    }
  `;
  const data = await storefrontFetch<{ cartLinesAdd: { cart: ShopifyCart } }>(query, {
    cartId,
    lines,
  });
  return data.cartLinesAdd.cart;
}

export async function cartLinesUpdate(
  cartId: string,
  lines: { id: string; quantity: number }[]
): Promise<ShopifyCart> {
  const query = `
    mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart { ${CART_FIELDS} }
        userErrors { field message }
      }
    }
  `;
  const data = await storefrontFetch<{ cartLinesUpdate: { cart: ShopifyCart } }>(query, {
    cartId,
    lines,
  });
  return data.cartLinesUpdate.cart;
}

export async function cartLinesRemove(
  cartId: string,
  lineIds: string[]
): Promise<ShopifyCart> {
  const query = `
    mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart { ${CART_FIELDS} }
        userErrors { field message }
      }
    }
  `;
  const data = await storefrontFetch<{ cartLinesRemove: { cart: ShopifyCart } }>(query, {
    cartId,
    lineIds,
  });
  return data.cartLinesRemove.cart;
}

export async function getCart(cartId: string): Promise<ShopifyCart | null> {
  const query = `
    query GetCart($cartId: ID!) {
      cart(id: $cartId) { ${CART_FIELDS} }
    }
  `;
  const data = await storefrontFetch<{ cart: ShopifyCart | null }>(query, { cartId });
  return data.cart;
}

// ─── Collections ──────────────────────────────────────────────────────────────

export interface ShopifyCollection {
  id: string;
  title: string;
  handle: string;
  description: string;
  image: ShopifyImage | null;
}

export async function getCollections(first = 24, locale?: string): Promise<ShopifyCollection[]> {
  const language = locale ? localeToLanguageCode(locale) : undefined;
  const query = `
    query GetCollections($first: Int!) {
      collections(first: $first) {
        edges {
          node {
            id title handle description
            image { url altText }
          }
        }
      }
    }
  `;
  const data = await storefrontFetch<{
    collections: { edges: { node: ShopifyCollection }[] };
  }>(query, { first }, language);
  return data.collections.edges.map((e) => e.node);
}

export async function getCollectionByHandle(
  handle: string,
  productsFirst = 24,
  locale?: string
): Promise<{ collection: ShopifyCollection; products: ShopifyProduct[] } | null> {
  const language = locale ? localeToLanguageCode(locale) : undefined;
  const query = `
    query GetCollection($handle: String!, $productsFirst: Int!) {
      collection(handle: $handle) {
        id title handle description
        image { url altText }
        products(first: $productsFirst) {
          edges {
            node {
              id title handle description
              featuredImage { url altText }
              priceRange {
                minVariantPrice { amount currencyCode }
                maxVariantPrice { amount currencyCode }
              }
              variants(first: 1) {
                edges { node { id availableForSale } }
              }
            }
          }
        }
      }
    }
  `;
  const data = await storefrontFetch<{
    collection: (ShopifyCollection & { products: { edges: { node: ShopifyProduct }[] } }) | null;
  }>(query, { handle, productsFirst }, language);

  if (!data.collection) return null;
  const { products, ...collection } = data.collection;
  return {
    collection,
    products: products.edges.map((e) => e.node),
  };
}

// ─── Filtered product listing (Shop All PLP) ─────────────────────────────────

/**
 * Convert URL filter params into a Shopify query string.
 * Shopify's products query accepts a `query` argument using its search syntax.
 * Supported: availability, product type, vendor, tag, price range.
 */
export function buildProductQueryString(params: {
  filterJsons?: string[];
  minPrice?: string | null;
  maxPrice?: string | null;
  inStock?: boolean;
}): string {
  const parts: string[] = [];

  if (params.inStock) parts.push('available_for_sale:true');

  if (params.minPrice && params.maxPrice) {
    parts.push(`variants.price:>=${params.minPrice} variants.price:<=${params.maxPrice}`);
  } else if (params.minPrice) {
    parts.push(`variants.price:>=${params.minPrice}`);
  } else if (params.maxPrice) {
    parts.push(`variants.price:<=${params.maxPrice}`);
  }

  // Parse Shopify ProductFilter JSON values (from filter facet inputs)
  for (const json of params.filterJsons ?? []) {
    try {
      const f = JSON.parse(json) as Record<string, unknown>;
      if (typeof f.productType === 'string') parts.push(`product_type:"${f.productType}"`);
      if (typeof f.productVendor === 'string') parts.push(`vendor:"${f.productVendor}"`);
      if (typeof f.tag === 'string') parts.push(`tag:"${f.tag}"`);
      // variantOption has no direct query-string equivalent — skip
    } catch { /* skip malformed */ }
  }

  return parts.join(' ');
}

const PRODUCT_FIELDS = `
  id title handle description productType availableForSale
  featuredImage { url altText }
  images(first: 2) { edges { node { url altText } } }
  priceRange {
    minVariantPrice { amount currencyCode }
    maxVariantPrice { amount currencyCode }
  }
  variants(first: 1) {
    edges {
      node {
        id availableForSale
        price { amount currencyCode }
        compareAtPrice { amount currencyCode }
        selectedOptions { name value }
      }
    }
  }
  options { id name values }
`;

/**
 * Build a ProductFilter array for collection.products.
 * available, price, and onSale work natively. productType is handled
 * client-side in the hybrid path.
 */
function buildCollectionFilters(params: {
  inStock?: boolean;
  onSale?: boolean;
  minPrice?: string | null;
  maxPrice?: string | null;
}): Record<string, unknown>[] {
  const filters: Record<string, unknown>[] = [];
  if (params.inStock) filters.push({ available: true });
  if (params.onSale) filters.push({ onSale: true });
  if (params.minPrice || params.maxPrice) {
    const price: Record<string, number> = {};
    if (params.minPrice) price.min = parseFloat(params.minPrice);
    if (params.maxPrice) price.max = parseFloat(params.maxPrice);
    filters.push({ price });
  }
  return filters;
}

export async function getFilteredProducts(params: {
  first?: number;
  after?: string | null;
  sort?: SortOption;
  queryString?: string;
  filterJsons?: string[];
  collectionHandle?: string | null;
  inStock?: boolean;
  onSale?: boolean;
  minPrice?: string | null;
  maxPrice?: string | null;
  locale?: string;
}): Promise<ShopifyProductsPage> {
  const {
    first = 24,
    after,
    sort = 'featured',
    queryString,
    filterJsons,
    collectionHandle,
    inStock,
    onSale,
    minPrice,
    maxPrice,
    locale,
  } = params;
  const language = locale ? localeToLanguageCode(locale) : undefined;

  // Extract canonical productType values from filterJsons (always source-language).
  const requiredProductTypes = new Set(
    (filterJsons ?? []).flatMap((json) => {
      try {
        const f = JSON.parse(json) as Record<string, unknown>;
        return typeof f.productType === 'string' ? [f.productType] : [];
      } catch { return []; }
    })
  );
  const hasProductTypeFilter = requiredProductTypes.size > 0;

  // When a collection is selected AND productType filters are active, we cannot
  // use Shopify's native productType filter on collection.products (requires the
  // Search & Discovery app). Instead we fetch up to 250 products from the
  // collection, then filter client-side by canonical productType. To keep
  // translations intact, source (canonical) and localized fetches run in parallel.
  if (collectionHandle && hasProductTypeFilter) {
    const { sortKey, reverse } = COLLECTION_SORT_OPTIONS[sort];
    // Apply availability, onSale and price natively; productType is handled client-side
    const nativeFilters = buildCollectionFilters({ inStock, onSale, minPrice, maxPrice });
    const hasNativeFilters = nativeFilters.length > 0;

    const hybridGql = `
      query GetCollectionHybridFilter(
        $handle: String!
        $sortKey: ProductCollectionSortKeys
        $reverse: Boolean
        ${hasNativeFilters ? '$filters: [ProductFilter!]' : ''}
      ) {
        collection(handle: $handle) {
          products(
            first: 250
            sortKey: $sortKey
            reverse: $reverse
            ${hasNativeFilters ? 'filters: $filters' : ''}
          ) {
            edges { node { ${PRODUCT_FIELDS} } }
          }
        }
      }
    `;
    const hybridVars: Record<string, unknown> = {
      handle: collectionHandle,
      sortKey,
      reverse,
    };
    if (hasNativeFilters) hybridVars.filters = nativeFilters;

    type HybridData = {
      collection: { products: { edges: { node: ShopifyProduct }[] } } | null;
    };

    // Fetch source (for canonical productType comparison) and localized in parallel
    const [sourceData, localData] = await Promise.all([
      storefrontFetch<HybridData>(hybridGql, hybridVars),
      language ? storefrontFetch<HybridData>(hybridGql, hybridVars, language) : Promise.resolve(null),
    ]);

    const sourceEdges = sourceData.collection?.products.edges ?? [];
    const localEdges = localData?.collection?.products.edges ?? sourceEdges;

    // Identify matching handles using source-language productType
    const matchingHandles = new Set(
      sourceEdges
        .filter((e) => requiredProductTypes.has(e.node.productType ?? ''))
        .map((e) => e.node.handle)
    );

    // Return localized products that matched
    const filtered = localEdges.filter((e) => matchingHandles.has(e.node.handle));

    return {
      products: filtered.map((e) => e.node),
      filters: [],
      pageInfo: { hasNextPage: false, endCursor: null },
    };
  }

  // When a collection is selected with no productType filter, use native
  // collection.products with filters (available, onSale + price work without S&D app).
  if (collectionHandle) {
    const { sortKey, reverse } = COLLECTION_SORT_OPTIONS[sort];
    const collectionFilters = buildCollectionFilters({ inStock, onSale, minPrice, maxPrice });
    const hasFilters = collectionFilters.length > 0;

    const gql = `
      query GetCollectionFilteredProducts(
        $handle: String!
        $first: Int!
        $after: String
        $sortKey: ProductCollectionSortKeys
        $reverse: Boolean
        ${hasFilters ? '$filters: [ProductFilter!]' : ''}
      ) {
        collection(handle: $handle) {
          products(
            first: $first
            after: $after
            sortKey: $sortKey
            reverse: $reverse
            ${hasFilters ? 'filters: $filters' : ''}
          ) {
            pageInfo { hasNextPage endCursor }
            edges { node { ${PRODUCT_FIELDS} } }
          }
        }
      }
    `;

    const variables: Record<string, unknown> = {
      handle: collectionHandle,
      first,
      after: after ?? null,
      sortKey,
      reverse,
    };
    if (hasFilters) variables.filters = collectionFilters;

    const data = await storefrontFetch<{
      collection: {
        products: { pageInfo: ShopifyPageInfo; edges: { node: ShopifyProduct }[] };
      } | null;
    }>(gql, variables, language);

    const conn = data.collection?.products;
    return {
      products: conn?.edges.map((e) => e.node) ?? [],
      filters: [],
      pageInfo: conn?.pageInfo ?? { hasNextPage: false, endCursor: null },
    };
  }

  // Default: query all products
  const { sortKey, reverse } = SORT_OPTIONS[sort];
  const gql = `
    query GetFilteredProducts(
      $first: Int!
      $after: String
      $sortKey: ProductSortKeys
      $reverse: Boolean
      $query: String
    ) {
      products(
        first: $first
        after: $after
        sortKey: $sortKey
        reverse: $reverse
        query: $query
      ) {
        pageInfo { hasNextPage endCursor }
        edges { node { ${PRODUCT_FIELDS} } }
      }
    }
  `;

  const data = await storefrontFetch<{
    products: { pageInfo: ShopifyPageInfo; edges: { node: ShopifyProduct }[] };
  }>(gql, { first, after: after ?? null, sortKey, reverse, query: queryString || null }, language);

  let products = data.products.edges.map((e) => e.node);

  // Client-side sale filter: keep products where the first variant has a
  // compareAtPrice that is strictly greater than its sale price.
  if (onSale) {
    products = products.filter((p) => {
      const variant = p.variants.edges[0]?.node;
      if (!variant?.compareAtPrice) return false;
      return parseFloat(variant.compareAtPrice.amount) > parseFloat(variant.price.amount);
    });
  }

  return {
    products,
    filters: [],
    pageInfo: data.products.pageInfo,
  };
}

export interface ProductTypeOption {
  /** Source-language value — used in filter JSON and Shopify query strings. */
  canonical: string;
  /** Translated label for display in the current locale. */
  label: string;
}

const PRODUCT_TYPE_QUERY = `
  query GetProductTypesFromProducts($first: Int!) {
    products(first: $first) {
      edges { node { productType } }
    }
  }
`;

/**
 * Fetch unique product types with both the canonical (source-language) value
 * and the translated display label.
 *
 * The root `productTypes` query is NOT affected by @inContext — it always
 * returns source-language strings.  The `Product.productType` field IS
 * translatable and respects @inContext, so we fetch products in both the
 * source language (for the canonical filter value) and the current locale
 * (for the display label) in parallel, then zip them together.
 */
export async function getProductTypes(first = 250, locale?: string): Promise<ProductTypeOption[]> {
  const language = locale ? localeToLanguageCode(locale) : undefined;

  type ProductTypeData = { products: { edges: { node: { productType: string } }[] } };

  // Fetch source-language types always; translated types only when locale differs
  const [sourceData, localizedData] = await Promise.all([
    storefrontFetch<ProductTypeData>(PRODUCT_TYPE_QUERY, { first }),
    language
      ? storefrontFetch<ProductTypeData>(PRODUCT_TYPE_QUERY, { first }, language)
      : Promise.resolve(null),
  ]);

  // Build canonical list (deduplicated, ordered by first appearance)
  const canonicalList: string[] = [];
  const canonicalSet = new Set<string>();
  for (const { node } of sourceData.products.edges) {
    if (node.productType && !canonicalSet.has(node.productType)) {
      canonicalSet.add(node.productType);
      canonicalList.push(node.productType);
    }
  }

  if (!localizedData) {
    return canonicalList.map((c) => ({ canonical: c, label: c }));
  }

  // Zip source edges with localized edges to build canonical → translated map
  const sourceEdges = sourceData.products.edges;
  const localEdges = localizedData.products.edges;
  const translationMap = new Map<string, string>();
  for (let i = 0; i < Math.min(sourceEdges.length, localEdges.length); i++) {
    const canonical = sourceEdges[i].node.productType;
    const label = localEdges[i].node.productType;
    if (canonical && label && !translationMap.has(canonical)) {
      translationMap.set(canonical, label);
    }
  }

  return canonicalList.map((canonical) => ({
    canonical,
    label: translationMap.get(canonical) ?? canonical,
  }));
}

// ─── Sale check ───────────────────────────────────────────────────────────────

/**
 * Returns true if at least one product in the store has a variant whose
 * compareAtPrice is strictly greater than its current price (i.e. is on sale).
 * Fetches a reasonable sample; cached for 5 minutes server-side.
 */
export async function hasSaleProducts(): Promise<boolean> {
  const gql = `
    query CheckSaleProducts {
      products(first: 50) {
        edges {
          node {
            variants(first: 1) {
              edges {
                node {
                  price { amount }
                  compareAtPrice { amount }
                }
              }
            }
          }
        }
      }
    }
  `;

  type Data = {
    products: {
      edges: {
        node: {
          variants: {
            edges: { node: { price: ShopifyMoneyV2; compareAtPrice: ShopifyMoneyV2 | null } }[];
          };
        };
      }[];
    };
  };

  try {
    const data = await storefrontFetch<Data>(gql, undefined);
    return data.products.edges.some(({ node }) => {
      const variant = node.variants.edges[0]?.node;
      return (
        variant?.compareAtPrice != null &&
        parseFloat(variant.compareAtPrice.amount) > parseFloat(variant.price.amount)
      );
    });
  } catch {
    return false;
  }
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function formatMoney(money: ShopifyMoneyV2): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: money.currencyCode,
  }).format(parseFloat(money.amount));
}
