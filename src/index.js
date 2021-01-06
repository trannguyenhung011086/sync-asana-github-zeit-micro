import asana from 'asana'

import SynchronizationEngine from './core/SynchronizationEngine'
import ActionFactory from './core/actionFactory'
import GithubWebhookClient from './core/GithubWebhookClient'
import { verifySignature } from './lib/security'
import configuration from './config'

const asanaAccessToken = process.env.ASANA_ACCESS_TOKEN;
const githubToken = process.env.GITHUB_TRIGGER_TOKEN;
const apiAccessToken = process.env.API_ACCESS_TOKEN;

export const handler = async (event, context) =>{
    const asanaClient = asana.Client.create({ defaultHeaders: { 'asana-enable': 'string_ids,new_sections' } }).useAccessToken(asanaAccessToken);
    const githubWebhookClient = new GithubWebhookClient(githubToken)
    const actionFactory = new ActionFactory(asanaClient)
    const synchronizationEngine = new SynchronizationEngine(configuration, actionFactory, asanaClient)

    try {
        if(!event) {
            const log = 'Event was undefined! Nothing to process.'
            console.warn(log);

            return {
                statusCode: 500,
                body: log,
                logStreamName: context.logStreamName
            }
        }

        console.log('Event:');
        console.log(JSON.stringify(event));

        if (!asanaAccessToken) {
            const log = 'No ASANA_ACCESS_TOKEN found!'
            console.warn(log);

            return {
                statusCode: 403,
                body: log,
                logStreamName: context.logStreamName
            }
        }

        if (!githubToken) {
            const log = 'No GITHUB_TRIGGER_TOKEN found!'
            console.warn(log);

            return {
                statusCode: 403,
                body: log,
                logStreamName: context.logStreamName
            }
        }

        if (!apiAccessToken) {
            const log = 'No API_ACCESS_TOKEN found!'
            console.warn(log);

            return {
                statusCode: 403,
                body: log,
                logStreamName: context.logStreamName
            }
        }

        if(event.requestContext?.http?.method !== 'POST') {
            const log = 'Please use POST!'
            console.warn(log);

            return {
                statusCode: 405,
                body: log,
                logStreamName: context.logStreamName
            }
        }

        if (event.headers['x-github-event'] !== 'pull_request') {
            const log = 'Only allow github events of pull request!'
            console.warn(log);

            return {
                statusCode: 403,
                body: log,
                logStreamName: context.logStreamName
            };
        }

        if (!verifySignature(apiAccessToken, event.headers['x-hub-signature'], event.body)) {
            let log = JSON.stringify(`API_ACCESS_TOKEN is incorrect! event.body: '${event.body}'`)
            console.warn(log);

            return {
                statusCode: 403,
                body: log,
                logStreamName: context.logStreamName
            }
        }

        const pullRequest = await githubWebhookClient.buildPullRequestData(event.body)
        await synchronizationEngine.processPullRequest(pullRequest)
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify(`Error occurred: ${error.name}. Message: ${error.message}. Stack: ${error.stack} File: ${error.fileName}`),
            logStreamName: context.logStreamName
        }
    }

    return {
        statusCode: 200,
        body: 'Completed successfully!',
        logStreamName: context.logStreamName
    }
}
