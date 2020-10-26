import React, { useEffect, useState } from 'react';
import { Container, Form, Button, Card, Table } from 'react-bootstrap';
import Menu from '../../../components/menu';
import Rodape from '../../../components/rodape';
import Titulo from '../../../components/titulo';
import {url} from '../../../utils/constants';

const CrudEventos = () => {
    const [ id, setId ] = useState(0);
    const [nome, setNome] = useState('');
    const [link, setLink] = useState('');
    const [categoriaId, setCategoriaId] = useState('');
    const [descricao, setDescricao] = useState('');
    const [ urlImagem, setUrlImagem] = useState('');
    const [categorias, setCategorias] = useState([]);
    const [eventos, setEventos] = useState([]);

    useEffect(() => {
        listarCategorias();
        listarEventos();
    },[]);

    const listarCategorias = () => {

        fetch(`${url}/categorias`)
            .then(response => response.json())
            .then(dados => {
                setCategorias(dados.data);
            })
            .catch(err => console.error(err));
    }

    const listarEventos = () => {
        fetch(`${url}/eventos`)
        .then(response => response.json())
        .then(dados => {
            setEventos(dados.data);

            limparCampos();
        })
        .catch(err => console.error(err));
    }

    const uploadFile = (event) => {
        event.preventDefault()

        debugger;
        console.log(event);
        //crio o formulário para envio do arquivo
        let formdata = new FormData();
        formdata.append('arquivo', event.target.files[0]);
        
        fetch(`${url}/upload`,
        {
            method : 'POST',
            body : formdata 
        })
        .then(response => response.json())
        .then(data =>{
            setUrlImagem(data.url);
        })
        .catch(err => console.error(err))
    }

    const salvar = ( event) => {
        event.preventDefault();

        const evento = {
            nome : nome,
            link : link,
            categoriaId : categoriaId,
            urlImagem : urlImagem,
            descricao : descricao
        }

        //if ternário para saber se vai fazer um post ou put
        let method = (id === 0 ? 'POST' : 'PUT');
        let urlRequest = (id === 0 ? `${url}/eventos` :  `${url}/eventos/${id}`);

        fetch(urlRequest, {
            method : method,
            body : JSON.stringify(evento),
            headers : {
                'content-type' : 'application/json',
                'authorization' : 'Bearer ' + localStorage.getItem('token-nyous-tarde')
            }
        })
        .then(response => response.json())
        .then(dados => {
            alert('Evento salvo');

            listarEventos();
        })
        .catch(err => console.error(err))
    }

    const editar = (event) => {
        event.preventDefault();

        fetch(url + '/eventos/' + event.target.value, {
            method : 'GET',
            headers : {
                'authorization' : 'Bearer ' + localStorage.getItem('token-nyous-tarde')
            }
        })
        .then(response => response.json())
        .then(dado => {
            setId(dado.data.id);
            setNome(dado.data.nome);
            setUrlImagem(dado.data.urlImagem);
            setLink(dado.data.link);
            setCategoriaId(dado.data.categoriaId);
            setDescricao(dado.data.descricao);
        })
    }

    const remover = (event) => {
        event.preventDefault();

        fetch(url + '/eventos/' + event.target.value,{
            method : 'DELETE',
            headers : {
                'authorization' : 'Bearer ' + localStorage.getItem('token-nyous-tarde')
            }
        })
        .then(response => response.json())
        .then(dados => {
            alert('Evento removido');

            listarEventos();
        })
    }

    const limparCampos = () => {
        setId(0);
            setNome('');
            setUrlImagem('');
            setLink('');
            setCategoriaId('');
            setDescricao('');
    }
    return (
        <div>
            <Menu />
            <Container>
                <Titulo titulo="Eventos" chamada="Gerencie seus eventos" />

                <Card>
                        <Card.Body>
                        <Form onSubmit={event => salvar(event)}>
                            <Form.Group controlId="formNome">
                                <Form.Label>Nome</Form.Label>
                                <Form.Control type="text" value={nome} onChange={event => setNome(event.target.value)} />
                            </Form.Group>

                            <Form.Group controlId="formLink">
                                <Form.Label>Link</Form.Label>
                                <Form.Control type="text" value={link} onChange={event => setLink(event.target.value)} placeholder="http://" />
                            </Form.Group>

                            <Form.Group controlId="formImagem">
                                <Form.File id="fileEvento" label="Imagem do evento" onChange={event => uploadFile(event)} />
                                { urlImagem && <img src={urlImagem} style={{ width : '160px'}} />}
                            </Form.Group>
                            
                            <Form.Group controlId="formDescricao">
                                <Form.Label>Descrição</Form.Label>
                                <Form.Control as="textarea" rows={3} value={descricao} onChange={event => setDescricao(event.target.value)} />
                            </Form.Group>
                            
                            <Form.Group controlId="formCategoria">
                                <Form.Label>Categoria</Form.Label>
                                <Form.Control as="select" value={categoriaId} onChange={ event => setCategoriaId(event.target.value)}>
                                    <option value={0}>Selecione</option>
                                    {
                                        categorias.map((item, index) => {
                                            return (
                                                <option key={index} value={item.id}>{item.nome}</option>
                                            )
                                        })
                                    }
                                </Form.Control>
                            </Form.Group>

                            <Button type="submit" >Salvar</Button>
                        </Form>
                        </Card.Body>
                    </Card>
                    <Card>
                        <Card.Body>
                        <Table bordered>
                            <thead>
                                <tr>
                                    <th>Imagem</th>
                                    <th>Nome</th>
                                    <th>Link</th>
                                    <th>Descrição</th>
                                    <th>Categoria</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    eventos.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td><img src={item.urlImagem} style={{ width : '120px'}} /></td>
                                            <td>{item.nome}</td>
                                            <td><a href={item.link} target="_blank">Ir para o evento</a></td>
                                            <td>{item.descricao}</td>
                                            <td>{item.categoria.nome}</td>
                                            <td>
                                                <Button type="button" variant="warning" value={item.id} onClick={ event => editar(event)}>Editar</Button>
                                                <Button type="button" variant="danger" value={item.id} style={{ marginLeft : '30px'}} onClick={ event => remover(event)}>Remover</Button>
                                            </td>
                                        </tr>
                                    )
                                    })
                                }
                            </tbody>
                        </Table>
                        </Card.Body>
                    </Card>
            </Container>
            <Rodape />
        </div>
    )

}

export default CrudEventos;