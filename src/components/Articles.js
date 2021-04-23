import React, { Component } from 'react';
import axios from 'axios';
import Moment from 'react-moment';
import 'moment/locale/es';
import { Link } from 'react-router-dom';

//importante siempre importar de esta manera la imagen que se desea insertar. 
import ImageDefaul from '../assets/img/sinfoto.jpg'

import Global from '../Global';

class Articles extends Component {

    url = Global.url;

    //es importante siempre hacer el state, para la vista 
    state = {
        articles: [],
        status: null,
        
    }
    //este metodo es para mostrar los articulos de nuestra api a la vista
    componentDidMount() {
        var home = this.props.home;
        var search = this.props.search;

        if (home === "true") {
            this.getLastArticles();
        } else if (search && search !== null && search !== undefined) {
            this.getArticlesBySearch(search);
        } else {
            this.getArticles();
        };
    };


    //metodo de buscar articulo 
    getArticlesBySearch = (searched) => {
        //search es de la ruta que se tiene en la api
        axios.get(this.url+"search/"+searched)
                .then(res =>{
                     this.setState({
                         articles: res.data.articles,
                         status: 'success'
                     });
                })
                .catch(err =>{
                    this.setState({
                        articles: [],
                        status: 'success'
                    })
                });
    };//end search





    //metodo para los últimos articulos.
    getLastArticles() {
        axios.get(this.url + 'articles/last')
            .then(res => {

                //petición ajax
                this.setState({
                    articles: res.data.articles,
                    status: 'success'
                });

            });
    };//end getLastArticles


    //metodo para mostrar todos los articulos
    getArticles = () => {
        axios.get(this.url + 'articles')
            .then(res => {

                //petición ajax
                this.setState({
                    articles: res.data.articles,
                    status: 'success'
                });

            });
    };//end getArticles

    render() {

        //en esta parte nos servira para ver 
        //si es mayor o igual a uno, si hay mas articulos, lo que hará es mostrar todos. 
        if (this.state.articles.length >= 1) {

            //recorrer todo state de articles
            var listArticles = this.state.articles.map((article) => {

                return (


                    <article key={article._id}className="article-item" id="article-template">
                        <div className="image-wrap">
                            {article.image !== null ? (
                                <img src={this.url + 'get-image/' + article.image} alt={article.title} />
                            ) : (
                                    <img src={ImageDefaul} alt={article.title} />
                                )

                            }

                        </div>

                        <h2>{article.title}</h2>
                        <span className="date">
                            <Moment locale="es" fromNow>{article.date}</Moment>
                        </span>
                        <Link to={'/blog/articulo/' + article._id}>Leer más</Link>

                        <div className="clearfix"></div>
                    </article>

                )
            })
            return (
                <React.Fragment>

                    <div id="articles">
                        <h1>Listado de Articulos</h1>
                        {listArticles}
                    </div>

                </React.Fragment>
            );//end return 
        } else if (this.state.articles.length === 0 && this.state.status === 'success') {
            return (
                <React.Fragment>

                    <div id="articles">
                        <h2 className="subheader">No hay articulos por mostrar.</h2>
                    </div>

                </React.Fragment>
            );//end return 
        } else {
            return (
                <React.Fragment>

                    <div id="articles">
                        <h2 className="subheader">Cargando...</h2>
                    </div>

                </React.Fragment>
            );//end return 
        }
    }//end render
}

export default Articles;