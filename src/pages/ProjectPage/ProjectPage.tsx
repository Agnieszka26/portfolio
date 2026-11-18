import styles from "@/assets/styles/index.module.scss";
import ProjectsSection from "@/components/ProjectSection/ProjectsSection";
import { Project } from "@/types";
import { getTranslations } from "next-intl/server";
import pageStyles from "./ProjectPage.module.scss";

const ProjectPage = async ({
  projectsDetails,
}: {
  projectsDetails: Project[];
}) => {
  const t = await getTranslations("Navbar");

  return (
    <div className={styles.page}>
      <h1 className={pageStyles.pageTitle}>{t("projects")}</h1>
      <ProjectsSection projectsDetails={projectsDetails} />
    </div>
  );
};

export default ProjectPage;
