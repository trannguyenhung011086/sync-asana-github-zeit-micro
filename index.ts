import { IncomingMessage, ServerResponse } from "http";
import micro, { json, send } from "micro";

import { processor } from "./lib/processor";

const asanaAccessToken = process.env.ASANA_ACCESS_TOKEN;

const app = micro(async (req: IncomingMessage, res: ServerResponse) => {
    if (!asanaAccessToken) {
        send(res, 403, "No ASANA_ACCESS_TOKEN found!");
        return;
    }

    if (req.headers["x-github-event"] != "pull_request") {
        send(res, 403, "Only trigger for github events of pull request!");
        return;
    }

    const data = await json(req);
    console.log(data);
    const processed = await processor(data);

    if (!processed) {
        send(res, 403, "Failed to update Asana task!");
        return;
    }

    send(res, 200, "Updated Asana task successfully");
});

if (!process.env.IS_NOW) {
    app.listen(process.env.PORT || 3000);
}

export default app;
