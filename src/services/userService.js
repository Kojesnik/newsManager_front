import axios from 'axios';

class UserDataService {
    checkUser(username, password) {
        console.log(axios.get(`http://epbyminw8106:8888/news/users/${username}/${password}`));
        return axios.get(`http://epbyminw8106:8888/news/users/${username}/${password}`);
    }
}

export default new UserDataService();