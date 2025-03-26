!function(e,t){for(var i in t)e[i]=t[i]}(exports,function(e){var t={};function i(r){if(t[r])return t[r].exports;var n=t[r]={i:r,l:!1,exports:{}};return e[r].call(n.exports,n,n.exports,i),n.l=!0,n.exports}return i.m=e,i.c=t,i.d=function(e,t,r){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(i.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)i.d(r,n,function(t){return e[t]}.bind(null,n));return r},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="",i(i.s=1)}([function(e,t){e.exports=require("vscode")},function(e,t,i){"use strict";var r=this&&this.__awaiter||function(e,t,i,r){return new(i||(i=Promise))((function(n,s){function o(e){try{l(r.next(e))}catch(e){s(e)}}function a(e){try{l(r.throw(e))}catch(e){s(e)}}function l(e){var t;e.done?n(e.value):(t=e.value,t instanceof i?t:new i((function(e){e(t)}))).then(o,a)}l((r=r.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0}),t.activate=void 0;const n=i(0),s=i(2);function o(e,t){t.clear()}t.activate=function(e){if("object"==typeof navigator){(function(e){const t=new s.MemFS;return e.subscriptions.push(t),t})(e).seed(),function(e){const t=n.languages.createDiagnosticCollection("test");n.window.activeTextEditor&&o(n.window.activeTextEditor.document,t);e.subscriptions.push(n.window.onDidChangeActiveTextEditor(e=>{e&&o(e.document,t)}))}(e),function(){class e{constructor(e){this.workspaceRoot=e}provideTasks(){return r(this,void 0,void 0,(function*(){return this.getTasks()}))}resolveTask(e){if(e.definition.flavor){const t=e.definition;return this.getTask(t.flavor,t.flags?t.flags:[],t)}}getTasks(){if(void 0!==this.tasks)return this.tasks;const e=[["watch","incremental"],["incremental"],[]];return this.tasks=[],["32","64"].forEach(t=>{e.forEach(e=>{this.tasks.push(this.getTask(t,e))})}),this.tasks}getTask(i,s,o){return void 0===o&&(o={type:e.CustomBuildScriptType,flavor:i,flags:s}),new n.Task(o,n.TaskScope.Workspace,`${i} ${s.join(" ")}`,e.CustomBuildScriptType,new n.CustomExecution(()=>r(this,void 0,void 0,(function*(){return new t(this.workspaceRoot,i,s,()=>this.sharedState,e=>this.sharedState=e)}))))}}e.CustomBuildScriptType="custombuildscript";class t{constructor(e,t,i,r,s){this.workspaceRoot=e,this.flags=i,this.getSharedState=r,this.setSharedState=s,this.writeEmitter=new n.EventEmitter,this.onDidWrite=this.writeEmitter.event,this.closeEmitter=new n.EventEmitter,this.onDidClose=this.closeEmitter.event}open(e){if(this.flags.indexOf("watch")>-1){let e=this.workspaceRoot+"/customBuildFile";this.fileWatcher=n.workspace.createFileSystemWatcher(e),this.fileWatcher.onDidChange(()=>this.doBuild()),this.fileWatcher.onDidCreate(()=>this.doBuild()),this.fileWatcher.onDidDelete(()=>this.doBuild())}this.doBuild()}close(){this.fileWatcher&&this.fileWatcher.dispose()}doBuild(){return r(this,void 0,void 0,(function*(){return new Promise(e=>{this.writeEmitter.fire("Starting build...\r\n");let t=this.flags.indexOf("incremental")>-1;t&&(this.getSharedState()?this.writeEmitter.fire("Using last build results: "+this.getSharedState()+"\r\n"):(t=!1,this.writeEmitter.fire("No result from last build. Doing full build.\r\n"))),setTimeout(()=>{const t=new Date;this.setSharedState(t.toTimeString()+" "+t.toDateString()),this.writeEmitter.fire("Build complete.\r\n\r\n"),-1===this.flags.indexOf("watch")&&(this.closeEmitter.fire(),e())},t?1e3:4e3)})}))}}n.tasks.registerTaskProvider(e.CustomBuildScriptType,new e(n.workspace.rootPath))}(),n.commands.executeCommand("vscode.open",n.Uri.parse("memfs:/counter/sample.tact"))}}},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.MemFS=t.Directory=t.File=void 0;const r=i(0),n=i(3);class s{constructor(e,t){this.uri=e,this.type=r.FileType.File,this.ctime=Date.now(),this.mtime=Date.now(),this.size=0,this.name=t}}t.File=s;class o{constructor(e,t){this.uri=e,this.type=r.FileType.Directory,this.ctime=Date.now(),this.mtime=Date.now(),this.size=0,this.name=t,this.entries=new Map}}t.Directory=o;const a=new TextEncoder;class l{constructor(){this.root=new o(r.Uri.parse("memfs:/"),""),this._emitter=new r.EventEmitter,this._bufferedEvents=[],this.onDidChangeFile=this._emitter.event,this._textDecoder=new TextDecoder,this.disposable=r.Disposable.from(r.workspace.registerFileSystemProvider(l.scheme,this,{isCaseSensitive:!0}),r.workspace.registerFileSearchProvider(l.scheme,this),r.workspace.registerTextSearchProvider(l.scheme,this))}dispose(){var e;null===(e=this.disposable)||void 0===e||e.dispose()}seed(){this.createDirectory(r.Uri.parse("memfs:/counter/")),this.writeFile(r.Uri.parse("memfs:/counter/sample.tact"),a.encode(n.tactFile),{create:!0,overwrite:!0})}stat(e){return this._lookup(e,!1)}readDirectory(e){const t=this._lookupAsDirectory(e,!1);let i=[];for(const[e,r]of t.entries)i.push([e,r.type]);return i}readFile(e){const t=this._lookupAsFile(e,!1).data;if(t)return t;throw r.FileSystemError.FileNotFound()}writeFile(e,t,i){let n=this._basename(e.path),a=this._lookupParentDirectory(e),l=a.entries.get(n);if(l instanceof o)throw r.FileSystemError.FileIsADirectory(e);if(!l&&!i.create)throw r.FileSystemError.FileNotFound(e);if(l&&i.create&&!i.overwrite)throw r.FileSystemError.FileExists(e);l||(l=new s(e,n),a.entries.set(n,l),this._fireSoon({type:r.FileChangeType.Created,uri:e})),l.mtime=Date.now(),l.size=t.byteLength,l.data=t,this._fireSoon({type:r.FileChangeType.Changed,uri:e})}rename(e,t,i){if(!i.overwrite&&this._lookup(t,!0))throw r.FileSystemError.FileExists(t);let n=this._lookup(e,!1),s=this._lookupParentDirectory(e),o=this._lookupParentDirectory(t),a=this._basename(t.path);s.entries.delete(n.name),n.name=a,o.entries.set(a,n),this._fireSoon({type:r.FileChangeType.Deleted,uri:e},{type:r.FileChangeType.Created,uri:t})}delete(e){let t=e.with({path:this._dirname(e.path)}),i=this._basename(e.path),n=this._lookupAsDirectory(t,!1);if(!n.entries.has(i))throw r.FileSystemError.FileNotFound(e);n.entries.delete(i),n.mtime=Date.now(),n.size-=1,this._fireSoon({type:r.FileChangeType.Changed,uri:t},{uri:e,type:r.FileChangeType.Deleted})}createDirectory(e){let t=this._basename(e.path),i=e.with({path:this._dirname(e.path)}),n=this._lookupAsDirectory(i,!1),s=new o(e,t);n.entries.set(s.name,s),n.mtime=Date.now(),n.size+=1,this._fireSoon({type:r.FileChangeType.Changed,uri:i},{type:r.FileChangeType.Created,uri:e})}_lookup(e,t){let i=e.path.split("/"),n=this.root;for(const s of i){if(!s)continue;let i;if(n instanceof o&&(i=n.entries.get(s)),!i){if(t)return;throw r.FileSystemError.FileNotFound(e)}n=i}return n}_lookupAsDirectory(e,t){let i=this._lookup(e,t);if(i instanceof o)return i;throw r.FileSystemError.FileNotADirectory(e)}_lookupAsFile(e,t){let i=this._lookup(e,t);if(i instanceof s)return i;throw r.FileSystemError.FileIsADirectory(e)}_lookupParentDirectory(e){const t=e.with({path:this._dirname(e.path)});return this._lookupAsDirectory(t,!1)}watch(e){return new r.Disposable(()=>{})}_fireSoon(...e){this._bufferedEvents.push(...e),this._fireSoonHandle&&clearTimeout(this._fireSoonHandle),this._fireSoonHandle=setTimeout(()=>{this._emitter.fire(this._bufferedEvents),this._bufferedEvents.length=0},5)}_basename(e){return(e=this._rtrim(e,"/"))?e.substr(e.lastIndexOf("/")+1):""}_dirname(e){return(e=this._rtrim(e,"/"))?e.substr(0,e.lastIndexOf("/")):"/"}_rtrim(e,t){if(!e||!t)return e;const i=t.length,r=e.length;if(0===i||0===r)return e;let n=r,s=-1;for(;s=e.lastIndexOf(t,n-1),-1!==s&&s+i===n;){if(0===s)return"";n=s}return e.substring(0,n)}_getFiles(){const e=new Set;return this._doGetFiles(this.root,e),e}_doGetFiles(e,t){e.entries.forEach(e=>{e instanceof s?t.add(e):this._doGetFiles(e,t)})}_convertSimple2RegExpPattern(e){return e.replace(/[\-\\\{\}\+\?\|\^\$\.\,\[\]\(\)\#\s]/g,"\\$&").replace(/[\*]/g,".*")}provideFileSearchResults(e,t,i){return this._findFiles(e.pattern)}_findFiles(e){const t=this._getFiles(),i=[],r=e?new RegExp(this._convertSimple2RegExpPattern(e)):null;for(const e of t)r&&!r.exec(e.name)||i.push(e.uri);return i}provideTextSearchResults(e,t,i,n){const s=this._findFiles(t.includes[0]);if(s)for(const t of s){const n=this._textDecoder.decode(this.readFile(t)).split("\n");for(let s=0;s<n.length;s++){const o=n[s],a=o.indexOf(e.pattern);-1!==a&&i.report({uri:t,ranges:new r.Range(new r.Position(s,a),new r.Position(s,a+e.pattern.length)),preview:{text:o,matches:new r.Range(new r.Position(0,a),new r.Position(0,a+e.pattern.length))}})}}return{limitHit:!1}}}t.MemFS=l,l.scheme="memfs"},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.tactFile=void 0,t.tactFile='import "@stdlib/deploy";\n\nmessage Add {\n    queryId: Int as uint64;\n    amount: Int as uint32;\n}\n\ncontract TactCounter with Deployable {\n    id: Int as uint32;\n    counter: Int as uint32;\n\n    init(id: Int) {\n        self.id = id;\n        self.counter = 0;\n    }\n\n    receive(msg: Add) {\n        self.counter += msg.amount;\n    }\n\n    get fun counter(): Int {\n        return self.counter;\n    }\n\n    get fun id(): Int {\n        return self.id;\n    }\n}\n'}]));
//# sourceMappingURL=extension.js.map