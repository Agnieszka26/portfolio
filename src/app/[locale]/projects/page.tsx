import ProjectPage from "@/components/ProjectPage";
import getProjects from "@/lib/getProjects";
import { createPageMetadata } from "@/lib/metadata";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return createPageMetadata({
    title: t("projectsTitle"),
    description: t("projectsDescription"),
    path: `/${locale}/projects`,
  });
}

const Page = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}) => {
  const { locale } = await params;
  setRequestLocale(locale);  const projects = await getProjects();
  const professionalProjectsDetails = projects.filter(
    ({ type }) => type === "professional",
  );

  return <ProjectPage projectsDetails={professionalProjectsDetails} />;
};
export default Page;
