const asana = require("asana");

const asanaToken = process.env.ASANA_ACCESS_TOKEN;
const client = asana.Client.create().useAccessToken(asanaToken);

const getAsanaSections = async projectId => {
    const sections = await client.sections.findByProject(projectId);
    console.log(sections);
    if (sections.length == 0) {
        throw Error(
            "Failed to get sections for Asana project with id: " + projectId
        );
    }
    return sections.data;
};

getAsanaSections(1139944293671018);
