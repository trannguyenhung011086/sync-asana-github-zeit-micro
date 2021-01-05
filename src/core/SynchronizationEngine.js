import { matchOnKeys } from '../lib/objectUtilities'

class SynchronizationEngine {
    constructor(configuration, actionFactory, asanaClient) {
        this.configuration = configuration
        this.actionFactory = actionFactory
        this.asanaClient = asanaClient
    }

    getMatchingFlow = (flows, pullRequest) => {
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

    getCurrentProjectSection = (taskMemberships, projectId) => {
        const membership = taskMemberships
            .find(
                membership => membership.project.gid === projectId,
            )
    
        return membership?.section
    }

    getProjectConfigurations = (projects) => {
        return projects.filter((project) => this.configuration.projects.some(configuration => project.gid == configuration.id))
    }

    getAsanaTaskIds = (pullRequest) => {
        const matchIds = (toMatch) => {
            const result = toMatch.match(/(\d{16})(?!.*\d{16})/g);
      
            return result
                ? result.map(item => item.replace('#', '').replace('ref', ''))
                : '';
        }

        const taskIds = []

        for (const commit of pullRequest.commits) {
            const matchedCommit = matchIds(commit['commit']['message'])
            taskIds.push(...matchedCommit)
        }

        for (const comment of pullRequest.comments) {
            const matchedComment = matchIds(comment['body'])
            taskIds.push(...matchedComment)
        }

        return taskIds
    }

    processPullRequest = async (pullRequest) => {
        const asanaTaskIds = this.getAsanaTaskIds(pullRequest)

        if (asanaTaskIds.lengh === 0) {
            console.log(`Skiping processing of pull request: ${pullRequest.url}. No asana ids could be found.`)
        }
    
        for (const asanaTaskId of asanaTaskIds) {
            const task = await this.asanaClient.getAsanaTask(asanaTaskId);
            const projectConfigurations = this.getProjectConfigurations(task.projects)
    
            if (projectConfigurations.length === 0) {
                console.log(`No matching configurations were found for task: ${task.gid}. Skiping processing of task for pull request: ${pullRequest.url}`)
            }
        
            for (const projectConfiguration of projectConfigurations) {
                const currentSection = this.getCurrentProjectSection(task.memberships, projectConfiguration.id)
        
                // no need to process if were in a completed state.
                if (currentSection && !projectConfiguration.completedSections.includes(currentSection.gid)) {
                    const flow = this.getMatchingFlow(projectConfiguration.flows, pullRequest)
                    const actions = this.actionFactory.buildActions(flow.actions)
    
                    // execute flow actions
                    const context = { pullRequest, task, projectId: projectConfiguration.id }
                    actions.forEach(action => action.execute(context))
                }
            }
        }
    }
}

export default SynchronizationEngine