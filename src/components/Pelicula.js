import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class Pelicula extends Component {

    marcar =()=>{
        this.props.marcarFavorita(this.props.pelicula);
    }
    render() {
       
        const { titulo, image } = this.props.pelicula;

        return (

            <article className="article-item" id="article-template">
                <div className="image-wrap">
                    <img src={image} alt={titulo}></img>
                </div>

                <h2>{titulo}</h2>
                <span className="date">
                    Hace 5 Minutos
                
        </span>
                <Link to="/blog" className>Leer Mas</Link>
                <button onClick={this.marcar}>
                    Favorita
                </button>

                <div className="clearfix"></div>
            </article>
        );


    }//end render

}//end class Pelicula

export default Pelicula;