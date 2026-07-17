import TechnicalDescriptionPage from "@/components/TechnicalDescriptionPage";
import { routing } from "@/i18n/routing";
import { getProjectDetails } from "@/lib/getDetails";
import getProjects from "@/lib/getProjects";
import {
  buildProjectDescription,
  createPageMetadata,
} from "@/lib/metadata";
import { projectSlug, toRemoteCoverImage } from "@/types";
import { getTranslations, setRequestLocale } from "next-intl/server";
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

  const projectName = project?.header ?? id;
  const coverUrl = project?.image?.asset?.url
    ? toRemoteCoverImage(project.image).url
    : undefined;
  const description = project
    ? buildProjectDescription(
        project,
        t("projectFallbackDescription", { name: projectName }),
        locale,
      )
    : t("projectFallbackDescription", { name: projectName });

  return createPageMetadata({
    title: t("projectTitle", { name: projectName }),
    description,
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

  const tags = project?.tags ?? "";
  const linkToLive = project?.linkToLive ?? "";

  return (
    <TechnicalDescriptionPage
      detail={project}
      tags={tags}
      linkToLive={linkToLive}
    />
  );
};

export default page;
