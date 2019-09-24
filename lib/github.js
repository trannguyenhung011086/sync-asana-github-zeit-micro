const getAsanaId = data => {
    const title = data["pull_request"]["title"];
    const body = data["pull_request"]["body"];

    return match(title) || match(body);
};

function match(toMatch) {
    const exp = /#([0-9]{0,16}).+/;
    const match = exp.exec(toMatch);

    if (!match) throw Error("No Asana task ID found!");
    return match[1];
}

const getAsanaSectionId = (asanaSections, data) => {
    let section;

    if (data.merged === false && data.state === "open") {
        if (data.base === "develop") section = "In Review";
        if (data.base === "staging") section = "Test Done";
        if (data.base === "master") section = "Production Ready";
    }

    if (data.merged === true && data.state == "closed") {
        if (data.base === "develop") section = "On Test";
        if (data.base === "staging") section = "On Staging";
        if (data.base === "master") section = "Done";
    }

    return asanaSections[section];
};

module.exports = { getAsanaId, getAsanaSectionId };
