(()=>{"use strict";var e={887:(e,t,n)=>{function r(e,t=!1){const n=e.length;let r=0,c="",s=0,l=16,f=0,u=0,d=0,h=0,g=0;function p(t,n){let o=0,i=0;for(;o<t||!n;){let t=e.charCodeAt(r);if(t>=48&&t<=57)i=16*i+t-48;else if(t>=65&&t<=70)i=16*i+t-65+10;else{if(!(t>=97&&t<=102))break;i=16*i+t-97+10}r++,o++}return o<t&&(i=-1),i}function m(){if(c="",g=0,s=r,u=f,h=d,r>=n)return s=n,l=17;let t=e.charCodeAt(r);if(o(t)){do{r++,c+=String.fromCharCode(t),t=e.charCodeAt(r)}while(o(t));return l=15}if(i(t))return r++,c+=String.fromCharCode(t),13===t&&10===e.charCodeAt(r)&&(r++,c+="\n"),f++,d=r,l=14;switch(t){case 123:return r++,l=1;case 125:return r++,l=2;case 91:return r++,l=3;case 93:return r++,l=4;case 58:return r++,l=6;case 44:return r++,l=5;case 34:return r++,c=function(){let t="",o=r;for(;;){if(r>=n){t+=e.substring(o,r),g=2;break}const a=e.charCodeAt(r);if(34===a){t+=e.substring(o,r),r++;break}if(92!==a){if(a>=0&&a<=31){if(i(a)){t+=e.substring(o,r),g=2;break}g=6}r++}else{if(t+=e.substring(o,r),r++,r>=n){g=2;break}switch(e.charCodeAt(r++)){case 34:t+='"';break;case 92:t+="\\";break;case 47:t+="/";break;case 98:t+="\b";break;case 102:t+="\f";break;case 110:t+="\n";break;case 114:t+="\r";break;case 116:t+="\t";break;case 117:const e=p(4,!0);e>=0?t+=String.fromCharCode(e):g=4;break;default:g=5}o=r}}return t}(),l=10;case 47:const o=r-1;if(47===e.charCodeAt(r+1)){for(r+=2;r<n&&!i(e.charCodeAt(r));)r++;return c=e.substring(o,r),l=12}if(42===e.charCodeAt(r+1)){r+=2;const t=n-1;let a=!1;for(;r<t;){const t=e.charCodeAt(r);if(42===t&&47===e.charCodeAt(r+1)){r+=2,a=!0;break}r++,i(t)&&(13===t&&10===e.charCodeAt(r)&&r++,f++,d=r)}return a||(r++,g=1),c=e.substring(o,r),l=13}return c+=String.fromCharCode(t),r++,l=16;case 45:if(c+=String.fromCharCode(t),r++,r===n||!a(e.charCodeAt(r)))return l=16;case 48:case 49:case 50:case 51:case 52:case 53:case 54:case 55:case 56:case 57:return c+=function(){let t=r;if(48===e.charCodeAt(r))r++;else for(r++;r<e.length&&a(e.charCodeAt(r));)r++;if(r<e.length&&46===e.charCodeAt(r)){if(r++,!(r<e.length&&a(e.charCodeAt(r))))return g=3,e.substring(t,r);for(r++;r<e.length&&a(e.charCodeAt(r));)r++}let n=r;if(r<e.length&&(69===e.charCodeAt(r)||101===e.charCodeAt(r)))if(r++,(r<e.length&&43===e.charCodeAt(r)||45===e.charCodeAt(r))&&r++,r<e.length&&a(e.charCodeAt(r))){for(r++;r<e.length&&a(e.charCodeAt(r));)r++;n=r}else g=3;return e.substring(t,n)}(),l=11;default:for(;r<n&&k(t);)r++,t=e.charCodeAt(r);if(s!==r){switch(c=e.substring(s,r),c){case"true":return l=8;case"false":return l=9;case"null":return l=7}return l=16}return c+=String.fromCharCode(t),r++,l=16}}function k(e){if(o(e)||i(e))return!1;switch(e){case 125:case 93:case 123:case 91:case 34:case 58:case 44:case 47:return!1}return!0}return{setPosition:function(e){r=e,c="",s=0,l=16,g=0},getPosition:()=>r,scan:t?function(){let e;do{e=m()}while(e>=12&&e<=15);return e}:m,getToken:()=>l,getTokenValue:()=>c,getTokenOffset:()=>s,getTokenLength:()=>r-s,getTokenStartLine:()=>u,getTokenStartCharacter:()=>s-h,getTokenError:()=>g}}function o(e){return 32===e||9===e}function i(e){return 10===e||13===e}function a(e){return e>=48&&e<=57}var c,s;function l(e,t,n){let o,i,a,c,s;if(t){for(c=t.offset,s=c+t.length,a=c;a>0&&!u(e,a-1);)a--;let r=s;for(;r<e.length&&!u(e,r);)r++;i=e.substring(a,r),o=function(e,t){let n=0,r=0;const o=t.tabSize||4;for(;n<e.length;){let t=e.charAt(n);if(" "===t)r++;else{if("\t"!==t)break;r+=o}n++}return Math.floor(r/o)}(i,n)}else i=e,o=0,a=0,c=0,s=e.length;const l=function(e,t){for(let e=0;e<t.length;e++){const n=t.charAt(e);if("\r"===n)return e+1<t.length&&"\n"===t.charAt(e+1)?"\r\n":"\r";if("\n"===n)return"\n"}return e&&e.eol||"\n"}(n,e);let d,h=0,g=0;d=n.insertSpaces?f(" ",n.tabSize||4):"\t";let p=r(i,!1),m=!1;function k(){return h>1?f(l,h)+f(d,o+g):l+f(d,o+g)}function b(){let e=p.scan();for(h=0;15===e||14===e;)14===e&&n.keepLines?h+=1:14===e&&(h=1),e=p.scan();return m=16===e||0!==p.getTokenError(),e}const v=[];function y(n,r,o){m||t&&!(r<s&&o>c)||e.substring(r,o)===n||v.push({offset:r,length:o-r,content:n})}let C=b();if(n.keepLines&&h>0&&y(f(l,h),0,0),17!==C){let e=p.getTokenOffset()+a;y(f(d,o),a,e)}for(;17!==C;){let e=p.getTokenOffset()+p.getTokenLength()+a,t=b(),r="",o=!1;for(;0===h&&(12===t||13===t);)y(" ",e,p.getTokenOffset()+a),e=p.getTokenOffset()+p.getTokenLength()+a,o=12===t,r=o?k():"",t=b();if(2===t)1!==C&&g--,n.keepLines&&h>0||!n.keepLines&&1!==C?r=k():n.keepLines&&(r=" ");else if(4===t)3!==C&&g--,n.keepLines&&h>0||!n.keepLines&&3!==C?r=k():n.keepLines&&(r=" ");else{switch(C){case 3:case 1:g++,r=n.keepLines&&h>0||!n.keepLines?k():" ";break;case 5:r=n.keepLines&&h>0||!n.keepLines?k():" ";break;case 12:r=k();break;case 13:h>0?r=k():o||(r=" ");break;case 6:n.keepLines&&h>0?r=k():o||(r=" ");break;case 10:n.keepLines&&h>0?r=k():6!==t||o||(r="");break;case 7:case 8:case 9:case 11:case 2:case 4:n.keepLines&&h>0?r=k():12!==t&&13!==t||o?5!==t&&17!==t&&(m=!0):r=" ";break;case 16:m=!0}h>0&&(12===t||13===t)&&(r=k())}17===t&&(r=n.keepLines&&h>0?k():n.insertFinalNewline?l:""),y(r,e,p.getTokenOffset()+a),C=t}return v}function f(e,t){let n="";for(let r=0;r<t;r++)n+=e;return n}function u(e,t){return-1!=="\r\n".indexOf(e.charAt(t))}function d(e,t=[],n=s.DEFAULT){let r={type:"array",offset:-1,length:-1,children:[],parent:void 0};function o(e){"property"===r.type&&(r.length=e-r.offset,r=r.parent)}function i(e){return r.children.push(e),e}g(e,{onObjectBegin:e=>{r=i({type:"object",offset:e,length:-1,parent:r,children:[]})},onObjectProperty:(e,t,n)=>{r=i({type:"property",offset:t,length:-1,parent:r,children:[]}),r.children.push({type:"string",value:e,offset:t,length:n,parent:r})},onObjectEnd:(e,t)=>{o(e+t),r.length=e+t-r.offset,r=r.parent,o(e+t)},onArrayBegin:(e,t)=>{r=i({type:"array",offset:e,length:-1,parent:r,children:[]})},onArrayEnd:(e,t)=>{r.length=e+t-r.offset,r=r.parent,o(e+t)},onLiteralValue:(e,t,n)=>{i({type:p(e),offset:t,length:n,parent:r,value:e}),o(t+n)},onSeparator:(e,t,n)=>{"property"===r.type&&(":"===e?r.colonOffset=t:","===e&&o(t))},onError:(e,n,r)=>{t.push({error:e,offset:n,length:r})}},n);const a=r.children[0];return a&&delete a.parent,a}function h(e,t){if(!e)return;let n=e;for(let e of t)if("string"==typeof e){if("object"!==n.type||!Array.isArray(n.children))return;let t=!1;for(const r of n.children)if(Array.isArray(r.children)&&r.children[0].value===e&&2===r.children.length){n=r.children[1],t=!0;break}if(!t)return}else{const t=e;if("array"!==n.type||t<0||!Array.isArray(n.children)||t>=n.children.length)return;n=n.children[t]}return n}function g(e,t,n=s.DEFAULT){const o=r(e,!1),i=[];function a(e){return e?()=>e(o.getTokenOffset(),o.getTokenLength(),o.getTokenStartLine(),o.getTokenStartCharacter()):()=>!0}function c(e){return e?()=>e(o.getTokenOffset(),o.getTokenLength(),o.getTokenStartLine(),o.getTokenStartCharacter(),(()=>i.slice())):()=>!0}function l(e){return e?t=>e(t,o.getTokenOffset(),o.getTokenLength(),o.getTokenStartLine(),o.getTokenStartCharacter()):()=>!0}function f(e){return e?t=>e(t,o.getTokenOffset(),o.getTokenLength(),o.getTokenStartLine(),o.getTokenStartCharacter(),(()=>i.slice())):()=>!0}const u=c(t.onObjectBegin),d=f(t.onObjectProperty),h=a(t.onObjectEnd),g=c(t.onArrayBegin),p=a(t.onArrayEnd),m=f(t.onLiteralValue),k=l(t.onSeparator),b=a(t.onComment),v=l(t.onError),y=n&&n.disallowComments,C=n&&n.allowTrailingComma;function T(){for(;;){const e=o.scan();switch(o.getTokenError()){case 4:E(14);break;case 5:E(15);break;case 3:E(13);break;case 1:y||E(11);break;case 2:E(12);break;case 6:E(16)}switch(e){case 12:case 13:y?E(10):b();break;case 16:E(1);break;case 15:case 14:break;default:return e}}}function E(e,t=[],n=[]){if(v(e),t.length+n.length>0){let e=o.getToken();for(;17!==e;){if(-1!==t.indexOf(e)){T();break}if(-1!==n.indexOf(e))break;e=T()}}}function O(e){const t=o.getTokenValue();return e?m(t):(d(t),i.push(t)),T(),!0}return T(),17===o.getToken()?!!n.allowEmptyContent||(E(4,[],[]),!1):function e(){switch(o.getToken()){case 3:return function(){g(),T();let t=!0,n=!1;for(;4!==o.getToken()&&17!==o.getToken();){if(5===o.getToken()){if(n||E(4,[],[]),k(","),T(),4===o.getToken()&&C)break}else n&&E(6,[],[]);t?(i.push(0),t=!1):i[i.length-1]++,e()||E(4,[],[4,5]),n=!0}return p(),t||i.pop(),4!==o.getToken()?E(8,[4],[]):T(),!0}();case 1:return function(){u(),T();let t=!1;for(;2!==o.getToken()&&17!==o.getToken();){if(5===o.getToken()){if(t||E(4,[],[]),k(","),T(),2===o.getToken()&&C)break}else t&&E(6,[],[]);(10!==o.getToken()?(E(3,[],[2,5]),0):(O(!1),6===o.getToken()?(k(":"),T(),e()||E(4,[],[2,5])):E(5,[],[2,5]),i.pop(),1))||E(4,[],[2,5]),t=!0}return h(),2!==o.getToken()?E(7,[2],[]):T(),!0}();case 10:return O(!0);default:return function(){switch(o.getToken()){case 11:const e=o.getTokenValue();let t=Number(e);isNaN(t)&&(E(2),t=0),m(t);break;case 7:m(null);break;case 8:m(!0);break;case 9:m(!1);break;default:return!1}return T(),!0}()}}()?(17!==o.getToken()&&E(9,[],[]),!0):(E(4,[],[]),!1)}function p(e){switch(typeof e){case"boolean":return"boolean";case"number":return"number";case"string":return"string";case"object":return e?Array.isArray(e)?"array":"object":"null";default:return"null"}}function m(e,t,n){if(!n.formattingOptions)return[t];let r=k(e,t),o=t.offset,i=t.offset+t.content.length;if(0===t.length||0===t.content.length){for(;o>0&&!u(r,o-1);)o--;for(;i<r.length&&!u(r,i);)i++}const a=l(r,{offset:o,length:i-o},{...n.formattingOptions,keepLines:!1});for(let e=a.length-1;e>=0;e--){const t=a[e];r=k(r,t),o=Math.min(o,t.offset),i=Math.max(i,t.offset+t.length),i+=t.content.length-t.length}return[{offset:o,length:e.length-(r.length-i)-o,content:r.substring(o,i)}]}function k(e,t){return e.substring(0,t.offset)+t.content+e.substring(t.offset+t.length)}n.r(t),n.d(t,{ParseErrorCode:()=>I,ScanError:()=>v,SyntaxKind:()=>y,applyEdits:()=>P,createScanner:()=>b,findNodeAtLocation:()=>O,findNodeAtOffset:()=>A,format:()=>B,getLocation:()=>C,getNodePath:()=>w,getNodeValue:()=>x,modify:()=>j,parse:()=>T,parseTree:()=>E,printParseErrorCode:()=>N,stripComments:()=>L,visit:()=>S}),function(e){e[e.lineFeed=10]="lineFeed",e[e.carriageReturn=13]="carriageReturn",e[e.space=32]="space",e[e._0=48]="_0",e[e._1=49]="_1",e[e._2=50]="_2",e[e._3=51]="_3",e[e._4=52]="_4",e[e._5=53]="_5",e[e._6=54]="_6",e[e._7=55]="_7",e[e._8=56]="_8",e[e._9=57]="_9",e[e.a=97]="a",e[e.b=98]="b",e[e.c=99]="c",e[e.d=100]="d",e[e.e=101]="e",e[e.f=102]="f",e[e.g=103]="g",e[e.h=104]="h",e[e.i=105]="i",e[e.j=106]="j",e[e.k=107]="k",e[e.l=108]="l",e[e.m=109]="m",e[e.n=110]="n",e[e.o=111]="o",e[e.p=112]="p",e[e.q=113]="q",e[e.r=114]="r",e[e.s=115]="s",e[e.t=116]="t",e[e.u=117]="u",e[e.v=118]="v",e[e.w=119]="w",e[e.x=120]="x",e[e.y=121]="y",e[e.z=122]="z",e[e.A=65]="A",e[e.B=66]="B",e[e.C=67]="C",e[e.D=68]="D",e[e.E=69]="E",e[e.F=70]="F",e[e.G=71]="G",e[e.H=72]="H",e[e.I=73]="I",e[e.J=74]="J",e[e.K=75]="K",e[e.L=76]="L",e[e.M=77]="M",e[e.N=78]="N",e[e.O=79]="O",e[e.P=80]="P",e[e.Q=81]="Q",e[e.R=82]="R",e[e.S=83]="S",e[e.T=84]="T",e[e.U=85]="U",e[e.V=86]="V",e[e.W=87]="W",e[e.X=88]="X",e[e.Y=89]="Y",e[e.Z=90]="Z",e[e.asterisk=42]="asterisk",e[e.backslash=92]="backslash",e[e.closeBrace=125]="closeBrace",e[e.closeBracket=93]="closeBracket",e[e.colon=58]="colon",e[e.comma=44]="comma",e[e.dot=46]="dot",e[e.doubleQuote=34]="doubleQuote",e[e.minus=45]="minus",e[e.openBrace=123]="openBrace",e[e.openBracket=91]="openBracket",e[e.plus=43]="plus",e[e.slash=47]="slash",e[e.formFeed=12]="formFeed",e[e.tab=9]="tab"}(c||(c={})),function(e){e.DEFAULT={allowTrailingComma:!1}}(s||(s={}));const b=r;var v,y;!function(e){e[e.None=0]="None",e[e.UnexpectedEndOfComment=1]="UnexpectedEndOfComment",e[e.UnexpectedEndOfString=2]="UnexpectedEndOfString",e[e.UnexpectedEndOfNumber=3]="UnexpectedEndOfNumber",e[e.InvalidUnicode=4]="InvalidUnicode",e[e.InvalidEscapeCharacter=5]="InvalidEscapeCharacter",e[e.InvalidCharacter=6]="InvalidCharacter"}(v||(v={})),function(e){e[e.OpenBraceToken=1]="OpenBraceToken",e[e.CloseBraceToken=2]="CloseBraceToken",e[e.OpenBracketToken=3]="OpenBracketToken",e[e.CloseBracketToken=4]="CloseBracketToken",e[e.CommaToken=5]="CommaToken",e[e.ColonToken=6]="ColonToken",e[e.NullKeyword=7]="NullKeyword",e[e.TrueKeyword=8]="TrueKeyword",e[e.FalseKeyword=9]="FalseKeyword",e[e.StringLiteral=10]="StringLiteral",e[e.NumericLiteral=11]="NumericLiteral",e[e.LineCommentTrivia=12]="LineCommentTrivia",e[e.BlockCommentTrivia=13]="BlockCommentTrivia",e[e.LineBreakTrivia=14]="LineBreakTrivia",e[e.Trivia=15]="Trivia",e[e.Unknown=16]="Unknown",e[e.EOF=17]="EOF"}(y||(y={}));const C=function(e,t){const n=[],r=new Object;let o;const i={value:{},offset:0,length:0,type:"object",parent:void 0};let a=!1;function c(e,t,n,r){i.value=e,i.offset=t,i.length=n,i.type=r,i.colonOffset=void 0,o=i}try{g(e,{onObjectBegin:(e,i)=>{if(t<=e)throw r;o=void 0,a=t>e,n.push("")},onObjectProperty:(e,o,i)=>{if(t<o)throw r;if(c(e,o,i,"property"),n[n.length-1]=e,t<=o+i)throw r},onObjectEnd:(e,i)=>{if(t<=e)throw r;o=void 0,n.pop()},onArrayBegin:(e,i)=>{if(t<=e)throw r;o=void 0,n.push(0)},onArrayEnd:(e,i)=>{if(t<=e)throw r;o=void 0,n.pop()},onLiteralValue:(e,n,o)=>{if(t<n)throw r;if(c(e,n,o,p(e)),t<=n+o)throw r},onSeparator:(e,i,c)=>{if(t<=i)throw r;if(":"===e&&o&&"property"===o.type)o.colonOffset=i,a=!1,o=void 0;else if(","===e){const e=n[n.length-1];"number"==typeof e?n[n.length-1]=e+1:(a=!0,n[n.length-1]=""),o=void 0}}})}catch(e){if(e!==r)throw e}return{path:n,previousNode:o,isAtPropertyKey:a,matches:e=>{let t=0;for(let r=0;t<e.length&&r<n.length;r++)if(e[t]===n[r]||"*"===e[t])t++;else if("**"!==e[t])return!1;return t===e.length}}},T=function(e,t=[],n=s.DEFAULT){let r=null,o=[];const i=[];function a(e){Array.isArray(o)?o.push(e):null!==r&&(o[r]=e)}return g(e,{onObjectBegin:()=>{const e={};a(e),i.push(o),o=e,r=null},onObjectProperty:e=>{r=e},onObjectEnd:()=>{o=i.pop()},onArrayBegin:()=>{const e=[];a(e),i.push(o),o=e,r=null},onArrayEnd:()=>{o=i.pop()},onLiteralValue:a,onError:(e,n,r)=>{t.push({error:e,offset:n,length:r})}},n),o[0]},E=d,O=h,A=function e(t,n,r=!1){if(function(e,t,n=!1){return t>=e.offset&&t<e.offset+e.length||n&&t===e.offset+e.length}(t,n,r)){const o=t.children;if(Array.isArray(o))for(let t=0;t<o.length&&o[t].offset<=n;t++){const i=e(o[t],n,r);if(i)return i}return t}},w=function e(t){if(!t.parent||!t.parent.children)return[];const n=e(t.parent);if("property"===t.parent.type){const e=t.parent.children[0].value;n.push(e)}else if("array"===t.parent.type){const e=t.parent.children.indexOf(t);-1!==e&&n.push(e)}return n},x=function e(t){switch(t.type){case"array":return t.children.map(e);case"object":const n=Object.create(null);for(let r of t.children){const t=r.children[1];t&&(n[r.children[0].value]=e(t))}return n;case"null":case"string":case"number":case"boolean":return t.value;default:return}},S=g,L=function(e,t){let n,o,i=r(e),a=[],c=0;do{switch(o=i.getPosition(),n=i.scan(),n){case 12:case 13:case 17:c!==o&&a.push(e.substring(c,o)),void 0!==t&&a.push(i.getTokenValue().replace(/[^\r\n]/g,t)),c=i.getPosition()}}while(17!==n);return a.join("")};var I;function N(e){switch(e){case 1:return"InvalidSymbol";case 2:return"InvalidNumberFormat";case 3:return"PropertyNameExpected";case 4:return"ValueExpected";case 5:return"ColonExpected";case 6:return"CommaExpected";case 7:return"CloseBraceExpected";case 8:return"CloseBracketExpected";case 9:return"EndOfFileExpected";case 10:return"InvalidCommentToken";case 11:return"UnexpectedEndOfComment";case 12:return"UnexpectedEndOfString";case 13:return"UnexpectedEndOfNumber";case 14:return"InvalidUnicode";case 15:return"InvalidEscapeCharacter";case 16:return"InvalidCharacter"}return"<unknown ParseErrorCode>"}function B(e,t,n){return l(e,t,n)}function j(e,t,n,r){return function(e,t,n,r){const o=t.slice(),i=d(e,[]);let a,c;for(;o.length>0&&(c=o.pop(),a=h(i,o),void 0===a&&void 0!==n);)n="string"==typeof c?{[c]:n}:[n];if(a){if("object"===a.type&&"string"==typeof c&&Array.isArray(a.children)){const t=h(a,[c]);if(void 0!==t){if(void 0===n){if(!t.parent)throw new Error("Malformed AST");const n=a.children.indexOf(t.parent);let o,i=t.parent.offset+t.parent.length;if(n>0){let e=a.children[n-1];o=e.offset+e.length}else o=a.offset+1,a.children.length>1&&(i=a.children[1].offset);return m(e,{offset:o,length:i-o,content:""},r)}return m(e,{offset:t.offset,length:t.length,content:JSON.stringify(n)},r)}{if(void 0===n)return[];const t=`${JSON.stringify(c)}: ${JSON.stringify(n)}`,o=r.getInsertionIndex?r.getInsertionIndex(a.children.map((e=>e.children[0].value))):a.children.length;let i;if(o>0){let e=a.children[o-1];i={offset:e.offset+e.length,length:0,content:","+t}}else i=0===a.children.length?{offset:a.offset+1,length:0,content:t}:{offset:a.offset+1,length:0,content:t+","};return m(e,i,r)}}if("array"===a.type&&"number"==typeof c&&Array.isArray(a.children)){const t=c;if(-1===t){const t=`${JSON.stringify(n)}`;let o;if(0===a.children.length)o={offset:a.offset+1,length:0,content:t};else{const e=a.children[a.children.length-1];o={offset:e.offset+e.length,length:0,content:","+t}}return m(e,o,r)}if(void 0===n&&a.children.length>=0){const t=c,n=a.children[t];let o;if(1===a.children.length)o={offset:a.offset+1,length:a.length-2,content:""};else if(a.children.length-1===t){let e=a.children[t-1],n=e.offset+e.length;o={offset:n,length:a.offset+a.length-2-n,content:""}}else o={offset:n.offset,length:a.children[t+1].offset-n.offset,content:""};return m(e,o,r)}if(void 0!==n){let t;const o=`${JSON.stringify(n)}`;if(!r.isArrayInsertion&&a.children.length>c){const e=a.children[c];t={offset:e.offset,length:e.length,content:o}}else if(0===a.children.length||0===c)t={offset:a.offset+1,length:0,content:0===a.children.length?o:o+","};else{const e=c>a.children.length?a.children.length:c,n=a.children[e-1];t={offset:n.offset+n.length,length:0,content:","+o}}return m(e,t,r)}throw new Error(`Can not ${void 0===n?"remove":r.isArrayInsertion?"insert":"modify"} Array index ${t} as length is not sufficient`)}throw new Error(`Can not add ${"number"!=typeof c?"index":"property"} to parent of type ${a.type}`)}if(void 0===n)throw new Error("Can not delete in empty document");return m(e,{offset:i?i.offset:0,length:i?i.length:0,content:JSON.stringify(n)},r)}(e,t,n,r)}function P(e,t){let n=t.slice(0).sort(((e,t)=>{const n=e.offset-t.offset;return 0===n?e.length-t.length:n})),r=e.length;for(let t=n.length-1;t>=0;t--){let o=n[t];if(!(o.offset+o.length<=r))throw new Error("Overlapping edit");e=k(e,o),r=o.offset}return e}!function(e){e[e.InvalidSymbol=1]="InvalidSymbol",e[e.InvalidNumberFormat=2]="InvalidNumberFormat",e[e.PropertyNameExpected=3]="PropertyNameExpected",e[e.ValueExpected=4]="ValueExpected",e[e.ColonExpected=5]="ColonExpected",e[e.CommaExpected=6]="CommaExpected",e[e.CloseBraceExpected=7]="CloseBraceExpected",e[e.CloseBracketExpected=8]="CloseBracketExpected",e[e.EndOfFileExpected=9]="EndOfFileExpected",e[e.InvalidCommentToken=10]="InvalidCommentToken",e[e.UnexpectedEndOfComment=11]="UnexpectedEndOfComment",e[e.UnexpectedEndOfString=12]="UnexpectedEndOfString",e[e.UnexpectedEndOfNumber=13]="UnexpectedEndOfNumber",e[e.InvalidUnicode=14]="InvalidUnicode",e[e.InvalidEscapeCharacter=15]="InvalidEscapeCharacter",e[e.InvalidCharacter=16]="InvalidCharacter"}(I||(I={}))},712:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.redundantImplicitActivationEvent=t.implicitActivationEvent=void 0;const r=n(398);t.implicitActivationEvent=r.l10n.t("This activation event cannot be explicitly listed by your extension."),t.redundantImplicitActivationEvent=r.l10n.t("This activation event can be removed as VS Code generates these automatically from your package.json contribution declarations.")},972:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.PackageDocument=void 0;const r=n(398),o=n(887),i=n(712);t.PackageDocument=class{constructor(e){this.document=e}provideCompletionItems(e,t){const n=(0,o.getLocation)(this.document.getText(),this.document.offsetAt(e));if(n.path.length>=2&&"configurationDefaults"===n.path[1])return this.provideLanguageOverridesCompletionItems(n,e)}provideCodeActions(e,t,n){const o=[];for(const e of t.diagnostics)if(e.message===i.implicitActivationEvent||e.message===i.redundantImplicitActivationEvent){const t=new r.CodeAction(r.l10n.t("Remove activation event"),r.CodeActionKind.QuickFix);t.edit=new r.WorkspaceEdit;const n=e.range.with(e.range.end,e.range.end.translate(0,1));","===this.document.getText(n)?t.edit.delete(this.document.uri,e.range.with(void 0,e.range.end.translate(0,1))):t.edit.delete(this.document.uri,e.range),o.push(t)}return o}provideLanguageOverridesCompletionItems(e,t){let n=this.getReplaceRange(e,t);const o=this.document.getText(n);if(2===e.path.length){let e='"[${1:language}]": {\n\t"$0"\n}';return o&&o.startsWith('"')&&(n=new r.Range(new r.Position(n.start.line,n.start.character+1),n.end),e=e.substring(1)),Promise.resolve([this.newSnippetCompletionItem({label:r.l10n.t("Language specific editor settings"),documentation:r.l10n.t("Override editor settings for language"),snippet:e,range:n})])}return 3===e.path.length&&e.previousNode&&"string"==typeof e.previousNode.value&&e.previousNode.value.startsWith("[")?(n=new r.Range(new r.Position(n.start.line,n.start.character+2),n.end),r.languages.getLanguages().then((e=>e.map((e=>this.newSimpleCompletionItem(e,n,"",e+']"')))))):Promise.resolve([])}getReplaceRange(e,t){const n=e.previousNode;if(n){const e=this.document.positionAt(n.offset),o=this.document.positionAt(n.offset+n.length);if(e.isBeforeOrEqual(t)&&o.isAfterOrEqual(t))return new r.Range(e,o)}return new r.Range(t,t)}newSimpleCompletionItem(e,t,n,o){const i=new r.CompletionItem(e);return i.kind=r.CompletionItemKind.Value,i.detail=n,i.insertText=o||e,i.range=t,i}newSnippetCompletionItem(e){const t=new r.CompletionItem(e.label);return t.kind=r.CompletionItemKind.Value,t.documentation=e.documentation,t.insertText=new r.SnippetString(e.snippet),t.range=e.range,t}}},398:e=>{e.exports=require("vscode")}},t={};function n(r){var o=t[r];if(void 0!==o)return o.exports;var i=t[r]={exports:{}};return e[r](i,i.exports,n),i.exports}n.d=(e,t)=>{for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var r={};(()=>{var e=r;Object.defineProperty(e,"__esModule",{value:!0}),e.activate=function(e){e.subscriptions.push(t.languages.registerCompletionItemProvider({language:"json",pattern:"**/package.json"},{provideCompletionItems:(e,t,n)=>new o.PackageDocument(e).provideCompletionItems(t,n)}))};const t=n(398),o=n(972)})();var o=exports;for(var i in r)o[i]=r[i];r.__esModule&&Object.defineProperty(o,"__esModule",{value:!0})})();
//# sourceMappingURL=https://main.vscode-cdn.net/sourcemaps/b1c0a14de1414fcdaa400695b4db1c0799bc3124/extensions/extension-editing/dist/browser/extensionEditingBrowserMain.js.map