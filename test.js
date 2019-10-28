// const {
//     getAsanaTask,
//     addComment,
//     addAsanaTask,
//     getAsanaProject,
//     getAsanaSections
// } = require("./lib/asana.js");
//
// const asanaId = "1140905340811780";

async function test(toMatch) {
    // // get asana task info
    // const task = await getAsanaTask(asanaId);
    // console.log(`Found asana task: ${task.name}`);
    //
    // const project = getAsanaProject(task);
    // console.log(`Found asana project: ${project.name}`);
    // console.log(project);
    //
    // const sections = await getAsanaSections(project.gid);
    // console.log(`Found asana sections: ${JSON.stringify(sections)}`);

    // add comment to asana task
    // await addComment(asanaId, githubData);
    // console.log(`Added comment to asana task: ${task.name}`);
    const exp = /#([0-9]{16})/;
    // const match = exp.match(toMatch);
    let match = toMatch.match(/#([0-9]{16})/g);
    if (match) match = match.map(item => item.replace("#", ""));
    console.log(match);
}

test(
    "No margin between project header and content below it \nref #1146764913863934\nref #114659598107265",
);
