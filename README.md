# asana-github-sync

**Goal:** Sync github pull request status to asana task

-   Flow (see method `getAsanaSectionId` at `./lib/github.js` for section mapping):

    -   pull request created - > add comment to asana -> move task to "in review" section
    -   pull request merged - > add comment to asana - > move task to "on env" section (movement part is disabled for now)

**Stack**

-   use Vercel CLI platform for deployment (Stack moving forward will be AWS)
-   use Express as MW
-   use Asana library (https://github.com/Asana/node-asana)
-   Git calls are made using fetch

## Get Asana personal token

-   go to `My Profile Settings` -> `Apps` -> `Manage Developer Apps` -> `Create new personal access token` (Done)

## Get Github personal token

- under profile pic -> settings -> developer settings -> personal access tokens (Done)
- Check "repo" and everthing under it for permissions (Done)

## Setup Github webhook

-   Go to repo -> settings -> Webhooks (Done)
-   set payload url to `<url from zeit deploy>` (Done)
-   set content type to `application/json` (Done)
-   set events to `Let me select individual events` and check only `Pull Requests` (Done)

## Deploy

-   install vercel (used to be now): `yarn global add now vercel`
-   run `vercel login` to login with Zeit credentials
-   run `vercel secrets add asana_token <ASANA_ACCESS_TOKEN>` to add Asana secrets
-   run `vercel secrets add github_token <GITHUB_TRIGGER_TOKEN>` to add Github secrets
-   run `vercel --prod` to deploy (note url to add to github webhook)
-   run `vercel dev` to develop

## Create pull request on github

-   use convention `#<Asana task ID> <pull request text>` in title or description or HEAD commit
