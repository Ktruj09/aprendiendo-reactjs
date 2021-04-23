import React, { Component } from 'react';


import Slider from './Slider'
import Sidebar from './Sidebar';
import Articles from './Articles';

class Search extends Component {

    render() {
        //en esta parte nos ayuda a mostrar el nombre de lo que se esta buscando en la vista 
        var searched = this.props.match.params.search;
        return (
            <div id="blog">
                <Slider
                    title={'Busqueda: '+searched}
                    size="slider-small"
                ></Slider>
                <div className="center">
                    <div id="content">
                        {/**Listado de Articulos que vendran de la API */}

                        <Articles
                                search={searched}
                        ></Articles>


                    </div>
                </div>
                <Sidebar
                    blog="true"
                ></Sidebar>

            </div>

        );
    }
}

export default Search;