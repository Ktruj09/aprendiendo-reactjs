import React, { Component } from 'react';

import Slider from './Slider'
import Sidebar from './Sidebar';
import Articles from './Articles';

class Home extends Component {

    render() {
        var buttonString = "Ir Al Blog"
        return (
            <React.Fragment>
                <Slider
                    title="Bienvenido al Curso de Framework React"
                    btn={buttonString}
                    
                ></Slider>
                <div className="center">
                    <div id="content">
                        <h1 className="subheader">últimos Articulos</h1>

                        <Articles 
                                home="true"
                        ></Articles>

                    </div>
                </div>
                <Sidebar></Sidebar>

            </React.Fragment>

        );
    }
}

export default Home;