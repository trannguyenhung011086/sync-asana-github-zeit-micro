const asana = require("asana");

const asanaToken = process.env.ASANA_ACCESS_TOKEN;
const client = asana.Client.create({
    defaultHeaders: { "asana-enable": "string_ids,new_sections" }
}).useAccessToken(asanaToken);

const getAsanaTask = async asanaId => {
    const task = await client.tasks.findById(parseInt(asanaId));
    if (!task) throw Error("Failed to find Asana task with id: " + asanaId);
    return task;
};

const addComment = async (asanaId, githubData) => {
    const comment = {
        text: `Pull Request: ${githubData.title}
            By: ${githubData.user.login}
            Url: ${githubData.url}
            Merge from: ${githubData.head}
            Merge to: ${githubData.base}
            State: ${githubData.state}
            Merged: ${githubData.merged}`
    };

    const story = await client.tasks.addComment(parseInt(asanaId), comment);

    if (!story)
        throw Error("Failed to add comment to Asana task with id: " + asanaId);
};

const addAsanaTask = async ({ asanaId, projectId, sectionId }) => {
    const data = {
        project: projectId,
        section: sectionId
    };
    const result = await client.tasks.addProject(asanaId, data);

    if (Object.keys(result).length != 0) {
        throw Error("Failed to change Asana task's section!");
    }
};

const getAsanaProject = asanaTask => {
    let asanaProject;
    for (const project of asanaTask.projects) {
        if (project.name.toLowerCase().includes("sprint")) {
            asanaProject = project;
            break;
        }
    }
    if (!asanaProject)
        throw Error(
            "Failed to get project for Asana task with id: " + asanaTask.id
        );
    return asanaProject;
};

const getAsanaSections = async projectId => {
    let sections = await client.sections.findByProject(projectId);
    if (sections.length === 0) {
        throw Error(
            "Failed to get sections for Asana project with id: " + projectId
        );
    }
    sections = sections.reduce((res, item) => {
        res[item.name] = item.gid;
        return res;
    }, {});
    return sections;
};

module.exports = {
    getAsanaTask,
    addComment,
    addAsanaTask,
    getAsanaProject,
    getAsanaSections
};
