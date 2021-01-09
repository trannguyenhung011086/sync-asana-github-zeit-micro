import { ExecutionContext } from '../Action'
import AssanaAction from './AsanaAction'

class SetSectionAction extends AssanaAction {
	async execute(context: ExecutionContext): Promise<void> {
		await this.client.tasks.addProject(context.task.gid, { project: context.projectId, section: this.value })
	}
}

export default SetSectionAction
