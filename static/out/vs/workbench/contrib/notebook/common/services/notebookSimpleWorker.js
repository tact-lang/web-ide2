/*!--------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/
(function() {
var __m = ["require","exports","vs/base/common/charCode","vs/base/common/platform","vs/base/common/strings","vs/base/common/path","vs/base/common/errors","vs/base/common/buffer","vs/base/common/network","vs/editor/common/model","vs/base/common/lifecycle","vs/base/common/extpath","vs/base/common/uri","vs/editor/common/model/pieceTreeTextBuffer/pieceTreeBase","vs/editor/common/core/range","vs/platform/instantiation/common/instantiation","vs/base/common/mime","vs/base/common/stream","vs/base/common/lazy","vs/base/common/symbols","vs/base/common/resources","vs/base/common/async","vs/base/common/event","vs/base/common/glob","vs/base/common/map","vs/editor/common/core/eolCounter","vs/editor/common/core/stringBuilder","vs/editor/common/core/textChange","vs/editor/common/model/pieceTreeTextBuffer/rbTreeBase","vs/editor/common/model/textModelSearch","vs/editor/common/model/pieceTreeTextBuffer/pieceTreeTextBuffer","vs/editor/common/model/pieceTreeTextBuffer/pieceTreeTextBufferBuilder","vs/platform/contextkey/common/scanner","vs/nls","vs/platform/instantiation/common/descriptors","vs/platform/instantiation/common/extensions","vs/platform/contextkey/common/contextkey","vs/workbench/services/notebook/common/notebookDocumentService","vs/workbench/contrib/notebook/common/notebookCommon","vs/base/common/types","vs/base/common/cancellation","vs/base/common/arrays","vs/editor/common/core/position","vs/base/common/iterator","vs/workbench/contrib/notebook/common/services/notebookSimpleWorker","vs/base/common/diff/diff","vs/base/common/hash"];
var __M = function(deps) {
  var result = [];
  for (var i = 0, len = deps.length; i < len; i++) {
    result[i] = __m[deps[i]];
  }
  return result;
};
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(__m[16/*vs/base/common/mime*/], __M([0/*require*/,1/*exports*/,5/*vs/base/common/path*/]), function (require, exports, path_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.$$s = void 0;
    exports.$_s = $_s;
    exports.$at = $at;
    exports.$bt = $bt;
    exports.$ct = $ct;
    exports.$$s = Object.freeze({
        text: 'text/plain',
        binary: 'application/octet-stream',
        unknown: 'application/unknown',
        markdown: 'text/markdown',
        latex: 'text/latex',
        uriList: 'text/uri-list',
    });
    const mapExtToTextMimes = {
        '.css': 'text/css',
        '.csv': 'text/csv',
        '.htm': 'text/html',
        '.html': 'text/html',
        '.ics': 'text/calendar',
        '.js': 'text/javascript',
        '.mjs': 'text/javascript',
        '.txt': 'text/plain',
        '.xml': 'text/xml'
    };
    // Known media mimes that we can handle
    const mapExtToMediaMimes = {
        '.aac': 'audio/x-aac',
        '.avi': 'video/x-msvideo',
        '.bmp': 'image/bmp',
        '.flv': 'video/x-flv',
        '.gif': 'image/gif',
        '.ico': 'image/x-icon',
        '.jpe': 'image/jpg',
        '.jpeg': 'image/jpg',
        '.jpg': 'image/jpg',
        '.m1v': 'video/mpeg',
        '.m2a': 'audio/mpeg',
        '.m2v': 'video/mpeg',
        '.m3a': 'audio/mpeg',
        '.mid': 'audio/midi',
        '.midi': 'audio/midi',
        '.mk3d': 'video/x-matroska',
        '.mks': 'video/x-matroska',
        '.mkv': 'video/x-matroska',
        '.mov': 'video/quicktime',
        '.movie': 'video/x-sgi-movie',
        '.mp2': 'audio/mpeg',
        '.mp2a': 'audio/mpeg',
        '.mp3': 'audio/mpeg',
        '.mp4': 'video/mp4',
        '.mp4a': 'audio/mp4',
        '.mp4v': 'video/mp4',
        '.mpe': 'video/mpeg',
        '.mpeg': 'video/mpeg',
        '.mpg': 'video/mpeg',
        '.mpg4': 'video/mp4',
        '.mpga': 'audio/mpeg',
        '.oga': 'audio/ogg',
        '.ogg': 'audio/ogg',
        '.opus': 'audio/opus',
        '.ogv': 'video/ogg',
        '.png': 'image/png',
        '.psd': 'image/vnd.adobe.photoshop',
        '.qt': 'video/quicktime',
        '.spx': 'audio/ogg',
        '.svg': 'image/svg+xml',
        '.tga': 'image/x-tga',
        '.tif': 'image/tiff',
        '.tiff': 'image/tiff',
        '.wav': 'audio/x-wav',
        '.webm': 'video/webm',
        '.webp': 'image/webp',
        '.wma': 'audio/x-ms-wma',
        '.wmv': 'video/x-ms-wmv',
        '.woff': 'application/font-woff',
    };
    function $_s(path) {
        const ext = (0, path_1.$oc)(path);
        const textMime = mapExtToTextMimes[ext.toLowerCase()];
        if (textMime !== undefined) {
            return textMime;
        }
        else {
            return $at(path);
        }
    }
    function $at(path) {
        const ext = (0, path_1.$oc)(path);
        return mapExtToMediaMimes[ext.toLowerCase()];
    }
    function $bt(mimeType) {
        for (const extension in mapExtToMediaMimes) {
            if (mapExtToMediaMimes[extension] === mimeType) {
                return extension;
            }
        }
        return undefined;
    }
    const _simplePattern = /^(.+)\/(.+?)(;.+)?$/;
    function $ct(mimeType, strict) {
        const match = _simplePattern.exec(mimeType);
        if (!match) {
            return strict
                ? undefined
                : mimeType;
        }
        // https://datatracker.ietf.org/doc/html/rfc2045#section-5.1
        // media and subtype must ALWAYS be lowercase, parameter not
        return `${match[1].toLowerCase()}/${match[2].toLowerCase()}${match[3] ?? ''}`;
    }
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(__m[17/*vs/base/common/stream*/], __M([0/*require*/,1/*exports*/,6/*vs/base/common/errors*/,10/*vs/base/common/lifecycle*/]), function (require, exports, errors_1, lifecycle_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.$ye = $ye;
    exports.$ze = $ze;
    exports.$Ae = $Ae;
    exports.$Be = $Be;
    exports.$Ce = $Ce;
    exports.$De = $De;
    exports.$Ee = $Ee;
    exports.$Fe = $Fe;
    exports.$Ge = $Ge;
    exports.$He = $He;
    exports.$Ie = $Ie;
    exports.$Je = $Je;
    exports.$Ke = $Ke;
    exports.$Le = $Le;
    exports.$Me = $Me;
    function $ye(obj) {
        const candidate = obj;
        if (!candidate) {
            return false;
        }
        return typeof candidate.read === 'function';
    }
    function $ze(obj) {
        const candidate = obj;
        if (!candidate) {
            return false;
        }
        return [candidate.on, candidate.pause, candidate.resume, candidate.destroy].every(fn => typeof fn === 'function');
    }
    function $Ae(obj) {
        const candidate = obj;
        if (!candidate) {
            return false;
        }
        return $ze(candidate.stream) && Array.isArray(candidate.buffer) && typeof candidate.ended === 'boolean';
    }
    function $Be(reducer, options) {
        return new WriteableStreamImpl(reducer, options);
    }
    class WriteableStreamImpl {
        constructor(e, f) {
            this.e = e;
            this.f = f;
            this.a = {
                flowing: false,
                ended: false,
                destroyed: false
            };
            this.b = {
                data: [],
                error: []
            };
            this.c = {
                data: [],
                error: [],
                end: []
            };
            this.d = [];
        }
        pause() {
            if (this.a.destroyed) {
                return;
            }
            this.a.flowing = false;
        }
        resume() {
            if (this.a.destroyed) {
                return;
            }
            if (!this.a.flowing) {
                this.a.flowing = true;
                // emit buffered events
                this.j();
                this.k();
                this.l();
            }
        }
        write(data) {
            if (this.a.destroyed) {
                return;
            }
            // flowing: directly send the data to listeners
            if (this.a.flowing) {
                this.g(data);
            }
            // not yet flowing: buffer data until flowing
            else {
                this.b.data.push(data);
                // highWaterMark: if configured, signal back when buffer reached limits
                if (typeof this.f?.highWaterMark === 'number' && this.b.data.length > this.f.highWaterMark) {
                    return new Promise(resolve => this.d.push(resolve));
                }
            }
        }
        error(error) {
            if (this.a.destroyed) {
                return;
            }
            // flowing: directly send the error to listeners
            if (this.a.flowing) {
                this.h(error);
            }
            // not yet flowing: buffer errors until flowing
            else {
                this.b.error.push(error);
            }
        }
        end(result) {
            if (this.a.destroyed) {
                return;
            }
            // end with data if provided
            if (typeof result !== 'undefined') {
                this.write(result);
            }
            // flowing: send end event to listeners
            if (this.a.flowing) {
                this.i();
                this.destroy();
            }
            // not yet flowing: remember state
            else {
                this.a.ended = true;
            }
        }
        g(data) {
            this.c.data.slice(0).forEach(listener => listener(data)); // slice to avoid listener mutation from delivering event
        }
        h(error) {
            if (this.c.error.length === 0) {
                (0, errors_1.$Y)(error); // nobody listened to this error so we log it as unexpected
            }
            else {
                this.c.error.slice(0).forEach(listener => listener(error)); // slice to avoid listener mutation from delivering event
            }
        }
        i() {
            this.c.end.slice(0).forEach(listener => listener()); // slice to avoid listener mutation from delivering event
        }
        on(event, callback) {
            if (this.a.destroyed) {
                return;
            }
            switch (event) {
                case 'data':
                    this.c.data.push(callback);
                    // switch into flowing mode as soon as the first 'data'
                    // listener is added and we are not yet in flowing mode
                    this.resume();
                    break;
                case 'end':
                    this.c.end.push(callback);
                    // emit 'end' event directly if we are flowing
                    // and the end has already been reached
                    //
                    // finish() when it went through
                    if (this.a.flowing && this.l()) {
                        this.destroy();
                    }
                    break;
                case 'error':
                    this.c.error.push(callback);
                    // emit buffered 'error' events unless done already
                    // now that we know that we have at least one listener
                    if (this.a.flowing) {
                        this.k();
                    }
                    break;
            }
        }
        removeListener(event, callback) {
            if (this.a.destroyed) {
                return;
            }
            let listeners = undefined;
            switch (event) {
                case 'data':
                    listeners = this.c.data;
                    break;
                case 'end':
                    listeners = this.c.end;
                    break;
                case 'error':
                    listeners = this.c.error;
                    break;
            }
            if (listeners) {
                const index = listeners.indexOf(callback);
                if (index >= 0) {
                    listeners.splice(index, 1);
                }
            }
        }
        j() {
            if (this.b.data.length > 0) {
                const fullDataBuffer = this.e(this.b.data);
                this.g(fullDataBuffer);
                this.b.data.length = 0;
                // When the buffer is empty, resolve all pending writers
                const pendingWritePromises = [...this.d];
                this.d.length = 0;
                pendingWritePromises.forEach(pendingWritePromise => pendingWritePromise());
            }
        }
        k() {
            if (this.c.error.length > 0) {
                for (const error of this.b.error) {
                    this.h(error);
                }
                this.b.error.length = 0;
            }
        }
        l() {
            if (this.a.ended) {
                this.i();
                return this.c.end.length > 0;
            }
            return false;
        }
        destroy() {
            if (!this.a.destroyed) {
                this.a.destroyed = true;
                this.a.ended = true;
                this.b.data.length = 0;
                this.b.error.length = 0;
                this.c.data.length = 0;
                this.c.error.length = 0;
                this.c.end.length = 0;
                this.d.length = 0;
            }
        }
    }
    /**
     * Helper to fully read a T readable into a T.
     */
    function $Ce(readable, reducer) {
        const chunks = [];
        let chunk;
        while ((chunk = readable.read()) !== null) {
            chunks.push(chunk);
        }
        return reducer(chunks);
    }
    /**
     * Helper to read a T readable up to a maximum of chunks. If the limit is
     * reached, will return a readable instead to ensure all data can still
     * be read.
     */
    function $De(readable, reducer, maxChunks) {
        const chunks = [];
        let chunk = undefined;
        while ((chunk = readable.read()) !== null && chunks.length < maxChunks) {
            chunks.push(chunk);
        }
        // If the last chunk is null, it means we reached the end of
        // the readable and return all the data at once
        if (chunk === null && chunks.length > 0) {
            return reducer(chunks);
        }
        // Otherwise, we still have a chunk, it means we reached the maxChunks
        // value and as such we return a new Readable that first returns
        // the existing read chunks and then continues with reading from
        // the underlying readable.
        return {
            read: () => {
                // First consume chunks from our array
                if (chunks.length > 0) {
                    return chunks.shift();
                }
                // Then ensure to return our last read chunk
                if (typeof chunk !== 'undefined') {
                    const lastReadChunk = chunk;
                    // explicitly use undefined here to indicate that we consumed
                    // the chunk, which could have either been null or valued.
                    chunk = undefined;
                    return lastReadChunk;
                }
                // Finally delegate back to the Readable
                return readable.read();
            }
        };
    }
    function $Ee(stream, reducer) {
        return new Promise((resolve, reject) => {
            const chunks = [];
            $Fe(stream, {
                onData: chunk => {
                    if (reducer) {
                        chunks.push(chunk);
                    }
                },
                onError: error => {
                    if (reducer) {
                        reject(error);
                    }
                    else {
                        resolve(undefined);
                    }
                },
                onEnd: () => {
                    if (reducer) {
                        resolve(reducer(chunks));
                    }
                    else {
                        resolve(undefined);
                    }
                }
            });
        });
    }
    /**
     * Helper to listen to all events of a T stream in proper order.
     */
    function $Fe(stream, listener, token) {
        stream.on('error', error => {
            if (!token?.isCancellationRequested) {
                listener.onError(error);
            }
        });
        stream.on('end', () => {
            if (!token?.isCancellationRequested) {
                listener.onEnd();
            }
        });
        // Adding the `data` listener will turn the stream
        // into flowing mode. As such it is important to
        // add this listener last (DO NOT CHANGE!)
        stream.on('data', data => {
            if (!token?.isCancellationRequested) {
                listener.onData(data);
            }
        });
    }
    /**
     * Helper to peek up to `maxChunks` into a stream. The return type signals if
     * the stream has ended or not. If not, caller needs to add a `data` listener
     * to continue reading.
     */
    function $Ge(stream, maxChunks) {
        return new Promise((resolve, reject) => {
            const streamListeners = new lifecycle_1.$Tc();
            const buffer = [];
            // Data Listener
            const dataListener = (chunk) => {
                // Add to buffer
                buffer.push(chunk);
                // We reached maxChunks and thus need to return
                if (buffer.length > maxChunks) {
                    // Dispose any listeners and ensure to pause the
                    // stream so that it can be consumed again by caller
                    streamListeners.dispose();
                    stream.pause();
                    return resolve({ stream, buffer, ended: false });
                }
            };
            // Error Listener
            const errorListener = (error) => {
                streamListeners.dispose();
                return reject(error);
            };
            // End Listener
            const endListener = () => {
                streamListeners.dispose();
                return resolve({ stream, buffer, ended: true });
            };
            streamListeners.add((0, lifecycle_1.$Sc)(() => stream.removeListener('error', errorListener)));
            stream.on('error', errorListener);
            streamListeners.add((0, lifecycle_1.$Sc)(() => stream.removeListener('end', endListener)));
            stream.on('end', endListener);
            // Important: leave the `data` listener last because
            // this can turn the stream into flowing mode and we
            // want `error` events to be received as well.
            streamListeners.add((0, lifecycle_1.$Sc)(() => stream.removeListener('data', dataListener)));
            stream.on('data', dataListener);
        });
    }
    /**
     * Helper to create a readable stream from an existing T.
     */
    function $He(t, reducer) {
        const stream = $Be(reducer);
        stream.end(t);
        return stream;
    }
    /**
     * Helper to create an empty stream
     */
    function $Ie() {
        const stream = $Be(() => { throw new Error('not supported'); });
        stream.end();
        return stream;
    }
    /**
     * Helper to convert a T into a Readable<T>.
     */
    function $Je(t) {
        let consumed = false;
        return {
            read: () => {
                if (consumed) {
                    return null;
                }
                consumed = true;
                return t;
            }
        };
    }
    /**
     * Helper to transform a readable stream into another stream.
     */
    function $Ke(stream, transformer, reducer) {
        const target = $Be(reducer);
        $Fe(stream, {
            onData: data => target.write(transformer.data(data)),
            onError: error => target.error(transformer.error ? transformer.error(error) : error),
            onEnd: () => target.end()
        });
        return target;
    }
    /**
     * Helper to take an existing readable that will
     * have a prefix injected to the beginning.
     */
    function $Le(prefix, readable, reducer) {
        let prefixHandled = false;
        return {
            read: () => {
                const chunk = readable.read();
                // Handle prefix only once
                if (!prefixHandled) {
                    prefixHandled = true;
                    // If we have also a read-result, make
                    // sure to reduce it to a single result
                    if (chunk !== null) {
                        return reducer([prefix, chunk]);
                    }
                    // Otherwise, just return prefix directly
                    return prefix;
                }
                return chunk;
            }
        };
    }
    /**
     * Helper to take an existing stream that will
     * have a prefix injected to the beginning.
     */
    function $Me(prefix, stream, reducer) {
        let prefixHandled = false;
        const target = $Be(reducer);
        $Fe(stream, {
            onData: data => {
                // Handle prefix only once
                if (!prefixHandled) {
                    prefixHandled = true;
                    return target.write(reducer([prefix, data]));
                }
                return target.write(data);
            },
            onError: error => target.error(error),
            onEnd: () => {
                // Handle prefix only once
                if (!prefixHandled) {
                    prefixHandled = true;
                    target.write(prefix);
                }
                target.end();
            }
        });
        return target;
    }
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
define(__m[7/*vs/base/common/buffer*/], __M([0/*require*/,1/*exports*/,18/*vs/base/common/lazy*/,17/*vs/base/common/stream*/]), function (require, exports, lazy_1, streams) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.$Ne = void 0;
    exports.$Oe = $Oe;
    exports.$Pe = $Pe;
    exports.$Qe = $Qe;
    exports.$Re = $Re;
    exports.$Se = $Se;
    exports.$Te = $Te;
    exports.$Ue = $Ue;
    exports.$Ve = $Ve;
    exports.$We = $We;
    exports.$Xe = $Xe;
    exports.$Ye = $Ye;
    exports.$Ze = $Ze;
    exports.$1e = $1e;
    exports.$2e = $2e;
    exports.$3e = $3e;
    exports.$4e = $4e;
    exports.$5e = $5e;
    exports.$6e = $6e;
    exports.$7e = $7e;
    exports.$8e = $8e;
    streams = __importStar(streams);
    const hasBuffer = (typeof Buffer !== 'undefined');
    const indexOfTable = new lazy_1.$T(() => new Uint8Array(256));
    let textEncoder;
    let textDecoder;
    class $Ne {
        /**
         * When running in a nodejs context, the backing store for the returned `VSBuffer` instance
         * might use a nodejs Buffer allocated from node's Buffer pool, which is not transferrable.
         */
        static alloc(byteLength) {
            if (hasBuffer) {
                return new $Ne(Buffer.allocUnsafe(byteLength));
            }
            else {
                return new $Ne(new Uint8Array(byteLength));
            }
        }
        /**
         * When running in a nodejs context, if `actual` is not a nodejs Buffer, the backing store for
         * the returned `VSBuffer` instance might use a nodejs Buffer allocated from node's Buffer pool,
         * which is not transferrable.
         */
        static wrap(actual) {
            if (hasBuffer && !(Buffer.isBuffer(actual))) {
                // https://nodejs.org/dist/latest-v10.x/docs/api/buffer.html#buffer_class_method_buffer_from_arraybuffer_byteoffset_length
                // Create a zero-copy Buffer wrapper around the ArrayBuffer pointed to by the Uint8Array
                actual = Buffer.from(actual.buffer, actual.byteOffset, actual.byteLength);
            }
            return new $Ne(actual);
        }
        /**
         * When running in a nodejs context, the backing store for the returned `VSBuffer` instance
         * might use a nodejs Buffer allocated from node's Buffer pool, which is not transferrable.
         */
        static fromString(source, options) {
            const dontUseNodeBuffer = options?.dontUseNodeBuffer || false;
            if (!dontUseNodeBuffer && hasBuffer) {
                return new $Ne(Buffer.from(source));
            }
            else {
                if (!textEncoder) {
                    textEncoder = new TextEncoder();
                }
                return new $Ne(textEncoder.encode(source));
            }
        }
        /**
         * When running in a nodejs context, the backing store for the returned `VSBuffer` instance
         * might use a nodejs Buffer allocated from node's Buffer pool, which is not transferrable.
         */
        static fromByteArray(source) {
            const result = $Ne.alloc(source.length);
            for (let i = 0, len = source.length; i < len; i++) {
                result.buffer[i] = source[i];
            }
            return result;
        }
        /**
         * When running in a nodejs context, the backing store for the returned `VSBuffer` instance
         * might use a nodejs Buffer allocated from node's Buffer pool, which is not transferrable.
         */
        static concat(buffers, totalLength) {
            if (typeof totalLength === 'undefined') {
                totalLength = 0;
                for (let i = 0, len = buffers.length; i < len; i++) {
                    totalLength += buffers[i].byteLength;
                }
            }
            const ret = $Ne.alloc(totalLength);
            let offset = 0;
            for (let i = 0, len = buffers.length; i < len; i++) {
                const element = buffers[i];
                ret.set(element, offset);
                offset += element.byteLength;
            }
            return ret;
        }
        constructor(buffer) {
            this.buffer = buffer;
            this.byteLength = this.buffer.byteLength;
        }
        /**
         * When running in a nodejs context, the backing store for the returned `VSBuffer` instance
         * might use a nodejs Buffer allocated from node's Buffer pool, which is not transferrable.
         */
        clone() {
            const result = $Ne.alloc(this.byteLength);
            result.set(this);
            return result;
        }
        toString() {
            if (hasBuffer) {
                return this.buffer.toString();
            }
            else {
                if (!textDecoder) {
                    textDecoder = new TextDecoder();
                }
                return textDecoder.decode(this.buffer);
            }
        }
        slice(start, end) {
            // IMPORTANT: use subarray instead of slice because TypedArray#slice
            // creates shallow copy and NodeBuffer#slice doesn't. The use of subarray
            // ensures the same, performance, behaviour.
            return new $Ne(this.buffer.subarray(start, end));
        }
        set(array, offset) {
            if (array instanceof $Ne) {
                this.buffer.set(array.buffer, offset);
            }
            else if (array instanceof Uint8Array) {
                this.buffer.set(array, offset);
            }
            else if (array instanceof ArrayBuffer) {
                this.buffer.set(new Uint8Array(array), offset);
            }
            else if (ArrayBuffer.isView(array)) {
                this.buffer.set(new Uint8Array(array.buffer, array.byteOffset, array.byteLength), offset);
            }
            else {
                throw new Error(`Unknown argument 'array'`);
            }
        }
        readUInt32BE(offset) {
            return $Re(this.buffer, offset);
        }
        writeUInt32BE(value, offset) {
            $Se(this.buffer, value, offset);
        }
        readUInt32LE(offset) {
            return $Te(this.buffer, offset);
        }
        writeUInt32LE(value, offset) {
            $Ue(this.buffer, value, offset);
        }
        readUInt8(offset) {
            return $Ve(this.buffer, offset);
        }
        writeUInt8(value, offset) {
            $We(this.buffer, value, offset);
        }
        indexOf(subarray, offset = 0) {
            return $Oe(this.buffer, subarray instanceof $Ne ? subarray.buffer : subarray, offset);
        }
    }
    exports.$Ne = $Ne;
    /**
     * Like String.indexOf, but works on Uint8Arrays.
     * Uses the boyer-moore-horspool algorithm to be reasonably speedy.
     */
    function $Oe(haystack, needle, offset = 0) {
        const needleLen = needle.byteLength;
        const haystackLen = haystack.byteLength;
        if (needleLen === 0) {
            return 0;
        }
        if (needleLen === 1) {
            return haystack.indexOf(needle[0]);
        }
        if (needleLen > haystackLen - offset) {
            return -1;
        }
        // find index of the subarray using boyer-moore-horspool algorithm
        const table = indexOfTable.value;
        table.fill(needle.length);
        for (let i = 0; i < needle.length; i++) {
            table[needle[i]] = needle.length - i - 1;
        }
        let i = offset + needle.length - 1;
        let j = i;
        let result = -1;
        while (i < haystackLen) {
            if (haystack[i] === needle[j]) {
                if (j === 0) {
                    result = i;
                    break;
                }
                i--;
                j--;
            }
            else {
                i += Math.max(needle.length - j, table[haystack[i]]);
                j = needle.length - 1;
            }
        }
        return result;
    }
    function $Pe(source, offset) {
        return (((source[offset + 0] << 0) >>> 0) |
            ((source[offset + 1] << 8) >>> 0));
    }
    function $Qe(destination, value, offset) {
        destination[offset + 0] = (value & 0b11111111);
        value = value >>> 8;
        destination[offset + 1] = (value & 0b11111111);
    }
    function $Re(source, offset) {
        return (source[offset] * 2 ** 24
            + source[offset + 1] * 2 ** 16
            + source[offset + 2] * 2 ** 8
            + source[offset + 3]);
    }
    function $Se(destination, value, offset) {
        destination[offset + 3] = value;
        value = value >>> 8;
        destination[offset + 2] = value;
        value = value >>> 8;
        destination[offset + 1] = value;
        value = value >>> 8;
        destination[offset] = value;
    }
    function $Te(source, offset) {
        return (((source[offset + 0] << 0) >>> 0) |
            ((source[offset + 1] << 8) >>> 0) |
            ((source[offset + 2] << 16) >>> 0) |
            ((source[offset + 3] << 24) >>> 0));
    }
    function $Ue(destination, value, offset) {
        destination[offset + 0] = (value & 0b11111111);
        value = value >>> 8;
        destination[offset + 1] = (value & 0b11111111);
        value = value >>> 8;
        destination[offset + 2] = (value & 0b11111111);
        value = value >>> 8;
        destination[offset + 3] = (value & 0b11111111);
    }
    function $Ve(source, offset) {
        return source[offset];
    }
    function $We(destination, value, offset) {
        destination[offset] = value;
    }
    function $Xe(readable) {
        return streams.$Ce(readable, chunks => $Ne.concat(chunks));
    }
    function $Ye(buffer) {
        return streams.$Je(buffer);
    }
    function $Ze(stream) {
        return streams.$Ee(stream, chunks => $Ne.concat(chunks));
    }
    async function $1e(bufferedStream) {
        if (bufferedStream.ended) {
            return $Ne.concat(bufferedStream.buffer);
        }
        return $Ne.concat([
            // Include already read chunks...
            ...bufferedStream.buffer,
            // ...and all additional chunks
            await $Ze(bufferedStream.stream)
        ]);
    }
    function $2e(buffer) {
        return streams.$He(buffer, chunks => $Ne.concat(chunks));
    }
    function $3e(stream) {
        return streams.$Ke(stream, { data: data => typeof data === 'string' ? $Ne.fromString(data) : $Ne.wrap(data) }, chunks => $Ne.concat(chunks));
    }
    function $4e(options) {
        return streams.$Be(chunks => $Ne.concat(chunks), options);
    }
    function $5e(prefix, readable) {
        return streams.$Le(prefix, readable, chunks => $Ne.concat(chunks));
    }
    function $6e(prefix, stream) {
        return streams.$Me(prefix, stream, chunks => $Ne.concat(chunks));
    }
    /** Decodes base64 to a uint8 array. URL-encoded and unpadded base64 is allowed. */
    function $7e(encoded) {
        let building = 0;
        let remainder = 0;
        let bufi = 0;
        // The simpler way to do this is `Uint8Array.from(atob(str), c => c.charCodeAt(0))`,
        // but that's about 10-20x slower than this function in current Chromium versions.
        const buffer = new Uint8Array(Math.floor(encoded.length / 4 * 3));
        const append = (value) => {
            switch (remainder) {
                case 3:
                    buffer[bufi++] = building | value;
                    remainder = 0;
                    break;
                case 2:
                    buffer[bufi++] = building | (value >>> 2);
                    building = value << 6;
                    remainder = 3;
                    break;
                case 1:
                    buffer[bufi++] = building | (value >>> 4);
                    building = value << 4;
                    remainder = 2;
                    break;
                default:
                    building = value << 2;
                    remainder = 1;
            }
        };
        for (let i = 0; i < encoded.length; i++) {
            const code = encoded.charCodeAt(i);
            // See https://datatracker.ietf.org/doc/html/rfc4648#section-4
            // This branchy code is about 3x faster than an indexOf on a base64 char string.
            if (code >= 65 && code <= 90) {
                append(code - 65); // A-Z starts ranges from char code 65 to 90
            }
            else if (code >= 97 && code <= 122) {
                append(code - 97 + 26); // a-z starts ranges from char code 97 to 122, starting at byte 26
            }
            else if (code >= 48 && code <= 57) {
                append(code - 48 + 52); // 0-9 starts ranges from char code 48 to 58, starting at byte 52
            }
            else if (code === 43 || code === 45) {
                append(62); // "+" or "-" for URLS
            }
            else if (code === 47 || code === 95) {
                append(63); // "/" or "_" for URLS
            }
            else if (code === 61) {
                break; // "="
            }
            else {
                throw new SyntaxError(`Unexpected base64 character ${encoded[i]}`);
            }
        }
        const unpadded = bufi;
        while (remainder > 0) {
            append(0);
        }
        // slice is needed to account for overestimation due to padding
        return $Ne.wrap(buffer).slice(0, unpadded);
    }
    const base64Alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    const base64UrlSafeAlphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
    /** Encodes a buffer to a base64 string. */
    function $8e({ buffer }, padded = true, urlSafe = false) {
        const dictionary = urlSafe ? base64UrlSafeAlphabet : base64Alphabet;
        let output = '';
        const remainder = buffer.byteLength % 3;
        let i = 0;
        for (; i < buffer.byteLength - remainder; i += 3) {
            const a = buffer[i + 0];
            const b = buffer[i + 1];
            const c = buffer[i + 2];
            output += dictionary[a >>> 2];
            output += dictionary[(a << 4 | b >>> 4) & 0b111111];
            output += dictionary[(b << 2 | c >>> 6) & 0b111111];
            output += dictionary[c & 0b111111];
        }
        if (remainder === 1) {
            const a = buffer[i + 0];
            output += dictionary[a >>> 2];
            output += dictionary[(a << 4) & 0b111111];
            if (padded) {
                output += '==';
            }
        }
        else if (remainder === 2) {
            const a = buffer[i + 0];
            const b = buffer[i + 1];
            output += dictionary[a >>> 2];
            output += dictionary[(a << 4 | b >>> 4) & 0b111111];
            output += dictionary[(b << 2) & 0b111111];
            if (padded) {
                output += '=';
            }
        }
        return output;
    }
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(__m[19/*vs/base/common/symbols*/], __M([0/*require*/,1/*exports*/]), function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.$ge = void 0;
    /**
     * Can be passed into the Delayed to defer using a microtask
     * */
    exports.$ge = Symbol('MicrotaskDelay');
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(__m[11/*vs/base/common/extpath*/], __M([0/*require*/,1/*exports*/,2/*vs/base/common/charCode*/,5/*vs/base/common/path*/,3/*vs/base/common/platform*/,4/*vs/base/common/strings*/,39/*vs/base/common/types*/]), function (require, exports, charCode_1, path_1, platform_1, strings_1, types_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.$xg = $xg;
    exports.$yg = $yg;
    exports.$zg = $zg;
    exports.$Ag = $Ag;
    exports.$Bg = $Bg;
    exports.$Cg = $Cg;
    exports.$Dg = $Dg;
    exports.$Eg = $Eg;
    exports.$Fg = $Fg;
    exports.$Gg = $Gg;
    exports.$Hg = $Hg;
    exports.$Ig = $Ig;
    exports.$Jg = $Jg;
    exports.$Kg = $Kg;
    exports.$Lg = $Lg;
    exports.$Mg = $Mg;
    exports.$Ng = $Ng;
    function $xg(code) {
        return code === charCode_1.CharCode.Slash || code === charCode_1.CharCode.Backslash;
    }
    /**
     * Takes a Windows OS path and changes backward slashes to forward slashes.
     * This should only be done for OS paths from Windows (or user provided paths potentially from Windows).
     * Using it on a Linux or MaxOS path might change it.
     */
    function $yg(osPath) {
        return osPath.replace(/[\\/]/g, path_1.$gc.sep);
    }
    /**
     * Takes a Windows OS path (using backward or forward slashes) and turns it into a posix path:
     * - turns backward slashes into forward slashes
     * - makes it absolute if it starts with a drive letter
     * This should only be done for OS paths from Windows (or user provided paths potentially from Windows).
     * Using it on a Linux or MaxOS path might change it.
     */
    function $zg(osPath) {
        if (osPath.indexOf('/') === -1) {
            osPath = $yg(osPath);
        }
        if (/^[a-zA-Z]:(\/|$)/.test(osPath)) { // starts with a drive letter
            osPath = '/' + osPath;
        }
        return osPath;
    }
    /**
     * Computes the _root_ this path, like `getRoot('c:\files') === c:\`,
     * `getRoot('files:///files/path') === files:///`,
     * or `getRoot('\\server\shares\path') === \\server\shares\`
     */
    function $Ag(path, sep = path_1.$gc.sep) {
        if (!path) {
            return '';
        }
        const len = path.length;
        const firstLetter = path.charCodeAt(0);
        if ($xg(firstLetter)) {
            if ($xg(path.charCodeAt(1))) {
                // UNC candidate \\localhost\shares\ddd
                //               ^^^^^^^^^^^^^^^^^^^
                if (!$xg(path.charCodeAt(2))) {
                    let pos = 3;
                    const start = pos;
                    for (; pos < len; pos++) {
                        if ($xg(path.charCodeAt(pos))) {
                            break;
                        }
                    }
                    if (start !== pos && !$xg(path.charCodeAt(pos + 1))) {
                        pos += 1;
                        for (; pos < len; pos++) {
                            if ($xg(path.charCodeAt(pos))) {
                                return path.slice(0, pos + 1) // consume this separator
                                    .replace(/[\\/]/g, sep);
                            }
                        }
                    }
                }
            }
            // /user/far
            // ^
            return sep;
        }
        else if ($Fg(firstLetter)) {
            // check for windows drive letter c:\ or c:
            if (path.charCodeAt(1) === charCode_1.CharCode.Colon) {
                if ($xg(path.charCodeAt(2))) {
                    // C:\fff
                    // ^^^
                    return path.slice(0, 2) + sep;
                }
                else {
                    // C:
                    // ^^
                    return path.slice(0, 2);
                }
            }
        }
        // check for URI
        // scheme://authority/path
        // ^^^^^^^^^^^^^^^^^^^
        let pos = path.indexOf('://');
        if (pos !== -1) {
            pos += 3; // 3 -> "://".length
            for (; pos < len; pos++) {
                if ($xg(path.charCodeAt(pos))) {
                    return path.slice(0, pos + 1); // consume this separator
                }
            }
        }
        return '';
    }
    /**
     * Check if the path follows this pattern: `\\hostname\sharename`.
     *
     * @see https://msdn.microsoft.com/en-us/library/gg465305.aspx
     * @return A boolean indication if the path is a UNC path, on none-windows
     * always false.
     */
    function $Bg(path) {
        if (!platform_1.$j) {
            // UNC is a windows concept
            return false;
        }
        if (!path || path.length < 5) {
            // at least \\a\b
            return false;
        }
        let code = path.charCodeAt(0);
        if (code !== charCode_1.CharCode.Backslash) {
            return false;
        }
        code = path.charCodeAt(1);
        if (code !== charCode_1.CharCode.Backslash) {
            return false;
        }
        let pos = 2;
        const start = pos;
        for (; pos < path.length; pos++) {
            code = path.charCodeAt(pos);
            if (code === charCode_1.CharCode.Backslash) {
                break;
            }
        }
        if (start === pos) {
            return false;
        }
        code = path.charCodeAt(pos + 1);
        if (isNaN(code) || code === charCode_1.CharCode.Backslash) {
            return false;
        }
        return true;
    }
    // Reference: https://en.wikipedia.org/wiki/Filename
    const WINDOWS_INVALID_FILE_CHARS = /[\\/:\*\?"<>\|]/g;
    const UNIX_INVALID_FILE_CHARS = /[/]/g;
    const WINDOWS_FORBIDDEN_NAMES = /^(con|prn|aux|clock\$|nul|lpt[0-9]|com[0-9])(\.(.*?))?$/i;
    function $Cg(name, isWindowsOS = platform_1.$j) {
        const invalidFileChars = isWindowsOS ? WINDOWS_INVALID_FILE_CHARS : UNIX_INVALID_FILE_CHARS;
        if (!name || name.length === 0 || /^\s+$/.test(name)) {
            return false; // require a name that is not just whitespace
        }
        invalidFileChars.lastIndex = 0; // the holy grail of software development
        if (invalidFileChars.test(name)) {
            return false; // check for certain invalid file characters
        }
        if (isWindowsOS && WINDOWS_FORBIDDEN_NAMES.test(name)) {
            return false; // check for certain invalid file names
        }
        if (name === '.' || name === '..') {
            return false; // check for reserved values
        }
        if (isWindowsOS && name[name.length - 1] === '.') {
            return false; // Windows: file cannot end with a "."
        }
        if (isWindowsOS && name.length !== name.trim().length) {
            return false; // Windows: file cannot end with a whitespace
        }
        if (name.length > 255) {
            return false; // most file systems do not allow files > 255 length
        }
        return true;
    }
    /**
     * @deprecated please use `IUriIdentityService.extUri.isEqual` instead. If you are
     * in a context without services, consider to pass down the `extUri` from the outside
     * or use `extUriBiasedIgnorePathCase` if you know what you are doing.
     */
    function $Dg(pathA, pathB, ignoreCase) {
        const identityEquals = (pathA === pathB);
        if (!ignoreCase || identityEquals) {
            return identityEquals;
        }
        if (!pathA || !pathB) {
            return false;
        }
        return (0, strings_1.$Ff)(pathA, pathB);
    }
    /**
     * @deprecated please use `IUriIdentityService.extUri.isEqualOrParent` instead. If
     * you are in a context without services, consider to pass down the `extUri` from the
     * outside, or use `extUriBiasedIgnorePathCase` if you know what you are doing.
     */
    function $Eg(base, parentCandidate, ignoreCase, separator = path_1.sep) {
        if (base === parentCandidate) {
            return true;
        }
        if (!base || !parentCandidate) {
            return false;
        }
        if (parentCandidate.length > base.length) {
            return false;
        }
        if (ignoreCase) {
            const beginsWith = (0, strings_1.$Gf)(base, parentCandidate);
            if (!beginsWith) {
                return false;
            }
            if (parentCandidate.length === base.length) {
                return true; // same path, different casing
            }
            let sepOffset = parentCandidate.length;
            if (parentCandidate.charAt(parentCandidate.length - 1) === separator) {
                sepOffset--; // adjust the expected sep offset in case our candidate already ends in separator character
            }
            return base.charAt(sepOffset) === separator;
        }
        if (parentCandidate.charAt(parentCandidate.length - 1) !== separator) {
            parentCandidate += separator;
        }
        return base.indexOf(parentCandidate) === 0;
    }
    function $Fg(char0) {
        return char0 >= charCode_1.CharCode.A && char0 <= charCode_1.CharCode.Z || char0 >= charCode_1.CharCode.a && char0 <= charCode_1.CharCode.z;
    }
    function $Gg(candidate, cwd) {
        // Special case: allow to open a drive letter without trailing backslash
        if (platform_1.$j && candidate.endsWith(':')) {
            candidate += path_1.sep;
        }
        // Ensure absolute
        if (!(0, path_1.$ic)(candidate)) {
            candidate = (0, path_1.$jc)(cwd, candidate);
        }
        // Ensure normalized
        candidate = (0, path_1.$hc)(candidate);
        // Ensure no trailing slash/backslash
        return $Hg(candidate);
    }
    function $Hg(candidate) {
        if (platform_1.$j) {
            candidate = (0, strings_1.$nf)(candidate, path_1.sep);
            // Special case: allow to open drive root ('C:\')
            if (candidate.endsWith(':')) {
                candidate += path_1.sep;
            }
        }
        else {
            candidate = (0, strings_1.$nf)(candidate, path_1.sep);
            // Special case: allow to open root ('/')
            if (!candidate) {
                candidate = path_1.sep;
            }
        }
        return candidate;
    }
    function $Ig(path) {
        const pathNormalized = (0, path_1.$hc)(path);
        if (platform_1.$j) {
            if (path.length > 3) {
                return false;
            }
            return $Jg(pathNormalized) &&
                (path.length === 2 || pathNormalized.charCodeAt(2) === charCode_1.CharCode.Backslash);
        }
        return pathNormalized === path_1.$gc.sep;
    }
    function $Jg(path, isWindowsOS = platform_1.$j) {
        if (isWindowsOS) {
            return $Fg(path.charCodeAt(0)) && path.charCodeAt(1) === charCode_1.CharCode.Colon;
        }
        return false;
    }
    function $Kg(path, isWindowsOS = platform_1.$j) {
        return $Jg(path, isWindowsOS) ? path[0] : undefined;
    }
    function $Lg(path, candidate, ignoreCase) {
        if (candidate.length > path.length) {
            return -1;
        }
        if (path === candidate) {
            return 0;
        }
        if (ignoreCase) {
            path = path.toLowerCase();
            candidate = candidate.toLowerCase();
        }
        return path.indexOf(candidate);
    }
    function $Mg(rawPath) {
        const segments = rawPath.split(':'); // C:\file.txt:<line>:<column>
        let path = undefined;
        let line = undefined;
        let column = undefined;
        for (const segment of segments) {
            const segmentAsNumber = Number(segment);
            if (!(0, types_1.$ig)(segmentAsNumber)) {
                path = !!path ? [path, segment].join(':') : segment; // a colon can well be part of a path (e.g. C:\...)
            }
            else if (line === undefined) {
                line = segmentAsNumber;
            }
            else if (column === undefined) {
                column = segmentAsNumber;
            }
        }
        if (!path) {
            throw new Error('Format for `--goto` should be: `FILE:LINE(:COLUMN)`');
        }
        return {
            path,
            line: line !== undefined ? line : undefined,
            column: column !== undefined ? column : line !== undefined ? 1 : undefined // if we have a line, make sure column is also set
        };
    }
    const pathChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const windowsSafePathFirstChars = 'BDEFGHIJKMOQRSTUVWXYZbdefghijkmoqrstuvwxyz0123456789';
    function $Ng(parent, prefix, randomLength = 8) {
        let suffix = '';
        for (let i = 0; i < randomLength; i++) {
            let pathCharsTouse;
            if (i === 0 && platform_1.$j && !prefix && (randomLength === 3 || randomLength === 4)) {
                // Windows has certain reserved file names that cannot be used, such
                // as AUX, CON, PRN, etc. We want to avoid generating a random name
                // that matches that pattern, so we use a different set of characters
                // for the first character of the name that does not include any of
                // the reserved names first characters.
                pathCharsTouse = windowsSafePathFirstChars;
            }
            else {
                pathCharsTouse = pathChars;
            }
            suffix += pathCharsTouse.charAt(Math.floor(Math.random() * pathCharsTouse.length));
        }
        let randomFileName;
        if (prefix) {
            randomFileName = `${prefix}-${suffix}`;
        }
        else {
            randomFileName = suffix;
        }
        if (parent) {
            return (0, path_1.$jc)(parent, randomFileName);
        }
        return randomFileName;
    }
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/























define(__m[8/*vs/base/common/network*/], __M([0/*require*/,1/*exports*/,6/*vs/base/common/errors*/,3/*vs/base/common/platform*/,4/*vs/base/common/strings*/,12/*vs/base/common/uri*/,5/*vs/base/common/path*/]), function (require, exports, errors, platform, strings_1, uri_1, paths) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.COI = exports.$Zg = exports.$Yg = exports.$Xg = exports.$Wg = exports.$Vg = exports.$Ug = exports.$Sg = exports.$Rg = exports.$Qg = exports.Schemas = void 0;
    exports.$Og = $Og;
    exports.$Pg = $Pg;
    exports.$Tg = $Tg;
    errors = __importStar(errors);
    platform = __importStar(platform);
    paths = __importStar(paths);
    var Schemas;
    (function (Schemas) {
        /**
         * A schema that is used for models that exist in memory
         * only and that have no correspondence on a server or such.
         */
        Schemas.inMemory = 'inmemory';
        /**
         * A schema that is used for setting files
         */
        Schemas.vscode = 'vscode';
        /**
         * A schema that is used for internal private files
         */
        Schemas.internal = 'private';
        /**
         * A walk-through document.
         */
        Schemas.walkThrough = 'walkThrough';
        /**
         * An embedded code snippet.
         */
        Schemas.walkThroughSnippet = 'walkThroughSnippet';
        Schemas.http = 'http';
        Schemas.https = 'https';
        Schemas.file = 'file';
        Schemas.mailto = 'mailto';
        Schemas.untitled = 'untitled';
        Schemas.data = 'data';
        Schemas.command = 'command';
        Schemas.vscodeRemote = 'vscode-remote';
        Schemas.vscodeRemoteResource = 'vscode-remote-resource';
        Schemas.vscodeManagedRemoteResource = 'vscode-managed-remote-resource';
        Schemas.vscodeUserData = 'vscode-userdata';
        Schemas.vscodeCustomEditor = 'vscode-custom-editor';
        Schemas.vscodeNotebookCell = 'vscode-notebook-cell';
        Schemas.vscodeNotebookCellMetadata = 'vscode-notebook-cell-metadata';
        Schemas.vscodeNotebookCellOutput = 'vscode-notebook-cell-output';
        Schemas.vscodeInteractiveInput = 'vscode-interactive-input';
        Schemas.vscodeSettings = 'vscode-settings';
        Schemas.vscodeWorkspaceTrust = 'vscode-workspace-trust';
        Schemas.vscodeTerminal = 'vscode-terminal';
        /** Scheme used for code blocks in chat. */
        Schemas.vscodeChatCodeBlock = 'vscode-chat-code-block';
        /**
         * Scheme used for backing documents created by copilot for chat.
         */
        Schemas.vscodeCopilotBackingChatCodeBlock = 'vscode-copilot-chat-code-block';
        /** Scheme used for LHS of code compare (aka diff) blocks in chat. */
        Schemas.vscodeChatCodeCompareBlock = 'vscode-chat-code-compare-block';
        /** Scheme used for the chat input editor. */
        Schemas.vscodeChatSesssion = 'vscode-chat-editor';
        /**
         * Scheme used internally for webviews that aren't linked to a resource (i.e. not custom editors)
         */
        Schemas.webviewPanel = 'webview-panel';
        /**
         * Scheme used for loading the wrapper html and script in webviews.
         */
        Schemas.vscodeWebview = 'vscode-webview';
        /**
         * Scheme used for extension pages
         */
        Schemas.extension = 'extension';
        /**
         * Scheme used as a replacement of `file` scheme to load
         * files with our custom protocol handler (desktop only).
         */
        Schemas.vscodeFileResource = 'vscode-file';
        /**
         * Scheme used for temporary resources
         */
        Schemas.tmp = 'tmp';
        /**
         * Scheme used vs live share
         */
        Schemas.vsls = 'vsls';
        /**
         * Scheme used for the Source Control commit input's text document
         */
        Schemas.vscodeSourceControl = 'vscode-scm';
        /**
         * Scheme used for input box for creating comments.
         */
        Schemas.commentsInput = 'comment';
        /**
         * Scheme used for special rendering of settings in the release notes
         */
        Schemas.codeSetting = 'code-setting';
    })(Schemas || (exports.Schemas = Schemas = {}));
    function $Og(target, scheme) {
        if (uri_1.URI.isUri(target)) {
            return (0, strings_1.$Ff)(target.scheme, scheme);
        }
        else {
            return (0, strings_1.$Gf)(target, scheme + ':');
        }
    }
    function $Pg(target, ...schemes) {
        return schemes.some(scheme => $Og(target, scheme));
    }
    exports.$Qg = 'vscode-tkn';
    exports.$Rg = 'tkn';
    class RemoteAuthoritiesImpl {
        constructor() {
            this.a = Object.create(null);
            this.b = Object.create(null);
            this.c = Object.create(null);
            this.d = 'http';
            this.e = null;
            this.f = '/';
        }
        setPreferredWebSchema(schema) {
            this.d = schema;
        }
        setDelegate(delegate) {
            this.e = delegate;
        }
        setServerRootPath(product, serverBasePath) {
            this.f = $Tg(product, serverBasePath);
        }
        getServerRootPath() {
            return this.f;
        }
        get g() {
            return paths.$gc.join(this.f, Schemas.vscodeRemoteResource);
        }
        set(authority, host, port) {
            this.a[authority] = host;
            this.b[authority] = port;
        }
        setConnectionToken(authority, connectionToken) {
            this.c[authority] = connectionToken;
        }
        getPreferredWebSchema() {
            return this.d;
        }
        rewrite(uri) {
            if (this.e) {
                try {
                    return this.e(uri);
                }
                catch (err) {
                    errors.$Y(err);
                    return uri;
                }
            }
            const authority = uri.authority;
            let host = this.a[authority];
            if (host && host.indexOf(':') !== -1 && host.indexOf('[') === -1) {
                host = `[${host}]`;
            }
            const port = this.b[authority];
            const connectionToken = this.c[authority];
            let query = `path=${encodeURIComponent(uri.path)}`;
            if (typeof connectionToken === 'string') {
                query += `&${exports.$Rg}=${encodeURIComponent(connectionToken)}`;
            }
            return uri_1.URI.from({
                scheme: platform.$p ? this.d : Schemas.vscodeRemoteResource,
                authority: `${host}:${port}`,
                path: this.g,
                query
            });
        }
    }
    exports.$Sg = new RemoteAuthoritiesImpl();
    function $Tg(product, basePath) {
        return paths.$gc.join(basePath ?? '/', `${product.quality ?? 'oss'}-${product.commit ?? 'dev'}`);
    }
    exports.$Ug = 'vs/../../extensions';
    exports.$Vg = 'vs/../../node_modules';
    exports.$Wg = 'vs/../../node_modules.asar';
    exports.$Xg = 'vs/../../node_modules.asar.unpacked';
    exports.$Yg = 'vscode-app';
    class FileAccessImpl {
        static { this.a = exports.$Yg; }
        /**
         * Returns a URI to use in contexts where the browser is responsible
         * for loading (e.g. fetch()) or when used within the DOM.
         *
         * **Note:** use `dom.ts#asCSSUrl` whenever the URL is to be used in CSS context.
         */
        asBrowserUri(resourcePath) {
            const uri = this.b(resourcePath, require);
            return this.uriToBrowserUri(uri);
        }
        /**
         * Returns a URI to use in contexts where the browser is responsible
         * for loading (e.g. fetch()) or when used within the DOM.
         *
         * **Note:** use `dom.ts#asCSSUrl` whenever the URL is to be used in CSS context.
         */
        uriToBrowserUri(uri) {
            // Handle remote URIs via `RemoteAuthorities`
            if (uri.scheme === Schemas.vscodeRemote) {
                return exports.$Sg.rewrite(uri);
            }
            // Convert to `vscode-file` resource..
            if (
            // ...only ever for `file` resources
            uri.scheme === Schemas.file &&
                (
                // ...and we run in native environments
                platform.$n ||
                    // ...or web worker extensions on desktop
                    (platform.$r === `${Schemas.vscodeFileResource}://${FileAccessImpl.a}`))) {
                return uri.with({
                    scheme: Schemas.vscodeFileResource,
                    // We need to provide an authority here so that it can serve
                    // as origin for network and loading matters in chromium.
                    // If the URI is not coming with an authority already, we
                    // add our own
                    authority: uri.authority || FileAccessImpl.a,
                    query: null,
                    fragment: null
                });
            }
            return uri;
        }
        /**
         * Returns the `file` URI to use in contexts where node.js
         * is responsible for loading.
         */
        asFileUri(resourcePath) {
            const uri = this.b(resourcePath, require);
            return this.uriToFileUri(uri);
        }
        /**
         * Returns the `file` URI to use in contexts where node.js
         * is responsible for loading.
         */
        uriToFileUri(uri) {
            // Only convert the URI if it is `vscode-file:` scheme
            if (uri.scheme === Schemas.vscodeFileResource) {
                return uri.with({
                    scheme: Schemas.file,
                    // Only preserve the `authority` if it is different from
                    // our fallback authority. This ensures we properly preserve
                    // Windows UNC paths that come with their own authority.
                    authority: uri.authority !== FileAccessImpl.a ? uri.authority : null,
                    query: null,
                    fragment: null
                });
            }
            return uri;
        }
        b(uriOrModule, moduleIdToUrl) {
            if (uri_1.URI.isUri(uriOrModule)) {
                return uriOrModule;
            }
            return uri_1.URI.parse(moduleIdToUrl.toUrl(uriOrModule));
        }
    }
    exports.$Zg = new FileAccessImpl();
    var COI;
    (function (COI) {
        const coiHeaders = new Map([
            ['1', { 'Cross-Origin-Opener-Policy': 'same-origin' }],
            ['2', { 'Cross-Origin-Embedder-Policy': 'require-corp' }],
            ['3', { 'Cross-Origin-Opener-Policy': 'same-origin', 'Cross-Origin-Embedder-Policy': 'require-corp' }],
        ]);
        COI.CoopAndCoep = Object.freeze(coiHeaders.get('3'));
        const coiSearchParamName = 'vscode-coi';
        /**
         * Extract desired headers from `vscode-coi` invocation
         */
        function getHeadersFromQuery(url) {
            let params;
            if (typeof url === 'string') {
                params = new URL(url).searchParams;
            }
            else if (url instanceof URL) {
                params = url.searchParams;
            }
            else if (uri_1.URI.isUri(url)) {
                params = new URL(url.toString(true)).searchParams;
            }
            const value = params?.get(coiSearchParamName);
            if (!value) {
                return undefined;
            }
            return coiHeaders.get(value);
        }
        COI.getHeadersFromQuery = getHeadersFromQuery;
        /**
         * Add the `vscode-coi` query attribute based on wanting `COOP` and `COEP`. Will be a noop when `crossOriginIsolated`
         * isn't enabled the current context
         */
        function addSearchParam(urlOrSearch, coop, coep) {
            if (!globalThis.crossOriginIsolated) {
                // depends on the current context being COI
                return;
            }
            const value = coop && coep ? '3' : coep ? '2' : '1';
            if (urlOrSearch instanceof URLSearchParams) {
                urlOrSearch.set(coiSearchParamName, value);
            }
            else {
                urlOrSearch[coiSearchParamName] = value;
            }
        }
        COI.addSearchParam = addSearchParam;
    })(COI || (exports.COI = COI = {}));
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/























define(__m[20/*vs/base/common/resources*/], __M([0/*require*/,1/*exports*/,2/*vs/base/common/charCode*/,11/*vs/base/common/extpath*/,8/*vs/base/common/network*/,5/*vs/base/common/path*/,3/*vs/base/common/platform*/,4/*vs/base/common/strings*/,12/*vs/base/common/uri*/]), function (require, exports, charCode_1, extpath, network_1, paths, platform_1, strings_1, uri_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DataUri = exports.$oh = exports.$nh = exports.$mh = exports.$lh = exports.$kh = exports.$jh = exports.$ih = exports.$hh = exports.$gh = exports.$fh = exports.$eh = exports.$dh = exports.$ch = exports.$bh = exports.$ah = exports.$_g = exports.$$g = exports.$0g = exports.$9g = exports.$8g = void 0;
    exports.$7g = $7g;
    exports.$ph = $ph;
    exports.$qh = $qh;
    extpath = __importStar(extpath);
    paths = __importStar(paths);
    function $7g(uri) {
        return (0, uri_1.$wc)(uri, true);
    }
    class $8g {
        constructor(a) {
            this.a = a;
        }
        compare(uri1, uri2, ignoreFragment = false) {
            if (uri1 === uri2) {
                return 0;
            }
            return (0, strings_1.$yf)(this.getComparisonKey(uri1, ignoreFragment), this.getComparisonKey(uri2, ignoreFragment));
        }
        isEqual(uri1, uri2, ignoreFragment = false) {
            if (uri1 === uri2) {
                return true;
            }
            if (!uri1 || !uri2) {
                return false;
            }
            return this.getComparisonKey(uri1, ignoreFragment) === this.getComparisonKey(uri2, ignoreFragment);
        }
        getComparisonKey(uri, ignoreFragment = false) {
            return uri.with({
                path: this.a(uri) ? uri.path.toLowerCase() : undefined,
                fragment: ignoreFragment ? null : undefined
            }).toString();
        }
        ignorePathCasing(uri) {
            return this.a(uri);
        }
        isEqualOrParent(base, parentCandidate, ignoreFragment = false) {
            if (base.scheme === parentCandidate.scheme) {
                if (base.scheme === network_1.Schemas.file) {
                    return extpath.$Eg($7g(base), $7g(parentCandidate), this.a(base)) && base.query === parentCandidate.query && (ignoreFragment || base.fragment === parentCandidate.fragment);
                }
                if ((0, exports.$lh)(base.authority, parentCandidate.authority)) {
                    return extpath.$Eg(base.path, parentCandidate.path, this.a(base), '/') && base.query === parentCandidate.query && (ignoreFragment || base.fragment === parentCandidate.fragment);
                }
            }
            return false;
        }
        // --- path math
        joinPath(resource, ...pathFragment) {
            return uri_1.URI.joinPath(resource, ...pathFragment);
        }
        basenameOrAuthority(resource) {
            return (0, exports.$dh)(resource) || resource.authority;
        }
        basename(resource) {
            return paths.$gc.basename(resource.path);
        }
        extname(resource) {
            return paths.$gc.extname(resource.path);
        }
        dirname(resource) {
            if (resource.path.length === 0) {
                return resource;
            }
            let dirname;
            if (resource.scheme === network_1.Schemas.file) {
                dirname = uri_1.URI.file(paths.$mc($7g(resource))).path;
            }
            else {
                dirname = paths.$gc.dirname(resource.path);
                if (resource.authority && dirname.length && dirname.charCodeAt(0) !== charCode_1.CharCode.Slash) {
                    console.error(`dirname("${resource.toString})) resulted in a relative path`);
                    dirname = '/'; // If a URI contains an authority component, then the path component must either be empty or begin with a CharCode.Slash ("/") character
                }
            }
            return resource.with({
                path: dirname
            });
        }
        normalizePath(resource) {
            if (!resource.path.length) {
                return resource;
            }
            let normalizedPath;
            if (resource.scheme === network_1.Schemas.file) {
                normalizedPath = uri_1.URI.file(paths.$hc($7g(resource))).path;
            }
            else {
                normalizedPath = paths.$gc.normalize(resource.path);
            }
            return resource.with({
                path: normalizedPath
            });
        }
        relativePath(from, to) {
            if (from.scheme !== to.scheme || !(0, exports.$lh)(from.authority, to.authority)) {
                return undefined;
            }
            if (from.scheme === network_1.Schemas.file) {
                const relativePath = paths.$lc($7g(from), $7g(to));
                return platform_1.$j ? extpath.$yg(relativePath) : relativePath;
            }
            let fromPath = from.path || '/';
            const toPath = to.path || '/';
            if (this.a(from)) {
                // make casing of fromPath match toPath
                let i = 0;
                for (const len = Math.min(fromPath.length, toPath.length); i < len; i++) {
                    if (fromPath.charCodeAt(i) !== toPath.charCodeAt(i)) {
                        if (fromPath.charAt(i).toLowerCase() !== toPath.charAt(i).toLowerCase()) {
                            break;
                        }
                    }
                }
                fromPath = toPath.substr(0, i) + fromPath.substr(i);
            }
            return paths.$gc.relative(fromPath, toPath);
        }
        resolvePath(base, path) {
            if (base.scheme === network_1.Schemas.file) {
                const newURI = uri_1.URI.file(paths.$kc($7g(base), path));
                return base.with({
                    authority: newURI.authority,
                    path: newURI.path
                });
            }
            path = extpath.$zg(path); // we allow path to be a windows path
            return base.with({
                path: paths.$gc.resolve(base.path, path)
            });
        }
        // --- misc
        isAbsolutePath(resource) {
            return !!resource.path && resource.path[0] === '/';
        }
        isEqualAuthority(a1, a2) {
            return a1 === a2 || (a1 !== undefined && a2 !== undefined && (0, strings_1.$Ff)(a1, a2));
        }
        hasTrailingPathSeparator(resource, sep = paths.sep) {
            if (resource.scheme === network_1.Schemas.file) {
                const fsp = $7g(resource);
                return fsp.length > extpath.$Ag(fsp).length && fsp[fsp.length - 1] === sep;
            }
            else {
                const p = resource.path;
                return (p.length > 1 && p.charCodeAt(p.length - 1) === charCode_1.CharCode.Slash) && !(/^[a-zA-Z]:(\/$|\\$)/.test(resource.fsPath)); // ignore the slash at offset 0
            }
        }
        removeTrailingPathSeparator(resource, sep = paths.sep) {
            // Make sure that the path isn't a drive letter. A trailing separator there is not removable.
            if ((0, exports.$mh)(resource, sep)) {
                return resource.with({ path: resource.path.substr(0, resource.path.length - 1) });
            }
            return resource;
        }
        addTrailingPathSeparator(resource, sep = paths.sep) {
            let isRootSep = false;
            if (resource.scheme === network_1.Schemas.file) {
                const fsp = $7g(resource);
                isRootSep = ((fsp !== undefined) && (fsp.length === extpath.$Ag(fsp).length) && (fsp[fsp.length - 1] === sep));
            }
            else {
                sep = '/';
                const p = resource.path;
                isRootSep = p.length === 1 && p.charCodeAt(p.length - 1) === charCode_1.CharCode.Slash;
            }
            if (!isRootSep && !(0, exports.$mh)(resource, sep)) {
                return resource.with({ path: resource.path + '/' });
            }
            return resource;
        }
    }
    exports.$8g = $8g;
    /**
     * Unbiased utility that takes uris "as they are". This means it can be interchanged with
     * uri#toString() usages. The following is true
     * ```
     * assertEqual(aUri.toString() === bUri.toString(), exturi.isEqual(aUri, bUri))
     * ```
     */
    exports.$9g = new $8g(() => false);
    /**
     * BIASED utility that _mostly_ ignored the case of urs paths. ONLY use this util if you
     * understand what you are doing.
     *
     * This utility is INCOMPATIBLE with `uri.toString()`-usages and both CANNOT be used interchanged.
     *
     * When dealing with uris from files or documents, `extUri` (the unbiased friend)is sufficient
     * because those uris come from a "trustworthy source". When creating unknown uris it's always
     * better to use `IUriIdentityService` which exposes an `IExtUri`-instance which knows when path
     * casing matters.
     */
    exports.$0g = new $8g(uri => {
        // A file scheme resource is in the same platform as code, so ignore case for non linux platforms
        // Resource can be from another platform. Lowering the case as an hack. Should come from File system provider
        return uri.scheme === network_1.Schemas.file ? !platform_1.$l : true;
    });
    /**
     * BIASED utility that always ignores the casing of uris paths. ONLY use this util if you
     * understand what you are doing.
     *
     * This utility is INCOMPATIBLE with `uri.toString()`-usages and both CANNOT be used interchanged.
     *
     * When dealing with uris from files or documents, `extUri` (the unbiased friend)is sufficient
     * because those uris come from a "trustworthy source". When creating unknown uris it's always
     * better to use `IUriIdentityService` which exposes an `IExtUri`-instance which knows when path
     * casing matters.
     */
    exports.$$g = new $8g(_ => true);
    exports.$_g = exports.$9g.isEqual.bind(exports.$9g);
    exports.$ah = exports.$9g.isEqualOrParent.bind(exports.$9g);
    exports.$bh = exports.$9g.getComparisonKey.bind(exports.$9g);
    exports.$ch = exports.$9g.basenameOrAuthority.bind(exports.$9g);
    exports.$dh = exports.$9g.basename.bind(exports.$9g);
    exports.$eh = exports.$9g.extname.bind(exports.$9g);
    exports.$fh = exports.$9g.dirname.bind(exports.$9g);
    exports.$gh = exports.$9g.joinPath.bind(exports.$9g);
    exports.$hh = exports.$9g.normalizePath.bind(exports.$9g);
    exports.$ih = exports.$9g.relativePath.bind(exports.$9g);
    exports.$jh = exports.$9g.resolvePath.bind(exports.$9g);
    exports.$kh = exports.$9g.isAbsolutePath.bind(exports.$9g);
    exports.$lh = exports.$9g.isEqualAuthority.bind(exports.$9g);
    exports.$mh = exports.$9g.hasTrailingPathSeparator.bind(exports.$9g);
    exports.$nh = exports.$9g.removeTrailingPathSeparator.bind(exports.$9g);
    exports.$oh = exports.$9g.addTrailingPathSeparator.bind(exports.$9g);
    //#endregion
    function $ph(items, resourceAccessor) {
        const distinctParents = [];
        for (let i = 0; i < items.length; i++) {
            const candidateResource = resourceAccessor(items[i]);
            if (items.some((otherItem, index) => {
                if (index === i) {
                    return false;
                }
                return (0, exports.$ah)(candidateResource, resourceAccessor(otherItem));
            })) {
                continue;
            }
            distinctParents.push(items[i]);
        }
        return distinctParents;
    }
    /**
     * Data URI related helpers.
     */
    var DataUri;
    (function (DataUri) {
        DataUri.META_DATA_LABEL = 'label';
        DataUri.META_DATA_DESCRIPTION = 'description';
        DataUri.META_DATA_SIZE = 'size';
        DataUri.META_DATA_MIME = 'mime';
        function parseMetaData(dataUri) {
            const metadata = new Map();
            // Given a URI of:  data:image/png;size:2313;label:SomeLabel;description:SomeDescription;base64,77+9UE5...
            // the metadata is: size:2313;label:SomeLabel;description:SomeDescription
            const meta = dataUri.path.substring(dataUri.path.indexOf(';') + 1, dataUri.path.lastIndexOf(';'));
            meta.split(';').forEach(property => {
                const [key, value] = property.split(':');
                if (key && value) {
                    metadata.set(key, value);
                }
            });
            // Given a URI of:  data:image/png;size:2313;label:SomeLabel;description:SomeDescription;base64,77+9UE5...
            // the mime is: image/png
            const mime = dataUri.path.substring(0, dataUri.path.indexOf(';'));
            if (mime) {
                metadata.set(DataUri.META_DATA_MIME, mime);
            }
            return metadata;
        }
        DataUri.parseMetaData = parseMetaData;
    })(DataUri || (exports.DataUri = DataUri = {}));
    function $qh(resource, authority, localScheme) {
        if (authority) {
            let path = resource.path;
            if (path && path[0] !== paths.$gc.sep) {
                path = paths.$gc.sep + path;
            }
            return resource.with({ scheme: localScheme, authority, path });
        }
        return resource.with({ scheme: localScheme });
    }
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(__m[21/*vs/base/common/async*/], __M([0/*require*/,1/*exports*/,40/*vs/base/common/cancellation*/,6/*vs/base/common/errors*/,22/*vs/base/common/event*/,10/*vs/base/common/lifecycle*/,20/*vs/base/common/resources*/,3/*vs/base/common/platform*/,19/*vs/base/common/symbols*/,18/*vs/base/common/lazy*/]), function (require, exports, cancellation_1, errors_1, event_1, lifecycle_1, resources_1, platform_1, symbols_1, lazy_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.$9h = exports.$7h = exports.$6h = exports.$5h = exports.$4h = exports.Promises = exports.$3h = exports.$2h = exports.$1h = exports.$Yh = exports.$Xh = exports.$Wh = exports.$Vh = exports.$Uh = exports.$Th = exports.$Sh = exports.$Rh = exports.$Qh = exports.$Ph = exports.$Oh = exports.$Nh = exports.$Mh = exports.$Lh = exports.$Fh = exports.$Eh = exports.$Dh = exports.$Ch = exports.$Bh = exports.$Ah = exports.$zh = void 0;
    exports.$rh = $rh;
    exports.$sh = $sh;
    exports.$th = $th;
    exports.$uh = $uh;
    exports.$vh = $vh;
    exports.$wh = $wh;
    exports.$xh = $xh;
    exports.$yh = $yh;
    exports.$Gh = $Gh;
    exports.$Hh = $Hh;
    exports.$Ih = $Ih;
    exports.$Jh = $Jh;
    exports.$Kh = $Kh;
    exports.$Zh = $Zh;
    exports.$8h = $8h;
    function $rh(obj) {
        return !!obj && typeof obj.then === 'function';
    }
    function $sh(callback) {
        const source = new cancellation_1.$we();
        const thenable = callback(source.token);
        const promise = new Promise((resolve, reject) => {
            const subscription = source.token.onCancellationRequested(() => {
                subscription.dispose();
                reject(new errors_1.$4());
            });
            Promise.resolve(thenable).then(value => {
                subscription.dispose();
                source.dispose();
                resolve(value);
            }, err => {
                subscription.dispose();
                source.dispose();
                reject(err);
            });
        });
        return new class {
            cancel() {
                source.cancel();
                source.dispose();
            }
            then(resolve, reject) {
                return promise.then(resolve, reject);
            }
            catch(reject) {
                return this.then(undefined, reject);
            }
            finally(onfinally) {
                return promise.finally(onfinally);
            }
        };
    }
    function $th(promise, token, defaultValue) {
        return new Promise((resolve, reject) => {
            const ref = token.onCancellationRequested(() => {
                ref.dispose();
                resolve(defaultValue);
            });
            promise.then(resolve, reject).finally(() => ref.dispose());
        });
    }
    /**
     * Returns a promise that rejects with an {@CancellationError} as soon as the passed token is cancelled.
     * @see {@link $th}
     */
    function $uh(promise, token) {
        return new Promise((resolve, reject) => {
            const ref = token.onCancellationRequested(() => {
                ref.dispose();
                reject(new errors_1.$4());
            });
            promise.then(resolve, reject).finally(() => ref.dispose());
        });
    }
    /**
     * Returns as soon as one of the promises resolves or rejects and cancels remaining promises
     */
    async function $vh(cancellablePromises) {
        let resolvedPromiseIndex = -1;
        const promises = cancellablePromises.map((promise, index) => promise.then(result => { resolvedPromiseIndex = index; return result; }));
        try {
            const result = await Promise.race(promises);
            return result;
        }
        finally {
            cancellablePromises.forEach((cancellablePromise, index) => {
                if (index !== resolvedPromiseIndex) {
                    cancellablePromise.cancel();
                }
            });
        }
    }
    function $wh(promise, timeout, onTimeout) {
        let promiseResolve = undefined;
        const timer = setTimeout(() => {
            promiseResolve?.(undefined);
            onTimeout?.();
        }, timeout);
        return Promise.race([
            promise.finally(() => clearTimeout(timer)),
            new Promise(resolve => promiseResolve = resolve)
        ]);
    }
    function $xh(callback) {
        return new Promise((resolve, reject) => {
            const item = callback();
            if ($rh(item)) {
                item.then(resolve, reject);
            }
            else {
                resolve(item);
            }
        });
    }
    /**
     * Creates and returns a new promise, plus its `resolve` and `reject` callbacks.
     *
     * Replace with standardized [`Promise.withResolvers`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/withResolvers) once it is supported
     */
    function $yh() {
        let resolve;
        let reject;
        const promise = new Promise((res, rej) => {
            resolve = res;
            reject = rej;
        });
        return { promise, resolve: resolve, reject: reject };
    }
    /**
     * A helper to prevent accumulation of sequential async tasks.
     *
     * Imagine a mail man with the sole task of delivering letters. As soon as
     * a letter submitted for delivery, he drives to the destination, delivers it
     * and returns to his base. Imagine that during the trip, N more letters were submitted.
     * When the mail man returns, he picks those N letters and delivers them all in a
     * single trip. Even though N+1 submissions occurred, only 2 deliveries were made.
     *
     * The throttler implements this via the queue() method, by providing it a task
     * factory. Following the example:
     *
     * 		const throttler = new Throttler();
     * 		const letters = [];
     *
     * 		function deliver() {
     * 			const lettersToDeliver = letters;
     * 			letters = [];
     * 			return makeTheTrip(lettersToDeliver);
     * 		}
     *
     * 		function onLetterReceived(l) {
     * 			letters.push(l);
     * 			throttler.queue(deliver);
     * 		}
     */
    class $zh {
        constructor() {
            this.f = false;
            this.a = null;
            this.b = null;
            this.d = null;
        }
        queue(promiseFactory) {
            if (this.f) {
                return Promise.reject(new Error('Throttler is disposed'));
            }
            if (this.a) {
                this.d = promiseFactory;
                if (!this.b) {
                    const onComplete = () => {
                        this.b = null;
                        if (this.f) {
                            return;
                        }
                        const result = this.queue(this.d);
                        this.d = null;
                        return result;
                    };
                    this.b = new Promise(resolve => {
                        this.a.then(onComplete, onComplete).then(resolve);
                    });
                }
                return new Promise((resolve, reject) => {
                    this.b.then(resolve, reject);
                });
            }
            this.a = promiseFactory();
            return new Promise((resolve, reject) => {
                this.a.then((result) => {
                    this.a = null;
                    resolve(result);
                }, (err) => {
                    this.a = null;
                    reject(err);
                });
            });
        }
        dispose() {
            this.f = true;
        }
    }
    exports.$zh = $zh;
    class $Ah {
        constructor() {
            this.a = Promise.resolve(null);
        }
        queue(promiseTask) {
            return this.a = this.a.then(() => promiseTask(), () => promiseTask());
        }
    }
    exports.$Ah = $Ah;
    class $Bh {
        constructor() {
            this.a = new Map();
        }
        queue(key, promiseTask) {
            const runningPromise = this.a.get(key) ?? Promise.resolve();
            const newPromise = runningPromise
                .catch(() => { })
                .then(promiseTask)
                .finally(() => {
                if (this.a.get(key) === newPromise) {
                    this.a.delete(key);
                }
            });
            this.a.set(key, newPromise);
            return newPromise;
        }
    }
    exports.$Bh = $Bh;
    const timeoutDeferred = (timeout, fn) => {
        let scheduled = true;
        const handle = setTimeout(() => {
            scheduled = false;
            fn();
        }, timeout);
        return {
            isTriggered: () => scheduled,
            dispose: () => {
                clearTimeout(handle);
                scheduled = false;
            },
        };
    };
    const microtaskDeferred = (fn) => {
        let scheduled = true;
        queueMicrotask(() => {
            if (scheduled) {
                scheduled = false;
                fn();
            }
        });
        return {
            isTriggered: () => scheduled,
            dispose: () => { scheduled = false; },
        };
    };
    /**
     * A helper to delay (debounce) execution of a task that is being requested often.
     *
     * Following the throttler, now imagine the mail man wants to optimize the number of
     * trips proactively. The trip itself can be long, so he decides not to make the trip
     * as soon as a letter is submitted. Instead he waits a while, in case more
     * letters are submitted. After said waiting period, if no letters were submitted, he
     * decides to make the trip. Imagine that N more letters were submitted after the first
     * one, all within a short period of time between each other. Even though N+1
     * submissions occurred, only 1 delivery was made.
     *
     * The delayer offers this behavior via the trigger() method, into which both the task
     * to be executed and the waiting period (delay) must be passed in as arguments. Following
     * the example:
     *
     * 		const delayer = new Delayer(WAITING_PERIOD);
     * 		const letters = [];
     *
     * 		function letterReceived(l) {
     * 			letters.push(l);
     * 			delayer.trigger(() => { return makeTheTrip(); });
     * 		}
     */
    class $Ch {
        constructor(defaultDelay) {
            this.defaultDelay = defaultDelay;
            this.a = null;
            this.b = null;
            this.d = null;
            this.f = null;
            this.g = null;
        }
        trigger(task, delay = this.defaultDelay) {
            this.g = task;
            this.h();
            if (!this.b) {
                this.b = new Promise((resolve, reject) => {
                    this.d = resolve;
                    this.f = reject;
                }).then(() => {
                    this.b = null;
                    this.d = null;
                    if (this.g) {
                        const task = this.g;
                        this.g = null;
                        return task();
                    }
                    return undefined;
                });
            }
            const fn = () => {
                this.a = null;
                this.d?.(null);
            };
            this.a = delay === symbols_1.$ge ? microtaskDeferred(fn) : timeoutDeferred(delay, fn);
            return this.b;
        }
        isTriggered() {
            return !!this.a?.isTriggered();
        }
        cancel() {
            this.h();
            if (this.b) {
                this.f?.(new errors_1.$4());
                this.b = null;
            }
        }
        h() {
            this.a?.dispose();
            this.a = null;
        }
        dispose() {
            this.cancel();
        }
    }
    exports.$Ch = $Ch;
    /**
     * A helper to delay execution of a task that is being requested often, while
     * preventing accumulation of consecutive executions, while the task runs.
     *
     * The mail man is clever and waits for a certain amount of time, before going
     * out to deliver letters. While the mail man is going out, more letters arrive
     * and can only be delivered once he is back. Once he is back the mail man will
     * do one more trip to deliver the letters that have accumulated while he was out.
     */
    class $Dh {
        constructor(defaultDelay) {
            this.a = new $Ch(defaultDelay);
            this.b = new $zh();
        }
        trigger(promiseFactory, delay) {
            return this.a.trigger(() => this.b.queue(promiseFactory), delay);
        }
        isTriggered() {
            return this.a.isTriggered();
        }
        cancel() {
            this.a.cancel();
        }
        dispose() {
            this.a.dispose();
            this.b.dispose();
        }
    }
    exports.$Dh = $Dh;
    /**
     * A barrier that is initially closed and then becomes opened permanently.
     */
    class $Eh {
        constructor() {
            this.a = false;
            this.b = new Promise((c, e) => {
                this.d = c;
            });
        }
        isOpen() {
            return this.a;
        }
        open() {
            this.a = true;
            this.d(true);
        }
        wait() {
            return this.b;
        }
    }
    exports.$Eh = $Eh;
    /**
     * A barrier that is initially closed and then becomes opened permanently after a certain period of
     * time or when open is called explicitly
     */
    class $Fh extends $Eh {
        constructor(autoOpenTimeMs) {
            super();
            this.f = setTimeout(() => this.open(), autoOpenTimeMs);
        }
        open() {
            clearTimeout(this.f);
            super.open();
        }
    }
    exports.$Fh = $Fh;
    function $Gh(millis, token) {
        if (!token) {
            return $sh(token => $Gh(millis, token));
        }
        return new Promise((resolve, reject) => {
            const handle = setTimeout(() => {
                disposable.dispose();
                resolve();
            }, millis);
            const disposable = token.onCancellationRequested(() => {
                clearTimeout(handle);
                disposable.dispose();
                reject(new errors_1.$4());
            });
        });
    }
    /**
     * Creates a timeout that can be disposed using its returned value.
     * @param handler The timeout handler.
     * @param timeout An optional timeout in milliseconds.
     * @param store An optional {@link $Tc} that will have the timeout disposable managed automatically.
     *
     * @example
     * const store = new DisposableStore;
     * // Call the timeout after 1000ms at which point it will be automatically
     * // evicted from the store.
     * const timeoutDisposable = disposableTimeout(() => {}, 1000, store);
     *
     * if (foo) {
     *   // Cancel the timeout and evict it from store.
     *   timeoutDisposable.dispose();
     * }
     */
    function $Hh(handler, timeout = 0, store) {
        const timer = setTimeout(() => {
            handler();
            if (store) {
                disposable.dispose();
            }
        }, timeout);
        const disposable = (0, lifecycle_1.$Sc)(() => {
            clearTimeout(timer);
            store?.deleteAndLeak(disposable);
        });
        store?.add(disposable);
        return disposable;
    }
    /**
     * Runs the provided list of promise factories in sequential order. The returned
     * promise will complete to an array of results from each promise.
     */
    function $Ih(promiseFactories) {
        const results = [];
        let index = 0;
        const len = promiseFactories.length;
        function next() {
            return index < len ? promiseFactories[index++]() : null;
        }
        function thenHandler(result) {
            if (result !== undefined && result !== null) {
                results.push(result);
            }
            const n = next();
            if (n) {
                return n.then(thenHandler);
            }
            return Promise.resolve(results);
        }
        return Promise.resolve(null).then(thenHandler);
    }
    function $Jh(promiseFactories, shouldStop = t => !!t, defaultValue = null) {
        let index = 0;
        const len = promiseFactories.length;
        const loop = () => {
            if (index >= len) {
                return Promise.resolve(defaultValue);
            }
            const factory = promiseFactories[index++];
            const promise = Promise.resolve(factory());
            return promise.then(result => {
                if (shouldStop(result)) {
                    return Promise.resolve(result);
                }
                return loop();
            });
        };
        return loop();
    }
    function $Kh(promiseList, shouldStop = t => !!t, defaultValue = null) {
        if (promiseList.length === 0) {
            return Promise.resolve(defaultValue);
        }
        let todo = promiseList.length;
        const finish = () => {
            todo = -1;
            for (const promise of promiseList) {
                promise.cancel?.();
            }
        };
        return new Promise((resolve, reject) => {
            for (const promise of promiseList) {
                promise.then(result => {
                    if (--todo >= 0 && shouldStop(result)) {
                        finish();
                        resolve(result);
                    }
                    else if (todo === 0) {
                        resolve(defaultValue);
                    }
                })
                    .catch(err => {
                    if (--todo >= 0) {
                        finish();
                        reject(err);
                    }
                });
            }
        });
    }
    /**
     * A helper to queue N promises and run them all with a max degree of parallelism. The helper
     * ensures that at any time no more than M promises are running at the same time.
     */
    class $Lh {
        constructor(maxDegreeOfParalellism) {
            this.a = 0;
            this.b = false;
            this.f = maxDegreeOfParalellism;
            this.g = [];
            this.d = 0;
            this.h = new event_1.$le();
        }
        /**
         *
         * @returns A promise that resolved when all work is done (onDrained) or when
         * there is nothing to do
         */
        whenIdle() {
            return this.size > 0
                ? event_1.Event.toPromise(this.onDrained)
                : Promise.resolve();
        }
        get onDrained() {
            return this.h.event;
        }
        get size() {
            return this.a;
        }
        queue(factory) {
            if (this.b) {
                throw new Error('Object has been disposed');
            }
            this.a++;
            return new Promise((c, e) => {
                this.g.push({ factory, c, e });
                this.j();
            });
        }
        j() {
            while (this.g.length && this.d < this.f) {
                const iLimitedTask = this.g.shift();
                this.d++;
                const promise = iLimitedTask.factory();
                promise.then(iLimitedTask.c, iLimitedTask.e);
                promise.then(() => this.k(), () => this.k());
            }
        }
        k() {
            if (this.b) {
                return;
            }
            this.d--;
            if (--this.a === 0) {
                this.h.fire();
            }
            if (this.g.length > 0) {
                this.j();
            }
        }
        clear() {
            if (this.b) {
                throw new Error('Object has been disposed');
            }
            this.g.length = 0;
            this.a = this.d;
        }
        dispose() {
            this.b = true;
            this.g.length = 0; // stop further processing
            this.a = 0;
            this.h.dispose();
        }
    }
    exports.$Lh = $Lh;
    /**
     * A queue is handles one promise at a time and guarantees that at any time only one promise is executing.
     */
    class $Mh extends $Lh {
        constructor() {
            super(1);
        }
    }
    exports.$Mh = $Mh;
    /**
     * Same as `Queue`, ensures that only 1 task is executed at the same time. The difference to `Queue` is that
     * there is only 1 task about to be scheduled next. As such, calling `queue` while a task is executing will
     * replace the currently queued task until it executes.
     *
     * As such, the returned promise may not be from the factory that is passed in but from the next factory that
     * is running after having called `queue`.
     */
    class $Nh {
        constructor() {
            this.a = new $1h();
            this.b = 0;
        }
        queue(factory) {
            if (!this.a.isRunning()) {
                return this.a.run(this.b++, factory());
            }
            return this.a.queue(() => {
                return this.a.run(this.b++, factory());
            });
        }
    }
    exports.$Nh = $Nh;
    /**
     * A helper to organize queues per resource. The ResourceQueue makes sure to manage queues per resource
     * by disposing them once the queue is empty.
     */
    class $Oh {
        constructor() {
            this.a = new Map();
            this.b = new Set();
            this.d = undefined;
            this.f = 0;
        }
        async whenDrained() {
            if (this.g()) {
                return;
            }
            const promise = new $3h();
            this.b.add(promise);
            return promise.p;
        }
        g() {
            for (const [, queue] of this.a) {
                if (queue.size > 0) {
                    return false;
                }
            }
            return true;
        }
        queueSize(resource, extUri = resources_1.$9g) {
            const key = extUri.getComparisonKey(resource);
            return this.a.get(key)?.size ?? 0;
        }
        queueFor(resource, factory, extUri = resources_1.$9g) {
            const key = extUri.getComparisonKey(resource);
            let queue = this.a.get(key);
            if (!queue) {
                queue = new $Mh();
                const drainListenerId = this.f++;
                const drainListener = event_1.Event.once(queue.onDrained)(() => {
                    queue?.dispose();
                    this.a.delete(key);
                    this.h();
                    this.d?.deleteAndDispose(drainListenerId);
                    if (this.d?.size === 0) {
                        this.d.dispose();
                        this.d = undefined;
                    }
                });
                if (!this.d) {
                    this.d = new lifecycle_1.$4c();
                }
                this.d.set(drainListenerId, drainListener);
                this.a.set(key, queue);
            }
            return queue.queue(factory);
        }
        h() {
            if (!this.g()) {
                return; // not done yet
            }
            this.j();
        }
        j() {
            for (const drainer of this.b) {
                drainer.complete();
            }
            this.b.clear();
        }
        dispose() {
            for (const [, queue] of this.a) {
                queue.dispose();
            }
            this.a.clear();
            // Even though we might still have pending
            // tasks queued, after the queues have been
            // disposed, we can no longer track them, so
            // we release drainers to prevent hanging
            // promises when the resource queue is being
            // disposed.
            this.j();
            this.d?.dispose();
        }
    }
    exports.$Oh = $Oh;
    class $Ph {
        constructor(runner, timeout) {
            this.b = false;
            this.a = -1;
            if (typeof runner === 'function' && typeof timeout === 'number') {
                this.setIfNotSet(runner, timeout);
            }
        }
        dispose() {
            this.cancel();
            this.b = true;
        }
        cancel() {
            if (this.a !== -1) {
                clearTimeout(this.a);
                this.a = -1;
            }
        }
        cancelAndSet(runner, timeout) {
            if (this.b) {
                throw new errors_1.$bb(`Calling 'cancelAndSet' on a disposed TimeoutTimer`);
            }
            this.cancel();
            this.a = setTimeout(() => {
                this.a = -1;
                runner();
            }, timeout);
        }
        setIfNotSet(runner, timeout) {
            if (this.b) {
                throw new errors_1.$bb(`Calling 'setIfNotSet' on a disposed TimeoutTimer`);
            }
            if (this.a !== -1) {
                // timer is already set
                return;
            }
            this.a = setTimeout(() => {
                this.a = -1;
                runner();
            }, timeout);
        }
    }
    exports.$Ph = $Ph;
    class $Qh {
        constructor() {
            this.d = undefined;
            this.f = false;
        }
        cancel() {
            this.d?.dispose();
            this.d = undefined;
        }
        cancelAndSet(runner, interval, context = globalThis) {
            if (this.f) {
                throw new errors_1.$bb(`Calling 'cancelAndSet' on a disposed IntervalTimer`);
            }
            this.cancel();
            const handle = context.setInterval(() => {
                runner();
            }, interval);
            this.d = (0, lifecycle_1.$Sc)(() => {
                context.clearInterval(handle);
                this.d = undefined;
            });
        }
        dispose() {
            this.cancel();
            this.f = true;
        }
    }
    exports.$Qh = $Qh;
    class $Rh {
        constructor(runner, delay) {
            this.b = -1;
            this.a = runner;
            this.d = delay;
            this.f = this.g.bind(this);
        }
        /**
         * Dispose RunOnceScheduler
         */
        dispose() {
            this.cancel();
            this.a = null;
        }
        /**
         * Cancel current scheduled runner (if any).
         */
        cancel() {
            if (this.isScheduled()) {
                clearTimeout(this.b);
                this.b = -1;
            }
        }
        /**
         * Cancel previous runner (if any) & schedule a new runner.
         */
        schedule(delay = this.d) {
            this.cancel();
            this.b = setTimeout(this.f, delay);
        }
        get delay() {
            return this.d;
        }
        set delay(value) {
            this.d = value;
        }
        /**
         * Returns true if scheduled.
         */
        isScheduled() {
            return this.b !== -1;
        }
        flush() {
            if (this.isScheduled()) {
                this.cancel();
                this.h();
            }
        }
        g() {
            this.b = -1;
            if (this.a) {
                this.h();
            }
        }
        h() {
            this.a?.();
        }
    }
    exports.$Rh = $Rh;
    /**
     * Same as `RunOnceScheduler`, but doesn't count the time spent in sleep mode.
     * > **NOTE**: Only offers 1s resolution.
     *
     * When calling `setTimeout` with 3hrs, and putting the computer immediately to sleep
     * for 8hrs, `setTimeout` will fire **as soon as the computer wakes from sleep**. But
     * this scheduler will execute 3hrs **after waking the computer from sleep**.
     */
    class $Sh {
        constructor(runner, delay) {
            if (delay % 1000 !== 0) {
                console.warn(`ProcessTimeRunOnceScheduler resolution is 1s, ${delay}ms is not a multiple of 1000ms.`);
            }
            this.a = runner;
            this.b = delay;
            this.d = 0;
            this.f = -1;
            this.g = this.h.bind(this);
        }
        dispose() {
            this.cancel();
            this.a = null;
        }
        cancel() {
            if (this.isScheduled()) {
                clearInterval(this.f);
                this.f = -1;
            }
        }
        /**
         * Cancel previous runner (if any) & schedule a new runner.
         */
        schedule(delay = this.b) {
            if (delay % 1000 !== 0) {
                console.warn(`ProcessTimeRunOnceScheduler resolution is 1s, ${delay}ms is not a multiple of 1000ms.`);
            }
            this.cancel();
            this.d = Math.ceil(delay / 1000);
            this.f = setInterval(this.g, 1000);
        }
        /**
         * Returns true if scheduled.
         */
        isScheduled() {
            return this.f !== -1;
        }
        h() {
            this.d--;
            if (this.d > 0) {
                // still need to wait
                return;
            }
            // time elapsed
            clearInterval(this.f);
            this.f = -1;
            this.a?.();
        }
    }
    exports.$Sh = $Sh;
    class $Th extends $Rh {
        constructor(runner, timeout) {
            super(runner, timeout);
            this.j = [];
        }
        work(unit) {
            this.j.push(unit);
            if (!this.isScheduled()) {
                this.schedule();
            }
        }
        h() {
            const units = this.j;
            this.j = [];
            this.a?.(units);
        }
        dispose() {
            this.j = [];
            super.dispose();
        }
    }
    exports.$Th = $Th;
    /**
     * The `ThrottledWorker` will accept units of work `T`
     * to handle. The contract is:
     * * there is a maximum of units the worker can handle at once (via `maxWorkChunkSize`)
     * * there is a maximum of units the worker will keep in memory for processing (via `maxBufferedWork`)
     * * after having handled `maxWorkChunkSize` units, the worker needs to rest (via `throttleDelay`)
     */
    class $Uh extends lifecycle_1.$Uc {
        constructor(g, h) {
            super();
            this.g = g;
            this.h = h;
            this.a = [];
            this.b = this.B(new lifecycle_1.$Vc());
            this.f = false;
        }
        /**
         * The number of work units that are pending to be processed.
         */
        get pending() { return this.a.length; }
        /**
         * Add units to be worked on. Use `pending` to figure out
         * how many units are not yet processed after this method
         * was called.
         *
         * @returns whether the work was accepted or not. If the
         * worker is disposed, it will not accept any more work.
         * If the number of pending units would become larger
         * than `maxPendingWork`, more work will also not be accepted.
         */
        work(units) {
            if (this.f) {
                return false; // work not accepted: disposed
            }
            // Check for reaching maximum of pending work
            if (typeof this.g.maxBufferedWork === 'number') {
                // Throttled: simple check if pending + units exceeds max pending
                if (this.b.value) {
                    if (this.pending + units.length > this.g.maxBufferedWork) {
                        return false; // work not accepted: too much pending work
                    }
                }
                // Unthrottled: same as throttled, but account for max chunk getting
                // worked on directly without being pending
                else {
                    if (this.pending + units.length - this.g.maxWorkChunkSize > this.g.maxBufferedWork) {
                        return false; // work not accepted: too much pending work
                    }
                }
            }
            // Add to pending units first
            for (const unit of units) {
                this.a.push(unit);
            }
            // If not throttled, start working directly
            // Otherwise, when the throttle delay has
            // past, pending work will be worked again.
            if (!this.b.value) {
                this.j();
            }
            return true; // work accepted
        }
        j() {
            // Extract chunk to handle and handle it
            this.h(this.a.splice(0, this.g.maxWorkChunkSize));
            // If we have remaining work, schedule it after a delay
            if (this.a.length > 0) {
                this.b.value = new $Rh(() => {
                    this.b.clear();
                    this.j();
                }, this.g.throttleDelay);
                this.b.value.schedule();
            }
        }
        dispose() {
            super.dispose();
            this.f = true;
        }
    }
    exports.$Uh = $Uh;
    (function () {
        if (typeof globalThis.requestIdleCallback !== 'function' || typeof globalThis.cancelIdleCallback !== 'function') {
            exports.$Wh = (_targetWindow, runner) => {
                (0, platform_1.$C)(() => {
                    if (disposed) {
                        return;
                    }
                    const end = Date.now() + 15; // one frame at 64fps
                    const deadline = {
                        didTimeout: true,
                        timeRemaining() {
                            return Math.max(0, end - Date.now());
                        }
                    };
                    runner(Object.freeze(deadline));
                });
                let disposed = false;
                return {
                    dispose() {
                        if (disposed) {
                            return;
                        }
                        disposed = true;
                    }
                };
            };
        }
        else {
            exports.$Wh = (targetWindow, runner, timeout) => {
                const handle = targetWindow.requestIdleCallback(runner, typeof timeout === 'number' ? { timeout } : undefined);
                let disposed = false;
                return {
                    dispose() {
                        if (disposed) {
                            return;
                        }
                        disposed = true;
                        targetWindow.cancelIdleCallback(handle);
                    }
                };
            };
        }
        exports.$Vh = (runner) => (0, exports.$Wh)(globalThis, runner);
    })();
    class $Xh {
        constructor(targetWindow, executor) {
            this.g = false;
            this.d = () => {
                try {
                    this.j = executor();
                }
                catch (err) {
                    this.l = err;
                }
                finally {
                    this.g = true;
                }
            };
            this.f = (0, exports.$Wh)(targetWindow, () => this.d());
        }
        dispose() {
            this.f.dispose();
        }
        get value() {
            if (!this.g) {
                this.f.dispose();
                this.d();
            }
            if (this.l) {
                throw this.l;
            }
            return this.j;
        }
        get isInitialized() {
            return this.g;
        }
    }
    exports.$Xh = $Xh;
    /**
     * An `IdleValue` that always uses the current window (which might be throttled or inactive)
     *
     * **Note** that there is `dom.ts#WindowIdleValue` which is better suited when running inside a browser
     * context
     */
    class $Yh extends $Xh {
        constructor(executor) {
            super(globalThis, executor);
        }
    }
    exports.$Yh = $Yh;
    //#endregion
    async function $Zh(task, delay, retries) {
        let lastError;
        for (let i = 0; i < retries; i++) {
            try {
                return await task();
            }
            catch (error) {
                lastError = error;
                await $Gh(delay);
            }
        }
        throw lastError;
    }
    /**
     * @deprecated use `LimitedQueue` instead for an easier to use API
     */
    class $1h {
        isRunning(taskId) {
            if (typeof taskId === 'number') {
                return this.a?.taskId === taskId;
            }
            return !!this.a;
        }
        get running() {
            return this.a?.promise;
        }
        cancelRunning() {
            this.a?.cancel();
        }
        run(taskId, promise, onCancel) {
            this.a = { taskId, cancel: () => onCancel?.(), promise };
            promise.then(() => this.d(taskId), () => this.d(taskId));
            return promise;
        }
        d(taskId) {
            if (this.a && taskId === this.a.taskId) {
                // only set running to done if the promise finished that is associated with that taskId
                this.a = undefined;
                // schedule the queued task now that we are free if we have any
                this.f();
            }
        }
        f() {
            if (this.b) {
                const queued = this.b;
                this.b = undefined;
                // Run queued task and complete on the associated promise
                queued.run().then(queued.promiseResolve, queued.promiseReject);
            }
        }
        /**
         * Note: the promise to schedule as next run MUST itself call `run`.
         *       Otherwise, this sequentializer will report `false` for `isRunning`
         *       even when this task is running. Missing this detail means that
         *       suddenly multiple tasks will run in parallel.
         */
        queue(run) {
            // this is our first queued task, so we create associated promise with it
            // so that we can return a promise that completes when the task has
            // completed.
            if (!this.b) {
                const { promise, resolve: promiseResolve, reject: promiseReject } = $yh();
                this.b = {
                    run,
                    promise,
                    promiseResolve: promiseResolve,
                    promiseReject: promiseReject
                };
            }
            // we have a previous queued task, just overwrite it
            else {
                this.b.run = run;
            }
            return this.b.promise;
        }
        hasQueued() {
            return !!this.b;
        }
        async join() {
            return this.b?.promise ?? this.a?.promise;
        }
    }
    exports.$1h = $1h;
    //#endregion
    //#region
    /**
     * The `IntervalCounter` allows to count the number
     * of calls to `increment()` over a duration of
     * `interval`. This utility can be used to conditionally
     * throttle a frequent task when a certain threshold
     * is reached.
     */
    class $2h {
        constructor(d, f = () => Date.now()) {
            this.d = d;
            this.f = f;
            this.a = 0;
            this.b = 0;
        }
        increment() {
            const now = this.f();
            // We are outside of the range of `interval` and as such
            // start counting from 0 and remember the time
            if (now - this.a > this.d) {
                this.a = now;
                this.b = 0;
            }
            this.b++;
            return this.b;
        }
    }
    exports.$2h = $2h;
    var DeferredOutcome;
    (function (DeferredOutcome) {
        DeferredOutcome[DeferredOutcome["Resolved"] = 0] = "Resolved";
        DeferredOutcome[DeferredOutcome["Rejected"] = 1] = "Rejected";
    })(DeferredOutcome || (DeferredOutcome = {}));
    /**
     * Creates a promise whose resolution or rejection can be controlled imperatively.
     */
    class $3h {
        get isRejected() {
            return this.d?.outcome === DeferredOutcome.Rejected;
        }
        get isResolved() {
            return this.d?.outcome === DeferredOutcome.Resolved;
        }
        get isSettled() {
            return !!this.d;
        }
        get value() {
            return this.d?.outcome === DeferredOutcome.Resolved ? this.d?.value : undefined;
        }
        constructor() {
            this.p = new Promise((c, e) => {
                this.a = c;
                this.b = e;
            });
        }
        complete(value) {
            return new Promise(resolve => {
                this.a(value);
                this.d = { outcome: DeferredOutcome.Resolved, value };
                resolve();
            });
        }
        error(err) {
            return new Promise(resolve => {
                this.b(err);
                this.d = { outcome: DeferredOutcome.Rejected, value: err };
                resolve();
            });
        }
        cancel() {
            return this.error(new errors_1.$4());
        }
    }
    exports.$3h = $3h;
    //#endregion
    //#region Promises
    var Promises;
    (function (Promises) {
        /**
         * A drop-in replacement for `Promise.all` with the only difference
         * that the method awaits every promise to either fulfill or reject.
         *
         * Similar to `Promise.all`, only the first error will be returned
         * if any.
         */
        async function settled(promises) {
            let firstError = undefined;
            const result = await Promise.all(promises.map(promise => promise.then(value => value, error => {
                if (!firstError) {
                    firstError = error;
                }
                return undefined; // do not rethrow so that other promises can settle
            })));
            if (typeof firstError !== 'undefined') {
                throw firstError;
            }
            return result; // cast is needed and protected by the `throw` above
        }
        Promises.settled = settled;
        /**
         * A helper to create a new `Promise<T>` with a body that is a promise
         * itself. By default, an error that raises from the async body will
         * end up as a unhandled rejection, so this utility properly awaits the
         * body and rejects the promise as a normal promise does without async
         * body.
         *
         * This method should only be used in rare cases where otherwise `async`
         * cannot be used (e.g. when callbacks are involved that require this).
         */
        function withAsyncBody(bodyFn) {
            // eslint-disable-next-line no-async-promise-executor
            return new Promise(async (resolve, reject) => {
                try {
                    await bodyFn(resolve, reject);
                }
                catch (error) {
                    reject(error);
                }
            });
        }
        Promises.withAsyncBody = withAsyncBody;
    })(Promises || (exports.Promises = Promises = {}));
    class $4h {
        get value() { return this.a; }
        get error() { return this.b; }
        get isResolved() { return this.d; }
        constructor(promise) {
            this.a = undefined;
            this.b = undefined;
            this.d = false;
            this.promise = promise.then(value => {
                this.a = value;
                this.d = true;
                return value;
            }, error => {
                this.b = error;
                this.d = true;
                throw error;
            });
        }
        /**
         * Returns the resolved value.
         * Throws if the promise is not resolved yet.
         */
        requireValue() {
            if (!this.d) {
                throw new errors_1.$bb('Promise is not resolved yet');
            }
            if (this.b) {
                throw this.b;
            }
            return this.a;
        }
    }
    exports.$4h = $4h;
    class $5h {
        constructor(b) {
            this.b = b;
            this.a = new lazy_1.$T(() => new $4h(this.b()));
        }
        /**
         * Returns the resolved value.
         * Throws if the promise is not resolved yet.
         */
        requireValue() {
            return this.a.value.requireValue();
        }
        /**
         * Returns the promise (and triggers a computation of the promise if not yet done so).
         */
        getPromise() {
            return this.a.value.promise;
        }
        /**
         * Reads the current value without triggering a computation of the promise.
         */
        get currentValue() {
            return this.a.rawValue?.value;
        }
    }
    exports.$5h = $5h;
    //#endregion
    //#region
    var AsyncIterableSourceState;
    (function (AsyncIterableSourceState) {
        AsyncIterableSourceState[AsyncIterableSourceState["Initial"] = 0] = "Initial";
        AsyncIterableSourceState[AsyncIterableSourceState["DoneOK"] = 1] = "DoneOK";
        AsyncIterableSourceState[AsyncIterableSourceState["DoneError"] = 2] = "DoneError";
    })(AsyncIterableSourceState || (AsyncIterableSourceState = {}));
    /**
     * A rich implementation for an `AsyncIterable<T>`.
     */
    class $6h {
        static fromArray(items) {
            return new $6h((writer) => {
                writer.emitMany(items);
            });
        }
        static fromPromise(promise) {
            return new $6h(async (emitter) => {
                emitter.emitMany(await promise);
            });
        }
        static fromPromises(promises) {
            return new $6h(async (emitter) => {
                await Promise.all(promises.map(async (p) => emitter.emitOne(await p)));
            });
        }
        static merge(iterables) {
            return new $6h(async (emitter) => {
                await Promise.all(iterables.map(async (iterable) => {
                    for await (const item of iterable) {
                        emitter.emitOne(item);
                    }
                }));
            });
        }
        static { this.EMPTY = $6h.fromArray([]); }
        constructor(executor, onReturn) {
            this.a = AsyncIterableSourceState.Initial;
            this.b = [];
            this.d = null;
            this.f = onReturn;
            this.g = new event_1.$le();
            queueMicrotask(async () => {
                const writer = {
                    emitOne: (item) => this.h(item),
                    emitMany: (items) => this.j(items),
                    reject: (error) => this.l(error)
                };
                try {
                    await Promise.resolve(executor(writer));
                    this.k();
                }
                catch (err) {
                    this.l(err);
                }
                finally {
                    writer.emitOne = undefined;
                    writer.emitMany = undefined;
                    writer.reject = undefined;
                }
            });
        }
        [Symbol.asyncIterator]() {
            let i = 0;
            return {
                next: async () => {
                    do {
                        if (this.a === AsyncIterableSourceState.DoneError) {
                            throw this.d;
                        }
                        if (i < this.b.length) {
                            return { done: false, value: this.b[i++] };
                        }
                        if (this.a === AsyncIterableSourceState.DoneOK) {
                            return { done: true, value: undefined };
                        }
                        await event_1.Event.toPromise(this.g.event);
                    } while (true);
                },
                return: async () => {
                    this.f?.();
                    return { done: true, value: undefined };
                }
            };
        }
        static map(iterable, mapFn) {
            return new $6h(async (emitter) => {
                for await (const item of iterable) {
                    emitter.emitOne(mapFn(item));
                }
            });
        }
        map(mapFn) {
            return $6h.map(this, mapFn);
        }
        static filter(iterable, filterFn) {
            return new $6h(async (emitter) => {
                for await (const item of iterable) {
                    if (filterFn(item)) {
                        emitter.emitOne(item);
                    }
                }
            });
        }
        filter(filterFn) {
            return $6h.filter(this, filterFn);
        }
        static coalesce(iterable) {
            return $6h.filter(iterable, item => !!item);
        }
        coalesce() {
            return $6h.coalesce(this);
        }
        static async toPromise(iterable) {
            const result = [];
            for await (const item of iterable) {
                result.push(item);
            }
            return result;
        }
        toPromise() {
            return $6h.toPromise(this);
        }
        /**
         * The value will be appended at the end.
         *
         * **NOTE** If `resolve()` or `reject()` have already been called, this method has no effect.
         */
        h(value) {
            if (this.a !== AsyncIterableSourceState.Initial) {
                return;
            }
            // it is important to add new values at the end,
            // as we may have iterators already running on the array
            this.b.push(value);
            this.g.fire();
        }
        /**
         * The values will be appended at the end.
         *
         * **NOTE** If `resolve()` or `reject()` have already been called, this method has no effect.
         */
        j(values) {
            if (this.a !== AsyncIterableSourceState.Initial) {
                return;
            }
            // it is important to add new values at the end,
            // as we may have iterators already running on the array
            this.b = this.b.concat(values);
            this.g.fire();
        }
        /**
         * Calling `resolve()` will mark the result array as complete.
         *
         * **NOTE** `resolve()` must be called, otherwise all consumers of this iterable will hang indefinitely, similar to a non-resolved promise.
         * **NOTE** If `resolve()` or `reject()` have already been called, this method has no effect.
         */
        k() {
            if (this.a !== AsyncIterableSourceState.Initial) {
                return;
            }
            this.a = AsyncIterableSourceState.DoneOK;
            this.g.fire();
        }
        /**
         * Writing an error will permanently invalidate this iterable.
         * The current users will receive an error thrown, as will all future users.
         *
         * **NOTE** If `resolve()` or `reject()` have already been called, this method has no effect.
         */
        l(error) {
            if (this.a !== AsyncIterableSourceState.Initial) {
                return;
            }
            this.a = AsyncIterableSourceState.DoneError;
            this.d = error;
            this.g.fire();
        }
    }
    exports.$6h = $6h;
    class $7h extends $6h {
        constructor(m, executor) {
            super(executor);
            this.m = m;
        }
        cancel() {
            this.m.cancel();
        }
    }
    exports.$7h = $7h;
    function $8h(callback) {
        const source = new cancellation_1.$we();
        const innerIterable = callback(source.token);
        return new $7h(source, async (emitter) => {
            const subscription = source.token.onCancellationRequested(() => {
                subscription.dispose();
                source.dispose();
                emitter.reject(new errors_1.$4());
            });
            try {
                for await (const item of innerIterable) {
                    if (source.token.isCancellationRequested) {
                        // canceled in the meantime
                        return;
                    }
                    emitter.emitOne(item);
                }
                subscription.dispose();
                source.dispose();
            }
            catch (err) {
                subscription.dispose();
                source.dispose();
                emitter.reject(err);
            }
        });
    }
    class $9h {
        /**
         *
         * @param onReturn A function that will be called when consuming the async iterable
         * has finished by the consumer, e.g the for-await-loop has be existed (break, return) early.
         * This is NOT called when resolving this source by its owner.
         */
        constructor(onReturn) {
            this.a = new $3h();
            this.b = new $6h(emitter => {
                if (earlyError) {
                    emitter.reject(earlyError);
                    return;
                }
                if (earlyItems) {
                    emitter.emitMany(earlyItems);
                }
                this.d = (error) => emitter.reject(error);
                this.f = (item) => emitter.emitOne(item);
                return this.a.p;
            }, onReturn);
            let earlyError;
            let earlyItems;
            this.f = (item) => {
                if (!earlyItems) {
                    earlyItems = [];
                }
                earlyItems.push(item);
            };
            this.d = (error) => {
                if (!earlyError) {
                    earlyError = error;
                }
            };
        }
        get asyncIterable() {
            return this.b;
        }
        resolve() {
            this.a.complete();
        }
        reject(error) {
            this.d(error);
            this.a.complete();
        }
        emitOne(item) {
            this.f(item);
        }
    }
    exports.$9h = $9h;
});
//#endregion

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(__m[23/*vs/base/common/glob*/], __M([0/*require*/,1/*exports*/,41/*vs/base/common/arrays*/,21/*vs/base/common/async*/,2/*vs/base/common/charCode*/,11/*vs/base/common/extpath*/,24/*vs/base/common/map*/,5/*vs/base/common/path*/,3/*vs/base/common/platform*/,4/*vs/base/common/strings*/]), function (require, exports, arrays_1, async_1, charCode_1, extpath_1, map_1, path_1, platform_1, strings_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.$xk = exports.$wk = void 0;
    exports.$vk = $vk;
    exports.$yk = $yk;
    exports.$zk = $zk;
    exports.$Ak = $Ak;
    exports.$Bk = $Bk;
    exports.$Ck = $Ck;
    exports.$Dk = $Dk;
    exports.$Ek = $Ek;
    function $vk() {
        return Object.create(null);
    }
    exports.$wk = '**';
    exports.$xk = '/';
    const PATH_REGEX = '[/\\\\]'; // any slash or backslash
    const NO_PATH_REGEX = '[^/\\\\]'; // any non-slash and non-backslash
    const ALL_FORWARD_SLASHES = /\//g;
    function starsToRegExp(starCount, isLastPattern) {
        switch (starCount) {
            case 0:
                return '';
            case 1:
                return `${NO_PATH_REGEX}*?`; // 1 star matches any number of characters except path separator (/ and \) - non greedy (?)
            default:
                // Matches:  (Path Sep OR Path Val followed by Path Sep) 0-many times except when it's the last pattern
                //           in which case also matches (Path Sep followed by Path Val)
                // Group is non capturing because we don't need to capture at all (?:...)
                // Overall we use non-greedy matching because it could be that we match too much
                return `(?:${PATH_REGEX}|${NO_PATH_REGEX}+${PATH_REGEX}${isLastPattern ? `|${PATH_REGEX}${NO_PATH_REGEX}+` : ''})*?`;
        }
    }
    function $yk(pattern, splitChar) {
        if (!pattern) {
            return [];
        }
        const segments = [];
        let inBraces = false;
        let inBrackets = false;
        let curVal = '';
        for (const char of pattern) {
            switch (char) {
                case splitChar:
                    if (!inBraces && !inBrackets) {
                        segments.push(curVal);
                        curVal = '';
                        continue;
                    }
                    break;
                case '{':
                    inBraces = true;
                    break;
                case '}':
                    inBraces = false;
                    break;
                case '[':
                    inBrackets = true;
                    break;
                case ']':
                    inBrackets = false;
                    break;
            }
            curVal += char;
        }
        // Tail
        if (curVal) {
            segments.push(curVal);
        }
        return segments;
    }
    function parseRegExp(pattern) {
        if (!pattern) {
            return '';
        }
        let regEx = '';
        // Split up into segments for each slash found
        const segments = $yk(pattern, exports.$xk);
        // Special case where we only have globstars
        if (segments.every(segment => segment === exports.$wk)) {
            regEx = '.*';
        }
        // Build regex over segments
        else {
            let previousSegmentWasGlobStar = false;
            segments.forEach((segment, index) => {
                // Treat globstar specially
                if (segment === exports.$wk) {
                    // if we have more than one globstar after another, just ignore it
                    if (previousSegmentWasGlobStar) {
                        return;
                    }
                    regEx += starsToRegExp(2, index === segments.length - 1);
                }
                // Anything else, not globstar
                else {
                    // States
                    let inBraces = false;
                    let braceVal = '';
                    let inBrackets = false;
                    let bracketVal = '';
                    for (const char of segment) {
                        // Support brace expansion
                        if (char !== '}' && inBraces) {
                            braceVal += char;
                            continue;
                        }
                        // Support brackets
                        if (inBrackets && (char !== ']' || !bracketVal) /* ] is literally only allowed as first character in brackets to match it */) {
                            let res;
                            // range operator
                            if (char === '-') {
                                res = char;
                            }
                            // negation operator (only valid on first index in bracket)
                            else if ((char === '^' || char === '!') && !bracketVal) {
                                res = '^';
                            }
                            // glob split matching is not allowed within character ranges
                            // see http://man7.org/linux/man-pages/man7/glob.7.html
                            else if (char === exports.$xk) {
                                res = '';
                            }
                            // anything else gets escaped
                            else {
                                res = (0, strings_1.$hf)(char);
                            }
                            bracketVal += res;
                            continue;
                        }
                        switch (char) {
                            case '{':
                                inBraces = true;
                                continue;
                            case '[':
                                inBrackets = true;
                                continue;
                            case '}': {
                                const choices = $yk(braceVal, ',');
                                // Converts {foo,bar} => [foo|bar]
                                const braceRegExp = `(?:${choices.map(choice => parseRegExp(choice)).join('|')})`;
                                regEx += braceRegExp;
                                inBraces = false;
                                braceVal = '';
                                break;
                            }
                            case ']': {
                                regEx += ('[' + bracketVal + ']');
                                inBrackets = false;
                                bracketVal = '';
                                break;
                            }
                            case '?':
                                regEx += NO_PATH_REGEX; // 1 ? matches any single character except path separator (/ and \)
                                continue;
                            case '*':
                                regEx += starsToRegExp(1);
                                continue;
                            default:
                                regEx += (0, strings_1.$hf)(char);
                        }
                    }
                    // Tail: Add the slash we had split on if there is more to
                    // come and the remaining pattern is not a globstar
                    // For example if pattern: some/**/*.js we want the "/" after
                    // some to be included in the RegEx to prevent a folder called
                    // "something" to match as well.
                    if (index < segments.length - 1 && // more segments to come after this
                        (segments[index + 1] !== exports.$wk || // next segment is not **, or...
                            index + 2 < segments.length // ...next segment is ** but there is more segments after that
                        )) {
                        regEx += PATH_REGEX;
                    }
                }
                // update globstar state
                previousSegmentWasGlobStar = (segment === exports.$wk);
            });
        }
        return regEx;
    }
    // regexes to check for trivial glob patterns that just check for String#endsWith
    const T1 = /^\*\*\/\*\.[\w\.-]+$/; // **/*.something
    const T2 = /^\*\*\/([\w\.-]+)\/?$/; // **/something
    const T3 = /^{\*\*\/\*?[\w\.-]+\/?(,\*\*\/\*?[\w\.-]+\/?)*}$/; // {**/*.something,**/*.else} or {**/package.json,**/project.json}
    const T3_2 = /^{\*\*\/\*?[\w\.-]+(\/(\*\*)?)?(,\*\*\/\*?[\w\.-]+(\/(\*\*)?)?)*}$/; // Like T3, with optional trailing /**
    const T4 = /^\*\*((\/[\w\.-]+)+)\/?$/; // **/something/else
    const T5 = /^([\w\.-]+(\/[\w\.-]+)*)\/?$/; // something/else
    const CACHE = new map_1.$Dc(10000); // bounded to 10000 elements
    const FALSE = function () {
        return false;
    };
    const NULL = function () {
        return null;
    };
    function parsePattern(arg1, options) {
        if (!arg1) {
            return NULL;
        }
        // Handle relative patterns
        let pattern;
        if (typeof arg1 !== 'string') {
            pattern = arg1.pattern;
        }
        else {
            pattern = arg1;
        }
        // Whitespace trimming
        pattern = pattern.trim();
        // Check cache
        const patternKey = `${pattern}_${!!options.trimForExclusions}`;
        let parsedPattern = CACHE.get(patternKey);
        if (parsedPattern) {
            return wrapRelativePattern(parsedPattern, arg1);
        }
        // Check for Trivials
        let match;
        if (T1.test(pattern)) {
            parsedPattern = trivia1(pattern.substr(4), pattern); // common pattern: **/*.txt just need endsWith check
        }
        else if (match = T2.exec(trimForExclusions(pattern, options))) { // common pattern: **/some.txt just need basename check
            parsedPattern = trivia2(match[1], pattern);
        }
        else if ((options.trimForExclusions ? T3_2 : T3).test(pattern)) { // repetition of common patterns (see above) {**/*.txt,**/*.png}
            parsedPattern = trivia3(pattern, options);
        }
        else if (match = T4.exec(trimForExclusions(pattern, options))) { // common pattern: **/something/else just need endsWith check
            parsedPattern = trivia4and5(match[1].substr(1), pattern, true);
        }
        else if (match = T5.exec(trimForExclusions(pattern, options))) { // common pattern: something/else just need equals check
            parsedPattern = trivia4and5(match[1], pattern, false);
        }
        // Otherwise convert to pattern
        else {
            parsedPattern = toRegExp(pattern);
        }
        // Cache
        CACHE.set(patternKey, parsedPattern);
        return wrapRelativePattern(parsedPattern, arg1);
    }
    function wrapRelativePattern(parsedPattern, arg2) {
        if (typeof arg2 === 'string') {
            return parsedPattern;
        }
        const wrappedPattern = function (path, basename) {
            if (!(0, extpath_1.$Eg)(path, arg2.base, !platform_1.$l)) {
                // skip glob matching if `base` is not a parent of `path`
                return null;
            }
            // Given we have checked `base` being a parent of `path`,
            // we can now remove the `base` portion of the `path`
            // and only match on the remaining path components
            // For that we try to extract the portion of the `path`
            // that comes after the `base` portion. We have to account
            // for the fact that `base` might end in a path separator
            // (https://github.com/microsoft/vscode/issues/162498)
            return parsedPattern((0, strings_1.$mf)(path.substr(arg2.base.length), path_1.sep), basename);
        };
        // Make sure to preserve associated metadata
        wrappedPattern.allBasenames = parsedPattern.allBasenames;
        wrappedPattern.allPaths = parsedPattern.allPaths;
        wrappedPattern.basenames = parsedPattern.basenames;
        wrappedPattern.patterns = parsedPattern.patterns;
        return wrappedPattern;
    }
    function trimForExclusions(pattern, options) {
        return options.trimForExclusions && pattern.endsWith('/**') ? pattern.substr(0, pattern.length - 2) : pattern; // dropping **, tailing / is dropped later
    }
    // common pattern: **/*.txt just need endsWith check
    function trivia1(base, pattern) {
        return function (path, basename) {
            return typeof path === 'string' && path.endsWith(base) ? pattern : null;
        };
    }
    // common pattern: **/some.txt just need basename check
    function trivia2(base, pattern) {
        const slashBase = `/${base}`;
        const backslashBase = `\\${base}`;
        const parsedPattern = function (path, basename) {
            if (typeof path !== 'string') {
                return null;
            }
            if (basename) {
                return basename === base ? pattern : null;
            }
            return path === base || path.endsWith(slashBase) || path.endsWith(backslashBase) ? pattern : null;
        };
        const basenames = [base];
        parsedPattern.basenames = basenames;
        parsedPattern.patterns = [pattern];
        parsedPattern.allBasenames = basenames;
        return parsedPattern;
    }
    // repetition of common patterns (see above) {**/*.txt,**/*.png}
    function trivia3(pattern, options) {
        const parsedPatterns = aggregateBasenameMatches(pattern.slice(1, -1)
            .split(',')
            .map(pattern => parsePattern(pattern, options))
            .filter(pattern => pattern !== NULL), pattern);
        const patternsLength = parsedPatterns.length;
        if (!patternsLength) {
            return NULL;
        }
        if (patternsLength === 1) {
            return parsedPatterns[0];
        }
        const parsedPattern = function (path, basename) {
            for (let i = 0, n = parsedPatterns.length; i < n; i++) {
                if (parsedPatterns[i](path, basename)) {
                    return pattern;
                }
            }
            return null;
        };
        const withBasenames = parsedPatterns.find(pattern => !!pattern.allBasenames);
        if (withBasenames) {
            parsedPattern.allBasenames = withBasenames.allBasenames;
        }
        const allPaths = parsedPatterns.reduce((all, current) => current.allPaths ? all.concat(current.allPaths) : all, []);
        if (allPaths.length) {
            parsedPattern.allPaths = allPaths;
        }
        return parsedPattern;
    }
    // common patterns: **/something/else just need endsWith check, something/else just needs and equals check
    function trivia4and5(targetPath, pattern, matchPathEnds) {
        const usingPosixSep = path_1.sep === path_1.$gc.sep;
        const nativePath = usingPosixSep ? targetPath : targetPath.replace(ALL_FORWARD_SLASHES, path_1.sep);
        const nativePathEnd = path_1.sep + nativePath;
        const targetPathEnd = path_1.$gc.sep + targetPath;
        let parsedPattern;
        if (matchPathEnds) {
            parsedPattern = function (path, basename) {
                return typeof path === 'string' && ((path === nativePath || path.endsWith(nativePathEnd)) || !usingPosixSep && (path === targetPath || path.endsWith(targetPathEnd))) ? pattern : null;
            };
        }
        else {
            parsedPattern = function (path, basename) {
                return typeof path === 'string' && (path === nativePath || (!usingPosixSep && path === targetPath)) ? pattern : null;
            };
        }
        parsedPattern.allPaths = [(matchPathEnds ? '*/' : './') + targetPath];
        return parsedPattern;
    }
    function toRegExp(pattern) {
        try {
            const regExp = new RegExp(`^${parseRegExp(pattern)}$`);
            return function (path) {
                regExp.lastIndex = 0; // reset RegExp to its initial state to reuse it!
                return typeof path === 'string' && regExp.test(path) ? pattern : null;
            };
        }
        catch (error) {
            return NULL;
        }
    }
    function $zk(arg1, path, hasSibling) {
        if (!arg1 || typeof path !== 'string') {
            return false;
        }
        return $Ak(arg1)(path, undefined, hasSibling);
    }
    function $Ak(arg1, options = {}) {
        if (!arg1) {
            return FALSE;
        }
        // Glob with String
        if (typeof arg1 === 'string' || $Bk(arg1)) {
            const parsedPattern = parsePattern(arg1, options);
            if (parsedPattern === NULL) {
                return FALSE;
            }
            const resultPattern = function (path, basename) {
                return !!parsedPattern(path, basename);
            };
            if (parsedPattern.allBasenames) {
                resultPattern.allBasenames = parsedPattern.allBasenames;
            }
            if (parsedPattern.allPaths) {
                resultPattern.allPaths = parsedPattern.allPaths;
            }
            return resultPattern;
        }
        // Glob with Expression
        return parsedExpression(arg1, options);
    }
    function $Bk(obj) {
        const rp = obj;
        if (!rp) {
            return false;
        }
        return typeof rp.base === 'string' && typeof rp.pattern === 'string';
    }
    function $Ck(patternOrExpression) {
        return patternOrExpression.allBasenames || [];
    }
    function $Dk(patternOrExpression) {
        return patternOrExpression.allPaths || [];
    }
    function parsedExpression(expression, options) {
        const parsedPatterns = aggregateBasenameMatches(Object.getOwnPropertyNames(expression)
            .map(pattern => parseExpressionPattern(pattern, expression[pattern], options))
            .filter(pattern => pattern !== NULL));
        const patternsLength = parsedPatterns.length;
        if (!patternsLength) {
            return NULL;
        }
        if (!parsedPatterns.some(parsedPattern => !!parsedPattern.requiresSiblings)) {
            if (patternsLength === 1) {
                return parsedPatterns[0];
            }
            const resultExpression = function (path, basename) {
                let resultPromises = undefined;
                for (let i = 0, n = parsedPatterns.length; i < n; i++) {
                    const result = parsedPatterns[i](path, basename);
                    if (typeof result === 'string') {
                        return result; // immediately return as soon as the first expression matches
                    }
                    // If the result is a promise, we have to keep it for
                    // later processing and await the result properly.
                    if ((0, async_1.$rh)(result)) {
                        if (!resultPromises) {
                            resultPromises = [];
                        }
                        resultPromises.push(result);
                    }
                }
                // With result promises, we have to loop over each and
                // await the result before we can return any result.
                if (resultPromises) {
                    return (async () => {
                        for (const resultPromise of resultPromises) {
                            const result = await resultPromise;
                            if (typeof result === 'string') {
                                return result;
                            }
                        }
                        return null;
                    })();
                }
                return null;
            };
            const withBasenames = parsedPatterns.find(pattern => !!pattern.allBasenames);
            if (withBasenames) {
                resultExpression.allBasenames = withBasenames.allBasenames;
            }
            const allPaths = parsedPatterns.reduce((all, current) => current.allPaths ? all.concat(current.allPaths) : all, []);
            if (allPaths.length) {
                resultExpression.allPaths = allPaths;
            }
            return resultExpression;
        }
        const resultExpression = function (path, base, hasSibling) {
            let name = undefined;
            let resultPromises = undefined;
            for (let i = 0, n = parsedPatterns.length; i < n; i++) {
                // Pattern matches path
                const parsedPattern = parsedPatterns[i];
                if (parsedPattern.requiresSiblings && hasSibling) {
                    if (!base) {
                        base = (0, path_1.$nc)(path);
                    }
                    if (!name) {
                        name = base.substr(0, base.length - (0, path_1.$oc)(path).length);
                    }
                }
                const result = parsedPattern(path, base, name, hasSibling);
                if (typeof result === 'string') {
                    return result; // immediately return as soon as the first expression matches
                }
                // If the result is a promise, we have to keep it for
                // later processing and await the result properly.
                if ((0, async_1.$rh)(result)) {
                    if (!resultPromises) {
                        resultPromises = [];
                    }
                    resultPromises.push(result);
                }
            }
            // With result promises, we have to loop over each and
            // await the result before we can return any result.
            if (resultPromises) {
                return (async () => {
                    for (const resultPromise of resultPromises) {
                        const result = await resultPromise;
                        if (typeof result === 'string') {
                            return result;
                        }
                    }
                    return null;
                })();
            }
            return null;
        };
        const withBasenames = parsedPatterns.find(pattern => !!pattern.allBasenames);
        if (withBasenames) {
            resultExpression.allBasenames = withBasenames.allBasenames;
        }
        const allPaths = parsedPatterns.reduce((all, current) => current.allPaths ? all.concat(current.allPaths) : all, []);
        if (allPaths.length) {
            resultExpression.allPaths = allPaths;
        }
        return resultExpression;
    }
    function parseExpressionPattern(pattern, value, options) {
        if (value === false) {
            return NULL; // pattern is disabled
        }
        const parsedPattern = parsePattern(pattern, options);
        if (parsedPattern === NULL) {
            return NULL;
        }
        // Expression Pattern is <boolean>
        if (typeof value === 'boolean') {
            return parsedPattern;
        }
        // Expression Pattern is <SiblingClause>
        if (value) {
            const when = value.when;
            if (typeof when === 'string') {
                const result = (path, basename, name, hasSibling) => {
                    if (!hasSibling || !parsedPattern(path, basename)) {
                        return null;
                    }
                    const clausePattern = when.replace('$(basename)', () => name);
                    const matched = hasSibling(clausePattern);
                    return (0, async_1.$rh)(matched) ?
                        matched.then(match => match ? pattern : null) :
                        matched ? pattern : null;
                };
                result.requiresSiblings = true;
                return result;
            }
        }
        // Expression is anything
        return parsedPattern;
    }
    function aggregateBasenameMatches(parsedPatterns, result) {
        const basenamePatterns = parsedPatterns.filter(parsedPattern => !!parsedPattern.basenames);
        if (basenamePatterns.length < 2) {
            return parsedPatterns;
        }
        const basenames = basenamePatterns.reduce((all, current) => {
            const basenames = current.basenames;
            return basenames ? all.concat(basenames) : all;
        }, []);
        let patterns;
        if (result) {
            patterns = [];
            for (let i = 0, n = basenames.length; i < n; i++) {
                patterns.push(result);
            }
        }
        else {
            patterns = basenamePatterns.reduce((all, current) => {
                const patterns = current.patterns;
                return patterns ? all.concat(patterns) : all;
            }, []);
        }
        const aggregate = function (path, basename) {
            if (typeof path !== 'string') {
                return null;
            }
            if (!basename) {
                let i;
                for (i = path.length; i > 0; i--) {
                    const ch = path.charCodeAt(i - 1);
                    if (ch === charCode_1.CharCode.Slash || ch === charCode_1.CharCode.Backslash) {
                        break;
                    }
                }
                basename = path.substr(i);
            }
            const index = basenames.indexOf(basename);
            return index !== -1 ? patterns[index] : null;
        };
        aggregate.basenames = basenames;
        aggregate.patterns = patterns;
        aggregate.allBasenames = basenames;
        const aggregatedPatterns = parsedPatterns.filter(parsedPattern => !parsedPattern.basenames);
        aggregatedPatterns.push(aggregate);
        return aggregatedPatterns;
    }
    function $Ek(patternsA, patternsB) {
        return (0, arrays_1.$tb)(patternsA, patternsB, (a, b) => {
            if (typeof a === 'string' && typeof b === 'string') {
                return a === b;
            }
            if (typeof a !== 'string' && typeof b !== 'string') {
                return a.base === b.base && a.pattern === b.pattern;
            }
            return false;
        });
    }
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(__m[25/*vs/editor/common/core/eolCounter*/], __M([0/*require*/,1/*exports*/,2/*vs/base/common/charCode*/]), function (require, exports, charCode_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.StringEOL = void 0;
    exports.$zu = $zu;
    var StringEOL;
    (function (StringEOL) {
        StringEOL[StringEOL["Unknown"] = 0] = "Unknown";
        StringEOL[StringEOL["Invalid"] = 3] = "Invalid";
        StringEOL[StringEOL["LF"] = 1] = "LF";
        StringEOL[StringEOL["CRLF"] = 2] = "CRLF";
    })(StringEOL || (exports.StringEOL = StringEOL = {}));
    function $zu(text) {
        let eolCount = 0;
        let firstLineLength = 0;
        let lastLineStart = 0;
        let eol = StringEOL.Unknown;
        for (let i = 0, len = text.length; i < len; i++) {
            const chr = text.charCodeAt(i);
            if (chr === charCode_1.CharCode.CarriageReturn) {
                if (eolCount === 0) {
                    firstLineLength = i;
                }
                eolCount++;
                if (i + 1 < len && text.charCodeAt(i + 1) === charCode_1.CharCode.LineFeed) {
                    // \r\n... case
                    eol |= StringEOL.CRLF;
                    i++; // skip \n
                }
                else {
                    // \r... case
                    eol |= StringEOL.Invalid;
                }
                lastLineStart = i + 1;
            }
            else if (chr === charCode_1.CharCode.LineFeed) {
                // \n... case
                eol |= StringEOL.LF;
                if (eolCount === 0) {
                    firstLineLength = i;
                }
                eolCount++;
                lastLineStart = i + 1;
            }
        }
        if (eolCount === 0) {
            firstLineLength = text.length;
        }
        return [eolCount, firstLineLength, text.length - lastLineStart, eol];
    }
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/























define(__m[26/*vs/editor/common/core/stringBuilder*/], __M([0/*require*/,1/*exports*/,4/*vs/base/common/strings*/,3/*vs/base/common/platform*/,7/*vs/base/common/buffer*/]), function (require, exports, strings, platform, buffer) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.$eu = void 0;
    exports.$cu = $cu;
    exports.$du = $du;
    strings = __importStar(strings);
    platform = __importStar(platform);
    buffer = __importStar(buffer);
    let _utf16LE_TextDecoder;
    function getUTF16LE_TextDecoder() {
        if (!_utf16LE_TextDecoder) {
            _utf16LE_TextDecoder = new TextDecoder('UTF-16LE');
        }
        return _utf16LE_TextDecoder;
    }
    let _utf16BE_TextDecoder;
    function getUTF16BE_TextDecoder() {
        if (!_utf16BE_TextDecoder) {
            _utf16BE_TextDecoder = new TextDecoder('UTF-16BE');
        }
        return _utf16BE_TextDecoder;
    }
    let _platformTextDecoder;
    function $cu() {
        if (!_platformTextDecoder) {
            _platformTextDecoder = platform.$E() ? getUTF16LE_TextDecoder() : getUTF16BE_TextDecoder();
        }
        return _platformTextDecoder;
    }
    function $du(source, offset, len) {
        const view = new Uint16Array(source.buffer, offset, len);
        if (len > 0 && (view[0] === 0xFEFF || view[0] === 0xFFFE)) {
            // UTF16 sometimes starts with a BOM https://de.wikipedia.org/wiki/Byte_Order_Mark
            // It looks like TextDecoder.decode will eat up a leading BOM (0xFEFF or 0xFFFE)
            // We don't want that behavior because we know the string is UTF16LE and the BOM should be maintained
            // So we use the manual decoder
            return compatDecodeUTF16LE(source, offset, len);
        }
        return getUTF16LE_TextDecoder().decode(view);
    }
    function compatDecodeUTF16LE(source, offset, len) {
        const result = [];
        let resultLen = 0;
        for (let i = 0; i < len; i++) {
            const charCode = buffer.$Pe(source, offset);
            offset += 2;
            result[resultLen++] = String.fromCharCode(charCode);
        }
        return result.join('');
    }
    class $eu {
        constructor(capacity) {
            this.a = capacity | 0;
            this.b = new Uint16Array(this.a);
            this.c = null;
            this.d = 0;
        }
        reset() {
            this.c = null;
            this.d = 0;
        }
        build() {
            if (this.c !== null) {
                this.f();
                return this.c.join('');
            }
            return this.e();
        }
        e() {
            if (this.d === 0) {
                return '';
            }
            const view = new Uint16Array(this.b.buffer, 0, this.d);
            return $cu().decode(view);
        }
        f() {
            const bufferString = this.e();
            this.d = 0;
            if (this.c === null) {
                this.c = [bufferString];
            }
            else {
                this.c[this.c.length] = bufferString;
            }
        }
        /**
         * Append a char code (<2^16)
         */
        appendCharCode(charCode) {
            const remainingSpace = this.a - this.d;
            if (remainingSpace <= 1) {
                if (remainingSpace === 0 || strings.$Jf(charCode)) {
                    this.f();
                }
            }
            this.b[this.d++] = charCode;
        }
        /**
         * Append an ASCII char code (<2^8)
         */
        appendASCIICharCode(charCode) {
            if (this.d === this.a) {
                // buffer is full
                this.f();
            }
            this.b[this.d++] = charCode;
        }
        appendString(str) {
            const strLen = str.length;
            if (this.d + strLen >= this.a) {
                // This string does not fit in the remaining buffer space
                this.f();
                this.c[this.c.length] = str;
                return;
            }
            for (let i = 0; i < strLen; i++) {
                this.b[this.d++] = str.charCodeAt(i);
            }
        }
    }
    exports.$eu = $eu;
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/























define(__m[27/*vs/editor/common/core/textChange*/], __M([0/*require*/,1/*exports*/,7/*vs/base/common/buffer*/,26/*vs/editor/common/core/stringBuilder*/]), function (require, exports, buffer, stringBuilder_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.$fu = void 0;
    exports.$gu = $gu;
    buffer = __importStar(buffer);
    function escapeNewLine(str) {
        return (str
            .replace(/\n/g, '\\n')
            .replace(/\r/g, '\\r'));
    }
    class $fu {
        get oldLength() {
            return this.oldText.length;
        }
        get oldEnd() {
            return this.oldPosition + this.oldText.length;
        }
        get newLength() {
            return this.newText.length;
        }
        get newEnd() {
            return this.newPosition + this.newText.length;
        }
        constructor(oldPosition, oldText, newPosition, newText) {
            this.oldPosition = oldPosition;
            this.oldText = oldText;
            this.newPosition = newPosition;
            this.newText = newText;
        }
        toString() {
            if (this.oldText.length === 0) {
                return `(insert@${this.oldPosition} "${escapeNewLine(this.newText)}")`;
            }
            if (this.newText.length === 0) {
                return `(delete@${this.oldPosition} "${escapeNewLine(this.oldText)}")`;
            }
            return `(replace@${this.oldPosition} "${escapeNewLine(this.oldText)}" with "${escapeNewLine(this.newText)}")`;
        }
        static a(str) {
            return (4 + 2 * str.length);
        }
        static c(b, str, offset) {
            const len = str.length;
            buffer.$Se(b, len, offset);
            offset += 4;
            for (let i = 0; i < len; i++) {
                buffer.$Qe(b, str.charCodeAt(i), offset);
                offset += 2;
            }
            return offset;
        }
        static d(b, offset) {
            const len = buffer.$Re(b, offset);
            offset += 4;
            return (0, stringBuilder_1.$du)(b, offset, len);
        }
        writeSize() {
            return (+4 // oldPosition
                + 4 // newPosition
                + $fu.a(this.oldText)
                + $fu.a(this.newText));
        }
        write(b, offset) {
            buffer.$Se(b, this.oldPosition, offset);
            offset += 4;
            buffer.$Se(b, this.newPosition, offset);
            offset += 4;
            offset = $fu.c(b, this.oldText, offset);
            offset = $fu.c(b, this.newText, offset);
            return offset;
        }
        static read(b, offset, dest) {
            const oldPosition = buffer.$Re(b, offset);
            offset += 4;
            const newPosition = buffer.$Re(b, offset);
            offset += 4;
            const oldText = $fu.d(b, offset);
            offset += $fu.a(oldText);
            const newText = $fu.d(b, offset);
            offset += $fu.a(newText);
            dest.push(new $fu(oldPosition, oldText, newPosition, newText));
            return offset;
        }
    }
    exports.$fu = $fu;
    function $gu(prevEdits, currEdits) {
        if (prevEdits === null || prevEdits.length === 0) {
            return currEdits;
        }
        const compressor = new TextChangeCompressor(prevEdits, currEdits);
        return compressor.compress();
    }
    class TextChangeCompressor {
        constructor(prevEdits, currEdits) {
            this.a = prevEdits;
            this.c = currEdits;
            this.d = [];
            this.e = 0;
            this.f = this.a.length;
            this.g = 0;
            this.h = this.c.length;
            this.j = 0;
        }
        compress() {
            let prevIndex = 0;
            let currIndex = 0;
            let prevEdit = this.n(prevIndex);
            let currEdit = this.l(currIndex);
            while (prevIndex < this.f || currIndex < this.h) {
                if (prevEdit === null) {
                    this.k(currEdit);
                    currEdit = this.l(++currIndex);
                    continue;
                }
                if (currEdit === null) {
                    this.m(prevEdit);
                    prevEdit = this.n(++prevIndex);
                    continue;
                }
                if (currEdit.oldEnd <= prevEdit.newPosition) {
                    this.k(currEdit);
                    currEdit = this.l(++currIndex);
                    continue;
                }
                if (prevEdit.newEnd <= currEdit.oldPosition) {
                    this.m(prevEdit);
                    prevEdit = this.n(++prevIndex);
                    continue;
                }
                if (currEdit.oldPosition < prevEdit.newPosition) {
                    const [e1, e2] = TextChangeCompressor.r(currEdit, prevEdit.newPosition - currEdit.oldPosition);
                    this.k(e1);
                    currEdit = e2;
                    continue;
                }
                if (prevEdit.newPosition < currEdit.oldPosition) {
                    const [e1, e2] = TextChangeCompressor.q(prevEdit, currEdit.oldPosition - prevEdit.newPosition);
                    this.m(e1);
                    prevEdit = e2;
                    continue;
                }
                // At this point, currEdit.oldPosition === prevEdit.newPosition
                let mergePrev;
                let mergeCurr;
                if (currEdit.oldEnd === prevEdit.newEnd) {
                    mergePrev = prevEdit;
                    mergeCurr = currEdit;
                    prevEdit = this.n(++prevIndex);
                    currEdit = this.l(++currIndex);
                }
                else if (currEdit.oldEnd < prevEdit.newEnd) {
                    const [e1, e2] = TextChangeCompressor.q(prevEdit, currEdit.oldLength);
                    mergePrev = e1;
                    mergeCurr = currEdit;
                    prevEdit = e2;
                    currEdit = this.l(++currIndex);
                }
                else {
                    const [e1, e2] = TextChangeCompressor.r(currEdit, prevEdit.newLength);
                    mergePrev = prevEdit;
                    mergeCurr = e1;
                    prevEdit = this.n(++prevIndex);
                    currEdit = e2;
                }
                this.d[this.e++] = new $fu(mergePrev.oldPosition, mergePrev.oldText, mergeCurr.newPosition, mergeCurr.newText);
                this.g += mergePrev.newLength - mergePrev.oldLength;
                this.j += mergeCurr.newLength - mergeCurr.oldLength;
            }
            const merged = TextChangeCompressor.s(this.d);
            const cleaned = TextChangeCompressor.t(merged);
            return cleaned;
        }
        k(currEdit) {
            this.d[this.e++] = TextChangeCompressor.o(this.g, currEdit);
            this.j += currEdit.newLength - currEdit.oldLength;
        }
        l(currIndex) {
            return (currIndex < this.h ? this.c[currIndex] : null);
        }
        m(prevEdit) {
            this.d[this.e++] = TextChangeCompressor.p(this.j, prevEdit);
            this.g += prevEdit.newLength - prevEdit.oldLength;
        }
        n(prevIndex) {
            return (prevIndex < this.f ? this.a[prevIndex] : null);
        }
        static o(prevDeltaOffset, currEdit) {
            return new $fu(currEdit.oldPosition - prevDeltaOffset, currEdit.oldText, currEdit.newPosition, currEdit.newText);
        }
        static p(currDeltaOffset, prevEdit) {
            return new $fu(prevEdit.oldPosition, prevEdit.oldText, prevEdit.newPosition + currDeltaOffset, prevEdit.newText);
        }
        static q(edit, offset) {
            const preText = edit.newText.substr(0, offset);
            const postText = edit.newText.substr(offset);
            return [
                new $fu(edit.oldPosition, edit.oldText, edit.newPosition, preText),
                new $fu(edit.oldEnd, '', edit.newPosition + offset, postText)
            ];
        }
        static r(edit, offset) {
            const preText = edit.oldText.substr(0, offset);
            const postText = edit.oldText.substr(offset);
            return [
                new $fu(edit.oldPosition, preText, edit.newPosition, edit.newText),
                new $fu(edit.oldPosition + offset, postText, edit.newEnd, '')
            ];
        }
        static s(edits) {
            if (edits.length === 0) {
                return edits;
            }
            const result = [];
            let resultLen = 0;
            let prev = edits[0];
            for (let i = 1; i < edits.length; i++) {
                const curr = edits[i];
                if (prev.oldEnd === curr.oldPosition) {
                    // Merge into `prev`
                    prev = new $fu(prev.oldPosition, prev.oldText + curr.oldText, prev.newPosition, prev.newText + curr.newText);
                }
                else {
                    result[resultLen++] = prev;
                    prev = curr;
                }
            }
            result[resultLen++] = prev;
            return result;
        }
        static t(edits) {
            if (edits.length === 0) {
                return edits;
            }
            const result = [];
            let resultLen = 0;
            for (let i = 0; i < edits.length; i++) {
                const edit = edits[i];
                if (edit.oldText === edit.newText) {
                    continue;
                }
                result[resultLen++] = edit;
            }
            return result;
        }
    }
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(__m[28/*vs/editor/common/model/pieceTreeTextBuffer/rbTreeBase*/], __M([0/*require*/,1/*exports*/]), function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.$bD = exports.NodeColor = exports.$aD = void 0;
    exports.$cD = $cD;
    exports.$dD = $dD;
    exports.$eD = $eD;
    exports.$fD = $fD;
    exports.$gD = $gD;
    exports.$hD = $hD;
    exports.$iD = $iD;
    exports.$jD = $jD;
    class $aD {
        constructor(piece, color) {
            this.piece = piece;
            this.color = color;
            this.size_left = 0;
            this.lf_left = 0;
            this.parent = this;
            this.left = this;
            this.right = this;
        }
        next() {
            if (this.right !== exports.$bD) {
                return $cD(this.right);
            }
            let node = this;
            while (node.parent !== exports.$bD) {
                if (node.parent.left === node) {
                    break;
                }
                node = node.parent;
            }
            if (node.parent === exports.$bD) {
                return exports.$bD;
            }
            else {
                return node.parent;
            }
        }
        prev() {
            if (this.left !== exports.$bD) {
                return $dD(this.left);
            }
            let node = this;
            while (node.parent !== exports.$bD) {
                if (node.parent.right === node) {
                    break;
                }
                node = node.parent;
            }
            if (node.parent === exports.$bD) {
                return exports.$bD;
            }
            else {
                return node.parent;
            }
        }
        detach() {
            this.parent = null;
            this.left = null;
            this.right = null;
        }
    }
    exports.$aD = $aD;
    var NodeColor;
    (function (NodeColor) {
        NodeColor[NodeColor["Black"] = 0] = "Black";
        NodeColor[NodeColor["Red"] = 1] = "Red";
    })(NodeColor || (exports.NodeColor = NodeColor = {}));
    exports.$bD = new $aD(null, NodeColor.Black);
    exports.$bD.parent = exports.$bD;
    exports.$bD.left = exports.$bD;
    exports.$bD.right = exports.$bD;
    exports.$bD.color = NodeColor.Black;
    function $cD(node) {
        while (node.left !== exports.$bD) {
            node = node.left;
        }
        return node;
    }
    function $dD(node) {
        while (node.right !== exports.$bD) {
            node = node.right;
        }
        return node;
    }
    function calculateSize(node) {
        if (node === exports.$bD) {
            return 0;
        }
        return node.size_left + node.piece.length + calculateSize(node.right);
    }
    function calculateLF(node) {
        if (node === exports.$bD) {
            return 0;
        }
        return node.lf_left + node.piece.lineFeedCnt + calculateLF(node.right);
    }
    function resetSentinel() {
        exports.$bD.parent = exports.$bD;
    }
    function $eD(tree, x) {
        const y = x.right;
        // fix size_left
        y.size_left += x.size_left + (x.piece ? x.piece.length : 0);
        y.lf_left += x.lf_left + (x.piece ? x.piece.lineFeedCnt : 0);
        x.right = y.left;
        if (y.left !== exports.$bD) {
            y.left.parent = x;
        }
        y.parent = x.parent;
        if (x.parent === exports.$bD) {
            tree.root = y;
        }
        else if (x.parent.left === x) {
            x.parent.left = y;
        }
        else {
            x.parent.right = y;
        }
        y.left = x;
        x.parent = y;
    }
    function $fD(tree, y) {
        const x = y.left;
        y.left = x.right;
        if (x.right !== exports.$bD) {
            x.right.parent = y;
        }
        x.parent = y.parent;
        // fix size_left
        y.size_left -= x.size_left + (x.piece ? x.piece.length : 0);
        y.lf_left -= x.lf_left + (x.piece ? x.piece.lineFeedCnt : 0);
        if (y.parent === exports.$bD) {
            tree.root = x;
        }
        else if (y === y.parent.right) {
            y.parent.right = x;
        }
        else {
            y.parent.left = x;
        }
        x.right = y;
        y.parent = x;
    }
    function $gD(tree, z) {
        let x;
        let y;
        if (z.left === exports.$bD) {
            y = z;
            x = y.right;
        }
        else if (z.right === exports.$bD) {
            y = z;
            x = y.left;
        }
        else {
            y = $cD(z.right);
            x = y.right;
        }
        if (y === tree.root) {
            tree.root = x;
            // if x is null, we are removing the only node
            x.color = NodeColor.Black;
            z.detach();
            resetSentinel();
            tree.root.parent = exports.$bD;
            return;
        }
        const yWasRed = (y.color === NodeColor.Red);
        if (y === y.parent.left) {
            y.parent.left = x;
        }
        else {
            y.parent.right = x;
        }
        if (y === z) {
            x.parent = y.parent;
            $jD(tree, x);
        }
        else {
            if (y.parent === z) {
                x.parent = y;
            }
            else {
                x.parent = y.parent;
            }
            // as we make changes to x's hierarchy, update size_left of subtree first
            $jD(tree, x);
            y.left = z.left;
            y.right = z.right;
            y.parent = z.parent;
            y.color = z.color;
            if (z === tree.root) {
                tree.root = y;
            }
            else {
                if (z === z.parent.left) {
                    z.parent.left = y;
                }
                else {
                    z.parent.right = y;
                }
            }
            if (y.left !== exports.$bD) {
                y.left.parent = y;
            }
            if (y.right !== exports.$bD) {
                y.right.parent = y;
            }
            // update metadata
            // we replace z with y, so in this sub tree, the length change is z.item.length
            y.size_left = z.size_left;
            y.lf_left = z.lf_left;
            $jD(tree, y);
        }
        z.detach();
        if (x.parent.left === x) {
            const newSizeLeft = calculateSize(x);
            const newLFLeft = calculateLF(x);
            if (newSizeLeft !== x.parent.size_left || newLFLeft !== x.parent.lf_left) {
                const delta = newSizeLeft - x.parent.size_left;
                const lf_delta = newLFLeft - x.parent.lf_left;
                x.parent.size_left = newSizeLeft;
                x.parent.lf_left = newLFLeft;
                $iD(tree, x.parent, delta, lf_delta);
            }
        }
        $jD(tree, x.parent);
        if (yWasRed) {
            resetSentinel();
            return;
        }
        // RB-DELETE-FIXUP
        let w;
        while (x !== tree.root && x.color === NodeColor.Black) {
            if (x === x.parent.left) {
                w = x.parent.right;
                if (w.color === NodeColor.Red) {
                    w.color = NodeColor.Black;
                    x.parent.color = NodeColor.Red;
                    $eD(tree, x.parent);
                    w = x.parent.right;
                }
                if (w.left.color === NodeColor.Black && w.right.color === NodeColor.Black) {
                    w.color = NodeColor.Red;
                    x = x.parent;
                }
                else {
                    if (w.right.color === NodeColor.Black) {
                        w.left.color = NodeColor.Black;
                        w.color = NodeColor.Red;
                        $fD(tree, w);
                        w = x.parent.right;
                    }
                    w.color = x.parent.color;
                    x.parent.color = NodeColor.Black;
                    w.right.color = NodeColor.Black;
                    $eD(tree, x.parent);
                    x = tree.root;
                }
            }
            else {
                w = x.parent.left;
                if (w.color === NodeColor.Red) {
                    w.color = NodeColor.Black;
                    x.parent.color = NodeColor.Red;
                    $fD(tree, x.parent);
                    w = x.parent.left;
                }
                if (w.left.color === NodeColor.Black && w.right.color === NodeColor.Black) {
                    w.color = NodeColor.Red;
                    x = x.parent;
                }
                else {
                    if (w.left.color === NodeColor.Black) {
                        w.right.color = NodeColor.Black;
                        w.color = NodeColor.Red;
                        $eD(tree, w);
                        w = x.parent.left;
                    }
                    w.color = x.parent.color;
                    x.parent.color = NodeColor.Black;
                    w.left.color = NodeColor.Black;
                    $fD(tree, x.parent);
                    x = tree.root;
                }
            }
        }
        x.color = NodeColor.Black;
        resetSentinel();
    }
    function $hD(tree, x) {
        $jD(tree, x);
        while (x !== tree.root && x.parent.color === NodeColor.Red) {
            if (x.parent === x.parent.parent.left) {
                const y = x.parent.parent.right;
                if (y.color === NodeColor.Red) {
                    x.parent.color = NodeColor.Black;
                    y.color = NodeColor.Black;
                    x.parent.parent.color = NodeColor.Red;
                    x = x.parent.parent;
                }
                else {
                    if (x === x.parent.right) {
                        x = x.parent;
                        $eD(tree, x);
                    }
                    x.parent.color = NodeColor.Black;
                    x.parent.parent.color = NodeColor.Red;
                    $fD(tree, x.parent.parent);
                }
            }
            else {
                const y = x.parent.parent.left;
                if (y.color === NodeColor.Red) {
                    x.parent.color = NodeColor.Black;
                    y.color = NodeColor.Black;
                    x.parent.parent.color = NodeColor.Red;
                    x = x.parent.parent;
                }
                else {
                    if (x === x.parent.left) {
                        x = x.parent;
                        $fD(tree, x);
                    }
                    x.parent.color = NodeColor.Black;
                    x.parent.parent.color = NodeColor.Red;
                    $eD(tree, x.parent.parent);
                }
            }
        }
        tree.root.color = NodeColor.Black;
    }
    function $iD(tree, x, delta, lineFeedCntDelta) {
        // node length change or line feed count change
        while (x !== tree.root && x !== exports.$bD) {
            if (x.parent.left === x) {
                x.parent.size_left += delta;
                x.parent.lf_left += lineFeedCntDelta;
            }
            x = x.parent;
        }
    }
    function $jD(tree, x) {
        let delta = 0;
        let lf_delta = 0;
        if (x === tree.root) {
            return;
        }
        // go upwards till the node whose left subtree is changed.
        while (x !== tree.root && x === x.parent.right) {
            x = x.parent;
        }
        if (x === tree.root) {
            // well, it means we add a node to the end (inorder)
            return;
        }
        // x is the node whose right subtree is changed.
        x = x.parent;
        delta = calculateSize(x.left) - x.size_left;
        lf_delta = calculateLF(x.left) - x.lf_left;
        x.size_left += delta;
        x.lf_left += lf_delta;
        // go upwards till root. O(logN)
        while (x !== tree.root && (delta !== 0 || lf_delta !== 0)) {
            if (x.parent.left === x) {
                x.parent.size_left += delta;
                x.parent.lf_left += lf_delta;
            }
            x = x.parent;
        }
    }
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(__m[13/*vs/editor/common/model/pieceTreeTextBuffer/pieceTreeBase*/], __M([0/*require*/,1/*exports*/,2/*vs/base/common/charCode*/,42/*vs/editor/common/core/position*/,14/*vs/editor/common/core/range*/,9/*vs/editor/common/model*/,28/*vs/editor/common/model/pieceTreeTextBuffer/rbTreeBase*/,29/*vs/editor/common/model/textModelSearch*/]), function (require, exports, charCode_1, position_1, range_1, model_1, rbTreeBase_1, textModelSearch_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.$uD = exports.$tD = exports.$sD = void 0;
    exports.$qD = $qD;
    exports.$rD = $rD;
    // const lfRegex = new RegExp(/\r\n|\r|\n/g);
    const AverageBufferSize = 65535;
    function createUintArray(arr) {
        let r;
        if (arr[arr.length - 1] < 65536) {
            r = new Uint16Array(arr.length);
        }
        else {
            r = new Uint32Array(arr.length);
        }
        r.set(arr, 0);
        return r;
    }
    class LineStarts {
        constructor(lineStarts, cr, lf, crlf, isBasicASCII) {
            this.lineStarts = lineStarts;
            this.cr = cr;
            this.lf = lf;
            this.crlf = crlf;
            this.isBasicASCII = isBasicASCII;
        }
    }
    function $qD(str, readonly = true) {
        const r = [0];
        let rLength = 1;
        for (let i = 0, len = str.length; i < len; i++) {
            const chr = str.charCodeAt(i);
            if (chr === charCode_1.CharCode.CarriageReturn) {
                if (i + 1 < len && str.charCodeAt(i + 1) === charCode_1.CharCode.LineFeed) {
                    // \r\n... case
                    r[rLength++] = i + 2;
                    i++; // skip \n
                }
                else {
                    // \r... case
                    r[rLength++] = i + 1;
                }
            }
            else if (chr === charCode_1.CharCode.LineFeed) {
                r[rLength++] = i + 1;
            }
        }
        if (readonly) {
            return createUintArray(r);
        }
        else {
            return r;
        }
    }
    function $rD(r, str) {
        r.length = 0;
        r[0] = 0;
        let rLength = 1;
        let cr = 0, lf = 0, crlf = 0;
        let isBasicASCII = true;
        for (let i = 0, len = str.length; i < len; i++) {
            const chr = str.charCodeAt(i);
            if (chr === charCode_1.CharCode.CarriageReturn) {
                if (i + 1 < len && str.charCodeAt(i + 1) === charCode_1.CharCode.LineFeed) {
                    // \r\n... case
                    crlf++;
                    r[rLength++] = i + 2;
                    i++; // skip \n
                }
                else {
                    cr++;
                    // \r... case
                    r[rLength++] = i + 1;
                }
            }
            else if (chr === charCode_1.CharCode.LineFeed) {
                lf++;
                r[rLength++] = i + 1;
            }
            else {
                if (isBasicASCII) {
                    if (chr !== charCode_1.CharCode.Tab && (chr < 32 || chr > 126)) {
                        isBasicASCII = false;
                    }
                }
            }
        }
        const result = new LineStarts(createUintArray(r), cr, lf, crlf, isBasicASCII);
        r.length = 0;
        return result;
    }
    class $sD {
        constructor(bufferIndex, start, end, lineFeedCnt, length) {
            this.bufferIndex = bufferIndex;
            this.start = start;
            this.end = end;
            this.lineFeedCnt = lineFeedCnt;
            this.length = length;
        }
    }
    exports.$sD = $sD;
    class $tD {
        constructor(buffer, lineStarts) {
            this.buffer = buffer;
            this.lineStarts = lineStarts;
        }
    }
    exports.$tD = $tD;
    /**
     * Readonly snapshot for piece tree.
     * In a real multiple thread environment, to make snapshot reading always work correctly, we need to
     * 1. Make TreeNode.piece immutable, then reading and writing can run in parallel.
     * 2. TreeNode/Buffers normalization should not happen during snapshot reading.
     */
    class PieceTreeSnapshot {
        constructor(tree, BOM) {
            this.a = [];
            this.c = tree;
            this.d = BOM;
            this.b = 0;
            if (tree.root !== rbTreeBase_1.$bD) {
                tree.iterate(tree.root, node => {
                    if (node !== rbTreeBase_1.$bD) {
                        this.a.push(node.piece);
                    }
                    return true;
                });
            }
        }
        read() {
            if (this.a.length === 0) {
                if (this.b === 0) {
                    this.b++;
                    return this.d;
                }
                else {
                    return null;
                }
            }
            if (this.b > this.a.length - 1) {
                return null;
            }
            if (this.b === 0) {
                return this.d + this.c.getPieceContent(this.a[this.b++]);
            }
            return this.c.getPieceContent(this.a[this.b++]);
        }
    }
    class PieceTreeSearchCache {
        constructor(limit) {
            this.a = limit;
            this.b = [];
        }
        get(offset) {
            for (let i = this.b.length - 1; i >= 0; i--) {
                const nodePos = this.b[i];
                if (nodePos.nodeStartOffset <= offset && nodePos.nodeStartOffset + nodePos.node.piece.length >= offset) {
                    return nodePos;
                }
            }
            return null;
        }
        get2(lineNumber) {
            for (let i = this.b.length - 1; i >= 0; i--) {
                const nodePos = this.b[i];
                if (nodePos.nodeStartLineNumber && nodePos.nodeStartLineNumber < lineNumber && nodePos.nodeStartLineNumber + nodePos.node.piece.lineFeedCnt >= lineNumber) {
                    return nodePos;
                }
            }
            return null;
        }
        set(nodePosition) {
            if (this.b.length >= this.a) {
                this.b.shift();
            }
            this.b.push(nodePosition);
        }
        validate(offset) {
            let hasInvalidVal = false;
            const tmp = this.b;
            for (let i = 0; i < tmp.length; i++) {
                const nodePos = tmp[i];
                if (nodePos.node.parent === null || nodePos.nodeStartOffset >= offset) {
                    tmp[i] = null;
                    hasInvalidVal = true;
                    continue;
                }
            }
            if (hasInvalidVal) {
                const newArr = [];
                for (const entry of tmp) {
                    if (entry !== null) {
                        newArr.push(entry);
                    }
                }
                this.b = newArr;
            }
        }
    }
    class $uD {
        constructor(chunks, eol, eolNormalized) {
            this.create(chunks, eol, eolNormalized);
        }
        create(chunks, eol, eolNormalized) {
            this.a = [
                new $tD('', [0])
            ];
            this.g = { line: 0, column: 0 };
            this.root = rbTreeBase_1.$bD;
            this.b = 1;
            this.c = 0;
            this.d = eol;
            this.e = eol.length;
            this.f = eolNormalized;
            let lastNode = null;
            for (let i = 0, len = chunks.length; i < len; i++) {
                if (chunks[i].buffer.length > 0) {
                    if (!chunks[i].lineStarts) {
                        chunks[i].lineStarts = $qD(chunks[i].buffer);
                    }
                    const piece = new $sD(i + 1, { line: 0, column: 0 }, { line: chunks[i].lineStarts.length - 1, column: chunks[i].buffer.length - chunks[i].lineStarts[chunks[i].lineStarts.length - 1] }, chunks[i].lineStarts.length - 1, chunks[i].buffer.length);
                    this.a.push(chunks[i]);
                    lastNode = this.S(lastNode, piece);
                }
            }
            this.h = new PieceTreeSearchCache(1);
            this.j = { lineNumber: 0, value: '' };
            this.y();
        }
        normalizeEOL(eol) {
            const averageBufferSize = AverageBufferSize;
            const min = averageBufferSize - Math.floor(averageBufferSize / 3);
            const max = min * 2;
            let tempChunk = '';
            let tempChunkLen = 0;
            const chunks = [];
            this.iterate(this.root, node => {
                const str = this.R(node);
                const len = str.length;
                if (tempChunkLen <= min || tempChunkLen + len < max) {
                    tempChunk += str;
                    tempChunkLen += len;
                    return true;
                }
                // flush anyways
                const text = tempChunk.replace(/\r\n|\r|\n/g, eol);
                chunks.push(new $tD(text, $qD(text)));
                tempChunk = str;
                tempChunkLen = len;
                return true;
            });
            if (tempChunkLen > 0) {
                const text = tempChunk.replace(/\r\n|\r|\n/g, eol);
                chunks.push(new $tD(text, $qD(text)));
            }
            this.create(chunks, eol, true);
        }
        // #region Buffer API
        getEOL() {
            return this.d;
        }
        setEOL(newEOL) {
            this.d = newEOL;
            this.e = this.d.length;
            this.normalizeEOL(newEOL);
        }
        createSnapshot(BOM) {
            return new PieceTreeSnapshot(this, BOM);
        }
        equal(other) {
            if (this.getLength() !== other.getLength()) {
                return false;
            }
            if (this.getLineCount() !== other.getLineCount()) {
                return false;
            }
            let offset = 0;
            const ret = this.iterate(this.root, node => {
                if (node === rbTreeBase_1.$bD) {
                    return true;
                }
                const str = this.R(node);
                const len = str.length;
                const startPosition = other.G(offset);
                const endPosition = other.G(offset + len);
                const val = other.getValueInRange2(startPosition, endPosition);
                offset += len;
                return str === val;
            });
            return ret;
        }
        getOffsetAt(lineNumber, column) {
            let leftLen = 0; // inorder
            let x = this.root;
            while (x !== rbTreeBase_1.$bD) {
                if (x.left !== rbTreeBase_1.$bD && x.lf_left + 1 >= lineNumber) {
                    x = x.left;
                }
                else if (x.lf_left + x.piece.lineFeedCnt + 1 >= lineNumber) {
                    leftLen += x.size_left;
                    // lineNumber >= 2
                    const accumualtedValInCurrentIndex = this.B(x, lineNumber - x.lf_left - 2);
                    return leftLen += accumualtedValInCurrentIndex + column - 1;
                }
                else {
                    lineNumber -= x.lf_left + x.piece.lineFeedCnt;
                    leftLen += x.size_left + x.piece.length;
                    x = x.right;
                }
            }
            return leftLen;
        }
        getPositionAt(offset) {
            offset = Math.floor(offset);
            offset = Math.max(0, offset);
            let x = this.root;
            let lfCnt = 0;
            const originalOffset = offset;
            while (x !== rbTreeBase_1.$bD) {
                if (x.size_left !== 0 && x.size_left >= offset) {
                    x = x.left;
                }
                else if (x.size_left + x.piece.length >= offset) {
                    const out = this.A(x, offset - x.size_left);
                    lfCnt += x.lf_left + out.index;
                    if (out.index === 0) {
                        const lineStartOffset = this.getOffsetAt(lfCnt + 1, 1);
                        const column = originalOffset - lineStartOffset;
                        return new position_1.$Nt(lfCnt + 1, column + 1);
                    }
                    return new position_1.$Nt(lfCnt + 1, out.remainder + 1);
                }
                else {
                    offset -= x.size_left + x.piece.length;
                    lfCnt += x.lf_left + x.piece.lineFeedCnt;
                    if (x.right === rbTreeBase_1.$bD) {
                        // last node
                        const lineStartOffset = this.getOffsetAt(lfCnt + 1, 1);
                        const column = originalOffset - offset - lineStartOffset;
                        return new position_1.$Nt(lfCnt + 1, column + 1);
                    }
                    else {
                        x = x.right;
                    }
                }
            }
            return new position_1.$Nt(1, 1);
        }
        getValueInRange(range, eol) {
            if (range.startLineNumber === range.endLineNumber && range.startColumn === range.endColumn) {
                return '';
            }
            const startPosition = this.H(range.startLineNumber, range.startColumn);
            const endPosition = this.H(range.endLineNumber, range.endColumn);
            const value = this.getValueInRange2(startPosition, endPosition);
            if (eol) {
                if (eol !== this.d || !this.f) {
                    return value.replace(/\r\n|\r|\n/g, eol);
                }
                if (eol === this.getEOL() && this.f) {
                    if (eol === '\r\n') {
                    }
                    return value;
                }
                return value.replace(/\r\n|\r|\n/g, eol);
            }
            return value;
        }
        getValueInRange2(startPosition, endPosition) {
            if (startPosition.node === endPosition.node) {
                const node = startPosition.node;
                const buffer = this.a[node.piece.bufferIndex].buffer;
                const startOffset = this.u(node.piece.bufferIndex, node.piece.start);
                return buffer.substring(startOffset + startPosition.remainder, startOffset + endPosition.remainder);
            }
            let x = startPosition.node;
            const buffer = this.a[x.piece.bufferIndex].buffer;
            const startOffset = this.u(x.piece.bufferIndex, x.piece.start);
            let ret = buffer.substring(startOffset + startPosition.remainder, startOffset + x.piece.length);
            x = x.next();
            while (x !== rbTreeBase_1.$bD) {
                const buffer = this.a[x.piece.bufferIndex].buffer;
                const startOffset = this.u(x.piece.bufferIndex, x.piece.start);
                if (x === endPosition.node) {
                    ret += buffer.substring(startOffset, startOffset + endPosition.remainder);
                    break;
                }
                else {
                    ret += buffer.substr(startOffset, x.piece.length);
                }
                x = x.next();
            }
            return ret;
        }
        getLinesContent() {
            const lines = [];
            let linesLength = 0;
            let currentLine = '';
            let danglingCR = false;
            this.iterate(this.root, node => {
                if (node === rbTreeBase_1.$bD) {
                    return true;
                }
                const piece = node.piece;
                let pieceLength = piece.length;
                if (pieceLength === 0) {
                    return true;
                }
                const buffer = this.a[piece.bufferIndex].buffer;
                const lineStarts = this.a[piece.bufferIndex].lineStarts;
                const pieceStartLine = piece.start.line;
                const pieceEndLine = piece.end.line;
                let pieceStartOffset = lineStarts[pieceStartLine] + piece.start.column;
                if (danglingCR) {
                    if (buffer.charCodeAt(pieceStartOffset) === charCode_1.CharCode.LineFeed) {
                        // pretend the \n was in the previous piece..
                        pieceStartOffset++;
                        pieceLength--;
                    }
                    lines[linesLength++] = currentLine;
                    currentLine = '';
                    danglingCR = false;
                    if (pieceLength === 0) {
                        return true;
                    }
                }
                if (pieceStartLine === pieceEndLine) {
                    // this piece has no new lines
                    if (!this.f && buffer.charCodeAt(pieceStartOffset + pieceLength - 1) === charCode_1.CharCode.CarriageReturn) {
                        danglingCR = true;
                        currentLine += buffer.substr(pieceStartOffset, pieceLength - 1);
                    }
                    else {
                        currentLine += buffer.substr(pieceStartOffset, pieceLength);
                    }
                    return true;
                }
                // add the text before the first line start in this piece
                currentLine += (this.f
                    ? buffer.substring(pieceStartOffset, Math.max(pieceStartOffset, lineStarts[pieceStartLine + 1] - this.e))
                    : buffer.substring(pieceStartOffset, lineStarts[pieceStartLine + 1]).replace(/(\r\n|\r|\n)$/, ''));
                lines[linesLength++] = currentLine;
                for (let line = pieceStartLine + 1; line < pieceEndLine; line++) {
                    currentLine = (this.f
                        ? buffer.substring(lineStarts[line], lineStarts[line + 1] - this.e)
                        : buffer.substring(lineStarts[line], lineStarts[line + 1]).replace(/(\r\n|\r|\n)$/, ''));
                    lines[linesLength++] = currentLine;
                }
                if (!this.f && buffer.charCodeAt(lineStarts[pieceEndLine] + piece.end.column - 1) === charCode_1.CharCode.CarriageReturn) {
                    danglingCR = true;
                    if (piece.end.column === 0) {
                        // The last line ended with a \r, let's undo the push, it will be pushed by next iteration
                        linesLength--;
                    }
                    else {
                        currentLine = buffer.substr(lineStarts[pieceEndLine], piece.end.column - 1);
                    }
                }
                else {
                    currentLine = buffer.substr(lineStarts[pieceEndLine], piece.end.column);
                }
                return true;
            });
            if (danglingCR) {
                lines[linesLength++] = currentLine;
                currentLine = '';
            }
            lines[linesLength++] = currentLine;
            return lines;
        }
        getLength() {
            return this.c;
        }
        getLineCount() {
            return this.b;
        }
        getLineContent(lineNumber) {
            if (this.j.lineNumber === lineNumber) {
                return this.j.value;
            }
            this.j.lineNumber = lineNumber;
            if (lineNumber === this.b) {
                this.j.value = this.getLineRawContent(lineNumber);
            }
            else if (this.f) {
                this.j.value = this.getLineRawContent(lineNumber, this.e);
            }
            else {
                this.j.value = this.getLineRawContent(lineNumber).replace(/(\r\n|\r|\n)$/, '');
            }
            return this.j.value;
        }
        l(nodePos) {
            if (nodePos.remainder === nodePos.node.piece.length) {
                // the char we want to fetch is at the head of next node.
                const matchingNode = nodePos.node.next();
                if (!matchingNode) {
                    return 0;
                }
                const buffer = this.a[matchingNode.piece.bufferIndex];
                const startOffset = this.u(matchingNode.piece.bufferIndex, matchingNode.piece.start);
                return buffer.buffer.charCodeAt(startOffset);
            }
            else {
                const buffer = this.a[nodePos.node.piece.bufferIndex];
                const startOffset = this.u(nodePos.node.piece.bufferIndex, nodePos.node.piece.start);
                const targetOffset = startOffset + nodePos.remainder;
                return buffer.buffer.charCodeAt(targetOffset);
            }
        }
        getLineCharCode(lineNumber, index) {
            const nodePos = this.H(lineNumber, index + 1);
            return this.l(nodePos);
        }
        getLineLength(lineNumber) {
            if (lineNumber === this.getLineCount()) {
                const startOffset = this.getOffsetAt(lineNumber, 1);
                return this.getLength() - startOffset;
            }
            return this.getOffsetAt(lineNumber + 1, 1) - this.getOffsetAt(lineNumber, 1) - this.e;
        }
        getCharCode(offset) {
            const nodePos = this.G(offset);
            return this.l(nodePos);
        }
        getNearestChunk(offset) {
            const nodePos = this.G(offset);
            if (nodePos.remainder === nodePos.node.piece.length) {
                // the offset is at the head of next node.
                const matchingNode = nodePos.node.next();
                if (!matchingNode || matchingNode === rbTreeBase_1.$bD) {
                    return '';
                }
                const buffer = this.a[matchingNode.piece.bufferIndex];
                const startOffset = this.u(matchingNode.piece.bufferIndex, matchingNode.piece.start);
                return buffer.buffer.substring(startOffset, startOffset + matchingNode.piece.length);
            }
            else {
                const buffer = this.a[nodePos.node.piece.bufferIndex];
                const startOffset = this.u(nodePos.node.piece.bufferIndex, nodePos.node.piece.start);
                const targetOffset = startOffset + nodePos.remainder;
                const targetEnd = startOffset + nodePos.node.piece.length;
                return buffer.buffer.substring(targetOffset, targetEnd);
            }
        }
        findMatchesInNode(node, searcher, startLineNumber, startColumn, startCursor, endCursor, searchData, captureMatches, limitResultCount, resultLen, result) {
            const buffer = this.a[node.piece.bufferIndex];
            const startOffsetInBuffer = this.u(node.piece.bufferIndex, node.piece.start);
            const start = this.u(node.piece.bufferIndex, startCursor);
            const end = this.u(node.piece.bufferIndex, endCursor);
            let m;
            // Reset regex to search from the beginning
            const ret = { line: 0, column: 0 };
            let searchText;
            let offsetInBuffer;
            if (searcher._wordSeparators) {
                searchText = buffer.buffer.substring(start, end);
                offsetInBuffer = (offset) => offset + start;
                searcher.reset(0);
            }
            else {
                searchText = buffer.buffer;
                offsetInBuffer = (offset) => offset;
                searcher.reset(start);
            }
            do {
                m = searcher.next(searchText);
                if (m) {
                    if (offsetInBuffer(m.index) >= end) {
                        return resultLen;
                    }
                    this.s(node, offsetInBuffer(m.index) - startOffsetInBuffer, ret);
                    const lineFeedCnt = this.t(node.piece.bufferIndex, startCursor, ret);
                    const retStartColumn = ret.line === startCursor.line ? ret.column - startCursor.column + startColumn : ret.column + 1;
                    const retEndColumn = retStartColumn + m[0].length;
                    result[resultLen++] = (0, textModelSearch_1.$mD)(new range_1.$Ot(startLineNumber + lineFeedCnt, retStartColumn, startLineNumber + lineFeedCnt, retEndColumn), m, captureMatches);
                    if (offsetInBuffer(m.index) + m[0].length >= end) {
                        return resultLen;
                    }
                    if (resultLen >= limitResultCount) {
                        return resultLen;
                    }
                }
            } while (m);
            return resultLen;
        }
        findMatchesLineByLine(searchRange, searchData, captureMatches, limitResultCount) {
            const result = [];
            let resultLen = 0;
            const searcher = new textModelSearch_1.$pD(searchData.wordSeparators, searchData.regex);
            let startPosition = this.H(searchRange.startLineNumber, searchRange.startColumn);
            if (startPosition === null) {
                return [];
            }
            const endPosition = this.H(searchRange.endLineNumber, searchRange.endColumn);
            if (endPosition === null) {
                return [];
            }
            let start = this.s(startPosition.node, startPosition.remainder);
            const end = this.s(endPosition.node, endPosition.remainder);
            if (startPosition.node === endPosition.node) {
                this.findMatchesInNode(startPosition.node, searcher, searchRange.startLineNumber, searchRange.startColumn, start, end, searchData, captureMatches, limitResultCount, resultLen, result);
                return result;
            }
            let startLineNumber = searchRange.startLineNumber;
            let currentNode = startPosition.node;
            while (currentNode !== endPosition.node) {
                const lineBreakCnt = this.t(currentNode.piece.bufferIndex, start, currentNode.piece.end);
                if (lineBreakCnt >= 1) {
                    // last line break position
                    const lineStarts = this.a[currentNode.piece.bufferIndex].lineStarts;
                    const startOffsetInBuffer = this.u(currentNode.piece.bufferIndex, currentNode.piece.start);
                    const nextLineStartOffset = lineStarts[start.line + lineBreakCnt];
                    const startColumn = startLineNumber === searchRange.startLineNumber ? searchRange.startColumn : 1;
                    resultLen = this.findMatchesInNode(currentNode, searcher, startLineNumber, startColumn, start, this.s(currentNode, nextLineStartOffset - startOffsetInBuffer), searchData, captureMatches, limitResultCount, resultLen, result);
                    if (resultLen >= limitResultCount) {
                        return result;
                    }
                    startLineNumber += lineBreakCnt;
                }
                const startColumn = startLineNumber === searchRange.startLineNumber ? searchRange.startColumn - 1 : 0;
                // search for the remaining content
                if (startLineNumber === searchRange.endLineNumber) {
                    const text = this.getLineContent(startLineNumber).substring(startColumn, searchRange.endColumn - 1);
                    resultLen = this.n(searchData, searcher, text, searchRange.endLineNumber, startColumn, resultLen, result, captureMatches, limitResultCount);
                    return result;
                }
                resultLen = this.n(searchData, searcher, this.getLineContent(startLineNumber).substr(startColumn), startLineNumber, startColumn, resultLen, result, captureMatches, limitResultCount);
                if (resultLen >= limitResultCount) {
                    return result;
                }
                startLineNumber++;
                startPosition = this.H(startLineNumber, 1);
                currentNode = startPosition.node;
                start = this.s(startPosition.node, startPosition.remainder);
            }
            if (startLineNumber === searchRange.endLineNumber) {
                const startColumn = startLineNumber === searchRange.startLineNumber ? searchRange.startColumn - 1 : 0;
                const text = this.getLineContent(startLineNumber).substring(startColumn, searchRange.endColumn - 1);
                resultLen = this.n(searchData, searcher, text, searchRange.endLineNumber, startColumn, resultLen, result, captureMatches, limitResultCount);
                return result;
            }
            const startColumn = startLineNumber === searchRange.startLineNumber ? searchRange.startColumn : 1;
            resultLen = this.findMatchesInNode(endPosition.node, searcher, startLineNumber, startColumn, start, end, searchData, captureMatches, limitResultCount, resultLen, result);
            return result;
        }
        n(searchData, searcher, text, lineNumber, deltaOffset, resultLen, result, captureMatches, limitResultCount) {
            const wordSeparators = searchData.wordSeparators;
            if (!captureMatches && searchData.simpleSearch) {
                const searchString = searchData.simpleSearch;
                const searchStringLen = searchString.length;
                const textLength = text.length;
                let lastMatchIndex = -searchStringLen;
                while ((lastMatchIndex = text.indexOf(searchString, lastMatchIndex + searchStringLen)) !== -1) {
                    if (!wordSeparators || (0, textModelSearch_1.$oD)(wordSeparators, text, textLength, lastMatchIndex, searchStringLen)) {
                        result[resultLen++] = new model_1.$ew(new range_1.$Ot(lineNumber, lastMatchIndex + 1 + deltaOffset, lineNumber, lastMatchIndex + 1 + searchStringLen + deltaOffset), null);
                        if (resultLen >= limitResultCount) {
                            return resultLen;
                        }
                    }
                }
                return resultLen;
            }
            let m;
            // Reset regex to search from the beginning
            searcher.reset(0);
            do {
                m = searcher.next(text);
                if (m) {
                    result[resultLen++] = (0, textModelSearch_1.$mD)(new range_1.$Ot(lineNumber, m.index + 1 + deltaOffset, lineNumber, m.index + 1 + m[0].length + deltaOffset), m, captureMatches);
                    if (resultLen >= limitResultCount) {
                        return resultLen;
                    }
                }
            } while (m);
            return resultLen;
        }
        // #endregion
        // #region Piece Table
        insert(offset, value, eolNormalized = false) {
            this.f = this.f && eolNormalized;
            this.j.lineNumber = 0;
            this.j.value = '';
            if (this.root !== rbTreeBase_1.$bD) {
                const { node, remainder, nodeStartOffset } = this.G(offset);
                const piece = node.piece;
                const bufferIndex = piece.bufferIndex;
                const insertPosInBuffer = this.s(node, remainder);
                if (node.piece.bufferIndex === 0 &&
                    piece.end.line === this.g.line &&
                    piece.end.column === this.g.column &&
                    (nodeStartOffset + piece.length === offset) &&
                    value.length < AverageBufferSize) {
                    // changed buffer
                    this.F(node, value);
                    this.y();
                    return;
                }
                if (nodeStartOffset === offset) {
                    this.o(value, node);
                    this.h.validate(offset);
                }
                else if (nodeStartOffset + node.piece.length > offset) {
                    // we are inserting into the middle of a node.
                    const nodesToDel = [];
                    let newRightPiece = new $sD(piece.bufferIndex, insertPosInBuffer, piece.end, this.t(piece.bufferIndex, insertPosInBuffer, piece.end), this.u(bufferIndex, piece.end) - this.u(bufferIndex, insertPosInBuffer));
                    if (this.K() && this.M(value)) {
                        const headOfRight = this.I(node, remainder);
                        if (headOfRight === 10 /** \n */) {
                            const newStart = { line: newRightPiece.start.line + 1, column: 0 };
                            newRightPiece = new $sD(newRightPiece.bufferIndex, newStart, newRightPiece.end, this.t(newRightPiece.bufferIndex, newStart, newRightPiece.end), newRightPiece.length - 1);
                            value += '\n';
                        }
                    }
                    // reuse node for content before insertion point.
                    if (this.K() && this.L(value)) {
                        const tailOfLeft = this.I(node, remainder - 1);
                        if (tailOfLeft === 13 /** \r */) {
                            const previousPos = this.s(node, remainder - 1);
                            this.C(node, previousPos);
                            value = '\r' + value;
                            if (node.piece.length === 0) {
                                nodesToDel.push(node);
                            }
                        }
                        else {
                            this.C(node, insertPosInBuffer);
                        }
                    }
                    else {
                        this.C(node, insertPosInBuffer);
                    }
                    const newPieces = this.w(value);
                    if (newRightPiece.length > 0) {
                        this.S(node, newRightPiece);
                    }
                    let tmpNode = node;
                    for (let k = 0; k < newPieces.length; k++) {
                        tmpNode = this.S(tmpNode, newPieces[k]);
                    }
                    this.v(nodesToDel);
                }
                else {
                    this.q(value, node);
                }
            }
            else {
                // insert new node
                const pieces = this.w(value);
                let node = this.T(null, pieces[0]);
                for (let k = 1; k < pieces.length; k++) {
                    node = this.S(node, pieces[k]);
                }
            }
            // todo, this is too brutal. Total line feed count should be updated the same way as lf_left.
            this.y();
        }
        delete(offset, cnt) {
            this.j.lineNumber = 0;
            this.j.value = '';
            if (cnt <= 0 || this.root === rbTreeBase_1.$bD) {
                return;
            }
            const startPosition = this.G(offset);
            const endPosition = this.G(offset + cnt);
            const startNode = startPosition.node;
            const endNode = endPosition.node;
            if (startNode === endNode) {
                const startSplitPosInBuffer = this.s(startNode, startPosition.remainder);
                const endSplitPosInBuffer = this.s(startNode, endPosition.remainder);
                if (startPosition.nodeStartOffset === offset) {
                    if (cnt === startNode.piece.length) { // delete node
                        const next = startNode.next();
                        (0, rbTreeBase_1.$gD)(this, startNode);
                        this.N(next);
                        this.y();
                        return;
                    }
                    this.D(startNode, endSplitPosInBuffer);
                    this.h.validate(offset);
                    this.N(startNode);
                    this.y();
                    return;
                }
                if (startPosition.nodeStartOffset + startNode.piece.length === offset + cnt) {
                    this.C(startNode, startSplitPosInBuffer);
                    this.O(startNode);
                    this.y();
                    return;
                }
                // delete content in the middle, this node will be splitted to nodes
                this.E(startNode, startSplitPosInBuffer, endSplitPosInBuffer);
                this.y();
                return;
            }
            const nodesToDel = [];
            const startSplitPosInBuffer = this.s(startNode, startPosition.remainder);
            this.C(startNode, startSplitPosInBuffer);
            this.h.validate(offset);
            if (startNode.piece.length === 0) {
                nodesToDel.push(startNode);
            }
            // update last touched node
            const endSplitPosInBuffer = this.s(endNode, endPosition.remainder);
            this.D(endNode, endSplitPosInBuffer);
            if (endNode.piece.length === 0) {
                nodesToDel.push(endNode);
            }
            // delete nodes in between
            const secondNode = startNode.next();
            for (let node = secondNode; node !== rbTreeBase_1.$bD && node !== endNode; node = node.next()) {
                nodesToDel.push(node);
            }
            const prev = startNode.piece.length === 0 ? startNode.prev() : startNode;
            this.v(nodesToDel);
            this.O(prev);
            this.y();
        }
        o(value, node) {
            // we are inserting content to the beginning of node
            const nodesToDel = [];
            if (this.K() && this.M(value) && this.L(node)) {
                // move `\n` to new node.
                const piece = node.piece;
                const newStart = { line: piece.start.line + 1, column: 0 };
                const nPiece = new $sD(piece.bufferIndex, newStart, piece.end, this.t(piece.bufferIndex, newStart, piece.end), piece.length - 1);
                node.piece = nPiece;
                value += '\n';
                (0, rbTreeBase_1.$iD)(this, node, -1, -1);
                if (node.piece.length === 0) {
                    nodesToDel.push(node);
                }
            }
            const newPieces = this.w(value);
            let newNode = this.T(node, newPieces[newPieces.length - 1]);
            for (let k = newPieces.length - 2; k >= 0; k--) {
                newNode = this.T(newNode, newPieces[k]);
            }
            this.N(newNode);
            this.v(nodesToDel);
        }
        q(value, node) {
            // we are inserting to the right of this node.
            if (this.Q(value, node)) {
                // move \n to the new node.
                value += '\n';
            }
            const newPieces = this.w(value);
            const newNode = this.S(node, newPieces[0]);
            let tmpNode = newNode;
            for (let k = 1; k < newPieces.length; k++) {
                tmpNode = this.S(tmpNode, newPieces[k]);
            }
            this.N(newNode);
        }
        s(node, remainder, ret) {
            const piece = node.piece;
            const bufferIndex = node.piece.bufferIndex;
            const lineStarts = this.a[bufferIndex].lineStarts;
            const startOffset = lineStarts[piece.start.line] + piece.start.column;
            const offset = startOffset + remainder;
            // binary search offset between startOffset and endOffset
            let low = piece.start.line;
            let high = piece.end.line;
            let mid = 0;
            let midStop = 0;
            let midStart = 0;
            while (low <= high) {
                mid = low + ((high - low) / 2) | 0;
                midStart = lineStarts[mid];
                if (mid === high) {
                    break;
                }
                midStop = lineStarts[mid + 1];
                if (offset < midStart) {
                    high = mid - 1;
                }
                else if (offset >= midStop) {
                    low = mid + 1;
                }
                else {
                    break;
                }
            }
            if (ret) {
                ret.line = mid;
                ret.column = offset - midStart;
                return null;
            }
            return {
                line: mid,
                column: offset - midStart
            };
        }
        t(bufferIndex, start, end) {
            // we don't need to worry about start: abc\r|\n, or abc|\r, or abc|\n, or abc|\r\n doesn't change the fact that, there is one line break after start.
            // now let's take care of end: abc\r|\n, if end is in between \r and \n, we need to add line feed count by 1
            if (end.column === 0) {
                return end.line - start.line;
            }
            const lineStarts = this.a[bufferIndex].lineStarts;
            if (end.line === lineStarts.length - 1) { // it means, there is no \n after end, otherwise, there will be one more lineStart.
                return end.line - start.line;
            }
            const nextLineStartOffset = lineStarts[end.line + 1];
            const endOffset = lineStarts[end.line] + end.column;
            if (nextLineStartOffset > endOffset + 1) { // there are more than 1 character after end, which means it can't be \n
                return end.line - start.line;
            }
            // endOffset + 1 === nextLineStartOffset
            // character at endOffset is \n, so we check the character before first
            // if character at endOffset is \r, end.column is 0 and we can't get here.
            const previousCharOffset = endOffset - 1; // end.column > 0 so it's okay.
            const buffer = this.a[bufferIndex].buffer;
            if (buffer.charCodeAt(previousCharOffset) === 13) {
                return end.line - start.line + 1;
            }
            else {
                return end.line - start.line;
            }
        }
        u(bufferIndex, cursor) {
            const lineStarts = this.a[bufferIndex].lineStarts;
            return lineStarts[cursor.line] + cursor.column;
        }
        v(nodes) {
            for (let i = 0; i < nodes.length; i++) {
                (0, rbTreeBase_1.$gD)(this, nodes[i]);
            }
        }
        w(text) {
            if (text.length > AverageBufferSize) {
                // the content is large, operations like substring, charCode becomes slow
                // so here we split it into smaller chunks, just like what we did for CR/LF normalization
                const newPieces = [];
                while (text.length > AverageBufferSize) {
                    const lastChar = text.charCodeAt(AverageBufferSize - 1);
                    let splitText;
                    if (lastChar === charCode_1.CharCode.CarriageReturn || (lastChar >= 0xD800 && lastChar <= 0xDBFF)) {
                        // last character is \r or a high surrogate => keep it back
                        splitText = text.substring(0, AverageBufferSize - 1);
                        text = text.substring(AverageBufferSize - 1);
                    }
                    else {
                        splitText = text.substring(0, AverageBufferSize);
                        text = text.substring(AverageBufferSize);
                    }
                    const lineStarts = $qD(splitText);
                    newPieces.push(new $sD(this.a.length, /* buffer index */ { line: 0, column: 0 }, { line: lineStarts.length - 1, column: splitText.length - lineStarts[lineStarts.length - 1] }, lineStarts.length - 1, splitText.length));
                    this.a.push(new $tD(splitText, lineStarts));
                }
                const lineStarts = $qD(text);
                newPieces.push(new $sD(this.a.length, /* buffer index */ { line: 0, column: 0 }, { line: lineStarts.length - 1, column: text.length - lineStarts[lineStarts.length - 1] }, lineStarts.length - 1, text.length));
                this.a.push(new $tD(text, lineStarts));
                return newPieces;
            }
            let startOffset = this.a[0].buffer.length;
            const lineStarts = $qD(text, false);
            let start = this.g;
            if (this.a[0].lineStarts[this.a[0].lineStarts.length - 1] === startOffset
                && startOffset !== 0
                && this.L(text)
                && this.M(this.a[0].buffer) // todo, we can check this._lastChangeBufferPos's column as it's the last one
            ) {
                this.g = { line: this.g.line, column: this.g.column + 1 };
                start = this.g;
                for (let i = 0; i < lineStarts.length; i++) {
                    lineStarts[i] += startOffset + 1;
                }
                this.a[0].lineStarts = this.a[0].lineStarts.concat(lineStarts.slice(1));
                this.a[0].buffer += '_' + text;
                startOffset += 1;
            }
            else {
                if (startOffset !== 0) {
                    for (let i = 0; i < lineStarts.length; i++) {
                        lineStarts[i] += startOffset;
                    }
                }
                this.a[0].lineStarts = this.a[0].lineStarts.concat(lineStarts.slice(1));
                this.a[0].buffer += text;
            }
            const endOffset = this.a[0].buffer.length;
            const endIndex = this.a[0].lineStarts.length - 1;
            const endColumn = endOffset - this.a[0].lineStarts[endIndex];
            const endPos = { line: endIndex, column: endColumn };
            const newPiece = new $sD(0, /** todo@peng */ start, endPos, this.t(0, start, endPos), endOffset - startOffset);
            this.g = endPos;
            return [newPiece];
        }
        getLinesRawContent() {
            return this.U(this.root);
        }
        getLineRawContent(lineNumber, endOffset = 0) {
            let x = this.root;
            let ret = '';
            const cache = this.h.get2(lineNumber);
            if (cache) {
                x = cache.node;
                const prevAccumulatedValue = this.B(x, lineNumber - cache.nodeStartLineNumber - 1);
                const buffer = this.a[x.piece.bufferIndex].buffer;
                const startOffset = this.u(x.piece.bufferIndex, x.piece.start);
                if (cache.nodeStartLineNumber + x.piece.lineFeedCnt === lineNumber) {
                    ret = buffer.substring(startOffset + prevAccumulatedValue, startOffset + x.piece.length);
                }
                else {
                    const accumulatedValue = this.B(x, lineNumber - cache.nodeStartLineNumber);
                    return buffer.substring(startOffset + prevAccumulatedValue, startOffset + accumulatedValue - endOffset);
                }
            }
            else {
                let nodeStartOffset = 0;
                const originalLineNumber = lineNumber;
                while (x !== rbTreeBase_1.$bD) {
                    if (x.left !== rbTreeBase_1.$bD && x.lf_left >= lineNumber - 1) {
                        x = x.left;
                    }
                    else if (x.lf_left + x.piece.lineFeedCnt > lineNumber - 1) {
                        const prevAccumulatedValue = this.B(x, lineNumber - x.lf_left - 2);
                        const accumulatedValue = this.B(x, lineNumber - x.lf_left - 1);
                        const buffer = this.a[x.piece.bufferIndex].buffer;
                        const startOffset = this.u(x.piece.bufferIndex, x.piece.start);
                        nodeStartOffset += x.size_left;
                        this.h.set({
                            node: x,
                            nodeStartOffset,
                            nodeStartLineNumber: originalLineNumber - (lineNumber - 1 - x.lf_left)
                        });
                        return buffer.substring(startOffset + prevAccumulatedValue, startOffset + accumulatedValue - endOffset);
                    }
                    else if (x.lf_left + x.piece.lineFeedCnt === lineNumber - 1) {
                        const prevAccumulatedValue = this.B(x, lineNumber - x.lf_left - 2);
                        const buffer = this.a[x.piece.bufferIndex].buffer;
                        const startOffset = this.u(x.piece.bufferIndex, x.piece.start);
                        ret = buffer.substring(startOffset + prevAccumulatedValue, startOffset + x.piece.length);
                        break;
                    }
                    else {
                        lineNumber -= x.lf_left + x.piece.lineFeedCnt;
                        nodeStartOffset += x.size_left + x.piece.length;
                        x = x.right;
                    }
                }
            }
            // search in order, to find the node contains end column
            x = x.next();
            while (x !== rbTreeBase_1.$bD) {
                const buffer = this.a[x.piece.bufferIndex].buffer;
                if (x.piece.lineFeedCnt > 0) {
                    const accumulatedValue = this.B(x, 0);
                    const startOffset = this.u(x.piece.bufferIndex, x.piece.start);
                    ret += buffer.substring(startOffset, startOffset + accumulatedValue - endOffset);
                    return ret;
                }
                else {
                    const startOffset = this.u(x.piece.bufferIndex, x.piece.start);
                    ret += buffer.substr(startOffset, x.piece.length);
                }
                x = x.next();
            }
            return ret;
        }
        y() {
            let x = this.root;
            let lfCnt = 1;
            let len = 0;
            while (x !== rbTreeBase_1.$bD) {
                lfCnt += x.lf_left + x.piece.lineFeedCnt;
                len += x.size_left + x.piece.length;
                x = x.right;
            }
            this.b = lfCnt;
            this.c = len;
            this.h.validate(this.c);
        }
        // #region node operations
        A(node, accumulatedValue) {
            const piece = node.piece;
            const pos = this.s(node, accumulatedValue);
            const lineCnt = pos.line - piece.start.line;
            if (this.u(piece.bufferIndex, piece.end) - this.u(piece.bufferIndex, piece.start) === accumulatedValue) {
                // we are checking the end of this node, so a CRLF check is necessary.
                const realLineCnt = this.t(node.piece.bufferIndex, piece.start, pos);
                if (realLineCnt !== lineCnt) {
                    // aha yes, CRLF
                    return { index: realLineCnt, remainder: 0 };
                }
            }
            return { index: lineCnt, remainder: pos.column };
        }
        B(node, index) {
            if (index < 0) {
                return 0;
            }
            const piece = node.piece;
            const lineStarts = this.a[piece.bufferIndex].lineStarts;
            const expectedLineStartIndex = piece.start.line + index + 1;
            if (expectedLineStartIndex > piece.end.line) {
                return lineStarts[piece.end.line] + piece.end.column - lineStarts[piece.start.line] - piece.start.column;
            }
            else {
                return lineStarts[expectedLineStartIndex] - lineStarts[piece.start.line] - piece.start.column;
            }
        }
        C(node, pos) {
            const piece = node.piece;
            const originalLFCnt = piece.lineFeedCnt;
            const originalEndOffset = this.u(piece.bufferIndex, piece.end);
            const newEnd = pos;
            const newEndOffset = this.u(piece.bufferIndex, newEnd);
            const newLineFeedCnt = this.t(piece.bufferIndex, piece.start, newEnd);
            const lf_delta = newLineFeedCnt - originalLFCnt;
            const size_delta = newEndOffset - originalEndOffset;
            const newLength = piece.length + size_delta;
            node.piece = new $sD(piece.bufferIndex, piece.start, newEnd, newLineFeedCnt, newLength);
            (0, rbTreeBase_1.$iD)(this, node, size_delta, lf_delta);
        }
        D(node, pos) {
            const piece = node.piece;
            const originalLFCnt = piece.lineFeedCnt;
            const originalStartOffset = this.u(piece.bufferIndex, piece.start);
            const newStart = pos;
            const newLineFeedCnt = this.t(piece.bufferIndex, newStart, piece.end);
            const newStartOffset = this.u(piece.bufferIndex, newStart);
            const lf_delta = newLineFeedCnt - originalLFCnt;
            const size_delta = originalStartOffset - newStartOffset;
            const newLength = piece.length + size_delta;
            node.piece = new $sD(piece.bufferIndex, newStart, piece.end, newLineFeedCnt, newLength);
            (0, rbTreeBase_1.$iD)(this, node, size_delta, lf_delta);
        }
        E(node, start, end) {
            const piece = node.piece;
            const originalStartPos = piece.start;
            const originalEndPos = piece.end;
            // old piece, originalStartPos, start
            const oldLength = piece.length;
            const oldLFCnt = piece.lineFeedCnt;
            const newEnd = start;
            const newLineFeedCnt = this.t(piece.bufferIndex, piece.start, newEnd);
            const newLength = this.u(piece.bufferIndex, start) - this.u(piece.bufferIndex, originalStartPos);
            node.piece = new $sD(piece.bufferIndex, piece.start, newEnd, newLineFeedCnt, newLength);
            (0, rbTreeBase_1.$iD)(this, node, newLength - oldLength, newLineFeedCnt - oldLFCnt);
            // new right piece, end, originalEndPos
            const newPiece = new $sD(piece.bufferIndex, end, originalEndPos, this.t(piece.bufferIndex, end, originalEndPos), this.u(piece.bufferIndex, originalEndPos) - this.u(piece.bufferIndex, end));
            const newNode = this.S(node, newPiece);
            this.N(newNode);
        }
        F(node, value) {
            if (this.Q(value, node)) {
                value += '\n';
            }
            const hitCRLF = this.K() && this.L(value) && this.M(node);
            const startOffset = this.a[0].buffer.length;
            this.a[0].buffer += value;
            const lineStarts = $qD(value, false);
            for (let i = 0; i < lineStarts.length; i++) {
                lineStarts[i] += startOffset;
            }
            if (hitCRLF) {
                const prevStartOffset = this.a[0].lineStarts[this.a[0].lineStarts.length - 2];
                this.a[0].lineStarts.pop();
                // _lastChangeBufferPos is already wrong
                this.g = { line: this.g.line - 1, column: startOffset - prevStartOffset };
            }
            this.a[0].lineStarts = this.a[0].lineStarts.concat(lineStarts.slice(1));
            const endIndex = this.a[0].lineStarts.length - 1;
            const endColumn = this.a[0].buffer.length - this.a[0].lineStarts[endIndex];
            const newEnd = { line: endIndex, column: endColumn };
            const newLength = node.piece.length + value.length;
            const oldLineFeedCnt = node.piece.lineFeedCnt;
            const newLineFeedCnt = this.t(0, node.piece.start, newEnd);
            const lf_delta = newLineFeedCnt - oldLineFeedCnt;
            node.piece = new $sD(node.piece.bufferIndex, node.piece.start, newEnd, newLineFeedCnt, newLength);
            this.g = newEnd;
            (0, rbTreeBase_1.$iD)(this, node, value.length, lf_delta);
        }
        G(offset) {
            let x = this.root;
            const cache = this.h.get(offset);
            if (cache) {
                return {
                    node: cache.node,
                    nodeStartOffset: cache.nodeStartOffset,
                    remainder: offset - cache.nodeStartOffset
                };
            }
            let nodeStartOffset = 0;
            while (x !== rbTreeBase_1.$bD) {
                if (x.size_left > offset) {
                    x = x.left;
                }
                else if (x.size_left + x.piece.length >= offset) {
                    nodeStartOffset += x.size_left;
                    const ret = {
                        node: x,
                        remainder: offset - x.size_left,
                        nodeStartOffset
                    };
                    this.h.set(ret);
                    return ret;
                }
                else {
                    offset -= x.size_left + x.piece.length;
                    nodeStartOffset += x.size_left + x.piece.length;
                    x = x.right;
                }
            }
            return null;
        }
        H(lineNumber, column) {
            let x = this.root;
            let nodeStartOffset = 0;
            while (x !== rbTreeBase_1.$bD) {
                if (x.left !== rbTreeBase_1.$bD && x.lf_left >= lineNumber - 1) {
                    x = x.left;
                }
                else if (x.lf_left + x.piece.lineFeedCnt > lineNumber - 1) {
                    const prevAccumualtedValue = this.B(x, lineNumber - x.lf_left - 2);
                    const accumulatedValue = this.B(x, lineNumber - x.lf_left - 1);
                    nodeStartOffset += x.size_left;
                    return {
                        node: x,
                        remainder: Math.min(prevAccumualtedValue + column - 1, accumulatedValue),
                        nodeStartOffset
                    };
                }
                else if (x.lf_left + x.piece.lineFeedCnt === lineNumber - 1) {
                    const prevAccumualtedValue = this.B(x, lineNumber - x.lf_left - 2);
                    if (prevAccumualtedValue + column - 1 <= x.piece.length) {
                        return {
                            node: x,
                            remainder: prevAccumualtedValue + column - 1,
                            nodeStartOffset
                        };
                    }
                    else {
                        column -= x.piece.length - prevAccumualtedValue;
                        break;
                    }
                }
                else {
                    lineNumber -= x.lf_left + x.piece.lineFeedCnt;
                    nodeStartOffset += x.size_left + x.piece.length;
                    x = x.right;
                }
            }
            // search in order, to find the node contains position.column
            x = x.next();
            while (x !== rbTreeBase_1.$bD) {
                if (x.piece.lineFeedCnt > 0) {
                    const accumulatedValue = this.B(x, 0);
                    const nodeStartOffset = this.J(x);
                    return {
                        node: x,
                        remainder: Math.min(column - 1, accumulatedValue),
                        nodeStartOffset
                    };
                }
                else {
                    if (x.piece.length >= column - 1) {
                        const nodeStartOffset = this.J(x);
                        return {
                            node: x,
                            remainder: column - 1,
                            nodeStartOffset
                        };
                    }
                    else {
                        column -= x.piece.length;
                    }
                }
                x = x.next();
            }
            return null;
        }
        I(node, offset) {
            if (node.piece.lineFeedCnt < 1) {
                return -1;
            }
            const buffer = this.a[node.piece.bufferIndex];
            const newOffset = this.u(node.piece.bufferIndex, node.piece.start) + offset;
            return buffer.buffer.charCodeAt(newOffset);
        }
        J(node) {
            if (!node) {
                return 0;
            }
            let pos = node.size_left;
            while (node !== this.root) {
                if (node.parent.right === node) {
                    pos += node.parent.size_left + node.parent.piece.length;
                }
                node = node.parent;
            }
            return pos;
        }
        // #endregion
        // #region CRLF
        K() {
            return !(this.f && this.d === '\n');
        }
        L(val) {
            if (typeof val === 'string') {
                return val.charCodeAt(0) === 10;
            }
            if (val === rbTreeBase_1.$bD || val.piece.lineFeedCnt === 0) {
                return false;
            }
            const piece = val.piece;
            const lineStarts = this.a[piece.bufferIndex].lineStarts;
            const line = piece.start.line;
            const startOffset = lineStarts[line] + piece.start.column;
            if (line === lineStarts.length - 1) {
                // last line, so there is no line feed at the end of this line
                return false;
            }
            const nextLineOffset = lineStarts[line + 1];
            if (nextLineOffset > startOffset + 1) {
                return false;
            }
            return this.a[piece.bufferIndex].buffer.charCodeAt(startOffset) === 10;
        }
        M(val) {
            if (typeof val === 'string') {
                return val.charCodeAt(val.length - 1) === 13;
            }
            if (val === rbTreeBase_1.$bD || val.piece.lineFeedCnt === 0) {
                return false;
            }
            return this.I(val, val.piece.length - 1) === 13;
        }
        N(nextNode) {
            if (this.K() && this.L(nextNode)) {
                const node = nextNode.prev();
                if (this.M(node)) {
                    this.P(node, nextNode);
                }
            }
        }
        O(node) {
            if (this.K() && this.M(node)) {
                const nextNode = node.next();
                if (this.L(nextNode)) {
                    this.P(node, nextNode);
                }
            }
        }
        P(prev, next) {
            const nodesToDel = [];
            // update node
            const lineStarts = this.a[prev.piece.bufferIndex].lineStarts;
            let newEnd;
            if (prev.piece.end.column === 0) {
                // it means, last line ends with \r, not \r\n
                newEnd = { line: prev.piece.end.line - 1, column: lineStarts[prev.piece.end.line] - lineStarts[prev.piece.end.line - 1] - 1 };
            }
            else {
                // \r\n
                newEnd = { line: prev.piece.end.line, column: prev.piece.end.column - 1 };
            }
            const prevNewLength = prev.piece.length - 1;
            const prevNewLFCnt = prev.piece.lineFeedCnt - 1;
            prev.piece = new $sD(prev.piece.bufferIndex, prev.piece.start, newEnd, prevNewLFCnt, prevNewLength);
            (0, rbTreeBase_1.$iD)(this, prev, -1, -1);
            if (prev.piece.length === 0) {
                nodesToDel.push(prev);
            }
            // update nextNode
            const newStart = { line: next.piece.start.line + 1, column: 0 };
            const newLength = next.piece.length - 1;
            const newLineFeedCnt = this.t(next.piece.bufferIndex, newStart, next.piece.end);
            next.piece = new $sD(next.piece.bufferIndex, newStart, next.piece.end, newLineFeedCnt, newLength);
            (0, rbTreeBase_1.$iD)(this, next, -1, -1);
            if (next.piece.length === 0) {
                nodesToDel.push(next);
            }
            // create new piece which contains \r\n
            const pieces = this.w('\r\n');
            this.S(prev, pieces[0]);
            // delete empty nodes
            for (let i = 0; i < nodesToDel.length; i++) {
                (0, rbTreeBase_1.$gD)(this, nodesToDel[i]);
            }
        }
        Q(value, node) {
            if (this.K() && this.M(value)) {
                const nextNode = node.next();
                if (this.L(nextNode)) {
                    // move `\n` forward
                    value += '\n';
                    if (nextNode.piece.length === 1) {
                        (0, rbTreeBase_1.$gD)(this, nextNode);
                    }
                    else {
                        const piece = nextNode.piece;
                        const newStart = { line: piece.start.line + 1, column: 0 };
                        const newLength = piece.length - 1;
                        const newLineFeedCnt = this.t(piece.bufferIndex, newStart, piece.end);
                        nextNode.piece = new $sD(piece.bufferIndex, newStart, piece.end, newLineFeedCnt, newLength);
                        (0, rbTreeBase_1.$iD)(this, nextNode, -1, -1);
                    }
                    return true;
                }
            }
            return false;
        }
        // #endregion
        // #endregion
        // #region Tree operations
        iterate(node, callback) {
            if (node === rbTreeBase_1.$bD) {
                return callback(rbTreeBase_1.$bD);
            }
            const leftRet = this.iterate(node.left, callback);
            if (!leftRet) {
                return leftRet;
            }
            return callback(node) && this.iterate(node.right, callback);
        }
        R(node) {
            if (node === rbTreeBase_1.$bD) {
                return '';
            }
            const buffer = this.a[node.piece.bufferIndex];
            const piece = node.piece;
            const startOffset = this.u(piece.bufferIndex, piece.start);
            const endOffset = this.u(piece.bufferIndex, piece.end);
            const currentContent = buffer.buffer.substring(startOffset, endOffset);
            return currentContent;
        }
        getPieceContent(piece) {
            const buffer = this.a[piece.bufferIndex];
            const startOffset = this.u(piece.bufferIndex, piece.start);
            const endOffset = this.u(piece.bufferIndex, piece.end);
            const currentContent = buffer.buffer.substring(startOffset, endOffset);
            return currentContent;
        }
        /**
         *      node              node
         *     /  \              /  \
         *    a   b    <----   a    b
         *                         /
         *                        z
         */
        S(node, p) {
            const z = new rbTreeBase_1.$aD(p, rbTreeBase_1.NodeColor.Red);
            z.left = rbTreeBase_1.$bD;
            z.right = rbTreeBase_1.$bD;
            z.parent = rbTreeBase_1.$bD;
            z.size_left = 0;
            z.lf_left = 0;
            const x = this.root;
            if (x === rbTreeBase_1.$bD) {
                this.root = z;
                z.color = rbTreeBase_1.NodeColor.Black;
            }
            else if (node.right === rbTreeBase_1.$bD) {
                node.right = z;
                z.parent = node;
            }
            else {
                const nextNode = (0, rbTreeBase_1.$cD)(node.right);
                nextNode.left = z;
                z.parent = nextNode;
            }
            (0, rbTreeBase_1.$hD)(this, z);
            return z;
        }
        /**
         *      node              node
         *     /  \              /  \
         *    a   b     ---->   a    b
         *                       \
         *                        z
         */
        T(node, p) {
            const z = new rbTreeBase_1.$aD(p, rbTreeBase_1.NodeColor.Red);
            z.left = rbTreeBase_1.$bD;
            z.right = rbTreeBase_1.$bD;
            z.parent = rbTreeBase_1.$bD;
            z.size_left = 0;
            z.lf_left = 0;
            if (this.root === rbTreeBase_1.$bD) {
                this.root = z;
                z.color = rbTreeBase_1.NodeColor.Black;
            }
            else if (node.left === rbTreeBase_1.$bD) {
                node.left = z;
                z.parent = node;
            }
            else {
                const prevNode = (0, rbTreeBase_1.$dD)(node.left); // a
                prevNode.right = z;
                z.parent = prevNode;
            }
            (0, rbTreeBase_1.$hD)(this, z);
            return z;
        }
        U(node) {
            let str = '';
            this.iterate(node, node => {
                str += this.R(node);
                return true;
            });
            return str;
        }
    }
    exports.$uD = $uD;
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/























define(__m[30/*vs/editor/common/model/pieceTreeTextBuffer/pieceTreeTextBuffer*/], __M([0/*require*/,1/*exports*/,22/*vs/base/common/event*/,4/*vs/base/common/strings*/,14/*vs/editor/common/core/range*/,9/*vs/editor/common/model*/,13/*vs/editor/common/model/pieceTreeTextBuffer/pieceTreeBase*/,25/*vs/editor/common/core/eolCounter*/,27/*vs/editor/common/core/textChange*/,10/*vs/base/common/lifecycle*/]), function (require, exports, event_1, strings, range_1, model_1, pieceTreeBase_1, eolCounter_1, textChange_1, lifecycle_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.$vD = void 0;
    strings = __importStar(strings);
    class $vD extends lifecycle_1.$Uc {
        constructor(chunks, BOM, eol, containsRTL, containsUnusualLineTerminators, isBasicASCII, eolNormalized) {
            super();
            this.m = this.B(new event_1.$le());
            this.onDidChangeContent = this.m.event;
            this.f = BOM;
            this.j = !isBasicASCII;
            this.g = containsRTL;
            this.h = containsUnusualLineTerminators;
            this.c = new pieceTreeBase_1.$uD(chunks, eol, eolNormalized);
        }
        // #region TextBuffer
        equals(other) {
            if (!(other instanceof $vD)) {
                return false;
            }
            if (this.f !== other.f) {
                return false;
            }
            if (this.getEOL() !== other.getEOL()) {
                return false;
            }
            return this.c.equal(other.c);
        }
        mightContainRTL() {
            return this.g;
        }
        mightContainUnusualLineTerminators() {
            return this.h;
        }
        resetMightContainUnusualLineTerminators() {
            this.h = false;
        }
        mightContainNonBasicASCII() {
            return this.j;
        }
        getBOM() {
            return this.f;
        }
        getEOL() {
            return this.c.getEOL();
        }
        createSnapshot(preserveBOM) {
            return this.c.createSnapshot(preserveBOM ? this.f : '');
        }
        getOffsetAt(lineNumber, column) {
            return this.c.getOffsetAt(lineNumber, column);
        }
        getPositionAt(offset) {
            return this.c.getPositionAt(offset);
        }
        getRangeAt(start, length) {
            const end = start + length;
            const startPosition = this.getPositionAt(start);
            const endPosition = this.getPositionAt(end);
            return new range_1.$Ot(startPosition.lineNumber, startPosition.column, endPosition.lineNumber, endPosition.column);
        }
        getValueInRange(range, eol = model_1.EndOfLinePreference.TextDefined) {
            if (range.isEmpty()) {
                return '';
            }
            const lineEnding = this.n(eol);
            return this.c.getValueInRange(range, lineEnding);
        }
        getValueLengthInRange(range, eol = model_1.EndOfLinePreference.TextDefined) {
            if (range.isEmpty()) {
                return 0;
            }
            if (range.startLineNumber === range.endLineNumber) {
                return (range.endColumn - range.startColumn);
            }
            const startOffset = this.getOffsetAt(range.startLineNumber, range.startColumn);
            const endOffset = this.getOffsetAt(range.endLineNumber, range.endColumn);
            // offsets use the text EOL, so we need to compensate for length differences
            // if the requested EOL doesn't match the text EOL
            let eolOffsetCompensation = 0;
            const desiredEOL = this.n(eol);
            const actualEOL = this.getEOL();
            if (desiredEOL.length !== actualEOL.length) {
                const delta = desiredEOL.length - actualEOL.length;
                const eolCount = range.endLineNumber - range.startLineNumber;
                eolOffsetCompensation = delta * eolCount;
            }
            return endOffset - startOffset + eolOffsetCompensation;
        }
        getCharacterCountInRange(range, eol = model_1.EndOfLinePreference.TextDefined) {
            if (this.j) {
                // we must count by iterating
                let result = 0;
                const fromLineNumber = range.startLineNumber;
                const toLineNumber = range.endLineNumber;
                for (let lineNumber = fromLineNumber; lineNumber <= toLineNumber; lineNumber++) {
                    const lineContent = this.getLineContent(lineNumber);
                    const fromOffset = (lineNumber === fromLineNumber ? range.startColumn - 1 : 0);
                    const toOffset = (lineNumber === toLineNumber ? range.endColumn - 1 : lineContent.length);
                    for (let offset = fromOffset; offset < toOffset; offset++) {
                        if (strings.$Jf(lineContent.charCodeAt(offset))) {
                            result = result + 1;
                            offset = offset + 1;
                        }
                        else {
                            result = result + 1;
                        }
                    }
                }
                result += this.n(eol).length * (toLineNumber - fromLineNumber);
                return result;
            }
            return this.getValueLengthInRange(range, eol);
        }
        getNearestChunk(offset) {
            return this.c.getNearestChunk(offset);
        }
        getLength() {
            return this.c.getLength();
        }
        getLineCount() {
            return this.c.getLineCount();
        }
        getLinesContent() {
            return this.c.getLinesContent();
        }
        getLineContent(lineNumber) {
            return this.c.getLineContent(lineNumber);
        }
        getLineCharCode(lineNumber, index) {
            return this.c.getLineCharCode(lineNumber, index);
        }
        getCharCode(offset) {
            return this.c.getCharCode(offset);
        }
        getLineLength(lineNumber) {
            return this.c.getLineLength(lineNumber);
        }
        getLineMinColumn(lineNumber) {
            return 1;
        }
        getLineMaxColumn(lineNumber) {
            return this.getLineLength(lineNumber) + 1;
        }
        getLineFirstNonWhitespaceColumn(lineNumber) {
            const result = strings.$uf(this.getLineContent(lineNumber));
            if (result === -1) {
                return 0;
            }
            return result + 1;
        }
        getLineLastNonWhitespaceColumn(lineNumber) {
            const result = strings.$wf(this.getLineContent(lineNumber));
            if (result === -1) {
                return 0;
            }
            return result + 2;
        }
        n(eol) {
            switch (eol) {
                case model_1.EndOfLinePreference.LF:
                    return '\n';
                case model_1.EndOfLinePreference.CRLF:
                    return '\r\n';
                case model_1.EndOfLinePreference.TextDefined:
                    return this.getEOL();
                default:
                    throw new Error('Unknown EOL preference');
            }
        }
        setEOL(newEOL) {
            this.c.setEOL(newEOL);
        }
        applyEdits(rawOperations, recordTrimAutoWhitespace, computeUndoEdits) {
            let mightContainRTL = this.g;
            let mightContainUnusualLineTerminators = this.h;
            let mightContainNonBasicASCII = this.j;
            let canReduceOperations = true;
            let operations = [];
            for (let i = 0; i < rawOperations.length; i++) {
                const op = rawOperations[i];
                if (canReduceOperations && op._isTracked) {
                    canReduceOperations = false;
                }
                const validatedRange = op.range;
                if (op.text) {
                    let textMightContainNonBasicASCII = true;
                    if (!mightContainNonBasicASCII) {
                        textMightContainNonBasicASCII = !strings.$Uf(op.text);
                        mightContainNonBasicASCII = textMightContainNonBasicASCII;
                    }
                    if (!mightContainRTL && textMightContainNonBasicASCII) {
                        // check if the new inserted text contains RTL
                        mightContainRTL = strings.$Tf(op.text);
                    }
                    if (!mightContainUnusualLineTerminators && textMightContainNonBasicASCII) {
                        // check if the new inserted text contains unusual line terminators
                        mightContainUnusualLineTerminators = strings.$Wf(op.text);
                    }
                }
                let validText = '';
                let eolCount = 0;
                let firstLineLength = 0;
                let lastLineLength = 0;
                if (op.text) {
                    let strEOL;
                    [eolCount, firstLineLength, lastLineLength, strEOL] = (0, eolCounter_1.$zu)(op.text);
                    const bufferEOL = this.getEOL();
                    const expectedStrEOL = (bufferEOL === '\r\n' ? eolCounter_1.StringEOL.CRLF : eolCounter_1.StringEOL.LF);
                    if (strEOL === eolCounter_1.StringEOL.Unknown || strEOL === expectedStrEOL) {
                        validText = op.text;
                    }
                    else {
                        validText = op.text.replace(/\r\n|\r|\n/g, bufferEOL);
                    }
                }
                operations[i] = {
                    sortIndex: i,
                    identifier: op.identifier || null,
                    range: validatedRange,
                    rangeOffset: this.getOffsetAt(validatedRange.startLineNumber, validatedRange.startColumn),
                    rangeLength: this.getValueLengthInRange(validatedRange),
                    text: validText,
                    eolCount: eolCount,
                    firstLineLength: firstLineLength,
                    lastLineLength: lastLineLength,
                    forceMoveMarkers: Boolean(op.forceMoveMarkers),
                    isAutoWhitespaceEdit: op.isAutoWhitespaceEdit || false
                };
            }
            // Sort operations ascending
            operations.sort($vD.u);
            let hasTouchingRanges = false;
            for (let i = 0, count = operations.length - 1; i < count; i++) {
                const rangeEnd = operations[i].range.getEndPosition();
                const nextRangeStart = operations[i + 1].range.getStartPosition();
                if (nextRangeStart.isBeforeOrEqual(rangeEnd)) {
                    if (nextRangeStart.isBefore(rangeEnd)) {
                        // overlapping ranges
                        throw new Error('Overlapping ranges are not allowed!');
                    }
                    hasTouchingRanges = true;
                }
            }
            if (canReduceOperations) {
                operations = this.s(operations);
            }
            // Delta encode operations
            const reverseRanges = (computeUndoEdits || recordTrimAutoWhitespace ? $vD._getInverseEditRanges(operations) : []);
            const newTrimAutoWhitespaceCandidates = [];
            if (recordTrimAutoWhitespace) {
                for (let i = 0; i < operations.length; i++) {
                    const op = operations[i];
                    const reverseRange = reverseRanges[i];
                    if (op.isAutoWhitespaceEdit && op.range.isEmpty()) {
                        // Record already the future line numbers that might be auto whitespace removal candidates on next edit
                        for (let lineNumber = reverseRange.startLineNumber; lineNumber <= reverseRange.endLineNumber; lineNumber++) {
                            let currentLineContent = '';
                            if (lineNumber === reverseRange.startLineNumber) {
                                currentLineContent = this.getLineContent(op.range.startLineNumber);
                                if (strings.$uf(currentLineContent) !== -1) {
                                    continue;
                                }
                            }
                            newTrimAutoWhitespaceCandidates.push({ lineNumber: lineNumber, oldContent: currentLineContent });
                        }
                    }
                }
            }
            let reverseOperations = null;
            if (computeUndoEdits) {
                let reverseRangeDeltaOffset = 0;
                reverseOperations = [];
                for (let i = 0; i < operations.length; i++) {
                    const op = operations[i];
                    const reverseRange = reverseRanges[i];
                    const bufferText = this.getValueInRange(op.range);
                    const reverseRangeOffset = op.rangeOffset + reverseRangeDeltaOffset;
                    reverseRangeDeltaOffset += (op.text.length - bufferText.length);
                    reverseOperations[i] = {
                        sortIndex: op.sortIndex,
                        identifier: op.identifier,
                        range: reverseRange,
                        text: bufferText,
                        textChange: new textChange_1.$fu(op.rangeOffset, bufferText, reverseRangeOffset, op.text)
                    };
                }
                // Can only sort reverse operations when the order is not significant
                if (!hasTouchingRanges) {
                    reverseOperations.sort((a, b) => a.sortIndex - b.sortIndex);
                }
            }
            this.g = mightContainRTL;
            this.h = mightContainUnusualLineTerminators;
            this.j = mightContainNonBasicASCII;
            const contentChanges = this.t(operations);
            let trimAutoWhitespaceLineNumbers = null;
            if (recordTrimAutoWhitespace && newTrimAutoWhitespaceCandidates.length > 0) {
                // sort line numbers auto whitespace removal candidates for next edit descending
                newTrimAutoWhitespaceCandidates.sort((a, b) => b.lineNumber - a.lineNumber);
                trimAutoWhitespaceLineNumbers = [];
                for (let i = 0, len = newTrimAutoWhitespaceCandidates.length; i < len; i++) {
                    const lineNumber = newTrimAutoWhitespaceCandidates[i].lineNumber;
                    if (i > 0 && newTrimAutoWhitespaceCandidates[i - 1].lineNumber === lineNumber) {
                        // Do not have the same line number twice
                        continue;
                    }
                    const prevContent = newTrimAutoWhitespaceCandidates[i].oldContent;
                    const lineContent = this.getLineContent(lineNumber);
                    if (lineContent.length === 0 || lineContent === prevContent || strings.$uf(lineContent) !== -1) {
                        continue;
                    }
                    trimAutoWhitespaceLineNumbers.push(lineNumber);
                }
            }
            this.m.fire();
            return new model_1.$iw(reverseOperations, contentChanges, trimAutoWhitespaceLineNumbers);
        }
        /**
         * Transform operations such that they represent the same logic edit,
         * but that they also do not cause OOM crashes.
         */
        s(operations) {
            if (operations.length < 1000) {
                // We know from empirical testing that a thousand edits work fine regardless of their shape.
                return operations;
            }
            // At one point, due to how events are emitted and how each operation is handled,
            // some operations can trigger a high amount of temporary string allocations,
            // that will immediately get edited again.
            // e.g. a formatter inserting ridiculous ammounts of \n on a model with a single line
            // Therefore, the strategy is to collapse all the operations into a huge single edit operation
            return [this._toSingleEditOperation(operations)];
        }
        _toSingleEditOperation(operations) {
            let forceMoveMarkers = false;
            const firstEditRange = operations[0].range;
            const lastEditRange = operations[operations.length - 1].range;
            const entireEditRange = new range_1.$Ot(firstEditRange.startLineNumber, firstEditRange.startColumn, lastEditRange.endLineNumber, lastEditRange.endColumn);
            let lastEndLineNumber = firstEditRange.startLineNumber;
            let lastEndColumn = firstEditRange.startColumn;
            const result = [];
            for (let i = 0, len = operations.length; i < len; i++) {
                const operation = operations[i];
                const range = operation.range;
                forceMoveMarkers = forceMoveMarkers || operation.forceMoveMarkers;
                // (1) -- Push old text
                result.push(this.getValueInRange(new range_1.$Ot(lastEndLineNumber, lastEndColumn, range.startLineNumber, range.startColumn)));
                // (2) -- Push new text
                if (operation.text.length > 0) {
                    result.push(operation.text);
                }
                lastEndLineNumber = range.endLineNumber;
                lastEndColumn = range.endColumn;
            }
            const text = result.join('');
            const [eolCount, firstLineLength, lastLineLength] = (0, eolCounter_1.$zu)(text);
            return {
                sortIndex: 0,
                identifier: operations[0].identifier,
                range: entireEditRange,
                rangeOffset: this.getOffsetAt(entireEditRange.startLineNumber, entireEditRange.startColumn),
                rangeLength: this.getValueLengthInRange(entireEditRange, model_1.EndOfLinePreference.TextDefined),
                text: text,
                eolCount: eolCount,
                firstLineLength: firstLineLength,
                lastLineLength: lastLineLength,
                forceMoveMarkers: forceMoveMarkers,
                isAutoWhitespaceEdit: false
            };
        }
        t(operations) {
            operations.sort($vD.w);
            const contentChanges = [];
            // operations are from bottom to top
            for (let i = 0; i < operations.length; i++) {
                const op = operations[i];
                const startLineNumber = op.range.startLineNumber;
                const startColumn = op.range.startColumn;
                const endLineNumber = op.range.endLineNumber;
                const endColumn = op.range.endColumn;
                if (startLineNumber === endLineNumber && startColumn === endColumn && op.text.length === 0) {
                    // no-op
                    continue;
                }
                if (op.text) {
                    // replacement
                    this.c.delete(op.rangeOffset, op.rangeLength);
                    this.c.insert(op.rangeOffset, op.text, true);
                }
                else {
                    // deletion
                    this.c.delete(op.rangeOffset, op.rangeLength);
                }
                const contentChangeRange = new range_1.$Ot(startLineNumber, startColumn, endLineNumber, endColumn);
                contentChanges.push({
                    range: contentChangeRange,
                    rangeLength: op.rangeLength,
                    text: op.text,
                    rangeOffset: op.rangeOffset,
                    forceMoveMarkers: op.forceMoveMarkers
                });
            }
            return contentChanges;
        }
        findMatchesLineByLine(searchRange, searchData, captureMatches, limitResultCount) {
            return this.c.findMatchesLineByLine(searchRange, searchData, captureMatches, limitResultCount);
        }
        // #endregion
        // #region helper
        // testing purpose.
        getPieceTree() {
            return this.c;
        }
        static _getInverseEditRange(range, text) {
            const startLineNumber = range.startLineNumber;
            const startColumn = range.startColumn;
            const [eolCount, firstLineLength, lastLineLength] = (0, eolCounter_1.$zu)(text);
            let resultRange;
            if (text.length > 0) {
                // the operation inserts something
                const lineCount = eolCount + 1;
                if (lineCount === 1) {
                    // single line insert
                    resultRange = new range_1.$Ot(startLineNumber, startColumn, startLineNumber, startColumn + firstLineLength);
                }
                else {
                    // multi line insert
                    resultRange = new range_1.$Ot(startLineNumber, startColumn, startLineNumber + lineCount - 1, lastLineLength + 1);
                }
            }
            else {
                // There is nothing to insert
                resultRange = new range_1.$Ot(startLineNumber, startColumn, startLineNumber, startColumn);
            }
            return resultRange;
        }
        /**
         * Assumes `operations` are validated and sorted ascending
         */
        static _getInverseEditRanges(operations) {
            const result = [];
            let prevOpEndLineNumber = 0;
            let prevOpEndColumn = 0;
            let prevOp = null;
            for (let i = 0, len = operations.length; i < len; i++) {
                const op = operations[i];
                let startLineNumber;
                let startColumn;
                if (prevOp) {
                    if (prevOp.range.endLineNumber === op.range.startLineNumber) {
                        startLineNumber = prevOpEndLineNumber;
                        startColumn = prevOpEndColumn + (op.range.startColumn - prevOp.range.endColumn);
                    }
                    else {
                        startLineNumber = prevOpEndLineNumber + (op.range.startLineNumber - prevOp.range.endLineNumber);
                        startColumn = op.range.startColumn;
                    }
                }
                else {
                    startLineNumber = op.range.startLineNumber;
                    startColumn = op.range.startColumn;
                }
                let resultRange;
                if (op.text.length > 0) {
                    // the operation inserts something
                    const lineCount = op.eolCount + 1;
                    if (lineCount === 1) {
                        // single line insert
                        resultRange = new range_1.$Ot(startLineNumber, startColumn, startLineNumber, startColumn + op.firstLineLength);
                    }
                    else {
                        // multi line insert
                        resultRange = new range_1.$Ot(startLineNumber, startColumn, startLineNumber + lineCount - 1, op.lastLineLength + 1);
                    }
                }
                else {
                    // There is nothing to insert
                    resultRange = new range_1.$Ot(startLineNumber, startColumn, startLineNumber, startColumn);
                }
                prevOpEndLineNumber = resultRange.endLineNumber;
                prevOpEndColumn = resultRange.endColumn;
                result.push(resultRange);
                prevOp = op;
            }
            return result;
        }
        static u(a, b) {
            const r = range_1.$Ot.compareRangesUsingEnds(a.range, b.range);
            if (r === 0) {
                return a.sortIndex - b.sortIndex;
            }
            return r;
        }
        static w(a, b) {
            const r = range_1.$Ot.compareRangesUsingEnds(a.range, b.range);
            if (r === 0) {
                return b.sortIndex - a.sortIndex;
            }
            return -r;
        }
    }
    exports.$vD = $vD;
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/























define(__m[31/*vs/editor/common/model/pieceTreeTextBuffer/pieceTreeTextBufferBuilder*/], __M([0/*require*/,1/*exports*/,2/*vs/base/common/charCode*/,4/*vs/base/common/strings*/,9/*vs/editor/common/model*/,13/*vs/editor/common/model/pieceTreeTextBuffer/pieceTreeBase*/,30/*vs/editor/common/model/pieceTreeTextBuffer/pieceTreeTextBuffer*/]), function (require, exports, charCode_1, strings, model_1, pieceTreeBase_1, pieceTreeTextBuffer_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.$wD = void 0;
    strings = __importStar(strings);
    class PieceTreeTextBufferFactory {
        constructor(a, b, c, d, e, f, g, h, j) {
            this.a = a;
            this.b = b;
            this.c = c;
            this.d = d;
            this.e = e;
            this.f = f;
            this.g = g;
            this.h = h;
            this.j = j;
        }
        k(defaultEOL) {
            const totalEOLCount = this.c + this.d + this.e;
            const totalCRCount = this.c + this.e;
            if (totalEOLCount === 0) {
                // This is an empty file or a file with precisely one line
                return (defaultEOL === model_1.DefaultEndOfLine.LF ? '\n' : '\r\n');
            }
            if (totalCRCount > totalEOLCount / 2) {
                // More than half of the file contains \r\n ending lines
                return '\r\n';
            }
            // At least one line more ends in \n
            return '\n';
        }
        create(defaultEOL) {
            const eol = this.k(defaultEOL);
            const chunks = this.a;
            if (this.j &&
                ((eol === '\r\n' && (this.c > 0 || this.d > 0))
                    || (eol === '\n' && (this.c > 0 || this.e > 0)))) {
                // Normalize pieces
                for (let i = 0, len = chunks.length; i < len; i++) {
                    const str = chunks[i].buffer.replace(/\r\n|\r|\n/g, eol);
                    const newLineStart = (0, pieceTreeBase_1.$qD)(str);
                    chunks[i] = new pieceTreeBase_1.$tD(str, newLineStart);
                }
            }
            const textBuffer = new pieceTreeTextBuffer_1.$vD(chunks, this.b, eol, this.f, this.g, this.h, this.j);
            return { textBuffer: textBuffer, disposable: textBuffer };
        }
        getFirstLineText(lengthLimit) {
            return this.a[0].buffer.substr(0, lengthLimit).split(/\r\n|\r|\n/)[0];
        }
    }
    class $wD {
        constructor() {
            this.a = [];
            this.b = '';
            this.c = false;
            this.d = 0;
            this.e = [];
            this.f = 0;
            this.g = 0;
            this.h = 0;
            this.j = false;
            this.k = false;
            this.l = true;
        }
        acceptChunk(chunk) {
            if (chunk.length === 0) {
                return;
            }
            if (this.a.length === 0) {
                if (strings.$5f(chunk)) {
                    this.b = strings.$4f;
                    chunk = chunk.substr(1);
                }
            }
            const lastChar = chunk.charCodeAt(chunk.length - 1);
            if (lastChar === charCode_1.CharCode.CarriageReturn || (lastChar >= 0xD800 && lastChar <= 0xDBFF)) {
                // last character is \r or a high surrogate => keep it back
                this.m(chunk.substr(0, chunk.length - 1), false);
                this.c = true;
                this.d = lastChar;
            }
            else {
                this.m(chunk, false);
                this.c = false;
                this.d = lastChar;
            }
        }
        m(chunk, allowEmptyStrings) {
            if (!allowEmptyStrings && chunk.length === 0) {
                // Nothing to do
                return;
            }
            if (this.c) {
                this.n(String.fromCharCode(this.d) + chunk);
            }
            else {
                this.n(chunk);
            }
        }
        n(chunk) {
            const lineStarts = (0, pieceTreeBase_1.$rD)(this.e, chunk);
            this.a.push(new pieceTreeBase_1.$tD(chunk, lineStarts.lineStarts));
            this.f += lineStarts.cr;
            this.g += lineStarts.lf;
            this.h += lineStarts.crlf;
            if (!lineStarts.isBasicASCII) {
                // this chunk contains non basic ASCII characters
                this.l = false;
                if (!this.j) {
                    this.j = strings.$Tf(chunk);
                }
                if (!this.k) {
                    this.k = strings.$Wf(chunk);
                }
            }
        }
        finish(normalizeEOL = true) {
            this.o();
            return new PieceTreeTextBufferFactory(this.a, this.b, this.f, this.g, this.h, this.j, this.k, this.l, normalizeEOL);
        }
        o() {
            if (this.a.length === 0) {
                this.m('', true);
            }
            if (this.c) {
                this.c = false;
                // recreate last chunk
                const lastChunk = this.a[this.a.length - 1];
                lastChunk.buffer += String.fromCharCode(this.d);
                const newLineStarts = (0, pieceTreeBase_1.$qD)(lastChunk.buffer);
                lastChunk.lineStarts = newLineStarts;
                if (this.d === charCode_1.CharCode.CarriageReturn) {
                    this.f++;
                }
            }
        }
    }
    exports.$wD = $wD;
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(__m[32/*vs/platform/contextkey/common/scanner*/], __M([0/*require*/,1/*exports*/,2/*vs/base/common/charCode*/,6/*vs/base/common/errors*/,33/*vs/nls*/]), function (require, exports, charCode_1, errors_1, nls_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.$Aj = exports.TokenType = void 0;
    var TokenType;
    (function (TokenType) {
        TokenType[TokenType["LParen"] = 0] = "LParen";
        TokenType[TokenType["RParen"] = 1] = "RParen";
        TokenType[TokenType["Neg"] = 2] = "Neg";
        TokenType[TokenType["Eq"] = 3] = "Eq";
        TokenType[TokenType["NotEq"] = 4] = "NotEq";
        TokenType[TokenType["Lt"] = 5] = "Lt";
        TokenType[TokenType["LtEq"] = 6] = "LtEq";
        TokenType[TokenType["Gt"] = 7] = "Gt";
        TokenType[TokenType["GtEq"] = 8] = "GtEq";
        TokenType[TokenType["RegexOp"] = 9] = "RegexOp";
        TokenType[TokenType["RegexStr"] = 10] = "RegexStr";
        TokenType[TokenType["True"] = 11] = "True";
        TokenType[TokenType["False"] = 12] = "False";
        TokenType[TokenType["In"] = 13] = "In";
        TokenType[TokenType["Not"] = 14] = "Not";
        TokenType[TokenType["And"] = 15] = "And";
        TokenType[TokenType["Or"] = 16] = "Or";
        TokenType[TokenType["Str"] = 17] = "Str";
        TokenType[TokenType["QuotedStr"] = 18] = "QuotedStr";
        TokenType[TokenType["Error"] = 19] = "Error";
        TokenType[TokenType["EOF"] = 20] = "EOF";
    })(TokenType || (exports.TokenType = TokenType = {}));
    function hintDidYouMean(...meant) {
        switch (meant.length) {
            case 1:
                return (0, nls_1.localize)(11055, null, meant[0]);
            case 2:
                return (0, nls_1.localize)(11056, null, meant[0], meant[1]);
            case 3:
                return (0, nls_1.localize)(11057, null, meant[0], meant[1], meant[2]);
            default: // we just don't expect that many
                return undefined;
        }
    }
    const hintDidYouForgetToOpenOrCloseQuote = (0, nls_1.localize)(11058, null);
    const hintDidYouForgetToEscapeSlash = (0, nls_1.localize)(11059, null);
    /**
     * A simple scanner for context keys.
     *
     * Example:
     *
     * ```ts
     * const scanner = new Scanner().reset('resourceFileName =~ /docker/ && !config.docker.enabled');
     * const tokens = [...scanner];
     * if (scanner.errorTokens.length > 0) {
     *     scanner.errorTokens.forEach(err => console.error(`Unexpected token at ${err.offset}: ${err.lexeme}\nHint: ${err.additional}`));
     * } else {
     *     // process tokens
     * }
     * ```
     */
    class $Aj {
        constructor() {
            this.c = '';
            this.d = 0;
            this.e = 0;
            this.f = [];
            this.g = [];
            // u - unicode, y - sticky // TODO@ulugbekna: we accept double quotes as part of the string rather than as a delimiter (to preserve old parser's behavior)
            this.m = /[a-zA-Z0-9_<>\-\./\\:\*\?\+\[\]\^,#@;"%\$\p{L}-]+/uy;
        }
        static getLexeme(token) {
            switch (token.type) {
                case TokenType.LParen:
                    return '(';
                case TokenType.RParen:
                    return ')';
                case TokenType.Neg:
                    return '!';
                case TokenType.Eq:
                    return token.isTripleEq ? '===' : '==';
                case TokenType.NotEq:
                    return token.isTripleEq ? '!==' : '!=';
                case TokenType.Lt:
                    return '<';
                case TokenType.LtEq:
                    return '<=';
                case TokenType.Gt:
                    return '>=';
                case TokenType.GtEq:
                    return '>=';
                case TokenType.RegexOp:
                    return '=~';
                case TokenType.RegexStr:
                    return token.lexeme;
                case TokenType.True:
                    return 'true';
                case TokenType.False:
                    return 'false';
                case TokenType.In:
                    return 'in';
                case TokenType.Not:
                    return 'not';
                case TokenType.And:
                    return '&&';
                case TokenType.Or:
                    return '||';
                case TokenType.Str:
                    return token.lexeme;
                case TokenType.QuotedStr:
                    return token.lexeme;
                case TokenType.Error:
                    return token.lexeme;
                case TokenType.EOF:
                    return 'EOF';
                default:
                    throw (0, errors_1.$7)(`unhandled token type: ${JSON.stringify(token)}; have you forgotten to add a case?`);
            }
        }
        static { this.a = new Set(['i', 'g', 's', 'm', 'y', 'u'].map(ch => ch.charCodeAt(0))); }
        static { this.b = new Map([
            ['not', TokenType.Not],
            ['in', TokenType.In],
            ['false', TokenType.False],
            ['true', TokenType.True],
        ]); }
        get errors() {
            return this.g;
        }
        reset(value) {
            this.c = value;
            this.d = 0;
            this.e = 0;
            this.f = [];
            this.g = [];
            return this;
        }
        scan() {
            while (!this.r()) {
                this.d = this.e;
                const ch = this.i();
                switch (ch) {
                    case charCode_1.CharCode.OpenParen:
                        this.k(TokenType.LParen);
                        break;
                    case charCode_1.CharCode.CloseParen:
                        this.k(TokenType.RParen);
                        break;
                    case charCode_1.CharCode.ExclamationMark:
                        if (this.h(charCode_1.CharCode.Equals)) {
                            const isTripleEq = this.h(charCode_1.CharCode.Equals); // eat last `=` if `!==`
                            this.f.push({ type: TokenType.NotEq, offset: this.d, isTripleEq });
                        }
                        else {
                            this.k(TokenType.Neg);
                        }
                        break;
                    case charCode_1.CharCode.SingleQuote:
                        this.o();
                        break;
                    case charCode_1.CharCode.Slash:
                        this.q();
                        break;
                    case charCode_1.CharCode.Equals:
                        if (this.h(charCode_1.CharCode.Equals)) { // support `==`
                            const isTripleEq = this.h(charCode_1.CharCode.Equals); // eat last `=` if `===`
                            this.f.push({ type: TokenType.Eq, offset: this.d, isTripleEq });
                        }
                        else if (this.h(charCode_1.CharCode.Tilde)) {
                            this.k(TokenType.RegexOp);
                        }
                        else {
                            this.l(hintDidYouMean('==', '=~'));
                        }
                        break;
                    case charCode_1.CharCode.LessThan:
                        this.k(this.h(charCode_1.CharCode.Equals) ? TokenType.LtEq : TokenType.Lt);
                        break;
                    case charCode_1.CharCode.GreaterThan:
                        this.k(this.h(charCode_1.CharCode.Equals) ? TokenType.GtEq : TokenType.Gt);
                        break;
                    case charCode_1.CharCode.Ampersand:
                        if (this.h(charCode_1.CharCode.Ampersand)) {
                            this.k(TokenType.And);
                        }
                        else {
                            this.l(hintDidYouMean('&&'));
                        }
                        break;
                    case charCode_1.CharCode.Pipe:
                        if (this.h(charCode_1.CharCode.Pipe)) {
                            this.k(TokenType.Or);
                        }
                        else {
                            this.l(hintDidYouMean('||'));
                        }
                        break;
                    // TODO@ulugbekna: 1) rewrite using a regex 2) reconsider what characters are considered whitespace, including unicode, nbsp, etc.
                    case charCode_1.CharCode.Space:
                    case charCode_1.CharCode.CarriageReturn:
                    case charCode_1.CharCode.Tab:
                    case charCode_1.CharCode.LineFeed:
                    case charCode_1.CharCode.NoBreakSpace: // &nbsp
                        break;
                    default:
                        this.n();
                }
            }
            this.d = this.e;
            this.k(TokenType.EOF);
            return Array.from(this.f);
        }
        h(expected) {
            if (this.r()) {
                return false;
            }
            if (this.c.charCodeAt(this.e) !== expected) {
                return false;
            }
            this.e++;
            return true;
        }
        i() {
            return this.c.charCodeAt(this.e++);
        }
        j() {
            return this.r() ? charCode_1.CharCode.Null : this.c.charCodeAt(this.e);
        }
        k(type) {
            this.f.push({ type, offset: this.d });
        }
        l(additional) {
            const offset = this.d;
            const lexeme = this.c.substring(this.d, this.e);
            const errToken = { type: TokenType.Error, offset: this.d, lexeme };
            this.g.push({ offset, lexeme, additionalInfo: additional });
            this.f.push(errToken);
        }
        n() {
            this.m.lastIndex = this.d;
            const match = this.m.exec(this.c);
            if (match) {
                this.e = this.d + match[0].length;
                const lexeme = this.c.substring(this.d, this.e);
                const keyword = $Aj.b.get(lexeme);
                if (keyword) {
                    this.k(keyword);
                }
                else {
                    this.f.push({ type: TokenType.Str, lexeme, offset: this.d });
                }
            }
        }
        // captures the lexeme without the leading and trailing '
        o() {
            while (this.j() !== charCode_1.CharCode.SingleQuote && !this.r()) { // TODO@ulugbekna: add support for escaping ' ?
                this.i();
            }
            if (this.r()) {
                this.l(hintDidYouForgetToOpenOrCloseQuote);
                return;
            }
            // consume the closing '
            this.i();
            this.f.push({ type: TokenType.QuotedStr, lexeme: this.c.substring(this.d + 1, this.e - 1), offset: this.d + 1 });
        }
        /*
         * Lexing a regex expression: /.../[igsmyu]*
         * Based on https://github.com/microsoft/TypeScript/blob/9247ef115e617805983740ba795d7a8164babf89/src/compiler/scanner.ts#L2129-L2181
         *
         * Note that we want slashes within a regex to be escaped, e.g., /file:\\/\\/\\// should match `file:///`
         */
        q() {
            let p = this.e;
            let inEscape = false;
            let inCharacterClass = false;
            while (true) {
                if (p >= this.c.length) {
                    this.e = p;
                    this.l(hintDidYouForgetToEscapeSlash);
                    return;
                }
                const ch = this.c.charCodeAt(p);
                if (inEscape) { // parsing an escape character
                    inEscape = false;
                }
                else if (ch === charCode_1.CharCode.Slash && !inCharacterClass) { // end of regex
                    p++;
                    break;
                }
                else if (ch === charCode_1.CharCode.OpenSquareBracket) {
                    inCharacterClass = true;
                }
                else if (ch === charCode_1.CharCode.Backslash) {
                    inEscape = true;
                }
                else if (ch === charCode_1.CharCode.CloseSquareBracket) {
                    inCharacterClass = false;
                }
                p++;
            }
            // Consume flags // TODO@ulugbekna: use regex instead
            while (p < this.c.length && $Aj.a.has(this.c.charCodeAt(p))) {
                p++;
            }
            this.e = p;
            const lexeme = this.c.substring(this.d, this.e);
            this.f.push({ type: TokenType.RegexStr, lexeme, offset: this.d });
        }
        r() {
            return this.e >= this.c.length;
        }
    }
    exports.$Aj = $Aj;
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(__m[34/*vs/platform/instantiation/common/descriptors*/], __M([0/*require*/,1/*exports*/]), function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.$Ci = void 0;
    class $Ci {
        constructor(ctor, staticArguments = [], supportsDelayedInstantiation = false) {
            this.ctor = ctor;
            this.staticArguments = staticArguments;
            this.supportsDelayedInstantiation = supportsDelayedInstantiation;
        }
    }
    exports.$Ci = $Ci;
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(__m[35/*vs/platform/instantiation/common/extensions*/], __M([0/*require*/,1/*exports*/,34/*vs/platform/instantiation/common/descriptors*/]), function (require, exports, descriptors_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.InstantiationType = void 0;
    exports.$Rs = $Rs;
    exports.$Ss = $Ss;
    const _registry = [];
    var InstantiationType;
    (function (InstantiationType) {
        /**
         * Instantiate this service as soon as a consumer depends on it. _Note_ that this
         * is more costly as some upfront work is done that is likely not needed
         */
        InstantiationType[InstantiationType["Eager"] = 0] = "Eager";
        /**
         * Instantiate this service as soon as a consumer uses it. This is the _better_
         * way of registering a service.
         */
        InstantiationType[InstantiationType["Delayed"] = 1] = "Delayed";
    })(InstantiationType || (exports.InstantiationType = InstantiationType = {}));
    function $Rs(id, ctorOrDescriptor, supportsDelayedInstantiation) {
        if (!(ctorOrDescriptor instanceof descriptors_1.$Ci)) {
            ctorOrDescriptor = new descriptors_1.$Ci(ctorOrDescriptor, [], Boolean(supportsDelayedInstantiation));
        }
        _registry.push([id, ctorOrDescriptor]);
    }
    function $Ss() {
        return _registry;
    }
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(__m[15/*vs/platform/instantiation/common/instantiation*/], __M([0/*require*/,1/*exports*/]), function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.$Ei = exports._util = void 0;
    exports.$Fi = $Fi;
    exports.$Gi = $Gi;
    // ------ internal util
    var _util;
    (function (_util) {
        _util.serviceIds = new Map();
        _util.DI_TARGET = '$di$target';
        _util.DI_DEPENDENCIES = '$di$dependencies';
        function getServiceDependencies(ctor) {
            return ctor[_util.DI_DEPENDENCIES] || [];
        }
        _util.getServiceDependencies = getServiceDependencies;
    })(_util || (exports._util = _util = {}));
    exports.$Ei = $Fi('instantiationService');
    function storeServiceDependency(id, target, index) {
        if (target[_util.DI_TARGET] === target) {
            target[_util.DI_DEPENDENCIES].push({ id, index });
        }
        else {
            target[_util.DI_DEPENDENCIES] = [{ id, index }];
            target[_util.DI_TARGET] = target;
        }
    }
    /**
     * The *only* valid way to create a {{ServiceIdentifier}}.
     */
    function $Fi(serviceId) {
        if (_util.serviceIds.has(serviceId)) {
            return _util.serviceIds.get(serviceId);
        }
        const id = function (target, key, index) {
            if (arguments.length !== 3) {
                throw new Error('@IServiceName-decorator can only be used to decorate a parameter');
            }
            storeServiceDependency(id, target, index);
        };
        id.toString = () => serviceId;
        _util.serviceIds.set(serviceId, id);
        return id;
    }
    function $Gi(serviceIdentifier) {
        return serviceIdentifier;
    }
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(__m[36/*vs/platform/contextkey/common/contextkey*/], __M([0/*require*/,1/*exports*/,2/*vs/base/common/charCode*/,3/*vs/base/common/platform*/,4/*vs/base/common/strings*/,32/*vs/platform/contextkey/common/scanner*/,15/*vs/platform/instantiation/common/instantiation*/,33/*vs/nls*/,6/*vs/base/common/errors*/]), function (require, exports, charCode_1, platform_1, strings_1, scanner_1, instantiation_1, nls_1, errors_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.$Xj = exports.$Wj = exports.$Vj = exports.$Uj = exports.$Tj = exports.$Sj = exports.$Rj = exports.$Qj = exports.$Pj = exports.$Oj = exports.$Nj = exports.$Mj = exports.$Lj = exports.$Kj = exports.$Jj = exports.$Ij = exports.$Hj = exports.$Gj = exports.$Dj = exports.$Cj = exports.ContextKeyExprType = void 0;
    exports.$Bj = $Bj;
    exports.$Ej = $Ej;
    exports.$Fj = $Fj;
    exports.$Yj = $Yj;
    const CONSTANT_VALUES = new Map();
    CONSTANT_VALUES.set('false', false);
    CONSTANT_VALUES.set('true', true);
    CONSTANT_VALUES.set('isMac', platform_1.$k);
    CONSTANT_VALUES.set('isLinux', platform_1.$l);
    CONSTANT_VALUES.set('isWindows', platform_1.$j);
    CONSTANT_VALUES.set('isWeb', platform_1.$p);
    CONSTANT_VALUES.set('isMacNative', platform_1.$k && !platform_1.$p);
    CONSTANT_VALUES.set('isEdge', platform_1.$I);
    CONSTANT_VALUES.set('isFirefox', platform_1.$G);
    CONSTANT_VALUES.set('isChrome', platform_1.$F);
    CONSTANT_VALUES.set('isSafari', platform_1.$H);
    /** allow register constant context keys that are known only after startup; requires running `substituteConstants` on the context key - https://github.com/microsoft/vscode/issues/174218#issuecomment-1437972127 */
    function $Bj(key, value) {
        if (CONSTANT_VALUES.get(key) !== undefined) {
            throw (0, errors_1.$6)('contextkey.setConstant(k, v) invoked with already set constant `k`');
        }
        CONSTANT_VALUES.set(key, value);
    }
    const hasOwnProperty = Object.prototype.hasOwnProperty;
    var ContextKeyExprType;
    (function (ContextKeyExprType) {
        ContextKeyExprType[ContextKeyExprType["False"] = 0] = "False";
        ContextKeyExprType[ContextKeyExprType["True"] = 1] = "True";
        ContextKeyExprType[ContextKeyExprType["Defined"] = 2] = "Defined";
        ContextKeyExprType[ContextKeyExprType["Not"] = 3] = "Not";
        ContextKeyExprType[ContextKeyExprType["Equals"] = 4] = "Equals";
        ContextKeyExprType[ContextKeyExprType["NotEquals"] = 5] = "NotEquals";
        ContextKeyExprType[ContextKeyExprType["And"] = 6] = "And";
        ContextKeyExprType[ContextKeyExprType["Regex"] = 7] = "Regex";
        ContextKeyExprType[ContextKeyExprType["NotRegex"] = 8] = "NotRegex";
        ContextKeyExprType[ContextKeyExprType["Or"] = 9] = "Or";
        ContextKeyExprType[ContextKeyExprType["In"] = 10] = "In";
        ContextKeyExprType[ContextKeyExprType["NotIn"] = 11] = "NotIn";
        ContextKeyExprType[ContextKeyExprType["Greater"] = 12] = "Greater";
        ContextKeyExprType[ContextKeyExprType["GreaterEquals"] = 13] = "GreaterEquals";
        ContextKeyExprType[ContextKeyExprType["Smaller"] = 14] = "Smaller";
        ContextKeyExprType[ContextKeyExprType["SmallerEquals"] = 15] = "SmallerEquals";
    })(ContextKeyExprType || (exports.ContextKeyExprType = ContextKeyExprType = {}));
    const defaultConfig = {
        regexParsingWithErrorRecovery: true
    };
    const errorEmptyString = (0, nls_1.localize)(11069, null);
    const hintEmptyString = (0, nls_1.localize)(11070, null);
    const errorNoInAfterNot = (0, nls_1.localize)(11071, null);
    const errorClosingParenthesis = (0, nls_1.localize)(11072, null);
    const errorUnexpectedToken = (0, nls_1.localize)(11073, null);
    const hintUnexpectedToken = (0, nls_1.localize)(11074, null);
    const errorUnexpectedEOF = (0, nls_1.localize)(11075, null);
    const hintUnexpectedEOF = (0, nls_1.localize)(11076, null);
    /**
     * A parser for context key expressions.
     *
     * Example:
     * ```ts
     * const parser = new Parser();
     * const expr = parser.parse('foo == "bar" && baz == true');
     *
     * if (expr === undefined) {
     * 	// there were lexing or parsing errors
     * 	// process lexing errors with `parser.lexingErrors`
     *  // process parsing errors with `parser.parsingErrors`
     * } else {
     * 	// expr is a valid expression
     * }
     * ```
     */
    class $Cj {
        // Note: this doesn't produce an exact syntax tree but a normalized one
        // ContextKeyExpression's that we use as AST nodes do not expose constructors that do not normalize
        static { this.c = new Error(); }
        get lexingErrors() {
            return this.d.errors;
        }
        get parsingErrors() {
            return this.h;
        }
        constructor(k = defaultConfig) {
            this.k = k;
            // lifetime note: `_scanner` lives as long as the parser does, i.e., is not reset between calls to `parse`
            this.d = new scanner_1.$Aj();
            // lifetime note: `_tokens`, `_current`, and `_parsingErrors` must be reset between calls to `parse`
            this.f = [];
            this.g = 0; // invariant: 0 <= this._current < this._tokens.length ; any incrementation of this value must first call `_isAtEnd`
            this.h = [];
            this.v = /g|y/g;
        }
        /**
         * Parse a context key expression.
         *
         * @param input the expression to parse
         * @returns the parsed expression or `undefined` if there's an error - call `lexingErrors` and `parsingErrors` to see the errors
         */
        parse(input) {
            if (input === '') {
                this.h.push({ message: errorEmptyString, offset: 0, lexeme: '', additionalInfo: hintEmptyString });
                return undefined;
            }
            this.f = this.d.reset(input).scan();
            // @ulugbekna: we do not stop parsing if there are lexing errors to be able to reconstruct regexes with unescaped slashes; TODO@ulugbekna: make this respect config option for recovery
            this.g = 0;
            this.h = [];
            try {
                const expr = this.l();
                if (!this.E()) {
                    const peek = this.D();
                    const additionalInfo = peek.type === scanner_1.TokenType.Str ? hintUnexpectedToken : undefined;
                    this.h.push({ message: errorUnexpectedToken, offset: peek.offset, lexeme: scanner_1.$Aj.getLexeme(peek), additionalInfo });
                    throw $Cj.c;
                }
                return expr;
            }
            catch (e) {
                if (!(e === $Cj.c)) {
                    throw e;
                }
                return undefined;
            }
        }
        l() {
            return this.m();
        }
        m() {
            const expr = [this.o()];
            while (this.y(scanner_1.TokenType.Or)) {
                const right = this.o();
                expr.push(right);
            }
            return expr.length === 1 ? expr[0] : $Dj.or(...expr);
        }
        o() {
            const expr = [this.s()];
            while (this.y(scanner_1.TokenType.And)) {
                const right = this.s();
                expr.push(right);
            }
            return expr.length === 1 ? expr[0] : $Dj.and(...expr);
        }
        s() {
            if (this.y(scanner_1.TokenType.Neg)) {
                const peek = this.D();
                switch (peek.type) {
                    case scanner_1.TokenType.True:
                        this.z();
                        return $Gj.INSTANCE;
                    case scanner_1.TokenType.False:
                        this.z();
                        return $Hj.INSTANCE;
                    case scanner_1.TokenType.LParen: {
                        this.z();
                        const expr = this.l();
                        this.A(scanner_1.TokenType.RParen, errorClosingParenthesis);
                        return expr?.negate();
                    }
                    case scanner_1.TokenType.Str:
                        this.z();
                        return $Nj.create(peek.lexeme);
                    default:
                        throw this.B(`KEY | true | false | '(' expression ')'`, peek);
                }
            }
            return this.t();
        }
        t() {
            const peek = this.D();
            switch (peek.type) {
                case scanner_1.TokenType.True:
                    this.z();
                    return $Dj.true();
                case scanner_1.TokenType.False:
                    this.z();
                    return $Dj.false();
                case scanner_1.TokenType.LParen: {
                    this.z();
                    const expr = this.l();
                    this.A(scanner_1.TokenType.RParen, errorClosingParenthesis);
                    return expr;
                }
                case scanner_1.TokenType.Str: {
                    // KEY
                    const key = peek.lexeme;
                    this.z();
                    // =~ regex
                    if (this.y(scanner_1.TokenType.RegexOp)) {
                        // @ulugbekna: we need to reconstruct the regex from the tokens because some extensions use unescaped slashes in regexes
                        const expr = this.D();
                        if (!this.k.regexParsingWithErrorRecovery) {
                            this.z();
                            if (expr.type !== scanner_1.TokenType.RegexStr) {
                                throw this.B(`REGEX`, expr);
                            }
                            const regexLexeme = expr.lexeme;
                            const closingSlashIndex = regexLexeme.lastIndexOf('/');
                            const flags = closingSlashIndex === regexLexeme.length - 1 ? undefined : this.w(regexLexeme.substring(closingSlashIndex + 1));
                            let regexp;
                            try {
                                regexp = new RegExp(regexLexeme.substring(1, closingSlashIndex), flags);
                            }
                            catch (e) {
                                throw this.B(`REGEX`, expr);
                            }
                            return $Sj.create(key, regexp);
                        }
                        switch (expr.type) {
                            case scanner_1.TokenType.RegexStr:
                            case scanner_1.TokenType.Error: { // also handle an ErrorToken in case of smth such as /(/file)/
                                const lexemeReconstruction = [expr.lexeme]; // /REGEX/ or /REGEX/FLAGS
                                this.z();
                                let followingToken = this.D();
                                let parenBalance = 0;
                                for (let i = 0; i < expr.lexeme.length; i++) {
                                    if (expr.lexeme.charCodeAt(i) === charCode_1.CharCode.OpenParen) {
                                        parenBalance++;
                                    }
                                    else if (expr.lexeme.charCodeAt(i) === charCode_1.CharCode.CloseParen) {
                                        parenBalance--;
                                    }
                                }
                                while (!this.E() && followingToken.type !== scanner_1.TokenType.And && followingToken.type !== scanner_1.TokenType.Or) {
                                    switch (followingToken.type) {
                                        case scanner_1.TokenType.LParen:
                                            parenBalance++;
                                            break;
                                        case scanner_1.TokenType.RParen:
                                            parenBalance--;
                                            break;
                                        case scanner_1.TokenType.RegexStr:
                                        case scanner_1.TokenType.QuotedStr:
                                            for (let i = 0; i < followingToken.lexeme.length; i++) {
                                                if (followingToken.lexeme.charCodeAt(i) === charCode_1.CharCode.OpenParen) {
                                                    parenBalance++;
                                                }
                                                else if (expr.lexeme.charCodeAt(i) === charCode_1.CharCode.CloseParen) {
                                                    parenBalance--;
                                                }
                                            }
                                    }
                                    if (parenBalance < 0) {
                                        break;
                                    }
                                    lexemeReconstruction.push(scanner_1.$Aj.getLexeme(followingToken));
                                    this.z();
                                    followingToken = this.D();
                                }
                                const regexLexeme = lexemeReconstruction.join('');
                                const closingSlashIndex = regexLexeme.lastIndexOf('/');
                                const flags = closingSlashIndex === regexLexeme.length - 1 ? undefined : this.w(regexLexeme.substring(closingSlashIndex + 1));
                                let regexp;
                                try {
                                    regexp = new RegExp(regexLexeme.substring(1, closingSlashIndex), flags);
                                }
                                catch (e) {
                                    throw this.B(`REGEX`, expr);
                                }
                                return $Dj.regex(key, regexp);
                            }
                            case scanner_1.TokenType.QuotedStr: {
                                const serializedValue = expr.lexeme;
                                this.z();
                                // replicate old regex parsing behavior
                                let regex = null;
                                if (!(0, strings_1.$cf)(serializedValue)) {
                                    const start = serializedValue.indexOf('/');
                                    const end = serializedValue.lastIndexOf('/');
                                    if (start !== end && start >= 0) {
                                        const value = serializedValue.slice(start + 1, end);
                                        const caseIgnoreFlag = serializedValue[end + 1] === 'i' ? 'i' : '';
                                        try {
                                            regex = new RegExp(value, caseIgnoreFlag);
                                        }
                                        catch (_e) {
                                            throw this.B(`REGEX`, expr);
                                        }
                                    }
                                }
                                if (regex === null) {
                                    throw this.B('REGEX', expr);
                                }
                                return $Sj.create(key, regex);
                            }
                            default:
                                throw this.B('REGEX', this.D());
                        }
                    }
                    // [ 'not' 'in' value ]
                    if (this.y(scanner_1.TokenType.Not)) {
                        this.A(scanner_1.TokenType.In, errorNoInAfterNot);
                        const right = this.u();
                        return $Dj.notIn(key, right);
                    }
                    // [ ('==' | '!=' | '<' | '<=' | '>' | '>=' | 'in') value ]
                    const maybeOp = this.D().type;
                    switch (maybeOp) {
                        case scanner_1.TokenType.Eq: {
                            this.z();
                            const right = this.u();
                            if (this.x().type === scanner_1.TokenType.QuotedStr) { // to preserve old parser behavior: "foo == 'true'" is preserved as "foo == 'true'", but "foo == true" is optimized as "foo"
                                return $Dj.equals(key, right);
                            }
                            switch (right) {
                                case 'true':
                                    return $Dj.has(key);
                                case 'false':
                                    return $Dj.not(key);
                                default:
                                    return $Dj.equals(key, right);
                            }
                        }
                        case scanner_1.TokenType.NotEq: {
                            this.z();
                            const right = this.u();
                            if (this.x().type === scanner_1.TokenType.QuotedStr) { // same as above with "foo != 'true'"
                                return $Dj.notEquals(key, right);
                            }
                            switch (right) {
                                case 'true':
                                    return $Dj.not(key);
                                case 'false':
                                    return $Dj.has(key);
                                default:
                                    return $Dj.notEquals(key, right);
                            }
                        }
                        // TODO: ContextKeyExpr.smaller(key, right) accepts only `number` as `right` AND during eval of this node, we just eval to `false` if `right` is not a number
                        // consequently, package.json linter should _warn_ the user if they're passing undesired things to ops
                        case scanner_1.TokenType.Lt:
                            this.z();
                            return $Qj.create(key, this.u());
                        case scanner_1.TokenType.LtEq:
                            this.z();
                            return $Rj.create(key, this.u());
                        case scanner_1.TokenType.Gt:
                            this.z();
                            return $Oj.create(key, this.u());
                        case scanner_1.TokenType.GtEq:
                            this.z();
                            return $Pj.create(key, this.u());
                        case scanner_1.TokenType.In:
                            this.z();
                            return $Dj.in(key, this.u());
                        default:
                            return $Dj.has(key);
                    }
                }
                case scanner_1.TokenType.EOF:
                    this.h.push({ message: errorUnexpectedEOF, offset: peek.offset, lexeme: '', additionalInfo: hintUnexpectedEOF });
                    throw $Cj.c;
                default:
                    throw this.B(`true | false | KEY \n\t| KEY '=~' REGEX \n\t| KEY ('==' | '!=' | '<' | '<=' | '>' | '>=' | 'in' | 'not' 'in') value`, this.D());
            }
        }
        u() {
            const token = this.D();
            switch (token.type) {
                case scanner_1.TokenType.Str:
                case scanner_1.TokenType.QuotedStr:
                    this.z();
                    return token.lexeme;
                case scanner_1.TokenType.True:
                    this.z();
                    return 'true';
                case scanner_1.TokenType.False:
                    this.z();
                    return 'false';
                case scanner_1.TokenType.In: // we support `in` as a value, e.g., "when": "languageId == in" - exists in existing extensions
                    this.z();
                    return 'in';
                default:
                    // this allows "when": "foo == " which's used by existing extensions
                    // we do not call `_advance` on purpose - we don't want to eat unintended tokens
                    return '';
            }
        }
        w(flags) {
            return flags.replaceAll(this.v, '');
        }
        // careful: this can throw if current token is the initial one (ie index = 0)
        x() {
            return this.f[this.g - 1];
        }
        y(token) {
            if (this.C(token)) {
                this.z();
                return true;
            }
            return false;
        }
        z() {
            if (!this.E()) {
                this.g++;
            }
            return this.x();
        }
        A(type, message) {
            if (this.C(type)) {
                return this.z();
            }
            throw this.B(message, this.D());
        }
        B(expected, got, additionalInfo) {
            const message = (0, nls_1.localize)(11077, null, expected, scanner_1.$Aj.getLexeme(got));
            const offset = got.offset;
            const lexeme = scanner_1.$Aj.getLexeme(got);
            this.h.push({ message, offset, lexeme, additionalInfo });
            return $Cj.c;
        }
        C(type) {
            return this.D().type === type;
        }
        D() {
            return this.f[this.g];
        }
        E() {
            return this.D().type === scanner_1.TokenType.EOF;
        }
    }
    exports.$Cj = $Cj;
    class $Dj {
        static false() {
            return $Gj.INSTANCE;
        }
        static true() {
            return $Hj.INSTANCE;
        }
        static has(key) {
            return $Ij.create(key);
        }
        static equals(key, value) {
            return $Jj.create(key, value);
        }
        static notEquals(key, value) {
            return $Mj.create(key, value);
        }
        static regex(key, value) {
            return $Sj.create(key, value);
        }
        static in(key, value) {
            return $Kj.create(key, value);
        }
        static notIn(key, value) {
            return $Lj.create(key, value);
        }
        static not(key) {
            return $Nj.create(key);
        }
        static and(...expr) {
            return $Uj.create(expr, null, true);
        }
        static or(...expr) {
            return $Vj.create(expr, null, true);
        }
        static greater(key, value) {
            return $Oj.create(key, value);
        }
        static greaterEquals(key, value) {
            return $Pj.create(key, value);
        }
        static smaller(key, value) {
            return $Qj.create(key, value);
        }
        static smallerEquals(key, value) {
            return $Rj.create(key, value);
        }
        static { this.c = new $Cj({ regexParsingWithErrorRecovery: false }); }
        static deserialize(serialized) {
            if (serialized === undefined || serialized === null) { // an empty string needs to be handled by the parser to get a corresponding parsing error reported
                return undefined;
            }
            const expr = this.c.parse(serialized);
            return expr;
        }
    }
    exports.$Dj = $Dj;
    function $Ej(whenClauses) {
        const parser = new $Cj({ regexParsingWithErrorRecovery: false }); // we run with no recovery to guide users to use correct regexes
        return whenClauses.map(whenClause => {
            parser.parse(whenClause);
            if (parser.lexingErrors.length > 0) {
                return parser.lexingErrors.map((se) => ({
                    errorMessage: se.additionalInfo ?
                        (0, nls_1.localize)(11078, null, se.additionalInfo) :
                        (0, nls_1.localize)(11079, null),
                    offset: se.offset,
                    length: se.lexeme.length,
                }));
            }
            else if (parser.parsingErrors.length > 0) {
                return parser.parsingErrors.map((pe) => ({
                    errorMessage: pe.additionalInfo ? `${pe.message}. ${pe.additionalInfo}` : pe.message,
                    offset: pe.offset,
                    length: pe.lexeme.length,
                }));
            }
            else {
                return [];
            }
        });
    }
    function $Fj(a, b) {
        const aExpr = a ? a.substituteConstants() : undefined;
        const bExpr = b ? b.substituteConstants() : undefined;
        if (!aExpr && !bExpr) {
            return true;
        }
        if (!aExpr || !bExpr) {
            return false;
        }
        return aExpr.equals(bExpr);
    }
    function cmp(a, b) {
        return a.cmp(b);
    }
    class $Gj {
        static { this.INSTANCE = new $Gj(); }
        constructor() {
            this.type = ContextKeyExprType.False;
        }
        cmp(other) {
            return this.type - other.type;
        }
        equals(other) {
            return (other.type === this.type);
        }
        substituteConstants() {
            return this;
        }
        evaluate(context) {
            return false;
        }
        serialize() {
            return 'false';
        }
        keys() {
            return [];
        }
        map(mapFnc) {
            return this;
        }
        negate() {
            return $Hj.INSTANCE;
        }
    }
    exports.$Gj = $Gj;
    class $Hj {
        static { this.INSTANCE = new $Hj(); }
        constructor() {
            this.type = ContextKeyExprType.True;
        }
        cmp(other) {
            return this.type - other.type;
        }
        equals(other) {
            return (other.type === this.type);
        }
        substituteConstants() {
            return this;
        }
        evaluate(context) {
            return true;
        }
        serialize() {
            return 'true';
        }
        keys() {
            return [];
        }
        map(mapFnc) {
            return this;
        }
        negate() {
            return $Gj.INSTANCE;
        }
    }
    exports.$Hj = $Hj;
    class $Ij {
        static create(key, negated = null) {
            const constantValue = CONSTANT_VALUES.get(key);
            if (typeof constantValue === 'boolean') {
                return constantValue ? $Hj.INSTANCE : $Gj.INSTANCE;
            }
            return new $Ij(key, negated);
        }
        constructor(key, c) {
            this.key = key;
            this.c = c;
            this.type = ContextKeyExprType.Defined;
        }
        cmp(other) {
            if (other.type !== this.type) {
                return this.type - other.type;
            }
            return cmp1(this.key, other.key);
        }
        equals(other) {
            if (other.type === this.type) {
                return (this.key === other.key);
            }
            return false;
        }
        substituteConstants() {
            const constantValue = CONSTANT_VALUES.get(this.key);
            if (typeof constantValue === 'boolean') {
                return constantValue ? $Hj.INSTANCE : $Gj.INSTANCE;
            }
            return this;
        }
        evaluate(context) {
            return (!!context.getValue(this.key));
        }
        serialize() {
            return this.key;
        }
        keys() {
            return [this.key];
        }
        map(mapFnc) {
            return mapFnc.mapDefined(this.key);
        }
        negate() {
            if (!this.c) {
                this.c = $Nj.create(this.key, this);
            }
            return this.c;
        }
    }
    exports.$Ij = $Ij;
    class $Jj {
        static create(key, value, negated = null) {
            if (typeof value === 'boolean') {
                return (value ? $Ij.create(key, negated) : $Nj.create(key, negated));
            }
            const constantValue = CONSTANT_VALUES.get(key);
            if (typeof constantValue === 'boolean') {
                const trueValue = constantValue ? 'true' : 'false';
                return (value === trueValue ? $Hj.INSTANCE : $Gj.INSTANCE);
            }
            return new $Jj(key, value, negated);
        }
        constructor(c, d, f) {
            this.c = c;
            this.d = d;
            this.f = f;
            this.type = ContextKeyExprType.Equals;
        }
        cmp(other) {
            if (other.type !== this.type) {
                return this.type - other.type;
            }
            return cmp2(this.c, this.d, other.c, other.d);
        }
        equals(other) {
            if (other.type === this.type) {
                return (this.c === other.c && this.d === other.d);
            }
            return false;
        }
        substituteConstants() {
            const constantValue = CONSTANT_VALUES.get(this.c);
            if (typeof constantValue === 'boolean') {
                const trueValue = constantValue ? 'true' : 'false';
                return (this.d === trueValue ? $Hj.INSTANCE : $Gj.INSTANCE);
            }
            return this;
        }
        evaluate(context) {
            // Intentional ==
            // eslint-disable-next-line eqeqeq
            return (context.getValue(this.c) == this.d);
        }
        serialize() {
            return `${this.c} == '${this.d}'`;
        }
        keys() {
            return [this.c];
        }
        map(mapFnc) {
            return mapFnc.mapEquals(this.c, this.d);
        }
        negate() {
            if (!this.f) {
                this.f = $Mj.create(this.c, this.d, this);
            }
            return this.f;
        }
    }
    exports.$Jj = $Jj;
    class $Kj {
        static create(key, valueKey) {
            return new $Kj(key, valueKey);
        }
        constructor(d, f) {
            this.d = d;
            this.f = f;
            this.type = ContextKeyExprType.In;
            this.c = null;
        }
        cmp(other) {
            if (other.type !== this.type) {
                return this.type - other.type;
            }
            return cmp2(this.d, this.f, other.d, other.f);
        }
        equals(other) {
            if (other.type === this.type) {
                return (this.d === other.d && this.f === other.f);
            }
            return false;
        }
        substituteConstants() {
            return this;
        }
        evaluate(context) {
            const source = context.getValue(this.f);
            const item = context.getValue(this.d);
            if (Array.isArray(source)) {
                return source.includes(item);
            }
            if (typeof item === 'string' && typeof source === 'object' && source !== null) {
                return hasOwnProperty.call(source, item);
            }
            return false;
        }
        serialize() {
            return `${this.d} in '${this.f}'`;
        }
        keys() {
            return [this.d, this.f];
        }
        map(mapFnc) {
            return mapFnc.mapIn(this.d, this.f);
        }
        negate() {
            if (!this.c) {
                this.c = $Lj.create(this.d, this.f);
            }
            return this.c;
        }
    }
    exports.$Kj = $Kj;
    class $Lj {
        static create(key, valueKey) {
            return new $Lj(key, valueKey);
        }
        constructor(d, f) {
            this.d = d;
            this.f = f;
            this.type = ContextKeyExprType.NotIn;
            this.c = $Kj.create(d, f);
        }
        cmp(other) {
            if (other.type !== this.type) {
                return this.type - other.type;
            }
            return this.c.cmp(other.c);
        }
        equals(other) {
            if (other.type === this.type) {
                return this.c.equals(other.c);
            }
            return false;
        }
        substituteConstants() {
            return this;
        }
        evaluate(context) {
            return !this.c.evaluate(context);
        }
        serialize() {
            return `${this.d} not in '${this.f}'`;
        }
        keys() {
            return this.c.keys();
        }
        map(mapFnc) {
            return mapFnc.mapNotIn(this.d, this.f);
        }
        negate() {
            return this.c;
        }
    }
    exports.$Lj = $Lj;
    class $Mj {
        static create(key, value, negated = null) {
            if (typeof value === 'boolean') {
                if (value) {
                    return $Nj.create(key, negated);
                }
                return $Ij.create(key, negated);
            }
            const constantValue = CONSTANT_VALUES.get(key);
            if (typeof constantValue === 'boolean') {
                const falseValue = constantValue ? 'true' : 'false';
                return (value === falseValue ? $Gj.INSTANCE : $Hj.INSTANCE);
            }
            return new $Mj(key, value, negated);
        }
        constructor(c, d, f) {
            this.c = c;
            this.d = d;
            this.f = f;
            this.type = ContextKeyExprType.NotEquals;
        }
        cmp(other) {
            if (other.type !== this.type) {
                return this.type - other.type;
            }
            return cmp2(this.c, this.d, other.c, other.d);
        }
        equals(other) {
            if (other.type === this.type) {
                return (this.c === other.c && this.d === other.d);
            }
            return false;
        }
        substituteConstants() {
            const constantValue = CONSTANT_VALUES.get(this.c);
            if (typeof constantValue === 'boolean') {
                const falseValue = constantValue ? 'true' : 'false';
                return (this.d === falseValue ? $Gj.INSTANCE : $Hj.INSTANCE);
            }
            return this;
        }
        evaluate(context) {
            // Intentional !=
            // eslint-disable-next-line eqeqeq
            return (context.getValue(this.c) != this.d);
        }
        serialize() {
            return `${this.c} != '${this.d}'`;
        }
        keys() {
            return [this.c];
        }
        map(mapFnc) {
            return mapFnc.mapNotEquals(this.c, this.d);
        }
        negate() {
            if (!this.f) {
                this.f = $Jj.create(this.c, this.d, this);
            }
            return this.f;
        }
    }
    exports.$Mj = $Mj;
    class $Nj {
        static create(key, negated = null) {
            const constantValue = CONSTANT_VALUES.get(key);
            if (typeof constantValue === 'boolean') {
                return (constantValue ? $Gj.INSTANCE : $Hj.INSTANCE);
            }
            return new $Nj(key, negated);
        }
        constructor(c, d) {
            this.c = c;
            this.d = d;
            this.type = ContextKeyExprType.Not;
        }
        cmp(other) {
            if (other.type !== this.type) {
                return this.type - other.type;
            }
            return cmp1(this.c, other.c);
        }
        equals(other) {
            if (other.type === this.type) {
                return (this.c === other.c);
            }
            return false;
        }
        substituteConstants() {
            const constantValue = CONSTANT_VALUES.get(this.c);
            if (typeof constantValue === 'boolean') {
                return (constantValue ? $Gj.INSTANCE : $Hj.INSTANCE);
            }
            return this;
        }
        evaluate(context) {
            return (!context.getValue(this.c));
        }
        serialize() {
            return `!${this.c}`;
        }
        keys() {
            return [this.c];
        }
        map(mapFnc) {
            return mapFnc.mapNot(this.c);
        }
        negate() {
            if (!this.d) {
                this.d = $Ij.create(this.c, this);
            }
            return this.d;
        }
    }
    exports.$Nj = $Nj;
    function withFloatOrStr(value, callback) {
        if (typeof value === 'string') {
            const n = parseFloat(value);
            if (!isNaN(n)) {
                value = n;
            }
        }
        if (typeof value === 'string' || typeof value === 'number') {
            return callback(value);
        }
        return $Gj.INSTANCE;
    }
    class $Oj {
        static create(key, _value, negated = null) {
            return withFloatOrStr(_value, (value) => new $Oj(key, value, negated));
        }
        constructor(c, d, f) {
            this.c = c;
            this.d = d;
            this.f = f;
            this.type = ContextKeyExprType.Greater;
        }
        cmp(other) {
            if (other.type !== this.type) {
                return this.type - other.type;
            }
            return cmp2(this.c, this.d, other.c, other.d);
        }
        equals(other) {
            if (other.type === this.type) {
                return (this.c === other.c && this.d === other.d);
            }
            return false;
        }
        substituteConstants() {
            return this;
        }
        evaluate(context) {
            if (typeof this.d === 'string') {
                return false;
            }
            return (parseFloat(context.getValue(this.c)) > this.d);
        }
        serialize() {
            return `${this.c} > ${this.d}`;
        }
        keys() {
            return [this.c];
        }
        map(mapFnc) {
            return mapFnc.mapGreater(this.c, this.d);
        }
        negate() {
            if (!this.f) {
                this.f = $Rj.create(this.c, this.d, this);
            }
            return this.f;
        }
    }
    exports.$Oj = $Oj;
    class $Pj {
        static create(key, _value, negated = null) {
            return withFloatOrStr(_value, (value) => new $Pj(key, value, negated));
        }
        constructor(c, d, f) {
            this.c = c;
            this.d = d;
            this.f = f;
            this.type = ContextKeyExprType.GreaterEquals;
        }
        cmp(other) {
            if (other.type !== this.type) {
                return this.type - other.type;
            }
            return cmp2(this.c, this.d, other.c, other.d);
        }
        equals(other) {
            if (other.type === this.type) {
                return (this.c === other.c && this.d === other.d);
            }
            return false;
        }
        substituteConstants() {
            return this;
        }
        evaluate(context) {
            if (typeof this.d === 'string') {
                return false;
            }
            return (parseFloat(context.getValue(this.c)) >= this.d);
        }
        serialize() {
            return `${this.c} >= ${this.d}`;
        }
        keys() {
            return [this.c];
        }
        map(mapFnc) {
            return mapFnc.mapGreaterEquals(this.c, this.d);
        }
        negate() {
            if (!this.f) {
                this.f = $Qj.create(this.c, this.d, this);
            }
            return this.f;
        }
    }
    exports.$Pj = $Pj;
    class $Qj {
        static create(key, _value, negated = null) {
            return withFloatOrStr(_value, (value) => new $Qj(key, value, negated));
        }
        constructor(c, d, f) {
            this.c = c;
            this.d = d;
            this.f = f;
            this.type = ContextKeyExprType.Smaller;
        }
        cmp(other) {
            if (other.type !== this.type) {
                return this.type - other.type;
            }
            return cmp2(this.c, this.d, other.c, other.d);
        }
        equals(other) {
            if (other.type === this.type) {
                return (this.c === other.c && this.d === other.d);
            }
            return false;
        }
        substituteConstants() {
            return this;
        }
        evaluate(context) {
            if (typeof this.d === 'string') {
                return false;
            }
            return (parseFloat(context.getValue(this.c)) < this.d);
        }
        serialize() {
            return `${this.c} < ${this.d}`;
        }
        keys() {
            return [this.c];
        }
        map(mapFnc) {
            return mapFnc.mapSmaller(this.c, this.d);
        }
        negate() {
            if (!this.f) {
                this.f = $Pj.create(this.c, this.d, this);
            }
            return this.f;
        }
    }
    exports.$Qj = $Qj;
    class $Rj {
        static create(key, _value, negated = null) {
            return withFloatOrStr(_value, (value) => new $Rj(key, value, negated));
        }
        constructor(c, d, f) {
            this.c = c;
            this.d = d;
            this.f = f;
            this.type = ContextKeyExprType.SmallerEquals;
        }
        cmp(other) {
            if (other.type !== this.type) {
                return this.type - other.type;
            }
            return cmp2(this.c, this.d, other.c, other.d);
        }
        equals(other) {
            if (other.type === this.type) {
                return (this.c === other.c && this.d === other.d);
            }
            return false;
        }
        substituteConstants() {
            return this;
        }
        evaluate(context) {
            if (typeof this.d === 'string') {
                return false;
            }
            return (parseFloat(context.getValue(this.c)) <= this.d);
        }
        serialize() {
            return `${this.c} <= ${this.d}`;
        }
        keys() {
            return [this.c];
        }
        map(mapFnc) {
            return mapFnc.mapSmallerEquals(this.c, this.d);
        }
        negate() {
            if (!this.f) {
                this.f = $Oj.create(this.c, this.d, this);
            }
            return this.f;
        }
    }
    exports.$Rj = $Rj;
    class $Sj {
        static create(key, regexp) {
            return new $Sj(key, regexp);
        }
        constructor(d, f) {
            this.d = d;
            this.f = f;
            this.type = ContextKeyExprType.Regex;
            this.c = null;
            //
        }
        cmp(other) {
            if (other.type !== this.type) {
                return this.type - other.type;
            }
            if (this.d < other.d) {
                return -1;
            }
            if (this.d > other.d) {
                return 1;
            }
            const thisSource = this.f ? this.f.source : '';
            const otherSource = other.f ? other.f.source : '';
            if (thisSource < otherSource) {
                return -1;
            }
            if (thisSource > otherSource) {
                return 1;
            }
            return 0;
        }
        equals(other) {
            if (other.type === this.type) {
                const thisSource = this.f ? this.f.source : '';
                const otherSource = other.f ? other.f.source : '';
                return (this.d === other.d && thisSource === otherSource);
            }
            return false;
        }
        substituteConstants() {
            return this;
        }
        evaluate(context) {
            const value = context.getValue(this.d);
            return this.f ? this.f.test(value) : false;
        }
        serialize() {
            const value = this.f
                ? `/${this.f.source}/${this.f.flags}`
                : '/invalid/';
            return `${this.d} =~ ${value}`;
        }
        keys() {
            return [this.d];
        }
        map(mapFnc) {
            return mapFnc.mapRegex(this.d, this.f);
        }
        negate() {
            if (!this.c) {
                this.c = $Tj.create(this);
            }
            return this.c;
        }
    }
    exports.$Sj = $Sj;
    class $Tj {
        static create(actual) {
            return new $Tj(actual);
        }
        constructor(c) {
            this.c = c;
            this.type = ContextKeyExprType.NotRegex;
            //
        }
        cmp(other) {
            if (other.type !== this.type) {
                return this.type - other.type;
            }
            return this.c.cmp(other.c);
        }
        equals(other) {
            if (other.type === this.type) {
                return this.c.equals(other.c);
            }
            return false;
        }
        substituteConstants() {
            return this;
        }
        evaluate(context) {
            return !this.c.evaluate(context);
        }
        serialize() {
            return `!(${this.c.serialize()})`;
        }
        keys() {
            return this.c.keys();
        }
        map(mapFnc) {
            return new $Tj(this.c.map(mapFnc));
        }
        negate() {
            return this.c;
        }
    }
    exports.$Tj = $Tj;
    /**
     * @returns the same instance if nothing changed.
     */
    function eliminateConstantsInArray(arr) {
        // Allocate array only if there is a difference
        let newArr = null;
        for (let i = 0, len = arr.length; i < len; i++) {
            const newExpr = arr[i].substituteConstants();
            if (arr[i] !== newExpr) {
                // something has changed!
                // allocate array on first difference
                if (newArr === null) {
                    newArr = [];
                    for (let j = 0; j < i; j++) {
                        newArr[j] = arr[j];
                    }
                }
            }
            if (newArr !== null) {
                newArr[i] = newExpr;
            }
        }
        if (newArr === null) {
            return arr;
        }
        return newArr;
    }
    class $Uj {
        static create(_expr, negated, extraRedundantCheck) {
            return $Uj.d(_expr, negated, extraRedundantCheck);
        }
        constructor(expr, c) {
            this.expr = expr;
            this.c = c;
            this.type = ContextKeyExprType.And;
        }
        cmp(other) {
            if (other.type !== this.type) {
                return this.type - other.type;
            }
            if (this.expr.length < other.expr.length) {
                return -1;
            }
            if (this.expr.length > other.expr.length) {
                return 1;
            }
            for (let i = 0, len = this.expr.length; i < len; i++) {
                const r = cmp(this.expr[i], other.expr[i]);
                if (r !== 0) {
                    return r;
                }
            }
            return 0;
        }
        equals(other) {
            if (other.type === this.type) {
                if (this.expr.length !== other.expr.length) {
                    return false;
                }
                for (let i = 0, len = this.expr.length; i < len; i++) {
                    if (!this.expr[i].equals(other.expr[i])) {
                        return false;
                    }
                }
                return true;
            }
            return false;
        }
        substituteConstants() {
            const exprArr = eliminateConstantsInArray(this.expr);
            if (exprArr === this.expr) {
                // no change
                return this;
            }
            return $Uj.create(exprArr, this.c, false);
        }
        evaluate(context) {
            for (let i = 0, len = this.expr.length; i < len; i++) {
                if (!this.expr[i].evaluate(context)) {
                    return false;
                }
            }
            return true;
        }
        static d(arr, negated, extraRedundantCheck) {
            const expr = [];
            let hasTrue = false;
            for (const e of arr) {
                if (!e) {
                    continue;
                }
                if (e.type === ContextKeyExprType.True) {
                    // anything && true ==> anything
                    hasTrue = true;
                    continue;
                }
                if (e.type === ContextKeyExprType.False) {
                    // anything && false ==> false
                    return $Gj.INSTANCE;
                }
                if (e.type === ContextKeyExprType.And) {
                    expr.push(...e.expr);
                    continue;
                }
                expr.push(e);
            }
            if (expr.length === 0 && hasTrue) {
                return $Hj.INSTANCE;
            }
            if (expr.length === 0) {
                return undefined;
            }
            if (expr.length === 1) {
                return expr[0];
            }
            expr.sort(cmp);
            // eliminate duplicate terms
            for (let i = 1; i < expr.length; i++) {
                if (expr[i - 1].equals(expr[i])) {
                    expr.splice(i, 1);
                    i--;
                }
            }
            if (expr.length === 1) {
                return expr[0];
            }
            // We must distribute any OR expression because we don't support parens
            // OR extensions will be at the end (due to sorting rules)
            while (expr.length > 1) {
                const lastElement = expr[expr.length - 1];
                if (lastElement.type !== ContextKeyExprType.Or) {
                    break;
                }
                // pop the last element
                expr.pop();
                // pop the second to last element
                const secondToLastElement = expr.pop();
                const isFinished = (expr.length === 0);
                // distribute `lastElement` over `secondToLastElement`
                const resultElement = $Vj.create(lastElement.expr.map(el => $Uj.create([el, secondToLastElement], null, extraRedundantCheck)), null, isFinished);
                if (resultElement) {
                    expr.push(resultElement);
                    expr.sort(cmp);
                }
            }
            if (expr.length === 1) {
                return expr[0];
            }
            // resolve false AND expressions
            if (extraRedundantCheck) {
                for (let i = 0; i < expr.length; i++) {
                    for (let j = i + 1; j < expr.length; j++) {
                        if (expr[i].negate().equals(expr[j])) {
                            // A && !A case
                            return $Gj.INSTANCE;
                        }
                    }
                }
                if (expr.length === 1) {
                    return expr[0];
                }
            }
            return new $Uj(expr, negated);
        }
        serialize() {
            return this.expr.map(e => e.serialize()).join(' && ');
        }
        keys() {
            const result = [];
            for (const expr of this.expr) {
                result.push(...expr.keys());
            }
            return result;
        }
        map(mapFnc) {
            return new $Uj(this.expr.map(expr => expr.map(mapFnc)), null);
        }
        negate() {
            if (!this.c) {
                const result = [];
                for (const expr of this.expr) {
                    result.push(expr.negate());
                }
                this.c = $Vj.create(result, this, true);
            }
            return this.c;
        }
    }
    exports.$Uj = $Uj;
    class $Vj {
        static create(_expr, negated, extraRedundantCheck) {
            return $Vj.d(_expr, negated, extraRedundantCheck);
        }
        constructor(expr, c) {
            this.expr = expr;
            this.c = c;
            this.type = ContextKeyExprType.Or;
        }
        cmp(other) {
            if (other.type !== this.type) {
                return this.type - other.type;
            }
            if (this.expr.length < other.expr.length) {
                return -1;
            }
            if (this.expr.length > other.expr.length) {
                return 1;
            }
            for (let i = 0, len = this.expr.length; i < len; i++) {
                const r = cmp(this.expr[i], other.expr[i]);
                if (r !== 0) {
                    return r;
                }
            }
            return 0;
        }
        equals(other) {
            if (other.type === this.type) {
                if (this.expr.length !== other.expr.length) {
                    return false;
                }
                for (let i = 0, len = this.expr.length; i < len; i++) {
                    if (!this.expr[i].equals(other.expr[i])) {
                        return false;
                    }
                }
                return true;
            }
            return false;
        }
        substituteConstants() {
            const exprArr = eliminateConstantsInArray(this.expr);
            if (exprArr === this.expr) {
                // no change
                return this;
            }
            return $Vj.create(exprArr, this.c, false);
        }
        evaluate(context) {
            for (let i = 0, len = this.expr.length; i < len; i++) {
                if (this.expr[i].evaluate(context)) {
                    return true;
                }
            }
            return false;
        }
        static d(arr, negated, extraRedundantCheck) {
            let expr = [];
            let hasFalse = false;
            if (arr) {
                for (let i = 0, len = arr.length; i < len; i++) {
                    const e = arr[i];
                    if (!e) {
                        continue;
                    }
                    if (e.type === ContextKeyExprType.False) {
                        // anything || false ==> anything
                        hasFalse = true;
                        continue;
                    }
                    if (e.type === ContextKeyExprType.True) {
                        // anything || true ==> true
                        return $Hj.INSTANCE;
                    }
                    if (e.type === ContextKeyExprType.Or) {
                        expr = expr.concat(e.expr);
                        continue;
                    }
                    expr.push(e);
                }
                if (expr.length === 0 && hasFalse) {
                    return $Gj.INSTANCE;
                }
                expr.sort(cmp);
            }
            if (expr.length === 0) {
                return undefined;
            }
            if (expr.length === 1) {
                return expr[0];
            }
            // eliminate duplicate terms
            for (let i = 1; i < expr.length; i++) {
                if (expr[i - 1].equals(expr[i])) {
                    expr.splice(i, 1);
                    i--;
                }
            }
            if (expr.length === 1) {
                return expr[0];
            }
            // resolve true OR expressions
            if (extraRedundantCheck) {
                for (let i = 0; i < expr.length; i++) {
                    for (let j = i + 1; j < expr.length; j++) {
                        if (expr[i].negate().equals(expr[j])) {
                            // A || !A case
                            return $Hj.INSTANCE;
                        }
                    }
                }
                if (expr.length === 1) {
                    return expr[0];
                }
            }
            return new $Vj(expr, negated);
        }
        serialize() {
            return this.expr.map(e => e.serialize()).join(' || ');
        }
        keys() {
            const result = [];
            for (const expr of this.expr) {
                result.push(...expr.keys());
            }
            return result;
        }
        map(mapFnc) {
            return new $Vj(this.expr.map(expr => expr.map(mapFnc)), null);
        }
        negate() {
            if (!this.c) {
                const result = [];
                for (const expr of this.expr) {
                    result.push(expr.negate());
                }
                // We don't support parens, so here we distribute the AND over the OR terminals
                // We always take the first 2 AND pairs and distribute them
                while (result.length > 1) {
                    const LEFT = result.shift();
                    const RIGHT = result.shift();
                    const all = [];
                    for (const left of getTerminals(LEFT)) {
                        for (const right of getTerminals(RIGHT)) {
                            all.push($Uj.create([left, right], null, false));
                        }
                    }
                    result.unshift($Vj.create(all, null, false));
                }
                this.c = $Vj.create(result, this, true);
            }
            return this.c;
        }
    }
    exports.$Vj = $Vj;
    class $Wj extends $Ij {
        static { this.d = []; }
        static all() {
            return $Wj.d.values();
        }
        constructor(key, defaultValue, metaOrHide) {
            super(key, null);
            this.f = defaultValue;
            // collect all context keys into a central place
            if (typeof metaOrHide === 'object') {
                $Wj.d.push({ ...metaOrHide, key });
            }
            else if (metaOrHide !== true) {
                $Wj.d.push({ key, description: metaOrHide, type: defaultValue !== null && defaultValue !== undefined ? typeof defaultValue : undefined });
            }
        }
        bindTo(target) {
            return target.createKey(this.key, this.f);
        }
        getValue(target) {
            return target.getContextKeyValue(this.key);
        }
        toNegated() {
            return this.negate();
        }
        isEqualTo(value) {
            return $Jj.create(this.key, value);
        }
        notEqualsTo(value) {
            return $Mj.create(this.key, value);
        }
    }
    exports.$Wj = $Wj;
    exports.$Xj = (0, instantiation_1.$Fi)('contextKeyService');
    function cmp1(key1, key2) {
        if (key1 < key2) {
            return -1;
        }
        if (key1 > key2) {
            return 1;
        }
        return 0;
    }
    function cmp2(key1, value1, key2, value2) {
        if (key1 < key2) {
            return -1;
        }
        if (key1 > key2) {
            return 1;
        }
        if (value1 < value2) {
            return -1;
        }
        if (value1 > value2) {
            return 1;
        }
        return 0;
    }
    /**
     * Returns true if it is provable `p` implies `q`.
     */
    function $Yj(p, q) {
        if (p.type === ContextKeyExprType.False || q.type === ContextKeyExprType.True) {
            // false implies anything
            // anything implies true
            return true;
        }
        if (p.type === ContextKeyExprType.Or) {
            if (q.type === ContextKeyExprType.Or) {
                // `a || b || c` can only imply something like `a || b || c || d`
                return allElementsIncluded(p.expr, q.expr);
            }
            return false;
        }
        if (q.type === ContextKeyExprType.Or) {
            for (const element of q.expr) {
                if ($Yj(p, element)) {
                    return true;
                }
            }
            return false;
        }
        if (p.type === ContextKeyExprType.And) {
            if (q.type === ContextKeyExprType.And) {
                // `a && b && c` implies `a && c`
                return allElementsIncluded(q.expr, p.expr);
            }
            for (const element of p.expr) {
                if ($Yj(element, q)) {
                    return true;
                }
            }
            return false;
        }
        return p.equals(q);
    }
    /**
     * Returns true if all elements in `p` are also present in `q`.
     * The two arrays are assumed to be sorted
     */
    function allElementsIncluded(p, q) {
        let pIndex = 0;
        let qIndex = 0;
        while (pIndex < p.length && qIndex < q.length) {
            const cmp = p[pIndex].cmp(q[qIndex]);
            if (cmp < 0) {
                // an element from `p` is missing from `q`
                return false;
            }
            else if (cmp === 0) {
                pIndex++;
                qIndex++;
            }
            else {
                qIndex++;
            }
        }
        return (pIndex === p.length);
    }
    function getTerminals(node) {
        if (node.type === ContextKeyExprType.Or) {
            return node.expr;
        }
        return [node];
    }
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(__m[37/*vs/workbench/services/notebook/common/notebookDocumentService*/], __M([0/*require*/,1/*exports*/,7/*vs/base/common/buffer*/,24/*vs/base/common/map*/,8/*vs/base/common/network*/,35/*vs/platform/instantiation/common/extensions*/,15/*vs/platform/instantiation/common/instantiation*/]), function (require, exports, buffer_1, map_1, network_1, extensions_1, instantiation_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.$uL = exports.$rL = void 0;
    exports.$sL = $sL;
    exports.$tL = $tL;
    exports.$rL = (0, instantiation_1.$Fi)('notebookDocumentService');
    const _lengths = ['W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f'];
    const _padRegexp = new RegExp(`^[${_lengths.join('')}]+`);
    const _radix = 7;
    function $sL(cell) {
        if (cell.scheme !== network_1.Schemas.vscodeNotebookCell) {
            return undefined;
        }
        const idx = cell.fragment.indexOf('s');
        if (idx < 0) {
            return undefined;
        }
        const handle = parseInt(cell.fragment.substring(0, idx).replace(_padRegexp, ''), _radix);
        const _scheme = (0, buffer_1.$7e)(cell.fragment.substring(idx + 1)).toString();
        if (isNaN(handle)) {
            return undefined;
        }
        return {
            handle,
            notebook: cell.with({ scheme: _scheme, fragment: null })
        };
    }
    function $tL(notebook, handle) {
        const s = handle.toString(_radix);
        const p = s.length < _lengths.length ? _lengths[s.length - 1] : 'z';
        const fragment = `${p}${s}s${(0, buffer_1.$8e)(buffer_1.$Ne.fromString(notebook.scheme), true, true)}`;
        return notebook.with({ scheme: network_1.Schemas.vscodeNotebookCell, fragment });
    }
    class $uL {
        constructor() {
            this.a = new map_1.$Ac();
        }
        getNotebook(uri) {
            if (uri.scheme === network_1.Schemas.vscodeNotebookCell) {
                const cellUri = $sL(uri);
                if (cellUri) {
                    const document = this.a.get(cellUri.notebook);
                    if (document) {
                        return document;
                    }
                }
            }
            return this.a.get(uri);
        }
        addNotebookDocument(document) {
            this.a.set(document.uri, document);
        }
        removeNotebookDocument(document) {
            this.a.delete(document.uri);
        }
    }
    exports.$uL = $uL;
    (0, extensions_1.$Rs)(exports.$rL, $uL, extensions_1.InstantiationType.Delayed);
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/























define(__m[38/*vs/workbench/contrib/notebook/common/notebookCommon*/], __M([0/*require*/,1/*exports*/,7/*vs/base/common/buffer*/,23/*vs/base/common/glob*/,43/*vs/base/common/iterator*/,16/*vs/base/common/mime*/,8/*vs/base/common/network*/,5/*vs/base/common/path*/,3/*vs/base/common/platform*/,36/*vs/platform/contextkey/common/contextkey*/,37/*vs/workbench/services/notebook/common/notebookDocumentService*/]), function (require, exports, buffer_1, glob, iterator_1, mime_1, network_1, path_1, platform_1, contextkey_1, notebookDocumentService_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.$OL = exports.$LL = exports.CellStatusbarAlignment = exports.$KL = exports.NotebookFindScopeType = exports.NotebookEditorPriority = exports.$HL = exports.$GL = exports.$EL = exports.CellUri = exports.CellEditType = exports.SelectionStateType = exports.NotebookCellsChangeType = exports.RendererMessagingSpec = exports.NotebookRendererMatch = exports.NotebookExecutionState = exports.NotebookCellExecutionState = exports.NotebookRunState = exports.$DL = exports.$CL = exports.$BL = exports.$AL = exports.CellKind = exports.$zL = exports.$yL = exports.$xL = exports.$wL = exports.$vL = void 0;
    exports.$FL = $FL;
    exports.$IL = $IL;
    exports.$JL = $JL;
    exports.$ML = $ML;
    exports.$NL = $NL;
    glob = __importStar(glob);
    exports.$vL = 'workbench.editor.notebook';
    exports.$wL = 'workbench.editor.notebookTextDiffEditor';
    exports.$xL = 'workbench.editor.interactive';
    exports.$yL = 'workbench.editor.repl';
    exports.$zL = 'replNotebook.input.execute';
    var CellKind;
    (function (CellKind) {
        CellKind[CellKind["Markup"] = 1] = "Markup";
        CellKind[CellKind["Code"] = 2] = "Code";
    })(CellKind || (exports.CellKind = CellKind = {}));
    exports.$AL = [
        'application/json',
        'application/javascript',
        'text/html',
        'image/svg+xml',
        mime_1.$$s.latex,
        mime_1.$$s.markdown,
        'image/png',
        'image/jpeg',
        mime_1.$$s.text
    ];
    exports.$BL = [
        mime_1.$$s.latex,
        mime_1.$$s.markdown,
        'application/json',
        'text/html',
        'image/svg+xml',
        'image/png',
        'image/jpeg',
        mime_1.$$s.text,
    ];
    /**
     * A mapping of extension IDs who contain renderers, to notebook ids who they
     * should be treated as the same in the renderer selection logic. This is used
     * to prefer the 1st party Jupyter renderers even though they're in a separate
     * extension, for instance. See #136247.
     */
    exports.$CL = new Map([
        ['ms-toolsai.jupyter', new Set(['jupyter-notebook', 'interactive'])],
        ['ms-toolsai.jupyter-renderers', new Set(['jupyter-notebook', 'interactive'])],
    ]);
    exports.$DL = '_notAvailable';
    var NotebookRunState;
    (function (NotebookRunState) {
        NotebookRunState[NotebookRunState["Running"] = 1] = "Running";
        NotebookRunState[NotebookRunState["Idle"] = 2] = "Idle";
    })(NotebookRunState || (exports.NotebookRunState = NotebookRunState = {}));
    var NotebookCellExecutionState;
    (function (NotebookCellExecutionState) {
        NotebookCellExecutionState[NotebookCellExecutionState["Unconfirmed"] = 1] = "Unconfirmed";
        NotebookCellExecutionState[NotebookCellExecutionState["Pending"] = 2] = "Pending";
        NotebookCellExecutionState[NotebookCellExecutionState["Executing"] = 3] = "Executing";
    })(NotebookCellExecutionState || (exports.NotebookCellExecutionState = NotebookCellExecutionState = {}));
    var NotebookExecutionState;
    (function (NotebookExecutionState) {
        NotebookExecutionState[NotebookExecutionState["Unconfirmed"] = 1] = "Unconfirmed";
        NotebookExecutionState[NotebookExecutionState["Pending"] = 2] = "Pending";
        NotebookExecutionState[NotebookExecutionState["Executing"] = 3] = "Executing";
    })(NotebookExecutionState || (exports.NotebookExecutionState = NotebookExecutionState = {}));
    /** Note: enum values are used for sorting */
    var NotebookRendererMatch;
    (function (NotebookRendererMatch) {
        /** Renderer has a hard dependency on an available kernel */
        NotebookRendererMatch[NotebookRendererMatch["WithHardKernelDependency"] = 0] = "WithHardKernelDependency";
        /** Renderer works better with an available kernel */
        NotebookRendererMatch[NotebookRendererMatch["WithOptionalKernelDependency"] = 1] = "WithOptionalKernelDependency";
        /** Renderer is kernel-agnostic */
        NotebookRendererMatch[NotebookRendererMatch["Pure"] = 2] = "Pure";
        /** Renderer is for a different mimeType or has a hard dependency which is unsatisfied */
        NotebookRendererMatch[NotebookRendererMatch["Never"] = 3] = "Never";
    })(NotebookRendererMatch || (exports.NotebookRendererMatch = NotebookRendererMatch = {}));
    /**
     * Renderer messaging requirement. While this allows for 'optional' messaging,
     * VS Code effectively treats it the same as true right now. "Partial
     * activation" of extensions is a very tricky problem, which could allow
     * solving this. But for now, optional is mostly only honored for aznb.
     */
    var RendererMessagingSpec;
    (function (RendererMessagingSpec) {
        RendererMessagingSpec["Always"] = "always";
        RendererMessagingSpec["Never"] = "never";
        RendererMessagingSpec["Optional"] = "optional";
    })(RendererMessagingSpec || (exports.RendererMessagingSpec = RendererMessagingSpec = {}));
    var NotebookCellsChangeType;
    (function (NotebookCellsChangeType) {
        NotebookCellsChangeType[NotebookCellsChangeType["ModelChange"] = 1] = "ModelChange";
        NotebookCellsChangeType[NotebookCellsChangeType["Move"] = 2] = "Move";
        NotebookCellsChangeType[NotebookCellsChangeType["ChangeCellLanguage"] = 5] = "ChangeCellLanguage";
        NotebookCellsChangeType[NotebookCellsChangeType["Initialize"] = 6] = "Initialize";
        NotebookCellsChangeType[NotebookCellsChangeType["ChangeCellMetadata"] = 7] = "ChangeCellMetadata";
        NotebookCellsChangeType[NotebookCellsChangeType["Output"] = 8] = "Output";
        NotebookCellsChangeType[NotebookCellsChangeType["OutputItem"] = 9] = "OutputItem";
        NotebookCellsChangeType[NotebookCellsChangeType["ChangeCellContent"] = 10] = "ChangeCellContent";
        NotebookCellsChangeType[NotebookCellsChangeType["ChangeDocumentMetadata"] = 11] = "ChangeDocumentMetadata";
        NotebookCellsChangeType[NotebookCellsChangeType["ChangeCellInternalMetadata"] = 12] = "ChangeCellInternalMetadata";
        NotebookCellsChangeType[NotebookCellsChangeType["ChangeCellMime"] = 13] = "ChangeCellMime";
        NotebookCellsChangeType[NotebookCellsChangeType["Unknown"] = 100] = "Unknown";
    })(NotebookCellsChangeType || (exports.NotebookCellsChangeType = NotebookCellsChangeType = {}));
    var SelectionStateType;
    (function (SelectionStateType) {
        SelectionStateType[SelectionStateType["Handle"] = 0] = "Handle";
        SelectionStateType[SelectionStateType["Index"] = 1] = "Index";
    })(SelectionStateType || (exports.SelectionStateType = SelectionStateType = {}));
    var CellEditType;
    (function (CellEditType) {
        CellEditType[CellEditType["Replace"] = 1] = "Replace";
        CellEditType[CellEditType["Output"] = 2] = "Output";
        CellEditType[CellEditType["Metadata"] = 3] = "Metadata";
        CellEditType[CellEditType["CellLanguage"] = 4] = "CellLanguage";
        CellEditType[CellEditType["DocumentMetadata"] = 5] = "DocumentMetadata";
        CellEditType[CellEditType["Move"] = 6] = "Move";
        CellEditType[CellEditType["OutputItems"] = 7] = "OutputItems";
        CellEditType[CellEditType["PartialMetadata"] = 8] = "PartialMetadata";
        CellEditType[CellEditType["PartialInternalMetadata"] = 9] = "PartialInternalMetadata";
    })(CellEditType || (exports.CellEditType = CellEditType = {}));
    var CellUri;
    (function (CellUri) {
        CellUri.scheme = network_1.Schemas.vscodeNotebookCell;
        function generate(notebook, handle) {
            return (0, notebookDocumentService_1.$tL)(notebook, handle);
        }
        CellUri.generate = generate;
        function parse(cell) {
            return (0, notebookDocumentService_1.$sL)(cell);
        }
        CellUri.parse = parse;
        function generateCellOutputUri(notebook, outputId) {
            return notebook.with({
                scheme: network_1.Schemas.vscodeNotebookCellOutput,
                fragment: `op${outputId ?? ''},${notebook.scheme !== network_1.Schemas.file ? notebook.scheme : ''}`
            });
        }
        CellUri.generateCellOutputUri = generateCellOutputUri;
        function parseCellOutputUri(uri) {
            if (uri.scheme !== network_1.Schemas.vscodeNotebookCellOutput) {
                return;
            }
            const match = /^op([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})?\,(.*)$/i.exec(uri.fragment);
            if (!match) {
                return undefined;
            }
            const outputId = (match[1] && match[1] !== '') ? match[1] : undefined;
            const scheme = match[2];
            return {
                outputId,
                notebook: uri.with({
                    scheme: scheme || network_1.Schemas.file,
                    fragment: null
                })
            };
        }
        CellUri.parseCellOutputUri = parseCellOutputUri;
        function generateCellPropertyUri(notebook, handle, scheme) {
            return CellUri.generate(notebook, handle).with({ scheme: scheme });
        }
        CellUri.generateCellPropertyUri = generateCellPropertyUri;
        function parseCellPropertyUri(uri, propertyScheme) {
            if (uri.scheme !== propertyScheme) {
                return undefined;
            }
            return CellUri.parse(uri.with({ scheme: CellUri.scheme }));
        }
        CellUri.parseCellPropertyUri = parseCellPropertyUri;
    })(CellUri || (exports.CellUri = CellUri = {}));
    const normalizeSlashes = (str) => platform_1.$j ? str.replace(/\//g, '\\') : str;
    class $EL {
        constructor(initialValue = [], e = exports.$AL) {
            this.e = e;
            this.d = [...new Set(initialValue)].map(pattern => ({
                pattern,
                matches: glob.$Ak(normalizeSlashes(pattern))
            }));
        }
        /**
         * Returns a sorted array of the input mimetypes.
         */
        sort(mimetypes) {
            const remaining = new Map(iterator_1.Iterable.map(mimetypes, m => [m, normalizeSlashes(m)]));
            let sorted = [];
            for (const { matches } of this.d) {
                for (const [original, normalized] of remaining) {
                    if (matches(normalized)) {
                        sorted.push(original);
                        remaining.delete(original);
                        break;
                    }
                }
            }
            if (remaining.size) {
                sorted = sorted.concat([...remaining.keys()].sort((a, b) => this.e.indexOf(a) - this.e.indexOf(b)));
            }
            return sorted;
        }
        /**
         * Records that the user selected the given mimetype over the other
         * possible mimetypes, prioritizing it for future reference.
         */
        prioritize(chosenMimetype, otherMimetypes) {
            const chosenIndex = this.f(chosenMimetype);
            if (chosenIndex === -1) {
                // always first, nothing more to do
                this.d.unshift({ pattern: chosenMimetype, matches: glob.$Ak(normalizeSlashes(chosenMimetype)) });
                return;
            }
            // Get the other mimetypes that are before the chosenMimetype. Then, move
            // them after it, retaining order.
            const uniqueIndicies = new Set(otherMimetypes.map(m => this.f(m, chosenIndex)));
            uniqueIndicies.delete(-1);
            const otherIndices = Array.from(uniqueIndicies).sort();
            this.d.splice(chosenIndex + 1, 0, ...otherIndices.map(i => this.d[i]));
            for (let oi = otherIndices.length - 1; oi >= 0; oi--) {
                this.d.splice(otherIndices[oi], 1);
            }
        }
        /**
         * Gets an array of in-order mimetype preferences.
         */
        toArray() {
            return this.d.map(o => o.pattern);
        }
        f(mimeType, maxIndex = this.d.length) {
            const normalized = normalizeSlashes(mimeType);
            for (let i = 0; i < maxIndex; i++) {
                if (this.d[i].matches(normalized)) {
                    return i;
                }
            }
            return -1;
        }
    }
    exports.$EL = $EL;
    function $FL(before, after, contains, equal = (a, b) => a === b) {
        const result = [];
        function pushSplice(start, deleteCount, toInsert) {
            if (deleteCount === 0 && toInsert.length === 0) {
                return;
            }
            const latest = result[result.length - 1];
            if (latest && latest.start + latest.deleteCount === start) {
                latest.deleteCount += deleteCount;
                latest.toInsert.push(...toInsert);
            }
            else {
                result.push({ start, deleteCount, toInsert });
            }
        }
        let beforeIdx = 0;
        let afterIdx = 0;
        while (true) {
            if (beforeIdx === before.length) {
                pushSplice(beforeIdx, 0, after.slice(afterIdx));
                break;
            }
            if (afterIdx === after.length) {
                pushSplice(beforeIdx, before.length - beforeIdx, []);
                break;
            }
            const beforeElement = before[beforeIdx];
            const afterElement = after[afterIdx];
            if (equal(beforeElement, afterElement)) {
                // equal
                beforeIdx += 1;
                afterIdx += 1;
                continue;
            }
            if (contains(afterElement)) {
                // `afterElement` exists before, which means some elements before `afterElement` are deleted
                pushSplice(beforeIdx, 1, []);
                beforeIdx += 1;
            }
            else {
                // `afterElement` added
                pushSplice(beforeIdx, 0, [afterElement]);
                afterIdx += 1;
            }
        }
        return result;
    }
    exports.$GL = new contextkey_1.$Wj('notebookEditorCursorAtBoundary', 'none');
    exports.$HL = new contextkey_1.$Wj('notebookEditorCursorAtLineBoundary', 'none');
    var NotebookEditorPriority;
    (function (NotebookEditorPriority) {
        NotebookEditorPriority["default"] = "default";
        NotebookEditorPriority["option"] = "option";
    })(NotebookEditorPriority || (exports.NotebookEditorPriority = NotebookEditorPriority = {}));
    var NotebookFindScopeType;
    (function (NotebookFindScopeType) {
        NotebookFindScopeType["Cells"] = "cells";
        NotebookFindScopeType["Text"] = "text";
        NotebookFindScopeType["None"] = "none";
    })(NotebookFindScopeType || (exports.NotebookFindScopeType = NotebookFindScopeType = {}));
    //TODO@rebornix test
    function $IL(filenamePattern) {
        const arg = filenamePattern;
        if ((typeof arg.include === 'string' || glob.$Bk(arg.include))
            && (typeof arg.exclude === 'string' || glob.$Bk(arg.exclude))) {
            return true;
        }
        return false;
    }
    function $JL(filter, viewType, resource) {
        if (Array.isArray(filter.viewType) && filter.viewType.indexOf(viewType) >= 0) {
            return true;
        }
        if (filter.viewType === viewType) {
            return true;
        }
        if (filter.filenamePattern) {
            const filenamePattern = $IL(filter.filenamePattern) ? filter.filenamePattern.include : filter.filenamePattern;
            const excludeFilenamePattern = $IL(filter.filenamePattern) ? filter.filenamePattern.exclude : undefined;
            if (glob.$zk(filenamePattern, (0, path_1.$nc)(resource.fsPath).toLowerCase())) {
                if (excludeFilenamePattern) {
                    if (glob.$zk(excludeFilenamePattern, (0, path_1.$nc)(resource.fsPath).toLowerCase())) {
                        // should exclude
                        return false;
                    }
                }
                return true;
            }
        }
        return false;
    }
    exports.$KL = {
        displayOrder: 'notebook.displayOrder',
        cellToolbarLocation: 'notebook.cellToolbarLocation',
        cellToolbarVisibility: 'notebook.cellToolbarVisibility',
        showCellStatusBar: 'notebook.showCellStatusBar',
        textDiffEditorPreview: 'notebook.diff.enablePreview',
        diffOverviewRuler: 'notebook.diff.overviewRuler',
        experimentalInsertToolbarAlignment: 'notebook.experimental.insertToolbarAlignment',
        compactView: 'notebook.compactView',
        focusIndicator: 'notebook.cellFocusIndicator',
        insertToolbarLocation: 'notebook.insertToolbarLocation',
        globalToolbar: 'notebook.globalToolbar',
        stickyScrollEnabled: 'notebook.stickyScroll.enabled',
        stickyScrollMode: 'notebook.stickyScroll.mode',
        undoRedoPerCell: 'notebook.undoRedoPerCell',
        consolidatedOutputButton: 'notebook.consolidatedOutputButton',
        showFoldingControls: 'notebook.showFoldingControls',
        dragAndDropEnabled: 'notebook.dragAndDropEnabled',
        cellEditorOptionsCustomizations: 'notebook.editorOptionsCustomizations',
        consolidatedRunButton: 'notebook.consolidatedRunButton',
        openGettingStarted: 'notebook.experimental.openGettingStarted',
        globalToolbarShowLabel: 'notebook.globalToolbarShowLabel',
        markupFontSize: 'notebook.markup.fontSize',
        markdownLineHeight: 'notebook.markdown.lineHeight',
        interactiveWindowCollapseCodeCells: 'interactiveWindow.collapseCellInputCode',
        outputScrollingDeprecated: 'notebook.experimental.outputScrolling',
        outputScrolling: 'notebook.output.scrolling',
        textOutputLineLimit: 'notebook.output.textLineLimit',
        LinkifyOutputFilePaths: 'notebook.output.linkifyFilePaths',
        minimalErrorRendering: 'notebook.output.minimalErrorRendering',
        formatOnSave: 'notebook.formatOnSave.enabled',
        insertFinalNewline: 'notebook.insertFinalNewline',
        defaultFormatter: 'notebook.defaultFormatter',
        formatOnCellExecution: 'notebook.formatOnCellExecution',
        codeActionsOnSave: 'notebook.codeActionsOnSave',
        outputWordWrap: 'notebook.output.wordWrap',
        outputLineHeightDeprecated: 'notebook.outputLineHeight',
        outputLineHeight: 'notebook.output.lineHeight',
        outputFontSizeDeprecated: 'notebook.outputFontSize',
        outputFontSize: 'notebook.output.fontSize',
        outputFontFamilyDeprecated: 'notebook.outputFontFamily',
        outputFontFamily: 'notebook.output.fontFamily',
        findFilters: 'notebook.find.filters',
        logging: 'notebook.logging',
        confirmDeleteRunningCell: 'notebook.confirmDeleteRunningCell',
        remoteSaving: 'notebook.experimental.remoteSave',
        gotoSymbolsAllSymbols: 'notebook.gotoSymbols.showAllSymbols',
        outlineShowMarkdownHeadersOnly: 'notebook.outline.showMarkdownHeadersOnly',
        outlineShowCodeCells: 'notebook.outline.showCodeCells',
        outlineShowCodeCellSymbols: 'notebook.outline.showCodeCellSymbols',
        breadcrumbsShowCodeCells: 'notebook.breadcrumbs.showCodeCells',
        scrollToRevealCell: 'notebook.scrolling.revealNextCellOnExecute',
        cellChat: 'notebook.experimental.cellChat',
        cellGenerate: 'notebook.experimental.generate',
        notebookVariablesView: 'notebook.experimental.variablesView',
        InteractiveWindowPromptToSave: 'interactiveWindow.promptToSaveOnClose',
        cellFailureDiagnostics: 'notebook.cellFailureDiagnostics',
        outputBackupSizeLimit: 'notebook.backup.sizeLimit',
    };
    var CellStatusbarAlignment;
    (function (CellStatusbarAlignment) {
        CellStatusbarAlignment[CellStatusbarAlignment["Left"] = 1] = "Left";
        CellStatusbarAlignment[CellStatusbarAlignment["Right"] = 2] = "Right";
    })(CellStatusbarAlignment || (exports.CellStatusbarAlignment = CellStatusbarAlignment = {}));
    class $LL {
        static { this.d = 'notebook/'; }
        static create(viewType) {
            return `${$LL.d}${viewType}`;
        }
        static parse(candidate) {
            if (candidate.startsWith($LL.d)) {
                return candidate.substring($LL.d.length);
            }
            return undefined;
        }
    }
    exports.$LL = $LL;
    /**
     * Whether the provided mime type is a text stream like `stdout`, `stderr`.
     */
    function $ML(mimeType) {
        return ['application/vnd.code.notebook.stdout', 'application/vnd.code.notebook.stderr'].includes(mimeType);
    }
    const textDecoder = new TextDecoder();
    /**
     * Given a stream of individual stdout outputs, this function will return the compressed lines, escaping some of the common terminal escape codes.
     * E.g. some terminal escape codes would result in the previous line getting cleared, such if we had 3 lines and
     * last line contained such a code, then the result string would be just the first two lines.
     * @returns a single VSBuffer with the concatenated and compressed data, and whether any compression was done.
     */
    function $NL(outputs) {
        const buffers = [];
        let startAppending = false;
        // Pick the first set of outputs with the same mime type.
        for (const output of outputs) {
            if ((buffers.length === 0 || startAppending)) {
                buffers.push(output);
                startAppending = true;
            }
        }
        let didCompression = compressStreamBuffer(buffers);
        const concatenated = buffer_1.$Ne.concat(buffers.map(buffer => buffer_1.$Ne.wrap(buffer)));
        const data = formatStreamText(concatenated);
        didCompression = didCompression || data.byteLength !== concatenated.byteLength;
        return { data, didCompression };
    }
    exports.$OL = `${String.fromCharCode(27)}[A`;
    const MOVE_CURSOR_1_LINE_COMMAND_BYTES = exports.$OL.split('').map(c => c.charCodeAt(0));
    const LINE_FEED = 10;
    function compressStreamBuffer(streams) {
        let didCompress = false;
        streams.forEach((stream, index) => {
            if (index === 0 || stream.length < exports.$OL.length) {
                return;
            }
            const previousStream = streams[index - 1];
            // Remove the previous line if required.
            const command = stream.subarray(0, exports.$OL.length);
            if (command[0] === MOVE_CURSOR_1_LINE_COMMAND_BYTES[0] && command[1] === MOVE_CURSOR_1_LINE_COMMAND_BYTES[1] && command[2] === MOVE_CURSOR_1_LINE_COMMAND_BYTES[2]) {
                const lastIndexOfLineFeed = previousStream.lastIndexOf(LINE_FEED);
                if (lastIndexOfLineFeed === -1) {
                    return;
                }
                didCompress = true;
                streams[index - 1] = previousStream.subarray(0, lastIndexOfLineFeed);
                streams[index] = stream.subarray(exports.$OL.length);
            }
        });
        return didCompress;
    }
    /**
     * Took this from jupyter/notebook
     * https://github.com/jupyter/notebook/blob/b8b66332e2023e83d2ee04f83d8814f567e01a4e/notebook/static/base/js/utils.js
     * Remove characters that are overridden by backspace characters
     */
    function fixBackspace(txt) {
        let tmp = txt;
        do {
            txt = tmp;
            // Cancel out anything-but-newline followed by backspace
            tmp = txt.replace(/[^\n]\x08/gm, '');
        } while (tmp.length < txt.length);
        return txt;
    }
    /**
     * Remove chunks that should be overridden by the effect of carriage return characters
     * From https://github.com/jupyter/notebook/blob/master/notebook/static/base/js/utils.js
     */
    function fixCarriageReturn(txt) {
        txt = txt.replace(/\r+\n/gm, '\n'); // \r followed by \n --> newline
        while (txt.search(/\r[^$]/g) > -1) {
            const base = txt.match(/^(.*)\r+/m)[1];
            let insert = txt.match(/\r+(.*)$/m)[1];
            insert = insert + base.slice(insert.length, base.length);
            txt = txt.replace(/\r+.*$/m, '\r').replace(/^.*\r/m, insert);
        }
        return txt;
    }
    const BACKSPACE_CHARACTER = '\b'.charCodeAt(0);
    const CARRIAGE_RETURN_CHARACTER = '\r'.charCodeAt(0);
    function formatStreamText(buffer) {
        // We have special handling for backspace and carriage return characters.
        // Don't unnecessary decode the bytes if we don't need to perform any processing.
        if (!buffer.buffer.includes(BACKSPACE_CHARACTER) && !buffer.buffer.includes(CARRIAGE_RETURN_CHARACTER)) {
            return buffer;
        }
        // Do the same thing jupyter is doing
        return buffer_1.$Ne.fromString(fixCarriageReturn(fixBackspace(textDecoder.decode(buffer.buffer))));
    }
});
























define(__m[44/*vs/workbench/contrib/notebook/common/services/notebookSimpleWorker*/], __M([0/*require*/,1/*exports*/,45/*vs/base/common/diff/diff*/,46/*vs/base/common/hash*/,12/*vs/base/common/uri*/,9/*vs/editor/common/model*/,31/*vs/editor/common/model/pieceTreeTextBuffer/pieceTreeTextBufferBuilder*/,38/*vs/workbench/contrib/notebook/common/notebookCommon*/,14/*vs/editor/common/core/range*/,29/*vs/editor/common/model/textModelSearch*/]), function (require, exports, diff_1, hash_1, uri_1, model, pieceTreeTextBufferBuilder_1, notebookCommon_1, range_1, textModelSearch_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.NotebookEditorSimpleWorker = void 0;
    exports.create = create;
    model = __importStar(model);
    function bufferHash(buffer) {
        let initialHashVal = (0, hash_1.$vj)(104579, 0);
        for (let k = 0; k < buffer.buffer.length; k++) {
            initialHashVal = (0, hash_1.$uj)(buffer.buffer[k], initialHashVal);
        }
        return initialHashVal;
    }
    class MirrorCell {
        get textBuffer() {
            if (this.a) {
                return this.a;
            }
            const builder = new pieceTreeTextBufferBuilder_1.$wD();
            builder.acceptChunk(Array.isArray(this.d) ? this.d.join('\n') : this.d);
            const bufferFactory = builder.finish(true);
            this.a = bufferFactory.create(model.DefaultEndOfLine.LF).textBuffer;
            return this.a;
        }
        primaryKey() {
            if (this.b === undefined) {
                this.b = (0, hash_1.$tj)(this.getValue());
            }
            return this.b;
        }
        constructor(handle, d, language, cellKind, outputs, metadata, internalMetadata) {
            this.handle = handle;
            this.d = d;
            this.language = language;
            this.cellKind = cellKind;
            this.outputs = outputs;
            this.metadata = metadata;
            this.internalMetadata = internalMetadata;
            this.b = null;
            this.c = null;
        }
        getFullModelRange() {
            const lineCount = this.textBuffer.getLineCount();
            return new range_1.$Ot(1, 1, lineCount, this.textBuffer.getLineLength(lineCount) + 1);
        }
        getValue() {
            const fullRange = this.getFullModelRange();
            return this.textBuffer.getValueInRange(fullRange, model.EndOfLinePreference.LF);
        }
        getComparisonValue() {
            if (this.b !== null) {
                return this.b;
            }
            this.c = (0, hash_1.$tj)([(0, hash_1.$tj)(this.language), (0, hash_1.$tj)(this.getValue()), this.metadata, this.internalMetadata, this.outputs.map(op => ({
                    outputs: op.outputs.map(output => ({
                        mime: output.mime,
                        data: bufferHash(output.data)
                    })),
                    metadata: op.metadata
                }))]);
            return this.c;
        }
        getHashValue() {
            if (this.c !== null) {
                return this.c;
            }
            this.c = (0, hash_1.$tj)([(0, hash_1.$tj)(this.getValue()), this.language, this.metadata, this.internalMetadata]);
            return this.c;
        }
    }
    class MirrorNotebookDocument {
        constructor(uri, cells, metadata) {
            this.uri = uri;
            this.cells = cells;
            this.metadata = metadata;
        }
        acceptModelChanged(event) {
            // note that the cell content change is not applied to the MirrorCell
            // but it's fine as if a cell content is modified after the first diff, its position will not change any more
            // TODO@rebornix, but it might lead to interesting bugs in the future.
            event.rawEvents.forEach(e => {
                if (e.kind === notebookCommon_1.NotebookCellsChangeType.ModelChange) {
                    this._spliceNotebookCells(e.changes);
                }
                else if (e.kind === notebookCommon_1.NotebookCellsChangeType.Move) {
                    const cells = this.cells.splice(e.index, 1);
                    this.cells.splice(e.newIdx, 0, ...cells);
                }
                else if (e.kind === notebookCommon_1.NotebookCellsChangeType.Output) {
                    const cell = this.cells[e.index];
                    cell.outputs = e.outputs;
                }
                else if (e.kind === notebookCommon_1.NotebookCellsChangeType.ChangeCellLanguage) {
                    this.a(e.index);
                    const cell = this.cells[e.index];
                    cell.language = e.language;
                }
                else if (e.kind === notebookCommon_1.NotebookCellsChangeType.ChangeCellMetadata) {
                    this.a(e.index);
                    const cell = this.cells[e.index];
                    cell.metadata = e.metadata;
                }
                else if (e.kind === notebookCommon_1.NotebookCellsChangeType.ChangeCellInternalMetadata) {
                    this.a(e.index);
                    const cell = this.cells[e.index];
                    cell.internalMetadata = e.internalMetadata;
                }
            });
        }
        a(index) {
            if (index < 0 || index >= this.cells.length) {
                throw new Error(`Illegal index ${index}. Cells length: ${this.cells.length}`);
            }
        }
        _spliceNotebookCells(splices) {
            splices.reverse().forEach(splice => {
                const cellDtos = splice[2];
                const newCells = cellDtos.map(cell => {
                    return new MirrorCell(cell.handle, cell.source, cell.language, cell.cellKind, cell.outputs, cell.metadata);
                });
                this.cells.splice(splice[0], splice[1], ...newCells);
            });
        }
    }
    class CellSequence {
        constructor(textModel) {
            this.textModel = textModel;
        }
        getElements() {
            const hashValue = new Int32Array(this.textModel.cells.length);
            for (let i = 0; i < this.textModel.cells.length; i++) {
                hashValue[i] = this.textModel.cells[i].getComparisonValue();
            }
            return hashValue;
        }
        getCellHash(cell) {
            const source = Array.isArray(cell.source) ? cell.source.join('\n') : cell.source;
            const hashVal = (0, hash_1.$tj)([(0, hash_1.$tj)(source), cell.metadata]);
            return hashVal;
        }
    }
    class NotebookEditorSimpleWorker {
        constructor() {
            this.a = Object.create(null);
        }
        dispose() {
        }
        acceptNewModel(uri, data) {
            this.a[uri] = new MirrorNotebookDocument(uri_1.URI.parse(uri), data.cells.map(dto => new MirrorCell(dto.handle, dto.source, dto.language, dto.cellKind, dto.outputs, dto.metadata)), data.metadata);
        }
        acceptModelChanged(strURL, event) {
            const model = this.a[strURL];
            model?.acceptModelChanged(event);
        }
        acceptRemovedModel(strURL) {
            if (!this.a[strURL]) {
                return;
            }
            delete this.a[strURL];
        }
        computeDiff(originalUrl, modifiedUrl) {
            const original = this.b(originalUrl);
            const modified = this.b(modifiedUrl);
            const diff = new diff_1.$Ut(new CellSequence(original), new CellSequence(modified));
            const diffResult = diff.ComputeDiff(false);
            /* let cellLineChanges: { originalCellhandle: number, modifiedCellhandle: number, lineChanges: ILineChange[] }[] = [];
    
            diffResult.changes.forEach(change => {
                if (change.modifiedLength === 0) {
                    // deletion ...
                    return;
                }
    
                if (change.originalLength === 0) {
                    // insertion
                    return;
                }
    
                for (let i = 0, len = Math.min(change.modifiedLength, change.originalLength); i < len; i++) {
                    let originalIndex = change.originalStart + i;
                    let modifiedIndex = change.modifiedStart + i;
    
                    const originalCell = original.cells[originalIndex];
                    const modifiedCell = modified.cells[modifiedIndex];
    
                    if (originalCell.getValue() !== modifiedCell.getValue()) {
                        // console.log(`original cell ${originalIndex} content change`);
                        const originalLines = originalCell.textBuffer.getLinesContent();
                        const modifiedLines = modifiedCell.textBuffer.getLinesContent();
                        const diffComputer = new DiffComputer(originalLines, modifiedLines, {
                            shouldComputeCharChanges: true,
                            shouldPostProcessCharChanges: true,
                            shouldIgnoreTrimWhitespace: false,
                            shouldMakePrettyDiff: true,
                            maxComputationTime: 5000
                        });
    
                        const lineChanges = diffComputer.computeDiff().changes;
    
                        cellLineChanges.push({
                            originalCellhandle: originalCell.handle,
                            modifiedCellhandle: modifiedCell.handle,
                            lineChanges
                        });
    
                        // console.log(lineDecorations);
    
                    } else {
                        // console.log(`original cell ${originalIndex} metadata change`);
                    }
    
                }
            });
     */
            return {
                cellsDiff: diffResult,
                // linesDiff: cellLineChanges
            };
        }
        canPromptRecommendation(modelUrl) {
            const model = this.b(modelUrl);
            const cells = model.cells;
            for (let i = 0; i < cells.length; i++) {
                const cell = cells[i];
                if (cell.cellKind === notebookCommon_1.CellKind.Markup) {
                    continue;
                }
                if (cell.language !== 'python') {
                    continue;
                }
                const lineCount = cell.textBuffer.getLineCount();
                const maxLineCount = Math.min(lineCount, 20);
                const range = new range_1.$Ot(1, 1, maxLineCount, cell.textBuffer.getLineLength(maxLineCount) + 1);
                const searchParams = new textModelSearch_1.$kD('import\\s*pandas|from\\s*pandas', true, false, null);
                const searchData = searchParams.parseSearchRequest();
                if (!searchData) {
                    continue;
                }
                const cellMatches = cell.textBuffer.findMatchesLineByLine(range, searchData, true, 1);
                if (cellMatches.length > 0) {
                    return true;
                }
            }
            return false;
        }
        b(uri) {
            return this.a[uri];
        }
    }
    exports.NotebookEditorSimpleWorker = NotebookEditorSimpleWorker;
    /**
     * Called on the worker side
     * @internal
     */
    function create(host) {
        return new NotebookEditorSimpleWorker();
    }
});

}).call(this);
//# sourceMappingURL=notebookSimpleWorker.js.map
