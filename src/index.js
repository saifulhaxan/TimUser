import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe('pk_test_51OM8L0JUBwD5W3vxolPWPoxknpqaDJUxTe2DbgHuXTJqs1buU8e6ow0sWKBXkWvgz5DhJQ9XVC1l2i0479Zfxziv00pQYssWdI')

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Elements stripe={stripePromise}>
    <App />
    <div className='loaderBox d-none'>
      <div className="custom-loader"></div>
    </div>
  </Elements>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
