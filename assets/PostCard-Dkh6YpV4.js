import{j as e,b as r}from"./index-DcCohCzJ.js";const d=({post:a,author:t})=>e.jsx("article",{className:"bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300",children:e.jsxs("div",{className:"p-6",children:[e.jsx(r,{to:`/posts/${a.id}`,children:e.jsx("h2",{className:"text-xl font-semibold text-gray-800 dark:text-white mb-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors",children:a.title})}),e.jsx("p",{className:"text-gray-600 dark:text-gray-300 mb-4 line-clamp-3",children:a.body}),t&&e.jsxs("div",{className:"flex items-center space-x-3",children:[e.jsx("div",{className:"w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center",children:e.jsx("span",{className:"text-gray-600 dark:text-gray-300 font-medium",children:t.name.charAt(0)})}),e.jsxs("div",{children:[e.jsx(r,{to:`/author/${t.id}`,className:"text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors",children:t.name}),e.jsx("p",{className:"text-xs text-gray-500 dark:text-gray-400",children:t.company.name})]})]})]})});export{d as P};
