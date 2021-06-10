const configuration = {
	projects: [
		{
			id: '1179370212192146',
			name: 'WEB [Developing] Workflow', // just metadata
			completedSections: ['1179370602973176', '1180011511871946'],
			flows: [
				{
					match: {
						pullRequest: {
							merged: false,
							draft: true,
							state: 'open'
						}
					},
					actions: [
						{
							type: 'setCustomField',
							value: {
								id: '1164289210145661',
								value: '1158171085097945'
							}
						},
						{
							type: 'setSection',
							value: '1179370602973172'
						},
						{
							type: 'comment',
							value: `Pull request titled '{{pullRequest.title}}' from {{pullRequest.user.login}} CREATED.
                                    URL: {{pullRequest.url}}
                                    Branch '{{pullRequest.head}}' will be merging to '{{pullRequest.base}}
                                    Ticket moved to 'In Testing'.`
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
					actions: [
						{
							type: 'setCustomField',
							value: {
								id: '1164289210145661',
								value: '1158171085097945'
							}
						},
						{
							type: 'setSection',
							value: '1179370602973172'
						},
						{
							type: 'comment',
							value: `Pull request titled '{{pullRequest.title}}' from {{pullRequest.user.login}} CREATED.
                                    URL: {{pullRequest.url}}
                                    Branch '{{pullRequest.head}}' will be merging to '{{pullRequest.base}}
                                    Ticket moved to 'In Testing'.`
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
					actions: [
						{
							type: 'setCustomField',
							value: {
								id: '1164289210145661',
								value: '1158171085097948'
							}
						},
						{
							type: 'setSection',
							value: '1179370602973176'
						},
						{
							type: 'comment',
							value: `Pull request titled '{{pullRequest.title}}' from {{pullRequest.user.login}} MERGED.
									*This ticket will be fuly live in approximately 1h 15min!*
                                    URL: {{pullRequest.url}}
                                    Body: {{pullRequest.body}}
                                    Branch '{{pullRequest.head}}' will be merging to '{{pullRequest.base}}
                                    Ticket moved to 'Done'.
                                    Branch '{{pullRequest.head}}' is merged to '{{githubData.base}}'.
                                    PR is now {{pullRequest.state}}.
                                    Commits: {{pullRequest.commits}}`
						}
					]
				}
			]
		}
	]
}

export default configuration
