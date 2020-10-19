import React, { Component } from 'react';
// import Menu from '../../components/menu'
// import Jumbotron from '../../components/jumbotron'

class Filmes extends Component {

    constructor(){
        super();

        this.state = {
            nome : '',
            categoria : '',
            ano : '',
            filmes : [],
            url : 'https://5f7f4f9bd6aabe00166f0238.mockapi.io/api/filmes'
        }
    }

    componentDidMount(){
        this.listar();
    }

    listar(){
        fetch(this.state.url)
                .then(response => response.json())
                .then(data => {
                    this.setState({filmes : data})
                })
                .catch(err => console.error(err))
    }

    setId(event){
        this.setState({id : event.target.value});
    }
      
    setNome(event) {
        this.setState({nome : event.target.value});
    }

    setCategoria(event) {
        this.setState({categoria : event.target.value});
    }

    setAno(event) {
        this.setState({ano : event.target.value});
    }

    editar(event){
        event.preventDefault();

        fetch(this.url + '/' + event.target.value)
            .then(response => response.json())
            .then(dado => {
                this.setId(dado.id);
                this.setNome(dado.nome);
                this.setCategoria(dado.categoria);
                this.setAno(dado.anoLancamento);
            })
            .catch(err => console.error(err));
    }

    

    remover(event){
        event.preventDefault();
        
        fetch(this.state.url + '/' + event.target.value, {
            method : 'DELETE'
        })
        .then(response => response.json())
        .then(dados => {
            alert('Filme removido');
            this.listar();
        })
        .catch(err => console.error(err));
    }
    
    cadastrar(event) {
        event.preventDefault();

        const filme = {
            nome : this.state.nome,
            categoria : this.state.categoria,
            anoLancamento : this.state.ano
        }

        let method = (document.querySelector('#filmeId').value === '' ? 'POST' : 'PUT');
        let urlRequest = (document.querySelector('#filmeId').value === '' ? this.state.url : this.state.url + '/' + document.querySelector('#filmeId').value)
            fetch(urlRequest, {
                method : method,
                body: JSON.stringify(filme),
                headers : {
                    'content-type' : 'application/json'
                }
            })
            .then(response => response.json())
            .then(data => {
                alert('Filme Cadastrado');
                this.listar();
            })
            .catch(err => console.error(err));
    }

    render(){
        return (
            <div>
                {/* <Menu />
                <Jumbotron titulo="Filmes" chamada="Cadastre e visualize filmes cadastrados" />
         */}
                <div className="container">
                    <div className="bd-example" >
                        <form  onSubmit={this.cadastrar.bind(this)}>
                            <input type="hidden" id="filmeId" />
                            <div className="form-group">
                                <label htmlFor="nome">Nome</label>
                                <input type="text" className="form-control" id="nome" value={this.state.nome} aria-describedby="nome" placeholder="Informe o Nome" onChange={(event) => this.setNome(event)} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="categoria">Categoria</label>
                                <input type="text" className="form-control" id="categoria" value={this.state.categoria} placeholder="Informe a Categoria" onChange={(event) => this.setCategoria(event)} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="ano">Ano de Lançamento</label>
                                <input type="text" className="form-control small" id="anoLancamento" value={this.state.ano} placeholder="Informe o Ano de Lançamento" onChange={(event) => this.setAno(event)} required />
                            </div>
                            <button type="reset" className="btn btn-secondary">Cancelar</button>
                            <button type="submit" className="btn btn-success">Cadastrar</button>
                        </form>
        
                        <table className="table" style={{marginTop : '40px'}}>
                            <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Nome</th>
                                <th scope="col">Categoria</th>
                                <th scope="col">Ano Lançamento</th>
                                <th scope="col">Ações</th>
                                <th scope="col"><button type="reset" className="btn btn-primary">Novo Filme</button></th>
                            </tr>
                            </thead>
                            <tbody id="tabela-lista-corpo">
                                {
                                    this.state.filmes.map((item, index) => {
                                        return(
                                            <tr key={index}>
                                                <td>{item.id}</td>
                                                <td>{item.nome}</td>
                                                <td>{item.categoria}</td>
                                                <td>{item.anoLancamento}</td>
                                                <td>
                                                    <button type="button" value={item.id} onClick={this.remover.bind(this)} >Remover</button>
                                                    <button type="button" value={item.id} onClick={this.editar.bind(this)} >Editar</button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

export default Filmes;
