(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function n(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=n(r);fetch(r.href,s)}})();var G_={exports:{}},kc={},W_={exports:{}},Ze={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ul=Symbol.for("react.element"),oM=Symbol.for("react.portal"),aM=Symbol.for("react.fragment"),lM=Symbol.for("react.strict_mode"),uM=Symbol.for("react.profiler"),cM=Symbol.for("react.provider"),fM=Symbol.for("react.context"),dM=Symbol.for("react.forward_ref"),hM=Symbol.for("react.suspense"),pM=Symbol.for("react.memo"),mM=Symbol.for("react.lazy"),wg=Symbol.iterator;function gM(t){return t===null||typeof t!="object"?null:(t=wg&&t[wg]||t["@@iterator"],typeof t=="function"?t:null)}var $_={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},X_=Object.assign,j_={};function Lo(t,e,n){this.props=t,this.context=e,this.refs=j_,this.updater=n||$_}Lo.prototype.isReactComponent={};Lo.prototype.setState=function(t,e){if(typeof t!="object"&&typeof t!="function"&&t!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,t,e,"setState")};Lo.prototype.forceUpdate=function(t){this.updater.enqueueForceUpdate(this,t,"forceUpdate")};function Y_(){}Y_.prototype=Lo.prototype;function Fp(t,e,n){this.props=t,this.context=e,this.refs=j_,this.updater=n||$_}var Op=Fp.prototype=new Y_;Op.constructor=Fp;X_(Op,Lo.prototype);Op.isPureReactComponent=!0;var Tg=Array.isArray,q_=Object.prototype.hasOwnProperty,Bp={current:null},K_={key:!0,ref:!0,__self:!0,__source:!0};function Z_(t,e,n){var i,r={},s=null,o=null;if(e!=null)for(i in e.ref!==void 0&&(o=e.ref),e.key!==void 0&&(s=""+e.key),e)q_.call(e,i)&&!K_.hasOwnProperty(i)&&(r[i]=e[i]);var a=arguments.length-2;if(a===1)r.children=n;else if(1<a){for(var l=Array(a),u=0;u<a;u++)l[u]=arguments[u+2];r.children=l}if(t&&t.defaultProps)for(i in a=t.defaultProps,a)r[i]===void 0&&(r[i]=a[i]);return{$$typeof:ul,type:t,key:s,ref:o,props:r,_owner:Bp.current}}function vM(t,e){return{$$typeof:ul,type:t.type,key:e,ref:t.ref,props:t.props,_owner:t._owner}}function zp(t){return typeof t=="object"&&t!==null&&t.$$typeof===ul}function _M(t){var e={"=":"=0",":":"=2"};return"$"+t.replace(/[=:]/g,function(n){return e[n]})}var Cg=/\/+/g;function gf(t,e){return typeof t=="object"&&t!==null&&t.key!=null?_M(""+t.key):e.toString(36)}function mu(t,e,n,i,r){var s=typeof t;(s==="undefined"||s==="boolean")&&(t=null);var o=!1;if(t===null)o=!0;else switch(s){case"string":case"number":o=!0;break;case"object":switch(t.$$typeof){case ul:case oM:o=!0}}if(o)return o=t,r=r(o),t=i===""?"."+gf(o,0):i,Tg(r)?(n="",t!=null&&(n=t.replace(Cg,"$&/")+"/"),mu(r,e,n,"",function(u){return u})):r!=null&&(zp(r)&&(r=vM(r,n+(!r.key||o&&o.key===r.key?"":(""+r.key).replace(Cg,"$&/")+"/")+t)),e.push(r)),1;if(o=0,i=i===""?".":i+":",Tg(t))for(var a=0;a<t.length;a++){s=t[a];var l=i+gf(s,a);o+=mu(s,e,n,l,r)}else if(l=gM(t),typeof l=="function")for(t=l.call(t),a=0;!(s=t.next()).done;)s=s.value,l=i+gf(s,a++),o+=mu(s,e,n,l,r);else if(s==="object")throw e=String(t),Error("Objects are not valid as a React child (found: "+(e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)+"). If you meant to render a collection of children, use an array instead.");return o}function yl(t,e,n){if(t==null)return t;var i=[],r=0;return mu(t,i,"","",function(s){return e.call(n,s,r++)}),i}function xM(t){if(t._status===-1){var e=t._result;e=e(),e.then(function(n){(t._status===0||t._status===-1)&&(t._status=1,t._result=n)},function(n){(t._status===0||t._status===-1)&&(t._status=2,t._result=n)}),t._status===-1&&(t._status=0,t._result=e)}if(t._status===1)return t._result.default;throw t._result}var dn={current:null},gu={transition:null},yM={ReactCurrentDispatcher:dn,ReactCurrentBatchConfig:gu,ReactCurrentOwner:Bp};function J_(){throw Error("act(...) is not supported in production builds of React.")}Ze.Children={map:yl,forEach:function(t,e,n){yl(t,function(){e.apply(this,arguments)},n)},count:function(t){var e=0;return yl(t,function(){e++}),e},toArray:function(t){return yl(t,function(e){return e})||[]},only:function(t){if(!zp(t))throw Error("React.Children.only expected to receive a single React element child.");return t}};Ze.Component=Lo;Ze.Fragment=aM;Ze.Profiler=uM;Ze.PureComponent=Fp;Ze.StrictMode=lM;Ze.Suspense=hM;Ze.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=yM;Ze.act=J_;Ze.cloneElement=function(t,e,n){if(t==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+t+".");var i=X_({},t.props),r=t.key,s=t.ref,o=t._owner;if(e!=null){if(e.ref!==void 0&&(s=e.ref,o=Bp.current),e.key!==void 0&&(r=""+e.key),t.type&&t.type.defaultProps)var a=t.type.defaultProps;for(l in e)q_.call(e,l)&&!K_.hasOwnProperty(l)&&(i[l]=e[l]===void 0&&a!==void 0?a[l]:e[l])}var l=arguments.length-2;if(l===1)i.children=n;else if(1<l){a=Array(l);for(var u=0;u<l;u++)a[u]=arguments[u+2];i.children=a}return{$$typeof:ul,type:t.type,key:r,ref:s,props:i,_owner:o}};Ze.createContext=function(t){return t={$$typeof:fM,_currentValue:t,_currentValue2:t,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},t.Provider={$$typeof:cM,_context:t},t.Consumer=t};Ze.createElement=Z_;Ze.createFactory=function(t){var e=Z_.bind(null,t);return e.type=t,e};Ze.createRef=function(){return{current:null}};Ze.forwardRef=function(t){return{$$typeof:dM,render:t}};Ze.isValidElement=zp;Ze.lazy=function(t){return{$$typeof:mM,_payload:{_status:-1,_result:t},_init:xM}};Ze.memo=function(t,e){return{$$typeof:pM,type:t,compare:e===void 0?null:e}};Ze.startTransition=function(t){var e=gu.transition;gu.transition={};try{t()}finally{gu.transition=e}};Ze.unstable_act=J_;Ze.useCallback=function(t,e){return dn.current.useCallback(t,e)};Ze.useContext=function(t){return dn.current.useContext(t)};Ze.useDebugValue=function(){};Ze.useDeferredValue=function(t){return dn.current.useDeferredValue(t)};Ze.useEffect=function(t,e){return dn.current.useEffect(t,e)};Ze.useId=function(){return dn.current.useId()};Ze.useImperativeHandle=function(t,e,n){return dn.current.useImperativeHandle(t,e,n)};Ze.useInsertionEffect=function(t,e){return dn.current.useInsertionEffect(t,e)};Ze.useLayoutEffect=function(t,e){return dn.current.useLayoutEffect(t,e)};Ze.useMemo=function(t,e){return dn.current.useMemo(t,e)};Ze.useReducer=function(t,e,n){return dn.current.useReducer(t,e,n)};Ze.useRef=function(t){return dn.current.useRef(t)};Ze.useState=function(t){return dn.current.useState(t)};Ze.useSyncExternalStore=function(t,e,n){return dn.current.useSyncExternalStore(t,e,n)};Ze.useTransition=function(){return dn.current.useTransition()};Ze.version="18.3.1";W_.exports=Ze;var ke=W_.exports;/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var SM=ke,MM=Symbol.for("react.element"),EM=Symbol.for("react.fragment"),wM=Object.prototype.hasOwnProperty,TM=SM.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,CM={key:!0,ref:!0,__self:!0,__source:!0};function Q_(t,e,n){var i,r={},s=null,o=null;n!==void 0&&(s=""+n),e.key!==void 0&&(s=""+e.key),e.ref!==void 0&&(o=e.ref);for(i in e)wM.call(e,i)&&!CM.hasOwnProperty(i)&&(r[i]=e[i]);if(t&&t.defaultProps)for(i in e=t.defaultProps,e)r[i]===void 0&&(r[i]=e[i]);return{$$typeof:MM,type:t,key:s,ref:o,props:r,_owner:TM.current}}kc.Fragment=EM;kc.jsx=Q_;kc.jsxs=Q_;G_.exports=kc;var X=G_.exports,ex={exports:{}},Vn={},tx={exports:{}},nx={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(t){function e(D,J){var ee=D.length;D.push(J);e:for(;0<ee;){var re=ee-1>>>1,Pe=D[re];if(0<r(Pe,J))D[re]=J,D[ee]=Pe,ee=re;else break e}}function n(D){return D.length===0?null:D[0]}function i(D){if(D.length===0)return null;var J=D[0],ee=D.pop();if(ee!==J){D[0]=ee;e:for(var re=0,Pe=D.length,Ge=Pe>>>1;re<Ge;){var U=2*(re+1)-1,Z=D[U],te=U+1,se=D[te];if(0>r(Z,ee))te<Pe&&0>r(se,Z)?(D[re]=se,D[te]=ee,re=te):(D[re]=Z,D[U]=ee,re=U);else if(te<Pe&&0>r(se,ee))D[re]=se,D[te]=ee,re=te;else break e}}return J}function r(D,J){var ee=D.sortIndex-J.sortIndex;return ee!==0?ee:D.id-J.id}if(typeof performance=="object"&&typeof performance.now=="function"){var s=performance;t.unstable_now=function(){return s.now()}}else{var o=Date,a=o.now();t.unstable_now=function(){return o.now()-a}}var l=[],u=[],c=1,f=null,d=3,p=!1,g=!1,S=!1,m=typeof setTimeout=="function"?setTimeout:null,h=typeof clearTimeout=="function"?clearTimeout:null,_=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function v(D){for(var J=n(u);J!==null;){if(J.callback===null)i(u);else if(J.startTime<=D)i(u),J.sortIndex=J.expirationTime,e(l,J);else break;J=n(u)}}function E(D){if(S=!1,v(D),!g)if(n(l)!==null)g=!0,z(b);else{var J=n(u);J!==null&&ne(E,J.startTime-D)}}function b(D,J){g=!1,S&&(S=!1,h(P),P=-1),p=!0;var ee=d;try{for(v(J),f=n(l);f!==null&&(!(f.expirationTime>J)||D&&!w());){var re=f.callback;if(typeof re=="function"){f.callback=null,d=f.priorityLevel;var Pe=re(f.expirationTime<=J);J=t.unstable_now(),typeof Pe=="function"?f.callback=Pe:f===n(l)&&i(l),v(J)}else i(l);f=n(l)}if(f!==null)var Ge=!0;else{var U=n(u);U!==null&&ne(E,U.startTime-J),Ge=!1}return Ge}finally{f=null,d=ee,p=!1}}var R=!1,C=null,P=-1,Q=5,y=-1;function w(){return!(t.unstable_now()-y<Q)}function $(){if(C!==null){var D=t.unstable_now();y=D;var J=!0;try{J=C(!0,D)}finally{J?O():(R=!1,C=null)}}else R=!1}var O;if(typeof _=="function")O=function(){_($)};else if(typeof MessageChannel<"u"){var j=new MessageChannel,K=j.port2;j.port1.onmessage=$,O=function(){K.postMessage(null)}}else O=function(){m($,0)};function z(D){C=D,R||(R=!0,O())}function ne(D,J){P=m(function(){D(t.unstable_now())},J)}t.unstable_IdlePriority=5,t.unstable_ImmediatePriority=1,t.unstable_LowPriority=4,t.unstable_NormalPriority=3,t.unstable_Profiling=null,t.unstable_UserBlockingPriority=2,t.unstable_cancelCallback=function(D){D.callback=null},t.unstable_continueExecution=function(){g||p||(g=!0,z(b))},t.unstable_forceFrameRate=function(D){0>D||125<D?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):Q=0<D?Math.floor(1e3/D):5},t.unstable_getCurrentPriorityLevel=function(){return d},t.unstable_getFirstCallbackNode=function(){return n(l)},t.unstable_next=function(D){switch(d){case 1:case 2:case 3:var J=3;break;default:J=d}var ee=d;d=J;try{return D()}finally{d=ee}},t.unstable_pauseExecution=function(){},t.unstable_requestPaint=function(){},t.unstable_runWithPriority=function(D,J){switch(D){case 1:case 2:case 3:case 4:case 5:break;default:D=3}var ee=d;d=D;try{return J()}finally{d=ee}},t.unstable_scheduleCallback=function(D,J,ee){var re=t.unstable_now();switch(typeof ee=="object"&&ee!==null?(ee=ee.delay,ee=typeof ee=="number"&&0<ee?re+ee:re):ee=re,D){case 1:var Pe=-1;break;case 2:Pe=250;break;case 5:Pe=1073741823;break;case 4:Pe=1e4;break;default:Pe=5e3}return Pe=ee+Pe,D={id:c++,callback:J,priorityLevel:D,startTime:ee,expirationTime:Pe,sortIndex:-1},ee>re?(D.sortIndex=ee,e(u,D),n(l)===null&&D===n(u)&&(S?(h(P),P=-1):S=!0,ne(E,ee-re))):(D.sortIndex=Pe,e(l,D),g||p||(g=!0,z(b))),D},t.unstable_shouldYield=w,t.unstable_wrapCallback=function(D){var J=d;return function(){var ee=d;d=J;try{return D.apply(this,arguments)}finally{d=ee}}}})(nx);tx.exports=nx;var AM=tx.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var RM=ke,Hn=AM;function ae(t){for(var e="https://reactjs.org/docs/error-decoder.html?invariant="+t,n=1;n<arguments.length;n++)e+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var ix=new Set,Na={};function Ss(t,e){mo(t,e),mo(t+"Capture",e)}function mo(t,e){for(Na[t]=e,t=0;t<e.length;t++)ix.add(e[t])}var ji=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Od=Object.prototype.hasOwnProperty,PM=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,Ag={},Rg={};function bM(t){return Od.call(Rg,t)?!0:Od.call(Ag,t)?!1:PM.test(t)?Rg[t]=!0:(Ag[t]=!0,!1)}function LM(t,e,n,i){if(n!==null&&n.type===0)return!1;switch(typeof e){case"function":case"symbol":return!0;case"boolean":return i?!1:n!==null?!n.acceptsBooleans:(t=t.toLowerCase().slice(0,5),t!=="data-"&&t!=="aria-");default:return!1}}function DM(t,e,n,i){if(e===null||typeof e>"u"||LM(t,e,n,i))return!0;if(i)return!1;if(n!==null)switch(n.type){case 3:return!e;case 4:return e===!1;case 5:return isNaN(e);case 6:return isNaN(e)||1>e}return!1}function hn(t,e,n,i,r,s,o){this.acceptsBooleans=e===2||e===3||e===4,this.attributeName=i,this.attributeNamespace=r,this.mustUseProperty=n,this.propertyName=t,this.type=e,this.sanitizeURL=s,this.removeEmptyString=o}var Yt={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(t){Yt[t]=new hn(t,0,!1,t,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(t){var e=t[0];Yt[e]=new hn(e,1,!1,t[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(t){Yt[t]=new hn(t,2,!1,t.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(t){Yt[t]=new hn(t,2,!1,t,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(t){Yt[t]=new hn(t,3,!1,t.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(t){Yt[t]=new hn(t,3,!0,t,null,!1,!1)});["capture","download"].forEach(function(t){Yt[t]=new hn(t,4,!1,t,null,!1,!1)});["cols","rows","size","span"].forEach(function(t){Yt[t]=new hn(t,6,!1,t,null,!1,!1)});["rowSpan","start"].forEach(function(t){Yt[t]=new hn(t,5,!1,t.toLowerCase(),null,!1,!1)});var Hp=/[\-:]([a-z])/g;function Vp(t){return t[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(t){var e=t.replace(Hp,Vp);Yt[e]=new hn(e,1,!1,t,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(t){var e=t.replace(Hp,Vp);Yt[e]=new hn(e,1,!1,t,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(t){var e=t.replace(Hp,Vp);Yt[e]=new hn(e,1,!1,t,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(t){Yt[t]=new hn(t,1,!1,t.toLowerCase(),null,!1,!1)});Yt.xlinkHref=new hn("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(t){Yt[t]=new hn(t,1,!1,t.toLowerCase(),null,!0,!0)});function Gp(t,e,n,i){var r=Yt.hasOwnProperty(e)?Yt[e]:null;(r!==null?r.type!==0:i||!(2<e.length)||e[0]!=="o"&&e[0]!=="O"||e[1]!=="n"&&e[1]!=="N")&&(DM(e,n,r,i)&&(n=null),i||r===null?bM(e)&&(n===null?t.removeAttribute(e):t.setAttribute(e,""+n)):r.mustUseProperty?t[r.propertyName]=n===null?r.type===3?!1:"":n:(e=r.attributeName,i=r.attributeNamespace,n===null?t.removeAttribute(e):(r=r.type,n=r===3||r===4&&n===!0?"":""+n,i?t.setAttributeNS(i,e,n):t.setAttribute(e,n))))}var tr=RM.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,Sl=Symbol.for("react.element"),Vs=Symbol.for("react.portal"),Gs=Symbol.for("react.fragment"),Wp=Symbol.for("react.strict_mode"),Bd=Symbol.for("react.profiler"),rx=Symbol.for("react.provider"),sx=Symbol.for("react.context"),$p=Symbol.for("react.forward_ref"),zd=Symbol.for("react.suspense"),Hd=Symbol.for("react.suspense_list"),Xp=Symbol.for("react.memo"),dr=Symbol.for("react.lazy"),ox=Symbol.for("react.offscreen"),Pg=Symbol.iterator;function zo(t){return t===null||typeof t!="object"?null:(t=Pg&&t[Pg]||t["@@iterator"],typeof t=="function"?t:null)}var wt=Object.assign,vf;function ra(t){if(vf===void 0)try{throw Error()}catch(n){var e=n.stack.trim().match(/\n( *(at )?)/);vf=e&&e[1]||""}return`
`+vf+t}var _f=!1;function xf(t,e){if(!t||_f)return"";_f=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(e)if(e=function(){throw Error()},Object.defineProperty(e.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(e,[])}catch(u){var i=u}Reflect.construct(t,[],e)}else{try{e.call()}catch(u){i=u}t.call(e.prototype)}else{try{throw Error()}catch(u){i=u}t()}}catch(u){if(u&&i&&typeof u.stack=="string"){for(var r=u.stack.split(`
`),s=i.stack.split(`
`),o=r.length-1,a=s.length-1;1<=o&&0<=a&&r[o]!==s[a];)a--;for(;1<=o&&0<=a;o--,a--)if(r[o]!==s[a]){if(o!==1||a!==1)do if(o--,a--,0>a||r[o]!==s[a]){var l=`
`+r[o].replace(" at new "," at ");return t.displayName&&l.includes("<anonymous>")&&(l=l.replace("<anonymous>",t.displayName)),l}while(1<=o&&0<=a);break}}}finally{_f=!1,Error.prepareStackTrace=n}return(t=t?t.displayName||t.name:"")?ra(t):""}function IM(t){switch(t.tag){case 5:return ra(t.type);case 16:return ra("Lazy");case 13:return ra("Suspense");case 19:return ra("SuspenseList");case 0:case 2:case 15:return t=xf(t.type,!1),t;case 11:return t=xf(t.type.render,!1),t;case 1:return t=xf(t.type,!0),t;default:return""}}function Vd(t){if(t==null)return null;if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case Gs:return"Fragment";case Vs:return"Portal";case Bd:return"Profiler";case Wp:return"StrictMode";case zd:return"Suspense";case Hd:return"SuspenseList"}if(typeof t=="object")switch(t.$$typeof){case sx:return(t.displayName||"Context")+".Consumer";case rx:return(t._context.displayName||"Context")+".Provider";case $p:var e=t.render;return t=t.displayName,t||(t=e.displayName||e.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case Xp:return e=t.displayName||null,e!==null?e:Vd(t.type)||"Memo";case dr:e=t._payload,t=t._init;try{return Vd(t(e))}catch{}}return null}function NM(t){var e=t.type;switch(t.tag){case 24:return"Cache";case 9:return(e.displayName||"Context")+".Consumer";case 10:return(e._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return t=e.render,t=t.displayName||t.name||"",e.displayName||(t!==""?"ForwardRef("+t+")":"ForwardRef");case 7:return"Fragment";case 5:return e;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return Vd(e);case 8:return e===Wp?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e}return null}function Ir(t){switch(typeof t){case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function ax(t){var e=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(e==="checkbox"||e==="radio")}function UM(t){var e=ax(t)?"checked":"value",n=Object.getOwnPropertyDescriptor(t.constructor.prototype,e),i=""+t[e];if(!t.hasOwnProperty(e)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var r=n.get,s=n.set;return Object.defineProperty(t,e,{configurable:!0,get:function(){return r.call(this)},set:function(o){i=""+o,s.call(this,o)}}),Object.defineProperty(t,e,{enumerable:n.enumerable}),{getValue:function(){return i},setValue:function(o){i=""+o},stopTracking:function(){t._valueTracker=null,delete t[e]}}}}function Ml(t){t._valueTracker||(t._valueTracker=UM(t))}function lx(t){if(!t)return!1;var e=t._valueTracker;if(!e)return!0;var n=e.getValue(),i="";return t&&(i=ax(t)?t.checked?"true":"false":t.value),t=i,t!==n?(e.setValue(t),!0):!1}function Yu(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}function Gd(t,e){var n=e.checked;return wt({},e,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??t._wrapperState.initialChecked})}function bg(t,e){var n=e.defaultValue==null?"":e.defaultValue,i=e.checked!=null?e.checked:e.defaultChecked;n=Ir(e.value!=null?e.value:n),t._wrapperState={initialChecked:i,initialValue:n,controlled:e.type==="checkbox"||e.type==="radio"?e.checked!=null:e.value!=null}}function ux(t,e){e=e.checked,e!=null&&Gp(t,"checked",e,!1)}function Wd(t,e){ux(t,e);var n=Ir(e.value),i=e.type;if(n!=null)i==="number"?(n===0&&t.value===""||t.value!=n)&&(t.value=""+n):t.value!==""+n&&(t.value=""+n);else if(i==="submit"||i==="reset"){t.removeAttribute("value");return}e.hasOwnProperty("value")?$d(t,e.type,n):e.hasOwnProperty("defaultValue")&&$d(t,e.type,Ir(e.defaultValue)),e.checked==null&&e.defaultChecked!=null&&(t.defaultChecked=!!e.defaultChecked)}function Lg(t,e,n){if(e.hasOwnProperty("value")||e.hasOwnProperty("defaultValue")){var i=e.type;if(!(i!=="submit"&&i!=="reset"||e.value!==void 0&&e.value!==null))return;e=""+t._wrapperState.initialValue,n||e===t.value||(t.value=e),t.defaultValue=e}n=t.name,n!==""&&(t.name=""),t.defaultChecked=!!t._wrapperState.initialChecked,n!==""&&(t.name=n)}function $d(t,e,n){(e!=="number"||Yu(t.ownerDocument)!==t)&&(n==null?t.defaultValue=""+t._wrapperState.initialValue:t.defaultValue!==""+n&&(t.defaultValue=""+n))}var sa=Array.isArray;function ro(t,e,n,i){if(t=t.options,e){e={};for(var r=0;r<n.length;r++)e["$"+n[r]]=!0;for(n=0;n<t.length;n++)r=e.hasOwnProperty("$"+t[n].value),t[n].selected!==r&&(t[n].selected=r),r&&i&&(t[n].defaultSelected=!0)}else{for(n=""+Ir(n),e=null,r=0;r<t.length;r++){if(t[r].value===n){t[r].selected=!0,i&&(t[r].defaultSelected=!0);return}e!==null||t[r].disabled||(e=t[r])}e!==null&&(e.selected=!0)}}function Xd(t,e){if(e.dangerouslySetInnerHTML!=null)throw Error(ae(91));return wt({},e,{value:void 0,defaultValue:void 0,children:""+t._wrapperState.initialValue})}function Dg(t,e){var n=e.value;if(n==null){if(n=e.children,e=e.defaultValue,n!=null){if(e!=null)throw Error(ae(92));if(sa(n)){if(1<n.length)throw Error(ae(93));n=n[0]}e=n}e==null&&(e=""),n=e}t._wrapperState={initialValue:Ir(n)}}function cx(t,e){var n=Ir(e.value),i=Ir(e.defaultValue);n!=null&&(n=""+n,n!==t.value&&(t.value=n),e.defaultValue==null&&t.defaultValue!==n&&(t.defaultValue=n)),i!=null&&(t.defaultValue=""+i)}function Ig(t){var e=t.textContent;e===t._wrapperState.initialValue&&e!==""&&e!==null&&(t.value=e)}function fx(t){switch(t){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function jd(t,e){return t==null||t==="http://www.w3.org/1999/xhtml"?fx(e):t==="http://www.w3.org/2000/svg"&&e==="foreignObject"?"http://www.w3.org/1999/xhtml":t}var El,dx=function(t){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(e,n,i,r){MSApp.execUnsafeLocalFunction(function(){return t(e,n,i,r)})}:t}(function(t,e){if(t.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in t)t.innerHTML=e;else{for(El=El||document.createElement("div"),El.innerHTML="<svg>"+e.valueOf().toString()+"</svg>",e=El.firstChild;t.firstChild;)t.removeChild(t.firstChild);for(;e.firstChild;)t.appendChild(e.firstChild)}});function Ua(t,e){if(e){var n=t.firstChild;if(n&&n===t.lastChild&&n.nodeType===3){n.nodeValue=e;return}}t.textContent=e}var va={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},kM=["Webkit","ms","Moz","O"];Object.keys(va).forEach(function(t){kM.forEach(function(e){e=e+t.charAt(0).toUpperCase()+t.substring(1),va[e]=va[t]})});function hx(t,e,n){return e==null||typeof e=="boolean"||e===""?"":n||typeof e!="number"||e===0||va.hasOwnProperty(t)&&va[t]?(""+e).trim():e+"px"}function px(t,e){t=t.style;for(var n in e)if(e.hasOwnProperty(n)){var i=n.indexOf("--")===0,r=hx(n,e[n],i);n==="float"&&(n="cssFloat"),i?t.setProperty(n,r):t[n]=r}}var FM=wt({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function Yd(t,e){if(e){if(FM[t]&&(e.children!=null||e.dangerouslySetInnerHTML!=null))throw Error(ae(137,t));if(e.dangerouslySetInnerHTML!=null){if(e.children!=null)throw Error(ae(60));if(typeof e.dangerouslySetInnerHTML!="object"||!("__html"in e.dangerouslySetInnerHTML))throw Error(ae(61))}if(e.style!=null&&typeof e.style!="object")throw Error(ae(62))}}function qd(t,e){if(t.indexOf("-")===-1)return typeof e.is=="string";switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Kd=null;function jp(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var Zd=null,so=null,oo=null;function Ng(t){if(t=dl(t)){if(typeof Zd!="function")throw Error(ae(280));var e=t.stateNode;e&&(e=Hc(e),Zd(t.stateNode,t.type,e))}}function mx(t){so?oo?oo.push(t):oo=[t]:so=t}function gx(){if(so){var t=so,e=oo;if(oo=so=null,Ng(t),e)for(t=0;t<e.length;t++)Ng(e[t])}}function vx(t,e){return t(e)}function _x(){}var yf=!1;function xx(t,e,n){if(yf)return t(e,n);yf=!0;try{return vx(t,e,n)}finally{yf=!1,(so!==null||oo!==null)&&(_x(),gx())}}function ka(t,e){var n=t.stateNode;if(n===null)return null;var i=Hc(n);if(i===null)return null;n=i[e];e:switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(i=!i.disabled)||(t=t.type,i=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!i;break e;default:t=!1}if(t)return null;if(n&&typeof n!="function")throw Error(ae(231,e,typeof n));return n}var Jd=!1;if(ji)try{var Ho={};Object.defineProperty(Ho,"passive",{get:function(){Jd=!0}}),window.addEventListener("test",Ho,Ho),window.removeEventListener("test",Ho,Ho)}catch{Jd=!1}function OM(t,e,n,i,r,s,o,a,l){var u=Array.prototype.slice.call(arguments,3);try{e.apply(n,u)}catch(c){this.onError(c)}}var _a=!1,qu=null,Ku=!1,Qd=null,BM={onError:function(t){_a=!0,qu=t}};function zM(t,e,n,i,r,s,o,a,l){_a=!1,qu=null,OM.apply(BM,arguments)}function HM(t,e,n,i,r,s,o,a,l){if(zM.apply(this,arguments),_a){if(_a){var u=qu;_a=!1,qu=null}else throw Error(ae(198));Ku||(Ku=!0,Qd=u)}}function Ms(t){var e=t,n=t;if(t.alternate)for(;e.return;)e=e.return;else{t=e;do e=t,e.flags&4098&&(n=e.return),t=e.return;while(t)}return e.tag===3?n:null}function yx(t){if(t.tag===13){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function Ug(t){if(Ms(t)!==t)throw Error(ae(188))}function VM(t){var e=t.alternate;if(!e){if(e=Ms(t),e===null)throw Error(ae(188));return e!==t?null:t}for(var n=t,i=e;;){var r=n.return;if(r===null)break;var s=r.alternate;if(s===null){if(i=r.return,i!==null){n=i;continue}break}if(r.child===s.child){for(s=r.child;s;){if(s===n)return Ug(r),t;if(s===i)return Ug(r),e;s=s.sibling}throw Error(ae(188))}if(n.return!==i.return)n=r,i=s;else{for(var o=!1,a=r.child;a;){if(a===n){o=!0,n=r,i=s;break}if(a===i){o=!0,i=r,n=s;break}a=a.sibling}if(!o){for(a=s.child;a;){if(a===n){o=!0,n=s,i=r;break}if(a===i){o=!0,i=s,n=r;break}a=a.sibling}if(!o)throw Error(ae(189))}}if(n.alternate!==i)throw Error(ae(190))}if(n.tag!==3)throw Error(ae(188));return n.stateNode.current===n?t:e}function Sx(t){return t=VM(t),t!==null?Mx(t):null}function Mx(t){if(t.tag===5||t.tag===6)return t;for(t=t.child;t!==null;){var e=Mx(t);if(e!==null)return e;t=t.sibling}return null}var Ex=Hn.unstable_scheduleCallback,kg=Hn.unstable_cancelCallback,GM=Hn.unstable_shouldYield,WM=Hn.unstable_requestPaint,bt=Hn.unstable_now,$M=Hn.unstable_getCurrentPriorityLevel,Yp=Hn.unstable_ImmediatePriority,wx=Hn.unstable_UserBlockingPriority,Zu=Hn.unstable_NormalPriority,XM=Hn.unstable_LowPriority,Tx=Hn.unstable_IdlePriority,Fc=null,wi=null;function jM(t){if(wi&&typeof wi.onCommitFiberRoot=="function")try{wi.onCommitFiberRoot(Fc,t,void 0,(t.current.flags&128)===128)}catch{}}var hi=Math.clz32?Math.clz32:KM,YM=Math.log,qM=Math.LN2;function KM(t){return t>>>=0,t===0?32:31-(YM(t)/qM|0)|0}var wl=64,Tl=4194304;function oa(t){switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return t&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return t}}function Ju(t,e){var n=t.pendingLanes;if(n===0)return 0;var i=0,r=t.suspendedLanes,s=t.pingedLanes,o=n&268435455;if(o!==0){var a=o&~r;a!==0?i=oa(a):(s&=o,s!==0&&(i=oa(s)))}else o=n&~r,o!==0?i=oa(o):s!==0&&(i=oa(s));if(i===0)return 0;if(e!==0&&e!==i&&!(e&r)&&(r=i&-i,s=e&-e,r>=s||r===16&&(s&4194240)!==0))return e;if(i&4&&(i|=n&16),e=t.entangledLanes,e!==0)for(t=t.entanglements,e&=i;0<e;)n=31-hi(e),r=1<<n,i|=t[n],e&=~r;return i}function ZM(t,e){switch(t){case 1:case 2:case 4:return e+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function JM(t,e){for(var n=t.suspendedLanes,i=t.pingedLanes,r=t.expirationTimes,s=t.pendingLanes;0<s;){var o=31-hi(s),a=1<<o,l=r[o];l===-1?(!(a&n)||a&i)&&(r[o]=ZM(a,e)):l<=e&&(t.expiredLanes|=a),s&=~a}}function eh(t){return t=t.pendingLanes&-1073741825,t!==0?t:t&1073741824?1073741824:0}function Cx(){var t=wl;return wl<<=1,!(wl&4194240)&&(wl=64),t}function Sf(t){for(var e=[],n=0;31>n;n++)e.push(t);return e}function cl(t,e,n){t.pendingLanes|=e,e!==536870912&&(t.suspendedLanes=0,t.pingedLanes=0),t=t.eventTimes,e=31-hi(e),t[e]=n}function QM(t,e){var n=t.pendingLanes&~e;t.pendingLanes=e,t.suspendedLanes=0,t.pingedLanes=0,t.expiredLanes&=e,t.mutableReadLanes&=e,t.entangledLanes&=e,e=t.entanglements;var i=t.eventTimes;for(t=t.expirationTimes;0<n;){var r=31-hi(n),s=1<<r;e[r]=0,i[r]=-1,t[r]=-1,n&=~s}}function qp(t,e){var n=t.entangledLanes|=e;for(t=t.entanglements;n;){var i=31-hi(n),r=1<<i;r&e|t[i]&e&&(t[i]|=e),n&=~r}}var lt=0;function Ax(t){return t&=-t,1<t?4<t?t&268435455?16:536870912:4:1}var Rx,Kp,Px,bx,Lx,th=!1,Cl=[],Er=null,wr=null,Tr=null,Fa=new Map,Oa=new Map,pr=[],eE="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function Fg(t,e){switch(t){case"focusin":case"focusout":Er=null;break;case"dragenter":case"dragleave":wr=null;break;case"mouseover":case"mouseout":Tr=null;break;case"pointerover":case"pointerout":Fa.delete(e.pointerId);break;case"gotpointercapture":case"lostpointercapture":Oa.delete(e.pointerId)}}function Vo(t,e,n,i,r,s){return t===null||t.nativeEvent!==s?(t={blockedOn:e,domEventName:n,eventSystemFlags:i,nativeEvent:s,targetContainers:[r]},e!==null&&(e=dl(e),e!==null&&Kp(e)),t):(t.eventSystemFlags|=i,e=t.targetContainers,r!==null&&e.indexOf(r)===-1&&e.push(r),t)}function tE(t,e,n,i,r){switch(e){case"focusin":return Er=Vo(Er,t,e,n,i,r),!0;case"dragenter":return wr=Vo(wr,t,e,n,i,r),!0;case"mouseover":return Tr=Vo(Tr,t,e,n,i,r),!0;case"pointerover":var s=r.pointerId;return Fa.set(s,Vo(Fa.get(s)||null,t,e,n,i,r)),!0;case"gotpointercapture":return s=r.pointerId,Oa.set(s,Vo(Oa.get(s)||null,t,e,n,i,r)),!0}return!1}function Dx(t){var e=ss(t.target);if(e!==null){var n=Ms(e);if(n!==null){if(e=n.tag,e===13){if(e=yx(n),e!==null){t.blockedOn=e,Lx(t.priority,function(){Px(n)});return}}else if(e===3&&n.stateNode.current.memoizedState.isDehydrated){t.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}t.blockedOn=null}function vu(t){if(t.blockedOn!==null)return!1;for(var e=t.targetContainers;0<e.length;){var n=nh(t.domEventName,t.eventSystemFlags,e[0],t.nativeEvent);if(n===null){n=t.nativeEvent;var i=new n.constructor(n.type,n);Kd=i,n.target.dispatchEvent(i),Kd=null}else return e=dl(n),e!==null&&Kp(e),t.blockedOn=n,!1;e.shift()}return!0}function Og(t,e,n){vu(t)&&n.delete(e)}function nE(){th=!1,Er!==null&&vu(Er)&&(Er=null),wr!==null&&vu(wr)&&(wr=null),Tr!==null&&vu(Tr)&&(Tr=null),Fa.forEach(Og),Oa.forEach(Og)}function Go(t,e){t.blockedOn===e&&(t.blockedOn=null,th||(th=!0,Hn.unstable_scheduleCallback(Hn.unstable_NormalPriority,nE)))}function Ba(t){function e(r){return Go(r,t)}if(0<Cl.length){Go(Cl[0],t);for(var n=1;n<Cl.length;n++){var i=Cl[n];i.blockedOn===t&&(i.blockedOn=null)}}for(Er!==null&&Go(Er,t),wr!==null&&Go(wr,t),Tr!==null&&Go(Tr,t),Fa.forEach(e),Oa.forEach(e),n=0;n<pr.length;n++)i=pr[n],i.blockedOn===t&&(i.blockedOn=null);for(;0<pr.length&&(n=pr[0],n.blockedOn===null);)Dx(n),n.blockedOn===null&&pr.shift()}var ao=tr.ReactCurrentBatchConfig,Qu=!0;function iE(t,e,n,i){var r=lt,s=ao.transition;ao.transition=null;try{lt=1,Zp(t,e,n,i)}finally{lt=r,ao.transition=s}}function rE(t,e,n,i){var r=lt,s=ao.transition;ao.transition=null;try{lt=4,Zp(t,e,n,i)}finally{lt=r,ao.transition=s}}function Zp(t,e,n,i){if(Qu){var r=nh(t,e,n,i);if(r===null)Lf(t,e,i,ec,n),Fg(t,i);else if(tE(r,t,e,n,i))i.stopPropagation();else if(Fg(t,i),e&4&&-1<eE.indexOf(t)){for(;r!==null;){var s=dl(r);if(s!==null&&Rx(s),s=nh(t,e,n,i),s===null&&Lf(t,e,i,ec,n),s===r)break;r=s}r!==null&&i.stopPropagation()}else Lf(t,e,i,null,n)}}var ec=null;function nh(t,e,n,i){if(ec=null,t=jp(i),t=ss(t),t!==null)if(e=Ms(t),e===null)t=null;else if(n=e.tag,n===13){if(t=yx(e),t!==null)return t;t=null}else if(n===3){if(e.stateNode.current.memoizedState.isDehydrated)return e.tag===3?e.stateNode.containerInfo:null;t=null}else e!==t&&(t=null);return ec=t,null}function Ix(t){switch(t){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch($M()){case Yp:return 1;case wx:return 4;case Zu:case XM:return 16;case Tx:return 536870912;default:return 16}default:return 16}}var vr=null,Jp=null,_u=null;function Nx(){if(_u)return _u;var t,e=Jp,n=e.length,i,r="value"in vr?vr.value:vr.textContent,s=r.length;for(t=0;t<n&&e[t]===r[t];t++);var o=n-t;for(i=1;i<=o&&e[n-i]===r[s-i];i++);return _u=r.slice(t,1<i?1-i:void 0)}function xu(t){var e=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&e===13&&(t=13)):t=e,t===10&&(t=13),32<=t||t===13?t:0}function Al(){return!0}function Bg(){return!1}function Gn(t){function e(n,i,r,s,o){this._reactName=n,this._targetInst=r,this.type=i,this.nativeEvent=s,this.target=o,this.currentTarget=null;for(var a in t)t.hasOwnProperty(a)&&(n=t[a],this[a]=n?n(s):s[a]);return this.isDefaultPrevented=(s.defaultPrevented!=null?s.defaultPrevented:s.returnValue===!1)?Al:Bg,this.isPropagationStopped=Bg,this}return wt(e.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=Al)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=Al)},persist:function(){},isPersistent:Al}),e}var Do={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Qp=Gn(Do),fl=wt({},Do,{view:0,detail:0}),sE=Gn(fl),Mf,Ef,Wo,Oc=wt({},fl,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:em,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==Wo&&(Wo&&t.type==="mousemove"?(Mf=t.screenX-Wo.screenX,Ef=t.screenY-Wo.screenY):Ef=Mf=0,Wo=t),Mf)},movementY:function(t){return"movementY"in t?t.movementY:Ef}}),zg=Gn(Oc),oE=wt({},Oc,{dataTransfer:0}),aE=Gn(oE),lE=wt({},fl,{relatedTarget:0}),wf=Gn(lE),uE=wt({},Do,{animationName:0,elapsedTime:0,pseudoElement:0}),cE=Gn(uE),fE=wt({},Do,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),dE=Gn(fE),hE=wt({},Do,{data:0}),Hg=Gn(hE),pE={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},mE={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},gE={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function vE(t){var e=this.nativeEvent;return e.getModifierState?e.getModifierState(t):(t=gE[t])?!!e[t]:!1}function em(){return vE}var _E=wt({},fl,{key:function(t){if(t.key){var e=pE[t.key]||t.key;if(e!=="Unidentified")return e}return t.type==="keypress"?(t=xu(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?mE[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:em,charCode:function(t){return t.type==="keypress"?xu(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?xu(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),xE=Gn(_E),yE=wt({},Oc,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Vg=Gn(yE),SE=wt({},fl,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:em}),ME=Gn(SE),EE=wt({},Do,{propertyName:0,elapsedTime:0,pseudoElement:0}),wE=Gn(EE),TE=wt({},Oc,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),CE=Gn(TE),AE=[9,13,27,32],tm=ji&&"CompositionEvent"in window,xa=null;ji&&"documentMode"in document&&(xa=document.documentMode);var RE=ji&&"TextEvent"in window&&!xa,Ux=ji&&(!tm||xa&&8<xa&&11>=xa),Gg=" ",Wg=!1;function kx(t,e){switch(t){case"keyup":return AE.indexOf(e.keyCode)!==-1;case"keydown":return e.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Fx(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var Ws=!1;function PE(t,e){switch(t){case"compositionend":return Fx(e);case"keypress":return e.which!==32?null:(Wg=!0,Gg);case"textInput":return t=e.data,t===Gg&&Wg?null:t;default:return null}}function bE(t,e){if(Ws)return t==="compositionend"||!tm&&kx(t,e)?(t=Nx(),_u=Jp=vr=null,Ws=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(e.ctrlKey||e.altKey||e.metaKey)||e.ctrlKey&&e.altKey){if(e.char&&1<e.char.length)return e.char;if(e.which)return String.fromCharCode(e.which)}return null;case"compositionend":return Ux&&e.locale!=="ko"?null:e.data;default:return null}}var LE={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function $g(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e==="input"?!!LE[t.type]:e==="textarea"}function Ox(t,e,n,i){mx(i),e=tc(e,"onChange"),0<e.length&&(n=new Qp("onChange","change",null,n,i),t.push({event:n,listeners:e}))}var ya=null,za=null;function DE(t){qx(t,0)}function Bc(t){var e=js(t);if(lx(e))return t}function IE(t,e){if(t==="change")return e}var Bx=!1;if(ji){var Tf;if(ji){var Cf="oninput"in document;if(!Cf){var Xg=document.createElement("div");Xg.setAttribute("oninput","return;"),Cf=typeof Xg.oninput=="function"}Tf=Cf}else Tf=!1;Bx=Tf&&(!document.documentMode||9<document.documentMode)}function jg(){ya&&(ya.detachEvent("onpropertychange",zx),za=ya=null)}function zx(t){if(t.propertyName==="value"&&Bc(za)){var e=[];Ox(e,za,t,jp(t)),xx(DE,e)}}function NE(t,e,n){t==="focusin"?(jg(),ya=e,za=n,ya.attachEvent("onpropertychange",zx)):t==="focusout"&&jg()}function UE(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return Bc(za)}function kE(t,e){if(t==="click")return Bc(e)}function FE(t,e){if(t==="input"||t==="change")return Bc(e)}function OE(t,e){return t===e&&(t!==0||1/t===1/e)||t!==t&&e!==e}var mi=typeof Object.is=="function"?Object.is:OE;function Ha(t,e){if(mi(t,e))return!0;if(typeof t!="object"||t===null||typeof e!="object"||e===null)return!1;var n=Object.keys(t),i=Object.keys(e);if(n.length!==i.length)return!1;for(i=0;i<n.length;i++){var r=n[i];if(!Od.call(e,r)||!mi(t[r],e[r]))return!1}return!0}function Yg(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function qg(t,e){var n=Yg(t);t=0;for(var i;n;){if(n.nodeType===3){if(i=t+n.textContent.length,t<=e&&i>=e)return{node:n,offset:e-t};t=i}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=Yg(n)}}function Hx(t,e){return t&&e?t===e?!0:t&&t.nodeType===3?!1:e&&e.nodeType===3?Hx(t,e.parentNode):"contains"in t?t.contains(e):t.compareDocumentPosition?!!(t.compareDocumentPosition(e)&16):!1:!1}function Vx(){for(var t=window,e=Yu();e instanceof t.HTMLIFrameElement;){try{var n=typeof e.contentWindow.location.href=="string"}catch{n=!1}if(n)t=e.contentWindow;else break;e=Yu(t.document)}return e}function nm(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e&&(e==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||e==="textarea"||t.contentEditable==="true")}function BE(t){var e=Vx(),n=t.focusedElem,i=t.selectionRange;if(e!==n&&n&&n.ownerDocument&&Hx(n.ownerDocument.documentElement,n)){if(i!==null&&nm(n)){if(e=i.start,t=i.end,t===void 0&&(t=e),"selectionStart"in n)n.selectionStart=e,n.selectionEnd=Math.min(t,n.value.length);else if(t=(e=n.ownerDocument||document)&&e.defaultView||window,t.getSelection){t=t.getSelection();var r=n.textContent.length,s=Math.min(i.start,r);i=i.end===void 0?s:Math.min(i.end,r),!t.extend&&s>i&&(r=i,i=s,s=r),r=qg(n,s);var o=qg(n,i);r&&o&&(t.rangeCount!==1||t.anchorNode!==r.node||t.anchorOffset!==r.offset||t.focusNode!==o.node||t.focusOffset!==o.offset)&&(e=e.createRange(),e.setStart(r.node,r.offset),t.removeAllRanges(),s>i?(t.addRange(e),t.extend(o.node,o.offset)):(e.setEnd(o.node,o.offset),t.addRange(e)))}}for(e=[],t=n;t=t.parentNode;)t.nodeType===1&&e.push({element:t,left:t.scrollLeft,top:t.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<e.length;n++)t=e[n],t.element.scrollLeft=t.left,t.element.scrollTop=t.top}}var zE=ji&&"documentMode"in document&&11>=document.documentMode,$s=null,ih=null,Sa=null,rh=!1;function Kg(t,e,n){var i=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;rh||$s==null||$s!==Yu(i)||(i=$s,"selectionStart"in i&&nm(i)?i={start:i.selectionStart,end:i.selectionEnd}:(i=(i.ownerDocument&&i.ownerDocument.defaultView||window).getSelection(),i={anchorNode:i.anchorNode,anchorOffset:i.anchorOffset,focusNode:i.focusNode,focusOffset:i.focusOffset}),Sa&&Ha(Sa,i)||(Sa=i,i=tc(ih,"onSelect"),0<i.length&&(e=new Qp("onSelect","select",null,e,n),t.push({event:e,listeners:i}),e.target=$s)))}function Rl(t,e){var n={};return n[t.toLowerCase()]=e.toLowerCase(),n["Webkit"+t]="webkit"+e,n["Moz"+t]="moz"+e,n}var Xs={animationend:Rl("Animation","AnimationEnd"),animationiteration:Rl("Animation","AnimationIteration"),animationstart:Rl("Animation","AnimationStart"),transitionend:Rl("Transition","TransitionEnd")},Af={},Gx={};ji&&(Gx=document.createElement("div").style,"AnimationEvent"in window||(delete Xs.animationend.animation,delete Xs.animationiteration.animation,delete Xs.animationstart.animation),"TransitionEvent"in window||delete Xs.transitionend.transition);function zc(t){if(Af[t])return Af[t];if(!Xs[t])return t;var e=Xs[t],n;for(n in e)if(e.hasOwnProperty(n)&&n in Gx)return Af[t]=e[n];return t}var Wx=zc("animationend"),$x=zc("animationiteration"),Xx=zc("animationstart"),jx=zc("transitionend"),Yx=new Map,Zg="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function Fr(t,e){Yx.set(t,e),Ss(e,[t])}for(var Rf=0;Rf<Zg.length;Rf++){var Pf=Zg[Rf],HE=Pf.toLowerCase(),VE=Pf[0].toUpperCase()+Pf.slice(1);Fr(HE,"on"+VE)}Fr(Wx,"onAnimationEnd");Fr($x,"onAnimationIteration");Fr(Xx,"onAnimationStart");Fr("dblclick","onDoubleClick");Fr("focusin","onFocus");Fr("focusout","onBlur");Fr(jx,"onTransitionEnd");mo("onMouseEnter",["mouseout","mouseover"]);mo("onMouseLeave",["mouseout","mouseover"]);mo("onPointerEnter",["pointerout","pointerover"]);mo("onPointerLeave",["pointerout","pointerover"]);Ss("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Ss("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Ss("onBeforeInput",["compositionend","keypress","textInput","paste"]);Ss("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Ss("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Ss("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var aa="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),GE=new Set("cancel close invalid load scroll toggle".split(" ").concat(aa));function Jg(t,e,n){var i=t.type||"unknown-event";t.currentTarget=n,HM(i,e,void 0,t),t.currentTarget=null}function qx(t,e){e=(e&4)!==0;for(var n=0;n<t.length;n++){var i=t[n],r=i.event;i=i.listeners;e:{var s=void 0;if(e)for(var o=i.length-1;0<=o;o--){var a=i[o],l=a.instance,u=a.currentTarget;if(a=a.listener,l!==s&&r.isPropagationStopped())break e;Jg(r,a,u),s=l}else for(o=0;o<i.length;o++){if(a=i[o],l=a.instance,u=a.currentTarget,a=a.listener,l!==s&&r.isPropagationStopped())break e;Jg(r,a,u),s=l}}}if(Ku)throw t=Qd,Ku=!1,Qd=null,t}function mt(t,e){var n=e[uh];n===void 0&&(n=e[uh]=new Set);var i=t+"__bubble";n.has(i)||(Kx(e,t,2,!1),n.add(i))}function bf(t,e,n){var i=0;e&&(i|=4),Kx(n,t,i,e)}var Pl="_reactListening"+Math.random().toString(36).slice(2);function Va(t){if(!t[Pl]){t[Pl]=!0,ix.forEach(function(n){n!=="selectionchange"&&(GE.has(n)||bf(n,!1,t),bf(n,!0,t))});var e=t.nodeType===9?t:t.ownerDocument;e===null||e[Pl]||(e[Pl]=!0,bf("selectionchange",!1,e))}}function Kx(t,e,n,i){switch(Ix(e)){case 1:var r=iE;break;case 4:r=rE;break;default:r=Zp}n=r.bind(null,e,n,t),r=void 0,!Jd||e!=="touchstart"&&e!=="touchmove"&&e!=="wheel"||(r=!0),i?r!==void 0?t.addEventListener(e,n,{capture:!0,passive:r}):t.addEventListener(e,n,!0):r!==void 0?t.addEventListener(e,n,{passive:r}):t.addEventListener(e,n,!1)}function Lf(t,e,n,i,r){var s=i;if(!(e&1)&&!(e&2)&&i!==null)e:for(;;){if(i===null)return;var o=i.tag;if(o===3||o===4){var a=i.stateNode.containerInfo;if(a===r||a.nodeType===8&&a.parentNode===r)break;if(o===4)for(o=i.return;o!==null;){var l=o.tag;if((l===3||l===4)&&(l=o.stateNode.containerInfo,l===r||l.nodeType===8&&l.parentNode===r))return;o=o.return}for(;a!==null;){if(o=ss(a),o===null)return;if(l=o.tag,l===5||l===6){i=s=o;continue e}a=a.parentNode}}i=i.return}xx(function(){var u=s,c=jp(n),f=[];e:{var d=Yx.get(t);if(d!==void 0){var p=Qp,g=t;switch(t){case"keypress":if(xu(n)===0)break e;case"keydown":case"keyup":p=xE;break;case"focusin":g="focus",p=wf;break;case"focusout":g="blur",p=wf;break;case"beforeblur":case"afterblur":p=wf;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":p=zg;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":p=aE;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":p=ME;break;case Wx:case $x:case Xx:p=cE;break;case jx:p=wE;break;case"scroll":p=sE;break;case"wheel":p=CE;break;case"copy":case"cut":case"paste":p=dE;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":p=Vg}var S=(e&4)!==0,m=!S&&t==="scroll",h=S?d!==null?d+"Capture":null:d;S=[];for(var _=u,v;_!==null;){v=_;var E=v.stateNode;if(v.tag===5&&E!==null&&(v=E,h!==null&&(E=ka(_,h),E!=null&&S.push(Ga(_,E,v)))),m)break;_=_.return}0<S.length&&(d=new p(d,g,null,n,c),f.push({event:d,listeners:S}))}}if(!(e&7)){e:{if(d=t==="mouseover"||t==="pointerover",p=t==="mouseout"||t==="pointerout",d&&n!==Kd&&(g=n.relatedTarget||n.fromElement)&&(ss(g)||g[Yi]))break e;if((p||d)&&(d=c.window===c?c:(d=c.ownerDocument)?d.defaultView||d.parentWindow:window,p?(g=n.relatedTarget||n.toElement,p=u,g=g?ss(g):null,g!==null&&(m=Ms(g),g!==m||g.tag!==5&&g.tag!==6)&&(g=null)):(p=null,g=u),p!==g)){if(S=zg,E="onMouseLeave",h="onMouseEnter",_="mouse",(t==="pointerout"||t==="pointerover")&&(S=Vg,E="onPointerLeave",h="onPointerEnter",_="pointer"),m=p==null?d:js(p),v=g==null?d:js(g),d=new S(E,_+"leave",p,n,c),d.target=m,d.relatedTarget=v,E=null,ss(c)===u&&(S=new S(h,_+"enter",g,n,c),S.target=v,S.relatedTarget=m,E=S),m=E,p&&g)t:{for(S=p,h=g,_=0,v=S;v;v=ws(v))_++;for(v=0,E=h;E;E=ws(E))v++;for(;0<_-v;)S=ws(S),_--;for(;0<v-_;)h=ws(h),v--;for(;_--;){if(S===h||h!==null&&S===h.alternate)break t;S=ws(S),h=ws(h)}S=null}else S=null;p!==null&&Qg(f,d,p,S,!1),g!==null&&m!==null&&Qg(f,m,g,S,!0)}}e:{if(d=u?js(u):window,p=d.nodeName&&d.nodeName.toLowerCase(),p==="select"||p==="input"&&d.type==="file")var b=IE;else if($g(d))if(Bx)b=FE;else{b=UE;var R=NE}else(p=d.nodeName)&&p.toLowerCase()==="input"&&(d.type==="checkbox"||d.type==="radio")&&(b=kE);if(b&&(b=b(t,u))){Ox(f,b,n,c);break e}R&&R(t,d,u),t==="focusout"&&(R=d._wrapperState)&&R.controlled&&d.type==="number"&&$d(d,"number",d.value)}switch(R=u?js(u):window,t){case"focusin":($g(R)||R.contentEditable==="true")&&($s=R,ih=u,Sa=null);break;case"focusout":Sa=ih=$s=null;break;case"mousedown":rh=!0;break;case"contextmenu":case"mouseup":case"dragend":rh=!1,Kg(f,n,c);break;case"selectionchange":if(zE)break;case"keydown":case"keyup":Kg(f,n,c)}var C;if(tm)e:{switch(t){case"compositionstart":var P="onCompositionStart";break e;case"compositionend":P="onCompositionEnd";break e;case"compositionupdate":P="onCompositionUpdate";break e}P=void 0}else Ws?kx(t,n)&&(P="onCompositionEnd"):t==="keydown"&&n.keyCode===229&&(P="onCompositionStart");P&&(Ux&&n.locale!=="ko"&&(Ws||P!=="onCompositionStart"?P==="onCompositionEnd"&&Ws&&(C=Nx()):(vr=c,Jp="value"in vr?vr.value:vr.textContent,Ws=!0)),R=tc(u,P),0<R.length&&(P=new Hg(P,t,null,n,c),f.push({event:P,listeners:R}),C?P.data=C:(C=Fx(n),C!==null&&(P.data=C)))),(C=RE?PE(t,n):bE(t,n))&&(u=tc(u,"onBeforeInput"),0<u.length&&(c=new Hg("onBeforeInput","beforeinput",null,n,c),f.push({event:c,listeners:u}),c.data=C))}qx(f,e)})}function Ga(t,e,n){return{instance:t,listener:e,currentTarget:n}}function tc(t,e){for(var n=e+"Capture",i=[];t!==null;){var r=t,s=r.stateNode;r.tag===5&&s!==null&&(r=s,s=ka(t,n),s!=null&&i.unshift(Ga(t,s,r)),s=ka(t,e),s!=null&&i.push(Ga(t,s,r))),t=t.return}return i}function ws(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5);return t||null}function Qg(t,e,n,i,r){for(var s=e._reactName,o=[];n!==null&&n!==i;){var a=n,l=a.alternate,u=a.stateNode;if(l!==null&&l===i)break;a.tag===5&&u!==null&&(a=u,r?(l=ka(n,s),l!=null&&o.unshift(Ga(n,l,a))):r||(l=ka(n,s),l!=null&&o.push(Ga(n,l,a)))),n=n.return}o.length!==0&&t.push({event:e,listeners:o})}var WE=/\r\n?/g,$E=/\u0000|\uFFFD/g;function e0(t){return(typeof t=="string"?t:""+t).replace(WE,`
`).replace($E,"")}function bl(t,e,n){if(e=e0(e),e0(t)!==e&&n)throw Error(ae(425))}function nc(){}var sh=null,oh=null;function ah(t,e){return t==="textarea"||t==="noscript"||typeof e.children=="string"||typeof e.children=="number"||typeof e.dangerouslySetInnerHTML=="object"&&e.dangerouslySetInnerHTML!==null&&e.dangerouslySetInnerHTML.__html!=null}var lh=typeof setTimeout=="function"?setTimeout:void 0,XE=typeof clearTimeout=="function"?clearTimeout:void 0,t0=typeof Promise=="function"?Promise:void 0,jE=typeof queueMicrotask=="function"?queueMicrotask:typeof t0<"u"?function(t){return t0.resolve(null).then(t).catch(YE)}:lh;function YE(t){setTimeout(function(){throw t})}function Df(t,e){var n=e,i=0;do{var r=n.nextSibling;if(t.removeChild(n),r&&r.nodeType===8)if(n=r.data,n==="/$"){if(i===0){t.removeChild(r),Ba(e);return}i--}else n!=="$"&&n!=="$?"&&n!=="$!"||i++;n=r}while(n);Ba(e)}function Cr(t){for(;t!=null;t=t.nextSibling){var e=t.nodeType;if(e===1||e===3)break;if(e===8){if(e=t.data,e==="$"||e==="$!"||e==="$?")break;if(e==="/$")return null}}return t}function n0(t){t=t.previousSibling;for(var e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="$"||n==="$!"||n==="$?"){if(e===0)return t;e--}else n==="/$"&&e++}t=t.previousSibling}return null}var Io=Math.random().toString(36).slice(2),Ei="__reactFiber$"+Io,Wa="__reactProps$"+Io,Yi="__reactContainer$"+Io,uh="__reactEvents$"+Io,qE="__reactListeners$"+Io,KE="__reactHandles$"+Io;function ss(t){var e=t[Ei];if(e)return e;for(var n=t.parentNode;n;){if(e=n[Yi]||n[Ei]){if(n=e.alternate,e.child!==null||n!==null&&n.child!==null)for(t=n0(t);t!==null;){if(n=t[Ei])return n;t=n0(t)}return e}t=n,n=t.parentNode}return null}function dl(t){return t=t[Ei]||t[Yi],!t||t.tag!==5&&t.tag!==6&&t.tag!==13&&t.tag!==3?null:t}function js(t){if(t.tag===5||t.tag===6)return t.stateNode;throw Error(ae(33))}function Hc(t){return t[Wa]||null}var ch=[],Ys=-1;function Or(t){return{current:t}}function _t(t){0>Ys||(t.current=ch[Ys],ch[Ys]=null,Ys--)}function ht(t,e){Ys++,ch[Ys]=t.current,t.current=e}var Nr={},rn=Or(Nr),wn=Or(!1),hs=Nr;function go(t,e){var n=t.type.contextTypes;if(!n)return Nr;var i=t.stateNode;if(i&&i.__reactInternalMemoizedUnmaskedChildContext===e)return i.__reactInternalMemoizedMaskedChildContext;var r={},s;for(s in n)r[s]=e[s];return i&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=e,t.__reactInternalMemoizedMaskedChildContext=r),r}function Tn(t){return t=t.childContextTypes,t!=null}function ic(){_t(wn),_t(rn)}function i0(t,e,n){if(rn.current!==Nr)throw Error(ae(168));ht(rn,e),ht(wn,n)}function Zx(t,e,n){var i=t.stateNode;if(e=e.childContextTypes,typeof i.getChildContext!="function")return n;i=i.getChildContext();for(var r in i)if(!(r in e))throw Error(ae(108,NM(t)||"Unknown",r));return wt({},n,i)}function rc(t){return t=(t=t.stateNode)&&t.__reactInternalMemoizedMergedChildContext||Nr,hs=rn.current,ht(rn,t),ht(wn,wn.current),!0}function r0(t,e,n){var i=t.stateNode;if(!i)throw Error(ae(169));n?(t=Zx(t,e,hs),i.__reactInternalMemoizedMergedChildContext=t,_t(wn),_t(rn),ht(rn,t)):_t(wn),ht(wn,n)}var Bi=null,Vc=!1,If=!1;function Jx(t){Bi===null?Bi=[t]:Bi.push(t)}function ZE(t){Vc=!0,Jx(t)}function Br(){if(!If&&Bi!==null){If=!0;var t=0,e=lt;try{var n=Bi;for(lt=1;t<n.length;t++){var i=n[t];do i=i(!0);while(i!==null)}Bi=null,Vc=!1}catch(r){throw Bi!==null&&(Bi=Bi.slice(t+1)),Ex(Yp,Br),r}finally{lt=e,If=!1}}return null}var qs=[],Ks=0,sc=null,oc=0,qn=[],Kn=0,ps=null,Hi=1,Vi="";function Kr(t,e){qs[Ks++]=oc,qs[Ks++]=sc,sc=t,oc=e}function Qx(t,e,n){qn[Kn++]=Hi,qn[Kn++]=Vi,qn[Kn++]=ps,ps=t;var i=Hi;t=Vi;var r=32-hi(i)-1;i&=~(1<<r),n+=1;var s=32-hi(e)+r;if(30<s){var o=r-r%5;s=(i&(1<<o)-1).toString(32),i>>=o,r-=o,Hi=1<<32-hi(e)+r|n<<r|i,Vi=s+t}else Hi=1<<s|n<<r|i,Vi=t}function im(t){t.return!==null&&(Kr(t,1),Qx(t,1,0))}function rm(t){for(;t===sc;)sc=qs[--Ks],qs[Ks]=null,oc=qs[--Ks],qs[Ks]=null;for(;t===ps;)ps=qn[--Kn],qn[Kn]=null,Vi=qn[--Kn],qn[Kn]=null,Hi=qn[--Kn],qn[Kn]=null}var zn=null,Bn=null,xt=!1,ui=null;function ey(t,e){var n=Zn(5,null,null,0);n.elementType="DELETED",n.stateNode=e,n.return=t,e=t.deletions,e===null?(t.deletions=[n],t.flags|=16):e.push(n)}function s0(t,e){switch(t.tag){case 5:var n=t.type;return e=e.nodeType!==1||n.toLowerCase()!==e.nodeName.toLowerCase()?null:e,e!==null?(t.stateNode=e,zn=t,Bn=Cr(e.firstChild),!0):!1;case 6:return e=t.pendingProps===""||e.nodeType!==3?null:e,e!==null?(t.stateNode=e,zn=t,Bn=null,!0):!1;case 13:return e=e.nodeType!==8?null:e,e!==null?(n=ps!==null?{id:Hi,overflow:Vi}:null,t.memoizedState={dehydrated:e,treeContext:n,retryLane:1073741824},n=Zn(18,null,null,0),n.stateNode=e,n.return=t,t.child=n,zn=t,Bn=null,!0):!1;default:return!1}}function fh(t){return(t.mode&1)!==0&&(t.flags&128)===0}function dh(t){if(xt){var e=Bn;if(e){var n=e;if(!s0(t,e)){if(fh(t))throw Error(ae(418));e=Cr(n.nextSibling);var i=zn;e&&s0(t,e)?ey(i,n):(t.flags=t.flags&-4097|2,xt=!1,zn=t)}}else{if(fh(t))throw Error(ae(418));t.flags=t.flags&-4097|2,xt=!1,zn=t}}}function o0(t){for(t=t.return;t!==null&&t.tag!==5&&t.tag!==3&&t.tag!==13;)t=t.return;zn=t}function Ll(t){if(t!==zn)return!1;if(!xt)return o0(t),xt=!0,!1;var e;if((e=t.tag!==3)&&!(e=t.tag!==5)&&(e=t.type,e=e!=="head"&&e!=="body"&&!ah(t.type,t.memoizedProps)),e&&(e=Bn)){if(fh(t))throw ty(),Error(ae(418));for(;e;)ey(t,e),e=Cr(e.nextSibling)}if(o0(t),t.tag===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(ae(317));e:{for(t=t.nextSibling,e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="/$"){if(e===0){Bn=Cr(t.nextSibling);break e}e--}else n!=="$"&&n!=="$!"&&n!=="$?"||e++}t=t.nextSibling}Bn=null}}else Bn=zn?Cr(t.stateNode.nextSibling):null;return!0}function ty(){for(var t=Bn;t;)t=Cr(t.nextSibling)}function vo(){Bn=zn=null,xt=!1}function sm(t){ui===null?ui=[t]:ui.push(t)}var JE=tr.ReactCurrentBatchConfig;function $o(t,e,n){if(t=n.ref,t!==null&&typeof t!="function"&&typeof t!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(ae(309));var i=n.stateNode}if(!i)throw Error(ae(147,t));var r=i,s=""+t;return e!==null&&e.ref!==null&&typeof e.ref=="function"&&e.ref._stringRef===s?e.ref:(e=function(o){var a=r.refs;o===null?delete a[s]:a[s]=o},e._stringRef=s,e)}if(typeof t!="string")throw Error(ae(284));if(!n._owner)throw Error(ae(290,t))}return t}function Dl(t,e){throw t=Object.prototype.toString.call(e),Error(ae(31,t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t))}function a0(t){var e=t._init;return e(t._payload)}function ny(t){function e(h,_){if(t){var v=h.deletions;v===null?(h.deletions=[_],h.flags|=16):v.push(_)}}function n(h,_){if(!t)return null;for(;_!==null;)e(h,_),_=_.sibling;return null}function i(h,_){for(h=new Map;_!==null;)_.key!==null?h.set(_.key,_):h.set(_.index,_),_=_.sibling;return h}function r(h,_){return h=br(h,_),h.index=0,h.sibling=null,h}function s(h,_,v){return h.index=v,t?(v=h.alternate,v!==null?(v=v.index,v<_?(h.flags|=2,_):v):(h.flags|=2,_)):(h.flags|=1048576,_)}function o(h){return t&&h.alternate===null&&(h.flags|=2),h}function a(h,_,v,E){return _===null||_.tag!==6?(_=zf(v,h.mode,E),_.return=h,_):(_=r(_,v),_.return=h,_)}function l(h,_,v,E){var b=v.type;return b===Gs?c(h,_,v.props.children,E,v.key):_!==null&&(_.elementType===b||typeof b=="object"&&b!==null&&b.$$typeof===dr&&a0(b)===_.type)?(E=r(_,v.props),E.ref=$o(h,_,v),E.return=h,E):(E=Cu(v.type,v.key,v.props,null,h.mode,E),E.ref=$o(h,_,v),E.return=h,E)}function u(h,_,v,E){return _===null||_.tag!==4||_.stateNode.containerInfo!==v.containerInfo||_.stateNode.implementation!==v.implementation?(_=Hf(v,h.mode,E),_.return=h,_):(_=r(_,v.children||[]),_.return=h,_)}function c(h,_,v,E,b){return _===null||_.tag!==7?(_=ds(v,h.mode,E,b),_.return=h,_):(_=r(_,v),_.return=h,_)}function f(h,_,v){if(typeof _=="string"&&_!==""||typeof _=="number")return _=zf(""+_,h.mode,v),_.return=h,_;if(typeof _=="object"&&_!==null){switch(_.$$typeof){case Sl:return v=Cu(_.type,_.key,_.props,null,h.mode,v),v.ref=$o(h,null,_),v.return=h,v;case Vs:return _=Hf(_,h.mode,v),_.return=h,_;case dr:var E=_._init;return f(h,E(_._payload),v)}if(sa(_)||zo(_))return _=ds(_,h.mode,v,null),_.return=h,_;Dl(h,_)}return null}function d(h,_,v,E){var b=_!==null?_.key:null;if(typeof v=="string"&&v!==""||typeof v=="number")return b!==null?null:a(h,_,""+v,E);if(typeof v=="object"&&v!==null){switch(v.$$typeof){case Sl:return v.key===b?l(h,_,v,E):null;case Vs:return v.key===b?u(h,_,v,E):null;case dr:return b=v._init,d(h,_,b(v._payload),E)}if(sa(v)||zo(v))return b!==null?null:c(h,_,v,E,null);Dl(h,v)}return null}function p(h,_,v,E,b){if(typeof E=="string"&&E!==""||typeof E=="number")return h=h.get(v)||null,a(_,h,""+E,b);if(typeof E=="object"&&E!==null){switch(E.$$typeof){case Sl:return h=h.get(E.key===null?v:E.key)||null,l(_,h,E,b);case Vs:return h=h.get(E.key===null?v:E.key)||null,u(_,h,E,b);case dr:var R=E._init;return p(h,_,v,R(E._payload),b)}if(sa(E)||zo(E))return h=h.get(v)||null,c(_,h,E,b,null);Dl(_,E)}return null}function g(h,_,v,E){for(var b=null,R=null,C=_,P=_=0,Q=null;C!==null&&P<v.length;P++){C.index>P?(Q=C,C=null):Q=C.sibling;var y=d(h,C,v[P],E);if(y===null){C===null&&(C=Q);break}t&&C&&y.alternate===null&&e(h,C),_=s(y,_,P),R===null?b=y:R.sibling=y,R=y,C=Q}if(P===v.length)return n(h,C),xt&&Kr(h,P),b;if(C===null){for(;P<v.length;P++)C=f(h,v[P],E),C!==null&&(_=s(C,_,P),R===null?b=C:R.sibling=C,R=C);return xt&&Kr(h,P),b}for(C=i(h,C);P<v.length;P++)Q=p(C,h,P,v[P],E),Q!==null&&(t&&Q.alternate!==null&&C.delete(Q.key===null?P:Q.key),_=s(Q,_,P),R===null?b=Q:R.sibling=Q,R=Q);return t&&C.forEach(function(w){return e(h,w)}),xt&&Kr(h,P),b}function S(h,_,v,E){var b=zo(v);if(typeof b!="function")throw Error(ae(150));if(v=b.call(v),v==null)throw Error(ae(151));for(var R=b=null,C=_,P=_=0,Q=null,y=v.next();C!==null&&!y.done;P++,y=v.next()){C.index>P?(Q=C,C=null):Q=C.sibling;var w=d(h,C,y.value,E);if(w===null){C===null&&(C=Q);break}t&&C&&w.alternate===null&&e(h,C),_=s(w,_,P),R===null?b=w:R.sibling=w,R=w,C=Q}if(y.done)return n(h,C),xt&&Kr(h,P),b;if(C===null){for(;!y.done;P++,y=v.next())y=f(h,y.value,E),y!==null&&(_=s(y,_,P),R===null?b=y:R.sibling=y,R=y);return xt&&Kr(h,P),b}for(C=i(h,C);!y.done;P++,y=v.next())y=p(C,h,P,y.value,E),y!==null&&(t&&y.alternate!==null&&C.delete(y.key===null?P:y.key),_=s(y,_,P),R===null?b=y:R.sibling=y,R=y);return t&&C.forEach(function($){return e(h,$)}),xt&&Kr(h,P),b}function m(h,_,v,E){if(typeof v=="object"&&v!==null&&v.type===Gs&&v.key===null&&(v=v.props.children),typeof v=="object"&&v!==null){switch(v.$$typeof){case Sl:e:{for(var b=v.key,R=_;R!==null;){if(R.key===b){if(b=v.type,b===Gs){if(R.tag===7){n(h,R.sibling),_=r(R,v.props.children),_.return=h,h=_;break e}}else if(R.elementType===b||typeof b=="object"&&b!==null&&b.$$typeof===dr&&a0(b)===R.type){n(h,R.sibling),_=r(R,v.props),_.ref=$o(h,R,v),_.return=h,h=_;break e}n(h,R);break}else e(h,R);R=R.sibling}v.type===Gs?(_=ds(v.props.children,h.mode,E,v.key),_.return=h,h=_):(E=Cu(v.type,v.key,v.props,null,h.mode,E),E.ref=$o(h,_,v),E.return=h,h=E)}return o(h);case Vs:e:{for(R=v.key;_!==null;){if(_.key===R)if(_.tag===4&&_.stateNode.containerInfo===v.containerInfo&&_.stateNode.implementation===v.implementation){n(h,_.sibling),_=r(_,v.children||[]),_.return=h,h=_;break e}else{n(h,_);break}else e(h,_);_=_.sibling}_=Hf(v,h.mode,E),_.return=h,h=_}return o(h);case dr:return R=v._init,m(h,_,R(v._payload),E)}if(sa(v))return g(h,_,v,E);if(zo(v))return S(h,_,v,E);Dl(h,v)}return typeof v=="string"&&v!==""||typeof v=="number"?(v=""+v,_!==null&&_.tag===6?(n(h,_.sibling),_=r(_,v),_.return=h,h=_):(n(h,_),_=zf(v,h.mode,E),_.return=h,h=_),o(h)):n(h,_)}return m}var _o=ny(!0),iy=ny(!1),ac=Or(null),lc=null,Zs=null,om=null;function am(){om=Zs=lc=null}function lm(t){var e=ac.current;_t(ac),t._currentValue=e}function hh(t,e,n){for(;t!==null;){var i=t.alternate;if((t.childLanes&e)!==e?(t.childLanes|=e,i!==null&&(i.childLanes|=e)):i!==null&&(i.childLanes&e)!==e&&(i.childLanes|=e),t===n)break;t=t.return}}function lo(t,e){lc=t,om=Zs=null,t=t.dependencies,t!==null&&t.firstContext!==null&&(t.lanes&e&&(En=!0),t.firstContext=null)}function ei(t){var e=t._currentValue;if(om!==t)if(t={context:t,memoizedValue:e,next:null},Zs===null){if(lc===null)throw Error(ae(308));Zs=t,lc.dependencies={lanes:0,firstContext:t}}else Zs=Zs.next=t;return e}var os=null;function um(t){os===null?os=[t]:os.push(t)}function ry(t,e,n,i){var r=e.interleaved;return r===null?(n.next=n,um(e)):(n.next=r.next,r.next=n),e.interleaved=n,qi(t,i)}function qi(t,e){t.lanes|=e;var n=t.alternate;for(n!==null&&(n.lanes|=e),n=t,t=t.return;t!==null;)t.childLanes|=e,n=t.alternate,n!==null&&(n.childLanes|=e),n=t,t=t.return;return n.tag===3?n.stateNode:null}var hr=!1;function cm(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function sy(t,e){t=t.updateQueue,e.updateQueue===t&&(e.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,effects:t.effects})}function $i(t,e){return{eventTime:t,lane:e,tag:0,payload:null,callback:null,next:null}}function Ar(t,e,n){var i=t.updateQueue;if(i===null)return null;if(i=i.shared,tt&2){var r=i.pending;return r===null?e.next=e:(e.next=r.next,r.next=e),i.pending=e,qi(t,n)}return r=i.interleaved,r===null?(e.next=e,um(i)):(e.next=r.next,r.next=e),i.interleaved=e,qi(t,n)}function yu(t,e,n){if(e=e.updateQueue,e!==null&&(e=e.shared,(n&4194240)!==0)){var i=e.lanes;i&=t.pendingLanes,n|=i,e.lanes=n,qp(t,n)}}function l0(t,e){var n=t.updateQueue,i=t.alternate;if(i!==null&&(i=i.updateQueue,n===i)){var r=null,s=null;if(n=n.firstBaseUpdate,n!==null){do{var o={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};s===null?r=s=o:s=s.next=o,n=n.next}while(n!==null);s===null?r=s=e:s=s.next=e}else r=s=e;n={baseState:i.baseState,firstBaseUpdate:r,lastBaseUpdate:s,shared:i.shared,effects:i.effects},t.updateQueue=n;return}t=n.lastBaseUpdate,t===null?n.firstBaseUpdate=e:t.next=e,n.lastBaseUpdate=e}function uc(t,e,n,i){var r=t.updateQueue;hr=!1;var s=r.firstBaseUpdate,o=r.lastBaseUpdate,a=r.shared.pending;if(a!==null){r.shared.pending=null;var l=a,u=l.next;l.next=null,o===null?s=u:o.next=u,o=l;var c=t.alternate;c!==null&&(c=c.updateQueue,a=c.lastBaseUpdate,a!==o&&(a===null?c.firstBaseUpdate=u:a.next=u,c.lastBaseUpdate=l))}if(s!==null){var f=r.baseState;o=0,c=u=l=null,a=s;do{var d=a.lane,p=a.eventTime;if((i&d)===d){c!==null&&(c=c.next={eventTime:p,lane:0,tag:a.tag,payload:a.payload,callback:a.callback,next:null});e:{var g=t,S=a;switch(d=e,p=n,S.tag){case 1:if(g=S.payload,typeof g=="function"){f=g.call(p,f,d);break e}f=g;break e;case 3:g.flags=g.flags&-65537|128;case 0:if(g=S.payload,d=typeof g=="function"?g.call(p,f,d):g,d==null)break e;f=wt({},f,d);break e;case 2:hr=!0}}a.callback!==null&&a.lane!==0&&(t.flags|=64,d=r.effects,d===null?r.effects=[a]:d.push(a))}else p={eventTime:p,lane:d,tag:a.tag,payload:a.payload,callback:a.callback,next:null},c===null?(u=c=p,l=f):c=c.next=p,o|=d;if(a=a.next,a===null){if(a=r.shared.pending,a===null)break;d=a,a=d.next,d.next=null,r.lastBaseUpdate=d,r.shared.pending=null}}while(!0);if(c===null&&(l=f),r.baseState=l,r.firstBaseUpdate=u,r.lastBaseUpdate=c,e=r.shared.interleaved,e!==null){r=e;do o|=r.lane,r=r.next;while(r!==e)}else s===null&&(r.shared.lanes=0);gs|=o,t.lanes=o,t.memoizedState=f}}function u0(t,e,n){if(t=e.effects,e.effects=null,t!==null)for(e=0;e<t.length;e++){var i=t[e],r=i.callback;if(r!==null){if(i.callback=null,i=n,typeof r!="function")throw Error(ae(191,r));r.call(i)}}}var hl={},Ti=Or(hl),$a=Or(hl),Xa=Or(hl);function as(t){if(t===hl)throw Error(ae(174));return t}function fm(t,e){switch(ht(Xa,e),ht($a,t),ht(Ti,hl),t=e.nodeType,t){case 9:case 11:e=(e=e.documentElement)?e.namespaceURI:jd(null,"");break;default:t=t===8?e.parentNode:e,e=t.namespaceURI||null,t=t.tagName,e=jd(e,t)}_t(Ti),ht(Ti,e)}function xo(){_t(Ti),_t($a),_t(Xa)}function oy(t){as(Xa.current);var e=as(Ti.current),n=jd(e,t.type);e!==n&&(ht($a,t),ht(Ti,n))}function dm(t){$a.current===t&&(_t(Ti),_t($a))}var St=Or(0);function cc(t){for(var e=t;e!==null;){if(e.tag===13){var n=e.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return e}else if(e.tag===19&&e.memoizedProps.revealOrder!==void 0){if(e.flags&128)return e}else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return null;e=e.return}e.sibling.return=e.return,e=e.sibling}return null}var Nf=[];function hm(){for(var t=0;t<Nf.length;t++)Nf[t]._workInProgressVersionPrimary=null;Nf.length=0}var Su=tr.ReactCurrentDispatcher,Uf=tr.ReactCurrentBatchConfig,ms=0,Et=null,Nt=null,Vt=null,fc=!1,Ma=!1,ja=0,QE=0;function Zt(){throw Error(ae(321))}function pm(t,e){if(e===null)return!1;for(var n=0;n<e.length&&n<t.length;n++)if(!mi(t[n],e[n]))return!1;return!0}function mm(t,e,n,i,r,s){if(ms=s,Et=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,Su.current=t===null||t.memoizedState===null?iw:rw,t=n(i,r),Ma){s=0;do{if(Ma=!1,ja=0,25<=s)throw Error(ae(301));s+=1,Vt=Nt=null,e.updateQueue=null,Su.current=sw,t=n(i,r)}while(Ma)}if(Su.current=dc,e=Nt!==null&&Nt.next!==null,ms=0,Vt=Nt=Et=null,fc=!1,e)throw Error(ae(300));return t}function gm(){var t=ja!==0;return ja=0,t}function Si(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Vt===null?Et.memoizedState=Vt=t:Vt=Vt.next=t,Vt}function ti(){if(Nt===null){var t=Et.alternate;t=t!==null?t.memoizedState:null}else t=Nt.next;var e=Vt===null?Et.memoizedState:Vt.next;if(e!==null)Vt=e,Nt=t;else{if(t===null)throw Error(ae(310));Nt=t,t={memoizedState:Nt.memoizedState,baseState:Nt.baseState,baseQueue:Nt.baseQueue,queue:Nt.queue,next:null},Vt===null?Et.memoizedState=Vt=t:Vt=Vt.next=t}return Vt}function Ya(t,e){return typeof e=="function"?e(t):e}function kf(t){var e=ti(),n=e.queue;if(n===null)throw Error(ae(311));n.lastRenderedReducer=t;var i=Nt,r=i.baseQueue,s=n.pending;if(s!==null){if(r!==null){var o=r.next;r.next=s.next,s.next=o}i.baseQueue=r=s,n.pending=null}if(r!==null){s=r.next,i=i.baseState;var a=o=null,l=null,u=s;do{var c=u.lane;if((ms&c)===c)l!==null&&(l=l.next={lane:0,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null}),i=u.hasEagerState?u.eagerState:t(i,u.action);else{var f={lane:c,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null};l===null?(a=l=f,o=i):l=l.next=f,Et.lanes|=c,gs|=c}u=u.next}while(u!==null&&u!==s);l===null?o=i:l.next=a,mi(i,e.memoizedState)||(En=!0),e.memoizedState=i,e.baseState=o,e.baseQueue=l,n.lastRenderedState=i}if(t=n.interleaved,t!==null){r=t;do s=r.lane,Et.lanes|=s,gs|=s,r=r.next;while(r!==t)}else r===null&&(n.lanes=0);return[e.memoizedState,n.dispatch]}function Ff(t){var e=ti(),n=e.queue;if(n===null)throw Error(ae(311));n.lastRenderedReducer=t;var i=n.dispatch,r=n.pending,s=e.memoizedState;if(r!==null){n.pending=null;var o=r=r.next;do s=t(s,o.action),o=o.next;while(o!==r);mi(s,e.memoizedState)||(En=!0),e.memoizedState=s,e.baseQueue===null&&(e.baseState=s),n.lastRenderedState=s}return[s,i]}function ay(){}function ly(t,e){var n=Et,i=ti(),r=e(),s=!mi(i.memoizedState,r);if(s&&(i.memoizedState=r,En=!0),i=i.queue,vm(fy.bind(null,n,i,t),[t]),i.getSnapshot!==e||s||Vt!==null&&Vt.memoizedState.tag&1){if(n.flags|=2048,qa(9,cy.bind(null,n,i,r,e),void 0,null),Gt===null)throw Error(ae(349));ms&30||uy(n,e,r)}return r}function uy(t,e,n){t.flags|=16384,t={getSnapshot:e,value:n},e=Et.updateQueue,e===null?(e={lastEffect:null,stores:null},Et.updateQueue=e,e.stores=[t]):(n=e.stores,n===null?e.stores=[t]:n.push(t))}function cy(t,e,n,i){e.value=n,e.getSnapshot=i,dy(e)&&hy(t)}function fy(t,e,n){return n(function(){dy(e)&&hy(t)})}function dy(t){var e=t.getSnapshot;t=t.value;try{var n=e();return!mi(t,n)}catch{return!0}}function hy(t){var e=qi(t,1);e!==null&&pi(e,t,1,-1)}function c0(t){var e=Si();return typeof t=="function"&&(t=t()),e.memoizedState=e.baseState=t,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Ya,lastRenderedState:t},e.queue=t,t=t.dispatch=nw.bind(null,Et,t),[e.memoizedState,t]}function qa(t,e,n,i){return t={tag:t,create:e,destroy:n,deps:i,next:null},e=Et.updateQueue,e===null?(e={lastEffect:null,stores:null},Et.updateQueue=e,e.lastEffect=t.next=t):(n=e.lastEffect,n===null?e.lastEffect=t.next=t:(i=n.next,n.next=t,t.next=i,e.lastEffect=t)),t}function py(){return ti().memoizedState}function Mu(t,e,n,i){var r=Si();Et.flags|=t,r.memoizedState=qa(1|e,n,void 0,i===void 0?null:i)}function Gc(t,e,n,i){var r=ti();i=i===void 0?null:i;var s=void 0;if(Nt!==null){var o=Nt.memoizedState;if(s=o.destroy,i!==null&&pm(i,o.deps)){r.memoizedState=qa(e,n,s,i);return}}Et.flags|=t,r.memoizedState=qa(1|e,n,s,i)}function f0(t,e){return Mu(8390656,8,t,e)}function vm(t,e){return Gc(2048,8,t,e)}function my(t,e){return Gc(4,2,t,e)}function gy(t,e){return Gc(4,4,t,e)}function vy(t,e){if(typeof e=="function")return t=t(),e(t),function(){e(null)};if(e!=null)return t=t(),e.current=t,function(){e.current=null}}function _y(t,e,n){return n=n!=null?n.concat([t]):null,Gc(4,4,vy.bind(null,e,t),n)}function _m(){}function xy(t,e){var n=ti();e=e===void 0?null:e;var i=n.memoizedState;return i!==null&&e!==null&&pm(e,i[1])?i[0]:(n.memoizedState=[t,e],t)}function yy(t,e){var n=ti();e=e===void 0?null:e;var i=n.memoizedState;return i!==null&&e!==null&&pm(e,i[1])?i[0]:(t=t(),n.memoizedState=[t,e],t)}function Sy(t,e,n){return ms&21?(mi(n,e)||(n=Cx(),Et.lanes|=n,gs|=n,t.baseState=!0),e):(t.baseState&&(t.baseState=!1,En=!0),t.memoizedState=n)}function ew(t,e){var n=lt;lt=n!==0&&4>n?n:4,t(!0);var i=Uf.transition;Uf.transition={};try{t(!1),e()}finally{lt=n,Uf.transition=i}}function My(){return ti().memoizedState}function tw(t,e,n){var i=Pr(t);if(n={lane:i,action:n,hasEagerState:!1,eagerState:null,next:null},Ey(t))wy(e,n);else if(n=ry(t,e,n,i),n!==null){var r=un();pi(n,t,i,r),Ty(n,e,i)}}function nw(t,e,n){var i=Pr(t),r={lane:i,action:n,hasEagerState:!1,eagerState:null,next:null};if(Ey(t))wy(e,r);else{var s=t.alternate;if(t.lanes===0&&(s===null||s.lanes===0)&&(s=e.lastRenderedReducer,s!==null))try{var o=e.lastRenderedState,a=s(o,n);if(r.hasEagerState=!0,r.eagerState=a,mi(a,o)){var l=e.interleaved;l===null?(r.next=r,um(e)):(r.next=l.next,l.next=r),e.interleaved=r;return}}catch{}finally{}n=ry(t,e,r,i),n!==null&&(r=un(),pi(n,t,i,r),Ty(n,e,i))}}function Ey(t){var e=t.alternate;return t===Et||e!==null&&e===Et}function wy(t,e){Ma=fc=!0;var n=t.pending;n===null?e.next=e:(e.next=n.next,n.next=e),t.pending=e}function Ty(t,e,n){if(n&4194240){var i=e.lanes;i&=t.pendingLanes,n|=i,e.lanes=n,qp(t,n)}}var dc={readContext:ei,useCallback:Zt,useContext:Zt,useEffect:Zt,useImperativeHandle:Zt,useInsertionEffect:Zt,useLayoutEffect:Zt,useMemo:Zt,useReducer:Zt,useRef:Zt,useState:Zt,useDebugValue:Zt,useDeferredValue:Zt,useTransition:Zt,useMutableSource:Zt,useSyncExternalStore:Zt,useId:Zt,unstable_isNewReconciler:!1},iw={readContext:ei,useCallback:function(t,e){return Si().memoizedState=[t,e===void 0?null:e],t},useContext:ei,useEffect:f0,useImperativeHandle:function(t,e,n){return n=n!=null?n.concat([t]):null,Mu(4194308,4,vy.bind(null,e,t),n)},useLayoutEffect:function(t,e){return Mu(4194308,4,t,e)},useInsertionEffect:function(t,e){return Mu(4,2,t,e)},useMemo:function(t,e){var n=Si();return e=e===void 0?null:e,t=t(),n.memoizedState=[t,e],t},useReducer:function(t,e,n){var i=Si();return e=n!==void 0?n(e):e,i.memoizedState=i.baseState=e,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:e},i.queue=t,t=t.dispatch=tw.bind(null,Et,t),[i.memoizedState,t]},useRef:function(t){var e=Si();return t={current:t},e.memoizedState=t},useState:c0,useDebugValue:_m,useDeferredValue:function(t){return Si().memoizedState=t},useTransition:function(){var t=c0(!1),e=t[0];return t=ew.bind(null,t[1]),Si().memoizedState=t,[e,t]},useMutableSource:function(){},useSyncExternalStore:function(t,e,n){var i=Et,r=Si();if(xt){if(n===void 0)throw Error(ae(407));n=n()}else{if(n=e(),Gt===null)throw Error(ae(349));ms&30||uy(i,e,n)}r.memoizedState=n;var s={value:n,getSnapshot:e};return r.queue=s,f0(fy.bind(null,i,s,t),[t]),i.flags|=2048,qa(9,cy.bind(null,i,s,n,e),void 0,null),n},useId:function(){var t=Si(),e=Gt.identifierPrefix;if(xt){var n=Vi,i=Hi;n=(i&~(1<<32-hi(i)-1)).toString(32)+n,e=":"+e+"R"+n,n=ja++,0<n&&(e+="H"+n.toString(32)),e+=":"}else n=QE++,e=":"+e+"r"+n.toString(32)+":";return t.memoizedState=e},unstable_isNewReconciler:!1},rw={readContext:ei,useCallback:xy,useContext:ei,useEffect:vm,useImperativeHandle:_y,useInsertionEffect:my,useLayoutEffect:gy,useMemo:yy,useReducer:kf,useRef:py,useState:function(){return kf(Ya)},useDebugValue:_m,useDeferredValue:function(t){var e=ti();return Sy(e,Nt.memoizedState,t)},useTransition:function(){var t=kf(Ya)[0],e=ti().memoizedState;return[t,e]},useMutableSource:ay,useSyncExternalStore:ly,useId:My,unstable_isNewReconciler:!1},sw={readContext:ei,useCallback:xy,useContext:ei,useEffect:vm,useImperativeHandle:_y,useInsertionEffect:my,useLayoutEffect:gy,useMemo:yy,useReducer:Ff,useRef:py,useState:function(){return Ff(Ya)},useDebugValue:_m,useDeferredValue:function(t){var e=ti();return Nt===null?e.memoizedState=t:Sy(e,Nt.memoizedState,t)},useTransition:function(){var t=Ff(Ya)[0],e=ti().memoizedState;return[t,e]},useMutableSource:ay,useSyncExternalStore:ly,useId:My,unstable_isNewReconciler:!1};function ai(t,e){if(t&&t.defaultProps){e=wt({},e),t=t.defaultProps;for(var n in t)e[n]===void 0&&(e[n]=t[n]);return e}return e}function ph(t,e,n,i){e=t.memoizedState,n=n(i,e),n=n==null?e:wt({},e,n),t.memoizedState=n,t.lanes===0&&(t.updateQueue.baseState=n)}var Wc={isMounted:function(t){return(t=t._reactInternals)?Ms(t)===t:!1},enqueueSetState:function(t,e,n){t=t._reactInternals;var i=un(),r=Pr(t),s=$i(i,r);s.payload=e,n!=null&&(s.callback=n),e=Ar(t,s,r),e!==null&&(pi(e,t,r,i),yu(e,t,r))},enqueueReplaceState:function(t,e,n){t=t._reactInternals;var i=un(),r=Pr(t),s=$i(i,r);s.tag=1,s.payload=e,n!=null&&(s.callback=n),e=Ar(t,s,r),e!==null&&(pi(e,t,r,i),yu(e,t,r))},enqueueForceUpdate:function(t,e){t=t._reactInternals;var n=un(),i=Pr(t),r=$i(n,i);r.tag=2,e!=null&&(r.callback=e),e=Ar(t,r,i),e!==null&&(pi(e,t,i,n),yu(e,t,i))}};function d0(t,e,n,i,r,s,o){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(i,s,o):e.prototype&&e.prototype.isPureReactComponent?!Ha(n,i)||!Ha(r,s):!0}function Cy(t,e,n){var i=!1,r=Nr,s=e.contextType;return typeof s=="object"&&s!==null?s=ei(s):(r=Tn(e)?hs:rn.current,i=e.contextTypes,s=(i=i!=null)?go(t,r):Nr),e=new e(n,s),t.memoizedState=e.state!==null&&e.state!==void 0?e.state:null,e.updater=Wc,t.stateNode=e,e._reactInternals=t,i&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=r,t.__reactInternalMemoizedMaskedChildContext=s),e}function h0(t,e,n,i){t=e.state,typeof e.componentWillReceiveProps=="function"&&e.componentWillReceiveProps(n,i),typeof e.UNSAFE_componentWillReceiveProps=="function"&&e.UNSAFE_componentWillReceiveProps(n,i),e.state!==t&&Wc.enqueueReplaceState(e,e.state,null)}function mh(t,e,n,i){var r=t.stateNode;r.props=n,r.state=t.memoizedState,r.refs={},cm(t);var s=e.contextType;typeof s=="object"&&s!==null?r.context=ei(s):(s=Tn(e)?hs:rn.current,r.context=go(t,s)),r.state=t.memoizedState,s=e.getDerivedStateFromProps,typeof s=="function"&&(ph(t,e,s,n),r.state=t.memoizedState),typeof e.getDerivedStateFromProps=="function"||typeof r.getSnapshotBeforeUpdate=="function"||typeof r.UNSAFE_componentWillMount!="function"&&typeof r.componentWillMount!="function"||(e=r.state,typeof r.componentWillMount=="function"&&r.componentWillMount(),typeof r.UNSAFE_componentWillMount=="function"&&r.UNSAFE_componentWillMount(),e!==r.state&&Wc.enqueueReplaceState(r,r.state,null),uc(t,n,r,i),r.state=t.memoizedState),typeof r.componentDidMount=="function"&&(t.flags|=4194308)}function yo(t,e){try{var n="",i=e;do n+=IM(i),i=i.return;while(i);var r=n}catch(s){r=`
Error generating stack: `+s.message+`
`+s.stack}return{value:t,source:e,stack:r,digest:null}}function Of(t,e,n){return{value:t,source:null,stack:n??null,digest:e??null}}function gh(t,e){try{console.error(e.value)}catch(n){setTimeout(function(){throw n})}}var ow=typeof WeakMap=="function"?WeakMap:Map;function Ay(t,e,n){n=$i(-1,n),n.tag=3,n.payload={element:null};var i=e.value;return n.callback=function(){pc||(pc=!0,Ch=i),gh(t,e)},n}function Ry(t,e,n){n=$i(-1,n),n.tag=3;var i=t.type.getDerivedStateFromError;if(typeof i=="function"){var r=e.value;n.payload=function(){return i(r)},n.callback=function(){gh(t,e)}}var s=t.stateNode;return s!==null&&typeof s.componentDidCatch=="function"&&(n.callback=function(){gh(t,e),typeof i!="function"&&(Rr===null?Rr=new Set([this]):Rr.add(this));var o=e.stack;this.componentDidCatch(e.value,{componentStack:o!==null?o:""})}),n}function p0(t,e,n){var i=t.pingCache;if(i===null){i=t.pingCache=new ow;var r=new Set;i.set(e,r)}else r=i.get(e),r===void 0&&(r=new Set,i.set(e,r));r.has(n)||(r.add(n),t=yw.bind(null,t,e,n),e.then(t,t))}function m0(t){do{var e;if((e=t.tag===13)&&(e=t.memoizedState,e=e!==null?e.dehydrated!==null:!0),e)return t;t=t.return}while(t!==null);return null}function g0(t,e,n,i,r){return t.mode&1?(t.flags|=65536,t.lanes=r,t):(t===e?t.flags|=65536:(t.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(e=$i(-1,1),e.tag=2,Ar(n,e,1))),n.lanes|=1),t)}var aw=tr.ReactCurrentOwner,En=!1;function on(t,e,n,i){e.child=t===null?iy(e,null,n,i):_o(e,t.child,n,i)}function v0(t,e,n,i,r){n=n.render;var s=e.ref;return lo(e,r),i=mm(t,e,n,i,s,r),n=gm(),t!==null&&!En?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~r,Ki(t,e,r)):(xt&&n&&im(e),e.flags|=1,on(t,e,i,r),e.child)}function _0(t,e,n,i,r){if(t===null){var s=n.type;return typeof s=="function"&&!Cm(s)&&s.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(e.tag=15,e.type=s,Py(t,e,s,i,r)):(t=Cu(n.type,null,i,e,e.mode,r),t.ref=e.ref,t.return=e,e.child=t)}if(s=t.child,!(t.lanes&r)){var o=s.memoizedProps;if(n=n.compare,n=n!==null?n:Ha,n(o,i)&&t.ref===e.ref)return Ki(t,e,r)}return e.flags|=1,t=br(s,i),t.ref=e.ref,t.return=e,e.child=t}function Py(t,e,n,i,r){if(t!==null){var s=t.memoizedProps;if(Ha(s,i)&&t.ref===e.ref)if(En=!1,e.pendingProps=i=s,(t.lanes&r)!==0)t.flags&131072&&(En=!0);else return e.lanes=t.lanes,Ki(t,e,r)}return vh(t,e,n,i,r)}function by(t,e,n){var i=e.pendingProps,r=i.children,s=t!==null?t.memoizedState:null;if(i.mode==="hidden")if(!(e.mode&1))e.memoizedState={baseLanes:0,cachePool:null,transitions:null},ht(Qs,Nn),Nn|=n;else{if(!(n&1073741824))return t=s!==null?s.baseLanes|n:n,e.lanes=e.childLanes=1073741824,e.memoizedState={baseLanes:t,cachePool:null,transitions:null},e.updateQueue=null,ht(Qs,Nn),Nn|=t,null;e.memoizedState={baseLanes:0,cachePool:null,transitions:null},i=s!==null?s.baseLanes:n,ht(Qs,Nn),Nn|=i}else s!==null?(i=s.baseLanes|n,e.memoizedState=null):i=n,ht(Qs,Nn),Nn|=i;return on(t,e,r,n),e.child}function Ly(t,e){var n=e.ref;(t===null&&n!==null||t!==null&&t.ref!==n)&&(e.flags|=512,e.flags|=2097152)}function vh(t,e,n,i,r){var s=Tn(n)?hs:rn.current;return s=go(e,s),lo(e,r),n=mm(t,e,n,i,s,r),i=gm(),t!==null&&!En?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~r,Ki(t,e,r)):(xt&&i&&im(e),e.flags|=1,on(t,e,n,r),e.child)}function x0(t,e,n,i,r){if(Tn(n)){var s=!0;rc(e)}else s=!1;if(lo(e,r),e.stateNode===null)Eu(t,e),Cy(e,n,i),mh(e,n,i,r),i=!0;else if(t===null){var o=e.stateNode,a=e.memoizedProps;o.props=a;var l=o.context,u=n.contextType;typeof u=="object"&&u!==null?u=ei(u):(u=Tn(n)?hs:rn.current,u=go(e,u));var c=n.getDerivedStateFromProps,f=typeof c=="function"||typeof o.getSnapshotBeforeUpdate=="function";f||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(a!==i||l!==u)&&h0(e,o,i,u),hr=!1;var d=e.memoizedState;o.state=d,uc(e,i,o,r),l=e.memoizedState,a!==i||d!==l||wn.current||hr?(typeof c=="function"&&(ph(e,n,c,i),l=e.memoizedState),(a=hr||d0(e,n,a,i,d,l,u))?(f||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount()),typeof o.componentDidMount=="function"&&(e.flags|=4194308)):(typeof o.componentDidMount=="function"&&(e.flags|=4194308),e.memoizedProps=i,e.memoizedState=l),o.props=i,o.state=l,o.context=u,i=a):(typeof o.componentDidMount=="function"&&(e.flags|=4194308),i=!1)}else{o=e.stateNode,sy(t,e),a=e.memoizedProps,u=e.type===e.elementType?a:ai(e.type,a),o.props=u,f=e.pendingProps,d=o.context,l=n.contextType,typeof l=="object"&&l!==null?l=ei(l):(l=Tn(n)?hs:rn.current,l=go(e,l));var p=n.getDerivedStateFromProps;(c=typeof p=="function"||typeof o.getSnapshotBeforeUpdate=="function")||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(a!==f||d!==l)&&h0(e,o,i,l),hr=!1,d=e.memoizedState,o.state=d,uc(e,i,o,r);var g=e.memoizedState;a!==f||d!==g||wn.current||hr?(typeof p=="function"&&(ph(e,n,p,i),g=e.memoizedState),(u=hr||d0(e,n,u,i,d,g,l)||!1)?(c||typeof o.UNSAFE_componentWillUpdate!="function"&&typeof o.componentWillUpdate!="function"||(typeof o.componentWillUpdate=="function"&&o.componentWillUpdate(i,g,l),typeof o.UNSAFE_componentWillUpdate=="function"&&o.UNSAFE_componentWillUpdate(i,g,l)),typeof o.componentDidUpdate=="function"&&(e.flags|=4),typeof o.getSnapshotBeforeUpdate=="function"&&(e.flags|=1024)):(typeof o.componentDidUpdate!="function"||a===t.memoizedProps&&d===t.memoizedState||(e.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||a===t.memoizedProps&&d===t.memoizedState||(e.flags|=1024),e.memoizedProps=i,e.memoizedState=g),o.props=i,o.state=g,o.context=l,i=u):(typeof o.componentDidUpdate!="function"||a===t.memoizedProps&&d===t.memoizedState||(e.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||a===t.memoizedProps&&d===t.memoizedState||(e.flags|=1024),i=!1)}return _h(t,e,n,i,s,r)}function _h(t,e,n,i,r,s){Ly(t,e);var o=(e.flags&128)!==0;if(!i&&!o)return r&&r0(e,n,!1),Ki(t,e,s);i=e.stateNode,aw.current=e;var a=o&&typeof n.getDerivedStateFromError!="function"?null:i.render();return e.flags|=1,t!==null&&o?(e.child=_o(e,t.child,null,s),e.child=_o(e,null,a,s)):on(t,e,a,s),e.memoizedState=i.state,r&&r0(e,n,!0),e.child}function Dy(t){var e=t.stateNode;e.pendingContext?i0(t,e.pendingContext,e.pendingContext!==e.context):e.context&&i0(t,e.context,!1),fm(t,e.containerInfo)}function y0(t,e,n,i,r){return vo(),sm(r),e.flags|=256,on(t,e,n,i),e.child}var xh={dehydrated:null,treeContext:null,retryLane:0};function yh(t){return{baseLanes:t,cachePool:null,transitions:null}}function Iy(t,e,n){var i=e.pendingProps,r=St.current,s=!1,o=(e.flags&128)!==0,a;if((a=o)||(a=t!==null&&t.memoizedState===null?!1:(r&2)!==0),a?(s=!0,e.flags&=-129):(t===null||t.memoizedState!==null)&&(r|=1),ht(St,r&1),t===null)return dh(e),t=e.memoizedState,t!==null&&(t=t.dehydrated,t!==null)?(e.mode&1?t.data==="$!"?e.lanes=8:e.lanes=1073741824:e.lanes=1,null):(o=i.children,t=i.fallback,s?(i=e.mode,s=e.child,o={mode:"hidden",children:o},!(i&1)&&s!==null?(s.childLanes=0,s.pendingProps=o):s=jc(o,i,0,null),t=ds(t,i,n,null),s.return=e,t.return=e,s.sibling=t,e.child=s,e.child.memoizedState=yh(n),e.memoizedState=xh,t):xm(e,o));if(r=t.memoizedState,r!==null&&(a=r.dehydrated,a!==null))return lw(t,e,o,i,a,r,n);if(s){s=i.fallback,o=e.mode,r=t.child,a=r.sibling;var l={mode:"hidden",children:i.children};return!(o&1)&&e.child!==r?(i=e.child,i.childLanes=0,i.pendingProps=l,e.deletions=null):(i=br(r,l),i.subtreeFlags=r.subtreeFlags&14680064),a!==null?s=br(a,s):(s=ds(s,o,n,null),s.flags|=2),s.return=e,i.return=e,i.sibling=s,e.child=i,i=s,s=e.child,o=t.child.memoizedState,o=o===null?yh(n):{baseLanes:o.baseLanes|n,cachePool:null,transitions:o.transitions},s.memoizedState=o,s.childLanes=t.childLanes&~n,e.memoizedState=xh,i}return s=t.child,t=s.sibling,i=br(s,{mode:"visible",children:i.children}),!(e.mode&1)&&(i.lanes=n),i.return=e,i.sibling=null,t!==null&&(n=e.deletions,n===null?(e.deletions=[t],e.flags|=16):n.push(t)),e.child=i,e.memoizedState=null,i}function xm(t,e){return e=jc({mode:"visible",children:e},t.mode,0,null),e.return=t,t.child=e}function Il(t,e,n,i){return i!==null&&sm(i),_o(e,t.child,null,n),t=xm(e,e.pendingProps.children),t.flags|=2,e.memoizedState=null,t}function lw(t,e,n,i,r,s,o){if(n)return e.flags&256?(e.flags&=-257,i=Of(Error(ae(422))),Il(t,e,o,i)):e.memoizedState!==null?(e.child=t.child,e.flags|=128,null):(s=i.fallback,r=e.mode,i=jc({mode:"visible",children:i.children},r,0,null),s=ds(s,r,o,null),s.flags|=2,i.return=e,s.return=e,i.sibling=s,e.child=i,e.mode&1&&_o(e,t.child,null,o),e.child.memoizedState=yh(o),e.memoizedState=xh,s);if(!(e.mode&1))return Il(t,e,o,null);if(r.data==="$!"){if(i=r.nextSibling&&r.nextSibling.dataset,i)var a=i.dgst;return i=a,s=Error(ae(419)),i=Of(s,i,void 0),Il(t,e,o,i)}if(a=(o&t.childLanes)!==0,En||a){if(i=Gt,i!==null){switch(o&-o){case 4:r=2;break;case 16:r=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:r=32;break;case 536870912:r=268435456;break;default:r=0}r=r&(i.suspendedLanes|o)?0:r,r!==0&&r!==s.retryLane&&(s.retryLane=r,qi(t,r),pi(i,t,r,-1))}return Tm(),i=Of(Error(ae(421))),Il(t,e,o,i)}return r.data==="$?"?(e.flags|=128,e.child=t.child,e=Sw.bind(null,t),r._reactRetry=e,null):(t=s.treeContext,Bn=Cr(r.nextSibling),zn=e,xt=!0,ui=null,t!==null&&(qn[Kn++]=Hi,qn[Kn++]=Vi,qn[Kn++]=ps,Hi=t.id,Vi=t.overflow,ps=e),e=xm(e,i.children),e.flags|=4096,e)}function S0(t,e,n){t.lanes|=e;var i=t.alternate;i!==null&&(i.lanes|=e),hh(t.return,e,n)}function Bf(t,e,n,i,r){var s=t.memoizedState;s===null?t.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:i,tail:n,tailMode:r}:(s.isBackwards=e,s.rendering=null,s.renderingStartTime=0,s.last=i,s.tail=n,s.tailMode=r)}function Ny(t,e,n){var i=e.pendingProps,r=i.revealOrder,s=i.tail;if(on(t,e,i.children,n),i=St.current,i&2)i=i&1|2,e.flags|=128;else{if(t!==null&&t.flags&128)e:for(t=e.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&S0(t,n,e);else if(t.tag===19)S0(t,n,e);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;t=t.return}t.sibling.return=t.return,t=t.sibling}i&=1}if(ht(St,i),!(e.mode&1))e.memoizedState=null;else switch(r){case"forwards":for(n=e.child,r=null;n!==null;)t=n.alternate,t!==null&&cc(t)===null&&(r=n),n=n.sibling;n=r,n===null?(r=e.child,e.child=null):(r=n.sibling,n.sibling=null),Bf(e,!1,r,n,s);break;case"backwards":for(n=null,r=e.child,e.child=null;r!==null;){if(t=r.alternate,t!==null&&cc(t)===null){e.child=r;break}t=r.sibling,r.sibling=n,n=r,r=t}Bf(e,!0,n,null,s);break;case"together":Bf(e,!1,null,null,void 0);break;default:e.memoizedState=null}return e.child}function Eu(t,e){!(e.mode&1)&&t!==null&&(t.alternate=null,e.alternate=null,e.flags|=2)}function Ki(t,e,n){if(t!==null&&(e.dependencies=t.dependencies),gs|=e.lanes,!(n&e.childLanes))return null;if(t!==null&&e.child!==t.child)throw Error(ae(153));if(e.child!==null){for(t=e.child,n=br(t,t.pendingProps),e.child=n,n.return=e;t.sibling!==null;)t=t.sibling,n=n.sibling=br(t,t.pendingProps),n.return=e;n.sibling=null}return e.child}function uw(t,e,n){switch(e.tag){case 3:Dy(e),vo();break;case 5:oy(e);break;case 1:Tn(e.type)&&rc(e);break;case 4:fm(e,e.stateNode.containerInfo);break;case 10:var i=e.type._context,r=e.memoizedProps.value;ht(ac,i._currentValue),i._currentValue=r;break;case 13:if(i=e.memoizedState,i!==null)return i.dehydrated!==null?(ht(St,St.current&1),e.flags|=128,null):n&e.child.childLanes?Iy(t,e,n):(ht(St,St.current&1),t=Ki(t,e,n),t!==null?t.sibling:null);ht(St,St.current&1);break;case 19:if(i=(n&e.childLanes)!==0,t.flags&128){if(i)return Ny(t,e,n);e.flags|=128}if(r=e.memoizedState,r!==null&&(r.rendering=null,r.tail=null,r.lastEffect=null),ht(St,St.current),i)break;return null;case 22:case 23:return e.lanes=0,by(t,e,n)}return Ki(t,e,n)}var Uy,Sh,ky,Fy;Uy=function(t,e){for(var n=e.child;n!==null;){if(n.tag===5||n.tag===6)t.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};Sh=function(){};ky=function(t,e,n,i){var r=t.memoizedProps;if(r!==i){t=e.stateNode,as(Ti.current);var s=null;switch(n){case"input":r=Gd(t,r),i=Gd(t,i),s=[];break;case"select":r=wt({},r,{value:void 0}),i=wt({},i,{value:void 0}),s=[];break;case"textarea":r=Xd(t,r),i=Xd(t,i),s=[];break;default:typeof r.onClick!="function"&&typeof i.onClick=="function"&&(t.onclick=nc)}Yd(n,i);var o;n=null;for(u in r)if(!i.hasOwnProperty(u)&&r.hasOwnProperty(u)&&r[u]!=null)if(u==="style"){var a=r[u];for(o in a)a.hasOwnProperty(o)&&(n||(n={}),n[o]="")}else u!=="dangerouslySetInnerHTML"&&u!=="children"&&u!=="suppressContentEditableWarning"&&u!=="suppressHydrationWarning"&&u!=="autoFocus"&&(Na.hasOwnProperty(u)?s||(s=[]):(s=s||[]).push(u,null));for(u in i){var l=i[u];if(a=r?.[u],i.hasOwnProperty(u)&&l!==a&&(l!=null||a!=null))if(u==="style")if(a){for(o in a)!a.hasOwnProperty(o)||l&&l.hasOwnProperty(o)||(n||(n={}),n[o]="");for(o in l)l.hasOwnProperty(o)&&a[o]!==l[o]&&(n||(n={}),n[o]=l[o])}else n||(s||(s=[]),s.push(u,n)),n=l;else u==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,a=a?a.__html:void 0,l!=null&&a!==l&&(s=s||[]).push(u,l)):u==="children"?typeof l!="string"&&typeof l!="number"||(s=s||[]).push(u,""+l):u!=="suppressContentEditableWarning"&&u!=="suppressHydrationWarning"&&(Na.hasOwnProperty(u)?(l!=null&&u==="onScroll"&&mt("scroll",t),s||a===l||(s=[])):(s=s||[]).push(u,l))}n&&(s=s||[]).push("style",n);var u=s;(e.updateQueue=u)&&(e.flags|=4)}};Fy=function(t,e,n,i){n!==i&&(e.flags|=4)};function Xo(t,e){if(!xt)switch(t.tailMode){case"hidden":e=t.tail;for(var n=null;e!==null;)e.alternate!==null&&(n=e),e=e.sibling;n===null?t.tail=null:n.sibling=null;break;case"collapsed":n=t.tail;for(var i=null;n!==null;)n.alternate!==null&&(i=n),n=n.sibling;i===null?e||t.tail===null?t.tail=null:t.tail.sibling=null:i.sibling=null}}function Jt(t){var e=t.alternate!==null&&t.alternate.child===t.child,n=0,i=0;if(e)for(var r=t.child;r!==null;)n|=r.lanes|r.childLanes,i|=r.subtreeFlags&14680064,i|=r.flags&14680064,r.return=t,r=r.sibling;else for(r=t.child;r!==null;)n|=r.lanes|r.childLanes,i|=r.subtreeFlags,i|=r.flags,r.return=t,r=r.sibling;return t.subtreeFlags|=i,t.childLanes=n,e}function cw(t,e,n){var i=e.pendingProps;switch(rm(e),e.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Jt(e),null;case 1:return Tn(e.type)&&ic(),Jt(e),null;case 3:return i=e.stateNode,xo(),_t(wn),_t(rn),hm(),i.pendingContext&&(i.context=i.pendingContext,i.pendingContext=null),(t===null||t.child===null)&&(Ll(e)?e.flags|=4:t===null||t.memoizedState.isDehydrated&&!(e.flags&256)||(e.flags|=1024,ui!==null&&(Ph(ui),ui=null))),Sh(t,e),Jt(e),null;case 5:dm(e);var r=as(Xa.current);if(n=e.type,t!==null&&e.stateNode!=null)ky(t,e,n,i,r),t.ref!==e.ref&&(e.flags|=512,e.flags|=2097152);else{if(!i){if(e.stateNode===null)throw Error(ae(166));return Jt(e),null}if(t=as(Ti.current),Ll(e)){i=e.stateNode,n=e.type;var s=e.memoizedProps;switch(i[Ei]=e,i[Wa]=s,t=(e.mode&1)!==0,n){case"dialog":mt("cancel",i),mt("close",i);break;case"iframe":case"object":case"embed":mt("load",i);break;case"video":case"audio":for(r=0;r<aa.length;r++)mt(aa[r],i);break;case"source":mt("error",i);break;case"img":case"image":case"link":mt("error",i),mt("load",i);break;case"details":mt("toggle",i);break;case"input":bg(i,s),mt("invalid",i);break;case"select":i._wrapperState={wasMultiple:!!s.multiple},mt("invalid",i);break;case"textarea":Dg(i,s),mt("invalid",i)}Yd(n,s),r=null;for(var o in s)if(s.hasOwnProperty(o)){var a=s[o];o==="children"?typeof a=="string"?i.textContent!==a&&(s.suppressHydrationWarning!==!0&&bl(i.textContent,a,t),r=["children",a]):typeof a=="number"&&i.textContent!==""+a&&(s.suppressHydrationWarning!==!0&&bl(i.textContent,a,t),r=["children",""+a]):Na.hasOwnProperty(o)&&a!=null&&o==="onScroll"&&mt("scroll",i)}switch(n){case"input":Ml(i),Lg(i,s,!0);break;case"textarea":Ml(i),Ig(i);break;case"select":case"option":break;default:typeof s.onClick=="function"&&(i.onclick=nc)}i=r,e.updateQueue=i,i!==null&&(e.flags|=4)}else{o=r.nodeType===9?r:r.ownerDocument,t==="http://www.w3.org/1999/xhtml"&&(t=fx(n)),t==="http://www.w3.org/1999/xhtml"?n==="script"?(t=o.createElement("div"),t.innerHTML="<script><\/script>",t=t.removeChild(t.firstChild)):typeof i.is=="string"?t=o.createElement(n,{is:i.is}):(t=o.createElement(n),n==="select"&&(o=t,i.multiple?o.multiple=!0:i.size&&(o.size=i.size))):t=o.createElementNS(t,n),t[Ei]=e,t[Wa]=i,Uy(t,e,!1,!1),e.stateNode=t;e:{switch(o=qd(n,i),n){case"dialog":mt("cancel",t),mt("close",t),r=i;break;case"iframe":case"object":case"embed":mt("load",t),r=i;break;case"video":case"audio":for(r=0;r<aa.length;r++)mt(aa[r],t);r=i;break;case"source":mt("error",t),r=i;break;case"img":case"image":case"link":mt("error",t),mt("load",t),r=i;break;case"details":mt("toggle",t),r=i;break;case"input":bg(t,i),r=Gd(t,i),mt("invalid",t);break;case"option":r=i;break;case"select":t._wrapperState={wasMultiple:!!i.multiple},r=wt({},i,{value:void 0}),mt("invalid",t);break;case"textarea":Dg(t,i),r=Xd(t,i),mt("invalid",t);break;default:r=i}Yd(n,r),a=r;for(s in a)if(a.hasOwnProperty(s)){var l=a[s];s==="style"?px(t,l):s==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,l!=null&&dx(t,l)):s==="children"?typeof l=="string"?(n!=="textarea"||l!=="")&&Ua(t,l):typeof l=="number"&&Ua(t,""+l):s!=="suppressContentEditableWarning"&&s!=="suppressHydrationWarning"&&s!=="autoFocus"&&(Na.hasOwnProperty(s)?l!=null&&s==="onScroll"&&mt("scroll",t):l!=null&&Gp(t,s,l,o))}switch(n){case"input":Ml(t),Lg(t,i,!1);break;case"textarea":Ml(t),Ig(t);break;case"option":i.value!=null&&t.setAttribute("value",""+Ir(i.value));break;case"select":t.multiple=!!i.multiple,s=i.value,s!=null?ro(t,!!i.multiple,s,!1):i.defaultValue!=null&&ro(t,!!i.multiple,i.defaultValue,!0);break;default:typeof r.onClick=="function"&&(t.onclick=nc)}switch(n){case"button":case"input":case"select":case"textarea":i=!!i.autoFocus;break e;case"img":i=!0;break e;default:i=!1}}i&&(e.flags|=4)}e.ref!==null&&(e.flags|=512,e.flags|=2097152)}return Jt(e),null;case 6:if(t&&e.stateNode!=null)Fy(t,e,t.memoizedProps,i);else{if(typeof i!="string"&&e.stateNode===null)throw Error(ae(166));if(n=as(Xa.current),as(Ti.current),Ll(e)){if(i=e.stateNode,n=e.memoizedProps,i[Ei]=e,(s=i.nodeValue!==n)&&(t=zn,t!==null))switch(t.tag){case 3:bl(i.nodeValue,n,(t.mode&1)!==0);break;case 5:t.memoizedProps.suppressHydrationWarning!==!0&&bl(i.nodeValue,n,(t.mode&1)!==0)}s&&(e.flags|=4)}else i=(n.nodeType===9?n:n.ownerDocument).createTextNode(i),i[Ei]=e,e.stateNode=i}return Jt(e),null;case 13:if(_t(St),i=e.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(xt&&Bn!==null&&e.mode&1&&!(e.flags&128))ty(),vo(),e.flags|=98560,s=!1;else if(s=Ll(e),i!==null&&i.dehydrated!==null){if(t===null){if(!s)throw Error(ae(318));if(s=e.memoizedState,s=s!==null?s.dehydrated:null,!s)throw Error(ae(317));s[Ei]=e}else vo(),!(e.flags&128)&&(e.memoizedState=null),e.flags|=4;Jt(e),s=!1}else ui!==null&&(Ph(ui),ui=null),s=!0;if(!s)return e.flags&65536?e:null}return e.flags&128?(e.lanes=n,e):(i=i!==null,i!==(t!==null&&t.memoizedState!==null)&&i&&(e.child.flags|=8192,e.mode&1&&(t===null||St.current&1?Ut===0&&(Ut=3):Tm())),e.updateQueue!==null&&(e.flags|=4),Jt(e),null);case 4:return xo(),Sh(t,e),t===null&&Va(e.stateNode.containerInfo),Jt(e),null;case 10:return lm(e.type._context),Jt(e),null;case 17:return Tn(e.type)&&ic(),Jt(e),null;case 19:if(_t(St),s=e.memoizedState,s===null)return Jt(e),null;if(i=(e.flags&128)!==0,o=s.rendering,o===null)if(i)Xo(s,!1);else{if(Ut!==0||t!==null&&t.flags&128)for(t=e.child;t!==null;){if(o=cc(t),o!==null){for(e.flags|=128,Xo(s,!1),i=o.updateQueue,i!==null&&(e.updateQueue=i,e.flags|=4),e.subtreeFlags=0,i=n,n=e.child;n!==null;)s=n,t=i,s.flags&=14680066,o=s.alternate,o===null?(s.childLanes=0,s.lanes=t,s.child=null,s.subtreeFlags=0,s.memoizedProps=null,s.memoizedState=null,s.updateQueue=null,s.dependencies=null,s.stateNode=null):(s.childLanes=o.childLanes,s.lanes=o.lanes,s.child=o.child,s.subtreeFlags=0,s.deletions=null,s.memoizedProps=o.memoizedProps,s.memoizedState=o.memoizedState,s.updateQueue=o.updateQueue,s.type=o.type,t=o.dependencies,s.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),n=n.sibling;return ht(St,St.current&1|2),e.child}t=t.sibling}s.tail!==null&&bt()>So&&(e.flags|=128,i=!0,Xo(s,!1),e.lanes=4194304)}else{if(!i)if(t=cc(o),t!==null){if(e.flags|=128,i=!0,n=t.updateQueue,n!==null&&(e.updateQueue=n,e.flags|=4),Xo(s,!0),s.tail===null&&s.tailMode==="hidden"&&!o.alternate&&!xt)return Jt(e),null}else 2*bt()-s.renderingStartTime>So&&n!==1073741824&&(e.flags|=128,i=!0,Xo(s,!1),e.lanes=4194304);s.isBackwards?(o.sibling=e.child,e.child=o):(n=s.last,n!==null?n.sibling=o:e.child=o,s.last=o)}return s.tail!==null?(e=s.tail,s.rendering=e,s.tail=e.sibling,s.renderingStartTime=bt(),e.sibling=null,n=St.current,ht(St,i?n&1|2:n&1),e):(Jt(e),null);case 22:case 23:return wm(),i=e.memoizedState!==null,t!==null&&t.memoizedState!==null!==i&&(e.flags|=8192),i&&e.mode&1?Nn&1073741824&&(Jt(e),e.subtreeFlags&6&&(e.flags|=8192)):Jt(e),null;case 24:return null;case 25:return null}throw Error(ae(156,e.tag))}function fw(t,e){switch(rm(e),e.tag){case 1:return Tn(e.type)&&ic(),t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 3:return xo(),_t(wn),_t(rn),hm(),t=e.flags,t&65536&&!(t&128)?(e.flags=t&-65537|128,e):null;case 5:return dm(e),null;case 13:if(_t(St),t=e.memoizedState,t!==null&&t.dehydrated!==null){if(e.alternate===null)throw Error(ae(340));vo()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 19:return _t(St),null;case 4:return xo(),null;case 10:return lm(e.type._context),null;case 22:case 23:return wm(),null;case 24:return null;default:return null}}var Nl=!1,tn=!1,dw=typeof WeakSet=="function"?WeakSet:Set,Te=null;function Js(t,e){var n=t.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(i){Ct(t,e,i)}else n.current=null}function Mh(t,e,n){try{n()}catch(i){Ct(t,e,i)}}var M0=!1;function hw(t,e){if(sh=Qu,t=Vx(),nm(t)){if("selectionStart"in t)var n={start:t.selectionStart,end:t.selectionEnd};else e:{n=(n=t.ownerDocument)&&n.defaultView||window;var i=n.getSelection&&n.getSelection();if(i&&i.rangeCount!==0){n=i.anchorNode;var r=i.anchorOffset,s=i.focusNode;i=i.focusOffset;try{n.nodeType,s.nodeType}catch{n=null;break e}var o=0,a=-1,l=-1,u=0,c=0,f=t,d=null;t:for(;;){for(var p;f!==n||r!==0&&f.nodeType!==3||(a=o+r),f!==s||i!==0&&f.nodeType!==3||(l=o+i),f.nodeType===3&&(o+=f.nodeValue.length),(p=f.firstChild)!==null;)d=f,f=p;for(;;){if(f===t)break t;if(d===n&&++u===r&&(a=o),d===s&&++c===i&&(l=o),(p=f.nextSibling)!==null)break;f=d,d=f.parentNode}f=p}n=a===-1||l===-1?null:{start:a,end:l}}else n=null}n=n||{start:0,end:0}}else n=null;for(oh={focusedElem:t,selectionRange:n},Qu=!1,Te=e;Te!==null;)if(e=Te,t=e.child,(e.subtreeFlags&1028)!==0&&t!==null)t.return=e,Te=t;else for(;Te!==null;){e=Te;try{var g=e.alternate;if(e.flags&1024)switch(e.tag){case 0:case 11:case 15:break;case 1:if(g!==null){var S=g.memoizedProps,m=g.memoizedState,h=e.stateNode,_=h.getSnapshotBeforeUpdate(e.elementType===e.type?S:ai(e.type,S),m);h.__reactInternalSnapshotBeforeUpdate=_}break;case 3:var v=e.stateNode.containerInfo;v.nodeType===1?v.textContent="":v.nodeType===9&&v.documentElement&&v.removeChild(v.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(ae(163))}}catch(E){Ct(e,e.return,E)}if(t=e.sibling,t!==null){t.return=e.return,Te=t;break}Te=e.return}return g=M0,M0=!1,g}function Ea(t,e,n){var i=e.updateQueue;if(i=i!==null?i.lastEffect:null,i!==null){var r=i=i.next;do{if((r.tag&t)===t){var s=r.destroy;r.destroy=void 0,s!==void 0&&Mh(e,n,s)}r=r.next}while(r!==i)}}function $c(t,e){if(e=e.updateQueue,e=e!==null?e.lastEffect:null,e!==null){var n=e=e.next;do{if((n.tag&t)===t){var i=n.create;n.destroy=i()}n=n.next}while(n!==e)}}function Eh(t){var e=t.ref;if(e!==null){var n=t.stateNode;switch(t.tag){case 5:t=n;break;default:t=n}typeof e=="function"?e(t):e.current=t}}function Oy(t){var e=t.alternate;e!==null&&(t.alternate=null,Oy(e)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(e=t.stateNode,e!==null&&(delete e[Ei],delete e[Wa],delete e[uh],delete e[qE],delete e[KE])),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}function By(t){return t.tag===5||t.tag===3||t.tag===4}function E0(t){e:for(;;){for(;t.sibling===null;){if(t.return===null||By(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.flags&2||t.child===null||t.tag===4)continue e;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function wh(t,e,n){var i=t.tag;if(i===5||i===6)t=t.stateNode,e?n.nodeType===8?n.parentNode.insertBefore(t,e):n.insertBefore(t,e):(n.nodeType===8?(e=n.parentNode,e.insertBefore(t,n)):(e=n,e.appendChild(t)),n=n._reactRootContainer,n!=null||e.onclick!==null||(e.onclick=nc));else if(i!==4&&(t=t.child,t!==null))for(wh(t,e,n),t=t.sibling;t!==null;)wh(t,e,n),t=t.sibling}function Th(t,e,n){var i=t.tag;if(i===5||i===6)t=t.stateNode,e?n.insertBefore(t,e):n.appendChild(t);else if(i!==4&&(t=t.child,t!==null))for(Th(t,e,n),t=t.sibling;t!==null;)Th(t,e,n),t=t.sibling}var $t=null,li=!1;function ir(t,e,n){for(n=n.child;n!==null;)zy(t,e,n),n=n.sibling}function zy(t,e,n){if(wi&&typeof wi.onCommitFiberUnmount=="function")try{wi.onCommitFiberUnmount(Fc,n)}catch{}switch(n.tag){case 5:tn||Js(n,e);case 6:var i=$t,r=li;$t=null,ir(t,e,n),$t=i,li=r,$t!==null&&(li?(t=$t,n=n.stateNode,t.nodeType===8?t.parentNode.removeChild(n):t.removeChild(n)):$t.removeChild(n.stateNode));break;case 18:$t!==null&&(li?(t=$t,n=n.stateNode,t.nodeType===8?Df(t.parentNode,n):t.nodeType===1&&Df(t,n),Ba(t)):Df($t,n.stateNode));break;case 4:i=$t,r=li,$t=n.stateNode.containerInfo,li=!0,ir(t,e,n),$t=i,li=r;break;case 0:case 11:case 14:case 15:if(!tn&&(i=n.updateQueue,i!==null&&(i=i.lastEffect,i!==null))){r=i=i.next;do{var s=r,o=s.destroy;s=s.tag,o!==void 0&&(s&2||s&4)&&Mh(n,e,o),r=r.next}while(r!==i)}ir(t,e,n);break;case 1:if(!tn&&(Js(n,e),i=n.stateNode,typeof i.componentWillUnmount=="function"))try{i.props=n.memoizedProps,i.state=n.memoizedState,i.componentWillUnmount()}catch(a){Ct(n,e,a)}ir(t,e,n);break;case 21:ir(t,e,n);break;case 22:n.mode&1?(tn=(i=tn)||n.memoizedState!==null,ir(t,e,n),tn=i):ir(t,e,n);break;default:ir(t,e,n)}}function w0(t){var e=t.updateQueue;if(e!==null){t.updateQueue=null;var n=t.stateNode;n===null&&(n=t.stateNode=new dw),e.forEach(function(i){var r=Mw.bind(null,t,i);n.has(i)||(n.add(i),i.then(r,r))})}}function ii(t,e){var n=e.deletions;if(n!==null)for(var i=0;i<n.length;i++){var r=n[i];try{var s=t,o=e,a=o;e:for(;a!==null;){switch(a.tag){case 5:$t=a.stateNode,li=!1;break e;case 3:$t=a.stateNode.containerInfo,li=!0;break e;case 4:$t=a.stateNode.containerInfo,li=!0;break e}a=a.return}if($t===null)throw Error(ae(160));zy(s,o,r),$t=null,li=!1;var l=r.alternate;l!==null&&(l.return=null),r.return=null}catch(u){Ct(r,e,u)}}if(e.subtreeFlags&12854)for(e=e.child;e!==null;)Hy(e,t),e=e.sibling}function Hy(t,e){var n=t.alternate,i=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:if(ii(e,t),vi(t),i&4){try{Ea(3,t,t.return),$c(3,t)}catch(S){Ct(t,t.return,S)}try{Ea(5,t,t.return)}catch(S){Ct(t,t.return,S)}}break;case 1:ii(e,t),vi(t),i&512&&n!==null&&Js(n,n.return);break;case 5:if(ii(e,t),vi(t),i&512&&n!==null&&Js(n,n.return),t.flags&32){var r=t.stateNode;try{Ua(r,"")}catch(S){Ct(t,t.return,S)}}if(i&4&&(r=t.stateNode,r!=null)){var s=t.memoizedProps,o=n!==null?n.memoizedProps:s,a=t.type,l=t.updateQueue;if(t.updateQueue=null,l!==null)try{a==="input"&&s.type==="radio"&&s.name!=null&&ux(r,s),qd(a,o);var u=qd(a,s);for(o=0;o<l.length;o+=2){var c=l[o],f=l[o+1];c==="style"?px(r,f):c==="dangerouslySetInnerHTML"?dx(r,f):c==="children"?Ua(r,f):Gp(r,c,f,u)}switch(a){case"input":Wd(r,s);break;case"textarea":cx(r,s);break;case"select":var d=r._wrapperState.wasMultiple;r._wrapperState.wasMultiple=!!s.multiple;var p=s.value;p!=null?ro(r,!!s.multiple,p,!1):d!==!!s.multiple&&(s.defaultValue!=null?ro(r,!!s.multiple,s.defaultValue,!0):ro(r,!!s.multiple,s.multiple?[]:"",!1))}r[Wa]=s}catch(S){Ct(t,t.return,S)}}break;case 6:if(ii(e,t),vi(t),i&4){if(t.stateNode===null)throw Error(ae(162));r=t.stateNode,s=t.memoizedProps;try{r.nodeValue=s}catch(S){Ct(t,t.return,S)}}break;case 3:if(ii(e,t),vi(t),i&4&&n!==null&&n.memoizedState.isDehydrated)try{Ba(e.containerInfo)}catch(S){Ct(t,t.return,S)}break;case 4:ii(e,t),vi(t);break;case 13:ii(e,t),vi(t),r=t.child,r.flags&8192&&(s=r.memoizedState!==null,r.stateNode.isHidden=s,!s||r.alternate!==null&&r.alternate.memoizedState!==null||(Mm=bt())),i&4&&w0(t);break;case 22:if(c=n!==null&&n.memoizedState!==null,t.mode&1?(tn=(u=tn)||c,ii(e,t),tn=u):ii(e,t),vi(t),i&8192){if(u=t.memoizedState!==null,(t.stateNode.isHidden=u)&&!c&&t.mode&1)for(Te=t,c=t.child;c!==null;){for(f=Te=c;Te!==null;){switch(d=Te,p=d.child,d.tag){case 0:case 11:case 14:case 15:Ea(4,d,d.return);break;case 1:Js(d,d.return);var g=d.stateNode;if(typeof g.componentWillUnmount=="function"){i=d,n=d.return;try{e=i,g.props=e.memoizedProps,g.state=e.memoizedState,g.componentWillUnmount()}catch(S){Ct(i,n,S)}}break;case 5:Js(d,d.return);break;case 22:if(d.memoizedState!==null){C0(f);continue}}p!==null?(p.return=d,Te=p):C0(f)}c=c.sibling}e:for(c=null,f=t;;){if(f.tag===5){if(c===null){c=f;try{r=f.stateNode,u?(s=r.style,typeof s.setProperty=="function"?s.setProperty("display","none","important"):s.display="none"):(a=f.stateNode,l=f.memoizedProps.style,o=l!=null&&l.hasOwnProperty("display")?l.display:null,a.style.display=hx("display",o))}catch(S){Ct(t,t.return,S)}}}else if(f.tag===6){if(c===null)try{f.stateNode.nodeValue=u?"":f.memoizedProps}catch(S){Ct(t,t.return,S)}}else if((f.tag!==22&&f.tag!==23||f.memoizedState===null||f===t)&&f.child!==null){f.child.return=f,f=f.child;continue}if(f===t)break e;for(;f.sibling===null;){if(f.return===null||f.return===t)break e;c===f&&(c=null),f=f.return}c===f&&(c=null),f.sibling.return=f.return,f=f.sibling}}break;case 19:ii(e,t),vi(t),i&4&&w0(t);break;case 21:break;default:ii(e,t),vi(t)}}function vi(t){var e=t.flags;if(e&2){try{e:{for(var n=t.return;n!==null;){if(By(n)){var i=n;break e}n=n.return}throw Error(ae(160))}switch(i.tag){case 5:var r=i.stateNode;i.flags&32&&(Ua(r,""),i.flags&=-33);var s=E0(t);Th(t,s,r);break;case 3:case 4:var o=i.stateNode.containerInfo,a=E0(t);wh(t,a,o);break;default:throw Error(ae(161))}}catch(l){Ct(t,t.return,l)}t.flags&=-3}e&4096&&(t.flags&=-4097)}function pw(t,e,n){Te=t,Vy(t)}function Vy(t,e,n){for(var i=(t.mode&1)!==0;Te!==null;){var r=Te,s=r.child;if(r.tag===22&&i){var o=r.memoizedState!==null||Nl;if(!o){var a=r.alternate,l=a!==null&&a.memoizedState!==null||tn;a=Nl;var u=tn;if(Nl=o,(tn=l)&&!u)for(Te=r;Te!==null;)o=Te,l=o.child,o.tag===22&&o.memoizedState!==null?A0(r):l!==null?(l.return=o,Te=l):A0(r);for(;s!==null;)Te=s,Vy(s),s=s.sibling;Te=r,Nl=a,tn=u}T0(t)}else r.subtreeFlags&8772&&s!==null?(s.return=r,Te=s):T0(t)}}function T0(t){for(;Te!==null;){var e=Te;if(e.flags&8772){var n=e.alternate;try{if(e.flags&8772)switch(e.tag){case 0:case 11:case 15:tn||$c(5,e);break;case 1:var i=e.stateNode;if(e.flags&4&&!tn)if(n===null)i.componentDidMount();else{var r=e.elementType===e.type?n.memoizedProps:ai(e.type,n.memoizedProps);i.componentDidUpdate(r,n.memoizedState,i.__reactInternalSnapshotBeforeUpdate)}var s=e.updateQueue;s!==null&&u0(e,s,i);break;case 3:var o=e.updateQueue;if(o!==null){if(n=null,e.child!==null)switch(e.child.tag){case 5:n=e.child.stateNode;break;case 1:n=e.child.stateNode}u0(e,o,n)}break;case 5:var a=e.stateNode;if(n===null&&e.flags&4){n=a;var l=e.memoizedProps;switch(e.type){case"button":case"input":case"select":case"textarea":l.autoFocus&&n.focus();break;case"img":l.src&&(n.src=l.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(e.memoizedState===null){var u=e.alternate;if(u!==null){var c=u.memoizedState;if(c!==null){var f=c.dehydrated;f!==null&&Ba(f)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(ae(163))}tn||e.flags&512&&Eh(e)}catch(d){Ct(e,e.return,d)}}if(e===t){Te=null;break}if(n=e.sibling,n!==null){n.return=e.return,Te=n;break}Te=e.return}}function C0(t){for(;Te!==null;){var e=Te;if(e===t){Te=null;break}var n=e.sibling;if(n!==null){n.return=e.return,Te=n;break}Te=e.return}}function A0(t){for(;Te!==null;){var e=Te;try{switch(e.tag){case 0:case 11:case 15:var n=e.return;try{$c(4,e)}catch(l){Ct(e,n,l)}break;case 1:var i=e.stateNode;if(typeof i.componentDidMount=="function"){var r=e.return;try{i.componentDidMount()}catch(l){Ct(e,r,l)}}var s=e.return;try{Eh(e)}catch(l){Ct(e,s,l)}break;case 5:var o=e.return;try{Eh(e)}catch(l){Ct(e,o,l)}}}catch(l){Ct(e,e.return,l)}if(e===t){Te=null;break}var a=e.sibling;if(a!==null){a.return=e.return,Te=a;break}Te=e.return}}var mw=Math.ceil,hc=tr.ReactCurrentDispatcher,ym=tr.ReactCurrentOwner,Qn=tr.ReactCurrentBatchConfig,tt=0,Gt=null,It=null,jt=0,Nn=0,Qs=Or(0),Ut=0,Ka=null,gs=0,Xc=0,Sm=0,wa=null,Sn=null,Mm=0,So=1/0,Oi=null,pc=!1,Ch=null,Rr=null,Ul=!1,_r=null,mc=0,Ta=0,Ah=null,wu=-1,Tu=0;function un(){return tt&6?bt():wu!==-1?wu:wu=bt()}function Pr(t){return t.mode&1?tt&2&&jt!==0?jt&-jt:JE.transition!==null?(Tu===0&&(Tu=Cx()),Tu):(t=lt,t!==0||(t=window.event,t=t===void 0?16:Ix(t.type)),t):1}function pi(t,e,n,i){if(50<Ta)throw Ta=0,Ah=null,Error(ae(185));cl(t,n,i),(!(tt&2)||t!==Gt)&&(t===Gt&&(!(tt&2)&&(Xc|=n),Ut===4&&mr(t,jt)),Cn(t,i),n===1&&tt===0&&!(e.mode&1)&&(So=bt()+500,Vc&&Br()))}function Cn(t,e){var n=t.callbackNode;JM(t,e);var i=Ju(t,t===Gt?jt:0);if(i===0)n!==null&&kg(n),t.callbackNode=null,t.callbackPriority=0;else if(e=i&-i,t.callbackPriority!==e){if(n!=null&&kg(n),e===1)t.tag===0?ZE(R0.bind(null,t)):Jx(R0.bind(null,t)),jE(function(){!(tt&6)&&Br()}),n=null;else{switch(Ax(i)){case 1:n=Yp;break;case 4:n=wx;break;case 16:n=Zu;break;case 536870912:n=Tx;break;default:n=Zu}n=Ky(n,Gy.bind(null,t))}t.callbackPriority=e,t.callbackNode=n}}function Gy(t,e){if(wu=-1,Tu=0,tt&6)throw Error(ae(327));var n=t.callbackNode;if(uo()&&t.callbackNode!==n)return null;var i=Ju(t,t===Gt?jt:0);if(i===0)return null;if(i&30||i&t.expiredLanes||e)e=gc(t,i);else{e=i;var r=tt;tt|=2;var s=$y();(Gt!==t||jt!==e)&&(Oi=null,So=bt()+500,fs(t,e));do try{_w();break}catch(a){Wy(t,a)}while(!0);am(),hc.current=s,tt=r,It!==null?e=0:(Gt=null,jt=0,e=Ut)}if(e!==0){if(e===2&&(r=eh(t),r!==0&&(i=r,e=Rh(t,r))),e===1)throw n=Ka,fs(t,0),mr(t,i),Cn(t,bt()),n;if(e===6)mr(t,i);else{if(r=t.current.alternate,!(i&30)&&!gw(r)&&(e=gc(t,i),e===2&&(s=eh(t),s!==0&&(i=s,e=Rh(t,s))),e===1))throw n=Ka,fs(t,0),mr(t,i),Cn(t,bt()),n;switch(t.finishedWork=r,t.finishedLanes=i,e){case 0:case 1:throw Error(ae(345));case 2:Zr(t,Sn,Oi);break;case 3:if(mr(t,i),(i&130023424)===i&&(e=Mm+500-bt(),10<e)){if(Ju(t,0)!==0)break;if(r=t.suspendedLanes,(r&i)!==i){un(),t.pingedLanes|=t.suspendedLanes&r;break}t.timeoutHandle=lh(Zr.bind(null,t,Sn,Oi),e);break}Zr(t,Sn,Oi);break;case 4:if(mr(t,i),(i&4194240)===i)break;for(e=t.eventTimes,r=-1;0<i;){var o=31-hi(i);s=1<<o,o=e[o],o>r&&(r=o),i&=~s}if(i=r,i=bt()-i,i=(120>i?120:480>i?480:1080>i?1080:1920>i?1920:3e3>i?3e3:4320>i?4320:1960*mw(i/1960))-i,10<i){t.timeoutHandle=lh(Zr.bind(null,t,Sn,Oi),i);break}Zr(t,Sn,Oi);break;case 5:Zr(t,Sn,Oi);break;default:throw Error(ae(329))}}}return Cn(t,bt()),t.callbackNode===n?Gy.bind(null,t):null}function Rh(t,e){var n=wa;return t.current.memoizedState.isDehydrated&&(fs(t,e).flags|=256),t=gc(t,e),t!==2&&(e=Sn,Sn=n,e!==null&&Ph(e)),t}function Ph(t){Sn===null?Sn=t:Sn.push.apply(Sn,t)}function gw(t){for(var e=t;;){if(e.flags&16384){var n=e.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var i=0;i<n.length;i++){var r=n[i],s=r.getSnapshot;r=r.value;try{if(!mi(s(),r))return!1}catch{return!1}}}if(n=e.child,e.subtreeFlags&16384&&n!==null)n.return=e,e=n;else{if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return!0;e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function mr(t,e){for(e&=~Sm,e&=~Xc,t.suspendedLanes|=e,t.pingedLanes&=~e,t=t.expirationTimes;0<e;){var n=31-hi(e),i=1<<n;t[n]=-1,e&=~i}}function R0(t){if(tt&6)throw Error(ae(327));uo();var e=Ju(t,0);if(!(e&1))return Cn(t,bt()),null;var n=gc(t,e);if(t.tag!==0&&n===2){var i=eh(t);i!==0&&(e=i,n=Rh(t,i))}if(n===1)throw n=Ka,fs(t,0),mr(t,e),Cn(t,bt()),n;if(n===6)throw Error(ae(345));return t.finishedWork=t.current.alternate,t.finishedLanes=e,Zr(t,Sn,Oi),Cn(t,bt()),null}function Em(t,e){var n=tt;tt|=1;try{return t(e)}finally{tt=n,tt===0&&(So=bt()+500,Vc&&Br())}}function vs(t){_r!==null&&_r.tag===0&&!(tt&6)&&uo();var e=tt;tt|=1;var n=Qn.transition,i=lt;try{if(Qn.transition=null,lt=1,t)return t()}finally{lt=i,Qn.transition=n,tt=e,!(tt&6)&&Br()}}function wm(){Nn=Qs.current,_t(Qs)}function fs(t,e){t.finishedWork=null,t.finishedLanes=0;var n=t.timeoutHandle;if(n!==-1&&(t.timeoutHandle=-1,XE(n)),It!==null)for(n=It.return;n!==null;){var i=n;switch(rm(i),i.tag){case 1:i=i.type.childContextTypes,i!=null&&ic();break;case 3:xo(),_t(wn),_t(rn),hm();break;case 5:dm(i);break;case 4:xo();break;case 13:_t(St);break;case 19:_t(St);break;case 10:lm(i.type._context);break;case 22:case 23:wm()}n=n.return}if(Gt=t,It=t=br(t.current,null),jt=Nn=e,Ut=0,Ka=null,Sm=Xc=gs=0,Sn=wa=null,os!==null){for(e=0;e<os.length;e++)if(n=os[e],i=n.interleaved,i!==null){n.interleaved=null;var r=i.next,s=n.pending;if(s!==null){var o=s.next;s.next=r,i.next=o}n.pending=i}os=null}return t}function Wy(t,e){do{var n=It;try{if(am(),Su.current=dc,fc){for(var i=Et.memoizedState;i!==null;){var r=i.queue;r!==null&&(r.pending=null),i=i.next}fc=!1}if(ms=0,Vt=Nt=Et=null,Ma=!1,ja=0,ym.current=null,n===null||n.return===null){Ut=1,Ka=e,It=null;break}e:{var s=t,o=n.return,a=n,l=e;if(e=jt,a.flags|=32768,l!==null&&typeof l=="object"&&typeof l.then=="function"){var u=l,c=a,f=c.tag;if(!(c.mode&1)&&(f===0||f===11||f===15)){var d=c.alternate;d?(c.updateQueue=d.updateQueue,c.memoizedState=d.memoizedState,c.lanes=d.lanes):(c.updateQueue=null,c.memoizedState=null)}var p=m0(o);if(p!==null){p.flags&=-257,g0(p,o,a,s,e),p.mode&1&&p0(s,u,e),e=p,l=u;var g=e.updateQueue;if(g===null){var S=new Set;S.add(l),e.updateQueue=S}else g.add(l);break e}else{if(!(e&1)){p0(s,u,e),Tm();break e}l=Error(ae(426))}}else if(xt&&a.mode&1){var m=m0(o);if(m!==null){!(m.flags&65536)&&(m.flags|=256),g0(m,o,a,s,e),sm(yo(l,a));break e}}s=l=yo(l,a),Ut!==4&&(Ut=2),wa===null?wa=[s]:wa.push(s),s=o;do{switch(s.tag){case 3:s.flags|=65536,e&=-e,s.lanes|=e;var h=Ay(s,l,e);l0(s,h);break e;case 1:a=l;var _=s.type,v=s.stateNode;if(!(s.flags&128)&&(typeof _.getDerivedStateFromError=="function"||v!==null&&typeof v.componentDidCatch=="function"&&(Rr===null||!Rr.has(v)))){s.flags|=65536,e&=-e,s.lanes|=e;var E=Ry(s,a,e);l0(s,E);break e}}s=s.return}while(s!==null)}jy(n)}catch(b){e=b,It===n&&n!==null&&(It=n=n.return);continue}break}while(!0)}function $y(){var t=hc.current;return hc.current=dc,t===null?dc:t}function Tm(){(Ut===0||Ut===3||Ut===2)&&(Ut=4),Gt===null||!(gs&268435455)&&!(Xc&268435455)||mr(Gt,jt)}function gc(t,e){var n=tt;tt|=2;var i=$y();(Gt!==t||jt!==e)&&(Oi=null,fs(t,e));do try{vw();break}catch(r){Wy(t,r)}while(!0);if(am(),tt=n,hc.current=i,It!==null)throw Error(ae(261));return Gt=null,jt=0,Ut}function vw(){for(;It!==null;)Xy(It)}function _w(){for(;It!==null&&!GM();)Xy(It)}function Xy(t){var e=qy(t.alternate,t,Nn);t.memoizedProps=t.pendingProps,e===null?jy(t):It=e,ym.current=null}function jy(t){var e=t;do{var n=e.alternate;if(t=e.return,e.flags&32768){if(n=fw(n,e),n!==null){n.flags&=32767,It=n;return}if(t!==null)t.flags|=32768,t.subtreeFlags=0,t.deletions=null;else{Ut=6,It=null;return}}else if(n=cw(n,e,Nn),n!==null){It=n;return}if(e=e.sibling,e!==null){It=e;return}It=e=t}while(e!==null);Ut===0&&(Ut=5)}function Zr(t,e,n){var i=lt,r=Qn.transition;try{Qn.transition=null,lt=1,xw(t,e,n,i)}finally{Qn.transition=r,lt=i}return null}function xw(t,e,n,i){do uo();while(_r!==null);if(tt&6)throw Error(ae(327));n=t.finishedWork;var r=t.finishedLanes;if(n===null)return null;if(t.finishedWork=null,t.finishedLanes=0,n===t.current)throw Error(ae(177));t.callbackNode=null,t.callbackPriority=0;var s=n.lanes|n.childLanes;if(QM(t,s),t===Gt&&(It=Gt=null,jt=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||Ul||(Ul=!0,Ky(Zu,function(){return uo(),null})),s=(n.flags&15990)!==0,n.subtreeFlags&15990||s){s=Qn.transition,Qn.transition=null;var o=lt;lt=1;var a=tt;tt|=4,ym.current=null,hw(t,n),Hy(n,t),BE(oh),Qu=!!sh,oh=sh=null,t.current=n,pw(n),WM(),tt=a,lt=o,Qn.transition=s}else t.current=n;if(Ul&&(Ul=!1,_r=t,mc=r),s=t.pendingLanes,s===0&&(Rr=null),jM(n.stateNode),Cn(t,bt()),e!==null)for(i=t.onRecoverableError,n=0;n<e.length;n++)r=e[n],i(r.value,{componentStack:r.stack,digest:r.digest});if(pc)throw pc=!1,t=Ch,Ch=null,t;return mc&1&&t.tag!==0&&uo(),s=t.pendingLanes,s&1?t===Ah?Ta++:(Ta=0,Ah=t):Ta=0,Br(),null}function uo(){if(_r!==null){var t=Ax(mc),e=Qn.transition,n=lt;try{if(Qn.transition=null,lt=16>t?16:t,_r===null)var i=!1;else{if(t=_r,_r=null,mc=0,tt&6)throw Error(ae(331));var r=tt;for(tt|=4,Te=t.current;Te!==null;){var s=Te,o=s.child;if(Te.flags&16){var a=s.deletions;if(a!==null){for(var l=0;l<a.length;l++){var u=a[l];for(Te=u;Te!==null;){var c=Te;switch(c.tag){case 0:case 11:case 15:Ea(8,c,s)}var f=c.child;if(f!==null)f.return=c,Te=f;else for(;Te!==null;){c=Te;var d=c.sibling,p=c.return;if(Oy(c),c===u){Te=null;break}if(d!==null){d.return=p,Te=d;break}Te=p}}}var g=s.alternate;if(g!==null){var S=g.child;if(S!==null){g.child=null;do{var m=S.sibling;S.sibling=null,S=m}while(S!==null)}}Te=s}}if(s.subtreeFlags&2064&&o!==null)o.return=s,Te=o;else e:for(;Te!==null;){if(s=Te,s.flags&2048)switch(s.tag){case 0:case 11:case 15:Ea(9,s,s.return)}var h=s.sibling;if(h!==null){h.return=s.return,Te=h;break e}Te=s.return}}var _=t.current;for(Te=_;Te!==null;){o=Te;var v=o.child;if(o.subtreeFlags&2064&&v!==null)v.return=o,Te=v;else e:for(o=_;Te!==null;){if(a=Te,a.flags&2048)try{switch(a.tag){case 0:case 11:case 15:$c(9,a)}}catch(b){Ct(a,a.return,b)}if(a===o){Te=null;break e}var E=a.sibling;if(E!==null){E.return=a.return,Te=E;break e}Te=a.return}}if(tt=r,Br(),wi&&typeof wi.onPostCommitFiberRoot=="function")try{wi.onPostCommitFiberRoot(Fc,t)}catch{}i=!0}return i}finally{lt=n,Qn.transition=e}}return!1}function P0(t,e,n){e=yo(n,e),e=Ay(t,e,1),t=Ar(t,e,1),e=un(),t!==null&&(cl(t,1,e),Cn(t,e))}function Ct(t,e,n){if(t.tag===3)P0(t,t,n);else for(;e!==null;){if(e.tag===3){P0(e,t,n);break}else if(e.tag===1){var i=e.stateNode;if(typeof e.type.getDerivedStateFromError=="function"||typeof i.componentDidCatch=="function"&&(Rr===null||!Rr.has(i))){t=yo(n,t),t=Ry(e,t,1),e=Ar(e,t,1),t=un(),e!==null&&(cl(e,1,t),Cn(e,t));break}}e=e.return}}function yw(t,e,n){var i=t.pingCache;i!==null&&i.delete(e),e=un(),t.pingedLanes|=t.suspendedLanes&n,Gt===t&&(jt&n)===n&&(Ut===4||Ut===3&&(jt&130023424)===jt&&500>bt()-Mm?fs(t,0):Sm|=n),Cn(t,e)}function Yy(t,e){e===0&&(t.mode&1?(e=Tl,Tl<<=1,!(Tl&130023424)&&(Tl=4194304)):e=1);var n=un();t=qi(t,e),t!==null&&(cl(t,e,n),Cn(t,n))}function Sw(t){var e=t.memoizedState,n=0;e!==null&&(n=e.retryLane),Yy(t,n)}function Mw(t,e){var n=0;switch(t.tag){case 13:var i=t.stateNode,r=t.memoizedState;r!==null&&(n=r.retryLane);break;case 19:i=t.stateNode;break;default:throw Error(ae(314))}i!==null&&i.delete(e),Yy(t,n)}var qy;qy=function(t,e,n){if(t!==null)if(t.memoizedProps!==e.pendingProps||wn.current)En=!0;else{if(!(t.lanes&n)&&!(e.flags&128))return En=!1,uw(t,e,n);En=!!(t.flags&131072)}else En=!1,xt&&e.flags&1048576&&Qx(e,oc,e.index);switch(e.lanes=0,e.tag){case 2:var i=e.type;Eu(t,e),t=e.pendingProps;var r=go(e,rn.current);lo(e,n),r=mm(null,e,i,t,r,n);var s=gm();return e.flags|=1,typeof r=="object"&&r!==null&&typeof r.render=="function"&&r.$$typeof===void 0?(e.tag=1,e.memoizedState=null,e.updateQueue=null,Tn(i)?(s=!0,rc(e)):s=!1,e.memoizedState=r.state!==null&&r.state!==void 0?r.state:null,cm(e),r.updater=Wc,e.stateNode=r,r._reactInternals=e,mh(e,i,t,n),e=_h(null,e,i,!0,s,n)):(e.tag=0,xt&&s&&im(e),on(null,e,r,n),e=e.child),e;case 16:i=e.elementType;e:{switch(Eu(t,e),t=e.pendingProps,r=i._init,i=r(i._payload),e.type=i,r=e.tag=ww(i),t=ai(i,t),r){case 0:e=vh(null,e,i,t,n);break e;case 1:e=x0(null,e,i,t,n);break e;case 11:e=v0(null,e,i,t,n);break e;case 14:e=_0(null,e,i,ai(i.type,t),n);break e}throw Error(ae(306,i,""))}return e;case 0:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:ai(i,r),vh(t,e,i,r,n);case 1:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:ai(i,r),x0(t,e,i,r,n);case 3:e:{if(Dy(e),t===null)throw Error(ae(387));i=e.pendingProps,s=e.memoizedState,r=s.element,sy(t,e),uc(e,i,null,n);var o=e.memoizedState;if(i=o.element,s.isDehydrated)if(s={element:i,isDehydrated:!1,cache:o.cache,pendingSuspenseBoundaries:o.pendingSuspenseBoundaries,transitions:o.transitions},e.updateQueue.baseState=s,e.memoizedState=s,e.flags&256){r=yo(Error(ae(423)),e),e=y0(t,e,i,n,r);break e}else if(i!==r){r=yo(Error(ae(424)),e),e=y0(t,e,i,n,r);break e}else for(Bn=Cr(e.stateNode.containerInfo.firstChild),zn=e,xt=!0,ui=null,n=iy(e,null,i,n),e.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(vo(),i===r){e=Ki(t,e,n);break e}on(t,e,i,n)}e=e.child}return e;case 5:return oy(e),t===null&&dh(e),i=e.type,r=e.pendingProps,s=t!==null?t.memoizedProps:null,o=r.children,ah(i,r)?o=null:s!==null&&ah(i,s)&&(e.flags|=32),Ly(t,e),on(t,e,o,n),e.child;case 6:return t===null&&dh(e),null;case 13:return Iy(t,e,n);case 4:return fm(e,e.stateNode.containerInfo),i=e.pendingProps,t===null?e.child=_o(e,null,i,n):on(t,e,i,n),e.child;case 11:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:ai(i,r),v0(t,e,i,r,n);case 7:return on(t,e,e.pendingProps,n),e.child;case 8:return on(t,e,e.pendingProps.children,n),e.child;case 12:return on(t,e,e.pendingProps.children,n),e.child;case 10:e:{if(i=e.type._context,r=e.pendingProps,s=e.memoizedProps,o=r.value,ht(ac,i._currentValue),i._currentValue=o,s!==null)if(mi(s.value,o)){if(s.children===r.children&&!wn.current){e=Ki(t,e,n);break e}}else for(s=e.child,s!==null&&(s.return=e);s!==null;){var a=s.dependencies;if(a!==null){o=s.child;for(var l=a.firstContext;l!==null;){if(l.context===i){if(s.tag===1){l=$i(-1,n&-n),l.tag=2;var u=s.updateQueue;if(u!==null){u=u.shared;var c=u.pending;c===null?l.next=l:(l.next=c.next,c.next=l),u.pending=l}}s.lanes|=n,l=s.alternate,l!==null&&(l.lanes|=n),hh(s.return,n,e),a.lanes|=n;break}l=l.next}}else if(s.tag===10)o=s.type===e.type?null:s.child;else if(s.tag===18){if(o=s.return,o===null)throw Error(ae(341));o.lanes|=n,a=o.alternate,a!==null&&(a.lanes|=n),hh(o,n,e),o=s.sibling}else o=s.child;if(o!==null)o.return=s;else for(o=s;o!==null;){if(o===e){o=null;break}if(s=o.sibling,s!==null){s.return=o.return,o=s;break}o=o.return}s=o}on(t,e,r.children,n),e=e.child}return e;case 9:return r=e.type,i=e.pendingProps.children,lo(e,n),r=ei(r),i=i(r),e.flags|=1,on(t,e,i,n),e.child;case 14:return i=e.type,r=ai(i,e.pendingProps),r=ai(i.type,r),_0(t,e,i,r,n);case 15:return Py(t,e,e.type,e.pendingProps,n);case 17:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:ai(i,r),Eu(t,e),e.tag=1,Tn(i)?(t=!0,rc(e)):t=!1,lo(e,n),Cy(e,i,r),mh(e,i,r,n),_h(null,e,i,!0,t,n);case 19:return Ny(t,e,n);case 22:return by(t,e,n)}throw Error(ae(156,e.tag))};function Ky(t,e){return Ex(t,e)}function Ew(t,e,n,i){this.tag=t,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=i,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Zn(t,e,n,i){return new Ew(t,e,n,i)}function Cm(t){return t=t.prototype,!(!t||!t.isReactComponent)}function ww(t){if(typeof t=="function")return Cm(t)?1:0;if(t!=null){if(t=t.$$typeof,t===$p)return 11;if(t===Xp)return 14}return 2}function br(t,e){var n=t.alternate;return n===null?(n=Zn(t.tag,e,t.key,t.mode),n.elementType=t.elementType,n.type=t.type,n.stateNode=t.stateNode,n.alternate=t,t.alternate=n):(n.pendingProps=e,n.type=t.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=t.flags&14680064,n.childLanes=t.childLanes,n.lanes=t.lanes,n.child=t.child,n.memoizedProps=t.memoizedProps,n.memoizedState=t.memoizedState,n.updateQueue=t.updateQueue,e=t.dependencies,n.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext},n.sibling=t.sibling,n.index=t.index,n.ref=t.ref,n}function Cu(t,e,n,i,r,s){var o=2;if(i=t,typeof t=="function")Cm(t)&&(o=1);else if(typeof t=="string")o=5;else e:switch(t){case Gs:return ds(n.children,r,s,e);case Wp:o=8,r|=8;break;case Bd:return t=Zn(12,n,e,r|2),t.elementType=Bd,t.lanes=s,t;case zd:return t=Zn(13,n,e,r),t.elementType=zd,t.lanes=s,t;case Hd:return t=Zn(19,n,e,r),t.elementType=Hd,t.lanes=s,t;case ox:return jc(n,r,s,e);default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case rx:o=10;break e;case sx:o=9;break e;case $p:o=11;break e;case Xp:o=14;break e;case dr:o=16,i=null;break e}throw Error(ae(130,t==null?t:typeof t,""))}return e=Zn(o,n,e,r),e.elementType=t,e.type=i,e.lanes=s,e}function ds(t,e,n,i){return t=Zn(7,t,i,e),t.lanes=n,t}function jc(t,e,n,i){return t=Zn(22,t,i,e),t.elementType=ox,t.lanes=n,t.stateNode={isHidden:!1},t}function zf(t,e,n){return t=Zn(6,t,null,e),t.lanes=n,t}function Hf(t,e,n){return e=Zn(4,t.children!==null?t.children:[],t.key,e),e.lanes=n,e.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},e}function Tw(t,e,n,i,r){this.tag=e,this.containerInfo=t,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Sf(0),this.expirationTimes=Sf(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Sf(0),this.identifierPrefix=i,this.onRecoverableError=r,this.mutableSourceEagerHydrationData=null}function Am(t,e,n,i,r,s,o,a,l){return t=new Tw(t,e,n,a,l),e===1?(e=1,s===!0&&(e|=8)):e=0,s=Zn(3,null,null,e),t.current=s,s.stateNode=t,s.memoizedState={element:i,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},cm(s),t}function Cw(t,e,n){var i=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:Vs,key:i==null?null:""+i,children:t,containerInfo:e,implementation:n}}function Zy(t){if(!t)return Nr;t=t._reactInternals;e:{if(Ms(t)!==t||t.tag!==1)throw Error(ae(170));var e=t;do{switch(e.tag){case 3:e=e.stateNode.context;break e;case 1:if(Tn(e.type)){e=e.stateNode.__reactInternalMemoizedMergedChildContext;break e}}e=e.return}while(e!==null);throw Error(ae(171))}if(t.tag===1){var n=t.type;if(Tn(n))return Zx(t,n,e)}return e}function Jy(t,e,n,i,r,s,o,a,l){return t=Am(n,i,!0,t,r,s,o,a,l),t.context=Zy(null),n=t.current,i=un(),r=Pr(n),s=$i(i,r),s.callback=e??null,Ar(n,s,r),t.current.lanes=r,cl(t,r,i),Cn(t,i),t}function Yc(t,e,n,i){var r=e.current,s=un(),o=Pr(r);return n=Zy(n),e.context===null?e.context=n:e.pendingContext=n,e=$i(s,o),e.payload={element:t},i=i===void 0?null:i,i!==null&&(e.callback=i),t=Ar(r,e,o),t!==null&&(pi(t,r,o,s),yu(t,r,o)),o}function vc(t){if(t=t.current,!t.child)return null;switch(t.child.tag){case 5:return t.child.stateNode;default:return t.child.stateNode}}function b0(t,e){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var n=t.retryLane;t.retryLane=n!==0&&n<e?n:e}}function Rm(t,e){b0(t,e),(t=t.alternate)&&b0(t,e)}function Aw(){return null}var Qy=typeof reportError=="function"?reportError:function(t){console.error(t)};function Pm(t){this._internalRoot=t}qc.prototype.render=Pm.prototype.render=function(t){var e=this._internalRoot;if(e===null)throw Error(ae(409));Yc(t,e,null,null)};qc.prototype.unmount=Pm.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var e=t.containerInfo;vs(function(){Yc(null,t,null,null)}),e[Yi]=null}};function qc(t){this._internalRoot=t}qc.prototype.unstable_scheduleHydration=function(t){if(t){var e=bx();t={blockedOn:null,target:t,priority:e};for(var n=0;n<pr.length&&e!==0&&e<pr[n].priority;n++);pr.splice(n,0,t),n===0&&Dx(t)}};function bm(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function Kc(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11&&(t.nodeType!==8||t.nodeValue!==" react-mount-point-unstable "))}function L0(){}function Rw(t,e,n,i,r){if(r){if(typeof i=="function"){var s=i;i=function(){var u=vc(o);s.call(u)}}var o=Jy(e,i,t,0,null,!1,!1,"",L0);return t._reactRootContainer=o,t[Yi]=o.current,Va(t.nodeType===8?t.parentNode:t),vs(),o}for(;r=t.lastChild;)t.removeChild(r);if(typeof i=="function"){var a=i;i=function(){var u=vc(l);a.call(u)}}var l=Am(t,0,!1,null,null,!1,!1,"",L0);return t._reactRootContainer=l,t[Yi]=l.current,Va(t.nodeType===8?t.parentNode:t),vs(function(){Yc(e,l,n,i)}),l}function Zc(t,e,n,i,r){var s=n._reactRootContainer;if(s){var o=s;if(typeof r=="function"){var a=r;r=function(){var l=vc(o);a.call(l)}}Yc(e,o,t,r)}else o=Rw(n,e,t,r,i);return vc(o)}Rx=function(t){switch(t.tag){case 3:var e=t.stateNode;if(e.current.memoizedState.isDehydrated){var n=oa(e.pendingLanes);n!==0&&(qp(e,n|1),Cn(e,bt()),!(tt&6)&&(So=bt()+500,Br()))}break;case 13:vs(function(){var i=qi(t,1);if(i!==null){var r=un();pi(i,t,1,r)}}),Rm(t,1)}};Kp=function(t){if(t.tag===13){var e=qi(t,134217728);if(e!==null){var n=un();pi(e,t,134217728,n)}Rm(t,134217728)}};Px=function(t){if(t.tag===13){var e=Pr(t),n=qi(t,e);if(n!==null){var i=un();pi(n,t,e,i)}Rm(t,e)}};bx=function(){return lt};Lx=function(t,e){var n=lt;try{return lt=t,e()}finally{lt=n}};Zd=function(t,e,n){switch(e){case"input":if(Wd(t,n),e=n.name,n.type==="radio"&&e!=null){for(n=t;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+e)+'][type="radio"]'),e=0;e<n.length;e++){var i=n[e];if(i!==t&&i.form===t.form){var r=Hc(i);if(!r)throw Error(ae(90));lx(i),Wd(i,r)}}}break;case"textarea":cx(t,n);break;case"select":e=n.value,e!=null&&ro(t,!!n.multiple,e,!1)}};vx=Em;_x=vs;var Pw={usingClientEntryPoint:!1,Events:[dl,js,Hc,mx,gx,Em]},jo={findFiberByHostInstance:ss,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},bw={bundleType:jo.bundleType,version:jo.version,rendererPackageName:jo.rendererPackageName,rendererConfig:jo.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:tr.ReactCurrentDispatcher,findHostInstanceByFiber:function(t){return t=Sx(t),t===null?null:t.stateNode},findFiberByHostInstance:jo.findFiberByHostInstance||Aw,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var kl=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!kl.isDisabled&&kl.supportsFiber)try{Fc=kl.inject(bw),wi=kl}catch{}}Vn.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Pw;Vn.createPortal=function(t,e){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!bm(e))throw Error(ae(200));return Cw(t,e,null,n)};Vn.createRoot=function(t,e){if(!bm(t))throw Error(ae(299));var n=!1,i="",r=Qy;return e!=null&&(e.unstable_strictMode===!0&&(n=!0),e.identifierPrefix!==void 0&&(i=e.identifierPrefix),e.onRecoverableError!==void 0&&(r=e.onRecoverableError)),e=Am(t,1,!1,null,null,n,!1,i,r),t[Yi]=e.current,Va(t.nodeType===8?t.parentNode:t),new Pm(e)};Vn.findDOMNode=function(t){if(t==null)return null;if(t.nodeType===1)return t;var e=t._reactInternals;if(e===void 0)throw typeof t.render=="function"?Error(ae(188)):(t=Object.keys(t).join(","),Error(ae(268,t)));return t=Sx(e),t=t===null?null:t.stateNode,t};Vn.flushSync=function(t){return vs(t)};Vn.hydrate=function(t,e,n){if(!Kc(e))throw Error(ae(200));return Zc(null,t,e,!0,n)};Vn.hydrateRoot=function(t,e,n){if(!bm(t))throw Error(ae(405));var i=n!=null&&n.hydratedSources||null,r=!1,s="",o=Qy;if(n!=null&&(n.unstable_strictMode===!0&&(r=!0),n.identifierPrefix!==void 0&&(s=n.identifierPrefix),n.onRecoverableError!==void 0&&(o=n.onRecoverableError)),e=Jy(e,null,t,1,n??null,r,!1,s,o),t[Yi]=e.current,Va(t),i)for(t=0;t<i.length;t++)n=i[t],r=n._getVersion,r=r(n._source),e.mutableSourceEagerHydrationData==null?e.mutableSourceEagerHydrationData=[n,r]:e.mutableSourceEagerHydrationData.push(n,r);return new qc(e)};Vn.render=function(t,e,n){if(!Kc(e))throw Error(ae(200));return Zc(null,t,e,!1,n)};Vn.unmountComponentAtNode=function(t){if(!Kc(t))throw Error(ae(40));return t._reactRootContainer?(vs(function(){Zc(null,null,t,!1,function(){t._reactRootContainer=null,t[Yi]=null})}),!0):!1};Vn.unstable_batchedUpdates=Em;Vn.unstable_renderSubtreeIntoContainer=function(t,e,n,i){if(!Kc(n))throw Error(ae(200));if(t==null||t._reactInternals===void 0)throw Error(ae(38));return Zc(t,e,n,!1,i)};Vn.version="18.3.1-next-f1338f8080-20240426";function eS(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(eS)}catch(t){console.error(t)}}eS(),ex.exports=Vn;var Lw=ex.exports,tS,D0=Lw;tS=D0.createRoot,D0.hydrateRoot;const I0={2:2,3:3,4:4,5:5,6:6,7:7,8:8,9:9,10:10,J:11,Q:12,K:13,A:14},Dw={S:"spades",H:"hearts",D:"diamonds",C:"clubs"},Iw={A:"ace",2:"2",3:"3",4:"4",5:"5",6:"6",7:"7",8:"8",9:"9",10:"10",J:"jack",Q:"queen",K:"king"},Nw=t=>`${Iw[t.rank]} of ${Dw[t.suit]}`,Lm=Object.freeze({invisibleFive:!0,twoResets:!0,tenBurns:!0,fourBurns:!0,burnPlaysAgain:!0,swapPhase:!0,chanceCard:!0,noSpecialFinish:!1,sevenOrLower:!1});function Uw(t,e){for(let n=t.length-1;n>=0;n--){const i=t[n].rank;if(!(i==="5"&&e.invisibleFive))return i}return null}const Au="skitgubbe.lan-host";function kw(){return async({path:t,method:e,headers:n,body:i})=>{const r=await fetch(`./__service/${Au}${t}`,{method:e,headers:n,body:i,cache:"no-store"});return{ok:r.ok,status:r.status,json:()=>r.json()}}}function Fw(t,e){const n=new URL(e).origin;return async({path:i,method:r,headers:s,body:o})=>{if(!i.startsWith("/"))throw new Error("Invalid service path.");const a=await t(`${n}${i}`,{httpMethod:r,method:r,headers:[...Object.entries(s).filter(([l])=>l.toLowerCase()!=="origin").map(([l,u])=>({name:l,value:u})),{name:"Origin",value:n}],...o===void 0?{}:{body:o}});return{ok:a.status>=200&&a.status<300,status:a.status,json:async()=>JSON.parse(a.body)}}}function Ow(t,e){return Fw((n,i)=>t.fetch(n,i),e)}function Bw(t,e){const n=t?.lanAddresses;return Array.isArray(n)?n.filter(i=>typeof i=="string"&&/^\d{1,3}(?:\.\d{1,3}){3}$/.test(i)).map(i=>`http://${i}:${e}`):[]}function N0(t){const e=t.trim(),n=/^http:\/\/(localhost|(?:\d{1,3}\.){3}\d{1,3})(?::([1-9]\d{0,4}))?\/?$/.exec(e),i=()=>new Error("Paste the host’s printed http:// private IPv4 address and port, without a path, code or password.");if(!n)throw i();const[,r,s]=n;if(s&&Number(s)>65535)throw i();if(r!=="localhost"){const o=r.split(".");if(o.some(u=>String(Number(u))!==u||Number(u)>255))throw i();const[a,l]=o.map(Number);if(!(a===127||a===10||a===192&&l===168||a===172&&l>=16&&l<=31))throw i()}return new URL(e).origin+"/"}var No={};/**
 * @license React
 * react-dom-server-legacy.browser.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var nS=ke;function $e(t){for(var e="https://reactjs.org/docs/error-decoder.html?invariant="+t,n=1;n<arguments.length;n++)e+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var xn=Object.prototype.hasOwnProperty,zw=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,U0={},k0={};function iS(t){return xn.call(k0,t)?!0:xn.call(U0,t)?!1:zw.test(t)?k0[t]=!0:(U0[t]=!0,!1)}function pn(t,e,n,i,r,s,o){this.acceptsBooleans=e===2||e===3||e===4,this.attributeName=i,this.attributeNamespace=r,this.mustUseProperty=n,this.propertyName=t,this.type=e,this.sanitizeURL=s,this.removeEmptyString=o}var qt={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(t){qt[t]=new pn(t,0,!1,t,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(t){var e=t[0];qt[e]=new pn(e,1,!1,t[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(t){qt[t]=new pn(t,2,!1,t.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(t){qt[t]=new pn(t,2,!1,t,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(t){qt[t]=new pn(t,3,!1,t.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(t){qt[t]=new pn(t,3,!0,t,null,!1,!1)});["capture","download"].forEach(function(t){qt[t]=new pn(t,4,!1,t,null,!1,!1)});["cols","rows","size","span"].forEach(function(t){qt[t]=new pn(t,6,!1,t,null,!1,!1)});["rowSpan","start"].forEach(function(t){qt[t]=new pn(t,5,!1,t.toLowerCase(),null,!1,!1)});var Dm=/[\-:]([a-z])/g;function Im(t){return t[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(t){var e=t.replace(Dm,Im);qt[e]=new pn(e,1,!1,t,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(t){var e=t.replace(Dm,Im);qt[e]=new pn(e,1,!1,t,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(t){var e=t.replace(Dm,Im);qt[e]=new pn(e,1,!1,t,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(t){qt[t]=new pn(t,1,!1,t.toLowerCase(),null,!1,!1)});qt.xlinkHref=new pn("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(t){qt[t]=new pn(t,1,!1,t.toLowerCase(),null,!0,!0)});var Ru={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},Hw=["Webkit","ms","Moz","O"];Object.keys(Ru).forEach(function(t){Hw.forEach(function(e){e=e+t.charAt(0).toUpperCase()+t.substring(1),Ru[e]=Ru[t]})});var Vw=/["'&<>]/;function ln(t){if(typeof t=="boolean"||typeof t=="number")return""+t;t=""+t;var e=Vw.exec(t);if(e){var n="",i,r=0;for(i=e.index;i<t.length;i++){switch(t.charCodeAt(i)){case 34:e="&quot;";break;case 38:e="&amp;";break;case 39:e="&#x27;";break;case 60:e="&lt;";break;case 62:e="&gt;";break;default:continue}r!==i&&(n+=t.substring(r,i)),r=i+1,n+=e}t=r!==i?n+t.substring(r,i):n}return t}var Gw=/([A-Z])/g,Ww=/^ms-/,bh=Array.isArray;function Li(t,e){return{insertionMode:t,selectedValue:e}}function $w(t,e,n){switch(e){case"select":return Li(1,n.value!=null?n.value:n.defaultValue);case"svg":return Li(2,null);case"math":return Li(3,null);case"foreignObject":return Li(1,null);case"table":return Li(4,null);case"thead":case"tbody":case"tfoot":return Li(5,null);case"colgroup":return Li(7,null);case"tr":return Li(6,null)}return 4<=t.insertionMode||t.insertionMode===0?Li(1,null):t}var F0=new Map;function rS(t,e,n){if(typeof n!="object")throw Error($e(62));e=!0;for(var i in n)if(xn.call(n,i)){var r=n[i];if(r!=null&&typeof r!="boolean"&&r!==""){if(i.indexOf("--")===0){var s=ln(i);r=ln((""+r).trim())}else{s=i;var o=F0.get(s);o!==void 0||(o=ln(s.replace(Gw,"-$1").toLowerCase().replace(Ww,"-ms-")),F0.set(s,o)),s=o,r=typeof r=="number"?r===0||xn.call(Ru,i)?""+r:r+"px":ln((""+r).trim())}e?(e=!1,t.push(' style="',s,":",r)):t.push(";",s,":",r)}}e||t.push('"')}function Dn(t,e,n,i){switch(n){case"style":rS(t,e,i);return;case"defaultValue":case"defaultChecked":case"innerHTML":case"suppressContentEditableWarning":case"suppressHydrationWarning":return}if(!(2<n.length)||n[0]!=="o"&&n[0]!=="O"||n[1]!=="n"&&n[1]!=="N"){if(e=qt.hasOwnProperty(n)?qt[n]:null,e!==null){switch(typeof i){case"function":case"symbol":return;case"boolean":if(!e.acceptsBooleans)return}switch(n=e.attributeName,e.type){case 3:i&&t.push(" ",n,'=""');break;case 4:i===!0?t.push(" ",n,'=""'):i!==!1&&t.push(" ",n,'="',ln(i),'"');break;case 5:isNaN(i)||t.push(" ",n,'="',ln(i),'"');break;case 6:!isNaN(i)&&1<=i&&t.push(" ",n,'="',ln(i),'"');break;default:e.sanitizeURL&&(i=""+i),t.push(" ",n,'="',ln(i),'"')}}else if(iS(n)){switch(typeof i){case"function":case"symbol":return;case"boolean":if(e=n.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-")return}t.push(" ",n,'="',ln(i),'"')}}}function Pu(t,e,n){if(e!=null){if(n!=null)throw Error($e(60));if(typeof e!="object"||!("__html"in e))throw Error($e(61));e=e.__html,e!=null&&t.push(""+e)}}function Xw(t){var e="";return nS.Children.forEach(t,function(n){n!=null&&(e+=n)}),e}function Vf(t,e,n,i){t.push(_i(n));var r=n=null,s;for(s in e)if(xn.call(e,s)){var o=e[s];if(o!=null)switch(s){case"children":n=o;break;case"dangerouslySetInnerHTML":r=o;break;default:Dn(t,i,s,o)}}return t.push(">"),Pu(t,r,n),typeof n=="string"?(t.push(ln(n)),null):n}var jw=/^[a-zA-Z][a-zA-Z:_\.\-\d]*$/,O0=new Map;function _i(t){var e=O0.get(t);if(e===void 0){if(!jw.test(t))throw Error($e(65,t));e="<"+t,O0.set(t,e)}return e}function Yw(t,e,n,i,r){switch(e){case"select":t.push(_i("select"));var s=null,o=null;for(c in n)if(xn.call(n,c)){var a=n[c];if(a!=null)switch(c){case"children":s=a;break;case"dangerouslySetInnerHTML":o=a;break;case"defaultValue":case"value":break;default:Dn(t,i,c,a)}}return t.push(">"),Pu(t,o,s),s;case"option":o=r.selectedValue,t.push(_i("option"));var l=a=null,u=null,c=null;for(s in n)if(xn.call(n,s)){var f=n[s];if(f!=null)switch(s){case"children":a=f;break;case"selected":u=f;break;case"dangerouslySetInnerHTML":c=f;break;case"value":l=f;default:Dn(t,i,s,f)}}if(o!=null)if(n=l!==null?""+l:Xw(a),bh(o)){for(i=0;i<o.length;i++)if(""+o[i]===n){t.push(' selected=""');break}}else""+o===n&&t.push(' selected=""');else u&&t.push(' selected=""');return t.push(">"),Pu(t,c,a),a;case"textarea":t.push(_i("textarea")),c=o=s=null;for(a in n)if(xn.call(n,a)&&(l=n[a],l!=null))switch(a){case"children":c=l;break;case"value":s=l;break;case"defaultValue":o=l;break;case"dangerouslySetInnerHTML":throw Error($e(91));default:Dn(t,i,a,l)}if(s===null&&o!==null&&(s=o),t.push(">"),c!=null){if(s!=null)throw Error($e(92));if(bh(c)&&1<c.length)throw Error($e(93));s=""+c}return typeof s=="string"&&s[0]===`
`&&t.push(`
`),s!==null&&t.push(ln(""+s)),null;case"input":t.push(_i("input")),l=c=a=s=null;for(o in n)if(xn.call(n,o)&&(u=n[o],u!=null))switch(o){case"children":case"dangerouslySetInnerHTML":throw Error($e(399,"input"));case"defaultChecked":l=u;break;case"defaultValue":a=u;break;case"checked":c=u;break;case"value":s=u;break;default:Dn(t,i,o,u)}return c!==null?Dn(t,i,"checked",c):l!==null&&Dn(t,i,"checked",l),s!==null?Dn(t,i,"value",s):a!==null&&Dn(t,i,"value",a),t.push("/>"),null;case"menuitem":t.push(_i("menuitem"));for(var d in n)if(xn.call(n,d)&&(s=n[d],s!=null))switch(d){case"children":case"dangerouslySetInnerHTML":throw Error($e(400));default:Dn(t,i,d,s)}return t.push(">"),null;case"title":t.push(_i("title")),s=null;for(f in n)if(xn.call(n,f)&&(o=n[f],o!=null))switch(f){case"children":s=o;break;case"dangerouslySetInnerHTML":throw Error($e(434));default:Dn(t,i,f,o)}return t.push(">"),s;case"listing":case"pre":t.push(_i(e)),o=s=null;for(l in n)if(xn.call(n,l)&&(a=n[l],a!=null))switch(l){case"children":s=a;break;case"dangerouslySetInnerHTML":o=a;break;default:Dn(t,i,l,a)}if(t.push(">"),o!=null){if(s!=null)throw Error($e(60));if(typeof o!="object"||!("__html"in o))throw Error($e(61));n=o.__html,n!=null&&(typeof n=="string"&&0<n.length&&n[0]===`
`?t.push(`
`,n):t.push(""+n))}return typeof s=="string"&&s[0]===`
`&&t.push(`
`),s;case"area":case"base":case"br":case"col":case"embed":case"hr":case"img":case"keygen":case"link":case"meta":case"param":case"source":case"track":case"wbr":t.push(_i(e));for(var p in n)if(xn.call(n,p)&&(s=n[p],s!=null))switch(p){case"children":case"dangerouslySetInnerHTML":throw Error($e(399,e));default:Dn(t,i,p,s)}return t.push("/>"),null;case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return Vf(t,n,e,i);case"html":return r.insertionMode===0&&t.push("<!DOCTYPE html>"),Vf(t,n,e,i);default:if(e.indexOf("-")===-1&&typeof n.is!="string")return Vf(t,n,e,i);t.push(_i(e)),o=s=null;for(u in n)if(xn.call(n,u)&&(a=n[u],a!=null))switch(u){case"children":s=a;break;case"dangerouslySetInnerHTML":o=a;break;case"style":rS(t,i,a);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":break;default:iS(u)&&typeof a!="function"&&typeof a!="symbol"&&t.push(" ",u,'="',ln(a),'"')}return t.push(">"),Pu(t,o,s),s}}function B0(t,e,n){if(t.push('<!--$?--><template id="'),n===null)throw Error($e(395));return t.push(n),t.push('"></template>')}function qw(t,e,n,i){switch(n.insertionMode){case 0:case 1:return t.push('<div hidden id="'),t.push(e.segmentPrefix),e=i.toString(16),t.push(e),t.push('">');case 2:return t.push('<svg aria-hidden="true" style="display:none" id="'),t.push(e.segmentPrefix),e=i.toString(16),t.push(e),t.push('">');case 3:return t.push('<math aria-hidden="true" style="display:none" id="'),t.push(e.segmentPrefix),e=i.toString(16),t.push(e),t.push('">');case 4:return t.push('<table hidden id="'),t.push(e.segmentPrefix),e=i.toString(16),t.push(e),t.push('">');case 5:return t.push('<table hidden><tbody id="'),t.push(e.segmentPrefix),e=i.toString(16),t.push(e),t.push('">');case 6:return t.push('<table hidden><tr id="'),t.push(e.segmentPrefix),e=i.toString(16),t.push(e),t.push('">');case 7:return t.push('<table hidden><colgroup id="'),t.push(e.segmentPrefix),e=i.toString(16),t.push(e),t.push('">');default:throw Error($e(397))}}function Kw(t,e){switch(e.insertionMode){case 0:case 1:return t.push("</div>");case 2:return t.push("</svg>");case 3:return t.push("</math>");case 4:return t.push("</table>");case 5:return t.push("</tbody></table>");case 6:return t.push("</tr></table>");case 7:return t.push("</colgroup></table>");default:throw Error($e(397))}}var Zw=/[<\u2028\u2029]/g;function Gf(t){return JSON.stringify(t).replace(Zw,function(e){switch(e){case"<":return"\\u003c";case"\u2028":return"\\u2028";case"\u2029":return"\\u2029";default:throw Error("escapeJSStringsForInstructionScripts encountered a match it does not know how to replace. this means the match regex and the replacement characters are no longer in sync. This is a bug in React")}})}function Jw(t,e){return e=e===void 0?"":e,{bootstrapChunks:[],startInlineScript:"<script>",placeholderPrefix:e+"P:",segmentPrefix:e+"S:",boundaryPrefix:e+"B:",idPrefix:e,nextSuspenseID:0,sentCompleteSegmentFunction:!1,sentCompleteBoundaryFunction:!1,sentClientRenderFunction:!1,generateStaticMarkup:t}}function z0(t,e,n,i){return n.generateStaticMarkup?(t.push(ln(e)),!1):(e===""?t=i:(i&&t.push("<!-- -->"),t.push(ln(e)),t=!0),t)}var Ca=Object.assign,Qw=Symbol.for("react.element"),sS=Symbol.for("react.portal"),oS=Symbol.for("react.fragment"),aS=Symbol.for("react.strict_mode"),lS=Symbol.for("react.profiler"),uS=Symbol.for("react.provider"),cS=Symbol.for("react.context"),fS=Symbol.for("react.forward_ref"),dS=Symbol.for("react.suspense"),hS=Symbol.for("react.suspense_list"),pS=Symbol.for("react.memo"),Nm=Symbol.for("react.lazy"),eT=Symbol.for("react.scope"),tT=Symbol.for("react.debug_trace_mode"),nT=Symbol.for("react.legacy_hidden"),iT=Symbol.for("react.default_value"),H0=Symbol.iterator;function Lh(t){if(t==null)return null;if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case oS:return"Fragment";case sS:return"Portal";case lS:return"Profiler";case aS:return"StrictMode";case dS:return"Suspense";case hS:return"SuspenseList"}if(typeof t=="object")switch(t.$$typeof){case cS:return(t.displayName||"Context")+".Consumer";case uS:return(t._context.displayName||"Context")+".Provider";case fS:var e=t.render;return t=t.displayName,t||(t=e.displayName||e.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case pS:return e=t.displayName||null,e!==null?e:Lh(t.type)||"Memo";case Nm:e=t._payload,t=t._init;try{return Lh(t(e))}catch{}}return null}var mS={};function V0(t,e){if(t=t.contextTypes,!t)return mS;var n={},i;for(i in t)n[i]=e[i];return n}var ls=null;function Jc(t,e){if(t!==e){t.context._currentValue2=t.parentValue,t=t.parent;var n=e.parent;if(t===null){if(n!==null)throw Error($e(401))}else{if(n===null)throw Error($e(401));Jc(t,n)}e.context._currentValue2=e.value}}function gS(t){t.context._currentValue2=t.parentValue,t=t.parent,t!==null&&gS(t)}function vS(t){var e=t.parent;e!==null&&vS(e),t.context._currentValue2=t.value}function _S(t,e){if(t.context._currentValue2=t.parentValue,t=t.parent,t===null)throw Error($e(402));t.depth===e.depth?Jc(t,e):_S(t,e)}function xS(t,e){var n=e.parent;if(n===null)throw Error($e(402));t.depth===n.depth?Jc(t,n):xS(t,n),e.context._currentValue2=e.value}function _c(t){var e=ls;e!==t&&(e===null?vS(t):t===null?gS(e):e.depth===t.depth?Jc(e,t):e.depth>t.depth?_S(e,t):xS(e,t),ls=t)}var G0={isMounted:function(){return!1},enqueueSetState:function(t,e){t=t._reactInternals,t.queue!==null&&t.queue.push(e)},enqueueReplaceState:function(t,e){t=t._reactInternals,t.replace=!0,t.queue=[e]},enqueueForceUpdate:function(){}};function W0(t,e,n,i){var r=t.state!==void 0?t.state:null;t.updater=G0,t.props=n,t.state=r;var s={queue:[],replace:!1};t._reactInternals=s;var o=e.contextType;if(t.context=typeof o=="object"&&o!==null?o._currentValue2:i,o=e.getDerivedStateFromProps,typeof o=="function"&&(o=o(n,r),r=o==null?r:Ca({},r,o),t.state=r),typeof e.getDerivedStateFromProps!="function"&&typeof t.getSnapshotBeforeUpdate!="function"&&(typeof t.UNSAFE_componentWillMount=="function"||typeof t.componentWillMount=="function"))if(e=t.state,typeof t.componentWillMount=="function"&&t.componentWillMount(),typeof t.UNSAFE_componentWillMount=="function"&&t.UNSAFE_componentWillMount(),e!==t.state&&G0.enqueueReplaceState(t,t.state,null),s.queue!==null&&0<s.queue.length)if(e=s.queue,o=s.replace,s.queue=null,s.replace=!1,o&&e.length===1)t.state=e[0];else{for(s=o?e[0]:t.state,r=!0,o=o?1:0;o<e.length;o++){var a=e[o];a=typeof a=="function"?a.call(t,s,n,i):a,a!=null&&(r?(r=!1,s=Ca({},s,a)):Ca(s,a))}t.state=s}else s.queue=null}var rT={id:1,overflow:""};function Dh(t,e,n){var i=t.id;t=t.overflow;var r=32-bu(i)-1;i&=~(1<<r),n+=1;var s=32-bu(e)+r;if(30<s){var o=r-r%5;return s=(i&(1<<o)-1).toString(32),i>>=o,r-=o,{id:1<<32-bu(e)+r|n<<r|i,overflow:s+t}}return{id:1<<s|n<<r|i,overflow:t}}var bu=Math.clz32?Math.clz32:aT,sT=Math.log,oT=Math.LN2;function aT(t){return t>>>=0,t===0?32:31-(sT(t)/oT|0)|0}function lT(t,e){return t===e&&(t!==0||1/t===1/e)||t!==t&&e!==e}var uT=typeof Object.is=="function"?Object.is:lT,Zi=null,Um=null,Lu=null,ft=null,la=!1,xc=!1,Za=0,xr=null,Qc=0;function es(){if(Zi===null)throw Error($e(321));return Zi}function $0(){if(0<Qc)throw Error($e(312));return{memoizedState:null,queue:null,next:null}}function km(){return ft===null?Lu===null?(la=!1,Lu=ft=$0()):(la=!0,ft=Lu):ft.next===null?(la=!1,ft=ft.next=$0()):(la=!0,ft=ft.next),ft}function Fm(){Um=Zi=null,xc=!1,Lu=null,Qc=0,ft=xr=null}function yS(t,e){return typeof e=="function"?e(t):e}function X0(t,e,n){if(Zi=es(),ft=km(),la){var i=ft.queue;if(e=i.dispatch,xr!==null&&(n=xr.get(i),n!==void 0)){xr.delete(i),i=ft.memoizedState;do i=t(i,n.action),n=n.next;while(n!==null);return ft.memoizedState=i,[i,e]}return[ft.memoizedState,e]}return t=t===yS?typeof e=="function"?e():e:n!==void 0?n(e):e,ft.memoizedState=t,t=ft.queue={last:null,dispatch:null},t=t.dispatch=cT.bind(null,Zi,t),[ft.memoizedState,t]}function j0(t,e){if(Zi=es(),ft=km(),e=e===void 0?null:e,ft!==null){var n=ft.memoizedState;if(n!==null&&e!==null){var i=n[1];e:if(i===null)i=!1;else{for(var r=0;r<i.length&&r<e.length;r++)if(!uT(e[r],i[r])){i=!1;break e}i=!0}if(i)return n[0]}}return t=t(),ft.memoizedState=[t,e],t}function cT(t,e,n){if(25<=Qc)throw Error($e(301));if(t===Zi)if(xc=!0,t={action:n,next:null},xr===null&&(xr=new Map),n=xr.get(e),n===void 0)xr.set(e,t);else{for(e=n;e.next!==null;)e=e.next;e.next=t}}function fT(){throw Error($e(394))}function Fl(){}var Y0={readContext:function(t){return t._currentValue2},useContext:function(t){return es(),t._currentValue2},useMemo:j0,useReducer:X0,useRef:function(t){Zi=es(),ft=km();var e=ft.memoizedState;return e===null?(t={current:t},ft.memoizedState=t):e},useState:function(t){return X0(yS,t)},useInsertionEffect:Fl,useLayoutEffect:function(){},useCallback:function(t,e){return j0(function(){return t},e)},useImperativeHandle:Fl,useEffect:Fl,useDebugValue:Fl,useDeferredValue:function(t){return es(),t},useTransition:function(){return es(),[!1,fT]},useId:function(){var t=Um.treeContext,e=t.overflow;t=t.id,t=(t&~(1<<32-bu(t)-1)).toString(32)+e;var n=Du;if(n===null)throw Error($e(404));return e=Za++,t=":"+n.idPrefix+"R"+t,0<e&&(t+="H"+e.toString(32)),t+":"},useMutableSource:function(t,e){return es(),e(t._source)},useSyncExternalStore:function(t,e,n){if(n===void 0)throw Error($e(407));return n()}},Du=null,Wf=nS.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentDispatcher;function dT(t){return console.error(t),null}function ua(){}function hT(t,e,n,i,r,s,o,a,l){var u=[],c=new Set;return e={destination:null,responseState:e,progressiveChunkSize:i===void 0?12800:i,status:0,fatalError:null,nextSegmentId:0,allPendingTasks:0,pendingRootTasks:0,completedRootSegment:null,abortableTasks:c,pingedTasks:u,clientRenderedBoundaries:[],completedBoundaries:[],partialBoundaries:[],onError:r===void 0?dT:r,onAllReady:ua,onShellReady:o===void 0?ua:o,onShellError:ua,onFatalError:ua},n=yc(e,0,null,n,!1,!1),n.parentFlushed=!0,t=Om(e,t,null,n,c,mS,null,rT),u.push(t),e}function Om(t,e,n,i,r,s,o,a){t.allPendingTasks++,n===null?t.pendingRootTasks++:n.pendingTasks++;var l={node:e,ping:function(){var u=t.pingedTasks;u.push(l),u.length===1&&ES(t)},blockedBoundary:n,blockedSegment:i,abortSet:r,legacyContext:s,context:o,treeContext:a};return r.add(l),l}function yc(t,e,n,i,r,s){return{status:0,id:-1,index:e,parentFlushed:!1,chunks:[],children:[],formatContext:i,boundary:n,lastPushedText:r,textEmbedded:s}}function Ja(t,e){if(t=t.onError(e),t!=null&&typeof t!="string")throw Error('onError returned something with a type other than "string". onError should return a string and may return null or undefined but must not return anything else. It received something of type "'+typeof t+'" instead');return t}function Sc(t,e){var n=t.onShellError;n(e),n=t.onFatalError,n(e),t.destination!==null?(t.status=2,t.destination.destroy(e)):(t.status=1,t.fatalError=e)}function q0(t,e,n,i,r){for(Zi={},Um=e,Za=0,t=n(i,r);xc;)xc=!1,Za=0,Qc+=1,ft=null,t=n(i,r);return Fm(),t}function K0(t,e,n,i){var r=n.render(),s=i.childContextTypes;if(s!=null){var o=e.legacyContext;if(typeof n.getChildContext!="function")i=o;else{n=n.getChildContext();for(var a in n)if(!(a in s))throw Error($e(108,Lh(i)||"Unknown",a));i=Ca({},o,n)}e.legacyContext=i,Un(t,e,r),e.legacyContext=o}else Un(t,e,r)}function Z0(t,e){if(t&&t.defaultProps){e=Ca({},e),t=t.defaultProps;for(var n in t)e[n]===void 0&&(e[n]=t[n]);return e}return e}function Ih(t,e,n,i,r){if(typeof n=="function")if(n.prototype&&n.prototype.isReactComponent){r=V0(n,e.legacyContext);var s=n.contextType;s=new n(i,typeof s=="object"&&s!==null?s._currentValue2:r),W0(s,n,i,r),K0(t,e,s,n)}else{s=V0(n,e.legacyContext),r=q0(t,e,n,i,s);var o=Za!==0;if(typeof r=="object"&&r!==null&&typeof r.render=="function"&&r.$$typeof===void 0)W0(r,n,i,s),K0(t,e,r,n);else if(o){i=e.treeContext,e.treeContext=Dh(i,1,0);try{Un(t,e,r)}finally{e.treeContext=i}}else Un(t,e,r)}else if(typeof n=="string"){switch(r=e.blockedSegment,s=Yw(r.chunks,n,i,t.responseState,r.formatContext),r.lastPushedText=!1,o=r.formatContext,r.formatContext=$w(o,n,i),Nh(t,e,s),r.formatContext=o,n){case"area":case"base":case"br":case"col":case"embed":case"hr":case"img":case"input":case"keygen":case"link":case"meta":case"param":case"source":case"track":case"wbr":break;default:r.chunks.push("</",n,">")}r.lastPushedText=!1}else{switch(n){case nT:case tT:case aS:case lS:case oS:Un(t,e,i.children);return;case hS:Un(t,e,i.children);return;case eT:throw Error($e(343));case dS:e:{n=e.blockedBoundary,r=e.blockedSegment,s=i.fallback,i=i.children,o=new Set;var a={id:null,rootSegmentID:-1,parentFlushed:!1,pendingTasks:0,forceClientRender:!1,completedSegments:[],byteSize:0,fallbackAbortableTasks:o,errorDigest:null},l=yc(t,r.chunks.length,a,r.formatContext,!1,!1);r.children.push(l),r.lastPushedText=!1;var u=yc(t,0,null,r.formatContext,!1,!1);u.parentFlushed=!0,e.blockedBoundary=a,e.blockedSegment=u;try{if(Nh(t,e,i),t.responseState.generateStaticMarkup||u.lastPushedText&&u.textEmbedded&&u.chunks.push("<!-- -->"),u.status=1,Mc(a,u),a.pendingTasks===0)break e}catch(c){u.status=4,a.forceClientRender=!0,a.errorDigest=Ja(t,c)}finally{e.blockedBoundary=n,e.blockedSegment=r}e=Om(t,s,n,l,o,e.legacyContext,e.context,e.treeContext),t.pingedTasks.push(e)}return}if(typeof n=="object"&&n!==null)switch(n.$$typeof){case fS:if(i=q0(t,e,n.render,i,r),Za!==0){n=e.treeContext,e.treeContext=Dh(n,1,0);try{Un(t,e,i)}finally{e.treeContext=n}}else Un(t,e,i);return;case pS:n=n.type,i=Z0(n,i),Ih(t,e,n,i,r);return;case uS:if(r=i.children,n=n._context,i=i.value,s=n._currentValue2,n._currentValue2=i,o=ls,ls=i={parent:o,depth:o===null?0:o.depth+1,context:n,parentValue:s,value:i},e.context=i,Un(t,e,r),t=ls,t===null)throw Error($e(403));i=t.parentValue,t.context._currentValue2=i===iT?t.context._defaultValue:i,t=ls=t.parent,e.context=t;return;case cS:i=i.children,i=i(n._currentValue2),Un(t,e,i);return;case Nm:r=n._init,n=r(n._payload),i=Z0(n,i),Ih(t,e,n,i,void 0);return}throw Error($e(130,n==null?n:typeof n,""))}}function Un(t,e,n){if(e.node=n,typeof n=="object"&&n!==null){switch(n.$$typeof){case Qw:Ih(t,e,n.type,n.props,n.ref);return;case sS:throw Error($e(257));case Nm:var i=n._init;n=i(n._payload),Un(t,e,n);return}if(bh(n)){J0(t,e,n);return}if(n===null||typeof n!="object"?i=null:(i=H0&&n[H0]||n["@@iterator"],i=typeof i=="function"?i:null),i&&(i=i.call(n))){if(n=i.next(),!n.done){var r=[];do r.push(n.value),n=i.next();while(!n.done);J0(t,e,r)}return}throw t=Object.prototype.toString.call(n),Error($e(31,t==="[object Object]"?"object with keys {"+Object.keys(n).join(", ")+"}":t))}typeof n=="string"?(i=e.blockedSegment,i.lastPushedText=z0(e.blockedSegment.chunks,n,t.responseState,i.lastPushedText)):typeof n=="number"&&(i=e.blockedSegment,i.lastPushedText=z0(e.blockedSegment.chunks,""+n,t.responseState,i.lastPushedText))}function J0(t,e,n){for(var i=n.length,r=0;r<i;r++){var s=e.treeContext;e.treeContext=Dh(s,i,r);try{Nh(t,e,n[r])}finally{e.treeContext=s}}}function Nh(t,e,n){var i=e.blockedSegment.formatContext,r=e.legacyContext,s=e.context;try{return Un(t,e,n)}catch(l){if(Fm(),typeof l=="object"&&l!==null&&typeof l.then=="function"){n=l;var o=e.blockedSegment,a=yc(t,o.chunks.length,null,o.formatContext,o.lastPushedText,!0);o.children.push(a),o.lastPushedText=!1,t=Om(t,e.node,e.blockedBoundary,a,e.abortSet,e.legacyContext,e.context,e.treeContext).ping,n.then(t,t),e.blockedSegment.formatContext=i,e.legacyContext=r,e.context=s,_c(s)}else throw e.blockedSegment.formatContext=i,e.legacyContext=r,e.context=s,_c(s),l}}function pT(t){var e=t.blockedBoundary;t=t.blockedSegment,t.status=3,MS(this,e,t)}function SS(t,e,n){var i=t.blockedBoundary;t.blockedSegment.status=3,i===null?(e.allPendingTasks--,e.status!==2&&(e.status=2,e.destination!==null&&e.destination.push(null))):(i.pendingTasks--,i.forceClientRender||(i.forceClientRender=!0,t=n===void 0?Error($e(432)):n,i.errorDigest=e.onError(t),i.parentFlushed&&e.clientRenderedBoundaries.push(i)),i.fallbackAbortableTasks.forEach(function(r){return SS(r,e,n)}),i.fallbackAbortableTasks.clear(),e.allPendingTasks--,e.allPendingTasks===0&&(i=e.onAllReady,i()))}function Mc(t,e){if(e.chunks.length===0&&e.children.length===1&&e.children[0].boundary===null){var n=e.children[0];n.id=e.id,n.parentFlushed=!0,n.status===1&&Mc(t,n)}else t.completedSegments.push(e)}function MS(t,e,n){if(e===null){if(n.parentFlushed){if(t.completedRootSegment!==null)throw Error($e(389));t.completedRootSegment=n}t.pendingRootTasks--,t.pendingRootTasks===0&&(t.onShellError=ua,e=t.onShellReady,e())}else e.pendingTasks--,e.forceClientRender||(e.pendingTasks===0?(n.parentFlushed&&n.status===1&&Mc(e,n),e.parentFlushed&&t.completedBoundaries.push(e),e.fallbackAbortableTasks.forEach(pT,t),e.fallbackAbortableTasks.clear()):n.parentFlushed&&n.status===1&&(Mc(e,n),e.completedSegments.length===1&&e.parentFlushed&&t.partialBoundaries.push(e)));t.allPendingTasks--,t.allPendingTasks===0&&(t=t.onAllReady,t())}function ES(t){if(t.status!==2){var e=ls,n=Wf.current;Wf.current=Y0;var i=Du;Du=t.responseState;try{var r=t.pingedTasks,s;for(s=0;s<r.length;s++){var o=r[s],a=t,l=o.blockedSegment;if(l.status===0){_c(o.context);try{Un(a,o,o.node),a.responseState.generateStaticMarkup||l.lastPushedText&&l.textEmbedded&&l.chunks.push("<!-- -->"),o.abortSet.delete(o),l.status=1,MS(a,o.blockedBoundary,l)}catch(g){if(Fm(),typeof g=="object"&&g!==null&&typeof g.then=="function"){var u=o.ping;g.then(u,u)}else{o.abortSet.delete(o),l.status=4;var c=o.blockedBoundary,f=g,d=Ja(a,f);if(c===null?Sc(a,f):(c.pendingTasks--,c.forceClientRender||(c.forceClientRender=!0,c.errorDigest=d,c.parentFlushed&&a.clientRenderedBoundaries.push(c))),a.allPendingTasks--,a.allPendingTasks===0){var p=a.onAllReady;p()}}}finally{}}}r.splice(0,s),t.destination!==null&&Bm(t,t.destination)}catch(g){Ja(t,g),Sc(t,g)}finally{Du=i,Wf.current=n,n===Y0&&_c(e)}}}function Ol(t,e,n){switch(n.parentFlushed=!0,n.status){case 0:var i=n.id=t.nextSegmentId++;return n.lastPushedText=!1,n.textEmbedded=!1,t=t.responseState,e.push('<template id="'),e.push(t.placeholderPrefix),t=i.toString(16),e.push(t),e.push('"></template>');case 1:n.status=2;var r=!0;i=n.chunks;var s=0;n=n.children;for(var o=0;o<n.length;o++){for(r=n[o];s<r.index;s++)e.push(i[s]);r=ef(t,e,r)}for(;s<i.length-1;s++)e.push(i[s]);return s<i.length&&(r=e.push(i[s])),r;default:throw Error($e(390))}}function ef(t,e,n){var i=n.boundary;if(i===null)return Ol(t,e,n);if(i.parentFlushed=!0,i.forceClientRender)return t.responseState.generateStaticMarkup||(i=i.errorDigest,e.push("<!--$!-->"),e.push("<template"),i&&(e.push(' data-dgst="'),i=ln(i),e.push(i),e.push('"')),e.push("></template>")),Ol(t,e,n),t=t.responseState.generateStaticMarkup?!0:e.push("<!--/$-->"),t;if(0<i.pendingTasks){i.rootSegmentID=t.nextSegmentId++,0<i.completedSegments.length&&t.partialBoundaries.push(i);var r=t.responseState,s=r.nextSuspenseID++;return r=r.boundaryPrefix+s.toString(16),i=i.id=r,B0(e,t.responseState,i),Ol(t,e,n),e.push("<!--/$-->")}if(i.byteSize>t.progressiveChunkSize)return i.rootSegmentID=t.nextSegmentId++,t.completedBoundaries.push(i),B0(e,t.responseState,i.id),Ol(t,e,n),e.push("<!--/$-->");if(t.responseState.generateStaticMarkup||e.push("<!--$-->"),n=i.completedSegments,n.length!==1)throw Error($e(391));return ef(t,e,n[0]),t=t.responseState.generateStaticMarkup?!0:e.push("<!--/$-->"),t}function Q0(t,e,n){return qw(e,t.responseState,n.formatContext,n.id),ef(t,e,n),Kw(e,n.formatContext)}function ev(t,e,n){for(var i=n.completedSegments,r=0;r<i.length;r++)wS(t,e,n,i[r]);if(i.length=0,t=t.responseState,i=n.id,n=n.rootSegmentID,e.push(t.startInlineScript),t.sentCompleteBoundaryFunction?e.push('$RC("'):(t.sentCompleteBoundaryFunction=!0,e.push('function $RC(a,b){a=document.getElementById(a);b=document.getElementById(b);b.parentNode.removeChild(b);if(a){a=a.previousSibling;var f=a.parentNode,c=a.nextSibling,e=0;do{if(c&&8===c.nodeType){var d=c.data;if("/$"===d)if(0===e)break;else e--;else"$"!==d&&"$?"!==d&&"$!"!==d||e++}d=c.nextSibling;f.removeChild(c);c=d}while(c);for(;b.firstChild;)f.insertBefore(b.firstChild,c);a.data="$";a._reactRetry&&a._reactRetry()}};$RC("')),i===null)throw Error($e(395));return n=n.toString(16),e.push(i),e.push('","'),e.push(t.segmentPrefix),e.push(n),e.push('")<\/script>')}function wS(t,e,n,i){if(i.status===2)return!0;var r=i.id;if(r===-1){if((i.id=n.rootSegmentID)===-1)throw Error($e(392));return Q0(t,e,i)}return Q0(t,e,i),t=t.responseState,e.push(t.startInlineScript),t.sentCompleteSegmentFunction?e.push('$RS("'):(t.sentCompleteSegmentFunction=!0,e.push('function $RS(a,b){a=document.getElementById(a);b=document.getElementById(b);for(a.parentNode.removeChild(a);a.firstChild;)b.parentNode.insertBefore(a.firstChild,b);b.parentNode.removeChild(b)};$RS("')),e.push(t.segmentPrefix),r=r.toString(16),e.push(r),e.push('","'),e.push(t.placeholderPrefix),e.push(r),e.push('")<\/script>')}function Bm(t,e){try{var n=t.completedRootSegment;if(n!==null&&t.pendingRootTasks===0){ef(t,e,n),t.completedRootSegment=null;var i=t.responseState.bootstrapChunks;for(n=0;n<i.length-1;n++)e.push(i[n]);n<i.length&&e.push(i[n])}var r=t.clientRenderedBoundaries,s;for(s=0;s<r.length;s++){var o=r[s];i=e;var a=t.responseState,l=o.id,u=o.errorDigest,c=o.errorMessage,f=o.errorComponentStack;if(i.push(a.startInlineScript),a.sentClientRenderFunction?i.push('$RX("'):(a.sentClientRenderFunction=!0,i.push('function $RX(b,c,d,e){var a=document.getElementById(b);a&&(b=a.previousSibling,b.data="$!",a=a.dataset,c&&(a.dgst=c),d&&(a.msg=d),e&&(a.stck=e),b._reactRetry&&b._reactRetry())};$RX("')),l===null)throw Error($e(395));if(i.push(l),i.push('"'),u||c||f){i.push(",");var d=Gf(u||"");i.push(d)}if(c||f){i.push(",");var p=Gf(c||"");i.push(p)}if(f){i.push(",");var g=Gf(f);i.push(g)}if(!i.push(")<\/script>")){t.destination=null,s++,r.splice(0,s);return}}r.splice(0,s);var S=t.completedBoundaries;for(s=0;s<S.length;s++)if(!ev(t,e,S[s])){t.destination=null,s++,S.splice(0,s);return}S.splice(0,s);var m=t.partialBoundaries;for(s=0;s<m.length;s++){var h=m[s];e:{r=t,o=e;var _=h.completedSegments;for(a=0;a<_.length;a++)if(!wS(r,o,h,_[a])){a++,_.splice(0,a);var v=!1;break e}_.splice(0,a),v=!0}if(!v){t.destination=null,s++,m.splice(0,s);return}}m.splice(0,s);var E=t.completedBoundaries;for(s=0;s<E.length;s++)if(!ev(t,e,E[s])){t.destination=null,s++,E.splice(0,s);return}E.splice(0,s)}finally{t.allPendingTasks===0&&t.pingedTasks.length===0&&t.clientRenderedBoundaries.length===0&&t.completedBoundaries.length===0&&e.push(null)}}function mT(t,e){try{var n=t.abortableTasks;n.forEach(function(i){return SS(i,t,e)}),n.clear(),t.destination!==null&&Bm(t,t.destination)}catch(i){Ja(t,i),Sc(t,i)}}function gT(){}function TS(t,e,n,i){var r=!1,s=null,o="",a={push:function(u){return u!==null&&(o+=u),!0},destroy:function(u){r=!0,s=u}},l=!1;if(t=hT(t,Jw(n,e?e.identifierPrefix:void 0),{insertionMode:1,selectedValue:null},1/0,gT,void 0,function(){l=!0}),ES(t),mT(t,i),t.status===1)t.status=2,a.destroy(t.fatalError);else if(t.status!==2&&t.destination===null){t.destination=a;try{Bm(t,a)}catch(u){Ja(t,u),Sc(t,u)}}if(r)throw s;if(!l)throw Error($e(426));return o}No.renderToNodeStream=function(){throw Error($e(207))};No.renderToStaticMarkup=function(t,e){return TS(t,e,!0,'The server used "renderToStaticMarkup" which does not support Suspense. If you intended to have the server wait for the suspended component please switch to "renderToReadableStream" which supports Suspense on the server')};No.renderToStaticNodeStream=function(){throw Error($e(208))};No.renderToString=function(t,e){return TS(t,e,!1,'The server used "renderToString" which does not support Suspense. If you intended for this Suspense boundary to render the fallback content on the server consider throwing an Error somewhere within the Suspense boundary. If you intended to have the server wait for the suspended component please switch to "renderToReadableStream" which supports Suspense on the server')};No.version="18.3.1";var zm={};/**
 * @license React
 * react-dom-server.browser.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var CS=ke;function qe(t){for(var e="https://reactjs.org/docs/error-decoder.html?invariant="+t,n=1;n<arguments.length;n++)e+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var kn=null,Fn=0;function Le(t,e){if(e.length!==0)if(512<e.length)0<Fn&&(t.enqueue(new Uint8Array(kn.buffer,0,Fn)),kn=new Uint8Array(512),Fn=0),t.enqueue(e);else{var n=kn.length-Fn;n<e.length&&(n===0?t.enqueue(kn):(kn.set(e.subarray(0,n),Fn),t.enqueue(kn),e=e.subarray(n)),kn=new Uint8Array(512),Fn=0),kn.set(e,Fn),Fn+=e.length}}function vt(t,e){return Le(t,e),!0}function tv(t){kn&&0<Fn&&(t.enqueue(new Uint8Array(kn.buffer,0,Fn)),kn=null,Fn=0)}var AS=new TextEncoder;function Ke(t){return AS.encode(t)}function ve(t){return AS.encode(t)}function RS(t,e){typeof t.error=="function"?t.error(e):t.close()}var yn=Object.prototype.hasOwnProperty,vT=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,nv={},iv={};function PS(t){return yn.call(iv,t)?!0:yn.call(nv,t)?!1:vT.test(t)?iv[t]=!0:(nv[t]=!0,!1)}function mn(t,e,n,i,r,s,o){this.acceptsBooleans=e===2||e===3||e===4,this.attributeName=i,this.attributeNamespace=r,this.mustUseProperty=n,this.propertyName=t,this.type=e,this.sanitizeURL=s,this.removeEmptyString=o}var Kt={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(t){Kt[t]=new mn(t,0,!1,t,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(t){var e=t[0];Kt[e]=new mn(e,1,!1,t[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(t){Kt[t]=new mn(t,2,!1,t.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(t){Kt[t]=new mn(t,2,!1,t,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(t){Kt[t]=new mn(t,3,!1,t.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(t){Kt[t]=new mn(t,3,!0,t,null,!1,!1)});["capture","download"].forEach(function(t){Kt[t]=new mn(t,4,!1,t,null,!1,!1)});["cols","rows","size","span"].forEach(function(t){Kt[t]=new mn(t,6,!1,t,null,!1,!1)});["rowSpan","start"].forEach(function(t){Kt[t]=new mn(t,5,!1,t.toLowerCase(),null,!1,!1)});var Hm=/[\-:]([a-z])/g;function Vm(t){return t[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(t){var e=t.replace(Hm,Vm);Kt[e]=new mn(e,1,!1,t,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(t){var e=t.replace(Hm,Vm);Kt[e]=new mn(e,1,!1,t,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(t){var e=t.replace(Hm,Vm);Kt[e]=new mn(e,1,!1,t,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(t){Kt[t]=new mn(t,1,!1,t.toLowerCase(),null,!1,!1)});Kt.xlinkHref=new mn("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(t){Kt[t]=new mn(t,1,!1,t.toLowerCase(),null,!0,!0)});var Iu={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},_T=["Webkit","ms","Moz","O"];Object.keys(Iu).forEach(function(t){_T.forEach(function(e){e=e+t.charAt(0).toUpperCase()+t.substring(1),Iu[e]=Iu[t]})});var xT=/["'&<>]/;function Xt(t){if(typeof t=="boolean"||typeof t=="number")return""+t;t=""+t;var e=xT.exec(t);if(e){var n="",i,r=0;for(i=e.index;i<t.length;i++){switch(t.charCodeAt(i)){case 34:e="&quot;";break;case 38:e="&amp;";break;case 39:e="&#x27;";break;case 60:e="&lt;";break;case 62:e="&gt;";break;default:continue}r!==i&&(n+=t.substring(r,i)),r=i+1,n+=e}t=r!==i?n+t.substring(r,i):n}return t}var yT=/([A-Z])/g,ST=/^ms-/,Uh=Array.isArray,MT=ve("<script>"),ET=ve("<\/script>"),wT=ve('<script src="'),TT=ve('<script type="module" src="'),rv=ve('" async=""><\/script>'),CT=/(<\/|<)(s)(cript)/gi;function AT(t,e,n,i){return""+e+(n==="s"?"\\u0073":"\\u0053")+i}function RT(t,e,n,i,r){t=t===void 0?"":t,e=e===void 0?MT:ve('<script nonce="'+Xt(e)+'">');var s=[];if(n!==void 0&&s.push(e,Ke((""+n).replace(CT,AT)),ET),i!==void 0)for(n=0;n<i.length;n++)s.push(wT,Ke(Xt(i[n])),rv);if(r!==void 0)for(i=0;i<r.length;i++)s.push(TT,Ke(Xt(r[i])),rv);return{bootstrapChunks:s,startInlineScript:e,placeholderPrefix:ve(t+"P:"),segmentPrefix:ve(t+"S:"),boundaryPrefix:t+"B:",idPrefix:t,nextSuspenseID:0,sentCompleteSegmentFunction:!1,sentCompleteBoundaryFunction:!1,sentClientRenderFunction:!1}}function xi(t,e){return{insertionMode:t,selectedValue:e}}function PT(t){return xi(t==="http://www.w3.org/2000/svg"?2:t==="http://www.w3.org/1998/Math/MathML"?3:0,null)}function bT(t,e,n){switch(e){case"select":return xi(1,n.value!=null?n.value:n.defaultValue);case"svg":return xi(2,null);case"math":return xi(3,null);case"foreignObject":return xi(1,null);case"table":return xi(4,null);case"thead":case"tbody":case"tfoot":return xi(5,null);case"colgroup":return xi(7,null);case"tr":return xi(6,null)}return 4<=t.insertionMode||t.insertionMode===0?xi(1,null):t}var Gm=ve("<!-- -->");function sv(t,e,n,i){return e===""?i:(i&&t.push(Gm),t.push(Ke(Xt(e))),!0)}var ov=new Map,LT=ve(' style="'),av=ve(":"),DT=ve(";");function bS(t,e,n){if(typeof n!="object")throw Error(qe(62));e=!0;for(var i in n)if(yn.call(n,i)){var r=n[i];if(r!=null&&typeof r!="boolean"&&r!==""){if(i.indexOf("--")===0){var s=Ke(Xt(i));r=Ke(Xt((""+r).trim()))}else{s=i;var o=ov.get(s);o!==void 0||(o=ve(Xt(s.replace(yT,"-$1").toLowerCase().replace(ST,"-ms-"))),ov.set(s,o)),s=o,r=typeof r=="number"?r===0||yn.call(Iu,i)?Ke(""+r):Ke(r+"px"):Ke(Xt((""+r).trim()))}e?(e=!1,t.push(LT,s,av,r)):t.push(DT,s,av,r)}}e||t.push(ts)}var cr=ve(" "),zs=ve('="'),ts=ve('"'),lv=ve('=""');function In(t,e,n,i){switch(n){case"style":bS(t,e,i);return;case"defaultValue":case"defaultChecked":case"innerHTML":case"suppressContentEditableWarning":case"suppressHydrationWarning":return}if(!(2<n.length)||n[0]!=="o"&&n[0]!=="O"||n[1]!=="n"&&n[1]!=="N"){if(e=Kt.hasOwnProperty(n)?Kt[n]:null,e!==null){switch(typeof i){case"function":case"symbol":return;case"boolean":if(!e.acceptsBooleans)return}switch(n=Ke(e.attributeName),e.type){case 3:i&&t.push(cr,n,lv);break;case 4:i===!0?t.push(cr,n,lv):i!==!1&&t.push(cr,n,zs,Ke(Xt(i)),ts);break;case 5:isNaN(i)||t.push(cr,n,zs,Ke(Xt(i)),ts);break;case 6:!isNaN(i)&&1<=i&&t.push(cr,n,zs,Ke(Xt(i)),ts);break;default:e.sanitizeURL&&(i=""+i),t.push(cr,n,zs,Ke(Xt(i)),ts)}}else if(PS(n)){switch(typeof i){case"function":case"symbol":return;case"boolean":if(e=n.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-")return}t.push(cr,Ke(n),zs,Ke(Xt(i)),ts)}}}var fr=ve(">"),uv=ve("/>");function Nu(t,e,n){if(e!=null){if(n!=null)throw Error(qe(60));if(typeof e!="object"||!("__html"in e))throw Error(qe(61));e=e.__html,e!=null&&t.push(Ke(""+e))}}function IT(t){var e="";return CS.Children.forEach(t,function(n){n!=null&&(e+=n)}),e}var $f=ve(' selected=""');function Xf(t,e,n,i){t.push(yi(n));var r=n=null,s;for(s in e)if(yn.call(e,s)){var o=e[s];if(o!=null)switch(s){case"children":n=o;break;case"dangerouslySetInnerHTML":r=o;break;default:In(t,i,s,o)}}return t.push(fr),Nu(t,r,n),typeof n=="string"?(t.push(Ke(Xt(n))),null):n}var jf=ve(`
`),NT=/^[a-zA-Z][a-zA-Z:_\.\-\d]*$/,cv=new Map;function yi(t){var e=cv.get(t);if(e===void 0){if(!NT.test(t))throw Error(qe(65,t));e=ve("<"+t),cv.set(t,e)}return e}var UT=ve("<!DOCTYPE html>");function kT(t,e,n,i,r){switch(e){case"select":t.push(yi("select"));var s=null,o=null;for(c in n)if(yn.call(n,c)){var a=n[c];if(a!=null)switch(c){case"children":s=a;break;case"dangerouslySetInnerHTML":o=a;break;case"defaultValue":case"value":break;default:In(t,i,c,a)}}return t.push(fr),Nu(t,o,s),s;case"option":o=r.selectedValue,t.push(yi("option"));var l=a=null,u=null,c=null;for(s in n)if(yn.call(n,s)){var f=n[s];if(f!=null)switch(s){case"children":a=f;break;case"selected":u=f;break;case"dangerouslySetInnerHTML":c=f;break;case"value":l=f;default:In(t,i,s,f)}}if(o!=null)if(n=l!==null?""+l:IT(a),Uh(o)){for(i=0;i<o.length;i++)if(""+o[i]===n){t.push($f);break}}else""+o===n&&t.push($f);else u&&t.push($f);return t.push(fr),Nu(t,c,a),a;case"textarea":t.push(yi("textarea")),c=o=s=null;for(a in n)if(yn.call(n,a)&&(l=n[a],l!=null))switch(a){case"children":c=l;break;case"value":s=l;break;case"defaultValue":o=l;break;case"dangerouslySetInnerHTML":throw Error(qe(91));default:In(t,i,a,l)}if(s===null&&o!==null&&(s=o),t.push(fr),c!=null){if(s!=null)throw Error(qe(92));if(Uh(c)&&1<c.length)throw Error(qe(93));s=""+c}return typeof s=="string"&&s[0]===`
`&&t.push(jf),s!==null&&t.push(Ke(Xt(""+s))),null;case"input":t.push(yi("input")),l=c=a=s=null;for(o in n)if(yn.call(n,o)&&(u=n[o],u!=null))switch(o){case"children":case"dangerouslySetInnerHTML":throw Error(qe(399,"input"));case"defaultChecked":l=u;break;case"defaultValue":a=u;break;case"checked":c=u;break;case"value":s=u;break;default:In(t,i,o,u)}return c!==null?In(t,i,"checked",c):l!==null&&In(t,i,"checked",l),s!==null?In(t,i,"value",s):a!==null&&In(t,i,"value",a),t.push(uv),null;case"menuitem":t.push(yi("menuitem"));for(var d in n)if(yn.call(n,d)&&(s=n[d],s!=null))switch(d){case"children":case"dangerouslySetInnerHTML":throw Error(qe(400));default:In(t,i,d,s)}return t.push(fr),null;case"title":t.push(yi("title")),s=null;for(f in n)if(yn.call(n,f)&&(o=n[f],o!=null))switch(f){case"children":s=o;break;case"dangerouslySetInnerHTML":throw Error(qe(434));default:In(t,i,f,o)}return t.push(fr),s;case"listing":case"pre":t.push(yi(e)),o=s=null;for(l in n)if(yn.call(n,l)&&(a=n[l],a!=null))switch(l){case"children":s=a;break;case"dangerouslySetInnerHTML":o=a;break;default:In(t,i,l,a)}if(t.push(fr),o!=null){if(s!=null)throw Error(qe(60));if(typeof o!="object"||!("__html"in o))throw Error(qe(61));n=o.__html,n!=null&&(typeof n=="string"&&0<n.length&&n[0]===`
`?t.push(jf,Ke(n)):t.push(Ke(""+n)))}return typeof s=="string"&&s[0]===`
`&&t.push(jf),s;case"area":case"base":case"br":case"col":case"embed":case"hr":case"img":case"keygen":case"link":case"meta":case"param":case"source":case"track":case"wbr":t.push(yi(e));for(var p in n)if(yn.call(n,p)&&(s=n[p],s!=null))switch(p){case"children":case"dangerouslySetInnerHTML":throw Error(qe(399,e));default:In(t,i,p,s)}return t.push(uv),null;case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return Xf(t,n,e,i);case"html":return r.insertionMode===0&&t.push(UT),Xf(t,n,e,i);default:if(e.indexOf("-")===-1&&typeof n.is!="string")return Xf(t,n,e,i);t.push(yi(e)),o=s=null;for(u in n)if(yn.call(n,u)&&(a=n[u],a!=null))switch(u){case"children":s=a;break;case"dangerouslySetInnerHTML":o=a;break;case"style":bS(t,i,a);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":break;default:PS(u)&&typeof a!="function"&&typeof a!="symbol"&&t.push(cr,Ke(u),zs,Ke(Xt(a)),ts)}return t.push(fr),Nu(t,o,s),s}}var FT=ve("</"),OT=ve(">"),BT=ve('<template id="'),zT=ve('"></template>'),HT=ve("<!--$-->"),VT=ve('<!--$?--><template id="'),GT=ve('"></template>'),WT=ve("<!--$!-->"),$T=ve("<!--/$-->"),XT=ve("<template"),jT=ve('"'),YT=ve(' data-dgst="');ve(' data-msg="');ve(' data-stck="');var qT=ve("></template>");function fv(t,e,n){if(Le(t,VT),n===null)throw Error(qe(395));return Le(t,n),vt(t,GT)}var KT=ve('<div hidden id="'),ZT=ve('">'),JT=ve("</div>"),QT=ve('<svg aria-hidden="true" style="display:none" id="'),eC=ve('">'),tC=ve("</svg>"),nC=ve('<math aria-hidden="true" style="display:none" id="'),iC=ve('">'),rC=ve("</math>"),sC=ve('<table hidden id="'),oC=ve('">'),aC=ve("</table>"),lC=ve('<table hidden><tbody id="'),uC=ve('">'),cC=ve("</tbody></table>"),fC=ve('<table hidden><tr id="'),dC=ve('">'),hC=ve("</tr></table>"),pC=ve('<table hidden><colgroup id="'),mC=ve('">'),gC=ve("</colgroup></table>");function vC(t,e,n,i){switch(n.insertionMode){case 0:case 1:return Le(t,KT),Le(t,e.segmentPrefix),Le(t,Ke(i.toString(16))),vt(t,ZT);case 2:return Le(t,QT),Le(t,e.segmentPrefix),Le(t,Ke(i.toString(16))),vt(t,eC);case 3:return Le(t,nC),Le(t,e.segmentPrefix),Le(t,Ke(i.toString(16))),vt(t,iC);case 4:return Le(t,sC),Le(t,e.segmentPrefix),Le(t,Ke(i.toString(16))),vt(t,oC);case 5:return Le(t,lC),Le(t,e.segmentPrefix),Le(t,Ke(i.toString(16))),vt(t,uC);case 6:return Le(t,fC),Le(t,e.segmentPrefix),Le(t,Ke(i.toString(16))),vt(t,dC);case 7:return Le(t,pC),Le(t,e.segmentPrefix),Le(t,Ke(i.toString(16))),vt(t,mC);default:throw Error(qe(397))}}function _C(t,e){switch(e.insertionMode){case 0:case 1:return vt(t,JT);case 2:return vt(t,tC);case 3:return vt(t,rC);case 4:return vt(t,aC);case 5:return vt(t,cC);case 6:return vt(t,hC);case 7:return vt(t,gC);default:throw Error(qe(397))}}var xC=ve('function $RS(a,b){a=document.getElementById(a);b=document.getElementById(b);for(a.parentNode.removeChild(a);a.firstChild;)b.parentNode.insertBefore(a.firstChild,b);b.parentNode.removeChild(b)};$RS("'),yC=ve('$RS("'),SC=ve('","'),MC=ve('")<\/script>'),EC=ve('function $RC(a,b){a=document.getElementById(a);b=document.getElementById(b);b.parentNode.removeChild(b);if(a){a=a.previousSibling;var f=a.parentNode,c=a.nextSibling,e=0;do{if(c&&8===c.nodeType){var d=c.data;if("/$"===d)if(0===e)break;else e--;else"$"!==d&&"$?"!==d&&"$!"!==d||e++}d=c.nextSibling;f.removeChild(c);c=d}while(c);for(;b.firstChild;)f.insertBefore(b.firstChild,c);a.data="$";a._reactRetry&&a._reactRetry()}};$RC("'),wC=ve('$RC("'),TC=ve('","'),CC=ve('")<\/script>'),AC=ve('function $RX(b,c,d,e){var a=document.getElementById(b);a&&(b=a.previousSibling,b.data="$!",a=a.dataset,c&&(a.dgst=c),d&&(a.msg=d),e&&(a.stck=e),b._reactRetry&&b._reactRetry())};$RX("'),RC=ve('$RX("'),PC=ve('"'),bC=ve(")<\/script>"),Yf=ve(","),LC=/[<\u2028\u2029]/g;function qf(t){return JSON.stringify(t).replace(LC,function(e){switch(e){case"<":return"\\u003c";case"\u2028":return"\\u2028";case"\u2029":return"\\u2029";default:throw Error("escapeJSStringsForInstructionScripts encountered a match it does not know how to replace. this means the match regex and the replacement characters are no longer in sync. This is a bug in React")}})}var Aa=Object.assign,DC=Symbol.for("react.element"),LS=Symbol.for("react.portal"),DS=Symbol.for("react.fragment"),IS=Symbol.for("react.strict_mode"),NS=Symbol.for("react.profiler"),US=Symbol.for("react.provider"),kS=Symbol.for("react.context"),FS=Symbol.for("react.forward_ref"),OS=Symbol.for("react.suspense"),BS=Symbol.for("react.suspense_list"),zS=Symbol.for("react.memo"),Wm=Symbol.for("react.lazy"),IC=Symbol.for("react.scope"),NC=Symbol.for("react.debug_trace_mode"),UC=Symbol.for("react.legacy_hidden"),kC=Symbol.for("react.default_value"),dv=Symbol.iterator;function kh(t){if(t==null)return null;if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case DS:return"Fragment";case LS:return"Portal";case NS:return"Profiler";case IS:return"StrictMode";case OS:return"Suspense";case BS:return"SuspenseList"}if(typeof t=="object")switch(t.$$typeof){case kS:return(t.displayName||"Context")+".Consumer";case US:return(t._context.displayName||"Context")+".Provider";case FS:var e=t.render;return t=t.displayName,t||(t=e.displayName||e.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case zS:return e=t.displayName||null,e!==null?e:kh(t.type)||"Memo";case Wm:e=t._payload,t=t._init;try{return kh(t(e))}catch{}}return null}var HS={};function hv(t,e){if(t=t.contextTypes,!t)return HS;var n={},i;for(i in t)n[i]=e[i];return n}var us=null;function tf(t,e){if(t!==e){t.context._currentValue=t.parentValue,t=t.parent;var n=e.parent;if(t===null){if(n!==null)throw Error(qe(401))}else{if(n===null)throw Error(qe(401));tf(t,n)}e.context._currentValue=e.value}}function VS(t){t.context._currentValue=t.parentValue,t=t.parent,t!==null&&VS(t)}function GS(t){var e=t.parent;e!==null&&GS(e),t.context._currentValue=t.value}function WS(t,e){if(t.context._currentValue=t.parentValue,t=t.parent,t===null)throw Error(qe(402));t.depth===e.depth?tf(t,e):WS(t,e)}function $S(t,e){var n=e.parent;if(n===null)throw Error(qe(402));t.depth===n.depth?tf(t,n):$S(t,n),e.context._currentValue=e.value}function Ec(t){var e=us;e!==t&&(e===null?GS(t):t===null?VS(e):e.depth===t.depth?tf(e,t):e.depth>t.depth?WS(e,t):$S(e,t),us=t)}var pv={isMounted:function(){return!1},enqueueSetState:function(t,e){t=t._reactInternals,t.queue!==null&&t.queue.push(e)},enqueueReplaceState:function(t,e){t=t._reactInternals,t.replace=!0,t.queue=[e]},enqueueForceUpdate:function(){}};function mv(t,e,n,i){var r=t.state!==void 0?t.state:null;t.updater=pv,t.props=n,t.state=r;var s={queue:[],replace:!1};t._reactInternals=s;var o=e.contextType;if(t.context=typeof o=="object"&&o!==null?o._currentValue:i,o=e.getDerivedStateFromProps,typeof o=="function"&&(o=o(n,r),r=o==null?r:Aa({},r,o),t.state=r),typeof e.getDerivedStateFromProps!="function"&&typeof t.getSnapshotBeforeUpdate!="function"&&(typeof t.UNSAFE_componentWillMount=="function"||typeof t.componentWillMount=="function"))if(e=t.state,typeof t.componentWillMount=="function"&&t.componentWillMount(),typeof t.UNSAFE_componentWillMount=="function"&&t.UNSAFE_componentWillMount(),e!==t.state&&pv.enqueueReplaceState(t,t.state,null),s.queue!==null&&0<s.queue.length)if(e=s.queue,o=s.replace,s.queue=null,s.replace=!1,o&&e.length===1)t.state=e[0];else{for(s=o?e[0]:t.state,r=!0,o=o?1:0;o<e.length;o++){var a=e[o];a=typeof a=="function"?a.call(t,s,n,i):a,a!=null&&(r?(r=!1,s=Aa({},s,a)):Aa(s,a))}t.state=s}else s.queue=null}var FC={id:1,overflow:""};function Fh(t,e,n){var i=t.id;t=t.overflow;var r=32-Uu(i)-1;i&=~(1<<r),n+=1;var s=32-Uu(e)+r;if(30<s){var o=r-r%5;return s=(i&(1<<o)-1).toString(32),i>>=o,r-=o,{id:1<<32-Uu(e)+r|n<<r|i,overflow:s+t}}return{id:1<<s|n<<r|i,overflow:t}}var Uu=Math.clz32?Math.clz32:zC,OC=Math.log,BC=Math.LN2;function zC(t){return t>>>=0,t===0?32:31-(OC(t)/BC|0)|0}function HC(t,e){return t===e&&(t!==0||1/t===1/e)||t!==t&&e!==e}var VC=typeof Object.is=="function"?Object.is:HC,Ji=null,$m=null,ku=null,dt=null,ca=!1,wc=!1,Qa=0,yr=null,nf=0;function ns(){if(Ji===null)throw Error(qe(321));return Ji}function gv(){if(0<nf)throw Error(qe(312));return{memoizedState:null,queue:null,next:null}}function Xm(){return dt===null?ku===null?(ca=!1,ku=dt=gv()):(ca=!0,dt=ku):dt.next===null?(ca=!1,dt=dt.next=gv()):(ca=!0,dt=dt.next),dt}function jm(){$m=Ji=null,wc=!1,ku=null,nf=0,dt=yr=null}function XS(t,e){return typeof e=="function"?e(t):e}function vv(t,e,n){if(Ji=ns(),dt=Xm(),ca){var i=dt.queue;if(e=i.dispatch,yr!==null&&(n=yr.get(i),n!==void 0)){yr.delete(i),i=dt.memoizedState;do i=t(i,n.action),n=n.next;while(n!==null);return dt.memoizedState=i,[i,e]}return[dt.memoizedState,e]}return t=t===XS?typeof e=="function"?e():e:n!==void 0?n(e):e,dt.memoizedState=t,t=dt.queue={last:null,dispatch:null},t=t.dispatch=GC.bind(null,Ji,t),[dt.memoizedState,t]}function _v(t,e){if(Ji=ns(),dt=Xm(),e=e===void 0?null:e,dt!==null){var n=dt.memoizedState;if(n!==null&&e!==null){var i=n[1];e:if(i===null)i=!1;else{for(var r=0;r<i.length&&r<e.length;r++)if(!VC(e[r],i[r])){i=!1;break e}i=!0}if(i)return n[0]}}return t=t(),dt.memoizedState=[t,e],t}function GC(t,e,n){if(25<=nf)throw Error(qe(301));if(t===Ji)if(wc=!0,t={action:n,next:null},yr===null&&(yr=new Map),n=yr.get(e),n===void 0)yr.set(e,t);else{for(e=n;e.next!==null;)e=e.next;e.next=t}}function WC(){throw Error(qe(394))}function Bl(){}var xv={readContext:function(t){return t._currentValue},useContext:function(t){return ns(),t._currentValue},useMemo:_v,useReducer:vv,useRef:function(t){Ji=ns(),dt=Xm();var e=dt.memoizedState;return e===null?(t={current:t},dt.memoizedState=t):e},useState:function(t){return vv(XS,t)},useInsertionEffect:Bl,useLayoutEffect:function(){},useCallback:function(t,e){return _v(function(){return t},e)},useImperativeHandle:Bl,useEffect:Bl,useDebugValue:Bl,useDeferredValue:function(t){return ns(),t},useTransition:function(){return ns(),[!1,WC]},useId:function(){var t=$m.treeContext,e=t.overflow;t=t.id,t=(t&~(1<<32-Uu(t)-1)).toString(32)+e;var n=Fu;if(n===null)throw Error(qe(404));return e=Qa++,t=":"+n.idPrefix+"R"+t,0<e&&(t+="H"+e.toString(32)),t+":"},useMutableSource:function(t,e){return ns(),e(t._source)},useSyncExternalStore:function(t,e,n){if(n===void 0)throw Error(qe(407));return n()}},Fu=null,Kf=CS.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentDispatcher;function $C(t){return console.error(t),null}function fa(){}function XC(t,e,n,i,r,s,o,a,l){var u=[],c=new Set;return e={destination:null,responseState:e,progressiveChunkSize:i===void 0?12800:i,status:0,fatalError:null,nextSegmentId:0,allPendingTasks:0,pendingRootTasks:0,completedRootSegment:null,abortableTasks:c,pingedTasks:u,clientRenderedBoundaries:[],completedBoundaries:[],partialBoundaries:[],onError:r===void 0?$C:r,onAllReady:s===void 0?fa:s,onShellReady:o===void 0?fa:o,onShellError:a===void 0?fa:a,onFatalError:l===void 0?fa:l},n=Tc(e,0,null,n,!1,!1),n.parentFlushed=!0,t=Ym(e,t,null,n,c,HS,null,FC),u.push(t),e}function Ym(t,e,n,i,r,s,o,a){t.allPendingTasks++,n===null?t.pendingRootTasks++:n.pendingTasks++;var l={node:e,ping:function(){var u=t.pingedTasks;u.push(l),u.length===1&&qS(t)},blockedBoundary:n,blockedSegment:i,abortSet:r,legacyContext:s,context:o,treeContext:a};return r.add(l),l}function Tc(t,e,n,i,r,s){return{status:0,id:-1,index:e,parentFlushed:!1,chunks:[],children:[],formatContext:i,boundary:n,lastPushedText:r,textEmbedded:s}}function el(t,e){if(t=t.onError(e),t!=null&&typeof t!="string")throw Error('onError returned something with a type other than "string". onError should return a string and may return null or undefined but must not return anything else. It received something of type "'+typeof t+'" instead');return t}function Cc(t,e){var n=t.onShellError;n(e),n=t.onFatalError,n(e),t.destination!==null?(t.status=2,RS(t.destination,e)):(t.status=1,t.fatalError=e)}function yv(t,e,n,i,r){for(Ji={},$m=e,Qa=0,t=n(i,r);wc;)wc=!1,Qa=0,nf+=1,dt=null,t=n(i,r);return jm(),t}function Sv(t,e,n,i){var r=n.render(),s=i.childContextTypes;if(s!=null){var o=e.legacyContext;if(typeof n.getChildContext!="function")i=o;else{n=n.getChildContext();for(var a in n)if(!(a in s))throw Error(qe(108,kh(i)||"Unknown",a));i=Aa({},o,n)}e.legacyContext=i,On(t,e,r),e.legacyContext=o}else On(t,e,r)}function Mv(t,e){if(t&&t.defaultProps){e=Aa({},e),t=t.defaultProps;for(var n in t)e[n]===void 0&&(e[n]=t[n]);return e}return e}function Oh(t,e,n,i,r){if(typeof n=="function")if(n.prototype&&n.prototype.isReactComponent){r=hv(n,e.legacyContext);var s=n.contextType;s=new n(i,typeof s=="object"&&s!==null?s._currentValue:r),mv(s,n,i,r),Sv(t,e,s,n)}else{s=hv(n,e.legacyContext),r=yv(t,e,n,i,s);var o=Qa!==0;if(typeof r=="object"&&r!==null&&typeof r.render=="function"&&r.$$typeof===void 0)mv(r,n,i,s),Sv(t,e,r,n);else if(o){i=e.treeContext,e.treeContext=Fh(i,1,0);try{On(t,e,r)}finally{e.treeContext=i}}else On(t,e,r)}else if(typeof n=="string"){switch(r=e.blockedSegment,s=kT(r.chunks,n,i,t.responseState,r.formatContext),r.lastPushedText=!1,o=r.formatContext,r.formatContext=bT(o,n,i),Bh(t,e,s),r.formatContext=o,n){case"area":case"base":case"br":case"col":case"embed":case"hr":case"img":case"input":case"keygen":case"link":case"meta":case"param":case"source":case"track":case"wbr":break;default:r.chunks.push(FT,Ke(n),OT)}r.lastPushedText=!1}else{switch(n){case UC:case NC:case IS:case NS:case DS:On(t,e,i.children);return;case BS:On(t,e,i.children);return;case IC:throw Error(qe(343));case OS:e:{n=e.blockedBoundary,r=e.blockedSegment,s=i.fallback,i=i.children,o=new Set;var a={id:null,rootSegmentID:-1,parentFlushed:!1,pendingTasks:0,forceClientRender:!1,completedSegments:[],byteSize:0,fallbackAbortableTasks:o,errorDigest:null},l=Tc(t,r.chunks.length,a,r.formatContext,!1,!1);r.children.push(l),r.lastPushedText=!1;var u=Tc(t,0,null,r.formatContext,!1,!1);u.parentFlushed=!0,e.blockedBoundary=a,e.blockedSegment=u;try{if(Bh(t,e,i),u.lastPushedText&&u.textEmbedded&&u.chunks.push(Gm),u.status=1,Ac(a,u),a.pendingTasks===0)break e}catch(c){u.status=4,a.forceClientRender=!0,a.errorDigest=el(t,c)}finally{e.blockedBoundary=n,e.blockedSegment=r}e=Ym(t,s,n,l,o,e.legacyContext,e.context,e.treeContext),t.pingedTasks.push(e)}return}if(typeof n=="object"&&n!==null)switch(n.$$typeof){case FS:if(i=yv(t,e,n.render,i,r),Qa!==0){n=e.treeContext,e.treeContext=Fh(n,1,0);try{On(t,e,i)}finally{e.treeContext=n}}else On(t,e,i);return;case zS:n=n.type,i=Mv(n,i),Oh(t,e,n,i,r);return;case US:if(r=i.children,n=n._context,i=i.value,s=n._currentValue,n._currentValue=i,o=us,us=i={parent:o,depth:o===null?0:o.depth+1,context:n,parentValue:s,value:i},e.context=i,On(t,e,r),t=us,t===null)throw Error(qe(403));i=t.parentValue,t.context._currentValue=i===kC?t.context._defaultValue:i,t=us=t.parent,e.context=t;return;case kS:i=i.children,i=i(n._currentValue),On(t,e,i);return;case Wm:r=n._init,n=r(n._payload),i=Mv(n,i),Oh(t,e,n,i,void 0);return}throw Error(qe(130,n==null?n:typeof n,""))}}function On(t,e,n){if(e.node=n,typeof n=="object"&&n!==null){switch(n.$$typeof){case DC:Oh(t,e,n.type,n.props,n.ref);return;case LS:throw Error(qe(257));case Wm:var i=n._init;n=i(n._payload),On(t,e,n);return}if(Uh(n)){Ev(t,e,n);return}if(n===null||typeof n!="object"?i=null:(i=dv&&n[dv]||n["@@iterator"],i=typeof i=="function"?i:null),i&&(i=i.call(n))){if(n=i.next(),!n.done){var r=[];do r.push(n.value),n=i.next();while(!n.done);Ev(t,e,r)}return}throw t=Object.prototype.toString.call(n),Error(qe(31,t==="[object Object]"?"object with keys {"+Object.keys(n).join(", ")+"}":t))}typeof n=="string"?(i=e.blockedSegment,i.lastPushedText=sv(e.blockedSegment.chunks,n,t.responseState,i.lastPushedText)):typeof n=="number"&&(i=e.blockedSegment,i.lastPushedText=sv(e.blockedSegment.chunks,""+n,t.responseState,i.lastPushedText))}function Ev(t,e,n){for(var i=n.length,r=0;r<i;r++){var s=e.treeContext;e.treeContext=Fh(s,i,r);try{Bh(t,e,n[r])}finally{e.treeContext=s}}}function Bh(t,e,n){var i=e.blockedSegment.formatContext,r=e.legacyContext,s=e.context;try{return On(t,e,n)}catch(l){if(jm(),typeof l=="object"&&l!==null&&typeof l.then=="function"){n=l;var o=e.blockedSegment,a=Tc(t,o.chunks.length,null,o.formatContext,o.lastPushedText,!0);o.children.push(a),o.lastPushedText=!1,t=Ym(t,e.node,e.blockedBoundary,a,e.abortSet,e.legacyContext,e.context,e.treeContext).ping,n.then(t,t),e.blockedSegment.formatContext=i,e.legacyContext=r,e.context=s,Ec(s)}else throw e.blockedSegment.formatContext=i,e.legacyContext=r,e.context=s,Ec(s),l}}function jC(t){var e=t.blockedBoundary;t=t.blockedSegment,t.status=3,YS(this,e,t)}function jS(t,e,n){var i=t.blockedBoundary;t.blockedSegment.status=3,i===null?(e.allPendingTasks--,e.status!==2&&(e.status=2,e.destination!==null&&e.destination.close())):(i.pendingTasks--,i.forceClientRender||(i.forceClientRender=!0,t=n===void 0?Error(qe(432)):n,i.errorDigest=e.onError(t),i.parentFlushed&&e.clientRenderedBoundaries.push(i)),i.fallbackAbortableTasks.forEach(function(r){return jS(r,e,n)}),i.fallbackAbortableTasks.clear(),e.allPendingTasks--,e.allPendingTasks===0&&(i=e.onAllReady,i()))}function Ac(t,e){if(e.chunks.length===0&&e.children.length===1&&e.children[0].boundary===null){var n=e.children[0];n.id=e.id,n.parentFlushed=!0,n.status===1&&Ac(t,n)}else t.completedSegments.push(e)}function YS(t,e,n){if(e===null){if(n.parentFlushed){if(t.completedRootSegment!==null)throw Error(qe(389));t.completedRootSegment=n}t.pendingRootTasks--,t.pendingRootTasks===0&&(t.onShellError=fa,e=t.onShellReady,e())}else e.pendingTasks--,e.forceClientRender||(e.pendingTasks===0?(n.parentFlushed&&n.status===1&&Ac(e,n),e.parentFlushed&&t.completedBoundaries.push(e),e.fallbackAbortableTasks.forEach(jC,t),e.fallbackAbortableTasks.clear()):n.parentFlushed&&n.status===1&&(Ac(e,n),e.completedSegments.length===1&&e.parentFlushed&&t.partialBoundaries.push(e)));t.allPendingTasks--,t.allPendingTasks===0&&(t=t.onAllReady,t())}function qS(t){if(t.status!==2){var e=us,n=Kf.current;Kf.current=xv;var i=Fu;Fu=t.responseState;try{var r=t.pingedTasks,s;for(s=0;s<r.length;s++){var o=r[s],a=t,l=o.blockedSegment;if(l.status===0){Ec(o.context);try{On(a,o,o.node),l.lastPushedText&&l.textEmbedded&&l.chunks.push(Gm),o.abortSet.delete(o),l.status=1,YS(a,o.blockedBoundary,l)}catch(g){if(jm(),typeof g=="object"&&g!==null&&typeof g.then=="function"){var u=o.ping;g.then(u,u)}else{o.abortSet.delete(o),l.status=4;var c=o.blockedBoundary,f=g,d=el(a,f);if(c===null?Cc(a,f):(c.pendingTasks--,c.forceClientRender||(c.forceClientRender=!0,c.errorDigest=d,c.parentFlushed&&a.clientRenderedBoundaries.push(c))),a.allPendingTasks--,a.allPendingTasks===0){var p=a.onAllReady;p()}}}finally{}}}r.splice(0,s),t.destination!==null&&qm(t,t.destination)}catch(g){el(t,g),Cc(t,g)}finally{Fu=i,Kf.current=n,n===xv&&Ec(e)}}}function zl(t,e,n){switch(n.parentFlushed=!0,n.status){case 0:var i=n.id=t.nextSegmentId++;return n.lastPushedText=!1,n.textEmbedded=!1,t=t.responseState,Le(e,BT),Le(e,t.placeholderPrefix),t=Ke(i.toString(16)),Le(e,t),vt(e,zT);case 1:n.status=2;var r=!0;i=n.chunks;var s=0;n=n.children;for(var o=0;o<n.length;o++){for(r=n[o];s<r.index;s++)Le(e,i[s]);r=rf(t,e,r)}for(;s<i.length-1;s++)Le(e,i[s]);return s<i.length&&(r=vt(e,i[s])),r;default:throw Error(qe(390))}}function rf(t,e,n){var i=n.boundary;if(i===null)return zl(t,e,n);if(i.parentFlushed=!0,i.forceClientRender)i=i.errorDigest,vt(e,WT),Le(e,XT),i&&(Le(e,YT),Le(e,Ke(Xt(i))),Le(e,jT)),vt(e,qT),zl(t,e,n);else if(0<i.pendingTasks){i.rootSegmentID=t.nextSegmentId++,0<i.completedSegments.length&&t.partialBoundaries.push(i);var r=t.responseState,s=r.nextSuspenseID++;r=ve(r.boundaryPrefix+s.toString(16)),i=i.id=r,fv(e,t.responseState,i),zl(t,e,n)}else if(i.byteSize>t.progressiveChunkSize)i.rootSegmentID=t.nextSegmentId++,t.completedBoundaries.push(i),fv(e,t.responseState,i.id),zl(t,e,n);else{if(vt(e,HT),n=i.completedSegments,n.length!==1)throw Error(qe(391));rf(t,e,n[0])}return vt(e,$T)}function wv(t,e,n){return vC(e,t.responseState,n.formatContext,n.id),rf(t,e,n),_C(e,n.formatContext)}function Tv(t,e,n){for(var i=n.completedSegments,r=0;r<i.length;r++)KS(t,e,n,i[r]);if(i.length=0,t=t.responseState,i=n.id,n=n.rootSegmentID,Le(e,t.startInlineScript),t.sentCompleteBoundaryFunction?Le(e,wC):(t.sentCompleteBoundaryFunction=!0,Le(e,EC)),i===null)throw Error(qe(395));return n=Ke(n.toString(16)),Le(e,i),Le(e,TC),Le(e,t.segmentPrefix),Le(e,n),vt(e,CC)}function KS(t,e,n,i){if(i.status===2)return!0;var r=i.id;if(r===-1){if((i.id=n.rootSegmentID)===-1)throw Error(qe(392));return wv(t,e,i)}return wv(t,e,i),t=t.responseState,Le(e,t.startInlineScript),t.sentCompleteSegmentFunction?Le(e,yC):(t.sentCompleteSegmentFunction=!0,Le(e,xC)),Le(e,t.segmentPrefix),r=Ke(r.toString(16)),Le(e,r),Le(e,SC),Le(e,t.placeholderPrefix),Le(e,r),vt(e,MC)}function qm(t,e){kn=new Uint8Array(512),Fn=0;try{var n=t.completedRootSegment;if(n!==null&&t.pendingRootTasks===0){rf(t,e,n),t.completedRootSegment=null;var i=t.responseState.bootstrapChunks;for(n=0;n<i.length-1;n++)Le(e,i[n]);n<i.length&&vt(e,i[n])}var r=t.clientRenderedBoundaries,s;for(s=0;s<r.length;s++){var o=r[s];i=e;var a=t.responseState,l=o.id,u=o.errorDigest,c=o.errorMessage,f=o.errorComponentStack;if(Le(i,a.startInlineScript),a.sentClientRenderFunction?Le(i,RC):(a.sentClientRenderFunction=!0,Le(i,AC)),l===null)throw Error(qe(395));Le(i,l),Le(i,PC),(u||c||f)&&(Le(i,Yf),Le(i,Ke(qf(u||"")))),(c||f)&&(Le(i,Yf),Le(i,Ke(qf(c||"")))),f&&(Le(i,Yf),Le(i,Ke(qf(f)))),vt(i,bC)}r.splice(0,s);var d=t.completedBoundaries;for(s=0;s<d.length;s++)Tv(t,e,d[s]);d.splice(0,s),tv(e),kn=new Uint8Array(512),Fn=0;var p=t.partialBoundaries;for(s=0;s<p.length;s++){var g=p[s];e:{r=t,o=e;var S=g.completedSegments;for(a=0;a<S.length;a++)if(!KS(r,o,g,S[a])){a++,S.splice(0,a);var m=!1;break e}S.splice(0,a),m=!0}if(!m){t.destination=null,s++,p.splice(0,s);return}}p.splice(0,s);var h=t.completedBoundaries;for(s=0;s<h.length;s++)Tv(t,e,h[s]);h.splice(0,s)}finally{tv(e),t.allPendingTasks===0&&t.pingedTasks.length===0&&t.clientRenderedBoundaries.length===0&&t.completedBoundaries.length===0&&e.close()}}function Cv(t,e){try{var n=t.abortableTasks;n.forEach(function(i){return jS(i,t,e)}),n.clear(),t.destination!==null&&qm(t,t.destination)}catch(i){el(t,i),Cc(t,i)}}zm.renderToReadableStream=function(t,e){return new Promise(function(n,i){var r,s,o=new Promise(function(c,f){s=c,r=f}),a=XC(t,RT(e?e.identifierPrefix:void 0,e?e.nonce:void 0,e?e.bootstrapScriptContent:void 0,e?e.bootstrapScripts:void 0,e?e.bootstrapModules:void 0),PT(e?e.namespaceURI:void 0),e?e.progressiveChunkSize:void 0,e?e.onError:void 0,s,function(){var c=new ReadableStream({type:"bytes",pull:function(f){if(a.status===1)a.status=2,RS(f,a.fatalError);else if(a.status!==2&&a.destination===null){a.destination=f;try{qm(a,f)}catch(d){el(a,d),Cc(a,d)}}},cancel:function(){Cv(a)}},{highWaterMark:0});c.allReady=o,n(c)},function(c){o.catch(function(){}),i(c)},r);if(e&&e.signal){var l=e.signal,u=function(){Cv(a,l.reason),l.removeEventListener("abort",u)};l.addEventListener("abort",u)}qS(a)})};zm.version="18.3.1";var Uo,ZS;Uo=No,ZS=zm;Uo.version;Uo.renderToString;var sf=Uo.renderToStaticMarkup;Uo.renderToNodeStream;Uo.renderToStaticNodeStream;ZS.renderToReadableStream;const YC=Array.from({length:70},(t,e)=>{const n=18+e%7*10.6667,i=16+Math.floor(e/7)*12;return`M${n} ${i-4}l3.4 4-3.4 4-3.4-4Z`}).join(" ");function Km({className:t,style:e}){return X.jsxs("svg",{viewBox:"0 0 100 140",className:t,style:e,children:[X.jsx("rect",{x:"0.5",y:"0.5",width:"99",height:"139",rx:"9",fill:"#eee5d4",stroke:"#312019",strokeOpacity:".35"}),X.jsx("rect",{x:"5",y:"5",width:"90",height:"130",rx:"5",fill:"#862b31"}),X.jsx("rect",{x:"9",y:"9",width:"82",height:"122",rx:"3",fill:"none",stroke:"#ead3b0",strokeWidth:"1"}),X.jsx("path",{d:YC,fill:"none",stroke:"#e2be99",strokeWidth:".8",strokeOpacity:".7"})]})}const Rt=32,$n=50,Pt=68,zt=40,Ht=100,jn=70,da=58,ha=82,Av=(zt+jn)/2,qC=(jn+Ht)/2,KC=(zt+da)/2,ZC=(ha+Ht)/2,JC={2:[{x:$n,y:zt},{x:$n,y:Ht}],3:[{x:$n,y:zt},{x:$n,y:jn},{x:$n,y:Ht}],4:[{x:Rt,y:zt},{x:Pt,y:zt},{x:Rt,y:Ht},{x:Pt,y:Ht}],5:[{x:Rt,y:zt},{x:Pt,y:zt},{x:$n,y:jn},{x:Rt,y:Ht},{x:Pt,y:Ht}],6:[{x:Rt,y:zt},{x:Pt,y:zt},{x:Rt,y:jn},{x:Pt,y:jn},{x:Rt,y:Ht},{x:Pt,y:Ht}],7:[{x:Rt,y:zt},{x:Pt,y:zt},{x:$n,y:Av},{x:Rt,y:jn},{x:Pt,y:jn},{x:Rt,y:Ht},{x:Pt,y:Ht}],8:[{x:Rt,y:zt},{x:Pt,y:zt},{x:$n,y:Av},{x:Rt,y:jn},{x:Pt,y:jn},{x:$n,y:qC},{x:Rt,y:Ht},{x:Pt,y:Ht}],9:[{x:Rt,y:zt},{x:Pt,y:zt},{x:Rt,y:da},{x:Pt,y:da},{x:$n,y:jn},{x:Rt,y:ha},{x:Pt,y:ha},{x:Rt,y:Ht},{x:Pt,y:Ht}],10:[{x:Rt,y:zt},{x:Pt,y:zt},{x:$n,y:KC},{x:Rt,y:da},{x:Pt,y:da},{x:Rt,y:ha},{x:Pt,y:ha},{x:$n,y:ZC},{x:Rt,y:Ht},{x:Pt,y:Ht}]},QC=jn,eA="#c62a3f",tA="#20232b";function JS(t){return t==="H"||t==="D"?eA:tA}const nA={H:"M50 87 C50 87 11 59 11 33 C11 19 21 11 32 11 C41 11 47 16 50 24 C53 16 59 11 68 11 C79 11 89 19 89 33 C89 59 50 87 50 87 Z",D:"M50 7 L87 50 L50 93 L13 50 Z",S:"M50 8 C50 8 13 41 13 61 C13 73 21 79 30 79 C35 79 39 77 42 73 C41 83 37 89 29 93 L71 93 C63 89 59 83 58 73 C61 77 65 79 70 79 C79 79 87 73 87 61 C87 41 50 8 50 8 Z",C:"M50 8 C41 8 34 15 34 24 C34 29 36 33 40 36 C33 32 23 33 17 39 C10 46 10 57 17 64 C23 70 33 71 40 67 C37 75 32 81 25 85 L75 85 C68 81 63 75 60 67 C67 71 77 70 83 64 C90 57 90 46 83 39 C77 33 67 32 60 36 C64 33 66 29 66 24 C66 15 59 8 50 8 Z"};function tl({suit:t,cx:e,cy:n,size:i,flip:r=!1,color:s}){const o=i/100;return X.jsx("g",{transform:`translate(${e} ${n}) rotate(${r?180:0}) scale(${o}) translate(-50 -50)`,fill:s??JS(t),children:X.jsx("path",{d:nA[t]})})}const QS="Georgia, 'Times New Roman', 'Playfair Display', serif";function Rv({rank:t,suit:e,color:n}){const i=t==="10";return X.jsxs("g",{fill:n,children:[X.jsx("text",{x:i?11:10,y:"20",fontSize:i?13:16,fontWeight:800,fontFamily:QS,textAnchor:"middle",children:t}),X.jsx(tl,{suit:e,cx:10,cy:32,size:12,color:n})]})}function iA({rank:t,suit:e,color:n}){return X.jsxs("g",{children:[X.jsx("rect",{x:"16",y:"24",width:"68",height:"92",rx:"6",fill:n,fillOpacity:"0.045"}),X.jsx("rect",{x:"16",y:"24",width:"68",height:"92",rx:"6",fill:"none",stroke:n,strokeOpacity:"0.3",strokeWidth:"1.3"}),X.jsx(tl,{suit:e,cx:50,cy:41,size:20,color:n}),X.jsx("text",{x:"50",y:"86",fontSize:"42",fontWeight:800,fontFamily:QS,textAnchor:"middle",fill:n,children:t}),X.jsx(tl,{suit:e,cx:50,cy:104,size:17,flip:!0,color:n})]})}function zh({rank:t,suit:e,faceDown:n,className:i,style:r}){if(n)return X.jsx(Km,{className:i,style:r});const s=JS(e),o=t==="J"||t==="Q"||t==="K",a=JC[t];return X.jsxs("svg",{viewBox:"0 0 100 140",className:i,style:r,children:[X.jsx("rect",{x:"0.5",y:"0.5",width:"99",height:"139",rx:"9",fill:"#fdfdfb",stroke:"rgba(20,20,30,0.14)"}),X.jsx(Rv,{rank:t,suit:e,color:s}),X.jsx("g",{transform:"rotate(180 50 70)",children:X.jsx(Rv,{rank:t,suit:e,color:s})}),t==="A"?X.jsx(tl,{suit:e,cx:50,cy:70,size:46,color:s}):o?X.jsx(iA,{rank:t,suit:e,color:s}):a?.map((l,u)=>X.jsx(tl,{suit:e,cx:l.x,cy:l.y,size:20,flip:l.y>QC,color:s},u))]})}function Zm(t,e=!1,n=1160){return Math.max(1,Math.ceil(t/Math.min(e?8:18,Math.max(1,Math.floor((n-90)/60)+1))))}function e1(t,e=!1,n=1160){return Math.ceil(t/Zm(t,e,n))}function rA({cards:t,slots:e,hidden:n,compact:i=!1,width:r=1160,cardSize:s=90,render:o}){const a=e?t.length:e1(t.length,i,r),l=e?1:Zm(t.length,i,r),u=a>1?Math.min(s+8,(r-s)/(a-1)):0,c=new Map,f=t.map((p,g)=>{if(!e)return{left:g%a*u,top:Math.floor(g/a)*72};const S=e[p.id]??g,m=c.get(S)??0;return c.set(S,m+1),{left:S*Math.min(s+20,(r-s-24)/2)+m*8,top:0}}),d=s+Math.max(0,...f.map(p=>p.left));return X.jsx("div",{className:"sg-fan","data-rows":l,style:{"--card-width":`${s}px`,width:Math.min(d,r),height:s*1.4+16+(l-1)*72},children:X.jsx("div",{className:"sg-fan-inner",style:{width:d,height:s*1.4+(l-1)*72},children:t.map((p,g)=>X.jsx("div",{className:"sg-fan-slot",style:{...f[g],width:s,height:s*1.4,visibility:n.has(p.id)?"hidden":void 0},children:o(p,g)},p.id))})})}/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Jm="169",sA=0,Pv=1,oA=2,t1=1,n1=2,Fi=3,Ur=0,cn=1,zi=2,Lr=0,co=1,nl=2,bv=3,Lv=4,aA=5,is=100,lA=101,uA=102,cA=103,fA=104,dA=200,hA=201,pA=202,mA=203,Hh=204,Vh=205,gA=206,vA=207,_A=208,xA=209,yA=210,SA=211,MA=212,EA=213,wA=214,Gh=0,Wh=1,$h=2,Mo=3,Xh=4,jh=5,Yh=6,qh=7,i1=0,TA=1,CA=2,Dr=0,AA=1,RA=2,PA=3,r1=4,bA=5,LA=6,DA=7,s1=300,Eo=301,wo=302,Kh=303,Zh=304,of=306,Qi=1e3,cs=1001,Jh=1002,Jn=1003,IA=1004,Hl=1005,ci=1006,Zf=1007,Sr=1008,er=1009,o1=1010,a1=1011,il=1012,Qm=1013,_s=1014,Gi=1015,pl=1016,eg=1017,tg=1018,To=1020,l1=35902,u1=1021,c1=1022,di=1023,f1=1024,d1=1025,fo=1026,Co=1027,h1=1028,ng=1029,p1=1030,ig=1031,rg=1033,Ou=33776,Bu=33777,zu=33778,Hu=33779,Qh=35840,ep=35841,tp=35842,np=35843,ip=36196,rp=37492,sp=37496,op=37808,ap=37809,lp=37810,up=37811,cp=37812,fp=37813,dp=37814,hp=37815,pp=37816,mp=37817,gp=37818,vp=37819,_p=37820,xp=37821,Vu=36492,yp=36494,Sp=36495,m1=36283,Mp=36284,Ep=36285,wp=36286,NA=3200,UA=3201,g1=0,kA=1,gr="",an="srgb",zr="srgb-linear",sg="display-p3",af="display-p3-linear",Rc="linear",gt="srgb",Pc="rec709",bc="p3",Ts=7680,Dv=519,FA=512,OA=513,BA=514,v1=515,zA=516,HA=517,VA=518,GA=519,Iv=35044,Nv="300 es",Wi=2e3,Lc=2001;class ko{addEventListener(e,n){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(n)===-1&&i[e].push(n)}hasEventListener(e,n){if(this._listeners===void 0)return!1;const i=this._listeners;return i[e]!==void 0&&i[e].indexOf(n)!==-1}removeEventListener(e,n){if(this._listeners===void 0)return;const r=this._listeners[e];if(r!==void 0){const s=r.indexOf(n);s!==-1&&r.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const i=this._listeners[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let s=0,o=r.length;s<o;s++)r[s].call(this,e);e.target=null}}}const Qt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Jf=Math.PI/180,Dc=180/Math.PI;function Fo(){const t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Qt[t&255]+Qt[t>>8&255]+Qt[t>>16&255]+Qt[t>>24&255]+"-"+Qt[e&255]+Qt[e>>8&255]+"-"+Qt[e>>16&15|64]+Qt[e>>24&255]+"-"+Qt[n&63|128]+Qt[n>>8&255]+"-"+Qt[n>>16&255]+Qt[n>>24&255]+Qt[i&255]+Qt[i>>8&255]+Qt[i>>16&255]+Qt[i>>24&255]).toLowerCase()}function nn(t,e,n){return Math.max(e,Math.min(n,t))}function WA(t,e){return(t%e+e)%e}function Qf(t,e,n){return(1-n)*t+n*e}function Yo(t,e){switch(e.constructor){case Float32Array:return t;case Uint32Array:return t/4294967295;case Uint16Array:return t/65535;case Uint8Array:return t/255;case Int32Array:return Math.max(t/2147483647,-1);case Int16Array:return Math.max(t/32767,-1);case Int8Array:return Math.max(t/127,-1);default:throw new Error("Invalid component type.")}}function _n(t,e){switch(e.constructor){case Float32Array:return t;case Uint32Array:return Math.round(t*4294967295);case Uint16Array:return Math.round(t*65535);case Uint8Array:return Math.round(t*255);case Int32Array:return Math.round(t*2147483647);case Int16Array:return Math.round(t*32767);case Int8Array:return Math.round(t*127);default:throw new Error("Invalid component type.")}}class ge{constructor(e=0,n=0){ge.prototype.isVector2=!0,this.x=e,this.y=n}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,n){return this.x=e,this.y=n,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const n=this.x,i=this.y,r=e.elements;return this.x=r[0]*n+r[3]*i+r[6],this.y=r[1]*n+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,n){return this.x=Math.max(e.x,Math.min(n.x,this.x)),this.y=Math.max(e.y,Math.min(n.y,this.y)),this}clampScalar(e,n){return this.x=Math.max(e,Math.min(n,this.x)),this.y=Math.max(e,Math.min(n,this.y)),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(n,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(e)/n;return Math.acos(nn(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,i=this.y-e.y;return n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this}rotateAround(e,n){const i=Math.cos(n),r=Math.sin(n),s=this.x-e.x,o=this.y-e.y;return this.x=s*i-o*r+e.x,this.y=s*r+o*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ye{constructor(e,n,i,r,s,o,a,l,u){Ye.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,n,i,r,s,o,a,l,u)}set(e,n,i,r,s,o,a,l,u){const c=this.elements;return c[0]=e,c[1]=r,c[2]=a,c[3]=n,c[4]=s,c[5]=l,c[6]=i,c[7]=o,c[8]=u,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const n=this.elements,i=e.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],this}extractBasis(e,n,i){return e.setFromMatrix3Column(this,0),n.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const n=e.elements;return this.set(n[0],n[4],n[8],n[1],n[5],n[9],n[2],n[6],n[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const i=e.elements,r=n.elements,s=this.elements,o=i[0],a=i[3],l=i[6],u=i[1],c=i[4],f=i[7],d=i[2],p=i[5],g=i[8],S=r[0],m=r[3],h=r[6],_=r[1],v=r[4],E=r[7],b=r[2],R=r[5],C=r[8];return s[0]=o*S+a*_+l*b,s[3]=o*m+a*v+l*R,s[6]=o*h+a*E+l*C,s[1]=u*S+c*_+f*b,s[4]=u*m+c*v+f*R,s[7]=u*h+c*E+f*C,s[2]=d*S+p*_+g*b,s[5]=d*m+p*v+g*R,s[8]=d*h+p*E+g*C,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[3]*=e,n[6]*=e,n[1]*=e,n[4]*=e,n[7]*=e,n[2]*=e,n[5]*=e,n[8]*=e,this}determinant(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],u=e[7],c=e[8];return n*o*c-n*a*u-i*s*c+i*a*l+r*s*u-r*o*l}invert(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],u=e[7],c=e[8],f=c*o-a*u,d=a*l-c*s,p=u*s-o*l,g=n*f+i*d+r*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const S=1/g;return e[0]=f*S,e[1]=(r*u-c*i)*S,e[2]=(a*i-r*o)*S,e[3]=d*S,e[4]=(c*n-r*l)*S,e[5]=(r*s-a*n)*S,e[6]=p*S,e[7]=(i*l-u*n)*S,e[8]=(o*n-i*s)*S,this}transpose(){let e;const n=this.elements;return e=n[1],n[1]=n[3],n[3]=e,e=n[2],n[2]=n[6],n[6]=e,e=n[5],n[5]=n[7],n[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const n=this.elements;return e[0]=n[0],e[1]=n[3],e[2]=n[6],e[3]=n[1],e[4]=n[4],e[5]=n[7],e[6]=n[2],e[7]=n[5],e[8]=n[8],this}setUvTransform(e,n,i,r,s,o,a){const l=Math.cos(s),u=Math.sin(s);return this.set(i*l,i*u,-i*(l*o+u*a)+o+e,-r*u,r*l,-r*(-u*o+l*a)+a+n,0,0,1),this}scale(e,n){return this.premultiply(ed.makeScale(e,n)),this}rotate(e){return this.premultiply(ed.makeRotation(-e)),this}translate(e,n){return this.premultiply(ed.makeTranslation(e,n)),this}makeTranslation(e,n){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,n,0,0,1),this}makeRotation(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,-i,0,i,n,0,0,0,1),this}makeScale(e,n){return this.set(e,0,0,0,n,0,0,0,1),this}equals(e){const n=this.elements,i=e.elements;for(let r=0;r<9;r++)if(n[r]!==i[r])return!1;return!0}fromArray(e,n=0){for(let i=0;i<9;i++)this.elements[i]=e[i+n];return this}toArray(e=[],n=0){const i=this.elements;return e[n]=i[0],e[n+1]=i[1],e[n+2]=i[2],e[n+3]=i[3],e[n+4]=i[4],e[n+5]=i[5],e[n+6]=i[6],e[n+7]=i[7],e[n+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const ed=new Ye;function _1(t){for(let e=t.length-1;e>=0;--e)if(t[e]>=65535)return!0;return!1}function Ic(t){return document.createElementNS("http://www.w3.org/1999/xhtml",t)}function $A(){const t=Ic("canvas");return t.style.display="block",t}const Uv={};function Gu(t){t in Uv||(Uv[t]=!0,console.warn(t))}function XA(t,e,n){return new Promise(function(i,r){function s(){switch(t.clientWaitSync(e,t.SYNC_FLUSH_COMMANDS_BIT,0)){case t.WAIT_FAILED:r();break;case t.TIMEOUT_EXPIRED:setTimeout(s,n);break;default:i()}}setTimeout(s,n)})}function jA(t){const e=t.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function YA(t){const e=t.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const kv=new Ye().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),Fv=new Ye().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),qo={[zr]:{transfer:Rc,primaries:Pc,luminanceCoefficients:[.2126,.7152,.0722],toReference:t=>t,fromReference:t=>t},[an]:{transfer:gt,primaries:Pc,luminanceCoefficients:[.2126,.7152,.0722],toReference:t=>t.convertSRGBToLinear(),fromReference:t=>t.convertLinearToSRGB()},[af]:{transfer:Rc,primaries:bc,luminanceCoefficients:[.2289,.6917,.0793],toReference:t=>t.applyMatrix3(Fv),fromReference:t=>t.applyMatrix3(kv)},[sg]:{transfer:gt,primaries:bc,luminanceCoefficients:[.2289,.6917,.0793],toReference:t=>t.convertSRGBToLinear().applyMatrix3(Fv),fromReference:t=>t.applyMatrix3(kv).convertLinearToSRGB()}},qA=new Set([zr,af]),ot={enabled:!0,_workingColorSpace:zr,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(t){if(!qA.has(t))throw new Error(`Unsupported working color space, "${t}".`);this._workingColorSpace=t},convert:function(t,e,n){if(this.enabled===!1||e===n||!e||!n)return t;const i=qo[e].toReference,r=qo[n].fromReference;return r(i(t))},fromWorkingColorSpace:function(t,e){return this.convert(t,this._workingColorSpace,e)},toWorkingColorSpace:function(t,e){return this.convert(t,e,this._workingColorSpace)},getPrimaries:function(t){return qo[t].primaries},getTransfer:function(t){return t===gr?Rc:qo[t].transfer},getLuminanceCoefficients:function(t,e=this._workingColorSpace){return t.fromArray(qo[e].luminanceCoefficients)}};function ho(t){return t<.04045?t*.0773993808:Math.pow(t*.9478672986+.0521327014,2.4)}function td(t){return t<.0031308?t*12.92:1.055*Math.pow(t,.41666)-.055}let Cs;class KA{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Cs===void 0&&(Cs=Ic("canvas")),Cs.width=e.width,Cs.height=e.height;const i=Cs.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),n=Cs}return n.width>2048||n.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),n.toDataURL("image/jpeg",.6)):n.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const n=Ic("canvas");n.width=e.width,n.height=e.height;const i=n.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let o=0;o<s.length;o++)s[o]=ho(s[o]/255)*255;return i.putImageData(r,0,0),n}else if(e.data){const n=e.data.slice(0);for(let i=0;i<n.length;i++)n instanceof Uint8Array||n instanceof Uint8ClampedArray?n[i]=Math.floor(ho(n[i]/255)*255):n[i]=ho(n[i]);return{data:n,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let ZA=0;class x1{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:ZA++}),this.uuid=Fo(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let o=0,a=r.length;o<a;o++)r[o].isDataTexture?s.push(nd(r[o].image)):s.push(nd(r[o]))}else s=nd(r);i.url=s}return n||(e.images[this.uuid]=i),i}}function nd(t){return typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap?KA.getDataURL(t):t.data?{data:Array.from(t.data),width:t.width,height:t.height,type:t.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let JA=0;class fn extends ko{constructor(e=fn.DEFAULT_IMAGE,n=fn.DEFAULT_MAPPING,i=cs,r=cs,s=ci,o=Sr,a=di,l=er,u=fn.DEFAULT_ANISOTROPY,c=gr){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:JA++}),this.uuid=Fo(),this.name="",this.source=new x1(e),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=o,this.anisotropy=u,this.format=a,this.internalFormat=null,this.type=l,this.offset=new ge(0,0),this.repeat=new ge(1,1),this.center=new ge(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ye,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=c,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),n||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==s1)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Qi:e.x=e.x-Math.floor(e.x);break;case cs:e.x=e.x<0?0:1;break;case Jh:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Qi:e.y=e.y-Math.floor(e.y);break;case cs:e.y=e.y<0?0:1;break;case Jh:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}fn.DEFAULT_IMAGE=null;fn.DEFAULT_MAPPING=s1;fn.DEFAULT_ANISOTROPY=1;class ut{constructor(e=0,n=0,i=0,r=1){ut.prototype.isVector4=!0,this.x=e,this.y=n,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,n,i,r){return this.x=e,this.y=n,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;case 3:this.w=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this.w=e.w+n.w,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this.w+=e.w*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this.w=e.w-n.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const n=this.x,i=this.y,r=this.z,s=this.w,o=e.elements;return this.x=o[0]*n+o[4]*i+o[8]*r+o[12]*s,this.y=o[1]*n+o[5]*i+o[9]*r+o[13]*s,this.z=o[2]*n+o[6]*i+o[10]*r+o[14]*s,this.w=o[3]*n+o[7]*i+o[11]*r+o[15]*s,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const n=Math.sqrt(1-e.w*e.w);return n<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/n,this.y=e.y/n,this.z=e.z/n),this}setAxisAngleFromRotationMatrix(e){let n,i,r,s;const l=e.elements,u=l[0],c=l[4],f=l[8],d=l[1],p=l[5],g=l[9],S=l[2],m=l[6],h=l[10];if(Math.abs(c-d)<.01&&Math.abs(f-S)<.01&&Math.abs(g-m)<.01){if(Math.abs(c+d)<.1&&Math.abs(f+S)<.1&&Math.abs(g+m)<.1&&Math.abs(u+p+h-3)<.1)return this.set(1,0,0,0),this;n=Math.PI;const v=(u+1)/2,E=(p+1)/2,b=(h+1)/2,R=(c+d)/4,C=(f+S)/4,P=(g+m)/4;return v>E&&v>b?v<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(v),r=R/i,s=C/i):E>b?E<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(E),i=R/r,s=P/r):b<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(b),i=C/s,r=P/s),this.set(i,r,s,n),this}let _=Math.sqrt((m-g)*(m-g)+(f-S)*(f-S)+(d-c)*(d-c));return Math.abs(_)<.001&&(_=1),this.x=(m-g)/_,this.y=(f-S)/_,this.z=(d-c)/_,this.w=Math.acos((u+p+h-1)/2),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this.w=n[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,n){return this.x=Math.max(e.x,Math.min(n.x,this.x)),this.y=Math.max(e.y,Math.min(n.y,this.y)),this.z=Math.max(e.z,Math.min(n.z,this.z)),this.w=Math.max(e.w,Math.min(n.w,this.w)),this}clampScalar(e,n){return this.x=Math.max(e,Math.min(n,this.x)),this.y=Math.max(e,Math.min(n,this.y)),this.z=Math.max(e,Math.min(n,this.z)),this.w=Math.max(e,Math.min(n,this.w)),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(n,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this.w+=(e.w-this.w)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this.z=e.z+(n.z-e.z)*i,this.w=e.w+(n.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this.w=e[n+3],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e[n+3]=this.w,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this.w=e.getW(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class QA extends ko{constructor(e=1,n=1,i={}){super(),this.isRenderTarget=!0,this.width=e,this.height=n,this.depth=1,this.scissor=new ut(0,0,e,n),this.scissorTest=!1,this.viewport=new ut(0,0,e,n);const r={width:e,height:n,depth:1};i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:ci,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},i);const s=new fn(r,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace);s.flipY=!1,s.generateMipmaps=i.generateMipmaps,s.internalFormat=i.internalFormat,this.textures=[];const o=i.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,n,i=1){if(this.width!==e||this.height!==n||this.depth!==i){this.width=e,this.height=n,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=n,this.textures[r].image.depth=i;this.dispose()}this.viewport.set(0,0,e,n),this.scissor.set(0,0,e,n)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let i=0,r=e.textures.length;i<r;i++)this.textures[i]=e.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0;const n=Object.assign({},e.texture.image);return this.texture.source=new x1(n),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class xs extends QA{constructor(e=1,n=1,i={}){super(e,n,i),this.isWebGLRenderTarget=!0}}class y1 extends fn{constructor(e=null,n=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:n,height:i,depth:r},this.magFilter=Jn,this.minFilter=Jn,this.wrapR=cs,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class e2 extends fn{constructor(e=null,n=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:n,height:i,depth:r},this.magFilter=Jn,this.minFilter=Jn,this.wrapR=cs,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class ml{constructor(e=0,n=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=n,this._z=i,this._w=r}static slerpFlat(e,n,i,r,s,o,a){let l=i[r+0],u=i[r+1],c=i[r+2],f=i[r+3];const d=s[o+0],p=s[o+1],g=s[o+2],S=s[o+3];if(a===0){e[n+0]=l,e[n+1]=u,e[n+2]=c,e[n+3]=f;return}if(a===1){e[n+0]=d,e[n+1]=p,e[n+2]=g,e[n+3]=S;return}if(f!==S||l!==d||u!==p||c!==g){let m=1-a;const h=l*d+u*p+c*g+f*S,_=h>=0?1:-1,v=1-h*h;if(v>Number.EPSILON){const b=Math.sqrt(v),R=Math.atan2(b,h*_);m=Math.sin(m*R)/b,a=Math.sin(a*R)/b}const E=a*_;if(l=l*m+d*E,u=u*m+p*E,c=c*m+g*E,f=f*m+S*E,m===1-a){const b=1/Math.sqrt(l*l+u*u+c*c+f*f);l*=b,u*=b,c*=b,f*=b}}e[n]=l,e[n+1]=u,e[n+2]=c,e[n+3]=f}static multiplyQuaternionsFlat(e,n,i,r,s,o){const a=i[r],l=i[r+1],u=i[r+2],c=i[r+3],f=s[o],d=s[o+1],p=s[o+2],g=s[o+3];return e[n]=a*g+c*f+l*p-u*d,e[n+1]=l*g+c*d+u*f-a*p,e[n+2]=u*g+c*p+a*d-l*f,e[n+3]=c*g-a*f-l*d-u*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,n,i,r){return this._x=e,this._y=n,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,n=!0){const i=e._x,r=e._y,s=e._z,o=e._order,a=Math.cos,l=Math.sin,u=a(i/2),c=a(r/2),f=a(s/2),d=l(i/2),p=l(r/2),g=l(s/2);switch(o){case"XYZ":this._x=d*c*f+u*p*g,this._y=u*p*f-d*c*g,this._z=u*c*g+d*p*f,this._w=u*c*f-d*p*g;break;case"YXZ":this._x=d*c*f+u*p*g,this._y=u*p*f-d*c*g,this._z=u*c*g-d*p*f,this._w=u*c*f+d*p*g;break;case"ZXY":this._x=d*c*f-u*p*g,this._y=u*p*f+d*c*g,this._z=u*c*g+d*p*f,this._w=u*c*f-d*p*g;break;case"ZYX":this._x=d*c*f-u*p*g,this._y=u*p*f+d*c*g,this._z=u*c*g-d*p*f,this._w=u*c*f+d*p*g;break;case"YZX":this._x=d*c*f+u*p*g,this._y=u*p*f+d*c*g,this._z=u*c*g-d*p*f,this._w=u*c*f-d*p*g;break;case"XZY":this._x=d*c*f-u*p*g,this._y=u*p*f-d*c*g,this._z=u*c*g+d*p*f,this._w=u*c*f+d*p*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return n===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,n){const i=n/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const n=e.elements,i=n[0],r=n[4],s=n[8],o=n[1],a=n[5],l=n[9],u=n[2],c=n[6],f=n[10],d=i+a+f;if(d>0){const p=.5/Math.sqrt(d+1);this._w=.25/p,this._x=(c-l)*p,this._y=(s-u)*p,this._z=(o-r)*p}else if(i>a&&i>f){const p=2*Math.sqrt(1+i-a-f);this._w=(c-l)/p,this._x=.25*p,this._y=(r+o)/p,this._z=(s+u)/p}else if(a>f){const p=2*Math.sqrt(1+a-i-f);this._w=(s-u)/p,this._x=(r+o)/p,this._y=.25*p,this._z=(l+c)/p}else{const p=2*Math.sqrt(1+f-i-a);this._w=(o-r)/p,this._x=(s+u)/p,this._y=(l+c)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,n){let i=e.dot(n)+1;return i<Number.EPSILON?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*n.z-e.z*n.y,this._y=e.z*n.x-e.x*n.z,this._z=e.x*n.y-e.y*n.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(nn(this.dot(e),-1,1)))}rotateTowards(e,n){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,n/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,n){const i=e._x,r=e._y,s=e._z,o=e._w,a=n._x,l=n._y,u=n._z,c=n._w;return this._x=i*c+o*a+r*u-s*l,this._y=r*c+o*l+s*a-i*u,this._z=s*c+o*u+i*l-r*a,this._w=o*c-i*a-r*l-s*u,this._onChangeCallback(),this}slerp(e,n){if(n===0)return this;if(n===1)return this.copy(e);const i=this._x,r=this._y,s=this._z,o=this._w;let a=o*e._w+i*e._x+r*e._y+s*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=i,this._y=r,this._z=s,this;const l=1-a*a;if(l<=Number.EPSILON){const p=1-n;return this._w=p*o+n*this._w,this._x=p*i+n*this._x,this._y=p*r+n*this._y,this._z=p*s+n*this._z,this.normalize(),this}const u=Math.sqrt(l),c=Math.atan2(u,a),f=Math.sin((1-n)*c)/u,d=Math.sin(n*c)/u;return this._w=o*f+this._w*d,this._x=i*f+this._x*d,this._y=r*f+this._y*d,this._z=s*f+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,n,i){return this.copy(e).slerp(n,i)}random(){const e=2*Math.PI*Math.random(),n=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(n),s*Math.cos(n))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,n=0){return this._x=e[n],this._y=e[n+1],this._z=e[n+2],this._w=e[n+3],this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._w,e}fromBufferAttribute(e,n){return this._x=e.getX(n),this._y=e.getY(n),this._z=e.getZ(n),this._w=e.getW(n),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class L{constructor(e=0,n=0,i=0){L.prototype.isVector3=!0,this.x=e,this.y=n,this.z=i}set(e,n,i){return i===void 0&&(i=this.z),this.x=e,this.y=n,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,n){return this.x=e.x*n.x,this.y=e.y*n.y,this.z=e.z*n.z,this}applyEuler(e){return this.applyQuaternion(Ov.setFromEuler(e))}applyAxisAngle(e,n){return this.applyQuaternion(Ov.setFromAxisAngle(e,n))}applyMatrix3(e){const n=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*n+s[3]*i+s[6]*r,this.y=s[1]*n+s[4]*i+s[7]*r,this.z=s[2]*n+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const n=this.x,i=this.y,r=this.z,s=e.elements,o=1/(s[3]*n+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*n+s[4]*i+s[8]*r+s[12])*o,this.y=(s[1]*n+s[5]*i+s[9]*r+s[13])*o,this.z=(s[2]*n+s[6]*i+s[10]*r+s[14])*o,this}applyQuaternion(e){const n=this.x,i=this.y,r=this.z,s=e.x,o=e.y,a=e.z,l=e.w,u=2*(o*r-a*i),c=2*(a*n-s*r),f=2*(s*i-o*n);return this.x=n+l*u+o*f-a*c,this.y=i+l*c+a*u-s*f,this.z=r+l*f+s*c-o*u,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const n=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*n+s[4]*i+s[8]*r,this.y=s[1]*n+s[5]*i+s[9]*r,this.z=s[2]*n+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,n){return this.x=Math.max(e.x,Math.min(n.x,this.x)),this.y=Math.max(e.y,Math.min(n.y,this.y)),this.z=Math.max(e.z,Math.min(n.z,this.z)),this}clampScalar(e,n){return this.x=Math.max(e,Math.min(n,this.x)),this.y=Math.max(e,Math.min(n,this.y)),this.z=Math.max(e,Math.min(n,this.z)),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(n,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this.z=e.z+(n.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,n){const i=e.x,r=e.y,s=e.z,o=n.x,a=n.y,l=n.z;return this.x=r*l-s*a,this.y=s*o-i*l,this.z=i*a-r*o,this}projectOnVector(e){const n=e.lengthSq();if(n===0)return this.set(0,0,0);const i=e.dot(this)/n;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return id.copy(this).projectOnVector(e),this.sub(id)}reflect(e){return this.sub(id.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(e)/n;return Math.acos(nn(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return n*n+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,n,i){const r=Math.sin(n)*e;return this.x=r*Math.sin(i),this.y=Math.cos(n)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,n,i){return this.x=e*Math.sin(n),this.y=i,this.z=e*Math.cos(n),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this}setFromMatrixScale(e){const n=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=n,this.y=i,this.z=r,this}setFromMatrixColumn(e,n){return this.fromArray(e.elements,n*4)}setFromMatrix3Column(e,n){return this.fromArray(e.elements,n*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,n=Math.random()*2-1,i=Math.sqrt(1-n*n);return this.x=i*Math.cos(e),this.y=n,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const id=new L,Ov=new ml;class gl{constructor(e=new L(1/0,1/0,1/0),n=new L(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=n}set(e,n){return this.min.copy(e),this.max.copy(n),this}setFromArray(e){this.makeEmpty();for(let n=0,i=e.length;n<i;n+=3)this.expandByPoint(ri.fromArray(e,n));return this}setFromBufferAttribute(e){this.makeEmpty();for(let n=0,i=e.count;n<i;n++)this.expandByPoint(ri.fromBufferAttribute(e,n));return this}setFromPoints(e){this.makeEmpty();for(let n=0,i=e.length;n<i;n++)this.expandByPoint(e[n]);return this}setFromCenterAndSize(e,n){const i=ri.copy(n).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,n=!1){return this.makeEmpty(),this.expandByObject(e,n)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,n=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(n===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,ri):ri.fromBufferAttribute(s,o),ri.applyMatrix4(e.matrixWorld),this.expandByPoint(ri);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Vl.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Vl.copy(i.boundingBox)),Vl.applyMatrix4(e.matrixWorld),this.union(Vl)}const r=e.children;for(let s=0,o=r.length;s<o;s++)this.expandByObject(r[s],n);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,n){return n.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,ri),ri.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let n,i;return e.normal.x>0?(n=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(n=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(n+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(n+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(n+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(n+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),n<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Ko),Gl.subVectors(this.max,Ko),As.subVectors(e.a,Ko),Rs.subVectors(e.b,Ko),Ps.subVectors(e.c,Ko),rr.subVectors(Rs,As),sr.subVectors(Ps,Rs),Wr.subVectors(As,Ps);let n=[0,-rr.z,rr.y,0,-sr.z,sr.y,0,-Wr.z,Wr.y,rr.z,0,-rr.x,sr.z,0,-sr.x,Wr.z,0,-Wr.x,-rr.y,rr.x,0,-sr.y,sr.x,0,-Wr.y,Wr.x,0];return!rd(n,As,Rs,Ps,Gl)||(n=[1,0,0,0,1,0,0,0,1],!rd(n,As,Rs,Ps,Gl))?!1:(Wl.crossVectors(rr,sr),n=[Wl.x,Wl.y,Wl.z],rd(n,As,Rs,Ps,Gl))}clampPoint(e,n){return n.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,ri).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(ri).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Di[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Di[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Di[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Di[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Di[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Di[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Di[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Di[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Di),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const Di=[new L,new L,new L,new L,new L,new L,new L,new L],ri=new L,Vl=new gl,As=new L,Rs=new L,Ps=new L,rr=new L,sr=new L,Wr=new L,Ko=new L,Gl=new L,Wl=new L,$r=new L;function rd(t,e,n,i,r){for(let s=0,o=t.length-3;s<=o;s+=3){$r.fromArray(t,s);const a=r.x*Math.abs($r.x)+r.y*Math.abs($r.y)+r.z*Math.abs($r.z),l=e.dot($r),u=n.dot($r),c=i.dot($r);if(Math.max(-Math.max(l,u,c),Math.min(l,u,c))>a)return!1}return!0}const t2=new gl,Zo=new L,sd=new L;class og{constructor(e=new L,n=-1){this.isSphere=!0,this.center=e,this.radius=n}set(e,n){return this.center.copy(e),this.radius=n,this}setFromPoints(e,n){const i=this.center;n!==void 0?i.copy(n):t2.setFromPoints(e).getCenter(i);let r=0;for(let s=0,o=e.length;s<o;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const n=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=n*n}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,n){const i=this.center.distanceToSquared(e);return n.copy(e),i>this.radius*this.radius&&(n.sub(this.center).normalize(),n.multiplyScalar(this.radius).add(this.center)),n}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Zo.subVectors(e,this.center);const n=Zo.lengthSq();if(n>this.radius*this.radius){const i=Math.sqrt(n),r=(i-this.radius)*.5;this.center.addScaledVector(Zo,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(sd.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Zo.copy(e.center).add(sd)),this.expandByPoint(Zo.copy(e.center).sub(sd))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Ii=new L,od=new L,$l=new L,or=new L,ad=new L,Xl=new L,ld=new L;class n2{constructor(e=new L,n=new L(0,0,-1)){this.origin=e,this.direction=n}set(e,n){return this.origin.copy(e),this.direction.copy(n),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,n){return n.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Ii)),this}closestPointToPoint(e,n){n.subVectors(e,this.origin);const i=n.dot(this.direction);return i<0?n.copy(this.origin):n.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const n=Ii.subVectors(e,this.origin).dot(this.direction);return n<0?this.origin.distanceToSquared(e):(Ii.copy(this.origin).addScaledVector(this.direction,n),Ii.distanceToSquared(e))}distanceSqToSegment(e,n,i,r){od.copy(e).add(n).multiplyScalar(.5),$l.copy(n).sub(e).normalize(),or.copy(this.origin).sub(od);const s=e.distanceTo(n)*.5,o=-this.direction.dot($l),a=or.dot(this.direction),l=-or.dot($l),u=or.lengthSq(),c=Math.abs(1-o*o);let f,d,p,g;if(c>0)if(f=o*l-a,d=o*a-l,g=s*c,f>=0)if(d>=-g)if(d<=g){const S=1/c;f*=S,d*=S,p=f*(f+o*d+2*a)+d*(o*f+d+2*l)+u}else d=s,f=Math.max(0,-(o*d+a)),p=-f*f+d*(d+2*l)+u;else d=-s,f=Math.max(0,-(o*d+a)),p=-f*f+d*(d+2*l)+u;else d<=-g?(f=Math.max(0,-(-o*s+a)),d=f>0?-s:Math.min(Math.max(-s,-l),s),p=-f*f+d*(d+2*l)+u):d<=g?(f=0,d=Math.min(Math.max(-s,-l),s),p=d*(d+2*l)+u):(f=Math.max(0,-(o*s+a)),d=f>0?s:Math.min(Math.max(-s,-l),s),p=-f*f+d*(d+2*l)+u);else d=o>0?-s:s,f=Math.max(0,-(o*d+a)),p=-f*f+d*(d+2*l)+u;return i&&i.copy(this.origin).addScaledVector(this.direction,f),r&&r.copy(od).addScaledVector($l,d),p}intersectSphere(e,n){Ii.subVectors(e.center,this.origin);const i=Ii.dot(this.direction),r=Ii.dot(Ii)-i*i,s=e.radius*e.radius;if(r>s)return null;const o=Math.sqrt(s-r),a=i-o,l=i+o;return l<0?null:a<0?this.at(l,n):this.at(a,n)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const n=e.normal.dot(this.direction);if(n===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/n;return i>=0?i:null}intersectPlane(e,n){const i=this.distanceToPlane(e);return i===null?null:this.at(i,n)}intersectsPlane(e){const n=e.distanceToPoint(this.origin);return n===0||e.normal.dot(this.direction)*n<0}intersectBox(e,n){let i,r,s,o,a,l;const u=1/this.direction.x,c=1/this.direction.y,f=1/this.direction.z,d=this.origin;return u>=0?(i=(e.min.x-d.x)*u,r=(e.max.x-d.x)*u):(i=(e.max.x-d.x)*u,r=(e.min.x-d.x)*u),c>=0?(s=(e.min.y-d.y)*c,o=(e.max.y-d.y)*c):(s=(e.max.y-d.y)*c,o=(e.min.y-d.y)*c),i>o||s>r||((s>i||isNaN(i))&&(i=s),(o<r||isNaN(r))&&(r=o),f>=0?(a=(e.min.z-d.z)*f,l=(e.max.z-d.z)*f):(a=(e.max.z-d.z)*f,l=(e.min.z-d.z)*f),i>l||a>r)||((a>i||i!==i)&&(i=a),(l<r||r!==r)&&(r=l),r<0)?null:this.at(i>=0?i:r,n)}intersectsBox(e){return this.intersectBox(e,Ii)!==null}intersectTriangle(e,n,i,r,s){ad.subVectors(n,e),Xl.subVectors(i,e),ld.crossVectors(ad,Xl);let o=this.direction.dot(ld),a;if(o>0){if(r)return null;a=1}else if(o<0)a=-1,o=-o;else return null;or.subVectors(this.origin,e);const l=a*this.direction.dot(Xl.crossVectors(or,Xl));if(l<0)return null;const u=a*this.direction.dot(ad.cross(or));if(u<0||l+u>o)return null;const c=-a*or.dot(ld);return c<0?null:this.at(c/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class yt{constructor(e,n,i,r,s,o,a,l,u,c,f,d,p,g,S,m){yt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,n,i,r,s,o,a,l,u,c,f,d,p,g,S,m)}set(e,n,i,r,s,o,a,l,u,c,f,d,p,g,S,m){const h=this.elements;return h[0]=e,h[4]=n,h[8]=i,h[12]=r,h[1]=s,h[5]=o,h[9]=a,h[13]=l,h[2]=u,h[6]=c,h[10]=f,h[14]=d,h[3]=p,h[7]=g,h[11]=S,h[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new yt().fromArray(this.elements)}copy(e){const n=this.elements,i=e.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],n[9]=i[9],n[10]=i[10],n[11]=i[11],n[12]=i[12],n[13]=i[13],n[14]=i[14],n[15]=i[15],this}copyPosition(e){const n=this.elements,i=e.elements;return n[12]=i[12],n[13]=i[13],n[14]=i[14],this}setFromMatrix3(e){const n=e.elements;return this.set(n[0],n[3],n[6],0,n[1],n[4],n[7],0,n[2],n[5],n[8],0,0,0,0,1),this}extractBasis(e,n,i){return e.setFromMatrixColumn(this,0),n.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,n,i){return this.set(e.x,n.x,i.x,0,e.y,n.y,i.y,0,e.z,n.z,i.z,0,0,0,0,1),this}extractRotation(e){const n=this.elements,i=e.elements,r=1/bs.setFromMatrixColumn(e,0).length(),s=1/bs.setFromMatrixColumn(e,1).length(),o=1/bs.setFromMatrixColumn(e,2).length();return n[0]=i[0]*r,n[1]=i[1]*r,n[2]=i[2]*r,n[3]=0,n[4]=i[4]*s,n[5]=i[5]*s,n[6]=i[6]*s,n[7]=0,n[8]=i[8]*o,n[9]=i[9]*o,n[10]=i[10]*o,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromEuler(e){const n=this.elements,i=e.x,r=e.y,s=e.z,o=Math.cos(i),a=Math.sin(i),l=Math.cos(r),u=Math.sin(r),c=Math.cos(s),f=Math.sin(s);if(e.order==="XYZ"){const d=o*c,p=o*f,g=a*c,S=a*f;n[0]=l*c,n[4]=-l*f,n[8]=u,n[1]=p+g*u,n[5]=d-S*u,n[9]=-a*l,n[2]=S-d*u,n[6]=g+p*u,n[10]=o*l}else if(e.order==="YXZ"){const d=l*c,p=l*f,g=u*c,S=u*f;n[0]=d+S*a,n[4]=g*a-p,n[8]=o*u,n[1]=o*f,n[5]=o*c,n[9]=-a,n[2]=p*a-g,n[6]=S+d*a,n[10]=o*l}else if(e.order==="ZXY"){const d=l*c,p=l*f,g=u*c,S=u*f;n[0]=d-S*a,n[4]=-o*f,n[8]=g+p*a,n[1]=p+g*a,n[5]=o*c,n[9]=S-d*a,n[2]=-o*u,n[6]=a,n[10]=o*l}else if(e.order==="ZYX"){const d=o*c,p=o*f,g=a*c,S=a*f;n[0]=l*c,n[4]=g*u-p,n[8]=d*u+S,n[1]=l*f,n[5]=S*u+d,n[9]=p*u-g,n[2]=-u,n[6]=a*l,n[10]=o*l}else if(e.order==="YZX"){const d=o*l,p=o*u,g=a*l,S=a*u;n[0]=l*c,n[4]=S-d*f,n[8]=g*f+p,n[1]=f,n[5]=o*c,n[9]=-a*c,n[2]=-u*c,n[6]=p*f+g,n[10]=d-S*f}else if(e.order==="XZY"){const d=o*l,p=o*u,g=a*l,S=a*u;n[0]=l*c,n[4]=-f,n[8]=u*c,n[1]=d*f+S,n[5]=o*c,n[9]=p*f-g,n[2]=g*f-p,n[6]=a*c,n[10]=S*f+d}return n[3]=0,n[7]=0,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromQuaternion(e){return this.compose(i2,e,r2)}lookAt(e,n,i){const r=this.elements;return Pn.subVectors(e,n),Pn.lengthSq()===0&&(Pn.z=1),Pn.normalize(),ar.crossVectors(i,Pn),ar.lengthSq()===0&&(Math.abs(i.z)===1?Pn.x+=1e-4:Pn.z+=1e-4,Pn.normalize(),ar.crossVectors(i,Pn)),ar.normalize(),jl.crossVectors(Pn,ar),r[0]=ar.x,r[4]=jl.x,r[8]=Pn.x,r[1]=ar.y,r[5]=jl.y,r[9]=Pn.y,r[2]=ar.z,r[6]=jl.z,r[10]=Pn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const i=e.elements,r=n.elements,s=this.elements,o=i[0],a=i[4],l=i[8],u=i[12],c=i[1],f=i[5],d=i[9],p=i[13],g=i[2],S=i[6],m=i[10],h=i[14],_=i[3],v=i[7],E=i[11],b=i[15],R=r[0],C=r[4],P=r[8],Q=r[12],y=r[1],w=r[5],$=r[9],O=r[13],j=r[2],K=r[6],z=r[10],ne=r[14],D=r[3],J=r[7],ee=r[11],re=r[15];return s[0]=o*R+a*y+l*j+u*D,s[4]=o*C+a*w+l*K+u*J,s[8]=o*P+a*$+l*z+u*ee,s[12]=o*Q+a*O+l*ne+u*re,s[1]=c*R+f*y+d*j+p*D,s[5]=c*C+f*w+d*K+p*J,s[9]=c*P+f*$+d*z+p*ee,s[13]=c*Q+f*O+d*ne+p*re,s[2]=g*R+S*y+m*j+h*D,s[6]=g*C+S*w+m*K+h*J,s[10]=g*P+S*$+m*z+h*ee,s[14]=g*Q+S*O+m*ne+h*re,s[3]=_*R+v*y+E*j+b*D,s[7]=_*C+v*w+E*K+b*J,s[11]=_*P+v*$+E*z+b*ee,s[15]=_*Q+v*O+E*ne+b*re,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[4]*=e,n[8]*=e,n[12]*=e,n[1]*=e,n[5]*=e,n[9]*=e,n[13]*=e,n[2]*=e,n[6]*=e,n[10]*=e,n[14]*=e,n[3]*=e,n[7]*=e,n[11]*=e,n[15]*=e,this}determinant(){const e=this.elements,n=e[0],i=e[4],r=e[8],s=e[12],o=e[1],a=e[5],l=e[9],u=e[13],c=e[2],f=e[6],d=e[10],p=e[14],g=e[3],S=e[7],m=e[11],h=e[15];return g*(+s*l*f-r*u*f-s*a*d+i*u*d+r*a*p-i*l*p)+S*(+n*l*p-n*u*d+s*o*d-r*o*p+r*u*c-s*l*c)+m*(+n*u*f-n*a*p-s*o*f+i*o*p+s*a*c-i*u*c)+h*(-r*a*c-n*l*f+n*a*d+r*o*f-i*o*d+i*l*c)}transpose(){const e=this.elements;let n;return n=e[1],e[1]=e[4],e[4]=n,n=e[2],e[2]=e[8],e[8]=n,n=e[6],e[6]=e[9],e[9]=n,n=e[3],e[3]=e[12],e[12]=n,n=e[7],e[7]=e[13],e[13]=n,n=e[11],e[11]=e[14],e[14]=n,this}setPosition(e,n,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=n,r[14]=i),this}invert(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],u=e[7],c=e[8],f=e[9],d=e[10],p=e[11],g=e[12],S=e[13],m=e[14],h=e[15],_=f*m*u-S*d*u+S*l*p-a*m*p-f*l*h+a*d*h,v=g*d*u-c*m*u-g*l*p+o*m*p+c*l*h-o*d*h,E=c*S*u-g*f*u+g*a*p-o*S*p-c*a*h+o*f*h,b=g*f*l-c*S*l-g*a*d+o*S*d+c*a*m-o*f*m,R=n*_+i*v+r*E+s*b;if(R===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const C=1/R;return e[0]=_*C,e[1]=(S*d*s-f*m*s-S*r*p+i*m*p+f*r*h-i*d*h)*C,e[2]=(a*m*s-S*l*s+S*r*u-i*m*u-a*r*h+i*l*h)*C,e[3]=(f*l*s-a*d*s-f*r*u+i*d*u+a*r*p-i*l*p)*C,e[4]=v*C,e[5]=(c*m*s-g*d*s+g*r*p-n*m*p-c*r*h+n*d*h)*C,e[6]=(g*l*s-o*m*s-g*r*u+n*m*u+o*r*h-n*l*h)*C,e[7]=(o*d*s-c*l*s+c*r*u-n*d*u-o*r*p+n*l*p)*C,e[8]=E*C,e[9]=(g*f*s-c*S*s-g*i*p+n*S*p+c*i*h-n*f*h)*C,e[10]=(o*S*s-g*a*s+g*i*u-n*S*u-o*i*h+n*a*h)*C,e[11]=(c*a*s-o*f*s-c*i*u+n*f*u+o*i*p-n*a*p)*C,e[12]=b*C,e[13]=(c*S*r-g*f*r+g*i*d-n*S*d-c*i*m+n*f*m)*C,e[14]=(g*a*r-o*S*r-g*i*l+n*S*l+o*i*m-n*a*m)*C,e[15]=(o*f*r-c*a*r+c*i*l-n*f*l-o*i*d+n*a*d)*C,this}scale(e){const n=this.elements,i=e.x,r=e.y,s=e.z;return n[0]*=i,n[4]*=r,n[8]*=s,n[1]*=i,n[5]*=r,n[9]*=s,n[2]*=i,n[6]*=r,n[10]*=s,n[3]*=i,n[7]*=r,n[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,n=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(n,i,r))}makeTranslation(e,n,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,n,0,0,1,i,0,0,0,1),this}makeRotationX(e){const n=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,n,-i,0,0,i,n,0,0,0,0,1),this}makeRotationY(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,0,i,0,0,1,0,0,-i,0,n,0,0,0,0,1),this}makeRotationZ(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,-i,0,0,i,n,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,n){const i=Math.cos(n),r=Math.sin(n),s=1-i,o=e.x,a=e.y,l=e.z,u=s*o,c=s*a;return this.set(u*o+i,u*a-r*l,u*l+r*a,0,u*a+r*l,c*a+i,c*l-r*o,0,u*l-r*a,c*l+r*o,s*l*l+i,0,0,0,0,1),this}makeScale(e,n,i){return this.set(e,0,0,0,0,n,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,n,i,r,s,o){return this.set(1,i,s,0,e,1,o,0,n,r,1,0,0,0,0,1),this}compose(e,n,i){const r=this.elements,s=n._x,o=n._y,a=n._z,l=n._w,u=s+s,c=o+o,f=a+a,d=s*u,p=s*c,g=s*f,S=o*c,m=o*f,h=a*f,_=l*u,v=l*c,E=l*f,b=i.x,R=i.y,C=i.z;return r[0]=(1-(S+h))*b,r[1]=(p+E)*b,r[2]=(g-v)*b,r[3]=0,r[4]=(p-E)*R,r[5]=(1-(d+h))*R,r[6]=(m+_)*R,r[7]=0,r[8]=(g+v)*C,r[9]=(m-_)*C,r[10]=(1-(d+S))*C,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,n,i){const r=this.elements;let s=bs.set(r[0],r[1],r[2]).length();const o=bs.set(r[4],r[5],r[6]).length(),a=bs.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),e.x=r[12],e.y=r[13],e.z=r[14],si.copy(this);const u=1/s,c=1/o,f=1/a;return si.elements[0]*=u,si.elements[1]*=u,si.elements[2]*=u,si.elements[4]*=c,si.elements[5]*=c,si.elements[6]*=c,si.elements[8]*=f,si.elements[9]*=f,si.elements[10]*=f,n.setFromRotationMatrix(si),i.x=s,i.y=o,i.z=a,this}makePerspective(e,n,i,r,s,o,a=Wi){const l=this.elements,u=2*s/(n-e),c=2*s/(i-r),f=(n+e)/(n-e),d=(i+r)/(i-r);let p,g;if(a===Wi)p=-(o+s)/(o-s),g=-2*o*s/(o-s);else if(a===Lc)p=-o/(o-s),g=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=u,l[4]=0,l[8]=f,l[12]=0,l[1]=0,l[5]=c,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,n,i,r,s,o,a=Wi){const l=this.elements,u=1/(n-e),c=1/(i-r),f=1/(o-s),d=(n+e)*u,p=(i+r)*c;let g,S;if(a===Wi)g=(o+s)*f,S=-2*f;else if(a===Lc)g=s*f,S=-1*f;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*u,l[4]=0,l[8]=0,l[12]=-d,l[1]=0,l[5]=2*c,l[9]=0,l[13]=-p,l[2]=0,l[6]=0,l[10]=S,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const n=this.elements,i=e.elements;for(let r=0;r<16;r++)if(n[r]!==i[r])return!1;return!0}fromArray(e,n=0){for(let i=0;i<16;i++)this.elements[i]=e[i+n];return this}toArray(e=[],n=0){const i=this.elements;return e[n]=i[0],e[n+1]=i[1],e[n+2]=i[2],e[n+3]=i[3],e[n+4]=i[4],e[n+5]=i[5],e[n+6]=i[6],e[n+7]=i[7],e[n+8]=i[8],e[n+9]=i[9],e[n+10]=i[10],e[n+11]=i[11],e[n+12]=i[12],e[n+13]=i[13],e[n+14]=i[14],e[n+15]=i[15],e}}const bs=new L,si=new yt,i2=new L(0,0,0),r2=new L(1,1,1),ar=new L,jl=new L,Pn=new L,Bv=new yt,zv=new ml;class Ai{constructor(e=0,n=0,i=0,r=Ai.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=n,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,n,i,r=this._order){return this._x=e,this._y=n,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,n=this._order,i=!0){const r=e.elements,s=r[0],o=r[4],a=r[8],l=r[1],u=r[5],c=r[9],f=r[2],d=r[6],p=r[10];switch(n){case"XYZ":this._y=Math.asin(nn(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-c,p),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(d,u),this._z=0);break;case"YXZ":this._x=Math.asin(-nn(c,-1,1)),Math.abs(c)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(l,u)):(this._y=Math.atan2(-f,s),this._z=0);break;case"ZXY":this._x=Math.asin(nn(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-f,p),this._z=Math.atan2(-o,u)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-nn(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(d,p),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,u));break;case"YZX":this._z=Math.asin(nn(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-c,u),this._y=Math.atan2(-f,s)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-nn(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,u),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-c,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+n)}return this._order=n,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,n,i){return Bv.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Bv,n,i)}setFromVector3(e,n=this._order){return this.set(e.x,e.y,e.z,n)}reorder(e){return zv.setFromEuler(this),this.setFromQuaternion(zv,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Ai.DEFAULT_ORDER="XYZ";class S1{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let s2=0;const Hv=new L,Ls=new ml,Ni=new yt,Yl=new L,Jo=new L,o2=new L,a2=new ml,Vv=new L(1,0,0),Gv=new L(0,1,0),Wv=new L(0,0,1),$v={type:"added"},l2={type:"removed"},Ds={type:"childadded",child:null},ud={type:"childremoved",child:null};class kt extends ko{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:s2++}),this.uuid=Fo(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=kt.DEFAULT_UP.clone();const e=new L,n=new Ai,i=new ml,r=new L(1,1,1);function s(){i.setFromEuler(n,!1)}function o(){n.setFromQuaternion(i,void 0,!1)}n._onChange(s),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new yt},normalMatrix:{value:new Ye}}),this.matrix=new yt,this.matrixWorld=new yt,this.matrixAutoUpdate=kt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=kt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new S1,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,n){this.quaternion.setFromAxisAngle(e,n)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,n){return Ls.setFromAxisAngle(e,n),this.quaternion.multiply(Ls),this}rotateOnWorldAxis(e,n){return Ls.setFromAxisAngle(e,n),this.quaternion.premultiply(Ls),this}rotateX(e){return this.rotateOnAxis(Vv,e)}rotateY(e){return this.rotateOnAxis(Gv,e)}rotateZ(e){return this.rotateOnAxis(Wv,e)}translateOnAxis(e,n){return Hv.copy(e).applyQuaternion(this.quaternion),this.position.add(Hv.multiplyScalar(n)),this}translateX(e){return this.translateOnAxis(Vv,e)}translateY(e){return this.translateOnAxis(Gv,e)}translateZ(e){return this.translateOnAxis(Wv,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Ni.copy(this.matrixWorld).invert())}lookAt(e,n,i){e.isVector3?Yl.copy(e):Yl.set(e,n,i);const r=this.parent;this.updateWorldMatrix(!0,!1),Jo.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ni.lookAt(Jo,Yl,this.up):Ni.lookAt(Yl,Jo,this.up),this.quaternion.setFromRotationMatrix(Ni),r&&(Ni.extractRotation(r.matrixWorld),Ls.setFromRotationMatrix(Ni),this.quaternion.premultiply(Ls.invert()))}add(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.add(arguments[n]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent($v),Ds.child=e,this.dispatchEvent(Ds),Ds.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const n=this.children.indexOf(e);return n!==-1&&(e.parent=null,this.children.splice(n,1),e.dispatchEvent(l2),ud.child=e,this.dispatchEvent(ud),ud.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Ni.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Ni.multiply(e.parent.matrixWorld)),e.applyMatrix4(Ni),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent($v),Ds.child=e,this.dispatchEvent(Ds),Ds.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,n){if(this[e]===n)return this;for(let i=0,r=this.children.length;i<r;i++){const o=this.children[i].getObjectByProperty(e,n);if(o!==void 0)return o}}getObjectsByProperty(e,n,i=[]){this[e]===n&&i.push(this);const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].getObjectsByProperty(e,n,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Jo,e,o2),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Jo,a2,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const n=this.matrixWorld.elements;return e.set(n[8],n[9],n[10]).normalize()}raycast(){}traverse(e){e(this);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].traverseVisible(e)}traverseAncestors(e){const n=this.parent;n!==null&&(e(n),n.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].updateMatrixWorld(e)}updateWorldMatrix(e,n){const i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),n===!0){const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(e){const n=e===void 0||typeof e=="string",i={};n&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let u=0,c=l.length;u<c;u++){const f=l[u];s(e.shapes,f)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,u=this.material.length;l<u;l++)a.push(s(e.materials,this.material[l]));r.material=a}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let a=0;a<this.children.length;a++)r.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];r.animations.push(s(e.animations,l))}}if(n){const a=o(e.geometries),l=o(e.materials),u=o(e.textures),c=o(e.images),f=o(e.shapes),d=o(e.skeletons),p=o(e.animations),g=o(e.nodes);a.length>0&&(i.geometries=a),l.length>0&&(i.materials=l),u.length>0&&(i.textures=u),c.length>0&&(i.images=c),f.length>0&&(i.shapes=f),d.length>0&&(i.skeletons=d),p.length>0&&(i.animations=p),g.length>0&&(i.nodes=g)}return i.object=r,i;function o(a){const l=[];for(const u in a){const c=a[u];delete c.metadata,l.push(c)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,n=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),n===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}}kt.DEFAULT_UP=new L(0,1,0);kt.DEFAULT_MATRIX_AUTO_UPDATE=!0;kt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const oi=new L,Ui=new L,cd=new L,ki=new L,Is=new L,Ns=new L,Xv=new L,fd=new L,dd=new L,hd=new L,pd=new ut,md=new ut,gd=new ut;class fi{constructor(e=new L,n=new L,i=new L){this.a=e,this.b=n,this.c=i}static getNormal(e,n,i,r){r.subVectors(i,n),oi.subVectors(e,n),r.cross(oi);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,n,i,r,s){oi.subVectors(r,n),Ui.subVectors(i,n),cd.subVectors(e,n);const o=oi.dot(oi),a=oi.dot(Ui),l=oi.dot(cd),u=Ui.dot(Ui),c=Ui.dot(cd),f=o*u-a*a;if(f===0)return s.set(0,0,0),null;const d=1/f,p=(u*l-a*c)*d,g=(o*c-a*l)*d;return s.set(1-p-g,g,p)}static containsPoint(e,n,i,r){return this.getBarycoord(e,n,i,r,ki)===null?!1:ki.x>=0&&ki.y>=0&&ki.x+ki.y<=1}static getInterpolation(e,n,i,r,s,o,a,l){return this.getBarycoord(e,n,i,r,ki)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,ki.x),l.addScaledVector(o,ki.y),l.addScaledVector(a,ki.z),l)}static getInterpolatedAttribute(e,n,i,r,s,o){return pd.setScalar(0),md.setScalar(0),gd.setScalar(0),pd.fromBufferAttribute(e,n),md.fromBufferAttribute(e,i),gd.fromBufferAttribute(e,r),o.setScalar(0),o.addScaledVector(pd,s.x),o.addScaledVector(md,s.y),o.addScaledVector(gd,s.z),o}static isFrontFacing(e,n,i,r){return oi.subVectors(i,n),Ui.subVectors(e,n),oi.cross(Ui).dot(r)<0}set(e,n,i){return this.a.copy(e),this.b.copy(n),this.c.copy(i),this}setFromPointsAndIndices(e,n,i,r){return this.a.copy(e[n]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,n,i,r){return this.a.fromBufferAttribute(e,n),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return oi.subVectors(this.c,this.b),Ui.subVectors(this.a,this.b),oi.cross(Ui).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return fi.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,n){return fi.getBarycoord(e,this.a,this.b,this.c,n)}getInterpolation(e,n,i,r,s){return fi.getInterpolation(e,this.a,this.b,this.c,n,i,r,s)}containsPoint(e){return fi.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return fi.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,n){const i=this.a,r=this.b,s=this.c;let o,a;Is.subVectors(r,i),Ns.subVectors(s,i),fd.subVectors(e,i);const l=Is.dot(fd),u=Ns.dot(fd);if(l<=0&&u<=0)return n.copy(i);dd.subVectors(e,r);const c=Is.dot(dd),f=Ns.dot(dd);if(c>=0&&f<=c)return n.copy(r);const d=l*f-c*u;if(d<=0&&l>=0&&c<=0)return o=l/(l-c),n.copy(i).addScaledVector(Is,o);hd.subVectors(e,s);const p=Is.dot(hd),g=Ns.dot(hd);if(g>=0&&p<=g)return n.copy(s);const S=p*u-l*g;if(S<=0&&u>=0&&g<=0)return a=u/(u-g),n.copy(i).addScaledVector(Ns,a);const m=c*g-p*f;if(m<=0&&f-c>=0&&p-g>=0)return Xv.subVectors(s,r),a=(f-c)/(f-c+(p-g)),n.copy(r).addScaledVector(Xv,a);const h=1/(m+S+d);return o=S*h,a=d*h,n.copy(i).addScaledVector(Is,o).addScaledVector(Ns,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const M1={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},lr={h:0,s:0,l:0},ql={h:0,s:0,l:0};function vd(t,e,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?t+(e-t)*6*n:n<1/2?e:n<2/3?t+(e-t)*6*(2/3-n):t}class nt{constructor(e,n,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,n,i)}set(e,n,i){if(n===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,n,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,n=an){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,ot.toWorkingColorSpace(this,n),this}setRGB(e,n,i,r=ot.workingColorSpace){return this.r=e,this.g=n,this.b=i,ot.toWorkingColorSpace(this,r),this}setHSL(e,n,i,r=ot.workingColorSpace){if(e=WA(e,1),n=nn(n,0,1),i=nn(i,0,1),n===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+n):i+n-i*n,o=2*i-s;this.r=vd(o,s,e+1/3),this.g=vd(o,s,e),this.b=vd(o,s,e-1/3)}return ot.toWorkingColorSpace(this,r),this}setStyle(e,n=an){function i(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const o=r[1],a=r[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,n);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,n);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,n);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,n);if(o===6)return this.setHex(parseInt(s,16),n);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,n);return this}setColorName(e,n=an){const i=M1[e.toLowerCase()];return i!==void 0?this.setHex(i,n):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=ho(e.r),this.g=ho(e.g),this.b=ho(e.b),this}copyLinearToSRGB(e){return this.r=td(e.r),this.g=td(e.g),this.b=td(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=an){return ot.fromWorkingColorSpace(en.copy(this),e),Math.round(nn(en.r*255,0,255))*65536+Math.round(nn(en.g*255,0,255))*256+Math.round(nn(en.b*255,0,255))}getHexString(e=an){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,n=ot.workingColorSpace){ot.fromWorkingColorSpace(en.copy(this),n);const i=en.r,r=en.g,s=en.b,o=Math.max(i,r,s),a=Math.min(i,r,s);let l,u;const c=(a+o)/2;if(a===o)l=0,u=0;else{const f=o-a;switch(u=c<=.5?f/(o+a):f/(2-o-a),o){case i:l=(r-s)/f+(r<s?6:0);break;case r:l=(s-i)/f+2;break;case s:l=(i-r)/f+4;break}l/=6}return e.h=l,e.s=u,e.l=c,e}getRGB(e,n=ot.workingColorSpace){return ot.fromWorkingColorSpace(en.copy(this),n),e.r=en.r,e.g=en.g,e.b=en.b,e}getStyle(e=an){ot.fromWorkingColorSpace(en.copy(this),e);const n=en.r,i=en.g,r=en.b;return e!==an?`color(${e} ${n.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(n*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,n,i){return this.getHSL(lr),this.setHSL(lr.h+e,lr.s+n,lr.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,n){return this.r=e.r+n.r,this.g=e.g+n.g,this.b=e.b+n.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,n){return this.r+=(e.r-this.r)*n,this.g+=(e.g-this.g)*n,this.b+=(e.b-this.b)*n,this}lerpColors(e,n,i){return this.r=e.r+(n.r-e.r)*i,this.g=e.g+(n.g-e.g)*i,this.b=e.b+(n.b-e.b)*i,this}lerpHSL(e,n){this.getHSL(lr),e.getHSL(ql);const i=Qf(lr.h,ql.h,n),r=Qf(lr.s,ql.s,n),s=Qf(lr.l,ql.l,n);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const n=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*n+s[3]*i+s[6]*r,this.g=s[1]*n+s[4]*i+s[7]*r,this.b=s[2]*n+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,n=0){return this.r=e[n],this.g=e[n+1],this.b=e[n+2],this}toArray(e=[],n=0){return e[n]=this.r,e[n+1]=this.g,e[n+2]=this.b,e}fromBufferAttribute(e,n){return this.r=e.getX(n),this.g=e.getY(n),this.b=e.getZ(n),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const en=new nt;nt.NAMES=M1;let u2=0;class vl extends ko{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:u2++}),this.uuid=Fo(),this.name="",this.type="Material",this.blending=co,this.side=Ur,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Hh,this.blendDst=Vh,this.blendEquation=is,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new nt(0,0,0),this.blendAlpha=0,this.depthFunc=Mo,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Dv,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ts,this.stencilZFail=Ts,this.stencilZPass=Ts,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const n in e){const i=e[n];if(i===void 0){console.warn(`THREE.Material: parameter '${n}' has value of undefined.`);continue}const r=this[n];if(r===void 0){console.warn(`THREE.Material: '${n}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[n]=i}}toJSON(e){const n=e===void 0||typeof e=="string";n&&(e={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==co&&(i.blending=this.blending),this.side!==Ur&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Hh&&(i.blendSrc=this.blendSrc),this.blendDst!==Vh&&(i.blendDst=this.blendDst),this.blendEquation!==is&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Mo&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Dv&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ts&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Ts&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Ts&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const o=[];for(const a in s){const l=s[a];delete l.metadata,o.push(l)}return o}if(n){const s=r(e.textures),o=r(e.images);s.length>0&&(i.textures=s),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const n=e.clippingPlanes;let i=null;if(n!==null){const r=n.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=n[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Ao extends vl{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new nt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ai,this.combine=i1,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Dt=new L,Kl=new ge;class Ci{constructor(e,n,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=n,this.count=e!==void 0?e.length/n:0,this.normalized=i,this.usage=Iv,this.updateRanges=[],this.gpuType=Gi,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,n){this.updateRanges.push({start:e,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,n,i){e*=this.itemSize,i*=n.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=n.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let n=0,i=this.count;n<i;n++)Kl.fromBufferAttribute(this,n),Kl.applyMatrix3(e),this.setXY(n,Kl.x,Kl.y);else if(this.itemSize===3)for(let n=0,i=this.count;n<i;n++)Dt.fromBufferAttribute(this,n),Dt.applyMatrix3(e),this.setXYZ(n,Dt.x,Dt.y,Dt.z);return this}applyMatrix4(e){for(let n=0,i=this.count;n<i;n++)Dt.fromBufferAttribute(this,n),Dt.applyMatrix4(e),this.setXYZ(n,Dt.x,Dt.y,Dt.z);return this}applyNormalMatrix(e){for(let n=0,i=this.count;n<i;n++)Dt.fromBufferAttribute(this,n),Dt.applyNormalMatrix(e),this.setXYZ(n,Dt.x,Dt.y,Dt.z);return this}transformDirection(e){for(let n=0,i=this.count;n<i;n++)Dt.fromBufferAttribute(this,n),Dt.transformDirection(e),this.setXYZ(n,Dt.x,Dt.y,Dt.z);return this}set(e,n=0){return this.array.set(e,n),this}getComponent(e,n){let i=this.array[e*this.itemSize+n];return this.normalized&&(i=Yo(i,this.array)),i}setComponent(e,n,i){return this.normalized&&(i=_n(i,this.array)),this.array[e*this.itemSize+n]=i,this}getX(e){let n=this.array[e*this.itemSize];return this.normalized&&(n=Yo(n,this.array)),n}setX(e,n){return this.normalized&&(n=_n(n,this.array)),this.array[e*this.itemSize]=n,this}getY(e){let n=this.array[e*this.itemSize+1];return this.normalized&&(n=Yo(n,this.array)),n}setY(e,n){return this.normalized&&(n=_n(n,this.array)),this.array[e*this.itemSize+1]=n,this}getZ(e){let n=this.array[e*this.itemSize+2];return this.normalized&&(n=Yo(n,this.array)),n}setZ(e,n){return this.normalized&&(n=_n(n,this.array)),this.array[e*this.itemSize+2]=n,this}getW(e){let n=this.array[e*this.itemSize+3];return this.normalized&&(n=Yo(n,this.array)),n}setW(e,n){return this.normalized&&(n=_n(n,this.array)),this.array[e*this.itemSize+3]=n,this}setXY(e,n,i){return e*=this.itemSize,this.normalized&&(n=_n(n,this.array),i=_n(i,this.array)),this.array[e+0]=n,this.array[e+1]=i,this}setXYZ(e,n,i,r){return e*=this.itemSize,this.normalized&&(n=_n(n,this.array),i=_n(i,this.array),r=_n(r,this.array)),this.array[e+0]=n,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,n,i,r,s){return e*=this.itemSize,this.normalized&&(n=_n(n,this.array),i=_n(i,this.array),r=_n(r,this.array),s=_n(s,this.array)),this.array[e+0]=n,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Iv&&(e.usage=this.usage),e}}class E1 extends Ci{constructor(e,n,i){super(new Uint16Array(e),n,i)}}class w1 extends Ci{constructor(e,n,i){super(new Uint32Array(e),n,i)}}class Xi extends Ci{constructor(e,n,i){super(new Float32Array(e),n,i)}}let c2=0;const Xn=new yt,_d=new kt,Us=new L,bn=new gl,Qo=new gl,Bt=new L;class Hr extends ko{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:c2++}),this.uuid=Fo(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(_1(e)?w1:E1)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,n){return this.attributes[e]=n,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,n,i=0){this.groups.push({start:e,count:n,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,n){this.drawRange.start=e,this.drawRange.count=n}applyMatrix4(e){const n=this.attributes.position;n!==void 0&&(n.applyMatrix4(e),n.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new Ye().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Xn.makeRotationFromQuaternion(e),this.applyMatrix4(Xn),this}rotateX(e){return Xn.makeRotationX(e),this.applyMatrix4(Xn),this}rotateY(e){return Xn.makeRotationY(e),this.applyMatrix4(Xn),this}rotateZ(e){return Xn.makeRotationZ(e),this.applyMatrix4(Xn),this}translate(e,n,i){return Xn.makeTranslation(e,n,i),this.applyMatrix4(Xn),this}scale(e,n,i){return Xn.makeScale(e,n,i),this.applyMatrix4(Xn),this}lookAt(e){return _d.lookAt(e),_d.updateMatrix(),this.applyMatrix4(_d.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Us).negate(),this.translate(Us.x,Us.y,Us.z),this}setFromPoints(e){const n=[];for(let i=0,r=e.length;i<r;i++){const s=e[i];n.push(s.x,s.y,s.z||0)}return this.setAttribute("position",new Xi(n,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new gl);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new L(-1/0,-1/0,-1/0),new L(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),n)for(let i=0,r=n.length;i<r;i++){const s=n[i];bn.setFromBufferAttribute(s),this.morphTargetsRelative?(Bt.addVectors(this.boundingBox.min,bn.min),this.boundingBox.expandByPoint(Bt),Bt.addVectors(this.boundingBox.max,bn.max),this.boundingBox.expandByPoint(Bt)):(this.boundingBox.expandByPoint(bn.min),this.boundingBox.expandByPoint(bn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new og);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new L,1/0);return}if(e){const i=this.boundingSphere.center;if(bn.setFromBufferAttribute(e),n)for(let s=0,o=n.length;s<o;s++){const a=n[s];Qo.setFromBufferAttribute(a),this.morphTargetsRelative?(Bt.addVectors(bn.min,Qo.min),bn.expandByPoint(Bt),Bt.addVectors(bn.max,Qo.max),bn.expandByPoint(Bt)):(bn.expandByPoint(Qo.min),bn.expandByPoint(Qo.max))}bn.getCenter(i);let r=0;for(let s=0,o=e.count;s<o;s++)Bt.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(Bt));if(n)for(let s=0,o=n.length;s<o;s++){const a=n[s],l=this.morphTargetsRelative;for(let u=0,c=a.count;u<c;u++)Bt.fromBufferAttribute(a,u),l&&(Us.fromBufferAttribute(e,u),Bt.add(Us)),r=Math.max(r,i.distanceToSquared(Bt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,n=this.attributes;if(e===null||n.position===void 0||n.normal===void 0||n.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=n.position,r=n.normal,s=n.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ci(new Float32Array(4*i.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let P=0;P<i.count;P++)a[P]=new L,l[P]=new L;const u=new L,c=new L,f=new L,d=new ge,p=new ge,g=new ge,S=new L,m=new L;function h(P,Q,y){u.fromBufferAttribute(i,P),c.fromBufferAttribute(i,Q),f.fromBufferAttribute(i,y),d.fromBufferAttribute(s,P),p.fromBufferAttribute(s,Q),g.fromBufferAttribute(s,y),c.sub(u),f.sub(u),p.sub(d),g.sub(d);const w=1/(p.x*g.y-g.x*p.y);isFinite(w)&&(S.copy(c).multiplyScalar(g.y).addScaledVector(f,-p.y).multiplyScalar(w),m.copy(f).multiplyScalar(p.x).addScaledVector(c,-g.x).multiplyScalar(w),a[P].add(S),a[Q].add(S),a[y].add(S),l[P].add(m),l[Q].add(m),l[y].add(m))}let _=this.groups;_.length===0&&(_=[{start:0,count:e.count}]);for(let P=0,Q=_.length;P<Q;++P){const y=_[P],w=y.start,$=y.count;for(let O=w,j=w+$;O<j;O+=3)h(e.getX(O+0),e.getX(O+1),e.getX(O+2))}const v=new L,E=new L,b=new L,R=new L;function C(P){b.fromBufferAttribute(r,P),R.copy(b);const Q=a[P];v.copy(Q),v.sub(b.multiplyScalar(b.dot(Q))).normalize(),E.crossVectors(R,Q);const w=E.dot(l[P])<0?-1:1;o.setXYZW(P,v.x,v.y,v.z,w)}for(let P=0,Q=_.length;P<Q;++P){const y=_[P],w=y.start,$=y.count;for(let O=w,j=w+$;O<j;O+=3)C(e.getX(O+0)),C(e.getX(O+1)),C(e.getX(O+2))}}computeVertexNormals(){const e=this.index,n=this.getAttribute("position");if(n!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Ci(new Float32Array(n.count*3),3),this.setAttribute("normal",i);else for(let d=0,p=i.count;d<p;d++)i.setXYZ(d,0,0,0);const r=new L,s=new L,o=new L,a=new L,l=new L,u=new L,c=new L,f=new L;if(e)for(let d=0,p=e.count;d<p;d+=3){const g=e.getX(d+0),S=e.getX(d+1),m=e.getX(d+2);r.fromBufferAttribute(n,g),s.fromBufferAttribute(n,S),o.fromBufferAttribute(n,m),c.subVectors(o,s),f.subVectors(r,s),c.cross(f),a.fromBufferAttribute(i,g),l.fromBufferAttribute(i,S),u.fromBufferAttribute(i,m),a.add(c),l.add(c),u.add(c),i.setXYZ(g,a.x,a.y,a.z),i.setXYZ(S,l.x,l.y,l.z),i.setXYZ(m,u.x,u.y,u.z)}else for(let d=0,p=n.count;d<p;d+=3)r.fromBufferAttribute(n,d+0),s.fromBufferAttribute(n,d+1),o.fromBufferAttribute(n,d+2),c.subVectors(o,s),f.subVectors(r,s),c.cross(f),i.setXYZ(d+0,c.x,c.y,c.z),i.setXYZ(d+1,c.x,c.y,c.z),i.setXYZ(d+2,c.x,c.y,c.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let n=0,i=e.count;n<i;n++)Bt.fromBufferAttribute(e,n),Bt.normalize(),e.setXYZ(n,Bt.x,Bt.y,Bt.z)}toNonIndexed(){function e(a,l){const u=a.array,c=a.itemSize,f=a.normalized,d=new u.constructor(l.length*c);let p=0,g=0;for(let S=0,m=l.length;S<m;S++){a.isInterleavedBufferAttribute?p=l[S]*a.data.stride+a.offset:p=l[S]*c;for(let h=0;h<c;h++)d[g++]=u[p++]}return new Ci(d,c,f)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const n=new Hr,i=this.index.array,r=this.attributes;for(const a in r){const l=r[a],u=e(l,i);n.setAttribute(a,u)}const s=this.morphAttributes;for(const a in s){const l=[],u=s[a];for(let c=0,f=u.length;c<f;c++){const d=u[c],p=e(d,i);l.push(p)}n.morphAttributes[a]=l}n.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const u=o[a];n.addGroup(u.start,u.count,u.materialIndex)}return n}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const u in l)l[u]!==void 0&&(e[u]=l[u]);return e}e.data={attributes:{}};const n=this.index;n!==null&&(e.data.index={type:n.array.constructor.name,array:Array.prototype.slice.call(n.array)});const i=this.attributes;for(const l in i){const u=i[l];e.data.attributes[l]=u.toJSON(e.data)}const r={};let s=!1;for(const l in this.morphAttributes){const u=this.morphAttributes[l],c=[];for(let f=0,d=u.length;f<d;f++){const p=u[f];c.push(p.toJSON(e.data))}c.length>0&&(r[l]=c,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const n={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone(n));const r=e.attributes;for(const u in r){const c=r[u];this.setAttribute(u,c.clone(n))}const s=e.morphAttributes;for(const u in s){const c=[],f=s[u];for(let d=0,p=f.length;d<p;d++)c.push(f[d].clone(n));this.morphAttributes[u]=c}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let u=0,c=o.length;u<c;u++){const f=o[u];this.addGroup(f.start,f.count,f.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const jv=new yt,Xr=new n2,Zl=new og,Yv=new L,Jl=new L,Ql=new L,eu=new L,xd=new L,tu=new L,qv=new L,nu=new L;class Je extends kt{constructor(e=new Hr,n=new Ao){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=n,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const r=n[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,n){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,o=i.morphTargetsRelative;n.fromBufferAttribute(r,e);const a=this.morphTargetInfluences;if(s&&a){tu.set(0,0,0);for(let l=0,u=s.length;l<u;l++){const c=a[l],f=s[l];c!==0&&(xd.fromBufferAttribute(f,e),o?tu.addScaledVector(xd,c):tu.addScaledVector(xd.sub(n),c))}n.add(tu)}return n}raycast(e,n){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Zl.copy(i.boundingSphere),Zl.applyMatrix4(s),Xr.copy(e.ray).recast(e.near),!(Zl.containsPoint(Xr.origin)===!1&&(Xr.intersectSphere(Zl,Yv)===null||Xr.origin.distanceToSquared(Yv)>(e.far-e.near)**2))&&(jv.copy(s).invert(),Xr.copy(e.ray).applyMatrix4(jv),!(i.boundingBox!==null&&Xr.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,n,Xr)))}_computeIntersections(e,n,i){let r;const s=this.geometry,o=this.material,a=s.index,l=s.attributes.position,u=s.attributes.uv,c=s.attributes.uv1,f=s.attributes.normal,d=s.groups,p=s.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,S=d.length;g<S;g++){const m=d[g],h=o[m.materialIndex],_=Math.max(m.start,p.start),v=Math.min(a.count,Math.min(m.start+m.count,p.start+p.count));for(let E=_,b=v;E<b;E+=3){const R=a.getX(E),C=a.getX(E+1),P=a.getX(E+2);r=iu(this,h,e,i,u,c,f,R,C,P),r&&(r.faceIndex=Math.floor(E/3),r.face.materialIndex=m.materialIndex,n.push(r))}}else{const g=Math.max(0,p.start),S=Math.min(a.count,p.start+p.count);for(let m=g,h=S;m<h;m+=3){const _=a.getX(m),v=a.getX(m+1),E=a.getX(m+2);r=iu(this,o,e,i,u,c,f,_,v,E),r&&(r.faceIndex=Math.floor(m/3),n.push(r))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,S=d.length;g<S;g++){const m=d[g],h=o[m.materialIndex],_=Math.max(m.start,p.start),v=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let E=_,b=v;E<b;E+=3){const R=E,C=E+1,P=E+2;r=iu(this,h,e,i,u,c,f,R,C,P),r&&(r.faceIndex=Math.floor(E/3),r.face.materialIndex=m.materialIndex,n.push(r))}}else{const g=Math.max(0,p.start),S=Math.min(l.count,p.start+p.count);for(let m=g,h=S;m<h;m+=3){const _=m,v=m+1,E=m+2;r=iu(this,o,e,i,u,c,f,_,v,E),r&&(r.faceIndex=Math.floor(m/3),n.push(r))}}}}function f2(t,e,n,i,r,s,o,a){let l;if(e.side===cn?l=i.intersectTriangle(o,s,r,!0,a):l=i.intersectTriangle(r,s,o,e.side===Ur,a),l===null)return null;nu.copy(a),nu.applyMatrix4(t.matrixWorld);const u=n.ray.origin.distanceTo(nu);return u<n.near||u>n.far?null:{distance:u,point:nu.clone(),object:t}}function iu(t,e,n,i,r,s,o,a,l,u){t.getVertexPosition(a,Jl),t.getVertexPosition(l,Ql),t.getVertexPosition(u,eu);const c=f2(t,e,n,i,Jl,Ql,eu,qv);if(c){const f=new L;fi.getBarycoord(qv,Jl,Ql,eu,f),r&&(c.uv=fi.getInterpolatedAttribute(r,a,l,u,f,new ge)),s&&(c.uv1=fi.getInterpolatedAttribute(s,a,l,u,f,new ge)),o&&(c.normal=fi.getInterpolatedAttribute(o,a,l,u,f,new L),c.normal.dot(i.direction)>0&&c.normal.multiplyScalar(-1));const d={a,b:l,c:u,normal:new L,materialIndex:0};fi.getNormal(Jl,Ql,eu,d.normal),c.face=d,c.barycoord=f}return c}class Vr extends Hr{constructor(e=1,n=1,i=1,r=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:n,depth:i,widthSegments:r,heightSegments:s,depthSegments:o};const a=this;r=Math.floor(r),s=Math.floor(s),o=Math.floor(o);const l=[],u=[],c=[],f=[];let d=0,p=0;g("z","y","x",-1,-1,i,n,e,o,s,0),g("z","y","x",1,-1,i,n,-e,o,s,1),g("x","z","y",1,1,e,i,n,r,o,2),g("x","z","y",1,-1,e,i,-n,r,o,3),g("x","y","z",1,-1,e,n,i,r,s,4),g("x","y","z",-1,-1,e,n,-i,r,s,5),this.setIndex(l),this.setAttribute("position",new Xi(u,3)),this.setAttribute("normal",new Xi(c,3)),this.setAttribute("uv",new Xi(f,2));function g(S,m,h,_,v,E,b,R,C,P,Q){const y=E/C,w=b/P,$=E/2,O=b/2,j=R/2,K=C+1,z=P+1;let ne=0,D=0;const J=new L;for(let ee=0;ee<z;ee++){const re=ee*w-O;for(let Pe=0;Pe<K;Pe++){const Ge=Pe*y-$;J[S]=Ge*_,J[m]=re*v,J[h]=j,u.push(J.x,J.y,J.z),J[S]=0,J[m]=0,J[h]=R>0?1:-1,c.push(J.x,J.y,J.z),f.push(Pe/C),f.push(1-ee/P),ne+=1}}for(let ee=0;ee<P;ee++)for(let re=0;re<C;re++){const Pe=d+re+K*ee,Ge=d+re+K*(ee+1),U=d+(re+1)+K*(ee+1),Z=d+(re+1)+K*ee;l.push(Pe,Ge,Z),l.push(Ge,U,Z),D+=6}a.addGroup(p,D,Q),p+=D,d+=ne}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Vr(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Ro(t){const e={};for(const n in t){e[n]={};for(const i in t[n]){const r=t[n][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[n][i]=null):e[n][i]=r.clone():Array.isArray(r)?e[n][i]=r.slice():e[n][i]=r}}return e}function sn(t){const e={};for(let n=0;n<t.length;n++){const i=Ro(t[n]);for(const r in i)e[r]=i[r]}return e}function d2(t){const e=[];for(let n=0;n<t.length;n++)e.push(t[n].clone());return e}function T1(t){const e=t.getRenderTarget();return e===null?t.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:ot.workingColorSpace}const h2={clone:Ro,merge:sn};var p2=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,m2=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class kr extends vl{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=p2,this.fragmentShader=m2,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ro(e.uniforms),this.uniformsGroups=d2(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const n=super.toJSON(e);n.glslVersion=this.glslVersion,n.uniforms={};for(const r in this.uniforms){const o=this.uniforms[r].value;o&&o.isTexture?n.uniforms[r]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?n.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?n.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?n.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?n.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?n.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?n.uniforms[r]={type:"m4",value:o.toArray()}:n.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(n.defines=this.defines),n.vertexShader=this.vertexShader,n.fragmentShader=this.fragmentShader,n.lights=this.lights,n.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(n.extensions=i),n}}class C1 extends kt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new yt,this.projectionMatrix=new yt,this.projectionMatrixInverse=new yt,this.coordinateSystem=Wi}copy(e,n){return super.copy(e,n),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,n){super.updateWorldMatrix(e,n),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const ur=new L,Kv=new ge,Zv=new ge;class Mn extends C1{constructor(e=50,n=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=n,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const n=.5*this.getFilmHeight()/e;this.fov=Dc*2*Math.atan(n),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Jf*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Dc*2*Math.atan(Math.tan(Jf*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,n,i){ur.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(ur.x,ur.y).multiplyScalar(-e/ur.z),ur.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(ur.x,ur.y).multiplyScalar(-e/ur.z)}getViewSize(e,n){return this.getViewBounds(e,Kv,Zv),n.subVectors(Zv,Kv)}setViewOffset(e,n,i,r,s,o){this.aspect=e/n,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let n=e*Math.tan(Jf*.5*this.fov)/this.zoom,i=2*n,r=this.aspect*i,s=-.5*r;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,u=o.fullHeight;s+=o.offsetX*r/l,n-=o.offsetY*i/u,r*=o.width/l,i*=o.height/u}const a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,n,n-i,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.fov=this.fov,n.object.zoom=this.zoom,n.object.near=this.near,n.object.far=this.far,n.object.focus=this.focus,n.object.aspect=this.aspect,this.view!==null&&(n.object.view=Object.assign({},this.view)),n.object.filmGauge=this.filmGauge,n.object.filmOffset=this.filmOffset,n}}const ks=-90,Fs=1;class g2 extends kt{constructor(e,n,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new Mn(ks,Fs,e,n);r.layers=this.layers,this.add(r);const s=new Mn(ks,Fs,e,n);s.layers=this.layers,this.add(s);const o=new Mn(ks,Fs,e,n);o.layers=this.layers,this.add(o);const a=new Mn(ks,Fs,e,n);a.layers=this.layers,this.add(a);const l=new Mn(ks,Fs,e,n);l.layers=this.layers,this.add(l);const u=new Mn(ks,Fs,e,n);u.layers=this.layers,this.add(u)}updateCoordinateSystem(){const e=this.coordinateSystem,n=this.children.concat(),[i,r,s,o,a,l]=n;for(const u of n)this.remove(u);if(e===Wi)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Lc)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const u of n)this.add(u),u.updateMatrixWorld()}update(e,n){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,l,u,c]=this.children,f=e.getRenderTarget(),d=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const S=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,r),e.render(n,s),e.setRenderTarget(i,1,r),e.render(n,o),e.setRenderTarget(i,2,r),e.render(n,a),e.setRenderTarget(i,3,r),e.render(n,l),e.setRenderTarget(i,4,r),e.render(n,u),i.texture.generateMipmaps=S,e.setRenderTarget(i,5,r),e.render(n,c),e.setRenderTarget(f,d,p),e.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class A1 extends fn{constructor(e,n,i,r,s,o,a,l,u,c){e=e!==void 0?e:[],n=n!==void 0?n:Eo,super(e,n,i,r,s,o,a,l,u,c),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class v2 extends xs{constructor(e=1,n={}){super(e,e,n),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new A1(r,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=n.generateMipmaps!==void 0?n.generateMipmaps:!1,this.texture.minFilter=n.minFilter!==void 0?n.minFilter:ci}fromEquirectangularTexture(e,n){this.texture.type=n.type,this.texture.colorSpace=n.colorSpace,this.texture.generateMipmaps=n.generateMipmaps,this.texture.minFilter=n.minFilter,this.texture.magFilter=n.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new Vr(5,5,5),s=new kr({name:"CubemapFromEquirect",uniforms:Ro(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:cn,blending:Lr});s.uniforms.tEquirect.value=n;const o=new Je(r,s),a=n.minFilter;return n.minFilter===Sr&&(n.minFilter=ci),new g2(1,10,this).update(e,o),n.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,n,i,r){const s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(n,i,r);e.setRenderTarget(s)}}const yd=new L,_2=new L,x2=new Ye;class Jr{constructor(e=new L(1,0,0),n=0){this.isPlane=!0,this.normal=e,this.constant=n}set(e,n){return this.normal.copy(e),this.constant=n,this}setComponents(e,n,i,r){return this.normal.set(e,n,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,n){return this.normal.copy(e),this.constant=-n.dot(this.normal),this}setFromCoplanarPoints(e,n,i){const r=yd.subVectors(i,n).cross(_2.subVectors(e,n)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,n){return n.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,n){const i=e.delta(yd),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(e.start)===0?n.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:n.copy(e.start).addScaledVector(i,s)}intersectsLine(e){const n=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return n<0&&i>0||i<0&&n>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,n){const i=n||x2.getNormalMatrix(e),r=this.coplanarPoint(yd).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const jr=new og,ru=new L;class ag{constructor(e=new Jr,n=new Jr,i=new Jr,r=new Jr,s=new Jr,o=new Jr){this.planes=[e,n,i,r,s,o]}set(e,n,i,r,s,o){const a=this.planes;return a[0].copy(e),a[1].copy(n),a[2].copy(i),a[3].copy(r),a[4].copy(s),a[5].copy(o),this}copy(e){const n=this.planes;for(let i=0;i<6;i++)n[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,n=Wi){const i=this.planes,r=e.elements,s=r[0],o=r[1],a=r[2],l=r[3],u=r[4],c=r[5],f=r[6],d=r[7],p=r[8],g=r[9],S=r[10],m=r[11],h=r[12],_=r[13],v=r[14],E=r[15];if(i[0].setComponents(l-s,d-u,m-p,E-h).normalize(),i[1].setComponents(l+s,d+u,m+p,E+h).normalize(),i[2].setComponents(l+o,d+c,m+g,E+_).normalize(),i[3].setComponents(l-o,d-c,m-g,E-_).normalize(),i[4].setComponents(l-a,d-f,m-S,E-v).normalize(),n===Wi)i[5].setComponents(l+a,d+f,m+S,E+v).normalize();else if(n===Lc)i[5].setComponents(a,f,S,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+n);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),jr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const n=e.geometry;n.boundingSphere===null&&n.computeBoundingSphere(),jr.copy(n.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(jr)}intersectsSprite(e){return jr.center.set(0,0,0),jr.radius=.7071067811865476,jr.applyMatrix4(e.matrixWorld),this.intersectsSphere(jr)}intersectsSphere(e){const n=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(n[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const n=this.planes;for(let i=0;i<6;i++){const r=n[i];if(ru.x=r.normal.x>0?e.max.x:e.min.x,ru.y=r.normal.y>0?e.max.y:e.min.y,ru.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(ru)<0)return!1}return!0}containsPoint(e){const n=this.planes;for(let i=0;i<6;i++)if(n[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function R1(){let t=null,e=!1,n=null,i=null;function r(s,o){n(s,o),i=t.requestAnimationFrame(r)}return{start:function(){e!==!0&&n!==null&&(i=t.requestAnimationFrame(r),e=!0)},stop:function(){t.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){n=s},setContext:function(s){t=s}}}function y2(t){const e=new WeakMap;function n(a,l){const u=a.array,c=a.usage,f=u.byteLength,d=t.createBuffer();t.bindBuffer(l,d),t.bufferData(l,u,c),a.onUploadCallback();let p;if(u instanceof Float32Array)p=t.FLOAT;else if(u instanceof Uint16Array)a.isFloat16BufferAttribute?p=t.HALF_FLOAT:p=t.UNSIGNED_SHORT;else if(u instanceof Int16Array)p=t.SHORT;else if(u instanceof Uint32Array)p=t.UNSIGNED_INT;else if(u instanceof Int32Array)p=t.INT;else if(u instanceof Int8Array)p=t.BYTE;else if(u instanceof Uint8Array)p=t.UNSIGNED_BYTE;else if(u instanceof Uint8ClampedArray)p=t.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+u);return{buffer:d,type:p,bytesPerElement:u.BYTES_PER_ELEMENT,version:a.version,size:f}}function i(a,l,u){const c=l.array,f=l.updateRanges;if(t.bindBuffer(u,a),f.length===0)t.bufferSubData(u,0,c);else{f.sort((p,g)=>p.start-g.start);let d=0;for(let p=1;p<f.length;p++){const g=f[d],S=f[p];S.start<=g.start+g.count+1?g.count=Math.max(g.count,S.start+S.count-g.start):(++d,f[d]=S)}f.length=d+1;for(let p=0,g=f.length;p<g;p++){const S=f[p];t.bufferSubData(u,S.start*c.BYTES_PER_ELEMENT,c,S.start,S.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=e.get(a);l&&(t.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const c=e.get(a);(!c||c.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const u=e.get(a);if(u===void 0)e.set(a,n(a,l));else if(u.version<a.version){if(u.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(u.buffer,a,l),u.version=a.version}}return{get:r,remove:s,update:o}}class Ri extends Hr{constructor(e=1,n=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:n,widthSegments:i,heightSegments:r};const s=e/2,o=n/2,a=Math.floor(i),l=Math.floor(r),u=a+1,c=l+1,f=e/a,d=n/l,p=[],g=[],S=[],m=[];for(let h=0;h<c;h++){const _=h*d-o;for(let v=0;v<u;v++){const E=v*f-s;g.push(E,-_,0),S.push(0,0,1),m.push(v/a),m.push(1-h/l)}}for(let h=0;h<l;h++)for(let _=0;_<a;_++){const v=_+u*h,E=_+u*(h+1),b=_+1+u*(h+1),R=_+1+u*h;p.push(v,E,R),p.push(E,b,R)}this.setIndex(p),this.setAttribute("position",new Xi(g,3)),this.setAttribute("normal",new Xi(S,3)),this.setAttribute("uv",new Xi(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ri(e.width,e.height,e.widthSegments,e.heightSegments)}}var S2=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,M2=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,E2=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,w2=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,T2=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,C2=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,A2=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,R2=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,P2=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,b2=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,L2=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,D2=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,I2=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,N2=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,U2=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,k2=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,F2=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,O2=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,B2=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,z2=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,H2=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,V2=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,G2=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,W2=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,$2=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,X2=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,j2=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Y2=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,q2=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,K2=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Z2="gl_FragColor = linearToOutputTexel( gl_FragColor );",J2=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Q2=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,eR=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,tR=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,nR=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,iR=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,rR=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,sR=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,oR=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,aR=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,lR=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,uR=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,cR=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,fR=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,dR=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,hR=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,pR=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,mR=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,gR=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,vR=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,_R=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,xR=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,yR=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,SR=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,MR=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,ER=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,wR=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,TR=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,CR=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,AR=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,RR=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,PR=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,bR=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,LR=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,DR=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,IR=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,NR=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,UR=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,kR=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,FR=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,OR=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,BR=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,zR=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,HR=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,VR=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,GR=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,WR=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,$R=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,XR=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,jR=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,YR=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,qR=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,KR=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,ZR=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,JR=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,QR=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,eP=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,tP=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,nP=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,iP=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,rP=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,sP=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,oP=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,aP=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,lP=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,uP=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,cP=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,fP=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,dP=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,hP=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,pP=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,mP=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,gP=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,vP=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,_P=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,xP=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const yP=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,SP=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,MP=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,EP=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,wP=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,TP=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,CP=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,AP=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,RP=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,PP=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,bP=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,LP=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,DP=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,IP=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,NP=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,UP=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,kP=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,FP=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,OP=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,BP=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,zP=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,HP=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,VP=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,GP=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,WP=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,$P=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,XP=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,jP=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,YP=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,qP=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,KP=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ZP=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,JP=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,QP=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,je={alphahash_fragment:S2,alphahash_pars_fragment:M2,alphamap_fragment:E2,alphamap_pars_fragment:w2,alphatest_fragment:T2,alphatest_pars_fragment:C2,aomap_fragment:A2,aomap_pars_fragment:R2,batching_pars_vertex:P2,batching_vertex:b2,begin_vertex:L2,beginnormal_vertex:D2,bsdfs:I2,iridescence_fragment:N2,bumpmap_pars_fragment:U2,clipping_planes_fragment:k2,clipping_planes_pars_fragment:F2,clipping_planes_pars_vertex:O2,clipping_planes_vertex:B2,color_fragment:z2,color_pars_fragment:H2,color_pars_vertex:V2,color_vertex:G2,common:W2,cube_uv_reflection_fragment:$2,defaultnormal_vertex:X2,displacementmap_pars_vertex:j2,displacementmap_vertex:Y2,emissivemap_fragment:q2,emissivemap_pars_fragment:K2,colorspace_fragment:Z2,colorspace_pars_fragment:J2,envmap_fragment:Q2,envmap_common_pars_fragment:eR,envmap_pars_fragment:tR,envmap_pars_vertex:nR,envmap_physical_pars_fragment:hR,envmap_vertex:iR,fog_vertex:rR,fog_pars_vertex:sR,fog_fragment:oR,fog_pars_fragment:aR,gradientmap_pars_fragment:lR,lightmap_pars_fragment:uR,lights_lambert_fragment:cR,lights_lambert_pars_fragment:fR,lights_pars_begin:dR,lights_toon_fragment:pR,lights_toon_pars_fragment:mR,lights_phong_fragment:gR,lights_phong_pars_fragment:vR,lights_physical_fragment:_R,lights_physical_pars_fragment:xR,lights_fragment_begin:yR,lights_fragment_maps:SR,lights_fragment_end:MR,logdepthbuf_fragment:ER,logdepthbuf_pars_fragment:wR,logdepthbuf_pars_vertex:TR,logdepthbuf_vertex:CR,map_fragment:AR,map_pars_fragment:RR,map_particle_fragment:PR,map_particle_pars_fragment:bR,metalnessmap_fragment:LR,metalnessmap_pars_fragment:DR,morphinstance_vertex:IR,morphcolor_vertex:NR,morphnormal_vertex:UR,morphtarget_pars_vertex:kR,morphtarget_vertex:FR,normal_fragment_begin:OR,normal_fragment_maps:BR,normal_pars_fragment:zR,normal_pars_vertex:HR,normal_vertex:VR,normalmap_pars_fragment:GR,clearcoat_normal_fragment_begin:WR,clearcoat_normal_fragment_maps:$R,clearcoat_pars_fragment:XR,iridescence_pars_fragment:jR,opaque_fragment:YR,packing:qR,premultiplied_alpha_fragment:KR,project_vertex:ZR,dithering_fragment:JR,dithering_pars_fragment:QR,roughnessmap_fragment:eP,roughnessmap_pars_fragment:tP,shadowmap_pars_fragment:nP,shadowmap_pars_vertex:iP,shadowmap_vertex:rP,shadowmask_pars_fragment:sP,skinbase_vertex:oP,skinning_pars_vertex:aP,skinning_vertex:lP,skinnormal_vertex:uP,specularmap_fragment:cP,specularmap_pars_fragment:fP,tonemapping_fragment:dP,tonemapping_pars_fragment:hP,transmission_fragment:pP,transmission_pars_fragment:mP,uv_pars_fragment:gP,uv_pars_vertex:vP,uv_vertex:_P,worldpos_vertex:xP,background_vert:yP,background_frag:SP,backgroundCube_vert:MP,backgroundCube_frag:EP,cube_vert:wP,cube_frag:TP,depth_vert:CP,depth_frag:AP,distanceRGBA_vert:RP,distanceRGBA_frag:PP,equirect_vert:bP,equirect_frag:LP,linedashed_vert:DP,linedashed_frag:IP,meshbasic_vert:NP,meshbasic_frag:UP,meshlambert_vert:kP,meshlambert_frag:FP,meshmatcap_vert:OP,meshmatcap_frag:BP,meshnormal_vert:zP,meshnormal_frag:HP,meshphong_vert:VP,meshphong_frag:GP,meshphysical_vert:WP,meshphysical_frag:$P,meshtoon_vert:XP,meshtoon_frag:jP,points_vert:YP,points_frag:qP,shadow_vert:KP,shadow_frag:ZP,sprite_vert:JP,sprite_frag:QP},pe={common:{diffuse:{value:new nt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ye},alphaMap:{value:null},alphaMapTransform:{value:new Ye},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ye}},envmap:{envMap:{value:null},envMapRotation:{value:new Ye},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ye}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ye}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ye},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ye},normalScale:{value:new ge(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ye},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ye}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ye}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ye}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new nt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new nt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ye},alphaTest:{value:0},uvTransform:{value:new Ye}},sprite:{diffuse:{value:new nt(16777215)},opacity:{value:1},center:{value:new ge(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ye},alphaMap:{value:null},alphaMapTransform:{value:new Ye},alphaTest:{value:0}}},Mi={basic:{uniforms:sn([pe.common,pe.specularmap,pe.envmap,pe.aomap,pe.lightmap,pe.fog]),vertexShader:je.meshbasic_vert,fragmentShader:je.meshbasic_frag},lambert:{uniforms:sn([pe.common,pe.specularmap,pe.envmap,pe.aomap,pe.lightmap,pe.emissivemap,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.fog,pe.lights,{emissive:{value:new nt(0)}}]),vertexShader:je.meshlambert_vert,fragmentShader:je.meshlambert_frag},phong:{uniforms:sn([pe.common,pe.specularmap,pe.envmap,pe.aomap,pe.lightmap,pe.emissivemap,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.fog,pe.lights,{emissive:{value:new nt(0)},specular:{value:new nt(1118481)},shininess:{value:30}}]),vertexShader:je.meshphong_vert,fragmentShader:je.meshphong_frag},standard:{uniforms:sn([pe.common,pe.envmap,pe.aomap,pe.lightmap,pe.emissivemap,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.roughnessmap,pe.metalnessmap,pe.fog,pe.lights,{emissive:{value:new nt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:je.meshphysical_vert,fragmentShader:je.meshphysical_frag},toon:{uniforms:sn([pe.common,pe.aomap,pe.lightmap,pe.emissivemap,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.gradientmap,pe.fog,pe.lights,{emissive:{value:new nt(0)}}]),vertexShader:je.meshtoon_vert,fragmentShader:je.meshtoon_frag},matcap:{uniforms:sn([pe.common,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.fog,{matcap:{value:null}}]),vertexShader:je.meshmatcap_vert,fragmentShader:je.meshmatcap_frag},points:{uniforms:sn([pe.points,pe.fog]),vertexShader:je.points_vert,fragmentShader:je.points_frag},dashed:{uniforms:sn([pe.common,pe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:je.linedashed_vert,fragmentShader:je.linedashed_frag},depth:{uniforms:sn([pe.common,pe.displacementmap]),vertexShader:je.depth_vert,fragmentShader:je.depth_frag},normal:{uniforms:sn([pe.common,pe.bumpmap,pe.normalmap,pe.displacementmap,{opacity:{value:1}}]),vertexShader:je.meshnormal_vert,fragmentShader:je.meshnormal_frag},sprite:{uniforms:sn([pe.sprite,pe.fog]),vertexShader:je.sprite_vert,fragmentShader:je.sprite_frag},background:{uniforms:{uvTransform:{value:new Ye},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:je.background_vert,fragmentShader:je.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ye}},vertexShader:je.backgroundCube_vert,fragmentShader:je.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:je.cube_vert,fragmentShader:je.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:je.equirect_vert,fragmentShader:je.equirect_frag},distanceRGBA:{uniforms:sn([pe.common,pe.displacementmap,{referencePosition:{value:new L},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:je.distanceRGBA_vert,fragmentShader:je.distanceRGBA_frag},shadow:{uniforms:sn([pe.lights,pe.fog,{color:{value:new nt(0)},opacity:{value:1}}]),vertexShader:je.shadow_vert,fragmentShader:je.shadow_frag}};Mi.physical={uniforms:sn([Mi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ye},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ye},clearcoatNormalScale:{value:new ge(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ye},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ye},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ye},sheen:{value:0},sheenColor:{value:new nt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ye},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ye},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ye},transmissionSamplerSize:{value:new ge},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ye},attenuationDistance:{value:0},attenuationColor:{value:new nt(0)},specularColor:{value:new nt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ye},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ye},anisotropyVector:{value:new ge},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ye}}]),vertexShader:je.meshphysical_vert,fragmentShader:je.meshphysical_frag};const su={r:0,b:0,g:0},Yr=new Ai,eb=new yt;function tb(t,e,n,i,r,s,o){const a=new nt(0);let l=s===!0?0:1,u,c,f=null,d=0,p=null;function g(_){let v=_.isScene===!0?_.background:null;return v&&v.isTexture&&(v=(_.backgroundBlurriness>0?n:e).get(v)),v}function S(_){let v=!1;const E=g(_);E===null?h(a,l):E&&E.isColor&&(h(E,1),v=!0);const b=t.xr.getEnvironmentBlendMode();b==="additive"?i.buffers.color.setClear(0,0,0,1,o):b==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(t.autoClear||v)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil))}function m(_,v){const E=g(v);E&&(E.isCubeTexture||E.mapping===of)?(c===void 0&&(c=new Je(new Vr(1,1,1),new kr({name:"BackgroundCubeMaterial",uniforms:Ro(Mi.backgroundCube.uniforms),vertexShader:Mi.backgroundCube.vertexShader,fragmentShader:Mi.backgroundCube.fragmentShader,side:cn,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(b,R,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(c)),Yr.copy(v.backgroundRotation),Yr.x*=-1,Yr.y*=-1,Yr.z*=-1,E.isCubeTexture&&E.isRenderTargetTexture===!1&&(Yr.y*=-1,Yr.z*=-1),c.material.uniforms.envMap.value=E,c.material.uniforms.flipEnvMap.value=E.isCubeTexture&&E.isRenderTargetTexture===!1?-1:1,c.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(eb.makeRotationFromEuler(Yr)),c.material.toneMapped=ot.getTransfer(E.colorSpace)!==gt,(f!==E||d!==E.version||p!==t.toneMapping)&&(c.material.needsUpdate=!0,f=E,d=E.version,p=t.toneMapping),c.layers.enableAll(),_.unshift(c,c.geometry,c.material,0,0,null)):E&&E.isTexture&&(u===void 0&&(u=new Je(new Ri(2,2),new kr({name:"BackgroundMaterial",uniforms:Ro(Mi.background.uniforms),vertexShader:Mi.background.vertexShader,fragmentShader:Mi.background.fragmentShader,side:Ur,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),Object.defineProperty(u.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(u)),u.material.uniforms.t2D.value=E,u.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,u.material.toneMapped=ot.getTransfer(E.colorSpace)!==gt,E.matrixAutoUpdate===!0&&E.updateMatrix(),u.material.uniforms.uvTransform.value.copy(E.matrix),(f!==E||d!==E.version||p!==t.toneMapping)&&(u.material.needsUpdate=!0,f=E,d=E.version,p=t.toneMapping),u.layers.enableAll(),_.unshift(u,u.geometry,u.material,0,0,null))}function h(_,v){_.getRGB(su,T1(t)),i.buffers.color.setClear(su.r,su.g,su.b,v,o)}return{getClearColor:function(){return a},setClearColor:function(_,v=1){a.set(_),l=v,h(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(_){l=_,h(a,l)},render:S,addToRenderList:m}}function nb(t,e){const n=t.getParameter(t.MAX_VERTEX_ATTRIBS),i={},r=d(null);let s=r,o=!1;function a(y,w,$,O,j){let K=!1;const z=f(O,$,w);s!==z&&(s=z,u(s.object)),K=p(y,O,$,j),K&&g(y,O,$,j),j!==null&&e.update(j,t.ELEMENT_ARRAY_BUFFER),(K||o)&&(o=!1,E(y,w,$,O),j!==null&&t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,e.get(j).buffer))}function l(){return t.createVertexArray()}function u(y){return t.bindVertexArray(y)}function c(y){return t.deleteVertexArray(y)}function f(y,w,$){const O=$.wireframe===!0;let j=i[y.id];j===void 0&&(j={},i[y.id]=j);let K=j[w.id];K===void 0&&(K={},j[w.id]=K);let z=K[O];return z===void 0&&(z=d(l()),K[O]=z),z}function d(y){const w=[],$=[],O=[];for(let j=0;j<n;j++)w[j]=0,$[j]=0,O[j]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:w,enabledAttributes:$,attributeDivisors:O,object:y,attributes:{},index:null}}function p(y,w,$,O){const j=s.attributes,K=w.attributes;let z=0;const ne=$.getAttributes();for(const D in ne)if(ne[D].location>=0){const ee=j[D];let re=K[D];if(re===void 0&&(D==="instanceMatrix"&&y.instanceMatrix&&(re=y.instanceMatrix),D==="instanceColor"&&y.instanceColor&&(re=y.instanceColor)),ee===void 0||ee.attribute!==re||re&&ee.data!==re.data)return!0;z++}return s.attributesNum!==z||s.index!==O}function g(y,w,$,O){const j={},K=w.attributes;let z=0;const ne=$.getAttributes();for(const D in ne)if(ne[D].location>=0){let ee=K[D];ee===void 0&&(D==="instanceMatrix"&&y.instanceMatrix&&(ee=y.instanceMatrix),D==="instanceColor"&&y.instanceColor&&(ee=y.instanceColor));const re={};re.attribute=ee,ee&&ee.data&&(re.data=ee.data),j[D]=re,z++}s.attributes=j,s.attributesNum=z,s.index=O}function S(){const y=s.newAttributes;for(let w=0,$=y.length;w<$;w++)y[w]=0}function m(y){h(y,0)}function h(y,w){const $=s.newAttributes,O=s.enabledAttributes,j=s.attributeDivisors;$[y]=1,O[y]===0&&(t.enableVertexAttribArray(y),O[y]=1),j[y]!==w&&(t.vertexAttribDivisor(y,w),j[y]=w)}function _(){const y=s.newAttributes,w=s.enabledAttributes;for(let $=0,O=w.length;$<O;$++)w[$]!==y[$]&&(t.disableVertexAttribArray($),w[$]=0)}function v(y,w,$,O,j,K,z){z===!0?t.vertexAttribIPointer(y,w,$,j,K):t.vertexAttribPointer(y,w,$,O,j,K)}function E(y,w,$,O){S();const j=O.attributes,K=$.getAttributes(),z=w.defaultAttributeValues;for(const ne in K){const D=K[ne];if(D.location>=0){let J=j[ne];if(J===void 0&&(ne==="instanceMatrix"&&y.instanceMatrix&&(J=y.instanceMatrix),ne==="instanceColor"&&y.instanceColor&&(J=y.instanceColor)),J!==void 0){const ee=J.normalized,re=J.itemSize,Pe=e.get(J);if(Pe===void 0)continue;const Ge=Pe.buffer,U=Pe.type,Z=Pe.bytesPerElement,te=U===t.INT||U===t.UNSIGNED_INT||J.gpuType===Qm;if(J.isInterleavedBufferAttribute){const se=J.data,_e=se.stride,Ce=J.offset;if(se.isInstancedInterleavedBuffer){for(let Fe=0;Fe<D.locationSize;Fe++)h(D.location+Fe,se.meshPerAttribute);y.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=se.meshPerAttribute*se.count)}else for(let Fe=0;Fe<D.locationSize;Fe++)m(D.location+Fe);t.bindBuffer(t.ARRAY_BUFFER,Ge);for(let Fe=0;Fe<D.locationSize;Fe++)v(D.location+Fe,re/D.locationSize,U,ee,_e*Z,(Ce+re/D.locationSize*Fe)*Z,te)}else{if(J.isInstancedBufferAttribute){for(let se=0;se<D.locationSize;se++)h(D.location+se,J.meshPerAttribute);y.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=J.meshPerAttribute*J.count)}else for(let se=0;se<D.locationSize;se++)m(D.location+se);t.bindBuffer(t.ARRAY_BUFFER,Ge);for(let se=0;se<D.locationSize;se++)v(D.location+se,re/D.locationSize,U,ee,re*Z,re/D.locationSize*se*Z,te)}}else if(z!==void 0){const ee=z[ne];if(ee!==void 0)switch(ee.length){case 2:t.vertexAttrib2fv(D.location,ee);break;case 3:t.vertexAttrib3fv(D.location,ee);break;case 4:t.vertexAttrib4fv(D.location,ee);break;default:t.vertexAttrib1fv(D.location,ee)}}}}_()}function b(){P();for(const y in i){const w=i[y];for(const $ in w){const O=w[$];for(const j in O)c(O[j].object),delete O[j];delete w[$]}delete i[y]}}function R(y){if(i[y.id]===void 0)return;const w=i[y.id];for(const $ in w){const O=w[$];for(const j in O)c(O[j].object),delete O[j];delete w[$]}delete i[y.id]}function C(y){for(const w in i){const $=i[w];if($[y.id]===void 0)continue;const O=$[y.id];for(const j in O)c(O[j].object),delete O[j];delete $[y.id]}}function P(){Q(),o=!0,s!==r&&(s=r,u(s.object))}function Q(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:a,reset:P,resetDefaultState:Q,dispose:b,releaseStatesOfGeometry:R,releaseStatesOfProgram:C,initAttributes:S,enableAttribute:m,disableUnusedAttributes:_}}function ib(t,e,n){let i;function r(u){i=u}function s(u,c){t.drawArrays(i,u,c),n.update(c,i,1)}function o(u,c,f){f!==0&&(t.drawArraysInstanced(i,u,c,f),n.update(c,i,f))}function a(u,c,f){if(f===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,u,0,c,0,f);let p=0;for(let g=0;g<f;g++)p+=c[g];n.update(p,i,1)}function l(u,c,f,d){if(f===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let g=0;g<u.length;g++)o(u[g],c[g],d[g]);else{p.multiDrawArraysInstancedWEBGL(i,u,0,c,0,d,0,f);let g=0;for(let S=0;S<f;S++)g+=c[S];for(let S=0;S<d.length;S++)n.update(g,i,d[S])}}this.setMode=r,this.render=s,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function rb(t,e,n,i){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const C=e.get("EXT_texture_filter_anisotropic");r=t.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function o(C){return!(C!==di&&i.convert(C)!==t.getParameter(t.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(C){const P=C===pl&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(C!==er&&i.convert(C)!==t.getParameter(t.IMPLEMENTATION_COLOR_READ_TYPE)&&C!==Gi&&!P)}function l(C){if(C==="highp"){if(t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.HIGH_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.MEDIUM_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let u=n.precision!==void 0?n.precision:"highp";const c=l(u);c!==u&&(console.warn("THREE.WebGLRenderer:",u,"not supported, using",c,"instead."),u=c);const f=n.logarithmicDepthBuffer===!0,d=n.reverseDepthBuffer===!0&&e.has("EXT_clip_control");if(d===!0){const C=e.get("EXT_clip_control");C.clipControlEXT(C.LOWER_LEFT_EXT,C.ZERO_TO_ONE_EXT)}const p=t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS),g=t.getParameter(t.MAX_VERTEX_TEXTURE_IMAGE_UNITS),S=t.getParameter(t.MAX_TEXTURE_SIZE),m=t.getParameter(t.MAX_CUBE_MAP_TEXTURE_SIZE),h=t.getParameter(t.MAX_VERTEX_ATTRIBS),_=t.getParameter(t.MAX_VERTEX_UNIFORM_VECTORS),v=t.getParameter(t.MAX_VARYING_VECTORS),E=t.getParameter(t.MAX_FRAGMENT_UNIFORM_VECTORS),b=g>0,R=t.getParameter(t.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:u,logarithmicDepthBuffer:f,reverseDepthBuffer:d,maxTextures:p,maxVertexTextures:g,maxTextureSize:S,maxCubemapSize:m,maxAttributes:h,maxVertexUniforms:_,maxVaryings:v,maxFragmentUniforms:E,vertexTextures:b,maxSamples:R}}function sb(t){const e=this;let n=null,i=0,r=!1,s=!1;const o=new Jr,a=new Ye,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(f,d){const p=f.length!==0||d||i!==0||r;return r=d,i=f.length,p},this.beginShadows=function(){s=!0,c(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(f,d){n=c(f,d,0)},this.setState=function(f,d,p){const g=f.clippingPlanes,S=f.clipIntersection,m=f.clipShadows,h=t.get(f);if(!r||g===null||g.length===0||s&&!m)s?c(null):u();else{const _=s?0:i,v=_*4;let E=h.clippingState||null;l.value=E,E=c(g,d,v,p);for(let b=0;b!==v;++b)E[b]=n[b];h.clippingState=E,this.numIntersection=S?this.numPlanes:0,this.numPlanes+=_}};function u(){l.value!==n&&(l.value=n,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function c(f,d,p,g){const S=f!==null?f.length:0;let m=null;if(S!==0){if(m=l.value,g!==!0||m===null){const h=p+S*4,_=d.matrixWorldInverse;a.getNormalMatrix(_),(m===null||m.length<h)&&(m=new Float32Array(h));for(let v=0,E=p;v!==S;++v,E+=4)o.copy(f[v]).applyMatrix4(_,a),o.normal.toArray(m,E),m[E+3]=o.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=S,e.numIntersection=0,m}}function ob(t){let e=new WeakMap;function n(o,a){return a===Kh?o.mapping=Eo:a===Zh&&(o.mapping=wo),o}function i(o){if(o&&o.isTexture){const a=o.mapping;if(a===Kh||a===Zh)if(e.has(o)){const l=e.get(o).texture;return n(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const u=new v2(l.height);return u.fromEquirectangularTexture(t,o),e.set(o,u),o.addEventListener("dispose",r),n(u.texture,o.mapping)}else return null}}return o}function r(o){const a=o.target;a.removeEventListener("dispose",r);const l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function s(){e=new WeakMap}return{get:i,dispose:s}}class P1 extends C1{constructor(e=-1,n=1,i=1,r=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=n,this.top=i,this.bottom=r,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,n,i,r,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),n=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-e,o=i+e,a=r+n,l=r-n;if(this.view!==null&&this.view.enabled){const u=(this.right-this.left)/this.view.fullWidth/this.zoom,c=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=u*this.view.offsetX,o=s+u*this.view.width,a-=c*this.view.offsetY,l=a-c*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.zoom=this.zoom,n.object.left=this.left,n.object.right=this.right,n.object.top=this.top,n.object.bottom=this.bottom,n.object.near=this.near,n.object.far=this.far,this.view!==null&&(n.object.view=Object.assign({},this.view)),n}}const eo=4,Jv=[.125,.215,.35,.446,.526,.582],rs=20,Sd=new P1,Qv=new nt;let Md=null,Ed=0,wd=0,Td=!1;const Qr=(1+Math.sqrt(5))/2,Os=1/Qr,e_=[new L(-Qr,Os,0),new L(Qr,Os,0),new L(-Os,0,Qr),new L(Os,0,Qr),new L(0,Qr,-Os),new L(0,Qr,Os),new L(-1,1,-1),new L(1,1,-1),new L(-1,1,1),new L(1,1,1)];class Tp{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,n=0,i=.1,r=100){Md=this._renderer.getRenderTarget(),Ed=this._renderer.getActiveCubeFace(),wd=this._renderer.getActiveMipmapLevel(),Td=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,i,r,s),n>0&&this._blur(s,0,0,n),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,n=null){return this._fromTexture(e,n)}fromCubemap(e,n=null){return this._fromTexture(e,n)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=i_(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=n_(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Md,Ed,wd),this._renderer.xr.enabled=Td,e.scissorTest=!1,ou(e,0,0,e.width,e.height)}_fromTexture(e,n){e.mapping===Eo||e.mapping===wo?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Md=this._renderer.getRenderTarget(),Ed=this._renderer.getActiveCubeFace(),wd=this._renderer.getActiveMipmapLevel(),Td=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=n||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),n=4*this._cubeSize,i={magFilter:ci,minFilter:ci,generateMipmaps:!1,type:pl,format:di,colorSpace:zr,depthBuffer:!1},r=t_(e,n,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==n){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=t_(e,n,i);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=ab(s)),this._blurMaterial=lb(s,e,n)}return r}_compileMaterial(e){const n=new Je(this._lodPlanes[0],e);this._renderer.compile(n,Sd)}_sceneToCubeUV(e,n,i,r){const a=new Mn(90,1,n,i),l=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],c=this._renderer,f=c.autoClear,d=c.toneMapping;c.getClearColor(Qv),c.toneMapping=Dr,c.autoClear=!1;const p=new Ao({name:"PMREM.Background",side:cn,depthWrite:!1,depthTest:!1}),g=new Je(new Vr,p);let S=!1;const m=e.background;m?m.isColor&&(p.color.copy(m),e.background=null,S=!0):(p.color.copy(Qv),S=!0);for(let h=0;h<6;h++){const _=h%3;_===0?(a.up.set(0,l[h],0),a.lookAt(u[h],0,0)):_===1?(a.up.set(0,0,l[h]),a.lookAt(0,u[h],0)):(a.up.set(0,l[h],0),a.lookAt(0,0,u[h]));const v=this._cubeSize;ou(r,_*v,h>2?v:0,v,v),c.setRenderTarget(r),S&&c.render(g,a),c.render(e,a)}g.geometry.dispose(),g.material.dispose(),c.toneMapping=d,c.autoClear=f,e.background=m}_textureToCubeUV(e,n){const i=this._renderer,r=e.mapping===Eo||e.mapping===wo;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=i_()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=n_());const s=r?this._cubemapMaterial:this._equirectMaterial,o=new Je(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=e;const l=this._cubeSize;ou(n,0,0,3*l,2*l),i.setRenderTarget(n),i.render(o,Sd)}_applyPMREM(e){const n=this._renderer,i=n.autoClear;n.autoClear=!1;const r=this._lodPlanes.length;for(let s=1;s<r;s++){const o=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=e_[(r-s-1)%e_.length];this._blur(e,s-1,s,o,a)}n.autoClear=i}_blur(e,n,i,r,s){const o=this._pingPongRenderTarget;this._halfBlur(e,o,n,i,r,"latitudinal",s),this._halfBlur(o,e,i,i,r,"longitudinal",s)}_halfBlur(e,n,i,r,s,o,a){const l=this._renderer,u=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const c=3,f=new Je(this._lodPlanes[r],u),d=u.uniforms,p=this._sizeLods[i]-1,g=isFinite(s)?Math.PI/(2*p):2*Math.PI/(2*rs-1),S=s/g,m=isFinite(s)?1+Math.floor(c*S):rs;m>rs&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${rs}`);const h=[];let _=0;for(let C=0;C<rs;++C){const P=C/S,Q=Math.exp(-P*P/2);h.push(Q),C===0?_+=Q:C<m&&(_+=2*Q)}for(let C=0;C<h.length;C++)h[C]=h[C]/_;d.envMap.value=e.texture,d.samples.value=m,d.weights.value=h,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);const{_lodMax:v}=this;d.dTheta.value=g,d.mipInt.value=v-i;const E=this._sizeLods[r],b=3*E*(r>v-eo?r-v+eo:0),R=4*(this._cubeSize-E);ou(n,b,R,3*E,2*E),l.setRenderTarget(n),l.render(f,Sd)}}function ab(t){const e=[],n=[],i=[];let r=t;const s=t-eo+1+Jv.length;for(let o=0;o<s;o++){const a=Math.pow(2,r);n.push(a);let l=1/a;o>t-eo?l=Jv[o-t+eo-1]:o===0&&(l=0),i.push(l);const u=1/(a-2),c=-u,f=1+u,d=[c,c,f,c,f,f,c,c,f,f,c,f],p=6,g=6,S=3,m=2,h=1,_=new Float32Array(S*g*p),v=new Float32Array(m*g*p),E=new Float32Array(h*g*p);for(let R=0;R<p;R++){const C=R%3*2/3-1,P=R>2?0:-1,Q=[C,P,0,C+2/3,P,0,C+2/3,P+1,0,C,P,0,C+2/3,P+1,0,C,P+1,0];_.set(Q,S*g*R),v.set(d,m*g*R);const y=[R,R,R,R,R,R];E.set(y,h*g*R)}const b=new Hr;b.setAttribute("position",new Ci(_,S)),b.setAttribute("uv",new Ci(v,m)),b.setAttribute("faceIndex",new Ci(E,h)),e.push(b),r>eo&&r--}return{lodPlanes:e,sizeLods:n,sigmas:i}}function t_(t,e,n){const i=new xs(t,e,n);return i.texture.mapping=of,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function ou(t,e,n,i,r){t.viewport.set(e,n,i,r),t.scissor.set(e,n,i,r)}function lb(t,e,n){const i=new Float32Array(rs),r=new L(0,1,0);return new kr({name:"SphericalGaussianBlur",defines:{n:rs,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${t}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:lg(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Lr,depthTest:!1,depthWrite:!1})}function n_(){return new kr({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:lg(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Lr,depthTest:!1,depthWrite:!1})}function i_(){return new kr({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:lg(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Lr,depthTest:!1,depthWrite:!1})}function lg(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function ub(t){let e=new WeakMap,n=null;function i(a){if(a&&a.isTexture){const l=a.mapping,u=l===Kh||l===Zh,c=l===Eo||l===wo;if(u||c){let f=e.get(a);const d=f!==void 0?f.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==d)return n===null&&(n=new Tp(t)),f=u?n.fromEquirectangular(a,f):n.fromCubemap(a,f),f.texture.pmremVersion=a.pmremVersion,e.set(a,f),f.texture;if(f!==void 0)return f.texture;{const p=a.image;return u&&p&&p.height>0||c&&p&&r(p)?(n===null&&(n=new Tp(t)),f=u?n.fromEquirectangular(a):n.fromCubemap(a),f.texture.pmremVersion=a.pmremVersion,e.set(a,f),a.addEventListener("dispose",s),f.texture):null}}}return a}function r(a){let l=0;const u=6;for(let c=0;c<u;c++)a[c]!==void 0&&l++;return l===u}function s(a){const l=a.target;l.removeEventListener("dispose",s);const u=e.get(l);u!==void 0&&(e.delete(l),u.dispose())}function o(){e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:i,dispose:o}}function cb(t){const e={};function n(i){if(e[i]!==void 0)return e[i];let r;switch(i){case"WEBGL_depth_texture":r=t.getExtension("WEBGL_depth_texture")||t.getExtension("MOZ_WEBGL_depth_texture")||t.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=t.getExtension("EXT_texture_filter_anisotropic")||t.getExtension("MOZ_EXT_texture_filter_anisotropic")||t.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=t.getExtension("WEBGL_compressed_texture_s3tc")||t.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||t.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=t.getExtension("WEBGL_compressed_texture_pvrtc")||t.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=t.getExtension(i)}return e[i]=r,r}return{has:function(i){return n(i)!==null},init:function(){n("EXT_color_buffer_float"),n("WEBGL_clip_cull_distance"),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture"),n("WEBGL_render_shared_exponent")},get:function(i){const r=n(i);return r===null&&Gu("THREE.WebGLRenderer: "+i+" extension not supported."),r}}}function fb(t,e,n,i){const r={},s=new WeakMap;function o(f){const d=f.target;d.index!==null&&e.remove(d.index);for(const g in d.attributes)e.remove(d.attributes[g]);for(const g in d.morphAttributes){const S=d.morphAttributes[g];for(let m=0,h=S.length;m<h;m++)e.remove(S[m])}d.removeEventListener("dispose",o),delete r[d.id];const p=s.get(d);p&&(e.remove(p),s.delete(d)),i.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,n.memory.geometries--}function a(f,d){return r[d.id]===!0||(d.addEventListener("dispose",o),r[d.id]=!0,n.memory.geometries++),d}function l(f){const d=f.attributes;for(const g in d)e.update(d[g],t.ARRAY_BUFFER);const p=f.morphAttributes;for(const g in p){const S=p[g];for(let m=0,h=S.length;m<h;m++)e.update(S[m],t.ARRAY_BUFFER)}}function u(f){const d=[],p=f.index,g=f.attributes.position;let S=0;if(p!==null){const _=p.array;S=p.version;for(let v=0,E=_.length;v<E;v+=3){const b=_[v+0],R=_[v+1],C=_[v+2];d.push(b,R,R,C,C,b)}}else if(g!==void 0){const _=g.array;S=g.version;for(let v=0,E=_.length/3-1;v<E;v+=3){const b=v+0,R=v+1,C=v+2;d.push(b,R,R,C,C,b)}}else return;const m=new(_1(d)?w1:E1)(d,1);m.version=S;const h=s.get(f);h&&e.remove(h),s.set(f,m)}function c(f){const d=s.get(f);if(d){const p=f.index;p!==null&&d.version<p.version&&u(f)}else u(f);return s.get(f)}return{get:a,update:l,getWireframeAttribute:c}}function db(t,e,n){let i;function r(d){i=d}let s,o;function a(d){s=d.type,o=d.bytesPerElement}function l(d,p){t.drawElements(i,p,s,d*o),n.update(p,i,1)}function u(d,p,g){g!==0&&(t.drawElementsInstanced(i,p,s,d*o,g),n.update(p,i,g))}function c(d,p,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,p,0,s,d,0,g);let m=0;for(let h=0;h<g;h++)m+=p[h];n.update(m,i,1)}function f(d,p,g,S){if(g===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let h=0;h<d.length;h++)u(d[h]/o,p[h],S[h]);else{m.multiDrawElementsInstancedWEBGL(i,p,0,s,d,0,S,0,g);let h=0;for(let _=0;_<g;_++)h+=p[_];for(let _=0;_<S.length;_++)n.update(h,i,S[_])}}this.setMode=r,this.setIndex=a,this.render=l,this.renderInstances=u,this.renderMultiDraw=c,this.renderMultiDrawInstances=f}function hb(t){const e={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,o,a){switch(n.calls++,o){case t.TRIANGLES:n.triangles+=a*(s/3);break;case t.LINES:n.lines+=a*(s/2);break;case t.LINE_STRIP:n.lines+=a*(s-1);break;case t.LINE_LOOP:n.lines+=a*s;break;case t.POINTS:n.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function r(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:e,render:n,programs:null,autoReset:!0,reset:r,update:i}}function pb(t,e,n){const i=new WeakMap,r=new ut;function s(o,a,l){const u=o.morphTargetInfluences,c=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,f=c!==void 0?c.length:0;let d=i.get(a);if(d===void 0||d.count!==f){let y=function(){P.dispose(),i.delete(a),a.removeEventListener("dispose",y)};var p=y;d!==void 0&&d.texture.dispose();const g=a.morphAttributes.position!==void 0,S=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,h=a.morphAttributes.position||[],_=a.morphAttributes.normal||[],v=a.morphAttributes.color||[];let E=0;g===!0&&(E=1),S===!0&&(E=2),m===!0&&(E=3);let b=a.attributes.position.count*E,R=1;b>e.maxTextureSize&&(R=Math.ceil(b/e.maxTextureSize),b=e.maxTextureSize);const C=new Float32Array(b*R*4*f),P=new y1(C,b,R,f);P.type=Gi,P.needsUpdate=!0;const Q=E*4;for(let w=0;w<f;w++){const $=h[w],O=_[w],j=v[w],K=b*R*4*w;for(let z=0;z<$.count;z++){const ne=z*Q;g===!0&&(r.fromBufferAttribute($,z),C[K+ne+0]=r.x,C[K+ne+1]=r.y,C[K+ne+2]=r.z,C[K+ne+3]=0),S===!0&&(r.fromBufferAttribute(O,z),C[K+ne+4]=r.x,C[K+ne+5]=r.y,C[K+ne+6]=r.z,C[K+ne+7]=0),m===!0&&(r.fromBufferAttribute(j,z),C[K+ne+8]=r.x,C[K+ne+9]=r.y,C[K+ne+10]=r.z,C[K+ne+11]=j.itemSize===4?r.w:1)}}d={count:f,texture:P,size:new ge(b,R)},i.set(a,d),a.addEventListener("dispose",y)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(t,"morphTexture",o.morphTexture,n);else{let g=0;for(let m=0;m<u.length;m++)g+=u[m];const S=a.morphTargetsRelative?1:1-g;l.getUniforms().setValue(t,"morphTargetBaseInfluence",S),l.getUniforms().setValue(t,"morphTargetInfluences",u)}l.getUniforms().setValue(t,"morphTargetsTexture",d.texture,n),l.getUniforms().setValue(t,"morphTargetsTextureSize",d.size)}return{update:s}}function mb(t,e,n,i){let r=new WeakMap;function s(l){const u=i.render.frame,c=l.geometry,f=e.get(l,c);if(r.get(f)!==u&&(e.update(f),r.set(f,u)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),r.get(l)!==u&&(n.update(l.instanceMatrix,t.ARRAY_BUFFER),l.instanceColor!==null&&n.update(l.instanceColor,t.ARRAY_BUFFER),r.set(l,u))),l.isSkinnedMesh){const d=l.skeleton;r.get(d)!==u&&(d.update(),r.set(d,u))}return f}function o(){r=new WeakMap}function a(l){const u=l.target;u.removeEventListener("dispose",a),n.remove(u.instanceMatrix),u.instanceColor!==null&&n.remove(u.instanceColor)}return{update:s,dispose:o}}class b1 extends fn{constructor(e,n,i,r,s,o,a,l,u,c=fo){if(c!==fo&&c!==Co)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&c===fo&&(i=_s),i===void 0&&c===Co&&(i=To),super(null,r,s,o,a,l,c,i,u),this.isDepthTexture=!0,this.image={width:e,height:n},this.magFilter=a!==void 0?a:Jn,this.minFilter=l!==void 0?l:Jn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const n=super.toJSON(e);return this.compareFunction!==null&&(n.compareFunction=this.compareFunction),n}}const L1=new fn,r_=new b1(1,1),D1=new y1,I1=new e2,N1=new A1,s_=[],o_=[],a_=new Float32Array(16),l_=new Float32Array(9),u_=new Float32Array(4);function Oo(t,e,n){const i=t[0];if(i<=0||i>0)return t;const r=e*n;let s=s_[r];if(s===void 0&&(s=new Float32Array(r),s_[r]=s),e!==0){i.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=n,t[o].toArray(s,a)}return s}function Ft(t,e){if(t.length!==e.length)return!1;for(let n=0,i=t.length;n<i;n++)if(t[n]!==e[n])return!1;return!0}function Ot(t,e){for(let n=0,i=e.length;n<i;n++)t[n]=e[n]}function lf(t,e){let n=o_[e];n===void 0&&(n=new Int32Array(e),o_[e]=n);for(let i=0;i!==e;++i)n[i]=t.allocateTextureUnit();return n}function gb(t,e){const n=this.cache;n[0]!==e&&(t.uniform1f(this.addr,e),n[0]=e)}function vb(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2f(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Ft(n,e))return;t.uniform2fv(this.addr,e),Ot(n,e)}}function _b(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3f(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else if(e.r!==void 0)(n[0]!==e.r||n[1]!==e.g||n[2]!==e.b)&&(t.uniform3f(this.addr,e.r,e.g,e.b),n[0]=e.r,n[1]=e.g,n[2]=e.b);else{if(Ft(n,e))return;t.uniform3fv(this.addr,e),Ot(n,e)}}function xb(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4f(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Ft(n,e))return;t.uniform4fv(this.addr,e),Ot(n,e)}}function yb(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(Ft(n,e))return;t.uniformMatrix2fv(this.addr,!1,e),Ot(n,e)}else{if(Ft(n,i))return;u_.set(i),t.uniformMatrix2fv(this.addr,!1,u_),Ot(n,i)}}function Sb(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(Ft(n,e))return;t.uniformMatrix3fv(this.addr,!1,e),Ot(n,e)}else{if(Ft(n,i))return;l_.set(i),t.uniformMatrix3fv(this.addr,!1,l_),Ot(n,i)}}function Mb(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(Ft(n,e))return;t.uniformMatrix4fv(this.addr,!1,e),Ot(n,e)}else{if(Ft(n,i))return;a_.set(i),t.uniformMatrix4fv(this.addr,!1,a_),Ot(n,i)}}function Eb(t,e){const n=this.cache;n[0]!==e&&(t.uniform1i(this.addr,e),n[0]=e)}function wb(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2i(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Ft(n,e))return;t.uniform2iv(this.addr,e),Ot(n,e)}}function Tb(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3i(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(Ft(n,e))return;t.uniform3iv(this.addr,e),Ot(n,e)}}function Cb(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4i(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Ft(n,e))return;t.uniform4iv(this.addr,e),Ot(n,e)}}function Ab(t,e){const n=this.cache;n[0]!==e&&(t.uniform1ui(this.addr,e),n[0]=e)}function Rb(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2ui(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Ft(n,e))return;t.uniform2uiv(this.addr,e),Ot(n,e)}}function Pb(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3ui(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(Ft(n,e))return;t.uniform3uiv(this.addr,e),Ot(n,e)}}function bb(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4ui(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Ft(n,e))return;t.uniform4uiv(this.addr,e),Ot(n,e)}}function Lb(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r);let s;this.type===t.SAMPLER_2D_SHADOW?(r_.compareFunction=v1,s=r_):s=L1,n.setTexture2D(e||s,r)}function Db(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTexture3D(e||I1,r)}function Ib(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTextureCube(e||N1,r)}function Nb(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTexture2DArray(e||D1,r)}function Ub(t){switch(t){case 5126:return gb;case 35664:return vb;case 35665:return _b;case 35666:return xb;case 35674:return yb;case 35675:return Sb;case 35676:return Mb;case 5124:case 35670:return Eb;case 35667:case 35671:return wb;case 35668:case 35672:return Tb;case 35669:case 35673:return Cb;case 5125:return Ab;case 36294:return Rb;case 36295:return Pb;case 36296:return bb;case 35678:case 36198:case 36298:case 36306:case 35682:return Lb;case 35679:case 36299:case 36307:return Db;case 35680:case 36300:case 36308:case 36293:return Ib;case 36289:case 36303:case 36311:case 36292:return Nb}}function kb(t,e){t.uniform1fv(this.addr,e)}function Fb(t,e){const n=Oo(e,this.size,2);t.uniform2fv(this.addr,n)}function Ob(t,e){const n=Oo(e,this.size,3);t.uniform3fv(this.addr,n)}function Bb(t,e){const n=Oo(e,this.size,4);t.uniform4fv(this.addr,n)}function zb(t,e){const n=Oo(e,this.size,4);t.uniformMatrix2fv(this.addr,!1,n)}function Hb(t,e){const n=Oo(e,this.size,9);t.uniformMatrix3fv(this.addr,!1,n)}function Vb(t,e){const n=Oo(e,this.size,16);t.uniformMatrix4fv(this.addr,!1,n)}function Gb(t,e){t.uniform1iv(this.addr,e)}function Wb(t,e){t.uniform2iv(this.addr,e)}function $b(t,e){t.uniform3iv(this.addr,e)}function Xb(t,e){t.uniform4iv(this.addr,e)}function jb(t,e){t.uniform1uiv(this.addr,e)}function Yb(t,e){t.uniform2uiv(this.addr,e)}function qb(t,e){t.uniform3uiv(this.addr,e)}function Kb(t,e){t.uniform4uiv(this.addr,e)}function Zb(t,e,n){const i=this.cache,r=e.length,s=lf(n,r);Ft(i,s)||(t.uniform1iv(this.addr,s),Ot(i,s));for(let o=0;o!==r;++o)n.setTexture2D(e[o]||L1,s[o])}function Jb(t,e,n){const i=this.cache,r=e.length,s=lf(n,r);Ft(i,s)||(t.uniform1iv(this.addr,s),Ot(i,s));for(let o=0;o!==r;++o)n.setTexture3D(e[o]||I1,s[o])}function Qb(t,e,n){const i=this.cache,r=e.length,s=lf(n,r);Ft(i,s)||(t.uniform1iv(this.addr,s),Ot(i,s));for(let o=0;o!==r;++o)n.setTextureCube(e[o]||N1,s[o])}function e3(t,e,n){const i=this.cache,r=e.length,s=lf(n,r);Ft(i,s)||(t.uniform1iv(this.addr,s),Ot(i,s));for(let o=0;o!==r;++o)n.setTexture2DArray(e[o]||D1,s[o])}function t3(t){switch(t){case 5126:return kb;case 35664:return Fb;case 35665:return Ob;case 35666:return Bb;case 35674:return zb;case 35675:return Hb;case 35676:return Vb;case 5124:case 35670:return Gb;case 35667:case 35671:return Wb;case 35668:case 35672:return $b;case 35669:case 35673:return Xb;case 5125:return jb;case 36294:return Yb;case 36295:return qb;case 36296:return Kb;case 35678:case 36198:case 36298:case 36306:case 35682:return Zb;case 35679:case 36299:case 36307:return Jb;case 35680:case 36300:case 36308:case 36293:return Qb;case 36289:case 36303:case 36311:case 36292:return e3}}class n3{constructor(e,n,i){this.id=e,this.addr=i,this.cache=[],this.type=n.type,this.setValue=Ub(n.type)}}class i3{constructor(e,n,i){this.id=e,this.addr=i,this.cache=[],this.type=n.type,this.size=n.size,this.setValue=t3(n.type)}}class r3{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,n,i){const r=this.seq;for(let s=0,o=r.length;s!==o;++s){const a=r[s];a.setValue(e,n[a.id],i)}}}const Cd=/(\w+)(\])?(\[|\.)?/g;function c_(t,e){t.seq.push(e),t.map[e.id]=e}function s3(t,e,n){const i=t.name,r=i.length;for(Cd.lastIndex=0;;){const s=Cd.exec(i),o=Cd.lastIndex;let a=s[1];const l=s[2]==="]",u=s[3];if(l&&(a=a|0),u===void 0||u==="["&&o+2===r){c_(n,u===void 0?new n3(a,t,e):new i3(a,t,e));break}else{let f=n.map[a];f===void 0&&(f=new r3(a),c_(n,f)),n=f}}}class Wu{constructor(e,n){this.seq=[],this.map={};const i=e.getProgramParameter(n,e.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){const s=e.getActiveUniform(n,r),o=e.getUniformLocation(n,s.name);s3(s,o,this)}}setValue(e,n,i,r){const s=this.map[n];s!==void 0&&s.setValue(e,i,r)}setOptional(e,n,i){const r=n[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,n,i,r){for(let s=0,o=n.length;s!==o;++s){const a=n[s],l=i[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,r)}}static seqWithValue(e,n){const i=[];for(let r=0,s=e.length;r!==s;++r){const o=e[r];o.id in n&&i.push(o)}return i}}function f_(t,e,n){const i=t.createShader(e);return t.shaderSource(i,n),t.compileShader(i),i}const o3=37297;let a3=0;function l3(t,e){const n=t.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,n.length);for(let o=r;o<s;o++){const a=o+1;i.push(`${a===e?">":" "} ${a}: ${n[o]}`)}return i.join(`
`)}function u3(t){const e=ot.getPrimaries(ot.workingColorSpace),n=ot.getPrimaries(t);let i;switch(e===n?i="":e===bc&&n===Pc?i="LinearDisplayP3ToLinearSRGB":e===Pc&&n===bc&&(i="LinearSRGBToLinearDisplayP3"),t){case zr:case af:return[i,"LinearTransferOETF"];case an:case sg:return[i,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",t),[i,"LinearTransferOETF"]}}function d_(t,e,n){const i=t.getShaderParameter(e,t.COMPILE_STATUS),r=t.getShaderInfoLog(e).trim();if(i&&r==="")return"";const s=/ERROR: 0:(\d+)/.exec(r);if(s){const o=parseInt(s[1]);return n.toUpperCase()+`

`+r+`

`+l3(t.getShaderSource(e),o)}else return r}function c3(t,e){const n=u3(e);return`vec4 ${t}( vec4 value ) { return ${n[0]}( ${n[1]}( value ) ); }`}function f3(t,e){let n;switch(e){case AA:n="Linear";break;case RA:n="Reinhard";break;case PA:n="Cineon";break;case r1:n="ACESFilmic";break;case LA:n="AgX";break;case DA:n="Neutral";break;case bA:n="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),n="Linear"}return"vec3 "+t+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}const au=new L;function d3(){ot.getLuminanceCoefficients(au);const t=au.x.toFixed(4),e=au.y.toFixed(4),n=au.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${t}, ${e}, ${n} );`,"	return dot( weights, rgb );","}"].join(`
`)}function h3(t){return[t.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",t.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(pa).join(`
`)}function p3(t){const e=[];for(const n in t){const i=t[n];i!==!1&&e.push("#define "+n+" "+i)}return e.join(`
`)}function m3(t,e){const n={},i=t.getProgramParameter(e,t.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=t.getActiveAttrib(e,r),o=s.name;let a=1;s.type===t.FLOAT_MAT2&&(a=2),s.type===t.FLOAT_MAT3&&(a=3),s.type===t.FLOAT_MAT4&&(a=4),n[o]={type:s.type,location:t.getAttribLocation(e,o),locationSize:a}}return n}function pa(t){return t!==""}function h_(t,e){const n=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return t.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function p_(t,e){return t.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const g3=/^[ \t]*#include +<([\w\d./]+)>/gm;function Cp(t){return t.replace(g3,_3)}const v3=new Map;function _3(t,e){let n=je[e];if(n===void 0){const i=v3.get(e);if(i!==void 0)n=je[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return Cp(n)}const x3=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function m_(t){return t.replace(x3,y3)}function y3(t,e,n,i){let r="";for(let s=parseInt(e);s<parseInt(n);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function g_(t){let e=`precision ${t.precision} float;
	precision ${t.precision} int;
	precision ${t.precision} sampler2D;
	precision ${t.precision} samplerCube;
	precision ${t.precision} sampler3D;
	precision ${t.precision} sampler2DArray;
	precision ${t.precision} sampler2DShadow;
	precision ${t.precision} samplerCubeShadow;
	precision ${t.precision} sampler2DArrayShadow;
	precision ${t.precision} isampler2D;
	precision ${t.precision} isampler3D;
	precision ${t.precision} isamplerCube;
	precision ${t.precision} isampler2DArray;
	precision ${t.precision} usampler2D;
	precision ${t.precision} usampler3D;
	precision ${t.precision} usamplerCube;
	precision ${t.precision} usampler2DArray;
	`;return t.precision==="highp"?e+=`
#define HIGH_PRECISION`:t.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:t.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function S3(t){let e="SHADOWMAP_TYPE_BASIC";return t.shadowMapType===t1?e="SHADOWMAP_TYPE_PCF":t.shadowMapType===n1?e="SHADOWMAP_TYPE_PCF_SOFT":t.shadowMapType===Fi&&(e="SHADOWMAP_TYPE_VSM"),e}function M3(t){let e="ENVMAP_TYPE_CUBE";if(t.envMap)switch(t.envMapMode){case Eo:case wo:e="ENVMAP_TYPE_CUBE";break;case of:e="ENVMAP_TYPE_CUBE_UV";break}return e}function E3(t){let e="ENVMAP_MODE_REFLECTION";if(t.envMap)switch(t.envMapMode){case wo:e="ENVMAP_MODE_REFRACTION";break}return e}function w3(t){let e="ENVMAP_BLENDING_NONE";if(t.envMap)switch(t.combine){case i1:e="ENVMAP_BLENDING_MULTIPLY";break;case TA:e="ENVMAP_BLENDING_MIX";break;case CA:e="ENVMAP_BLENDING_ADD";break}return e}function T3(t){const e=t.envMapCubeUVHeight;if(e===null)return null;const n=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,n),7*16)),texelHeight:i,maxMip:n}}function C3(t,e,n,i){const r=t.getContext(),s=n.defines;let o=n.vertexShader,a=n.fragmentShader;const l=S3(n),u=M3(n),c=E3(n),f=w3(n),d=T3(n),p=h3(n),g=p3(s),S=r.createProgram();let m,h,_=n.glslVersion?"#version "+n.glslVersion+`
`:"";n.isRawShaderMaterial?(m=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,g].filter(pa).join(`
`),m.length>0&&(m+=`
`),h=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,g].filter(pa).join(`
`),h.length>0&&(h+=`
`)):(m=[g_(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,g,n.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",n.batching?"#define USE_BATCHING":"",n.batchingColor?"#define USE_BATCHING_COLOR":"",n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.instancingMorph?"#define USE_INSTANCING_MORPH":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+c:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.morphColors?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",n.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(pa).join(`
`),h=[g_(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,g,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+u:"",n.envMap?"#define "+c:"",n.envMap?"#define "+f:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.dispersion?"#define USE_DISPERSION":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor||n.batchingColor?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",n.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==Dr?"#define TONE_MAPPING":"",n.toneMapping!==Dr?je.tonemapping_pars_fragment:"",n.toneMapping!==Dr?f3("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",je.colorspace_pars_fragment,c3("linearToOutputTexel",n.outputColorSpace),d3(),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(pa).join(`
`)),o=Cp(o),o=h_(o,n),o=p_(o,n),a=Cp(a),a=h_(a,n),a=p_(a,n),o=m_(o),a=m_(a),n.isRawShaderMaterial!==!0&&(_=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,h=["#define varying in",n.glslVersion===Nv?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion===Nv?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+h);const v=_+m+o,E=_+h+a,b=f_(r,r.VERTEX_SHADER,v),R=f_(r,r.FRAGMENT_SHADER,E);r.attachShader(S,b),r.attachShader(S,R),n.index0AttributeName!==void 0?r.bindAttribLocation(S,0,n.index0AttributeName):n.morphTargets===!0&&r.bindAttribLocation(S,0,"position"),r.linkProgram(S);function C(w){if(t.debug.checkShaderErrors){const $=r.getProgramInfoLog(S).trim(),O=r.getShaderInfoLog(b).trim(),j=r.getShaderInfoLog(R).trim();let K=!0,z=!0;if(r.getProgramParameter(S,r.LINK_STATUS)===!1)if(K=!1,typeof t.debug.onShaderError=="function")t.debug.onShaderError(r,S,b,R);else{const ne=d_(r,b,"vertex"),D=d_(r,R,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(S,r.VALIDATE_STATUS)+`

Material Name: `+w.name+`
Material Type: `+w.type+`

Program Info Log: `+$+`
`+ne+`
`+D)}else $!==""?console.warn("THREE.WebGLProgram: Program Info Log:",$):(O===""||j==="")&&(z=!1);z&&(w.diagnostics={runnable:K,programLog:$,vertexShader:{log:O,prefix:m},fragmentShader:{log:j,prefix:h}})}r.deleteShader(b),r.deleteShader(R),P=new Wu(r,S),Q=m3(r,S)}let P;this.getUniforms=function(){return P===void 0&&C(this),P};let Q;this.getAttributes=function(){return Q===void 0&&C(this),Q};let y=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return y===!1&&(y=r.getProgramParameter(S,o3)),y},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(S),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=a3++,this.cacheKey=e,this.usedTimes=1,this.program=S,this.vertexShader=b,this.fragmentShader=R,this}let A3=0;class R3{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const n=e.vertexShader,i=e.fragmentShader,r=this._getShaderStage(n),s=this._getShaderStage(i),o=this._getShaderCacheForMaterial(e);return o.has(r)===!1&&(o.add(r),r.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){const n=this.materialCache.get(e);for(const i of n)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const n=this.materialCache;let i=n.get(e);return i===void 0&&(i=new Set,n.set(e,i)),i}_getShaderStage(e){const n=this.shaderCache;let i=n.get(e);return i===void 0&&(i=new P3(e),n.set(e,i)),i}}class P3{constructor(e){this.id=A3++,this.code=e,this.usedTimes=0}}function b3(t,e,n,i,r,s,o){const a=new S1,l=new R3,u=new Set,c=[],f=r.logarithmicDepthBuffer,d=r.reverseDepthBuffer,p=r.vertexTextures;let g=r.precision;const S={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function m(y){return u.add(y),y===0?"uv":`uv${y}`}function h(y,w,$,O,j){const K=O.fog,z=j.geometry,ne=y.isMeshStandardMaterial?O.environment:null,D=(y.isMeshStandardMaterial?n:e).get(y.envMap||ne),J=D&&D.mapping===of?D.image.height:null,ee=S[y.type];y.precision!==null&&(g=r.getMaxPrecision(y.precision),g!==y.precision&&console.warn("THREE.WebGLProgram.getParameters:",y.precision,"not supported, using",g,"instead."));const re=z.morphAttributes.position||z.morphAttributes.normal||z.morphAttributes.color,Pe=re!==void 0?re.length:0;let Ge=0;z.morphAttributes.position!==void 0&&(Ge=1),z.morphAttributes.normal!==void 0&&(Ge=2),z.morphAttributes.color!==void 0&&(Ge=3);let U,Z,te,se;if(ee){const vn=Mi[ee];U=vn.vertexShader,Z=vn.fragmentShader}else U=y.vertexShader,Z=y.fragmentShader,l.update(y),te=l.getVertexShaderID(y),se=l.getFragmentShaderID(y);const _e=t.getRenderTarget(),Ce=j.isInstancedMesh===!0,Fe=j.isBatchedMesh===!0,Xe=!!y.map,q=!!y.matcap,A=!!D,ce=!!y.aoMap,le=!!y.lightMap,oe=!!y.bumpMap,de=!!y.normalMap,Ie=!!y.displacementMap,xe=!!y.emissiveMap,M=!!y.metalnessMap,x=!!y.roughnessMap,I=y.anisotropy>0,V=y.clearcoat>0,G=y.dispersion>0,W=y.iridescence>0,Ae=y.sheen>0,he=y.transmission>0,me=I&&!!y.anisotropyMap,ze=V&&!!y.clearcoatMap,ue=V&&!!y.clearcoatNormalMap,we=V&&!!y.clearcoatRoughnessMap,He=W&&!!y.iridescenceMap,Ve=W&&!!y.iridescenceThicknessMap,Re=Ae&&!!y.sheenColorMap,Qe=Ae&&!!y.sheenRoughnessMap,We=!!y.specularMap,ct=!!y.specularColorMap,N=!!y.specularIntensityMap,Me=he&&!!y.transmissionMap,Y=he&&!!y.thicknessMap,ie=!!y.gradientMap,ye=!!y.alphaMap,Ee=y.alphaTest>0,et=!!y.alphaHash,Lt=!!y.extensions;let gn=Dr;y.toneMapped&&(_e===null||_e.isXRRenderTarget===!0)&&(gn=t.toneMapping);const it={shaderID:ee,shaderType:y.type,shaderName:y.name,vertexShader:U,fragmentShader:Z,defines:y.defines,customVertexShaderID:te,customFragmentShaderID:se,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:g,batching:Fe,batchingColor:Fe&&j._colorsTexture!==null,instancing:Ce,instancingColor:Ce&&j.instanceColor!==null,instancingMorph:Ce&&j.morphTexture!==null,supportsVertexTextures:p,outputColorSpace:_e===null?t.outputColorSpace:_e.isXRRenderTarget===!0?_e.texture.colorSpace:zr,alphaToCoverage:!!y.alphaToCoverage,map:Xe,matcap:q,envMap:A,envMapMode:A&&D.mapping,envMapCubeUVHeight:J,aoMap:ce,lightMap:le,bumpMap:oe,normalMap:de,displacementMap:p&&Ie,emissiveMap:xe,normalMapObjectSpace:de&&y.normalMapType===kA,normalMapTangentSpace:de&&y.normalMapType===g1,metalnessMap:M,roughnessMap:x,anisotropy:I,anisotropyMap:me,clearcoat:V,clearcoatMap:ze,clearcoatNormalMap:ue,clearcoatRoughnessMap:we,dispersion:G,iridescence:W,iridescenceMap:He,iridescenceThicknessMap:Ve,sheen:Ae,sheenColorMap:Re,sheenRoughnessMap:Qe,specularMap:We,specularColorMap:ct,specularIntensityMap:N,transmission:he,transmissionMap:Me,thicknessMap:Y,gradientMap:ie,opaque:y.transparent===!1&&y.blending===co&&y.alphaToCoverage===!1,alphaMap:ye,alphaTest:Ee,alphaHash:et,combine:y.combine,mapUv:Xe&&m(y.map.channel),aoMapUv:ce&&m(y.aoMap.channel),lightMapUv:le&&m(y.lightMap.channel),bumpMapUv:oe&&m(y.bumpMap.channel),normalMapUv:de&&m(y.normalMap.channel),displacementMapUv:Ie&&m(y.displacementMap.channel),emissiveMapUv:xe&&m(y.emissiveMap.channel),metalnessMapUv:M&&m(y.metalnessMap.channel),roughnessMapUv:x&&m(y.roughnessMap.channel),anisotropyMapUv:me&&m(y.anisotropyMap.channel),clearcoatMapUv:ze&&m(y.clearcoatMap.channel),clearcoatNormalMapUv:ue&&m(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:we&&m(y.clearcoatRoughnessMap.channel),iridescenceMapUv:He&&m(y.iridescenceMap.channel),iridescenceThicknessMapUv:Ve&&m(y.iridescenceThicknessMap.channel),sheenColorMapUv:Re&&m(y.sheenColorMap.channel),sheenRoughnessMapUv:Qe&&m(y.sheenRoughnessMap.channel),specularMapUv:We&&m(y.specularMap.channel),specularColorMapUv:ct&&m(y.specularColorMap.channel),specularIntensityMapUv:N&&m(y.specularIntensityMap.channel),transmissionMapUv:Me&&m(y.transmissionMap.channel),thicknessMapUv:Y&&m(y.thicknessMap.channel),alphaMapUv:ye&&m(y.alphaMap.channel),vertexTangents:!!z.attributes.tangent&&(de||I),vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!z.attributes.color&&z.attributes.color.itemSize===4,pointsUvs:j.isPoints===!0&&!!z.attributes.uv&&(Xe||ye),fog:!!K,useFog:y.fog===!0,fogExp2:!!K&&K.isFogExp2,flatShading:y.flatShading===!0,sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:f,reverseDepthBuffer:d,skinning:j.isSkinnedMesh===!0,morphTargets:z.morphAttributes.position!==void 0,morphNormals:z.morphAttributes.normal!==void 0,morphColors:z.morphAttributes.color!==void 0,morphTargetsCount:Pe,morphTextureStride:Ge,numDirLights:w.directional.length,numPointLights:w.point.length,numSpotLights:w.spot.length,numSpotLightMaps:w.spotLightMap.length,numRectAreaLights:w.rectArea.length,numHemiLights:w.hemi.length,numDirLightShadows:w.directionalShadowMap.length,numPointLightShadows:w.pointShadowMap.length,numSpotLightShadows:w.spotShadowMap.length,numSpotLightShadowsWithMaps:w.numSpotLightShadowsWithMaps,numLightProbes:w.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:y.dithering,shadowMapEnabled:t.shadowMap.enabled&&$.length>0,shadowMapType:t.shadowMap.type,toneMapping:gn,decodeVideoTexture:Xe&&y.map.isVideoTexture===!0&&ot.getTransfer(y.map.colorSpace)===gt,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===zi,flipSided:y.side===cn,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionClipCullDistance:Lt&&y.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Lt&&y.extensions.multiDraw===!0||Fe)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return it.vertexUv1s=u.has(1),it.vertexUv2s=u.has(2),it.vertexUv3s=u.has(3),u.clear(),it}function _(y){const w=[];if(y.shaderID?w.push(y.shaderID):(w.push(y.customVertexShaderID),w.push(y.customFragmentShaderID)),y.defines!==void 0)for(const $ in y.defines)w.push($),w.push(y.defines[$]);return y.isRawShaderMaterial===!1&&(v(w,y),E(w,y),w.push(t.outputColorSpace)),w.push(y.customProgramCacheKey),w.join()}function v(y,w){y.push(w.precision),y.push(w.outputColorSpace),y.push(w.envMapMode),y.push(w.envMapCubeUVHeight),y.push(w.mapUv),y.push(w.alphaMapUv),y.push(w.lightMapUv),y.push(w.aoMapUv),y.push(w.bumpMapUv),y.push(w.normalMapUv),y.push(w.displacementMapUv),y.push(w.emissiveMapUv),y.push(w.metalnessMapUv),y.push(w.roughnessMapUv),y.push(w.anisotropyMapUv),y.push(w.clearcoatMapUv),y.push(w.clearcoatNormalMapUv),y.push(w.clearcoatRoughnessMapUv),y.push(w.iridescenceMapUv),y.push(w.iridescenceThicknessMapUv),y.push(w.sheenColorMapUv),y.push(w.sheenRoughnessMapUv),y.push(w.specularMapUv),y.push(w.specularColorMapUv),y.push(w.specularIntensityMapUv),y.push(w.transmissionMapUv),y.push(w.thicknessMapUv),y.push(w.combine),y.push(w.fogExp2),y.push(w.sizeAttenuation),y.push(w.morphTargetsCount),y.push(w.morphAttributeCount),y.push(w.numDirLights),y.push(w.numPointLights),y.push(w.numSpotLights),y.push(w.numSpotLightMaps),y.push(w.numHemiLights),y.push(w.numRectAreaLights),y.push(w.numDirLightShadows),y.push(w.numPointLightShadows),y.push(w.numSpotLightShadows),y.push(w.numSpotLightShadowsWithMaps),y.push(w.numLightProbes),y.push(w.shadowMapType),y.push(w.toneMapping),y.push(w.numClippingPlanes),y.push(w.numClipIntersection),y.push(w.depthPacking)}function E(y,w){a.disableAll(),w.supportsVertexTextures&&a.enable(0),w.instancing&&a.enable(1),w.instancingColor&&a.enable(2),w.instancingMorph&&a.enable(3),w.matcap&&a.enable(4),w.envMap&&a.enable(5),w.normalMapObjectSpace&&a.enable(6),w.normalMapTangentSpace&&a.enable(7),w.clearcoat&&a.enable(8),w.iridescence&&a.enable(9),w.alphaTest&&a.enable(10),w.vertexColors&&a.enable(11),w.vertexAlphas&&a.enable(12),w.vertexUv1s&&a.enable(13),w.vertexUv2s&&a.enable(14),w.vertexUv3s&&a.enable(15),w.vertexTangents&&a.enable(16),w.anisotropy&&a.enable(17),w.alphaHash&&a.enable(18),w.batching&&a.enable(19),w.dispersion&&a.enable(20),w.batchingColor&&a.enable(21),y.push(a.mask),a.disableAll(),w.fog&&a.enable(0),w.useFog&&a.enable(1),w.flatShading&&a.enable(2),w.logarithmicDepthBuffer&&a.enable(3),w.reverseDepthBuffer&&a.enable(4),w.skinning&&a.enable(5),w.morphTargets&&a.enable(6),w.morphNormals&&a.enable(7),w.morphColors&&a.enable(8),w.premultipliedAlpha&&a.enable(9),w.shadowMapEnabled&&a.enable(10),w.doubleSided&&a.enable(11),w.flipSided&&a.enable(12),w.useDepthPacking&&a.enable(13),w.dithering&&a.enable(14),w.transmission&&a.enable(15),w.sheen&&a.enable(16),w.opaque&&a.enable(17),w.pointsUvs&&a.enable(18),w.decodeVideoTexture&&a.enable(19),w.alphaToCoverage&&a.enable(20),y.push(a.mask)}function b(y){const w=S[y.type];let $;if(w){const O=Mi[w];$=h2.clone(O.uniforms)}else $=y.uniforms;return $}function R(y,w){let $;for(let O=0,j=c.length;O<j;O++){const K=c[O];if(K.cacheKey===w){$=K,++$.usedTimes;break}}return $===void 0&&($=new C3(t,w,y,s),c.push($)),$}function C(y){if(--y.usedTimes===0){const w=c.indexOf(y);c[w]=c[c.length-1],c.pop(),y.destroy()}}function P(y){l.remove(y)}function Q(){l.dispose()}return{getParameters:h,getProgramCacheKey:_,getUniforms:b,acquireProgram:R,releaseProgram:C,releaseShaderCache:P,programs:c,dispose:Q}}function L3(){let t=new WeakMap;function e(o){return t.has(o)}function n(o){let a=t.get(o);return a===void 0&&(a={},t.set(o,a)),a}function i(o){t.delete(o)}function r(o,a,l){t.get(o)[a]=l}function s(){t=new WeakMap}return{has:e,get:n,remove:i,update:r,dispose:s}}function D3(t,e){return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.material.id!==e.material.id?t.material.id-e.material.id:t.z!==e.z?t.z-e.z:t.id-e.id}function v_(t,e){return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.z!==e.z?e.z-t.z:t.id-e.id}function __(){const t=[];let e=0;const n=[],i=[],r=[];function s(){e=0,n.length=0,i.length=0,r.length=0}function o(f,d,p,g,S,m){let h=t[e];return h===void 0?(h={id:f.id,object:f,geometry:d,material:p,groupOrder:g,renderOrder:f.renderOrder,z:S,group:m},t[e]=h):(h.id=f.id,h.object=f,h.geometry=d,h.material=p,h.groupOrder=g,h.renderOrder=f.renderOrder,h.z=S,h.group=m),e++,h}function a(f,d,p,g,S,m){const h=o(f,d,p,g,S,m);p.transmission>0?i.push(h):p.transparent===!0?r.push(h):n.push(h)}function l(f,d,p,g,S,m){const h=o(f,d,p,g,S,m);p.transmission>0?i.unshift(h):p.transparent===!0?r.unshift(h):n.unshift(h)}function u(f,d){n.length>1&&n.sort(f||D3),i.length>1&&i.sort(d||v_),r.length>1&&r.sort(d||v_)}function c(){for(let f=e,d=t.length;f<d;f++){const p=t[f];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:n,transmissive:i,transparent:r,init:s,push:a,unshift:l,finish:c,sort:u}}function I3(){let t=new WeakMap;function e(i,r){const s=t.get(i);let o;return s===void 0?(o=new __,t.set(i,[o])):r>=s.length?(o=new __,s.push(o)):o=s[r],o}function n(){t=new WeakMap}return{get:e,dispose:n}}function N3(){const t={};return{get:function(e){if(t[e.id]!==void 0)return t[e.id];let n;switch(e.type){case"DirectionalLight":n={direction:new L,color:new nt};break;case"SpotLight":n={position:new L,direction:new L,color:new nt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new L,color:new nt,distance:0,decay:0};break;case"HemisphereLight":n={direction:new L,skyColor:new nt,groundColor:new nt};break;case"RectAreaLight":n={color:new nt,position:new L,halfWidth:new L,halfHeight:new L};break}return t[e.id]=n,n}}}function U3(){const t={};return{get:function(e){if(t[e.id]!==void 0)return t[e.id];let n;switch(e.type){case"DirectionalLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ge};break;case"SpotLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ge};break;case"PointLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ge,shadowCameraNear:1,shadowCameraFar:1e3};break}return t[e.id]=n,n}}}let k3=0;function F3(t,e){return(e.castShadow?2:0)-(t.castShadow?2:0)+(e.map?1:0)-(t.map?1:0)}function O3(t){const e=new N3,n=U3(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let u=0;u<9;u++)i.probe.push(new L);const r=new L,s=new yt,o=new yt;function a(u){let c=0,f=0,d=0;for(let Q=0;Q<9;Q++)i.probe[Q].set(0,0,0);let p=0,g=0,S=0,m=0,h=0,_=0,v=0,E=0,b=0,R=0,C=0;u.sort(F3);for(let Q=0,y=u.length;Q<y;Q++){const w=u[Q],$=w.color,O=w.intensity,j=w.distance,K=w.shadow&&w.shadow.map?w.shadow.map.texture:null;if(w.isAmbientLight)c+=$.r*O,f+=$.g*O,d+=$.b*O;else if(w.isLightProbe){for(let z=0;z<9;z++)i.probe[z].addScaledVector(w.sh.coefficients[z],O);C++}else if(w.isDirectionalLight){const z=e.get(w);if(z.color.copy(w.color).multiplyScalar(w.intensity),w.castShadow){const ne=w.shadow,D=n.get(w);D.shadowIntensity=ne.intensity,D.shadowBias=ne.bias,D.shadowNormalBias=ne.normalBias,D.shadowRadius=ne.radius,D.shadowMapSize=ne.mapSize,i.directionalShadow[p]=D,i.directionalShadowMap[p]=K,i.directionalShadowMatrix[p]=w.shadow.matrix,_++}i.directional[p]=z,p++}else if(w.isSpotLight){const z=e.get(w);z.position.setFromMatrixPosition(w.matrixWorld),z.color.copy($).multiplyScalar(O),z.distance=j,z.coneCos=Math.cos(w.angle),z.penumbraCos=Math.cos(w.angle*(1-w.penumbra)),z.decay=w.decay,i.spot[S]=z;const ne=w.shadow;if(w.map&&(i.spotLightMap[b]=w.map,b++,ne.updateMatrices(w),w.castShadow&&R++),i.spotLightMatrix[S]=ne.matrix,w.castShadow){const D=n.get(w);D.shadowIntensity=ne.intensity,D.shadowBias=ne.bias,D.shadowNormalBias=ne.normalBias,D.shadowRadius=ne.radius,D.shadowMapSize=ne.mapSize,i.spotShadow[S]=D,i.spotShadowMap[S]=K,E++}S++}else if(w.isRectAreaLight){const z=e.get(w);z.color.copy($).multiplyScalar(O),z.halfWidth.set(w.width*.5,0,0),z.halfHeight.set(0,w.height*.5,0),i.rectArea[m]=z,m++}else if(w.isPointLight){const z=e.get(w);if(z.color.copy(w.color).multiplyScalar(w.intensity),z.distance=w.distance,z.decay=w.decay,w.castShadow){const ne=w.shadow,D=n.get(w);D.shadowIntensity=ne.intensity,D.shadowBias=ne.bias,D.shadowNormalBias=ne.normalBias,D.shadowRadius=ne.radius,D.shadowMapSize=ne.mapSize,D.shadowCameraNear=ne.camera.near,D.shadowCameraFar=ne.camera.far,i.pointShadow[g]=D,i.pointShadowMap[g]=K,i.pointShadowMatrix[g]=w.shadow.matrix,v++}i.point[g]=z,g++}else if(w.isHemisphereLight){const z=e.get(w);z.skyColor.copy(w.color).multiplyScalar(O),z.groundColor.copy(w.groundColor).multiplyScalar(O),i.hemi[h]=z,h++}}m>0&&(t.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=pe.LTC_FLOAT_1,i.rectAreaLTC2=pe.LTC_FLOAT_2):(i.rectAreaLTC1=pe.LTC_HALF_1,i.rectAreaLTC2=pe.LTC_HALF_2)),i.ambient[0]=c,i.ambient[1]=f,i.ambient[2]=d;const P=i.hash;(P.directionalLength!==p||P.pointLength!==g||P.spotLength!==S||P.rectAreaLength!==m||P.hemiLength!==h||P.numDirectionalShadows!==_||P.numPointShadows!==v||P.numSpotShadows!==E||P.numSpotMaps!==b||P.numLightProbes!==C)&&(i.directional.length=p,i.spot.length=S,i.rectArea.length=m,i.point.length=g,i.hemi.length=h,i.directionalShadow.length=_,i.directionalShadowMap.length=_,i.pointShadow.length=v,i.pointShadowMap.length=v,i.spotShadow.length=E,i.spotShadowMap.length=E,i.directionalShadowMatrix.length=_,i.pointShadowMatrix.length=v,i.spotLightMatrix.length=E+b-R,i.spotLightMap.length=b,i.numSpotLightShadowsWithMaps=R,i.numLightProbes=C,P.directionalLength=p,P.pointLength=g,P.spotLength=S,P.rectAreaLength=m,P.hemiLength=h,P.numDirectionalShadows=_,P.numPointShadows=v,P.numSpotShadows=E,P.numSpotMaps=b,P.numLightProbes=C,i.version=k3++)}function l(u,c){let f=0,d=0,p=0,g=0,S=0;const m=c.matrixWorldInverse;for(let h=0,_=u.length;h<_;h++){const v=u[h];if(v.isDirectionalLight){const E=i.directional[f];E.direction.setFromMatrixPosition(v.matrixWorld),r.setFromMatrixPosition(v.target.matrixWorld),E.direction.sub(r),E.direction.transformDirection(m),f++}else if(v.isSpotLight){const E=i.spot[p];E.position.setFromMatrixPosition(v.matrixWorld),E.position.applyMatrix4(m),E.direction.setFromMatrixPosition(v.matrixWorld),r.setFromMatrixPosition(v.target.matrixWorld),E.direction.sub(r),E.direction.transformDirection(m),p++}else if(v.isRectAreaLight){const E=i.rectArea[g];E.position.setFromMatrixPosition(v.matrixWorld),E.position.applyMatrix4(m),o.identity(),s.copy(v.matrixWorld),s.premultiply(m),o.extractRotation(s),E.halfWidth.set(v.width*.5,0,0),E.halfHeight.set(0,v.height*.5,0),E.halfWidth.applyMatrix4(o),E.halfHeight.applyMatrix4(o),g++}else if(v.isPointLight){const E=i.point[d];E.position.setFromMatrixPosition(v.matrixWorld),E.position.applyMatrix4(m),d++}else if(v.isHemisphereLight){const E=i.hemi[S];E.direction.setFromMatrixPosition(v.matrixWorld),E.direction.transformDirection(m),S++}}}return{setup:a,setupView:l,state:i}}function x_(t){const e=new O3(t),n=[],i=[];function r(c){u.camera=c,n.length=0,i.length=0}function s(c){n.push(c)}function o(c){i.push(c)}function a(){e.setup(n)}function l(c){e.setupView(n,c)}const u={lightsArray:n,shadowsArray:i,camera:null,lights:e,transmissionRenderTarget:{}};return{init:r,state:u,setupLights:a,setupLightsView:l,pushLight:s,pushShadow:o}}function B3(t){let e=new WeakMap;function n(r,s=0){const o=e.get(r);let a;return o===void 0?(a=new x_(t),e.set(r,[a])):s>=o.length?(a=new x_(t),o.push(a)):a=o[s],a}function i(){e=new WeakMap}return{get:n,dispose:i}}class z3 extends vl{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=NA,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class H3 extends vl{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const V3=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,G3=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function W3(t,e,n){let i=new ag;const r=new ge,s=new ge,o=new ut,a=new z3({depthPacking:UA}),l=new H3,u={},c=n.maxTextureSize,f={[Ur]:cn,[cn]:Ur,[zi]:zi},d=new kr({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ge},radius:{value:4}},vertexShader:V3,fragmentShader:G3}),p=d.clone();p.defines.HORIZONTAL_PASS=1;const g=new Hr;g.setAttribute("position",new Ci(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const S=new Je(g,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=t1;let h=this.type;this.render=function(R,C,P){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||R.length===0)return;const Q=t.getRenderTarget(),y=t.getActiveCubeFace(),w=t.getActiveMipmapLevel(),$=t.state;$.setBlending(Lr),$.buffers.color.setClear(1,1,1,1),$.buffers.depth.setTest(!0),$.setScissorTest(!1);const O=h!==Fi&&this.type===Fi,j=h===Fi&&this.type!==Fi;for(let K=0,z=R.length;K<z;K++){const ne=R[K],D=ne.shadow;if(D===void 0){console.warn("THREE.WebGLShadowMap:",ne,"has no shadow.");continue}if(D.autoUpdate===!1&&D.needsUpdate===!1)continue;r.copy(D.mapSize);const J=D.getFrameExtents();if(r.multiply(J),s.copy(D.mapSize),(r.x>c||r.y>c)&&(r.x>c&&(s.x=Math.floor(c/J.x),r.x=s.x*J.x,D.mapSize.x=s.x),r.y>c&&(s.y=Math.floor(c/J.y),r.y=s.y*J.y,D.mapSize.y=s.y)),D.map===null||O===!0||j===!0){const re=this.type!==Fi?{minFilter:Jn,magFilter:Jn}:{};D.map!==null&&D.map.dispose(),D.map=new xs(r.x,r.y,re),D.map.texture.name=ne.name+".shadowMap",D.camera.updateProjectionMatrix()}t.setRenderTarget(D.map),t.clear();const ee=D.getViewportCount();for(let re=0;re<ee;re++){const Pe=D.getViewport(re);o.set(s.x*Pe.x,s.y*Pe.y,s.x*Pe.z,s.y*Pe.w),$.viewport(o),D.updateMatrices(ne,re),i=D.getFrustum(),E(C,P,D.camera,ne,this.type)}D.isPointLightShadow!==!0&&this.type===Fi&&_(D,P),D.needsUpdate=!1}h=this.type,m.needsUpdate=!1,t.setRenderTarget(Q,y,w)};function _(R,C){const P=e.update(S);d.defines.VSM_SAMPLES!==R.blurSamples&&(d.defines.VSM_SAMPLES=R.blurSamples,p.defines.VSM_SAMPLES=R.blurSamples,d.needsUpdate=!0,p.needsUpdate=!0),R.mapPass===null&&(R.mapPass=new xs(r.x,r.y)),d.uniforms.shadow_pass.value=R.map.texture,d.uniforms.resolution.value=R.mapSize,d.uniforms.radius.value=R.radius,t.setRenderTarget(R.mapPass),t.clear(),t.renderBufferDirect(C,null,P,d,S,null),p.uniforms.shadow_pass.value=R.mapPass.texture,p.uniforms.resolution.value=R.mapSize,p.uniforms.radius.value=R.radius,t.setRenderTarget(R.map),t.clear(),t.renderBufferDirect(C,null,P,p,S,null)}function v(R,C,P,Q){let y=null;const w=P.isPointLight===!0?R.customDistanceMaterial:R.customDepthMaterial;if(w!==void 0)y=w;else if(y=P.isPointLight===!0?l:a,t.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0){const $=y.uuid,O=C.uuid;let j=u[$];j===void 0&&(j={},u[$]=j);let K=j[O];K===void 0&&(K=y.clone(),j[O]=K,C.addEventListener("dispose",b)),y=K}if(y.visible=C.visible,y.wireframe=C.wireframe,Q===Fi?y.side=C.shadowSide!==null?C.shadowSide:C.side:y.side=C.shadowSide!==null?C.shadowSide:f[C.side],y.alphaMap=C.alphaMap,y.alphaTest=C.alphaTest,y.map=C.map,y.clipShadows=C.clipShadows,y.clippingPlanes=C.clippingPlanes,y.clipIntersection=C.clipIntersection,y.displacementMap=C.displacementMap,y.displacementScale=C.displacementScale,y.displacementBias=C.displacementBias,y.wireframeLinewidth=C.wireframeLinewidth,y.linewidth=C.linewidth,P.isPointLight===!0&&y.isMeshDistanceMaterial===!0){const $=t.properties.get(y);$.light=P}return y}function E(R,C,P,Q,y){if(R.visible===!1)return;if(R.layers.test(C.layers)&&(R.isMesh||R.isLine||R.isPoints)&&(R.castShadow||R.receiveShadow&&y===Fi)&&(!R.frustumCulled||i.intersectsObject(R))){R.modelViewMatrix.multiplyMatrices(P.matrixWorldInverse,R.matrixWorld);const O=e.update(R),j=R.material;if(Array.isArray(j)){const K=O.groups;for(let z=0,ne=K.length;z<ne;z++){const D=K[z],J=j[D.materialIndex];if(J&&J.visible){const ee=v(R,J,Q,y);R.onBeforeShadow(t,R,C,P,O,ee,D),t.renderBufferDirect(P,null,O,ee,R,D),R.onAfterShadow(t,R,C,P,O,ee,D)}}}else if(j.visible){const K=v(R,j,Q,y);R.onBeforeShadow(t,R,C,P,O,K,null),t.renderBufferDirect(P,null,O,K,R,null),R.onAfterShadow(t,R,C,P,O,K,null)}}const $=R.children;for(let O=0,j=$.length;O<j;O++)E($[O],C,P,Q,y)}function b(R){R.target.removeEventListener("dispose",b);for(const P in u){const Q=u[P],y=R.target.uuid;y in Q&&(Q[y].dispose(),delete Q[y])}}}const $3={[Gh]:Wh,[$h]:Yh,[Xh]:qh,[Mo]:jh,[Wh]:Gh,[Yh]:$h,[qh]:Xh,[jh]:Mo};function X3(t){function e(){let N=!1;const Me=new ut;let Y=null;const ie=new ut(0,0,0,0);return{setMask:function(ye){Y!==ye&&!N&&(t.colorMask(ye,ye,ye,ye),Y=ye)},setLocked:function(ye){N=ye},setClear:function(ye,Ee,et,Lt,gn){gn===!0&&(ye*=Lt,Ee*=Lt,et*=Lt),Me.set(ye,Ee,et,Lt),ie.equals(Me)===!1&&(t.clearColor(ye,Ee,et,Lt),ie.copy(Me))},reset:function(){N=!1,Y=null,ie.set(-1,0,0,0)}}}function n(){let N=!1,Me=!1,Y=null,ie=null,ye=null;return{setReversed:function(Ee){Me=Ee},setTest:function(Ee){Ee?te(t.DEPTH_TEST):se(t.DEPTH_TEST)},setMask:function(Ee){Y!==Ee&&!N&&(t.depthMask(Ee),Y=Ee)},setFunc:function(Ee){if(Me&&(Ee=$3[Ee]),ie!==Ee){switch(Ee){case Gh:t.depthFunc(t.NEVER);break;case Wh:t.depthFunc(t.ALWAYS);break;case $h:t.depthFunc(t.LESS);break;case Mo:t.depthFunc(t.LEQUAL);break;case Xh:t.depthFunc(t.EQUAL);break;case jh:t.depthFunc(t.GEQUAL);break;case Yh:t.depthFunc(t.GREATER);break;case qh:t.depthFunc(t.NOTEQUAL);break;default:t.depthFunc(t.LEQUAL)}ie=Ee}},setLocked:function(Ee){N=Ee},setClear:function(Ee){ye!==Ee&&(t.clearDepth(Ee),ye=Ee)},reset:function(){N=!1,Y=null,ie=null,ye=null}}}function i(){let N=!1,Me=null,Y=null,ie=null,ye=null,Ee=null,et=null,Lt=null,gn=null;return{setTest:function(it){N||(it?te(t.STENCIL_TEST):se(t.STENCIL_TEST))},setMask:function(it){Me!==it&&!N&&(t.stencilMask(it),Me=it)},setFunc:function(it,vn,bi){(Y!==it||ie!==vn||ye!==bi)&&(t.stencilFunc(it,vn,bi),Y=it,ie=vn,ye=bi)},setOp:function(it,vn,bi){(Ee!==it||et!==vn||Lt!==bi)&&(t.stencilOp(it,vn,bi),Ee=it,et=vn,Lt=bi)},setLocked:function(it){N=it},setClear:function(it){gn!==it&&(t.clearStencil(it),gn=it)},reset:function(){N=!1,Me=null,Y=null,ie=null,ye=null,Ee=null,et=null,Lt=null,gn=null}}}const r=new e,s=new n,o=new i,a=new WeakMap,l=new WeakMap;let u={},c={},f=new WeakMap,d=[],p=null,g=!1,S=null,m=null,h=null,_=null,v=null,E=null,b=null,R=new nt(0,0,0),C=0,P=!1,Q=null,y=null,w=null,$=null,O=null;const j=t.getParameter(t.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let K=!1,z=0;const ne=t.getParameter(t.VERSION);ne.indexOf("WebGL")!==-1?(z=parseFloat(/^WebGL (\d)/.exec(ne)[1]),K=z>=1):ne.indexOf("OpenGL ES")!==-1&&(z=parseFloat(/^OpenGL ES (\d)/.exec(ne)[1]),K=z>=2);let D=null,J={};const ee=t.getParameter(t.SCISSOR_BOX),re=t.getParameter(t.VIEWPORT),Pe=new ut().fromArray(ee),Ge=new ut().fromArray(re);function U(N,Me,Y,ie){const ye=new Uint8Array(4),Ee=t.createTexture();t.bindTexture(N,Ee),t.texParameteri(N,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(N,t.TEXTURE_MAG_FILTER,t.NEAREST);for(let et=0;et<Y;et++)N===t.TEXTURE_3D||N===t.TEXTURE_2D_ARRAY?t.texImage3D(Me,0,t.RGBA,1,1,ie,0,t.RGBA,t.UNSIGNED_BYTE,ye):t.texImage2D(Me+et,0,t.RGBA,1,1,0,t.RGBA,t.UNSIGNED_BYTE,ye);return Ee}const Z={};Z[t.TEXTURE_2D]=U(t.TEXTURE_2D,t.TEXTURE_2D,1),Z[t.TEXTURE_CUBE_MAP]=U(t.TEXTURE_CUBE_MAP,t.TEXTURE_CUBE_MAP_POSITIVE_X,6),Z[t.TEXTURE_2D_ARRAY]=U(t.TEXTURE_2D_ARRAY,t.TEXTURE_2D_ARRAY,1,1),Z[t.TEXTURE_3D]=U(t.TEXTURE_3D,t.TEXTURE_3D,1,1),r.setClear(0,0,0,1),s.setClear(1),o.setClear(0),te(t.DEPTH_TEST),s.setFunc(Mo),le(!1),oe(Pv),te(t.CULL_FACE),A(Lr);function te(N){u[N]!==!0&&(t.enable(N),u[N]=!0)}function se(N){u[N]!==!1&&(t.disable(N),u[N]=!1)}function _e(N,Me){return c[N]!==Me?(t.bindFramebuffer(N,Me),c[N]=Me,N===t.DRAW_FRAMEBUFFER&&(c[t.FRAMEBUFFER]=Me),N===t.FRAMEBUFFER&&(c[t.DRAW_FRAMEBUFFER]=Me),!0):!1}function Ce(N,Me){let Y=d,ie=!1;if(N){Y=f.get(Me),Y===void 0&&(Y=[],f.set(Me,Y));const ye=N.textures;if(Y.length!==ye.length||Y[0]!==t.COLOR_ATTACHMENT0){for(let Ee=0,et=ye.length;Ee<et;Ee++)Y[Ee]=t.COLOR_ATTACHMENT0+Ee;Y.length=ye.length,ie=!0}}else Y[0]!==t.BACK&&(Y[0]=t.BACK,ie=!0);ie&&t.drawBuffers(Y)}function Fe(N){return p!==N?(t.useProgram(N),p=N,!0):!1}const Xe={[is]:t.FUNC_ADD,[lA]:t.FUNC_SUBTRACT,[uA]:t.FUNC_REVERSE_SUBTRACT};Xe[cA]=t.MIN,Xe[fA]=t.MAX;const q={[dA]:t.ZERO,[hA]:t.ONE,[pA]:t.SRC_COLOR,[Hh]:t.SRC_ALPHA,[yA]:t.SRC_ALPHA_SATURATE,[_A]:t.DST_COLOR,[gA]:t.DST_ALPHA,[mA]:t.ONE_MINUS_SRC_COLOR,[Vh]:t.ONE_MINUS_SRC_ALPHA,[xA]:t.ONE_MINUS_DST_COLOR,[vA]:t.ONE_MINUS_DST_ALPHA,[SA]:t.CONSTANT_COLOR,[MA]:t.ONE_MINUS_CONSTANT_COLOR,[EA]:t.CONSTANT_ALPHA,[wA]:t.ONE_MINUS_CONSTANT_ALPHA};function A(N,Me,Y,ie,ye,Ee,et,Lt,gn,it){if(N===Lr){g===!0&&(se(t.BLEND),g=!1);return}if(g===!1&&(te(t.BLEND),g=!0),N!==aA){if(N!==S||it!==P){if((m!==is||v!==is)&&(t.blendEquation(t.FUNC_ADD),m=is,v=is),it)switch(N){case co:t.blendFuncSeparate(t.ONE,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case nl:t.blendFunc(t.ONE,t.ONE);break;case bv:t.blendFuncSeparate(t.ZERO,t.ONE_MINUS_SRC_COLOR,t.ZERO,t.ONE);break;case Lv:t.blendFuncSeparate(t.ZERO,t.SRC_COLOR,t.ZERO,t.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}else switch(N){case co:t.blendFuncSeparate(t.SRC_ALPHA,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case nl:t.blendFunc(t.SRC_ALPHA,t.ONE);break;case bv:t.blendFuncSeparate(t.ZERO,t.ONE_MINUS_SRC_COLOR,t.ZERO,t.ONE);break;case Lv:t.blendFunc(t.ZERO,t.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}h=null,_=null,E=null,b=null,R.set(0,0,0),C=0,S=N,P=it}return}ye=ye||Me,Ee=Ee||Y,et=et||ie,(Me!==m||ye!==v)&&(t.blendEquationSeparate(Xe[Me],Xe[ye]),m=Me,v=ye),(Y!==h||ie!==_||Ee!==E||et!==b)&&(t.blendFuncSeparate(q[Y],q[ie],q[Ee],q[et]),h=Y,_=ie,E=Ee,b=et),(Lt.equals(R)===!1||gn!==C)&&(t.blendColor(Lt.r,Lt.g,Lt.b,gn),R.copy(Lt),C=gn),S=N,P=!1}function ce(N,Me){N.side===zi?se(t.CULL_FACE):te(t.CULL_FACE);let Y=N.side===cn;Me&&(Y=!Y),le(Y),N.blending===co&&N.transparent===!1?A(Lr):A(N.blending,N.blendEquation,N.blendSrc,N.blendDst,N.blendEquationAlpha,N.blendSrcAlpha,N.blendDstAlpha,N.blendColor,N.blendAlpha,N.premultipliedAlpha),s.setFunc(N.depthFunc),s.setTest(N.depthTest),s.setMask(N.depthWrite),r.setMask(N.colorWrite);const ie=N.stencilWrite;o.setTest(ie),ie&&(o.setMask(N.stencilWriteMask),o.setFunc(N.stencilFunc,N.stencilRef,N.stencilFuncMask),o.setOp(N.stencilFail,N.stencilZFail,N.stencilZPass)),Ie(N.polygonOffset,N.polygonOffsetFactor,N.polygonOffsetUnits),N.alphaToCoverage===!0?te(t.SAMPLE_ALPHA_TO_COVERAGE):se(t.SAMPLE_ALPHA_TO_COVERAGE)}function le(N){Q!==N&&(N?t.frontFace(t.CW):t.frontFace(t.CCW),Q=N)}function oe(N){N!==sA?(te(t.CULL_FACE),N!==y&&(N===Pv?t.cullFace(t.BACK):N===oA?t.cullFace(t.FRONT):t.cullFace(t.FRONT_AND_BACK))):se(t.CULL_FACE),y=N}function de(N){N!==w&&(K&&t.lineWidth(N),w=N)}function Ie(N,Me,Y){N?(te(t.POLYGON_OFFSET_FILL),($!==Me||O!==Y)&&(t.polygonOffset(Me,Y),$=Me,O=Y)):se(t.POLYGON_OFFSET_FILL)}function xe(N){N?te(t.SCISSOR_TEST):se(t.SCISSOR_TEST)}function M(N){N===void 0&&(N=t.TEXTURE0+j-1),D!==N&&(t.activeTexture(N),D=N)}function x(N,Me,Y){Y===void 0&&(D===null?Y=t.TEXTURE0+j-1:Y=D);let ie=J[Y];ie===void 0&&(ie={type:void 0,texture:void 0},J[Y]=ie),(ie.type!==N||ie.texture!==Me)&&(D!==Y&&(t.activeTexture(Y),D=Y),t.bindTexture(N,Me||Z[N]),ie.type=N,ie.texture=Me)}function I(){const N=J[D];N!==void 0&&N.type!==void 0&&(t.bindTexture(N.type,null),N.type=void 0,N.texture=void 0)}function V(){try{t.compressedTexImage2D.apply(t,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function G(){try{t.compressedTexImage3D.apply(t,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function W(){try{t.texSubImage2D.apply(t,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Ae(){try{t.texSubImage3D.apply(t,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function he(){try{t.compressedTexSubImage2D.apply(t,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function me(){try{t.compressedTexSubImage3D.apply(t,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function ze(){try{t.texStorage2D.apply(t,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function ue(){try{t.texStorage3D.apply(t,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function we(){try{t.texImage2D.apply(t,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function He(){try{t.texImage3D.apply(t,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Ve(N){Pe.equals(N)===!1&&(t.scissor(N.x,N.y,N.z,N.w),Pe.copy(N))}function Re(N){Ge.equals(N)===!1&&(t.viewport(N.x,N.y,N.z,N.w),Ge.copy(N))}function Qe(N,Me){let Y=l.get(Me);Y===void 0&&(Y=new WeakMap,l.set(Me,Y));let ie=Y.get(N);ie===void 0&&(ie=t.getUniformBlockIndex(Me,N.name),Y.set(N,ie))}function We(N,Me){const ie=l.get(Me).get(N);a.get(Me)!==ie&&(t.uniformBlockBinding(Me,ie,N.__bindingPointIndex),a.set(Me,ie))}function ct(){t.disable(t.BLEND),t.disable(t.CULL_FACE),t.disable(t.DEPTH_TEST),t.disable(t.POLYGON_OFFSET_FILL),t.disable(t.SCISSOR_TEST),t.disable(t.STENCIL_TEST),t.disable(t.SAMPLE_ALPHA_TO_COVERAGE),t.blendEquation(t.FUNC_ADD),t.blendFunc(t.ONE,t.ZERO),t.blendFuncSeparate(t.ONE,t.ZERO,t.ONE,t.ZERO),t.blendColor(0,0,0,0),t.colorMask(!0,!0,!0,!0),t.clearColor(0,0,0,0),t.depthMask(!0),t.depthFunc(t.LESS),t.clearDepth(1),t.stencilMask(4294967295),t.stencilFunc(t.ALWAYS,0,4294967295),t.stencilOp(t.KEEP,t.KEEP,t.KEEP),t.clearStencil(0),t.cullFace(t.BACK),t.frontFace(t.CCW),t.polygonOffset(0,0),t.activeTexture(t.TEXTURE0),t.bindFramebuffer(t.FRAMEBUFFER,null),t.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),t.bindFramebuffer(t.READ_FRAMEBUFFER,null),t.useProgram(null),t.lineWidth(1),t.scissor(0,0,t.canvas.width,t.canvas.height),t.viewport(0,0,t.canvas.width,t.canvas.height),u={},D=null,J={},c={},f=new WeakMap,d=[],p=null,g=!1,S=null,m=null,h=null,_=null,v=null,E=null,b=null,R=new nt(0,0,0),C=0,P=!1,Q=null,y=null,w=null,$=null,O=null,Pe.set(0,0,t.canvas.width,t.canvas.height),Ge.set(0,0,t.canvas.width,t.canvas.height),r.reset(),s.reset(),o.reset()}return{buffers:{color:r,depth:s,stencil:o},enable:te,disable:se,bindFramebuffer:_e,drawBuffers:Ce,useProgram:Fe,setBlending:A,setMaterial:ce,setFlipSided:le,setCullFace:oe,setLineWidth:de,setPolygonOffset:Ie,setScissorTest:xe,activeTexture:M,bindTexture:x,unbindTexture:I,compressedTexImage2D:V,compressedTexImage3D:G,texImage2D:we,texImage3D:He,updateUBOMapping:Qe,uniformBlockBinding:We,texStorage2D:ze,texStorage3D:ue,texSubImage2D:W,texSubImage3D:Ae,compressedTexSubImage2D:he,compressedTexSubImage3D:me,scissor:Ve,viewport:Re,reset:ct}}function y_(t,e,n,i){const r=j3(i);switch(n){case u1:return t*e;case f1:return t*e;case d1:return t*e*2;case h1:return t*e/r.components*r.byteLength;case ng:return t*e/r.components*r.byteLength;case p1:return t*e*2/r.components*r.byteLength;case ig:return t*e*2/r.components*r.byteLength;case c1:return t*e*3/r.components*r.byteLength;case di:return t*e*4/r.components*r.byteLength;case rg:return t*e*4/r.components*r.byteLength;case Ou:case Bu:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*8;case zu:case Hu:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case ep:case np:return Math.max(t,16)*Math.max(e,8)/4;case Qh:case tp:return Math.max(t,8)*Math.max(e,8)/2;case ip:case rp:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*8;case sp:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case op:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case ap:return Math.floor((t+4)/5)*Math.floor((e+3)/4)*16;case lp:return Math.floor((t+4)/5)*Math.floor((e+4)/5)*16;case up:return Math.floor((t+5)/6)*Math.floor((e+4)/5)*16;case cp:return Math.floor((t+5)/6)*Math.floor((e+5)/6)*16;case fp:return Math.floor((t+7)/8)*Math.floor((e+4)/5)*16;case dp:return Math.floor((t+7)/8)*Math.floor((e+5)/6)*16;case hp:return Math.floor((t+7)/8)*Math.floor((e+7)/8)*16;case pp:return Math.floor((t+9)/10)*Math.floor((e+4)/5)*16;case mp:return Math.floor((t+9)/10)*Math.floor((e+5)/6)*16;case gp:return Math.floor((t+9)/10)*Math.floor((e+7)/8)*16;case vp:return Math.floor((t+9)/10)*Math.floor((e+9)/10)*16;case _p:return Math.floor((t+11)/12)*Math.floor((e+9)/10)*16;case xp:return Math.floor((t+11)/12)*Math.floor((e+11)/12)*16;case Vu:case yp:case Sp:return Math.ceil(t/4)*Math.ceil(e/4)*16;case m1:case Mp:return Math.ceil(t/4)*Math.ceil(e/4)*8;case Ep:case wp:return Math.ceil(t/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${n} format.`)}function j3(t){switch(t){case er:case o1:return{byteLength:1,components:1};case il:case a1:case pl:return{byteLength:2,components:1};case eg:case tg:return{byteLength:2,components:4};case _s:case Qm:case Gi:return{byteLength:4,components:1};case l1:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${t}.`)}function Y3(t,e,n,i,r,s,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),u=new ge,c=new WeakMap;let f;const d=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(M,x){return p?new OffscreenCanvas(M,x):Ic("canvas")}function S(M,x,I){let V=1;const G=xe(M);if((G.width>I||G.height>I)&&(V=I/Math.max(G.width,G.height)),V<1)if(typeof HTMLImageElement<"u"&&M instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&M instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&M instanceof ImageBitmap||typeof VideoFrame<"u"&&M instanceof VideoFrame){const W=Math.floor(V*G.width),Ae=Math.floor(V*G.height);f===void 0&&(f=g(W,Ae));const he=x?g(W,Ae):f;return he.width=W,he.height=Ae,he.getContext("2d").drawImage(M,0,0,W,Ae),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+G.width+"x"+G.height+") to ("+W+"x"+Ae+")."),he}else return"data"in M&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+G.width+"x"+G.height+")."),M;return M}function m(M){return M.generateMipmaps&&M.minFilter!==Jn&&M.minFilter!==ci}function h(M){t.generateMipmap(M)}function _(M,x,I,V,G=!1){if(M!==null){if(t[M]!==void 0)return t[M];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+M+"'")}let W=x;if(x===t.RED&&(I===t.FLOAT&&(W=t.R32F),I===t.HALF_FLOAT&&(W=t.R16F),I===t.UNSIGNED_BYTE&&(W=t.R8)),x===t.RED_INTEGER&&(I===t.UNSIGNED_BYTE&&(W=t.R8UI),I===t.UNSIGNED_SHORT&&(W=t.R16UI),I===t.UNSIGNED_INT&&(W=t.R32UI),I===t.BYTE&&(W=t.R8I),I===t.SHORT&&(W=t.R16I),I===t.INT&&(W=t.R32I)),x===t.RG&&(I===t.FLOAT&&(W=t.RG32F),I===t.HALF_FLOAT&&(W=t.RG16F),I===t.UNSIGNED_BYTE&&(W=t.RG8)),x===t.RG_INTEGER&&(I===t.UNSIGNED_BYTE&&(W=t.RG8UI),I===t.UNSIGNED_SHORT&&(W=t.RG16UI),I===t.UNSIGNED_INT&&(W=t.RG32UI),I===t.BYTE&&(W=t.RG8I),I===t.SHORT&&(W=t.RG16I),I===t.INT&&(W=t.RG32I)),x===t.RGB_INTEGER&&(I===t.UNSIGNED_BYTE&&(W=t.RGB8UI),I===t.UNSIGNED_SHORT&&(W=t.RGB16UI),I===t.UNSIGNED_INT&&(W=t.RGB32UI),I===t.BYTE&&(W=t.RGB8I),I===t.SHORT&&(W=t.RGB16I),I===t.INT&&(W=t.RGB32I)),x===t.RGBA_INTEGER&&(I===t.UNSIGNED_BYTE&&(W=t.RGBA8UI),I===t.UNSIGNED_SHORT&&(W=t.RGBA16UI),I===t.UNSIGNED_INT&&(W=t.RGBA32UI),I===t.BYTE&&(W=t.RGBA8I),I===t.SHORT&&(W=t.RGBA16I),I===t.INT&&(W=t.RGBA32I)),x===t.RGB&&I===t.UNSIGNED_INT_5_9_9_9_REV&&(W=t.RGB9_E5),x===t.RGBA){const Ae=G?Rc:ot.getTransfer(V);I===t.FLOAT&&(W=t.RGBA32F),I===t.HALF_FLOAT&&(W=t.RGBA16F),I===t.UNSIGNED_BYTE&&(W=Ae===gt?t.SRGB8_ALPHA8:t.RGBA8),I===t.UNSIGNED_SHORT_4_4_4_4&&(W=t.RGBA4),I===t.UNSIGNED_SHORT_5_5_5_1&&(W=t.RGB5_A1)}return(W===t.R16F||W===t.R32F||W===t.RG16F||W===t.RG32F||W===t.RGBA16F||W===t.RGBA32F)&&e.get("EXT_color_buffer_float"),W}function v(M,x){let I;return M?x===null||x===_s||x===To?I=t.DEPTH24_STENCIL8:x===Gi?I=t.DEPTH32F_STENCIL8:x===il&&(I=t.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):x===null||x===_s||x===To?I=t.DEPTH_COMPONENT24:x===Gi?I=t.DEPTH_COMPONENT32F:x===il&&(I=t.DEPTH_COMPONENT16),I}function E(M,x){return m(M)===!0||M.isFramebufferTexture&&M.minFilter!==Jn&&M.minFilter!==ci?Math.log2(Math.max(x.width,x.height))+1:M.mipmaps!==void 0&&M.mipmaps.length>0?M.mipmaps.length:M.isCompressedTexture&&Array.isArray(M.image)?x.mipmaps.length:1}function b(M){const x=M.target;x.removeEventListener("dispose",b),C(x),x.isVideoTexture&&c.delete(x)}function R(M){const x=M.target;x.removeEventListener("dispose",R),Q(x)}function C(M){const x=i.get(M);if(x.__webglInit===void 0)return;const I=M.source,V=d.get(I);if(V){const G=V[x.__cacheKey];G.usedTimes--,G.usedTimes===0&&P(M),Object.keys(V).length===0&&d.delete(I)}i.remove(M)}function P(M){const x=i.get(M);t.deleteTexture(x.__webglTexture);const I=M.source,V=d.get(I);delete V[x.__cacheKey],o.memory.textures--}function Q(M){const x=i.get(M);if(M.depthTexture&&M.depthTexture.dispose(),M.isWebGLCubeRenderTarget)for(let V=0;V<6;V++){if(Array.isArray(x.__webglFramebuffer[V]))for(let G=0;G<x.__webglFramebuffer[V].length;G++)t.deleteFramebuffer(x.__webglFramebuffer[V][G]);else t.deleteFramebuffer(x.__webglFramebuffer[V]);x.__webglDepthbuffer&&t.deleteRenderbuffer(x.__webglDepthbuffer[V])}else{if(Array.isArray(x.__webglFramebuffer))for(let V=0;V<x.__webglFramebuffer.length;V++)t.deleteFramebuffer(x.__webglFramebuffer[V]);else t.deleteFramebuffer(x.__webglFramebuffer);if(x.__webglDepthbuffer&&t.deleteRenderbuffer(x.__webglDepthbuffer),x.__webglMultisampledFramebuffer&&t.deleteFramebuffer(x.__webglMultisampledFramebuffer),x.__webglColorRenderbuffer)for(let V=0;V<x.__webglColorRenderbuffer.length;V++)x.__webglColorRenderbuffer[V]&&t.deleteRenderbuffer(x.__webglColorRenderbuffer[V]);x.__webglDepthRenderbuffer&&t.deleteRenderbuffer(x.__webglDepthRenderbuffer)}const I=M.textures;for(let V=0,G=I.length;V<G;V++){const W=i.get(I[V]);W.__webglTexture&&(t.deleteTexture(W.__webglTexture),o.memory.textures--),i.remove(I[V])}i.remove(M)}let y=0;function w(){y=0}function $(){const M=y;return M>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+M+" texture units while this GPU supports only "+r.maxTextures),y+=1,M}function O(M){const x=[];return x.push(M.wrapS),x.push(M.wrapT),x.push(M.wrapR||0),x.push(M.magFilter),x.push(M.minFilter),x.push(M.anisotropy),x.push(M.internalFormat),x.push(M.format),x.push(M.type),x.push(M.generateMipmaps),x.push(M.premultiplyAlpha),x.push(M.flipY),x.push(M.unpackAlignment),x.push(M.colorSpace),x.join()}function j(M,x){const I=i.get(M);if(M.isVideoTexture&&de(M),M.isRenderTargetTexture===!1&&M.version>0&&I.__version!==M.version){const V=M.image;if(V===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(V.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Ge(I,M,x);return}}n.bindTexture(t.TEXTURE_2D,I.__webglTexture,t.TEXTURE0+x)}function K(M,x){const I=i.get(M);if(M.version>0&&I.__version!==M.version){Ge(I,M,x);return}n.bindTexture(t.TEXTURE_2D_ARRAY,I.__webglTexture,t.TEXTURE0+x)}function z(M,x){const I=i.get(M);if(M.version>0&&I.__version!==M.version){Ge(I,M,x);return}n.bindTexture(t.TEXTURE_3D,I.__webglTexture,t.TEXTURE0+x)}function ne(M,x){const I=i.get(M);if(M.version>0&&I.__version!==M.version){U(I,M,x);return}n.bindTexture(t.TEXTURE_CUBE_MAP,I.__webglTexture,t.TEXTURE0+x)}const D={[Qi]:t.REPEAT,[cs]:t.CLAMP_TO_EDGE,[Jh]:t.MIRRORED_REPEAT},J={[Jn]:t.NEAREST,[IA]:t.NEAREST_MIPMAP_NEAREST,[Hl]:t.NEAREST_MIPMAP_LINEAR,[ci]:t.LINEAR,[Zf]:t.LINEAR_MIPMAP_NEAREST,[Sr]:t.LINEAR_MIPMAP_LINEAR},ee={[FA]:t.NEVER,[GA]:t.ALWAYS,[OA]:t.LESS,[v1]:t.LEQUAL,[BA]:t.EQUAL,[VA]:t.GEQUAL,[zA]:t.GREATER,[HA]:t.NOTEQUAL};function re(M,x){if(x.type===Gi&&e.has("OES_texture_float_linear")===!1&&(x.magFilter===ci||x.magFilter===Zf||x.magFilter===Hl||x.magFilter===Sr||x.minFilter===ci||x.minFilter===Zf||x.minFilter===Hl||x.minFilter===Sr)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),t.texParameteri(M,t.TEXTURE_WRAP_S,D[x.wrapS]),t.texParameteri(M,t.TEXTURE_WRAP_T,D[x.wrapT]),(M===t.TEXTURE_3D||M===t.TEXTURE_2D_ARRAY)&&t.texParameteri(M,t.TEXTURE_WRAP_R,D[x.wrapR]),t.texParameteri(M,t.TEXTURE_MAG_FILTER,J[x.magFilter]),t.texParameteri(M,t.TEXTURE_MIN_FILTER,J[x.minFilter]),x.compareFunction&&(t.texParameteri(M,t.TEXTURE_COMPARE_MODE,t.COMPARE_REF_TO_TEXTURE),t.texParameteri(M,t.TEXTURE_COMPARE_FUNC,ee[x.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(x.magFilter===Jn||x.minFilter!==Hl&&x.minFilter!==Sr||x.type===Gi&&e.has("OES_texture_float_linear")===!1)return;if(x.anisotropy>1||i.get(x).__currentAnisotropy){const I=e.get("EXT_texture_filter_anisotropic");t.texParameterf(M,I.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(x.anisotropy,r.getMaxAnisotropy())),i.get(x).__currentAnisotropy=x.anisotropy}}}function Pe(M,x){let I=!1;M.__webglInit===void 0&&(M.__webglInit=!0,x.addEventListener("dispose",b));const V=x.source;let G=d.get(V);G===void 0&&(G={},d.set(V,G));const W=O(x);if(W!==M.__cacheKey){G[W]===void 0&&(G[W]={texture:t.createTexture(),usedTimes:0},o.memory.textures++,I=!0),G[W].usedTimes++;const Ae=G[M.__cacheKey];Ae!==void 0&&(G[M.__cacheKey].usedTimes--,Ae.usedTimes===0&&P(x)),M.__cacheKey=W,M.__webglTexture=G[W].texture}return I}function Ge(M,x,I){let V=t.TEXTURE_2D;(x.isDataArrayTexture||x.isCompressedArrayTexture)&&(V=t.TEXTURE_2D_ARRAY),x.isData3DTexture&&(V=t.TEXTURE_3D);const G=Pe(M,x),W=x.source;n.bindTexture(V,M.__webglTexture,t.TEXTURE0+I);const Ae=i.get(W);if(W.version!==Ae.__version||G===!0){n.activeTexture(t.TEXTURE0+I);const he=ot.getPrimaries(ot.workingColorSpace),me=x.colorSpace===gr?null:ot.getPrimaries(x.colorSpace),ze=x.colorSpace===gr||he===me?t.NONE:t.BROWSER_DEFAULT_WEBGL;t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,x.flipY),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),t.pixelStorei(t.UNPACK_ALIGNMENT,x.unpackAlignment),t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,ze);let ue=S(x.image,!1,r.maxTextureSize);ue=Ie(x,ue);const we=s.convert(x.format,x.colorSpace),He=s.convert(x.type);let Ve=_(x.internalFormat,we,He,x.colorSpace,x.isVideoTexture);re(V,x);let Re;const Qe=x.mipmaps,We=x.isVideoTexture!==!0,ct=Ae.__version===void 0||G===!0,N=W.dataReady,Me=E(x,ue);if(x.isDepthTexture)Ve=v(x.format===Co,x.type),ct&&(We?n.texStorage2D(t.TEXTURE_2D,1,Ve,ue.width,ue.height):n.texImage2D(t.TEXTURE_2D,0,Ve,ue.width,ue.height,0,we,He,null));else if(x.isDataTexture)if(Qe.length>0){We&&ct&&n.texStorage2D(t.TEXTURE_2D,Me,Ve,Qe[0].width,Qe[0].height);for(let Y=0,ie=Qe.length;Y<ie;Y++)Re=Qe[Y],We?N&&n.texSubImage2D(t.TEXTURE_2D,Y,0,0,Re.width,Re.height,we,He,Re.data):n.texImage2D(t.TEXTURE_2D,Y,Ve,Re.width,Re.height,0,we,He,Re.data);x.generateMipmaps=!1}else We?(ct&&n.texStorage2D(t.TEXTURE_2D,Me,Ve,ue.width,ue.height),N&&n.texSubImage2D(t.TEXTURE_2D,0,0,0,ue.width,ue.height,we,He,ue.data)):n.texImage2D(t.TEXTURE_2D,0,Ve,ue.width,ue.height,0,we,He,ue.data);else if(x.isCompressedTexture)if(x.isCompressedArrayTexture){We&&ct&&n.texStorage3D(t.TEXTURE_2D_ARRAY,Me,Ve,Qe[0].width,Qe[0].height,ue.depth);for(let Y=0,ie=Qe.length;Y<ie;Y++)if(Re=Qe[Y],x.format!==di)if(we!==null)if(We){if(N)if(x.layerUpdates.size>0){const ye=y_(Re.width,Re.height,x.format,x.type);for(const Ee of x.layerUpdates){const et=Re.data.subarray(Ee*ye/Re.data.BYTES_PER_ELEMENT,(Ee+1)*ye/Re.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY,Y,0,0,Ee,Re.width,Re.height,1,we,et,0,0)}x.clearLayerUpdates()}else n.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY,Y,0,0,0,Re.width,Re.height,ue.depth,we,Re.data,0,0)}else n.compressedTexImage3D(t.TEXTURE_2D_ARRAY,Y,Ve,Re.width,Re.height,ue.depth,0,Re.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else We?N&&n.texSubImage3D(t.TEXTURE_2D_ARRAY,Y,0,0,0,Re.width,Re.height,ue.depth,we,He,Re.data):n.texImage3D(t.TEXTURE_2D_ARRAY,Y,Ve,Re.width,Re.height,ue.depth,0,we,He,Re.data)}else{We&&ct&&n.texStorage2D(t.TEXTURE_2D,Me,Ve,Qe[0].width,Qe[0].height);for(let Y=0,ie=Qe.length;Y<ie;Y++)Re=Qe[Y],x.format!==di?we!==null?We?N&&n.compressedTexSubImage2D(t.TEXTURE_2D,Y,0,0,Re.width,Re.height,we,Re.data):n.compressedTexImage2D(t.TEXTURE_2D,Y,Ve,Re.width,Re.height,0,Re.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):We?N&&n.texSubImage2D(t.TEXTURE_2D,Y,0,0,Re.width,Re.height,we,He,Re.data):n.texImage2D(t.TEXTURE_2D,Y,Ve,Re.width,Re.height,0,we,He,Re.data)}else if(x.isDataArrayTexture)if(We){if(ct&&n.texStorage3D(t.TEXTURE_2D_ARRAY,Me,Ve,ue.width,ue.height,ue.depth),N)if(x.layerUpdates.size>0){const Y=y_(ue.width,ue.height,x.format,x.type);for(const ie of x.layerUpdates){const ye=ue.data.subarray(ie*Y/ue.data.BYTES_PER_ELEMENT,(ie+1)*Y/ue.data.BYTES_PER_ELEMENT);n.texSubImage3D(t.TEXTURE_2D_ARRAY,0,0,0,ie,ue.width,ue.height,1,we,He,ye)}x.clearLayerUpdates()}else n.texSubImage3D(t.TEXTURE_2D_ARRAY,0,0,0,0,ue.width,ue.height,ue.depth,we,He,ue.data)}else n.texImage3D(t.TEXTURE_2D_ARRAY,0,Ve,ue.width,ue.height,ue.depth,0,we,He,ue.data);else if(x.isData3DTexture)We?(ct&&n.texStorage3D(t.TEXTURE_3D,Me,Ve,ue.width,ue.height,ue.depth),N&&n.texSubImage3D(t.TEXTURE_3D,0,0,0,0,ue.width,ue.height,ue.depth,we,He,ue.data)):n.texImage3D(t.TEXTURE_3D,0,Ve,ue.width,ue.height,ue.depth,0,we,He,ue.data);else if(x.isFramebufferTexture){if(ct)if(We)n.texStorage2D(t.TEXTURE_2D,Me,Ve,ue.width,ue.height);else{let Y=ue.width,ie=ue.height;for(let ye=0;ye<Me;ye++)n.texImage2D(t.TEXTURE_2D,ye,Ve,Y,ie,0,we,He,null),Y>>=1,ie>>=1}}else if(Qe.length>0){if(We&&ct){const Y=xe(Qe[0]);n.texStorage2D(t.TEXTURE_2D,Me,Ve,Y.width,Y.height)}for(let Y=0,ie=Qe.length;Y<ie;Y++)Re=Qe[Y],We?N&&n.texSubImage2D(t.TEXTURE_2D,Y,0,0,we,He,Re):n.texImage2D(t.TEXTURE_2D,Y,Ve,we,He,Re);x.generateMipmaps=!1}else if(We){if(ct){const Y=xe(ue);n.texStorage2D(t.TEXTURE_2D,Me,Ve,Y.width,Y.height)}N&&n.texSubImage2D(t.TEXTURE_2D,0,0,0,we,He,ue)}else n.texImage2D(t.TEXTURE_2D,0,Ve,we,He,ue);m(x)&&h(V),Ae.__version=W.version,x.onUpdate&&x.onUpdate(x)}M.__version=x.version}function U(M,x,I){if(x.image.length!==6)return;const V=Pe(M,x),G=x.source;n.bindTexture(t.TEXTURE_CUBE_MAP,M.__webglTexture,t.TEXTURE0+I);const W=i.get(G);if(G.version!==W.__version||V===!0){n.activeTexture(t.TEXTURE0+I);const Ae=ot.getPrimaries(ot.workingColorSpace),he=x.colorSpace===gr?null:ot.getPrimaries(x.colorSpace),me=x.colorSpace===gr||Ae===he?t.NONE:t.BROWSER_DEFAULT_WEBGL;t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,x.flipY),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),t.pixelStorei(t.UNPACK_ALIGNMENT,x.unpackAlignment),t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,me);const ze=x.isCompressedTexture||x.image[0].isCompressedTexture,ue=x.image[0]&&x.image[0].isDataTexture,we=[];for(let ie=0;ie<6;ie++)!ze&&!ue?we[ie]=S(x.image[ie],!0,r.maxCubemapSize):we[ie]=ue?x.image[ie].image:x.image[ie],we[ie]=Ie(x,we[ie]);const He=we[0],Ve=s.convert(x.format,x.colorSpace),Re=s.convert(x.type),Qe=_(x.internalFormat,Ve,Re,x.colorSpace),We=x.isVideoTexture!==!0,ct=W.__version===void 0||V===!0,N=G.dataReady;let Me=E(x,He);re(t.TEXTURE_CUBE_MAP,x);let Y;if(ze){We&&ct&&n.texStorage2D(t.TEXTURE_CUBE_MAP,Me,Qe,He.width,He.height);for(let ie=0;ie<6;ie++){Y=we[ie].mipmaps;for(let ye=0;ye<Y.length;ye++){const Ee=Y[ye];x.format!==di?Ve!==null?We?N&&n.compressedTexSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ie,ye,0,0,Ee.width,Ee.height,Ve,Ee.data):n.compressedTexImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ie,ye,Qe,Ee.width,Ee.height,0,Ee.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):We?N&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ie,ye,0,0,Ee.width,Ee.height,Ve,Re,Ee.data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ie,ye,Qe,Ee.width,Ee.height,0,Ve,Re,Ee.data)}}}else{if(Y=x.mipmaps,We&&ct){Y.length>0&&Me++;const ie=xe(we[0]);n.texStorage2D(t.TEXTURE_CUBE_MAP,Me,Qe,ie.width,ie.height)}for(let ie=0;ie<6;ie++)if(ue){We?N&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0,0,0,we[ie].width,we[ie].height,Ve,Re,we[ie].data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0,Qe,we[ie].width,we[ie].height,0,Ve,Re,we[ie].data);for(let ye=0;ye<Y.length;ye++){const et=Y[ye].image[ie].image;We?N&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ie,ye+1,0,0,et.width,et.height,Ve,Re,et.data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ie,ye+1,Qe,et.width,et.height,0,Ve,Re,et.data)}}else{We?N&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0,0,0,Ve,Re,we[ie]):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0,Qe,Ve,Re,we[ie]);for(let ye=0;ye<Y.length;ye++){const Ee=Y[ye];We?N&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ie,ye+1,0,0,Ve,Re,Ee.image[ie]):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ie,ye+1,Qe,Ve,Re,Ee.image[ie])}}}m(x)&&h(t.TEXTURE_CUBE_MAP),W.__version=G.version,x.onUpdate&&x.onUpdate(x)}M.__version=x.version}function Z(M,x,I,V,G,W){const Ae=s.convert(I.format,I.colorSpace),he=s.convert(I.type),me=_(I.internalFormat,Ae,he,I.colorSpace);if(!i.get(x).__hasExternalTextures){const ue=Math.max(1,x.width>>W),we=Math.max(1,x.height>>W);G===t.TEXTURE_3D||G===t.TEXTURE_2D_ARRAY?n.texImage3D(G,W,me,ue,we,x.depth,0,Ae,he,null):n.texImage2D(G,W,me,ue,we,0,Ae,he,null)}n.bindFramebuffer(t.FRAMEBUFFER,M),oe(x)?a.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,V,G,i.get(I).__webglTexture,0,le(x)):(G===t.TEXTURE_2D||G>=t.TEXTURE_CUBE_MAP_POSITIVE_X&&G<=t.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&t.framebufferTexture2D(t.FRAMEBUFFER,V,G,i.get(I).__webglTexture,W),n.bindFramebuffer(t.FRAMEBUFFER,null)}function te(M,x,I){if(t.bindRenderbuffer(t.RENDERBUFFER,M),x.depthBuffer){const V=x.depthTexture,G=V&&V.isDepthTexture?V.type:null,W=v(x.stencilBuffer,G),Ae=x.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,he=le(x);oe(x)?a.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,he,W,x.width,x.height):I?t.renderbufferStorageMultisample(t.RENDERBUFFER,he,W,x.width,x.height):t.renderbufferStorage(t.RENDERBUFFER,W,x.width,x.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,Ae,t.RENDERBUFFER,M)}else{const V=x.textures;for(let G=0;G<V.length;G++){const W=V[G],Ae=s.convert(W.format,W.colorSpace),he=s.convert(W.type),me=_(W.internalFormat,Ae,he,W.colorSpace),ze=le(x);I&&oe(x)===!1?t.renderbufferStorageMultisample(t.RENDERBUFFER,ze,me,x.width,x.height):oe(x)?a.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,ze,me,x.width,x.height):t.renderbufferStorage(t.RENDERBUFFER,me,x.width,x.height)}}t.bindRenderbuffer(t.RENDERBUFFER,null)}function se(M,x){if(x&&x.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(n.bindFramebuffer(t.FRAMEBUFFER,M),!(x.depthTexture&&x.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!i.get(x.depthTexture).__webglTexture||x.depthTexture.image.width!==x.width||x.depthTexture.image.height!==x.height)&&(x.depthTexture.image.width=x.width,x.depthTexture.image.height=x.height,x.depthTexture.needsUpdate=!0),j(x.depthTexture,0);const V=i.get(x.depthTexture).__webglTexture,G=le(x);if(x.depthTexture.format===fo)oe(x)?a.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,t.DEPTH_ATTACHMENT,t.TEXTURE_2D,V,0,G):t.framebufferTexture2D(t.FRAMEBUFFER,t.DEPTH_ATTACHMENT,t.TEXTURE_2D,V,0);else if(x.depthTexture.format===Co)oe(x)?a.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,t.DEPTH_STENCIL_ATTACHMENT,t.TEXTURE_2D,V,0,G):t.framebufferTexture2D(t.FRAMEBUFFER,t.DEPTH_STENCIL_ATTACHMENT,t.TEXTURE_2D,V,0);else throw new Error("Unknown depthTexture format")}function _e(M){const x=i.get(M),I=M.isWebGLCubeRenderTarget===!0;if(x.__boundDepthTexture!==M.depthTexture){const V=M.depthTexture;if(x.__depthDisposeCallback&&x.__depthDisposeCallback(),V){const G=()=>{delete x.__boundDepthTexture,delete x.__depthDisposeCallback,V.removeEventListener("dispose",G)};V.addEventListener("dispose",G),x.__depthDisposeCallback=G}x.__boundDepthTexture=V}if(M.depthTexture&&!x.__autoAllocateDepthBuffer){if(I)throw new Error("target.depthTexture not supported in Cube render targets");se(x.__webglFramebuffer,M)}else if(I){x.__webglDepthbuffer=[];for(let V=0;V<6;V++)if(n.bindFramebuffer(t.FRAMEBUFFER,x.__webglFramebuffer[V]),x.__webglDepthbuffer[V]===void 0)x.__webglDepthbuffer[V]=t.createRenderbuffer(),te(x.__webglDepthbuffer[V],M,!1);else{const G=M.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,W=x.__webglDepthbuffer[V];t.bindRenderbuffer(t.RENDERBUFFER,W),t.framebufferRenderbuffer(t.FRAMEBUFFER,G,t.RENDERBUFFER,W)}}else if(n.bindFramebuffer(t.FRAMEBUFFER,x.__webglFramebuffer),x.__webglDepthbuffer===void 0)x.__webglDepthbuffer=t.createRenderbuffer(),te(x.__webglDepthbuffer,M,!1);else{const V=M.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,G=x.__webglDepthbuffer;t.bindRenderbuffer(t.RENDERBUFFER,G),t.framebufferRenderbuffer(t.FRAMEBUFFER,V,t.RENDERBUFFER,G)}n.bindFramebuffer(t.FRAMEBUFFER,null)}function Ce(M,x,I){const V=i.get(M);x!==void 0&&Z(V.__webglFramebuffer,M,M.texture,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,0),I!==void 0&&_e(M)}function Fe(M){const x=M.texture,I=i.get(M),V=i.get(x);M.addEventListener("dispose",R);const G=M.textures,W=M.isWebGLCubeRenderTarget===!0,Ae=G.length>1;if(Ae||(V.__webglTexture===void 0&&(V.__webglTexture=t.createTexture()),V.__version=x.version,o.memory.textures++),W){I.__webglFramebuffer=[];for(let he=0;he<6;he++)if(x.mipmaps&&x.mipmaps.length>0){I.__webglFramebuffer[he]=[];for(let me=0;me<x.mipmaps.length;me++)I.__webglFramebuffer[he][me]=t.createFramebuffer()}else I.__webglFramebuffer[he]=t.createFramebuffer()}else{if(x.mipmaps&&x.mipmaps.length>0){I.__webglFramebuffer=[];for(let he=0;he<x.mipmaps.length;he++)I.__webglFramebuffer[he]=t.createFramebuffer()}else I.__webglFramebuffer=t.createFramebuffer();if(Ae)for(let he=0,me=G.length;he<me;he++){const ze=i.get(G[he]);ze.__webglTexture===void 0&&(ze.__webglTexture=t.createTexture(),o.memory.textures++)}if(M.samples>0&&oe(M)===!1){I.__webglMultisampledFramebuffer=t.createFramebuffer(),I.__webglColorRenderbuffer=[],n.bindFramebuffer(t.FRAMEBUFFER,I.__webglMultisampledFramebuffer);for(let he=0;he<G.length;he++){const me=G[he];I.__webglColorRenderbuffer[he]=t.createRenderbuffer(),t.bindRenderbuffer(t.RENDERBUFFER,I.__webglColorRenderbuffer[he]);const ze=s.convert(me.format,me.colorSpace),ue=s.convert(me.type),we=_(me.internalFormat,ze,ue,me.colorSpace,M.isXRRenderTarget===!0),He=le(M);t.renderbufferStorageMultisample(t.RENDERBUFFER,He,we,M.width,M.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+he,t.RENDERBUFFER,I.__webglColorRenderbuffer[he])}t.bindRenderbuffer(t.RENDERBUFFER,null),M.depthBuffer&&(I.__webglDepthRenderbuffer=t.createRenderbuffer(),te(I.__webglDepthRenderbuffer,M,!0)),n.bindFramebuffer(t.FRAMEBUFFER,null)}}if(W){n.bindTexture(t.TEXTURE_CUBE_MAP,V.__webglTexture),re(t.TEXTURE_CUBE_MAP,x);for(let he=0;he<6;he++)if(x.mipmaps&&x.mipmaps.length>0)for(let me=0;me<x.mipmaps.length;me++)Z(I.__webglFramebuffer[he][me],M,x,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+he,me);else Z(I.__webglFramebuffer[he],M,x,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+he,0);m(x)&&h(t.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(Ae){for(let he=0,me=G.length;he<me;he++){const ze=G[he],ue=i.get(ze);n.bindTexture(t.TEXTURE_2D,ue.__webglTexture),re(t.TEXTURE_2D,ze),Z(I.__webglFramebuffer,M,ze,t.COLOR_ATTACHMENT0+he,t.TEXTURE_2D,0),m(ze)&&h(t.TEXTURE_2D)}n.unbindTexture()}else{let he=t.TEXTURE_2D;if((M.isWebGL3DRenderTarget||M.isWebGLArrayRenderTarget)&&(he=M.isWebGL3DRenderTarget?t.TEXTURE_3D:t.TEXTURE_2D_ARRAY),n.bindTexture(he,V.__webglTexture),re(he,x),x.mipmaps&&x.mipmaps.length>0)for(let me=0;me<x.mipmaps.length;me++)Z(I.__webglFramebuffer[me],M,x,t.COLOR_ATTACHMENT0,he,me);else Z(I.__webglFramebuffer,M,x,t.COLOR_ATTACHMENT0,he,0);m(x)&&h(he),n.unbindTexture()}M.depthBuffer&&_e(M)}function Xe(M){const x=M.textures;for(let I=0,V=x.length;I<V;I++){const G=x[I];if(m(G)){const W=M.isWebGLCubeRenderTarget?t.TEXTURE_CUBE_MAP:t.TEXTURE_2D,Ae=i.get(G).__webglTexture;n.bindTexture(W,Ae),h(W),n.unbindTexture()}}}const q=[],A=[];function ce(M){if(M.samples>0){if(oe(M)===!1){const x=M.textures,I=M.width,V=M.height;let G=t.COLOR_BUFFER_BIT;const W=M.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,Ae=i.get(M),he=x.length>1;if(he)for(let me=0;me<x.length;me++)n.bindFramebuffer(t.FRAMEBUFFER,Ae.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+me,t.RENDERBUFFER,null),n.bindFramebuffer(t.FRAMEBUFFER,Ae.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+me,t.TEXTURE_2D,null,0);n.bindFramebuffer(t.READ_FRAMEBUFFER,Ae.__webglMultisampledFramebuffer),n.bindFramebuffer(t.DRAW_FRAMEBUFFER,Ae.__webglFramebuffer);for(let me=0;me<x.length;me++){if(M.resolveDepthBuffer&&(M.depthBuffer&&(G|=t.DEPTH_BUFFER_BIT),M.stencilBuffer&&M.resolveStencilBuffer&&(G|=t.STENCIL_BUFFER_BIT)),he){t.framebufferRenderbuffer(t.READ_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.RENDERBUFFER,Ae.__webglColorRenderbuffer[me]);const ze=i.get(x[me]).__webglTexture;t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,ze,0)}t.blitFramebuffer(0,0,I,V,0,0,I,V,G,t.NEAREST),l===!0&&(q.length=0,A.length=0,q.push(t.COLOR_ATTACHMENT0+me),M.depthBuffer&&M.resolveDepthBuffer===!1&&(q.push(W),A.push(W),t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER,A)),t.invalidateFramebuffer(t.READ_FRAMEBUFFER,q))}if(n.bindFramebuffer(t.READ_FRAMEBUFFER,null),n.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),he)for(let me=0;me<x.length;me++){n.bindFramebuffer(t.FRAMEBUFFER,Ae.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+me,t.RENDERBUFFER,Ae.__webglColorRenderbuffer[me]);const ze=i.get(x[me]).__webglTexture;n.bindFramebuffer(t.FRAMEBUFFER,Ae.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+me,t.TEXTURE_2D,ze,0)}n.bindFramebuffer(t.DRAW_FRAMEBUFFER,Ae.__webglMultisampledFramebuffer)}else if(M.depthBuffer&&M.resolveDepthBuffer===!1&&l){const x=M.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT;t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER,[x])}}}function le(M){return Math.min(r.maxSamples,M.samples)}function oe(M){const x=i.get(M);return M.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&x.__useRenderToTexture!==!1}function de(M){const x=o.render.frame;c.get(M)!==x&&(c.set(M,x),M.update())}function Ie(M,x){const I=M.colorSpace,V=M.format,G=M.type;return M.isCompressedTexture===!0||M.isVideoTexture===!0||I!==zr&&I!==gr&&(ot.getTransfer(I)===gt?(V!==di||G!==er)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",I)),x}function xe(M){return typeof HTMLImageElement<"u"&&M instanceof HTMLImageElement?(u.width=M.naturalWidth||M.width,u.height=M.naturalHeight||M.height):typeof VideoFrame<"u"&&M instanceof VideoFrame?(u.width=M.displayWidth,u.height=M.displayHeight):(u.width=M.width,u.height=M.height),u}this.allocateTextureUnit=$,this.resetTextureUnits=w,this.setTexture2D=j,this.setTexture2DArray=K,this.setTexture3D=z,this.setTextureCube=ne,this.rebindTextures=Ce,this.setupRenderTarget=Fe,this.updateRenderTargetMipmap=Xe,this.updateMultisampleRenderTarget=ce,this.setupDepthRenderbuffer=_e,this.setupFrameBufferTexture=Z,this.useMultisampledRTT=oe}function q3(t,e){function n(i,r=gr){let s;const o=ot.getTransfer(r);if(i===er)return t.UNSIGNED_BYTE;if(i===eg)return t.UNSIGNED_SHORT_4_4_4_4;if(i===tg)return t.UNSIGNED_SHORT_5_5_5_1;if(i===l1)return t.UNSIGNED_INT_5_9_9_9_REV;if(i===o1)return t.BYTE;if(i===a1)return t.SHORT;if(i===il)return t.UNSIGNED_SHORT;if(i===Qm)return t.INT;if(i===_s)return t.UNSIGNED_INT;if(i===Gi)return t.FLOAT;if(i===pl)return t.HALF_FLOAT;if(i===u1)return t.ALPHA;if(i===c1)return t.RGB;if(i===di)return t.RGBA;if(i===f1)return t.LUMINANCE;if(i===d1)return t.LUMINANCE_ALPHA;if(i===fo)return t.DEPTH_COMPONENT;if(i===Co)return t.DEPTH_STENCIL;if(i===h1)return t.RED;if(i===ng)return t.RED_INTEGER;if(i===p1)return t.RG;if(i===ig)return t.RG_INTEGER;if(i===rg)return t.RGBA_INTEGER;if(i===Ou||i===Bu||i===zu||i===Hu)if(o===gt)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===Ou)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Bu)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===zu)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Hu)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===Ou)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Bu)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===zu)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Hu)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Qh||i===ep||i===tp||i===np)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===Qh)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===ep)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===tp)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===np)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===ip||i===rp||i===sp)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===ip||i===rp)return o===gt?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===sp)return o===gt?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===op||i===ap||i===lp||i===up||i===cp||i===fp||i===dp||i===hp||i===pp||i===mp||i===gp||i===vp||i===_p||i===xp)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===op)return o===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===ap)return o===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===lp)return o===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===up)return o===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===cp)return o===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===fp)return o===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===dp)return o===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===hp)return o===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===pp)return o===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===mp)return o===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===gp)return o===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===vp)return o===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===_p)return o===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===xp)return o===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Vu||i===yp||i===Sp)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===Vu)return o===gt?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===yp)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Sp)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===m1||i===Mp||i===Ep||i===wp)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===Vu)return s.COMPRESSED_RED_RGTC1_EXT;if(i===Mp)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Ep)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===wp)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===To?t.UNSIGNED_INT_24_8:t[i]!==void 0?t[i]:null}return{convert:n}}class K3 extends Mn{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class to extends kt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Z3={type:"move"};class Ad{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new to,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new to,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new L,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new L),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new to,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new L,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new L),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const n=this._hand;if(n)for(const i of e.hand.values())this._getHandJoint(n,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,n,i){let r=null,s=null,o=null;const a=this._targetRay,l=this._grip,u=this._hand;if(e&&n.session.visibilityState!=="visible-blurred"){if(u&&e.hand){o=!0;for(const S of e.hand.values()){const m=n.getJointPose(S,i),h=this._getHandJoint(u,S);m!==null&&(h.matrix.fromArray(m.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,h.jointRadius=m.radius),h.visible=m!==null}const c=u.joints["index-finger-tip"],f=u.joints["thumb-tip"],d=c.position.distanceTo(f.position),p=.02,g=.005;u.inputState.pinching&&d>p+g?(u.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!u.inputState.pinching&&d<=p-g&&(u.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=n.getPose(e.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(r=n.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Z3)))}return a!==null&&(a.visible=r!==null),l!==null&&(l.visible=s!==null),u!==null&&(u.visible=o!==null),this}_getHandJoint(e,n){if(e.joints[n.jointName]===void 0){const i=new to;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[n.jointName]=i,e.add(i)}return e.joints[n.jointName]}}const J3=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Q3=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class eL{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,n,i){if(this.texture===null){const r=new fn,s=e.properties.get(r);s.__webglTexture=n.texture,(n.depthNear!=i.depthNear||n.depthFar!=i.depthFar)&&(this.depthNear=n.depthNear,this.depthFar=n.depthFar),this.texture=r}}getMesh(e){if(this.texture!==null&&this.mesh===null){const n=e.cameras[0].viewport,i=new kr({vertexShader:J3,fragmentShader:Q3,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new Je(new Ri(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class tL extends ko{constructor(e,n){super();const i=this;let r=null,s=1,o=null,a="local-floor",l=1,u=null,c=null,f=null,d=null,p=null,g=null;const S=new eL,m=n.getContextAttributes();let h=null,_=null;const v=[],E=[],b=new ge;let R=null;const C=new Mn;C.layers.enable(1),C.viewport=new ut;const P=new Mn;P.layers.enable(2),P.viewport=new ut;const Q=[C,P],y=new K3;y.layers.enable(1),y.layers.enable(2);let w=null,$=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(U){let Z=v[U];return Z===void 0&&(Z=new Ad,v[U]=Z),Z.getTargetRaySpace()},this.getControllerGrip=function(U){let Z=v[U];return Z===void 0&&(Z=new Ad,v[U]=Z),Z.getGripSpace()},this.getHand=function(U){let Z=v[U];return Z===void 0&&(Z=new Ad,v[U]=Z),Z.getHandSpace()};function O(U){const Z=E.indexOf(U.inputSource);if(Z===-1)return;const te=v[Z];te!==void 0&&(te.update(U.inputSource,U.frame,u||o),te.dispatchEvent({type:U.type,data:U.inputSource}))}function j(){r.removeEventListener("select",O),r.removeEventListener("selectstart",O),r.removeEventListener("selectend",O),r.removeEventListener("squeeze",O),r.removeEventListener("squeezestart",O),r.removeEventListener("squeezeend",O),r.removeEventListener("end",j),r.removeEventListener("inputsourceschange",K);for(let U=0;U<v.length;U++){const Z=E[U];Z!==null&&(E[U]=null,v[U].disconnect(Z))}w=null,$=null,S.reset(),e.setRenderTarget(h),p=null,d=null,f=null,r=null,_=null,Ge.stop(),i.isPresenting=!1,e.setPixelRatio(R),e.setSize(b.width,b.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(U){s=U,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(U){a=U,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return u||o},this.setReferenceSpace=function(U){u=U},this.getBaseLayer=function(){return d!==null?d:p},this.getBinding=function(){return f},this.getFrame=function(){return g},this.getSession=function(){return r},this.setSession=async function(U){if(r=U,r!==null){if(h=e.getRenderTarget(),r.addEventListener("select",O),r.addEventListener("selectstart",O),r.addEventListener("selectend",O),r.addEventListener("squeeze",O),r.addEventListener("squeezestart",O),r.addEventListener("squeezeend",O),r.addEventListener("end",j),r.addEventListener("inputsourceschange",K),m.xrCompatible!==!0&&await n.makeXRCompatible(),R=e.getPixelRatio(),e.getSize(b),r.renderState.layers===void 0){const Z={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:s};p=new XRWebGLLayer(r,n,Z),r.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),_=new xs(p.framebufferWidth,p.framebufferHeight,{format:di,type:er,colorSpace:e.outputColorSpace,stencilBuffer:m.stencil})}else{let Z=null,te=null,se=null;m.depth&&(se=m.stencil?n.DEPTH24_STENCIL8:n.DEPTH_COMPONENT24,Z=m.stencil?Co:fo,te=m.stencil?To:_s);const _e={colorFormat:n.RGBA8,depthFormat:se,scaleFactor:s};f=new XRWebGLBinding(r,n),d=f.createProjectionLayer(_e),r.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),_=new xs(d.textureWidth,d.textureHeight,{format:di,type:er,depthTexture:new b1(d.textureWidth,d.textureHeight,te,void 0,void 0,void 0,void 0,void 0,void 0,Z),stencilBuffer:m.stencil,colorSpace:e.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1})}_.isXRRenderTarget=!0,this.setFoveation(l),u=null,o=await r.requestReferenceSpace(a),Ge.setContext(r),Ge.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return S.getDepthTexture()};function K(U){for(let Z=0;Z<U.removed.length;Z++){const te=U.removed[Z],se=E.indexOf(te);se>=0&&(E[se]=null,v[se].disconnect(te))}for(let Z=0;Z<U.added.length;Z++){const te=U.added[Z];let se=E.indexOf(te);if(se===-1){for(let Ce=0;Ce<v.length;Ce++)if(Ce>=E.length){E.push(te),se=Ce;break}else if(E[Ce]===null){E[Ce]=te,se=Ce;break}if(se===-1)break}const _e=v[se];_e&&_e.connect(te)}}const z=new L,ne=new L;function D(U,Z,te){z.setFromMatrixPosition(Z.matrixWorld),ne.setFromMatrixPosition(te.matrixWorld);const se=z.distanceTo(ne),_e=Z.projectionMatrix.elements,Ce=te.projectionMatrix.elements,Fe=_e[14]/(_e[10]-1),Xe=_e[14]/(_e[10]+1),q=(_e[9]+1)/_e[5],A=(_e[9]-1)/_e[5],ce=(_e[8]-1)/_e[0],le=(Ce[8]+1)/Ce[0],oe=Fe*ce,de=Fe*le,Ie=se/(-ce+le),xe=Ie*-ce;if(Z.matrixWorld.decompose(U.position,U.quaternion,U.scale),U.translateX(xe),U.translateZ(Ie),U.matrixWorld.compose(U.position,U.quaternion,U.scale),U.matrixWorldInverse.copy(U.matrixWorld).invert(),_e[10]===-1)U.projectionMatrix.copy(Z.projectionMatrix),U.projectionMatrixInverse.copy(Z.projectionMatrixInverse);else{const M=Fe+Ie,x=Xe+Ie,I=oe-xe,V=de+(se-xe),G=q*Xe/x*M,W=A*Xe/x*M;U.projectionMatrix.makePerspective(I,V,G,W,M,x),U.projectionMatrixInverse.copy(U.projectionMatrix).invert()}}function J(U,Z){Z===null?U.matrixWorld.copy(U.matrix):U.matrixWorld.multiplyMatrices(Z.matrixWorld,U.matrix),U.matrixWorldInverse.copy(U.matrixWorld).invert()}this.updateCamera=function(U){if(r===null)return;let Z=U.near,te=U.far;S.texture!==null&&(S.depthNear>0&&(Z=S.depthNear),S.depthFar>0&&(te=S.depthFar)),y.near=P.near=C.near=Z,y.far=P.far=C.far=te,(w!==y.near||$!==y.far)&&(r.updateRenderState({depthNear:y.near,depthFar:y.far}),w=y.near,$=y.far);const se=U.parent,_e=y.cameras;J(y,se);for(let Ce=0;Ce<_e.length;Ce++)J(_e[Ce],se);_e.length===2?D(y,C,P):y.projectionMatrix.copy(C.projectionMatrix),ee(U,y,se)};function ee(U,Z,te){te===null?U.matrix.copy(Z.matrixWorld):(U.matrix.copy(te.matrixWorld),U.matrix.invert(),U.matrix.multiply(Z.matrixWorld)),U.matrix.decompose(U.position,U.quaternion,U.scale),U.updateMatrixWorld(!0),U.projectionMatrix.copy(Z.projectionMatrix),U.projectionMatrixInverse.copy(Z.projectionMatrixInverse),U.isPerspectiveCamera&&(U.fov=Dc*2*Math.atan(1/U.projectionMatrix.elements[5]),U.zoom=1)}this.getCamera=function(){return y},this.getFoveation=function(){if(!(d===null&&p===null))return l},this.setFoveation=function(U){l=U,d!==null&&(d.fixedFoveation=U),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=U)},this.hasDepthSensing=function(){return S.texture!==null},this.getDepthSensingMesh=function(){return S.getMesh(y)};let re=null;function Pe(U,Z){if(c=Z.getViewerPose(u||o),g=Z,c!==null){const te=c.views;p!==null&&(e.setRenderTargetFramebuffer(_,p.framebuffer),e.setRenderTarget(_));let se=!1;te.length!==y.cameras.length&&(y.cameras.length=0,se=!0);for(let Ce=0;Ce<te.length;Ce++){const Fe=te[Ce];let Xe=null;if(p!==null)Xe=p.getViewport(Fe);else{const A=f.getViewSubImage(d,Fe);Xe=A.viewport,Ce===0&&(e.setRenderTargetTextures(_,A.colorTexture,d.ignoreDepthValues?void 0:A.depthStencilTexture),e.setRenderTarget(_))}let q=Q[Ce];q===void 0&&(q=new Mn,q.layers.enable(Ce),q.viewport=new ut,Q[Ce]=q),q.matrix.fromArray(Fe.transform.matrix),q.matrix.decompose(q.position,q.quaternion,q.scale),q.projectionMatrix.fromArray(Fe.projectionMatrix),q.projectionMatrixInverse.copy(q.projectionMatrix).invert(),q.viewport.set(Xe.x,Xe.y,Xe.width,Xe.height),Ce===0&&(y.matrix.copy(q.matrix),y.matrix.decompose(y.position,y.quaternion,y.scale)),se===!0&&y.cameras.push(q)}const _e=r.enabledFeatures;if(_e&&_e.includes("depth-sensing")){const Ce=f.getDepthInformation(te[0]);Ce&&Ce.isValid&&Ce.texture&&S.init(e,Ce,r.renderState)}}for(let te=0;te<v.length;te++){const se=E[te],_e=v[te];se!==null&&_e!==void 0&&_e.update(se,Z,u||o)}re&&re(U,Z),Z.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:Z}),g=null}const Ge=new R1;Ge.setAnimationLoop(Pe),this.setAnimationLoop=function(U){re=U},this.dispose=function(){}}}const qr=new Ai,nL=new yt;function iL(t,e){function n(m,h){m.matrixAutoUpdate===!0&&m.updateMatrix(),h.value.copy(m.matrix)}function i(m,h){h.color.getRGB(m.fogColor.value,T1(t)),h.isFog?(m.fogNear.value=h.near,m.fogFar.value=h.far):h.isFogExp2&&(m.fogDensity.value=h.density)}function r(m,h,_,v,E){h.isMeshBasicMaterial||h.isMeshLambertMaterial?s(m,h):h.isMeshToonMaterial?(s(m,h),f(m,h)):h.isMeshPhongMaterial?(s(m,h),c(m,h)):h.isMeshStandardMaterial?(s(m,h),d(m,h),h.isMeshPhysicalMaterial&&p(m,h,E)):h.isMeshMatcapMaterial?(s(m,h),g(m,h)):h.isMeshDepthMaterial?s(m,h):h.isMeshDistanceMaterial?(s(m,h),S(m,h)):h.isMeshNormalMaterial?s(m,h):h.isLineBasicMaterial?(o(m,h),h.isLineDashedMaterial&&a(m,h)):h.isPointsMaterial?l(m,h,_,v):h.isSpriteMaterial?u(m,h):h.isShadowMaterial?(m.color.value.copy(h.color),m.opacity.value=h.opacity):h.isShaderMaterial&&(h.uniformsNeedUpdate=!1)}function s(m,h){m.opacity.value=h.opacity,h.color&&m.diffuse.value.copy(h.color),h.emissive&&m.emissive.value.copy(h.emissive).multiplyScalar(h.emissiveIntensity),h.map&&(m.map.value=h.map,n(h.map,m.mapTransform)),h.alphaMap&&(m.alphaMap.value=h.alphaMap,n(h.alphaMap,m.alphaMapTransform)),h.bumpMap&&(m.bumpMap.value=h.bumpMap,n(h.bumpMap,m.bumpMapTransform),m.bumpScale.value=h.bumpScale,h.side===cn&&(m.bumpScale.value*=-1)),h.normalMap&&(m.normalMap.value=h.normalMap,n(h.normalMap,m.normalMapTransform),m.normalScale.value.copy(h.normalScale),h.side===cn&&m.normalScale.value.negate()),h.displacementMap&&(m.displacementMap.value=h.displacementMap,n(h.displacementMap,m.displacementMapTransform),m.displacementScale.value=h.displacementScale,m.displacementBias.value=h.displacementBias),h.emissiveMap&&(m.emissiveMap.value=h.emissiveMap,n(h.emissiveMap,m.emissiveMapTransform)),h.specularMap&&(m.specularMap.value=h.specularMap,n(h.specularMap,m.specularMapTransform)),h.alphaTest>0&&(m.alphaTest.value=h.alphaTest);const _=e.get(h),v=_.envMap,E=_.envMapRotation;v&&(m.envMap.value=v,qr.copy(E),qr.x*=-1,qr.y*=-1,qr.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(qr.y*=-1,qr.z*=-1),m.envMapRotation.value.setFromMatrix4(nL.makeRotationFromEuler(qr)),m.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=h.reflectivity,m.ior.value=h.ior,m.refractionRatio.value=h.refractionRatio),h.lightMap&&(m.lightMap.value=h.lightMap,m.lightMapIntensity.value=h.lightMapIntensity,n(h.lightMap,m.lightMapTransform)),h.aoMap&&(m.aoMap.value=h.aoMap,m.aoMapIntensity.value=h.aoMapIntensity,n(h.aoMap,m.aoMapTransform))}function o(m,h){m.diffuse.value.copy(h.color),m.opacity.value=h.opacity,h.map&&(m.map.value=h.map,n(h.map,m.mapTransform))}function a(m,h){m.dashSize.value=h.dashSize,m.totalSize.value=h.dashSize+h.gapSize,m.scale.value=h.scale}function l(m,h,_,v){m.diffuse.value.copy(h.color),m.opacity.value=h.opacity,m.size.value=h.size*_,m.scale.value=v*.5,h.map&&(m.map.value=h.map,n(h.map,m.uvTransform)),h.alphaMap&&(m.alphaMap.value=h.alphaMap,n(h.alphaMap,m.alphaMapTransform)),h.alphaTest>0&&(m.alphaTest.value=h.alphaTest)}function u(m,h){m.diffuse.value.copy(h.color),m.opacity.value=h.opacity,m.rotation.value=h.rotation,h.map&&(m.map.value=h.map,n(h.map,m.mapTransform)),h.alphaMap&&(m.alphaMap.value=h.alphaMap,n(h.alphaMap,m.alphaMapTransform)),h.alphaTest>0&&(m.alphaTest.value=h.alphaTest)}function c(m,h){m.specular.value.copy(h.specular),m.shininess.value=Math.max(h.shininess,1e-4)}function f(m,h){h.gradientMap&&(m.gradientMap.value=h.gradientMap)}function d(m,h){m.metalness.value=h.metalness,h.metalnessMap&&(m.metalnessMap.value=h.metalnessMap,n(h.metalnessMap,m.metalnessMapTransform)),m.roughness.value=h.roughness,h.roughnessMap&&(m.roughnessMap.value=h.roughnessMap,n(h.roughnessMap,m.roughnessMapTransform)),h.envMap&&(m.envMapIntensity.value=h.envMapIntensity)}function p(m,h,_){m.ior.value=h.ior,h.sheen>0&&(m.sheenColor.value.copy(h.sheenColor).multiplyScalar(h.sheen),m.sheenRoughness.value=h.sheenRoughness,h.sheenColorMap&&(m.sheenColorMap.value=h.sheenColorMap,n(h.sheenColorMap,m.sheenColorMapTransform)),h.sheenRoughnessMap&&(m.sheenRoughnessMap.value=h.sheenRoughnessMap,n(h.sheenRoughnessMap,m.sheenRoughnessMapTransform))),h.clearcoat>0&&(m.clearcoat.value=h.clearcoat,m.clearcoatRoughness.value=h.clearcoatRoughness,h.clearcoatMap&&(m.clearcoatMap.value=h.clearcoatMap,n(h.clearcoatMap,m.clearcoatMapTransform)),h.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=h.clearcoatRoughnessMap,n(h.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),h.clearcoatNormalMap&&(m.clearcoatNormalMap.value=h.clearcoatNormalMap,n(h.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(h.clearcoatNormalScale),h.side===cn&&m.clearcoatNormalScale.value.negate())),h.dispersion>0&&(m.dispersion.value=h.dispersion),h.iridescence>0&&(m.iridescence.value=h.iridescence,m.iridescenceIOR.value=h.iridescenceIOR,m.iridescenceThicknessMinimum.value=h.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=h.iridescenceThicknessRange[1],h.iridescenceMap&&(m.iridescenceMap.value=h.iridescenceMap,n(h.iridescenceMap,m.iridescenceMapTransform)),h.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=h.iridescenceThicknessMap,n(h.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),h.transmission>0&&(m.transmission.value=h.transmission,m.transmissionSamplerMap.value=_.texture,m.transmissionSamplerSize.value.set(_.width,_.height),h.transmissionMap&&(m.transmissionMap.value=h.transmissionMap,n(h.transmissionMap,m.transmissionMapTransform)),m.thickness.value=h.thickness,h.thicknessMap&&(m.thicknessMap.value=h.thicknessMap,n(h.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=h.attenuationDistance,m.attenuationColor.value.copy(h.attenuationColor)),h.anisotropy>0&&(m.anisotropyVector.value.set(h.anisotropy*Math.cos(h.anisotropyRotation),h.anisotropy*Math.sin(h.anisotropyRotation)),h.anisotropyMap&&(m.anisotropyMap.value=h.anisotropyMap,n(h.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=h.specularIntensity,m.specularColor.value.copy(h.specularColor),h.specularColorMap&&(m.specularColorMap.value=h.specularColorMap,n(h.specularColorMap,m.specularColorMapTransform)),h.specularIntensityMap&&(m.specularIntensityMap.value=h.specularIntensityMap,n(h.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,h){h.matcap&&(m.matcap.value=h.matcap)}function S(m,h){const _=e.get(h).light;m.referencePosition.value.setFromMatrixPosition(_.matrixWorld),m.nearDistance.value=_.shadow.camera.near,m.farDistance.value=_.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function rL(t,e,n,i){let r={},s={},o=[];const a=t.getParameter(t.MAX_UNIFORM_BUFFER_BINDINGS);function l(_,v){const E=v.program;i.uniformBlockBinding(_,E)}function u(_,v){let E=r[_.id];E===void 0&&(g(_),E=c(_),r[_.id]=E,_.addEventListener("dispose",m));const b=v.program;i.updateUBOMapping(_,b);const R=e.render.frame;s[_.id]!==R&&(d(_),s[_.id]=R)}function c(_){const v=f();_.__bindingPointIndex=v;const E=t.createBuffer(),b=_.__size,R=_.usage;return t.bindBuffer(t.UNIFORM_BUFFER,E),t.bufferData(t.UNIFORM_BUFFER,b,R),t.bindBuffer(t.UNIFORM_BUFFER,null),t.bindBufferBase(t.UNIFORM_BUFFER,v,E),E}function f(){for(let _=0;_<a;_++)if(o.indexOf(_)===-1)return o.push(_),_;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(_){const v=r[_.id],E=_.uniforms,b=_.__cache;t.bindBuffer(t.UNIFORM_BUFFER,v);for(let R=0,C=E.length;R<C;R++){const P=Array.isArray(E[R])?E[R]:[E[R]];for(let Q=0,y=P.length;Q<y;Q++){const w=P[Q];if(p(w,R,Q,b)===!0){const $=w.__offset,O=Array.isArray(w.value)?w.value:[w.value];let j=0;for(let K=0;K<O.length;K++){const z=O[K],ne=S(z);typeof z=="number"||typeof z=="boolean"?(w.__data[0]=z,t.bufferSubData(t.UNIFORM_BUFFER,$+j,w.__data)):z.isMatrix3?(w.__data[0]=z.elements[0],w.__data[1]=z.elements[1],w.__data[2]=z.elements[2],w.__data[3]=0,w.__data[4]=z.elements[3],w.__data[5]=z.elements[4],w.__data[6]=z.elements[5],w.__data[7]=0,w.__data[8]=z.elements[6],w.__data[9]=z.elements[7],w.__data[10]=z.elements[8],w.__data[11]=0):(z.toArray(w.__data,j),j+=ne.storage/Float32Array.BYTES_PER_ELEMENT)}t.bufferSubData(t.UNIFORM_BUFFER,$,w.__data)}}}t.bindBuffer(t.UNIFORM_BUFFER,null)}function p(_,v,E,b){const R=_.value,C=v+"_"+E;if(b[C]===void 0)return typeof R=="number"||typeof R=="boolean"?b[C]=R:b[C]=R.clone(),!0;{const P=b[C];if(typeof R=="number"||typeof R=="boolean"){if(P!==R)return b[C]=R,!0}else if(P.equals(R)===!1)return P.copy(R),!0}return!1}function g(_){const v=_.uniforms;let E=0;const b=16;for(let C=0,P=v.length;C<P;C++){const Q=Array.isArray(v[C])?v[C]:[v[C]];for(let y=0,w=Q.length;y<w;y++){const $=Q[y],O=Array.isArray($.value)?$.value:[$.value];for(let j=0,K=O.length;j<K;j++){const z=O[j],ne=S(z),D=E%b,J=D%ne.boundary,ee=D+J;E+=J,ee!==0&&b-ee<ne.storage&&(E+=b-ee),$.__data=new Float32Array(ne.storage/Float32Array.BYTES_PER_ELEMENT),$.__offset=E,E+=ne.storage}}}const R=E%b;return R>0&&(E+=b-R),_.__size=E,_.__cache={},this}function S(_){const v={boundary:0,storage:0};return typeof _=="number"||typeof _=="boolean"?(v.boundary=4,v.storage=4):_.isVector2?(v.boundary=8,v.storage=8):_.isVector3||_.isColor?(v.boundary=16,v.storage=12):_.isVector4?(v.boundary=16,v.storage=16):_.isMatrix3?(v.boundary=48,v.storage=48):_.isMatrix4?(v.boundary=64,v.storage=64):_.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",_),v}function m(_){const v=_.target;v.removeEventListener("dispose",m);const E=o.indexOf(v.__bindingPointIndex);o.splice(E,1),t.deleteBuffer(r[v.id]),delete r[v.id],delete s[v.id]}function h(){for(const _ in r)t.deleteBuffer(r[_]);o=[],r={},s={}}return{bind:l,update:u,dispose:h}}class sL{constructor(e={}){const{canvas:n=$A(),context:i=null,depth:r=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:u=!1,powerPreference:c="default",failIfMajorPerformanceCaveat:f=!1}=e;this.isWebGLRenderer=!0;let d;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");d=i.getContextAttributes().alpha}else d=o;const p=new Uint32Array(4),g=new Int32Array(4);let S=null,m=null;const h=[],_=[];this.domElement=n,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=an,this.toneMapping=Dr,this.toneMappingExposure=1;const v=this;let E=!1,b=0,R=0,C=null,P=-1,Q=null;const y=new ut,w=new ut;let $=null;const O=new nt(0);let j=0,K=n.width,z=n.height,ne=1,D=null,J=null;const ee=new ut(0,0,K,z),re=new ut(0,0,K,z);let Pe=!1;const Ge=new ag;let U=!1,Z=!1;const te=new yt,se=new yt,_e=new L,Ce=new ut,Fe={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Xe=!1;function q(){return C===null?ne:1}let A=i;function ce(T,k){return n.getContext(T,k)}try{const T={alpha:!0,depth:r,stencil:s,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:u,powerPreference:c,failIfMajorPerformanceCaveat:f};if("setAttribute"in n&&n.setAttribute("data-engine",`three.js r${Jm}`),n.addEventListener("webglcontextlost",ie,!1),n.addEventListener("webglcontextrestored",ye,!1),n.addEventListener("webglcontextcreationerror",Ee,!1),A===null){const k="webgl2";if(A=ce(k,T),A===null)throw ce(k)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(T){throw console.error("THREE.WebGLRenderer: "+T.message),T}let le,oe,de,Ie,xe,M,x,I,V,G,W,Ae,he,me,ze,ue,we,He,Ve,Re,Qe,We,ct,N;function Me(){le=new cb(A),le.init(),We=new q3(A,le),oe=new rb(A,le,e,We),de=new X3(A),oe.reverseDepthBuffer&&de.buffers.depth.setReversed(!0),Ie=new hb(A),xe=new L3,M=new Y3(A,le,de,xe,oe,We,Ie),x=new ob(v),I=new ub(v),V=new y2(A),ct=new nb(A,V),G=new fb(A,V,Ie,ct),W=new mb(A,G,V,Ie),Ve=new pb(A,oe,M),ue=new sb(xe),Ae=new b3(v,x,I,le,oe,ct,ue),he=new iL(v,xe),me=new I3,ze=new B3(le),He=new tb(v,x,I,de,W,d,l),we=new W3(v,W,oe),N=new rL(A,Ie,oe,de),Re=new ib(A,le,Ie),Qe=new db(A,le,Ie),Ie.programs=Ae.programs,v.capabilities=oe,v.extensions=le,v.properties=xe,v.renderLists=me,v.shadowMap=we,v.state=de,v.info=Ie}Me();const Y=new tL(v,A);this.xr=Y,this.getContext=function(){return A},this.getContextAttributes=function(){return A.getContextAttributes()},this.forceContextLoss=function(){const T=le.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){const T=le.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return ne},this.setPixelRatio=function(T){T!==void 0&&(ne=T,this.setSize(K,z,!1))},this.getSize=function(T){return T.set(K,z)},this.setSize=function(T,k,B=!0){if(Y.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}K=T,z=k,n.width=Math.floor(T*ne),n.height=Math.floor(k*ne),B===!0&&(n.style.width=T+"px",n.style.height=k+"px"),this.setViewport(0,0,T,k)},this.getDrawingBufferSize=function(T){return T.set(K*ne,z*ne).floor()},this.setDrawingBufferSize=function(T,k,B){K=T,z=k,ne=B,n.width=Math.floor(T*B),n.height=Math.floor(k*B),this.setViewport(0,0,T,k)},this.getCurrentViewport=function(T){return T.copy(y)},this.getViewport=function(T){return T.copy(ee)},this.setViewport=function(T,k,B,H){T.isVector4?ee.set(T.x,T.y,T.z,T.w):ee.set(T,k,B,H),de.viewport(y.copy(ee).multiplyScalar(ne).round())},this.getScissor=function(T){return T.copy(re)},this.setScissor=function(T,k,B,H){T.isVector4?re.set(T.x,T.y,T.z,T.w):re.set(T,k,B,H),de.scissor(w.copy(re).multiplyScalar(ne).round())},this.getScissorTest=function(){return Pe},this.setScissorTest=function(T){de.setScissorTest(Pe=T)},this.setOpaqueSort=function(T){D=T},this.setTransparentSort=function(T){J=T},this.getClearColor=function(T){return T.copy(He.getClearColor())},this.setClearColor=function(){He.setClearColor.apply(He,arguments)},this.getClearAlpha=function(){return He.getClearAlpha()},this.setClearAlpha=function(){He.setClearAlpha.apply(He,arguments)},this.clear=function(T=!0,k=!0,B=!0){let H=0;if(T){let F=!1;if(C!==null){const fe=C.texture.format;F=fe===rg||fe===ig||fe===ng}if(F){const fe=C.texture.type,Se=fe===er||fe===_s||fe===il||fe===To||fe===eg||fe===tg,be=He.getClearColor(),De=He.getClearAlpha(),Oe=be.r,Be=be.g,Ne=be.b;Se?(p[0]=Oe,p[1]=Be,p[2]=Ne,p[3]=De,A.clearBufferuiv(A.COLOR,0,p)):(g[0]=Oe,g[1]=Be,g[2]=Ne,g[3]=De,A.clearBufferiv(A.COLOR,0,g))}else H|=A.COLOR_BUFFER_BIT}k&&(H|=A.DEPTH_BUFFER_BIT,A.clearDepth(this.capabilities.reverseDepthBuffer?0:1)),B&&(H|=A.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),A.clear(H)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){n.removeEventListener("webglcontextlost",ie,!1),n.removeEventListener("webglcontextrestored",ye,!1),n.removeEventListener("webglcontextcreationerror",Ee,!1),me.dispose(),ze.dispose(),xe.dispose(),x.dispose(),I.dispose(),W.dispose(),ct.dispose(),N.dispose(),Ae.dispose(),Y.dispose(),Y.removeEventListener("sessionstart",gg),Y.removeEventListener("sessionend",vg),Gr.stop()};function ie(T){T.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),E=!0}function ye(){console.log("THREE.WebGLRenderer: Context Restored."),E=!1;const T=Ie.autoReset,k=we.enabled,B=we.autoUpdate,H=we.needsUpdate,F=we.type;Me(),Ie.autoReset=T,we.enabled=k,we.autoUpdate=B,we.needsUpdate=H,we.type=F}function Ee(T){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function et(T){const k=T.target;k.removeEventListener("dispose",et),Lt(k)}function Lt(T){gn(T),xe.remove(T)}function gn(T){const k=xe.get(T).programs;k!==void 0&&(k.forEach(function(B){Ae.releaseProgram(B)}),T.isShaderMaterial&&Ae.releaseShaderCache(T))}this.renderBufferDirect=function(T,k,B,H,F,fe){k===null&&(k=Fe);const Se=F.isMesh&&F.matrixWorld.determinant()<0,be=nM(T,k,B,H,F);de.setMaterial(H,Se);let De=B.index,Oe=1;if(H.wireframe===!0){if(De=G.getWireframeAttribute(B),De===void 0)return;Oe=2}const Be=B.drawRange,Ne=B.attributes.position;let at=Be.start*Oe,pt=(Be.start+Be.count)*Oe;fe!==null&&(at=Math.max(at,fe.start*Oe),pt=Math.min(pt,(fe.start+fe.count)*Oe)),De!==null?(at=Math.max(at,0),pt=Math.min(pt,De.count)):Ne!=null&&(at=Math.max(at,0),pt=Math.min(pt,Ne.count));const Tt=pt-at;if(Tt<0||Tt===1/0)return;ct.setup(F,H,be,B,De);let An,rt=Re;if(De!==null&&(An=V.get(De),rt=Qe,rt.setIndex(An)),F.isMesh)H.wireframe===!0?(de.setLineWidth(H.wireframeLinewidth*q()),rt.setMode(A.LINES)):rt.setMode(A.TRIANGLES);else if(F.isLine){let Ue=H.linewidth;Ue===void 0&&(Ue=1),de.setLineWidth(Ue*q()),F.isLineSegments?rt.setMode(A.LINES):F.isLineLoop?rt.setMode(A.LINE_LOOP):rt.setMode(A.LINE_STRIP)}else F.isPoints?rt.setMode(A.POINTS):F.isSprite&&rt.setMode(A.TRIANGLES);if(F.isBatchedMesh)if(F._multiDrawInstances!==null)rt.renderMultiDrawInstances(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount,F._multiDrawInstances);else if(le.get("WEBGL_multi_draw"))rt.renderMultiDraw(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount);else{const Ue=F._multiDrawStarts,Wt=F._multiDrawCounts,st=F._multiDrawCount,ni=De?V.get(De).bytesPerElement:1,Es=xe.get(H).currentProgram.getUniforms();for(let Rn=0;Rn<st;Rn++)Es.setValue(A,"_gl_DrawID",Rn),rt.render(Ue[Rn]/ni,Wt[Rn])}else if(F.isInstancedMesh)rt.renderInstances(at,Tt,F.count);else if(B.isInstancedBufferGeometry){const Ue=B._maxInstanceCount!==void 0?B._maxInstanceCount:1/0,Wt=Math.min(B.instanceCount,Ue);rt.renderInstances(at,Tt,Wt)}else rt.render(at,Tt)};function it(T,k,B){T.transparent===!0&&T.side===zi&&T.forceSinglePass===!1?(T.side=cn,T.needsUpdate=!0,xl(T,k,B),T.side=Ur,T.needsUpdate=!0,xl(T,k,B),T.side=zi):xl(T,k,B)}this.compile=function(T,k,B=null){B===null&&(B=T),m=ze.get(B),m.init(k),_.push(m),B.traverseVisible(function(F){F.isLight&&F.layers.test(k.layers)&&(m.pushLight(F),F.castShadow&&m.pushShadow(F))}),T!==B&&T.traverseVisible(function(F){F.isLight&&F.layers.test(k.layers)&&(m.pushLight(F),F.castShadow&&m.pushShadow(F))}),m.setupLights();const H=new Set;return T.traverse(function(F){if(!(F.isMesh||F.isPoints||F.isLine||F.isSprite))return;const fe=F.material;if(fe)if(Array.isArray(fe))for(let Se=0;Se<fe.length;Se++){const be=fe[Se];it(be,B,F),H.add(be)}else it(fe,B,F),H.add(fe)}),_.pop(),m=null,H},this.compileAsync=function(T,k,B=null){const H=this.compile(T,k,B);return new Promise(F=>{function fe(){if(H.forEach(function(Se){xe.get(Se).currentProgram.isReady()&&H.delete(Se)}),H.size===0){F(T);return}setTimeout(fe,10)}le.get("KHR_parallel_shader_compile")!==null?fe():setTimeout(fe,10)})};let vn=null;function bi(T){vn&&vn(T)}function gg(){Gr.stop()}function vg(){Gr.start()}const Gr=new R1;Gr.setAnimationLoop(bi),typeof self<"u"&&Gr.setContext(self),this.setAnimationLoop=function(T){vn=T,Y.setAnimationLoop(T),T===null?Gr.stop():Gr.start()},Y.addEventListener("sessionstart",gg),Y.addEventListener("sessionend",vg),this.render=function(T,k){if(k!==void 0&&k.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(E===!0)return;if(T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),k.parent===null&&k.matrixWorldAutoUpdate===!0&&k.updateMatrixWorld(),Y.enabled===!0&&Y.isPresenting===!0&&(Y.cameraAutoUpdate===!0&&Y.updateCamera(k),k=Y.getCamera()),T.isScene===!0&&T.onBeforeRender(v,T,k,C),m=ze.get(T,_.length),m.init(k),_.push(m),se.multiplyMatrices(k.projectionMatrix,k.matrixWorldInverse),Ge.setFromProjectionMatrix(se),Z=this.localClippingEnabled,U=ue.init(this.clippingPlanes,Z),S=me.get(T,h.length),S.init(),h.push(S),Y.enabled===!0&&Y.isPresenting===!0){const fe=v.xr.getDepthSensingMesh();fe!==null&&df(fe,k,-1/0,v.sortObjects)}df(T,k,0,v.sortObjects),S.finish(),v.sortObjects===!0&&S.sort(D,J),Xe=Y.enabled===!1||Y.isPresenting===!1||Y.hasDepthSensing()===!1,Xe&&He.addToRenderList(S,T),this.info.render.frame++,U===!0&&ue.beginShadows();const B=m.state.shadowsArray;we.render(B,T,k),U===!0&&ue.endShadows(),this.info.autoReset===!0&&this.info.reset();const H=S.opaque,F=S.transmissive;if(m.setupLights(),k.isArrayCamera){const fe=k.cameras;if(F.length>0)for(let Se=0,be=fe.length;Se<be;Se++){const De=fe[Se];xg(H,F,T,De)}Xe&&He.render(T);for(let Se=0,be=fe.length;Se<be;Se++){const De=fe[Se];_g(S,T,De,De.viewport)}}else F.length>0&&xg(H,F,T,k),Xe&&He.render(T),_g(S,T,k);C!==null&&(M.updateMultisampleRenderTarget(C),M.updateRenderTargetMipmap(C)),T.isScene===!0&&T.onAfterRender(v,T,k),ct.resetDefaultState(),P=-1,Q=null,_.pop(),_.length>0?(m=_[_.length-1],U===!0&&ue.setGlobalState(v.clippingPlanes,m.state.camera)):m=null,h.pop(),h.length>0?S=h[h.length-1]:S=null};function df(T,k,B,H){if(T.visible===!1)return;if(T.layers.test(k.layers)){if(T.isGroup)B=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(k);else if(T.isLight)m.pushLight(T),T.castShadow&&m.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||Ge.intersectsSprite(T)){H&&Ce.setFromMatrixPosition(T.matrixWorld).applyMatrix4(se);const Se=W.update(T),be=T.material;be.visible&&S.push(T,Se,be,B,Ce.z,null)}}else if((T.isMesh||T.isLine||T.isPoints)&&(!T.frustumCulled||Ge.intersectsObject(T))){const Se=W.update(T),be=T.material;if(H&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),Ce.copy(T.boundingSphere.center)):(Se.boundingSphere===null&&Se.computeBoundingSphere(),Ce.copy(Se.boundingSphere.center)),Ce.applyMatrix4(T.matrixWorld).applyMatrix4(se)),Array.isArray(be)){const De=Se.groups;for(let Oe=0,Be=De.length;Oe<Be;Oe++){const Ne=De[Oe],at=be[Ne.materialIndex];at&&at.visible&&S.push(T,Se,at,B,Ce.z,Ne)}}else be.visible&&S.push(T,Se,be,B,Ce.z,null)}}const fe=T.children;for(let Se=0,be=fe.length;Se<be;Se++)df(fe[Se],k,B,H)}function _g(T,k,B,H){const F=T.opaque,fe=T.transmissive,Se=T.transparent;m.setupLightsView(B),U===!0&&ue.setGlobalState(v.clippingPlanes,B),H&&de.viewport(y.copy(H)),F.length>0&&_l(F,k,B),fe.length>0&&_l(fe,k,B),Se.length>0&&_l(Se,k,B),de.buffers.depth.setTest(!0),de.buffers.depth.setMask(!0),de.buffers.color.setMask(!0),de.setPolygonOffset(!1)}function xg(T,k,B,H){if((B.isScene===!0?B.overrideMaterial:null)!==null)return;m.state.transmissionRenderTarget[H.id]===void 0&&(m.state.transmissionRenderTarget[H.id]=new xs(1,1,{generateMipmaps:!0,type:le.has("EXT_color_buffer_half_float")||le.has("EXT_color_buffer_float")?pl:er,minFilter:Sr,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:ot.workingColorSpace}));const fe=m.state.transmissionRenderTarget[H.id],Se=H.viewport||y;fe.setSize(Se.z,Se.w);const be=v.getRenderTarget();v.setRenderTarget(fe),v.getClearColor(O),j=v.getClearAlpha(),j<1&&v.setClearColor(16777215,.5),v.clear(),Xe&&He.render(B);const De=v.toneMapping;v.toneMapping=Dr;const Oe=H.viewport;if(H.viewport!==void 0&&(H.viewport=void 0),m.setupLightsView(H),U===!0&&ue.setGlobalState(v.clippingPlanes,H),_l(T,B,H),M.updateMultisampleRenderTarget(fe),M.updateRenderTargetMipmap(fe),le.has("WEBGL_multisampled_render_to_texture")===!1){let Be=!1;for(let Ne=0,at=k.length;Ne<at;Ne++){const pt=k[Ne],Tt=pt.object,An=pt.geometry,rt=pt.material,Ue=pt.group;if(rt.side===zi&&Tt.layers.test(H.layers)){const Wt=rt.side;rt.side=cn,rt.needsUpdate=!0,yg(Tt,B,H,An,rt,Ue),rt.side=Wt,rt.needsUpdate=!0,Be=!0}}Be===!0&&(M.updateMultisampleRenderTarget(fe),M.updateRenderTargetMipmap(fe))}v.setRenderTarget(be),v.setClearColor(O,j),Oe!==void 0&&(H.viewport=Oe),v.toneMapping=De}function _l(T,k,B){const H=k.isScene===!0?k.overrideMaterial:null;for(let F=0,fe=T.length;F<fe;F++){const Se=T[F],be=Se.object,De=Se.geometry,Oe=H===null?Se.material:H,Be=Se.group;be.layers.test(B.layers)&&yg(be,k,B,De,Oe,Be)}}function yg(T,k,B,H,F,fe){T.onBeforeRender(v,k,B,H,F,fe),T.modelViewMatrix.multiplyMatrices(B.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),F.onBeforeRender(v,k,B,H,T,fe),F.transparent===!0&&F.side===zi&&F.forceSinglePass===!1?(F.side=cn,F.needsUpdate=!0,v.renderBufferDirect(B,k,H,F,T,fe),F.side=Ur,F.needsUpdate=!0,v.renderBufferDirect(B,k,H,F,T,fe),F.side=zi):v.renderBufferDirect(B,k,H,F,T,fe),T.onAfterRender(v,k,B,H,F,fe)}function xl(T,k,B){k.isScene!==!0&&(k=Fe);const H=xe.get(T),F=m.state.lights,fe=m.state.shadowsArray,Se=F.state.version,be=Ae.getParameters(T,F.state,fe,k,B),De=Ae.getProgramCacheKey(be);let Oe=H.programs;H.environment=T.isMeshStandardMaterial?k.environment:null,H.fog=k.fog,H.envMap=(T.isMeshStandardMaterial?I:x).get(T.envMap||H.environment),H.envMapRotation=H.environment!==null&&T.envMap===null?k.environmentRotation:T.envMapRotation,Oe===void 0&&(T.addEventListener("dispose",et),Oe=new Map,H.programs=Oe);let Be=Oe.get(De);if(Be!==void 0){if(H.currentProgram===Be&&H.lightsStateVersion===Se)return Mg(T,be),Be}else be.uniforms=Ae.getUniforms(T),T.onBeforeCompile(be,v),Be=Ae.acquireProgram(be,De),Oe.set(De,Be),H.uniforms=be.uniforms;const Ne=H.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(Ne.clippingPlanes=ue.uniform),Mg(T,be),H.needsLights=rM(T),H.lightsStateVersion=Se,H.needsLights&&(Ne.ambientLightColor.value=F.state.ambient,Ne.lightProbe.value=F.state.probe,Ne.directionalLights.value=F.state.directional,Ne.directionalLightShadows.value=F.state.directionalShadow,Ne.spotLights.value=F.state.spot,Ne.spotLightShadows.value=F.state.spotShadow,Ne.rectAreaLights.value=F.state.rectArea,Ne.ltc_1.value=F.state.rectAreaLTC1,Ne.ltc_2.value=F.state.rectAreaLTC2,Ne.pointLights.value=F.state.point,Ne.pointLightShadows.value=F.state.pointShadow,Ne.hemisphereLights.value=F.state.hemi,Ne.directionalShadowMap.value=F.state.directionalShadowMap,Ne.directionalShadowMatrix.value=F.state.directionalShadowMatrix,Ne.spotShadowMap.value=F.state.spotShadowMap,Ne.spotLightMatrix.value=F.state.spotLightMatrix,Ne.spotLightMap.value=F.state.spotLightMap,Ne.pointShadowMap.value=F.state.pointShadowMap,Ne.pointShadowMatrix.value=F.state.pointShadowMatrix),H.currentProgram=Be,H.uniformsList=null,Be}function Sg(T){if(T.uniformsList===null){const k=T.currentProgram.getUniforms();T.uniformsList=Wu.seqWithValue(k.seq,T.uniforms)}return T.uniformsList}function Mg(T,k){const B=xe.get(T);B.outputColorSpace=k.outputColorSpace,B.batching=k.batching,B.batchingColor=k.batchingColor,B.instancing=k.instancing,B.instancingColor=k.instancingColor,B.instancingMorph=k.instancingMorph,B.skinning=k.skinning,B.morphTargets=k.morphTargets,B.morphNormals=k.morphNormals,B.morphColors=k.morphColors,B.morphTargetsCount=k.morphTargetsCount,B.numClippingPlanes=k.numClippingPlanes,B.numIntersection=k.numClipIntersection,B.vertexAlphas=k.vertexAlphas,B.vertexTangents=k.vertexTangents,B.toneMapping=k.toneMapping}function nM(T,k,B,H,F){k.isScene!==!0&&(k=Fe),M.resetTextureUnits();const fe=k.fog,Se=H.isMeshStandardMaterial?k.environment:null,be=C===null?v.outputColorSpace:C.isXRRenderTarget===!0?C.texture.colorSpace:zr,De=(H.isMeshStandardMaterial?I:x).get(H.envMap||Se),Oe=H.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,Be=!!B.attributes.tangent&&(!!H.normalMap||H.anisotropy>0),Ne=!!B.morphAttributes.position,at=!!B.morphAttributes.normal,pt=!!B.morphAttributes.color;let Tt=Dr;H.toneMapped&&(C===null||C.isXRRenderTarget===!0)&&(Tt=v.toneMapping);const An=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,rt=An!==void 0?An.length:0,Ue=xe.get(H),Wt=m.state.lights;if(U===!0&&(Z===!0||T!==Q)){const Wn=T===Q&&H.id===P;ue.setState(H,T,Wn)}let st=!1;H.version===Ue.__version?(Ue.needsLights&&Ue.lightsStateVersion!==Wt.state.version||Ue.outputColorSpace!==be||F.isBatchedMesh&&Ue.batching===!1||!F.isBatchedMesh&&Ue.batching===!0||F.isBatchedMesh&&Ue.batchingColor===!0&&F.colorTexture===null||F.isBatchedMesh&&Ue.batchingColor===!1&&F.colorTexture!==null||F.isInstancedMesh&&Ue.instancing===!1||!F.isInstancedMesh&&Ue.instancing===!0||F.isSkinnedMesh&&Ue.skinning===!1||!F.isSkinnedMesh&&Ue.skinning===!0||F.isInstancedMesh&&Ue.instancingColor===!0&&F.instanceColor===null||F.isInstancedMesh&&Ue.instancingColor===!1&&F.instanceColor!==null||F.isInstancedMesh&&Ue.instancingMorph===!0&&F.morphTexture===null||F.isInstancedMesh&&Ue.instancingMorph===!1&&F.morphTexture!==null||Ue.envMap!==De||H.fog===!0&&Ue.fog!==fe||Ue.numClippingPlanes!==void 0&&(Ue.numClippingPlanes!==ue.numPlanes||Ue.numIntersection!==ue.numIntersection)||Ue.vertexAlphas!==Oe||Ue.vertexTangents!==Be||Ue.morphTargets!==Ne||Ue.morphNormals!==at||Ue.morphColors!==pt||Ue.toneMapping!==Tt||Ue.morphTargetsCount!==rt)&&(st=!0):(st=!0,Ue.__version=H.version);let ni=Ue.currentProgram;st===!0&&(ni=xl(H,k,F));let Es=!1,Rn=!1,hf=!1;const At=ni.getUniforms(),nr=Ue.uniforms;if(de.useProgram(ni.program)&&(Es=!0,Rn=!0,hf=!0),H.id!==P&&(P=H.id,Rn=!0),Es||Q!==T){oe.reverseDepthBuffer?(te.copy(T.projectionMatrix),jA(te),YA(te),At.setValue(A,"projectionMatrix",te)):At.setValue(A,"projectionMatrix",T.projectionMatrix),At.setValue(A,"viewMatrix",T.matrixWorldInverse);const Wn=At.map.cameraPosition;Wn!==void 0&&Wn.setValue(A,_e.setFromMatrixPosition(T.matrixWorld)),oe.logarithmicDepthBuffer&&At.setValue(A,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(H.isMeshPhongMaterial||H.isMeshToonMaterial||H.isMeshLambertMaterial||H.isMeshBasicMaterial||H.isMeshStandardMaterial||H.isShaderMaterial)&&At.setValue(A,"isOrthographic",T.isOrthographicCamera===!0),Q!==T&&(Q=T,Rn=!0,hf=!0)}if(F.isSkinnedMesh){At.setOptional(A,F,"bindMatrix"),At.setOptional(A,F,"bindMatrixInverse");const Wn=F.skeleton;Wn&&(Wn.boneTexture===null&&Wn.computeBoneTexture(),At.setValue(A,"boneTexture",Wn.boneTexture,M))}F.isBatchedMesh&&(At.setOptional(A,F,"batchingTexture"),At.setValue(A,"batchingTexture",F._matricesTexture,M),At.setOptional(A,F,"batchingIdTexture"),At.setValue(A,"batchingIdTexture",F._indirectTexture,M),At.setOptional(A,F,"batchingColorTexture"),F._colorsTexture!==null&&At.setValue(A,"batchingColorTexture",F._colorsTexture,M));const pf=B.morphAttributes;if((pf.position!==void 0||pf.normal!==void 0||pf.color!==void 0)&&Ve.update(F,B,ni),(Rn||Ue.receiveShadow!==F.receiveShadow)&&(Ue.receiveShadow=F.receiveShadow,At.setValue(A,"receiveShadow",F.receiveShadow)),H.isMeshGouraudMaterial&&H.envMap!==null&&(nr.envMap.value=De,nr.flipEnvMap.value=De.isCubeTexture&&De.isRenderTargetTexture===!1?-1:1),H.isMeshStandardMaterial&&H.envMap===null&&k.environment!==null&&(nr.envMapIntensity.value=k.environmentIntensity),Rn&&(At.setValue(A,"toneMappingExposure",v.toneMappingExposure),Ue.needsLights&&iM(nr,hf),fe&&H.fog===!0&&he.refreshFogUniforms(nr,fe),he.refreshMaterialUniforms(nr,H,ne,z,m.state.transmissionRenderTarget[T.id]),Wu.upload(A,Sg(Ue),nr,M)),H.isShaderMaterial&&H.uniformsNeedUpdate===!0&&(Wu.upload(A,Sg(Ue),nr,M),H.uniformsNeedUpdate=!1),H.isSpriteMaterial&&At.setValue(A,"center",F.center),At.setValue(A,"modelViewMatrix",F.modelViewMatrix),At.setValue(A,"normalMatrix",F.normalMatrix),At.setValue(A,"modelMatrix",F.matrixWorld),H.isShaderMaterial||H.isRawShaderMaterial){const Wn=H.uniformsGroups;for(let mf=0,sM=Wn.length;mf<sM;mf++){const Eg=Wn[mf];N.update(Eg,ni),N.bind(Eg,ni)}}return ni}function iM(T,k){T.ambientLightColor.needsUpdate=k,T.lightProbe.needsUpdate=k,T.directionalLights.needsUpdate=k,T.directionalLightShadows.needsUpdate=k,T.pointLights.needsUpdate=k,T.pointLightShadows.needsUpdate=k,T.spotLights.needsUpdate=k,T.spotLightShadows.needsUpdate=k,T.rectAreaLights.needsUpdate=k,T.hemisphereLights.needsUpdate=k}function rM(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return b},this.getActiveMipmapLevel=function(){return R},this.getRenderTarget=function(){return C},this.setRenderTargetTextures=function(T,k,B){xe.get(T.texture).__webglTexture=k,xe.get(T.depthTexture).__webglTexture=B;const H=xe.get(T);H.__hasExternalTextures=!0,H.__autoAllocateDepthBuffer=B===void 0,H.__autoAllocateDepthBuffer||le.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),H.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(T,k){const B=xe.get(T);B.__webglFramebuffer=k,B.__useDefaultFramebuffer=k===void 0},this.setRenderTarget=function(T,k=0,B=0){C=T,b=k,R=B;let H=!0,F=null,fe=!1,Se=!1;if(T){const De=xe.get(T);if(De.__useDefaultFramebuffer!==void 0)de.bindFramebuffer(A.FRAMEBUFFER,null),H=!1;else if(De.__webglFramebuffer===void 0)M.setupRenderTarget(T);else if(De.__hasExternalTextures)M.rebindTextures(T,xe.get(T.texture).__webglTexture,xe.get(T.depthTexture).__webglTexture);else if(T.depthBuffer){const Ne=T.depthTexture;if(De.__boundDepthTexture!==Ne){if(Ne!==null&&xe.has(Ne)&&(T.width!==Ne.image.width||T.height!==Ne.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");M.setupDepthRenderbuffer(T)}}const Oe=T.texture;(Oe.isData3DTexture||Oe.isDataArrayTexture||Oe.isCompressedArrayTexture)&&(Se=!0);const Be=xe.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(Be[k])?F=Be[k][B]:F=Be[k],fe=!0):T.samples>0&&M.useMultisampledRTT(T)===!1?F=xe.get(T).__webglMultisampledFramebuffer:Array.isArray(Be)?F=Be[B]:F=Be,y.copy(T.viewport),w.copy(T.scissor),$=T.scissorTest}else y.copy(ee).multiplyScalar(ne).floor(),w.copy(re).multiplyScalar(ne).floor(),$=Pe;if(de.bindFramebuffer(A.FRAMEBUFFER,F)&&H&&de.drawBuffers(T,F),de.viewport(y),de.scissor(w),de.setScissorTest($),fe){const De=xe.get(T.texture);A.framebufferTexture2D(A.FRAMEBUFFER,A.COLOR_ATTACHMENT0,A.TEXTURE_CUBE_MAP_POSITIVE_X+k,De.__webglTexture,B)}else if(Se){const De=xe.get(T.texture),Oe=k||0;A.framebufferTextureLayer(A.FRAMEBUFFER,A.COLOR_ATTACHMENT0,De.__webglTexture,B||0,Oe)}P=-1},this.readRenderTargetPixels=function(T,k,B,H,F,fe,Se){if(!(T&&T.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let be=xe.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&Se!==void 0&&(be=be[Se]),be){de.bindFramebuffer(A.FRAMEBUFFER,be);try{const De=T.texture,Oe=De.format,Be=De.type;if(!oe.textureFormatReadable(Oe)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!oe.textureTypeReadable(Be)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}k>=0&&k<=T.width-H&&B>=0&&B<=T.height-F&&A.readPixels(k,B,H,F,We.convert(Oe),We.convert(Be),fe)}finally{const De=C!==null?xe.get(C).__webglFramebuffer:null;de.bindFramebuffer(A.FRAMEBUFFER,De)}}},this.readRenderTargetPixelsAsync=async function(T,k,B,H,F,fe,Se){if(!(T&&T.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let be=xe.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&Se!==void 0&&(be=be[Se]),be){const De=T.texture,Oe=De.format,Be=De.type;if(!oe.textureFormatReadable(Oe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!oe.textureTypeReadable(Be))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(k>=0&&k<=T.width-H&&B>=0&&B<=T.height-F){de.bindFramebuffer(A.FRAMEBUFFER,be);const Ne=A.createBuffer();A.bindBuffer(A.PIXEL_PACK_BUFFER,Ne),A.bufferData(A.PIXEL_PACK_BUFFER,fe.byteLength,A.STREAM_READ),A.readPixels(k,B,H,F,We.convert(Oe),We.convert(Be),0);const at=C!==null?xe.get(C).__webglFramebuffer:null;de.bindFramebuffer(A.FRAMEBUFFER,at);const pt=A.fenceSync(A.SYNC_GPU_COMMANDS_COMPLETE,0);return A.flush(),await XA(A,pt,4),A.bindBuffer(A.PIXEL_PACK_BUFFER,Ne),A.getBufferSubData(A.PIXEL_PACK_BUFFER,0,fe),A.deleteBuffer(Ne),A.deleteSync(pt),fe}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(T,k=null,B=0){T.isTexture!==!0&&(Gu("WebGLRenderer: copyFramebufferToTexture function signature has changed."),k=arguments[0]||null,T=arguments[1]);const H=Math.pow(2,-B),F=Math.floor(T.image.width*H),fe=Math.floor(T.image.height*H),Se=k!==null?k.x:0,be=k!==null?k.y:0;M.setTexture2D(T,0),A.copyTexSubImage2D(A.TEXTURE_2D,B,0,0,Se,be,F,fe),de.unbindTexture()},this.copyTextureToTexture=function(T,k,B=null,H=null,F=0){T.isTexture!==!0&&(Gu("WebGLRenderer: copyTextureToTexture function signature has changed."),H=arguments[0]||null,T=arguments[1],k=arguments[2],F=arguments[3]||0,B=null);let fe,Se,be,De,Oe,Be;B!==null?(fe=B.max.x-B.min.x,Se=B.max.y-B.min.y,be=B.min.x,De=B.min.y):(fe=T.image.width,Se=T.image.height,be=0,De=0),H!==null?(Oe=H.x,Be=H.y):(Oe=0,Be=0);const Ne=We.convert(k.format),at=We.convert(k.type);M.setTexture2D(k,0),A.pixelStorei(A.UNPACK_FLIP_Y_WEBGL,k.flipY),A.pixelStorei(A.UNPACK_PREMULTIPLY_ALPHA_WEBGL,k.premultiplyAlpha),A.pixelStorei(A.UNPACK_ALIGNMENT,k.unpackAlignment);const pt=A.getParameter(A.UNPACK_ROW_LENGTH),Tt=A.getParameter(A.UNPACK_IMAGE_HEIGHT),An=A.getParameter(A.UNPACK_SKIP_PIXELS),rt=A.getParameter(A.UNPACK_SKIP_ROWS),Ue=A.getParameter(A.UNPACK_SKIP_IMAGES),Wt=T.isCompressedTexture?T.mipmaps[F]:T.image;A.pixelStorei(A.UNPACK_ROW_LENGTH,Wt.width),A.pixelStorei(A.UNPACK_IMAGE_HEIGHT,Wt.height),A.pixelStorei(A.UNPACK_SKIP_PIXELS,be),A.pixelStorei(A.UNPACK_SKIP_ROWS,De),T.isDataTexture?A.texSubImage2D(A.TEXTURE_2D,F,Oe,Be,fe,Se,Ne,at,Wt.data):T.isCompressedTexture?A.compressedTexSubImage2D(A.TEXTURE_2D,F,Oe,Be,Wt.width,Wt.height,Ne,Wt.data):A.texSubImage2D(A.TEXTURE_2D,F,Oe,Be,fe,Se,Ne,at,Wt),A.pixelStorei(A.UNPACK_ROW_LENGTH,pt),A.pixelStorei(A.UNPACK_IMAGE_HEIGHT,Tt),A.pixelStorei(A.UNPACK_SKIP_PIXELS,An),A.pixelStorei(A.UNPACK_SKIP_ROWS,rt),A.pixelStorei(A.UNPACK_SKIP_IMAGES,Ue),F===0&&k.generateMipmaps&&A.generateMipmap(A.TEXTURE_2D),de.unbindTexture()},this.copyTextureToTexture3D=function(T,k,B=null,H=null,F=0){T.isTexture!==!0&&(Gu("WebGLRenderer: copyTextureToTexture3D function signature has changed."),B=arguments[0]||null,H=arguments[1]||null,T=arguments[2],k=arguments[3],F=arguments[4]||0);let fe,Se,be,De,Oe,Be,Ne,at,pt;const Tt=T.isCompressedTexture?T.mipmaps[F]:T.image;B!==null?(fe=B.max.x-B.min.x,Se=B.max.y-B.min.y,be=B.max.z-B.min.z,De=B.min.x,Oe=B.min.y,Be=B.min.z):(fe=Tt.width,Se=Tt.height,be=Tt.depth,De=0,Oe=0,Be=0),H!==null?(Ne=H.x,at=H.y,pt=H.z):(Ne=0,at=0,pt=0);const An=We.convert(k.format),rt=We.convert(k.type);let Ue;if(k.isData3DTexture)M.setTexture3D(k,0),Ue=A.TEXTURE_3D;else if(k.isDataArrayTexture||k.isCompressedArrayTexture)M.setTexture2DArray(k,0),Ue=A.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}A.pixelStorei(A.UNPACK_FLIP_Y_WEBGL,k.flipY),A.pixelStorei(A.UNPACK_PREMULTIPLY_ALPHA_WEBGL,k.premultiplyAlpha),A.pixelStorei(A.UNPACK_ALIGNMENT,k.unpackAlignment);const Wt=A.getParameter(A.UNPACK_ROW_LENGTH),st=A.getParameter(A.UNPACK_IMAGE_HEIGHT),ni=A.getParameter(A.UNPACK_SKIP_PIXELS),Es=A.getParameter(A.UNPACK_SKIP_ROWS),Rn=A.getParameter(A.UNPACK_SKIP_IMAGES);A.pixelStorei(A.UNPACK_ROW_LENGTH,Tt.width),A.pixelStorei(A.UNPACK_IMAGE_HEIGHT,Tt.height),A.pixelStorei(A.UNPACK_SKIP_PIXELS,De),A.pixelStorei(A.UNPACK_SKIP_ROWS,Oe),A.pixelStorei(A.UNPACK_SKIP_IMAGES,Be),T.isDataTexture||T.isData3DTexture?A.texSubImage3D(Ue,F,Ne,at,pt,fe,Se,be,An,rt,Tt.data):k.isCompressedArrayTexture?A.compressedTexSubImage3D(Ue,F,Ne,at,pt,fe,Se,be,An,Tt.data):A.texSubImage3D(Ue,F,Ne,at,pt,fe,Se,be,An,rt,Tt),A.pixelStorei(A.UNPACK_ROW_LENGTH,Wt),A.pixelStorei(A.UNPACK_IMAGE_HEIGHT,st),A.pixelStorei(A.UNPACK_SKIP_PIXELS,ni),A.pixelStorei(A.UNPACK_SKIP_ROWS,Es),A.pixelStorei(A.UNPACK_SKIP_IMAGES,Rn),F===0&&k.generateMipmaps&&A.generateMipmap(Ue),de.unbindTexture()},this.initRenderTarget=function(T){xe.get(T).__webglFramebuffer===void 0&&M.setupRenderTarget(T)},this.initTexture=function(T){T.isCubeTexture?M.setTextureCube(T,0):T.isData3DTexture?M.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?M.setTexture2DArray(T,0):M.setTexture2D(T,0),de.unbindTexture()},this.resetState=function(){b=0,R=0,C=null,de.reset(),ct.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Wi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const n=this.getContext();n.drawingBufferColorSpace=e===sg?"display-p3":"srgb",n.unpackColorSpace=ot.workingColorSpace===af?"display-p3":"srgb"}}class U1 extends kt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Ai,this.environmentIntensity=1,this.environmentRotation=new Ai,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,n){return super.copy(e,n),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const n=super.toJSON(e);return this.fog!==null&&(n.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(n.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(n.object.backgroundIntensity=this.backgroundIntensity),n.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(n.object.environmentIntensity=this.environmentIntensity),n.object.environmentRotation=this.environmentRotation.toArray(),n}}class Bo extends fn{constructor(e,n,i,r,s,o,a,l,u){super(e,n,i,r,s,o,a,l,u),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Pi{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(e,n){const i=this.getUtoTmapping(e);return this.getPoint(i,n)}getPoints(e=5){const n=[];for(let i=0;i<=e;i++)n.push(this.getPoint(i/e));return n}getSpacedPoints(e=5){const n=[];for(let i=0;i<=e;i++)n.push(this.getPointAt(i/e));return n}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const n=[];let i,r=this.getPoint(0),s=0;n.push(0);for(let o=1;o<=e;o++)i=this.getPoint(o/e),s+=i.distanceTo(r),n.push(s),r=i;return this.cacheArcLengths=n,n}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,n){const i=this.getLengths();let r=0;const s=i.length;let o;n?o=n:o=e*i[s-1];let a=0,l=s-1,u;for(;a<=l;)if(r=Math.floor(a+(l-a)/2),u=i[r]-o,u<0)a=r+1;else if(u>0)l=r-1;else{l=r;break}if(r=l,i[r]===o)return r/(s-1);const c=i[r],d=i[r+1]-c,p=(o-c)/d;return(r+p)/(s-1)}getTangent(e,n){let r=e-1e-4,s=e+1e-4;r<0&&(r=0),s>1&&(s=1);const o=this.getPoint(r),a=this.getPoint(s),l=n||(o.isVector2?new ge:new L);return l.copy(a).sub(o).normalize(),l}getTangentAt(e,n){const i=this.getUtoTmapping(e);return this.getTangent(i,n)}computeFrenetFrames(e,n){const i=new L,r=[],s=[],o=[],a=new L,l=new yt;for(let p=0;p<=e;p++){const g=p/e;r[p]=this.getTangentAt(g,new L)}s[0]=new L,o[0]=new L;let u=Number.MAX_VALUE;const c=Math.abs(r[0].x),f=Math.abs(r[0].y),d=Math.abs(r[0].z);c<=u&&(u=c,i.set(1,0,0)),f<=u&&(u=f,i.set(0,1,0)),d<=u&&i.set(0,0,1),a.crossVectors(r[0],i).normalize(),s[0].crossVectors(r[0],a),o[0].crossVectors(r[0],s[0]);for(let p=1;p<=e;p++){if(s[p]=s[p-1].clone(),o[p]=o[p-1].clone(),a.crossVectors(r[p-1],r[p]),a.length()>Number.EPSILON){a.normalize();const g=Math.acos(nn(r[p-1].dot(r[p]),-1,1));s[p].applyMatrix4(l.makeRotationAxis(a,g))}o[p].crossVectors(r[p],s[p])}if(n===!0){let p=Math.acos(nn(s[0].dot(s[e]),-1,1));p/=e,r[0].dot(a.crossVectors(s[0],s[e]))>0&&(p=-p);for(let g=1;g<=e;g++)s[g].applyMatrix4(l.makeRotationAxis(r[g],p*g)),o[g].crossVectors(r[g],s[g])}return{tangents:r,normals:s,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class ug extends Pi{constructor(e=0,n=0,i=1,r=1,s=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=n,this.xRadius=i,this.yRadius=r,this.aStartAngle=s,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(e,n=new ge){const i=n,r=Math.PI*2;let s=this.aEndAngle-this.aStartAngle;const o=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=r;for(;s>r;)s-=r;s<Number.EPSILON&&(o?s=0:s=r),this.aClockwise===!0&&!o&&(s===r?s=-r:s=s-r);const a=this.aStartAngle+e*s;let l=this.aX+this.xRadius*Math.cos(a),u=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const c=Math.cos(this.aRotation),f=Math.sin(this.aRotation),d=l-this.aX,p=u-this.aY;l=d*c-p*f+this.aX,u=d*f+p*c+this.aY}return i.set(l,u)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class oL extends ug{constructor(e,n,i,r,s,o){super(e,n,i,i,r,s,o),this.isArcCurve=!0,this.type="ArcCurve"}}function cg(){let t=0,e=0,n=0,i=0;function r(s,o,a,l){t=s,e=a,n=-3*s+3*o-2*a-l,i=2*s-2*o+a+l}return{initCatmullRom:function(s,o,a,l,u){r(o,a,u*(a-s),u*(l-o))},initNonuniformCatmullRom:function(s,o,a,l,u,c,f){let d=(o-s)/u-(a-s)/(u+c)+(a-o)/c,p=(a-o)/c-(l-o)/(c+f)+(l-a)/f;d*=c,p*=c,r(o,a,d,p)},calc:function(s){const o=s*s,a=o*s;return t+e*s+n*o+i*a}}}const lu=new L,Rd=new cg,Pd=new cg,bd=new cg;class aL extends Pi{constructor(e=[],n=!1,i="centripetal",r=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=n,this.curveType=i,this.tension=r}getPoint(e,n=new L){const i=n,r=this.points,s=r.length,o=(s-(this.closed?0:1))*e;let a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/s)+1)*s:l===0&&a===s-1&&(a=s-2,l=1);let u,c;this.closed||a>0?u=r[(a-1)%s]:(lu.subVectors(r[0],r[1]).add(r[0]),u=lu);const f=r[a%s],d=r[(a+1)%s];if(this.closed||a+2<s?c=r[(a+2)%s]:(lu.subVectors(r[s-1],r[s-2]).add(r[s-1]),c=lu),this.curveType==="centripetal"||this.curveType==="chordal"){const p=this.curveType==="chordal"?.5:.25;let g=Math.pow(u.distanceToSquared(f),p),S=Math.pow(f.distanceToSquared(d),p),m=Math.pow(d.distanceToSquared(c),p);S<1e-4&&(S=1),g<1e-4&&(g=S),m<1e-4&&(m=S),Rd.initNonuniformCatmullRom(u.x,f.x,d.x,c.x,g,S,m),Pd.initNonuniformCatmullRom(u.y,f.y,d.y,c.y,g,S,m),bd.initNonuniformCatmullRom(u.z,f.z,d.z,c.z,g,S,m)}else this.curveType==="catmullrom"&&(Rd.initCatmullRom(u.x,f.x,d.x,c.x,this.tension),Pd.initCatmullRom(u.y,f.y,d.y,c.y,this.tension),bd.initCatmullRom(u.z,f.z,d.z,c.z,this.tension));return i.set(Rd.calc(l),Pd.calc(l),bd.calc(l)),i}copy(e){super.copy(e),this.points=[];for(let n=0,i=e.points.length;n<i;n++){const r=e.points[n];this.points.push(r.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let n=0,i=this.points.length;n<i;n++){const r=this.points[n];e.points.push(r.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let n=0,i=e.points.length;n<i;n++){const r=e.points[n];this.points.push(new L().fromArray(r))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function S_(t,e,n,i,r){const s=(i-e)*.5,o=(r-n)*.5,a=t*t,l=t*a;return(2*n-2*i+s+o)*l+(-3*n+3*i-2*s-o)*a+s*t+n}function lL(t,e){const n=1-t;return n*n*e}function uL(t,e){return 2*(1-t)*t*e}function cL(t,e){return t*t*e}function Ra(t,e,n,i){return lL(t,e)+uL(t,n)+cL(t,i)}function fL(t,e){const n=1-t;return n*n*n*e}function dL(t,e){const n=1-t;return 3*n*n*t*e}function hL(t,e){return 3*(1-t)*t*t*e}function pL(t,e){return t*t*t*e}function Pa(t,e,n,i,r){return fL(t,e)+dL(t,n)+hL(t,i)+pL(t,r)}class k1 extends Pi{constructor(e=new ge,n=new ge,i=new ge,r=new ge){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=n,this.v2=i,this.v3=r}getPoint(e,n=new ge){const i=n,r=this.v0,s=this.v1,o=this.v2,a=this.v3;return i.set(Pa(e,r.x,s.x,o.x,a.x),Pa(e,r.y,s.y,o.y,a.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class mL extends Pi{constructor(e=new L,n=new L,i=new L,r=new L){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=n,this.v2=i,this.v3=r}getPoint(e,n=new L){const i=n,r=this.v0,s=this.v1,o=this.v2,a=this.v3;return i.set(Pa(e,r.x,s.x,o.x,a.x),Pa(e,r.y,s.y,o.y,a.y),Pa(e,r.z,s.z,o.z,a.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class F1 extends Pi{constructor(e=new ge,n=new ge){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=n}getPoint(e,n=new ge){const i=n;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,n){return this.getPoint(e,n)}getTangent(e,n=new ge){return n.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,n){return this.getTangent(e,n)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class gL extends Pi{constructor(e=new L,n=new L){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=n}getPoint(e,n=new L){const i=n;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,n){return this.getPoint(e,n)}getTangent(e,n=new L){return n.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,n){return this.getTangent(e,n)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class O1 extends Pi{constructor(e=new ge,n=new ge,i=new ge){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=n,this.v2=i}getPoint(e,n=new ge){const i=n,r=this.v0,s=this.v1,o=this.v2;return i.set(Ra(e,r.x,s.x,o.x),Ra(e,r.y,s.y,o.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class vL extends Pi{constructor(e=new L,n=new L,i=new L){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=n,this.v2=i}getPoint(e,n=new L){const i=n,r=this.v0,s=this.v1,o=this.v2;return i.set(Ra(e,r.x,s.x,o.x),Ra(e,r.y,s.y,o.y),Ra(e,r.z,s.z,o.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class B1 extends Pi{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,n=new ge){const i=n,r=this.points,s=(r.length-1)*e,o=Math.floor(s),a=s-o,l=r[o===0?o:o-1],u=r[o],c=r[o>r.length-2?r.length-1:o+1],f=r[o>r.length-3?r.length-1:o+2];return i.set(S_(a,l.x,u.x,c.x,f.x),S_(a,l.y,u.y,c.y,f.y)),i}copy(e){super.copy(e),this.points=[];for(let n=0,i=e.points.length;n<i;n++){const r=e.points[n];this.points.push(r.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let n=0,i=this.points.length;n<i;n++){const r=this.points[n];e.points.push(r.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let n=0,i=e.points.length;n<i;n++){const r=e.points[n];this.points.push(new ge().fromArray(r))}return this}}var Ap=Object.freeze({__proto__:null,ArcCurve:oL,CatmullRomCurve3:aL,CubicBezierCurve:k1,CubicBezierCurve3:mL,EllipseCurve:ug,LineCurve:F1,LineCurve3:gL,QuadraticBezierCurve:O1,QuadraticBezierCurve3:vL,SplineCurve:B1});class _L extends Pi{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),n=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(n)){const i=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Ap[i](n,e))}return this}getPoint(e,n){const i=e*this.getLength(),r=this.getCurveLengths();let s=0;for(;s<r.length;){if(r[s]>=i){const o=r[s]-i,a=this.curves[s],l=a.getLength(),u=l===0?0:1-o/l;return a.getPointAt(u,n)}s++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let n=0;for(let i=0,r=this.curves.length;i<r;i++)n+=this.curves[i].getLength(),e.push(n);return this.cacheLengths=e,e}getSpacedPoints(e=40){const n=[];for(let i=0;i<=e;i++)n.push(this.getPoint(i/e));return this.autoClose&&n.push(n[0]),n}getPoints(e=12){const n=[];let i;for(let r=0,s=this.curves;r<s.length;r++){const o=s[r],a=o.isEllipseCurve?e*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?e*o.points.length:e,l=o.getPoints(a);for(let u=0;u<l.length;u++){const c=l[u];i&&i.equals(c)||(n.push(c),i=c)}}return this.autoClose&&n.length>1&&!n[n.length-1].equals(n[0])&&n.push(n[0]),n}copy(e){super.copy(e),this.curves=[];for(let n=0,i=e.curves.length;n<i;n++){const r=e.curves[n];this.curves.push(r.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let n=0,i=this.curves.length;n<i;n++){const r=this.curves[n];e.curves.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let n=0,i=e.curves.length;n<i;n++){const r=e.curves[n];this.curves.push(new Ap[r.type]().fromJSON(r))}return this}}class Nc extends _L{constructor(e){super(),this.type="Path",this.currentPoint=new ge,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let n=1,i=e.length;n<i;n++)this.lineTo(e[n].x,e[n].y);return this}moveTo(e,n){return this.currentPoint.set(e,n),this}lineTo(e,n){const i=new F1(this.currentPoint.clone(),new ge(e,n));return this.curves.push(i),this.currentPoint.set(e,n),this}quadraticCurveTo(e,n,i,r){const s=new O1(this.currentPoint.clone(),new ge(e,n),new ge(i,r));return this.curves.push(s),this.currentPoint.set(i,r),this}bezierCurveTo(e,n,i,r,s,o){const a=new k1(this.currentPoint.clone(),new ge(e,n),new ge(i,r),new ge(s,o));return this.curves.push(a),this.currentPoint.set(s,o),this}splineThru(e){const n=[this.currentPoint.clone()].concat(e),i=new B1(n);return this.curves.push(i),this.currentPoint.copy(e[e.length-1]),this}arc(e,n,i,r,s,o){const a=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+a,n+l,i,r,s,o),this}absarc(e,n,i,r,s,o){return this.absellipse(e,n,i,i,r,s,o),this}ellipse(e,n,i,r,s,o,a,l){const u=this.currentPoint.x,c=this.currentPoint.y;return this.absellipse(e+u,n+c,i,r,s,o,a,l),this}absellipse(e,n,i,r,s,o,a,l){const u=new ug(e,n,i,r,s,o,a,l);if(this.curves.length>0){const f=u.getPoint(0);f.equals(this.currentPoint)||this.lineTo(f.x,f.y)}this.curves.push(u);const c=u.getPoint(1);return this.currentPoint.copy(c),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class Uc extends Nc{constructor(e){super(e),this.uuid=Fo(),this.type="Shape",this.holes=[]}getPointsHoles(e){const n=[];for(let i=0,r=this.holes.length;i<r;i++)n[i]=this.holes[i].getPoints(e);return n}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let n=0,i=e.holes.length;n<i;n++){const r=e.holes[n];this.holes.push(r.clone())}return this}toJSON(){const e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let n=0,i=this.holes.length;n<i;n++){const r=this.holes[n];e.holes.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let n=0,i=e.holes.length;n<i;n++){const r=e.holes[n];this.holes.push(new Nc().fromJSON(r))}return this}}const xL={triangulate:function(t,e,n=2){const i=e&&e.length,r=i?e[0]*n:t.length;let s=z1(t,0,r,n,!0);const o=[];if(!s||s.next===s.prev)return o;let a,l,u,c,f,d,p;if(i&&(s=wL(t,e,s,n)),t.length>80*n){a=u=t[0],l=c=t[1];for(let g=n;g<r;g+=n)f=t[g],d=t[g+1],f<a&&(a=f),d<l&&(l=d),f>u&&(u=f),d>c&&(c=d);p=Math.max(u-a,c-l),p=p!==0?32767/p:0}return rl(s,o,n,a,l,p,0),o}};function z1(t,e,n,i,r){let s,o;if(r===UL(t,e,n,i)>0)for(s=e;s<n;s+=i)o=M_(s,t[s],t[s+1],o);else for(s=n-i;s>=e;s-=i)o=M_(s,t[s],t[s+1],o);return o&&uf(o,o.next)&&(ol(o),o=o.next),o}function ys(t,e){if(!t)return t;e||(e=t);let n=t,i;do if(i=!1,!n.steiner&&(uf(n,n.next)||Mt(n.prev,n,n.next)===0)){if(ol(n),n=e=n.prev,n===n.next)break;i=!0}else n=n.next;while(i||n!==e);return e}function rl(t,e,n,i,r,s,o){if(!t)return;!o&&s&&PL(t,i,r,s);let a=t,l,u;for(;t.prev!==t.next;){if(l=t.prev,u=t.next,s?SL(t,i,r,s):yL(t)){e.push(l.i/n|0),e.push(t.i/n|0),e.push(u.i/n|0),ol(t),t=u.next,a=u.next;continue}if(t=u,t===a){o?o===1?(t=ML(ys(t),e,n),rl(t,e,n,i,r,s,2)):o===2&&EL(t,e,n,i,r,s):rl(ys(t),e,n,i,r,s,1);break}}}function yL(t){const e=t.prev,n=t,i=t.next;if(Mt(e,n,i)>=0)return!1;const r=e.x,s=n.x,o=i.x,a=e.y,l=n.y,u=i.y,c=r<s?r<o?r:o:s<o?s:o,f=a<l?a<u?a:u:l<u?l:u,d=r>s?r>o?r:o:s>o?s:o,p=a>l?a>u?a:u:l>u?l:u;let g=i.next;for(;g!==e;){if(g.x>=c&&g.x<=d&&g.y>=f&&g.y<=p&&no(r,a,s,l,o,u,g.x,g.y)&&Mt(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function SL(t,e,n,i){const r=t.prev,s=t,o=t.next;if(Mt(r,s,o)>=0)return!1;const a=r.x,l=s.x,u=o.x,c=r.y,f=s.y,d=o.y,p=a<l?a<u?a:u:l<u?l:u,g=c<f?c<d?c:d:f<d?f:d,S=a>l?a>u?a:u:l>u?l:u,m=c>f?c>d?c:d:f>d?f:d,h=Rp(p,g,e,n,i),_=Rp(S,m,e,n,i);let v=t.prevZ,E=t.nextZ;for(;v&&v.z>=h&&E&&E.z<=_;){if(v.x>=p&&v.x<=S&&v.y>=g&&v.y<=m&&v!==r&&v!==o&&no(a,c,l,f,u,d,v.x,v.y)&&Mt(v.prev,v,v.next)>=0||(v=v.prevZ,E.x>=p&&E.x<=S&&E.y>=g&&E.y<=m&&E!==r&&E!==o&&no(a,c,l,f,u,d,E.x,E.y)&&Mt(E.prev,E,E.next)>=0))return!1;E=E.nextZ}for(;v&&v.z>=h;){if(v.x>=p&&v.x<=S&&v.y>=g&&v.y<=m&&v!==r&&v!==o&&no(a,c,l,f,u,d,v.x,v.y)&&Mt(v.prev,v,v.next)>=0)return!1;v=v.prevZ}for(;E&&E.z<=_;){if(E.x>=p&&E.x<=S&&E.y>=g&&E.y<=m&&E!==r&&E!==o&&no(a,c,l,f,u,d,E.x,E.y)&&Mt(E.prev,E,E.next)>=0)return!1;E=E.nextZ}return!0}function ML(t,e,n){let i=t;do{const r=i.prev,s=i.next.next;!uf(r,s)&&H1(r,i,i.next,s)&&sl(r,s)&&sl(s,r)&&(e.push(r.i/n|0),e.push(i.i/n|0),e.push(s.i/n|0),ol(i),ol(i.next),i=t=s),i=i.next}while(i!==t);return ys(i)}function EL(t,e,n,i,r,s){let o=t;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&DL(o,a)){let l=V1(o,a);o=ys(o,o.next),l=ys(l,l.next),rl(o,e,n,i,r,s,0),rl(l,e,n,i,r,s,0);return}a=a.next}o=o.next}while(o!==t)}function wL(t,e,n,i){const r=[];let s,o,a,l,u;for(s=0,o=e.length;s<o;s++)a=e[s]*i,l=s<o-1?e[s+1]*i:t.length,u=z1(t,a,l,i,!1),u===u.next&&(u.steiner=!0),r.push(LL(u));for(r.sort(TL),s=0;s<r.length;s++)n=CL(r[s],n);return n}function TL(t,e){return t.x-e.x}function CL(t,e){const n=AL(t,e);if(!n)return e;const i=V1(n,t);return ys(i,i.next),ys(n,n.next)}function AL(t,e){let n=e,i=-1/0,r;const s=t.x,o=t.y;do{if(o<=n.y&&o>=n.next.y&&n.next.y!==n.y){const d=n.x+(o-n.y)*(n.next.x-n.x)/(n.next.y-n.y);if(d<=s&&d>i&&(i=d,r=n.x<n.next.x?n:n.next,d===s))return r}n=n.next}while(n!==e);if(!r)return null;const a=r,l=r.x,u=r.y;let c=1/0,f;n=r;do s>=n.x&&n.x>=l&&s!==n.x&&no(o<u?s:i,o,l,u,o<u?i:s,o,n.x,n.y)&&(f=Math.abs(o-n.y)/(s-n.x),sl(n,t)&&(f<c||f===c&&(n.x>r.x||n.x===r.x&&RL(r,n)))&&(r=n,c=f)),n=n.next;while(n!==a);return r}function RL(t,e){return Mt(t.prev,t,e.prev)<0&&Mt(e.next,t,t.next)<0}function PL(t,e,n,i){let r=t;do r.z===0&&(r.z=Rp(r.x,r.y,e,n,i)),r.prevZ=r.prev,r.nextZ=r.next,r=r.next;while(r!==t);r.prevZ.nextZ=null,r.prevZ=null,bL(r)}function bL(t){let e,n,i,r,s,o,a,l,u=1;do{for(n=t,t=null,s=null,o=0;n;){for(o++,i=n,a=0,e=0;e<u&&(a++,i=i.nextZ,!!i);e++);for(l=u;a>0||l>0&&i;)a!==0&&(l===0||!i||n.z<=i.z)?(r=n,n=n.nextZ,a--):(r=i,i=i.nextZ,l--),s?s.nextZ=r:t=r,r.prevZ=s,s=r;n=i}s.nextZ=null,u*=2}while(o>1);return t}function Rp(t,e,n,i,r){return t=(t-n)*r|0,e=(e-i)*r|0,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,t|e<<1}function LL(t){let e=t,n=t;do(e.x<n.x||e.x===n.x&&e.y<n.y)&&(n=e),e=e.next;while(e!==t);return n}function no(t,e,n,i,r,s,o,a){return(r-o)*(e-a)>=(t-o)*(s-a)&&(t-o)*(i-a)>=(n-o)*(e-a)&&(n-o)*(s-a)>=(r-o)*(i-a)}function DL(t,e){return t.next.i!==e.i&&t.prev.i!==e.i&&!IL(t,e)&&(sl(t,e)&&sl(e,t)&&NL(t,e)&&(Mt(t.prev,t,e.prev)||Mt(t,e.prev,e))||uf(t,e)&&Mt(t.prev,t,t.next)>0&&Mt(e.prev,e,e.next)>0)}function Mt(t,e,n){return(e.y-t.y)*(n.x-e.x)-(e.x-t.x)*(n.y-e.y)}function uf(t,e){return t.x===e.x&&t.y===e.y}function H1(t,e,n,i){const r=cu(Mt(t,e,n)),s=cu(Mt(t,e,i)),o=cu(Mt(n,i,t)),a=cu(Mt(n,i,e));return!!(r!==s&&o!==a||r===0&&uu(t,n,e)||s===0&&uu(t,i,e)||o===0&&uu(n,t,i)||a===0&&uu(n,e,i))}function uu(t,e,n){return e.x<=Math.max(t.x,n.x)&&e.x>=Math.min(t.x,n.x)&&e.y<=Math.max(t.y,n.y)&&e.y>=Math.min(t.y,n.y)}function cu(t){return t>0?1:t<0?-1:0}function IL(t,e){let n=t;do{if(n.i!==t.i&&n.next.i!==t.i&&n.i!==e.i&&n.next.i!==e.i&&H1(n,n.next,t,e))return!0;n=n.next}while(n!==t);return!1}function sl(t,e){return Mt(t.prev,t,t.next)<0?Mt(t,e,t.next)>=0&&Mt(t,t.prev,e)>=0:Mt(t,e,t.prev)<0||Mt(t,t.next,e)<0}function NL(t,e){let n=t,i=!1;const r=(t.x+e.x)/2,s=(t.y+e.y)/2;do n.y>s!=n.next.y>s&&n.next.y!==n.y&&r<(n.next.x-n.x)*(s-n.y)/(n.next.y-n.y)+n.x&&(i=!i),n=n.next;while(n!==t);return i}function V1(t,e){const n=new Pp(t.i,t.x,t.y),i=new Pp(e.i,e.x,e.y),r=t.next,s=e.prev;return t.next=e,e.prev=t,n.next=r,r.prev=n,i.next=n,n.prev=i,s.next=i,i.prev=s,i}function M_(t,e,n,i){const r=new Pp(t,e,n);return i?(r.next=i.next,r.prev=i,i.next.prev=r,i.next=r):(r.prev=r,r.next=r),r}function ol(t){t.next.prev=t.prev,t.prev.next=t.next,t.prevZ&&(t.prevZ.nextZ=t.nextZ),t.nextZ&&(t.nextZ.prevZ=t.prevZ)}function Pp(t,e,n){this.i=t,this.x=e,this.y=n,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function UL(t,e,n,i){let r=0;for(let s=e,o=n-i;s<n;s+=i)r+=(t[o]-t[s])*(t[s+1]+t[o+1]),o=s;return r}class ba{static area(e){const n=e.length;let i=0;for(let r=n-1,s=0;s<n;r=s++)i+=e[r].x*e[s].y-e[s].x*e[r].y;return i*.5}static isClockWise(e){return ba.area(e)<0}static triangulateShape(e,n){const i=[],r=[],s=[];E_(e),w_(i,e);let o=e.length;n.forEach(E_);for(let l=0;l<n.length;l++)r.push(o),o+=n[l].length,w_(i,n[l]);const a=xL.triangulate(i,r);for(let l=0;l<a.length;l+=3)s.push(a.slice(l,l+3));return s}}function E_(t){const e=t.length;e>2&&t[e-1].equals(t[0])&&t.pop()}function w_(t,e){for(let n=0;n<e.length;n++)t.push(e[n].x),t.push(e[n].y)}class al extends Hr{constructor(e=new Uc([new ge(.5,.5),new ge(-.5,.5),new ge(-.5,-.5),new ge(.5,-.5)]),n={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:n},e=Array.isArray(e)?e:[e];const i=this,r=[],s=[];for(let a=0,l=e.length;a<l;a++){const u=e[a];o(u)}this.setAttribute("position",new Xi(r,3)),this.setAttribute("uv",new Xi(s,2)),this.computeVertexNormals();function o(a){const l=[],u=n.curveSegments!==void 0?n.curveSegments:12,c=n.steps!==void 0?n.steps:1,f=n.depth!==void 0?n.depth:1;let d=n.bevelEnabled!==void 0?n.bevelEnabled:!0,p=n.bevelThickness!==void 0?n.bevelThickness:.2,g=n.bevelSize!==void 0?n.bevelSize:p-.1,S=n.bevelOffset!==void 0?n.bevelOffset:0,m=n.bevelSegments!==void 0?n.bevelSegments:3;const h=n.extrudePath,_=n.UVGenerator!==void 0?n.UVGenerator:kL;let v,E=!1,b,R,C,P;h&&(v=h.getSpacedPoints(c),E=!0,d=!1,b=h.computeFrenetFrames(c,!1),R=new L,C=new L,P=new L),d||(m=0,p=0,g=0,S=0);const Q=a.extractPoints(u);let y=Q.shape;const w=Q.holes;if(!ba.isClockWise(y)){y=y.reverse();for(let q=0,A=w.length;q<A;q++){const ce=w[q];ba.isClockWise(ce)&&(w[q]=ce.reverse())}}const O=ba.triangulateShape(y,w),j=y;for(let q=0,A=w.length;q<A;q++){const ce=w[q];y=y.concat(ce)}function K(q,A,ce){return A||console.error("THREE.ExtrudeGeometry: vec does not exist"),q.clone().addScaledVector(A,ce)}const z=y.length,ne=O.length;function D(q,A,ce){let le,oe,de;const Ie=q.x-A.x,xe=q.y-A.y,M=ce.x-q.x,x=ce.y-q.y,I=Ie*Ie+xe*xe,V=Ie*x-xe*M;if(Math.abs(V)>Number.EPSILON){const G=Math.sqrt(I),W=Math.sqrt(M*M+x*x),Ae=A.x-xe/G,he=A.y+Ie/G,me=ce.x-x/W,ze=ce.y+M/W,ue=((me-Ae)*x-(ze-he)*M)/(Ie*x-xe*M);le=Ae+Ie*ue-q.x,oe=he+xe*ue-q.y;const we=le*le+oe*oe;if(we<=2)return new ge(le,oe);de=Math.sqrt(we/2)}else{let G=!1;Ie>Number.EPSILON?M>Number.EPSILON&&(G=!0):Ie<-Number.EPSILON?M<-Number.EPSILON&&(G=!0):Math.sign(xe)===Math.sign(x)&&(G=!0),G?(le=-xe,oe=Ie,de=Math.sqrt(I)):(le=Ie,oe=xe,de=Math.sqrt(I/2))}return new ge(le/de,oe/de)}const J=[];for(let q=0,A=j.length,ce=A-1,le=q+1;q<A;q++,ce++,le++)ce===A&&(ce=0),le===A&&(le=0),J[q]=D(j[q],j[ce],j[le]);const ee=[];let re,Pe=J.concat();for(let q=0,A=w.length;q<A;q++){const ce=w[q];re=[];for(let le=0,oe=ce.length,de=oe-1,Ie=le+1;le<oe;le++,de++,Ie++)de===oe&&(de=0),Ie===oe&&(Ie=0),re[le]=D(ce[le],ce[de],ce[Ie]);ee.push(re),Pe=Pe.concat(re)}for(let q=0;q<m;q++){const A=q/m,ce=p*Math.cos(A*Math.PI/2),le=g*Math.sin(A*Math.PI/2)+S;for(let oe=0,de=j.length;oe<de;oe++){const Ie=K(j[oe],J[oe],le);se(Ie.x,Ie.y,-ce)}for(let oe=0,de=w.length;oe<de;oe++){const Ie=w[oe];re=ee[oe];for(let xe=0,M=Ie.length;xe<M;xe++){const x=K(Ie[xe],re[xe],le);se(x.x,x.y,-ce)}}}const Ge=g+S;for(let q=0;q<z;q++){const A=d?K(y[q],Pe[q],Ge):y[q];E?(C.copy(b.normals[0]).multiplyScalar(A.x),R.copy(b.binormals[0]).multiplyScalar(A.y),P.copy(v[0]).add(C).add(R),se(P.x,P.y,P.z)):se(A.x,A.y,0)}for(let q=1;q<=c;q++)for(let A=0;A<z;A++){const ce=d?K(y[A],Pe[A],Ge):y[A];E?(C.copy(b.normals[q]).multiplyScalar(ce.x),R.copy(b.binormals[q]).multiplyScalar(ce.y),P.copy(v[q]).add(C).add(R),se(P.x,P.y,P.z)):se(ce.x,ce.y,f/c*q)}for(let q=m-1;q>=0;q--){const A=q/m,ce=p*Math.cos(A*Math.PI/2),le=g*Math.sin(A*Math.PI/2)+S;for(let oe=0,de=j.length;oe<de;oe++){const Ie=K(j[oe],J[oe],le);se(Ie.x,Ie.y,f+ce)}for(let oe=0,de=w.length;oe<de;oe++){const Ie=w[oe];re=ee[oe];for(let xe=0,M=Ie.length;xe<M;xe++){const x=K(Ie[xe],re[xe],le);E?se(x.x,x.y+v[c-1].y,v[c-1].x+ce):se(x.x,x.y,f+ce)}}}U(),Z();function U(){const q=r.length/3;if(d){let A=0,ce=z*A;for(let le=0;le<ne;le++){const oe=O[le];_e(oe[2]+ce,oe[1]+ce,oe[0]+ce)}A=c+m*2,ce=z*A;for(let le=0;le<ne;le++){const oe=O[le];_e(oe[0]+ce,oe[1]+ce,oe[2]+ce)}}else{for(let A=0;A<ne;A++){const ce=O[A];_e(ce[2],ce[1],ce[0])}for(let A=0;A<ne;A++){const ce=O[A];_e(ce[0]+z*c,ce[1]+z*c,ce[2]+z*c)}}i.addGroup(q,r.length/3-q,0)}function Z(){const q=r.length/3;let A=0;te(j,A),A+=j.length;for(let ce=0,le=w.length;ce<le;ce++){const oe=w[ce];te(oe,A),A+=oe.length}i.addGroup(q,r.length/3-q,1)}function te(q,A){let ce=q.length;for(;--ce>=0;){const le=ce;let oe=ce-1;oe<0&&(oe=q.length-1);for(let de=0,Ie=c+m*2;de<Ie;de++){const xe=z*de,M=z*(de+1),x=A+le+xe,I=A+oe+xe,V=A+oe+M,G=A+le+M;Ce(x,I,V,G)}}}function se(q,A,ce){l.push(q),l.push(A),l.push(ce)}function _e(q,A,ce){Fe(q),Fe(A),Fe(ce);const le=r.length/3,oe=_.generateTopUV(i,r,le-3,le-2,le-1);Xe(oe[0]),Xe(oe[1]),Xe(oe[2])}function Ce(q,A,ce,le){Fe(q),Fe(A),Fe(le),Fe(A),Fe(ce),Fe(le);const oe=r.length/3,de=_.generateSideWallUV(i,r,oe-6,oe-3,oe-2,oe-1);Xe(de[0]),Xe(de[1]),Xe(de[3]),Xe(de[1]),Xe(de[2]),Xe(de[3])}function Fe(q){r.push(l[q*3+0]),r.push(l[q*3+1]),r.push(l[q*3+2])}function Xe(q){s.push(q.x),s.push(q.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),n=this.parameters.shapes,i=this.parameters.options;return FL(n,i,e)}static fromJSON(e,n){const i=[];for(let s=0,o=e.shapes.length;s<o;s++){const a=n[e.shapes[s]];i.push(a)}const r=e.options.extrudePath;return r!==void 0&&(e.options.extrudePath=new Ap[r.type]().fromJSON(r)),new al(i,e.options)}}const kL={generateTopUV:function(t,e,n,i,r){const s=e[n*3],o=e[n*3+1],a=e[i*3],l=e[i*3+1],u=e[r*3],c=e[r*3+1];return[new ge(s,o),new ge(a,l),new ge(u,c)]},generateSideWallUV:function(t,e,n,i,r,s){const o=e[n*3],a=e[n*3+1],l=e[n*3+2],u=e[i*3],c=e[i*3+1],f=e[i*3+2],d=e[r*3],p=e[r*3+1],g=e[r*3+2],S=e[s*3],m=e[s*3+1],h=e[s*3+2];return Math.abs(a-c)<Math.abs(o-u)?[new ge(o,1-l),new ge(u,1-f),new ge(d,1-g),new ge(S,1-h)]:[new ge(a,1-l),new ge(c,1-f),new ge(p,1-g),new ge(m,1-h)]}};function FL(t,e,n){if(n.shapes=[],Array.isArray(t))for(let i=0,r=t.length;i<r;i++){const s=t[i];n.shapes.push(s.uuid)}else n.shapes.push(t.uuid);return n.options=Object.assign({},e),e.extrudePath!==void 0&&(n.options.extrudePath=e.extrudePath.toJSON()),n}class gi extends vl{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new nt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new nt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=g1,this.normalScale=new ge(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ai,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class cf extends kt{constructor(e,n=1){super(),this.isLight=!0,this.type="Light",this.color=new nt(e),this.intensity=n}dispose(){}copy(e,n){return super.copy(e,n),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const n=super.toJSON(e);return n.object.color=this.color.getHex(),n.object.intensity=this.intensity,this.groundColor!==void 0&&(n.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(n.object.distance=this.distance),this.angle!==void 0&&(n.object.angle=this.angle),this.decay!==void 0&&(n.object.decay=this.decay),this.penumbra!==void 0&&(n.object.penumbra=this.penumbra),this.shadow!==void 0&&(n.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(n.object.target=this.target.uuid),n}}class OL extends cf{constructor(e,n,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(kt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new nt(n)}copy(e,n){return super.copy(e,n),this.groundColor.copy(e.groundColor),this}}const Ld=new yt,T_=new L,C_=new L;class fg{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ge(512,512),this.map=null,this.mapPass=null,this.matrix=new yt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new ag,this._frameExtents=new ge(1,1),this._viewportCount=1,this._viewports=[new ut(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const n=this.camera,i=this.matrix;T_.setFromMatrixPosition(e.matrixWorld),n.position.copy(T_),C_.setFromMatrixPosition(e.target.matrixWorld),n.lookAt(C_),n.updateMatrixWorld(),Ld.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ld),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Ld)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class BL extends fg{constructor(){super(new Mn(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(e){const n=this.camera,i=Dc*2*e.angle*this.focus,r=this.mapSize.width/this.mapSize.height,s=e.distance||n.far;(i!==n.fov||r!==n.aspect||s!==n.far)&&(n.fov=i,n.aspect=r,n.far=s,n.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class zL extends cf{constructor(e,n,i=0,r=Math.PI/3,s=0,o=2){super(e,n),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(kt.DEFAULT_UP),this.updateMatrix(),this.target=new kt,this.distance=i,this.angle=r,this.penumbra=s,this.decay=o,this.map=null,this.shadow=new BL}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,n){return super.copy(e,n),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const A_=new yt,ea=new L,Dd=new L;class HL extends fg{constructor(){super(new Mn(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new ge(4,2),this._viewportCount=6,this._viewports=[new ut(2,1,1,1),new ut(0,1,1,1),new ut(3,1,1,1),new ut(1,1,1,1),new ut(3,0,1,1),new ut(1,0,1,1)],this._cubeDirections=[new L(1,0,0),new L(-1,0,0),new L(0,0,1),new L(0,0,-1),new L(0,1,0),new L(0,-1,0)],this._cubeUps=[new L(0,1,0),new L(0,1,0),new L(0,1,0),new L(0,1,0),new L(0,0,1),new L(0,0,-1)]}updateMatrices(e,n=0){const i=this.camera,r=this.matrix,s=e.distance||i.far;s!==i.far&&(i.far=s,i.updateProjectionMatrix()),ea.setFromMatrixPosition(e.matrixWorld),i.position.copy(ea),Dd.copy(i.position),Dd.add(this._cubeDirections[n]),i.up.copy(this._cubeUps[n]),i.lookAt(Dd),i.updateMatrixWorld(),r.makeTranslation(-ea.x,-ea.y,-ea.z),A_.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),this._frustum.setFromProjectionMatrix(A_)}}class VL extends cf{constructor(e,n,i=0,r=2){super(e,n),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=r,this.shadow=new HL}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,n){return super.copy(e,n),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class GL extends fg{constructor(){super(new P1(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class R_ extends cf{constructor(e,n){super(e,n),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(kt.DEFAULT_UP),this.updateMatrix(),this.target=new kt,this.shadow=new GL}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class WL{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=P_(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const n=P_();e=(n-this.oldTime)/1e3,this.oldTime=n,this.elapsedTime+=e}return e}}function P_(){return performance.now()}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Jm}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Jm);const Yn=t=>"rank"in t,Id=t=>1-Math.pow(1-t,3),Hs=t=>t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2,b_=t=>t<0?0:t>1?1:t;function $L(){return typeof matchMedia=="function"&&matchMedia("(prefers-reduced-motion: reduce)").matches}const dg=1.42,ff=1.99,Po=.038,XL=.092,ma=22,io=12.8,bp=23.4,Lp=14.2,Dp=.9,jL=.42,YL=1.15,qL=.055,$u=.017,KL=3.65,ZL=3.35,G1=7.7,JL=1.9,W1=1.9,$1=2.3,L_=1.12,QL=.16,eD=.42,tD=4.4,Mr=new L(0,0,0),ll=new L(3.4,0,0),ga=new L(-3.4,0,0),X1=.9,nD=22.6,iD=13.2,rD=73,j1=30,D_=1.025,Nd=rD*Math.PI/180,fu=new L(0,0,0);function sD(t){const e=new Mn(j1,t,1,200);return Y1(e,t),e}function Y1(t,e){const n=nD/2*D_,i=iD/2*Math.sin(Nd)*D_,s=Math.max(i,n/e)/Math.tan(j1*Math.PI/360);t.aspect=e,t.position.set(fu.x,fu.y+s*Math.sin(Nd),fu.z+s*Math.cos(Nd)),t.lookAt(fu),t.updateProjectionMatrix()}const Ud={out:new L(0,0,1),right:new L(1,0,0),yaw:0,depth:KL,gap:W1,side:!1},I_={out:new L(0,0,-1),right:new L(-1,0,0),yaw:Math.PI,depth:ZL,gap:W1,side:!1},N_={out:new L(-1,0,0),right:new L(0,0,1),yaw:-Math.PI/2,depth:G1,gap:$1,side:!0},U_={out:new L(1,0,0),right:new L(0,0,-1),yaw:Math.PI/2,depth:G1,gap:$1,side:!0};function Ip(t){return t<=2?[Ud,I_]:t===3?[Ud,N_,U_]:[Ud,N_,I_,U_]}function po(t,e){let n=2166136261^e;for(let i=0;i<t.length;i++)n=Math.imul(n^t.charCodeAt(i),16777619);return(n>>>0)/4294967296*2-1}function La(t,e,n,i,r=new L){return r.copy(t.out).multiplyScalar(n).addScaledVector(t.right,e).setY(i)}const Xu=qL+Po/2;function ju(t,e){return{position:new L(Mr.x+po(t.id,3)*.08,Xu+e*$u*L_,Mr.z+po(t.id,4)*.08),yaw:po(t.id,5)*.12,faceDown:!1,scale:L_,order:0}}function ta(t){const e=new Map,n=Ip(t.players.length),i=t.players.length,r=(s,o,a)=>(s*3+o)*i+a;return t.players.forEach((s,o)=>{const a=n[o];s.down.forEach((d,p)=>{e.set(d.id,{position:La(a,(p-1)*a.gap,a.depth,Xu),yaw:po(d.id,1)*.02,faceDown:!0,scale:1,order:r(0,p,o)})});const l=new Map;if(s.up.forEach((d,p)=>{const g=s.upSlots[d.id]??p,S=l.get(g)??0;l.set(g,S+1),e.set(d.id,{position:La(a,(g-1)*a.gap+S*.08,a.depth-QL-S*.06,Xu+Po+$u+S*(Po+$u)),yaw:po(d.id,2)*.02,faceDown:!1,scale:1,order:r(1,g,o)+S*.15})}),o===0)return;const u=s.hand.length,c=u>1?Math.min(eD,tD/(u-1)):0,f=u>1?Math.min(.03,.24/(u-1)):0;s.hand.forEach((d,p)=>{e.set(d.id,{position:La(a,(p-(u-1)/2)*c,a.depth+JL,Xu+p*$u),yaw:a.yaw+(p-(u-1)/2)*f,faceDown:!0,scale:1,order:r(2,p,o)})})}),t.pile.forEach((s,o)=>e.set(s.id,ju(s,o))),e}const na=new L(ll.x,.95,ll.z),oD=new L(Mr.x,1.4,Mr.z+.3);class aD extends U1{constructor(){super();const e=new Vr;e.deleteAttribute("uv");const n=new gi({side:cn}),i=new gi,r=new VL(16777215,900,28,2);r.position.set(.418,16.199,.3),this.add(r);const s=new Je(e,n);s.position.set(-.757,13.219,.717),s.scale.set(31.713,28.305,28.591),this.add(s);const o=new Je(e,i);o.position.set(-10.906,2.009,1.846),o.rotation.set(0,-.195,0),o.scale.set(2.328,7.905,4.651),this.add(o);const a=new Je(e,i);a.position.set(-5.607,-.754,-.758),a.rotation.set(0,.994,0),a.scale.set(1.97,1.534,3.955),this.add(a);const l=new Je(e,i);l.position.set(6.167,.857,7.803),l.rotation.set(0,.561,0),l.scale.set(3.927,6.285,3.687),this.add(l);const u=new Je(e,i);u.position.set(-2.017,.018,6.124),u.rotation.set(0,.333,0),u.scale.set(2.002,4.566,2.064),this.add(u);const c=new Je(e,i);c.position.set(2.291,-.756,-2.621),c.rotation.set(0,-.286,0),c.scale.set(1.546,1.552,1.496),this.add(c);const f=new Je(e,i);f.position.set(-2.193,-.369,-5.547),f.rotation.set(0,.516,0),f.scale.set(3.875,3.487,2.986),this.add(f);const d=new Je(e,Bs(50));d.position.set(-16.116,14.37,8.208),d.scale.set(.1,2.428,2.739),this.add(d);const p=new Je(e,Bs(50));p.position.set(-16.109,18.021,-8.207),p.scale.set(.1,2.425,2.751),this.add(p);const g=new Je(e,Bs(17));g.position.set(14.904,12.198,-1.832),g.scale.set(.15,4.265,6.331),this.add(g);const S=new Je(e,Bs(43));S.position.set(-.462,8.89,14.52),S.scale.set(4.38,5.441,.088),this.add(S);const m=new Je(e,Bs(20));m.position.set(3.235,11.486,-12.541),m.scale.set(2.5,2,.1),this.add(m);const h=new Je(e,Bs(100));h.position.set(0,20,0),h.scale.set(1,.1,1),this.add(h)}dispose(){const e=new Set;this.traverse(n=>{n.isMesh&&(e.add(n.geometry),e.add(n.material))});for(const n of e)n.dispose()}}function Bs(t){const e=new Ao;return e.color.setScalar(t),e}function lD(t,e){const n=new Tp(e),i=n.fromScene(new aD,.03);t.environment=i.texture,t.environmentIntensity=.28,n.dispose();const r=new OL(12570854,1313544,.22);t.add(r);const s=new R_(16771528,1.5);s.position.set(4,12,6.5),s.target.position.set(0,0,-.5),s.castShadow=!0,s.shadow.mapSize.set(2048,2048),s.shadow.camera.near=1,s.shadow.camera.far=46;const o=12.5;s.shadow.camera.left=-o,s.shadow.camera.right=o,s.shadow.camera.top=o,s.shadow.camera.bottom=-o,s.shadow.bias=-2e-4,s.shadow.normalBias=.005,s.shadow.radius=2.5,t.add(s),t.add(s.target);const a=new zL(16768166,.9,40,Math.PI/5.2,.95,.6);a.position.set(0,11,1),a.target.position.set(0,0,.5),t.add(a),t.add(a.target);const l=new R_(9418495,.45);return l.position.set(-6,5,-9),t.add(l),{dispose(){i.dispose(),t.environment=null}}}function uD(t,e,n){return t.replace(/^<svg\b([^>]*)>/,(i,r)=>{const s=r.replace(/\s(?:width|height)\s*=\s*"[^"]*"/g,"").replace(/\sxmlns\s*=\s*"[^"]*"/g,"");return`<svg xmlns="http://www.w3.org/2000/svg" width="${e}" height="${n}"${s}>`})}function hg(t,e,n,i={}){const{basePaint:r,preserveBase:s=!1}=i,o=document.createElement("canvas");o.width=e,o.height=n;const a=o.getContext("2d");r&&r(a,e,n);const l=new Bo(o);l.colorSpace=an,l.anisotropy=16,l.generateMipmaps=!0,l.minFilter=Sr;const u=new Image;return u.onload=()=>{s||a.clearRect(0,0,e,n),a.drawImage(u,0,0,e,n),l.needsUpdate=!0},u.onerror=()=>{console.error("[blackjack] SVG texture failed to decode — check the xmlns injection")},u.src=`data:image/svg+xml;charset=utf-8,${encodeURIComponent(uD(t,e,n))}`,l}const pg=512,q1=Math.round(pg*1.4),bo=new Map;function K1(t,e,n){t.fillStyle="#fdfdfb",t.fillRect(0,0,e,n)}function cD(t,e){const n=`${t}${e}`;let i=bo.get(n);return i||(i=hg(sf(zh({rank:t,suit:e})),pg,q1,{basePaint:K1}),bo.set(n,i)),i}function Z1(){let t=bo.get("__back");return t||(t=hg(sf(Km({})),pg,q1,{basePaint:K1}),bo.set("__back",t)),t}function fD(){for(const t of bo.values())t.dispose();bo.clear()}const k_="#f3e3c3";function dD(t){const e=[t.twoResets&&"2 resets",t.invisibleFive&&"invisible 5",t.sevenOrLower&&"7 or lower",t.tenBurns&&"10 burns",t.fourBurns&&"four of a kind burns"].filter(Boolean);return e.length?e:["play equal or higher"]}function hD({w:t,rules:e,titleY:n,rulesY:i,h:r}){const s=Math.round(t*.024),o=Math.round(t*.0125);return X.jsx("svg",{viewBox:`0 0 ${t} ${r}`,width:t,height:r,children:X.jsxs("g",{textAnchor:"middle",fontFamily:"'Iowan Old Style', Palatino, Georgia, serif",children:[X.jsx("text",{x:t/2,y:n,fontSize:s*1.25,fontStyle:"italic",fill:k_,fillOpacity:"0.34",children:"Skitgubbe"}),X.jsx("text",{x:t/2,y:i,fontSize:o*1.1,fill:k_,fillOpacity:"0.36",children:dD(e).join(",  ")})]})})}const Np=2048,Up=Math.round(Np*(io/ma));function F_(t){return(t/io+.5)*Up}function pD(t,e,n){const i=t.createRadialGradient(e/2,n*.42,e*.05,e/2,n*.5,e*.72);i.addColorStop(0,"#3b5b72"),i.addColorStop(.6,"#2c465a"),i.addColorStop(1,"#1d3142"),t.fillStyle=i,t.fillRect(0,0,e,n);const r=t.createRadialGradient(e/2,n/2,Math.min(e,n)*.22,e/2,n/2,e*.62);r.addColorStop(0,"rgba(0,0,0,0)"),r.addColorStop(1,"rgba(0,0,0,0.45)"),t.fillStyle=r,t.fillRect(0,0,e,n);const s=t.getImageData(0,0,e,n),o=s.data;for(let a=0;a<o.length;a+=4){const l=(Math.random()-.5)*13;o[a]+=l,o[a+1]+=l,o[a+2]+=l}t.putImageData(s,0,0)}function J1(t){const e=sf(hD({w:Np,h:Up,rules:t,titleY:F_(5.45),rulesY:F_(5.95)}));return hg(e,Np,Up,{basePaint:pD,preserveBase:!0})}function mD(){const e=document.createElement("canvas");e.width=256,e.height=256;const n=e.getContext("2d"),i=n.createImageData(256,256),r=i.data;for(let o=0;o<r.length;o+=4){const a=Math.random()*34-17;r[o]=128+a,r[o+1]=128+a,r[o+2]=255,r[o+3]=255}n.putImageData(i,0,0);const s=new Bo(e);return s.wrapS=Qi,s.wrapT=Qi,s.repeat.set(12,12),s}function Q1(){const n=document.createElement("canvas");n.width=1024,n.height=256;const i=n.getContext("2d"),r=i.createLinearGradient(0,0,0,256);r.addColorStop(0,"#4a2e1c"),r.addColorStop(.5,"#35200f"),r.addColorStop(1,"#22140a"),i.fillStyle=r,i.fillRect(0,0,1024,256);for(let o=0;o<90;o++){i.strokeStyle=`rgba(0,0,0,${Math.random()*.18})`,i.lineWidth=Math.random()*2.4;const a=Math.random()*256;i.beginPath(),i.moveTo(0,a),i.bezierCurveTo(1024*.3,a+Math.random()*10-5,1024*.6,a+Math.random()*10-5,1024,a+Math.random()*8-4),i.stroke()}const s=new Bo(n);return s.colorSpace=an,s.wrapS=Qi,s.wrapT=Qi,s.repeat.set(2,2),s.anisotropy=8,s}function kp(){const e=document.createElement("canvas");e.width=256,e.height=256;const n=e.getContext("2d"),i=n.createImageData(256,256),r=i.data,s=256/2;for(let a=0;a<256;a++)for(let l=0;l<256;l++){const u=(l-s)/s,c=(a-s)/s,f=Math.min(1,Math.sqrt(u*u+c*c)),d=Math.pow(1-f,2.2),p=(a*256+l)*4;r[p]=255,r[p+1]=255,r[p+2]=255,r[p+3]=Math.round(d*255)}n.putImageData(i,0,0);const o=new Bo(e);return o.colorSpace=an,o}function gD(){return new gi({map:J1(Lm),normalMap:mD(),normalScale:new ge(.35,.35),roughness:.98,metalness:0,envMapIntensity:.25})}function vD(){return new gi({map:Q1(),roughness:.42,metalness:.05,envMapIntensity:.55})}function _D(){return new gi({map:Q1(),color:14262891,roughness:.45,metalness:0,envMapIntensity:.7})}function xD(){return new gi({color:13214247,roughness:.35,metalness:.9,envMapIntensity:.9})}function O_(){return new gi({color:16052970,roughness:.62,metalness:0,envMapIntensity:.4})}function eM(t){return new gi({map:t,roughness:.62,metalness:0,envMapIntensity:.4,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-1,alphaTest:.5})}function yD(t,e){return eM(cD(t,e))}function SD(){return eM(Z1())}function MD(){return new gi({color:1182221,roughness:.85,metalness:0,envMapIntensity:.3})}let Da=null,Ia=null;function ED(t,e,n){const i=t/2,r=e/2,s=new Uc;return s.moveTo(-i+n,-r),s.lineTo(i-n,-r),s.quadraticCurveTo(i,-r,i,-r+n),s.lineTo(i,r-n),s.quadraticCurveTo(i,r,i-n,r),s.lineTo(-i+n,r),s.quadraticCurveTo(-i,r,-i,r-n),s.lineTo(-i,-r+n),s.quadraticCurveTo(-i,-r,-i+n,-r),s}function wD(){if(!Da){const t=new al(ED(dg,ff,XL),{depth:Po,bevelEnabled:!1,curveSegments:6});t.rotateX(-Math.PI/2),t.translate(0,-Po/2,0),Da=t}return Da}function B_(){return Ia||(Ia=new Ri(dg,ff)),Ia}function kd(t,e){const n=new to,i=new Je(wD(),O_());i.castShadow=!0,i.receiveShadow=!0,n.add(i);const r=Po/2+8e-4,s=new Je(B_(),t&&e?yD(t,e):O_());s.rotation.x=-Math.PI/2,s.position.y=r,s.receiveShadow=!0,n.add(s);const o=new Je(B_(),SD());return o.rotation.x=Math.PI/2,o.position.y=-r,o.receiveShadow=!0,n.add(o),n}function Fd(t){t.traverse(e=>{if(e instanceof Je){const n=e.material;Array.isArray(n)?n.forEach(i=>i.dispose()):n.dispose()}})}function TD(){Da?.dispose(),Ia?.dispose(),Da=null,Ia=null}const CD=5;function z_(t,e){const n=new gi({color:15855590,roughness:.75,envMapIntensity:.3}),i=new gi({map:Z1(),roughness:.62,envMapIntensity:.35}),r=new Je(new Vr(dg,X1,ff),[n,n,i,n,n,n]);return r.position.copy(t),r.rotation.y=e,r.castShadow=!0,r.receiveShadow=!0,r}function AD(t){const e=z_(ll,.06),n=z_(ga,-.22);t.add(e,n);const i=(o,a)=>{const l=Math.max(0,Math.min(1,a));o.visible=l>.004;const u=Math.max(.004,l);o.scale.y=u,o.position.y=.01+X1*u/2},r={draw:1,burned:0},s={draw:1,burned:0};return i(e,1),i(n,0),{setDraw:o=>{s.draw=o},setBurned:o=>{s.burned=o},step:o=>{const a=Math.min(1,o*CD);r.draw+=(s.draw-r.draw)*a,r.burned+=(s.burned-r.burned)*a,i(e,r.draw),i(n,r.burned)}}}function du(t,e,n,i){t.moveTo(-e+i,-n),t.lineTo(e-i,-n),t.quadraticCurveTo(e,-n,e,-n+i),t.lineTo(e,n-i),t.quadraticCurveTo(e,n,e-i,n),t.lineTo(-e+i,n),t.quadraticCurveTo(-e,n,-e,n-i),t.lineTo(-e,-n+i),t.quadraticCurveTo(-e,-n,-e+i,-n)}function RD(t){const e=new Je(new Vr(bp,Dp,Lp),vD());e.position.y=-.02-Dp/2,e.castShadow=!0,e.receiveShadow=!0,t.add(e);const n=new Je(new Ri(ma,io),gD());n.rotation.x=-Math.PI/2,n.position.y=0,n.receiveShadow=!0,t.add(n);const i=new Uc;du(i,ma/2+.13,io/2+.13,.86);const r=new Nc;du(r,ma/2+.02,io/2+.02,.78),i.holes.push(r);const s=new Je(new al(i,{depth:.06,bevelEnabled:!0,bevelThickness:.03,bevelSize:.03,bevelSegments:2,curveSegments:20}).rotateX(-Math.PI/2),xD());s.position.y=.005,s.castShadow=!0,s.receiveShadow=!0,t.add(s);const o=new Uc;du(o,bp/2-.12,Lp/2-.12,YL);const a=new Nc;du(a,ma/2+.16,io/2+.16,.82),o.holes.push(a);const l=new Je(new al(o,{depth:jL,bevelEnabled:!0,bevelThickness:.16,bevelSize:.16,bevelSegments:4,curveSegments:20}).rotateX(-Math.PI/2),_D());l.position.y=-.04,l.castShadow=!0,l.receiveShadow=!0,t.add(l);let u="";return{setRules(c){const f=JSON.stringify(c);if(f===u)return;u=f;const d=n.material.map;n.material.map=J1(c),d?.dispose()}}}function PD(){const t=document.createElement("canvas");t.width=4,t.height=512;const e=t.getContext("2d"),n=e.createLinearGradient(0,0,0,512);n.addColorStop(0,"#04050a"),n.addColorStop(.55,"#0a0910"),n.addColorStop(1,"#181013"),e.fillStyle=n,e.fillRect(0,0,4,512);const i=new Bo(t);return i.colorSpace=an,i}function bD(){const e=document.createElement("canvas");e.width=512,e.height=512;const n=e.getContext("2d");n.fillStyle="#150b0e",n.fillRect(0,0,512,512);for(let o=0;o<900;o++){const a=Math.random()*512,l=Math.random()*512,u=6+Math.random()*26;n.fillStyle=Math.random()>.5?"rgba(90,30,40,0.055)":"rgba(0,0,0,0.07)",n.beginPath(),n.arc(a,l,u,0,Math.PI*2),n.fill()}const i=n.getImageData(0,0,512,512),r=i.data;for(let o=0;o<r.length;o+=4){const a=(Math.random()-.5)*9;r[o]+=a,r[o+1]+=a,r[o+2]+=a}n.putImageData(i,0,0);const s=new Bo(e);return s.colorSpace=an,s.wrapS=Qi,s.wrapT=Qi,s.repeat.set(8,8),s}function LD(t,e,n,i){const r=new Je(new Ri(n,n),new Ao({map:t,color:e,transparent:!0,opacity:i,blending:nl,depthWrite:!1}));return r.rotation.x=-Math.PI/2,r}function DD(t){t.background=PD();const e=-Dp-.35,n=new Je(new Ri(120,120),MD());n.material.map=bD(),n.rotation.x=-Math.PI/2,n.position.y=e,n.receiveShadow=!0,t.add(n);const i=kp(),r=bp/2,s=Lp/2,o=[[-r-3.6,-s+1,16757607,13,.16],[r+3.6,-s+1.6,16765562,11,.13],[-r-2.8,s+2.2,16748394,10,.1],[r+3,s+1.8,16757607,12,.12],[0,-s-4.5,7250175,14,.07]];for(const[a,l,u,c,f]of o){const d=LD(i,u,c,f);d.position.set(a,e+.01,l),t.add(d)}}const Ln={deal:{duration:.28,lift:.2,stagger:.028,ease:Id,spin:.04,impact:!1},play:{duration:.28,lift:.12,stagger:.035,ease:Hs,spin:0,impact:!0},refill:{duration:.26,lift:.18,stagger:.055,ease:Id,spin:0,impact:!1},rearrange:{duration:.14,lift:0,stagger:0,ease:Id,spin:0,impact:!1},packet:{duration:.34,lift:.1,stagger:0,ease:Hs,spin:0,impact:!1},burn:{duration:.3,lift:.08,stagger:0,ease:Hs,spin:0,impact:!1},gather:{duration:.36,lift:.1,stagger:0,ease:Hs,spin:0,impact:!1},reveal:{duration:.3,lift:0,stagger:0,ease:Hs,spin:0,impact:!1}},ID=220,ND=100,UD=100,kD=.16;class FD{constructor(e,n){this.container=e,this.sfx=n;const i=Math.max(1,e.clientWidth),r=Math.max(1,e.clientHeight);this.renderer=new sL({antialias:!0,alpha:!0}),this.renderer.setPixelRatio(Math.min(2,window.devicePixelRatio||1)),this.renderer.setSize(i,r),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=n1,this.renderer.toneMapping=r1,this.renderer.toneMappingExposure=1,e.appendChild(this.renderer.domElement),this.camera=sD(i/r),DD(this.scene),this.lights=lD(this.scene,this.renderer),this.table=RD(this.scene),this.piles=AD(this.scene),this.burnFlash=new Je(new Ri(2.6,2.6),new Ao({map:kp(),color:16752986,transparent:!0,opacity:0,blending:nl,depthWrite:!1})),this.burnFlash.rotation.x=-Math.PI/2,this.burnFlash.position.set(Mr.x,.02,Mr.z),this.scene.add(this.burnFlash),this.ro=new ResizeObserver(()=>this.resize()),this.ro.observe(e),this.loop=this.loop.bind(this),this.raf=requestAnimationFrame(this.loop)}renderer;scene=new U1;camera;lights;ro;raf=0;disposed=!1;clock=new WL;reducedMotion=$L();cards=new Map;table;piles;gameId=-1;generation=0;glows=[];glowTarget=-1;glowLevel=[];burnFlash;burnFlashT=1;scratch=new L;onResize=null;setOnResize(e){this.onResize=e}project(e){const n=this.container.clientWidth,i=this.container.clientHeight,r=this.scratch.copy(e).project(this.camera),s=new L(e.x+1.42,e.y,e.z).project(this.camera);return{x:(r.x*.5+.5)*n,y:(-r.y*.5+.5)*i,cardWidth:Math.abs(s.x-r.x)*.5*n}}pileAnchor(){return this.project(new L(Mr.x,.1,Mr.z))}drawAnchor(){return this.project(new L(ll.x,.5,ll.z))}burnAnchor(){return this.project(new L(ga.x,.2,ga.z))}seatAnchor(e,n){const i=Ip(e)[n];return i.side?this.project(new L(i.out.x*i.depth,.1,-(i.gap+1.55))):{...this.project(La(i,0,i.depth,.1)),y:20}}async animate(e,n,i,r){if(this.disposed)return;if(this.table.setRules(n.rules),!e||n.gameId!==this.gameId)return this.newGame(n,r);const s=this.generation;let o=[...e.pile],a=null;const l=new Set;for(const u of i){if(s!==this.generation)return;if(u.type==="stack"){const c=ta(n).get(u.card.id);u.player===0?(await r.play([u.card],this.project(c.position)),this.place(u.card,c)):await this.moveAll([[u.card,c]],Ln.play),this.sfx.place()}else if(u.type==="play"){if(u.player===0&&u.source==="hand"){if(await r.play(u.cards),s!==this.generation)return;u.cards.forEach((c,f)=>this.place(c,ju(c,o.length+f)))}else await this.moveAll(u.cards.map((c,f)=>[c,ju(c,o.length+f)]),Ln.play);o=[...o,...u.cards],this.sfx.place()}else if(u.type==="flip"||u.type==="chance")this.cards.has(u.card.id)||this.spawn(u.card,na,0,!0),this.sfx.reveal(),await this.moveAll([[u.card,{position:oD.clone(),yaw:0,faceDown:!1,scale:1.12,order:0}]],Ln.reveal),await this.wait(ID,s),u.ok?(await this.moveAll([[u.card,ju(u.card,o.length)]],Ln.play),o=[...o,u.card],this.sfx.place()):a=u.card;else if(u.type==="burn")await this.wait(ND,s),this.burnFlashT=this.reducedMotion?1:0,this.sfx.burn(),await this.retire(o,new L(ga.x,.6,ga.z),Ln.burn),o=[],this.piles.setBurned(n.burnedCount/52);else if(u.type==="pickup"){const c=a?[...o,a]:o;if(a=null,this.sfx.gather(),u.player===0)await Promise.all([this.retire(c,this.nearEdge(),Ln.packet,!0),r.receive(c,"pile")]),c.forEach(f=>l.add(f.id));else{const f=ta(n);await this.moveAll(c.map(d=>[d,f.get(d.id)]).filter(([,d])=>d),Ln.packet)}o=[]}}s===this.generation&&await this.settle(e,n,r,l)}async settle(e,n,i,r){const s=this.generation,o=ta(n),a=[],l=[];for(const[d,p]of o){const g=hu(n,d);this.cards.has(d)?l.push([g,p]):a.push([g,p])}for(const d of[...this.cards.keys()])o.has(d)||this.remove(d);const u=new Set(e.players[0].hand.map(d=>d.id)),c=new Set(e.pile.map(d=>d.id)),f=n.players[0].hand.filter(d=>!r.has(d.id)&&!u.has(d.id)&&!c.has(d.id)&&!this.cards.has(d.id));this.piles.setDraw(n.drawCount/52),a.forEach(([d])=>this.spawn(d,na,0,!0)),await Promise.all([this.moveAll(l,Ln.rearrange),this.moveAll(a,Ln.refill),f.length?i.receive(f.filter(Yn),"draw"):Promise.resolve()]),s===this.generation&&this.showTurn(n)}async newGame(e,n){const i=++this.generation;if(this.gameId=e.gameId,this.hideTurn(),this.cards.size){if(await this.retire([...this.cards.keys()].map(s=>({id:s})),na.clone(),Ln.gather),i!==this.generation)return;await this.wait(UD,i)}if(this.piles.setBurned(0),this.piles.setDraw(1),i!==this.generation)return;const r=[...ta(e)].sort((s,o)=>s[1].order-o[1].order);this.sfx.deal();for(const[s]of r)this.spawn(hu(e,s),na,0,!0);await Promise.all([this.moveAll(r.map(([s,o])=>[hu(e,s),o]),Ln.deal),(async()=>{await this.wait(Math.round(r.length*Ln.deal.stagger*1e3*.66),i),i===this.generation&&await n.receive(e.players[0].hand.filter(Yn),"draw")})()]),i===this.generation&&(this.piles.setDraw(e.drawCount/52),this.showTurn(e))}sync(e){++this.generation,this.gameId=e.gameId;for(const n of[...this.cards.keys()])this.remove(n);this.table.setRules(e.rules);for(const[n,i]of ta(e))this.spawn(hu(e,n),i.position,i.yaw,i.faceDown).outer.scale.setScalar(i.scale);this.piles.setDraw(e.drawCount/52),this.piles.setBurned(e.burnedCount/52),this.showTurn(e)}spawn(e,n,i,r){const s=this.cards.get(e.id);if(s){if(!s.known&&Yn(e)){const u=kd(e.rank,e.suit);u.rotation.copy(s.inner.rotation),s.outer.remove(s.inner),Fd(s.inner),s.outer.add(u),s.inner=u,s.known=!0}return s}const o=Yn(e)?kd(e.rank,e.suit):kd();o.rotation.x=r?Math.PI:0;const a=new to;a.add(o),a.position.copy(n),a.rotation.y=i,this.scene.add(a);const l={outer:a,inner:o,motion:null,flip:null,faceDown:r,known:Yn(e)};return this.cards.set(e.id,l),l}place(e,n){const i=this.spawn(e,n.position,n.yaw,!1);i.outer.position.copy(n.position),i.outer.rotation.y=n.yaw,i.outer.scale.setScalar(n.scale),i.inner.rotation.x=0,i.faceDown=!1}moveAll(e,n){return e.length?new Promise(i=>{let r=e.length;const s=()=>{--r===0&&i()};e.forEach(([o,a],l)=>{const u=this.spawn(o,na,0,!0),c=n===Ln.deal?a.order:l;if(this.reducedMotion){u.outer.position.copy(a.position),u.outer.rotation.y=a.yaw,u.outer.scale.setScalar(a.scale),u.inner.rotation.x=a.faceDown?Math.PI:0,u.inner.position.y=0,u.faceDown=a.faceDown,u.motion=null,u.flip=null,s();return}u.motion={from:u.outer.position.clone(),to:a.position.clone(),yawFrom:u.outer.rotation.y,yawTo:OD(u.outer.rotation.y,a.yaw),scaleFrom:u.outer.scale.x,scaleTo:a.scale,t:-c*n.stagger,profile:n,done:s},u.faceDown!==a.faceDown&&(u.flip={from:u.inner.rotation.x,to:a.faceDown?Math.PI:0,t:-c*n.stagger,duration:n.duration},u.faceDown=a.faceDown)})}):Promise.resolve()}retire(e,n,i,r=!1){const s=e.map(a=>a.id).filter(a=>this.cards.has(a));if(!s.length)return Promise.resolve();if(this.reducedMotion||r){for(const a of s)this.remove(a);return Promise.resolve()}const o=new L;for(const a of s)o.add(this.cards.get(a).outer.position);return o.divideScalar(s.length),new Promise(a=>{let l=s.length;for(const u of s){const c=this.cards.get(u),f=c.outer.position.clone().sub(o).multiplyScalar(.35);c.motion={from:c.outer.position.clone(),to:n.clone().add(f).setY(n.y+f.y),yawFrom:c.outer.rotation.y,yawTo:c.outer.rotation.y+po(u,9)*.08,scaleFrom:c.outer.scale.x,scaleTo:c.outer.scale.x,t:0,profile:i,done:()=>{this.remove(u),--l===0&&a()}}}})}remove(e){const n=this.cards.get(e);n&&(this.scene.remove(n.outer),Fd(n.inner),this.cards.delete(e))}nearEdge(){return new L(0,.6,5.6)}wait(e,n){return this.reducedMotion||n!==this.generation?Promise.resolve():new Promise(i=>window.setTimeout(i,e))}showTurn(e){this.glows.length!==e.players.length&&this.buildGlows(e.players.length),this.glowTarget=e.phase==="playing"?e.current:-1}hideTurn(){this.glowTarget=-1}buildGlows(e){for(const i of this.glows)this.scene.remove(i);const n=kp();this.glows=Ip(e).map(i=>{const r=new Je(new Ri(4.8,1.6),new Ao({map:n,color:16767370,transparent:!0,opacity:0,blending:nl,depthWrite:!1}));return r.rotation.x=-Math.PI/2,i.side&&(r.rotation.z=Math.PI/2),La(i,0,i.depth+(i.side?.1:.2),.012,r.position),this.scene.add(r),r}),this.glowLevel=this.glows.map(()=>0)}loop(){if(this.disposed)return;const e=Math.min(.05,this.clock.getDelta());for(const n of this.cards.values()){const i=n.motion;if(i){i.t+=e;const s=b_(i.t/i.profile.duration);if(s>0){const o=i.profile.ease(s);n.outer.position.lerpVectors(i.from,i.to,o),n.outer.position.y+=i.profile.lift*Math.sin(Math.PI*s)**2,n.outer.rotation.y=i.yawFrom+(i.yawTo-i.yawFrom)*o+Math.sin(Math.PI*s)*i.profile.spin,n.outer.scale.setScalar(i.scaleFrom+(i.scaleTo-i.scaleFrom)*o)}s>=1&&(n.motion=null,i.done?.())}const r=n.flip;if(r){r.t+=e;const s=b_(r.t/r.duration),o=r.from+(r.to-r.from)*Hs(s);n.inner.rotation.x=o,n.inner.position.y=(ff/2+.06)*Math.abs(Math.sin(o)),s>=1&&(n.flip=null,n.inner.position.y=0)}}if(this.glows.forEach((n,i)=>{const r=i===this.glowTarget?1:0,s=this.reducedMotion?1:e/kD;this.glowLevel[i]=this.glowLevel[i]+Math.max(-s,Math.min(s,r-this.glowLevel[i])),n.material.opacity=this.glowLevel[i]*.12}),this.burnFlashT<1){this.burnFlashT=Math.min(1,this.burnFlashT+e/.4);const n=this.burnFlashT;this.burnFlash.material.opacity=(n<.2?n/.2:1-(n-.2)/.8)*.22}else this.burnFlash.material.opacity=0;this.piles.step(e),this.renderer.render(this.scene,this.camera),this.raf=requestAnimationFrame(this.loop)}resize(){const e=Math.max(1,this.container.clientWidth),n=Math.max(1,this.container.clientHeight);this.renderer.setSize(e,n),Y1(this.camera,e/n),this.onResize?.()}dispose(){this.disposed=!0,this.generation++,cancelAnimationFrame(this.raf),this.ro.disconnect();for(const e of this.cards.values())Fd(e.inner);this.cards.clear(),this.lights.dispose(),TD(),fD(),this.renderer.dispose(),this.renderer.domElement.remove()}}function OD(t,e){let n=(e-t)%(Math.PI*2);return n>Math.PI&&(n-=Math.PI*2),n<-Math.PI&&(n+=Math.PI*2),t+n}function hu(t,e){for(const n of t.players)for(const i of[...n.hand,...n.up,...n.down])if(i.id===e)return i;return t.pile.find(n=>n.id===e)}const BD='.sg-root{--sg-surface: var(--s1, #171b21);--sg-raised: var(--s2, #22272e);--sg-line: var(--border, rgba(255, 255, 255, .1));--sg-line-strong: var(--border-hi, rgba(255, 255, 255, .22));--sg-text: var(--ink, #eef1f5);--sg-muted: var(--muted, #a3aab5);--sg-accent: var(--gold, #e3c56f);--sg-accent-ink: var(--gold-ink, #241a06);--sg-focus: var(--focus, var(--sg-accent));--sg-cloth: #2c465a;--sg-pine: #6e4b2c;--sg-pine-dark: #4a3019;--sg-falu: #8e2f24;--sg-linen: #f3e3c3;--sg-serif: "Iowan Old Style", "Palatino Linotype", Palatino, "Book Antiqua", Georgia, serif;position:relative;width:1240px;display:flex;flex-direction:column;overflow:hidden;border-radius:14px;background:var(--sg-surface);color:var(--sg-text);font-size:14px;line-height:1.4;font-variant-numeric:tabular-nums;box-shadow:inset 0 0 0 1px var(--sg-line);isolation:isolate}.sg-root:focus{outline:none}.sg-root button{font:inherit;color:inherit}.sg-root kbd{display:inline-grid;place-items:center;min-width:22px;height:20px;padding:0 5px;border:1px solid currentColor;border-radius:5px;font:600 11px/1 inherit;opacity:.55}.sg-header{display:flex;align-items:center;gap:12px;height:56px;padding:0 12px 0 18px;border-bottom:1px solid var(--sg-line)}.sg-mark{flex:none}.sg-header h1{margin:0;font:400 25px/1 var(--sg-serif);letter-spacing:.01em}.sg-record{margin:3px auto 0 6px;color:var(--sg-muted);font-size:12px}.sg-ghost,.sg-secondary,.sg-primary,.sg-icon{display:inline-flex;align-items:center;justify-content:center;gap:10px;height:40px;padding:0 16px;border-radius:9px;border:1px solid var(--sg-line);background:transparent;cursor:pointer;white-space:nowrap;font-weight:600!important;transition:background .12s,border-color .12s}.sg-icon{width:40px;padding:0}.sg-icon svg{width:18px;height:18px;stroke:currentColor;fill:none;stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round}.sg-icon[aria-pressed=true]{color:var(--sg-muted)}.sg-ghost{border-color:transparent;color:var(--sg-muted)}.sg-ghost:hover,.sg-icon:hover,.sg-secondary:hover:not(:disabled){background:var(--sg-raised);border-color:var(--sg-line-strong);color:var(--sg-text)}.sg-secondary{height:44px;background:var(--sg-raised)}.sg-primary{height:44px;min-width:176px;padding:0 18px;justify-content:space-between;border-color:var(--sg-accent);background:var(--sg-accent);color:var(--sg-accent-ink)!important}.sg-primary:hover:not(:disabled){filter:brightness(1.06)}.sg-root button:disabled{opacity:.4;cursor:default}.sg-root button:focus-visible{outline:2px solid var(--sg-focus);outline-offset:2px}.sg-table{position:relative;height:600px;overflow:hidden;background:#141a1f}.sg-scene{position:absolute;inset:0}.sg-scene canvas{display:block;width:100%;height:100%}.sg-scene:after{content:"";position:absolute;inset:0;pointer-events:none;background:radial-gradient(ellipse 70% 75% at 50% 48%,transparent 55%,rgba(10,8,6,.45) 100%)}.sg-scene-error{position:absolute;inset:0;display:grid;place-items:center;padding:40px;color:var(--sg-linen);background:var(--sg-cloth)}.sg-seat,.sg-need,.sg-stack-count{position:absolute;transform:translate(-50%,-50%);pointer-events:none;white-space:nowrap}.sg-seat{display:flex;flex-direction:column;align-items:center;gap:1px;padding:3px 9px 4px;border-radius:6px;background:#f3e3c3f0;color:#3a2614;box-shadow:0 2px 8px #00000059;transition:box-shadow .16s}.sg-seat strong{display:flex;align-items:baseline;gap:6px;font:600 13px/1.15 var(--sg-serif)}.sg-seat em{font:italic 400 12px var(--sg-serif);color:var(--sg-falu)}.sg-seat span{font-size:10px;color:#5b4430}.sg-seat b{margin-left:4px;font-weight:700;color:#1f2430}.sg-seat b.is-red{color:#a8261f}.sg-seat.is-active{box-shadow:0 0 0 2px #f6d27a,0 2px 12px #0006}.sg-seat.is-out{opacity:.72}.sg-need{transform:translate(-50%,-100%);display:flex;flex-direction:column;align-items:center;padding:4px 12px 5px;border-radius:8px;background:#141c24d1;color:var(--sg-linen)}.sg-need strong{font:600 15px/1.2 var(--sg-serif)}.sg-need span{font-size:11px;color:#c9bba0}.sg-stack-count{font:italic 12px var(--sg-serif);color:#f3e3c3c7;text-shadow:0 1px 2px rgba(0,0,0,.6)}.sg-callout{position:absolute;left:50%;bottom:16px;transform:translate(-50%);display:flex;flex-direction:column;align-items:center;gap:2px;padding:10px 22px 11px;border-radius:10px;background:#141c24eb;color:var(--sg-linen);box-shadow:0 10px 30px #00000073;pointer-events:none;animation:sg-in .16s ease-out both}.sg-callout strong{font:600 20px/1.2 var(--sg-serif)}.sg-callout span{font-size:12px;color:#c9bba0}.sg-callout.is-burn strong{color:#ffb574}.sg-callout.is-win strong{color:#a9dfb9}.sg-callout.is-loss strong{color:#f3a8a0}@keyframes sg-in{0%{opacity:0;transform:translate(-50%,4px)}to{opacity:1;transform:translate(-50%)}}.sg-result{position:absolute;inset:0;display:grid;place-items:center;background:#0c10148c;animation:sg-fade .3s ease-out both}.sg-result-card{width:380px;padding:24px 28px;border-radius:12px;background:var(--sg-linen);color:#2e1f10;box-shadow:0 20px 60px #00000080}.sg-result-card h2{margin:0 0 16px;font:400 28px/1.15 var(--sg-serif)}.sg-result-card.is-loss h2{color:var(--sg-falu)}.sg-result-card ol{list-style:none;padding:0;margin:0 0 20px}.sg-result-card li{display:flex;align-items:baseline;gap:12px;padding:8px 0;border-top:1px solid rgba(74,48,25,.18);font-size:14px}.sg-result-card li>span{width:18px;color:#8a6d50;font-family:var(--sg-serif)}.sg-result-card li.is-you{font-weight:700}.sg-result-card li em{margin-left:auto;font:italic 13px var(--sg-serif);color:var(--sg-falu)}.sg-result-card .sg-primary{width:100%}@keyframes sg-fade{0%{opacity:0}to{opacity:1}}.sg-hand{position:relative;display:grid;grid-template-columns:696px 216px 216px;justify-content:center;align-items:start;gap:24px;height:176px;padding:6px 24px 8px;background:repeating-linear-gradient(92deg,rgba(0,0,0,.05) 0 2px,transparent 2px 9px),linear-gradient(180deg,#7b5534,var(--sg-pine) 30%,var(--sg-pine-dark));box-shadow:inset 0 10px 18px #00000059;transition:box-shadow .2s}.sg-hand.is-turn{box-shadow:inset 0 10px 18px #00000059,inset 0 0 0 2px #f6d27abf}.sg-row{min-width:0;max-width:100%;display:flex;flex-direction:column;align-items:center;gap:6px}.sg-row.is-source .sg-row-label{color:#f6d27a}.sg-batch-empty{height:126px;display:grid;place-items:center;color:#c9bba0;font-style:italic}.sg-row-up,.sg-row-down{border-left:1px solid #f3e3c322}.sg-row-label{color:#f3e3c3cc;font:italic 13px var(--sg-serif)}.sg-hand-empty{align-self:center;margin:0;color:var(--sg-linen);font:italic 15px var(--sg-serif)}.sg-fan{height:142px;padding-top:16px;overflow-x:auto;overflow-y:hidden;scrollbar-width:none}.sg-fan-slot:hover,.sg-fan-slot:focus-within{z-index:5}.sg-fan::-webkit-scrollbar{display:none}.sg-fan-inner{position:relative;height:126px}.sg-fan-slot{position:absolute;top:0;width:90px;height:126px}.sg-card{position:relative;display:block;width:var(--card-width, 90px);height:calc(var(--card-width, 90px) * 1.4);padding:0;border:0;border-radius:8px;background:none;cursor:default;filter:drop-shadow(0 3px 4px rgba(0,0,0,.4));transition:transform .14s ease-out}.sg-card-art{display:block;width:100%;height:100%}.sg-card.is-playable{cursor:pointer}.sg-hand.is-turn .sg-card.is-playable:before{content:"";position:absolute;inset:1px;border:2px solid #9bd9ae;border-radius:7px;pointer-events:none;z-index:1}.sg-hand.is-turn .sg-row.is-source .sg-card:not(.is-playable){opacity:.58}.sg-playable-hint{color:#bce8c9;font:12px system-ui,sans-serif}.sg-card.is-playable:hover{transform:translateY(-6px)}.sg-card.is-selected{transform:translateY(-12px)}.sg-card.is-selected:after{content:"";position:absolute;inset:-3px;border:2px solid #f6d27a;border-radius:10px}.sg-check{position:absolute;top:-9px;right:-7px;width:20px;height:20px;border-radius:50%;background:#f6d27a;box-shadow:0 1px 3px #0006}.sg-check:after{content:"";position:absolute;left:6px;top:4px;width:5px;height:9px;border:solid #3a2614;border-width:0 2px 2px 0;transform:rotate(45deg)}.sg-root .sg-card:focus-visible{outline:2px solid #9cd3ff;outline-offset:4px;z-index:2}.sg-back-number{position:absolute;left:50%;bottom:10px;transform:translate(-50%);color:var(--sg-linen);font:600 14px var(--sg-serif)}.sg-decision{display:flex;align-items:center;gap:16px;min-height:72px;padding:12px 16px 12px 20px;border-top:1px solid var(--sg-line)}.sg-decision-text{flex:1;min-width:0;display:flex;flex-direction:column;gap:2px}.sg-decision-text strong{font-size:15px;font-weight:650}.sg-decision-text span{color:var(--sg-muted);font-size:12px;min-height:17px}.sg-actions{display:flex;gap:8px}.sg-flights{position:absolute;inset:0;pointer-events:none;z-index:6}.sg-flight{position:absolute;left:0;top:0;transform-origin:0 0;filter:drop-shadow(0 6px 8px rgba(0,0,0,.45))}.sg-flight svg{display:block;width:100%;height:auto}.sg-flight.is-packet>div svg{width:100%}.sg-dialog-backdrop{position:absolute;inset:0;z-index:10;display:grid;place-items:center;background:#080a0c80;animation:sg-fade .14s ease-out both}.sg-dialog{display:flex;flex-direction:column;width:420px;max-height:620px;border-radius:12px;border:1px solid var(--sg-line-strong);background:var(--sg-surface);box-shadow:0 24px 70px #0000008c}.sg-dialog-head{display:flex;align-items:center;justify-content:space-between;padding:12px 12px 4px 20px}.sg-dialog-head h2{margin:0;font:400 22px var(--sg-serif)}.sg-dialog-body{overflow:auto;padding:0 20px}.sg-dialog-body>p{margin:0 0 16px;color:var(--sg-muted);font-size:13px}.sg-opponents{margin:0 0 16px;padding:0;border:0}.sg-opponents legend{margin-bottom:8px;padding:0;font-weight:600}.sg-opponents>div{display:flex;gap:8px}.sg-opponents button{flex:1;height:44px;border-radius:9px;border:1px solid var(--sg-line);background:var(--sg-raised);cursor:pointer;font-weight:600}.sg-opponents button[aria-pressed=true]{border-color:var(--sg-accent);box-shadow:inset 0 0 0 1px var(--sg-accent)}.sg-rules{border-top:1px solid var(--sg-line)}.sg-rule{display:flex;align-items:flex-start;gap:12px;padding:11px 2px;border-bottom:1px solid var(--sg-line);cursor:pointer}.sg-rule input{width:18px;height:18px;margin:1px 0 0;accent-color:var(--sg-accent);flex:none}.sg-rule strong{display:block;font-weight:600}.sg-rule em{display:block;margin-top:2px;color:var(--sg-muted);font-size:12px;font-style:normal}.sg-dialog-foot{display:flex;justify-content:space-between;gap:8px;padding:16px 20px;border-top:1px solid var(--sg-line)}@media (prefers-reduced-motion: reduce){.sg-root *,.sg-root *:before,.sg-root *:after{animation:none!important;transition:none!important}}';({...Lm});const zD=[{key:"swapPhase",title:"Swap before play",detail:"Trade hand cards for your face-up cards before the first turn."},{key:"invisibleFive",title:"Invisible 5",detail:"A 5 goes on anything and is see-through: the next card has to beat what lies under it."},{key:"twoResets",title:"2 resets — play again",detail:"A 2 goes on anything. Keep your turn and play any card on top."},{key:"tenBurns",title:"10 burns",detail:"A 10 goes on anything and burns the pile."},{key:"fourBurns",title:"Four of a kind burns",detail:"Four cards of one rank on top burn the pile."},{key:"burnPlaysAgain",title:"Burner goes again",detail:"Whoever burned the pile starts the next one."},{key:"chanceCard",title:"Chance card",detail:"Try the top card of the draw pile instead of playing from your hand."},{key:"sevenOrLower",title:"7 or lower",detail:"On a 7, the next card has to be 7 or lower."},{key:"noSpecialFinish",title:"No finishing on 2, 10 or ace",detail:"Your last card can’t be a 2, a 10 or an ace."}];function HD(t){const e=Uw(t.pile,t.rules),n=t.pile[t.pile.length-1],i=n&&n.rank!==e?` (the ${n.rank} is invisible)`:"";if(!e)return{short:"Any card",detail:n?"Only invisible 5s on the pile":void 0};if(e==="2"&&t.rules.twoResets)return{short:"Any card",detail:`${t.players[t.current]?.name??"The player"} plays again after the 2${i}`};if(e==="7"&&t.rules.sevenOrLower)return{short:"7 or lower",detail:i?`Playing on a 7${i}`:void 0};const r=e==="A"?"Ace":e==="K"?"King or higher":e==="Q"?"Queen or higher":e==="J"?"Jack or higher":`${e} or higher`;return{short:r==="Ace"?"Ace only":r,detail:i?`Playing on the ${e}${i}`:void 0}}function VD({room:t,audio:e,enabled:n,action:i,onAgain:r}){const s=ke.useRef(null),o=ke.useRef(null),a=ke.useRef(null),l=ke.useRef(null),u=ke.useRef(null),c=ke.useRef(-1),f=ke.useRef(Promise.resolve()),d=ke.useRef(!0),[p,g]=ke.useState(t.snapshot),[S,m]=ke.useState(!0),[h,_]=ke.useState(!1),[v,E]=ke.useState([]),[b,R]=ke.useState(null),[C,P]=ke.useState(new Set),[Q,y]=ke.useState(""),[w,$]=ke.useState(e.isMuted),[O,j]=ke.useState(0),[K,z]=ke.useState(null),[ne,D]=ke.useState(!1),J=ke.useRef(new Map),ee=ke.useRef(t);ee.current=t;const re=()=>{const M=l.current;M&&z({seats:p.players.map((x,I)=>M.seatAnchor(p.players.length,I)),pile:M.pileAnchor(),draw:M.drawAnchor()})},Pe=async(M,x,I)=>{if(!a.current||matchMedia("(prefers-reduced-motion: reduce)").matches)return;const V=document.createElement("div");V.className="sg-flight",V.style.width=`${x.width}px`,V.innerHTML=sf(X.jsx(zh,{rank:M.rank,suit:M.suit})),a.current.append(V),await V.animate([{transform:`translate(${x.x-x.width/2}px, ${x.y-x.width*.7}px) scale(1)`},{transform:`translate(${I.x-x.width/2}px, ${I.y-x.width*.7}px) scale(${I.width/x.width})`}],{duration:280,easing:"ease-in-out",fill:"both"}).finished.catch(()=>{}),V.remove()},Ge=M=>{const x=o.current.getBoundingClientRect(),I=s.current.getBoundingClientRect();return{x:x.left-I.left+M.x,y:x.top-I.top+M.y,width:M.cardWidth}},U=M=>{const x=s.current.getBoundingClientRect();return{x:M.left-x.left+M.width/2,y:M.top-x.top+M.height/2,width:M.width}},Z={play:async(M,x)=>{if(!l.current)return;const I=Ge(x??l.current.pileAnchor());await Promise.all(M.map(V=>Pe(V,J.current.has(V.id)?U(J.current.get(V.id)):{...I,y:I.y+200,width:90},I)))},receive:async(M,x)=>{if(await new Promise(requestAnimationFrame),l.current&&M.length<=4){const I=Ge(x==="draw"?l.current.drawAnchor():l.current.pileAnchor());await Promise.all(M.map(V=>{const G=s.current?.querySelector(`[data-card="${V.id}"]`);return G?Pe(V,I,U(G.getBoundingClientRect())):Promise.resolve()}))}d.current&&P(I=>new Set([...I].filter(V=>!M.some(G=>G.id===V))))}};ke.useEffect(()=>{d.current=!0;try{const M=new FD(o.current,{deal:()=>e.deal(),place:()=>e.place(),reveal:()=>e.reveal(),burn:()=>e.burn(),gather:()=>e.gather()});l.current=M,M.setOnResize(re),re()}catch{D(!0)}return()=>{d.current=!1,l.current?.dispose(),l.current=null}},[]),ke.useEffect(()=>{if(!t.snapshot||t.revision<=c.current)return;const M=c.current;c.current=t.revision;const x=t.transitions.filter(G=>G.revision>M),I=!u.current&&M<0,V=t.resync||!x.length;m(!0),f.current=f.current.then(async()=>{if(d.current){if(V){const G=t.snapshot;g(G),I&&G.phase==="swap"?(P(new Set(G.players[0].hand.map(W=>W.id))),await l.current?.animate(null,G,[],Z)):l.current?.sync(G),u.current=G}else for(const G of x){if(!d.current)return;const W=u.current,Ae=G.snapshot,he=new Set(W?.players[0]?.hand.map(ze=>ze.id)??[]);P(new Set(Ae.players[0].hand.filter(ze=>!he.has(ze.id)).map(ze=>ze.id))),g(Ae);const me=G.events.find(ze=>ze.type==="play"||ze.type==="pickup"||ze.type==="flip"||ze.type==="burn");me&&"player"in me&&y(`${Ae.players[me.player].name} ${me.type==="play"?"played":me.type==="pickup"?"took the pile":me.type==="burn"?"burned the pile":"turned a card over"}.`),await l.current?.animate(W,Ae,G.events,Z),u.current=Ae}d.current&&(P(new Set),E([]),R(null),t.revision===c.current&&(m(!1),t.snapshot?.current===0&&e.yourTurn()))}}).catch(()=>{d.current&&(l.current?.sync(ee.current.snapshot),g(ee.current.snapshot),P(new Set),m(!1))})},[t]);const te=p.players[0],se=p.phase==="swap"&&!te.ready,_e=te.hand.length?"hand":te.up.length?"up":"down",Ce=n&&!S&&!h&&p.phase==="playing"&&p.current===0&&te.place===null,Fe=n&&!S&&!h&&se,Xe=[{key:"hand",cards:[...te.hand].sort((M,x)=>Yn(M)&&Yn(x)?I0[M.rank]-I0[x.rank]||M.suit.localeCompare(x.suit):0),label:`Hand · ${te.hand.length}`},{key:"up",cards:te.up,label:`Face up · ${te.up.length}`},{key:"down",cards:te.down,label:`Face down · ${te.down.length}`}],q=Xe.filter(M=>se?M.key!=="down":M.key===_e).flatMap(M=>M.cards),A=(Zm(te.hand.length,!1,696)-1)*72;ke.useLayoutEffect(re,[A,p.players.length]);const ce=new Set(t.legal),le=async M=>{if(!(!n||S||h)){J.current=new Map([...s.current?.querySelectorAll("[data-card]")??[]].map(x=>[x.dataset.card,x.getBoundingClientRect()])),_(!0),e.unlock();try{await i(M),E([]),R(null)}catch{}finally{d.current&&_(!1)}}},oe=(M,x=!1)=>{if(q.some(I=>I.id===M.id)){if(Fe){if(b===M.id)return R(null);const I=te.hand.some(G=>G.id===M.id),V=te.hand.some(G=>G.id===b);if(!b||I===V)return R(M.id);le({type:"swap",hand:I?M.id:b,up:I?b:M.id});return}if(Ce){if(_e==="down"){le({type:"flip",card:M.id});return}!Yn(M)||!ce.has(M.id)||E(I=>{const V=q.filter(W=>Yn(W)&&W.rank===M.rank&&ce.has(W.id)).map(W=>W.id);if(x)return V.every(W=>I.includes(W))?[]:V;if(I.includes(M.id))return I.filter(W=>W!==M.id);const G=q.find(W=>W.id===I[0]);return G&&Yn(G)&&G.rank===M.rank?[...I,M.id]:[M.id]})}}},de=M=>{const x=Math.max(0,Math.min(q.length-1,M));j(x),s.current?.querySelector(`[data-index="${x}"]`)?.focus({preventScroll:!0})};ke.useLayoutEffect(()=>{if(S||h)return;const M=document.activeElement;(!M||M===document.body||s.current?.contains(M))&&(s.current?.querySelector(`[data-index="${Math.min(O,q.length-1)}"]`)??s.current?.querySelector(".sg-primary"))?.focus({preventScroll:!0})},[p,S,h]);const Ie=()=>{if(!Ce)return;if(_e==="down"){q[O]&&le({type:"flip",card:q[O].id});return}const M=v.length?v:q[O]&&ce.has(q[O].id)?[q[O].id]:[];M.length&&le({type:"play",cards:M})},xe=HD(p);return X.jsxs("div",{ref:s,className:"sg-root",role:"application","aria-label":"Skitgubbe with friends","aria-busy":S||h,"data-phase":p.phase,"data-turn":Ce?"you":"other",onKeyDown:M=>{if(!(M.target instanceof HTMLElement)||!M.target.dataset.card)return;const x=Number(M.target.dataset.index);["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","Home","End","Enter"," "].includes(M.key)&&M.preventDefault(),M.key==="Home"&&de(0),M.key==="End"&&de(q.length-1),(M.key==="ArrowLeft"||M.key==="ArrowRight")&&de(x+(M.key==="ArrowLeft"?-1:1)),(M.key==="ArrowUp"||M.key==="ArrowDown")&&de(x+(M.key==="ArrowUp"?-1:1)*e1(q.length,!1,696)),M.key===" "&&oe(q[x],M.shiftKey),M.key==="Enter"&&(se?oe(q[x]):Ie()),M.key.toLowerCase()==="t"&&Ce&&le({type:"pickup"}),M.key.toLowerCase()==="d"&&Ce&&le({type:"chance"})},children:[X.jsx("style",{children:BD}),X.jsxs("header",{className:"sg-header",children:[X.jsx("h1",{children:"Skitgubbe"}),X.jsxs("p",{className:"sg-record",children:[te.name," · with friends"]}),X.jsx("button",{className:"sg-ghost",onClick:()=>{e.setMuted(!w),$(!w)},children:w?"Sound on":"Mute"})]}),X.jsxs("div",{className:"sg-table",style:{height:560-A},children:[X.jsx("div",{className:"sg-scene",ref:o,"aria-hidden":"true"}),ne&&X.jsx("div",{className:"sg-scene-error",children:"3D is unavailable. Use the cards and controls below."}),K&&p.players.map((M,x)=>x?X.jsxs("div",{className:`sg-seat${p.current===x?" is-active":""}`,style:{left:K.seats[x].x,top:K.seats[x].y},children:[X.jsx("strong",{children:M.name}),X.jsx("span",{children:M.place?`Out #${M.place}`:`${M.hand.length} in hand · ${M.down.length} hidden`})]},x):null),K&&p.phase==="playing"&&X.jsxs("div",{className:"sg-need",style:{left:K.pile.x,top:K.pile.y-K.pile.cardWidth},children:[X.jsx("strong",{children:xe.short}),X.jsx("span",{children:xe.detail})]}),K&&X.jsxs("span",{className:"sg-stack-count",style:{left:K.draw.x,top:K.draw.y-K.draw.cardWidth},children:[p.drawCount," to draw"]}),p.phase==="over"&&!S&&X.jsx("div",{className:"sg-result",children:X.jsxs("div",{className:"sg-result-card",role:"dialog","aria-label":"Result",children:[X.jsx("h2",{children:p.skitgubbe===0?"You’re the skitgubbe.":"You made it out."}),X.jsx("ol",{children:[...p.players].sort((M,x)=>M.place-x.place).map(M=>X.jsxs("li",{children:[M.place,". ",M.name]},M.name))}),t.isHost?X.jsx("button",{className:"sg-primary",disabled:!n||h,onClick:()=>void r(),children:"Play again"}):X.jsx("p",{children:"Waiting for the host to deal again."})]})})]}),X.jsx("div",{className:`sg-hand${Ce?" is-turn":""}`,style:{height:176+A},children:Xe.map(M=>X.jsxs("div",{className:`sg-row sg-row-${M.key}${_e===M.key&&p.phase==="playing"?" is-source":""}`,role:"listbox","aria-label":M.label,"aria-multiselectable":!se,children:[X.jsxs("span",{className:"sg-row-label",children:[M.label,_e===M.key&&p.phase==="playing"&&X.jsx("span",{className:"sg-playable-hint",children:" · Playing from here"})]}),!M.cards.length&&X.jsx("span",{className:"sg-batch-empty",children:"Empty"}),X.jsx(rA,{cards:M.cards,width:M.key==="hand"?696:216,cardSize:M.key==="hand"?90:64,slots:M.key==="up"?te.upSlots:void 0,hidden:C,render:(x,I)=>{const V=q.findIndex(W=>W.id===x.id),G=Fe&&M.key!=="down"||Ce&&M.key===_e&&(_e==="down"||ce.has(x.id));return X.jsx("button",{type:"button",role:"option","aria-selected":v.includes(x.id)||b===x.id,"aria-disabled":!G,"data-card":x.id,"data-index":V,tabIndex:V===Math.min(O,q.length-1)?0:-1,onFocus:()=>j(V),"aria-label":Yn(x)?`${Nw(x)}${G?", playable":""}`:`Face-down card ${I+1}`,className:`sg-card${G?" is-playable":""}${v.includes(x.id)||b===x.id?" is-selected":""}`,onClick:W=>oe(x,W.shiftKey),onDoubleClick:()=>{Ce&&ce.has(x.id)&&le({type:"play",cards:v.includes(x.id)?v:[x.id]})},children:Yn(x)?X.jsx(zh,{className:"sg-card-art",rank:x.rank,suit:x.suit}):X.jsxs(X.Fragment,{children:[X.jsx(Km,{className:"sg-card-art"}),X.jsx("span",{className:"sg-back-number",children:I+1})]})},x.id)}})]},M.key))}),X.jsxs("div",{className:"sg-decision",children:[X.jsxs("div",{className:"sg-decision-text",role:"status",children:[X.jsx("strong",{children:t.paused?"Waiting for a player to reconnect":S?"Cards in motion":se?"Set up your table":p.phase==="swap"?"Waiting for everyone to be ready":Ce?`Your turn: ${xe.short.toLowerCase()}`:te.place?`You finished #${te.place}`:`Waiting for ${p.players[p.current].name}`}),X.jsx("span",{children:se?"Select a hand card and a face-up card. Matches stack; different ranks swap.":Q})]}),X.jsx("div",{className:"sg-actions",children:se?X.jsx("button",{className:"sg-primary",disabled:!Fe,onClick:()=>void le({type:"ready"}),children:"Ready to play"}):p.phase==="playing"&&te.place===null?X.jsxs(X.Fragment,{children:[t.canChance&&X.jsx("button",{className:"sg-secondary",disabled:!Ce,onClick:()=>void le({type:"chance"}),children:"Chance card"}),t.canPickUp&&X.jsx("button",{className:"sg-secondary",disabled:!Ce,onClick:()=>void le({type:"pickup"}),children:"Take the pile"}),t.canPass&&X.jsx("button",{className:"sg-secondary",disabled:!Ce,onClick:()=>void le({type:"pass"}),children:"Pass"}),X.jsx("button",{className:"sg-primary",disabled:!Ce||_e!=="down"&&!v.length&&!ce.has(q[O]?.id??""),onClick:Ie,children:_e==="down"?"Turn a card over":`Play${v.length>1?` ${v.length} cards`:""}`})]}):null})]}),X.jsx("div",{className:"sg-flights",ref:a,"aria-hidden":"true"})]})}const GD=".sg-lan{width:1240px;min-height:904px;color:#eef1f5;background:#171b21;font:14px/1.5 system-ui,sans-serif;border-radius:14px;overflow:hidden}.sg-lan *{box-sizing:border-box}.sg-lobby{width:640px;margin:70px auto;padding:32px;border:1px solid #ffffff22;border-radius:14px;background:#20262e}.sg-lobby h1{font:32px Georgia,serif;margin:0 0 16px}.sg-lobby p{color:#bbc2cc}.sg-lobby label{display:flex;flex-direction:column;gap:6px;margin:14px 0}.sg-lobby input:not([type=checkbox]){padding:10px 12px;border:1px solid #ffffff40;border-radius:6px;color:#fff;background:#151a21;font:inherit}.sg-lan button{padding:10px 16px;margin:4px;color:#eef1f5;border:1px solid #ffffff33;border-radius:8px;background:#303945;font:inherit;cursor:pointer}.sg-lan button:disabled{opacity:.45;cursor:default}.sg-lan .sg-primary{background:#e3c56f;color:#241a06}.sg-join-fields{margin-top:22px;padding-top:8px;border-top:1px solid #ffffff22}.sg-lobby .sg-lan-rule{flex-direction:row;align-items:start}.sg-lan-rule small{display:block;color:#bbc2cc;font-size:12px}.sg-members{padding-left:24px}.sg-members li{padding:5px}.sg-share{color:#e3c56f!important;overflow-wrap:anywhere;user-select:all}.sg-lan-bar{height:40px;display:flex;align-items:center;gap:16px;padding:0 14px;font-size:12px}.sg-lan-bar span:first-child{margin-right:auto;user-select:all}.sg-lan-bar button{padding:3px 10px}.sg-lan .sg-root button{margin:0}.sg-lan .sg-card{padding:0;background:none;border:none}.sg-lobby [role=alert]{color:#ffc0b5}",pu=()=>[...crypto.getRandomValues(new Uint8Array(24))].map(t=>t.toString(16).padStart(2,"0")).join(""),H_=async({path:t,method:e,headers:n,body:i})=>fetch(t,{method:e,headers:n,body:i,cache:"no-store"}),ia="skitgubbe.lan-seat";function WD({api:t,audio:e}){const[n,i]=ke.useState(null),[r,s]=ke.useState(""),[o,a]=ke.useState(""),[l,u]=ke.useState(""),[c,f]=ke.useState(""),[d,p]=ke.useState(!1),[g,S]=ke.useState(!1),[m,h]=ke.useState(!0),[_,v]=ke.useState(!1),E=ke.useRef(!1),[b,R]=ke.useState({...Lm}),C=ke.useRef(null),P=ke.useRef(H_),Q=ke.useRef(-1),y=ke.useRef(""),w=ke.useRef(Promise.resolve()),$=ke.useRef(!0),O=ke.useRef("");if(!O.current)try{O.current=sessionStorage.getItem("sg.lan-nonce")??pu(),sessionStorage.setItem("sg.lan-nonce",O.current)}catch{O.current=pu()}const j=async U=>{C.current=U;try{U?sessionStorage.setItem(ia,JSON.stringify(U)):sessionStorage.removeItem(ia)}catch{}t?.storage&&await t.storage.set(ia,U)},K=async(U,Z,te=C.current?.token)=>{const se=await P.current({path:U,method:"POST",headers:{"Content-Type":"application/json",...te?{Authorization:`Bearer ${te}`}:{}},body:JSON.stringify(Z)}),_e=await se.json();if(!se.ok)throw new Error(_e.error??`Host returned ${se.status}.`);return _e},z=(U,Z={})=>{const te=C.current?.token,se=w.current.then(async()=>{const _e=await K(U,{...Z,since:Q.current},te);if(!(!$.current||te!==C.current?.token||E.current)){if(_e.revision>=Q.current){Q.current=_e.revision,i(_e);const Ce=JSON.stringify(_e.rules);y.current!==Ce&&(y.current=Ce,R(_e.rules))}p(!0),f("")}}).catch(_e=>{throw $.current&&te===C.current?.token&&!E.current&&(f(_e instanceof Error?_e.message:String(_e)),p(!1)),_e});return w.current=se.catch(()=>{}),se},ne=async U=>{if(!t)P.current=H_;else if(U.host){if(!t.services)throw new Error("This Agent Code build does not support LAN services.");await t.services.start(Au);const Z=await t.services.expose(Au,!0);if(!Z.lan||!Z.port)throw new Error("LAN exposure was not granted.");if(U.urls=Bw(await t.services.invoke(Au,"status",{}),Z.port),!U.urls.length)throw new Error("No private network address found. Connect to your local Wi-Fi or Ethernet and try again.");P.current=kw()}else{if(!t.net)throw new Error("This Agent Code build does not support LAN joining.");P.current=Ow(t.net,N0(U.destination))}C.current=U};ke.useEffect(()=>{$.current=!0,(async()=>{try{let te=null;try{te=JSON.parse(sessionStorage.getItem(ia)??"null")}catch{}!te&&t?.storage&&(te=await t.storage.get(ia)??null),te&&typeof te.token=="string"&&/^[a-f0-9]{48}$/.test(te.token)&&(await ne(te),await z("/api/state"))}catch(te){$.current&&f(te instanceof Error?te.message:String(te))}finally{$.current&&h(!1)}})();let U;const Z=async()=>{C.current?.token&&!E.current&&await z("/api/state").catch(()=>{}),$.current&&(U=setTimeout(Z,700))};return U=setTimeout(Z,700),()=>{$.current=!1,clearTimeout(U)}},[]);const D=async U=>{if(!(g||!r.trim())){S(!0),f("");try{const Z={token:"",host:U,destination:U||!t?"":N0(l),urls:t?[]:[location.origin]};await ne(Z);const te=await K(U?"/api/create":"/api/join",{name:r,nonce:O.current,...U?{}:{code:o}},"");if(!te.token)throw new Error("Host did not return a seat.");Z.token=te.token,await j(Z),Q.current=-1,await z("/api/state")}catch(Z){f(Z instanceof Error?Z.message:String(Z))}finally{S(!1)}}},J=async U=>{await z("/api/action",{revision:Q.current,requestId:pu(),gameId:n?.snapshot?.gameId,action:U})},ee=async()=>{S(!0);try{await z("/api/start",{revision:Q.current,rules:b})}catch{}finally{S(!1)}},re=async()=>{S(!0);try{if(await w.current,C.current?.token&&!n?.closed&&await K("/api/leave",{}),n?.snapshot&&!n.isHost&&!n.closed){E.current=!0,v(!0),f("");return}await j(null),Q.current=-1,i(null),p(!1),f(""),O.current=pu();try{sessionStorage.setItem("sg.lan-nonce",O.current)}catch{}}catch(U){f(U instanceof Error?U.message:String(U))}finally{S(!1)}},Pe=async()=>{await j(null),E.current=!1,v(!1),Q.current=-1,i(null),f("")},Ge=n?`${C.current?.urls.join(" or ")||l||location.origin} · Room ${n.code}`:"";return X.jsxs("div",{className:"sg-lan",children:[X.jsx("style",{children:GD}),_?X.jsxs("section",{className:"sg-lobby",children:[X.jsx("h1",{children:"Your seat is waiting"}),X.jsx("p",{children:"The table is paused while you’re away. Reopening this view also restores your seat."}),X.jsx("button",{onClick:()=>{E.current=!1,v(!1),z("/api/state").catch(()=>{})},children:"Resume game"})]}):n?.snapshot&&!n.closed?X.jsxs(X.Fragment,{children:[X.jsxs("div",{className:"sg-lan-bar",children:[X.jsx("span",{children:n.isHost?Ge:`Room ${n.code}`}),X.jsx("span",{role:"status",children:c||(d?n.paused?`Waiting for ${n.members.filter(U=>!U.connected).map(U=>U.name).join(", ")} to reconnect`:"Connected":"Reconnecting…")}),X.jsx("button",{onClick:()=>void re(),disabled:g,children:n.isHost?"End room":"Step away"}),!d&&X.jsx("button",{onClick:()=>void Pe(),children:"Forget saved seat"})]}),X.jsx(VD,{room:n,audio:e,enabled:d&&!n.paused&&!g,action:J,onAgain:ee})]}):X.jsxs("section",{className:"sg-lobby",children:[X.jsx("h1",{children:"Skitgubbe with friends"}),m?X.jsx("p",{children:"Restoring your seat…"}):n?n.closed?X.jsxs(X.Fragment,{children:[X.jsx("p",{children:"The host ended this room."}),X.jsx("button",{onClick:()=>void re(),children:"Back to rooms"})]}):X.jsxs(X.Fragment,{children:[X.jsx("p",{className:"sg-share",children:n.isHost?Ge:`Room ${n.code}`}),n.isHost&&C.current?.urls.every(U=>U.includes("127.0.0.1"))&&X.jsx("p",{children:"Friends use this computer’s private network address with the same port."}),X.jsx("ol",{className:"sg-members",children:n.members.map((U,Z)=>X.jsxs("li",{children:[U.name,U.host?" · Host":""," · ",U.connected?"Connected":"Reconnecting"]},Z))}),X.jsx("p",{children:n.isHost?"Deal when everyone has joined (2–4 players).":"Waiting for the host to deal."}),n.isHost&&X.jsxs("details",{children:[X.jsx("summary",{children:"House rules"}),zD.map(U=>X.jsxs("label",{className:"sg-lan-rule",children:[X.jsx("input",{type:"checkbox",checked:b[U.key],onChange:Z=>R(te=>({...te,[U.key]:Z.target.checked}))}),X.jsxs("span",{children:[U.title,X.jsx("small",{children:U.detail})]})]},U.key))]}),n.isHost&&X.jsx("button",{className:"sg-primary",disabled:g||n.members.length<2||n.paused,onClick:()=>void ee(),children:"Deal cards"}),X.jsx("button",{onClick:()=>void re(),disabled:g,children:n.isHost?"End room":"Leave room"})]}):X.jsxs(X.Fragment,{children:[X.jsx("p",{children:"Host a table, or join a friend on the same network."}),X.jsxs("label",{children:["Your name",X.jsx("input",{autoComplete:"nickname",maxLength:24,value:r,onChange:U=>s(U.target.value)})]}),X.jsx("button",{className:"sg-primary",disabled:g||!r.trim(),onClick:()=>void D(!0),children:"Host a room"}),X.jsxs("div",{className:"sg-join-fields",children:[t&&X.jsxs("label",{children:["Host address",X.jsx("input",{placeholder:"http://192.168.1.42:5193",value:l,onChange:U=>u(U.target.value)})]}),X.jsxs("label",{children:["Room code",X.jsx("input",{maxLength:8,value:o,onChange:U=>a(U.target.value.toUpperCase())})]}),X.jsx("button",{disabled:g||!r.trim()||!o.trim(),onClick:()=>void D(!1),children:"Join room"})]}),C.current?.token&&X.jsx("button",{onClick:()=>void Pe(),children:"Forget saved seat"})]}),X.jsx("p",{role:"alert",children:c})]})]})}const V_=.5;class $D{ctx=null;master=null;noiseBuf=null;muted=!1;last=new Map;unlock(){if(!this.muted){if(!this.ctx)try{const e=window.AudioContext??window.webkitAudioContext;if(!e)return;const n=new e,i=n.createGain();i.gain.value=V_;const r=n.createDynamicsCompressor();r.threshold.value=-20,r.knee.value=12,r.ratio.value=3,i.connect(r),r.connect(n.destination);const s=Math.floor(n.sampleRate*.6),o=n.createBuffer(1,s,n.sampleRate),a=o.getChannelData(0);let l=0;for(let u=0;u<s;u++)l=(l+(Math.random()*2-1)*.08)*.985,a[u]=l*3;this.ctx=n,this.master=i,this.noiseBuf=o}catch{this.ctx=null}this.ctx?.state==="suspended"&&this.ctx.resume().catch(()=>{})}}setMuted(e){if(this.muted=e,!this.ctx||!this.master)return;const n=this.ctx.currentTime;this.master.gain.cancelScheduledValues(n),this.master.gain.setTargetAtTime(e?0:V_,n,.02)}get isMuted(){return this.muted}admit(e,n){const i=this.ctx;if(!i||this.muted)return!1;const r=this.last.get(e)??-1/0;return i.currentTime-r<n&&i.currentTime>=r?!1:(this.last.set(e,i.currentTime),!0)}jitter(e){return 2**((Math.random()*2-1)*e/1200)}tone(e,n,i,r=0,s="sine",o=.008){const a=this.ctx;if(!a||!this.master||this.muted)return;const l=a.currentTime+r,u=a.createOscillator(),c=a.createGain();u.type=s,u.frequency.setValueAtTime(e,l),c.gain.setValueAtTime(1e-4,l),c.gain.linearRampToValueAtTime(i,l+o),c.gain.exponentialRampToValueAtTime(1e-4,l+n),u.connect(c),c.connect(this.master),u.onended=()=>{u.disconnect(),c.disconnect()},u.start(l),u.stop(l+n+.05)}rustle(e,n,i,r=0,s=.01,o){const a=this.ctx;if(!a||!this.master||this.muted||!this.noiseBuf)return;const l=a.currentTime+r,u=a.createBufferSource();u.buffer=this.noiseBuf,u.loop=!0,u.playbackRate.value=this.jitter(120);const c=a.createBiquadFilter();c.type="lowpass",c.frequency.setValueAtTime(i,l),o&&c.frequency.exponentialRampToValueAtTime(o,l+e);const f=a.createGain();f.gain.setValueAtTime(1e-4,l),f.gain.linearRampToValueAtTime(n,l+s),f.gain.exponentialRampToValueAtTime(1e-4,l+e),u.connect(c),c.connect(f),f.connect(this.master),u.onended=()=>{u.disconnect(),c.disconnect(),f.disconnect()},u.start(l,Math.random()*.5),u.stop(l+e+.05)}place(){if(!this.admit("place",.06))return;const e=this.jitter(80);this.rustle(.09,.22,1400*e,0,.003),this.tone(150*e,.07,.05)}deal(){if(this.admit("deal",.5))for(let e=0;e<9;e++)this.rustle(.05,.08+Math.random()*.04,1800,e*.09+Math.random()*.02,.004)}reveal(){this.admit("reveal",.1)&&this.rustle(.12,.12,2200,0,.02,900)}gather(){this.admit("gather",.2)&&this.rustle(.32,.14,1600,0,.06,500)}burn(){this.admit("burn",.3)&&(this.rustle(.55,.3,700,0,.05,2400),this.tone(82,.45,.12,.02,"sine",.04),this.tone(123,.35,.05,.05,"triangle",.04))}yourTurn(){this.admit("turn",.4)&&(this.tone(660,.18,.045,0,"triangle",.01),this.tone(990,.22,.035,.09,"triangle",.01))}out(){this.tone(523,.3,.06,0,"triangle"),this.tone(659,.4,.05,.1,"triangle")}won(){[523,659,784,1047].forEach((e,n)=>this.tone(e,n===3?.6:.25,.06,n*.1,"triangle"))}lost(){this.tone(392,.35,.06,0,"triangle"),this.tone(311,.55,.05,.18,"triangle")}dispose(){this.ctx&&this.ctx.close().catch(()=>{}),this.ctx=null,this.master=null}}const mg=new $D;window.addEventListener("pointerdown",()=>mg.unlock());window.addEventListener("keydown",()=>mg.unlock());tS(document.getElementById("app")).render(X.jsx(WD,{audio:mg}));const tM=()=>{const t=document.getElementById("app"),e=Math.min(1,(innerWidth-16)/1240,(innerHeight-16)/904);t.style.transform=`scale(${e})`,t.style.marginTop=`${Math.max(8,(innerHeight-904*e)/2)}px`,t.style.marginLeft=`${Math.max(8,(innerWidth-1240*e)/2)}px`};window.addEventListener("resize",tM);tM();
