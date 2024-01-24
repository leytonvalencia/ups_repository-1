import axios from 'axios';

const headers = {
    "Content-Type": "multipart/form-data"
}

const API_URI = 'https://ups-net.onrender.com';

export const getSignedUrl = async (data) => {
    try {
        const response = await axios.get(`${API_URI}/uploadFiles`);
        return response.data;
    } catch (error) {
        console.log('Error while calling the API ', error.message);
        return error.response.data;
    }
}

export const uploadFile = async (url, file) => {
    try {
      // Crear un FormData y agregar el archivo con el tipo de contenido
      const formData = new FormData();
      formData.append('file', file, file.name);
  
      // Hacer la solicitud con el FormData en lugar del archivo directo
      const response = await axios.put(url, formData);
  
      return response.data;
    } catch (error) {
      console.log('Error while calling the API ', error.message);
      return error.response.data;
    }
  };