import styles from "@/assets/styles/index.module.scss";
import { RoutesPath } from "@/constants";
import {
  type Project,
  projectSlug,
  toRemoteCoverImage,
} from "@/types";
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
          { header, paragraph, image, tags: tagString, linkToLive, ...project },
          index,
        ) => {
          const tags = (tagString ?? "")
            .split(",")
            .map((item) => item.trim().replace(/^"|"$/g, ""))
            .filter(Boolean);

          const headingKey = index === 0 ? "latest work" : "highlighted";
          const slug = projectSlug({ id: project.id, header });

          return (
            <ProjectComponent
              key={project._id}
              heading={t(headingKey)}
              header={header}
              paragraph={paragraph ?? ""}
              image={toRemoteCoverImage(image)}
              tags={tags}
              linkToGithub={RoutesPath.PROJECTS + "/" + slug}
              linkToLive={linkToLive ?? ""}
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
