"use strict";
/**
 * Copyright (c) Whales Corp.
 * All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const Builder_1 = require("../boc/Builder");
const OutList_1 = require("./OutList");
const SendMode_1 = require("./SendMode");
const MessageRelaxed_1 = require("./MessageRelaxed");
const ReserveMode_1 = require("./ReserveMode");
const CurrencyCollection_1 = require("./CurrencyCollection");
const LibRef_1 = require("./LibRef");
const mockMessageRelaxed1 = {
    info: {
        type: 'external-out',
        createdLt: 0n,
        createdAt: 0,
        dest: null,
        src: null
    },
    body: (0, Builder_1.beginCell)().storeUint(0, 8).endCell(),
    init: null
};
const mockMessageRelaxed2 = {
    info: {
        type: 'external-out',
        createdLt: 1n,
        createdAt: 1,
        dest: null,
        src: null
    },
    body: (0, Builder_1.beginCell)().storeUint(1, 8).endCell(),
    init: null
};
const mockSetCodeCell = (0, Builder_1.beginCell)().storeUint(123, 8).endCell();
describe('Out List', () => {
    const outActionSendMsgTag = 0x0ec3c86d;
    const outActionSetCodeTag = 0xad4de08e;
    const outActionReserveTag = 0x36e6b809;
    const outActionChangeLibraryTag = 0x26fa1dd4;
    it('Should serialise sendMsg action', () => {
        const mode = SendMode_1.SendMode.PAY_GAS_SEPARATELY;
        const action = (0, OutList_1.storeOutAction)({
            type: 'sendMsg',
            mode,
            outMsg: mockMessageRelaxed1
        });
        const actual = (0, Builder_1.beginCell)().store(action).endCell();
        const expected = (0, Builder_1.beginCell)()
            .storeUint(outActionSendMsgTag, 32)
            .storeUint(mode, 8)
            .storeRef((0, Builder_1.beginCell)().store((0, MessageRelaxed_1.storeMessageRelaxed)(mockMessageRelaxed1)).endCell())
            .endCell();
        expect(expected.equals(actual)).toBeTruthy();
    });
    it('Should serialise setCode action', () => {
        const action = (0, OutList_1.storeOutAction)({
            type: 'setCode',
            newCode: mockSetCodeCell
        });
        const actual = (0, Builder_1.beginCell)().store(action).endCell();
        const expected = (0, Builder_1.beginCell)()
            .storeUint(outActionSetCodeTag, 32)
            .storeRef(mockSetCodeCell)
            .endCell();
        expect(expected.equals(actual)).toBeTruthy();
    });
    it('Should serialize reserve action', () => {
        const mode = ReserveMode_1.ReserveMode.AT_MOST_THIS_AMOUNT;
        const currency = { coins: 2000000n };
        const action = (0, OutList_1.storeOutAction)({
            type: 'reserve',
            mode,
            currency
        });
        const actual = (0, Builder_1.beginCell)().store(action).endCell();
        const expected = (0, Builder_1.beginCell)()
            .storeUint(outActionReserveTag, 32)
            .storeUint(mode, 8)
            .store((0, CurrencyCollection_1.storeCurrencyCollection)(currency))
            .endCell();
        expect(expected.equals(actual)).toBeTruthy();
    });
    it('Should serialize changeLibrary action', () => {
        const mode = 0;
        const lib = (0, Builder_1.beginCell)().storeUint(1234, 16).endCell();
        const libRef = { type: "ref", library: lib };
        const action = (0, OutList_1.storeOutAction)({
            type: 'changeLibrary',
            mode,
            libRef
        });
        const actual = (0, Builder_1.beginCell)().store(action).endCell();
        const expected = (0, Builder_1.beginCell)()
            .storeUint(outActionChangeLibraryTag, 32)
            .storeUint(mode, 7)
            .store((0, LibRef_1.storeLibRef)(libRef))
            .endCell();
        expect(expected.equals(actual)).toBeTruthy();
    });
    it('Should deserialize sendMsg action', () => {
        const mode = SendMode_1.SendMode.PAY_GAS_SEPARATELY;
        const action = (0, Builder_1.beginCell)()
            .storeUint(outActionSendMsgTag, 32)
            .storeUint(mode, 8)
            .storeRef((0, Builder_1.beginCell)().store((0, MessageRelaxed_1.storeMessageRelaxed)(mockMessageRelaxed1)).endCell())
            .endCell();
        const actual = (0, OutList_1.loadOutAction)(action.beginParse());
        const expected = {
            type: 'sendMsg',
            mode,
            outMsg: mockMessageRelaxed1
        };
        expect(expected.type).toEqual(actual.type);
        expect(expected.mode).toEqual(actual.mode);
        expect(expected.outMsg.body.equals(actual.outMsg.body)).toBeTruthy();
        expect(expected.outMsg.init).toEqual(actual.outMsg.init);
        expect(expected.outMsg.info).toEqual(actual.outMsg.info);
    });
    it('Should deserialize setCode action', () => {
        const action = (0, Builder_1.beginCell)()
            .storeUint(outActionSetCodeTag, 32)
            .storeRef(mockSetCodeCell)
            .endCell();
        const actual = (0, OutList_1.loadOutAction)(action.beginParse());
        const expected = {
            type: 'setCode',
            newCode: mockSetCodeCell
        };
        expect(expected.type).toEqual(actual.type);
        expect(expected.newCode.equals(actual.newCode)).toBeTruthy();
    });
    it('Should deserialize reserve action', () => {
        const mode = ReserveMode_1.ReserveMode.THIS_AMOUNT;
        const currency = { coins: 3000000n };
        const action = (0, Builder_1.beginCell)()
            .storeUint(outActionReserveTag, 32)
            .storeUint(mode, 8)
            .store((0, CurrencyCollection_1.storeCurrencyCollection)(currency))
            .endCell();
        const actual = (0, OutList_1.loadOutAction)(action.beginParse());
        const expected = {
            type: 'reserve',
            mode,
            currency
        };
        expect(expected.type).toEqual(actual.type);
        expect(expected.mode).toEqual(actual.mode);
        expect(expected.currency.coins).toEqual(actual.currency.coins);
    });
    it('Should deserialize changeLibrary action', () => {
        const mode = 1;
        const libHash = Buffer.alloc(32);
        const libRef = { type: "hash", libHash };
        const action = (0, Builder_1.beginCell)()
            .storeUint(outActionChangeLibraryTag, 32)
            .storeUint(mode, 7)
            .store((0, LibRef_1.storeLibRef)(libRef))
            .endCell();
        const actual = (0, OutList_1.loadOutAction)(action.beginParse());
        const expected = {
            type: 'changeLibrary',
            mode,
            libRef
        };
        expect(expected.type).toEqual(actual.type);
        expect(expected.mode).toEqual(actual.mode);
        expect(expected.libRef).toEqual(actual.libRef);
    });
    it('Should serialize out list', () => {
        const reserveMode = ReserveMode_1.ReserveMode.THIS_AMOUNT;
        const sendMode1 = SendMode_1.SendMode.PAY_GAS_SEPARATELY;
        const sendMode2 = SendMode_1.SendMode.IGNORE_ERRORS;
        const changeLibraryMode = 1;
        const actions = [
            {
                type: 'sendMsg',
                mode: sendMode1,
                outMsg: mockMessageRelaxed1
            },
            {
                type: 'sendMsg',
                mode: sendMode2,
                outMsg: mockMessageRelaxed2
            },
            {
                type: 'setCode',
                newCode: mockSetCodeCell
            },
            {
                type: 'reserve',
                mode: reserveMode,
                currency: {
                    coins: 3000000n
                }
            },
            {
                type: 'changeLibrary',
                mode: changeLibraryMode,
                libRef: {
                    type: "ref",
                    library: (0, Builder_1.beginCell)().storeUint(1234, 16).endCell()
                }
            }
        ];
        const actual = (0, Builder_1.beginCell)().store((0, OutList_1.storeOutList)(actions)).endCell();
        // tvm handles actions from c5 in reversed order
        const expected = (0, Builder_1.beginCell)()
            .storeRef((0, Builder_1.beginCell)()
            .storeRef((0, Builder_1.beginCell)()
            .storeRef((0, Builder_1.beginCell)()
            .storeRef((0, Builder_1.beginCell)()
            .storeRef((0, Builder_1.beginCell)().endCell())
            .storeUint(outActionSendMsgTag, 32)
            .storeUint(sendMode1, 8)
            .storeRef((0, Builder_1.beginCell)().store((0, MessageRelaxed_1.storeMessageRelaxed)(mockMessageRelaxed1)).endCell())
            .endCell())
            .storeUint(outActionSendMsgTag, 32)
            .storeUint(sendMode2, 8)
            .storeRef((0, Builder_1.beginCell)().store((0, MessageRelaxed_1.storeMessageRelaxed)(mockMessageRelaxed2)).endCell())
            .endCell())
            .storeUint(outActionSetCodeTag, 32)
            .storeRef(mockSetCodeCell)
            .endCell())
            .storeUint(outActionReserveTag, 32)
            .storeUint(reserveMode, 8)
            .store((0, CurrencyCollection_1.storeCurrencyCollection)({ coins: 3000000n }))
            .endCell())
            .storeUint(outActionChangeLibraryTag, 32)
            .storeUint(changeLibraryMode, 7)
            .store((0, LibRef_1.storeLibRef)({
            type: "ref",
            library: (0, Builder_1.beginCell)().storeUint(1234, 16).endCell()
        }))
            .endCell();
        expect(actual.equals(expected)).toBeTruthy();
    });
    it('Should deserialize out list', () => {
        const outActionSendMsgTag = 0x0ec3c86d;
        const outActionSetCodeTag = 0xad4de08e;
        const outActionReserveTag = 0x36e6b809;
        const sendMode1 = SendMode_1.SendMode.PAY_GAS_SEPARATELY;
        const sendMode2 = SendMode_1.SendMode.IGNORE_ERRORS;
        const reserveMode = ReserveMode_1.ReserveMode.THIS_AMOUNT;
        const changeLibraryMode = 1;
        const expected = [
            {
                type: 'sendMsg',
                mode: sendMode1,
                outMsg: mockMessageRelaxed1
            },
            {
                type: 'sendMsg',
                mode: sendMode2,
                outMsg: mockMessageRelaxed2
            },
            {
                type: 'setCode',
                newCode: mockSetCodeCell
            },
            {
                type: 'reserve',
                mode: reserveMode,
                currency: {
                    coins: 3000000n
                }
            },
            {
                type: 'changeLibrary',
                mode: changeLibraryMode,
                libRef: {
                    type: "ref",
                    library: (0, Builder_1.beginCell)().storeUint(1234, 16).endCell()
                }
            }
        ];
        const rawList = (0, Builder_1.beginCell)()
            .storeRef((0, Builder_1.beginCell)()
            .storeRef((0, Builder_1.beginCell)()
            .storeRef((0, Builder_1.beginCell)()
            .storeRef((0, Builder_1.beginCell)()
            .storeRef((0, Builder_1.beginCell)().endCell())
            .storeUint(outActionSendMsgTag, 32)
            .storeUint(sendMode1, 8)
            .storeRef((0, Builder_1.beginCell)().store((0, MessageRelaxed_1.storeMessageRelaxed)(mockMessageRelaxed1)).endCell())
            .endCell())
            .storeUint(outActionSendMsgTag, 32)
            .storeUint(sendMode2, 8)
            .storeRef((0, Builder_1.beginCell)().store((0, MessageRelaxed_1.storeMessageRelaxed)(mockMessageRelaxed2)).endCell())
            .endCell())
            .storeUint(outActionSetCodeTag, 32)
            .storeRef(mockSetCodeCell)
            .endCell())
            .storeUint(outActionReserveTag, 32)
            .storeUint(reserveMode, 8)
            .store((0, CurrencyCollection_1.storeCurrencyCollection)({ coins: 3000000n }))
            .endCell())
            .storeUint(outActionChangeLibraryTag, 32)
            .storeUint(changeLibraryMode, 7)
            .store((0, LibRef_1.storeLibRef)({
            type: "ref",
            library: (0, Builder_1.beginCell)().storeUint(1234, 16).endCell()
        }))
            .endCell();
        const actual = (0, OutList_1.loadOutList)(rawList.beginParse());
        expect(expected.length).toEqual(actual.length);
        expected.forEach((item1, index) => {
            const item2 = actual[index];
            expect(item1.type).toEqual(item2.type);
            if (item1.type === 'sendMsg' && item2.type === 'sendMsg') {
                expect(item1.mode).toEqual(item2.mode);
                expect(item1.outMsg.body.equals(item2.outMsg.body)).toBeTruthy();
                expect(item1.outMsg.info).toEqual(item2.outMsg.info);
                expect(item1.outMsg.init).toEqual(item2.outMsg.init);
            }
            if (item1.type === 'setCode' && item2.type === 'setCode') {
                expect(item1.newCode.equals(item2.newCode)).toBeTruthy();
            }
        });
    });
});
