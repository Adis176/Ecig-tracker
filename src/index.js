import React from 'react';
import { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ContextProvider } from './utils/Context';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
<link
  rel="stylesheet"
  href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
  integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
  crossorigin=""
/>  


const root = ReactDOM.createRoot(document.getElementById('root'));
const queryClient = new QueryClient();
root.render(
  // <ContextProvider>
  //   <QueryClientProvider client={queryClient}>
  //<React.StrictMode> 
        <App />
  // </React.StrictMode>  
  // </QueryClientProvider>
  // </ContextProvider> 
);
