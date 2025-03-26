# tree-sitter-func

Grammar is taken from repository [ton-community/vscode-func](https://github.com/ton-community/vscode-func).

## Basic Usage

```typescript
import Parser from 'web-tree-sitter';
import { loadFunC } from '@scaleton/tree-sitter-func';

/* ... */

await Parser.init();
const parser = new Parser();

parser.setLanguage(await loadFunC());

/* ... */

const { rootNode } = parser.parse('() recv_internal() {}');
```

## Authors

* [akifoq](https://github.com/akifoq)
* [dvlkv](https://github.com/dvlkv)
* [NickNekilov](https://github.com/NickNekilov)

