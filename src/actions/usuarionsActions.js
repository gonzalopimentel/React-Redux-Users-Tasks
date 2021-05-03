import axios from "axios";
import { CARGANDO, TRAER_TODOS, ERROR } from "../types/usuariosTypes";

export const traerTodos = () => async (dispatch) => {
  dispatch({
    type: CARGANDO,
  });

  try {
    const respuesta = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );

    // Action 1
    dispatch({
      type: TRAER_TODOS,
      payload: respuesta.data,
    });
  } catch (error) {
    console.log("Error: ", error.message);

    // Action 2
    dispatch({
      type: ERROR,
      payload: "Información de usuario no disponible",
    });
  }
};
