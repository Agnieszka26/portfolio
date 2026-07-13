import { MetadataRoute } from 'next';
import getProjects from '../../lib/getProjects';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://portfolio-agnieszka26.vercel.app/';

const locales = ['en', 'pl'];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getProjects();

  const staticPages = ['', '/contact', '/projects'];

  const staticUrls = locales.flatMap((locale) =>
    staticPages.map((page) => ({
      url: `${BASE_URL}/${locale}${page}`,
      lastModified: new Date(),
    })),
  );

  const projectUrls = locales.flatMap((locale) =>
    projects.map((project) => ({
      url: `${BASE_URL}/${locale}/projects/${project.header}`,
      lastModified: new Date(),
    })),
  );

  return [...staticUrls, ...projectUrls];
}