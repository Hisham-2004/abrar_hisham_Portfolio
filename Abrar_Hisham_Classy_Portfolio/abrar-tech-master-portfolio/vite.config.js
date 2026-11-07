import { defineConfig } from "vite";

const repository = process.env.GITHUB_REPOSITORY?.split("/")[1];
const isUserSite = repository?.endsWith(".github.io");

export default defineConfig({
  // GitHub Actions sets the correct base path for project pages.
  // Locally, the site runs from "/".
  base: process.env.GITHUB_ACTIONS && repository && !isUserSite
    ? `/${repository}/`
    : "/",
  server: { host: true }
});
