import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { RecipeContextProvider } from './components/context/RecipeContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <RecipeContextProvider>
        <App />
    </RecipeContextProvider>
);

