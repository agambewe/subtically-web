<template>
    <v-container dark>
        <vue-progress-bar></vue-progress-bar>
        <v-container grid-list-md mb-0>
            <h1 class="text-md-center" style="font-family: 'Share Tech Mono';text-shadow: -2px 4px 4px silver">Update Video</h1>
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
                                    <v-col cols="12" sm="12" md="12">
                                        <v-checkbox
                                            v-model="cekVideo"
                                            label="Change video?"
                                            color="primary"
                                            hide-details
                                        ></v-checkbox>
                                    </v-col>
                                
                                    <v-col v-if="cekVideo" cols="5" sm="6" md="6">
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
                                    <v-col v-else cols="12" sm="12" md="12">
                                        <v-text-field label="File input" :value="form.video" disabled></v-text-field>
                                    </v-col>

                                    <v-col v-if="cekVideo" cols="6" sm="6" md="6">
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
                    <v-btn color="primary" text @click="checkForm()">Save</v-btn>
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
                cekVideo: false,
                typeInput: 'Update',
                languageList : [
                    { code : 'en-EN', name : 'English' },
                    { code : 'id-ID', name : 'Indonesian' },
                ],
                form: {
                    title: '',
                    description: '',
                    video: [],
                    language: '',
                },
                updatedId: '',
                errors: '',
                video: new FormData,
            }
        },
        methods: {
            clear() {
                this.readData();
            },
            readData() {
                var uri = this.$apiUrl + '/videos/'+this.$route.params.id
                this.$http.get(uri).then(response => {
                    var item = response.data[0]
                    this.form.title = item.title
                    this.form.video = item.video.split('\\').pop().split('/').pop()
                    // console.log(this.form.video)
                    this.form.language = item.language
                    this.form.description = item.description
                })
            },
            async checkForm() {
                const isValid = await this.$refs.observer.validate();
                if(isValid){
                    this.updateData()
                }
            },
            async updateData() {
                this.video.append('title', this.form.title);
                if(this.cekVideo){
                    this.video.append('video', "/uploads/videos/"+this.form.video.name);
                    this.video.append('thumbnail', this.form.video.name.split('.')[0]+".jpg");
                    this.video.append('file', this.form.video);
                }
                else{
                    this.video.append('video', this.form.video);
                }
                this.video.append('language', this.form.language);
                this.video.append('description', this.form.description);

                // this.$Progress.start();
                var uri = this.$apiUrl + '/videos/'+this.$route.params.id
                this.$swal({
                        icon: 'info',
                        title: 'Processing..',
                        showConfirmButton: false,
                        allowOutsideClick: false,
                    })
                let yolo = await this.$http.post(uri, this.video, {
                        headers: {
                            'Authorization': 'Bearer ' + localStorage.getItem('token')
                        }
                    }).then(response => {
                    console.log(yolo)
                    this.$swal({
                        icon: 'success',
                        title: response.data.message,
                        showConfirmButton: false,
                        timer: 1500
                    })
                    this.readData(); //refresh data ini
                    // this.$Progress.finish();
                    this.$router.push({
                        name: 'myVideo'
                    })
                }).catch(error => {
                    this.errors = error
                    this.$swal({
                        icon: 'error',
                        title: 'Warning !',
                        text: this.errors,
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