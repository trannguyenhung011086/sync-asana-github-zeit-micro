const configuration = {
    projects: [
        {
            id: 1179370212192146,
            name: "WEB [Developing] Workflow", // just metadata
            completedSections: [1179370602973176, 1180011511871946],
            flows:[
                {
                    match: { 
                        pullRequest: {
                            merged: false,
                            draft: true,
                            state: 'open'
                        }
                    },
                    types:[
                        {
                            type: "setCustomField",
                            value: {
                                id: 1164289210145661,
                                value: 1164289210145663
                            }
                        },
                        {
                            type: "setSection",
                            value: 1179370602973168
                        },
                        {
                            type: "comment",
                            value: `Pull request titled '{{pullRequest.title}}' from {{pullRequest.user.login}} CREATED.
                                    URL: {{pullRequest.url}}
                                    Branch '{{pullRequest.head}}' will be merging to '{{pullRequest.base}}
                                    Ticket moved to 'In Progress'.`
                        }
                    ]
                },
                {
                    match: { 
                        pullRequest: {
                            merged: false,
                            draft: false,
                            state: 'open'
                        }
                    },
                    types:[
                        {
                            type: "setCustomField",
                            value: {
                                id: 1164289210145661,
                                value: 1164315670581599
                            }
                        },
                        {
                            type: "setSection",
                            value: 1180261910562366
                        },
                        {
                            type: "comment",
                            value: `Pull request titled '{{pullRequest.title}}' from {{pullRequest.user.login}} CREATED.
                                    URL: {{pullRequest.url}}
                                    Branch '{{pullRequest.head}}' will be merging to '{{pullRequest.base}}
                                    Ticket moved to 'Ready For Review'.`
                        }
                    ]
                },
                {
                    match: { 
                        pullRequest: {
                            merged: true,
                            draft: false,
                            state: 'closed',
                            base: 'develop'
                        }
                    },
                    types:[
                        {
                            type: "setCustomField",
                            value: {
                                id: 1164289210145661,
                                value: 1182837669988980
                            }
                        },
                        {
                            type: "setSection",
                            value: 1182832111078239
                        },
                        {
                            type: "comment",
                            value: `Pull request titled '{{pullRequest.title}}' from {{pullRequest.user.login}} MERGED.
                                    URL: {{pullRequest.url}}
                                    Body: {{pullRequest.body}}
                                    Branch '{{pullRequest.head}}' will be merging to '{{pullRequest.base}}
                                    Ticket moved to 'QA Ready'.
                                    Branch '{{pullRequest.head}}' is merged to '{{githubData.base}}'.
                                    PR is now {{pullRequest.state}}.
                                    Commits: {{pullRequest.commits}}`
                        }
                    ]
                },
                {
                    match: { 
                        pullRequest: {
                            merged: true,
                            draft: false,
                            state: 'closed',
                            base: 'master'
                        }
                    },
                    types:[
                        {
                            type: "setCustomField",
                            value: {
                                id: 1164289210145661,
                                value: 1164289210145667
                            }
                        },
                        {
                            type: "setSection",
                            value: 1180261910562368
                        },
                        {
                            type: "comment",
                            value: `Pull request titled '{{pullRequest.title}}' from {{pullRequest.user.login}} DEPLOYABLE.
                                    URL: {{pullRequest.url}}
                                    Ticket moved to 'Deployable'.`
                        }
                    ]
                }
            ]
        }
    ]    
}

export default configuration