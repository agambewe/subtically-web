<template>
    <v-container dark>
        <vue-progress-bar></vue-progress-bar>
        <v-container grid-list-md mb-0>
            <h1 class="text-md-center" style="font-family: 'Share Tech Mono';text-shadow: -2px 4px 4px silver">Add Video</h1>
            <v-layout row wrap style="margin:10px">
                <v-dialog v-model="dialog" persistent max-width="500px">
                    <template v-slot:activator="{ on }">
                        <v-flex class="flex" xs8 style="float:right;widht:300">
                            <v-btn class="mx-2" fab color="primary" v-on="on" router to="/my-videos">
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
                                    <v-col cols="12" sm="6" md="6">
                                        <ValidationProvider v-slot="{ errors }" name='Title' rules="required">
                                            <v-text-field 
                                                v-model="form.title" 
                                                label="Title" 
                                                :error-messages="errors"
                                            />
                                        </ValidationProvider>
                                    </v-col>
                                    <v-col cols="12" sm="12" md="12">
                                            <ValidationProvider v-slot="{ errors }" name="Description" rules="required">
                                                <v-textarea
                                                v-model="form.description"
                                                :error-messages="errors"
                                                clearable
                                                counter
                                                label="Description"
                                                required
                                                ></v-textarea>
                                            </ValidationProvider>
                                    </v-col>
                                    <v-col cols="6" sm="6" md="6">
                                        <ValidationProvider v-slot="{ errors }" name="Video" rules="required">  
                                            <v-file-input
                                                v-model="form.video"
                                                :error-messages="errors"
                                                accept="video/*"
                                                label="File input"
                                                required
                                            ></v-file-input>
                                        </ValidationProvider>
                                    </v-col>

                                    <v-col cols="6" sm="6" md="6">
                                        <ValidationProvider v-slot="{ errors }" name="Language" rules="required">
                                            <v-autocomplete
                                                v-model="form.language"
                                                :items="languageList"
                                                :error-messages="errors"
                                                item-value="code"
                                                item-text="name"
                                                label="Language"
                                                hint="Select the language that you use in the video"
                                                persistent-hint
                                                required
                                                hide-selected
                                                clearable>
                                            </v-autocomplete>
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
    import { required } from 'vee-validate/dist/rules'
    import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'
    setInteractionMode('eager')

    extend('required', {
        ...required,
        message: '{_field_} is required.'
    })
    export default {
        components: {
            ValidationProvider,
            ValidationObserver,
        },
        data() {
            return {
                load: false,
                dialog: false,
                languageList : [
                    { code : 'en-US', name : 'English (United States)' },
                    { code : 'en-GB', name : 'English (United Kingdom)' },
                    { code : 'id-ID', name : 'Indonesian' }
                ],
                form: {
                    title: '',
                    description: '',
                    video: [],
                    language: '',
                },
                errors: '',
                video: new FormData,
            }
        },
        methods: {
            clear() {
                this.form = {
                    title : '',
                    description : '',
                    video : '',
                    language : ''
                }
            },
            async checkForm() {
                const isValid = await this.$refs.observer.validate();
                if(isValid){
                    this.storeData()
                }
            },
            async storeData() {
                this.video.append('title', this.form.title);
                this.video.append('video', "/uploads/videos/"+this.form.video.name);
                this.video.append('language', this.form.language);
                this.video.append('description', this.form.description);
                this.video.append('thumbnail', this.form.video.name.split('.')[0]+".jpg");
                this.video.append('user_id', localStorage.getItem('user_id'));
                this.video.append('file', this.form.video);

                var uri = this.$apiUrl + '/videos'
                // this.$Progress.start()
                this.$swal({
                        icon: 'info',
                        title: 'Processing..',
                        showConfirmButton: false,
                        allowOutsideClick: false,
                        didOpen: function () {
                            this.$swal.showLoading()
                        }
                    })
                const postReq = await this.$http.post(uri, this.video, {
                        headers: {
                            'Authorization': 'Bearer ' + localStorage.getItem('token')
                        }
                    }).then(response => {
                    console.log(postReq)
                    this.$swal({
                        icon: 'success',
                        title: response.data.message,
                        showConfirmButton: false,
                        timer: 1500
                    })
                    // this.$Progress.finish()
                    this.$router.push({
                        name: 'listVideo'
                    })
                }).catch(error => {
                    this.errors = error
                    this.$Progress.fail()
                    this.$swal({
                        icon: 'error',
                        title: 'Warning !',
                        text: this.errors,
                        showConfirmButton: false,
                        timer: 1500
                    })
                    // this.load = false;
                })
            },
        },
    }
</script>