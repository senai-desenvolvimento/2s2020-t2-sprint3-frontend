import React from 'react';
import logo from './logo.svg';
import './App.css';
import Rodape from './components/rodape';
import Titulo from './components/titulo';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        
        <Titulo texto="Cadastrar Usuário" descricao="Informe os campos do usuário"  />  

        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <Rodape />
    </div>
  );
}

export default App;
