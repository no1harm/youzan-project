import Foot from 'components/Foot.vue'
let mixin = {
    filters:{
        number(price){
            return price = price.toFixed(2)
        }
    },
    components:{
        Foot,
    },
}

export default mixin