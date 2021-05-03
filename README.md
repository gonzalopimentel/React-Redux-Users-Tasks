Curso de React Redux

En este curso vi que es Redux y como usarlo.

Existen 4 pilares en Redux: El store ( que lo unicio en index.js el principal ) y tiene 3 parametros en este ejercicio:
-los reducers ( donde importamos { combineReducers } from redux y dentro de esta funcion ({ ingresamos los reducers) )

- { el estado inicial vacío }
- y el Middleware que en este caso es { applyMiddleware } from redux y como parametro lleva reduxThunk.

Tenemos 3 carpetas en src: actions, reducers y components.

En actions, esta la action de traerTodos los usuarios usando axios y la url, luego el DISPATCH se encarga de enviar el tipo de action "traer_usuarios" y el payload o lo que le envía al reducer y que es la respuesta.data de la peticion a la url que son los usuarios.

En components, tenemos el template de Usuarios en su index.js y dentro esta todo lo visual, se hace el render, hay la funcion de ponerFilas() pero como al inicio el estado de Usuarios esta vacio no se renderiza hasta que el componente se monta y al montarse, se ejecuta el llamado a this.props.traerTodos ( que es un action ) que esta conectado con el componente gracias a connect() que recibe mapStateToProps para enviar los reducers y los actions en este caso usuariosActions donde se encuentra el action de traerTodos y los 2 conectados con el componente Usuarios. Entonces se realiza la acción, se obtiene la data de los usuarios, se envia al reducer y este retorna al stado la data como action.payload.
Tambien en components tenemos App.js donde es el origen y donde se manejan las 2 rutas ( / y tareas ) y tambien el menu.
El menu, utiliza el metodo { Link } de react-router-dom para el manejo de rutas sin recarga de la pagina.

Y eso sería todo.
