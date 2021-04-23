import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom'
import axios from 'axios';
import Global from '../Global';
import Sidebar from './Sidebar'
import Moment from 'react-moment'
import 'moment/locale/es';
import swal from 'sweetalert';
import ImageDefaul from '../assets/img/sinfoto.jpg'

class Article extends Component {

    url = Global.url;

    state = {
        article: false,
        status: null,
    };

    //siempre que hagamos una petición es importante usar este metodo
    componentWillMount() {
        this.getArticle();
    }


    //metodo que saca articulo de la API
    getArticle = () => {

        //nos ayuda a recoger el id
        var id = this.props.match.params.id;

        axios.get(this.url + 'article/' + id)
            .then(res => {
                this.setState({
                    article: res.data.article,
                    status: 'success'
                });
            })
            .catch(err => {
                this.setState({
                    article: false,
                    status: 'success'
                });
            })
    }


    //metodo para eliminar
    deleteArticle = (id) => {

        swal({
            title: "¿Estas seguro que deseas eliminar el Articulo?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    axios.delete(this.url + 'article/' + id)
                        .then(res => {
                            this.setState({
                                article: res.data.article,
                                status: 'delete'
                            })
                        })
                    swal("Se ha Borrado el elemento, puedes comprobarlo..", {
                        icon: "success",
                    });
                } else {
                    swal(
                        'No se ha borrado el articulo',
                        'Puedes comporbarlo',
                        'success'
                    );
                }
            });
    }

    render() {

        //comprobamos la eliminación del archivo para usar un redirect
        if (this.state.status === 'delete') {

            return (<Redirect to="/blog"></Redirect>)
        }



        //usamos esta variable para acortar this.state.article.title
        //y solo colocar article. 
        var article = this.state.article;
        return (
            <div className="center">
                <section id="content">

                    {this.state.article &&
                        <article className="article-item article-detail">
                            <div className="image-wrap">
                                {article.image !== null ? (
                                    <img src={this.url + 'get-image/' + article.image} alt={article.title} />
                                ) : (
                                        <img src={ImageDefaul} alt={article.title} />
                                    )

                                }

                            </div>

                            <h1 className="subheader">{article.title}</h1>
                            <span className="date">
                                <Moment locale="es" fromNow>{article.date}</Moment>
                            </span>

                            <p>{article.content}</p>
                            <Link onClick=
                                {
                                    () => {
                                        this.deleteArticle(article._id);
                                    }
                                }

                             className="btn-danger">Eliminar</Link>


                            <Link to={'/blog/editar/'+article._id} className="btn-danger">Editar</Link>


                            <div className="clearfix"></div>
                        </article>
                    }

                    {/**Cuando el articulo no existe */}
                    {!this.state.article && this.state.status === 'success' &&
                        <div id="article">
                            <h2 className="subheader">El articulo No existe.</h2>
                            <p>Intentalo nuevamente más tarde. </p>
                        </div>
                    }

                    {this.state.status == null &&
                        <div id="article">
                            <h2 className="subheader">Cargando..</h2>
                            <p>Espere unos segundos.. </p>
                        </div>
                    }


                </section>
                <Sidebar></Sidebar>
            </div>
        );//end return 
    }//end rencer
}

export default Article;