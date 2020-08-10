const micro = require('micro');
const json = micro.json;
const send = micro.send;

const { syncGithubToAsana } = require('./lib/sync');

const asanaAccessToken = process.env.ASANA_ACCESS_TOKEN;
const githubToken = process.env.GITHUB_TRIGGER_TOKEN;

const app = micro(async (req, res) => {
    if (!asanaAccessToken) {
        send(res, 403, 'No ASANA_ACCESS_TOKEN found!');
        return;
    }

    if (!githubToken) {
        send(res, 403, 'No GITHUB_TRIGGER_TOKEN found!');
        return;
    }

    if (req.headers['x-github-event'] != 'pull_request') {
        send(res, 403, 'Only allow github events of pull request!');
        return;
    }

    try {
        console.log(`req: ${req}`);
        const data = await json(req);
        console.log(`data: ${data}`)
        await syncGithubToAsana(data);

        send(res, 200, 'Updated Asana task(s) successfully');
        console.log(`response: ${res}`)
    } catch (e) {
        send(res, 500, e);
    }
});

if (!process.env.IS_NOW) {
    app.listen(process.env.PORT || 3000);
}

module.exports = app;
