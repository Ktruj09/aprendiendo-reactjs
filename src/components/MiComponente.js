/**
 * Para crear nuestro componente tenemos que importar primero 
 * la libreria React 
 * 
 * import React, {Component} from 'react';, es lo mismo que llamar a React.Component
 * 
 * Ya en el Extendes solo llamamos al Compoente
 */

import React, {Component} from 'react';



//A la class es importante nombrarlo como se ha llamado el fichero.
class MiComponente extends Component {

    /**
     * Dentro de () tiene que ir todo el JS
     */
     render(){
            let receta ={
                nombre: 'Pizza',
                ingredientes: ['Tomate ', ' Queso', ' Jamon Cocido'],
                calorias: 400
            }
        return  (

            /**
             * en este caso no podemos meter dos etiquetas html, ya que esto nos daría error 
             * 
             * Para esto usamos <React.Fragment>
             */
            <React.Fragment>
                    <h1>Hola Soy un Componente</h1>
                    <h1>{receta.nombre}</h1>
                    <h1>{'Las Calorias son: '+ receta.calorias}</h1>

                        <ol>
                            {
                                receta.ingredientes.map((ingrediente, i)=>{
                                    console.log(ingrediente)

                                    return (

                                        /**
                                         * Es importante colocar siempre el valor de Key para poder 
                                         * identificar los elementos del DOM
                                         */
                                        <li key={i}>
                                            {ingrediente}
                                        </li>
                                    )
                                })
                            }
                        </ol>


                    <hr></hr>

                    <h2>Es una prueba de Componentes</h2>
                    <h2>Usando React Fragment</h2>

            </React.Fragment>
            
         ) 
     }

     

}

//luego lo exportamos
export default MiComponente;