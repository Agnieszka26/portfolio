import TechnicalDescriptionPage from "@/components/TechnicalDescriptionPage";
import { routing } from "@/i18n/routing";
import { getDetailById } from "@/lib/getDtails";
import getProjects, { getProjectById } from "@/lib/getProjects";
import { setRequestLocale } from "next-intl/server";

export const revalidate = 3600;

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
