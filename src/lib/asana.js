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

exports.addComment = async (asanaId, githubData, movedFromSection, movingToSection) => {
    let comment = '';

    const userString = githubData?.user?.login ? ` from ${githubData.user.login}` : ''

    switch(movingToSection) {
        case 'In Progress':
            if(movedFromSection !== 'In Progress') {
                comment = {
                    text: `Pull request titled '${githubData.title}'${userString} CREATED.
                            URL: ${githubData.url}
                            Ticket moved to 'In Progress'.
                            Branch '${githubData.head}' will be merging to '${githubData.base}'`
                };
            } else {
                comment = {
                    text: `Pull request titled '${githubData.title}' ${userString} CREATED.
                            URL: ${githubData.url}
                            Branch '${githubData.head}' will be merging to '${githubData.base}'`
                };
            }
            break;
        case 'Ready for Review':
            if(movedFromSection !== 'In Progress') {
                comment = {
                    text: `Pull request titled '${githubData.title}'${userString} CREATED.
                            URL: ${githubData.url}
                            Ticket moved to 'Ready For Review'.
                            Branch '${githubData.head}' will be merging to '${githubData.base}'`
                };
            } else {
                comment = {
                    text: `Pull request titled '${githubData.title}'${userString} OUT OF DRAFT.
                            URL: ${githubData.url}
                            Branch '${githubData.head}' will be merging to '${githubData.base}'`
                };
            }
            break;
        case 'QA Ready':
            comment = {
                text: `Pull request titled '${githubData.title}'${userString} MERGED.
                        URL: ${githubData.url}
                        Body: ${githubData.body}
                        Ticket moved to 'QA Ready'.
                        Branch '${githubData.head}' is merged to '${githubData.base}'.
                        PR is now ${githubData.state}.
                        Commits: ${githubData.commits}`
            };
            break;
        case 'Deployable':
            comment = {
                text: `Pull request titled '${githubData.title}'${userString} DEPLOYABLE.
                        URL: ${githubData.url}
                        Ticket moved to 'Deployable'.`
            };
            break;
    }

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

const setTicketStatus = async (taskId, statusGid) => {
    var newData = { 
        'custom_fields': {
            '1164289210145661': statusGid
    }
};

await client.tasks.updateTask(taskId, newData);
}

exports.updateTaskStatusToInProgress = async (taskId) => {
    await setTicketStatus(taskId, '1164289210145663');
}

exports.updateTaskStatusToReadyForReview = async (taskId) => {
    await setTicketStatus(taskId, '1164315670581599');
}

exports.updateTaskStatusToQAReady = async (taskId) => {
    await setTicketStatus(taskId, '1182837669988980');
}

exports.updateTaskStatusToDeployable = async (taskId) => {
    await setTicketStatus(taskId, '1164289210145667');
}