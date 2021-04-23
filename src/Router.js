import React, { Component } from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';


import Peliculas from './components/Peliculas';
import Error from './components/Error';

import Header from './components/Header';

import Footer from './components/Footer';
import Home from './components/Home';
import Blog from './components/Blog';
import Formulario from './components/Formulario';
import Search from './components/Search';
import Article from './components/Article';
import EditArticle from './components/EditArticle';
import CreateArticle from './components/CreateArticle';


class Router extends Component {

    render() {

        return (


            <BrowserRouter>
                <Header></Header>




                {/**Configuramos Rutas y Páginas */}
                <Switch>
                    <Route exact path="/" component={Home}></Route>
                    <Route exact path="/home" component={Home}></Route>
                    <Route exact path="/blog" component={Blog}></Route>

                    {/**Ruta especifica del blog, al momento de darle clic en Leer Más */}
                    <Route exact path="/blog/articulo/:id" component={Article}></Route>


                    {/**Creación de articulos. */}
                    <Route exact path="/blog/crear" component={CreateArticle}></Route>

                    {/**Ruta para edición */}
                    <Route exact path="/blog/editar/:id" component={EditArticle}></Route>

                    {/**Ruta para buscador mediante url */}
                    <Route exact path="/blog/busqueda/:search" component={Search}></Route>
                    {/** Esto nos servira para el input de buscar en la página */}
                    <Route exact path="/redirect/:search" render={

                        (props) => {
                            var search = props.match.params.search;
                            return (
                                <Redirect to={'/blog/busqueda/'+search}></Redirect>
                            );//end return 
                        }

                    }></Route>

                    <Route exact path="/formulario" component={Formulario}></Route>
                    <Route exact path="/pelicula" component={Peliculas}></Route>

                    <Route exact path="/pagina-1" render={() => (
                        <h1>Hola Mundo desde la Ruta Pagina 1</h1>
                    )}></Route>

                    <Route exact path="/prueba/:nombre/:apellido?" render={(props) => {

                        //es importa siempre colocar {} para poder hacerlo JavaScript
                        // con la ruta prueba/:id, le indicamos que tiene que ingresar obligatoriamente un parametro
                        //con la ruta prueba/:id? le indicamos que puede ser opcional
                        var nombre = props.match.params.nombre;
                        var apellido = props.match.params.apellido;

                        return (
                            <div id="content">
                                <h2 className="subheader">Página Pruebas</h2>
                                <h2>
                                    {nombre && !apellido &&
                                        <span>{nombre}</span>
                                    }
                                    {nombre && apellido &&
                                        <span>{nombre} {apellido}</span>

                                    }</h2>


                            </div>

                        );
                    }
                    }></Route>



                    <Route component={Error}></Route>


                </Switch>

                <div className="clearfix"></div>

                <Footer></Footer>

            </BrowserRouter >

        );//end render
    }//end render

}//end Router


export default Router; 