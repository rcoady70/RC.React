import React from 'react';
import ReactDOM from 'react-dom/client';
import 'react-calendar/dist/Calendar.css'
import 'react-toastify/dist/ReactToastify.min.css';
import 'react-datepicker/dist/react-datepicker.css';
import './app/layout/styles.css';

import App from './app/layout/App';
import reportWebVitals from './reportWebVitals';
import { store, StoreContext } from './app/stores/store';

//https://github.com/remix-run/react-router/issues/8264
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';

//Give access to browser history in the rest of app files
import {createBrowserHistory} from 'history'
export const historyX = createBrowserHistory();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    /*  Supply mobx store to whole application*/
    <StoreContext.Provider value={store} >
        {/*V6 changes the way you make history available outside of components. https://github.com/remix-run/react-router/issues/8264 */}
        <HistoryRouter history={historyX}>
            <App />
        </HistoryRouter>
    </StoreContext.Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
