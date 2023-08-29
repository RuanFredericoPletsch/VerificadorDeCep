import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {

  const [endereco, setEndereco] = useState({})

  function manipularEndereco (evento) {
    
    let cep = evento.target.value
    cep = cep.replaceAll(/\D+/g, '')

    setEndereco ({
      cep
    })

    if(cep && cep.length === 8) {
      //obter o cep
      fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(resposta => resposta.json())
        .then(dados => {
          setEndereco(enderecoAntigo => {
            return {
              ...enderecoAntigo,
              bairro: dados.bairro,
              cidade: dados.localidade,
              estado: dados.uf
            }
          })
        })
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <input placeholder='Digite o CEP' onChange={manipularEndereco}/>
        <ul>CEP: {endereco.cep}</ul>
        <ul>Bairro: {endereco.bairro}</ul>
        <ul>Cidade: {endereco.cidade}</ul>
        <ul>Estado: {endereco.estado}</ul>
      </header>
    </div>
  );
}

export default App;
