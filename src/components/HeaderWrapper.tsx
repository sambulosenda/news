import { fetchGraphQL } from '@/lib/fetch-graphql';
import { GET_MENU_CATEGORIES } from '@/lib/queries/categories';
import Header from './Header';
import { WPCategory } from '@/types/wordpress';

export default async function HeaderWrapper() {
  // Fetch categories from WordPress
  const categoriesData = await fetchGraphQL(GET_MENU_CATEGORIES);
  const categories = (categoriesData?.categories?.nodes || []) as WPCategory[];
  
  return <Header categories={categories} />;
}