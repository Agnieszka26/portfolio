import ProjectPage from "@/components/ProjectPage";
import getProjects from "@/lib/getProjects";
import { setRequestLocale } from "next-intl/server";

export const revalidate = 3600;

const Page = async ({ params }: { params: { locale: string } }) => {
  setRequestLocale(params.locale);
  const projects = await getProjects();
  const professionalProjectsDetails = projects.filter(
    ({ type }) => type === "professional",
  );

  return <ProjectPage projectsDetails={professionalProjectsDetails} />;
};
export default Page;
