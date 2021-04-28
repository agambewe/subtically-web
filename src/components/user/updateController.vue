<template>
    <v-container dark>
        <v-container grid-list-md mb-0>
            <h1 class="text-md-center" style="font-family: 'Share Tech Mono';text-shadow: -2px 4px 4px silver">Update User</h1>
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
                                        <v-text-field disabled v-model="form.username" label="Username"></v-text-field>
                                    </v-col>
                                    <v-col cols="4" sm="6" md="12">
                                        <ValidationProvider v-slot="{ errors }" name="Email" rules="required|email">  
                                            <v-text-field v-model="form.email" label="Email" :error-messages="errors"></v-text-field>
                                        </ValidationProvider>
                                    </v-col>
                                    <v-col cols="4" sm="6" md="12">
                                        <v-radio-group
                                        v-model="form.role"
                                        row
                                        disabled
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
                                    </v-col>
                                    <v-col cols="4" sm="6" md="12">
                                        <v-checkbox
                                            v-model="checkbox"
                                            hide-details
                                        ></v-checkbox> Change Password?</v-col>
                                    <v-col v-if="checkbox" cols="4" sm="6" md="12">
                                            <ValidationProvider v-slot="{ errors }" name="Password" rules="required|min:6">
                                                <v-text-field v-model="form.oldpassword" type="password" label="Old Password" :error-messages="errors"></v-text-field>
                                            </ValidationProvider>
                                            <ValidationProvider v-slot="{ errors }" vid="passwordRef" name="Password" rules="required|min:6">
                                                <v-text-field v-model="form.password" type="password" label="Password" :error-messages="errors"></v-text-field>
                                            </ValidationProvider>
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
                checkbox: false,
                load: false,
                dialog: false,
                form: {
                    name: '',
                    username: '',
                    email: '',
                    role: '',
                    password_old: '',
                    password: '',
                    password_confirmation: '',
                },
                errors: '',
                user: new FormData,
            }
        },
        methods: {
            clear() {
                this.readData();
            },
            readData() {
                var uri = this.$apiUrl + '/users/'+this.$route.params.id
                this.$http.get(uri).then(response => {
                    var item = response.data
                    this.form.name = item.name
                    this.form.email = item.email
                    this.form.username = item.username
                    this.form.role = item.role
                })
            },
            async checkForm() {
                const isValid = await this.$refs.observer.validate();
                if(isValid){
                    this.updateData()
                }
            },
            updateData() {
                this.user.append('name', this.form.name);
                this.user.append('email', this.form.email);
                if(this.checkbox){
                    this.user.append('password_old', this.form.password_old);
                    this.user.append('password', this.form.password);
                    this.user.append('password_confirmation', this.form.password_confirmation);
                }

                var uri = this.$apiUrl + '/users/'+this.$route.params.id
                this.load = true
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
                    this.load = false;
                    this.$router.push({
                        name: 'listUser'
                    })
                }).catch(error => {
                    this.$swal({
                        icon: 'error',
                        title: 'Warning !',
                        text: error.response.data.message,
                        showConfirmButton: false,
                        timer: 1500
                    })
                    this.load = false;
                })
            },
        },
        mounted() {
            this.readData();
        },
    }
</script>