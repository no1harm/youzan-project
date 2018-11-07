import url from 'js/api.js'
import axios from 'axios'
import { resolve } from 'dns';
import { rejects } from 'assert';

function fetch(url, data) {
    return new Promise((resolve, reject) => {
        axios.post(url, data).then(res => {
            let status = res.data.status
            if (status === 200) {
                resolve(res)
            }
            if (status === 300) {
                location.href = 'login.html'
            }
        }).catch(err => {
            reject(err)
        })
    })
}
export default fetch