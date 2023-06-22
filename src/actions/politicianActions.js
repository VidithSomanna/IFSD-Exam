import axios from 'axios';

export const CREATE_POLITICIAN = 'CREATE_POLITICIAN';
export const UPDATE_POLITICIAN = 'UPDATE_POLITICIAN';
export const DELETE_POLITICIAN = 'DELETE_POLITICIAN';
export const READ_POLITICIAN = 'READ_POLITICIAN';

export const createPolitician = (politicianData) => {
  return async (dispatch) => {
    try {
      const response = await axios.post('your-api-endpoint', politicianData);
      const newPolitician = response.data;

      dispatch({
        type: CREATE_POLITICIAN,
        payload: newPolitician,
      });
    } catch (error) {
      // Handle error
    }
  };
};

export const updatePolitician = (politicianData) => {
  return async (dispatch) => {
    try {
      await axios.put('your-api-endpoint', politicianData);

      dispatch({
        type: UPDATE_POLITICIAN,
        payload: politicianData,
      });
    } catch (error) {
      // Handle error
    }
  };
};

export const deletePolitician = () => {
  return async (dispatch) => {
    try {
      await axios.delete('your-api-endpoint');

      dispatch({
        type: DELETE_POLITICIAN,
      });
    } catch (error) {
      // Handle error
    }
  };
};

export const readPolitician = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get('your-api-endpoint');
      const politicianData = response.data;

      dispatch({
        type: READ_POLITICIAN,
        payload: politicianData,
      });
    } catch (error) {
      // Handle error
    }
  };
};
