import SetCustomFieldAction from './actions/SetCustomFieldAction'
import SetSectionAction from './actions/SetSectionAction'
import CommentAction from './actions/CommentAction'

class ActionFactory {
    createActions = (actionDefinitions) => {
        const actions = []
    
        for (const actionDefinition of actionDefinitions) {
            switch (actionDefinition.type) {
                case 'setCustomField':
                    actions.push(new SetCustomFieldAction(actionDefinition.value))
                    break;
                case 'setSection':
                    actions.push(new SetSectionAction(actionDefinition.value))
                    break;
                case 'comment':
                    actions.push(new CommentAction(actionDefinition.value))
                    break;
                default: 
                    console.warn(`Skiping unknown action type '${actionDefinition.type}'. Please check your flow configurations.`) // use logger?
            }
        }
    
        return actions
    }
}

export default ActionFactory