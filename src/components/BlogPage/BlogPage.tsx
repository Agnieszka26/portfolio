import { getTranslations } from "next-intl/server";
import type { Post } from "@/types/post";
import HeroBlogPage from "./components/Header";
import BlogPostsSection from "./BlogPostsSection";
import pageStyles from "./BlogPage.module.scss";

type BlogPageProps = {
  posts: Post[];
  locale: string;
};

const BlogPage = async ({ posts, locale }: BlogPageProps) => {
  const t = await getTranslations("BlogPage");

  return (
    <div className={pageStyles.page}>
      <HeroBlogPage
        label={t("label")}
        title={t("title")}
        description={t("description")}
      />

      <BlogPostsSection posts={posts} locale={locale} />
    </div>
  );
};

export default BlogPage;
