import { personal } from "../data/personal.js";

const $ = (selector) => document.querySelector(selector);
const escapeHtml = (value = "") => String(value).replace(/[&<>"']/g, (char) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
}[char]));

export async function loadGitHub() {
  const repoList = $("#repo-list");
  const status = $("#github-status");
  try {
    const headers = { Accept: "application/vnd.github+json" };
    const [userResponse, repoResponse] = await Promise.all([
      fetch(`https://api.github.com/users/${personal.github}`, { headers }),
      fetch(`https://api.github.com/users/${personal.github}/repos?sort=updated&per_page=4`, { headers })
    ]);
    if (!userResponse.ok || !repoResponse.ok) throw new Error(`GitHub API returned ${userResponse.status}/${repoResponse.status}`);
    const user = await userResponse.json();
    const repos = await repoResponse.json();

    $("#repo-count").textContent = user.public_repos ?? "—";
    $("#follower-count").textContent = user.followers ?? "—";
    repoList.innerHTML = repos.length ? repos.map((repo) => `
      <a class="repo-item" href="${escapeHtml(repo.html_url)}" target="_blank" rel="noreferrer">
        <span><strong>${escapeHtml(repo.name)}</strong><small>${escapeHtml(repo.description || "No description added yet.")}</small></span>
        <span class="repo-meta">${escapeHtml(repo.language || "—")} <b>★ ${repo.stargazers_count}</b> ↗</span>
      </a>`).join("") : '<p class="muted">No public repositories were returned.</p>';
    status.textContent = "Live public data from GitHub. Repository list is sorted by last update.";
  } catch (error) {
    repoList.innerHTML = '<p class="muted">GitHub data is temporarily unavailable. You can still visit the profile directly.</p>';
    status.textContent = "GitHub API unavailable or rate-limited. Try again later.";
    console.warn("GitHub integration:", error);
  }
}