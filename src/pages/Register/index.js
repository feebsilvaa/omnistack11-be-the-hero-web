import React, { useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';
import logoImg from "../../assets/logo.svg"

export default function Register() {

  const[ name, setName ] = useState('');
  const[ email, setEmail ] = useState('');
  const[ whatsapp, setWhatsapp ] = useState('');
  const[ city, setCity ] = useState('');
  const[ uf, setUf ] = useState('');

  const history = useHistory();

  function handleRegister(event) {
    event.preventDefault();
    const data = {
      name, email, whatsapp, city, uf
    };

    if (!data.name || !data.email || !data.whatsapp || !data.city || !data.uf ) {
      alert('Preencha todos os dados antes de prosseguir.');
      return;
    }

    api.post('ongs', data)
      .then((res) => {
        console.log(res);
        alert(`Cadastro efetuado com sucesso. Seu id de acesso é ${res.data.id}`);
        history.push('/');
      })
      .catch((err) => {
        if (err.response.data && err.response.data.erro) {
          alert(err.response.data.erro);
          return;
        }
        alert('Erro no cadastro, tente novamente.');
      }) ;
  }

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={ logoImg } alt="Be The Hero"/>

          <h1>Cadastro</h1>
          <p>Faça seu cadatro, entre na plataforma e ajude pessoas a encontrarem os casos de sua ONG.</p>
          
          {/* Link no lugar de <a> para não recarregar todo o react */}
          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#E02041" />
            Não tenho cadastro
          </Link>
        </section>
        <form onSubmit={ handleRegister }>
          <input 
            placeholder="Nome da ONG" 
            value={ name }
            onChange={ e => setName(e.target.value) }
          />

          <input 
            placeholder="E-mail" 
            type="email"
            value={ email }
            onChange={ e => setEmail(e.target.value) }
          />

          <input 
            placeholder="Whatsapp" 
            value={ whatsapp }
            onChange={ e => setWhatsapp(e.target.value) }
          />

          <div className="input-group">
            <input 
              placeholder="Cidade"
              value={ city }
              onChange={ e => setCity(e.target.value) } 
            />

            <input 
              placeholder="UF"
              value={ uf }
              onChange={ e => setUf(e.target.value) } 
              style={{ width: 80 }} 
              />
          </div>

          <button className="button" type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}
