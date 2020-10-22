import React, {useEffect, useState} from 'react';
import Menu from '../../../components/menu';
import Rodape from '../../../components/rodape';
import Titulo from '../../../components/titulo';
import { Card, Container, Form, Button, Table } from 'react-bootstrap';
import { url } from '../../../utils/constants';

const CrudCategorias = () => {
    const [id, setId] = useState(0);
    const [nome, setNome] = useState('');
    const [urlImagem, setUrlImagem] = useState('');
    const [ categorias, setCategorias] = useState([]);

    useEffect(() => {
        listar();
    }, [])

    const listar = () => {

        fetch(`${url}/categorias`)
            .then(response => response.json())
            .then(dados => {
                setCategorias(dados.data);
                
                limparCampos();
            })
            .catch(err => console.error(err));
    }


    const salvar = (event) => {
        event.preventDefault();

        const categoria = {
            nome : nome,
            urlImagem : urlImagem
        }

        //if ternário para saber se vai fazer um post ou put
        let method = (id === 0 ? 'POST' : 'PUT');
        let urlRequest = (id === 0 ? `${url}/categorias` :  `${url}/categorias/${id}`);

        fetch(urlRequest, {
            method : method,
            body : JSON.stringify(categoria),
            headers : {
                'content-type' : 'application/json',
                'authorization' : 'Bearer ' + localStorage.getItem('token-nyous-tarde')
            }
        })
        .then(response => response.json())
        .then(dados => {
            alert('Categoria salva');

            listar();
        })
        .catch(err => console.error(err))
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

    const editar = (event) => {
        event.preventDefault();

        fetch(url + '/categorias/' + event.target.value, {
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
        })
    }

    const remover = (event) => {
        event.preventDefault();

        fetch(url + '/categorias/' + event.target.value,{
            method : 'DELETE',
            headers : {
                'authorization' : 'Bearer ' + localStorage.getItem('token-nyous-tarde')
            }
        })
        .then(response => response.json())
        .then(dados => {
            alert('Categoria removida');

            listar();
        })
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
                    <Titulo titulo="Categorias" chamada="Faça o crud completo das categorias do sistema" />

                    <Card>
                        <Card.Body>
                        <Form onSubmit={ event => salvar(event)}>
                            <Form.Group controlId="formNome">
                                <Form.Label>Nome</Form.Label>
                                <Form.Control type="text" value={nome} onChange={event => setNome(event.target.value)} />
                            </Form.Group>

                            <Form.Group controlId="formNome">
                                <Form.File id="fileCategoria" label="Imagem da Categoria" onChange={event => uploadFile(event)} />
                                { urlImagem && <img src={urlImagem} style={{ width : '160px'}} />}
                            </Form.Group>
                            <Button type="submit" >Salvar</Button>
                        </Form>
                        </Card.Body>
                    </Card>
                    <Table bordered>
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
                                        <td><img src={item.urlImagem} style={{ width : '120px'}} /></td>
                                        <td>{item.nome}</td>
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
                </Container>
            <Rodape />
        </div>
    )

}

export default CrudCategorias;