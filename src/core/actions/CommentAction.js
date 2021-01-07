import Handlebars from 'handlebars'
import Action from './Action'

class CommentAction extends Action {
    execute = async (context) => {
        const template = Handlebars.compile(this.value)
        const renderedComment = template(context)
        const comment = {
            text: renderedComment
        }

        await this.client.tasks.addComment(context.task.gid, comment)
    }
}

export default CommentAction