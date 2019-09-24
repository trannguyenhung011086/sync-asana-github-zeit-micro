const asana = require("asana");

const asanaToken = process.env.ASANA_ACCESS_TOKEN;
const client = asana.Client.create({
    defaultHeaders: { "asana-enable": "string_ids,new_sections" }
}).useAccessToken(asanaToken);

const getAsanaSections = async projectId => {
    let sections = await client.sections.findByProject(projectId);
    if (sections.length == 0) {
        throw Error(
            "Failed to get sections for Asana project with id: " + projectId
        );
    }
    sections = sections.reduce((res, item) => {
        res[item.name] = item.gid;
        return res;
    }, {});
    console.log(sections);
    return sections;
};

const addAsanaTask = async ({ asanaId, projectId, sectionId }) => {
    const data = {
        project: projectId,
        section: sectionId
    };
    const result = await client.tasks.addProject(asanaId, data);

    if (Object.keys(result).length != 0) {
        throw Error("Failed to change Asana task's section!");
    }

    console.log(result);
};

getAsanaSections("1139944293671018");

// addAsanaTask({
//     asanaId: "1140905340811780",
//     projectId: "1139944293671018",
//     sectionId: "1139944293671019"
// });
