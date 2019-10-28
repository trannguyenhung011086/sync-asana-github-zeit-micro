const Slack = require("slack");
const token = process.env.SLACK_BOT_TOKEN;
const bot = new Slack({ token });

async function notify(githubData) {
    const text = `Pull Request ${githubData.url} from ${githubData.user.login}
        Title: ${githubData.title} - Body: ${githubData.body}
        From: ${githubData.head} - To: ${githubData.base}
        State: ${githubData.state} - Merged: ${githubData.merged}`;

    try {
        const res = await bot.chat.meMessage({
            token,
            channel: "#pull-requests",
            text,
        });
        if (res.ok) console.log("Notified Slack successfully");
    } catch (e) {
        console.log("Failed to notify Slack", e);
    }
}

module.exports = { notify };
