const {
    getAsanaTask,
    addComment,
    addAsanaTask,
    getAsanaProject,
    getAsanaSections
} = require("./lib/asana.js");

const asanaId = "1140905340811780";

async function test() {
    // get asana task info
    const task = await getAsanaTask(asanaId);
    console.log(`Found asana task: ${task.name}`);

    const project = getAsanaProject(task);
    console.log(`Found asana project: ${project.name}`);
    console.log(project);

    const sections = await getAsanaSections(project.gid);
    console.log(`Found asana sections: ${JSON.stringify(sections)}`);

    // add comment to asana task
    // await addComment(asanaId, githubData);
    // console.log(`Added comment to asana task: ${task.name}`);
}

// test();

function match(toMatch) {
    const exp = /#([0-9]{0,16}).+/;
    const match = exp.exec(toMatch);
    console.log(match[1]);

    if (!match) throw Error("No Asana task ID found!");
    return match[0];
}

match("ref #1140905340811780merge staging");
