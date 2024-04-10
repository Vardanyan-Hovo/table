import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './Components/Footer/Footer';
import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons
import { PrimeReactProvider } from 'primereact/api';



import './App.css';

function App() {
  return (
      <PrimeReactProvider>
        <Outlet/>
        <Footer />
      </PrimeReactProvider>
  );
}

export default App;
