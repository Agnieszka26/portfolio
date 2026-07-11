import TechnicalDescriptionPage from "@/components/TechnicalDescriptionPage";
import { routing } from "@/i18n/routing";
import { getDetailById } from "@/lib/getDtails";
import getProjects, { getProjectById } from "@/lib/getProjects";
import { createPageMetadata, truncateDescription } from "@/lib/metadata";
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
  const [detail, project] = await Promise.all([
    getDetailById(locale, id),
    getProjectById(id),
  ]);

  const projectName = detail?.header ?? project?.header ?? id;
  const rawDescription =
    detail?.overview ??
    (locale === "pl" ? project?.paragraph_pl : project?.paragraph) ??
    t("projectFallbackDescription", { name: projectName });

  return createPageMetadata({
    title: t("projectTitle", { name: projectName }),
    description: truncateDescription(rawDescription),
    path: `/${locale}/projects/${id}`,
    image: project?.image.url,
    twitterImage: project?.image.url,
  });
}

export async function generateStaticParams() {
  const projects = await getProjects();

  return projects.flatMap((project) =>
    routing.locales.map((locale) => ({
      locale,
      id: project.header,
    })),
  );
}

const page = async ({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) => {
  const { locale, id } = await params;
  setRequestLocale(locale);
  const [detail, project] = await Promise.all([
    getDetailById(locale, id),
    getProjectById(id),
  ]);

  const tags = project?.tags ?? "";
  const linkToLive = project?.linkToLive ?? "";

  return (
    <TechnicalDescriptionPage
      detail={detail ?? undefined}
      tags={tags}
      linkToLive={linkToLive}
    />
  );
};

export default page;
