import { client } from "@/lib/sanity/client";
import { allProjectsQuery, projectsQuery } from "@/lib/sanity/queries";
import type { Project } from "@/types/project";
import { projectSlug } from "@/types/project";

export async function getProjects(locale?: string): Promise<Project[]> {
  try {
    if (locale) {
      return await client.fetch<Project[]>(projectsQuery, { locale });
    }

    return await client.fetch<Project[]>(allProjectsQuery);
  } catch (error) {
    console.warn(
      "[getProjects] Failed to fetch projects:",
      error instanceof Error ? error.message : error,
    );
    return [];
  }
}

export async function getProjectById(
  id: string,
  locale?: string,
): Promise<Project | null> {
  const projects = await getProjects(locale);
  return (
    projects.find(
      (project) => projectSlug(project) === id || project.header === id,
    ) ?? null
  );
}

export default getProjects;
