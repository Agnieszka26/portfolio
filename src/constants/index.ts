export enum RoutesPath {
  HOME = "/",
  MY_WORK = "/work",
  HOBBY_PROJECTS = "/hobby-projects",
  GET_IN_TOUCH = "/contact",
  SOURCE_CODE_NOT_AVAILABLE = "/source-code-not-available",
}

export const navbarElements = [
  {
    link: RoutesPath.MY_WORK,
    text: "my work",
  },
  {
    link: RoutesPath.HOBBY_PROJECTS,
    text: "hobby projects",
  },
  {
    link: RoutesPath.GET_IN_TOUCH,
    text: "get in touch",
  },
];
