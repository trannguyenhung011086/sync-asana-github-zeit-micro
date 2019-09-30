const { getAsanaIds, getAsanaSectionId } = require("./github.js");
const {
    getAsanaTask,
    addComment,
    addAsanaTask,
    getAsanaProject,
    getAsanaSections
} = require("./asana.js");

const sync = async data => {
    try {
        // get pull request data
        const githubData = {
            title: data["pull_request"]["title"],
            body: data["pull_request"]["body"],
            url: data["pull_request"]["html_url"],
            state: data["pull_request"]["state"],
            user: {
                login: data["pull_request"]["user"]["login"]
            },
            head: data["pull_request"]["head"]["ref"],
            base: data["pull_request"]["base"]["ref"],
            merged: data["pull_request"]["merged"]
        };
        console.log(`Pull request data: ${JSON.stringify(githubData)}`);

        // get asana task ids from pull request
        const asanaIds = getAsanaIds(data);
        console.log(`Found asana ids: ${asanaIds}`);

        for (const asanaId of asanaIds) {
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
            console.log(`Updated asana task: ${task.name}`);
        }
    } catch (e) {
        console.log(e);
        return e;
    }
};

module.exports = { sync };
