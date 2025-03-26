"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateMerkleProof = exports.generateMerkleProofDirect = void 0;
const Builder_1 = require("../boc/Builder");
const readUnaryLength_1 = require("./utils/readUnaryLength");
const exoticMerkleProof_1 = require("../boc/cell/exoticMerkleProof");
function convertToPrunedBranch(c) {
    return (0, Builder_1.beginCell)()
        .storeUint(1, 8)
        .storeUint(1, 8)
        .storeBuffer(c.hash(0))
        .storeUint(c.depth(0), 16)
        .endCell({ exotic: true });
}
function doGenerateMerkleProof(prefix, slice, n, keys) {
    // Reading label
    const originalCell = slice.asCell();
    if (keys.length == 0) {
        // no keys to prove, prune the whole subdict
        return convertToPrunedBranch(originalCell);
    }
    let lb0 = slice.loadBit() ? 1 : 0;
    let prefixLength = 0;
    let pp = prefix;
    if (lb0 === 0) {
        // Short label detected
        // Read
        prefixLength = (0, readUnaryLength_1.readUnaryLength)(slice);
        // Read prefix
        for (let i = 0; i < prefixLength; i++) {
            pp += slice.loadBit() ? '1' : '0';
        }
    }
    else {
        let lb1 = slice.loadBit() ? 1 : 0;
        if (lb1 === 0) {
            // Long label detected
            prefixLength = slice.loadUint(Math.ceil(Math.log2(n + 1)));
            for (let i = 0; i < prefixLength; i++) {
                pp += slice.loadBit() ? '1' : '0';
            }
        }
        else {
            // Same label detected
            let bit = slice.loadBit() ? '1' : '0';
            prefixLength = slice.loadUint(Math.ceil(Math.log2(n + 1)));
            for (let i = 0; i < prefixLength; i++) {
                pp += bit;
            }
        }
    }
    if (n - prefixLength === 0) {
        return originalCell;
    }
    else {
        let sl = originalCell.beginParse();
        let left = sl.loadRef();
        let right = sl.loadRef();
        // NOTE: Left and right branches are implicitly contain prefixes '0' and '1'
        if (!left.isExotic) {
            const leftKeys = keys.filter((key) => {
                return pp + '0' === key.slice(0, pp.length + 1);
            });
            left = doGenerateMerkleProof(pp + '0', left.beginParse(), n - prefixLength - 1, leftKeys);
        }
        if (!right.isExotic) {
            const rightKeys = keys.filter((key) => {
                return pp + '1' === key.slice(0, pp.length + 1);
            });
            right = doGenerateMerkleProof(pp + '1', right.beginParse(), n - prefixLength - 1, rightKeys);
        }
        return (0, Builder_1.beginCell)()
            .storeSlice(sl)
            .storeRef(left)
            .storeRef(right)
            .endCell();
    }
}
function generateMerkleProofDirect(dict, keys, keyObject) {
    keys.forEach((key) => {
        if (!dict.has(key)) {
            throw new Error(`Trying to generate merkle proof for a missing key "${key}"`);
        }
    });
    const s = (0, Builder_1.beginCell)().storeDictDirect(dict).asSlice();
    return doGenerateMerkleProof('', s, keyObject.bits, keys.map((key) => keyObject.serialize(key).toString(2).padStart(keyObject.bits, '0')));
}
exports.generateMerkleProofDirect = generateMerkleProofDirect;
function generateMerkleProof(dict, keys, keyObject) {
    return (0, exoticMerkleProof_1.convertToMerkleProof)(generateMerkleProofDirect(dict, keys, keyObject));
}
exports.generateMerkleProof = generateMerkleProof;
