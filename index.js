import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import SearchCustomer from './customerpage';
import App from './landingpage';
import reportWebVitals from './reportWebVitals';
import SearchFilm from './filmspage';
import CustomerPageAll from './customerpageAllCustomers.js'
import Rental from "./rentalpage.js"
import { 
  BrowserRouter, Route, Routes
} from "react-router-dom";
import Navbar from './navbar';


function Router() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route exact path='/' element={<App />} />
        <Route path='/filmspage' element={<SearchFilm />} />
        <Route path='/customerpage' element={<SearchCustomer />} />
        <Route path='/customerpageAllCustomers' element={<CustomerPageAll />} />
        <Route path='/rentalpage' element={<Rental/>} />
      </Routes>

    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <Router />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
