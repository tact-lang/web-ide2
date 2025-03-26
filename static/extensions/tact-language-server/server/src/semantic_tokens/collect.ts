import {RecursiveVisitor} from "@server/psi/visitor"
import type {File} from "@server/psi/File"
import {Reference} from "@server/psi/Reference"
import {NamedNode, Node} from "@server/psi/Node"
import * as lsp from "vscode-languageserver"
import type {SemanticTokens} from "vscode-languageserver"
import {isDocCommentOwner, isNamedFunNode} from "@server/psi/utils"
import {createTactParser} from "@server/parser"
import {extractCommentsDocContent} from "@server/documentation/documentation"
import {processDocComment} from "@server/semantic_tokens/comments"
import {Tokens} from "@server/semantic_tokens/tokens"

export function collect(
    file: File,
    highlighting: {
        highlightCodeInComments: boolean
    },
): SemanticTokens {
    const tokens = new Tokens()

    const parser = createTactParser()

    RecursiveVisitor.visit(file.rootNode, (n): boolean => {
        const type = n.type

        // asm fun foo() {}
        // ^^^ this
        if (type === "asm" && n.parent?.type === "asm_function") {
            tokens.node(n, lsp.SemanticTokenTypes.keyword)
            return true
        }

        if (type === "global_constant") {
            const name = n.childForFieldName("name")
            if (!name) return true
            tokens.node(name, lsp.SemanticTokenTypes.property)
            return true
        }

        if (type === "storage_function") {
            const name = n.childForFieldName("name")
            if (!name) return true
            tokens.node(name, lsp.SemanticTokenTypes.function)
            return true
        }

        if (type === "parameter") {
            const name = n.childForFieldName("name")
            if (!name) return true

            if (n.parent?.parent?.type === "contract") {
                tokens.node(name, lsp.SemanticTokenTypes.property)
                return true
            }
            tokens.node(name, lsp.SemanticTokenTypes.parameter)
            return true
        }

        if (type === "let_statement") {
            const name = n.childForFieldName("name")
            if (!name) return true
            tokens.node(name, lsp.SemanticTokenTypes.variable)
            return true
        }

        if (type === "field" || type === "storage_variable") {
            const name = n.childForFieldName("name")
            if (!name) return true
            tokens.node(name, lsp.SemanticTokenTypes.property)
            return true
        }

        if (type === "constant" || type === "storage_constant") {
            const name = n.childForFieldName("name")
            if (!name) return true
            tokens.node(name, lsp.SemanticTokenTypes.enumMember)
            return true
        }

        // asm fun foo() { ONE }
        //                 ^^^ this
        if (type === "tvm_instruction") {
            tokens.node(n, lsp.SemanticTokenTypes.macro)
            return true
        }

        if (type === "asm_stack_register") {
            tokens.node(n, lsp.SemanticTokenTypes.parameter)
            return true
        }

        if (type === "asm_hex_bitstring") {
            tokens.node(n, lsp.SemanticTokenTypes.string)
            return true
        }

        if (type === "identifier") {
            const element = new NamedNode(n, file)
            const resolved = Reference.resolve(element)
            if (!resolved) return true
            const resolvedType = resolved.node.type

            switch (resolvedType) {
                case "parameter": {
                    if (resolved.node.parent?.parent?.type === "contract") {
                        tokens.node(n, lsp.SemanticTokenTypes.property)
                        break
                    }

                    tokens.node(n, lsp.SemanticTokenTypes.parameter)
                    break
                }
                case "field":
                case "storage_variable": {
                    tokens.node(n, lsp.SemanticTokenTypes.property)
                    break
                }
                case "constant":
                case "storage_constant": {
                    tokens.node(n, lsp.SemanticTokenTypes.enumMember)
                    break
                }
                default: {
                    if (isNamedFunNode(resolved.node)) {
                        tokens.node(n, lsp.SemanticTokenTypes.function)
                    } else if (resolved.node.parent?.type === "let_statement") {
                        tokens.node(n, lsp.SemanticTokenTypes.variable)
                    }
                }
            }
        }

        if (highlighting.highlightCodeInComments && isDocCommentOwner(n)) {
            const node = new Node(n, file)

            const comment = extractCommentsDocContent(node)
            if (!comment) return true

            processDocComment(tokens, comment, parser)
        }

        return true
    })

    return {
        resultId: Date.now().toString(),
        data: tokens.result(),
    }
}
