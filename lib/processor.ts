import { getAsanaId } from "./github";
import { getAsanaTask, addComment } from "./asana";

const processor = async (data: any) => {
    // get asana task ID from pull request
    const asanaId = getAsanaId(data);
    console.log("Found asana id: " + asanaId);

    // find asana task
    const asanaTask = await getAsanaTask(asanaId);
    console.log("Found asana task: " + asanaTask.name);

    // add comment to asana task
    const githubData = {
        title: data["pull_request"]["title"],
        issue_url: data["pull_request"]["issue_url"]
    };
    const story = await addComment(asanaId, githubData);
    console.log("Added comment to asana task: " + story.name);

    // update status for asana task

    return story;
};

export { processor };
