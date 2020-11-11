<template>
    <div class="beg full-height">
        <v-container>
            <v-layout md4>
                    <!-- <img src="../assets/logo.png" id="gambar"> -->
                    <v-card class="pl-6 pr-6 pb-1">
                        <v-card-title primary-title>
                            <h4 id="titel">Login</h4>
                        </v-card-title>
                        <!-- <ValidationObserver ref="observer" v-slot="{ validate, reset }"> -->
                        <ValidationObserver ref="observer" v-slot="{  }">
                            <v-form class="my-6">
                                <ValidationProvider v-slot="{ errors }" name="username" rules="required|max:50">
                                    <v-text-field v-model="username" prepend-icon="mdi-human" :counter="50" :error-messages="errors" label="Username" required></v-text-field>
                                </ValidationProvider>
                                <ValidationProvider v-slot="{ errors }" name="password" rules="required|">
                                    <v-text-field v-model="password" type="password" prepend-icon="mdi-key" :error-messages="errors" label="password" required @keyup.enter="submit(); load =true"></v-text-field>
                                </ValidationProvider>
                                <v-card-actions>
                                    <v-btn @click="submit">Login</v-btn>
                                    <v-btn @click="clear">clear</v-btn>
                                </v-card-actions>
                            </v-form>
                        </ValidationObserver>
                    </v-card>
            </v-layout>
        </v-container>
    </div>
</template>

<style scoped>
    @import url("https://fonts.googleapis.com/css?family=Amatic+SC");
    @import url("https://fonts.googleapis.com/css?family=Aclonica");
    /* html, body {
        height: 100%;
    } */
    .beg {
        background-color: #9DB7B0;
    } 
    v-btn{
        background-color: #9DB7B0;
    } 
    #titel {
        opacity: 0.8;
        font-family: 'Aclonica'
    }
</style> scoped>

<script>
import {
    required,
    // email,
    max
} from 'vee-validate/dist/rules'
import {
    extend,
    ValidationObserver,
    ValidationProvider,
    setInteractionMode
} from 'vee-validate'

setInteractionMode('eager')

extend('required', {
    ...required,
    message: '{_field_} tidak boleh kosong',
})

extend('max', {
    ...max,
    message: '{_field_} tidak boleh lebih dari {length} karakter',
})

export default {
    components: {
        ValidationProvider,
        ValidationObserver,
    },
    data: () => ({
        username: '',
        password: '',
        load: false,
    }),

    methods: {
        async submit() {
            localStorage.setItem('user_id', 1);
            localStorage.setItem('role', 'ADMIN');
            this.$router.push({
                name: 'listVideo'
            })
            // const isValid = await this.$refs.observer.validate();
            //     if(isValid){
            //         this.load = true
            //         this.$http.post(this.$apiUrl + '/login', {
            //             username: this.username,
            //             password: this.password
            //         }).then(response => {
            //             if(response.data.status==='failed'){
            //                 this.$swal({
            //                     icon: 'error',
            //                     title: response.data.message,
            //                     showConfirmButton: false,
            //                     timer: 1500
            //                 })
            //                 this.load = false;
            //             }else{
            //                 localStorage.setItem('username', response.data.user);
            //                 localStorage.setItem('role', response.data.role);
            //                 this.$swal({
            //                     icon: 'success',
            //                     title: response.data.message,
            //                     showConfirmButton: false,
            //                     timer: 1500
            //                 })
            //                 this.load = false;
            //                 this.clear();
            //                 var role = localStorage.getItem('role')
            //                 if(role=='OWNER'){
            //                     this.$router.push({
            //                     name: 'PegawaiController'
            //                     })
            //                 }else if(role=='CS'){
            //                     this.$router.push({
            //                     name: 'TlayananControllerCS'
            //                     })
            //                 }else{
            //                     this.$router.push({
            //                     name: 'TlayananControllerKASIR'
            //                     })
            //                 }
            //             }
            //         }).catch(error => {
            //             console.log(error)
            //             this.load = false
            //         })
            //     }
        },
        clear() {
            this.username = ''
            this.password = ''
            this.$refs.observer.reset()
        },
    },
}
</script>
