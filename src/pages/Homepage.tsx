import HeroArea from "@/components/HeroArea/HeroArea";
import ProjectsSection from "@/components/ProjectSection/ProjectsSection";
import ScrollToTopOnUnmount from "@/components/client/ScrollToTopOnUnmount";
import { Project } from "@/types";

const PROJECTS_SECTION_ID = "projects";

const HomePage = ({
  professionalProjectsDetails,
}: {
  professionalProjectsDetails: Project[];
}) => {
  return (
    <ScrollToTopOnUnmount>
      <HeroArea scrollTargetId={PROJECTS_SECTION_ID} />
      <ProjectsSection
        sectionId={PROJECTS_SECTION_ID}
        projectsDetails={professionalProjectsDetails}
      />
    </ScrollToTopOnUnmount>
  );
};

export default HomePage;
