import { setRequestLocale } from 'next-intl/server'

const BlogPostPage = async ({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) => {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div>BlogPostPage</div>
  )
}


export default BlogPostPage