import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';
import './index.scss';
import App from './App';

// Import Bootstrap and FontAwesome
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';

// Create loading component for PersistGate
const LoadingComponent = () => (
  <div className="flex items-center justify-center h-screen bg-black">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
  </div>
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={<LoadingComponent />} persistor={persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

// Add a listener for Redux persist rehydration
let rehydrated = false;
store.subscribe(() => {
  const state = store.getState();
  if (state._persist && state._persist.rehydrated && !rehydrated) {
    rehydrated = true;
    console.log('Redux persist rehydration complete');
    console.log('Auth state after rehydration:', state.auth);
    
    // Reset loading state after rehydration if it's still true
    if (state.auth && state.auth.loading) {
      console.log('Resetting loading state after rehydration');
      store.dispatch({ type: 'auth/resetLoading' });
    }
  }
}); 