import { Cell } from '../boc/Cell';
import { DictionaryKeyTypes, Dictionary, DictionaryKey } from './Dictionary';
export declare function generateMerkleProofDirect<K extends DictionaryKeyTypes, V>(dict: Dictionary<K, V>, keys: K[], keyObject: DictionaryKey<K>): Cell;
export declare function generateMerkleProof<K extends DictionaryKeyTypes, V>(dict: Dictionary<K, V>, keys: K[], keyObject: DictionaryKey<K>): Cell;
