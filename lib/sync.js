const { getAsanaId, getAsanaSectionId } = require("./github.js");
const {
    getAsanaTask,
    addComment,
    addAsanaTask,
    getAsanaProject,
    getAsanaSections
} = require("./asana.js");

const sync = async data => {
    // get asana task id from pull request
    const asanaId = getAsanaId(data);
    console.log(`Found asana id: ${asanaId}`);

    // get pull request data
    const githubData = {
        title: data["pull_request"]["title"],
        url: data["pull_request"]["url"],
        state: data["pull_request"]["state"],
        user: {
            login: data["pull_request"]["user"]["login"]
        },
        head: data["pull_request"]["head"]["ref"],
        base: data["pull_request"]["base"]["ref"],
        merged: data["pull_request"]["merged"]
    };
    console.log(`Pull request data: ${githubData}`);

    // get asana task info
    const task = await getAsanaTask(asanaId);
    const project = getAsanaProject(task);
    const sections = await getAsanaSections(project.id);
    console.log(
        `Found asana task ${task.name} in project ${project.name} with sections ${sections}`
    );

    // add comment to asana task
    await addComment(asanaId, githubData);
    console.log(`Added comment to asana task: ${task.name}`);

    // update section for asana task
    const sectionId = getAsanaSectionId(sections, githubData);
    await addAsanaTask({ asanaId, projectId: project.id, sectionId });
};

module.exports = { sync };
