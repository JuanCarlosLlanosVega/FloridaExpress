/*
import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Footer from './components/Footer';
import './styles.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Hero />
      <About />
      <Footer />
    </div>
  );
}

export default App;
*/
/*
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Footer from './components/Footer';
import Admin from './components/Admin';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<><Header /><Hero /><About /><Footer /></>} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
};

export default App;
*/
/*0000000000000000000000000000000000000*/


import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Admin from './components/Admin';
import RegistroFlota from './components/RegistroFlota';
import RegistroConductor from './components/RegistroConductor';
import ListaConductores from './components/ListaConductores';
import ListaFlotas from './components/ListaFlotas';
import RegistroRutas from './components/RegistroRutas';
import ListaRutas from './components/ListaRutas';
import RegistroHorario from './components/RegistroHorario';
import ListaHorarios from './components/ListaHorarios';
import Viajes from './components/Viajes';

import ViajeFlota from './components/ViajeFlota';
import SeleccionAsientos from './components/SeleccionAsientos';




import Home from './components/Home';

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/registro-flota" element={<RegistroFlota />} />
        <Route path="/lista-flotas" element={<ListaFlotas />} />
        <Route path="/registro-conductor" element={<RegistroConductor />} />
        <Route path="/lista-conductores" element={<ListaConductores />} />
        <Route path="/registro-rutas" element={<RegistroRutas />} />
        <Route path="/lista-rutas" element={<ListaRutas />} />
        <Route path="/registro-horario" element={<RegistroHorario />} />
        <Route path="/lista-horarios" element={<ListaHorarios />} />
        <Route path="/viajes" element={<Viajes />} />
        <Route path="/viajeFlota" element={<ViajeFlota />} />
        <Route path="/seleccionAsientos" element={<SeleccionAsientos />} />

      </Routes>
      <Footer />
    </Router>
  );
};

export default App;

