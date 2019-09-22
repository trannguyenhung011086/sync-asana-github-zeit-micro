import { getAsanaId } from "./github";
import { getAsanaTask, addComment } from "./asana";
const log = require("debug-level");

const processor = async (data: any) => {
    // get asana task ID from pull request
    const asanaId = getAsanaId(data);
    log.info("Found asana id: " + asanaId);

    // find asana task
    const asanaTask = await getAsanaTask(asanaId);
    log.info("Found asana task: " + asanaTask.name);

    // add comment to asana task
    const githubData = {
        title: data["pull_request"]["title"],
        url: data["pull_request"]["url"],
        state: data["pull_request"]["state"],
        user: {
            login: data["pull_request"]["user"]["login"]
        }
    };
    log.info(githubData);

    const story = await addComment(asanaId, githubData);
    log.info("Added comment to asana task: " + story.name);

    // update status for asana task

    return story;
};

export { processor };
