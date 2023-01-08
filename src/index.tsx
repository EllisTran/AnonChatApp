import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css';
import ChatRoom from './components/chatRoom';

const root = ReactDOM.createRoot(document.getElementById("app-root") as HTMLElement);
root.render(
    <React.StrictMode>
        <ChatRoom />
    </React.StrictMode>
);
