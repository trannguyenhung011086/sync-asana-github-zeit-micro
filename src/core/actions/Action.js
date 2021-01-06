class Action {
    constructor(client, value) {
        this.client = client
        this.value = value
    }

    execute = async (context) => {
        throw new Error(`No implmentation provided for: execute(), context: ${JSON.stringify(context)}`)
    }
}

export default Action