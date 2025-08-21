import { fetchGraphQL } from '@/lib/fetch-graphql';
import { GET_MENU_CATEGORIES } from '@/lib/queries/categories';
import Header from './HeaderNYT';
import { WPCategory } from '@/types/wordpress';

export default async function HeaderWrapper() {
  // Fetch categories from WordPress
  const categoriesData = await fetchGraphQL(GET_MENU_CATEGORIES);
  const categories = (categoriesData?.categories?.nodes || []) as WPCategory[];
  
  // You can control breaking news here by fetching from WordPress or setting manually
  const breakingNews = {
    show: false, // Set to true when you have breaking news
    title: "Major story developing",
    link: "/breaking/story-slug"
  };
  
  return <Header categories={categories} breakingNews={breakingNews} />;
}