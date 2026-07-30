import styles from "@/assets/styles/index.module.scss";
import { getPostDetails } from "@/lib/sanity/posts";
import Header from "@/typography/Header/Header";
import Paragraph from "@/typography/Paragraph/Paragraph";
import Tag from "@/typography/Tag/Tag";
import cn from "classnames";
import { PortableText } from "next-sanity";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

export const revalidate = 3600;

const BlogPostPage = async ({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) => {
  const { locale, id } = await params;
  setRequestLocale(locale);

  const post = await getPostDetails(id, locale);

  if (!post) {
    notFound();
  }

  return (
    <div className={cn(styles.page, styles.container)}>
      <article>
        <Header text={post.title} color="dark" as="h1" />
        {post.excerpt ? <Paragraph color="dark" text={post.excerpt} /> : null}
        {post.tags && post.tags.length > 0 ? (
          <div className={styles.tagContainer}>
            {post.tags.map((tag) => (
              <Tag key={tag} text={tag} />
            ))}
          </div>
        ) : null}
        <PortableText value={post.body} />
      </article>
    </div>
  );
};

export default BlogPostPage;
