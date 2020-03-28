import React, { useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import CurrencyInput from 'react-currency-input';

import api from '../../services/api'

import "./style.css"
import logoImg from "../../assets/logo.svg";

export default function NewIncident() {
  
  const ongId = localStorage.getItem('ongId');

  const[ title, setTile ] = useState('');
  const[ description, setDescription ] = useState('');
  const[ value, setValue ] = useState('');

  const history = useHistory();

  const handleNewIncident = (event) => {
    event.preventDefault();
    
    const data = {
      title, description, value: parseFloat(value.replace(',','.'))
    };

    if(!title || !description || !value) {
      alert('Preencha todos os dados antes de prosseguir.');
      return;
    }

    api.post('incidents', data, {
      headers: { Authorization: ongId }, 
    }).then((res) => {
        console.log(res);
        alert(`Caso cadastrado com sucesso.`);
        history.push('/profile');
    }).catch((err) => {
      if (err.response)
        if (err.response.data && err.response.data.erro) {
          alert(err.response.data.erro);
          return;
        }
      alert('Erro no cadastro, tente novamente.');
    }) ;
  }

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={ logoImg } alt="Be The Hero"/>

          <h1>Cadastrar novo caso</h1>
          <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>
          
          {/* Link no lugar de <a> para não recarregar todo o react */}
          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#E02041" />
            Voltar para home
          </Link>
        </section>
        <form onSubmit={ handleNewIncident }>
          <input 
            name="title"
            placeholder="Título do caso"
            value={ title }
            onChange={ e => setTile(e.target.value) } />
          <textarea 
            name="description"
            placeholder="Descrição"
            value={ description }
            onChange={ e => setDescription(e.target.value) } />
          {/* <CurrencyInput
            name="value"
            placeholder="Valor em reais"
            value={ value.replace(',', '') }
            onChangeEvent={ e => setValue(e.target.value) } /> */}
          <input 
            name="value"
            placeholder="Valor em reais"
            value={ value }
            onChange={ e => setValue(e.target.value) } />

          <div className="button-group">
            <button className="button-reset" type="reset">Cancelar</button>
            <button className="button" type="submit">Cadastrar</button>
          </div>

        </form>
      </div>
    </div>
  );
}
