import axios from "axios";
import {
  CARGANDO,
  TRAER_TODAS,
  ERROR,
  CAMBIO_USUARIO_ID,
  CAMBIO_TITULO,
  GUARDAR,
  ACTUALIZAR,
  LIMPIAR,
} from "../types/tareasTypes";

export const traerTodas = () => async (dispatch) => {
  dispatch({
    type: CARGANDO,
  });

  try {
    const respuesta = await axios.get(
      "https://jsonplaceholder.typicode.com/todos"
    );

    const tareas = {};

    // INTERESANTE LOGICA PARA NORMALIZAR LOS DATOS
    // lo que hace es que por cada tarea itera, luego al objeto
    // vacio de tareas le agrega un atributo de [tar.userId]
    // y a este atributo le pone todo lo que tenga de tareas
    // del [tar.id] "1". Luego continua la siguiente tarea y
    // verifica que el userId SIGUE siento el 1 por lo cual le retorna
    // ...tareas que seria la tarea 1 pero en tar.id es "2"
    // por lo cual crea un nuevo objeto y le da la tarea 2.
    respuesta.data.map(
      (tar) =>
        (tareas[tar.userId] = {
          ...tareas[tar.userId],
          [tar.id]: {
            ...tar,
          },
        })
    );

    dispatch({
      type: TRAER_TODAS,
      payload: tareas,
    });
  } catch (error) {
    console.log("Error: ", error.message);

    dispatch({
      type: ERROR,
      payload: "Información de tareas no disponible",
    });
  }
};

export const cambioUsuarioId = (usuario_id) => (dispatch) => {
  dispatch({
    type: CAMBIO_USUARIO_ID,
    payload: usuario_id,
  });
};

export const cambioTitulo = (titulo) => (dispatch) => {
  dispatch({
    type: CAMBIO_TITULO,
    payload: titulo,
  });
};

export const agregar = (nueva_tarea) => async (dispatch) => {
  dispatch({
    type: CARGANDO,
  });

  try {
    const respuesta = await axios.post(
      "https://jsonplaceholder.typicode.com/todos",
      nueva_tarea
    );

    dispatch({
      type: GUARDAR,
    });
  } catch (error) {
    console.log(error.message);

    dispatch({
      type: ERROR,
      payload: "Intente mas tarde",
    });
  }
};

export const editar = (tarea_editada) => async (dispatch) => {
  dispatch({
    type: CARGANDO,
  });

  try {
    const respuesta = await axios.put(
      `https://jsonplaceholder.typicode.com/todos/${tarea_editada.id}`,
      tarea_editada
    );

    dispatch({
      type: GUARDAR,
    });
  } catch (error) {
    console.log(error.message);

    dispatch({
      type: ERROR,
      payload: "Intente mas tarde",
    });
  }
};

export const cambioCheck = (usu_id, tar_id) => (dispatch, getState) => {
  const { tareas } = getState().tareasReducer;
  const seleccionada = tareas[usu_id][tar_id];

  const actualizadas = {
    ...tareas,
  };
  actualizadas[usu_id] = {
    ...tareas[usu_id],
  };
  actualizadas[usu_id][tar_id] = {
    ...tareas[usu_id][tar_id],
    completed: !seleccionada.completed,
  };

  dispatch({
    type: ACTUALIZAR,
    payload: actualizadas,
  });
};

export const eliminar = (tar_id) => async (dispatch) => {
  dispatch({
    type: CARGANDO,
  });

  try {
    const respuesta = await axios.delete(
      `https://jsonplaceholder.typicode.com/todos/${tar_id}`
    );

    dispatch({
      type: TRAER_TODAS,
      payload: {},
    });
  } catch (error) {
    console.log(error.message);

    dispatch({
      type: ERROR,
      payload: "Servicio no disponible",
    });
  }
};

export const limpiarForma = () => (dispatch) => {
  dispatch({
    type: LIMPIAR,
  });
};