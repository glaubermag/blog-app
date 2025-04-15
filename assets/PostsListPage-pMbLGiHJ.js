import{j as r,r as u,L as v}from"./index-DcCohCzJ.js";import{u as y,E as w,g as N,a as L}from"./ErrorMessage-DNHFwpNq.js";import{P}from"./PostCard-Dkh6YpV4.js";const C=({value:e,onChange:a,placeholder:s="Buscar..."})=>r.jsxs("div",{className:"relative w-full md:w-64",children:[r.jsx("input",{type:"text",value:e,onChange:d=>a(d.target.value),placeholder:s,className:"w-full px-4 py-2 pl-10 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors"}),r.jsx("div",{className:"absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none",children:r.jsx("svg",{className:"h-5 w-5 text-gray-400",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:r.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"})})})]}),E=({currentPage:e,totalPages:a,onPageChange:s})=>{const d=Array.from({length:a},(t,n)=>n+1);return r.jsxs("div",{className:"flex justify-center items-center space-x-2",children:[r.jsx("button",{onClick:()=>s(e-1),disabled:e===1,className:"px-3 py-1 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors",children:"Anterior"}),d.map(t=>r.jsx("button",{onClick:()=>s(t),className:`px-3 py-1 rounded-lg border ${e===t?"border-blue-500 bg-blue-500 text-white":"border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"} hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors`,children:t},t)),r.jsx("button",{onClick:()=>s(e+1),disabled:e===a,className:"px-3 py-1 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors",children:"Próxima"})]})},c=9,A=()=>{var x;const[e,a]=u.useState(1),[s,d]=u.useState(""),{data:t,isLoading:n,error:b}=y({queryKey:["posts"],queryFn:()=>N()}),{data:i,isLoading:h,error:m}=y({queryKey:["users"],queryFn:()=>L(),enabled:!!t});if(n||h)return r.jsx(v,{});if(b||m)return r.jsx(w,{message:"Erro ao carregar os posts. Por favor, tente novamente mais tarde."});const l=((x=t==null?void 0:t.data)==null?void 0:x.filter(o=>o.title.toLowerCase().includes(s.toLowerCase())||o.body.toLowerCase().includes(s.toLowerCase())))||[],p=Math.ceil(l.length/c),g=(e-1)*c,f=l.slice(g,g+c);return r.jsxs("div",{className:"space-y-8",children:[r.jsxs("div",{className:"flex flex-col md:flex-row justify-between items-start md:items-center gap-4",children:[r.jsx("h1",{className:"text-3xl font-bold text-gray-800 dark:text-white",children:"Posts Recentes"}),r.jsx(C,{value:s,onChange:d,placeholder:"Buscar posts..."})]}),l.length===0?r.jsx("div",{className:"text-center py-12",children:r.jsxs("p",{className:"text-gray-600 dark:text-gray-300",children:['Nenhum post encontrado com o termo "',s,'"']})}):r.jsxs(r.Fragment,{children:[r.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",children:f.map(o=>{const j=i==null?void 0:i.find(k=>k.id===o.userId);return r.jsx(P,{post:o,author:j},o.id)})}),r.jsx(E,{currentPage:e,totalPages:p,onPageChange:a})]})]})};export{A as default};
