const asanaToken = process.env.ASANA_ACCESS_TOKEN;
const asana = require('asana');
const client = asana.Client.create({ defaultHeaders: { 'asana-enable': 'string_ids,new_sections' },}).useAccessToken(asanaToken);

const getAsanaTask = async (asanaId) => {
    const task = await client.tasks.findById(asanaId);
    if (!task) {
        throw Error('Failed to find Asana task with id: ' + asanaId);
    }
    return task;
}

exports.getAsanaTask = getAsanaTask;

exports.addComment = async (asanaId, githubData) => {
    // Only post comment once merged
    if(githubData?.merged === false) {
        return;
    }

    const comment = {
        text: `Pull Request ${githubData.url} from ${githubData.user.login}
                Title: ${githubData.title} - Body: ${githubData.body}
                From: ${githubData.head} - To: ${githubData.base} - State: ${githubData.state} - Merged: ${githubData.merged}
                Commits: ${githubData.commits}`,
    };

    const story = await client.tasks.addComment(asanaId, comment);

    if (!story) {
        throw Error('Failed to add comment to Asana task with id: ' + asanaId);
    }
}

exports.addAsanaTask = async ({ asanaId, projectId, sectionId }) => {
    const data = {
        project: projectId,
        section: sectionId,
    };
    const result = await client.tasks.addProject(asanaId, data);

    if (Object.keys(result).length != 0) {
        throw Error("Failed to change Asana task's section!");
    }
}

exports.getAsanaProject = (asanaTask) => {
    let asanaProject;
    for (const project of asanaTask.projects) {
        console.log(`Project with name '${project.name}' has this data: ${JSON.stringify(project)}`)
        if (project.gid === '1179370212192146') {
            asanaProject = project;
            break;
        }
    }
    if (!asanaProject)
        throw Error(
            'Failed to get project for Asana task with id: ' +
            asanaTask.gid);
    return asanaProject;
}

exports.getAsanaSections = async (projectId) => {
    let sections = await client.sections.findByProject(projectId);
    if (sections.length === 0) {
        throw Error(
            'Failed to get sections for Asana project with id: ' +
            projectId);
    }
    sections = sections.reduce((res, item) => {
        res[item.name] = item.gid;
        return res;
    }, {});
    return sections;
}

exports.updateTaskStatusToQAReady = async (taskId) => {
    // Set to QA Ready
    //TODO: Way too static!!

    const task = await getAsanaTask(taskId);
    const newFieldData = task.custom_fields;

    for (var i = 0; i < newFieldData.length; i++) {
        if(newFieldData[i].gid === '1164289210145661') {
            newFieldData[i].enum_value.gid = '1182837669988980';
            newFieldData[i].enum_value.color = 'aqua';
            newFieldData[i].enum_value.enabled = true;
            newFieldData[i].enum_value.name = 'QA Ready';
        }
    }

    const newData = { 
        ...task,
        custom_fields: newFieldData
    };
    console.log('fuckin new data: ' + JSON.stringify(newData));
    await client.tasks.updateTask(taskId, newData);
}