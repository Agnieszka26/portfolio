export enum RoutesPath {
  HOME = "/",
  PROJECTS = "/projects",
  GET_IN_TOUCH = "/contact",
}

export const navbarElements = [
  {
    link: RoutesPath.PROJECTS,
    text: "projects",
  },

  {
    link: RoutesPath.GET_IN_TOUCH,
    text: "get_in_touch",
  },
];
