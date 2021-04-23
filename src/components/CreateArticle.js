import React, { Component } from 'react';
import axios from 'axios';
import SimpleReactValidator from 'simple-react-validator';
import swal from 'sweetalert';
import { Redirect } from 'react-router-dom';
import Global from '../Global';
import Sidebar from './Sidebar';

class CreateArticle extends Component {

    url = Global.url;

    titleRef = React.createRef();
    contentRef = React.createRef();


    state = {

        article: {},
        status: null,
        selectedFile: null,
    };

    componentWillMount() {
        this.validator = new SimpleReactValidator({

            //personalización para mostrar mensaje 
            messages: {
                required: 'Es requirido llenar este campo.'
            }
        });
    }



    //metodo para modificar la state de manera dinamica
    changeState = () => {

        this.setState({
            //esta parte servira para que se recojan los datos y sean llenados en la state
            article: {
                title: this.titleRef.current.value,
                content: this.contentRef.current.value
            }
        });

        //esto nos ayuda a mostrar mensajes de error en tiempo real
        //es decir, al momento que se esten llenando los campos.
        this.validator.showMessages();
            this.forceUpdate();
    }

    //metodo para guardar 
    saveArticle = (e) => {
        e.preventDefault();

        //rellan state con el formulario 
        this.changeState();


        //en este if nos servira para validación de los formulario. 
        if (this.validator.allValid()) {
            //petición http para guardar 
            axios.post(this.url + 'save', this.state.article)
                .then(res => {

                    if (res.data.article) {

                        this.setState({
                            article: res.data.article,
                            status: 'success'
                        });

                        swal(
                            'Articulo Creado',
                            'Exitosamente!',
                            'success'
                        )

                        //subir imaagen
                        if (this.state.selectedFile !== null) {

                            //sacamos el id del articulo guardado
                            var articleId = this.state.article._id;

                            //crear form data para añadir el fichero 
                            const formData = new FormData();

                            //con append vinculamos un fichero 
                            formData.append(
                                'file0',
                                this.state.selectedFile,

                                //de esta manera decimos el nombre del archivo y que se va a guardar
                                this.state.selectedFile.name
                            );
                            //petición AJAX
                            axios.post(this.url + 'upload-imagen/' + articleId, formData)
                                .then(res => {

                                    if (res.data.article) {
                                        this.setState({
                                            article: res.data.article,
                                            status: 'success'
                                        })
                                    } else {
                                        this.setState({
                                            article: res.data.article,
                                            status: 'failed'
                                        })
                                    }
                                });

                        } else {
                            this.setState({
                                /**
                                 * waiting se ha colocado, ya que nos ira a redirigir a blog
                                 * cuando sea 'success'
                                 */
                                status: 'waiting'
                            });
                        }


                    } else {
                        this.setState({
                            status: 'failed'
                        })
                    }
                })
        } else {

            this.setState({
                status: 'failed'
            })
            this.validator.showMessages();
            this.forceUpdate();
        }



    }


    //metodo para subir imagen
    fileChange = (event) => {

        this.setState({

            //SELECIONA EL ELMENTO A SUBIR acutalizar state
            selectedFile: event.target.files[0]
        });


    }



    render() {

        if (this.state.status === 'success') {
            return (<Redirect to="/blog" ></Redirect>)
        }

        return (

            <div className="center">
                <section id="content">
                    <h1 className="subheader">Crear Articulo</h1>

                    <form className="mid-form" onSubmit={this.saveArticle}>

                        <div className="form-group">
                            <label htmlFor="title">Titulo</label>
                            <input type="text" name="title" ref={this.titleRef} onChange={this.changeState}></input>

                            {this.validator.message('title', this.state.article.title, 'required|alpha_num_space')

                            }
                        </div>

                        <div className="form-group">
                            <label htmlFor="content">Titulo</label>
                            <textarea name="content" ref={this.contentRef} onChange={this.changeState}></textarea>
                        </div>

                        <div className="form-group">
                            <label htmlFor="file0">Imagen</label>
                            <input type="file" name="file0" onChange={this.fileChange}></input>
                        </div>

                        <input type="submit" value="Guardar" className="btn btn-success"></input>
                    </form>


                </section>
                <Sidebar></Sidebar>
            </div>

        );//end return 
    }//end Render 
}

export default CreateArticle;