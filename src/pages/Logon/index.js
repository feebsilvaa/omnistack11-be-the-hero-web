import React, { useState } from 'react';
import { Link, useHistory } from "react-router-dom";

import { FiLogIn } from 'react-icons/fi';
import { CircularProgress, LinearProgress } from "@material-ui/core";
import api from '../../services/api';

import "./styles.css";

import logoImg from "../../assets/logo.svg"
import heroesImg from "../../assets/heroes.png";

export default function Logon() {

  const [id, setId] = useState('');
  const history = useHistory();
  const [ loading, setloading ] = useState(false);
  const [ success, setSuccess ] = useState(false);

  const handleLogin = (event) => {
    event.preventDefault();
    
    if(!id) {
      alert('Informe o seu id de acesso.');
      return;
    }
    
    setloading(true);
    api.post('/session', { id })
      .then((res) => {
        console.log(res.data.name);
        localStorage.setItem('ongId', id);
        localStorage.setItem('ongName', res.data.name);
        history.push('/profile');
        setloading(false);
        setSuccess(true);
      })
      .catch((err) => {
        console.log(err);        
        alert('Falha no login, tente novamente.');
        setloading(false);
        setSuccess(true);
      });
  }

  return (
    <div className="logon-container">
      <section className="form">
      <img src={ logoImg } alt="Be The Hero" srcset=""/>
      <form onSubmit={ handleLogin }>
        <h1>Faça seu logon</h1>

        <input 
          type="text"
          name="username"
          placeholder="Sua ID"
          value={ id }
          onChange={ e => setId(e.target.value) } 
        />
        <div className="button-wrapper">
          <button 
            className="button" 
            type="submit"
            disabled={loading}>
            { !loading && 
              <span>Entrar</span>
            }
          </button>
            { loading &&
              <span><CircularProgress className="button-loading"/></span>
            }
        </div>
        
        {/* Link no lugar de <a> para não recarregar todo o react */}
        <Link className="back-link" to="/register">
          <FiLogIn size={16} color="#E02041" />
          Não tenho cadastro
        </Link>
      </form>
      </section>
      <img src={ heroesImg } alt="Heroes" />
    </div>
  );
}
