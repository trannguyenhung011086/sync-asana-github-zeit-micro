const { syncGithubToAsana } = require('./lib/sync.js');
const crypto = require('crypto');

const asanaAccessToken = process.env.ASANA_ACCESS_TOKEN;
const githubToken = process.env.GITHUB_TRIGGER_TOKEN;
const apiAccessToken = process.env.API_ACCESS_TOKEN;

function sign (data) {
    return `sha1=${crypto.createHmac('sha1', apiAccessToken).update(data).digest('hex')}`;
}

function verify (signature, data) {
    const sig = Buffer.from(signature);
    const signed = Buffer.from(sign(data));

    if (sig.length !== signed.length) {
        return false;
    }
    
    return crypto.timingSafeEqual(sig, signed);
}

exports.handler = async (event, context) => {
    try {
        if(!event) {
            let log = JSON.stringify('Event was undefined! Nothing to process.');
            console.warn(log);

            return {
                statusCode: 500,
                body: log,
                logStreamName: context.logStreamName
            };
        }

        console.log(JSON.stringify('Event:'));
        console.log(JSON.stringify(event));

        if (!asanaAccessToken) {
            let log = JSON.stringify('No ASANA_ACCESS_TOKEN found!');
            console.warn(log);

            return {
                statusCode: 403,
                body: log,
                logStreamName: context.logStreamName
            };
        }

        if (!githubToken) {
            let log = JSON.stringify('No GITHUB_TRIGGER_TOKEN found!');
            console.warn(log);

            return {
                statusCode: 403,
                body: log,
                logStreamName: context.logStreamName
            };
        }

        if (!apiAccessToken) {
            let log = JSON.stringify('No API_ACCESS_TOKEN found!');
            console.warn(log);

            return {
                statusCode: 403,
                body: log,
                logStreamName: context.logStreamName
            };
        }

        if(event.requestContext?.http?.method !== 'POST') {
            let log = JSON.stringify('Please use POST!');
            console.warn(log);

            return {
                statusCode: 405,
                body: log,
                logStreamName: context.logStreamName
            };
        }

        if (event.headers['x-github-event'] !== 'pull_request') {
            let log = JSON.stringify('Only allow github events of pull request!');
            console.warn(log);
            return {
                statusCode: 403,
                body: log,
                logStreamName: context.logStreamName
            };
        }

        if (!verify(event.headers['x-hub-signature'], event.body)) {
            let log = JSON.stringify('API_ACCESS_TOKEN is incorrect!' + '  event.body: ' + JSON.parse(event.body));
            console.warn(log);

            return {
                statusCode: 403,
                body: log,
                logStreamName: context.logStreamName
            };
        }

        await syncGithubToAsana(JSON.parse(event.body));
        
        let log = JSON.stringify('Completed successfully!');
        console.log(log);

        return {
            statusCode: 200,
            body: log,
            logStreamName: context.logStreamName
        };
    } catch (e) {
        let log = JSON.stringify(`Error occurred: ${e.name}. Message: ${e.message}. Stack: ${e.stack} File: ${e.fileName}`);
        console.warn(log);

        return {
            statusCode: 500,
            body: log,
            logStreamName: context.logStreamName
        };
    }
};
