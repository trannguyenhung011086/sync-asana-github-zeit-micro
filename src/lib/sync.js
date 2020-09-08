const { getPullRequestData, getAsanaIds, getAsanaSectionId } = require('./github.js');
const { getAsanaTask, addComment, addAsanaTask, getAsanaProject, 
    getAsanaSections, updateTaskStatusToInProgress, updateTaskStatusToQAReady, updateTaskStatusToDeployable } = require('./asana.js');

exports.syncGithubToAsana = async (data) => {
    try {
        // get pull request data
        const githubData = await getPullRequestData(data);
        console.log(`Pull request data: ${JSON.stringify(githubData)}`);

        if(!githubData || githubData.length === 0){
            console.log(`syncGithubToAsana(): No Github data to sync! Probably a deleted commit.`);
            return null;
        }

        // get asana task ids from pull request
        const asanaIds = await getAsanaIds(data);
        console.log(`Found asana ids: ${asanaIds}`);

        for (const asanaId of asanaIds) {
            console.log(`Processing asana task: ${asanaId}`);
            try {
                // get asana task info
                const task = await getAsanaTask(asanaId);
                console.log(`Found asana task: ${task.name}`);

                const project = getAsanaProject(task);
                console.log(`Found asana project: ${project.name}`);

                const sections = await getAsanaSections(project.gid);
                console.log(
                    `Found asana sections: ${JSON.stringify(sections)}`,
                );

                // get current section
                const currentSection = task.memberships
                .filter(
                    membership => membership.project.name === project.name,
                )
                .map(item => item.section.name)[0];

                console.log(`Current section of asana task: ${currentSection}`);

                if (currentSection !== 'Done' || currentSection !== 'Closed') {
                    // get section to move to
                    const section = getAsanaSectionId(sections, githubData);

                    if(section?.sectionId) {
                        if(currentSection === section.sectionName) { // Section not changed.
                            return;
                        }

                        console.log(`Found section to move: ${section.sectionName}: ${section.sectionId}`);

                        await addComment(asanaId, githubData, currentSection, section.sectionName);
                        console.log(`Added comment to asana task: ${task.name}`);

                        // update task to correct custom field status for "Status"
                        switch(section.sectionName) {
                            case 'In Progress':
                                await updateTaskStatusToInProgress(asanaId);
                            break;
                            case 'QA Ready':
                                await updateTaskStatusToQAReady(asanaId);
                            break;
                            case 'Deployable':
                                await updateTaskStatusToDeployable(asanaId);
                            break;
                        }
                        
                        // update task to correct section (column)
                        await addAsanaTask({
                            asanaId,
                            projectId: project.gid,
                            sectionId: section.sectionId
                        });
                    } else {
                        console.log('Valid section not found in project.');
                    }
                } else {
                    console.log('Ticket is Done or Closed. Doing nothing.');
                }

                console.log(`Updated asana task: ${task.name}`);
            } catch (e) {
                console.log(`Couldn't update Asana task: ${e}`);
                throw e;
            }
        }
    } catch (e) {
        console.log(e);
        throw e;
    }
}
