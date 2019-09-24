# sync-asana-github-zeit-micro

**Goal**
Sync github pull request status to asana task
Flow (see method `getAsanaSectionId` at `./lib/github.js` for section mapping):

-   pull request created - > add comment to asana -> move task to "in review" section
-   pull request merged - > add comment to asana - > move task to "on env" section

## Get Asana personal token

-   go to `My Profile Settings` -> `Apps` -> `Manage Developer Apps` -> `Create new personal access token`

## Deploy

-   install now: `npm i -g now`
-   run `now login` to login with Zeit credentials
-   run `now secrets add asana_token <ASANA_ACCESS_TOKEN>` to add secrets
-   run `now` to deploy (note url to add to github webhook)

## Create webhook on github

-   set payload url to `<url from zeit deploy>`
-   set content type to `application/json`
-   set events to `Let me select individual events` and check only `Pull Requests`

## Create pull request on github

-   use convention `#<Asana task ID> <pull request text>` in title or description
