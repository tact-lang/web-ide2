"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.packExtraCurrencyCell = exports.packExtraCurrencyDict = exports.storeExtraCurrency = exports.loadMaybeExtraCurrency = exports.loadExtraCurrency = void 0;
const Builder_1 = require("../boc/Builder");
const Dictionary_1 = require("../dict/Dictionary");
function loadExtraCurrency(data) {
    let ecDict = data instanceof Dictionary_1.Dictionary ? data : Dictionary_1.Dictionary.loadDirect(Dictionary_1.Dictionary.Keys.Uint(32), Dictionary_1.Dictionary.Values.BigVarUint(5), data);
    let ecMap = {};
    for (let [k, v] of ecDict) {
        ecMap[k] = v;
    }
    return ecMap;
}
exports.loadExtraCurrency = loadExtraCurrency;
function loadMaybeExtraCurrency(data) {
    const ecData = data.loadMaybeRef();
    return ecData === null ? ecData : loadExtraCurrency(ecData);
}
exports.loadMaybeExtraCurrency = loadMaybeExtraCurrency;
function storeExtraCurrency(extracurrency) {
    return (builder) => {
        builder.storeDict(packExtraCurrencyDict(extracurrency));
    };
}
exports.storeExtraCurrency = storeExtraCurrency;
function packExtraCurrencyDict(extracurrency) {
    const resEc = Dictionary_1.Dictionary.empty(Dictionary_1.Dictionary.Keys.Uint(32), Dictionary_1.Dictionary.Values.BigVarUint(5));
    Object.entries(extracurrency).map(([k, v]) => resEc.set(Number(k), v));
    return resEc;
}
exports.packExtraCurrencyDict = packExtraCurrencyDict;
function packExtraCurrencyCell(extracurrency) {
    return (0, Builder_1.beginCell)().storeDictDirect(packExtraCurrencyDict(extracurrency)).endCell();
}
exports.packExtraCurrencyCell = packExtraCurrencyCell;
