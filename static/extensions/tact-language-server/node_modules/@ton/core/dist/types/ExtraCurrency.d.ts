import { Builder } from '../boc/Builder';
import { Cell } from '../boc/Cell';
import { Slice } from '../boc/Slice';
import { Dictionary } from '../dict/Dictionary';
export type ExtraCurrency = {
    [k: number]: bigint;
};
export declare function loadExtraCurrency(data: Slice | Cell | Dictionary<number, bigint>): ExtraCurrency;
export declare function loadMaybeExtraCurrency(data: Slice): ExtraCurrency | null;
export declare function storeExtraCurrency(extracurrency: ExtraCurrency): (builder: Builder) => void;
export declare function packExtraCurrencyDict(extracurrency: ExtraCurrency): Dictionary<number, bigint>;
export declare function packExtraCurrencyCell(extracurrency: ExtraCurrency): Cell;
