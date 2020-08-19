import syncGithubToAsana from './lib/sync.js';
import crypto from 'crypto';

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

exports.handler = async (event) => {
    if (!asanaAccessToken) {
        return {
            statusCode: 403,
            body: JSON.stringify('No ASANA_ACCESS_TOKEN found!'),
        };
    }

    if (!githubToken) {
        return {
            statusCode: 403,
            body: JSON.stringify('No GITHUB_TRIGGER_TOKEN found!'),
        };
    }

    if (!apiAccessToken) {
        return {
            statusCode: 403,
            body: JSON.stringify('No API_ACCESS_TOKEN found!'),
        };
    }

    if(event.requestContext?.http?.method !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify('Please use POST!'),
        };
    }

    if (event.headers['x-github-event'] !== 'pull_request') {
        return {
            statusCode: 403,
            body: JSON.stringify('Only allow github events of pull request!'),
        };
    }

    if (!verify(event.headers['x-hub-signature'], event.body)) {
        return {
            statusCode: 403,
            body: JSON.stringify('API_ACCESS_TOKEN is incorrect!' + '  event.body: ' + JSON.parse(event.body)),
        };
    }

    try {
        await syncGithubToAsana(JSON.parse(event.body));
        return {
            statusCode: 200,
            body: JSON.stringify('Completed!'),
        };
    } catch (e) {
        console.log(`Error: ${e}`);
        return {
            statusCode: 500,
            body: JSON.stringify(`Error occurred: ${e}`),
        };
    }
};
