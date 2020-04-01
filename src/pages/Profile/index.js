import React, { useState, useEffect } from 'react';
import { Link, useHistory } from "react-router-dom";
import { FiPower, FiTrash2 } from "react-icons/fi";
// import {  } from "react-icons/md";
import { CircularProgress, LinearProgress } from "@material-ui/core";

import api from '../../services/api';

import logoImg from '../../assets/logo.svg';
import './styles.css';

export default function Profile() {

  const ongId = localStorage.getItem('ongId');
  const ongName = localStorage.getItem('ongName');
  const history = useHistory();
  const [ incidents, setIncidents ] = useState([]);
  const [ listLoaded, setListLoaded ] = useState(false);
  const [ loading, setloading ] = useState(false);

  const handleLogout = (event) => {
    localStorage.clear();
    history.push('/');
  }

  const handleListIncidents = () => {
    api.get('/profile?listAll=true', {
      headers: {
        Authorization: ongId
      }
    }).then((res) => {
      setIncidents(res.data.page.content.reverse());
      setloading(false);
      setListLoaded(true);
      console.log(res.data.page.content);      
    }).catch((err) => {
      setloading(false);
      setListLoaded(false);
      alert('Houve um problema ao tentar listar os incidentes. Tente novamente mais tarde.');
    });
  }

  const handleDeleteIncident = (id) => {

    if (window.confirm('Você tem certeza que deseja remover este caso?'))
      api.delete(`/incidents/${id}`,  {
        headers: {
          Authorization: ongId
        }
      }).then((res) => {
        // alert('Caso removido com sucesso.');
        setIncidents(incidents.filter(incident => incident.id !== id));
        // history.push('/profile');
      }).catch((err) => {
        console.log(err.response.data.erro);
      });
  }

  const formatValue = (value) => {
    return Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(value);
    // return Intl.NumberFormat('en', { style: 'currency', currency: 'USD'}).format(value);
  }

  useEffect(() => {
    setloading(true);
    handleListIncidents();
  }, [ongId]);

  return (
    <div className="profile-container">
      <header>
        <Link to="/profile">
          <img src={ logoImg } alt="Be The Hero" />
        </Link>
        <span>Bem vinda, { ongName }</span>

        <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
        <button type="button" onClick={ handleLogout }>
          <FiPower size={18} color="#e02041"/>
        </button>
      </header>

      <h1>Casos cadastrados</h1>
      <ul>
        { loading && 
          <li>
            <p><CircularProgress size={20}/> Buscando os seus incidentes.</p>
          </li> 
        } 
        { (listLoaded && !loading) && 
          incidents.map(incident => (
            <li key={ incident.id }>
              <strong>CASO:</strong>
              <p>{ incident.title }</p>
    
              <strong>DESCRIÇÃO:</strong>
              <p>{ incident.description }</p>
              
              <strong>VALOR:</strong>
              <p>{ formatValue(incident.value) }</p>
    
              <button type="button" onClick={ () => {
                handleDeleteIncident(incident.id) }
              }>
                <FiTrash2 size={20} color="#a8a8b3" />
              </button>
            </li>
          ))
        }
        { (!listLoaded && !loading) && 
          <li>
            <p>Você ainda não possui casos cadastrados.</p>
          </li> 
        }
      </ul>

    </div>
  );
}
