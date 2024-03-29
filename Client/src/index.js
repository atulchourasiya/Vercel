import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'tippy.js/animations/scale.css';
import 'tippy.js/dist/tippy.css'; 
import { Provider } from 'react-redux';
import App from './App';
import store from './Redux/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

window.addEventListener('load', () => {
	if ('serviceWorker' in navigator) {
		navigator.serviceWorker
			.register('/service-worker.js')
			.then((registration) => {
				registration.onupdatefound = () => {
					const newWorker = registration.installing;

					newWorker.onstatechange = function () {
						if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
							if (window.confirm('New Version Available!Try Reload')) {
								window.location.reload(true);
							}
						}
					};
				};
				registration.update();
			})
			.catch((error) => console.error('Service worker not registered'));
	}
});