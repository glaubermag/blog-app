import{r as u,j as r}from"./index-CcVLJl2J.js";const p=({value:s,onChange:t,placeholder:d="Buscar...",suggestions:b=[],onSuggestionSelect:n,isLoading:e=!1,className:c=""})=>{const[a,i]=u.useState(!1),[l,g]=u.useState(!1),x=u.useRef(null);u.useEffect(()=>{const o=h=>{x.current&&!x.current.contains(h.target)&&g(!1)};return document.addEventListener("mousedown",o),()=>document.removeEventListener("mousedown",o)},[]);const m=o=>{t(o.target.value),g(!0)},y=o=>{n&&n(o),g(!1)};return r.jsxs("div",{className:"relative w-full md:w-64",ref:x,children:[r.jsxs("div",{className:"relative",children:[r.jsx("input",{type:"text",value:s,onChange:m,onFocus:()=>{i(!0),g(!0)},onBlur:()=>i(!1),placeholder:d,"data-testid":"search-bar",className:`w-full px-4 py-2 pl-10 pr-10 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors ${c}`,"aria-label":"Buscar posts"}),r.jsx("div",{className:"absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none",children:r.jsx("svg",{className:"h-5 w-5 text-gray-400",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:r.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"})})}),e&&r.jsx("div",{className:"absolute inset-y-0 right-0 pr-3 flex items-center",children:r.jsx("div",{className:"animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"})})]}),l&&b.length>0&&r.jsx("div",{"data-testid":"search-suggestions",className:"absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 max-h-60 overflow-auto",children:b.map((o,h)=>r.jsx("button",{"data-testid":"search-suggestion",onClick:()=>y(o),className:"w-full px-4 py-2 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-700 transition-colors",children:o},h))})]})},k=({currentPage:s,totalPages:t,onPageChange:d})=>{const n=(()=>{const e=[];if(t<=5)for(let a=1;a<=t;a++)e.push(a);else{let a=Math.max(1,s-Math.floor(2.5)),i=Math.min(t,a+5-1);i-a+1<5&&(a=Math.max(1,i-5+1)),a>1&&(e.push(1),a>2&&e.push("..."));for(let l=a;l<=i;l++)e.push(l);i<t&&(i<t-1&&e.push("..."),e.push(t))}return e})();return r.jsxs("div",{className:"flex justify-center items-center space-x-1 sm:space-x-2 flex-wrap",children:[r.jsx("button",{onClick:()=>d(s-1),disabled:s===1,className:"px-3 py-1 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors text-sm sm:text-base","aria-label":"Página anterior",children:"Anterior"}),n.map((e,c)=>e==="..."?r.jsx("span",{className:"px-3 py-1 text-gray-500 dark:text-gray-400 text-sm sm:text-base",children:"..."},`ellipsis-${c}`):r.jsx("button",{onClick:()=>d(e),className:`px-3 py-1 rounded-lg border ${s===e?"border-blue-500 bg-blue-500 text-white":"border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"} hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors text-sm sm:text-base`,"aria-current":s===e?"page":void 0,"aria-label":`Ir para a página ${e}`,children:e},e)),r.jsx("button",{onClick:()=>d(s+1),disabled:s===t,className:"px-3 py-1 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors text-sm sm:text-base","aria-label":"Próxima página",children:"Próxima"})]})};export{k as P,p as S};
