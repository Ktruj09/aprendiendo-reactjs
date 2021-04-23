import React, { Component } from 'react';
import Sidebar from './Sidebar';

class Formulario extends Component {

    //identificamos cada uno de los campos del formulario
    nombreRef = React.createRef();
    apellidoRef = React.createRef();
    BioeRef = React.createRef();
    GeneroHRef = React.createRef();
    GeneroMRef = React.createRef();

    state = {
        user: {

        }
    }

    recibirFormulario = (e) => {
        //evita recargar la pantalla
        e.preventDefault();

        var genero = 'hombre';

        if (this.GeneroHRef.current.checked) {
            genero = this.GeneroHRef.current.value;
        } else {
            genero = this.GeneroMRef.current.value;
        }


        var user = {
            nombre: this.nombreRef.current.value,
            apellido: this.apellidoRef.current.value,
            bio: this.BioeRef.current.value,
            genero: genero
        };

        this.setState({
            user: user
        })
        //current.value, nos permite extraer solo el dato que esta en nombre
        console.log("Formulario Enviado..")
        console.log(user)

    }




    render() {

        if (this.state.user.nombre) {
            var user = this.state.user;
        }
        return (
            <div id="formulario">
                <h1 className="subheader">Formulario</h1>
                <div className="center">


                    {/**Mostrar datos enviados  */}

                    {this.state.user.nombre &&

                        <React.Fragment>

                            <div>
                                <p>Nombre: <strong>{user.nombre}</strong></p>
                            </div>

                            <div>
                                <p>Apellido: <strong>{user.apellido}</strong></p>
                            </div>

                            <div>
                                <p>Biografia: <strong>{user.bio}</strong></p>
                            </div>

                            <div>
                                <p>Genero: <strong>{user.genero}</strong></p>
                            </div>
                        </React.Fragment>



                    }

                    <div id="content">
                        {/**Creación del Formulario. */}

                        <form className="mid-form" onSubmit={this.recibirFormulario} onChange={this.recibirFormulario}>
                            <div className="form-group">
                                <label for="nombre">Nombre</label>
                                <input type="text" name="nombre" ref={this.nombreRef} />
                            </div>

                            <div className="form-group">
                                <label for="apellidos">Apellidos</label>
                                <input type="text" name="apellidos" ref={this.apellidoRef} />
                            </div>

                            <div className="form-group">
                                <label for="bio">Biografia</label>
                                <textarea name="bio" ref={this.BioeRef}></textarea>
                            </div>

                            <div className="form-group radibuttons">
                                <input type="radio" name="genero" value="hombre" ref={this.GeneroHRef} /> Hombre
                            <input type="radio" name="genero" value="mujer" ref={this.GeneroMRef} /> Mujer

                        </div>

                            <div className="clearfix"></div>

                            <input type="submit" value="Enviar" class="btn btn-success" />

                        </form>




                    </div>
                </div>
                <Sidebar
                    blog="false"
                ></Sidebar>

            </div>
        )
    }
}

export default Formulario; 