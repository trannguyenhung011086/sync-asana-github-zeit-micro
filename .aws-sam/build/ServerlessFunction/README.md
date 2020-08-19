# asana-github-sync

**Goal:** Sync github pull request status to asana task

-   Flow (see method `getAsanaSectionId` at `.src/lib/github.js` for section mapping, note: ticket moving will be added later):

    -   pull request created - > add comment to asana -> move task to "in review" section
    -   pull request merged - > add comment to asana - > move task to "on env" section (movement part is disabled for now)

**Stack**

-   use Asana library (https://github.com/Asana/node-asana)
-   Git calls are made using fetch

## Get Asana personal token

-   go to `My Profile Settings` -> `Apps` -> `Manage Developer Apps` -> `Create new personal access token` (Done)

## Get Github personal token

- under profile pic -> settings -> developer settings -> personal access tokens (Done)
- Check "repo" and everthing under it for permissions (Done)

## Setup Github webhook

-   Go to repo -> settings -> Webhooks (Done)
-   set payload url to AWS API (Done)
-   set content type to `application/json` (Done)
-   set events to `Let me select individual events` and check only `Pull Requests` (Done)

## Deploy

The AWS Toolkit is an open source plug-in for popular IDEs that uses the SAM CLI to build and deploy serverless applications on AWS. The AWS Toolkit also adds a simplified step-through debugging experience for Lambda function code. See the following links to get started.

## Deploy the application

The Serverless Application Model Command Line Interface (SAM CLI) is an extension of the AWS CLI that adds functionality for building and testing Lambda applications. It uses Docker to run your functions in an Amazon Linux environment that matches Lambda. It can also emulate your application's build environment and API.

To use the SAM CLI, you need the following tools.

* SAM CLI - [Install the SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html)
* Node.js - [Install Node.js 10](https://nodejs.org/en/), including the NPM package management tool.
* Docker - [Install Docker community edition](https://hub.docker.com/search/?type=edition&offering=community)

To build and deploy your application, run the following in your shell:

```bash
sam build
sam deploy
```

If you redeploy this and it ends up at a different endpoint URL, you need to go in to Github and change it in the Webhook.

## Create pull request on github

-   use convention `#<Asana task ID> <pull request text>` in title or description or HEAD commit
