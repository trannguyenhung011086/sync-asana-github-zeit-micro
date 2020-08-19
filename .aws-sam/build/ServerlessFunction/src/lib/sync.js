// import { getPullRequestData, getAsanaIds, getAsanaSectionId } from './github.js';
// import { getAsanaTask, addComment, addAsanaTask, getAsanaProject, getAsanaSections } from './asana.js';
import { getPullRequestData, getAsanaIds } from './github.js';
import { getAsanaTask, addComment } from './asana.js';

async function syncGithubToAsana(data) {
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

                // const project = getAsanaProject(task);
                // console.log(`Found asana project: ${project.name}`);

                // const sections = await getAsanaSections(project.gid);
                // console.log(
                //     `Found asana sections: ${JSON.stringify(sections)}`,
                // );

                // add comment to asana task
                await addComment(asanaId, githubData);
                console.log(`Added comment to asana task: ${task.name}`);

                // // get current section
                // const currentSection = task.memberships
                //     .filter(
                //         membership => membership.project.name === project.name,
                //     )
                //     .map(item => item.section.name)[0];

                // console.log(`Current section of asana task: ${currentSection}`);

                // // move task if not in done section
                // if (
                //     currentSection.toLowerCase() != 'in progress' &&
                //     currentSection.toLowerCase() != 'done'
                // ) {
                //     // get section Id to move
                //     const sectionId = getAsanaSectionId(sections, githubData);
                //     console.log(`Found section id to move: ${sectionId}`);

                //     // update asana task to correct section
                //     await addAsanaTask({
                //         asanaId,
                //         projectId: project.gid,
                //         sectionId,
                //     });
                // }

                console.log(`Updated asana task: ${task.name}`);
            } catch (e) {
                console.log(e);
                continue;
            }
        }
    } catch (e) {
        console.log(e);
        throw e;
    }
}

export default syncGithubToAsana;
