import{j as e,b as a}from"./index-z1Wx1FAE.js";const l=({post:r,author:t})=>e.jsx("article",{className:"bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full","data-testid":"post-card",children:e.jsxs("div",{className:"p-6 flex-1 flex flex-col",children:[e.jsx(a,{to:`/posts/${r.id}`,children:e.jsx("h2",{className:"text-xl font-semibold text-gray-800 dark:text-white mb-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors line-clamp-2",children:r.title})}),e.jsx("p",{className:"text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 flex-1",children:r.body}),t&&e.jsxs("div",{className:"mt-auto flex items-center justify-between",children:[e.jsxs("div",{className:"flex items-center space-x-3",children:[e.jsx("div",{className:"w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center",children:e.jsx("span",{className:"text-gray-600 dark:text-gray-300 font-medium",children:t.name.charAt(0)})}),e.jsxs("div",{children:[e.jsx(a,{to:`/author/${t.id}`,className:"text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors",children:t.name}),e.jsx("p",{className:"text-xs text-gray-500 dark:text-gray-400",children:t.company.name})]})]}),e.jsx(a,{to:`/posts/${r.id}`,className:"px-4 py-2 text-sm font-semibold text-blue-600 dark:text-blue-400 border border-blue-600 dark:border-blue-400 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200",children:"Ler mais"})]})]})});export{l as P};
