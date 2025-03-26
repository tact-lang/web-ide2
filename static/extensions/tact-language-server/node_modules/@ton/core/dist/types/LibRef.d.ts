/**
 * Copyright (c) Whales Corp.
 * All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/// <reference types="node" />
import { Builder } from "../boc/Builder";
import { Cell } from "../boc/Cell";
import { Slice } from "../boc/Slice";
export interface LibRefHash {
    type: 'hash';
    libHash: Buffer;
}
export interface LibRefRef {
    type: 'ref';
    library: Cell;
}
export type LibRef = LibRefHash | LibRefRef;
export declare function loadLibRef(slice: Slice): LibRef;
export declare function storeLibRef(src: LibRef): (builder: Builder) => void;
