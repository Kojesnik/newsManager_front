import axios from 'axios';

class NewsDataService {
    retrieveAllNews(pageNumber, pageSize) {
        return axios.get(`http://epbyminw8106:8888/news/news?sort=date&pageNumber=${pageNumber}&pageSize=${pageSize}`);
    }

    retrieveNewsCount() {
        return axios.get('http://epbyminw8106:8888/news/news/count');
    }

    retrieveCriteriaNewsCount(author, tags) {
        let url;
        if (tags.length === 0 && author === '') {
            url = `http://epbyminw8106:8888/news/news/criteriaCount`;
        } else {
            url = `http://epbyminw8106:8888/news/news/criteriaCount?`;
            if (author != '') {
                let name = author.split(' ')[0];
                let surname = author.split(' ')[1];
                url = url.concat('name=' + name);
                url = url.concat('&');
                url = url.concat('surname=' + surname);
            }
            if (tags.length != 0) {
                if (author != 'undefined') {
                    url = url.concat('&');
                }
                url = url.concat('tagNames=');
                if (tags.length === 1) {
                    url = url.concat(tags[0]);
                } else {
                    for (let i = 0; i < tags.length; i++) {
                        url = url.concat(tags[i]);
                        if (i != (tags.length - 1)) {
                            url = url.concat(',');
                        }
                    }
                }
            }
        }
        return axios.get(url);
    }

    retrieveAllNewsByCriteria(author, tags, pageNumber, pageSize) {
        let url;
        if (tags.length === 0 && author === '') {
            url = `http://epbyminw8106:8888/news/news?pageNumber=${pageNumber}&pageSize=${pageSize}&sort=date`;
        } else {
            url = `http://epbyminw8106:8888/news/news?sort=date&`;
            if (author != '') {
                console.log("here");
                let name = author.split(' ')[0];
                let surname = author.split(' ')[1];
                url = url.concat('name=' + name);
                url = url.concat('&');
                url = url.concat('surname=' + surname);
            }
            if (tags.length != 0) {
                if (author != 'undefined') {
                    url = url.concat('&');
                }
                url = url.concat('tagNames=');
                if (tags.length === 1) {
                    url = url.concat(tags[0]);
                } else {
                    for (let i = 0; i < tags.length; i++) {
                        url = url.concat(tags[i]);
                        if (i != (tags.length - 1)) {
                            url = url.concat(',');
                        }
                    }
                }
            }
            url = url.concat(`&pageNumber=${pageNumber}&pageSize=${pageSize}`)
        }
        console.log(url);
        return axios.get(url);
    }

    retrieveNewsById(id) {
        return axios.get(`http://epbyminw8106:8888/news/news/${id}`);
    }

    createNews(title, shorttext, fulltext, author, tags) {
        let data = [];
        let isValid;
        let finalResp;
        let resp = axios.post('http://epbyminw8106:8888/news/news', {
                title: title,
                shortText: shorttext,
                fullText: fulltext,
                author: author,
                tags: tags
            }).catch(function (error) {
                if (error.response) {
                  error.response.data.errors.map(err => {data.push(err)});
                  isValid = false;
                }    
            });
        if (isValid) {
            finalResp = {data: resp, error: false};
        } else {
            finalResp = {data: data, error: true};
        }
        return finalResp;
    }

    updateNews(title, shorttext, fulltext, author, tags, id) {
        return axios.put(`http://epbyminw8106:8888/news/news/${id}`, {
            title: title,
            shortText: shorttext,
            fullText: fulltext,
            author: author,
            tags: tags
        });
    }

    deleteNewsById(id) {
        return axios.delete(`http://epbyminw8106:8888/news/news/${id}`);
    }
}

export default new NewsDataService();
