/**
 * Copyright (c) Whales Corp.
 * All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { SendMode } from "./SendMode";
import { MessageRelaxed } from "./MessageRelaxed";
import { Builder } from "../boc/Builder";
import { Cell } from "../boc/Cell";
import { Slice } from "../boc/Slice";
import { CurrencyCollection } from "./CurrencyCollection";
import { LibRef } from "./LibRef";
import { ReserveMode } from "./ReserveMode";
export interface OutActionSendMsg {
    type: 'sendMsg';
    mode: SendMode;
    outMsg: MessageRelaxed;
}
export interface OutActionSetCode {
    type: 'setCode';
    newCode: Cell;
}
export interface OutActionReserve {
    type: 'reserve';
    mode: ReserveMode;
    currency: CurrencyCollection;
}
export interface OutActionChangeLibrary {
    type: 'changeLibrary';
    mode: number;
    libRef: LibRef;
}
export type OutAction = OutActionSendMsg | OutActionSetCode | OutActionReserve | OutActionChangeLibrary;
export declare function storeOutAction(action: OutAction): (builder: Builder) => void;
export declare function loadOutAction(slice: Slice): OutAction;
export declare function storeOutList(actions: OutAction[]): (builder: Builder) => void;
export declare function loadOutList(slice: Slice): OutAction[];
