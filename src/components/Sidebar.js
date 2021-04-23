import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';

class Sidebar extends Component {

    //createRef es para recoger el valor del formulario
    searchRef = React.createRef();

    //estado del componente
    state = {
        search: "",
        redirect: false,
    }

    //metodo para buscar 
    redirectToSearch=(e)=>{

        e.preventDefault();
        
        //le damos valor a la state
       this.setState({
           search: this.searchRef.current.value,
           redirect: true
       })
    }
    render() {


        if(this.state.redirect){
            return (

                <Redirect to={'/redirect/'+this.state.search}></Redirect>

            )//end retrun 
        }
        return (

            <aside id="sidebar">
                {this.props.blog === "true" &&
                    <div id="nav-blog" className="sidebar-item">
                        <h3>Puedes hacer esto</h3>
                        <Link to={"/blog/crear"} className="btn btn-success">Crear artículo</Link>
                    </div>

                }


                <div id="search" className="sidebar-item">
                    <h3>Buscador</h3>
                    <p>Encuentra el artículo que buscas</p>
                    <form onSubmit={this.redirectToSearch}>
                        <input type="text" name="search" ref={this.searchRef}/>
                        <input type="submit" name="submit" value="Buscar" className="btn" />
                    </form>
                </div>
            </aside>
        );
    }//end Render
}

export default Sidebar;