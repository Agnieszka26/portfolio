import ProjectPage from "@/components/ProjectPage";
import getProjects from "@/lib/getProjects";
import { setRequestLocale } from "next-intl/server";

export const revalidate = 3600;

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
