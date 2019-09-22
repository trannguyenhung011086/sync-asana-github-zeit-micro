# sync-asana-github-zeit-micro

## Get Asana personal token

-   go to `My Profile Settings` -> `Apps` -> `Manage Developer Apps` -> `Create new personal access token`

## Deploy

-   install now: `npm i -g now`
-   input credentials to log in Zeit Now
-   run `now -e IS_NOW=true -e ASANA_ACCESS_TOKEN=<asana token>`

## Create webhook on github

-   set payload url to `https://<url from zeit>/index.ts`
-   set content type to `application/json`
-   set events to `Let me select individual events` and check `Pull Requests`
