import React, { useEffect, useState } from 'react';
import { Container, Table, Button, Form, Card } from 'react-bootstrap';
import {url} from '../../../utils/constants';
import Menu from '../../../components/menu';
import Rodape from '../../../components/rodape';
import Titulo from '../../../components/titulo';

const CrudCategorias = () => {
    const [id, setId] = useState(0);
    const [nome, setNome] = useState('');
    const [urlImagem, setUrlImagem] = useState('');
    const [categorias, setCategorias] = useState([]);

    useEffect(() => {
        listar();
    }, []); 

    const listar = () => {
        fetch(url + '/categorias')
            .then(response => response.json())
            .then(data => {
                setCategorias(data.data)
                limparCampos();
            })
            .catch(err => console.error(err));
    }

    const editar = (event) => {
        event.preventDefault();

        fetch(`${url}/categorias/${event.target.value}`, {
            method : 'GET'
        })
        .then(response => response.json())
        .then(dado => {
            console.log(dado);
            setId(dado.data.id);
            setNome(dado.data.nome);
            setUrlImagem(dado.data.urlImagem);
        })
    }

    const remover = (event) => {
        event.preventDefault();

        fetch(`${url}/categorias/${event.target.value}`,{
            method : 'DELETE',
            headers : {
                'authorization' : 'Bearer ' + localStorage.getItem('token-nyous')
            }
        })
        .then(response => response.json())
        .then(dados => {
            alert('Categoria removida');

            listar();
        })
    }

    const uploadFile = (event) => {
        event.preventDefault();

        let formdata = new FormData();

        formdata.append('arquivo', event.target.files[0]);

        fetch(`${url}/upload`,{
            method : 'POST',
            body : formdata
        })
        .then(response => response.json())
        .then(data => {
            setUrlImagem(data.url);
        })
        .catch(err => console.log(err))

    }

    const salvar = (event) => {
        event.preventDefault();

        const categoria = {
            nome : nome,
            urlImagem :urlImagem,
        }

        //if ternário para saber se vai fazer um post ou put
        let method = (id === 0 ? 'POST' : 'PUT');
        let urlRequest = (id === 0 ? `${url}/categorias` : `${url}/categorias/${id}`);

        fetch(urlRequest, {
            method : method,
            body : JSON.stringify(categoria),
            headers : {
                'content-type' : 'application/json',
                'authorization' : 'Bearer ' + localStorage.getItem('token-nyous')
            }
        })
        .then(response => response.json())
        .then(dados => {
            alert('Categoria salva');

            listar();
        })
        .catch(err => console.error(err))
    }

    const limparCampos = () => {
        setId(0);
        setNome('');
        setUrlImagem('');
    }
    
    return (
        <div>
            <Menu />
            <Container>
                <Titulo titulo="Categorias" chamada="Gerencia as suas categorias" />
                <Card>
                    <Card.Body>
                        <Form onSubmit={ event => salvar(event)}>
                            <Form.Group controlId="formBasicNome">
                                <Form.Label>Nome</Form.Label>
                                <Form.Control type="text" value={nome} onChange={event => setNome(event.target.value)} placeholder="Tecnologia, Inovação, Startups, ..."></Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.File id="fileCategoria" label="Imagem da categoria" onChange={event => { uploadFile(event)}} />
                                {/* Se urlImagem diferente de '' mostra a imagem = && */}
                                {/* Se urlImagem estiver igual '' mostra a imagem = ||  */}
                                {urlImagem && <img src={urlImagem} style={{ width : '120px'}} />}
                            </Form.Group>
                            <Button type="submit">Salvar</Button>
                        </Form>
                    </Card.Body>
                </Card>

                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Imagem</th>
                            <th>Nome</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            categorias.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td><img src={item.urlImagem} style={{ width : '120px'}}/></td>
                                        <td>{item.nome}</td>
                                        <td>
                                            <Button variant="warning" value={item.id} onClick={event => editar(event)} >Editar</Button>
                                            <Button variant="danger" value={item.id} onClick={event => remover(event)} style={{ marginLeft : '40px'}}>Remover</Button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
            </Container>
            <Rodape />
        </div>
    )

}

export default CrudCategorias;