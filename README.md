# Abrar Hisham — Developer Portfolio

A responsive personal portfolio built with Vite, vanilla JavaScript and GSAP. The design uses a restrained charcoal palette, muted sage accents, editorial typography, subtle motion and portrait placeholders.

## Run locally

Requirements: Node.js 20.19+ or 22.12+.

```bash
npm install
npm run dev
```

Create a production build:

```bash
npm run build
npm run preview
```

## Personalize before publishing

- `src/data/personal.js` — name, email, GitHub username, degree, expected graduation and role rotation.
- `src/data/skills.js` — technologies and tools. Keep only skills you can confidently discuss.
- `src/data/projects.js` — project descriptions, verified repository URLs and live demos.
- `public/cv/abrar-hisham-cv.pdf` — downloadable CV.
- `public/images/profile.jpg` — add your main portrait here.
- `public/images/about.jpg` — optional second photo for the About section.

The GitHub panel uses the public GitHub API and reads the username from `src/data/personal.js`. It may be rate-limited temporarily; the rest of the portfolio remains usable.

The contact form opens the visitor's email application with a prefilled message. It does not send or store messages itself.

## Before deploying

1. Add verified repository and demo links for each featured project.
2. Add real project screenshots and a current CV.
3. Add your LinkedIn URL in `src/data/personal.js` when ready.
4. Confirm all descriptions, skills and availability statements are accurate.

Do not commit secrets, private keys, `.env` files or `node_modules`.


## Profile content

- Personal details and social links: `src/data/personal.js`
- Verified project summaries and repository links: `src/data/projects.js`
- Skills: `src/data/skills.js`
- Downloadable CV: `public/cv/abrar-hisham-cv.pdf`

The project descriptions are based on the linked public repositories. The Course Management System is described as a console application because the reviewed source uses a command-line menu.
