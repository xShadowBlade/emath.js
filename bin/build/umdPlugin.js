var m=Object.defineProperty;var v=Object.getOwnPropertyDescriptor;var k=Object.getOwnPropertyNames,y=Object.getOwnPropertySymbols;var b=Object.prototype.hasOwnProperty,U=Object.prototype.propertyIsEnumerable;var j=(e,o,t)=>o in e?m(e,o,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[o]=t,c=(e,o)=>{for(var t in o||(o={}))b.call(o,t)&&j(e,t,o[t]);if(y)for(var t of y(o))U.call(o,t)&&j(e,t,o[t]);return e};var P=(e,o)=>{for(var t in o)m(e,t,{get:o[t],enumerable:!0})},w=(e,o,t,p)=>{if(o&&typeof o=="object"||typeof o=="function")for(let r of k(o))!b.call(e,r)&&r!==t&&m(e,r,{get:()=>o[r],enumerable:!(p=v(o,r))||p.enumerable});return e};var N=e=>w(m({},"__esModule",{value:!0}),e);var E={};P(E,{default:()=>W,umdWrapper:()=>O});module.exports=N(E);var $={external:"inherit",libraryName:"",amdLoaderName:"define"},x=["__da","__db","__dc","__dd","__de","__df","__dg","__dh","__di","__dj","__dk","__dl","__dm","__dn","__do","__dp","__dq","__dr","__ds","__dt","__du","__dv","__dw","__dx","__dy","__dz"],a=`if (typeof module.exports == "object" && typeof exports == "object") {
    var __cp = (to, from, except, desc) => {
      if ((from && typeof from === "object") || typeof from === "function") {
        for (let key of Object.getOwnPropertyNames(from)) {
          if (!Object.prototype.hasOwnProperty.call(to, key) && key !== except)
          Object.defineProperty(to, key, {
            get: () => from[key],
            enumerable: !(desc = Object.getOwnPropertyDescriptor(from, key)) || desc.enumerable,
          });
        }
      }
      return to;
    };
    module.exports = __cp(module.exports, exports);
  }
  return module.exports;
  }))`;var B=({depsKeys:e,depsValKey:o,amdLoader:t,lib:p,defineDeps:r,globalDeps:f,requireDeps:n})=>`(function (g, f) {
      if ("object" == typeof exports && "object" == typeof module) {
        module.exports = f(${n});
      } else if ("function" == typeof ${t} && ${t}.amd) {
        ${t}("${p}", ${r}, f);
      } else if ("object" == typeof exports) {
        exports["${p}"] = f(${n});
      } else {
        g["${p}"] = f(${f});
      }
    }(this, (${e}) => {
  var exports = {};
  var module = { exports };`,K=({depsKeys:e,depsValKey:o,amdLoader:t,defineDeps:p,globalDeps:r,requireDeps:f})=>`(function (g, f) {
    var hasExports = typeof exports === 'object';
    if (typeof ${t} === "function" && ${t}.amd) {
      ${t}(${p}, f);
    } else if (typeof module === "object" && module.exports) {
      module.exports = f(${f});
    } else {
      var m = hasExports ? f(${f}) : f(${r});
      var root = hasExports ? exports : g;
      
    }}(typeof self !== 'undefined' ? self : this, (${e}) => {
  var exports = {};
  var module = { exports };`,g=({external:e,amdLoader:o,lib:t})=>{var u,l;let p=e!=null&&e.length?`['${e.join("', '")}']`:"[]",r=(u=e==null?void 0:e.map(s=>`g["${s}"]`).join(", "))!=null?u:"",f=(l=e==null?void 0:e.map(s=>`require('${s}')`).join(", "))!=null?l:"",n=[];e&&(n=e.map((s,h)=>({key:x[h],val:s})));let i=n.map(s=>s.key).join(", "),d=n.map(s=>`"${s.val}": ${s.key}`).join(", "),_={depsKeys:i,depsValKey:d,amdLoader:o,defineDeps:p,globalDeps:r,requireDeps:f};return t?(_.lib=t,B(_)):K(_)};var O=(e={})=>{let o=c(c({},$),e);return{name:"umd-wrapper",setup(p){var d;let{initialOptions:r}=p;if(!["umd","cjs"].includes(r.format))return;let n={external:o.external=="inherit"?(d=r.external)!=null?d:[]:Array.isArray(o.external)?o.external:[],amdLoader:o.amdLoaderName,lib:o.libraryName};r.format="cjs",r.metafile=!0,r.footer?r.footer.js?r.footer.js+=a:r.footer.js=a:r.footer={js:a};let i=g(n);r.banner?r.banner.js?r.banner.js+=i:r.banner.js=i:r.banner={js:i}}}},W=O;0&&(module.exports={umdWrapper});
  // In line 38: for(var i in m) root[i] = m[i];