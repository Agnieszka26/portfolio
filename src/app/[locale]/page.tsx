import HomePage from "@/components/Homepage";
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
  return <HomePage professionalProjectsDetails={professionalProjectsDetails} />;
};
export default Page;
