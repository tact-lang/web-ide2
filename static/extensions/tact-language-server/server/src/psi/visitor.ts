import type {Node as SyntaxNode, TreeCursor} from "web-tree-sitter"

class TreeWalker {
    private alreadyVisitedChildren: boolean = false

    public constructor(private readonly cursor: TreeCursor) {}

    public next(): SyntaxNode | null {
        if (this.alreadyVisitedChildren) {
            if (this.cursor.gotoNextSibling()) {
                this.alreadyVisitedChildren = false
            } else {
                if (!this.cursor.gotoParent()) {
                    return null
                }
                this.alreadyVisitedChildren = true
                return this.next()
            }
        } else {
            if (this.cursor.gotoFirstChild()) {
                this.alreadyVisitedChildren = false
            } else if (this.cursor.gotoNextSibling()) {
                this.alreadyVisitedChildren = false
            } else {
                if (!this.cursor.gotoParent()) {
                    return null
                }
                this.alreadyVisitedChildren = true
                return this.next()
            }
        }

        return this.cursor.currentNode
    }

    public skipChildren(): void {
        this.alreadyVisitedChildren = true
    }
}

export class RecursiveVisitor {
    public static visit(node: SyntaxNode | null, cb: (n: SyntaxNode) => boolean): boolean {
        if (!node) return true

        const walker = new TreeWalker(node.walk())
        let current: SyntaxNode | null = node

        while (current) {
            if (!cb(current)) {
                walker.skipChildren()
            }
            current = walker.next()
        }

        return true
    }
}
