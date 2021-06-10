import Action from './Action'


export type ActionDefinition = {
	type: string,
	value: any
}

interface ActionFactory {
	buildActions(actionDefinitions: ActionDefinition[]): Array<Action>
}

export default ActionFactory
