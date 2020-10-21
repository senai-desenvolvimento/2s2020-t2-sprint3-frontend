import React, { useState }  from 'react';
import { useHistory } from "react-router-dom";

import jwt_decode from "jwt-decode";
import Menu from '../../components/menu';
import Rodape from '../../components/rodape';
import {Container, Form, Button} from 'react-bootstrap';
import logo from '../../assets/img/Logo.svg';
import './index.css';

const Login = () => {
    const history = useHistory();
    //string email {get; set;}
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const logar = (event) => {
        event.preventDefault();

        //$"{email} - {senha}"
        // email + ' - ' + senha
        //this.state.email

        fetch('http://localhost:5000/api/account/login',{
            method : 'POST',
            body : JSON.stringify({
                email : email,
                senha : senha
            }),
            headers : {
                'content-type' : 'application/json'
            }
        })
        .then(response => {
            if(response.ok){
                return response.json();
            }

            alert('Dados Inválidos');
        })
        .then(data => {
            localStorage.setItem('token-nyous-tarde', data.token);

            let usuario = jwt_decode(data.token);

            if(usuario.role === 'Admin')
                history.push('/admin/dashboard');
            else
                history.push('/eventos');
        })
        .catch(err => console.error(err));
    }

    return (
        <div>
        <Menu />
        <Container className='form-height'>
                <Form className='form-signin' onSubmit={ event => logar(event)} >
                    <div className='text-center'>
                     <img src={logo} alt='NYOUS' style={{ width : '64px'}} />
                    </div>
                    <br/>
                    <small>Informe os dados Abaixo</small>
                    <hr/>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email </Form.Label>
                        <Form.Control type="email" value={email} onChange={ event => setEmail(event.target.value)} placeholder="Informe o email" required />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Senha</Form.Label>
                        <Form.Control type="password" value={senha} onChange={ event => setSenha(event.target.value)} placeholder="Senha"  required/>
                    </Form.Group>
                    <Button variant="primary" type="submit" >
                        Enviar
                    </Button>
                    <br/><br/>
                    <a href='/cadastrar' style={{ marginTop :'30px'}}>Não tenho conta!</a>
                </Form>
            </Container>
        <Rodape />
        </div>
    )
}

export default Login