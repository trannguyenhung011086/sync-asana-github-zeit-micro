import SetCustomFieldAction from './actions/SetCustomFieldAction'
import SetSectionAction from './actions/SetSectionAction'
import CommentAction from './actions/CommentAction'

class ActionFactory {
    constructor(asanaClient) {
        this.asanaClient = asanaClient
    }

    createActions = (actionDefinitions) => {
        const actions = []
    
        for (const actionDefinition of actionDefinitions) {
            switch (actionDefinition.type) {
                case 'setCustomField':
                    actions.push(new SetCustomFieldAction(this.asanaClient, actionDefinition.value))
                    break;
                case 'setSection':
                    actions.push(new SetSectionAction(this.asanaClient, actionDefinition.value))
                    break;
                case 'comment':
                    actions.push(new CommentAction(this.asanaClient, actionDefinition.value))
                    break;
                default: 
                    console.warn(`Skiping unknown action type '${actionDefinition.type}'. Please check your flow configurations.`) // use logger?
            }
        }
    
        return actions
    }
}

export default ActionFactory