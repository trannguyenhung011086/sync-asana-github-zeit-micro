import SetCustomFieldAction from './asana/SetCustomFieldAction'
import SetSectionAction from './asana/SetSectionAction'
import CommentAction from './asana/CommentAction'
import Action from './Action'
import ActionFactory, { ActionDefinition } from './ActionFactory'


class AsanaActionFactory implements ActionFactory {
	asanaClient: any

	constructor(asanaClient) {
		this.asanaClient = asanaClient
	}

	buildActions(actionDefinitions: ActionDefinition[]): Action[] {
		const actions = []

		for (const actionDefinition of actionDefinitions) {
			switch (actionDefinition.type) {
				case 'setCustomField':
					actions.push(new SetCustomFieldAction(this.asanaClient, actionDefinition.value))
					break
				case 'setSection':
					actions.push(new SetSectionAction(this.asanaClient, actionDefinition.value))
					break
				case 'comment':
					actions.push(new CommentAction(this.asanaClient, actionDefinition.value))
					break
				default:
					console.warn(
						`Skipping unknown action type '${actionDefinition.type}'. Please check your flow configurations.`
					) // use logger? send error response?
			}
		}

		return actions
	}
}

export default AsanaActionFactory
