<template>
    <main>
        <v-container fluid fill-height class="position">
            <v-layout flex align-center justify-center>
                <v-flex xs12 sm3 elevation-6>
                    <!-- <img src="../assets/logo.png" id="gambar"> -->
                    <v-card align="center" class="beg pl-6 pr-6 pb-1">
                        <v-card-title class="justify-center">
                            <h5 id="welcome" class="mt-5">Welcome,</h5>
                        </v-card-title>
                        <v-card-text>
                            <img src="/assets/title.png" height="50" width="170"/>
                        </v-card-text>
                        <!-- <ValidationObserver ref="observer" v-slot="{ validate, reset }"> -->
                        <ValidationObserver ref="observer" v-slot="{  }">
                            <v-form class="my-6">
                                <!-- <ValidationProvider v-slot="{ errors }" name="username" rules="required|max:50"> -->
                                <ValidationProvider v-slot="{ errors }" name="username" rules="required">
                                    <v-text-field v-model="username" prepend-icon="mdi-human" :counter="50" :error-messages="errors" label="Username" required></v-text-field>
                                </ValidationProvider>
                                <ValidationProvider v-slot="{ errors }" name="password" rules="required|">
                                    <v-text-field v-model="password" type="password" prepend-icon="mdi-key" :error-messages="errors" label="Password" required @keyup.enter="submit(); load =true"></v-text-field>
                                </ValidationProvider>
                                <v-card-actions class="justify-center">
                                        <v-btn id="btn" color="primary secondary--text" @click="submit">Login</v-btn>
                                </v-card-actions>
                            </v-form>
                        </ValidationObserver>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </main>
</template>

<style scoped>
    @import url("https://fonts.googleapis.com/css?family=Amatic+SC");
    @import url("https://fonts.googleapis.com/css?family=Aclonica");
    /* html, body {
        height: 100%;
    } */
    .beg {
        background-color: #F5F5F5;
    } 

    #btn {
        width: 70%;
    }

    #welcome {
        opacity: 0.6;
        font-family: 'Aclonica'
    }

    .position {
        position: absolute;
        top: 20px;
        left: 0px;
        right: 0px;
    }
</style>

<script>
import {
    required
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
    message: '{_field_} required',
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
            const isValid = await this.$refs.observer.validate();
                if(isValid){
                    this.$http.post(this.$apiUrl + '/login', {
                        username: this.username,
                        password: this.password
                    }).then(response => {
                        const role = response.data.user.role;
                            if(role==1){
                                localStorage.setItem('role', "ADMIN");
                            }else if(role==2){
                                localStorage.setItem('role', "PENGAJAR");
                            }else{
                                localStorage.setItem('role', "SISWA");
                            }
                            localStorage.setItem('user_id', response.data.user.id);
                            localStorage.setItem('token', response.data.access_token);
                            this.$swal({
                                icon: 'success',
                                title: response.data.message,
                                showConfirmButton: false,
                                timer: 1500
                            })
                            this.$router.push({
                                name: 'listVideo'
                            })
                            this.clear();
                    }).catch(error => {
                        this.$swal({
                                icon: 'error',
                                title: error.response.data.errors,
                                showConfirmButton: false,
                                timer: 1500
                            })
                        this.load = false
                    })
                }
        }
    },
}
</script>
