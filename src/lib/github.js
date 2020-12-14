const fetch = require('node-fetch');

const options = {
    method: 'GET',
    headers: {
        accept: 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
        Authorization: `token ${process.env.GITHUB_TRIGGER_TOKEN}`,
    },
};

function match(toMatch) {
    console.log('potential regex match: ' + toMatch);
    let result = toMatch.match(/(\d{16})(?!.*\d{16})/g);
    console.log('result of match op: ' + result);

    return result
        ? result.map(item => item.replace('#', '').replace('ref', ''))
        : '';
}

async function getCommits(data) {
    const commits_url = data['pull_request']['commits_url'];
    const res = await fetch(commits_url, options);

    if(!res.ok) {
        throw `fetching ${commits_url} returned code ${res.status}`;
    }

    return await res.json();
}

async function getComments(data) {
    const comments_url = data['pull_request']['comments_url'];
    const res = await fetch(comments_url, options);
    return await res.json();
}

async function getReviewComments(data) {
    const review_comments_url = data['pull_request']['review_comments_url'];
    const res = await fetch(review_comments_url, options);
    return await res.json();
}

exports.getPullRequestData = async (data) => {
    if(!data) {
        throw `getPullRequestData(): data parameter was null.`;
    }

    let commit_urls = [];
    const commits = await getCommits(data);

    if (!commits || commits.length === 0) {
        throw `getPullRequestData(): No Github data was found! The branch was probably deleted.`;
    }

    for (const commit of commits) {
        const item = ` ${commit['html_url']} - ${commit['commit']['message']} - ${commit['committer']['login']}`;
        commit_urls.push(item);
    }

    return {
        title: data['pull_request']['title'],
        body: data['pull_request']['body'],
        url: data['pull_request']['html_url'],
        state: data['pull_request']['state'],
        user: {
            login: data['pull_request']['user']['login'],
        },
        head: data['pull_request']['head']['ref'],
        base: data['pull_request']['base']['ref'],
        merged: data['pull_request']['merged'],
        commits: commit_urls
    };
}

exports.getAsanaIds = async (data) => {
    let ids = [];

    // check title, body, head
    const title = data['pull_request']['title'];
    const body = data['pull_request']['body'];
    const head = data['pull_request']['head']['ref'];

    const checks = [title, body, head];
    checks.forEach(item => (ids = [...ids, ...match(item)]));

    // check commits
    const commits = await getCommits(data);
    for (const commit of commits) {
        const matchCommit = await match(commit['commit']['message']);
        ids = [...ids, ...matchCommit];
    }

    // check comments and review comments
    const comments = (await getComments(data)).concat(await getReviewComments(data));

    for (const comment of comments) {
        const matchComment = await match(comment['body']);
        ids = [...ids, ...matchComment];
    }

    if (ids.length === 0)
        throw Error('No Asana task ID found!');

    const uniqueIds = [...new Set(ids)];
    return uniqueIds;
}

exports.getAsanaSectionId = (asanaSections, data) => {
    let section;

    if (
        data.merged === false &&
        data.state === 'open' &&
        (data.draft || data.title.match(/wip/i))
    ) {
        section = 'In Progress';
    }

    if (
        data.merged === false &&
        data.state === 'open' &&
        !data?.draft &&
        !data.title.match(/wip/i)
    ) {
        section = 'Ready for Review';
    }

    if (data.merged === true && data.state == 'closed') {
        if (data.base === 'develop') section = 'QA Ready';
        if (data.base === 'master') section = 'Deployable';
    }

    let rtnData = {};

    for (const item of Object.keys(asanaSections)) {
        if (item.includes(section)) {
            rtnData.sectionId = asanaSections[item];
            rtnData.sectionName = section;
        }
    }

    return rtnData;
}
