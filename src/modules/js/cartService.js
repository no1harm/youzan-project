import url from 'js/api.js'
import fetch from './fetch.js'

class Cart {
    static add(id){
        return fetch('post',url.cartAdd,{
            id,
            number:1
        })
    }
    static reduce(id){
        return fetch('post',url.cartReduce,{
            id,
            number:1
        })
    }
    static remove(id){
        return fetch('post',url.cartRemove,{id})
    }
}

export default Cart