import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './Components/Footer/Footer';


import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons
import "primeflex/primeflex.css";                                   //flex

import { PrimeReactProvider } from 'primereact/api';

function App() {
  return (
    <div>
      <PrimeReactProvider >
        <Outlet/>
        <Footer />
      </PrimeReactProvider>
    </div>
  );
}

export default App;
