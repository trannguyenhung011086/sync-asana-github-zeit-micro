import axios from 'axios'

class GithubWebhookClient {
    constructor(accessToken) {
        this.webClient = axios.create({
            headers: {
                accept: 'application/vnd.github.v3+json',
                'Content-Type': 'application/json',
                Authorization: `token ${accessToken}`,
            }
          });
    }

    buildPullRequestData = async (data) => {
        const parsedData = JSON.parse(data)
        const pullRequestData = parsedData.pull_request;
        const commits = (await this.webClient.get(pullRequestData.commits_url)).data
        const comments = (await this.webClient.get(pullRequestData.comments_url)).data
    
        return {
            title: pullRequestData.title,
            body: pullRequestData.body,
            url: pullRequestData.html_url,
            state: pullRequestData.state,
            user: pullRequestData.user,
            head: pullRequestData.head.ref,
            base: pullRequestData.base.ref,
            merged: pullRequestData.merged,
            draft: pullRequestData.draft,
            commits,
            comments
        };
    }
}

export default GithubWebhookClient