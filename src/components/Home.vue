<template>
    <div class="flex grad center grow">
        <div class="flex grow part">
            <div class="flex column grow">
                <input type="text" placeholder="Name" v-model="currUser.name"/>
                <input type="text" placeholder="College" v-model="currUser.college"/>
                <input type="text" placeholder="Email" v-model="currUser.email"/>
                <input type="text" placeholder="Contact" v-model="currUser.contact"/>
            </div>
            <div class="flex">
                <input type="submit" value="Submit" @click="addUser"/>
            </div>
        </div>
        <div class="flex column grow part">
            <q-list style="background: white;color:#333;">
                <q-item v-for="(user , index) in users" :key="index">
                    <q-item-side>
                        <img src="https://image.flaticon.com/icons/png/512/272/272075.png" class="user-image"/>
                    </q-item-side>
                    <q-item-main>
                        <div class="flex column">
                            <span class="title">{{user.name}}</span>
                            <span class="subtitle">{{user.college}}</span>
                        </div>
                    </q-item-main>
                    <q-item-side>
                        <q-btn icon="navigate_next" flat round color="black" @click="showUserView(user, index)"/>
                    </q-item-side>
                </q-item>
            </q-list>
        </div>
        <q-modal ref="userModal">
            <div class="flex column umodal">
                <div class="buttons flex">
                    <q-btn icon="save" round flat small @click="save" v-show="!edit"/>
                    <q-btn icon="edit" round flat small @click="edit = false"/>
                    <q-btn icon="close" round flat small @click="$refs.userModal.hide()"/>
                </div>
                <div class="alias flex center">
                    <img src="https://image.flaticon.com/icons/png/512/272/272075.png" class="selectedImage" />
                </div>
                <div class="info flex column center">
                    <q-input v-model="selectedUser.name" :disable="edit" />
                    <q-input v-model="selectedUser.email" :disable="edit" />
                    <q-input v-model="selectedUser.college" :disable="edit" />
                    <q-input v-model="selectedUser.contact" :disable="edit"/>
                </div>
            </div>
        </q-modal>
    </div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
    name: 'Home',
    computed:{
        ...mapGetters({
            users: 'users'
        })
    },
    data(){
        return{
            currUser: {
                name:'',
                email:'',
                college:'',
                contact:''
            },
            selectedUser: {},
            edit: true,
            index: null
        }
    },
    methods: {
        addUser(){
            if(this.currUser.name.length && this.currUser.email.length && this.currUser.college.length && this.currUser.contact.length){
                let email = this.currUser.email
                let contact = this.currUser.contact
                var emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                var noRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
                if(this.checkPattern(email, emailReg) && this.checkPattern(contact, noRegex)){
                    this.$store.commit('addUser', this.currUser)
                    this.$q.notify({
                        message: 'User added successfully!',
                        timeout: 2500,
                        type:'positive'
                    })
                }
            }
        },
        checkPattern(val, regex){
            if(regex.test(val)){
                return true
            }
            else{
                this.$q.notify({
                    message: 'Value pattern mismatch!',
                    timeout: 2500,
                    type: 'negative'
                })
                return false
            }
        },
        showUserView(user , index){
            this.selectedUser = user
            this.index = index
            this.$refs.userModal.show()
        },
        save(){
            this.users.splice(this.index, 1)
            this.users.splice(this.index, 0, this.selectedUser)
            this.$store.commit('updateUserdata', this.users)
            this.$refs.userModal.hide()
        }
    }
}
</script>