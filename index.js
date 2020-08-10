import syncGithubToAsana from './lib/sync.js';
import express from 'express';

const asanaAccessToken = process.env.ENV === 'prod' ? process.env.ASANA_ACCESS_TOKEN : '1/1159643686189895:d75396097a7f1225c290d936ff855fc3';
const githubToken = process.env.ENV === 'prod' ? process.env.GITHUB_TRIGGER_TOKEN : '2db7be74fff0ec440726c6b7ee758876bd3f5016';
const app = express();

app.get('/', async (req, res) => {
    if (!asanaAccessToken) {
        res.status(403).send('No ASANA_ACCESS_TOKEN found!');
        return;
    }

    if (!githubToken) {
        res.status(403).send('No GITHUB_TRIGGER_TOKEN found!');
        return;
    }

    if (req.headers['x-github-event'] != 'pull_request') {
        res.status(403).send('Only allow github events of pull request!');
        return;
    }

    try {
        const data = await JSON.stringify(req);
        await syncGithubToAsana(data);

        res.status(200).send(res);
    } catch (e) {
        console.log(`App error: ${e}`);
        res.status(500).send(req, res, e);
    }
});

if (!process.env.IS_NOW) {
    app.listen(process.env.PORT || 3000, () => {
        console.log(`app is listening to port ${process.env.PORT || 3000}`);
    });
}

export default app;
