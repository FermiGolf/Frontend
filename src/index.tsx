import React from "react";

import App from './app';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n'; 
import "./style.css";

import { createRoot } from 'react-dom/client';



    
    const container = document.getElementById('root');
    const root = container && createRoot(container); // createRoot(container!) if you use TypeScript
    root && root.render( <React.StrictMode>
        <I18nextProvider i18n={i18n}>
    <App />
    </I18nextProvider>
    </React.StrictMode>);