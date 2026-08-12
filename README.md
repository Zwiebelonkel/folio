# Firebase Studio

This is a NextJS starter in Firebase Studio.

To get started, take a look at src/app/page.tsx.

## Firebase deployment

The GitHub Actions workflow in `.github/workflows/firebase-deploy.yml` builds and
deploys the static Next.js export to Firebase Hosting whenever a commit is pushed
to `main`. It can also be started manually from the **Actions** tab with
**Run workflow**.

Before running the workflow, add a GitHub Actions repository secret named
`FIREBASE_SERVICE_ACCOUNT`. Its value must be the complete JSON key of a Google
Cloud service account that is allowed to deploy Firebase Hosting releases for
the `studio-8909491984-d2ead` project. Never commit that key to the repository.
