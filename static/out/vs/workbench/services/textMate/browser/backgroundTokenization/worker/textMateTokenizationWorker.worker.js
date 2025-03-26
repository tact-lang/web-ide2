/*!--------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/
(function() {
var __m = ["require","exports","vs/base/common/lifecycle","vs/base/common/observableInternal/debugName","vs/base/common/observableInternal/base","vs/base/common/platform","vs/base/common/equals","vs/base/common/observableInternal/logging","vs/base/common/errors","vs/base/common/observableInternal/autorun","vs/base/common/observableInternal/derived","vs/base/common/uri","vs/editor/common/tokens/lineTokens","vs/editor/common/encodedTokenAttributes","vs/base/common/arrays","vs/base/common/event","vs/base/common/observable","vs/base/common/buffer","vs/base/common/charCode","vs/base/common/path","vs/base/common/strings","vs/base/common/network","vs/base/common/resources","vs/base/common/async","vs/editor/common/core/eolCounter","vs/editor/common/core/lineRange","vs/editor/common/tokens/contiguousMultilineTokensBuilder","vs/editor/common/languages/nullTokenize","vs/base/common/amd","vs/base/common/assert","vs/base/common/observableInternal/lazyObservableValue","vs/base/common/observableInternal/api","vs/base/common/observableInternal/promise","vs/base/common/cancellation","vs/base/common/observableInternal/utils","vs/base/common/stream","vs/base/common/lazy","vs/base/common/symbols","vs/base/common/extpath","vs/base/common/types","vs/amdX","vs/editor/common/model/fixedArray","vs/editor/common/tokens/contiguousTokensEditing","vs/editor/common/tokens/contiguousMultilineTokens","vs/editor/common/languages","vs/editor/common/model/textModelTokens","vs/base/common/stopwatch","vs/workbench/services/textMate/browser/tokenizationSupport/textMateTokenizationSupport","vs/workbench/services/textMate/browser/tokenizationSupport/tokenizationSupportWithLineLimit","vs/workbench/services/textMate/browser/backgroundTokenization/worker/textMateWorkerTokenizer","vs/workbench/services/textMate/common/TMScopeRegistry","vs/workbench/services/textMate/common/TMGrammarFactory","vs/editor/common/core/position","vs/editor/common/core/offsetRange","vs/editor/common/model/mirrorTextModel","vs/workbench/services/textMate/browser/backgroundTokenization/worker/textMateTokenizationWorker.worker"];
var __M = function(deps) {
  var result = [];
  for (var i = 0, len = deps.length; i < len; i++) {
    result[i] = __m[deps[i]];
  }
  return result;
};
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(__m[28/*vs/base/common/amd*/], __M([0/*require*/,1/*exports*/]), function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.$S = exports.LoaderEventType = exports.$R = void 0;
    // ESM-comment-begin
    exports.$R = false;
    // ESM-comment-end
    // ESM-uncomment-begin
    // export const isESM = true;
    // ESM-uncomment-end
    var LoaderEventType;
    (function (LoaderEventType) {
        LoaderEventType[LoaderEventType["LoaderAvailable"] = 1] = "LoaderAvailable";
        LoaderEventType[LoaderEventType["BeginLoadingScript"] = 10] = "BeginLoadingScript";
        LoaderEventType[LoaderEventType["EndLoadingScriptOK"] = 11] = "EndLoadingScriptOK";
        LoaderEventType[LoaderEventType["EndLoadingScriptError"] = 12] = "EndLoadingScriptError";
        LoaderEventType[LoaderEventType["BeginInvokeFactory"] = 21] = "BeginInvokeFactory";
        LoaderEventType[LoaderEventType["EndInvokeFactory"] = 22] = "EndInvokeFactory";
        LoaderEventType[LoaderEventType["NodeBeginEvaluatingScript"] = 31] = "NodeBeginEvaluatingScript";
        LoaderEventType[LoaderEventType["NodeEndEvaluatingScript"] = 32] = "NodeEndEvaluatingScript";
        LoaderEventType[LoaderEventType["NodeBeginNativeRequire"] = 33] = "NodeBeginNativeRequire";
        LoaderEventType[LoaderEventType["NodeEndNativeRequire"] = 34] = "NodeEndNativeRequire";
        LoaderEventType[LoaderEventType["CachedDataFound"] = 60] = "CachedDataFound";
        LoaderEventType[LoaderEventType["CachedDataMissed"] = 61] = "CachedDataMissed";
        LoaderEventType[LoaderEventType["CachedDataRejected"] = 62] = "CachedDataRejected";
        LoaderEventType[LoaderEventType["CachedDataCreated"] = 63] = "CachedDataCreated";
    })(LoaderEventType || (exports.LoaderEventType = LoaderEventType = {}));
    class $S {
        static get() {
            const amdLoadScript = new Map();
            const amdInvokeFactory = new Map();
            const nodeRequire = new Map();
            const nodeEval = new Map();
            function mark(map, stat) {
                if (map.has(stat.detail)) {
                    // console.warn('BAD events, DOUBLE start', stat);
                    // map.delete(stat.detail);
                    return;
                }
                map.set(stat.detail, -stat.timestamp);
            }
            function diff(map, stat) {
                const duration = map.get(stat.detail);
                if (!duration) {
                    // console.warn('BAD events, end WITHOUT start', stat);
                    // map.delete(stat.detail);
                    return;
                }
                if (duration >= 0) {
                    // console.warn('BAD events, DOUBLE end', stat);
                    // map.delete(stat.detail);
                    return;
                }
                map.set(stat.detail, duration + stat.timestamp);
            }
            let stats = [];
            if (typeof require === 'function' && typeof require.getStats === 'function') {
                stats = require.getStats().slice(0).sort((a, b) => a.timestamp - b.timestamp);
            }
            for (const stat of stats) {
                switch (stat.type) {
                    case LoaderEventType.BeginLoadingScript:
                        mark(amdLoadScript, stat);
                        break;
                    case LoaderEventType.EndLoadingScriptOK:
                    case LoaderEventType.EndLoadingScriptError:
                        diff(amdLoadScript, stat);
                        break;
                    case LoaderEventType.BeginInvokeFactory:
                        mark(amdInvokeFactory, stat);
                        break;
                    case LoaderEventType.EndInvokeFactory:
                        diff(amdInvokeFactory, stat);
                        break;
                    case LoaderEventType.NodeBeginNativeRequire:
                        mark(nodeRequire, stat);
                        break;
                    case LoaderEventType.NodeEndNativeRequire:
                        diff(nodeRequire, stat);
                        break;
                    case LoaderEventType.NodeBeginEvaluatingScript:
                        mark(nodeEval, stat);
                        break;
                    case LoaderEventType.NodeEndEvaluatingScript:
                        diff(nodeEval, stat);
                        break;
                }
            }
            let nodeRequireTotal = 0;
            nodeRequire.forEach(value => nodeRequireTotal += value);
            function to2dArray(map) {
                const res = [];
                map.forEach((value, index) => res.push([index, value]));
                return res;
            }
            return {
                amdLoad: to2dArray(amdLoadScript),
                amdInvoke: to2dArray(amdInvokeFactory),
                nodeRequire: to2dArray(nodeRequire),
                nodeEval: to2dArray(nodeEval),
                nodeRequireTotal
            };
        }
        static toMarkdownTable(header, rows) {
            let result = '';
            const lengths = [];
            header.forEach((cell, ci) => {
                lengths[ci] = cell.length;
            });
            rows.forEach(row => {
                row.forEach((cell, ci) => {
                    if (typeof cell === 'undefined') {
                        cell = row[ci] = '-';
                    }
                    const len = cell.toString().length;
                    lengths[ci] = Math.max(len, lengths[ci]);
                });
            });
            // header
            header.forEach((cell, ci) => { result += `| ${cell + ' '.repeat(lengths[ci] - cell.toString().length)} `; });
            result += '|\n';
            header.forEach((_cell, ci) => { result += `| ${'-'.repeat(lengths[ci])} `; });
            result += '|\n';
            // cells
            rows.forEach(row => {
                row.forEach((cell, ci) => {
                    if (typeof cell !== 'undefined') {
                        result += `| ${cell + ' '.repeat(lengths[ci] - cell.toString().length)} `;
                    }
                });
                result += '|\n';
            });
            return result;
        }
    }
    exports.$S = $S;
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
define(__m[6/*vs/base/common/equals*/], __M([0/*require*/,1/*exports*/,14/*vs/base/common/arrays*/]), function (require, exports, arrays) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.$6c = void 0;
    exports.$7c = $7c;
    exports.$8c = $8c;
    exports.$9c = $9c;
    exports.$0c = $0c;
    exports.$$c = $$c;
    exports.$_c = $_c;
    arrays = __importStar(arrays);
    /**
     * Compares two items for equality using strict equality.
    */
    const $6c = (a, b) => a === b;
    exports.$6c = $6c;
    /**
     * Checks if the items of two arrays are equal.
     * By default, strict equality is used to compare elements, but a custom equality comparer can be provided.
     */
    function $7c(itemEquals = exports.$6c) {
        return (a, b) => arrays.$tb(a, b, itemEquals);
    }
    /**
     * Two items are considered equal, if their stringified representations are equal.
    */
    function $8c() {
        return (a, b) => JSON.stringify(a) === JSON.stringify(b);
    }
    /**
     * Uses `item.equals(other)` to determine equality.
     */
    function $9c() {
        return (a, b) => a.equals(b);
    }
    function $0c(equalsOrV1, v2, equals) {
        if (equals !== undefined) {
            const v1 = equalsOrV1;
            if (v1 === undefined || v1 === null || v2 === undefined || v2 === null) {
                return v2 === v1;
            }
            return equals(v1, v2);
        }
        else {
            const equals = equalsOrV1;
            return (v1, v2) => {
                if (v1 === undefined || v1 === null || v2 === undefined || v2 === null) {
                    return v2 === v1;
                }
                return equals(v1, v2);
            };
        }
    }
    /**
     * Drills into arrays (items ordered) and objects (keys unordered) and uses strict equality on everything else.
    */
    function $$c(a, b) {
        if (a === b) {
            return true;
        }
        if (Array.isArray(a) && Array.isArray(b)) {
            if (a.length !== b.length) {
                return false;
            }
            for (let i = 0; i < a.length; i++) {
                if (!$$c(a[i], b[i])) {
                    return false;
                }
            }
            return true;
        }
        if (a && typeof a === 'object' && b && typeof b === 'object') {
            if (Object.getPrototypeOf(a) === Object.prototype && Object.getPrototypeOf(b) === Object.prototype) {
                const aObj = a;
                const bObj = b;
                const keysA = Object.keys(aObj);
                const keysB = Object.keys(bObj);
                const keysBSet = new Set(keysB);
                if (keysA.length !== keysB.length) {
                    return false;
                }
                for (const key of keysA) {
                    if (!keysBSet.has(key)) {
                        return false;
                    }
                    if (!$$c(aObj[key], bObj[key])) {
                        return false;
                    }
                }
                return true;
            }
        }
        return false;
    }
    /**
     * `getStructuralKey(a) === getStructuralKey(b) <=> structuralEquals(a, b)`
     * (assuming that a and b are not cyclic structures and nothing extends globalThis Array).
    */
    function $_c(t) {
        return JSON.stringify(toNormalizedJsonStructure(t));
    }
    let objectId = 0;
    const objIds = new WeakMap();
    function toNormalizedJsonStructure(t) {
        if (Array.isArray(t)) {
            return t.map(toNormalizedJsonStructure);
        }
        if (t && typeof t === 'object') {
            if (Object.getPrototypeOf(t) === Object.prototype) {
                const tObj = t;
                const res = Object.create(null);
                for (const key of Object.keys(tObj).sort()) {
                    res[key] = toNormalizedJsonStructure(tObj[key]);
                }
                return res;
            }
            else {
                let objId = objIds.get(t);
                if (objId === undefined) {
                    objId = objectId++;
                    objIds.set(t, objId);
                }
                // Random string to prevent collisions
                return objId + '----2b76a038c20c4bcc';
            }
        }
        return t;
    }
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(__m[3/*vs/base/common/observableInternal/debugName*/], __M([0/*require*/,1/*exports*/]), function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.$ad = void 0;
    exports.$bd = $bd;
    exports.$cd = $cd;
    class $ad {
        constructor(owner, debugNameSource, referenceFn) {
            this.owner = owner;
            this.debugNameSource = debugNameSource;
            this.referenceFn = referenceFn;
        }
        getDebugName(target) {
            return $bd(target, this);
        }
    }
    exports.$ad = $ad;
    const countPerName = new Map();
    const cachedDebugName = new WeakMap();
    function $bd(target, data) {
        const cached = cachedDebugName.get(target);
        if (cached) {
            return cached;
        }
        const dbgName = computeDebugName(target, data);
        if (dbgName) {
            let count = countPerName.get(dbgName) ?? 0;
            count++;
            countPerName.set(dbgName, count);
            const result = count === 1 ? dbgName : `${dbgName}#${count}`;
            cachedDebugName.set(target, result);
            return result;
        }
        return undefined;
    }
    function computeDebugName(self, data) {
        const cached = cachedDebugName.get(self);
        if (cached) {
            return cached;
        }
        const ownerStr = data.owner ? formatOwner(data.owner) + `.` : '';
        let result;
        const debugNameSource = data.debugNameSource;
        if (debugNameSource !== undefined) {
            if (typeof debugNameSource === 'function') {
                result = debugNameSource();
                if (result !== undefined) {
                    return ownerStr + result;
                }
            }
            else {
                return ownerStr + debugNameSource;
            }
        }
        const referenceFn = data.referenceFn;
        if (referenceFn !== undefined) {
            result = $cd(referenceFn);
            if (result !== undefined) {
                return ownerStr + result;
            }
        }
        if (data.owner !== undefined) {
            const key = findKey(data.owner, self);
            if (key !== undefined) {
                return ownerStr + key;
            }
        }
        return undefined;
    }
    function findKey(obj, value) {
        for (const key in obj) {
            if (obj[key] === value) {
                return key;
            }
        }
        return undefined;
    }
    const countPerClassName = new Map();
    const ownerId = new WeakMap();
    function formatOwner(owner) {
        const id = ownerId.get(owner);
        if (id) {
            return id;
        }
        const className = getClassName(owner);
        let count = countPerClassName.get(className) ?? 0;
        count++;
        countPerClassName.set(className, count);
        const result = count === 1 ? className : `${className}#${count}`;
        ownerId.set(owner, result);
        return result;
    }
    function getClassName(obj) {
        const ctor = obj.constructor;
        if (ctor) {
            return ctor.name;
        }
        return 'Object';
    }
    function $cd(fn) {
        const fnSrc = fn.toString();
        // Pattern: /** @description ... */
        const regexp = /\/\*\*\s*@description\s*([^*]*)\*\//;
        const match = regexp.exec(fnSrc);
        const result = match ? match[1] : undefined;
        return result?.trim();
    }
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(__m[7/*vs/base/common/observableInternal/logging*/], __M([0/*require*/,1/*exports*/]), function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.$Md = void 0;
    exports.$Kd = $Kd;
    exports.$Ld = $Ld;
    let globalObservableLogger;
    function $Kd(logger) {
        globalObservableLogger = logger;
    }
    function $Ld() {
        return globalObservableLogger;
    }
    class $Md {
        constructor() {
            this.a = 0;
            this.d = new WeakMap();
        }
        b(text) {
            return consoleTextToArgs([
                normalText(repeat('|  ', this.a)),
                text,
            ]);
        }
        c(info) {
            if (!info.hadValue) {
                return [
                    normalText(` `),
                    styled(formatValue(info.newValue, 60), {
                        color: 'green',
                    }),
                    normalText(` (initial)`),
                ];
            }
            return info.didChange
                ? [
                    normalText(` `),
                    styled(formatValue(info.oldValue, 70), {
                        color: 'red',
                        strikeThrough: true,
                    }),
                    normalText(` `),
                    styled(formatValue(info.newValue, 60), {
                        color: 'green',
                    }),
                ]
                : [normalText(` (unchanged)`)];
        }
        handleObservableChanged(observable, info) {
            console.log(...this.b([
                formatKind('observable value changed'),
                styled(observable.debugName, { color: 'BlueViolet' }),
                ...this.c(info),
            ]));
        }
        formatChanges(changes) {
            if (changes.size === 0) {
                return undefined;
            }
            return styled(' (changed deps: ' +
                [...changes].map((o) => o.debugName).join(', ') +
                ')', { color: 'gray' });
        }
        handleDerivedCreated(derived) {
            const existingHandleChange = derived.handleChange;
            this.d.set(derived, new Set());
            derived.handleChange = (observable, change) => {
                this.d.get(derived).add(observable);
                return existingHandleChange.apply(derived, [observable, change]);
            };
        }
        handleDerivedRecomputed(derived, info) {
            const changedObservables = this.d.get(derived);
            console.log(...this.b([
                formatKind('derived recomputed'),
                styled(derived.debugName, { color: 'BlueViolet' }),
                ...this.c(info),
                this.formatChanges(changedObservables),
                { data: [{ fn: derived._debugNameData.referenceFn ?? derived._computeFn }] }
            ]));
            changedObservables.clear();
        }
        handleFromEventObservableTriggered(observable, info) {
            console.log(...this.b([
                formatKind('observable from event triggered'),
                styled(observable.debugName, { color: 'BlueViolet' }),
                ...this.c(info),
                { data: [{ fn: observable._getValue }] }
            ]));
        }
        handleAutorunCreated(autorun) {
            const existingHandleChange = autorun.handleChange;
            this.d.set(autorun, new Set());
            autorun.handleChange = (observable, change) => {
                this.d.get(autorun).add(observable);
                return existingHandleChange.apply(autorun, [observable, change]);
            };
        }
        handleAutorunTriggered(autorun) {
            const changedObservables = this.d.get(autorun);
            console.log(...this.b([
                formatKind('autorun'),
                styled(autorun.debugName, { color: 'BlueViolet' }),
                this.formatChanges(changedObservables),
                { data: [{ fn: autorun._debugNameData.referenceFn ?? autorun._runFn }] }
            ]));
            changedObservables.clear();
            this.a++;
        }
        handleAutorunFinished(autorun) {
            this.a--;
        }
        handleBeginTransaction(transaction) {
            let transactionName = transaction.getDebugName();
            if (transactionName === undefined) {
                transactionName = '';
            }
            console.log(...this.b([
                formatKind('transaction'),
                styled(transactionName, { color: 'BlueViolet' }),
                { data: [{ fn: transaction._fn }] }
            ]));
            this.a++;
        }
        handleEndTransaction() {
            this.a--;
        }
    }
    exports.$Md = $Md;
    function consoleTextToArgs(text) {
        const styles = new Array();
        const data = [];
        let firstArg = '';
        function process(t) {
            if ('length' in t) {
                for (const item of t) {
                    if (item) {
                        process(item);
                    }
                }
            }
            else if ('text' in t) {
                firstArg += `%c${t.text}`;
                styles.push(t.style);
                if (t.data) {
                    data.push(...t.data);
                }
            }
            else if ('data' in t) {
                data.push(...t.data);
            }
        }
        process(text);
        const result = [firstArg, ...styles];
        result.push(...data);
        return result;
    }
    function normalText(text) {
        return styled(text, { color: 'black' });
    }
    function formatKind(kind) {
        return styled(padStr(`${kind}: `, 10), { color: 'black', bold: true });
    }
    function styled(text, options = {
        color: 'black',
    }) {
        function objToCss(styleObj) {
            return Object.entries(styleObj).reduce((styleString, [propName, propValue]) => {
                return `${styleString}${propName}:${propValue};`;
            }, '');
        }
        const style = {
            color: options.color,
        };
        if (options.strikeThrough) {
            style['text-decoration'] = 'line-through';
        }
        if (options.bold) {
            style['font-weight'] = 'bold';
        }
        return {
            text,
            style: objToCss(style),
        };
    }
    function formatValue(value, availableLen) {
        switch (typeof value) {
            case 'number':
                return '' + value;
            case 'string':
                if (value.length + 2 <= availableLen) {
                    return `"${value}"`;
                }
                return `"${value.substr(0, availableLen - 7)}"+...`;
            case 'boolean':
                return value ? 'true' : 'false';
            case 'undefined':
                return 'undefined';
            case 'object':
                if (value === null) {
                    return 'null';
                }
                if (Array.isArray(value)) {
                    return formatArray(value, availableLen);
                }
                return formatObject(value, availableLen);
            case 'symbol':
                return value.toString();
            case 'function':
                return `[[Function${value.name ? ' ' + value.name : ''}]]`;
            default:
                return '' + value;
        }
    }
    function formatArray(value, availableLen) {
        let result = '[ ';
        let first = true;
        for (const val of value) {
            if (!first) {
                result += ', ';
            }
            if (result.length - 5 > availableLen) {
                result += '...';
                break;
            }
            first = false;
            result += `${formatValue(val, availableLen - result.length)}`;
        }
        result += ' ]';
        return result;
    }
    function formatObject(value, availableLen) {
        let result = '{ ';
        let first = true;
        for (const [key, val] of Object.entries(value)) {
            if (!first) {
                result += ', ';
            }
            if (result.length - 5 > availableLen) {
                result += '...';
                break;
            }
            first = false;
            result += `${key}: ${formatValue(val, availableLen - result.length)}`;
        }
        result += ' }';
        return result;
    }
    function repeat(str, count) {
        let result = '';
        for (let i = 1; i <= count; i++) {
            result += str;
        }
        return result;
    }
    function padStr(str, length) {
        while (str.length < length) {
            str += ' ';
        }
        return str;
    }
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(__m[9/*vs/base/common/observableInternal/autorun*/], __M([0/*require*/,1/*exports*/,29/*vs/base/common/assert*/,2/*vs/base/common/lifecycle*/,3/*vs/base/common/observableInternal/debugName*/,7/*vs/base/common/observableInternal/logging*/]), function (require, exports, assert_1, lifecycle_1, debugName_1, logging_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.$pd = void 0;
    exports.$jd = $jd;
    exports.$kd = $kd;
    exports.$ld = $ld;
    exports.$md = $md;
    exports.$nd = $nd;
    exports.$od = $od;
    /**
     * Runs immediately and whenever a transaction ends and an observed observable changed.
     * {@link fn} should start with a JS Doc using `@description` to name the autorun.
     */
    function $jd(fn) {
        return new $pd(new debugName_1.$ad(undefined, undefined, fn), fn, undefined, undefined);
    }
    /**
     * Runs immediately and whenever a transaction ends and an observed observable changed.
     * {@link fn} should start with a JS Doc using `@description` to name the autorun.
     */
    function $kd(options, fn) {
        return new $pd(new debugName_1.$ad(options.owner, options.debugName, options.debugReferenceFn ?? fn), fn, undefined, undefined);
    }
    /**
     * Runs immediately and whenever a transaction ends and an observed observable changed.
     * {@link fn} should start with a JS Doc using `@description` to name the autorun.
     *
     * Use `createEmptyChangeSummary` to create a "change summary" that can collect the changes.
     * Use `handleChange` to add a reported change to the change summary.
     * The run function is given the last change summary.
     * The change summary is discarded after the run function was called.
     *
     * @see $jd
     */
    function $ld(options, fn) {
        return new $pd(new debugName_1.$ad(options.owner, options.debugName, options.debugReferenceFn ?? fn), fn, options.createEmptyChangeSummary, options.handleChange);
    }
    /**
     * @see $ld (but with a disposable store that is cleared before the next run or on dispose)
     */
    function $md(options, fn) {
        const store = new lifecycle_1.$Tc();
        const disposable = $ld({
            owner: options.owner,
            debugName: options.debugName,
            debugReferenceFn: options.debugReferenceFn ?? fn,
            createEmptyChangeSummary: options.createEmptyChangeSummary,
            handleChange: options.handleChange,
        }, (reader, changeSummary) => {
            store.clear();
            fn(reader, changeSummary, store);
        });
        return (0, lifecycle_1.$Sc)(() => {
            disposable.dispose();
            store.dispose();
        });
    }
    /**
     * @see $jd (but with a disposable store that is cleared before the next run or on dispose)
     */
    function $nd(fn) {
        const store = new lifecycle_1.$Tc();
        const disposable = $kd({
            owner: undefined,
            debugName: undefined,
            debugReferenceFn: fn,
        }, reader => {
            store.clear();
            fn(reader, store);
        });
        return (0, lifecycle_1.$Sc)(() => {
            disposable.dispose();
            store.dispose();
        });
    }
    function $od(observable, handler) {
        let _lastValue;
        return $kd({ debugReferenceFn: handler }, (reader) => {
            const newValue = observable.read(reader);
            const lastValue = _lastValue;
            _lastValue = newValue;
            handler({ lastValue, newValue });
        });
    }
    var AutorunState;
    (function (AutorunState) {
        /**
         * A dependency could have changed.
         * We need to explicitly ask them if at least one dependency changed.
         */
        AutorunState[AutorunState["dependenciesMightHaveChanged"] = 1] = "dependenciesMightHaveChanged";
        /**
         * A dependency changed and we need to recompute.
         */
        AutorunState[AutorunState["stale"] = 2] = "stale";
        AutorunState[AutorunState["upToDate"] = 3] = "upToDate";
    })(AutorunState || (AutorunState = {}));
    class $pd {
        get debugName() {
            return this._debugNameData.getDebugName(this) ?? '(anonymous)';
        }
        constructor(_debugNameData, _runFn, h, i) {
            this._debugNameData = _debugNameData;
            this._runFn = _runFn;
            this.h = h;
            this.i = i;
            this.a = AutorunState.stale;
            this.b = 0;
            this.c = false;
            this.e = new Set();
            this.f = new Set();
            this.g = this.h?.();
            (0, logging_1.$Ld)()?.handleAutorunCreated(this);
            this.j();
            (0, lifecycle_1.$Lc)(this);
        }
        dispose() {
            this.c = true;
            for (const o of this.e) {
                o.removeObserver(this);
            }
            this.e.clear();
            (0, lifecycle_1.$Mc)(this);
        }
        j() {
            if (this.a === AutorunState.upToDate) {
                return;
            }
            const emptySet = this.f;
            this.f = this.e;
            this.e = emptySet;
            this.a = AutorunState.upToDate;
            const isDisposed = this.c;
            try {
                if (!isDisposed) {
                    (0, logging_1.$Ld)()?.handleAutorunTriggered(this);
                    const changeSummary = this.g;
                    this.g = this.h?.();
                    this._runFn(this, changeSummary);
                }
            }
            finally {
                if (!isDisposed) {
                    (0, logging_1.$Ld)()?.handleAutorunFinished(this);
                }
                // We don't want our observed observables to think that they are (not even temporarily) not being observed.
                // Thus, we only unsubscribe from observables that are definitely not read anymore.
                for (const o of this.f) {
                    o.removeObserver(this);
                }
                this.f.clear();
            }
        }
        toString() {
            return `Autorun<${this.debugName}>`;
        }
        // IObserver implementation
        beginUpdate() {
            if (this.a === AutorunState.upToDate) {
                this.a = AutorunState.dependenciesMightHaveChanged;
            }
            this.b++;
        }
        endUpdate() {
            if (this.b === 1) {
                do {
                    if (this.a === AutorunState.dependenciesMightHaveChanged) {
                        this.a = AutorunState.upToDate;
                        for (const d of this.e) {
                            d.reportChanges();
                            if (this.a === AutorunState.stale) {
                                // The other dependencies will refresh on demand
                                break;
                            }
                        }
                    }
                    this.j();
                } while (this.a !== AutorunState.upToDate);
            }
            this.b--;
            (0, assert_1.$hd)(() => this.b >= 0);
        }
        handlePossibleChange(observable) {
            if (this.a === AutorunState.upToDate && this.e.has(observable) && !this.f.has(observable)) {
                this.a = AutorunState.dependenciesMightHaveChanged;
            }
        }
        handleChange(observable, change) {
            if (this.e.has(observable) && !this.f.has(observable)) {
                const shouldReact = this.i ? this.i({
                    changedObservable: observable,
                    change,
                    didChange: (o) => o === observable,
                }, this.g) : true;
                if (shouldReact) {
                    this.a = AutorunState.stale;
                }
            }
        }
        // IReader implementation
        readObservable(observable) {
            // In case the run action disposes the autorun
            if (this.c) {
                return observable.get();
            }
            observable.addObserver(this);
            const value = observable.get();
            this.e.add(observable);
            this.f.delete(observable);
            return value;
        }
    }
    exports.$pd = $pd;
    (function ($jd) {
        $jd.Observer = $pd;
    })($jd || (exports.$jd = $jd = {}));
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(__m[4/*vs/base/common/observableInternal/base*/], __M([0/*require*/,1/*exports*/,6/*vs/base/common/equals*/,3/*vs/base/common/observableInternal/debugName*/,7/*vs/base/common/observableInternal/logging*/]), function (require, exports, equals_1, debugName_1, logging_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.$9d = exports.$7d = exports.$5d = exports.$Zd = exports.$Yd = void 0;
    exports.$Vd = $Vd;
    exports.$Wd = $Wd;
    exports.$Xd = $Xd;
    exports.$1d = $1d;
    exports.$2d = $2d;
    exports.$3d = $3d;
    exports.$4d = $4d;
    exports.$6d = $6d;
    exports.$8d = $8d;
    let _recomputeInitiallyAndOnChange;
    function $Vd(recomputeInitiallyAndOnChange) {
        _recomputeInitiallyAndOnChange = recomputeInitiallyAndOnChange;
    }
    let _keepObserved;
    function $Wd(keepObserved) {
        _keepObserved = keepObserved;
    }
    let _derived;
    /**
     * @internal
     * This is to allow splitting files.
    */
    function $Xd(derived) {
        _derived = derived;
    }
    class $Yd {
        get TChange() { return null; }
        reportChanges() {
            this.get();
        }
        /** @sealed */
        read(reader) {
            if (reader) {
                return reader.readObservable(this);
            }
            else {
                return this.get();
            }
        }
        map(fnOrOwner, fnOrUndefined) {
            const owner = fnOrUndefined === undefined ? undefined : fnOrOwner;
            const fn = fnOrUndefined === undefined ? fnOrOwner : fnOrUndefined;
            return _derived({
                owner,
                debugName: () => {
                    const name = (0, debugName_1.$cd)(fn);
                    if (name !== undefined) {
                        return name;
                    }
                    // regexp to match `x => x.y` or `x => x?.y` where x and y can be arbitrary identifiers (uses backref):
                    const regexp = /^\s*\(?\s*([a-zA-Z_$][a-zA-Z_$0-9]*)\s*\)?\s*=>\s*\1(?:\??)\.([a-zA-Z_$][a-zA-Z_$0-9]*)\s*$/;
                    const match = regexp.exec(fn.toString());
                    if (match) {
                        return `${this.debugName}.${match[2]}`;
                    }
                    if (!owner) {
                        return `${this.debugName} (mapped)`;
                    }
                    return undefined;
                },
                debugReferenceFn: fn,
            }, (reader) => fn(this.read(reader), reader));
        }
        /**
         * @sealed
         * Converts an observable of an observable value into a direct observable of the value.
        */
        flatten() {
            return _derived({
                owner: undefined,
                debugName: () => `${this.debugName} (flattened)`,
            }, (reader) => this.read(reader).read(reader));
        }
        recomputeInitiallyAndOnChange(store, handleValue) {
            store.add(_recomputeInitiallyAndOnChange(this, handleValue));
            return this;
        }
        /**
         * Ensures that this observable is observed. This keeps the cache alive.
         * However, in case of deriveds, it does not force eager evaluation (only when the value is read/get).
         * Use `recomputeInitiallyAndOnChange` for eager evaluation.
         */
        keepObserved(store) {
            store.add(_keepObserved(this));
            return this;
        }
        get a() {
            return this.get();
        }
    }
    exports.$Yd = $Yd;
    class $Zd extends $Yd {
        constructor() {
            super(...arguments);
            this.b = new Set();
        }
        addObserver(observer) {
            const len = this.b.size;
            this.b.add(observer);
            if (len === 0) {
                this.c();
            }
        }
        removeObserver(observer) {
            const deleted = this.b.delete(observer);
            if (deleted && this.b.size === 0) {
                this.f();
            }
        }
        c() { }
        f() { }
    }
    exports.$Zd = $Zd;
    /**
     * Starts a transaction in which many observables can be changed at once.
     * {@link fn} should start with a JS Doc using `@description` to give the transaction a debug name.
     * Reaction run on demand or when the transaction ends.
     */
    function $1d(fn, getDebugName) {
        const tx = new $5d(fn, getDebugName);
        try {
            fn(tx);
        }
        finally {
            tx.finish();
        }
    }
    let _globalTransaction = undefined;
    function $2d(fn) {
        if (_globalTransaction) {
            fn(_globalTransaction);
        }
        else {
            const tx = new $5d(fn, undefined);
            _globalTransaction = tx;
            try {
                fn(tx);
            }
            finally {
                tx.finish(); // During finish, more actions might be added to the transaction.
                // Which is why we only clear the global transaction after finish.
                _globalTransaction = undefined;
            }
        }
    }
    async function $3d(fn, getDebugName) {
        const tx = new $5d(fn, getDebugName);
        try {
            await fn(tx);
        }
        finally {
            tx.finish();
        }
    }
    /**
     * Allows to chain transactions.
     */
    function $4d(tx, fn, getDebugName) {
        if (!tx) {
            $1d(fn, getDebugName);
        }
        else {
            fn(tx);
        }
    }
    class $5d {
        constructor(_fn, b) {
            this._fn = _fn;
            this.b = b;
            this.a = [];
            (0, logging_1.$Ld)()?.handleBeginTransaction(this);
        }
        getDebugName() {
            if (this.b) {
                return this.b();
            }
            return (0, debugName_1.$cd)(this._fn);
        }
        updateObserver(observer, observable) {
            // When this gets called while finish is active, they will still get considered
            this.a.push({ observer, observable });
            observer.beginUpdate(observable);
        }
        finish() {
            const updatingObservers = this.a;
            for (let i = 0; i < updatingObservers.length; i++) {
                const { observer, observable } = updatingObservers[i];
                observer.endUpdate(observable);
            }
            // Prevent anyone from updating observers from now on.
            this.a = null;
            (0, logging_1.$Ld)()?.handleEndTransaction();
        }
    }
    exports.$5d = $5d;
    function $6d(nameOrOwner, initialValue) {
        let debugNameData;
        if (typeof nameOrOwner === 'string') {
            debugNameData = new debugName_1.$ad(undefined, nameOrOwner, undefined);
        }
        else {
            debugNameData = new debugName_1.$ad(nameOrOwner, undefined, undefined);
        }
        return new $7d(debugNameData, initialValue, equals_1.$6c);
    }
    class $7d extends $Zd {
        get debugName() {
            return this.e.getDebugName(this) ?? 'ObservableValue';
        }
        constructor(e, initialValue, g) {
            super();
            this.e = e;
            this.g = g;
            this.d = initialValue;
        }
        get() {
            return this.d;
        }
        set(value, tx, change) {
            if (change === undefined && this.g(this.d, value)) {
                return;
            }
            let _tx;
            if (!tx) {
                tx = _tx = new $5d(() => { }, () => `Setting ${this.debugName}`);
            }
            try {
                const oldValue = this.d;
                this.h(value);
                (0, logging_1.$Ld)()?.handleObservableChanged(this, { oldValue, newValue: value, change, didChange: true, hadValue: true });
                for (const observer of this.b) {
                    tx.updateObserver(observer, this);
                    observer.handleChange(this, change);
                }
            }
            finally {
                if (_tx) {
                    _tx.finish();
                }
            }
        }
        toString() {
            return `${this.debugName}: ${this.d}`;
        }
        h(newValue) {
            this.d = newValue;
        }
    }
    exports.$7d = $7d;
    /**
     * A disposable observable. When disposed, its value is also disposed.
     * When a new value is set, the previous value is disposed.
     */
    function $8d(nameOrOwner, initialValue) {
        let debugNameData;
        if (typeof nameOrOwner === 'string') {
            debugNameData = new debugName_1.$ad(undefined, nameOrOwner, undefined);
        }
        else {
            debugNameData = new debugName_1.$ad(nameOrOwner, undefined, undefined);
        }
        return new $9d(debugNameData, initialValue, equals_1.$6c);
    }
    class $9d extends $7d {
        h(newValue) {
            if (this.d === newValue) {
                return;
            }
            if (this.d) {
                this.d.dispose();
            }
            this.d = newValue;
        }
        dispose() {
            this.d?.dispose();
        }
    }
    exports.$9d = $9d;
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(__m[10/*vs/base/common/observableInternal/derived*/], __M([0/*require*/,1/*exports*/,29/*vs/base/common/assert*/,6/*vs/base/common/equals*/,2/*vs/base/common/lifecycle*/,4/*vs/base/common/observableInternal/base*/,3/*vs/base/common/observableInternal/debugName*/,7/*vs/base/common/observableInternal/logging*/]), function (require, exports, assert_1, equals_1, lifecycle_1, base_1, debugName_1, logging_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.$Ud = exports.$Td = void 0;
    exports.$Nd = $Nd;
    exports.$Od = $Od;
    exports.$Pd = $Pd;
    exports.$Qd = $Qd;
    exports.$Rd = $Rd;
    exports.$Sd = $Sd;
    function $Nd(computeFnOrOwner, computeFn) {
        if (computeFn !== undefined) {
            return new $Td(new debugName_1.$ad(computeFnOrOwner, undefined, computeFn), computeFn, undefined, undefined, undefined, equals_1.$6c);
        }
        return new $Td(new debugName_1.$ad(undefined, undefined, computeFnOrOwner), computeFnOrOwner, undefined, undefined, undefined, equals_1.$6c);
    }
    function $Od(owner, computeFn, setter) {
        return new $Ud(new debugName_1.$ad(owner, undefined, computeFn), computeFn, undefined, undefined, undefined, equals_1.$6c, setter);
    }
    function $Pd(options, computeFn) {
        return new $Td(new debugName_1.$ad(options.owner, options.debugName, options.debugReferenceFn), computeFn, undefined, undefined, options.onLastObserverRemoved, options.equalsFn ?? equals_1.$6c);
    }
    (0, base_1.$Xd)($Pd);
    /**
     * Represents an observable that is derived from other observables.
     * The value is only recomputed when absolutely needed.
     *
     * {@link computeFn} should start with a JS Doc using `@description` to name the derived.
     *
     * Use `createEmptyChangeSummary` to create a "change summary" that can collect the changes.
     * Use `handleChange` to add a reported change to the change summary.
     * The compute function is given the last change summary.
     * The change summary is discarded after the compute function was called.
     *
     * @see $Nd
     */
    function $Qd(options, computeFn) {
        return new $Td(new debugName_1.$ad(options.owner, options.debugName, undefined), computeFn, options.createEmptyChangeSummary, options.handleChange, undefined, options.equalityComparer ?? equals_1.$6c);
    }
    function $Rd(computeFnOrOwner, computeFnOrUndefined) {
        let computeFn;
        let owner;
        if (computeFnOrUndefined === undefined) {
            computeFn = computeFnOrOwner;
            owner = undefined;
        }
        else {
            owner = computeFnOrOwner;
            computeFn = computeFnOrUndefined;
        }
        const store = new lifecycle_1.$Tc();
        return new $Td(new debugName_1.$ad(owner, undefined, computeFn), r => {
            store.clear();
            return computeFn(r, store);
        }, undefined, undefined, () => store.dispose(), equals_1.$6c);
    }
    function $Sd(computeFnOrOwner, computeFnOrUndefined) {
        let computeFn;
        let owner;
        if (computeFnOrUndefined === undefined) {
            computeFn = computeFnOrOwner;
            owner = undefined;
        }
        else {
            owner = computeFnOrOwner;
            computeFn = computeFnOrUndefined;
        }
        let store = undefined;
        return new $Td(new debugName_1.$ad(owner, undefined, computeFn), r => {
            if (!store) {
                store = new lifecycle_1.$Tc();
            }
            else {
                store.clear();
            }
            const result = computeFn(r);
            if (result) {
                store.add(result);
            }
            return result;
        }, undefined, undefined, () => {
            if (store) {
                store.dispose();
                store = undefined;
            }
        }, equals_1.$6c);
    }
    var DerivedState;
    (function (DerivedState) {
        /** Initial state, no previous value, recomputation needed */
        DerivedState[DerivedState["initial"] = 0] = "initial";
        /**
         * A dependency could have changed.
         * We need to explicitly ask them if at least one dependency changed.
         */
        DerivedState[DerivedState["dependenciesMightHaveChanged"] = 1] = "dependenciesMightHaveChanged";
        /**
         * A dependency changed and we need to recompute.
         * After recomputation, we need to check the previous value to see if we changed as well.
         */
        DerivedState[DerivedState["stale"] = 2] = "stale";
        /**
         * No change reported, our cached value is up to date.
         */
        DerivedState[DerivedState["upToDate"] = 3] = "upToDate";
    })(DerivedState || (DerivedState = {}));
    class $Td extends base_1.$Zd {
        get debugName() {
            return this._debugNameData.getDebugName(this) ?? '(anonymous)';
        }
        constructor(_debugNameData, _computeFn, m, n, p = undefined, q) {
            super();
            this._debugNameData = _debugNameData;
            this._computeFn = _computeFn;
            this.m = m;
            this.n = n;
            this.p = p;
            this.q = q;
            this.e = DerivedState.initial;
            this.g = undefined;
            this.h = 0;
            this.j = new Set();
            this.k = new Set();
            this.l = undefined;
            this.l = this.m?.();
            (0, logging_1.$Ld)()?.handleDerivedCreated(this);
        }
        f() {
            /**
             * We are not tracking changes anymore, thus we have to assume
             * that our cache is invalid.
             */
            this.e = DerivedState.initial;
            this.g = undefined;
            for (const d of this.j) {
                d.removeObserver(this);
            }
            this.j.clear();
            this.p?.();
        }
        get() {
            if (this.b.size === 0) {
                // Without observers, we don't know when to clean up stuff.
                // Thus, we don't cache anything to prevent memory leaks.
                const result = this._computeFn(this, this.m?.());
                // Clear new dependencies
                this.f();
                return result;
            }
            else {
                do {
                    // We might not get a notification for a dependency that changed while it is updating,
                    // thus we also have to ask all our depedencies if they changed in this case.
                    if (this.e === DerivedState.dependenciesMightHaveChanged) {
                        for (const d of this.j) {
                            /** might call {@link handleChange} indirectly, which could make us stale */
                            d.reportChanges();
                            if (this.e === DerivedState.stale) {
                                // The other dependencies will refresh on demand, so early break
                                break;
                            }
                        }
                    }
                    // We called report changes of all dependencies.
                    // If we are still not stale, we can assume to be up to date again.
                    if (this.e === DerivedState.dependenciesMightHaveChanged) {
                        this.e = DerivedState.upToDate;
                    }
                    this.t();
                    // In case recomputation changed one of our dependencies, we need to recompute again.
                } while (this.e !== DerivedState.upToDate);
                return this.g;
            }
        }
        t() {
            if (this.e === DerivedState.upToDate) {
                return;
            }
            const emptySet = this.k;
            this.k = this.j;
            this.j = emptySet;
            const hadValue = this.e !== DerivedState.initial;
            const oldValue = this.g;
            this.e = DerivedState.upToDate;
            const changeSummary = this.l;
            this.l = this.m?.();
            try {
                /** might call {@link handleChange} indirectly, which could invalidate us */
                this.g = this._computeFn(this, changeSummary);
            }
            finally {
                // We don't want our observed observables to think that they are (not even temporarily) not being observed.
                // Thus, we only unsubscribe from observables that are definitely not read anymore.
                for (const o of this.k) {
                    o.removeObserver(this);
                }
                this.k.clear();
            }
            const didChange = hadValue && !(this.q(oldValue, this.g));
            (0, logging_1.$Ld)()?.handleDerivedRecomputed(this, {
                oldValue,
                newValue: this.g,
                change: undefined,
                didChange,
                hadValue,
            });
            if (didChange) {
                for (const r of this.b) {
                    r.handleChange(this, undefined);
                }
            }
        }
        toString() {
            return `LazyDerived<${this.debugName}>`;
        }
        // IObserver Implementation
        beginUpdate(_observable) {
            this.h++;
            const propagateBeginUpdate = this.h === 1;
            if (this.e === DerivedState.upToDate) {
                this.e = DerivedState.dependenciesMightHaveChanged;
                // If we propagate begin update, that will already signal a possible change.
                if (!propagateBeginUpdate) {
                    for (const r of this.b) {
                        r.handlePossibleChange(this);
                    }
                }
            }
            if (propagateBeginUpdate) {
                for (const r of this.b) {
                    r.beginUpdate(this); // This signals a possible change
                }
            }
        }
        endUpdate(_observable) {
            this.h--;
            if (this.h === 0) {
                // End update could change the observer list.
                const observers = [...this.b];
                for (const r of observers) {
                    r.endUpdate(this);
                }
            }
            (0, assert_1.$hd)(() => this.h >= 0);
        }
        handlePossibleChange(observable) {
            // In all other states, observers already know that we might have changed.
            if (this.e === DerivedState.upToDate && this.j.has(observable) && !this.k.has(observable)) {
                this.e = DerivedState.dependenciesMightHaveChanged;
                for (const r of this.b) {
                    r.handlePossibleChange(this);
                }
            }
        }
        handleChange(observable, change) {
            if (this.j.has(observable) && !this.k.has(observable)) {
                const shouldReact = this.n ? this.n({
                    changedObservable: observable,
                    change,
                    didChange: (o) => o === observable,
                }, this.l) : true;
                const wasUpToDate = this.e === DerivedState.upToDate;
                if (shouldReact && (this.e === DerivedState.dependenciesMightHaveChanged || wasUpToDate)) {
                    this.e = DerivedState.stale;
                    if (wasUpToDate) {
                        for (const r of this.b) {
                            r.handlePossibleChange(this);
                        }
                    }
                }
            }
        }
        // IReader Implementation
        readObservable(observable) {
            // Subscribe before getting the value to enable caching
            observable.addObserver(this);
            /** This might call {@link handleChange} indirectly, which could invalidate us */
            const value = observable.get();
            // Which is why we only add the observable to the dependencies now.
            this.j.add(observable);
            this.k.delete(observable);
            return value;
        }
        addObserver(observer) {
            const shouldCallBeginUpdate = !this.b.has(observer) && this.h > 0;
            super.addObserver(observer);
            if (shouldCallBeginUpdate) {
                observer.beginUpdate(this);
            }
        }
        removeObserver(observer) {
            const shouldCallEndUpdate = this.b.has(observer) && this.h > 0;
            super.removeObserver(observer);
            if (shouldCallEndUpdate) {
                // Calling end update after removing the observer makes sure endUpdate cannot be called twice here.
                observer.endUpdate(this);
            }
        }
    }
    exports.$Td = $Td;
    class $Ud extends $Td {
        constructor(debugNameData, computeFn, createChangeSummary, handleChange, handleLastObserverRemoved = undefined, equalityComparator, set) {
            super(debugNameData, computeFn, createChangeSummary, handleChange, handleLastObserverRemoved, equalityComparator);
            this.set = set;
        }
    }
    exports.$Ud = $Ud;
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(__m[30/*vs/base/common/observableInternal/lazyObservableValue*/], __M([0/*require*/,1/*exports*/,4/*vs/base/common/observableInternal/base*/]), function (require, exports, base_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.$de = void 0;
    /**
     * Holds off updating observers until the value is actually read.
    */
    class $de extends base_1.$Zd {
        get debugName() {
            return this.h.getDebugName(this) ?? 'LazyObservableValue';
        }
        constructor(h, initialValue, j) {
            super();
            this.h = h;
            this.j = j;
            this.e = true;
            this.g = [];
            this.l = 0;
            this.d = initialValue;
        }
        get() {
            this.k();
            return this.d;
        }
        k() {
            if (this.e) {
                return;
            }
            this.e = true;
            if (this.g.length > 0) {
                for (const observer of this.b) {
                    for (const change of this.g) {
                        observer.handleChange(this, change);
                    }
                }
                this.g.length = 0;
            }
            else {
                for (const observer of this.b) {
                    observer.handleChange(this, undefined);
                }
            }
        }
        m() {
            this.l++;
            if (this.l === 1) {
                for (const observer of this.b) {
                    observer.beginUpdate(this);
                }
            }
        }
        n() {
            this.l--;
            if (this.l === 0) {
                this.k();
                // End update could change the observer list.
                const observers = [...this.b];
                for (const r of observers) {
                    r.endUpdate(this);
                }
            }
        }
        addObserver(observer) {
            const shouldCallBeginUpdate = !this.b.has(observer) && this.l > 0;
            super.addObserver(observer);
            if (shouldCallBeginUpdate) {
                observer.beginUpdate(this);
            }
        }
        removeObserver(observer) {
            const shouldCallEndUpdate = this.b.has(observer) && this.l > 0;
            super.removeObserver(observer);
            if (shouldCallEndUpdate) {
                // Calling end update after removing the observer makes sure endUpdate cannot be called twice here.
                observer.endUpdate(this);
            }
        }
        set(value, tx, change) {
            if (change === undefined && this.j(this.d, value)) {
                return;
            }
            let _tx;
            if (!tx) {
                tx = _tx = new base_1.$5d(() => { }, () => `Setting ${this.debugName}`);
            }
            try {
                this.e = false;
                this.o(value);
                if (change !== undefined) {
                    this.g.push(change);
                }
                tx.updateObserver({
                    beginUpdate: () => this.m(),
                    endUpdate: () => this.n(),
                    handleChange: (observable, change) => { },
                    handlePossibleChange: (observable) => { },
                }, this);
                if (this.l > 1) {
                    // We already started begin/end update, so we need to manually call handlePossibleChange
                    for (const observer of this.b) {
                        observer.handlePossibleChange(this);
                    }
                }
            }
            finally {
                if (_tx) {
                    _tx.finish();
                }
            }
        }
        toString() {
            return `${this.debugName}: ${this.d}`;
        }
        o(newValue) {
            this.d = newValue;
        }
    }
    exports.$de = $de;
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(__m[31/*vs/base/common/observableInternal/api*/], __M([0/*require*/,1/*exports*/,6/*vs/base/common/equals*/,4/*vs/base/common/observableInternal/base*/,3/*vs/base/common/observableInternal/debugName*/,30/*vs/base/common/observableInternal/lazyObservableValue*/]), function (require, exports, equals_1, base_1, debugName_1, lazyObservableValue_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.$ee = $ee;
    function $ee(options, initialValue) {
        if (options.lazy) {
            return new lazyObservableValue_1.$de(new debugName_1.$ad(options.owner, options.debugName, undefined), initialValue, options.equalsFn ?? equals_1.$6c);
        }
        return new base_1.$7d(new debugName_1.$ad(options.owner, options.debugName, undefined), initialValue, options.equalsFn ?? equals_1.$6c);
    }
});

define(__m[32/*vs/base/common/observableInternal/promise*/], __M([0/*require*/,1/*exports*/,9/*vs/base/common/observableInternal/autorun*/,4/*vs/base/common/observableInternal/base*/,10/*vs/base/common/observableInternal/derived*/,33/*vs/base/common/cancellation*/,3/*vs/base/common/observableInternal/debugName*/,6/*vs/base/common/equals*/,8/*vs/base/common/errors*/]), function (require, exports, autorun_1, base_1, derived_1, cancellation_1, debugName_1, equals_1, errors_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.$ae = exports.$_d = exports.$$d = exports.$0d = void 0;
    exports.$be = $be;
    exports.$ce = $ce;
    class $0d {
        /**
         * The cached value.
         * Does not force a computation of the value.
         */
        get cachedValue() { return this.a; }
        constructor(b) {
            this.b = b;
            this.a = (0, base_1.$6d)(this, undefined);
        }
        /**
         * Returns the cached value.
         * Computes the value if the value has not been cached yet.
         */
        getValue() {
            let v = this.a.get();
            if (!v) {
                v = this.b();
                this.a.set(v, undefined);
            }
            return v;
        }
    }
    exports.$0d = $0d;
    /**
     * A promise whose state is observable.
     */
    class $$d {
        static fromFn(fn) {
            return new $$d(fn());
        }
        constructor(promise) {
            this.a = (0, base_1.$6d)(this, undefined);
            /**
             * The current state of the promise.
             * Is `undefined` if the promise didn't resolve yet.
             */
            this.promiseResult = this.a;
            this.promise = promise.then(value => {
                (0, base_1.$1d)(tx => {
                    /** @description onPromiseResolved */
                    this.a.set(new $_d(value, undefined), tx);
                });
                return value;
            }, error => {
                (0, base_1.$1d)(tx => {
                    /** @description onPromiseRejected */
                    this.a.set(new $_d(undefined, error), tx);
                });
                throw error;
            });
        }
    }
    exports.$$d = $$d;
    class $_d {
        constructor(
        /**
         * The value of the resolved promise.
         * Undefined if the promise rejected.
         */
        data, 
        /**
         * The error in case of a rejected promise.
         * Undefined if the promise resolved.
         */
        error) {
            this.data = data;
            this.error = error;
        }
        /**
         * Returns the value if the promise resolved, otherwise throws the error.
         */
        getDataOrThrow() {
            if (this.error) {
                throw this.error;
            }
            return this.data;
        }
    }
    exports.$_d = $_d;
    /**
     * A lazy promise whose state is observable.
     */
    class $ae {
        constructor(b) {
            this.b = b;
            this.a = new $0d(() => new $$d(this.b()));
            /**
             * Does not enforce evaluation of the promise compute function.
             * Is undefined if the promise has not been computed yet.
             */
            this.cachedPromiseResult = (0, derived_1.$Nd)(this, reader => this.a.cachedValue.read(reader)?.promiseResult.read(reader));
        }
        getPromise() {
            return this.a.getValue().promise;
        }
    }
    exports.$ae = $ae;
    function $be(observable, predicate, isError, cancellationToken) {
        if (!predicate) {
            predicate = state => state !== null && state !== undefined;
        }
        return new Promise((resolve, reject) => {
            let isImmediateRun = true;
            let shouldDispose = false;
            const stateObs = observable.map(state => {
                /** @description waitForState.state */
                return {
                    isFinished: predicate(state),
                    error: isError ? isError(state) : false,
                    state
                };
            });
            const d = (0, autorun_1.$jd)(reader => {
                /** @description waitForState */
                const { isFinished, error, state } = stateObs.read(reader);
                if (isFinished || error) {
                    if (isImmediateRun) {
                        // The variable `d` is not initialized yet
                        shouldDispose = true;
                    }
                    else {
                        d.dispose();
                    }
                    if (error) {
                        reject(error === true ? state : error);
                    }
                    else {
                        resolve(state);
                    }
                }
            });
            if (cancellationToken) {
                const dc = cancellationToken.onCancellationRequested(() => {
                    d.dispose();
                    dc.dispose();
                    reject(new errors_1.$4());
                });
                if (cancellationToken.isCancellationRequested) {
                    d.dispose();
                    dc.dispose();
                    reject(new errors_1.$4());
                    return;
                }
            }
            isImmediateRun = false;
            if (shouldDispose) {
                d.dispose();
            }
        });
    }
    function $ce(computeFnOrOwner, computeFnOrUndefined) {
        let computeFn;
        let owner;
        if (computeFnOrUndefined === undefined) {
            computeFn = computeFnOrOwner;
            owner = undefined;
        }
        else {
            owner = computeFnOrOwner;
            computeFn = computeFnOrUndefined;
        }
        let cancellationTokenSource = undefined;
        return new derived_1.$Td(new debugName_1.$ad(owner, undefined, computeFn), r => {
            if (cancellationTokenSource) {
                cancellationTokenSource.dispose(true);
            }
            cancellationTokenSource = new cancellation_1.$we();
            return computeFn(r, cancellationTokenSource.token);
        }, undefined, undefined, () => cancellationTokenSource?.dispose(), equals_1.$6c);
    }
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(__m[34/*vs/base/common/observableInternal/utils*/], __M([0/*require*/,1/*exports*/,15/*vs/base/common/event*/,2/*vs/base/common/lifecycle*/,9/*vs/base/common/observableInternal/autorun*/,4/*vs/base/common/observableInternal/base*/,3/*vs/base/common/observableInternal/debugName*/,10/*vs/base/common/observableInternal/derived*/,7/*vs/base/common/observableInternal/logging*/,8/*vs/base/common/errors*/,6/*vs/base/common/equals*/]), function (require, exports, event_1, lifecycle_1, autorun_1, base_1, debugName_1, derived_1, logging_1, errors_1, equals_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.$Gd = exports.$Cd = exports.$ud = void 0;
    exports.$qd = $qd;
    exports.$rd = $rd;
    exports.$sd = $sd;
    exports.$td = $td;
    exports.$vd = $vd;
    exports.$wd = $wd;
    exports.$xd = $xd;
    exports.$yd = $yd;
    exports.$zd = $zd;
    exports.$Ad = $Ad;
    exports.$Bd = $Bd;
    exports.$Dd = $Dd;
    exports.$Ed = $Ed;
    exports.$Fd = $Fd;
    exports.$Hd = $Hd;
    exports.$Id = $Id;
    exports.$Jd = $Jd;
    /**
     * Represents an efficient observable whose value never changes.
     */
    function $qd(value) {
        return new ConstObservable(value);
    }
    class ConstObservable extends base_1.$Yd {
        constructor(b) {
            super();
            this.b = b;
        }
        get debugName() {
            return this.toString();
        }
        get() {
            return this.b;
        }
        addObserver(observer) {
            // NO OP
        }
        removeObserver(observer) {
            // NO OP
        }
        toString() {
            return `Const: ${this.b}`;
        }
    }
    function $rd(promise) {
        const observable = (0, base_1.$6d)('promiseValue', {});
        promise.then((value) => {
            observable.set({ value }, undefined);
        });
        return observable;
    }
    function $sd(...args) {
        let owner;
        let event;
        let getValue;
        if (args.length === 3) {
            [owner, event, getValue] = args;
        }
        else {
            [event, getValue] = args;
        }
        return new $ud(new debugName_1.$ad(owner, undefined, getValue), event, getValue, () => $ud.globalTransaction, equals_1.$6c);
    }
    function $td(options, event, getValue) {
        return new $ud(new debugName_1.$ad(options.owner, options.debugName, options.debugReferenceFn ?? getValue), event, getValue, () => $ud.globalTransaction, options.equalsFn ?? equals_1.$6c);
    }
    class $ud extends base_1.$Zd {
        constructor(j, k, _getValue, l, n) {
            super();
            this.j = j;
            this.k = k;
            this._getValue = _getValue;
            this.l = l;
            this.n = n;
            this.g = false;
            this.r = (args) => {
                const newValue = this._getValue(args);
                const oldValue = this.e;
                const didChange = !this.g || !(this.n(oldValue, newValue));
                let didRunTransaction = false;
                if (didChange) {
                    this.e = newValue;
                    if (this.g) {
                        didRunTransaction = true;
                        (0, base_1.$4d)(this.l(), (tx) => {
                            (0, logging_1.$Ld)()?.handleFromEventObservableTriggered(this, { oldValue, newValue, change: undefined, didChange, hadValue: this.g });
                            for (const o of this.b) {
                                tx.updateObserver(o, this);
                                o.handleChange(this, undefined);
                            }
                        }, () => {
                            const name = this.p();
                            return 'Event fired' + (name ? `: ${name}` : '');
                        });
                    }
                    this.g = true;
                }
                if (!didRunTransaction) {
                    (0, logging_1.$Ld)()?.handleFromEventObservableTriggered(this, { oldValue, newValue, change: undefined, didChange, hadValue: this.g });
                }
            };
        }
        p() {
            return this.j.getDebugName(this);
        }
        get debugName() {
            const name = this.p();
            return 'From Event' + (name ? `: ${name}` : '');
        }
        c() {
            this.h = this.k(this.r);
        }
        f() {
            this.h.dispose();
            this.h = undefined;
            this.g = false;
            this.e = undefined;
        }
        get() {
            if (this.h) {
                if (!this.g) {
                    this.r(undefined);
                }
                return this.e;
            }
            else {
                // no cache, as there are no subscribers to keep it updated
                const value = this._getValue(undefined);
                return value;
            }
        }
    }
    exports.$ud = $ud;
    (function ($sd) {
        $sd.Observer = $ud;
        function batchEventsGlobally(tx, fn) {
            let didSet = false;
            if ($ud.globalTransaction === undefined) {
                $ud.globalTransaction = tx;
                didSet = true;
            }
            try {
                fn();
            }
            finally {
                if (didSet) {
                    $ud.globalTransaction = undefined;
                }
            }
        }
        $sd.batchEventsGlobally = batchEventsGlobally;
    })($sd || (exports.$sd = $sd = {}));
    function $vd(debugName, event) {
        return new FromEventObservableSignal(debugName, event);
    }
    class FromEventObservableSignal extends base_1.$Zd {
        constructor(debugName, g) {
            super();
            this.debugName = debugName;
            this.g = g;
            this.j = () => {
                (0, base_1.$1d)((tx) => {
                    for (const o of this.b) {
                        tx.updateObserver(o, this);
                        o.handleChange(this, undefined);
                    }
                }, () => this.debugName);
            };
        }
        c() {
            this.e = this.g(this.j);
        }
        f() {
            this.e.dispose();
            this.e = undefined;
        }
        get() {
            // NO OP
        }
    }
    function $wd(debugNameOrOwner) {
        if (typeof debugNameOrOwner === 'string') {
            return new ObservableSignal(debugNameOrOwner);
        }
        else {
            return new ObservableSignal(undefined, debugNameOrOwner);
        }
    }
    class ObservableSignal extends base_1.$Zd {
        get debugName() {
            return new debugName_1.$ad(this.g, this.e, undefined).getDebugName(this) ?? 'Observable Signal';
        }
        toString() {
            return this.debugName;
        }
        constructor(e, g) {
            super();
            this.e = e;
            this.g = g;
        }
        trigger(tx, change) {
            if (!tx) {
                (0, base_1.$1d)(tx => {
                    this.trigger(tx, change);
                }, () => `Trigger signal ${this.debugName}`);
                return;
            }
            for (const o of this.b) {
                tx.updateObserver(o, this);
                o.handleChange(this, change);
            }
        }
        get() {
            // NO OP
        }
    }
    /**
     * @deprecated Use `debouncedObservable2` instead.
     */
    function $xd(observable, debounceMs, disposableStore) {
        const debouncedObservable = (0, base_1.$6d)('debounced', undefined);
        let timeout = undefined;
        disposableStore.add((0, autorun_1.$jd)(reader => {
            /** @description debounce */
            const value = observable.read(reader);
            if (timeout) {
                clearTimeout(timeout);
            }
            timeout = setTimeout(() => {
                (0, base_1.$1d)(tx => {
                    debouncedObservable.set(value, tx);
                });
            }, debounceMs);
        }));
        return debouncedObservable;
    }
    /**
     * Creates an observable that debounces the input observable.
     */
    function $yd(observable, debounceMs) {
        let hasValue = false;
        let lastValue;
        let timeout = undefined;
        return $sd(cb => {
            const d = (0, autorun_1.$jd)(reader => {
                const value = observable.read(reader);
                if (!hasValue) {
                    hasValue = true;
                    lastValue = value;
                }
                else {
                    if (timeout) {
                        clearTimeout(timeout);
                    }
                    timeout = setTimeout(() => {
                        lastValue = value;
                        cb();
                    }, debounceMs);
                }
            });
            return {
                dispose() {
                    d.dispose();
                    hasValue = false;
                    lastValue = undefined;
                },
            };
        }, () => {
            if (hasValue) {
                return lastValue;
            }
            else {
                return observable.get();
            }
        });
    }
    function $zd(event, timeoutMs, disposableStore) {
        const observable = (0, base_1.$6d)('triggeredRecently', false);
        let timeout = undefined;
        disposableStore.add(event(() => {
            observable.set(true, undefined);
            if (timeout) {
                clearTimeout(timeout);
            }
            timeout = setTimeout(() => {
                observable.set(false, undefined);
            }, timeoutMs);
        }));
        return observable;
    }
    /**
     * This makes sure the observable is being observed and keeps its cache alive.
     */
    function $Ad(observable) {
        const o = new $Cd(false, undefined);
        observable.addObserver(o);
        return (0, lifecycle_1.$Sc)(() => {
            observable.removeObserver(o);
        });
    }
    (0, base_1.$Wd)($Ad);
    /**
     * This converts the given observable into an autorun.
     */
    function $Bd(observable, handleValue) {
        const o = new $Cd(true, handleValue);
        observable.addObserver(o);
        if (handleValue) {
            handleValue(observable.get());
        }
        else {
            observable.reportChanges();
        }
        return (0, lifecycle_1.$Sc)(() => {
            observable.removeObserver(o);
        });
    }
    (0, base_1.$Vd)($Bd);
    class $Cd {
        constructor(b, c) {
            this.b = b;
            this.c = c;
            this.a = 0;
        }
        beginUpdate(observable) {
            this.a++;
        }
        endUpdate(observable) {
            this.a--;
            if (this.a === 0 && this.b) {
                if (this.c) {
                    this.c(observable.get());
                }
                else {
                    observable.reportChanges();
                }
            }
        }
        handlePossibleChange(observable) {
            // NO OP
        }
        handleChange(observable, change) {
            // NO OP
        }
    }
    exports.$Cd = $Cd;
    function $Dd(owner, computeFn) {
        let lastValue = undefined;
        const observable = (0, derived_1.$Pd)({ owner, debugReferenceFn: computeFn }, reader => {
            lastValue = computeFn(reader, lastValue);
            return lastValue;
        });
        return observable;
    }
    function $Ed(owner, computeFn) {
        let lastValue = undefined;
        const onChange = $wd('derivedObservableWithWritableCache');
        const observable = (0, derived_1.$Nd)(owner, reader => {
            onChange.read(reader);
            lastValue = computeFn(reader, lastValue);
            return lastValue;
        });
        return Object.assign(observable, {
            clearCache: (tx) => {
                lastValue = undefined;
                onChange.trigger(tx);
            },
            setCache: (newValue, tx) => {
                lastValue = newValue;
                onChange.trigger(tx);
            }
        });
    }
    /**
     * When the items array changes, referential equal items are not mapped again.
     */
    function $Fd(owner, items, map, keySelector) {
        let m = new ArrayMap(map, keySelector);
        const self = (0, derived_1.$Pd)({
            debugReferenceFn: map,
            owner,
            onLastObserverRemoved: () => {
                m.dispose();
                m = new ArrayMap(map);
            }
        }, (reader) => {
            m.setItems(items.read(reader));
            return m.getItems();
        });
        return self;
    }
    class ArrayMap {
        constructor(c, e) {
            this.c = c;
            this.e = e;
            this.a = new Map();
            this.b = [];
        }
        dispose() {
            this.a.forEach(entry => entry.store.dispose());
            this.a.clear();
        }
        setItems(items) {
            const newItems = [];
            const itemsToRemove = new Set(this.a.keys());
            for (const item of items) {
                const key = this.e ? this.e(item) : item;
                let entry = this.a.get(key);
                if (!entry) {
                    const store = new lifecycle_1.$Tc();
                    const out = this.c(item, store);
                    entry = { out, store };
                    this.a.set(key, entry);
                }
                else {
                    itemsToRemove.delete(key);
                }
                newItems.push(entry.out);
            }
            for (const item of itemsToRemove) {
                const entry = this.a.get(item);
                entry.store.dispose();
                this.a.delete(item);
            }
            this.b = newItems;
        }
        getItems() {
            return this.b;
        }
    }
    class $Gd {
        constructor(observable) {
            this.observable = observable;
        }
        get onDidChange() {
            return event_1.Event.fromObservableLight(this.observable);
        }
        get value() {
            return this.observable.get();
        }
    }
    exports.$Gd = $Gd;
    function $Hd(owner, value) {
        if (value instanceof $Gd) {
            return value.observable;
        }
        return $sd(owner, value.onDidChange, () => value.value);
    }
    /**
     * Creates an observable that has the latest changed value of the given observables.
     * Initially (and when not observed), it has the value of the last observable.
     * When observed and any of the observables change, it has the value of the last changed observable.
     * If multiple observables change in the same transaction, the last observable wins.
    */
    function $Id(owner, observables) {
        if (observables.length === 0) {
            throw new errors_1.$bb();
        }
        let hasLastChangedValue = false;
        let lastChangedValue = undefined;
        const result = $sd(owner, cb => {
            const store = new lifecycle_1.$Tc();
            for (const o of observables) {
                store.add((0, autorun_1.$kd)({ debugName: () => (0, debugName_1.$bd)(result, new debugName_1.$ad(owner, undefined, undefined)) + '.updateLastChangedValue' }, reader => {
                    hasLastChangedValue = true;
                    lastChangedValue = o.read(reader);
                    cb();
                }));
            }
            store.add({
                dispose() {
                    hasLastChangedValue = false;
                    lastChangedValue = undefined;
                },
            });
            return store;
        }, () => {
            if (hasLastChangedValue) {
                return lastChangedValue;
            }
            else {
                return observables[observables.length - 1].get();
            }
        });
        return result;
    }
    /**
     * Works like a derived.
     * However, if the value is not undefined, it is cached and will not be recomputed anymore.
     * In that case, the derived will unsubscribe from its dependencies.
    */
    function $Jd(owner, fn) {
        return $Dd(owner, (reader, lastValue) => lastValue ?? fn(reader));
    }
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(__m[16/*vs/base/common/observable*/], __M([0/*require*/,1/*exports*/,4/*vs/base/common/observableInternal/base*/,10/*vs/base/common/observableInternal/derived*/,9/*vs/base/common/observableInternal/autorun*/,34/*vs/base/common/observableInternal/utils*/,32/*vs/base/common/observableInternal/promise*/,31/*vs/base/common/observableInternal/api*/,7/*vs/base/common/observableInternal/logging*/]), function (require, exports, base_1, derived_1, autorun_1, utils_1, promise_1, api_1, logging_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.observableValueOpts = exports.derivedWithCancellationToken = exports.waitForState = exports.PromiseResult = exports.ObservablePromise = exports.ObservableLazyPromise = exports.ObservableLazy = exports.wasEventTriggeredRecently = exports.observableSignalFromEvent = exports.observableSignal = exports.observableFromPromise = exports.observableFromEvent = exports.recomputeInitiallyAndOnChange = exports.keepObserved = exports.derivedObservableWithWritableCache = exports.derivedObservableWithCache = exports.debouncedObservable = exports.constObservable = exports.autorunWithStoreHandleChanges = exports.autorunOpts = exports.autorunWithStore = exports.autorunHandleChanges = exports.autorunDelta = exports.autorun = exports.derivedWithStore = exports.derivedHandleChanges = exports.derivedOpts = exports.derived = exports.subtransaction = exports.transaction = exports.disposableObservableValue = exports.observableValue = void 0;
    Object.defineProperty(exports, "observableValue", { enumerable: true, get: function () { return base_1.$6d; } });
    Object.defineProperty(exports, "disposableObservableValue", { enumerable: true, get: function () { return base_1.$8d; } });
    Object.defineProperty(exports, "transaction", { enumerable: true, get: function () { return base_1.$1d; } });
    Object.defineProperty(exports, "subtransaction", { enumerable: true, get: function () { return base_1.$4d; } });
    Object.defineProperty(exports, "derived", { enumerable: true, get: function () { return derived_1.$Nd; } });
    Object.defineProperty(exports, "derivedOpts", { enumerable: true, get: function () { return derived_1.$Pd; } });
    Object.defineProperty(exports, "derivedHandleChanges", { enumerable: true, get: function () { return derived_1.$Qd; } });
    Object.defineProperty(exports, "derivedWithStore", { enumerable: true, get: function () { return derived_1.$Rd; } });
    Object.defineProperty(exports, "autorun", { enumerable: true, get: function () { return autorun_1.$jd; } });
    Object.defineProperty(exports, "autorunDelta", { enumerable: true, get: function () { return autorun_1.$od; } });
    Object.defineProperty(exports, "autorunHandleChanges", { enumerable: true, get: function () { return autorun_1.$ld; } });
    Object.defineProperty(exports, "autorunWithStore", { enumerable: true, get: function () { return autorun_1.$nd; } });
    Object.defineProperty(exports, "autorunOpts", { enumerable: true, get: function () { return autorun_1.$kd; } });
    Object.defineProperty(exports, "autorunWithStoreHandleChanges", { enumerable: true, get: function () { return autorun_1.$md; } });
    Object.defineProperty(exports, "constObservable", { enumerable: true, get: function () { return utils_1.$qd; } });
    Object.defineProperty(exports, "debouncedObservable", { enumerable: true, get: function () { return utils_1.$xd; } });
    Object.defineProperty(exports, "derivedObservableWithCache", { enumerable: true, get: function () { return utils_1.$Dd; } });
    Object.defineProperty(exports, "derivedObservableWithWritableCache", { enumerable: true, get: function () { return utils_1.$Ed; } });
    Object.defineProperty(exports, "keepObserved", { enumerable: true, get: function () { return utils_1.$Ad; } });
    Object.defineProperty(exports, "recomputeInitiallyAndOnChange", { enumerable: true, get: function () { return utils_1.$Bd; } });
    Object.defineProperty(exports, "observableFromEvent", { enumerable: true, get: function () { return utils_1.$sd; } });
    Object.defineProperty(exports, "observableFromPromise", { enumerable: true, get: function () { return utils_1.$rd; } });
    Object.defineProperty(exports, "observableSignal", { enumerable: true, get: function () { return utils_1.$wd; } });
    Object.defineProperty(exports, "observableSignalFromEvent", { enumerable: true, get: function () { return utils_1.$vd; } });
    Object.defineProperty(exports, "wasEventTriggeredRecently", { enumerable: true, get: function () { return utils_1.$zd; } });
    Object.defineProperty(exports, "ObservableLazy", { enumerable: true, get: function () { return promise_1.$0d; } });
    Object.defineProperty(exports, "ObservableLazyPromise", { enumerable: true, get: function () { return promise_1.$ae; } });
    Object.defineProperty(exports, "ObservablePromise", { enumerable: true, get: function () { return promise_1.$$d; } });
    Object.defineProperty(exports, "PromiseResult", { enumerable: true, get: function () { return promise_1.$_d; } });
    Object.defineProperty(exports, "waitForState", { enumerable: true, get: function () { return promise_1.$be; } });
    Object.defineProperty(exports, "derivedWithCancellationToken", { enumerable: true, get: function () { return promise_1.$ce; } });
    Object.defineProperty(exports, "observableValueOpts", { enumerable: true, get: function () { return api_1.$ee; } });
    // Remove "//" in the next line to enable logging
    const enableLogging = false;
    if (enableLogging) {
        (0, logging_1.$Kd)(new logging_1.$Md());
    }
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(__m[35/*vs/base/common/stream*/], __M([0/*require*/,1/*exports*/,8/*vs/base/common/errors*/,2/*vs/base/common/lifecycle*/]), function (require, exports, errors_1, lifecycle_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.$ye = $ye;
    exports.$ze = $ze;
    exports.$Ae = $Ae;
    exports.$Be = $Be;
    exports.$Ce = $Ce;
    exports.$De = $De;
    exports.$Ee = $Ee;
    exports.$Fe = $Fe;
    exports.$Ge = $Ge;
    exports.$He = $He;
    exports.$Ie = $Ie;
    exports.$Je = $Je;
    exports.$Ke = $Ke;
    exports.$Le = $Le;
    exports.$Me = $Me;
    function $ye(obj) {
        const candidate = obj;
        if (!candidate) {
            return false;
        }
        return typeof candidate.read === 'function';
    }
    function $ze(obj) {
        const candidate = obj;
        if (!candidate) {
            return false;
        }
        return [candidate.on, candidate.pause, candidate.resume, candidate.destroy].every(fn => typeof fn === 'function');
    }
    function $Ae(obj) {
        const candidate = obj;
        if (!candidate) {
            return false;
        }
        return $ze(candidate.stream) && Array.isArray(candidate.buffer) && typeof candidate.ended === 'boolean';
    }
    function $Be(reducer, options) {
        return new WriteableStreamImpl(reducer, options);
    }
    class WriteableStreamImpl {
        constructor(e, f) {
            this.e = e;
            this.f = f;
            this.a = {
                flowing: false,
                ended: false,
                destroyed: false
            };
            this.b = {
                data: [],
                error: []
            };
            this.c = {
                data: [],
                error: [],
                end: []
            };
            this.d = [];
        }
        pause() {
            if (this.a.destroyed) {
                return;
            }
            this.a.flowing = false;
        }
        resume() {
            if (this.a.destroyed) {
                return;
            }
            if (!this.a.flowing) {
                this.a.flowing = true;
                // emit buffered events
                this.j();
                this.k();
                this.l();
            }
        }
        write(data) {
            if (this.a.destroyed) {
                return;
            }
            // flowing: directly send the data to listeners
            if (this.a.flowing) {
                this.g(data);
            }
            // not yet flowing: buffer data until flowing
            else {
                this.b.data.push(data);
                // highWaterMark: if configured, signal back when buffer reached limits
                if (typeof this.f?.highWaterMark === 'number' && this.b.data.length > this.f.highWaterMark) {
                    return new Promise(resolve => this.d.push(resolve));
                }
            }
        }
        error(error) {
            if (this.a.destroyed) {
                return;
            }
            // flowing: directly send the error to listeners
            if (this.a.flowing) {
                this.h(error);
            }
            // not yet flowing: buffer errors until flowing
            else {
                this.b.error.push(error);
            }
        }
        end(result) {
            if (this.a.destroyed) {
                return;
            }
            // end with data if provided
            if (typeof result !== 'undefined') {
                this.write(result);
            }
            // flowing: send end event to listeners
            if (this.a.flowing) {
                this.i();
                this.destroy();
            }
            // not yet flowing: remember state
            else {
                this.a.ended = true;
            }
        }
        g(data) {
            this.c.data.slice(0).forEach(listener => listener(data)); // slice to avoid listener mutation from delivering event
        }
        h(error) {
            if (this.c.error.length === 0) {
                (0, errors_1.$Y)(error); // nobody listened to this error so we log it as unexpected
            }
            else {
                this.c.error.slice(0).forEach(listener => listener(error)); // slice to avoid listener mutation from delivering event
            }
        }
        i() {
            this.c.end.slice(0).forEach(listener => listener()); // slice to avoid listener mutation from delivering event
        }
        on(event, callback) {
            if (this.a.destroyed) {
                return;
            }
            switch (event) {
                case 'data':
                    this.c.data.push(callback);
                    // switch into flowing mode as soon as the first 'data'
                    // listener is added and we are not yet in flowing mode
                    this.resume();
                    break;
                case 'end':
                    this.c.end.push(callback);
                    // emit 'end' event directly if we are flowing
                    // and the end has already been reached
                    //
                    // finish() when it went through
                    if (this.a.flowing && this.l()) {
                        this.destroy();
                    }
                    break;
                case 'error':
                    this.c.error.push(callback);
                    // emit buffered 'error' events unless done already
                    // now that we know that we have at least one listener
                    if (this.a.flowing) {
                        this.k();
                    }
                    break;
            }
        }
        removeListener(event, callback) {
            if (this.a.destroyed) {
                return;
            }
            let listeners = undefined;
            switch (event) {
                case 'data':
                    listeners = this.c.data;
                    break;
                case 'end':
                    listeners = this.c.end;
                    break;
                case 'error':
                    listeners = this.c.error;
                    break;
            }
            if (listeners) {
                const index = listeners.indexOf(callback);
                if (index >= 0) {
                    listeners.splice(index, 1);
                }
            }
        }
        j() {
            if (this.b.data.length > 0) {
                const fullDataBuffer = this.e(this.b.data);
                this.g(fullDataBuffer);
                this.b.data.length = 0;
                // When the buffer is empty, resolve all pending writers
                const pendingWritePromises = [...this.d];
                this.d.length = 0;
                pendingWritePromises.forEach(pendingWritePromise => pendingWritePromise());
            }
        }
        k() {
            if (this.c.error.length > 0) {
                for (const error of this.b.error) {
                    this.h(error);
                }
                this.b.error.length = 0;
            }
        }
        l() {
            if (this.a.ended) {
                this.i();
                return this.c.end.length > 0;
            }
            return false;
        }
        destroy() {
            if (!this.a.destroyed) {
                this.a.destroyed = true;
                this.a.ended = true;
                this.b.data.length = 0;
                this.b.error.length = 0;
                this.c.data.length = 0;
                this.c.error.length = 0;
                this.c.end.length = 0;
                this.d.length = 0;
            }
        }
    }
    /**
     * Helper to fully read a T readable into a T.
     */
    function $Ce(readable, reducer) {
        const chunks = [];
        let chunk;
        while ((chunk = readable.read()) !== null) {
            chunks.push(chunk);
        }
        return reducer(chunks);
    }
    /**
     * Helper to read a T readable up to a maximum of chunks. If the limit is
     * reached, will return a readable instead to ensure all data can still
     * be read.
     */
    function $De(readable, reducer, maxChunks) {
        const chunks = [];
        let chunk = undefined;
        while ((chunk = readable.read()) !== null && chunks.length < maxChunks) {
            chunks.push(chunk);
        }
        // If the last chunk is null, it means we reached the end of
        // the readable and return all the data at once
        if (chunk === null && chunks.length > 0) {
            return reducer(chunks);
        }
        // Otherwise, we still have a chunk, it means we reached the maxChunks
        // value and as such we return a new Readable that first returns
        // the existing read chunks and then continues with reading from
        // the underlying readable.
        return {
            read: () => {
                // First consume chunks from our array
                if (chunks.length > 0) {
                    return chunks.shift();
                }
                // Then ensure to return our last read chunk
                if (typeof chunk !== 'undefined') {
                    const lastReadChunk = chunk;
                    // explicitly use undefined here to indicate that we consumed
                    // the chunk, which could have either been null or valued.
                    chunk = undefined;
                    return lastReadChunk;
                }
                // Finally delegate back to the Readable
                return readable.read();
            }
        };
    }
    function $Ee(stream, reducer) {
        return new Promise((resolve, reject) => {
            const chunks = [];
            $Fe(stream, {
                onData: chunk => {
                    if (reducer) {
                        chunks.push(chunk);
                    }
                },
                onError: error => {
                    if (reducer) {
                        reject(error);
                    }
                    else {
                        resolve(undefined);
                    }
                },
                onEnd: () => {
                    if (reducer) {
                        resolve(reducer(chunks));
                    }
                    else {
                        resolve(undefined);
                    }
                }
            });
        });
    }
    /**
     * Helper to listen to all events of a T stream in proper order.
     */
    function $Fe(stream, listener, token) {
        stream.on('error', error => {
            if (!token?.isCancellationRequested) {
                listener.onError(error);
            }
        });
        stream.on('end', () => {
            if (!token?.isCancellationRequested) {
                listener.onEnd();
            }
        });
        // Adding the `data` listener will turn the stream
        // into flowing mode. As such it is important to
        // add this listener last (DO NOT CHANGE!)
        stream.on('data', data => {
            if (!token?.isCancellationRequested) {
                listener.onData(data);
            }
        });
    }
    /**
     * Helper to peek up to `maxChunks` into a stream. The return type signals if
     * the stream has ended or not. If not, caller needs to add a `data` listener
     * to continue reading.
     */
    function $Ge(stream, maxChunks) {
        return new Promise((resolve, reject) => {
            const streamListeners = new lifecycle_1.$Tc();
            const buffer = [];
            // Data Listener
            const dataListener = (chunk) => {
                // Add to buffer
                buffer.push(chunk);
                // We reached maxChunks and thus need to return
                if (buffer.length > maxChunks) {
                    // Dispose any listeners and ensure to pause the
                    // stream so that it can be consumed again by caller
                    streamListeners.dispose();
                    stream.pause();
                    return resolve({ stream, buffer, ended: false });
                }
            };
            // Error Listener
            const errorListener = (error) => {
                streamListeners.dispose();
                return reject(error);
            };
            // End Listener
            const endListener = () => {
                streamListeners.dispose();
                return resolve({ stream, buffer, ended: true });
            };
            streamListeners.add((0, lifecycle_1.$Sc)(() => stream.removeListener('error', errorListener)));
            stream.on('error', errorListener);
            streamListeners.add((0, lifecycle_1.$Sc)(() => stream.removeListener('end', endListener)));
            stream.on('end', endListener);
            // Important: leave the `data` listener last because
            // this can turn the stream into flowing mode and we
            // want `error` events to be received as well.
            streamListeners.add((0, lifecycle_1.$Sc)(() => stream.removeListener('data', dataListener)));
            stream.on('data', dataListener);
        });
    }
    /**
     * Helper to create a readable stream from an existing T.
     */
    function $He(t, reducer) {
        const stream = $Be(reducer);
        stream.end(t);
        return stream;
    }
    /**
     * Helper to create an empty stream
     */
    function $Ie() {
        const stream = $Be(() => { throw new Error('not supported'); });
        stream.end();
        return stream;
    }
    /**
     * Helper to convert a T into a Readable<T>.
     */
    function $Je(t) {
        let consumed = false;
        return {
            read: () => {
                if (consumed) {
                    return null;
                }
                consumed = true;
                return t;
            }
        };
    }
    /**
     * Helper to transform a readable stream into another stream.
     */
    function $Ke(stream, transformer, reducer) {
        const target = $Be(reducer);
        $Fe(stream, {
            onData: data => target.write(transformer.data(data)),
            onError: error => target.error(transformer.error ? transformer.error(error) : error),
            onEnd: () => target.end()
        });
        return target;
    }
    /**
     * Helper to take an existing readable that will
     * have a prefix injected to the beginning.
     */
    function $Le(prefix, readable, reducer) {
        let prefixHandled = false;
        return {
            read: () => {
                const chunk = readable.read();
                // Handle prefix only once
                if (!prefixHandled) {
                    prefixHandled = true;
                    // If we have also a read-result, make
                    // sure to reduce it to a single result
                    if (chunk !== null) {
                        return reducer([prefix, chunk]);
                    }
                    // Otherwise, just return prefix directly
                    return prefix;
                }
                return chunk;
            }
        };
    }
    /**
     * Helper to take an existing stream that will
     * have a prefix injected to the beginning.
     */
    function $Me(prefix, stream, reducer) {
        let prefixHandled = false;
        const target = $Be(reducer);
        $Fe(stream, {
            onData: data => {
                // Handle prefix only once
                if (!prefixHandled) {
                    prefixHandled = true;
                    return target.write(reducer([prefix, data]));
                }
                return target.write(data);
            },
            onError: error => target.error(error),
            onEnd: () => {
                // Handle prefix only once
                if (!prefixHandled) {
                    prefixHandled = true;
                    target.write(prefix);
                }
                target.end();
            }
        });
        return target;
    }
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/























define(__m[17/*vs/base/common/buffer*/], __M([0/*require*/,1/*exports*/,36/*vs/base/common/lazy*/,35/*vs/base/common/stream*/]), function (require, exports, lazy_1, streams) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.$Ne = void 0;
    exports.$Oe = $Oe;
    exports.$Pe = $Pe;
    exports.$Qe = $Qe;
    exports.$Re = $Re;
    exports.$Se = $Se;
    exports.$Te = $Te;
    exports.$Ue = $Ue;
    exports.$Ve = $Ve;
    exports.$We = $We;
    exports.$Xe = $Xe;
    exports.$Ye = $Ye;
    exports.$Ze = $Ze;
    exports.$1e = $1e;
    exports.$2e = $2e;
    exports.$3e = $3e;
    exports.$4e = $4e;
    exports.$5e = $5e;
    exports.$6e = $6e;
    exports.$7e = $7e;
    exports.$8e = $8e;
    streams = __importStar(streams);
    const hasBuffer = (typeof Buffer !== 'undefined');
    const indexOfTable = new lazy_1.$T(() => new Uint8Array(256));
    let textEncoder;
    let textDecoder;
    class $Ne {
        /**
         * When running in a nodejs context, the backing store for the returned `VSBuffer` instance
         * might use a nodejs Buffer allocated from node's Buffer pool, which is not transferrable.
         */
        static alloc(byteLength) {
            if (hasBuffer) {
                return new $Ne(Buffer.allocUnsafe(byteLength));
            }
            else {
                return new $Ne(new Uint8Array(byteLength));
            }
        }
        /**
         * When running in a nodejs context, if `actual` is not a nodejs Buffer, the backing store for
         * the returned `VSBuffer` instance might use a nodejs Buffer allocated from node's Buffer pool,
         * which is not transferrable.
         */
        static wrap(actual) {
            if (hasBuffer && !(Buffer.isBuffer(actual))) {
                // https://nodejs.org/dist/latest-v10.x/docs/api/buffer.html#buffer_class_method_buffer_from_arraybuffer_byteoffset_length
                // Create a zero-copy Buffer wrapper around the ArrayBuffer pointed to by the Uint8Array
                actual = Buffer.from(actual.buffer, actual.byteOffset, actual.byteLength);
            }
            return new $Ne(actual);
        }
        /**
         * When running in a nodejs context, the backing store for the returned `VSBuffer` instance
         * might use a nodejs Buffer allocated from node's Buffer pool, which is not transferrable.
         */
        static fromString(source, options) {
            const dontUseNodeBuffer = options?.dontUseNodeBuffer || false;
            if (!dontUseNodeBuffer && hasBuffer) {
                return new $Ne(Buffer.from(source));
            }
            else {
                if (!textEncoder) {
                    textEncoder = new TextEncoder();
                }
                return new $Ne(textEncoder.encode(source));
            }
        }
        /**
         * When running in a nodejs context, the backing store for the returned `VSBuffer` instance
         * might use a nodejs Buffer allocated from node's Buffer pool, which is not transferrable.
         */
        static fromByteArray(source) {
            const result = $Ne.alloc(source.length);
            for (let i = 0, len = source.length; i < len; i++) {
                result.buffer[i] = source[i];
            }
            return result;
        }
        /**
         * When running in a nodejs context, the backing store for the returned `VSBuffer` instance
         * might use a nodejs Buffer allocated from node's Buffer pool, which is not transferrable.
         */
        static concat(buffers, totalLength) {
            if (typeof totalLength === 'undefined') {
                totalLength = 0;
                for (let i = 0, len = buffers.length; i < len; i++) {
                    totalLength += buffers[i].byteLength;
                }
            }
            const ret = $Ne.alloc(totalLength);
            let offset = 0;
            for (let i = 0, len = buffers.length; i < len; i++) {
                const element = buffers[i];
                ret.set(element, offset);
                offset += element.byteLength;
            }
            return ret;
        }
        constructor(buffer) {
            this.buffer = buffer;
            this.byteLength = this.buffer.byteLength;
        }
        /**
         * When running in a nodejs context, the backing store for the returned `VSBuffer` instance
         * might use a nodejs Buffer allocated from node's Buffer pool, which is not transferrable.
         */
        clone() {
            const result = $Ne.alloc(this.byteLength);
            result.set(this);
            return result;
        }
        toString() {
            if (hasBuffer) {
                return this.buffer.toString();
            }
            else {
                if (!textDecoder) {
                    textDecoder = new TextDecoder();
                }
                return textDecoder.decode(this.buffer);
            }
        }
        slice(start, end) {
            // IMPORTANT: use subarray instead of slice because TypedArray#slice
            // creates shallow copy and NodeBuffer#slice doesn't. The use of subarray
            // ensures the same, performance, behaviour.
            return new $Ne(this.buffer.subarray(start, end));
        }
        set(array, offset) {
            if (array instanceof $Ne) {
                this.buffer.set(array.buffer, offset);
            }
            else if (array instanceof Uint8Array) {
                this.buffer.set(array, offset);
            }
            else if (array instanceof ArrayBuffer) {
                this.buffer.set(new Uint8Array(array), offset);
            }
            else if (ArrayBuffer.isView(array)) {
                this.buffer.set(new Uint8Array(array.buffer, array.byteOffset, array.byteLength), offset);
            }
            else {
                throw new Error(`Unknown argument 'array'`);
            }
        }
        readUInt32BE(offset) {
            return $Re(this.buffer, offset);
        }
        writeUInt32BE(value, offset) {
            $Se(this.buffer, value, offset);
        }
        readUInt32LE(offset) {
            return $Te(this.buffer, offset);
        }
        writeUInt32LE(value, offset) {
            $Ue(this.buffer, value, offset);
        }
        readUInt8(offset) {
            return $Ve(this.buffer, offset);
        }
        writeUInt8(value, offset) {
            $We(this.buffer, value, offset);
        }
        indexOf(subarray, offset = 0) {
            return $Oe(this.buffer, subarray instanceof $Ne ? subarray.buffer : subarray, offset);
        }
    }
    exports.$Ne = $Ne;
    /**
     * Like String.indexOf, but works on Uint8Arrays.
     * Uses the boyer-moore-horspool algorithm to be reasonably speedy.
     */
    function $Oe(haystack, needle, offset = 0) {
        const needleLen = needle.byteLength;
        const haystackLen = haystack.byteLength;
        if (needleLen === 0) {
            return 0;
        }
        if (needleLen === 1) {
            return haystack.indexOf(needle[0]);
        }
        if (needleLen > haystackLen - offset) {
            return -1;
        }
        // find index of the subarray using boyer-moore-horspool algorithm
        const table = indexOfTable.value;
        table.fill(needle.length);
        for (let i = 0; i < needle.length; i++) {
            table[needle[i]] = needle.length - i - 1;
        }
        let i = offset + needle.length - 1;
        let j = i;
        let result = -1;
        while (i < haystackLen) {
            if (haystack[i] === needle[j]) {
                if (j === 0) {
                    result = i;
                    break;
                }
                i--;
                j--;
            }
            else {
                i += Math.max(needle.length - j, table[haystack[i]]);
                j = needle.length - 1;
            }
        }
        return result;
    }
    function $Pe(source, offset) {
        return (((source[offset + 0] << 0) >>> 0) |
            ((source[offset + 1] << 8) >>> 0));
    }
    function $Qe(destination, value, offset) {
        destination[offset + 0] = (value & 0b11111111);
        value = value >>> 8;
        destination[offset + 1] = (value & 0b11111111);
    }
    function $Re(source, offset) {
        return (source[offset] * 2 ** 24
            + source[offset + 1] * 2 ** 16
            + source[offset + 2] * 2 ** 8
            + source[offset + 3]);
    }
    function $Se(destination, value, offset) {
        destination[offset + 3] = value;
        value = value >>> 8;
        destination[offset + 2] = value;
        value = value >>> 8;
        destination[offset + 1] = value;
        value = value >>> 8;
        destination[offset] = value;
    }
    function $Te(source, offset) {
        return (((source[offset + 0] << 0) >>> 0) |
            ((source[offset + 1] << 8) >>> 0) |
            ((source[offset + 2] << 16) >>> 0) |
            ((source[offset + 3] << 24) >>> 0));
    }
    function $Ue(destination, value, offset) {
        destination[offset + 0] = (value & 0b11111111);
        value = value >>> 8;
        destination[offset + 1] = (value & 0b11111111);
        value = value >>> 8;
        destination[offset + 2] = (value & 0b11111111);
        value = value >>> 8;
        destination[offset + 3] = (value & 0b11111111);
    }
    function $Ve(source, offset) {
        return source[offset];
    }
    function $We(destination, value, offset) {
        destination[offset] = value;
    }
    function $Xe(readable) {
        return streams.$Ce(readable, chunks => $Ne.concat(chunks));
    }
    function $Ye(buffer) {
        return streams.$Je(buffer);
    }
    function $Ze(stream) {
        return streams.$Ee(stream, chunks => $Ne.concat(chunks));
    }
    async function $1e(bufferedStream) {
        if (bufferedStream.ended) {
            return $Ne.concat(bufferedStream.buffer);
        }
        return $Ne.concat([
            // Include already read chunks...
            ...bufferedStream.buffer,
            // ...and all additional chunks
            await $Ze(bufferedStream.stream)
        ]);
    }
    function $2e(buffer) {
        return streams.$He(buffer, chunks => $Ne.concat(chunks));
    }
    function $3e(stream) {
        return streams.$Ke(stream, { data: data => typeof data === 'string' ? $Ne.fromString(data) : $Ne.wrap(data) }, chunks => $Ne.concat(chunks));
    }
    function $4e(options) {
        return streams.$Be(chunks => $Ne.concat(chunks), options);
    }
    function $5e(prefix, readable) {
        return streams.$Le(prefix, readable, chunks => $Ne.concat(chunks));
    }
    function $6e(prefix, stream) {
        return streams.$Me(prefix, stream, chunks => $Ne.concat(chunks));
    }
    /** Decodes base64 to a uint8 array. URL-encoded and unpadded base64 is allowed. */
    function $7e(encoded) {
        let building = 0;
        let remainder = 0;
        let bufi = 0;
        // The simpler way to do this is `Uint8Array.from(atob(str), c => c.charCodeAt(0))`,
        // but that's about 10-20x slower than this function in current Chromium versions.
        const buffer = new Uint8Array(Math.floor(encoded.length / 4 * 3));
        const append = (value) => {
            switch (remainder) {
                case 3:
                    buffer[bufi++] = building | value;
                    remainder = 0;
                    break;
                case 2:
                    buffer[bufi++] = building | (value >>> 2);
                    building = value << 6;
                    remainder = 3;
                    break;
                case 1:
                    buffer[bufi++] = building | (value >>> 4);
                    building = value << 4;
                    remainder = 2;
                    break;
                default:
                    building = value << 2;
                    remainder = 1;
            }
        };
        for (let i = 0; i < encoded.length; i++) {
            const code = encoded.charCodeAt(i);
            // See https://datatracker.ietf.org/doc/html/rfc4648#section-4
            // This branchy code is about 3x faster than an indexOf on a base64 char string.
            if (code >= 65 && code <= 90) {
                append(code - 65); // A-Z starts ranges from char code 65 to 90
            }
            else if (code >= 97 && code <= 122) {
                append(code - 97 + 26); // a-z starts ranges from char code 97 to 122, starting at byte 26
            }
            else if (code >= 48 && code <= 57) {
                append(code - 48 + 52); // 0-9 starts ranges from char code 48 to 58, starting at byte 52
            }
            else if (code === 43 || code === 45) {
                append(62); // "+" or "-" for URLS
            }
            else if (code === 47 || code === 95) {
                append(63); // "/" or "_" for URLS
            }
            else if (code === 61) {
                break; // "="
            }
            else {
                throw new SyntaxError(`Unexpected base64 character ${encoded[i]}`);
            }
        }
        const unpadded = bufi;
        while (remainder > 0) {
            append(0);
        }
        // slice is needed to account for overestimation due to padding
        return $Ne.wrap(buffer).slice(0, unpadded);
    }
    const base64Alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    const base64UrlSafeAlphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
    /** Encodes a buffer to a base64 string. */
    function $8e({ buffer }, padded = true, urlSafe = false) {
        const dictionary = urlSafe ? base64UrlSafeAlphabet : base64Alphabet;
        let output = '';
        const remainder = buffer.byteLength % 3;
        let i = 0;
        for (; i < buffer.byteLength - remainder; i += 3) {
            const a = buffer[i + 0];
            const b = buffer[i + 1];
            const c = buffer[i + 2];
            output += dictionary[a >>> 2];
            output += dictionary[(a << 4 | b >>> 4) & 0b111111];
            output += dictionary[(b << 2 | c >>> 6) & 0b111111];
            output += dictionary[c & 0b111111];
        }
        if (remainder === 1) {
            const a = buffer[i + 0];
            output += dictionary[a >>> 2];
            output += dictionary[(a << 4) & 0b111111];
            if (padded) {
                output += '==';
            }
        }
        else if (remainder === 2) {
            const a = buffer[i + 0];
            const b = buffer[i + 1];
            output += dictionary[a >>> 2];
            output += dictionary[(a << 4 | b >>> 4) & 0b111111];
            output += dictionary[(b << 2) & 0b111111];
            if (padded) {
                output += '=';
            }
        }
        return output;
    }
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(__m[37/*vs/base/common/symbols*/], __M([0/*require*/,1/*exports*/]), function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.$ge = void 0;
    /**
     * Can be passed into the Delayed to defer using a microtask
     * */
    exports.$ge = Symbol('MicrotaskDelay');
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(__m[38/*vs/base/common/extpath*/], __M([0/*require*/,1/*exports*/,18/*vs/base/common/charCode*/,19/*vs/base/common/path*/,5/*vs/base/common/platform*/,20/*vs/base/common/strings*/,39/*vs/base/common/types*/]), function (require, exports, charCode_1, path_1, platform_1, strings_1, types_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.$xg = $xg;
    exports.$yg = $yg;
    exports.$zg = $zg;
    exports.$Ag = $Ag;
    exports.$Bg = $Bg;
    exports.$Cg = $Cg;
    exports.$Dg = $Dg;
    exports.$Eg = $Eg;
    exports.$Fg = $Fg;
    exports.$Gg = $Gg;
    exports.$Hg = $Hg;
    exports.$Ig = $Ig;
    exports.$Jg = $Jg;
    exports.$Kg = $Kg;
    exports.$Lg = $Lg;
    exports.$Mg = $Mg;
    exports.$Ng = $Ng;
    function $xg(code) {
        return code === charCode_1.CharCode.Slash || code === charCode_1.CharCode.Backslash;
    }
    /**
     * Takes a Windows OS path and changes backward slashes to forward slashes.
     * This should only be done for OS paths from Windows (or user provided paths potentially from Windows).
     * Using it on a Linux or MaxOS path might change it.
     */
    function $yg(osPath) {
        return osPath.replace(/[\\/]/g, path_1.$gc.sep);
    }
    /**
     * Takes a Windows OS path (using backward or forward slashes) and turns it into a posix path:
     * - turns backward slashes into forward slashes
     * - makes it absolute if it starts with a drive letter
     * This should only be done for OS paths from Windows (or user provided paths potentially from Windows).
     * Using it on a Linux or MaxOS path might change it.
     */
    function $zg(osPath) {
        if (osPath.indexOf('/') === -1) {
            osPath = $yg(osPath);
        }
        if (/^[a-zA-Z]:(\/|$)/.test(osPath)) { // starts with a drive letter
            osPath = '/' + osPath;
        }
        return osPath;
    }
    /**
     * Computes the _root_ this path, like `getRoot('c:\files') === c:\`,
     * `getRoot('files:///files/path') === files:///`,
     * or `getRoot('\\server\shares\path') === \\server\shares\`
     */
    function $Ag(path, sep = path_1.$gc.sep) {
        if (!path) {
            return '';
        }
        const len = path.length;
        const firstLetter = path.charCodeAt(0);
        if ($xg(firstLetter)) {
            if ($xg(path.charCodeAt(1))) {
                // UNC candidate \\localhost\shares\ddd
                //               ^^^^^^^^^^^^^^^^^^^
                if (!$xg(path.charCodeAt(2))) {
                    let pos = 3;
                    const start = pos;
                    for (; pos < len; pos++) {
                        if ($xg(path.charCodeAt(pos))) {
                            break;
                        }
                    }
                    if (start !== pos && !$xg(path.charCodeAt(pos + 1))) {
                        pos += 1;
                        for (; pos < len; pos++) {
                            if ($xg(path.charCodeAt(pos))) {
                                return path.slice(0, pos + 1) // consume this separator
                                    .replace(/[\\/]/g, sep);
                            }
                        }
                    }
                }
            }
            // /user/far
            // ^
            return sep;
        }
        else if ($Fg(firstLetter)) {
            // check for windows drive letter c:\ or c:
            if (path.charCodeAt(1) === charCode_1.CharCode.Colon) {
                if ($xg(path.charCodeAt(2))) {
                    // C:\fff
                    // ^^^
                    return path.slice(0, 2) + sep;
                }
                else {
                    // C:
                    // ^^
                    return path.slice(0, 2);
                }
            }
        }
        // check for URI
        // scheme://authority/path
        // ^^^^^^^^^^^^^^^^^^^
        let pos = path.indexOf('://');
        if (pos !== -1) {
            pos += 3; // 3 -> "://".length
            for (; pos < len; pos++) {
                if ($xg(path.charCodeAt(pos))) {
                    return path.slice(0, pos + 1); // consume this separator
                }
            }
        }
        return '';
    }
    /**
     * Check if the path follows this pattern: `\\hostname\sharename`.
     *
     * @see https://msdn.microsoft.com/en-us/library/gg465305.aspx
     * @return A boolean indication if the path is a UNC path, on none-windows
     * always false.
     */
    function $Bg(path) {
        if (!platform_1.$j) {
            // UNC is a windows concept
            return false;
        }
        if (!path || path.length < 5) {
            // at least \\a\b
            return false;
        }
        let code = path.charCodeAt(0);
        if (code !== charCode_1.CharCode.Backslash) {
            return false;
        }
        code = path.charCodeAt(1);
        if (code !== charCode_1.CharCode.Backslash) {
            return false;
        }
        let pos = 2;
        const start = pos;
        for (; pos < path.length; pos++) {
            code = path.charCodeAt(pos);
            if (code === charCode_1.CharCode.Backslash) {
                break;
            }
        }
        if (start === pos) {
            return false;
        }
        code = path.charCodeAt(pos + 1);
        if (isNaN(code) || code === charCode_1.CharCode.Backslash) {
            return false;
        }
        return true;
    }
    // Reference: https://en.wikipedia.org/wiki/Filename
    const WINDOWS_INVALID_FILE_CHARS = /[\\/:\*\?"<>\|]/g;
    const UNIX_INVALID_FILE_CHARS = /[/]/g;
    const WINDOWS_FORBIDDEN_NAMES = /^(con|prn|aux|clock\$|nul|lpt[0-9]|com[0-9])(\.(.*?))?$/i;
    function $Cg(name, isWindowsOS = platform_1.$j) {
        const invalidFileChars = isWindowsOS ? WINDOWS_INVALID_FILE_CHARS : UNIX_INVALID_FILE_CHARS;
        if (!name || name.length === 0 || /^\s+$/.test(name)) {
            return false; // require a name that is not just whitespace
        }
        invalidFileChars.lastIndex = 0; // the holy grail of software development
        if (invalidFileChars.test(name)) {
            return false; // check for certain invalid file characters
        }
        if (isWindowsOS && WINDOWS_FORBIDDEN_NAMES.test(name)) {
            return false; // check for certain invalid file names
        }
        if (name === '.' || name === '..') {
            return false; // check for reserved values
        }
        if (isWindowsOS && name[name.length - 1] === '.') {
            return false; // Windows: file cannot end with a "."
        }
        if (isWindowsOS && name.length !== name.trim().length) {
            return false; // Windows: file cannot end with a whitespace
        }
        if (name.length > 255) {
            return false; // most file systems do not allow files > 255 length
        }
        return true;
    }
    /**
     * @deprecated please use `IUriIdentityService.extUri.isEqual` instead. If you are
     * in a context without services, consider to pass down the `extUri` from the outside
     * or use `extUriBiasedIgnorePathCase` if you know what you are doing.
     */
    function $Dg(pathA, pathB, ignoreCase) {
        const identityEquals = (pathA === pathB);
        if (!ignoreCase || identityEquals) {
            return identityEquals;
        }
        if (!pathA || !pathB) {
            return false;
        }
        return (0, strings_1.$Ff)(pathA, pathB);
    }
    /**
     * @deprecated please use `IUriIdentityService.extUri.isEqualOrParent` instead. If
     * you are in a context without services, consider to pass down the `extUri` from the
     * outside, or use `extUriBiasedIgnorePathCase` if you know what you are doing.
     */
    function $Eg(base, parentCandidate, ignoreCase, separator = path_1.sep) {
        if (base === parentCandidate) {
            return true;
        }
        if (!base || !parentCandidate) {
            return false;
        }
        if (parentCandidate.length > base.length) {
            return false;
        }
        if (ignoreCase) {
            const beginsWith = (0, strings_1.$Gf)(base, parentCandidate);
            if (!beginsWith) {
                return false;
            }
            if (parentCandidate.length === base.length) {
                return true; // same path, different casing
            }
            let sepOffset = parentCandidate.length;
            if (parentCandidate.charAt(parentCandidate.length - 1) === separator) {
                sepOffset--; // adjust the expected sep offset in case our candidate already ends in separator character
            }
            return base.charAt(sepOffset) === separator;
        }
        if (parentCandidate.charAt(parentCandidate.length - 1) !== separator) {
            parentCandidate += separator;
        }
        return base.indexOf(parentCandidate) === 0;
    }
    function $Fg(char0) {
        return char0 >= charCode_1.CharCode.A && char0 <= charCode_1.CharCode.Z || char0 >= charCode_1.CharCode.a && char0 <= charCode_1.CharCode.z;
    }
    function $Gg(candidate, cwd) {
        // Special case: allow to open a drive letter without trailing backslash
        if (platform_1.$j && candidate.endsWith(':')) {
            candidate += path_1.sep;
        }
        // Ensure absolute
        if (!(0, path_1.$ic)(candidate)) {
            candidate = (0, path_1.$jc)(cwd, candidate);
        }
        // Ensure normalized
        candidate = (0, path_1.$hc)(candidate);
        // Ensure no trailing slash/backslash
        return $Hg(candidate);
    }
    function $Hg(candidate) {
        if (platform_1.$j) {
            candidate = (0, strings_1.$nf)(candidate, path_1.sep);
            // Special case: allow to open drive root ('C:\')
            if (candidate.endsWith(':')) {
                candidate += path_1.sep;
            }
        }
        else {
            candidate = (0, strings_1.$nf)(candidate, path_1.sep);
            // Special case: allow to open root ('/')
            if (!candidate) {
                candidate = path_1.sep;
            }
        }
        return candidate;
    }
    function $Ig(path) {
        const pathNormalized = (0, path_1.$hc)(path);
        if (platform_1.$j) {
            if (path.length > 3) {
                return false;
            }
            return $Jg(pathNormalized) &&
                (path.length === 2 || pathNormalized.charCodeAt(2) === charCode_1.CharCode.Backslash);
        }
        return pathNormalized === path_1.$gc.sep;
    }
    function $Jg(path, isWindowsOS = platform_1.$j) {
        if (isWindowsOS) {
            return $Fg(path.charCodeAt(0)) && path.charCodeAt(1) === charCode_1.CharCode.Colon;
        }
        return false;
    }
    function $Kg(path, isWindowsOS = platform_1.$j) {
        return $Jg(path, isWindowsOS) ? path[0] : undefined;
    }
    function $Lg(path, candidate, ignoreCase) {
        if (candidate.length > path.length) {
            return -1;
        }
        if (path === candidate) {
            return 0;
        }
        if (ignoreCase) {
            path = path.toLowerCase();
            candidate = candidate.toLowerCase();
        }
        return path.indexOf(candidate);
    }
    function $Mg(rawPath) {
        const segments = rawPath.split(':'); // C:\file.txt:<line>:<column>
        let path = undefined;
        let line = undefined;
        let column = undefined;
        for (const segment of segments) {
            const segmentAsNumber = Number(segment);
            if (!(0, types_1.$ig)(segmentAsNumber)) {
                path = !!path ? [path, segment].join(':') : segment; // a colon can well be part of a path (e.g. C:\...)
            }
            else if (line === undefined) {
                line = segmentAsNumber;
            }
            else if (column === undefined) {
                column = segmentAsNumber;
            }
        }
        if (!path) {
            throw new Error('Format for `--goto` should be: `FILE:LINE(:COLUMN)`');
        }
        return {
            path,
            line: line !== undefined ? line : undefined,
            column: column !== undefined ? column : line !== undefined ? 1 : undefined // if we have a line, make sure column is also set
        };
    }
    const pathChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const windowsSafePathFirstChars = 'BDEFGHIJKMOQRSTUVWXYZbdefghijkmoqrstuvwxyz0123456789';
    function $Ng(parent, prefix, randomLength = 8) {
        let suffix = '';
        for (let i = 0; i < randomLength; i++) {
            let pathCharsTouse;
            if (i === 0 && platform_1.$j && !prefix && (randomLength === 3 || randomLength === 4)) {
                // Windows has certain reserved file names that cannot be used, such
                // as AUX, CON, PRN, etc. We want to avoid generating a random name
                // that matches that pattern, so we use a different set of characters
                // for the first character of the name that does not include any of
                // the reserved names first characters.
                pathCharsTouse = windowsSafePathFirstChars;
            }
            else {
                pathCharsTouse = pathChars;
            }
            suffix += pathCharsTouse.charAt(Math.floor(Math.random() * pathCharsTouse.length));
        }
        let randomFileName;
        if (prefix) {
            randomFileName = `${prefix}-${suffix}`;
        }
        else {
            randomFileName = suffix;
        }
        if (parent) {
            return (0, path_1.$jc)(parent, randomFileName);
        }
        return randomFileName;
    }
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/























define(__m[21/*vs/base/common/network*/], __M([0/*require*/,1/*exports*/,8/*vs/base/common/errors*/,5/*vs/base/common/platform*/,20/*vs/base/common/strings*/,11/*vs/base/common/uri*/,19/*vs/base/common/path*/]), function (require, exports, errors, platform, strings_1, uri_1, paths) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.COI = exports.$Zg = exports.$Yg = exports.$Xg = exports.$Wg = exports.$Vg = exports.$Ug = exports.$Sg = exports.$Rg = exports.$Qg = exports.Schemas = void 0;
    exports.$Og = $Og;
    exports.$Pg = $Pg;
    exports.$Tg = $Tg;
    errors = __importStar(errors);
    platform = __importStar(platform);
    paths = __importStar(paths);
    var Schemas;
    (function (Schemas) {
        /**
         * A schema that is used for models that exist in memory
         * only and that have no correspondence on a server or such.
         */
        Schemas.inMemory = 'inmemory';
        /**
         * A schema that is used for setting files
         */
        Schemas.vscode = 'vscode';
        /**
         * A schema that is used for internal private files
         */
        Schemas.internal = 'private';
        /**
         * A walk-through document.
         */
        Schemas.walkThrough = 'walkThrough';
        /**
         * An embedded code snippet.
         */
        Schemas.walkThroughSnippet = 'walkThroughSnippet';
        Schemas.http = 'http';
        Schemas.https = 'https';
        Schemas.file = 'file';
        Schemas.mailto = 'mailto';
        Schemas.untitled = 'untitled';
        Schemas.data = 'data';
        Schemas.command = 'command';
        Schemas.vscodeRemote = 'vscode-remote';
        Schemas.vscodeRemoteResource = 'vscode-remote-resource';
        Schemas.vscodeManagedRemoteResource = 'vscode-managed-remote-resource';
        Schemas.vscodeUserData = 'vscode-userdata';
        Schemas.vscodeCustomEditor = 'vscode-custom-editor';
        Schemas.vscodeNotebookCell = 'vscode-notebook-cell';
        Schemas.vscodeNotebookCellMetadata = 'vscode-notebook-cell-metadata';
        Schemas.vscodeNotebookCellOutput = 'vscode-notebook-cell-output';
        Schemas.vscodeInteractiveInput = 'vscode-interactive-input';
        Schemas.vscodeSettings = 'vscode-settings';
        Schemas.vscodeWorkspaceTrust = 'vscode-workspace-trust';
        Schemas.vscodeTerminal = 'vscode-terminal';
        /** Scheme used for code blocks in chat. */
        Schemas.vscodeChatCodeBlock = 'vscode-chat-code-block';
        /**
         * Scheme used for backing documents created by copilot for chat.
         */
        Schemas.vscodeCopilotBackingChatCodeBlock = 'vscode-copilot-chat-code-block';
        /** Scheme used for LHS of code compare (aka diff) blocks in chat. */
        Schemas.vscodeChatCodeCompareBlock = 'vscode-chat-code-compare-block';
        /** Scheme used for the chat input editor. */
        Schemas.vscodeChatSesssion = 'vscode-chat-editor';
        /**
         * Scheme used internally for webviews that aren't linked to a resource (i.e. not custom editors)
         */
        Schemas.webviewPanel = 'webview-panel';
        /**
         * Scheme used for loading the wrapper html and script in webviews.
         */
        Schemas.vscodeWebview = 'vscode-webview';
        /**
         * Scheme used for extension pages
         */
        Schemas.extension = 'extension';
        /**
         * Scheme used as a replacement of `file` scheme to load
         * files with our custom protocol handler (desktop only).
         */
        Schemas.vscodeFileResource = 'vscode-file';
        /**
         * Scheme used for temporary resources
         */
        Schemas.tmp = 'tmp';
        /**
         * Scheme used vs live share
         */
        Schemas.vsls = 'vsls';
        /**
         * Scheme used for the Source Control commit input's text document
         */
        Schemas.vscodeSourceControl = 'vscode-scm';
        /**
         * Scheme used for input box for creating comments.
         */
        Schemas.commentsInput = 'comment';
        /**
         * Scheme used for special rendering of settings in the release notes
         */
        Schemas.codeSetting = 'code-setting';
    })(Schemas || (exports.Schemas = Schemas = {}));
    function $Og(target, scheme) {
        if (uri_1.URI.isUri(target)) {
            return (0, strings_1.$Ff)(target.scheme, scheme);
        }
        else {
            return (0, strings_1.$Gf)(target, scheme + ':');
        }
    }
    function $Pg(target, ...schemes) {
        return schemes.some(scheme => $Og(target, scheme));
    }
    exports.$Qg = 'vscode-tkn';
    exports.$Rg = 'tkn';
    class RemoteAuthoritiesImpl {
        constructor() {
            this.a = Object.create(null);
            this.b = Object.create(null);
            this.c = Object.create(null);
            this.d = 'http';
            this.e = null;
            this.f = '/';
        }
        setPreferredWebSchema(schema) {
            this.d = schema;
        }
        setDelegate(delegate) {
            this.e = delegate;
        }
        setServerRootPath(product, serverBasePath) {
            this.f = $Tg(product, serverBasePath);
        }
        getServerRootPath() {
            return this.f;
        }
        get g() {
            return paths.$gc.join(this.f, Schemas.vscodeRemoteResource);
        }
        set(authority, host, port) {
            this.a[authority] = host;
            this.b[authority] = port;
        }
        setConnectionToken(authority, connectionToken) {
            this.c[authority] = connectionToken;
        }
        getPreferredWebSchema() {
            return this.d;
        }
        rewrite(uri) {
            if (this.e) {
                try {
                    return this.e(uri);
                }
                catch (err) {
                    errors.$Y(err);
                    return uri;
                }
            }
            const authority = uri.authority;
            let host = this.a[authority];
            if (host && host.indexOf(':') !== -1 && host.indexOf('[') === -1) {
                host = `[${host}]`;
            }
            const port = this.b[authority];
            const connectionToken = this.c[authority];
            let query = `path=${encodeURIComponent(uri.path)}`;
            if (typeof connectionToken === 'string') {
                query += `&${exports.$Rg}=${encodeURIComponent(connectionToken)}`;
            }
            return uri_1.URI.from({
                scheme: platform.$p ? this.d : Schemas.vscodeRemoteResource,
                authority: `${host}:${port}`,
                path: this.g,
                query
            });
        }
    }
    exports.$Sg = new RemoteAuthoritiesImpl();
    function $Tg(product, basePath) {
        return paths.$gc.join(basePath ?? '/', `${product.quality ?? 'oss'}-${product.commit ?? 'dev'}`);
    }
    exports.$Ug = 'vs/../../extensions';
    exports.$Vg = 'vs/../../node_modules';
    exports.$Wg = 'vs/../../node_modules.asar';
    exports.$Xg = 'vs/../../node_modules.asar.unpacked';
    exports.$Yg = 'vscode-app';
    class FileAccessImpl {
        static { this.a = exports.$Yg; }
        /**
         * Returns a URI to use in contexts where the browser is responsible
         * for loading (e.g. fetch()) or when used within the DOM.
         *
         * **Note:** use `dom.ts#asCSSUrl` whenever the URL is to be used in CSS context.
         */
        asBrowserUri(resourcePath) {
            const uri = this.b(resourcePath, require);
            return this.uriToBrowserUri(uri);
        }
        /**
         * Returns a URI to use in contexts where the browser is responsible
         * for loading (e.g. fetch()) or when used within the DOM.
         *
         * **Note:** use `dom.ts#asCSSUrl` whenever the URL is to be used in CSS context.
         */
        uriToBrowserUri(uri) {
            // Handle remote URIs via `RemoteAuthorities`
            if (uri.scheme === Schemas.vscodeRemote) {
                return exports.$Sg.rewrite(uri);
            }
            // Convert to `vscode-file` resource..
            if (
            // ...only ever for `file` resources
            uri.scheme === Schemas.file &&
                (
                // ...and we run in native environments
                platform.$n ||
                    // ...or web worker extensions on desktop
                    (platform.$r === `${Schemas.vscodeFileResource}://${FileAccessImpl.a}`))) {
                return uri.with({
                    scheme: Schemas.vscodeFileResource,
                    // We need to provide an authority here so that it can serve
                    // as origin for network and loading matters in chromium.
                    // If the URI is not coming with an authority already, we
                    // add our own
                    authority: uri.authority || FileAccessImpl.a,
                    query: null,
                    fragment: null
                });
            }
            return uri;
        }
        /**
         * Returns the `file` URI to use in contexts where node.js
         * is responsible for loading.
         */
        asFileUri(resourcePath) {
            const uri = this.b(resourcePath, require);
            return this.uriToFileUri(uri);
        }
        /**
         * Returns the `file` URI to use in contexts where node.js
         * is responsible for loading.
         */
        uriToFileUri(uri) {
            // Only convert the URI if it is `vscode-file:` scheme
            if (uri.scheme === Schemas.vscodeFileResource) {
                return uri.with({
                    scheme: Schemas.file,
                    // Only preserve the `authority` if it is different from
                    // our fallback authority. This ensures we properly preserve
                    // Windows UNC paths that come with their own authority.
                    authority: uri.authority !== FileAccessImpl.a ? uri.authority : null,
                    query: null,
                    fragment: null
                });
            }
            return uri;
        }
        b(uriOrModule, moduleIdToUrl) {
            if (uri_1.URI.isUri(uriOrModule)) {
                return uriOrModule;
            }
            return uri_1.URI.parse(moduleIdToUrl.toUrl(uriOrModule));
        }
    }
    exports.$Zg = new FileAccessImpl();
    var COI;
    (function (COI) {
        const coiHeaders = new Map([
            ['1', { 'Cross-Origin-Opener-Policy': 'same-origin' }],
            ['2', { 'Cross-Origin-Embedder-Policy': 'require-corp' }],
            ['3', { 'Cross-Origin-Opener-Policy': 'same-origin', 'Cross-Origin-Embedder-Policy': 'require-corp' }],
        ]);
        COI.CoopAndCoep = Object.freeze(coiHeaders.get('3'));
        const coiSearchParamName = 'vscode-coi';
        /**
         * Extract desired headers from `vscode-coi` invocation
         */
        function getHeadersFromQuery(url) {
            let params;
            if (typeof url === 'string') {
                params = new URL(url).searchParams;
            }
            else if (url instanceof URL) {
                params = url.searchParams;
            }
            else if (uri_1.URI.isUri(url)) {
                params = new URL(url.toString(true)).searchParams;
            }
            const value = params?.get(coiSearchParamName);
            if (!value) {
                return undefined;
            }
            return coiHeaders.get(value);
        }
        COI.getHeadersFromQuery = getHeadersFromQuery;
        /**
         * Add the `vscode-coi` query attribute based on wanting `COOP` and `COEP`. Will be a noop when `crossOriginIsolated`
         * isn't enabled the current context
         */
        function addSearchParam(urlOrSearch, coop, coep) {
            if (!globalThis.crossOriginIsolated) {
                // depends on the current context being COI
                return;
            }
            const value = coop && coep ? '3' : coep ? '2' : '1';
            if (urlOrSearch instanceof URLSearchParams) {
                urlOrSearch.set(coiSearchParamName, value);
            }
            else {
                urlOrSearch[coiSearchParamName] = value;
            }
        }
        COI.addSearchParam = addSearchParam;
    })(COI || (exports.COI = COI = {}));
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/























define(__m[40/*vs/amdX*/], __M([0/*require*/,1/*exports*/,28/*vs/base/common/amd*/,21/*vs/base/common/network*/,5/*vs/base/common/platform*/,39/*vs/base/common/types*/,11/*vs/base/common/uri*/]), function (require, exports, amd_1, network_1, platform, types_1, uri_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.$CE = $CE;
    exports.$DE = $DE;
    platform = __importStar(platform);
    class DefineCall {
        constructor(id, dependencies, callback) {
            this.id = id;
            this.dependencies = dependencies;
            this.callback = callback;
        }
    }
    class AMDModuleImporter {
        static { this.INSTANCE = new AMDModuleImporter(); }
        constructor() {
            this.a = (typeof self === 'object' && self.constructor && self.constructor.name === 'DedicatedWorkerGlobalScope');
            this.b = typeof document === 'object';
            this.c = [];
            this.d = false;
        }
        g() {
            if (this.d) {
                return;
            }
            this.d = true;
            globalThis.define = (id, dependencies, callback) => {
                if (typeof id !== 'string') {
                    callback = dependencies;
                    dependencies = id;
                    id = null;
                }
                if (typeof dependencies !== 'object' || !Array.isArray(dependencies)) {
                    callback = dependencies;
                    dependencies = null;
                }
                // if (!dependencies) {
                // 	dependencies = ['require', 'exports', 'module'];
                // }
                this.c.push(new DefineCall(id, dependencies, callback));
            };
            globalThis.define.amd = true;
            if (this.b) {
                // eslint-disable-next-line no-restricted-globals
                this.f = window.trustedTypes?.createPolicy('amdLoader', {
                    createScriptURL(value) {
                        // eslint-disable-next-line no-restricted-globals
                        if (value.startsWith(window.location.origin)) {
                            return value;
                        }
                        if (value.startsWith('vscode-file://vscode-app')) {
                            return value;
                        }
                        throw new Error(`[trusted_script_src] Invalid script url: ${value}`);
                    }
                });
            }
            else if (this.a) {
                this.f = globalThis.trustedTypes?.createPolicy('amdLoader', {
                    createScriptURL(value) {
                        return value;
                    }
                });
            }
        }
        async load(scriptSrc) {
            this.g();
            const defineCall = await (this.a ? this.i(scriptSrc) : this.b ? this.h(scriptSrc) : this.j(scriptSrc));
            if (!defineCall) {
                throw new Error(`Did not receive a define call from script ${scriptSrc}`);
            }
            // TODO require, exports, module
            if (Array.isArray(defineCall.dependencies) && defineCall.dependencies.length > 0) {
                throw new Error(`Cannot resolve dependencies for script ${scriptSrc}. The dependencies are: ${defineCall.dependencies.join(', ')}`);
            }
            if (typeof defineCall.callback === 'function') {
                return defineCall.callback([]);
            }
            else {
                return defineCall.callback;
            }
        }
        h(scriptSrc) {
            return new Promise((resolve, reject) => {
                const scriptElement = document.createElement('script');
                scriptElement.setAttribute('async', 'async');
                scriptElement.setAttribute('type', 'text/javascript');
                const unbind = () => {
                    scriptElement.removeEventListener('load', loadEventListener);
                    scriptElement.removeEventListener('error', errorEventListener);
                };
                const loadEventListener = (e) => {
                    unbind();
                    resolve(this.c.pop());
                };
                const errorEventListener = (e) => {
                    unbind();
                    reject(e);
                };
                scriptElement.addEventListener('load', loadEventListener);
                scriptElement.addEventListener('error', errorEventListener);
                if (this.f) {
                    scriptSrc = this.f.createScriptURL(scriptSrc);
                }
                scriptElement.setAttribute('src', scriptSrc);
                // eslint-disable-next-line no-restricted-globals
                window.document.getElementsByTagName('head')[0].appendChild(scriptElement);
            });
        }
        i(scriptSrc) {
            return new Promise((resolve, reject) => {
                try {
                    if (this.f) {
                        scriptSrc = this.f.createScriptURL(scriptSrc);
                    }
                    importScripts(scriptSrc);
                    resolve(this.c.pop());
                }
                catch (err) {
                    reject(err);
                }
            });
        }
        async j(scriptSrc) {
            try {
                const fs = globalThis._VSCODE_NODE_MODULES['fs'];
                const vm = globalThis._VSCODE_NODE_MODULES['vm'];
                const module = globalThis._VSCODE_NODE_MODULES['module'];
                const filePath = uri_1.URI.parse(scriptSrc).fsPath;
                const content = fs.readFileSync(filePath).toString();
                const scriptSource = module.wrap(content.replace(/^#!.*/, ''));
                const script = new vm.Script(scriptSource);
                const compileWrapper = script.runInThisContext();
                compileWrapper.apply();
                return this.c.pop();
            }
            catch (error) {
                throw error;
            }
        }
    }
    const cache = new Map();
    let _paths = {};
    if (typeof globalThis.require === 'object') {
        _paths = globalThis.require.paths ?? {};
    }
    /**
     * Utility for importing an AMD node module. This util supports AMD and ESM contexts and should be used while the ESM adoption
     * is on its way.
     *
     * e.g. pass in `vscode-textmate/release/main.js`
     */
    async function $CE(nodeModuleName, pathInsideNodeModule, isBuilt) {
        if (amd_1.$R) {
            if (isBuilt === undefined) {
                const product = globalThis._VSCODE_PRODUCT_JSON;
                isBuilt = Boolean((product ?? globalThis.vscode?.context?.configuration()?.product)?.commit);
            }
            if (_paths[nodeModuleName]) {
                nodeModuleName = _paths[nodeModuleName];
            }
            const nodeModulePath = pathInsideNodeModule ? `${nodeModuleName}/${pathInsideNodeModule}` : nodeModuleName;
            if (cache.has(nodeModulePath)) {
                return cache.get(nodeModulePath);
            }
            let scriptSrc;
            if (/^\w[\w\d+.-]*:\/\//.test(nodeModulePath)) {
                // looks like a URL
                // bit of a special case for: src/vs/workbench/services/languageDetection/browser/languageDetectionSimpleWorker.ts
                scriptSrc = nodeModulePath;
            }
            else {
                const useASAR = (isBuilt && !platform.$p);
                const actualNodeModulesPath = (useASAR ? network_1.$Wg : network_1.$Vg);
                const resourcePath = `${actualNodeModulesPath}/${nodeModulePath}`;
                scriptSrc = network_1.$Zg.asBrowserUri(resourcePath).toString(true);
            }
            const result = AMDModuleImporter.INSTANCE.load(scriptSrc);
            cache.set(nodeModulePath, result);
            return result;
        }
        else {
            return await new Promise((resolve_1, reject_1) => { require([nodeModuleName], resolve_1, reject_1); }).then(__importStar);
        }
    }
    function $DE(nodeModuleName, pathInsideNodeModule) {
        (0, types_1.$og)(amd_1.$R);
        const product = globalThis._VSCODE_PRODUCT_JSON;
        const isBuilt = Boolean((product ?? globalThis.vscode?.context?.configuration()?.product)?.commit);
        const useASAR = (isBuilt && !platform.$p);
        const nodeModulePath = `${nodeModuleName}/${pathInsideNodeModule}`;
        const actualNodeModulesPath = (useASAR ? network_1.$Wg : network_1.$Vg);
        const resourcePath = `${actualNodeModulesPath}/${nodeModulePath}`;
        return network_1.$Zg.asBrowserUri(resourcePath).toString(true);
    }
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/























define(__m[22/*vs/base/common/resources*/], __M([0/*require*/,1/*exports*/,18/*vs/base/common/charCode*/,38/*vs/base/common/extpath*/,21/*vs/base/common/network*/,19/*vs/base/common/path*/,5/*vs/base/common/platform*/,20/*vs/base/common/strings*/,11/*vs/base/common/uri*/]), function (require, exports, charCode_1, extpath, network_1, paths, platform_1, strings_1, uri_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DataUri = exports.$oh = exports.$nh = exports.$mh = exports.$lh = exports.$kh = exports.$jh = exports.$ih = exports.$hh = exports.$gh = exports.$fh = exports.$eh = exports.$dh = exports.$ch = exports.$bh = exports.$ah = exports.$_g = exports.$$g = exports.$0g = exports.$9g = exports.$8g = void 0;
    exports.$7g = $7g;
    exports.$ph = $ph;
    exports.$qh = $qh;
    extpath = __importStar(extpath);
    paths = __importStar(paths);
    function $7g(uri) {
        return (0, uri_1.$wc)(uri, true);
    }
    class $8g {
        constructor(a) {
            this.a = a;
        }
        compare(uri1, uri2, ignoreFragment = false) {
            if (uri1 === uri2) {
                return 0;
            }
            return (0, strings_1.$yf)(this.getComparisonKey(uri1, ignoreFragment), this.getComparisonKey(uri2, ignoreFragment));
        }
        isEqual(uri1, uri2, ignoreFragment = false) {
            if (uri1 === uri2) {
                return true;
            }
            if (!uri1 || !uri2) {
                return false;
            }
            return this.getComparisonKey(uri1, ignoreFragment) === this.getComparisonKey(uri2, ignoreFragment);
        }
        getComparisonKey(uri, ignoreFragment = false) {
            return uri.with({
                path: this.a(uri) ? uri.path.toLowerCase() : undefined,
                fragment: ignoreFragment ? null : undefined
            }).toString();
        }
        ignorePathCasing(uri) {
            return this.a(uri);
        }
        isEqualOrParent(base, parentCandidate, ignoreFragment = false) {
            if (base.scheme === parentCandidate.scheme) {
                if (base.scheme === network_1.Schemas.file) {
                    return extpath.$Eg($7g(base), $7g(parentCandidate), this.a(base)) && base.query === parentCandidate.query && (ignoreFragment || base.fragment === parentCandidate.fragment);
                }
                if ((0, exports.$lh)(base.authority, parentCandidate.authority)) {
                    return extpath.$Eg(base.path, parentCandidate.path, this.a(base), '/') && base.query === parentCandidate.query && (ignoreFragment || base.fragment === parentCandidate.fragment);
                }
            }
            return false;
        }
        // --- path math
        joinPath(resource, ...pathFragment) {
            return uri_1.URI.joinPath(resource, ...pathFragment);
        }
        basenameOrAuthority(resource) {
            return (0, exports.$dh)(resource) || resource.authority;
        }
        basename(resource) {
            return paths.$gc.basename(resource.path);
        }
        extname(resource) {
            return paths.$gc.extname(resource.path);
        }
        dirname(resource) {
            if (resource.path.length === 0) {
                return resource;
            }
            let dirname;
            if (resource.scheme === network_1.Schemas.file) {
                dirname = uri_1.URI.file(paths.$mc($7g(resource))).path;
            }
            else {
                dirname = paths.$gc.dirname(resource.path);
                if (resource.authority && dirname.length && dirname.charCodeAt(0) !== charCode_1.CharCode.Slash) {
                    console.error(`dirname("${resource.toString})) resulted in a relative path`);
                    dirname = '/'; // If a URI contains an authority component, then the path component must either be empty or begin with a CharCode.Slash ("/") character
                }
            }
            return resource.with({
                path: dirname
            });
        }
        normalizePath(resource) {
            if (!resource.path.length) {
                return resource;
            }
            let normalizedPath;
            if (resource.scheme === network_1.Schemas.file) {
                normalizedPath = uri_1.URI.file(paths.$hc($7g(resource))).path;
            }
            else {
                normalizedPath = paths.$gc.normalize(resource.path);
            }
            return resource.with({
                path: normalizedPath
            });
        }
        relativePath(from, to) {
            if (from.scheme !== to.scheme || !(0, exports.$lh)(from.authority, to.authority)) {
                return undefined;
            }
            if (from.scheme === network_1.Schemas.file) {
                const relativePath = paths.$lc($7g(from), $7g(to));
                return platform_1.$j ? extpath.$yg(relativePath) : relativePath;
            }
            let fromPath = from.path || '/';
            const toPath = to.path || '/';
            if (this.a(from)) {
                // make casing of fromPath match toPath
                let i = 0;
                for (const len = Math.min(fromPath.length, toPath.length); i < len; i++) {
                    if (fromPath.charCodeAt(i) !== toPath.charCodeAt(i)) {
                        if (fromPath.charAt(i).toLowerCase() !== toPath.charAt(i).toLowerCase()) {
                            break;
                        }
                    }
                }
                fromPath = toPath.substr(0, i) + fromPath.substr(i);
            }
            return paths.$gc.relative(fromPath, toPath);
        }
        resolvePath(base, path) {
            if (base.scheme === network_1.Schemas.file) {
                const newURI = uri_1.URI.file(paths.$kc($7g(base), path));
                return base.with({
                    authority: newURI.authority,
                    path: newURI.path
                });
            }
            path = extpath.$zg(path); // we allow path to be a windows path
            return base.with({
                path: paths.$gc.resolve(base.path, path)
            });
        }
        // --- misc
        isAbsolutePath(resource) {
            return !!resource.path && resource.path[0] === '/';
        }
        isEqualAuthority(a1, a2) {
            return a1 === a2 || (a1 !== undefined && a2 !== undefined && (0, strings_1.$Ff)(a1, a2));
        }
        hasTrailingPathSeparator(resource, sep = paths.sep) {
            if (resource.scheme === network_1.Schemas.file) {
                const fsp = $7g(resource);
                return fsp.length > extpath.$Ag(fsp).length && fsp[fsp.length - 1] === sep;
            }
            else {
                const p = resource.path;
                return (p.length > 1 && p.charCodeAt(p.length - 1) === charCode_1.CharCode.Slash) && !(/^[a-zA-Z]:(\/$|\\$)/.test(resource.fsPath)); // ignore the slash at offset 0
            }
        }
        removeTrailingPathSeparator(resource, sep = paths.sep) {
            // Make sure that the path isn't a drive letter. A trailing separator there is not removable.
            if ((0, exports.$mh)(resource, sep)) {
                return resource.with({ path: resource.path.substr(0, resource.path.length - 1) });
            }
            return resource;
        }
        addTrailingPathSeparator(resource, sep = paths.sep) {
            let isRootSep = false;
            if (resource.scheme === network_1.Schemas.file) {
                const fsp = $7g(resource);
                isRootSep = ((fsp !== undefined) && (fsp.length === extpath.$Ag(fsp).length) && (fsp[fsp.length - 1] === sep));
            }
            else {
                sep = '/';
                const p = resource.path;
                isRootSep = p.length === 1 && p.charCodeAt(p.length - 1) === charCode_1.CharCode.Slash;
            }
            if (!isRootSep && !(0, exports.$mh)(resource, sep)) {
                return resource.with({ path: resource.path + '/' });
            }
            return resource;
        }
    }
    exports.$8g = $8g;
    /**
     * Unbiased utility that takes uris "as they are". This means it can be interchanged with
     * uri#toString() usages. The following is true
     * ```
     * assertEqual(aUri.toString() === bUri.toString(), exturi.isEqual(aUri, bUri))
     * ```
     */
    exports.$9g = new $8g(() => false);
    /**
     * BIASED utility that _mostly_ ignored the case of urs paths. ONLY use this util if you
     * understand what you are doing.
     *
     * This utility is INCOMPATIBLE with `uri.toString()`-usages and both CANNOT be used interchanged.
     *
     * When dealing with uris from files or documents, `extUri` (the unbiased friend)is sufficient
     * because those uris come from a "trustworthy source". When creating unknown uris it's always
     * better to use `IUriIdentityService` which exposes an `IExtUri`-instance which knows when path
     * casing matters.
     */
    exports.$0g = new $8g(uri => {
        // A file scheme resource is in the same platform as code, so ignore case for non linux platforms
        // Resource can be from another platform. Lowering the case as an hack. Should come from File system provider
        return uri.scheme === network_1.Schemas.file ? !platform_1.$l : true;
    });
    /**
     * BIASED utility that always ignores the casing of uris paths. ONLY use this util if you
     * understand what you are doing.
     *
     * This utility is INCOMPATIBLE with `uri.toString()`-usages and both CANNOT be used interchanged.
     *
     * When dealing with uris from files or documents, `extUri` (the unbiased friend)is sufficient
     * because those uris come from a "trustworthy source". When creating unknown uris it's always
     * better to use `IUriIdentityService` which exposes an `IExtUri`-instance which knows when path
     * casing matters.
     */
    exports.$$g = new $8g(_ => true);
    exports.$_g = exports.$9g.isEqual.bind(exports.$9g);
    exports.$ah = exports.$9g.isEqualOrParent.bind(exports.$9g);
    exports.$bh = exports.$9g.getComparisonKey.bind(exports.$9g);
    exports.$ch = exports.$9g.basenameOrAuthority.bind(exports.$9g);
    exports.$dh = exports.$9g.basename.bind(exports.$9g);
    exports.$eh = exports.$9g.extname.bind(exports.$9g);
    exports.$fh = exports.$9g.dirname.bind(exports.$9g);
    exports.$gh = exports.$9g.joinPath.bind(exports.$9g);
    exports.$hh = exports.$9g.normalizePath.bind(exports.$9g);
    exports.$ih = exports.$9g.relativePath.bind(exports.$9g);
    exports.$jh = exports.$9g.resolvePath.bind(exports.$9g);
    exports.$kh = exports.$9g.isAbsolutePath.bind(exports.$9g);
    exports.$lh = exports.$9g.isEqualAuthority.bind(exports.$9g);
    exports.$mh = exports.$9g.hasTrailingPathSeparator.bind(exports.$9g);
    exports.$nh = exports.$9g.removeTrailingPathSeparator.bind(exports.$9g);
    exports.$oh = exports.$9g.addTrailingPathSeparator.bind(exports.$9g);
    //#endregion
    function $ph(items, resourceAccessor) {
        const distinctParents = [];
        for (let i = 0; i < items.length; i++) {
            const candidateResource = resourceAccessor(items[i]);
            if (items.some((otherItem, index) => {
                if (index === i) {
                    return false;
                }
                return (0, exports.$ah)(candidateResource, resourceAccessor(otherItem));
            })) {
                continue;
            }
            distinctParents.push(items[i]);
        }
        return distinctParents;
    }
    /**
     * Data URI related helpers.
     */
    var DataUri;
    (function (DataUri) {
        DataUri.META_DATA_LABEL = 'label';
        DataUri.META_DATA_DESCRIPTION = 'description';
        DataUri.META_DATA_SIZE = 'size';
        DataUri.META_DATA_MIME = 'mime';
        function parseMetaData(dataUri) {
            const metadata = new Map();
            // Given a URI of:  data:image/png;size:2313;label:SomeLabel;description:SomeDescription;base64,77+9UE5...
            // the metadata is: size:2313;label:SomeLabel;description:SomeDescription
            const meta = dataUri.path.substring(dataUri.path.indexOf(';') + 1, dataUri.path.lastIndexOf(';'));
            meta.split(';').forEach(property => {
                const [key, value] = property.split(':');
                if (key && value) {
                    metadata.set(key, value);
                }
            });
            // Given a URI of:  data:image/png;size:2313;label:SomeLabel;description:SomeDescription;base64,77+9UE5...
            // the mime is: image/png
            const mime = dataUri.path.substring(0, dataUri.path.indexOf(';'));
            if (mime) {
                metadata.set(DataUri.META_DATA_MIME, mime);
            }
            return metadata;
        }
        DataUri.parseMetaData = parseMetaData;
    })(DataUri || (exports.DataUri = DataUri = {}));
    function $qh(resource, authority, localScheme) {
        if (authority) {
            let path = resource.path;
            if (path && path[0] !== paths.$gc.sep) {
                path = paths.$gc.sep + path;
            }
            return resource.with({ scheme: localScheme, authority, path });
        }
        return resource.with({ scheme: localScheme });
    }
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(__m[23/*vs/base/common/async*/], __M([0/*require*/,1/*exports*/,33/*vs/base/common/cancellation*/,8/*vs/base/common/errors*/,15/*vs/base/common/event*/,2/*vs/base/common/lifecycle*/,22/*vs/base/common/resources*/,5/*vs/base/common/platform*/,37/*vs/base/common/symbols*/,36/*vs/base/common/lazy*/]), function (require, exports, cancellation_1, errors_1, event_1, lifecycle_1, resources_1, platform_1, symbols_1, lazy_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.$9h = exports.$7h = exports.$6h = exports.$5h = exports.$4h = exports.Promises = exports.$3h = exports.$2h = exports.$1h = exports.$Yh = exports.$Xh = exports.$Wh = exports.$Vh = exports.$Uh = exports.$Th = exports.$Sh = exports.$Rh = exports.$Qh = exports.$Ph = exports.$Oh = exports.$Nh = exports.$Mh = exports.$Lh = exports.$Fh = exports.$Eh = exports.$Dh = exports.$Ch = exports.$Bh = exports.$Ah = exports.$zh = void 0;
    exports.$rh = $rh;
    exports.$sh = $sh;
    exports.$th = $th;
    exports.$uh = $uh;
    exports.$vh = $vh;
    exports.$wh = $wh;
    exports.$xh = $xh;
    exports.$yh = $yh;
    exports.$Gh = $Gh;
    exports.$Hh = $Hh;
    exports.$Ih = $Ih;
    exports.$Jh = $Jh;
    exports.$Kh = $Kh;
    exports.$Zh = $Zh;
    exports.$8h = $8h;
    function $rh(obj) {
        return !!obj && typeof obj.then === 'function';
    }
    function $sh(callback) {
        const source = new cancellation_1.$we();
        const thenable = callback(source.token);
        const promise = new Promise((resolve, reject) => {
            const subscription = source.token.onCancellationRequested(() => {
                subscription.dispose();
                reject(new errors_1.$4());
            });
            Promise.resolve(thenable).then(value => {
                subscription.dispose();
                source.dispose();
                resolve(value);
            }, err => {
                subscription.dispose();
                source.dispose();
                reject(err);
            });
        });
        return new class {
            cancel() {
                source.cancel();
                source.dispose();
            }
            then(resolve, reject) {
                return promise.then(resolve, reject);
            }
            catch(reject) {
                return this.then(undefined, reject);
            }
            finally(onfinally) {
                return promise.finally(onfinally);
            }
        };
    }
    function $th(promise, token, defaultValue) {
        return new Promise((resolve, reject) => {
            const ref = token.onCancellationRequested(() => {
                ref.dispose();
                resolve(defaultValue);
            });
            promise.then(resolve, reject).finally(() => ref.dispose());
        });
    }
    /**
     * Returns a promise that rejects with an {@CancellationError} as soon as the passed token is cancelled.
     * @see {@link $th}
     */
    function $uh(promise, token) {
        return new Promise((resolve, reject) => {
            const ref = token.onCancellationRequested(() => {
                ref.dispose();
                reject(new errors_1.$4());
            });
            promise.then(resolve, reject).finally(() => ref.dispose());
        });
    }
    /**
     * Returns as soon as one of the promises resolves or rejects and cancels remaining promises
     */
    async function $vh(cancellablePromises) {
        let resolvedPromiseIndex = -1;
        const promises = cancellablePromises.map((promise, index) => promise.then(result => { resolvedPromiseIndex = index; return result; }));
        try {
            const result = await Promise.race(promises);
            return result;
        }
        finally {
            cancellablePromises.forEach((cancellablePromise, index) => {
                if (index !== resolvedPromiseIndex) {
                    cancellablePromise.cancel();
                }
            });
        }
    }
    function $wh(promise, timeout, onTimeout) {
        let promiseResolve = undefined;
        const timer = setTimeout(() => {
            promiseResolve?.(undefined);
            onTimeout?.();
        }, timeout);
        return Promise.race([
            promise.finally(() => clearTimeout(timer)),
            new Promise(resolve => promiseResolve = resolve)
        ]);
    }
    function $xh(callback) {
        return new Promise((resolve, reject) => {
            const item = callback();
            if ($rh(item)) {
                item.then(resolve, reject);
            }
            else {
                resolve(item);
            }
        });
    }
    /**
     * Creates and returns a new promise, plus its `resolve` and `reject` callbacks.
     *
     * Replace with standardized [`Promise.withResolvers`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/withResolvers) once it is supported
     */
    function $yh() {
        let resolve;
        let reject;
        const promise = new Promise((res, rej) => {
            resolve = res;
            reject = rej;
        });
        return { promise, resolve: resolve, reject: reject };
    }
    /**
     * A helper to prevent accumulation of sequential async tasks.
     *
     * Imagine a mail man with the sole task of delivering letters. As soon as
     * a letter submitted for delivery, he drives to the destination, delivers it
     * and returns to his base. Imagine that during the trip, N more letters were submitted.
     * When the mail man returns, he picks those N letters and delivers them all in a
     * single trip. Even though N+1 submissions occurred, only 2 deliveries were made.
     *
     * The throttler implements this via the queue() method, by providing it a task
     * factory. Following the example:
     *
     * 		const throttler = new Throttler();
     * 		const letters = [];
     *
     * 		function deliver() {
     * 			const lettersToDeliver = letters;
     * 			letters = [];
     * 			return makeTheTrip(lettersToDeliver);
     * 		}
     *
     * 		function onLetterReceived(l) {
     * 			letters.push(l);
     * 			throttler.queue(deliver);
     * 		}
     */
    class $zh {
        constructor() {
            this.f = false;
            this.a = null;
            this.b = null;
            this.d = null;
        }
        queue(promiseFactory) {
            if (this.f) {
                return Promise.reject(new Error('Throttler is disposed'));
            }
            if (this.a) {
                this.d = promiseFactory;
                if (!this.b) {
                    const onComplete = () => {
                        this.b = null;
                        if (this.f) {
                            return;
                        }
                        const result = this.queue(this.d);
                        this.d = null;
                        return result;
                    };
                    this.b = new Promise(resolve => {
                        this.a.then(onComplete, onComplete).then(resolve);
                    });
                }
                return new Promise((resolve, reject) => {
                    this.b.then(resolve, reject);
                });
            }
            this.a = promiseFactory();
            return new Promise((resolve, reject) => {
                this.a.then((result) => {
                    this.a = null;
                    resolve(result);
                }, (err) => {
                    this.a = null;
                    reject(err);
                });
            });
        }
        dispose() {
            this.f = true;
        }
    }
    exports.$zh = $zh;
    class $Ah {
        constructor() {
            this.a = Promise.resolve(null);
        }
        queue(promiseTask) {
            return this.a = this.a.then(() => promiseTask(), () => promiseTask());
        }
    }
    exports.$Ah = $Ah;
    class $Bh {
        constructor() {
            this.a = new Map();
        }
        queue(key, promiseTask) {
            const runningPromise = this.a.get(key) ?? Promise.resolve();
            const newPromise = runningPromise
                .catch(() => { })
                .then(promiseTask)
                .finally(() => {
                if (this.a.get(key) === newPromise) {
                    this.a.delete(key);
                }
            });
            this.a.set(key, newPromise);
            return newPromise;
        }
    }
    exports.$Bh = $Bh;
    const timeoutDeferred = (timeout, fn) => {
        let scheduled = true;
        const handle = setTimeout(() => {
            scheduled = false;
            fn();
        }, timeout);
        return {
            isTriggered: () => scheduled,
            dispose: () => {
                clearTimeout(handle);
                scheduled = false;
            },
        };
    };
    const microtaskDeferred = (fn) => {
        let scheduled = true;
        queueMicrotask(() => {
            if (scheduled) {
                scheduled = false;
                fn();
            }
        });
        return {
            isTriggered: () => scheduled,
            dispose: () => { scheduled = false; },
        };
    };
    /**
     * A helper to delay (debounce) execution of a task that is being requested often.
     *
     * Following the throttler, now imagine the mail man wants to optimize the number of
     * trips proactively. The trip itself can be long, so he decides not to make the trip
     * as soon as a letter is submitted. Instead he waits a while, in case more
     * letters are submitted. After said waiting period, if no letters were submitted, he
     * decides to make the trip. Imagine that N more letters were submitted after the first
     * one, all within a short period of time between each other. Even though N+1
     * submissions occurred, only 1 delivery was made.
     *
     * The delayer offers this behavior via the trigger() method, into which both the task
     * to be executed and the waiting period (delay) must be passed in as arguments. Following
     * the example:
     *
     * 		const delayer = new Delayer(WAITING_PERIOD);
     * 		const letters = [];
     *
     * 		function letterReceived(l) {
     * 			letters.push(l);
     * 			delayer.trigger(() => { return makeTheTrip(); });
     * 		}
     */
    class $Ch {
        constructor(defaultDelay) {
            this.defaultDelay = defaultDelay;
            this.a = null;
            this.b = null;
            this.d = null;
            this.f = null;
            this.g = null;
        }
        trigger(task, delay = this.defaultDelay) {
            this.g = task;
            this.h();
            if (!this.b) {
                this.b = new Promise((resolve, reject) => {
                    this.d = resolve;
                    this.f = reject;
                }).then(() => {
                    this.b = null;
                    this.d = null;
                    if (this.g) {
                        const task = this.g;
                        this.g = null;
                        return task();
                    }
                    return undefined;
                });
            }
            const fn = () => {
                this.a = null;
                this.d?.(null);
            };
            this.a = delay === symbols_1.$ge ? microtaskDeferred(fn) : timeoutDeferred(delay, fn);
            return this.b;
        }
        isTriggered() {
            return !!this.a?.isTriggered();
        }
        cancel() {
            this.h();
            if (this.b) {
                this.f?.(new errors_1.$4());
                this.b = null;
            }
        }
        h() {
            this.a?.dispose();
            this.a = null;
        }
        dispose() {
            this.cancel();
        }
    }
    exports.$Ch = $Ch;
    /**
     * A helper to delay execution of a task that is being requested often, while
     * preventing accumulation of consecutive executions, while the task runs.
     *
     * The mail man is clever and waits for a certain amount of time, before going
     * out to deliver letters. While the mail man is going out, more letters arrive
     * and can only be delivered once he is back. Once he is back the mail man will
     * do one more trip to deliver the letters that have accumulated while he was out.
     */
    class $Dh {
        constructor(defaultDelay) {
            this.a = new $Ch(defaultDelay);
            this.b = new $zh();
        }
        trigger(promiseFactory, delay) {
            return this.a.trigger(() => this.b.queue(promiseFactory), delay);
        }
        isTriggered() {
            return this.a.isTriggered();
        }
        cancel() {
            this.a.cancel();
        }
        dispose() {
            this.a.dispose();
            this.b.dispose();
        }
    }
    exports.$Dh = $Dh;
    /**
     * A barrier that is initially closed and then becomes opened permanently.
     */
    class $Eh {
        constructor() {
            this.a = false;
            this.b = new Promise((c, e) => {
                this.d = c;
            });
        }
        isOpen() {
            return this.a;
        }
        open() {
            this.a = true;
            this.d(true);
        }
        wait() {
            return this.b;
        }
    }
    exports.$Eh = $Eh;
    /**
     * A barrier that is initially closed and then becomes opened permanently after a certain period of
     * time or when open is called explicitly
     */
    class $Fh extends $Eh {
        constructor(autoOpenTimeMs) {
            super();
            this.f = setTimeout(() => this.open(), autoOpenTimeMs);
        }
        open() {
            clearTimeout(this.f);
            super.open();
        }
    }
    exports.$Fh = $Fh;
    function $Gh(millis, token) {
        if (!token) {
            return $sh(token => $Gh(millis, token));
        }
        return new Promise((resolve, reject) => {
            const handle = setTimeout(() => {
                disposable.dispose();
                resolve();
            }, millis);
            const disposable = token.onCancellationRequested(() => {
                clearTimeout(handle);
                disposable.dispose();
                reject(new errors_1.$4());
            });
        });
    }
    /**
     * Creates a timeout that can be disposed using its returned value.
     * @param handler The timeout handler.
     * @param timeout An optional timeout in milliseconds.
     * @param store An optional {@link $Tc} that will have the timeout disposable managed automatically.
     *
     * @example
     * const store = new DisposableStore;
     * // Call the timeout after 1000ms at which point it will be automatically
     * // evicted from the store.
     * const timeoutDisposable = disposableTimeout(() => {}, 1000, store);
     *
     * if (foo) {
     *   // Cancel the timeout and evict it from store.
     *   timeoutDisposable.dispose();
     * }
     */
    function $Hh(handler, timeout = 0, store) {
        const timer = setTimeout(() => {
            handler();
            if (store) {
                disposable.dispose();
            }
        }, timeout);
        const disposable = (0, lifecycle_1.$Sc)(() => {
            clearTimeout(timer);
            store?.deleteAndLeak(disposable);
        });
        store?.add(disposable);
        return disposable;
    }
    /**
     * Runs the provided list of promise factories in sequential order. The returned
     * promise will complete to an array of results from each promise.
     */
    function $Ih(promiseFactories) {
        const results = [];
        let index = 0;
        const len = promiseFactories.length;
        function next() {
            return index < len ? promiseFactories[index++]() : null;
        }
        function thenHandler(result) {
            if (result !== undefined && result !== null) {
                results.push(result);
            }
            const n = next();
            if (n) {
                return n.then(thenHandler);
            }
            return Promise.resolve(results);
        }
        return Promise.resolve(null).then(thenHandler);
    }
    function $Jh(promiseFactories, shouldStop = t => !!t, defaultValue = null) {
        let index = 0;
        const len = promiseFactories.length;
        const loop = () => {
            if (index >= len) {
                return Promise.resolve(defaultValue);
            }
            const factory = promiseFactories[index++];
            const promise = Promise.resolve(factory());
            return promise.then(result => {
                if (shouldStop(result)) {
                    return Promise.resolve(result);
                }
                return loop();
            });
        };
        return loop();
    }
    function $Kh(promiseList, shouldStop = t => !!t, defaultValue = null) {
        if (promiseList.length === 0) {
            return Promise.resolve(defaultValue);
        }
        let todo = promiseList.length;
        const finish = () => {
            todo = -1;
            for (const promise of promiseList) {
                promise.cancel?.();
            }
        };
        return new Promise((resolve, reject) => {
            for (const promise of promiseList) {
                promise.then(result => {
                    if (--todo >= 0 && shouldStop(result)) {
                        finish();
                        resolve(result);
                    }
                    else if (todo === 0) {
                        resolve(defaultValue);
                    }
                })
                    .catch(err => {
                    if (--todo >= 0) {
                        finish();
                        reject(err);
                    }
                });
            }
        });
    }
    /**
     * A helper to queue N promises and run them all with a max degree of parallelism. The helper
     * ensures that at any time no more than M promises are running at the same time.
     */
    class $Lh {
        constructor(maxDegreeOfParalellism) {
            this.a = 0;
            this.b = false;
            this.f = maxDegreeOfParalellism;
            this.g = [];
            this.d = 0;
            this.h = new event_1.$le();
        }
        /**
         *
         * @returns A promise that resolved when all work is done (onDrained) or when
         * there is nothing to do
         */
        whenIdle() {
            return this.size > 0
                ? event_1.Event.toPromise(this.onDrained)
                : Promise.resolve();
        }
        get onDrained() {
            return this.h.event;
        }
        get size() {
            return this.a;
        }
        queue(factory) {
            if (this.b) {
                throw new Error('Object has been disposed');
            }
            this.a++;
            return new Promise((c, e) => {
                this.g.push({ factory, c, e });
                this.j();
            });
        }
        j() {
            while (this.g.length && this.d < this.f) {
                const iLimitedTask = this.g.shift();
                this.d++;
                const promise = iLimitedTask.factory();
                promise.then(iLimitedTask.c, iLimitedTask.e);
                promise.then(() => this.k(), () => this.k());
            }
        }
        k() {
            if (this.b) {
                return;
            }
            this.d--;
            if (--this.a === 0) {
                this.h.fire();
            }
            if (this.g.length > 0) {
                this.j();
            }
        }
        clear() {
            if (this.b) {
                throw new Error('Object has been disposed');
            }
            this.g.length = 0;
            this.a = this.d;
        }
        dispose() {
            this.b = true;
            this.g.length = 0; // stop further processing
            this.a = 0;
            this.h.dispose();
        }
    }
    exports.$Lh = $Lh;
    /**
     * A queue is handles one promise at a time and guarantees that at any time only one promise is executing.
     */
    class $Mh extends $Lh {
        constructor() {
            super(1);
        }
    }
    exports.$Mh = $Mh;
    /**
     * Same as `Queue`, ensures that only 1 task is executed at the same time. The difference to `Queue` is that
     * there is only 1 task about to be scheduled next. As such, calling `queue` while a task is executing will
     * replace the currently queued task until it executes.
     *
     * As such, the returned promise may not be from the factory that is passed in but from the next factory that
     * is running after having called `queue`.
     */
    class $Nh {
        constructor() {
            this.a = new $1h();
            this.b = 0;
        }
        queue(factory) {
            if (!this.a.isRunning()) {
                return this.a.run(this.b++, factory());
            }
            return this.a.queue(() => {
                return this.a.run(this.b++, factory());
            });
        }
    }
    exports.$Nh = $Nh;
    /**
     * A helper to organize queues per resource. The ResourceQueue makes sure to manage queues per resource
     * by disposing them once the queue is empty.
     */
    class $Oh {
        constructor() {
            this.a = new Map();
            this.b = new Set();
            this.d = undefined;
            this.f = 0;
        }
        async whenDrained() {
            if (this.g()) {
                return;
            }
            const promise = new $3h();
            this.b.add(promise);
            return promise.p;
        }
        g() {
            for (const [, queue] of this.a) {
                if (queue.size > 0) {
                    return false;
                }
            }
            return true;
        }
        queueSize(resource, extUri = resources_1.$9g) {
            const key = extUri.getComparisonKey(resource);
            return this.a.get(key)?.size ?? 0;
        }
        queueFor(resource, factory, extUri = resources_1.$9g) {
            const key = extUri.getComparisonKey(resource);
            let queue = this.a.get(key);
            if (!queue) {
                queue = new $Mh();
                const drainListenerId = this.f++;
                const drainListener = event_1.Event.once(queue.onDrained)(() => {
                    queue?.dispose();
                    this.a.delete(key);
                    this.h();
                    this.d?.deleteAndDispose(drainListenerId);
                    if (this.d?.size === 0) {
                        this.d.dispose();
                        this.d = undefined;
                    }
                });
                if (!this.d) {
                    this.d = new lifecycle_1.$4c();
                }
                this.d.set(drainListenerId, drainListener);
                this.a.set(key, queue);
            }
            return queue.queue(factory);
        }
        h() {
            if (!this.g()) {
                return; // not done yet
            }
            this.j();
        }
        j() {
            for (const drainer of this.b) {
                drainer.complete();
            }
            this.b.clear();
        }
        dispose() {
            for (const [, queue] of this.a) {
                queue.dispose();
            }
            this.a.clear();
            // Even though we might still have pending
            // tasks queued, after the queues have been
            // disposed, we can no longer track them, so
            // we release drainers to prevent hanging
            // promises when the resource queue is being
            // disposed.
            this.j();
            this.d?.dispose();
        }
    }
    exports.$Oh = $Oh;
    class $Ph {
        constructor(runner, timeout) {
            this.b = false;
            this.a = -1;
            if (typeof runner === 'function' && typeof timeout === 'number') {
                this.setIfNotSet(runner, timeout);
            }
        }
        dispose() {
            this.cancel();
            this.b = true;
        }
        cancel() {
            if (this.a !== -1) {
                clearTimeout(this.a);
                this.a = -1;
            }
        }
        cancelAndSet(runner, timeout) {
            if (this.b) {
                throw new errors_1.$bb(`Calling 'cancelAndSet' on a disposed TimeoutTimer`);
            }
            this.cancel();
            this.a = setTimeout(() => {
                this.a = -1;
                runner();
            }, timeout);
        }
        setIfNotSet(runner, timeout) {
            if (this.b) {
                throw new errors_1.$bb(`Calling 'setIfNotSet' on a disposed TimeoutTimer`);
            }
            if (this.a !== -1) {
                // timer is already set
                return;
            }
            this.a = setTimeout(() => {
                this.a = -1;
                runner();
            }, timeout);
        }
    }
    exports.$Ph = $Ph;
    class $Qh {
        constructor() {
            this.d = undefined;
            this.f = false;
        }
        cancel() {
            this.d?.dispose();
            this.d = undefined;
        }
        cancelAndSet(runner, interval, context = globalThis) {
            if (this.f) {
                throw new errors_1.$bb(`Calling 'cancelAndSet' on a disposed IntervalTimer`);
            }
            this.cancel();
            const handle = context.setInterval(() => {
                runner();
            }, interval);
            this.d = (0, lifecycle_1.$Sc)(() => {
                context.clearInterval(handle);
                this.d = undefined;
            });
        }
        dispose() {
            this.cancel();
            this.f = true;
        }
    }
    exports.$Qh = $Qh;
    class $Rh {
        constructor(runner, delay) {
            this.b = -1;
            this.a = runner;
            this.d = delay;
            this.f = this.g.bind(this);
        }
        /**
         * Dispose RunOnceScheduler
         */
        dispose() {
            this.cancel();
            this.a = null;
        }
        /**
         * Cancel current scheduled runner (if any).
         */
        cancel() {
            if (this.isScheduled()) {
                clearTimeout(this.b);
                this.b = -1;
            }
        }
        /**
         * Cancel previous runner (if any) & schedule a new runner.
         */
        schedule(delay = this.d) {
            this.cancel();
            this.b = setTimeout(this.f, delay);
        }
        get delay() {
            return this.d;
        }
        set delay(value) {
            this.d = value;
        }
        /**
         * Returns true if scheduled.
         */
        isScheduled() {
            return this.b !== -1;
        }
        flush() {
            if (this.isScheduled()) {
                this.cancel();
                this.h();
            }
        }
        g() {
            this.b = -1;
            if (this.a) {
                this.h();
            }
        }
        h() {
            this.a?.();
        }
    }
    exports.$Rh = $Rh;
    /**
     * Same as `RunOnceScheduler`, but doesn't count the time spent in sleep mode.
     * > **NOTE**: Only offers 1s resolution.
     *
     * When calling `setTimeout` with 3hrs, and putting the computer immediately to sleep
     * for 8hrs, `setTimeout` will fire **as soon as the computer wakes from sleep**. But
     * this scheduler will execute 3hrs **after waking the computer from sleep**.
     */
    class $Sh {
        constructor(runner, delay) {
            if (delay % 1000 !== 0) {
                console.warn(`ProcessTimeRunOnceScheduler resolution is 1s, ${delay}ms is not a multiple of 1000ms.`);
            }
            this.a = runner;
            this.b = delay;
            this.d = 0;
            this.f = -1;
            this.g = this.h.bind(this);
        }
        dispose() {
            this.cancel();
            this.a = null;
        }
        cancel() {
            if (this.isScheduled()) {
                clearInterval(this.f);
                this.f = -1;
            }
        }
        /**
         * Cancel previous runner (if any) & schedule a new runner.
         */
        schedule(delay = this.b) {
            if (delay % 1000 !== 0) {
                console.warn(`ProcessTimeRunOnceScheduler resolution is 1s, ${delay}ms is not a multiple of 1000ms.`);
            }
            this.cancel();
            this.d = Math.ceil(delay / 1000);
            this.f = setInterval(this.g, 1000);
        }
        /**
         * Returns true if scheduled.
         */
        isScheduled() {
            return this.f !== -1;
        }
        h() {
            this.d--;
            if (this.d > 0) {
                // still need to wait
                return;
            }
            // time elapsed
            clearInterval(this.f);
            this.f = -1;
            this.a?.();
        }
    }
    exports.$Sh = $Sh;
    class $Th extends $Rh {
        constructor(runner, timeout) {
            super(runner, timeout);
            this.j = [];
        }
        work(unit) {
            this.j.push(unit);
            if (!this.isScheduled()) {
                this.schedule();
            }
        }
        h() {
            const units = this.j;
            this.j = [];
            this.a?.(units);
        }
        dispose() {
            this.j = [];
            super.dispose();
        }
    }
    exports.$Th = $Th;
    /**
     * The `ThrottledWorker` will accept units of work `T`
     * to handle. The contract is:
     * * there is a maximum of units the worker can handle at once (via `maxWorkChunkSize`)
     * * there is a maximum of units the worker will keep in memory for processing (via `maxBufferedWork`)
     * * after having handled `maxWorkChunkSize` units, the worker needs to rest (via `throttleDelay`)
     */
    class $Uh extends lifecycle_1.$Uc {
        constructor(g, h) {
            super();
            this.g = g;
            this.h = h;
            this.a = [];
            this.b = this.B(new lifecycle_1.$Vc());
            this.f = false;
        }
        /**
         * The number of work units that are pending to be processed.
         */
        get pending() { return this.a.length; }
        /**
         * Add units to be worked on. Use `pending` to figure out
         * how many units are not yet processed after this method
         * was called.
         *
         * @returns whether the work was accepted or not. If the
         * worker is disposed, it will not accept any more work.
         * If the number of pending units would become larger
         * than `maxPendingWork`, more work will also not be accepted.
         */
        work(units) {
            if (this.f) {
                return false; // work not accepted: disposed
            }
            // Check for reaching maximum of pending work
            if (typeof this.g.maxBufferedWork === 'number') {
                // Throttled: simple check if pending + units exceeds max pending
                if (this.b.value) {
                    if (this.pending + units.length > this.g.maxBufferedWork) {
                        return false; // work not accepted: too much pending work
                    }
                }
                // Unthrottled: same as throttled, but account for max chunk getting
                // worked on directly without being pending
                else {
                    if (this.pending + units.length - this.g.maxWorkChunkSize > this.g.maxBufferedWork) {
                        return false; // work not accepted: too much pending work
                    }
                }
            }
            // Add to pending units first
            for (const unit of units) {
                this.a.push(unit);
            }
            // If not throttled, start working directly
            // Otherwise, when the throttle delay has
            // past, pending work will be worked again.
            if (!this.b.value) {
                this.j();
            }
            return true; // work accepted
        }
        j() {
            // Extract chunk to handle and handle it
            this.h(this.a.splice(0, this.g.maxWorkChunkSize));
            // If we have remaining work, schedule it after a delay
            if (this.a.length > 0) {
                this.b.value = new $Rh(() => {
                    this.b.clear();
                    this.j();
                }, this.g.throttleDelay);
                this.b.value.schedule();
            }
        }
        dispose() {
            super.dispose();
            this.f = true;
        }
    }
    exports.$Uh = $Uh;
    (function () {
        if (typeof globalThis.requestIdleCallback !== 'function' || typeof globalThis.cancelIdleCallback !== 'function') {
            exports.$Wh = (_targetWindow, runner) => {
                (0, platform_1.$C)(() => {
                    if (disposed) {
                        return;
                    }
                    const end = Date.now() + 15; // one frame at 64fps
                    const deadline = {
                        didTimeout: true,
                        timeRemaining() {
                            return Math.max(0, end - Date.now());
                        }
                    };
                    runner(Object.freeze(deadline));
                });
                let disposed = false;
                return {
                    dispose() {
                        if (disposed) {
                            return;
                        }
                        disposed = true;
                    }
                };
            };
        }
        else {
            exports.$Wh = (targetWindow, runner, timeout) => {
                const handle = targetWindow.requestIdleCallback(runner, typeof timeout === 'number' ? { timeout } : undefined);
                let disposed = false;
                return {
                    dispose() {
                        if (disposed) {
                            return;
                        }
                        disposed = true;
                        targetWindow.cancelIdleCallback(handle);
                    }
                };
            };
        }
        exports.$Vh = (runner) => (0, exports.$Wh)(globalThis, runner);
    })();
    class $Xh {
        constructor(targetWindow, executor) {
            this.g = false;
            this.d = () => {
                try {
                    this.j = executor();
                }
                catch (err) {
                    this.l = err;
                }
                finally {
                    this.g = true;
                }
            };
            this.f = (0, exports.$Wh)(targetWindow, () => this.d());
        }
        dispose() {
            this.f.dispose();
        }
        get value() {
            if (!this.g) {
                this.f.dispose();
                this.d();
            }
            if (this.l) {
                throw this.l;
            }
            return this.j;
        }
        get isInitialized() {
            return this.g;
        }
    }
    exports.$Xh = $Xh;
    /**
     * An `IdleValue` that always uses the current window (which might be throttled or inactive)
     *
     * **Note** that there is `dom.ts#WindowIdleValue` which is better suited when running inside a browser
     * context
     */
    class $Yh extends $Xh {
        constructor(executor) {
            super(globalThis, executor);
        }
    }
    exports.$Yh = $Yh;
    //#endregion
    async function $Zh(task, delay, retries) {
        let lastError;
        for (let i = 0; i < retries; i++) {
            try {
                return await task();
            }
            catch (error) {
                lastError = error;
                await $Gh(delay);
            }
        }
        throw lastError;
    }
    /**
     * @deprecated use `LimitedQueue` instead for an easier to use API
     */
    class $1h {
        isRunning(taskId) {
            if (typeof taskId === 'number') {
                return this.a?.taskId === taskId;
            }
            return !!this.a;
        }
        get running() {
            return this.a?.promise;
        }
        cancelRunning() {
            this.a?.cancel();
        }
        run(taskId, promise, onCancel) {
            this.a = { taskId, cancel: () => onCancel?.(), promise };
            promise.then(() => this.d(taskId), () => this.d(taskId));
            return promise;
        }
        d(taskId) {
            if (this.a && taskId === this.a.taskId) {
                // only set running to done if the promise finished that is associated with that taskId
                this.a = undefined;
                // schedule the queued task now that we are free if we have any
                this.f();
            }
        }
        f() {
            if (this.b) {
                const queued = this.b;
                this.b = undefined;
                // Run queued task and complete on the associated promise
                queued.run().then(queued.promiseResolve, queued.promiseReject);
            }
        }
        /**
         * Note: the promise to schedule as next run MUST itself call `run`.
         *       Otherwise, this sequentializer will report `false` for `isRunning`
         *       even when this task is running. Missing this detail means that
         *       suddenly multiple tasks will run in parallel.
         */
        queue(run) {
            // this is our first queued task, so we create associated promise with it
            // so that we can return a promise that completes when the task has
            // completed.
            if (!this.b) {
                const { promise, resolve: promiseResolve, reject: promiseReject } = $yh();
                this.b = {
                    run,
                    promise,
                    promiseResolve: promiseResolve,
                    promiseReject: promiseReject
                };
            }
            // we have a previous queued task, just overwrite it
            else {
                this.b.run = run;
            }
            return this.b.promise;
        }
        hasQueued() {
            return !!this.b;
        }
        async join() {
            return this.b?.promise ?? this.a?.promise;
        }
    }
    exports.$1h = $1h;
    //#endregion
    //#region
    /**
     * The `IntervalCounter` allows to count the number
     * of calls to `increment()` over a duration of
     * `interval`. This utility can be used to conditionally
     * throttle a frequent task when a certain threshold
     * is reached.
     */
    class $2h {
        constructor(d, f = () => Date.now()) {
            this.d = d;
            this.f = f;
            this.a = 0;
            this.b = 0;
        }
        increment() {
            const now = this.f();
            // We are outside of the range of `interval` and as such
            // start counting from 0 and remember the time
            if (now - this.a > this.d) {
                this.a = now;
                this.b = 0;
            }
            this.b++;
            return this.b;
        }
    }
    exports.$2h = $2h;
    var DeferredOutcome;
    (function (DeferredOutcome) {
        DeferredOutcome[DeferredOutcome["Resolved"] = 0] = "Resolved";
        DeferredOutcome[DeferredOutcome["Rejected"] = 1] = "Rejected";
    })(DeferredOutcome || (DeferredOutcome = {}));
    /**
     * Creates a promise whose resolution or rejection can be controlled imperatively.
     */
    class $3h {
        get isRejected() {
            return this.d?.outcome === DeferredOutcome.Rejected;
        }
        get isResolved() {
            return this.d?.outcome === DeferredOutcome.Resolved;
        }
        get isSettled() {
            return !!this.d;
        }
        get value() {
            return this.d?.outcome === DeferredOutcome.Resolved ? this.d?.value : undefined;
        }
        constructor() {
            this.p = new Promise((c, e) => {
                this.a = c;
                this.b = e;
            });
        }
        complete(value) {
            return new Promise(resolve => {
                this.a(value);
                this.d = { outcome: DeferredOutcome.Resolved, value };
                resolve();
            });
        }
        error(err) {
            return new Promise(resolve => {
                this.b(err);
                this.d = { outcome: DeferredOutcome.Rejected, value: err };
                resolve();
            });
        }
        cancel() {
            return this.error(new errors_1.$4());
        }
    }
    exports.$3h = $3h;
    //#endregion
    //#region Promises
    var Promises;
    (function (Promises) {
        /**
         * A drop-in replacement for `Promise.all` with the only difference
         * that the method awaits every promise to either fulfill or reject.
         *
         * Similar to `Promise.all`, only the first error will be returned
         * if any.
         */
        async function settled(promises) {
            let firstError = undefined;
            const result = await Promise.all(promises.map(promise => promise.then(value => value, error => {
                if (!firstError) {
                    firstError = error;
                }
                return undefined; // do not rethrow so that other promises can settle
            })));
            if (typeof firstError !== 'undefined') {
                throw firstError;
            }
            return result; // cast is needed and protected by the `throw` above
        }
        Promises.settled = settled;
        /**
         * A helper to create a new `Promise<T>` with a body that is a promise
         * itself. By default, an error that raises from the async body will
         * end up as a unhandled rejection, so this utility properly awaits the
         * body and rejects the promise as a normal promise does without async
         * body.
         *
         * This method should only be used in rare cases where otherwise `async`
         * cannot be used (e.g. when callbacks are involved that require this).
         */
        function withAsyncBody(bodyFn) {
            // eslint-disable-next-line no-async-promise-executor
            return new Promise(async (resolve, reject) => {
                try {
                    await bodyFn(resolve, reject);
                }
                catch (error) {
                    reject(error);
                }
            });
        }
        Promises.withAsyncBody = withAsyncBody;
    })(Promises || (exports.Promises = Promises = {}));
    class $4h {
        get value() { return this.a; }
        get error() { return this.b; }
        get isResolved() { return this.d; }
        constructor(promise) {
            this.a = undefined;
            this.b = undefined;
            this.d = false;
            this.promise = promise.then(value => {
                this.a = value;
                this.d = true;
                return value;
            }, error => {
                this.b = error;
                this.d = true;
                throw error;
            });
        }
        /**
         * Returns the resolved value.
         * Throws if the promise is not resolved yet.
         */
        requireValue() {
            if (!this.d) {
                throw new errors_1.$bb('Promise is not resolved yet');
            }
            if (this.b) {
                throw this.b;
            }
            return this.a;
        }
    }
    exports.$4h = $4h;
    class $5h {
        constructor(b) {
            this.b = b;
            this.a = new lazy_1.$T(() => new $4h(this.b()));
        }
        /**
         * Returns the resolved value.
         * Throws if the promise is not resolved yet.
         */
        requireValue() {
            return this.a.value.requireValue();
        }
        /**
         * Returns the promise (and triggers a computation of the promise if not yet done so).
         */
        getPromise() {
            return this.a.value.promise;
        }
        /**
         * Reads the current value without triggering a computation of the promise.
         */
        get currentValue() {
            return this.a.rawValue?.value;
        }
    }
    exports.$5h = $5h;
    //#endregion
    //#region
    var AsyncIterableSourceState;
    (function (AsyncIterableSourceState) {
        AsyncIterableSourceState[AsyncIterableSourceState["Initial"] = 0] = "Initial";
        AsyncIterableSourceState[AsyncIterableSourceState["DoneOK"] = 1] = "DoneOK";
        AsyncIterableSourceState[AsyncIterableSourceState["DoneError"] = 2] = "DoneError";
    })(AsyncIterableSourceState || (AsyncIterableSourceState = {}));
    /**
     * A rich implementation for an `AsyncIterable<T>`.
     */
    class $6h {
        static fromArray(items) {
            return new $6h((writer) => {
                writer.emitMany(items);
            });
        }
        static fromPromise(promise) {
            return new $6h(async (emitter) => {
                emitter.emitMany(await promise);
            });
        }
        static fromPromises(promises) {
            return new $6h(async (emitter) => {
                await Promise.all(promises.map(async (p) => emitter.emitOne(await p)));
            });
        }
        static merge(iterables) {
            return new $6h(async (emitter) => {
                await Promise.all(iterables.map(async (iterable) => {
                    for await (const item of iterable) {
                        emitter.emitOne(item);
                    }
                }));
            });
        }
        static { this.EMPTY = $6h.fromArray([]); }
        constructor(executor, onReturn) {
            this.a = AsyncIterableSourceState.Initial;
            this.b = [];
            this.d = null;
            this.f = onReturn;
            this.g = new event_1.$le();
            queueMicrotask(async () => {
                const writer = {
                    emitOne: (item) => this.h(item),
                    emitMany: (items) => this.j(items),
                    reject: (error) => this.l(error)
                };
                try {
                    await Promise.resolve(executor(writer));
                    this.k();
                }
                catch (err) {
                    this.l(err);
                }
                finally {
                    writer.emitOne = undefined;
                    writer.emitMany = undefined;
                    writer.reject = undefined;
                }
            });
        }
        [Symbol.asyncIterator]() {
            let i = 0;
            return {
                next: async () => {
                    do {
                        if (this.a === AsyncIterableSourceState.DoneError) {
                            throw this.d;
                        }
                        if (i < this.b.length) {
                            return { done: false, value: this.b[i++] };
                        }
                        if (this.a === AsyncIterableSourceState.DoneOK) {
                            return { done: true, value: undefined };
                        }
                        await event_1.Event.toPromise(this.g.event);
                    } while (true);
                },
                return: async () => {
                    this.f?.();
                    return { done: true, value: undefined };
                }
            };
        }
        static map(iterable, mapFn) {
            return new $6h(async (emitter) => {
                for await (const item of iterable) {
                    emitter.emitOne(mapFn(item));
                }
            });
        }
        map(mapFn) {
            return $6h.map(this, mapFn);
        }
        static filter(iterable, filterFn) {
            return new $6h(async (emitter) => {
                for await (const item of iterable) {
                    if (filterFn(item)) {
                        emitter.emitOne(item);
                    }
                }
            });
        }
        filter(filterFn) {
            return $6h.filter(this, filterFn);
        }
        static coalesce(iterable) {
            return $6h.filter(iterable, item => !!item);
        }
        coalesce() {
            return $6h.coalesce(this);
        }
        static async toPromise(iterable) {
            const result = [];
            for await (const item of iterable) {
                result.push(item);
            }
            return result;
        }
        toPromise() {
            return $6h.toPromise(this);
        }
        /**
         * The value will be appended at the end.
         *
         * **NOTE** If `resolve()` or `reject()` have already been called, this method has no effect.
         */
        h(value) {
            if (this.a !== AsyncIterableSourceState.Initial) {
                return;
            }
            // it is important to add new values at the end,
            // as we may have iterators already running on the array
            this.b.push(value);
            this.g.fire();
        }
        /**
         * The values will be appended at the end.
         *
         * **NOTE** If `resolve()` or `reject()` have already been called, this method has no effect.
         */
        j(values) {
            if (this.a !== AsyncIterableSourceState.Initial) {
                return;
            }
            // it is important to add new values at the end,
            // as we may have iterators already running on the array
            this.b = this.b.concat(values);
            this.g.fire();
        }
        /**
         * Calling `resolve()` will mark the result array as complete.
         *
         * **NOTE** `resolve()` must be called, otherwise all consumers of this iterable will hang indefinitely, similar to a non-resolved promise.
         * **NOTE** If `resolve()` or `reject()` have already been called, this method has no effect.
         */
        k() {
            if (this.a !== AsyncIterableSourceState.Initial) {
                return;
            }
            this.a = AsyncIterableSourceState.DoneOK;
            this.g.fire();
        }
        /**
         * Writing an error will permanently invalidate this iterable.
         * The current users will receive an error thrown, as will all future users.
         *
         * **NOTE** If `resolve()` or `reject()` have already been called, this method has no effect.
         */
        l(error) {
            if (this.a !== AsyncIterableSourceState.Initial) {
                return;
            }
            this.a = AsyncIterableSourceState.DoneError;
            this.d = error;
            this.g.fire();
        }
    }
    exports.$6h = $6h;
    class $7h extends $6h {
        constructor(m, executor) {
            super(executor);
            this.m = m;
        }
        cancel() {
            this.m.cancel();
        }
    }
    exports.$7h = $7h;
    function $8h(callback) {
        const source = new cancellation_1.$we();
        const innerIterable = callback(source.token);
        return new $7h(source, async (emitter) => {
            const subscription = source.token.onCancellationRequested(() => {
                subscription.dispose();
                source.dispose();
                emitter.reject(new errors_1.$4());
            });
            try {
                for await (const item of innerIterable) {
                    if (source.token.isCancellationRequested) {
                        // canceled in the meantime
                        return;
                    }
                    emitter.emitOne(item);
                }
                subscription.dispose();
                source.dispose();
            }
            catch (err) {
                subscription.dispose();
                source.dispose();
                emitter.reject(err);
            }
        });
    }
    class $9h {
        /**
         *
         * @param onReturn A function that will be called when consuming the async iterable
         * has finished by the consumer, e.g the for-await-loop has be existed (break, return) early.
         * This is NOT called when resolving this source by its owner.
         */
        constructor(onReturn) {
            this.a = new $3h();
            this.b = new $6h(emitter => {
                if (earlyError) {
                    emitter.reject(earlyError);
                    return;
                }
                if (earlyItems) {
                    emitter.emitMany(earlyItems);
                }
                this.d = (error) => emitter.reject(error);
                this.f = (item) => emitter.emitOne(item);
                return this.a.p;
            }, onReturn);
            let earlyError;
            let earlyItems;
            this.f = (item) => {
                if (!earlyItems) {
                    earlyItems = [];
                }
                earlyItems.push(item);
            };
            this.d = (error) => {
                if (!earlyError) {
                    earlyError = error;
                }
            };
        }
        get asyncIterable() {
            return this.b;
        }
        resolve() {
            this.a.complete();
        }
        reject(error) {
            this.d(error);
            this.a.complete();
        }
        emitOne(item) {
            this.f(item);
        }
    }
    exports.$9h = $9h;
});
//#endregion

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(__m[24/*vs/editor/common/core/eolCounter*/], __M([0/*require*/,1/*exports*/,18/*vs/base/common/charCode*/]), function (require, exports, charCode_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.StringEOL = void 0;
    exports.$zu = $zu;
    var StringEOL;
    (function (StringEOL) {
        StringEOL[StringEOL["Unknown"] = 0] = "Unknown";
        StringEOL[StringEOL["Invalid"] = 3] = "Invalid";
        StringEOL[StringEOL["LF"] = 1] = "LF";
        StringEOL[StringEOL["CRLF"] = 2] = "CRLF";
    })(StringEOL || (exports.StringEOL = StringEOL = {}));
    function $zu(text) {
        let eolCount = 0;
        let firstLineLength = 0;
        let lastLineStart = 0;
        let eol = StringEOL.Unknown;
        for (let i = 0, len = text.length; i < len; i++) {
            const chr = text.charCodeAt(i);
            if (chr === charCode_1.CharCode.CarriageReturn) {
                if (eolCount === 0) {
                    firstLineLength = i;
                }
                eolCount++;
                if (i + 1 < len && text.charCodeAt(i + 1) === charCode_1.CharCode.LineFeed) {
                    // \r\n... case
                    eol |= StringEOL.CRLF;
                    i++; // skip \n
                }
                else {
                    // \r... case
                    eol |= StringEOL.Invalid;
                }
                lastLineStart = i + 1;
            }
            else if (chr === charCode_1.CharCode.LineFeed) {
                // \n... case
                eol |= StringEOL.LF;
                if (eolCount === 0) {
                    firstLineLength = i;
                }
                eolCount++;
                lastLineStart = i + 1;
            }
        }
        if (eolCount === 0) {
            firstLineLength = text.length;
        }
        return [eolCount, firstLineLength, text.length - lastLineStart, eol];
    }
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(__m[41/*vs/editor/common/model/fixedArray*/], __M([0/*require*/,1/*exports*/,14/*vs/base/common/arrays*/]), function (require, exports, arrays_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.$AD = void 0;
    /**
     * An array that avoids being sparse by always
     * filling up unused indices with a default value.
     */
    class $AD {
        constructor(b) {
            this.b = b;
            this.a = [];
        }
        get(index) {
            if (index < this.a.length) {
                return this.a[index];
            }
            return this.b;
        }
        set(index, value) {
            while (index >= this.a.length) {
                this.a[this.a.length] = this.b;
            }
            this.a[index] = value;
        }
        replace(index, oldLength, newLength) {
            if (index >= this.a.length) {
                return;
            }
            if (oldLength === 0) {
                this.insert(index, newLength);
                return;
            }
            else if (newLength === 0) {
                this.delete(index, oldLength);
                return;
            }
            const before = this.a.slice(0, index);
            const after = this.a.slice(index + oldLength);
            const insertArr = arrayFill(newLength, this.b);
            this.a = before.concat(insertArr, after);
        }
        delete(deleteIndex, deleteCount) {
            if (deleteCount === 0 || deleteIndex >= this.a.length) {
                return;
            }
            this.a.splice(deleteIndex, deleteCount);
        }
        insert(insertIndex, insertCount) {
            if (insertCount === 0 || insertIndex >= this.a.length) {
                return;
            }
            const arr = [];
            for (let i = 0; i < insertCount; i++) {
                arr[i] = this.b;
            }
            this.a = (0, arrays_1.$Ub)(this.a, insertIndex, arr);
        }
    }
    exports.$AD = $AD;
    function arrayFill(length, value) {
        const arr = [];
        for (let i = 0; i < length; i++) {
            arr[i] = value;
        }
        return arr;
    }
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(__m[12/*vs/editor/common/tokens/lineTokens*/], __M([0/*require*/,1/*exports*/,13/*vs/editor/common/encodedTokenAttributes*/]), function (require, exports, encodedTokenAttributes_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.$Au = void 0;
    exports.$Bu = $Bu;
    class $Au {
        static { this.defaultTokenMetadata = ((encodedTokenAttributes_1.FontStyle.None << encodedTokenAttributes_1.MetadataConsts.FONT_STYLE_OFFSET)
            | (encodedTokenAttributes_1.ColorId.DefaultForeground << encodedTokenAttributes_1.MetadataConsts.FOREGROUND_OFFSET)
            | (encodedTokenAttributes_1.ColorId.DefaultBackground << encodedTokenAttributes_1.MetadataConsts.BACKGROUND_OFFSET)) >>> 0; }
        static createEmpty(lineContent, decoder) {
            const defaultMetadata = $Au.defaultTokenMetadata;
            const tokens = new Uint32Array(2);
            tokens[0] = lineContent.length;
            tokens[1] = defaultMetadata;
            return new $Au(tokens, lineContent, decoder);
        }
        static createFromTextAndMetadata(data, decoder) {
            let offset = 0;
            let fullText = '';
            const tokens = new Array();
            for (const { text, metadata } of data) {
                tokens.push(offset + text.length, metadata);
                offset += text.length;
                fullText += text;
            }
            return new $Au(new Uint32Array(tokens), fullText, decoder);
        }
        constructor(tokens, text, decoder) {
            this._lineTokensBrand = undefined;
            this.a = tokens;
            this.b = (this.a.length >>> 1);
            this.c = text;
            this.languageIdCodec = decoder;
        }
        equals(other) {
            if (other instanceof $Au) {
                return this.slicedEquals(other, 0, this.b);
            }
            return false;
        }
        slicedEquals(other, sliceFromTokenIndex, sliceTokenCount) {
            if (this.c !== other.c) {
                return false;
            }
            if (this.b !== other.b) {
                return false;
            }
            const from = (sliceFromTokenIndex << 1);
            const to = from + (sliceTokenCount << 1);
            for (let i = from; i < to; i++) {
                if (this.a[i] !== other.a[i]) {
                    return false;
                }
            }
            return true;
        }
        getLineContent() {
            return this.c;
        }
        getCount() {
            return this.b;
        }
        getStartOffset(tokenIndex) {
            if (tokenIndex > 0) {
                return this.a[(tokenIndex - 1) << 1];
            }
            return 0;
        }
        getMetadata(tokenIndex) {
            const metadata = this.a[(tokenIndex << 1) + 1];
            return metadata;
        }
        getLanguageId(tokenIndex) {
            const metadata = this.a[(tokenIndex << 1) + 1];
            const languageId = encodedTokenAttributes_1.$vu.getLanguageId(metadata);
            return this.languageIdCodec.decodeLanguageId(languageId);
        }
        getStandardTokenType(tokenIndex) {
            const metadata = this.a[(tokenIndex << 1) + 1];
            return encodedTokenAttributes_1.$vu.getTokenType(metadata);
        }
        getForeground(tokenIndex) {
            const metadata = this.a[(tokenIndex << 1) + 1];
            return encodedTokenAttributes_1.$vu.getForeground(metadata);
        }
        getClassName(tokenIndex) {
            const metadata = this.a[(tokenIndex << 1) + 1];
            return encodedTokenAttributes_1.$vu.getClassNameFromMetadata(metadata);
        }
        getInlineStyle(tokenIndex, colorMap) {
            const metadata = this.a[(tokenIndex << 1) + 1];
            return encodedTokenAttributes_1.$vu.getInlineStyleFromMetadata(metadata, colorMap);
        }
        getPresentation(tokenIndex) {
            const metadata = this.a[(tokenIndex << 1) + 1];
            return encodedTokenAttributes_1.$vu.getPresentationFromMetadata(metadata);
        }
        getEndOffset(tokenIndex) {
            return this.a[tokenIndex << 1];
        }
        /**
         * Find the token containing offset `offset`.
         * @param offset The search offset
         * @return The index of the token containing the offset.
         */
        findTokenIndexAtOffset(offset) {
            return $Au.findIndexInTokensArray(this.a, offset);
        }
        inflate() {
            return this;
        }
        sliceAndInflate(startOffset, endOffset, deltaOffset) {
            return new SliceLineTokens(this, startOffset, endOffset, deltaOffset);
        }
        static convertToEndOffset(tokens, lineTextLength) {
            const tokenCount = (tokens.length >>> 1);
            const lastTokenIndex = tokenCount - 1;
            for (let tokenIndex = 0; tokenIndex < lastTokenIndex; tokenIndex++) {
                tokens[tokenIndex << 1] = tokens[(tokenIndex + 1) << 1];
            }
            tokens[lastTokenIndex << 1] = lineTextLength;
        }
        static findIndexInTokensArray(tokens, desiredIndex) {
            if (tokens.length <= 2) {
                return 0;
            }
            let low = 0;
            let high = (tokens.length >>> 1) - 1;
            while (low < high) {
                const mid = low + Math.floor((high - low) / 2);
                const endOffset = tokens[(mid << 1)];
                if (endOffset === desiredIndex) {
                    return mid + 1;
                }
                else if (endOffset < desiredIndex) {
                    low = mid + 1;
                }
                else if (endOffset > desiredIndex) {
                    high = mid;
                }
            }
            return low;
        }
        /**
         * @pure
         * @param insertTokens Must be sorted by offset.
        */
        withInserted(insertTokens) {
            if (insertTokens.length === 0) {
                return this;
            }
            let nextOriginalTokenIdx = 0;
            let nextInsertTokenIdx = 0;
            let text = '';
            const newTokens = new Array();
            let originalEndOffset = 0;
            while (true) {
                const nextOriginalTokenEndOffset = nextOriginalTokenIdx < this.b ? this.a[nextOriginalTokenIdx << 1] : -1;
                const nextInsertToken = nextInsertTokenIdx < insertTokens.length ? insertTokens[nextInsertTokenIdx] : null;
                if (nextOriginalTokenEndOffset !== -1 && (nextInsertToken === null || nextOriginalTokenEndOffset <= nextInsertToken.offset)) {
                    // original token ends before next insert token
                    text += this.c.substring(originalEndOffset, nextOriginalTokenEndOffset);
                    const metadata = this.a[(nextOriginalTokenIdx << 1) + 1];
                    newTokens.push(text.length, metadata);
                    nextOriginalTokenIdx++;
                    originalEndOffset = nextOriginalTokenEndOffset;
                }
                else if (nextInsertToken) {
                    if (nextInsertToken.offset > originalEndOffset) {
                        // insert token is in the middle of the next token.
                        text += this.c.substring(originalEndOffset, nextInsertToken.offset);
                        const metadata = this.a[(nextOriginalTokenIdx << 1) + 1];
                        newTokens.push(text.length, metadata);
                        originalEndOffset = nextInsertToken.offset;
                    }
                    text += nextInsertToken.text;
                    newTokens.push(text.length, nextInsertToken.tokenMetadata);
                    nextInsertTokenIdx++;
                }
                else {
                    break;
                }
            }
            return new $Au(new Uint32Array(newTokens), text, this.languageIdCodec);
        }
        getTokenText(tokenIndex) {
            const startOffset = this.getStartOffset(tokenIndex);
            const endOffset = this.getEndOffset(tokenIndex);
            const text = this.c.substring(startOffset, endOffset);
            return text;
        }
        forEach(callback) {
            const tokenCount = this.getCount();
            for (let tokenIndex = 0; tokenIndex < tokenCount; tokenIndex++) {
                callback(tokenIndex);
            }
        }
    }
    exports.$Au = $Au;
    class SliceLineTokens {
        constructor(source, startOffset, endOffset, deltaOffset) {
            this.a = source;
            this.b = startOffset;
            this.c = endOffset;
            this.d = deltaOffset;
            this.e = source.findTokenIndexAtOffset(startOffset);
            this.languageIdCodec = source.languageIdCodec;
            this.f = 0;
            for (let i = this.e, len = source.getCount(); i < len; i++) {
                const tokenStartOffset = source.getStartOffset(i);
                if (tokenStartOffset >= endOffset) {
                    break;
                }
                this.f++;
            }
        }
        getMetadata(tokenIndex) {
            return this.a.getMetadata(this.e + tokenIndex);
        }
        getLanguageId(tokenIndex) {
            return this.a.getLanguageId(this.e + tokenIndex);
        }
        getLineContent() {
            return this.a.getLineContent().substring(this.b, this.c);
        }
        equals(other) {
            if (other instanceof SliceLineTokens) {
                return (this.b === other.b
                    && this.c === other.c
                    && this.d === other.d
                    && this.a.slicedEquals(other.a, this.e, this.f));
            }
            return false;
        }
        getCount() {
            return this.f;
        }
        getStandardTokenType(tokenIndex) {
            return this.a.getStandardTokenType(this.e + tokenIndex);
        }
        getForeground(tokenIndex) {
            return this.a.getForeground(this.e + tokenIndex);
        }
        getEndOffset(tokenIndex) {
            const tokenEndOffset = this.a.getEndOffset(this.e + tokenIndex);
            return Math.min(this.c, tokenEndOffset) - this.b + this.d;
        }
        getClassName(tokenIndex) {
            return this.a.getClassName(this.e + tokenIndex);
        }
        getInlineStyle(tokenIndex, colorMap) {
            return this.a.getInlineStyle(this.e + tokenIndex, colorMap);
        }
        getPresentation(tokenIndex) {
            return this.a.getPresentation(this.e + tokenIndex);
        }
        findTokenIndexAtOffset(offset) {
            return this.a.findTokenIndexAtOffset(offset + this.b - this.d) - this.e;
        }
        getTokenText(tokenIndex) {
            const adjustedTokenIndex = this.e + tokenIndex;
            const tokenStartOffset = this.a.getStartOffset(adjustedTokenIndex);
            const tokenEndOffset = this.a.getEndOffset(adjustedTokenIndex);
            let text = this.a.getTokenText(adjustedTokenIndex);
            if (tokenStartOffset < this.b) {
                text = text.substring(this.b - tokenStartOffset);
            }
            if (tokenEndOffset > this.c) {
                text = text.substring(0, text.length - (tokenEndOffset - this.c));
            }
            return text;
        }
        forEach(callback) {
            for (let tokenIndex = 0; tokenIndex < this.getCount(); tokenIndex++) {
                callback(tokenIndex);
            }
        }
    }
    function $Bu(model, position) {
        const lineNumber = position.lineNumber;
        if (!model.tokenization.isCheapToTokenize(lineNumber)) {
            return undefined;
        }
        model.tokenization.forceTokenization(lineNumber);
        const lineTokens = model.tokenization.getLineTokens(lineNumber);
        const tokenIndex = lineTokens.findTokenIndexAtOffset(position.column - 1);
        const tokenType = lineTokens.getStandardTokenType(tokenIndex);
        return tokenType;
    }
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(__m[42/*vs/editor/common/tokens/contiguousTokensEditing*/], __M([0/*require*/,1/*exports*/,12/*vs/editor/common/tokens/lineTokens*/]), function (require, exports, lineTokens_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.$Du = exports.$Cu = void 0;
    exports.$Eu = $Eu;
    exports.$Cu = (new Uint32Array(0)).buffer;
    class $Du {
        static deleteBeginning(lineTokens, toChIndex) {
            if (lineTokens === null || lineTokens === exports.$Cu) {
                return lineTokens;
            }
            return $Du.delete(lineTokens, 0, toChIndex);
        }
        static deleteEnding(lineTokens, fromChIndex) {
            if (lineTokens === null || lineTokens === exports.$Cu) {
                return lineTokens;
            }
            const tokens = $Eu(lineTokens);
            const lineTextLength = tokens[tokens.length - 2];
            return $Du.delete(lineTokens, fromChIndex, lineTextLength);
        }
        static delete(lineTokens, fromChIndex, toChIndex) {
            if (lineTokens === null || lineTokens === exports.$Cu || fromChIndex === toChIndex) {
                return lineTokens;
            }
            const tokens = $Eu(lineTokens);
            const tokensCount = (tokens.length >>> 1);
            // special case: deleting everything
            if (fromChIndex === 0 && tokens[tokens.length - 2] === toChIndex) {
                return exports.$Cu;
            }
            const fromTokenIndex = lineTokens_1.$Au.findIndexInTokensArray(tokens, fromChIndex);
            const fromTokenStartOffset = (fromTokenIndex > 0 ? tokens[(fromTokenIndex - 1) << 1] : 0);
            const fromTokenEndOffset = tokens[fromTokenIndex << 1];
            if (toChIndex < fromTokenEndOffset) {
                // the delete range is inside a single token
                const delta = (toChIndex - fromChIndex);
                for (let i = fromTokenIndex; i < tokensCount; i++) {
                    tokens[i << 1] -= delta;
                }
                return lineTokens;
            }
            let dest;
            let lastEnd;
            if (fromTokenStartOffset !== fromChIndex) {
                tokens[fromTokenIndex << 1] = fromChIndex;
                dest = ((fromTokenIndex + 1) << 1);
                lastEnd = fromChIndex;
            }
            else {
                dest = (fromTokenIndex << 1);
                lastEnd = fromTokenStartOffset;
            }
            const delta = (toChIndex - fromChIndex);
            for (let tokenIndex = fromTokenIndex + 1; tokenIndex < tokensCount; tokenIndex++) {
                const tokenEndOffset = tokens[tokenIndex << 1] - delta;
                if (tokenEndOffset > lastEnd) {
                    tokens[dest++] = tokenEndOffset;
                    tokens[dest++] = tokens[(tokenIndex << 1) + 1];
                    lastEnd = tokenEndOffset;
                }
            }
            if (dest === tokens.length) {
                // nothing to trim
                return lineTokens;
            }
            const tmp = new Uint32Array(dest);
            tmp.set(tokens.subarray(0, dest), 0);
            return tmp.buffer;
        }
        static append(lineTokens, _otherTokens) {
            if (_otherTokens === exports.$Cu) {
                return lineTokens;
            }
            if (lineTokens === exports.$Cu) {
                return _otherTokens;
            }
            if (lineTokens === null) {
                return lineTokens;
            }
            if (_otherTokens === null) {
                // cannot determine combined line length...
                return null;
            }
            const myTokens = $Eu(lineTokens);
            const otherTokens = $Eu(_otherTokens);
            const otherTokensCount = (otherTokens.length >>> 1);
            const result = new Uint32Array(myTokens.length + otherTokens.length);
            result.set(myTokens, 0);
            let dest = myTokens.length;
            const delta = myTokens[myTokens.length - 2];
            for (let i = 0; i < otherTokensCount; i++) {
                result[dest++] = otherTokens[(i << 1)] + delta;
                result[dest++] = otherTokens[(i << 1) + 1];
            }
            return result.buffer;
        }
        static insert(lineTokens, chIndex, textLength) {
            if (lineTokens === null || lineTokens === exports.$Cu) {
                // nothing to do
                return lineTokens;
            }
            const tokens = $Eu(lineTokens);
            const tokensCount = (tokens.length >>> 1);
            let fromTokenIndex = lineTokens_1.$Au.findIndexInTokensArray(tokens, chIndex);
            if (fromTokenIndex > 0) {
                const fromTokenStartOffset = tokens[(fromTokenIndex - 1) << 1];
                if (fromTokenStartOffset === chIndex) {
                    fromTokenIndex--;
                }
            }
            for (let tokenIndex = fromTokenIndex; tokenIndex < tokensCount; tokenIndex++) {
                tokens[tokenIndex << 1] += textLength;
            }
            return lineTokens;
        }
    }
    exports.$Du = $Du;
    function $Eu(arr) {
        if (arr instanceof Uint32Array) {
            return arr;
        }
        else {
            return new Uint32Array(arr);
        }
    }
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/























define(__m[43/*vs/editor/common/tokens/contiguousMultilineTokens*/], __M([0/*require*/,1/*exports*/,14/*vs/base/common/arrays*/,17/*vs/base/common/buffer*/,52/*vs/editor/common/core/position*/,24/*vs/editor/common/core/eolCounter*/,42/*vs/editor/common/tokens/contiguousTokensEditing*/,25/*vs/editor/common/core/lineRange*/]), function (require, exports, arrays, buffer_1, position_1, eolCounter_1, contiguousTokensEditing_1, lineRange_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.$Fu = void 0;
    arrays = __importStar(arrays);
    /**
     * Represents contiguous tokens over a contiguous range of lines.
     */
    class $Fu {
        static deserialize(buff, offset, result) {
            const view32 = new Uint32Array(buff.buffer);
            const startLineNumber = (0, buffer_1.$Re)(buff, offset);
            offset += 4;
            const count = (0, buffer_1.$Re)(buff, offset);
            offset += 4;
            const tokens = [];
            for (let i = 0; i < count; i++) {
                const byteCount = (0, buffer_1.$Re)(buff, offset);
                offset += 4;
                tokens.push(view32.subarray(offset / 4, offset / 4 + byteCount / 4));
                offset += byteCount;
            }
            result.push(new $Fu(startLineNumber, tokens));
            return offset;
        }
        /**
         * (Inclusive) start line number for these tokens.
         */
        get startLineNumber() {
            return this.a;
        }
        /**
         * (Inclusive) end line number for these tokens.
         */
        get endLineNumber() {
            return this.a + this.b.length - 1;
        }
        constructor(startLineNumber, tokens) {
            this.a = startLineNumber;
            this.b = tokens;
        }
        getLineRange() {
            return new lineRange_1.$Xt(this.a, this.a + this.b.length);
        }
        /**
         * @see {@link b}
         */
        getLineTokens(lineNumber) {
            return this.b[lineNumber - this.a];
        }
        appendLineTokens(lineTokens) {
            this.b.push(lineTokens);
        }
        serializeSize() {
            let result = 0;
            result += 4; // 4 bytes for the start line number
            result += 4; // 4 bytes for the line count
            for (let i = 0; i < this.b.length; i++) {
                const lineTokens = this.b[i];
                if (!(lineTokens instanceof Uint32Array)) {
                    throw new Error(`Not supported!`);
                }
                result += 4; // 4 bytes for the byte count
                result += lineTokens.byteLength;
            }
            return result;
        }
        serialize(destination, offset) {
            (0, buffer_1.$Se)(destination, this.a, offset);
            offset += 4;
            (0, buffer_1.$Se)(destination, this.b.length, offset);
            offset += 4;
            for (let i = 0; i < this.b.length; i++) {
                const lineTokens = this.b[i];
                if (!(lineTokens instanceof Uint32Array)) {
                    throw new Error(`Not supported!`);
                }
                (0, buffer_1.$Se)(destination, lineTokens.byteLength, offset);
                offset += 4;
                destination.set(new Uint8Array(lineTokens.buffer), offset);
                offset += lineTokens.byteLength;
            }
            return offset;
        }
        applyEdit(range, text) {
            const [eolCount, firstLineLength] = (0, eolCounter_1.$zu)(text);
            this.c(range);
            this.d(new position_1.$Nt(range.startLineNumber, range.startColumn), eolCount, firstLineLength);
        }
        c(range) {
            if (range.startLineNumber === range.endLineNumber && range.startColumn === range.endColumn) {
                // Nothing to delete
                return;
            }
            const firstLineIndex = range.startLineNumber - this.a;
            const lastLineIndex = range.endLineNumber - this.a;
            if (lastLineIndex < 0) {
                // this deletion occurs entirely before this block, so we only need to adjust line numbers
                const deletedLinesCount = lastLineIndex - firstLineIndex;
                this.a -= deletedLinesCount;
                return;
            }
            if (firstLineIndex >= this.b.length) {
                // this deletion occurs entirely after this block, so there is nothing to do
                return;
            }
            if (firstLineIndex < 0 && lastLineIndex >= this.b.length) {
                // this deletion completely encompasses this block
                this.a = 0;
                this.b = [];
                return;
            }
            if (firstLineIndex === lastLineIndex) {
                // a delete on a single line
                this.b[firstLineIndex] = contiguousTokensEditing_1.$Du.delete(this.b[firstLineIndex], range.startColumn - 1, range.endColumn - 1);
                return;
            }
            if (firstLineIndex >= 0) {
                // The first line survives
                this.b[firstLineIndex] = contiguousTokensEditing_1.$Du.deleteEnding(this.b[firstLineIndex], range.startColumn - 1);
                if (lastLineIndex < this.b.length) {
                    // The last line survives
                    const lastLineTokens = contiguousTokensEditing_1.$Du.deleteBeginning(this.b[lastLineIndex], range.endColumn - 1);
                    // Take remaining text on last line and append it to remaining text on first line
                    this.b[firstLineIndex] = contiguousTokensEditing_1.$Du.append(this.b[firstLineIndex], lastLineTokens);
                    // Delete middle lines
                    this.b.splice(firstLineIndex + 1, lastLineIndex - firstLineIndex);
                }
                else {
                    // The last line does not survive
                    // Take remaining text on last line and append it to remaining text on first line
                    this.b[firstLineIndex] = contiguousTokensEditing_1.$Du.append(this.b[firstLineIndex], null);
                    // Delete lines
                    this.b = this.b.slice(0, firstLineIndex + 1);
                }
            }
            else {
                // The first line does not survive
                const deletedBefore = -firstLineIndex;
                this.a -= deletedBefore;
                // Remove beginning from last line
                this.b[lastLineIndex] = contiguousTokensEditing_1.$Du.deleteBeginning(this.b[lastLineIndex], range.endColumn - 1);
                // Delete lines
                this.b = this.b.slice(lastLineIndex);
            }
        }
        d(position, eolCount, firstLineLength) {
            if (eolCount === 0 && firstLineLength === 0) {
                // Nothing to insert
                return;
            }
            const lineIndex = position.lineNumber - this.a;
            if (lineIndex < 0) {
                // this insertion occurs before this block, so we only need to adjust line numbers
                this.a += eolCount;
                return;
            }
            if (lineIndex >= this.b.length) {
                // this insertion occurs after this block, so there is nothing to do
                return;
            }
            if (eolCount === 0) {
                // Inserting text on one line
                this.b[lineIndex] = contiguousTokensEditing_1.$Du.insert(this.b[lineIndex], position.column - 1, firstLineLength);
                return;
            }
            this.b[lineIndex] = contiguousTokensEditing_1.$Du.deleteEnding(this.b[lineIndex], position.column - 1);
            this.b[lineIndex] = contiguousTokensEditing_1.$Du.insert(this.b[lineIndex], position.column - 1, firstLineLength);
            this.e(position.lineNumber, eolCount);
        }
        e(insertIndex, insertCount) {
            if (insertCount === 0) {
                return;
            }
            const lineTokens = [];
            for (let i = 0; i < insertCount; i++) {
                lineTokens[i] = null;
            }
            this.b = arrays.$Ub(this.b, insertIndex, lineTokens);
        }
    }
    exports.$Fu = $Fu;
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(__m[26/*vs/editor/common/tokens/contiguousMultilineTokensBuilder*/], __M([0/*require*/,1/*exports*/,17/*vs/base/common/buffer*/,43/*vs/editor/common/tokens/contiguousMultilineTokens*/]), function (require, exports, buffer_1, contiguousMultilineTokens_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.$BD = void 0;
    class $BD {
        static deserialize(buff) {
            let offset = 0;
            const count = (0, buffer_1.$Re)(buff, offset);
            offset += 4;
            const result = [];
            for (let i = 0; i < count; i++) {
                offset = contiguousMultilineTokens_1.$Fu.deserialize(buff, offset, result);
            }
            return result;
        }
        constructor() {
            this.a = [];
        }
        add(lineNumber, lineTokens) {
            if (this.a.length > 0) {
                const last = this.a[this.a.length - 1];
                if (last.endLineNumber + 1 === lineNumber) {
                    // append
                    last.appendLineTokens(lineTokens);
                    return;
                }
            }
            this.a.push(new contiguousMultilineTokens_1.$Fu(lineNumber, [lineTokens]));
        }
        finalize() {
            return this.a;
        }
        serialize() {
            const size = this.b();
            const result = new Uint8Array(size);
            this.c(result);
            return result;
        }
        b() {
            let result = 0;
            result += 4; // 4 bytes for the count
            for (let i = 0; i < this.a.length; i++) {
                result += this.a[i].serializeSize();
            }
            return result;
        }
        c(destination) {
            let offset = 0;
            (0, buffer_1.$Se)(destination, this.a.length, offset);
            offset += 4;
            for (let i = 0; i < this.a.length; i++) {
                offset = this.a[i].serialize(destination, offset);
            }
        }
    }
    exports.$BD = $BD;
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(__m[27/*vs/editor/common/languages/nullTokenize*/], __M([0/*require*/,1/*exports*/,44/*vs/editor/common/languages*/,13/*vs/editor/common/encodedTokenAttributes*/]), function (require, exports, languages_1, encodedTokenAttributes_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.$xD = void 0;
    exports.$yD = $yD;
    exports.$zD = $zD;
    exports.$xD = new class {
        clone() {
            return this;
        }
        equals(other) {
            return (this === other);
        }
    };
    function $yD(languageId, state) {
        return new languages_1.$Iu([new languages_1.$Hu(0, '', languageId)], state);
    }
    function $zD(languageId, state) {
        const tokens = new Uint32Array(2);
        tokens[0] = 0;
        tokens[1] = ((languageId << encodedTokenAttributes_1.MetadataConsts.LANGUAGEID_OFFSET)
            | (encodedTokenAttributes_1.StandardTokenType.Other << encodedTokenAttributes_1.MetadataConsts.TOKEN_TYPE_OFFSET)
            | (encodedTokenAttributes_1.FontStyle.None << encodedTokenAttributes_1.MetadataConsts.FONT_STYLE_OFFSET)
            | (encodedTokenAttributes_1.ColorId.DefaultForeground << encodedTokenAttributes_1.MetadataConsts.FOREGROUND_OFFSET)
            | (encodedTokenAttributes_1.ColorId.DefaultBackground << encodedTokenAttributes_1.MetadataConsts.BACKGROUND_OFFSET)) >>> 0;
        return new languages_1.$Ju(tokens, state === null ? exports.$xD : state);
    }
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(__m[45/*vs/editor/common/model/textModelTokens*/], __M([0/*require*/,1/*exports*/,23/*vs/base/common/async*/,8/*vs/base/common/errors*/,5/*vs/base/common/platform*/,46/*vs/base/common/stopwatch*/,24/*vs/editor/common/core/eolCounter*/,25/*vs/editor/common/core/lineRange*/,53/*vs/editor/common/core/offsetRange*/,13/*vs/editor/common/encodedTokenAttributes*/,27/*vs/editor/common/languages/nullTokenize*/,41/*vs/editor/common/model/fixedArray*/,26/*vs/editor/common/tokens/contiguousMultilineTokensBuilder*/,12/*vs/editor/common/tokens/lineTokens*/]), function (require, exports, async_1, errors_1, platform_1, stopwatch_1, eolCounter_1, lineRange_1, offsetRange_1, encodedTokenAttributes_1, nullTokenize_1, fixedArray_1, contiguousMultilineTokensBuilder_1, lineTokens_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.$HD = exports.$GD = exports.$FD = exports.$ED = exports.$DD = exports.$CD = void 0;
    var Constants;
    (function (Constants) {
        Constants[Constants["CHEAP_TOKENIZATION_LENGTH_LIMIT"] = 2048] = "CHEAP_TOKENIZATION_LENGTH_LIMIT";
    })(Constants || (Constants = {}));
    class $CD {
        constructor(lineCount, tokenizationSupport) {
            this.tokenizationSupport = tokenizationSupport;
            this.a = this.tokenizationSupport.getInitialState();
            this.store = new $ED(lineCount);
        }
        getStartState(lineNumber) {
            return this.store.getStartState(lineNumber, this.a);
        }
        getFirstInvalidLine() {
            return this.store.getFirstInvalidLine(this.a);
        }
    }
    exports.$CD = $CD;
    class $DD extends $CD {
        constructor(lineCount, tokenizationSupport, _textModel, _languageIdCodec) {
            super(lineCount, tokenizationSupport);
            this._textModel = _textModel;
            this._languageIdCodec = _languageIdCodec;
        }
        updateTokensUntilLine(builder, lineNumber) {
            const languageId = this._textModel.getLanguageId();
            while (true) {
                const lineToTokenize = this.getFirstInvalidLine();
                if (!lineToTokenize || lineToTokenize.lineNumber > lineNumber) {
                    break;
                }
                const text = this._textModel.getLineContent(lineToTokenize.lineNumber);
                const r = safeTokenize(this._languageIdCodec, languageId, this.tokenizationSupport, text, true, lineToTokenize.startState);
                builder.add(lineToTokenize.lineNumber, r.tokens);
                this.store.setEndState(lineToTokenize.lineNumber, r.endState);
            }
        }
        /** assumes state is up to date */
        getTokenTypeIfInsertingCharacter(position, character) {
            // TODO@hediet: use tokenizeLineWithEdit
            const lineStartState = this.getStartState(position.lineNumber);
            if (!lineStartState) {
                return encodedTokenAttributes_1.StandardTokenType.Other;
            }
            const languageId = this._textModel.getLanguageId();
            const lineContent = this._textModel.getLineContent(position.lineNumber);
            // Create the text as if `character` was inserted
            const text = (lineContent.substring(0, position.column - 1)
                + character
                + lineContent.substring(position.column - 1));
            const r = safeTokenize(this._languageIdCodec, languageId, this.tokenizationSupport, text, true, lineStartState);
            const lineTokens = new lineTokens_1.$Au(r.tokens, text, this._languageIdCodec);
            if (lineTokens.getCount() === 0) {
                return encodedTokenAttributes_1.StandardTokenType.Other;
            }
            const tokenIndex = lineTokens.findTokenIndexAtOffset(position.column - 1);
            return lineTokens.getStandardTokenType(tokenIndex);
        }
        /** assumes state is up to date */
        tokenizeLineWithEdit(position, length, newText) {
            const lineNumber = position.lineNumber;
            const column = position.column;
            const lineStartState = this.getStartState(lineNumber);
            if (!lineStartState) {
                return null;
            }
            const curLineContent = this._textModel.getLineContent(lineNumber);
            const newLineContent = curLineContent.substring(0, column - 1)
                + newText + curLineContent.substring(column - 1 + length);
            const languageId = this._textModel.getLanguageIdAtPosition(lineNumber, 0);
            const result = safeTokenize(this._languageIdCodec, languageId, this.tokenizationSupport, newLineContent, true, lineStartState);
            const lineTokens = new lineTokens_1.$Au(result.tokens, newLineContent, this._languageIdCodec);
            return lineTokens;
        }
        hasAccurateTokensForLine(lineNumber) {
            const firstInvalidLineNumber = this.store.getFirstInvalidEndStateLineNumberOrMax();
            return (lineNumber < firstInvalidLineNumber);
        }
        isCheapToTokenize(lineNumber) {
            const firstInvalidLineNumber = this.store.getFirstInvalidEndStateLineNumberOrMax();
            if (lineNumber < firstInvalidLineNumber) {
                return true;
            }
            if (lineNumber === firstInvalidLineNumber
                && this._textModel.getLineLength(lineNumber) < Constants.CHEAP_TOKENIZATION_LENGTH_LIMIT) {
                return true;
            }
            return false;
        }
        /**
         * The result is not cached.
         */
        tokenizeHeuristically(builder, startLineNumber, endLineNumber) {
            if (endLineNumber <= this.store.getFirstInvalidEndStateLineNumberOrMax()) {
                // nothing to do
                return { heuristicTokens: false };
            }
            if (startLineNumber <= this.store.getFirstInvalidEndStateLineNumberOrMax()) {
                // tokenization has reached the viewport start...
                this.updateTokensUntilLine(builder, endLineNumber);
                return { heuristicTokens: false };
            }
            let state = this.b(startLineNumber);
            const languageId = this._textModel.getLanguageId();
            for (let lineNumber = startLineNumber; lineNumber <= endLineNumber; lineNumber++) {
                const text = this._textModel.getLineContent(lineNumber);
                const r = safeTokenize(this._languageIdCodec, languageId, this.tokenizationSupport, text, true, state);
                builder.add(lineNumber, r.tokens);
                state = r.endState;
            }
            return { heuristicTokens: true };
        }
        b(lineNumber) {
            let nonWhitespaceColumn = this._textModel.getLineFirstNonWhitespaceColumn(lineNumber);
            const likelyRelevantLines = [];
            let initialState = null;
            for (let i = lineNumber - 1; nonWhitespaceColumn > 1 && i >= 1; i--) {
                const newNonWhitespaceIndex = this._textModel.getLineFirstNonWhitespaceColumn(i);
                // Ignore lines full of whitespace
                if (newNonWhitespaceIndex === 0) {
                    continue;
                }
                if (newNonWhitespaceIndex < nonWhitespaceColumn) {
                    likelyRelevantLines.push(this._textModel.getLineContent(i));
                    nonWhitespaceColumn = newNonWhitespaceIndex;
                    initialState = this.getStartState(i);
                    if (initialState) {
                        break;
                    }
                }
            }
            if (!initialState) {
                initialState = this.tokenizationSupport.getInitialState();
            }
            likelyRelevantLines.reverse();
            const languageId = this._textModel.getLanguageId();
            let state = initialState;
            for (const line of likelyRelevantLines) {
                const r = safeTokenize(this._languageIdCodec, languageId, this.tokenizationSupport, line, false, state);
                state = r.endState;
            }
            return state;
        }
    }
    exports.$DD = $DD;
    /**
     * **Invariant:**
     * If the text model is retokenized from line 1 to {@link getFirstInvalidEndStateLineNumber}() - 1,
     * then the recomputed end state for line l will be equal to {@link getEndState}(l).
     */
    class $ED {
        constructor(d) {
            this.d = d;
            this.a = new $FD();
            this.b = new $GD();
            this.b.addRange(new offsetRange_1.$Vt(1, d + 1));
        }
        getEndState(lineNumber) {
            return this.a.getEndState(lineNumber);
        }
        /**
         * @returns if the end state has changed.
         */
        setEndState(lineNumber, state) {
            if (!state) {
                throw new errors_1.$bb('Cannot set null/undefined state');
            }
            this.b.delete(lineNumber);
            const r = this.a.setEndState(lineNumber, state);
            if (r && lineNumber < this.d) {
                // because the state changed, we cannot trust the next state anymore and have to invalidate it.
                this.b.addRange(new offsetRange_1.$Vt(lineNumber + 1, lineNumber + 2));
            }
            return r;
        }
        acceptChange(range, newLineCount) {
            this.d += newLineCount - range.length;
            this.a.acceptChange(range, newLineCount);
            this.b.addRangeAndResize(new offsetRange_1.$Vt(range.startLineNumber, range.endLineNumberExclusive), newLineCount);
        }
        acceptChanges(changes) {
            for (const c of changes) {
                const [eolCount] = (0, eolCounter_1.$zu)(c.text);
                this.acceptChange(new lineRange_1.$Xt(c.range.startLineNumber, c.range.endLineNumber + 1), eolCount + 1);
            }
        }
        invalidateEndStateRange(range) {
            this.b.addRange(new offsetRange_1.$Vt(range.startLineNumber, range.endLineNumberExclusive));
        }
        getFirstInvalidEndStateLineNumber() { return this.b.min; }
        getFirstInvalidEndStateLineNumberOrMax() {
            return this.getFirstInvalidEndStateLineNumber() || Number.MAX_SAFE_INTEGER;
        }
        allStatesValid() { return this.b.min === null; }
        getStartState(lineNumber, initialState) {
            if (lineNumber === 1) {
                return initialState;
            }
            return this.getEndState(lineNumber - 1);
        }
        getFirstInvalidLine(initialState) {
            const lineNumber = this.getFirstInvalidEndStateLineNumber();
            if (lineNumber === null) {
                return null;
            }
            const startState = this.getStartState(lineNumber, initialState);
            if (!startState) {
                throw new errors_1.$bb('Start state must be defined');
            }
            return { lineNumber, startState };
        }
    }
    exports.$ED = $ED;
    class $FD {
        constructor() {
            this.a = new fixedArray_1.$AD(null);
        }
        getEndState(lineNumber) {
            return this.a.get(lineNumber);
        }
        setEndState(lineNumber, state) {
            const oldState = this.a.get(lineNumber);
            if (oldState && oldState.equals(state)) {
                return false;
            }
            this.a.set(lineNumber, state);
            return true;
        }
        acceptChange(range, newLineCount) {
            let length = range.length;
            if (newLineCount > 0 && length > 0) {
                // Keep the last state, even though it is unrelated.
                // But if the new state happens to agree with this last state, then we know we can stop tokenizing.
                length--;
                newLineCount--;
            }
            this.a.replace(range.startLineNumber, length, newLineCount);
        }
        acceptChanges(changes) {
            for (const c of changes) {
                const [eolCount] = (0, eolCounter_1.$zu)(c.text);
                this.acceptChange(new lineRange_1.$Xt(c.range.startLineNumber, c.range.endLineNumber + 1), eolCount + 1);
            }
        }
    }
    exports.$FD = $FD;
    class $GD {
        constructor() {
            this.a = [];
        }
        getRanges() {
            return this.a;
        }
        get min() {
            if (this.a.length === 0) {
                return null;
            }
            return this.a[0].start;
        }
        removeMin() {
            if (this.a.length === 0) {
                return null;
            }
            const range = this.a[0];
            if (range.start + 1 === range.endExclusive) {
                this.a.shift();
            }
            else {
                this.a[0] = new offsetRange_1.$Vt(range.start + 1, range.endExclusive);
            }
            return range.start;
        }
        delete(value) {
            const idx = this.a.findIndex(r => r.contains(value));
            if (idx !== -1) {
                const range = this.a[idx];
                if (range.start === value) {
                    if (range.endExclusive === value + 1) {
                        this.a.splice(idx, 1);
                    }
                    else {
                        this.a[idx] = new offsetRange_1.$Vt(value + 1, range.endExclusive);
                    }
                }
                else {
                    if (range.endExclusive === value + 1) {
                        this.a[idx] = new offsetRange_1.$Vt(range.start, value);
                    }
                    else {
                        this.a.splice(idx, 1, new offsetRange_1.$Vt(range.start, value), new offsetRange_1.$Vt(value + 1, range.endExclusive));
                    }
                }
            }
        }
        addRange(range) {
            offsetRange_1.$Vt.addRange(range, this.a);
        }
        addRangeAndResize(range, newLength) {
            let idxFirstMightBeIntersecting = 0;
            while (!(idxFirstMightBeIntersecting >= this.a.length || range.start <= this.a[idxFirstMightBeIntersecting].endExclusive)) {
                idxFirstMightBeIntersecting++;
            }
            let idxFirstIsAfter = idxFirstMightBeIntersecting;
            while (!(idxFirstIsAfter >= this.a.length || range.endExclusive < this.a[idxFirstIsAfter].start)) {
                idxFirstIsAfter++;
            }
            const delta = newLength - range.length;
            for (let i = idxFirstIsAfter; i < this.a.length; i++) {
                this.a[i] = this.a[i].delta(delta);
            }
            if (idxFirstMightBeIntersecting === idxFirstIsAfter) {
                const newRange = new offsetRange_1.$Vt(range.start, range.start + newLength);
                if (!newRange.isEmpty) {
                    this.a.splice(idxFirstMightBeIntersecting, 0, newRange);
                }
            }
            else {
                const start = Math.min(range.start, this.a[idxFirstMightBeIntersecting].start);
                const endEx = Math.max(range.endExclusive, this.a[idxFirstIsAfter - 1].endExclusive);
                const newRange = new offsetRange_1.$Vt(start, endEx + delta);
                if (!newRange.isEmpty) {
                    this.a.splice(idxFirstMightBeIntersecting, idxFirstIsAfter - idxFirstMightBeIntersecting, newRange);
                }
                else {
                    this.a.splice(idxFirstMightBeIntersecting, idxFirstIsAfter - idxFirstMightBeIntersecting);
                }
            }
        }
        toString() {
            return this.a.map(r => r.toString()).join(' + ');
        }
    }
    exports.$GD = $GD;
    function safeTokenize(languageIdCodec, languageId, tokenizationSupport, text, hasEOL, state) {
        let r = null;
        if (tokenizationSupport) {
            try {
                r = tokenizationSupport.tokenizeEncoded(text, hasEOL, state.clone());
            }
            catch (e) {
                (0, errors_1.$Y)(e);
            }
        }
        if (!r) {
            r = (0, nullTokenize_1.$zD)(languageIdCodec.encodeLanguageId(languageId), state);
        }
        lineTokens_1.$Au.convertToEndOffset(r.tokens, text.length);
        return r;
    }
    class $HD {
        constructor(b, d) {
            this.b = b;
            this.d = d;
            this.a = false;
            this.f = false;
        }
        dispose() {
            this.a = true;
        }
        handleChanges() {
            this.g();
        }
        g() {
            if (this.f || !this.b._textModel.isAttachedToEditor() || !this.k()) {
                return;
            }
            this.f = true;
            (0, async_1.$Vh)((deadline) => {
                this.f = false;
                this.h(deadline);
            });
        }
        /**
         * Tokenize until the deadline occurs, but try to yield every 1-2ms.
         */
        h(deadline) {
            // Read the time remaining from the `deadline` immediately because it is unclear
            // if the `deadline` object will be valid after execution leaves this function.
            const endTime = Date.now() + deadline.timeRemaining();
            const execute = () => {
                if (this.a || !this.b._textModel.isAttachedToEditor() || !this.k()) {
                    // disposed in the meantime or detached or finished
                    return;
                }
                this.j();
                if (Date.now() < endTime) {
                    // There is still time before reaching the deadline, so yield to the browser and then
                    // continue execution
                    (0, platform_1.$C)(execute);
                }
                else {
                    // The deadline has been reached, so schedule a new idle callback if necessary
                    this.g();
                }
            };
            execute();
        }
        /**
         * Tokenize for at least 1ms.
         */
        j() {
            const lineCount = this.b._textModel.getLineCount();
            const builder = new contiguousMultilineTokensBuilder_1.$BD();
            const sw = stopwatch_1.$fe.create(false);
            do {
                if (sw.elapsed() > 1) {
                    // the comparison is intentionally > 1 and not >= 1 to ensure that
                    // a full millisecond has elapsed, given how microseconds are rounded
                    // to milliseconds
                    break;
                }
                const tokenizedLineNumber = this.l(builder);
                if (tokenizedLineNumber >= lineCount) {
                    break;
                }
            } while (this.k());
            this.d.setTokens(builder.finalize());
            this.checkFinished();
        }
        k() {
            if (!this.b) {
                return false;
            }
            return !this.b.store.allStatesValid();
        }
        l(builder) {
            const firstInvalidLine = this.b?.getFirstInvalidLine();
            if (!firstInvalidLine) {
                return this.b._textModel.getLineCount() + 1;
            }
            this.b.updateTokensUntilLine(builder, firstInvalidLine.lineNumber);
            return firstInvalidLine.lineNumber;
        }
        checkFinished() {
            if (this.a) {
                return;
            }
            if (this.b.store.allStatesValid()) {
                this.d.backgroundTokenizationFinished();
            }
        }
        requestTokens(startLineNumber, endLineNumberExclusive) {
            this.b.store.invalidateEndStateRange(new lineRange_1.$Xt(startLineNumber, endLineNumberExclusive));
        }
    }
    exports.$HD = $HD;
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(__m[47/*vs/workbench/services/textMate/browser/tokenizationSupport/textMateTokenizationSupport*/], __M([0/*require*/,1/*exports*/,15/*vs/base/common/event*/,2/*vs/base/common/lifecycle*/,46/*vs/base/common/stopwatch*/,13/*vs/editor/common/encodedTokenAttributes*/,44/*vs/editor/common/languages*/]), function (require, exports, event_1, lifecycle_1, stopwatch_1, encodedTokenAttributes_1, languages_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.$IOb = void 0;
    class $IOb extends lifecycle_1.$Uc {
        constructor(c, f, g, h, j, m, n) {
            super();
            this.c = c;
            this.f = f;
            this.g = g;
            this.h = h;
            this.j = j;
            this.m = m;
            this.n = n;
            this.a = [];
            this.b = this.B(new event_1.$le());
            this.onDidEncounterLanguage = this.b.event;
        }
        get backgroundTokenizerShouldOnlyVerifyTokens() {
            return this.j();
        }
        getInitialState() {
            return this.f;
        }
        tokenize(line, hasEOL, state) {
            throw new Error('Not supported!');
        }
        createBackgroundTokenizer(textModel, store) {
            if (this.h) {
                return this.h(textModel, store);
            }
            return undefined;
        }
        tokenizeEncoded(line, hasEOL, state) {
            const isRandomSample = Math.random() * 10_000 < 1;
            const shouldMeasure = this.n || isRandomSample;
            const sw = shouldMeasure ? new stopwatch_1.$fe(true) : undefined;
            const textMateResult = this.c.tokenizeLine2(line, state, 500);
            if (shouldMeasure) {
                const timeMS = sw.elapsed();
                if (isRandomSample || timeMS > 32) {
                    this.m(timeMS, line.length, isRandomSample);
                }
            }
            if (textMateResult.stoppedEarly) {
                console.warn(`Time limit reached when tokenizing line: ${line.substring(0, 100)}`);
                // return the state at the beginning of the line
                return new languages_1.$Ju(textMateResult.tokens, state);
            }
            if (this.g) {
                const seenLanguages = this.a;
                const tokens = textMateResult.tokens;
                // Must check if any of the embedded languages was hit
                for (let i = 0, len = (tokens.length >>> 1); i < len; i++) {
                    const metadata = tokens[(i << 1) + 1];
                    const languageId = encodedTokenAttributes_1.$vu.getLanguageId(metadata);
                    if (!seenLanguages[languageId]) {
                        seenLanguages[languageId] = true;
                        this.b.fire(languageId);
                    }
                }
            }
            let endState;
            // try to save an object if possible
            if (state.equals(textMateResult.ruleStack)) {
                endState = state;
            }
            else {
                endState = textMateResult.ruleStack;
            }
            return new languages_1.$Ju(textMateResult.tokens, endState);
        }
    }
    exports.$IOb = $IOb;
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(__m[48/*vs/workbench/services/textMate/browser/tokenizationSupport/tokenizationSupportWithLineLimit*/], __M([0/*require*/,1/*exports*/,27/*vs/editor/common/languages/nullTokenize*/,2/*vs/base/common/lifecycle*/,16/*vs/base/common/observable*/]), function (require, exports, nullTokenize_1, lifecycle_1, observable_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.$JOb = void 0;
    class $JOb extends lifecycle_1.$Uc {
        get backgroundTokenizerShouldOnlyVerifyTokens() {
            return this.b.backgroundTokenizerShouldOnlyVerifyTokens;
        }
        constructor(a, b, disposable, c) {
            super();
            this.a = a;
            this.b = b;
            this.c = c;
            this.B((0, observable_1.keepObserved)(this.c));
            this.B(disposable);
        }
        getInitialState() {
            return this.b.getInitialState();
        }
        tokenize(line, hasEOL, state) {
            throw new Error('Not supported!');
        }
        tokenizeEncoded(line, hasEOL, state) {
            // Do not attempt to tokenize if a line is too long
            if (line.length >= this.c.get()) {
                return (0, nullTokenize_1.$zD)(this.a, state);
            }
            return this.b.tokenizeEncoded(line, hasEOL, state);
        }
        createBackgroundTokenizer(textModel, store) {
            if (this.b.createBackgroundTokenizer) {
                return this.b.createBackgroundTokenizer(textModel, store);
            }
            else {
                return undefined;
            }
        }
    }
    exports.$JOb = $JOb;
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(__m[49/*vs/workbench/services/textMate/browser/backgroundTokenization/worker/textMateWorkerTokenizer*/], __M([0/*require*/,1/*exports*/,40/*vs/amdX*/,23/*vs/base/common/async*/,16/*vs/base/common/observable*/,5/*vs/base/common/platform*/,25/*vs/editor/common/core/lineRange*/,54/*vs/editor/common/model/mirrorTextModel*/,45/*vs/editor/common/model/textModelTokens*/,26/*vs/editor/common/tokens/contiguousMultilineTokensBuilder*/,12/*vs/editor/common/tokens/lineTokens*/,47/*vs/workbench/services/textMate/browser/tokenizationSupport/textMateTokenizationSupport*/,48/*vs/workbench/services/textMate/browser/tokenizationSupport/tokenizationSupportWithLineLimit*/,2/*vs/base/common/lifecycle*/]), function (require, exports, amdX_1, async_1, observable_1, platform_1, lineRange_1, mirrorTextModel_1, textModelTokens_1, contiguousMultilineTokensBuilder_1, lineTokens_1, textMateTokenizationSupport_1, tokenizationSupportWithLineLimit_1, lifecycle_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.$OOb = void 0;
    class $OOb extends mirrorTextModel_1.$pw {
        constructor(uri, lines, eol, versionId, s, t, u, maxTokenizationLineLength) {
            super(uri, lines, eol, versionId);
            this.s = s;
            this.t = t;
            this.u = u;
            this.a = null;
            this.b = false;
            this.c = (0, observable_1.observableValue)(this, -1);
            this.q = new async_1.$Rh(() => this.w(), 10);
            this.c.set(maxTokenizationLineLength, undefined);
            this.v();
        }
        dispose() {
            this.b = true;
            super.dispose();
        }
        onLanguageId(languageId, encodedLanguageId) {
            this.t = languageId;
            this.u = encodedLanguageId;
            this.v();
        }
        onEvents(e) {
            super.onEvents(e);
            this.a?.store.acceptChanges(e.changes);
            this.q.schedule();
        }
        acceptMaxTokenizationLineLength(maxTokenizationLineLength) {
            this.c.set(maxTokenizationLineLength, undefined);
        }
        retokenize(startLineNumber, endLineNumberExclusive) {
            if (this.a) {
                this.a.store.invalidateEndStateRange(new lineRange_1.$Xt(startLineNumber, endLineNumberExclusive));
                this.q.schedule();
            }
        }
        async v() {
            this.a = null;
            const languageId = this.t;
            const encodedLanguageId = this.u;
            const r = await this.s.getOrCreateGrammar(languageId, encodedLanguageId);
            if (this.b || languageId !== this.t || encodedLanguageId !== this.u || !r) {
                return;
            }
            if (r.grammar) {
                const tokenizationSupport = new tokenizationSupportWithLineLimit_1.$JOb(this.u, new textMateTokenizationSupport_1.$IOb(r.grammar, r.initialState, false, undefined, () => false, (timeMs, lineLength, isRandomSample) => {
                    this.s.reportTokenizationTime(timeMs, languageId, r.sourceExtensionId, lineLength, isRandomSample);
                }, false), lifecycle_1.$Uc.None, this.c);
                this.a = new textModelTokens_1.$CD(this.f.length, tokenizationSupport);
            }
            else {
                this.a = null;
            }
            this.w();
        }
        async w() {
            if (this.b || !this.a) {
                return;
            }
            if (!this.m) {
                const { diffStateStacksRefEq } = await (0, amdX_1.$CE)('vscode-textmate', 'release/main.js');
                this.m = diffStateStacksRefEq;
            }
            const startTime = new Date().getTime();
            while (true) {
                let tokenizedLines = 0;
                const tokenBuilder = new contiguousMultilineTokensBuilder_1.$BD();
                const stateDeltaBuilder = new StateDeltaBuilder();
                while (true) {
                    const lineToTokenize = this.a.getFirstInvalidLine();
                    if (lineToTokenize === null || tokenizedLines > 200) {
                        break;
                    }
                    tokenizedLines++;
                    const text = this.f[lineToTokenize.lineNumber - 1];
                    const r = this.a.tokenizationSupport.tokenizeEncoded(text, true, lineToTokenize.startState);
                    if (this.a.store.setEndState(lineToTokenize.lineNumber, r.endState)) {
                        const delta = this.m(lineToTokenize.startState, r.endState);
                        stateDeltaBuilder.setState(lineToTokenize.lineNumber, delta);
                    }
                    else {
                        stateDeltaBuilder.setState(lineToTokenize.lineNumber, null);
                    }
                    lineTokens_1.$Au.convertToEndOffset(r.tokens, text.length);
                    tokenBuilder.add(lineToTokenize.lineNumber, r.tokens);
                    const deltaMs = new Date().getTime() - startTime;
                    if (deltaMs > 20) {
                        // yield to check for changes
                        break;
                    }
                }
                if (tokenizedLines === 0) {
                    break;
                }
                const stateDeltas = stateDeltaBuilder.getStateDeltas();
                this.s.setTokensAndStates(this.h, tokenBuilder.serialize(), stateDeltas);
                const deltaMs = new Date().getTime() - startTime;
                if (deltaMs > 20) {
                    // yield to check for changes
                    (0, platform_1.$C)(() => this.w());
                    return;
                }
            }
        }
    }
    exports.$OOb = $OOb;
    class StateDeltaBuilder {
        constructor() {
            this.a = -1;
            this.b = [];
        }
        setState(lineNumber, stackDiff) {
            if (lineNumber === this.a + 1) {
                this.b[this.b.length - 1].stateDeltas.push(stackDiff);
            }
            else {
                this.b.push({ startLineNumber: lineNumber, stateDeltas: [stackDiff] });
            }
            this.a = lineNumber;
        }
        getStateDeltas() {
            return this.b;
        }
    }
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/























define(__m[50/*vs/workbench/services/textMate/common/TMScopeRegistry*/], __M([0/*require*/,1/*exports*/,22/*vs/base/common/resources*/]), function (require, exports, resources) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.$LOb = void 0;
    resources = __importStar(resources);
    class $LOb {
        constructor() {
            this.a = Object.create(null);
        }
        reset() {
            this.a = Object.create(null);
        }
        register(def) {
            if (this.a[def.scopeName]) {
                const existingRegistration = this.a[def.scopeName];
                if (!resources.$_g(existingRegistration.location, def.location)) {
                    console.warn(`Overwriting grammar scope name to file mapping for scope ${def.scopeName}.\n` +
                        `Old grammar file: ${existingRegistration.location.toString()}.\n` +
                        `New grammar file: ${def.location.toString()}`);
                }
            }
            this.a[def.scopeName] = def;
        }
        getGrammarDefinition(scopeName) {
            return this.a[scopeName] || null;
        }
    }
    exports.$LOb = $LOb;
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(__m[51/*vs/workbench/services/textMate/common/TMGrammarFactory*/], __M([0/*require*/,1/*exports*/,2/*vs/base/common/lifecycle*/,50/*vs/workbench/services/textMate/common/TMScopeRegistry*/]), function (require, exports, lifecycle_1, TMScopeRegistry_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.$NOb = exports.$MOb = void 0;
    exports.$MOb = 'No TM Grammar registered for this language.';
    class $NOb extends lifecycle_1.$Uc {
        constructor(host, grammarDefinitions, vscodeTextmate, onigLib) {
            super();
            this.a = host;
            this.b = vscodeTextmate.INITIAL;
            this.c = new TMScopeRegistry_1.$LOb();
            this.f = {};
            this.g = {};
            this.h = new Map();
            this.j = this.B(new vscodeTextmate.Registry({
                onigLib: onigLib,
                loadGrammar: async (scopeName) => {
                    const grammarDefinition = this.c.getGrammarDefinition(scopeName);
                    if (!grammarDefinition) {
                        this.a.logTrace(`No grammar found for scope ${scopeName}`);
                        return null;
                    }
                    const location = grammarDefinition.location;
                    try {
                        const content = await this.a.readFile(location);
                        return vscodeTextmate.parseRawGrammar(content, location.path);
                    }
                    catch (e) {
                        this.a.logError(`Unable to load and parse grammar for scope ${scopeName} from ${location}`, e);
                        return null;
                    }
                },
                getInjections: (scopeName) => {
                    const scopeParts = scopeName.split('.');
                    let injections = [];
                    for (let i = 1; i <= scopeParts.length; i++) {
                        const subScopeName = scopeParts.slice(0, i).join('.');
                        injections = [...injections, ...(this.f[subScopeName] || [])];
                    }
                    return injections;
                }
            }));
            for (const validGrammar of grammarDefinitions) {
                this.c.register(validGrammar);
                if (validGrammar.injectTo) {
                    for (const injectScope of validGrammar.injectTo) {
                        let injections = this.f[injectScope];
                        if (!injections) {
                            this.f[injectScope] = injections = [];
                        }
                        injections.push(validGrammar.scopeName);
                    }
                    if (validGrammar.embeddedLanguages) {
                        for (const injectScope of validGrammar.injectTo) {
                            let injectedEmbeddedLanguages = this.g[injectScope];
                            if (!injectedEmbeddedLanguages) {
                                this.g[injectScope] = injectedEmbeddedLanguages = [];
                            }
                            injectedEmbeddedLanguages.push(validGrammar.embeddedLanguages);
                        }
                    }
                }
                if (validGrammar.language) {
                    this.h.set(validGrammar.language, validGrammar.scopeName);
                }
            }
        }
        has(languageId) {
            return this.h.has(languageId);
        }
        setTheme(theme, colorMap) {
            this.j.setTheme(theme, colorMap);
        }
        getColorMap() {
            return this.j.getColorMap();
        }
        async createGrammar(languageId, encodedLanguageId) {
            const scopeName = this.h.get(languageId);
            if (typeof scopeName !== 'string') {
                // No TM grammar defined
                throw new Error(exports.$MOb);
            }
            const grammarDefinition = this.c.getGrammarDefinition(scopeName);
            if (!grammarDefinition) {
                // No TM grammar defined
                throw new Error(exports.$MOb);
            }
            const embeddedLanguages = grammarDefinition.embeddedLanguages;
            if (this.g[scopeName]) {
                const injectedEmbeddedLanguages = this.g[scopeName];
                for (const injected of injectedEmbeddedLanguages) {
                    for (const scope of Object.keys(injected)) {
                        embeddedLanguages[scope] = injected[scope];
                    }
                }
            }
            const containsEmbeddedLanguages = (Object.keys(embeddedLanguages).length > 0);
            let grammar;
            try {
                grammar = await this.j.loadGrammarWithConfiguration(scopeName, encodedLanguageId, {
                    embeddedLanguages,
                    tokenTypes: grammarDefinition.tokenTypes,
                    balancedBracketSelectors: grammarDefinition.balancedBracketSelectors,
                    unbalancedBracketSelectors: grammarDefinition.unbalancedBracketSelectors,
                });
            }
            catch (err) {
                if (err.message && err.message.startsWith('No grammar provided for')) {
                    // No TM grammar defined
                    throw new Error(exports.$MOb);
                }
                throw err;
            }
            return {
                languageId: languageId,
                grammar: grammar,
                initialState: this.b,
                containsEmbeddedLanguages: containsEmbeddedLanguages,
                sourceExtensionId: grammarDefinition.sourceExtensionId,
            };
        }
    }
    exports.$NOb = $NOb;
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/























define(__m[55/*vs/workbench/services/textMate/browser/backgroundTokenization/worker/textMateTokenizationWorker.worker*/], __M([0/*require*/,1/*exports*/,11/*vs/base/common/uri*/,51/*vs/workbench/services/textMate/common/TMGrammarFactory*/,49/*vs/workbench/services/textMate/browser/backgroundTokenization/worker/textMateWorkerTokenizer*/]), function (require, exports, uri_1, TMGrammarFactory_1, textMateWorkerTokenizer_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TextMateTokenizationWorker = void 0;
    exports.create = create;
    /**
     * Defines the worker entry point. Must be exported and named `create`.
     */
    function create(ctx, createData) {
        return new TextMateTokenizationWorker(ctx, createData);
    }
    class TextMateTokenizationWorker {
        constructor(ctx, f) {
            this.f = f;
            this.b = new Map();
            this.c = [];
            this.a = ctx.host;
            const grammarDefinitions = f.grammarDefinitions.map((def) => {
                return {
                    location: uri_1.URI.revive(def.location),
                    language: def.language,
                    scopeName: def.scopeName,
                    embeddedLanguages: def.embeddedLanguages,
                    tokenTypes: def.tokenTypes,
                    injectTo: def.injectTo,
                    balancedBracketSelectors: def.balancedBracketSelectors,
                    unbalancedBracketSelectors: def.unbalancedBracketSelectors,
                    sourceExtensionId: def.sourceExtensionId,
                };
            });
            this.d = this.g(grammarDefinitions);
        }
        async g(grammarDefinitions) {
            const uri = this.f.textmateMainUri;
            const vscodeTextmate = await new Promise((resolve_1, reject_1) => { require([uri], resolve_1, reject_1); }).then(__importStar);
            const vscodeOniguruma = await new Promise((resolve_2, reject_2) => { require([this.f.onigurumaMainUri], resolve_2, reject_2); }).then(__importStar);
            const response = await fetch(this.f.onigurumaWASMUri);
            // Using the response directly only works if the server sets the MIME type 'application/wasm'.
            // Otherwise, a TypeError is thrown when using the streaming compiler.
            // We therefore use the non-streaming compiler :(.
            const bytes = await response.arrayBuffer();
            await vscodeOniguruma.loadWASM(bytes);
            const onigLib = Promise.resolve({
                createOnigScanner: (sources) => vscodeOniguruma.createOnigScanner(sources),
                createOnigString: (str) => vscodeOniguruma.createOnigString(str)
            });
            return new TMGrammarFactory_1.$NOb({
                logTrace: (msg) => { },
                logError: (msg, err) => console.error(msg, err),
                readFile: (resource) => this.a.readFile(resource)
            }, grammarDefinitions, vscodeTextmate, onigLib);
        }
        // These methods are called by the renderer
        acceptNewModel(data) {
            const uri = uri_1.URI.revive(data.uri);
            const that = this;
            this.b.set(data.controllerId, new textMateWorkerTokenizer_1.$OOb(uri, data.lines, data.EOL, data.versionId, {
                async getOrCreateGrammar(languageId, encodedLanguageId) {
                    const grammarFactory = await that.d;
                    if (!grammarFactory) {
                        return Promise.resolve(null);
                    }
                    if (!that.c[encodedLanguageId]) {
                        that.c[encodedLanguageId] = grammarFactory.createGrammar(languageId, encodedLanguageId);
                    }
                    return that.c[encodedLanguageId];
                },
                setTokensAndStates(versionId, tokens, stateDeltas) {
                    that.a.setTokensAndStates(data.controllerId, versionId, tokens, stateDeltas);
                },
                reportTokenizationTime(timeMs, languageId, sourceExtensionId, lineLength, isRandomSample) {
                    that.a.reportTokenizationTime(timeMs, languageId, sourceExtensionId, lineLength, isRandomSample);
                },
            }, data.languageId, data.encodedLanguageId, data.maxTokenizationLineLength));
        }
        acceptModelChanged(controllerId, e) {
            this.b.get(controllerId).onEvents(e);
        }
        retokenize(controllerId, startLineNumber, endLineNumberExclusive) {
            this.b.get(controllerId).retokenize(startLineNumber, endLineNumberExclusive);
        }
        acceptModelLanguageChanged(controllerId, newLanguageId, newEncodedLanguageId) {
            this.b.get(controllerId).onLanguageId(newLanguageId, newEncodedLanguageId);
        }
        acceptRemovedModel(controllerId) {
            const model = this.b.get(controllerId);
            if (model) {
                model.dispose();
                this.b.delete(controllerId);
            }
        }
        async acceptTheme(theme, colorMap) {
            const grammarFactory = await this.d;
            grammarFactory?.setTheme(theme, colorMap);
        }
        acceptMaxTokenizationLineLength(controllerId, value) {
            this.b.get(controllerId).acceptMaxTokenizationLineLength(value);
        }
    }
    exports.TextMateTokenizationWorker = TextMateTokenizationWorker;
});

}).call(this);
//# sourceMappingURL=textMateTokenizationWorker.worker.js.map
