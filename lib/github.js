const fetch = require("node-fetch");

function match(toMatch) {
    const exp = /#([0-9]{16})/;
    return exp.exec(toMatch);
}

async function getCommits(data) {
    const commits_url = data["pull_request"]["commits_url"];
    const res = await fetch(commits_url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `token ${process.env.GITHUB_TRIGGER_TOKEN}`,
        },
    });
    return await res.json();
}

module.exports = {
    getPullRequestData: async data => {
        let commit_urls = [];
        const commits = await getCommits(data);
        for (const commit of commits) {
            const item = ` ${commit["html_url"]} - ${
                commit["commit"]["message"]
            } - ${commit["committer"]["login"]}`;
            commit_urls.push(item);
        }

        return {
            title: data["pull_request"]["title"],
            body: data["pull_request"]["body"],
            url: data["pull_request"]["html_url"],
            state: data["pull_request"]["state"],
            user: {
                login: data["pull_request"]["user"]["login"],
            },
            head: data["pull_request"]["head"]["ref"],
            base: data["pull_request"]["base"]["ref"],
            merged: data["pull_request"]["merged"],
            commits: commit_urls,
        };
    },

    getAsanaIds: async data => {
        let ids = [];

        // check title and body
        const title = data["pull_request"]["title"];
        const body = data["pull_request"]["body"];
        const result = match(title) || match(body);
        if (result) ids.push(result[1]);

        // check commits
        const commits = await getCommits(data);
        for (const commit of commits) {
            const result = match(commit["commit"]["message"]);
            if (result) ids.push(result[1]);
        }

        if (ids.length === 0) throw Error("No Asana task ID found!");

        const uniqueIds = [...new Set(ids)];
        return uniqueIds;
    },

    getAsanaSectionId: (asanaSections, data) => {
        let section;

        if (data.merged === false && data.state === "open") {
            if (data.base === "develop") section = "in review";
            if (data.base === "release") section = "staging ready";
            if (data.base === "master") section = "production ready";
        }

        if (data.merged === true && data.state == "closed") {
            if (data.base === "develop") section = "on test";
            if (data.base === "release") section = "on staging";
            if (data.base === "master") section = "done";
        }

        for (const item of Object.keys(asanaSections)) {
            if (item.toLowerCase().includes(section)) {
                return asanaSections[item];
            }
        }
    },
};
