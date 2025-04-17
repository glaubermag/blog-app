import{r as b,j as s,L as U,g as q,a as C}from"./index-BhK5uHJa.js";import{u as p,E as w}from"./ErrorMessage-BnSWDMKN.js";import{P as F}from"./PostCard-Bmp0eLnt.js";import{S as I,P as K}from"./Pagination-CgdWsw1x.js";import{u as M}from"./useSearch-t1r_If6u.js";const n=9,G=()=>{const[i,c]=b.useState(1),{data:e,isLoading:y,error:f}=p({queryKey:["posts"],queryFn:()=>q()}),{data:a,isLoading:d,error:g}=p({queryKey:["users"],queryFn:()=>C(),enabled:!!(e!=null&&e.data)}),l=e==null?void 0:e.data,t=a==null?void 0:a.data;console.log("Posts:",l),console.log("Users:",t),console.log("Is Loading Users:",d),console.log("Users Error:",g);const{searchQuery:m,setSearchQuery:u,searchResults:o,suggestions:j,isSearching:S,isLoading:L}=M({items:l||[],searchKeys:["title","body"],maxSuggestions:5,debounceMs:300}),E=r=>{u(r),c(1)};if(y||d)return s.jsx(U,{});if(f||g)return s.jsx(w,{message:"Erro ao carregar os posts. Por favor, tente novamente mais tarde."});const h=Math.ceil(o.length/n),x=(i-1)*n,N=o.slice(x,x+n);return s.jsxs("div",{className:"space-y-8",children:[s.jsxs("div",{className:"flex flex-col md:flex-row justify-between items-start md:items-center gap-4",children:[s.jsx("h1",{className:"text-3xl font-bold text-gray-800 dark:text-white",children:"Posts Recentes"}),s.jsx(I,{value:m,onChange:u,placeholder:"Buscar posts...",suggestions:j,onSuggestionSelect:E,isLoading:L})]}),o.length===0?s.jsx("div",{className:"text-center py-12",children:s.jsx("p",{className:"text-gray-600 dark:text-gray-300","data-testid":"no-results",children:S?`Nenhum post encontrado com o termo "${m}"`:"Nenhum post encontrado"})}):s.jsxs(s.Fragment,{children:[s.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",children:N.map(r=>{const P=t==null?void 0:t.find(v=>v.id===r.userId);return console.log("Post:",r.id,"Author:",P),s.jsx(F,{post:r,author:P},r.id)})}),h>1&&s.jsx(K,{currentPage:i,totalPages:h,onPageChange:c})]})]})};export{G as default};
