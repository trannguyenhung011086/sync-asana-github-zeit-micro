import syncGithubToAsana from './lib/sync.js';
import express from 'express';

const asanaAccessToken = process.env.ASANA_ACCESS_TOKEN;
const githubToken = process.env.GITHUB_TRIGGER_TOKEN;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json({
        strict: false,
        type: "application/json"
    }));

app.get('/', (req, res) => {
    res.status(403).send('Use POST!!');
    return;
});

app.post('/', async (req, res) => {
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
        // const data = await json(req);
        console.log(`req.body = ${req.body}`)
        await syncGithubToAsana(req.body);

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
