
import React from 'react';
import { Link } from 'react-router-dom';


const Hero = () => {
  return (
    <section
      className="hero"
      style={{
        backgroundImage: `url('https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjEZ6ld_-ljQFWxMaVgiaIjrEinahna81b6PcRVMZTxAUwBydm42MTdjXLP6299D0OKDqPkUUfZr9YszZ67u_d4q9mbTyzNFsTrUrH_I7qN119cuBEUugbf-DSIgCg1i1rWNH7f9vQbjgGa/s1600/14A1439.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '70vh',
        position: 'relative',
      }}
    >
      <nav className="hero-nav">
        <a href="#">Viajes Destino</a>
        <a href="#">Encomiendas y Cargas</a>
        <a href="#">Sucursales</a>
        <a href="/admin">Administración</a>
        <a href="#">Contáctenos</a>
      </nav>
      <div className="hero-buttons">
        {/* Redirige a la página viajes */}
        <Link to="/viajes" className="btn-red">Compre su pasaje aquí</Link>

        <Link to="/rastreo" className="btn-gray">Rastree su envío aquí</Link>
        {/*
        <a href="/compra" className="btn-red">Compre su pasaje aquí</a>
        <a href="/rastreo" className="btn-gray">Rastree su envío aquí</a>
        */}
      </div>
    </section>
  );
};

export default Hero;
/*
import React from 'react';

const Hero = () => {
  return (
    <section className="hero">
      <nav className="hero-nav">
        <a href="#">Viajes Destino</a>
        <a href="#">Encomiendas y Cargas</a>
        <a href="#">Sucursales</a>
        <a href="#">Nuestra Empresa</a>
        <a href="#">Contáctenos</a>
      </nav>
      <div className="hero-buttons">
        <a href="/compra" className="btn-red">Compre su pasaje aquí</a>
        <a href="/rastreo" className="btn-gray">Rastree su envío aquí</a>
      </div>
    </section>
  );
};

export default Hero;
*/