import React, { useState, useEffect } from 'react';
import Menu from '../../components/menu'
import Rodape from '../../components/rodape'
import Titulo from '../../components/titulo'
import {Card, Container, Row, Col} from 'react-bootstrap'
import {url} from '../../utils/constants';
import { Link } from 'react-router-dom';

const Eventos = () => {
    const [eventos, setEventos] = useState([]);

    useEffect(() => {
        listarEventos();
    }, []); 

    const listarEventos = () => {
        fetch(url + '/eventos')
            .then(response => response.json())
            .then(data => {
                setEventos(data.data)

            })
            .catch(err => console.error(err));
    }

    return (
        <div>
            <Menu />
            <Container>
                <Titulo titulo="Eventos" chamada="Todos os eventos em um único local" />
                <Row>
                {
                    eventos.map((item, index) => {
                        return (
                            
                           <Col xs="4">
                                <Card style={{ width: '18rem' }}>
                                    <Card.Img variant="top" src={item.urlImagem} />
                                    <Card.Body>
                                        <Card.Title>{item.nome}</Card.Title>
                                        <Card.Text>
                                        {item.descricao}
                                        </Card.Text>
                                        <a href={item.link} target="_blank" > Ir para o evento</a>
                                    </Card.Body>
                                </Card>
                           </Col>
                        )
                    })
                }
                </Row>
            </Container>
            <Rodape />
        </div>
    )
}

export default Eventos;