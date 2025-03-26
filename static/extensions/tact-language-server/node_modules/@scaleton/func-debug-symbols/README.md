# FunC Debug Symbols

Collects debug symbols for:

- functions (original name, `method_id`, cell hash)
- globals (original name, index).

## Basic Usage

```typescript
import { collectDebugSymbols } from '@scaleton/func-debug-symbols';

const config: CompilerConfig = {
  targets: ['main.fc'],
  sources: {
    'main.fc': `
      global int a;
      global cell b;
      global slice c;

      () throw_inline() impure inline { throw(1); }
      () throw_inline_ref() impure inline_ref { throw(2); }
      () throw_get() method_id(88) { throw(3); }
      () recv_internal() { throw(4); }
    `,
  },
};

const debugSymbols = await collectDebugSymbols(config);
```

## Authors

- [Skydev0h](https://github.com/Skydev0h)
- [NickNekilov](https://github.com/NickNekilov)

## License

![MIT License](https://img.shields.io/badge/License-MIT-green)
