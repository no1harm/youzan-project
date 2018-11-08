import url from 'js/api.js'
import fetch from './fetch.js'

class Address {
    static list(){
        return fetch('get',url.addressLists)
    }
    static add(data){
        return fetch('post',url.addressAdd,data)
    }
    static remove(id){
        return fetch('post',url.addressRemove,id)
    }
    static upddate(data){
        return fetch('post',url.addressUpdate,data)
    }
    static setDefault(id){
        return fetch('post',url.addressSetDefault,id)
    }
}

export default Address