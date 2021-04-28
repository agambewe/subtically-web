<template>
    <v-container dark>
        <v-container grid-list-md mb-0>
            <h1 class="text-md-center" style="font-family: 'Share Tech Mono';text-shadow: -2px 4px 4px silver">Live Video</h1>
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
                        <v-row>
                            <v-col cols="12" sm="6" md="6">
                                <v-text-field v-model="form.title" label="Title"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="12" md="12">
                                    <v-textarea
                                    v-model="form.description"
                                    clearable
                                    counter
                                    label="Description"
                                    ></v-textarea>
                            </v-col>
                            <v-col cols="6" sm="6" md="6">
                                <!-- <v-file-input
                                    v-model="form.video"
                                    accept="video/*"
                                    label="File input"
                                ></v-file-input> -->
                                <v-autocomplete
                                    item-value="code"
                                    item-text="name"
                                    label="Camera"
                                    required
                                    hide-selected
                                    clearable>
                                </v-autocomplete>
                            </v-col>

                            <v-col cols="6" sm="6" md="6">
                                <v-autocomplete
                                    v-model="form.language"
                                    :items="languageList"
                                    item-value="code"
                                    item-text="name"
                                    label="Language"
                                    required
                                    hide-selected
                                    clearable>
                                </v-autocomplete>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="red accent-2" text @click="clear">Reset</v-btn>
                    <v-btn color="primary" text @click="liveHandler()">Live Now</v-btn>
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
    export default {
        data() {
            return {
                load: false,
                dialog: false,
                languageList : [
                    { code : 'ab', name : 'Abkhazian' },
                    { code : 'aa', name : 'Afar' },
                    { code : 'af', name : 'Afrikaans' },
                    { code : 'ak', name : 'Akan' },
                    { code : 'sq', name : 'Albanian' },
                    { code : 'am', name : 'Amharic' },
                    { code : 'ar', name : 'Arabic' },
                    { code : 'an', name : 'Aragonese' },
                    { code : 'hy', name : 'Armenian' },
                    { code : 'as', name : 'Assamese' },
                    { code : 'av', name : 'Avaric' },
                    { code : 'ae', name : 'Avestan' },
                    { code : 'ay', name : 'Aymara' },
                    { code : 'az', name : 'Azerbaijani' },
                    { code : 'bm', name : 'Bambara' },
                    { code : 'ba', name : 'Bashkir' },
                    { code : 'eu', name : 'Basque' },
                    { code : 'be', name : 'Belarusian' },
                    { code : 'bn', name : 'Bengali' },
                    { code : 'bh', name : 'Bihari languages' },
                    { code : 'bi', name : 'Bislama' },
                    { code : 'bs', name : 'Bosnian' },
                    { code : 'br', name : 'Breton' },
                    { code : 'bg', name : 'Bulgarian' },
                    { code : 'my', name : 'Burmese' },
                    { code : 'ca', name : 'Catalan, Valencian' },
                    { code : 'km', name : 'Central Khmer' },
                    { code : 'ch', name : 'Chamorro' },
                    { code : 'ce', name : 'Chechen' },
                    { code : 'ny', name : 'Chichewa, Chewa, Nyanja' },
                    { code : 'zh', name : 'Chinese' },
                    { code : 'cu', name : 'Church Slavonic, Old Bulgarian, Old Church Slavonic' },
                    { code : 'cv', name : 'Chuvash' },
                    { code : 'kw', name : 'Cornish' },
                    { code : 'co', name : 'Corsican' },
                    { code : 'cr', name : 'Cree' },
                    { code : 'hr', name : 'Croatian' },
                    { code : 'cs', name : 'Czech' },
                    { code : 'da', name : 'Danish' },
                    { code : 'dv', name : 'Divehi, Dhivehi, Maldivian' },
                    { code : 'nl', name : 'Dutch, Flemish' },
                    { code : 'dz', name : 'Dzongkha' },
                    { code : 'en', name : 'English' },
                    { code : 'eo', name : 'Esperanto' },
                    { code : 'et', name : 'Estonian' },
                    { code : 'ee', name : 'Ewe' },
                    { code : 'fo', name : 'Faroese' },
                    { code : 'fj', name : 'Fijian' },
                    { code : 'fi', name : 'Finnish' },
                    { code : 'fr', name : 'French' },
                    { code : 'ff', name : 'Fulah' },
                    { code : 'gd', name : 'Gaelic, Scottish Gaelic' },
                    { code : 'gl', name : 'Galician' },
                    { code : 'lg', name : 'Ganda' },
                    { code : 'ka', name : 'Georgian' },
                    { code : 'de', name : 'German' },
                    { code : 'ki', name : 'Gikuyu, Kikuyu' },
                    { code : 'el', name : 'Greek (Modern)' },
                    { code : 'kl', name : 'Greenlandic, Kalaallisut' },
                    { code : 'gn', name : 'Guarani' },
                    { code : 'gu', name : 'Gujarati' },
                    { code : 'ht', name : 'Haitian, Haitian Creole' },
                    { code : 'ha', name : 'Hausa' },
                    { code : 'he', name : 'Hebrew' },
                    { code : 'hz', name : 'Herero' },
                    { code : 'hi', name : 'Hindi' },
                    { code : 'ho', name : 'Hiri Motu' },
                    { code : 'hu', name : 'Hungarian' },
                    { code : 'is', name : 'Icelandic' },
                    { code : 'io', name : 'Ido' },
                    { code : 'ig', name : 'Igbo' },
                    { code : 'id', name : 'Indonesian' },
                    { code : 'ia', name : 'Interlingua (International Auxiliary Language Association)' },
                    { code : 'ie', name : 'Interlingue' },
                    { code : 'iu', name : 'Inuktitut' },
                    { code : 'ik', name : 'Inupiaq' },
                    { code : 'ga', name : 'Irish' },
                    { code : 'it', name : 'Italian' },
                    { code : 'ja', name : 'Japanese' },
                    { code : 'jv', name : 'Javanese' },
                    { code : 'kn', name : 'Kannada' },
                    { code : 'kr', name : 'Kanuri' },
                    { code : 'ks', name : 'Kashmiri' },
                    { code : 'kk', name : 'Kazakh' },
                    { code : 'rw', name : 'Kinyarwanda' },
                    { code : 'kv', name : 'Komi' },
                    { code : 'kg', name : 'Kongo' },
                    { code : 'ko', name : 'Korean' },
                    { code : 'kj', name : 'Kwanyama, Kuanyama' },
                    { code : 'ku', name : 'Kurdish' },
                    { code : 'ky', name : 'Kyrgyz' },
                    { code : 'lo', name : 'Lao' },
                    { code : 'la', name : 'Latin' },
                    { code : 'lv', name : 'Latvian' },
                    { code : 'lb', name : 'Letzeburgesch, Luxembourgish' },
                    { code : 'li', name : 'Limburgish, Limburgan, Limburger' },
                    { code : 'ln', name : 'Lingala' },
                    { code : 'lt', name : 'Lithuanian' },
                    { code : 'lu', name : 'Luba-Katanga' },
                    { code : 'mk', name : 'Macedonian' },
                    { code : 'mg', name : 'Malagasy' },
                    { code : 'ms', name : 'Malay' },
                    { code : 'ml', name : 'Malayalam' },
                    { code : 'mt', name : 'Maltese' },
                    { code : 'gv', name : 'Manx' },
                    { code : 'mi', name : 'Maori' },
                    { code : 'mr', name : 'Marathi' },
                    { code : 'mh', name : 'Marshallese' },
                    { code : 'ro', name : 'Moldovan, Moldavian, Romanian' },
                    { code : 'mn', name : 'Mongolian' },
                    { code : 'na', name : 'Nauru' },
                    { code : 'nv', name : 'Navajo, Navaho' },
                    { code : 'nd', name : 'Northern Ndebele' },
                    { code : 'ng', name : 'Ndonga' },
                    { code : 'ne', name : 'Nepali' },
                    { code : 'se', name : 'Northern Sami' },
                    { code : 'no', name : 'Norwegian' },
                    { code : 'nb', name : 'Norwegian Bokmål' },
                    { code : 'nn', name : 'Norwegian Nynorsk' },
                    { code : 'ii', name : 'Nuosu, Sichuan Yi' },
                    { code : 'oc', name : 'Occitan (post 1500)' },
                    { code : 'oj', name : 'Ojibwa' },
                    { code : 'or', name : 'Oriya' },
                    { code : 'om', name : 'Oromo' },
                    { code : 'os', name : 'Ossetian, Ossetic' },
                    { code : 'pi', name : 'Pali' },
                    { code : 'pa', name : 'Panjabi, Punjabi' },
                    { code : 'ps', name : 'Pashto, Pushto' },
                    { code : 'fa', name : 'Persian' },
                    { code : 'pl', name : 'Polish' },
                    { code : 'pt', name : 'Portuguese' },
                    { code : 'qu', name : 'Quechua' },
                    { code : 'rm', name : 'Romansh' },
                    { code : 'rn', name : 'Rundi' },
                    { code : 'ru', name : 'Russian' },
                    { code : 'sm', name : 'Samoan' },
                    { code : 'sg', name : 'Sango' },
                    { code : 'sa', name : 'Sanskrit' },
                    { code : 'sc', name : 'Sardinian' },
                    { code : 'sr', name : 'Serbian' },
                    { code : 'sn', name : 'Shona' },
                    { code : 'sd', name : 'Sindhi' },
                    { code : 'si', name : 'Sinhala, Sinhalese' },
                    { code : 'sk', name : 'Slovak' },
                    { code : 'sl', name : 'Slovenian' },
                    { code : 'so', name : 'Somali' },
                    { code : 'st', name : 'Sotho, Southern' },
                    { code : 'nr', name : 'South Ndebele' },
                    { code : 'es', name : 'Spanish, Castilian' },
                    { code : 'su', name : 'Sundanese' },
                    { code : 'sw', name : 'Swahili' },
                    { code : 'ss', name : 'Swati' },
                    { code : 'sv', name : 'Swedish' },
                    { code : 'tl', name : 'Tagalog' },
                    { code : 'ty', name : 'Tahitian' },
                    { code : 'tg', name : 'Tajik' },
                    { code : 'ta', name : 'Tamil' },
                    { code : 'tt', name : 'Tatar' },
                    { code : 'te', name : 'Telugu' },
                    { code : 'th', name : 'Thai' },
                    { code : 'bo', name : 'Tibetan' },
                    { code : 'ti', name : 'Tigrinya' },
                    { code : 'to', name : 'Tonga (Tonga Islands)' },
                    { code : 'ts', name : 'Tsonga' },
                    { code : 'tn', name : 'Tswana' },
                    { code : 'tr', name : 'Turkish' },
                    { code : 'tk', name : 'Turkmen' },
                    { code : 'tw', name : 'Twi' },
                    { code : 'ug', name : 'Uighur, Uyghur' },
                    { code : 'uk', name : 'Ukrainian' },
                    { code : 'ur', name : 'Urdu' },
                    { code : 'uz', name : 'Uzbek' },
                    { code : 've', name : 'Venda' },
                    { code : 'vi', name : 'Vietnamese' },
                    { code : 'vo', name : 'Volap_k' },
                    { code : 'wa', name : 'Walloon' },
                    { code : 'cy', name : 'Welsh' },
                    { code : 'fy', name : 'Western Frisian' },
                    { code : 'wo', name : 'Wolof' },
                    { code : 'xh', name : 'Xhosa' },
                    { code : 'yi', name : 'Yiddish' },
                    { code : 'yo', name : 'Yoruba' },
                    { code : 'za', name : 'Zhuang, Chuang' },
                    { code : 'zu', name : 'Zulu' }
                ],
                form: {
                    title: '',
                    description: '',
                    video: '',
                    language: '',
                },
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
            liveHandler() {
                this.video.append('title', this.form.title);
                this.video.append('video', "/uploads/videos/komputer_komunikasi.mp4");
                this.video.append('language', this.form.language);
                this.video.append('description', this.form.description);
                this.video.append('thumbnail', "ijemherbal.jpg");
                this.video.append('user_id', localStorage.getItem('user_id'));

                var uri = this.$apiUrl + '/live'
                this.load = true
                this.$http.post(uri, this.video, {
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
                        name: 'viewLiveController',
                        params: { id: response.data.id }
                    }),
                    this.load = false;
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
    }
</script>