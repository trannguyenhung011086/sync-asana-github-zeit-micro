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
    console.log(`Pull request data: ${JSON.stringify(githubData)}`);

    // get asana task info
    const task = await getAsanaTask(asanaId);
    console.log(`Found asana task: ${task.name}`);

    const project = getAsanaProject(task);
    console.log(`Found asana project: ${project.name}`);

    const sections = await getAsanaSections(project.gid);
    console.log(`Found asana sections: ${JSON.stringify(sections)}`);

    // add comment to asana task
    await addComment(asanaId, githubData);
    console.log(`Added comment to asana task: ${task.name}`);

    // get section Id to move
    const sectionId = getAsanaSectionId(sections, githubData);
    console.log(`Found section id to move: ${sectionId}`);

    // update asana task to correct section
    await addAsanaTask({ asanaId, projectId: project.gid, sectionId });
    console.log("Updated asana task");
};

module.exports = { sync };