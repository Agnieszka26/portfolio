import ProjectPage from "@/components/ProjectPage";
import getProjects from "@/lib/getProjects";

const Page = async () => {
  const projects = await getProjects();
  const professionalProjectsDetails = projects.filter(
    ({ type }) => type === "hobby",
  );

  return <ProjectPage projectsDetails={professionalProjectsDetails} />;
};
export default Page;
