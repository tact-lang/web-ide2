"use strict";
/**
 * Copyright (c) Whales Corp.
 * All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadOutList = exports.storeOutList = exports.loadOutAction = exports.storeOutAction = void 0;
const MessageRelaxed_1 = require("./MessageRelaxed");
const Builder_1 = require("../boc/Builder");
const CurrencyCollection_1 = require("./CurrencyCollection");
const LibRef_1 = require("./LibRef");
function storeOutAction(action) {
    switch (action.type) {
        case 'sendMsg':
            return storeOutActionSendMsg(action);
        case 'setCode':
            return storeOutActionSetCode(action);
        case 'reserve':
            return storeOutActionReserve(action);
        case 'changeLibrary':
            return storeOutActionChangeLibrary(action);
        default:
            throw new Error(`Unknown action type ${action.type}`);
    }
}
exports.storeOutAction = storeOutAction;
/*
action_send_msg#0ec3c86d mode:(## 8)
  out_msg:^(MessageRelaxed Any) = OutAction;
*/
const outActionSendMsgTag = 0x0ec3c86d;
function storeOutActionSendMsg(action) {
    return (builder) => {
        builder.storeUint(outActionSendMsgTag, 32)
            .storeUint(action.mode, 8)
            .storeRef((0, Builder_1.beginCell)().store((0, MessageRelaxed_1.storeMessageRelaxed)(action.outMsg)).endCell());
    };
}
/*
action_set_code#ad4de08e new_code:^Cell = OutAction;
 */
const outActionSetCodeTag = 0xad4de08e;
function storeOutActionSetCode(action) {
    return (builder) => {
        builder.storeUint(outActionSetCodeTag, 32).storeRef(action.newCode);
    };
}
/*
action_reserve_currency#36e6b809 mode:(## 8)
  currency:CurrencyCollection = OutAction;
 */
const outActionReserveTag = 0x36e6b809;
function storeOutActionReserve(action) {
    return (builder) => {
        builder.storeUint(outActionReserveTag, 32)
            .storeUint(action.mode, 8)
            .store((0, CurrencyCollection_1.storeCurrencyCollection)(action.currency));
    };
}
/*
action_change_library#26fa1dd4 mode:(## 7)
  libref:LibRef = OutAction;
 */
const outActionChangeLibraryTag = 0x26fa1dd4;
function storeOutActionChangeLibrary(action) {
    return (builder) => {
        builder.storeUint(outActionChangeLibraryTag, 32)
            .storeUint(action.mode, 7)
            .store((0, LibRef_1.storeLibRef)(action.libRef));
    };
}
function loadOutAction(slice) {
    const tag = slice.loadUint(32);
    if (tag === outActionSendMsgTag) {
        const mode = slice.loadUint(8);
        const outMsg = (0, MessageRelaxed_1.loadMessageRelaxed)(slice.loadRef().beginParse());
        return {
            type: 'sendMsg',
            mode,
            outMsg
        };
    }
    if (tag === outActionSetCodeTag) {
        const newCode = slice.loadRef();
        return {
            type: 'setCode',
            newCode
        };
    }
    if (tag === outActionReserveTag) {
        const mode = slice.loadUint(8);
        const currency = (0, CurrencyCollection_1.loadCurrencyCollection)(slice);
        return {
            type: 'reserve',
            mode,
            currency
        };
    }
    if (tag === outActionChangeLibraryTag) {
        const mode = slice.loadUint(7);
        const libRef = (0, LibRef_1.loadLibRef)(slice);
        return {
            type: 'changeLibrary',
            mode,
            libRef
        };
    }
    throw new Error(`Unknown out action tag 0x${tag.toString(16)}`);
}
exports.loadOutAction = loadOutAction;
/*
out_list_empty$_ = OutList 0;
out_list$_ {n:#} prev:^(OutList n) action:OutAction
  = OutList (n + 1);
 */
function storeOutList(actions) {
    const cell = actions.reduce((cell, action) => (0, Builder_1.beginCell)()
        .storeRef(cell)
        .store(storeOutAction(action))
        .endCell(), (0, Builder_1.beginCell)().endCell());
    return (builder) => {
        builder.storeSlice(cell.beginParse());
    };
}
exports.storeOutList = storeOutList;
function loadOutList(slice) {
    const actions = [];
    while (slice.remainingRefs) {
        const nextCell = slice.loadRef();
        actions.push(loadOutAction(slice));
        slice = nextCell.beginParse();
    }
    return actions.reverse();
}
exports.loadOutList = loadOutList;
