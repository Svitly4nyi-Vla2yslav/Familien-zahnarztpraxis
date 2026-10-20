# Local development / Локальний запуск

This repository contains **two layouts** for the same website:

- **Static HTML entrypoints**: `index.html`, `team/index.html`, `praxis/index.html`, `kontakt/index.html`, `leistungen/index.html`, each `leistungen/<service>/index.html`, `jobs/index.html`, `datenschutz/index.html`, and `impressum/index.html`. These work with VS Code Live Server and plain static hosting.
- **SABSUS source files** in `pages/`, `site.json`, and `templates/`. Their `{{assets.base}}` placeholders are rendered by SABSUS, so do **not** open `pages/index.html` directly with a plain browser.

## Запуск у VS Code

1. Clone or open this repository in VS Code.
2. Install/use the **Live Server** extension.
3. In the project root, right-click **index.html** and choose **Open with Live Server**.
4. Open `http://127.0.0.1:5500/` (your configured port may differ).

You **do not need npm, Node.js, React, or a build step** for this project.

To get subsequent updates, run:

```bash
git pull origin main
```

Then refresh the browser with Ctrl+F5.

## Routes

The homepage, services (including Kaltplasmabehandlung), team, practice, contacts, jobs, privacy and legal routes have physical static entrypoints. The original `/?page=...` fallback remains available for SABSUS navigation.

## Important

The images are generated illustrations and not photographs of clinic staff. The appointment form opens an email draft but does not book or send any details to a backend. Check imprint/privacy copy and actual clinic data before public deployment.
