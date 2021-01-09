import Handlebars from 'handlebars'
import { ExecutionContext } from '../Action'
import AssanaAction from './AsanaAction'

class CommentAction extends AssanaAction {
	async execute(context: ExecutionContext): Promise<void> {
		const template = Handlebars.compile(this.value)
		const renderedComment = template(context)
		const comment = {
			text: renderedComment
		}

		await this.client.tasks.addComment(context.task.gid, comment)
	}
}

export default CommentAction
