import configuration from '../config'

import { getAsanaTask } from './asana'
import { getAsanaTaskIds } from './github'

export const getProjectConfigurations = (task) => {
    return task.projects.filter((project) => configuration.projects.some(configuration => project.gid == configuration.id))
}

export const getMatchingFlow = (flows, pullRequest) => {
    const matchOnKeys = (flow, pullRequest) => {
        let valuesMatch = true

        for (const key in flow.match.pullRequest) {
            if (flow.match.pullRequest[key] != pullRequest[key]) {
                valuesMatch = false;
                break
            }
        }

        return valuesMatch
    }

    // more specific match criteria should be considered first.
    const sortedFlows = flows.sort((a, b) => {
        if (Object.keys(a.match.pullRequest).length > Object.keys(b.match.pullRequest).length) {
          return -1
        } else if (Object.keys(a.match.pullRequest).length < Object.keys(b.match.pullRequest).lengh) {
          return 1
        }
   
        return 0
    })
   
    return sortedFlows.find(flow => matchOnKeys(flow, pullRequest))
}

export const createActions = (actionDefinitions) => {
    const actions = []

    for (const actionDefinition of actionDefinitions) {
        let action = null

        switch (actionDefinition.type) {
            case 'setCustomField':
                action = new SetCustomFieldAction(actionDefinition.value)
            case 'setSection':
                action = new SetSectionAction(actionDefinition.value)
            case 'comment':
                action = new CommentAction(actionDefinition.value)
            default: 
                console.warn(`Skiping unknown action type '${actionDefinition.type}'. Please check your flow configurations.`) // use logger?
        }

        if (action) {
            actions.push(action)
        }
    }

    return actions
}

// move this to asana lib
export const getCurrentProjectSection = (task, projectId) => {
    const membership = task.memberships
        .find(
            membership => membership.project.gid === projectId,
        )

    return membership?.section
}


export const processPullRequest = (pullRequest) => {
    const asanaTaskIds = await getAsanaTaskIds(pullRequest)

    for (const asanaTaskId of asanaTaskIds) {
        const task = await getAsanaTask(asanaTaskId);
        const projectConfigurations = getProjectConfigurations(task)

        if (projectConfigurations.length === 0) {
            console.log(`No matching configurations were found for task: ${task.gid}. Skiping processing of task for pull request: ${pullRequest.url}`)
        }
    
        for (const projectConfiguration of projectConfigurations) {
            const currentSection = getCurrentProjectSection(task, projectConfiguration.id)
    
            // no need to process if were in a completed state.
            if (currentSection && !projectConfiguration.completedSections.includes(currentSection.gid)) {
                const flow = getMatchingFlow(projectConfiguration.flows, pullRequest)
                const actions = buildActions(flow.actions)

                // execute flow actions
                const context = { pullRequest, task, projectId: projectConfiguration.id }
                actions.forEach(action => action.execute(context))
            }
        }
    }
}