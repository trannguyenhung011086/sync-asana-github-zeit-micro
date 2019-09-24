const {
    getAsanaTask,
    addComment,
    addAsanaTask,
    getAsanaProject,
    getAsanaSections
} = require("./lib/asana.js");

const asanaId = "1140905340811780";

async function test() {
    // get asana task info
    const task = await getAsanaTask(asanaId);
    console.log(`Found asana task: ${task.name}`);

    const project = getAsanaProject(task);
    console.log(`Found asana project: ${project.name}`);
    console.log(project);

    const sections = await getAsanaSections(project.gid);
    console.log(`Found asana sections: ${JSON.stringify(sections)}`);

    // add comment to asana task
    // await addComment(asanaId, githubData);
    // console.log(`Added comment to asana task: ${task.name}`);
}

// test();

function match(toMatch) {
    const exp = /#([0-9]{0,16}).+/;
    const match = exp.exec(toMatch);
    return match
}

const getAsanaId = data => {
    const title = data["pull_request"]["title"];
    const body = data["pull_request"]["body"];
    const asanaId = match(title) || match(body);
    if (!asanaId) throw Error("No Asana task ID found!");
    return asanaId[1]
};

const res = getAsanaId({
    "action": "opened",
    "number": 25,
    "pull_request": {
      "url": "https://api.github.com/repos/trannguyenhung011086/sync-asana-github-zeit-micro/pulls/25",
      "id": 320602339,
      "node_id": "MDExOlB1bGxSZXF1ZXN0MzIwNjAyMzM5",
      "html_url": "https://github.com/trannguyenhung011086/sync-asana-github-zeit-micro/pull/25",
      "diff_url": "https://github.com/trannguyenhung011086/sync-asana-github-zeit-micro/pull/25.diff",
      "patch_url": "https://github.com/trannguyenhung011086/sync-asana-github-zeit-micro/pull/25.patch",
      "issue_url": "https://api.github.com/repos/trannguyenhung011086/sync-asana-github-zeit-micro/issues/25",
      "number": 25,
      "state": "open",
      "locked": false,
      "title": "Develop",
      "user": {
        "login": "trannguyenhung011086",
        "id": 16036216,
        "node_id": "MDQ6VXNlcjE2MDM2MjE2",
        "avatar_url": "https://avatars2.githubusercontent.com/u/16036216?v=4",
        "gravatar_id": "",
        "url": "https://api.github.com/users/trannguyenhung011086",
        "html_url": "https://github.com/trannguyenhung011086",
        "followers_url": "https://api.github.com/users/trannguyenhung011086/followers",
        "following_url": "https://api.github.com/users/trannguyenhung011086/following{/other_user}",
        "gists_url": "https://api.github.com/users/trannguyenhung011086/gists{/gist_id}",
        "starred_url": "https://api.github.com/users/trannguyenhung011086/starred{/owner}{/repo}",
        "subscriptions_url": "https://api.github.com/users/trannguyenhung011086/subscriptions",
        "organizations_url": "https://api.github.com/users/trannguyenhung011086/orgs",
        "repos_url": "https://api.github.com/users/trannguyenhung011086/repos",
        "events_url": "https://api.github.com/users/trannguyenhung011086/events{/privacy}",
        "received_events_url": "https://api.github.com/users/trannguyenhung011086/received_events",
        "type": "User",
        "site_admin": false
      },
      "body": "ref #1140905340811780 merge",
      "created_at": "2019-09-24T06:17:13Z",
      "updated_at": "2019-09-24T06:17:13Z",
      "closed_at": null,
      "merged_at": null,
      "merge_commit_sha": null,
      "assignee": null,
      "assignees": [
  
      ],
      "requested_reviewers": [
  
      ],
      "requested_teams": [
  
      ],
      "labels": [
  
      ],
      "milestone": null,
      "commits_url": "https://api.github.com/repos/trannguyenhung011086/sync-asana-github-zeit-micro/pulls/25/commits",
      "review_comments_url": "https://api.github.com/repos/trannguyenhung011086/sync-asana-github-zeit-micro/pulls/25/comments",
      "review_comment_url": "https://api.github.com/repos/trannguyenhung011086/sync-asana-github-zeit-micro/pulls/comments{/number}",
      "comments_url": "https://api.github.com/repos/trannguyenhung011086/sync-asana-github-zeit-micro/issues/25/comments",
      "statuses_url": "https://api.github.com/repos/trannguyenhung011086/sync-asana-github-zeit-micro/statuses/5f16e44b4ff11a8834e80a46da0fb46c29c8cf87",
      "head": {
        "label": "trannguyenhung011086:develop",
        "ref": "develop",
        "sha": "5f16e44b4ff11a8834e80a46da0fb46c29c8cf87",
        "user": {
          "login": "trannguyenhung011086",
          "id": 16036216,
          "node_id": "MDQ6VXNlcjE2MDM2MjE2",
          "avatar_url": "https://avatars2.githubusercontent.com/u/16036216?v=4",
          "gravatar_id": "",
          "url": "https://api.github.com/users/trannguyenhung011086",
          "html_url": "https://github.com/trannguyenhung011086",
          "followers_url": "https://api.github.com/users/trannguyenhung011086/followers",
          "following_url": "https://api.github.com/users/trannguyenhung011086/following{/other_user}",
          "gists_url": "https://api.github.com/users/trannguyenhung011086/gists{/gist_id}",
          "starred_url": "https://api.github.com/users/trannguyenhung011086/starred{/owner}{/repo}",
          "subscriptions_url": "https://api.github.com/users/trannguyenhung011086/subscriptions",
          "organizations_url": "https://api.github.com/users/trannguyenhung011086/orgs",
          "repos_url": "https://api.github.com/users/trannguyenhung011086/repos",
          "events_url": "https://api.github.com/users/trannguyenhung011086/events{/privacy}",
          "received_events_url": "https://api.github.com/users/trannguyenhung011086/received_events",
          "type": "User",
          "site_admin": false
        },
        "repo": {
          "id": 210112545,
          "node_id": "MDEwOlJlcG9zaXRvcnkyMTAxMTI1NDU=",
          "name": "sync-asana-github-zeit-micro",
          "full_name": "trannguyenhung011086/sync-asana-github-zeit-micro",
          "private": false,
          "owner": {
            "login": "trannguyenhung011086",
            "id": 16036216,
            "node_id": "MDQ6VXNlcjE2MDM2MjE2",
            "avatar_url": "https://avatars2.githubusercontent.com/u/16036216?v=4",
            "gravatar_id": "",
            "url": "https://api.github.com/users/trannguyenhung011086",
            "html_url": "https://github.com/trannguyenhung011086",
            "followers_url": "https://api.github.com/users/trannguyenhung011086/followers",
            "following_url": "https://api.github.com/users/trannguyenhung011086/following{/other_user}",
            "gists_url": "https://api.github.com/users/trannguyenhung011086/gists{/gist_id}",
            "starred_url": "https://api.github.com/users/trannguyenhung011086/starred{/owner}{/repo}",
            "subscriptions_url": "https://api.github.com/users/trannguyenhung011086/subscriptions",
            "organizations_url": "https://api.github.com/users/trannguyenhung011086/orgs",
            "repos_url": "https://api.github.com/users/trannguyenhung011086/repos",
            "events_url": "https://api.github.com/users/trannguyenhung011086/events{/privacy}",
            "received_events_url": "https://api.github.com/users/trannguyenhung011086/received_events",
            "type": "User",
            "site_admin": false
          },
          "html_url": "https://github.com/trannguyenhung011086/sync-asana-github-zeit-micro",
          "description": null,
          "fork": false,
          "url": "https://api.github.com/repos/trannguyenhung011086/sync-asana-github-zeit-micro",
          "forks_url": "https://api.github.com/repos/trannguyenhung011086/sync-asana-github-zeit-micro/forks",
          "keys_url": "https://api.github.com/repos/trannguyenhung011086/sync-asana-github-zeit-micro/keys{/key_id}",
          "collaborators_url": "https://api.github.com/repos/trannguyenhung011086/sync-asana-github-zeit-micro/collaborators{/collaborator}",
          "teams_url": "https://api.github.com/repos/trannguyenhung011086/sync-asana-github-zeit-micro/teams",
          "hooks_url": "https://api.github.com/repos/trannguyenhung011086/sync-asana-github-zeit-micro/hooks",
          "issue_events_url": "https://api.github.com/repos/trannguyenhung011086/sync-asana-github-zeit-micro/issues/events{/number}",
          "events_url": "https://api.github.com/repos/trannguyenhung011086/sync-asana-github-zeit-micro/events",
          "assignees_url": "https://api.github.com/repos/trannguyenhung011086/sync-asana-github-zeit-micro/assignees{/user}",
          "branches_url": "https://api.github.com/repos/trannguyenhung011086/sync-asana-github-zeit-micro/branches{/branch}",
          "tags_url": "https://api.github.com/repos/trannguyenhung011086/sync-asana-github-zeit-micro/tags",
          "blobs_url": "https://api.github.com/repos/trannguyenhung011086/sync-asana-github-zeit-micro/git/blobs{/sha}",
          "git_tags_url": "https://api.github.com/repos/trannguyenhung011086/sync-asana-github-zeit-micro/git/tags{/sha}",
          "git_refs_url": "https://api.github.com/repos/trannguyenhung011086/sync-asana-github-zeit-micro/git/refs{/sha}",
          "trees_url": "https://api.github.com/repos/trannguyenhung011086/sync-asana-github-zeit-micro/git/trees{/sha}",
          "statuses_url": "https://api.github.com/repos/trannguyenhung011086/sync-asana-github-zeit-micro/statuses/{sha}",
          "languages_url": "https://api.github.com/repos/trannguyenhung011086/sync-asana-github-zeit-micro/languages",
          "stargazers_url": "https://api.github.com/repos/trannguyenhung011086/sync-asana-github-zeit-micro/stargazers",
          "contributors_url": "https://api.github.com/repos/trannguyenhung011086/sync-asana-github-zeit-micro/contributors",
          "subscribers_url": "https://api.github.com/repos/trannguyenhung011086/sync-asana-github-zeit-micro/subscribers",
          "subscription_url": "https://api.github.com/repos/trannguyenhung011086/sync-asana-github-zeit-micro/subscription",
          "commits_url": "https://api.github.com/repos/trannguyenhung011086/sync-asana-github-zeit-micro/commits{/sha}",
          "git_commits_url": "https://api.github.com/repos/trannguyenhung011086/sync-asana-github-zeit-micro/git/commits{/sha}",
          "comments_url": "https://api.github.com/repos/trannguyenhung011086/sync-asana-github-zeit-micro/comments{/number}",
          "issue_comment_url": "https://api.github.com/repos/trannguyenhung011086/sync-asana-github-zeit-micro/issues/comments{/number}",
          "contents_url": "https://api.github.com/repos/trannguyenhung011086/sync-asana-github-zeit-micro/contents/{+path}",
          "compare_url": "https://api.github.com/repos/trannguyenhung011086/sync-asana-github-zeit-micro/compare/{base}...{head}",
          "merges_url": "https://api.github.com/repos/trannguyenhung011086/sync-asana-github-zeit-micro/merges",
          "archive_url": "https://api.github.com/repos/trannguyenhung011086/sync-asana-github-zeit-micro/{archive_format}{/ref}",
          "downloads_url": "https://api.github.com/repos/trannguyenhung011086/sync-asana-github-zeit-micro/downloads",
          "issues_url": "https://api.github.com/repos/trannguyenhung011086/sync-asana-github-zeit-micro/issues{/number}",
          "pulls_url": "https://api.github.com/repos/trannguyenhung011086/sync-asana-github-zeit-micro/pulls{/number}",
          "milestones_url": "https://api.github.com/repos/trannguyenhung011086/sync-asana-github-zeit-micro/milestones{/number}",
          "notifications_url": "https://api.github.com/repos/trannguyenhung011086/sync-asana-github-zeit-micro/notifications{?since,all,participating}",
          "labels_url": "https://api.github.com/repos/trannguyenhung011086/sync-asana-github-zeit-micro/labels{/name}",
          "releases_url": "https://api.github.com/repos/trannguyenhung011086/sync-asana-github-zeit-micro/releases{/id}",
          "deployments_url": "https://api.github.com/repos/trannguyenhung011086/sync-asana-github-zeit-micro/deployments",
          "created_at": "2019-09-22T08:10:56Z",
          "updated_at": "2019-09-22T15:31:04Z",
          "pushed_at": "2019-09-24T06:16:28Z",
          "git_url": "git://github.com/trannguyenhung011086/sync-asana-github-zeit-micro.git",
          "ssh_url": "git@github.com:trannguyenhung011086/sync-asana-github-zeit-micro.git",
          "clone_url": "https://github.com/trannguyenhung011086/sync-asana-github-zeit-micro.git",
          "svn_url": "https://github.com/trannguyenhung011086/sync-asana-github-zeit-micro",
          "homepage": "https://zeit-asana-github-sync.now.sh",
          "size": 54,
          "stargazers_count": 0,
          "watchers_count": 0,
          "language": "TypeScript",
          "has_issues": true,
          "has_projects": true,
          "has_downloads": true,
          "has_wiki": true,
          "has_pages": false,
          "forks_count": 0,
          "mirror_url": null,
          "archived": false,
          "disabled": false,
          "open_issues_count": 1,
          "license": null,
          "forks": 0,
          "open_issues": 1,
          "watchers": 0,
          "default_branch": "master"
        }
      },
      "base": {
        "label": "trannguyenhung011086:release",
        "ref": "release",
        "sha": "3c3567634dfacf9641ed4a4690c3f40b575824ae",
        "user": {
          "login": "trannguyenhung011086",
          "id": 16036216,
          "node_id": "MDQ6VXNlcjE2MDM2MjE2",
          "avatar_url": "https://avatars2.githubusercontent.com/u/16036216?v=4",
          "gravatar_id": "",
          "url": "https://api.github.com/users/trannguyenhung011086",
          "html_url": "https://github.com/trannguyenhung011086",
          "followers_url": "https://api.github.com/users/trannguyenhung011086/followers",
          "following_url": "https://api.github.com/users/trannguyenhung011086/following{/other_user}",
          "gists_url": "https://api.github.com/users/trannguyenhung011086/gists{/gist_id}",
          "starred_url": "https://api.github.com/users/trannguyenhung011086/starred{/owner}{/repo}",
          "subscriptions_url": "https://api.github.com/users/trannguyenhung011086/subscriptions",
          "organizations_url": "https://api.github.com/users/trannguyenhung011086/orgs",
          "repos_url": "https://api.github.com/users/trannguyenhung011086/repos",
          "events_url": "https://api.github.com/users/trannguyenhung011086/events{/privacy}",
          "received_events_url": "https://api.github.com/users/trannguyenhung011086/received_events",
          "type": "User",
          "site_admin": false
        },
        "repo": {
          "id": 210112545,
          "node_id": "MDEwOlJlcG9zaXRvcnkyMTAxMTI1NDU=",
          "name": "sync-asana-github-zeit-micro",
          "full_name": "trannguyenhung011086/sync-asana-github-zeit-micro",
          "private": false,
          "owner": {
            "login": "trannguyenhung011086",
            "id": 16036216,
            "node_id": "MDQ6VXNlcjE2MDM2MjE2",
            "avatar_url": "https://avatars2.githubusercontent.com/u/16036216?v=4",
            "gravatar_id": "",
            "url": "https://api.github.com/users/trannguyenhung011086",
            "html_url": "https://github.com/trannguyenhung011086",
            "followers_url": "https://api.github.com/users/trannguyenhung011086/followers",
            "following_url": "https://api.github.com/users/trannguyenhung011086/following{/other_user}",
            "gists_url": "https://api.github.com/users/trannguyenhung011086/gists{/gist_id}",
            "starred_url": "https://api.github.com/users/trannguyenhung011086/starred{/owner}{/repo}",
            "subscriptions_url": "https://api.github.com/users/trannguyenhung011086/subscriptions",
            "organizations_url": "https://api.github.com/users/trannguyenhung011086/orgs",
            "repos_url": "https://api.github.com/users/trannguyenhung011086/repos",
            "events_url": "https://api.github.com/users/trannguyenhung011086/events{/privacy}",
            "received_events_url": "https://api.github.com/users/trannguyenhung011086/received_events",
            "type": "User",
            "site_admin": false
          },
          "html_url": "https://github.com/trannguyenhung011086/sync-asana-github-zeit-micro",
          "description": null,
          "fork": false,
          "url": "https://api.github.com/repos/trannguyenhung011086/sync-asana-github-zeit-micro",
          "forks_url": "https://api.github.com/repos/trannguyenhung011086/sync-asana-github-zeit-micro/forks",
          "keys_url": "https://api.github.com/repos/trannguyenhung011086/sync-asana-github-zeit-micro/keys{/key_id}",
          "collaborators_url": "https://api.github.com/repos/trannguyenhung011086/sync-asana-github-zeit-micro/collaborators{/collaborator}",
          "teams_url": "https://api.github.com/repos/trannguyenhung011086/sync-asana-github-zeit-micro/teams",
          "hooks_url": "https://api.github.com/repos/trannguyenhung011086/sync-asana-github-zeit-micro/hooks",
          "issue_events_url": "https://api.github.com/repos/trannguyenhung011086/sync-asana-github-zeit-micro/issues/events{/number}",
          "events_url": "https://api.github.com/repos/trannguyenhung011086/sync-asana-github-zeit-micro/events",
          "assignees_url": "https://api.github.com/repos/trannguyenhung011086/sync-asana-github-zeit-micro/assignees{/user}",
          "branches_url": "https://api.github.com/repos/trannguyenhung011086/sync-asana-github-zeit-micro/branches{/branch}",
          "tags_url": "https://api.github.com/repos/trannguyenhung011086/sync-asana-github-zeit-micro/tags",
          "blobs_url": "https://api.github.com/repos/trannguyenhung011086/sync-asana-github-zeit-micro/git/blobs{/sha}",
          "git_tags_url": "https://api.github.com/repos/trannguyenhung011086/sync-asana-github-zeit-micro/git/tags{/sha}",
          "git_refs_url": "https://api.github.com/repos/trannguyenhung011086/sync-asana-github-zeit-micro/git/refs{/sha}",
          "trees_url": "https://api.github.com/repos/trannguyenhung011086/sync-asana-github-zeit-micro/git/trees{/sha}",
          "statuses_url": "https://api.github.com/repos/trannguyenhung011086/sync-asana-github-zeit-micro/statuses/{sha}",
          "languages_url": "https://api.github.com/repos/trannguyenhung011086/sync-asana-github-zeit-micro/languages",
          "stargazers_url": "https://api.github.com/repos/trannguyenhung011086/sync-asana-github-zeit-micro/stargazers",
          "contributors_url": "https://api.github.com/repos/trannguyenhung011086/sync-asana-github-zeit-micro/contributors",
          "subscribers_url": "https://api.github.com/repos/trannguyenhung011086/sync-asana-github-zeit-micro/subscribers",
          "subscription_url": "https://api.github.com/repos/trannguyenhung011086/sync-asana-github-zeit-micro/subscription",
          "commits_url": "https://api.github.com/repos/trannguyenhung011086/sync-asana-github-zeit-micro/commits{/sha}",
          "git_commits_url": "https://api.github.com/repos/trannguyenhung011086/sync-asana-github-zeit-micro/git/commits{/sha}",
          "comments_url": "https://api.github.com/repos/trannguyenhung011086/sync-asana-github-zeit-micro/comments{/number}",
          "issue_comment_url": "https://api.github.com/repos/trannguyenhung011086/sync-asana-github-zeit-micro/issues/comments{/number}",
          "contents_url": "https://api.github.com/repos/trannguyenhung011086/sync-asana-github-zeit-micro/contents/{+path}",
          "compare_url": "https://api.github.com/repos/trannguyenhung011086/sync-asana-github-zeit-micro/compare/{base}...{head}",
          "merges_url": "https://api.github.com/repos/trannguyenhung011086/sync-asana-github-zeit-micro/merges",
          "archive_url": "https://api.github.com/repos/trannguyenhung011086/sync-asana-github-zeit-micro/{archive_format}{/ref}",
          "downloads_url": "https://api.github.com/repos/trannguyenhung011086/sync-asana-github-zeit-micro/downloads",
          "issues_url": "https://api.github.com/repos/trannguyenhung011086/sync-asana-github-zeit-micro/issues{/number}",
          "pulls_url": "https://api.github.com/repos/trannguyenhung011086/sync-asana-github-zeit-micro/pulls{/number}",
          "milestones_url": "https://api.github.com/repos/trannguyenhung011086/sync-asana-github-zeit-micro/milestones{/number}",
          "notifications_url": "https://api.github.com/repos/trannguyenhung011086/sync-asana-github-zeit-micro/notifications{?since,all,participating}",
          "labels_url": "https://api.github.com/repos/trannguyenhung011086/sync-asana-github-zeit-micro/labels{/name}",
          "releases_url": "https://api.github.com/repos/trannguyenhung011086/sync-asana-github-zeit-micro/releases{/id}",
          "deployments_url": "https://api.github.com/repos/trannguyenhung011086/sync-asana-github-zeit-micro/deployments",
          "created_at": "2019-09-22T08:10:56Z",
          "updated_at": "2019-09-22T15:31:04Z",
          "pushed_at": "2019-09-24T06:16:28Z",
          "git_url": "git://github.com/trannguyenhung011086/sync-asana-github-zeit-micro.git",
          "ssh_url": "git@github.com:trannguyenhung011086/sync-asana-github-zeit-micro.git",
          "clone_url": "https://github.com/trannguyenhung011086/sync-asana-github-zeit-micro.git",
          "svn_url": "https://github.com/trannguyenhung011086/sync-asana-github-zeit-micro",
          "homepage": "https://zeit-asana-github-sync.now.sh",
          "size": 54,
          "stargazers_count": 0,
          "watchers_count": 0,
          "language": "TypeScript",
          "has_issues": true,
          "has_projects": true,
          "has_downloads": true,
          "has_wiki": true,
          "has_pages": false,
          "forks_count": 0,
          "mirror_url": null,
          "archived": false,
          "disabled": false,
          "open_issues_count": 1,
          "license": null,
          "forks": 0,
          "open_issues": 1,
          "watchers": 0,
          "default_branch": "master"
        }
      },
      "_links": {
        "self": {
          "href": "https://api.github.com/repos/trannguyenhung011086/sync-asana-github-zeit-micro/pulls/25"
        },
        "html": {
          "href": "https://github.com/trannguyenhung011086/sync-asana-github-zeit-micro/pull/25"
        },
        "issue": {
          "href": "https://api.github.com/repos/trannguyenhung011086/sync-asana-github-zeit-micro/issues/25"
        },
        "comments": {
          "href": "https://api.github.com/repos/trannguyenhung011086/sync-asana-github-zeit-micro/issues/25/comments"
        },
        "review_comments": {
          "href": "https://api.github.com/repos/trannguyenhung011086/sync-asana-github-zeit-micro/pulls/25/comments"
        },
        "review_comment": {
          "href": "https://api.github.com/repos/trannguyenhung011086/sync-asana-github-zeit-micro/pulls/comments{/number}"
        },
        "commits": {
          "href": "https://api.github.com/repos/trannguyenhung011086/sync-asana-github-zeit-micro/pulls/25/commits"
        },
        "statuses": {
          "href": "https://api.github.com/repos/trannguyenhung011086/sync-asana-github-zeit-micro/statuses/5f16e44b4ff11a8834e80a46da0fb46c29c8cf87"
        }
      },
      "author_association": "OWNER",
      "draft": false,
      "merged": false,
      "mergeable": null,
      "rebaseable": null,
      "mergeable_state": "unknown",
      "merged_by": null,
      "comments": 0,
      "review_comments": 0,
      "maintainer_can_modify": false,
      "commits": 20,
      "additions": 226,
      "deletions": 343,
      "changed_files": 13
    },
    "repository": {
      "id": 210112545,
      "node_id": "MDEwOlJlcG9zaXRvcnkyMTAxMTI1NDU=",
      "name": "sync-asana-github-zeit-micro",
      "full_name": "trannguyenhung011086/sync-asana-github-zeit-micro",
      "private": false,
      "owner": {
        "login": "trannguyenhung011086",
        "id": 16036216,
        "node_id": "MDQ6VXNlcjE2MDM2MjE2",
        "avatar_url": "https://avatars2.githubusercontent.com/u/16036216?v=4",
        "gravatar_id": "",
        "url": "https://api.github.com/users/trannguyenhung011086",
        "html_url": "https://github.com/trannguyenhung011086",
        "followers_url": "https://api.github.com/users/trannguyenhung011086/followers",
        "following_url": "https://api.github.com/users/trannguyenhung011086/following{/other_user}",
        "gists_url": "https://api.github.com/users/trannguyenhung011086/gists{/gist_id}",
        "starred_url": "https://api.github.com/users/trannguyenhung011086/starred{/owner}{/repo}",
        "subscriptions_url": "https://api.github.com/users/trannguyenhung011086/subscriptions",
        "organizations_url": "https://api.github.com/users/trannguyenhung011086/orgs",
        "repos_url": "https://api.github.com/users/trannguyenhung011086/repos",
        "events_url": "https://api.github.com/users/trannguyenhung011086/events{/privacy}",
        "received_events_url": "https://api.github.com/users/trannguyenhung011086/received_events",
        "type": "User",
        "site_admin": false
      },
      "html_url": "https://github.com/trannguyenhung011086/sync-asana-github-zeit-micro",
      "description": null,
      "fork": false,
      "url": "https://api.github.com/repos/trannguyenhung011086/sync-asana-github-zeit-micro",
      "forks_url": "https://api.github.com/repos/trannguyenhung011086/sync-asana-github-zeit-micro/forks",
      "keys_url": "https://api.github.com/repos/trannguyenhung011086/sync-asana-github-zeit-micro/keys{/key_id}",
      "collaborators_url": "https://api.github.com/repos/trannguyenhung011086/sync-asana-github-zeit-micro/collaborators{/collaborator}",
      "teams_url": "https://api.github.com/repos/trannguyenhung011086/sync-asana-github-zeit-micro/teams",
      "hooks_url": "https://api.github.com/repos/trannguyenhung011086/sync-asana-github-zeit-micro/hooks",
      "issue_events_url": "https://api.github.com/repos/trannguyenhung011086/sync-asana-github-zeit-micro/issues/events{/number}",
      "events_url": "https://api.github.com/repos/trannguyenhung011086/sync-asana-github-zeit-micro/events",
      "assignees_url": "https://api.github.com/repos/trannguyenhung011086/sync-asana-github-zeit-micro/assignees{/user}",
      "branches_url": "https://api.github.com/repos/trannguyenhung011086/sync-asana-github-zeit-micro/branches{/branch}",
      "tags_url": "https://api.github.com/repos/trannguyenhung011086/sync-asana-github-zeit-micro/tags",
      "blobs_url": "https://api.github.com/repos/trannguyenhung011086/sync-asana-github-zeit-micro/git/blobs{/sha}",
      "git_tags_url": "https://api.github.com/repos/trannguyenhung011086/sync-asana-github-zeit-micro/git/tags{/sha}",
      "git_refs_url": "https://api.github.com/repos/trannguyenhung011086/sync-asana-github-zeit-micro/git/refs{/sha}",
      "trees_url": "https://api.github.com/repos/trannguyenhung011086/sync-asana-github-zeit-micro/git/trees{/sha}",
      "statuses_url": "https://api.github.com/repos/trannguyenhung011086/sync-asana-github-zeit-micro/statuses/{sha}",
      "languages_url": "https://api.github.com/repos/trannguyenhung011086/sync-asana-github-zeit-micro/languages",
      "stargazers_url": "https://api.github.com/repos/trannguyenhung011086/sync-asana-github-zeit-micro/stargazers",
      "contributors_url": "https://api.github.com/repos/trannguyenhung011086/sync-asana-github-zeit-micro/contributors",
      "subscribers_url": "https://api.github.com/repos/trannguyenhung011086/sync-asana-github-zeit-micro/subscribers",
      "subscription_url": "https://api.github.com/repos/trannguyenhung011086/sync-asana-github-zeit-micro/subscription",
      "commits_url": "https://api.github.com/repos/trannguyenhung011086/sync-asana-github-zeit-micro/commits{/sha}",
      "git_commits_url": "https://api.github.com/repos/trannguyenhung011086/sync-asana-github-zeit-micro/git/commits{/sha}",
      "comments_url": "https://api.github.com/repos/trannguyenhung011086/sync-asana-github-zeit-micro/comments{/number}",
      "issue_comment_url": "https://api.github.com/repos/trannguyenhung011086/sync-asana-github-zeit-micro/issues/comments{/number}",
      "contents_url": "https://api.github.com/repos/trannguyenhung011086/sync-asana-github-zeit-micro/contents/{+path}",
      "compare_url": "https://api.github.com/repos/trannguyenhung011086/sync-asana-github-zeit-micro/compare/{base}...{head}",
      "merges_url": "https://api.github.com/repos/trannguyenhung011086/sync-asana-github-zeit-micro/merges",
      "archive_url": "https://api.github.com/repos/trannguyenhung011086/sync-asana-github-zeit-micro/{archive_format}{/ref}",
      "downloads_url": "https://api.github.com/repos/trannguyenhung011086/sync-asana-github-zeit-micro/downloads",
      "issues_url": "https://api.github.com/repos/trannguyenhung011086/sync-asana-github-zeit-micro/issues{/number}",
      "pulls_url": "https://api.github.com/repos/trannguyenhung011086/sync-asana-github-zeit-micro/pulls{/number}",
      "milestones_url": "https://api.github.com/repos/trannguyenhung011086/sync-asana-github-zeit-micro/milestones{/number}",
      "notifications_url": "https://api.github.com/repos/trannguyenhung011086/sync-asana-github-zeit-micro/notifications{?since,all,participating}",
      "labels_url": "https://api.github.com/repos/trannguyenhung011086/sync-asana-github-zeit-micro/labels{/name}",
      "releases_url": "https://api.github.com/repos/trannguyenhung011086/sync-asana-github-zeit-micro/releases{/id}",
      "deployments_url": "https://api.github.com/repos/trannguyenhung011086/sync-asana-github-zeit-micro/deployments",
      "created_at": "2019-09-22T08:10:56Z",
      "updated_at": "2019-09-22T15:31:04Z",
      "pushed_at": "2019-09-24T06:16:28Z",
      "git_url": "git://github.com/trannguyenhung011086/sync-asana-github-zeit-micro.git",
      "ssh_url": "git@github.com:trannguyenhung011086/sync-asana-github-zeit-micro.git",
      "clone_url": "https://github.com/trannguyenhung011086/sync-asana-github-zeit-micro.git",
      "svn_url": "https://github.com/trannguyenhung011086/sync-asana-github-zeit-micro",
      "homepage": "https://zeit-asana-github-sync.now.sh",
      "size": 54,
      "stargazers_count": 0,
      "watchers_count": 0,
      "language": "TypeScript",
      "has_issues": true,
      "has_projects": true,
      "has_downloads": true,
      "has_wiki": true,
      "has_pages": false,
      "forks_count": 0,
      "mirror_url": null,
      "archived": false,
      "disabled": false,
      "open_issues_count": 1,
      "license": null,
      "forks": 0,
      "open_issues": 1,
      "watchers": 0,
      "default_branch": "master"
    },
    "sender": {
      "login": "trannguyenhung011086",
      "id": 16036216,
      "node_id": "MDQ6VXNlcjE2MDM2MjE2",
      "avatar_url": "https://avatars2.githubusercontent.com/u/16036216?v=4",
      "gravatar_id": "",
      "url": "https://api.github.com/users/trannguyenhung011086",
      "html_url": "https://github.com/trannguyenhung011086",
      "followers_url": "https://api.github.com/users/trannguyenhung011086/followers",
      "following_url": "https://api.github.com/users/trannguyenhung011086/following{/other_user}",
      "gists_url": "https://api.github.com/users/trannguyenhung011086/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/trannguyenhung011086/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/trannguyenhung011086/subscriptions",
      "organizations_url": "https://api.github.com/users/trannguyenhung011086/orgs",
      "repos_url": "https://api.github.com/users/trannguyenhung011086/repos",
      "events_url": "https://api.github.com/users/trannguyenhung011086/events{/privacy}",
      "received_events_url": "https://api.github.com/users/trannguyenhung011086/received_events",
      "type": "User",
      "site_admin": false
    }
  })

  console.log(res)