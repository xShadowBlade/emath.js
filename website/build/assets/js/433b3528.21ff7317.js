"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[24],{3905:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>h});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var l=r.createContext({}),c=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},u=function(e){var t=c(e.components);return r.createElement(l.Provider,{value:t},e.children)},p="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,l=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),p=c(n),d=a,h=p["".concat(l,".").concat(d)]||p[d]||m[d]||o;return n?r.createElement(h,i(i({ref:t},u),{},{components:n})):r.createElement(h,i({ref:t},u))}));function h(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,i=new Array(o);i[0]=d;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s[p]="string"==typeof e?e:a,i[1]=s;for(var c=2;c<o;c++)i[c]=n[c];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},933:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>i,default:()=>m,frontMatter:()=>o,metadata:()=>s,toc:()=>c});var r=n(7462),a=(n(7294),n(3905));const o={id:"E",title:"E"},i=void 0,s={unversionedId:"eMath/E/E",id:"eMath/E/E",title:"E",description:"---",source:"@site/docs/eMath/E/e.md",sourceDirName:"eMath/E",slug:"/eMath/E/",permalink:"/emath.js/docs/eMath/E/",draft:!1,editUrl:"https://github.com/xShadowBlade/emath.js/tree/main/website/docs/eMath/E/e.md",tags:[],version:"current",frontMatter:{id:"E",title:"E"},sidebar:"doc1Sidebar",previous:{title:"Usage",permalink:"/emath.js/docs/usage"},next:{title:"Format",permalink:"/emath.js/docs/eMath/E/format"}},l={},c=[{value:"Usage",id:"usage",level:3}],u={toc:c},p="wrapper";function m(e){let{components:t,...n}=e;return(0,a.kt)(p,(0,r.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("hr",null),(0,a.kt)("p",null,"The ",(0,a.kt)("inlineCode",{parentName:"p"},"E")," function is the main feature of this package. It is based on ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/Patashu/break_eternity.js"},"break_eternity.js"),", which is a number library for numbers bigger than the normal limit of ",(0,a.kt)("inlineCode",{parentName:"p"},"1.79e+308"),"."),(0,a.kt)("h3",{id:"usage"},"Usage"),(0,a.kt)("p",null,"Assuming that you already followed the instructions in the ",(0,a.kt)("a",{parentName:"p",href:"../../usage"},"usage guide"),", you can use it as:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},"const { E } = eMath;\n\nconst newNum2 = E(2300); // Number with value 2300\nnewNum2; // 2300\n")),(0,a.kt)("p",null,"The methods and functions are the same as breaK_eternity.js, which are the same as ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/MikeMcl/decimal.js"},"Decimal.js"),". For example,"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},"const { E } = eMath;\n\nconst x = E(123.4567);\nconst y = E('123456.7e-3');\nconst z = E(x);\nx.equals(y) && y.equals(z) && x.equals(z); // true\n")),(0,a.kt)("p",null,"To call methods, you can call ",(0,a.kt)("inlineCode",{parentName:"p"},"E[method]"),". For example,"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},"const { E } = eMath;\n\nconst x = E(63);\nconst y = E(7);\n\nE.divide(x, y); // E(9)\n")))}m.isMDXComponent=!0}}]);