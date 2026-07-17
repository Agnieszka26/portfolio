import HomePage from "@/components/Homepage";
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
    title: t("homeTitle"),
    description: t("homeDescription"),
    path: `/${locale}`,
  });
}

const Page = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}) => {
  const { locale } = await params;
  setRequestLocale(locale);
  const projects = await getProjects(locale);
  const professionalProjectsDetails = projects.filter(
    ({ type }) => type === "professional",
  );
  return <HomePage professionalProjectsDetails={professionalProjectsDetails} />;
};
export default Page;
