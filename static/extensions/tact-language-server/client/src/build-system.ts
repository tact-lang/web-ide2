import * as vscode from "vscode"
import * as fs from "node:fs"
import * as path from "node:path"
import {TaskDefinition} from "vscode"

interface TaskProviderBase extends vscode.TaskProvider {
    createTask(): vscode.Task

    isAvailable(): boolean

    readonly taskType: string
}

export class BlueprintTaskProvider implements TaskProviderBase {
    public readonly taskType: string
    public readonly name: string
    public readonly command: string
    public readonly group: vscode.TaskGroup

    public constructor(id: string, name: string, command: string, group: vscode.TaskGroup) {
        this.taskType = `blueprint-${id}`
        this.name = name
        this.command = command
        this.group = group
    }

    public provideTasks(): vscode.Task[] {
        const isAvailable = this.isAvailable()
        if (!isAvailable) return []
        return [this.createTask()]
    }

    public isAvailable(): boolean {
        return projectUsesBlueprint()
    }

    public resolveTask(task: vscode.Task): vscode.Task | undefined {
        const def = task.definition
        if (def.type === this.taskType) {
            return this.createTask()
        }
        return undefined
    }

    public createTask(): vscode.Task {
        const definition: TaskDefinition = {
            type: this.taskType,
        }

        const execution = new vscode.ShellExecution(this.command)
        const task = new vscode.Task(
            definition,
            vscode.TaskScope.Workspace,
            this.name,
            "Blueprint",
            execution,
        )

        task.group = this.group
        task.presentationOptions = {
            reveal: vscode.TaskRevealKind.Always,
            panel: vscode.TaskPanelKind.Dedicated,
            focus: true,
        }

        const settings = vscode.workspace.getConfiguration("tact")
        const useProblemMatcher = settings.get<boolean>("linters.useProblemMatcher") ?? false
        if (useProblemMatcher) {
            task.problemMatchers = ["$tact"]
        }

        return task
    }
}

export class TactTemplateTaskProvider implements TaskProviderBase {
    public readonly taskType: string
    public readonly name: string
    public readonly command: string
    public readonly group: vscode.TaskGroup

    public constructor(id: string, name: string, command: string, group: vscode.TaskGroup) {
        this.taskType = `tact-template-${id}`
        this.name = name
        this.command = command
        this.group = group
    }

    public isAvailable(): boolean {
        return !projectUsesBlueprint()
    }

    public provideTasks(): vscode.Task[] {
        const isAvailable = this.isAvailable()
        if (!isAvailable) return []
        return [this.createTask()]
    }

    public resolveTask(task: vscode.Task): vscode.Task | undefined {
        const def = task.definition
        if (def.type === this.taskType) {
            return this.createTask()
        }
        return undefined
    }

    public createTask(): vscode.Task {
        const definition: TaskDefinition = {
            type: this.taskType,
        }

        const execution = new vscode.ShellExecution(this.command)
        const task = new vscode.Task(
            definition,
            vscode.TaskScope.Workspace,
            this.name,
            "Tact Template",
            execution,
        )

        task.group = this.group
        task.presentationOptions = {
            reveal: vscode.TaskRevealKind.Always,
            panel: vscode.TaskPanelKind.Dedicated,
            focus: true,
        }

        const settings = vscode.workspace.getConfiguration("tact")
        const useProblemMatcher = settings.get<boolean>("linters.useProblemMatcher") ?? false
        if (useProblemMatcher) {
            task.problemMatchers = ["$tact"]
        }

        return task
    }
}

function registerTaskProvider(context: vscode.ExtensionContext, provider: TaskProviderBase): void {
    if (!provider.isAvailable()) return

    const taskProviderDisposable = vscode.tasks.registerTaskProvider(provider.taskType, provider)
    context.subscriptions.push(taskProviderDisposable)
}

export function registerBuildTasks(context: vscode.ExtensionContext): void {
    registerTaskProvider(
        context,
        new BlueprintTaskProvider("build", "build", "npx blueprint build", vscode.TaskGroup.Build),
    )
    registerTaskProvider(
        context,
        new BlueprintTaskProvider(
            "build-all",
            "build all contracts",
            "npx blueprint build --all",
            vscode.TaskGroup.Build,
        ),
    )
    registerTaskProvider(
        context,
        new BlueprintTaskProvider("test", "test", "npx blueprint test", vscode.TaskGroup.Test),
    )
    registerTaskProvider(
        context,
        new BlueprintTaskProvider(
            "build-and-test-all",
            "build and test all contracts",
            "npx blueprint build --all && npx blueprint test",
            vscode.TaskGroup.Build,
        ),
    )
    registerTaskProvider(
        context,
        new TactTemplateTaskProvider("build", "build", "yarn build", vscode.TaskGroup.Build),
    )
    registerTaskProvider(
        context,
        new TactTemplateTaskProvider("test", "test", "yarn test", vscode.TaskGroup.Test),
    )
    registerTaskProvider(
        context,
        new TactTemplateTaskProvider(
            "build-and-test",
            "build and test",
            "yarn build && yarn test",
            vscode.TaskGroup.Build,
        ),
    )

    context.subscriptions.push(
        vscode.commands.registerCommand("tact.build", async () => {
            const tasks = await vscode.tasks.fetchTasks()

            const buildTask = tasks.find(
                task =>
                    task.group === vscode.TaskGroup.Build &&
                    (task.source === "Blueprint" || task.source === "Tact Template"),
            )

            if (buildTask) {
                await vscode.tasks.executeTask(buildTask)
            } else {
                void vscode.window.showErrorMessage("Build task not found")
            }
        }),
    )
}

function projectUsesBlueprint(): boolean {
    const workspaceFolders = vscode.workspace.workspaceFolders
    if (!workspaceFolders || workspaceFolders.length === 0) return false

    const packageJsonPath = path.join(workspaceFolders[0].uri.fsPath, "package.json")

    try {
        const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8")) as {
            dependencies?: Record<string, unknown>
            devDependencies?: Record<string, unknown>
        }
        return (
            packageJson.dependencies?.["@ton/blueprint"] !== undefined ||
            packageJson.devDependencies?.["@ton/blueprint"] !== undefined
        )
    } catch {
        // ignore any errors
    }

    return false
}
