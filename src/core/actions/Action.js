class Action {
    constructor(value) {
        this.value = value
    }

    execute = (context) => {
        throw new Error(`No implmentation provided for: execute(), context: ${JSON.stringify(context)}`)
    }
}

export default Action