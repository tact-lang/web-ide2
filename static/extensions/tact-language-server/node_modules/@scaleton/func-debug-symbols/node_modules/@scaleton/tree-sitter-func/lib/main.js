"use strict";

const Parser = require('web-tree-sitter');

const loadFunC = async () => {
    return await Parser.Language.load(`${__dirname}/tree-sitter-func.wasm`);
};

exports.__esModule = true;
exports.loadFunC = loadFunC;
