(this.webpackJsonppulse=this.webpackJsonppulse||[]).push([[0],{10:function(e,t,a){e.exports={root:"App_root__2CSG3",input:"App_input__13lVr",button:"App_button__z3Rot",table:"App_table__1ESJA",header:"App_header__2L3DO",annotation:"App_annotation__3-Cgl",row:"App_row__3uKGE",active:"App_active__2jQ78",cell:"App_cell__2E5fJ",inner:"App_inner__KKynl"}},48:function(e,t,a){e.exports=a(58)},53:function(e,t,a){},58:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(7),o=a.n(l),c=(a(53),a(20)),i=a(86),u=a(101),m=a(98),s=a(92),p=a(99),d=a(102),f=a(95),b=a(93),v=a(94),w=a(97),g=a(13),y={djembe1:[new Audio("mp3/b1.mp3"),new Audio("mp3/t1.mp3"),new Audio("mp3/s1.mp3")],djembe2:[new Audio("mp3/b2.mp3"),new Audio("mp3/t2.mp3"),new Audio("mp3/s2.mp3")],djembe3:[new Audio("mp3/b3.mp3"),new Audio("mp3/t3.mp3"),new Audio("mp3/s3.mp3")],drums:[new Audio("mp3/b4.mp3"),new Audio("mp3/t4.mp3"),new Audio("mp3/s4.mp3")]};function h(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function k(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?h(a,!0).forEach((function(t){Object(g.a)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):h(a).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}var E=decodeURI(window.location.search.substr(1)),O=E?{playRow:0,signature:E,track:j(E)}:{playRow:0,signature:"--------",track:Array(8).fill(null).map((function(e){return Array(3).fill(!1)}))};function C(e){var t="";return e.forEach((function(e){e[0]?t+="B":e[1]?t+="t":e[2]?t+="S":t+="-"})),t}function j(e){var t=e.toLowerCase().replace(/\s/g,"");return Array(t.length).fill(null).map((function(e,a){var n=Array(3).fill(!1);switch(t[a]){case"b":n[0]=!0;break;case"t":n[1]=!0;break;case"s":n[2]=!0}return n}))}var x={onLengthChange:function(e,t){var a=t.payload.length,n=Array(a).fill(null).map((function(t,a){return e.track[a]||Array(3).fill(!1)}));return k({},e,{track:n,signature:C(n)})},onCellClick:function(e,t){var a=t.payload,n=a.rowIndex,r=a.cellIndex,l=e.track.map((function(e,t){return n!==t?e:e.map((function(e,t){return t===r&&!e}))}));return k({},e,{track:l,signature:C(l)})},onPlayNext:function(e,t){var a=e.playRow,n=e.track,r=t.payload.instrument;if(!n.length)return k({},e,{playRow:0});var l=n[a]?a:0,o=n[l].findIndex((function(e){return e}));if(o>-1){var c=y[r][o];c.volume=1,c.currentTime=0,c.play()}return k({},e,{playRow:n[l+1]?l+1:0})},onSignatureChange:function(e,t){var a=t.payload.signature.value;return k({},e,{signature:a,track:j(a)})}},A=function(e,t){return x[t.type](e,t)},_=a(10),I=a.n(_);function N(e){return r.a.createElement("div",{className:I.a.table},r.a.createElement("div",{className:I.a.header},r.a.createElement("div",{className:I.a.annotation}),r.a.createElement("div",{className:I.a.annotation},"B"),r.a.createElement("div",{className:I.a.annotation},"t"),r.a.createElement("div",{className:I.a.annotation},"S")),e.track.map((function(t,a){return r.a.createElement(R,{key:a,rowIndex:a,activeRowIndex:e.activeRowIndex,row:t,onCellClick:e.onCellClick})})))}function R(e){return r.a.createElement("div",{className:"".concat(I.a.row," ").concat(e.rowIndex===e.activeRowIndex?I.a.active:"")},r.a.createElement("div",{className:I.a.annotation},e.rowIndex+1),e.row.map((function(t,a){return r.a.createElement(P,{key:a,active:!!t,rowIndex:e.rowIndex,cellIndex:a,onClick:e.onCellClick})})))}function P(e){return r.a.createElement("div",{className:"".concat(e.active?I.a.active:""," ").concat(I.a.cell)},r.a.createElement("div",{className:I.a.inner,"data-row-index":e.rowIndex,"data-cell-index":e.cellIndex,onClick:e.onClick}))}var S=window.AudioContext||window.webkitAudioContext;S&&new S;console.log("Test auto build - 2");var W=function(){var e=Object(n.useReducer)(A,O),t=Object(c.a)(e,2),a=t[0],l=t[1],o=Object(n.useState)(!1),g=Object(c.a)(o,2),h=g[0],k=g[1],E=Object(n.useState)(150),C=Object(c.a)(E,2),j=C[0],x=C[1],_=Object(n.useState)(Object.keys(y)[0]),R=Object(c.a)(_,2),P=R[0],S=R[1],W=Object(n.useCallback)((function(e){var t=+e.target.value;Number.isNaN(t)||t<0||x(Math.round(t))}),[]),D=Object(n.useCallback)((function(e){var t=e.target.value;S(t)}),[]),M=Object(n.useCallback)((function(e){var t=e.target.value;l({type:"onSignatureChange",payload:{signature:{value:t}}})}),[]),H=Object(n.useCallback)((function(){x(2*j)}),[j]),J=Object(n.useCallback)((function(e){x(j/2)}),[j]),L=Object(n.useCallback)((function(e){var t=+e.target.value;Number.isNaN(t)||t<0||l({type:"onLengthChange",payload:{length:Math.round(t)}})}),[]),B=Object(n.useCallback)((function(e){var t,a=+e.target.getAttribute("data-row-index"),n=+e.target.getAttribute("data-cell-index");l({type:"onCellClick",payload:{rowIndex:(t={rowIndex:a,cellIndex:n}).rowIndex,cellIndex:t.cellIndex}})}),[]),F=Object(n.useCallback)((function(){y[P].forEach((function(e){e.volume=0,e.load(),e.play(),e.pause()})),k(!h)}),[h,P]),K=Object(n.useMemo)((function(){return h?0===a.playRow?a.track.length-1:a.playRow-1:null}),[h,a]);Object(n.useEffect)((function(){if(h){var e=setInterval((function(){l(function(e){return{type:"onPlayNext",payload:{instrument:e}}}(P))}),6e4/j);return function(){return clearInterval(e)}}}),[j,h,P]);var z=Object(n.useRef)(null),G=Object(n.useState)(0),T=Object(c.a)(G,2),Q=T[0],U=T[1];return Object(n.useEffect)((function(){U(z.current.offsetWidth)}),[]),r.a.createElement(i.a,{container:!0,component:"main",className:I.a.root,spacing:2},r.a.createElement(i.a,{item:!0,xs:12},r.a.createElement(u.a,{value:a.track.length,label:"\u0420\u0430\u0437\u043c\u0435\u0440",margin:"normal",variant:"outlined",style:{width:"5rem"},onChange:L}),"\xa0",r.a.createElement(u.a,{value:j,label:"\u0422\u0435\u043c\u043f",margin:"normal",variant:"outlined",style:{width:"10rem"},InputProps:{endAdornment:r.a.createElement(m.a,{position:"end"},r.a.createElement(s.a,{style:{maxWidth:"2rem",maxHeight:"2rem",minWidth:"2rem",minHeight:"2rem"},onClick:H},"x2"),r.a.createElement(s.a,{style:{maxWidth:"2rem",maxHeight:"2rem",minWidth:"2rem",minHeight:"2rem"},onClick:J},"/2"))},onChange:W}),"\xa0",r.a.createElement(p.a,{margin:"normal",variant:"outlined",style:{width:"10rem"}},r.a.createElement(d.a,{ref:z,htmlFor:"instrument-select"},"\u0418\u043d\u0441\u0442\u0440\u0443\u043c\u0435\u043d\u0442"),r.a.createElement(f.a,{value:P,native:!0,labelWidth:Q,onChange:D,inputProps:{id:"instrument-select"}},Object.keys(y).map((function(e){return r.a.createElement("option",{key:e,value:e},e)})))),"\xa0",r.a.createElement(p.a,{margin:"normal",variant:"outlined"},r.a.createElement(b.a,{variant:"contained",size:"large",onClick:F,endIcon:r.a.createElement(v.a,null,h?"pause":"play_arrow")},h?"Pause":"Play")),r.a.createElement(w.a,{fontFamily:"Monospace"},r.a.createElement(u.a,{value:a.signature,label:"\u0420\u0438\u0441\u0443\u043d\u043e\u043a",margin:"normal",fullWidth:!0,fontFamily:"Monospace",onChange:M}),"\xa0")),r.a.createElement(i.a,{item:!0,xs:12},r.a.createElement(N,{track:a.track,onCellClick:B,activeRowIndex:K})))};o.a.render(r.a.createElement(W,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[48,1,2]]]);
//# sourceMappingURL=main.27781e64.chunk.js.map