import Action, { ExecutionContext } from "../Action"

abstract class AsanaAction implements Action {
	client: any
	value: any

	constructor(client, value) {
		this.client = client
		this.value = value
	}

	abstract execute(context: ExecutionContext): Promise<void>
}

export default AsanaAction