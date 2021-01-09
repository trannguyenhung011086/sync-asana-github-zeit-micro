import ActionFactory, { ActionDefinition } from './actions/ActionFactory'
import { matchOnKeys } from '../lib/objectUtilities'

type Match = {
	pullRequest: Object
}

type Flow = {
	match: Match,
	actions: ActionDefinition[]
}

type Project = {
	id: string,
	name?: string,
	completedSections: string[],
	flows: Flow[]
}

type SynchronizationConfiguration = {
	projects: Project[]
}

class SynchronizationEngine {
	configuration: SynchronizationConfiguration
	actionFactory: ActionFactory
	asanaClient: any

	constructor(configuration: SynchronizationConfiguration, actionFactory: ActionFactory, asanaClient) {
		this.configuration = configuration
		this.actionFactory = actionFactory
		this.asanaClient = asanaClient
	}

	getMatchingFlow(flows: Flow[], pullRequest) {
		// more specific match criteria should be considered first.
		const sortedFlows = flows.sort((a, b) => {
			if (Object.keys(a.match.pullRequest).length > Object.keys(b.match.pullRequest).length) {
				return -1
			} else if (Object.keys(a.match.pullRequest).length < Object.keys(b.match.pullRequest).length) {
				return 1
			}

			return 0
		})

		return sortedFlows.find(flow => matchOnKeys(flow.match.pullRequest, pullRequest))
	}

	getCurrentProjectSection(taskMemberships, projectId) {
		const membership = taskMemberships.find(membership => membership.project.gid == projectId)

		return membership?.section
	}

	getProjectConfigurations(projects): Project[] {
		return this.configuration.projects.filter(configuration =>
			projects.some(project => project.gid == configuration.id)
		)
	}

	getAsanaTaskIds(pullRequest): string[] {
		const matchIds = (toMatch: string): string[] | string => {
			const result = toMatch.match(/(\d{16})(?!.*\d{16})/g)

			return result ? result.map(item => item.replace('#', '').replace('ref', '')) : ''
		}

		const taskIds = []
		const contentToCheck = [pullRequest.title, pullRequest.body, pullRequest.head]

		for (const content of contentToCheck) {
			const matchedValues = matchIds(content)
			taskIds.push(...matchedValues)
		}

		for (const commit of pullRequest.commits) {
			const matchedValues = matchIds(commit['commit']['message'])
			taskIds.push(...matchedValues)
		}

		for (const comment of pullRequest.comments) {
			const matchedValues = matchIds(comment['body'])
			taskIds.push(...matchedValues)
		}

		return taskIds
	}

	async processPullRequest(pullRequest) {
		const asanaTaskIds = this.getAsanaTaskIds(pullRequest)

		if (asanaTaskIds.length === 0) {
			// 1/2 maybe return an http status reason is better. let the handler return the status code.) and the message.
			console.log(`Skipping processing of pull request: ${pullRequest.url}. No asana ids could be found.`)
		}

		for (const asanaTaskId of asanaTaskIds) {
			const task = await this.asanaClient.tasks.findById(asanaTaskId)
			const projectConfigurations = this.getProjectConfigurations(task.projects)

			if (projectConfigurations.length === 0) {
				// 2/2 maybe return an http status (reason is better. let the handler return the status code.) and the message.
				console.log(
					`No matching configurations were found for task: ${task.gid}. Skiping processing of task for pull request: ${pullRequest.url}`
				)
			}

			for (const projectConfiguration of projectConfigurations) {
				const currentSection = this.getCurrentProjectSection(task.memberships, projectConfiguration.id)

				// no need to process if were in a completed state.
				const looseEquality = el => el == currentSection?.gid
				if (!projectConfiguration.completedSections.some(looseEquality)) {
					const flow = this.getMatchingFlow(projectConfiguration.flows, pullRequest)

					if (flow) {
						const actions = this.actionFactory.buildActions(flow.actions)

						// execute flow actions
						const context = { pullRequest, task, projectId: projectConfiguration.id }
						const actionTasks = actions.map(action => action.execute(context))

						await Promise.all(actionTasks)
					} else {
						console.log(
							`No matching flow located for task: ${task.gid} and project configuration: ${projectConfiguration}`
						)
					}
				}
			}
		}
	}
}

export default SynchronizationEngine
