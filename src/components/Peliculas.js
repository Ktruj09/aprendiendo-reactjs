import React, { Component } from 'react';

import Pelicula from './Pelicula';
import Slider from './Slider'
import Sidebar from './Sidebar';

class Peliculas extends Component {


    state = {
        peliculas: [
            { titulo: 'Bataman Vs Superman', image: 'https://www.cinemascomics.com/wp-content/uploads/2016/02/batmanvsuperman-poster-01.jpg' },
            { titulo: 'Watchmen', image: 'https://lasillarotarm.blob.core.windows.net.optimalcdn.com/images/2018/10/16/thewatchmenseriehbo-focus-0-0-983-557.jpg' },
            { titulo: 'Joker', image: 'https://c4.wallpaperflare.com/wallpaper/710/699/687/joker-joker-2019-movie-joaquin-phoenix-hd-wallpaper-preview.jpg' }

        ],
        favorita: {},

    }

    cambiarTitulo = () => {
        ///actualización solo un elemento
        var { peliculas } = this.state;
        peliculas[0].titulo = " Batman Begins";

        this.setState({
            peliculas: peliculas
        })
    }



    favorita = (pelicula) => {
        console.log("Favorita Marcada");
        console.log(pelicula);

        this.setState({
            favorita: pelicula
        });
    }




    render() {

        /**Forma clasica de usar el if else */
        var favorita;
        if (this.state.favorita.titulo) {
            favorita = (
                <p className="favorita">
                    <strong>La pelicula favorita es: </strong>
                    <span>{this.state.favorita.titulo}</span>
                </p>
            )
        } else {
            favorita = (
                <p>No hay Pelicula Favorita.</p>
            )
        }

        return (
            <React.Fragment>
                <Slider
                    title="Peliculas"
                    size="slider-small"
                ></Slider>
                <div className="center">
                    <div id="content" className="peliculas">

                        <p>Selección de Peliculas</p>

                        <p>
                            <button onClick={this.cambiarTitulo}>Cambiar Titulo</button>
                        </p>

                        {/** Otra Forma de usar el if else en JSX
                    {this.state.favorita.titulo ? (
                        <p className="favorita">
                            <strong>La pelicula favorita es: </strong>
                            <span>{this.state.favorita.titulo}</span>
                        </p>
                    ) : (
                            <p>No hay Pelicula Favorita.</p>
                        )
                    }
                    */}
                        {favorita}


                        {/**Crear Componente peliculas */}
                        <div id="articles" className="peliculas">
                            {
                                this.state.peliculas.map((pelicula, i) => {
                                    return (
                                        <Pelicula
                                            key={i}
                                            pelicula={pelicula}
                                            marcarFavorita={this.favorita}
                                        ></Pelicula>
                                    )

                                })
                            }
                        </div>
                    </div>
                    <Sidebar
                        blog="false"
                    ></Sidebar>
                </div>

                </React.Fragment>

        );

    }
}

export default Peliculas;