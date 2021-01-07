import Action from './Action'

class SetSectionAction extends Action {
    execute = async (context) => {
        await this.client.tasks.addProject(context.task.gid, { project: context.projectId, section: this.value })
    }
}

export default SetSectionAction