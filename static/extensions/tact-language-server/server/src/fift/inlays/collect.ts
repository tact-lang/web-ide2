import type {InlayHint} from "vscode-languageserver"
import type {File} from "@server/psi/File"
import {RecursiveVisitor} from "@server/psi/visitor"
import {findInstruction} from "@server/completion/data/types"
import {InlayHintKind} from "vscode-languageserver-types"
import {instructionPresentation} from "@server/asm/gas"

export function collectFift(
    file: File,
    gasFormat: string,
    settings: {
        showGasConsumption: boolean
    },
): InlayHint[] {
    const result: InlayHint[] = []

    RecursiveVisitor.visit(file.rootNode, (n): boolean => {
        if (n.type === "identifier" && settings.showGasConsumption) {
            const instruction = findInstruction(n.text)
            if (!instruction) return true

            const presentation = instructionPresentation(
                instruction.doc.gas,
                instruction.doc.stack,
                gasFormat,
            )

            result.push({
                kind: InlayHintKind.Type,
                label: presentation,
                position: {
                    line: n.endPosition.row,
                    character: n.endPosition.column,
                },
            })
        }
        return true
    })

    return result
}
