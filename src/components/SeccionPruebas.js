import React, {Component} from 'react';
import MiCompoente from './MiComponente.js';




class SeccionPruebas extends Component{

  contador = 0;
  /**
   * 
   * state Basica
   */
  constructor(props){
    super(props);

    //definimos el state
    this.state ={
      contador: 0
    }
  }


  HolaMundo(nombre){
    var presentacion = <div>
                <h2>Hola, soy {nombre}</h2>
                <h3>Practicando React</h3>
    </div>
    
    return presentacion;
  }

  //con el =() =>, nos evitamos el poner al momento de llamar el 
  //evento click en el button bind.this
  sumar =() =>{
     // this.contador = this.contador+1;
     //importante que cuando usuemos state usar setState
     this.setState({
       contador: (this.state.contador +1)
     });
     
  }//end sumar


  restar=() =>{
    //this.contador = this.contador-1;
    this.setState({
      contador: (this.state.contador -1)
    })
    
  }

  saludo(){
    alert("Hola Soy Kevin");
  }
  
    render(){
      var nombre ="Kevin Trujillo";
         return (
            <section id="content">

        <h2 className="subheader">Funciones y JSX Basicos</h2>
           
            <p>
              
              Bienvenido al curso de React JS
            
            </p>
            {this.HolaMundo(nombre)}
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
            <section className="componentes">
            <h2 className="subheader">Componentes</h2>
                <MiCompoente></MiCompoente>
              
            </section> 

            <h2 className="subheader">Estados</h2>

                <p>
                 contador: {this.state.contador}
                </p>
                <p>
                  <input type="button" value="Sumar"onClick={this.sumar}></input>
                  <input type="button" value="Restar" onClick={this.restar}></input>
                  <input type="button" value="Saludar" onClick={this.saludo}></input>
                </p>

            </section>
         )
    }
}

export default SeccionPruebas;