[![CI/CD Pipeline](https://github.com/wortpool/lab-4/actions/workflows/main.yml/badge.svg)](https://github.com/wortpool/lab-4/actions/workflows/main.yml)

# UniDone

Frontend MVP for laboratory work 4: CI/CD automation, quality checks, and production deployment with GitHub Actions and Vercel.

## Links

- Repository: https://github.com/wortpool/lab-4
- Production: https://app-six-xi-33.vercel.app

## Scripts

```bash
npm run dev
npm run lint
npm run test:unit
npm run build
npm run preview
```

## Features

- Add new tasks through the form.
- Move tasks between `Planned`, `In progress`, and `Done`.
- Persist tasks in `localStorage`.
- Show the active app status from `VITE_APP_STATUS`.
- Validate code quality through GitHub Actions.
- Build production artifacts into `dist/` with hashed asset names.
- Deploy the production version through Vercel.

## CI/CD

The workflow lives in `.github/workflows/main.yml` and runs on every push to `main` or `develop`, plus every pull request. The `build-and-test` job installs dependencies with `npm ci`, runs linting, executes unit tests, and builds the production artifact.

## Environment

`.env` is used for local development and is ignored by Git. `.env.production` contains the non-secret production status and can be committed.
