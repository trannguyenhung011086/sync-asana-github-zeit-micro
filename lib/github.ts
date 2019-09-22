const getAsanaId = (data: any) => {
    const title = data["pull_request"]["title"];
    const body = data["pull_request"]["body"];

    return match(title || match(body));
};

function match(toMatch: string) {
    const exp = /^#([0-9]{0,16})\s+.*/;
    const match = exp.exec(toMatch);

    if (!match) throw Error("No Asana task ID found!");

    return match[1];
}

export { getAsanaId };
