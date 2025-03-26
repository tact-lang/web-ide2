"use strict";
/**
 * Copyright (c) Whales Corp.
 * All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.storeLibRef = exports.loadLibRef = void 0;
function loadLibRef(slice) {
    const type = slice.loadUint(1);
    if (type === 0) {
        return {
            type: 'hash',
            libHash: slice.loadBuffer(32)
        };
    }
    else {
        return {
            type: 'ref',
            library: slice.loadRef()
        };
    }
}
exports.loadLibRef = loadLibRef;
function storeLibRef(src) {
    return (builder) => {
        if (src.type === 'hash') {
            builder.storeUint(0, 1);
            builder.storeBuffer(src.libHash);
        }
        else {
            builder.storeUint(1, 1);
            builder.storeRef(src.library);
        }
    };
}
exports.storeLibRef = storeLibRef;
