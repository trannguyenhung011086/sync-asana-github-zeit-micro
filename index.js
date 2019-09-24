const micro = require("micro");
const json = micro.json;
const send = micro.send;

import { sync } from "./lib/sync";

const asanaAccessToken = process.env.ASANA_ACCESS_TOKEN;

const app = micro(async (req, res) => {
    if (!asanaAccessToken) {
        send(res, 403, "No ASANA_ACCESS_TOKEN found!");
        return;
    }

    if (req.headers["x-github-event"] != "pull_request") {
        send(res, 403, "Only trigger for github events of pull request!");
        return;
    }

    const data = await json(req);
    await sync(data);

    send(res, 200, "Updated Asana task successfully");
});

if (!process.env.IS_NOW) {
    app.listen(process.env.PORT || 3000);
}

module.exports = app;