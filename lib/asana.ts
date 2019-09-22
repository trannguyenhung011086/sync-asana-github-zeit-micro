import asana from "asana";

const asanaToken = process.env.ASANA_ACCESS_TOKEN as string;
const client = asana.Client.create().useAccessToken(asanaToken);

const getAsanaTask = async (asanaId: string) => {
    const task = await client.tasks.findById(parseInt(asanaId));
    if (!task) throw Error("Failed to find Asana task with id: " + asanaId);
    return task;
};

const addComment = async (asanaId: string, githubData: any) => {
    const comment: asana.resources.Tasks.CommentParams = {
        text: `Pull Request: ${githubData.title}
        \nUrl: ${githubData.url}
        \nState: ${githubData.state}
        \nBy: ${githubData.user.login}`
    };
    try {
        const story = await client.tasks.addComment(parseInt(asanaId), comment);

        if (!story)
            throw Error(
                "Failed to add comment to Asana task with id: " + asanaId
            );
        return story;
    } catch (e) {
        throw e;
    }
};

export { getAsanaTask, addComment };
