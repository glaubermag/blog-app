import{r as n,j as r}from"./index-BhK5uHJa.js";const k=({value:t,onChange:o,placeholder:s="Buscar...",suggestions:d=[],onSuggestionSelect:a,isLoading:i=!1,className:b=""})=>{const[f,u]=n.useState(!1),[y,l]=n.useState(!1),c=n.useRef(null);n.useEffect(()=>{const e=g=>{c.current&&!c.current.contains(g.target)&&l(!1)};return document.addEventListener("mousedown",e),()=>document.removeEventListener("mousedown",e)},[]);const h=e=>{o(e.target.value),l(!0)},x=e=>{a&&a(e),l(!1)};return r.jsxs("div",{className:"relative w-full md:w-64",ref:c,children:[r.jsxs("div",{className:"relative",children:[r.jsx("input",{type:"text",value:t,onChange:h,onFocus:()=>{u(!0),l(!0)},onBlur:()=>u(!1),placeholder:s,"data-testid":"search-bar",className:`w-full px-4 py-2 pl-10 pr-10 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors ${b}`,"aria-label":"Buscar posts"}),r.jsx("div",{className:"absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none",children:r.jsx("svg",{className:"h-5 w-5 text-gray-400",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:r.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"})})}),i&&r.jsx("div",{className:"absolute inset-y-0 right-0 pr-3 flex items-center",children:r.jsx("div",{className:"animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"})})]}),y&&d.length>0&&r.jsx("div",{"data-testid":"search-suggestions",className:"absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 max-h-60 overflow-auto",children:d.map((e,g)=>r.jsx("button",{"data-testid":"search-suggestion",onClick:()=>x(e),className:"w-full px-4 py-2 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-700 transition-colors",children:e},g))})]})},p=({currentPage:t,totalPages:o,onPageChange:s})=>{const d=Array.from({length:o},(a,i)=>i+1);return r.jsxs("div",{className:"flex justify-center items-center space-x-2",children:[r.jsx("button",{onClick:()=>s(t-1),disabled:t===1,className:"px-3 py-1 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors",children:"Anterior"}),d.map(a=>r.jsx("button",{onClick:()=>s(a),className:`px-3 py-1 rounded-lg border ${t===a?"border-blue-500 bg-blue-500 text-white":"border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"} hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors`,children:a},a)),r.jsx("button",{onClick:()=>s(t+1),disabled:t===o,className:"px-3 py-1 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors",children:"Próxima"})]})};export{p as P,k as S};
