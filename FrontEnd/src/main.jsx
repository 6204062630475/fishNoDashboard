import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import History from './components/History.jsx';
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "history",
    element: <History />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    // <App />
  // </React.StrictMode>,
  <RouterProvider router={router} />
)
