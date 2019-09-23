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

const addAsanaTask = async ({
    asanaId,
    projectId,
    sectionId
}: {
    asanaId: string;
    projectId: number;
    sectionId: number;
}) => {
    const data: asana.resources.Tasks.AddProjectParams = {
        project: projectId,
        section: sectionId
    };
    const result = await client.tasks.addProject(parseInt(asanaId), data);

    if (Object.keys(result).length != 0) {
        throw Error("Failed to change Asana task's section!");
    }
};

const getAsanaProject = (asanaTask: asana.resources.Tasks.Type) => {
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

const getAsanaSections = async (projectId: number) => {
    const sections = await client.sections.findByProject(projectId);
    if (sections.length === 0) {
        throw Error(
            "Failed to get sections for Asana project with id: " + projectId
        );
    }
    return sections;
};

const getAsanaSectionId = (
    asanaSections: asana.resources.Tasks.Type[],
    githubData: any
): number => {
    let section;
    if (githubData.base === "develop") section = "On Test";
    if (githubData.base === "staging") section = "On Staging";
    if (githubData.base === "master") section = "Done";

    let sectionId;
    for (let item of asanaSections) {
        if (item.name === section) {
            sectionId = item.id;
            break;
        }
    }
    if (!sectionId)
        throw Error("Failed to get section id for section: " + section);
    return sectionId;
};

export {
    getAsanaTask,
    addComment,
    addAsanaTask,
    getAsanaProject,
    getAsanaSections,
    getAsanaSectionId
};
