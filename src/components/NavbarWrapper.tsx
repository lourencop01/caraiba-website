import Navbar from './Navbar';
import { getCollections, getProductTypes, ShopifyCollection, ProductTypeOption } from '@/lib/shopify-api';

export interface NavShopData {
  collections: ShopifyCollection[];
  productTypes: ProductTypeOption[];
}

interface NavbarWrapperProps {
  locale: string;
}

export default async function NavbarWrapper({ locale }: NavbarWrapperProps) {
  let shopData: NavShopData = { collections: [], productTypes: [] };
  try {
    const [collections, productTypes] = await Promise.all([
      getCollections(20, locale),
      getProductTypes(20, locale),
    ]);
    shopData = { collections, productTypes };
  } catch {
    // Fail silently — Navbar renders without dropdown data
  }

  return <Navbar shopData={shopData} />;
}
