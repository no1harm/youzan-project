import axios from 'axios'

function fetch(method='get',url, data) {
    return new Promise((resolve, reject) => {
        axios({method, url, data}).then(res => {
            let status = res.data.status
            if (status === 200) {
                resolve(res)
            }
            if (status === 300) {
                location.href = 'login.html'
                resolve(res)
            }
        }).catch(err => {
            reject(err)
        })
    })
}
export default fetch