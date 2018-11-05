import Foot from 'components/Foot.vue'
import Swipe from 'components/Swipe.vue'
let mixin = {
    filters:{
        number(price){
            return price = price.toFixed(2)
        }
    },
    components:{
        Foot,
        Swipe
    },
}

export default mixin