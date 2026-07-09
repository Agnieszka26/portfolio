import TechnicalDescriptionPage from "@/components/TechnicalDescriptionPage";
import { routing } from "@/i18n/routing";
import getDetails from "@/lib/getDtails";
import getProjects from "@/lib/getProjects";
import type { Project } from "@/types";
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
  const [details, projects] = await Promise.all([
    getDetails(locale),
    getProjects(),
  ]);
  const detail = details.find((item) => item.header === id);
  const project = projects.find((item: Project) => item.header === id);

  const tags = project?.tags ?? "";
  const linkToLive = project?.linkToLive ?? "";

  return (
    <TechnicalDescriptionPage
      detail={detail}
      tags={tags}
      linkToLive={linkToLive}
    />
  );
};

export default page;
