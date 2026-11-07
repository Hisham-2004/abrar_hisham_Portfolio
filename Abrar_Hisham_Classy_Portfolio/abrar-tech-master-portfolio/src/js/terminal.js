import { personal } from "../data/personal.js";
import { skillGroups } from "../data/skills.js";
import { projects } from "../data/projects.js";

const output = document.querySelector("#terminal-output");
const form = document.querySelector("#terminal-form");
const input = document.querySelector("#terminal-input");

const commands = {
  help: () => "Available commands: help, about, skills, projects, github, contact, clear",
  about: () => `${personal.name} — ${personal.degree} student at ${personal.university}. Expected graduation: ${personal.graduation}.`,
  skills: () => skillGroups.map(group => `${group.title}: ${group.skills.join(", ")}`).join("\n"),
  projects: () => projects.map(project => `${project.number}. ${project.title} — ${project.status}`).join("\n"),
  github: () => `Public profile: ${personal.githubUrl}`,
  contact: () => `Email: ${personal.email}`,
  clear: () => "__CLEAR__"
};

function printLine(text, className = "") {
  const line = document.createElement("p");
  if (className) line.className = className;
  line.textContent = text;
  output.append(line);
  output.scrollTop = output.scrollHeight;
}

export function initTerminal() {
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const command = input.value.trim().toLowerCase();
  if (!command) return;
  printLine(`abrar@portfolio ~ $ ${command}`, "terminal-command");
  if (command === "clear") output.innerHTML = "";
  else if (commands[command]) {
    const result = commands[command]();
    String(result).split("\n").forEach(line => printLine(line, "terminal-result"));
  } else {
    printLine(`Command not found: ${command}. Type "help" to see available commands.`, "terminal-error");
  }
  input.value = "";
});
}