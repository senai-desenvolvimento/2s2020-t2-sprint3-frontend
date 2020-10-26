import React, { useEffect, useState } from 'react';
import { Carousel, Container, Row, Col, Card } from 'react-bootstrap';
import Menu from '../../components/menu';
import Rodape from '../../components/rodape';
import Titulo from '../../components/titulo';
import {url} from '../../utils/constants';

const Eventos = () => {
    const [eventos, setEventos] = useState([]);

    useEffect(() => {
        listarEventos();
    },[])

    const listarEventos = () => {
        fetch(`${url}/eventos`)
        .then(response => response.json())
        .then(dados => {
            setEventos(dados.data);
        })
        .catch(err => console.error(err));
    }

    return (
        <div>
            <Menu />
            <Carousel>
                {
                    eventos.map((item, index) => {
                        return (
                            <Carousel.Item>
                                <img
                                className="d-block w-100"
                                src={item.urlImagem}
                                alt="First slide"
                                style={{ height : '650px'}}
                                />
                                <Carousel.Caption>
                                <h3>{item.nome}</h3>
                                <p>{item.descricao}</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                        )
                    })
                }
            </Carousel>
            <Container>
            <Titulo titulo="Eventos" chamada="Saiba de todos os eventos do Senai" />
            
            
            <br></br>
            <Row>
                


                {
                    eventos.map((item, index) => {
                        return (
                            <Col xs='4'>
                                <Card>
                                    <Card.Img variant="top" src={item.urlImagem} />
                                    <Card.Body>
                                    <Card.Title>{item.nome}</Card.Title>
                                    <Card.Text>
                                       {item.descricao}
                                       <a href={item.link} target='_blank'>Ir para o evento</a>
                                    </Card.Text>
                                    </Card.Body>
                                    <Card.Footer>
                                        <small className="text-muted">{item.categoria.nome}</small>
                                    </Card.Footer>
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