export default {
    data(){
        return {
            name:'',
            tel:'',
            provinceValue:-1,
            cityValue:-1,
            districtValue:-1,
            address:'',
            id:'',
            type:'',
            instance:'',
            addressData:require('js/address.json'),
            cityList:null,
            districList:null
        }
    },
    created() {
        let query = this.$route.query
        this.type = query.type  
        this.instance = query.instance
    },
    methods:{
        add(){
            
        }
    },
    watch:{
        provinceValue(val){
            if(val===-1) return
            let list = this.addressData.list
            let index = list.findIndex(item=>{
                return item.value === val
            })
            this.cityList = list[index].children
            this.cityValue = -1
            this.districtValue = -1
        },
        cityValue(val){
            if(val===-1) return
            let list = this.cityList
            let index = list.findIndex(item=>{
                return item.value === val
            })
            this.districList = list[index].children
            this.districtValue = -1
        }
    }
}