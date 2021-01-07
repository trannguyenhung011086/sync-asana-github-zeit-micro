import Action from './Action'

class SetCustomFieldAction extends Action {
    execute = async (context) => {
        await this.client.tasks.updateTask(context.task.gid, {
            'custom_fields': {
                [this.value.id]: this.value.value
            }
        })
    }
}

export default SetCustomFieldAction