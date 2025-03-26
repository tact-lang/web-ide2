import type {CompletionProvider} from "@server/completion/CompletionProvider"
import {CompletionItemKind, InsertTextFormat} from "vscode-languageserver-types"
import type {CompletionContext} from "@server/completion/CompletionContext"
import {CompletionResult, CompletionWeight} from "@server/completion/WeightedCompletionItem"

export class MapTypeCompletionProvider implements CompletionProvider {
    public isAvailable(ctx: CompletionContext): boolean {
        return (
            ctx.isType &&
            !ctx.inTraitList &&
            !ctx.isMessageContext &&
            !ctx.isInitOfName &&
            !ctx.isCodeOfName
        )
    }

    public addCompletion(_ctx: CompletionContext, result: CompletionResult): void {
        result.add({
            label: "map<K, V>",
            kind: CompletionItemKind.Keyword,
            insertText: "map<${1:Int}, ${2:String}>",
            insertTextFormat: InsertTextFormat.Snippet,
            weight: CompletionWeight.KEYWORD,
        })
    }
}
