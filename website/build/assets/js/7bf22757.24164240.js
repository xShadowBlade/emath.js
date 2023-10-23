"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[194],{3905:(t,e,a)=>{a.d(e,{Zo:()=>s,kt:()=>d});var r=a(7294);function n(t,e,a){return e in t?Object.defineProperty(t,e,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[e]=a,t}function i(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,r)}return a}function l(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?i(Object(a),!0).forEach((function(e){n(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):i(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}function u(t,e){if(null==t)return{};var a,r,n=function(t,e){if(null==t)return{};var a,r,n={},i=Object.keys(t);for(r=0;r<i.length;r++)a=i[r],e.indexOf(a)>=0||(n[a]=t[a]);return n}(t,e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);for(r=0;r<i.length;r++)a=i[r],e.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(t,a)&&(n[a]=t[a])}return n}var o=r.createContext({}),p=function(t){var e=r.useContext(o),a=e;return t&&(a="function"==typeof t?t(e):l(l({},e),t)),a},s=function(t){var e=p(t.components);return r.createElement(o.Provider,{value:e},t.children)},b="mdxType",c={inlineCode:"code",wrapper:function(t){var e=t.children;return r.createElement(r.Fragment,{},e)}},m=r.forwardRef((function(t,e){var a=t.components,n=t.mdxType,i=t.originalType,o=t.parentName,s=u(t,["components","mdxType","originalType","parentName"]),b=p(a),m=n,d=b["".concat(o,".").concat(m)]||b[m]||c[m]||i;return a?r.createElement(d,l(l({ref:e},s),{},{components:a})):r.createElement(d,l({ref:e},s))}));function d(t,e){var a=arguments,n=e&&e.mdxType;if("string"==typeof t||n){var i=a.length,l=new Array(i);l[0]=m;var u={};for(var o in e)hasOwnProperty.call(e,o)&&(u[o]=e[o]);u.originalType=t,u[b]="string"==typeof t?t:n,l[1]=u;for(var p=2;p<i;p++)l[p]=a[p];return r.createElement.apply(null,l)}return r.createElement.apply(null,a)}m.displayName="MDXCreateElement"},954:(t,e,a)=>{a.r(e),a.d(e,{assets:()=>o,contentTitle:()=>l,default:()=>c,frontMatter:()=>i,metadata:()=>u,toc:()=>p});var r=a(7462),n=(a(7294),a(3905));const i={id:"attribute",title:"Attribute"},l=void 0,u={unversionedId:"eMath/classes/attribute",id:"eMath/classes/attribute",title:"Attribute",description:"attribute",source:"@site/docs/eMath/classes/attribute.md",sourceDirName:"eMath/classes",slug:"/eMath/classes/attribute",permalink:"/emath.js/docs/eMath/classes/attribute",draft:!1,editUrl:"https://github.com/xShadowBlade/emath.js/tree/main/website/docs/eMath/classes/attribute.md",tags:[],version:"current",frontMatter:{id:"attribute",title:"Attribute"},sidebar:"doc1Sidebar",previous:{title:"Format",permalink:"/emath.js/docs/eMath/E/format"},next:{title:"Boost",permalink:"/emath.js/docs/eMath/classes/boost"}},o={},p=[{value:"attribute",id:"attribute",level:2},{value:"new attribute(initial)",id:"new-attributeinitial",level:3},{value:"attribute.initial : <code>E</code>",id:"attributeinitial--e",level:3},{value:"attribute.value : <code>E</code>",id:"attributevalue--e",level:3},{value:"attribute.boost : <code>Game.classes.boost</code>",id:"attributeboost--gameclassesboost",level:3},{value:"attribute.update(effect) \u21d2 <code>E</code>",id:"attributeupdateeffect--e",level:3}],s={toc:p},b="wrapper";function c(t){let{components:e,...a}=t;return(0,n.kt)(b,(0,r.Z)({},s,a,{components:e,mdxType:"MDXLayout"}),(0,n.kt)("h2",{id:"attribute"},"attribute"),(0,n.kt)("p",null,"Represents a static attribute in the game."),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"Kind"),": global class  "),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"#attribute"},"attribute"),(0,n.kt)("ul",{parentName:"li"},(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"#new_attribute_new"},"new attribute(initial)")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"#attribute+initial"},".initial")," : ",(0,n.kt)("inlineCode",{parentName:"li"},"E")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"#attribute+value"},".value")," : ",(0,n.kt)("inlineCode",{parentName:"li"},"E")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"#attribute+boost"},".boost")," : ",(0,n.kt)("inlineCode",{parentName:"li"},"Game.classes.boost")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"#attribute+update"},".update(effect)")," \u21d2 ",(0,n.kt)("inlineCode",{parentName:"li"},"E"))))),(0,n.kt)("a",{name:"new_attribute_new"}),(0,n.kt)("h3",{id:"new-attributeinitial"},"new attribute(initial)"),(0,n.kt)("p",null,"Constructs a static attribute with an initial effect."),(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:null},"Param"),(0,n.kt)("th",{parentName:"tr",align:null},"Type"),(0,n.kt)("th",{parentName:"tr",align:null},"Description"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"initial"),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("inlineCode",{parentName:"td"},"E")," ","|"," ",(0,n.kt)("inlineCode",{parentName:"td"},"Number")),(0,n.kt)("td",{parentName:"tr",align:null},"The inital value of the attribute.")))),(0,n.kt)("a",{name:"attribute+initial"}),(0,n.kt)("h3",{id:"attributeinitial--e"},"attribute.initial : ",(0,n.kt)("inlineCode",{parentName:"h3"},"E")),(0,n.kt)("p",null,"The inital value of the attribute."),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"Kind"),": instance property of ",(0,n.kt)("a",{parentName:"p",href:"#attribute"},(0,n.kt)("inlineCode",{parentName:"a"},"attribute"))),(0,n.kt)("a",{name:"attribute+value"}),(0,n.kt)("h3",{id:"attributevalue--e"},"attribute.value : ",(0,n.kt)("inlineCode",{parentName:"h3"},"E")),(0,n.kt)("p",null,"The current value of the attribute."),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"Kind"),": instance property of ",(0,n.kt)("a",{parentName:"p",href:"#attribute"},(0,n.kt)("inlineCode",{parentName:"a"},"attribute"))),(0,n.kt)("a",{name:"attribute+boost"}),(0,n.kt)("h3",{id:"attributeboost--gameclassesboost"},"attribute.boost : ",(0,n.kt)("inlineCode",{parentName:"h3"},"Game.classes.boost")),(0,n.kt)("p",null,"A boost object that affects the attribute."),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"Kind"),": instance property of ",(0,n.kt)("a",{parentName:"p",href:"#attribute"},(0,n.kt)("inlineCode",{parentName:"a"},"attribute"))),(0,n.kt)("a",{name:"attribute+update"}),(0,n.kt)("h3",{id:"attributeupdateeffect--e"},"attribute.update(effect) \u21d2 ",(0,n.kt)("inlineCode",{parentName:"h3"},"E")),(0,n.kt)("p",null,"Updates the value of the attribute based on the provided effect function and initial value."),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"Kind"),": instance method of ",(0,n.kt)("a",{parentName:"p",href:"#attribute"},(0,n.kt)("inlineCode",{parentName:"a"},"attribute")),"\n",(0,n.kt)("strong",{parentName:"p"},"Returns"),": ",(0,n.kt)("inlineCode",{parentName:"p"},"E")," - The updated value of the attribute after applying the effect."),(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:null},"Param"),(0,n.kt)("th",{parentName:"tr",align:null},"Type"),(0,n.kt)("th",{parentName:"tr",align:null},"Description"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"effect"),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("inlineCode",{parentName:"td"},"function")),(0,n.kt)("td",{parentName:"tr",align:null},"The effect function to apply to the attribute.")))))}c.isMDXComponent=!0}}]);