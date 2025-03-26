import * as vscode from "vscode"
import * as path from "node:path"
import * as fs from "node:fs"
import {BocDecompilerProvider} from "../providers/BocDecompilerProvider"
import {Disposable} from "vscode"

export function registerSaveBocDecompiledCommand(_context: vscode.ExtensionContext): Disposable {
    return vscode.commands.registerCommand(
        "tact.saveBocDecompiled",
        async (fileUri: vscode.Uri | undefined) => {
            try {
                await saveBoc(fileUri)
            } catch (error: unknown) {
                console.error("Error in saveBocDecompiledCommand:", error)
                // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                vscode.window.showErrorMessage(`Failed to save decompiled BщC: ${error}`)
            }
        },
    )
}

export async function openBocFilePicker(): Promise<vscode.Uri | undefined> {
    const files = await vscode.window.showOpenDialog({
        canSelectFiles: true,
        canSelectFolders: false,
        canSelectMany: false,
        filters: {
            "BOC files": ["boc"],
        },
    })
    if (!files || files.length === 0) {
        return undefined
    }
    return files[0]
}

async function saveBoc(fileUri: vscode.Uri | undefined): Promise<void> {
    const actualFileUri = fileUri ?? (await openBocFilePicker())
    if (actualFileUri === undefined) return

    const decompiler = new BocDecompilerProvider()

    const decompileUri = actualFileUri.with({
        scheme: BocDecompilerProvider.scheme,
        path: actualFileUri.path + ".decompiled.fif",
    })
    const content = decompiler.provideTextDocumentContent(decompileUri)

    const outputPath = actualFileUri.fsPath + ".decompiled.fif"

    fs.writeFileSync(outputPath, content)

    const relativePath = path.relative(
        vscode.workspace.workspaceFolders?.[0]?.uri.fsPath ?? "",
        outputPath,
    )
    vscode.window.showInformationMessage(`Decompiled BOC saved to: ${relativePath}`)

    const savedFileUri = vscode.Uri.file(outputPath)
    const doc = await vscode.workspace.openTextDocument(savedFileUri)
    await vscode.window.showTextDocument(doc, {
        preview: false,
        viewColumn: vscode.ViewColumn.Active,
    })
}
