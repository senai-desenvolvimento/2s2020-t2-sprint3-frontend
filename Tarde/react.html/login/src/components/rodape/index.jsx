//using EntityFrameworkCore
import React from 'react';
import './rodape.css';

//Criada uma funcion pois renderiza somente html
function Rodape() {
    return (
        <footer className='background'>
            <h1>Senai Informática 132</h1>
        </footer>
    )
}

//Deixa o webComponent visivel para outros webcomponents
export default Rodape