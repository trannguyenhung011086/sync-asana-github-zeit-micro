const asana = require("asana");

const asanaToken = process.env.ASANA_ACCESS_TOKEN;
const client = asana.Client.create().useAccessToken(asanaToken);

const getAsanaSections = async projectId => {
    console.log(await client.sections.findByProject(1139944293671018));
    const sections = await client.projects.sections(projectId);
    if (sections.data.length == 0) {
        throw Error(
            "Failed to get sections for Asana project with id: " + projectId
        );
    }
    return sections.data;
};

getAsanaSections(1139944293671018);
