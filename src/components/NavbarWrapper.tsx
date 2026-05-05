import Navbar from './Navbar';
import { getCollections, getProductTypes, hasSaleProducts, ShopifyCollection, ProductTypeOption } from '@/lib/shopify-api';

export interface NavShopData {
  collections: ShopifyCollection[];
  productTypes: ProductTypeOption[];
  hasSaleItems: boolean;
}

interface NavbarWrapperProps {
  locale: string;
}

export default async function NavbarWrapper({ locale }: NavbarWrapperProps) {
  let shopData: NavShopData = { collections: [], productTypes: [], hasSaleItems: false };
  try {
    const [collections, productTypes, hasSaleItems] = await Promise.all([
      getCollections(20, locale),
      getProductTypes(20, locale),
      hasSaleProducts(),
    ]);
    shopData = { collections, productTypes, hasSaleItems };
  } catch {
    // Fail silently — Navbar renders without dropdown data
  }

  return <Navbar shopData={shopData} />;
}
