import HomePage from "@/components/Homepage";
import getProjects from "@/lib/getProjects";

const Page = async () => {
  const projects = await getProjects();
  const professionalProjectsDetails = projects.filter(
    ({ type }) => type === "professional",
  );
  return <HomePage professionalProjectsDetails={professionalProjectsDetails} />;
};
export default Page;
