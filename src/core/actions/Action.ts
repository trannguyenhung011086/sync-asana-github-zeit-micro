export type ExecutionContext = {
	pullRequest: any,
	task: any,
	projectId: string
}

export interface Action {
	execute(context: ExecutionContext): Promise<void>
}

export default Action
