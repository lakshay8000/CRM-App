import axios from "axios";

/*
axios.create() is a method provided by Axios, a popular JavaScript library for making 
HTTP requests. This method is used to create a customized instance of Axios with 
default configurations for a specific part of your application.
*/
export const axiosInstance = axios.create();   // this will create an axios instance object

// Set the default configurations in axios instance object
axiosInstance.defaults.baseURL = import.meta.env.VITE_BASE_URL;
axiosInstance.defaults.timeout = import.meta.env.VITE_API_TIMEOUT;

/*
We can set default configurations, such as a base URL, timeout, or default headers for 
all requests made with that instance. This eliminates the need to repeat these settings 
for each request.


// Now we can use axiosInstance for making requests with the configured settings-

axiosInstance.get('/endpoint')
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.error(error);
});


In summary, axios.create() allows you to create a customized Axios instance with 
default settings tailored to a specific part of your application, providing a cleaner 
and more modular approach to managing HTTP requests.
  
*/
