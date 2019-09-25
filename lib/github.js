const getAsanaId = data => {
    const title = data["pull_request"]["title"];
    const body = data["pull_request"]["body"];

    const result = match(title) || match(body);

    if (!result) throw Error("No Asana task ID found!");
    return result[1];
};

function match(toMatch) {
    const exp = /#([0-9]{0,16})/;
    return exp.exec(toMatch);
}

const getAsanaSectionId = (asanaSections, data) => {
    let section;

    if (data.merged === false && data.state === "open") {
        if (data.base === "develop") section = "In Review";
        if (data.base === "release") section = "In Review";
        if (data.base === "master") section = "In Review";
    }

    if (data.merged === true && data.state == "closed") {
        if (data.base === "develop") section = "On Test";
        if (data.base === "release") section = "On Staging";
        if (data.base === "master") section = "Done";
    }

    return asanaSections[section];
};

module.exports = { getAsanaId, getAsanaSectionId };
