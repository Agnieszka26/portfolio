import JsonLd from "@/components/JsonLd";
import TechnicalDescriptionPage from "@/components/TechnicalDescriptionPage";
import { routing } from "@/i18n/routing";
import { getProjectDetails } from "@/lib/getDetails";
import getProjects from "@/lib/getProjects";
import {
  buildProjectDescription,
  createPageMetadata,
} from "@/lib/metadata";
import {
  buildCreativeWorkSchema,
  buildProjectBreadcrumbSchema,
} from "@/lib/seo/schema";
import { projectSlug, toRemoteCoverImage } from "@/types";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}): Promise<Metadata> {
  const { locale, id } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  const project = await getProjectDetails(id, locale);

  if (!project) {
    notFound();
  }

  const projectName = project.header;
  const coverUrl = project.image?.asset?.url
    ? toRemoteCoverImage(project.image).url
    : undefined;

  return createPageMetadata({
    title: t("projectTitle", { name: projectName }),
    description: buildProjectDescription(
      project,
      t("projectFallbackDescription", { name: projectName }),
      locale,
    ),
    path: `/${locale}/projects/${id}`,
    image: coverUrl,
    twitterImage: coverUrl,
  });
}

export async function generateStaticParams() {
  const params: { locale: string; id: string }[] = [];

  for (const locale of routing.locales) {
    const projects = await getProjects(locale);
    for (const project of projects) {
      params.push({
        locale,
        id: projectSlug(project),
      });
    }
  }

  return params;
}

const page = async ({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) => {
  const { locale, id } = await params;
  setRequestLocale(locale);
  const project = await getProjectDetails(id, locale);

  if (!project) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: "Metadata" });
  const creativeWork = buildCreativeWorkSchema({
    project,
    locale,
    slug: id,
    fallbackDescription: t("projectFallbackDescription", {
      name: project.header,
    }),
  });
  const breadcrumb = buildProjectBreadcrumbSchema({
    locale,
    projectName: project.header,
    projectSlug: id,
  });

  return (
    <>
      <JsonLd data={creativeWork} />
      <JsonLd data={breadcrumb} />
      <TechnicalDescriptionPage
        detail={project}
        tags={project.tags ?? ""}
        linkToLive={project.linkToLive ?? ""}
      />
    </>
  );
};

export default page;
