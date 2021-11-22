app.component('add-car', {

    template:
    `<h4>Hi 
        <input v-model="newNickname" type="text" placeholder="New Nickname" @keyup.enter="addNickname">
    </h4>`,

    methods: {
        addNickname: function(){
            this.newNickname
        }
    }


})