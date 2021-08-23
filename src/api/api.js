import axios from 'axios'
const token = localStorage.getItem("token");
    // console.log(token,"token")

export default axios.create({
  baseURL: `http://localhost:8080`,
 
    headers: {
      Authorization: token
    }
  

});