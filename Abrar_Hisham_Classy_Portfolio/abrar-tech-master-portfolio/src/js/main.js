import "../css/main.css";
import { personal } from "../data/personal.js";
import { skillGroups } from "../data/skills.js";
import { projects } from "../data/projects.js";
import { loadGitHub } from "./github.js";
import { initCursor } from "./cursor.js";
import { initAnimations } from "./animations.js";
import { initTerminal } from "./terminal.js";

const $ = (selector) => document.querySelector(selector);

function renderSkills() {
  $("#skill-groups").innerHTML = skillGroups.map((group, index) => `
    <article class="skill-group reveal">
      <div class="skill-group-head"><span>0${index + 1}</span><h3>${group.title}</h3></div>
      <p>${group.note}</p>
      <div class="skill-tags">${group.skills.map(skill => `<span>${skill}</span>`).join("")}</div>
    </article>`).join("");
}

function renderProjects() {
  $("#project-grid").innerHTML = projects.map((project) => `
    <article class="project-card reveal">
      <div class="project-visual">
        <span class="project-number">${project.number}</span>
        <div class="project-art"><span>&lt;</span><i> / </i><b>&gt;</b></div>
        <span class="project-status">${project.status}</span>
      </div>
      <div class="project-info">
        <p class="eyebrow">${project.category}</p>
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <div class="project-stack">${project.stack.map(item => `<span>${item}</span>`).join("")}</div>
        <div class="project-links">
          ${project.repo ? `<a href="${project.repo}" target="_blank" rel="noreferrer">SOURCE CODE ↗</a>` : `<span class="muted">PROJECT DETAILS IN PROGRESS</span>`}
          ${project.demo ? `<a href="${project.demo}" target="_blank" rel="noreferrer">LIVE DEMO ↗</a>` : ""}
        </div>
      </div>
    </article>`).join("");
}

function initNavigation() {
  const toggle = $("#menu-toggle");
  const nav = $("#nav-links");
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
  });
  nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  }));
}

function initRoleRotator() {
  const target = $("#typed-role");
  let index = 0;
  setInterval(() => {
    index = (index + 1) % personal.roles.length;
    target.classList.add("role-changing");
    setTimeout(() => {
      target.textContent = personal.roles[index];
      target.classList.remove("role-changing");
    }, 180);
  }, 2400);
}

function initContactForm() {
  $("#contact-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = encodeURIComponent(`Portfolio contact from ${data.get("name")}`);
    const body = encodeURIComponent(
      `Name: ${data.get("name")}\nEmail: ${data.get("email")}\n\n${data.get("message")}`
    );
    window.location.href = `mailto:${personal.email}?subject=${subject}&body=${body}`;
  });
}

renderSkills();
renderProjects();
initNavigation();
initRoleRotator();
initContactForm();
initTerminal();
loadGitHub();
initCursor();
initAnimations();
$("#year").textContent = new Date().getFullYear();