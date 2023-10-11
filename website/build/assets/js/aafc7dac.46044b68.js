"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[665],{3905:(e,t,n)=>{n.d(t,{Zo:()=>m,kt:()=>d});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var c=r.createContext({}),u=function(e){var t=r.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},m=function(e){var t=u(e.components);return r.createElement(c.Provider,{value:t},e.children)},s="mdxType",p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},f=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,c=e.parentName,m=i(e,["components","mdxType","originalType","parentName"]),s=u(n),f=a,d=s["".concat(c,".").concat(f)]||s[f]||p[f]||o;return n?r.createElement(d,l(l({ref:t},m),{},{components:n})):r.createElement(d,l({ref:t},m))}));function d(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,l=new Array(o);l[0]=f;var i={};for(var c in t)hasOwnProperty.call(t,c)&&(i[c]=t[c]);i.originalType=e,i[s]="string"==typeof e?e:a,l[1]=i;for(var u=2;u<o;u++)l[u]=n[u];return r.createElement.apply(null,l)}return r.createElement.apply(null,n)}f.displayName="MDXCreateElement"},1689:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>l,default:()=>p,frontMatter:()=>o,metadata:()=>i,toc:()=>u});var r=n(7462),a=(n(7294),n(3905));const o={id:"format",title:"Format"},l=void 0,i={unversionedId:"eMath/E/format",id:"eMath/E/format",title:"Format",description:"---",source:"@site/docs/eMath/E/format.md",sourceDirName:"eMath/E",slug:"/eMath/E/format",permalink:"/emath.js/docs/eMath/E/format",draft:!1,editUrl:"https://github.com/xShadowBlade/emath.js/tree/main/website/docs/eMath/E/format.md",tags:[],version:"current",frontMatter:{id:"format",title:"Format"},sidebar:"doc1Sidebar",previous:{title:"E",permalink:"/emath.js/docs/eMath/E/"},next:{title:"Attribute",permalink:"/emath.js/docs/eMath/classes/attribute"}},c={},u=[{value:"Usage",id:"usage",level:3},{value:"Normal Outputs",id:"normal-outputs",level:3}],m={toc:u},s="wrapper";function p(e){let{components:t,...n}=e;return(0,a.kt)(s,(0,r.Z)({},m,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("hr",null),(0,a.kt)("p",null,"The ",(0,a.kt)("inlineCode",{parentName:"p"},"E.format()")," function is the main way to convert ",(0,a.kt)("inlineCode",{parentName:"p"},"E")," to a ",(0,a.kt)("inlineCode",{parentName:"p"},"string"),"."),(0,a.kt)("h3",{id:"usage"},"Usage"),(0,a.kt)("p",null,"After you create a new ",(0,a.kt)("inlineCode",{parentName:"p"},"E"),", you can call the ",(0,a.kt)("inlineCode",{parentName:"p"},"format()")," method."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},'const { E } = eMath;\n\nconst newNum = E(2300); // Number with value 2300\nnewNum.format(); // "2,300"\n')),(0,a.kt)("p",null,"Alternatively, you can use the static ",(0,a.kt)("inlineCode",{parentName:"p"},"E.format()")," method."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},'const { E } = eMath;\n\nconst newNum2 = E(2000); // Number with value 2000\nE.format(newNum2); // "2,300"\n')),(0,a.kt)("h3",{id:"normal-outputs"},"Normal Outputs"),(0,a.kt)("p",null,"After you reach 1,000,000,000 (1 billion), the format is automatically converted into letter form."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},'const { E } = eMath;\n\nconst newNum3 = E(1.23e9); // Number with value 1.23 billion\nE.format(newNum2); // "1.23 B"\n')),(0,a.kt)("p",null,"After you reach 1e+303 (1 novemnonagintillion), the format is automatically converted into scientific form."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},'const { E } = eMath;\n\nconst newNum3 = E(1.32e303); // Number with value 1.32 novemnonagintillion\nE.format(newNum3); // "1.32e303"\n')),(0,a.kt)("p",null,"After you reach 1e+1,000,000,000, the format is automatically converted into the following form."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},"const { E } = eMath;\n\nconst newNum3 = E('1ee9'); // Number\nnewNum3.format(); // \"e1.000 B\"\n")),(0,a.kt)("p",null,"After you reach 1e+e+303, the format is automatically converted into the following form."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},"const { E } = eMath;\n\nconst newNum4 = E('ee303'); // Number\nconsole.log(newNum4.format()); // \"e1.00e303\"\n")))}p.isMDXComponent=!0}}]);