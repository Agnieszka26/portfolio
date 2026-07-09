import styles from "@/assets/styles/index.module.scss";
import { RoutesPath } from "@/constants";
import { Project } from "@/types";
import { getLocale, getTranslations } from "next-intl/server";
import ProjectComponent from "../Project/Project";

interface ProjectsSectionProps {
  projectsDetails: Project[];
  sectionId?: string;
}

const ProjectsSection = async ({
  projectsDetails,
  sectionId,
}: ProjectsSectionProps) => {
  const locale = await getLocale();
  const t = await getTranslations("Section");

  return (
    <section className={styles.container} id={sectionId}>
      {projectsDetails.map(
        (
          { header, paragraph, image, tags: tagString, linkToGithub, linkToLive, paragraph_pl },
          index,
        ) => {
          const tags = tagString
            .split(",")
            .map((item) => item.trim().replace(/^"|"$/g, ""));

          const headingKey = index === 0 ? "latest work" : "highlighted";

          return (
            <ProjectComponent
              key={header}
              heading={t(headingKey)}
              header={header}
              paragraph={locale === "en" ? paragraph : paragraph_pl}
              image={image}
              tags={tags}
              linkToGithub={RoutesPath.PROJECTS + "/" + header}
              linkToLive={linkToLive}
              index={index}
              locale={locale}
              learnMoreLabel={t("learn_more")}
              seeProjectLabel={t("see_project")}
            />
          );
        },
      )}
    </section>
  );
};

export default ProjectsSection;
