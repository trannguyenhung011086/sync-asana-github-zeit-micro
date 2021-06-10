import { ExecutionContext } from '../Action'
import AssanaAction from './AsanaAction'

class SetCustomFieldAction extends AssanaAction {
	async execute(context: ExecutionContext): Promise<void> {
		await this.client.tasks.updateTask(context.task.gid, {
			custom_fields: {
				[this.value.id]: this.value.value
			}
		})
	}
}

export default SetCustomFieldAction
