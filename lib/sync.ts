import { getAsanaId } from "./github";
import {
    getAsanaTask,
    addComment,
    addAsanaTask,
    getAsanaProject,
    getAsanaSections,
    getAsanaSectionId
} from "./asana";

const sync = async (data: any) => {
    // get asana task id from pull request
    const asanaId = getAsanaId(data);
    console.log("Found asana id: " + asanaId);

    // get asana task
    const asanaTask = await getAsanaTask(asanaId);
    console.log("Found asana task: " + asanaTask.name);

    // add comment to asana task
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

    await addComment(asanaId, githubData);
    console.log("Added comment to asana task: " + asanaTask.name);

    // update section for asana task when pull request is merged
    if (!githubData.merged) {
        console.log(
            "Pull request is not merged. No update section for Asana task: " +
                asanaTask.name
        );
    }
    if (githubData.merged) {
        const project = getAsanaProject(asanaTask);
        const sections = await getAsanaSections(project.id);
        const sectionId = getAsanaSectionId(sections, githubData);
        await addAsanaTask({ asanaId, projectId: project.id, sectionId });
    }
};

export { sync };
