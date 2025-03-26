"use strict";
/**
 * Copyright (c) Whales Corp.
 * All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReserveMode = void 0;
var ReserveMode;
(function (ReserveMode) {
    ReserveMode[ReserveMode["THIS_AMOUNT"] = 0] = "THIS_AMOUNT";
    ReserveMode[ReserveMode["LEAVE_THIS_AMOUNT"] = 1] = "LEAVE_THIS_AMOUNT";
    ReserveMode[ReserveMode["AT_MOST_THIS_AMOUNT"] = 2] = "AT_MOST_THIS_AMOUNT";
    ReserveMode[ReserveMode["LEAVE_MAX_THIS_AMOUNT"] = 3] = "LEAVE_MAX_THIS_AMOUNT";
    ReserveMode[ReserveMode["BEFORE_BALANCE_PLUS_THIS_AMOUNT"] = 4] = "BEFORE_BALANCE_PLUS_THIS_AMOUNT";
    ReserveMode[ReserveMode["LEAVE_BBALANCE_PLUS_THIS_AMOUNT"] = 5] = "LEAVE_BBALANCE_PLUS_THIS_AMOUNT";
    ReserveMode[ReserveMode["BEFORE_BALANCE_MINUS_THIS_AMOUNT"] = 12] = "BEFORE_BALANCE_MINUS_THIS_AMOUNT";
    ReserveMode[ReserveMode["LEAVE_BEFORE_BALANCE_MINUS_THIS_AMOUNT"] = 13] = "LEAVE_BEFORE_BALANCE_MINUS_THIS_AMOUNT";
})(ReserveMode || (exports.ReserveMode = ReserveMode = {}));
