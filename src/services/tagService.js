import axios from 'axios';

class TagDataService {
    retrieveAllTags() {
        return axios.get('http://epbyminw8106:8888/news/tags');
    }

    addTag(name) {
        return axios.post('http://epbyminw8106:8888/news/tags', {
            name: name
        });
    }

    updateTag(id, name) {
        return axios.put(`http://epbyminw8106:8888/news/tags/${id}`, {
            name: name
        });
    }

    deleteTagById(id) {
        return axios.delete(`http://epbyminw8106:8888/news/tags/${id}`);
    }
}

export default new TagDataService();