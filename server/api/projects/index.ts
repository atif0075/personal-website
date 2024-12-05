import projects from "~/constants/projects.json";

export default defineEventHandler(async (event) => {
  return projects;
});
