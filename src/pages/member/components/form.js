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
            instance:''
        }
    },
    created() {
        let query = this.$route.query
        this.type = query.type  
        this.instance = query.instance
    },
}