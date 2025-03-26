(function() {
var __m = ["vs/code/browser/workbench/workbench","require","exports","vs/workbench/workbench.web.main","vs/base/common/uri"];
var __M = function(deps) {
  var result = [];
  for (var i = 0, len = deps.length; i < len; i++) {
    result[i] = __m[deps[i]];
  }
  return result;
};
define(__m[0/*vs/code/browser/workbench/workbench*/], __M([1/*require*/,2/*exports*/,3/*vs/workbench/workbench.web.main*/,4/*vs/base/common/uri*/]), function (require, exports, workbench_web_main_1, uri_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    (async function () {
        // create workbench
        let config = {};
        if (window.product) {
            config = window.product;
        }
        else {
            const result = await fetch("product.json");
            config = await result.json();
        }
        if (Array.isArray(config.additionalBuiltinExtensions)) {
            const tempConfig = { ...config };
            tempConfig.additionalBuiltinExtensions =
                config.additionalBuiltinExtensions.map((ext) => uri_1.URI.revive(ext));
            config = tempConfig;
        }
        let workspace;
        if (config.folderUri) {
            workspace = { folderUri: uri_1.URI.revive(config.folderUri) };
        }
        else if (config.workspaceUri) {
            workspace = { workspaceUri: uri_1.URI.revive(config.workspaceUri) };
        }
        else {
            workspace = undefined;
        }
        if (workspace) {
            const workspaceProvider = {
                workspace,
                open: async (workspace, options) => true,
                trusted: true,
            };
            config = { ...config, workspaceProvider };
        }
        const domElement = !!config.domElementId
            && document.getElementById(config.domElementId)
            || document.body;
        (0, workbench_web_main_1.create)(domElement, config);
    })();
});

}).call(this);
//# sourceMappingURL=workbench.js.map
