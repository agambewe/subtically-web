<template>
    <v-container dark>
        <vue-progress-bar></vue-progress-bar>
        <v-container grid-list-md mb-0>
            <h1 class="text-md-center" style="font-family: 'Share Tech Mono';text-shadow: -2px 4px 4px silver">Add User</h1>
            <v-layout row wrap style="margin:10px">
                <v-dialog v-model="dialog" persistent max-width="500px">
                    <template v-slot:activator="{ on }">
                        <v-flex class="flex" xs8 style="float:right;widht:300">
                            <v-btn class="mx-2" fab color="primary" v-on="on" router to="/users">
                                Back
                            </v-btn>
                        </v-flex>
                    </template>
                    
                </v-dialog>
            </v-layout>
            <v-card>
                <v-card-title>
                    <span class="headline">{{ formTitle }}</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <ValidationObserver ref="observer" v-slot="{  }">
                            <v-form>
                                <v-row>
                                    <v-col cols="4" sm="6" md="12">
                                        <ValidationProvider v-slot="{ errors }" name='Name' rules="required">
                                            <v-text-field v-model="form.name" label="Name" :error-messages="errors"
                                            />
                                        </ValidationProvider>
                                    </v-col>
                                    <v-col cols="4" sm="6" md="12">
                                        <ValidationProvider v-slot="{ errors }" name="Username" rules="required">
                                            <v-text-field v-model="form.username" label="Username" :error-messages="errors"></v-text-field>
                                        </ValidationProvider>
                                    </v-col>
                                    <v-col cols="4" sm="6" md="12">
                                        <ValidationProvider v-slot="{ errors }" name="Email" rules="required|email">  
                                            <v-text-field v-model="form.email" label="Email" :error-messages="errors"></v-text-field>
                                        </ValidationProvider>
                                    </v-col>
                                    <v-col cols="4" sm="6" md="12">
                                        <ValidationProvider v-slot="{ errors }" name="Role" rules="required">
                                            <v-radio-group
                                            v-model="form.role"
                                            :error-messages="errors"
                                            row
                                            >
                                                <v-radio
                                                    label="Admin"
                                                    value=1
                                                ></v-radio>
                                                <v-radio
                                                    label="Pengajar"
                                                    value=2
                                                ></v-radio>
                                                <v-radio
                                                    label="Siswa"
                                                    value=3
                                                ></v-radio>
                                            </v-radio-group>
                                        </ValidationProvider>
                                    </v-col>
                                    <v-col cols="4" sm="6" md="12">
                                        <ValidationProvider v-slot="{ errors }" vid="passwordRef" name="Password" rules="required|min:6">
                                            <v-text-field v-model="form.password" type="password" label="Password" :error-messages="errors"></v-text-field>
                                        </ValidationProvider>
                                    </v-col>
                                    <v-col cols="4" sm="6" md="12">
                                        <ValidationProvider v-slot="{ errors }" name="Retype Password" rules="required|confirmed:passwordRef">
                                            <v-text-field v-model="form.password_confirmation" type="password" label="Retype Password" :error-messages="errors"></v-text-field>
                                        </ValidationProvider>
                                    </v-col>
                                </v-row>
                            </v-form>
                        </ValidationObserver>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="red accent-2" text @click="clear">Reset</v-btn>
                    <v-btn color="primary" text @click="checkForm()">Submit</v-btn>
                </v-card-actions>
            </v-card>
        </v-container>
    </v-container>
</template>

<style scoped>
    @import url("https://fonts.googleapis.com/css?family=Share+Tech+Mono");

    table th + th { border-left:1px solid #dddddd; }
    table td + td { border-left:1px solid #dddddd; }
    tbody tr:nth-of-type(odd) {
        background-color: rgba(0, 0, 0, .05);
    }
    
    .v-data-table
    /deep/
    tbody
    /deep/
    tr:hover:not(.v-data-table__expanded__content) {
        background: #8797a8 !important;
    }

    .v-select__selections {
        max-width: 150px;
        min-width: 100px;
        border: none;
    }

    .flex {
        display: -webkit-box;
        display: -moz-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
    }
</style>

<script>
    import { required, confirmed, email, min} from 'vee-validate/dist/rules'
    import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'
    setInteractionMode('eager')

    extend('required', {
        ...required,
        message: '{_field_} is required.'
    });
    extend('email', email);
    extend('confirmed', confirmed);
    extend('min', {
        ...min,
        message: 'Too few {_field_}.'
    })
    export default {
        components: {
            ValidationProvider,
            ValidationObserver,
        },
        data() {
            return {
                load: false,
                dialog: '',
                typeInput: 'Add',
                role: '',
                form: {
                    name: '',
                    username: '',
                    email: '',
                    role: '',
                    password: '',
                    password_confirmation: '',
                },
                errors: '',
                user: new FormData,
            }
        },
        computed: {
            formTitle() {
                return this.typeInput
            },
        },
        methods: {
            clear() {
                this.form = {
                    name: '',
                    username: '',
                    email: '',
                    role: '',
                    password: '',
                    password_confirmation: '',
                }
            },
            async checkForm() {
                const isValid = await this.$refs.observer.validate();
                if(isValid){
                    this.storeData()
                }
            },
            storeData() {
                this.user.append('name', this.form.name);
                this.user.append('username', this.form.username);
                this.user.append('email', this.form.email);
                this.user.append('role', this.form.role);
                this.user.append('password', this.form.password);
                this.user.append('password_confirmation', this.form.password_confirmation);

                var uri = this.$apiUrl + '/register'
                this.$Progress.start()
                this.$http.post(uri, this.user, {
                        headers: {
                            'Authorization': 'Bearer ' + localStorage.getItem('token')
                        }
                    }).then(response => {
                    this.$swal({
                        icon: 'success',
                        title: response.data.message,
                        showConfirmButton: false,
                        timer: 1500
                    })
                    this.$router.push({
                        name: 'listUser'
                    })
                    this.$Progress.finish()
                }).catch(error => {
                    this.errors = error
                    console.log(this.errors)
                    this.$Progress.fail()
                    this.$swal({
                        icon: 'error',
                        title: 'Warning !',
                        text: this.errors,
                        showConfirmButton: false,
                        timer: 1500
                    })
                })
            },
        },
        mounted() {
        },
    }
</script>