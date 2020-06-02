import axios from 'axios';

class AuthorDataService {
    retrieveAllAuthors() {
        return axios.get('http://epbyminw8106:8888/news/authors');
    }

    addAuthor(name, surname) {
        return axios.post('http://epbyminw8106:8888/news/authors', {
            name: name,
            surname: surname
        });
    }

    deleteAuthorById(id) {
        return axios.delete(`http://epbyminw8106:8888/news/authors/${id}`);
    }

    updateAuthor(id, name, surname) {
        return axios.put(`http://epbyminw8106:8888/news/authors/${id}`, {
            name: name,
            surname: surname
        });
    }
}

export default new AuthorDataService();