import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Router and Routes
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import Index from './views/index';
import { IndexRouters } from './router';
import { SimpleRouter } from './router/simple-router';
import { DefaultRouter } from './router/default-router'; // Adjust the path if needed

// Create browser router instance
const router = createBrowserRouter([
  {
    path: '/documentation',
    element: <Index />,
  },
  ...DefaultRouter, // Include DefaultRouter here
  ...IndexRouters,
  ...SimpleRouter,
], { basename: process.env.PUBLIC_URL });

// Render the app
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App>
        <RouterProvider router={router}>
          {/* Your App components here */}
        </RouterProvider>
      </App>
    </Provider>
  </React.StrictMode>
);

// Measure performance
reportWebVitals();
