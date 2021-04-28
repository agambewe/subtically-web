<template>
    <v-container dark>
        <v-container grid-list-md mb-0>
            <h1 class="text-md-center" style="font-family: 'Share Tech Mono';text-shadow: -2px 4px 4px silver">Watch Live Video</h1>
            <v-layout row wrap style="margin:10px">
                <v-dialog v-model="dialog" persistent max-width="500px">
                    <template v-slot:activator="{ on }">
                        <v-flex class="flex" xs8 style="float:right;widht:300">
                            <v-btn class="mx-2" fab color="primary" v-on="on" router to="/videos">
                                Back
                            </v-btn>
                        </v-flex>
                    </template>
                </v-dialog>
            </v-layout>
            <v-card max-width="1000">
                <v-card-text>
                    <v-container>
                        <vue-plyr ref="plyr" style="width: 100%; height: 100%">
                            <video playsinline crossorigin :src="detail.urlvid" type="video/mp4">
                                <track
                                kind="captions"
                                label="Indonesian captions"
                                :src="detail.urlsub+'.vtt'"
                                srclang="id"
                                default= true,
                                />
                            </video>
                        </vue-plyr>
                        <v-card-title primary-title>
                                <v-col>
                                    {{ detail.title }}
                                </v-col>
                            <v-card-text>
                                <span class="grey--text">@{{detail.name}} - {{detail.date_only}}</span>
                                <div>{{ detail.description }}</div>
                            </v-card-text>
                        </v-card-title>
                    </v-container>
                </v-card-text>
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
                dialogDetail: false,
                typeInput: 'Tambah',
                role: '',
                keyword: '',
                headers: [
                    {
                        text: 'Title',
                        value: 'title'
                    },
                    {
                        text: 'Created at',
                        value: 'created_at'
                    },
                    {
                        text: 'Action',
                        value: null,
                        sortable: false,
                        align: 'center',
                        width: 150
                    },
                ],
                detail: {
                    name: '',
                    title: '',
                    date_only: '',
                    dibuat: '',
                    description: '',
                    urlvid: '',
                    urlsub: '',
                    subname: '',
                },
                updatedId: '',
                errors: '',
                menu2: false,
                options: 'debug',
                videoUrl: '',
                // subUrl: ['demo_subtically.vtt','demo_subtically.srt','demo_subtically.txt'],
                subExt: '',
                select: { report: 'subtitle.srt', ext: 'srt' },
                subUrl: [
                    // { report: 'subtitle.vtt', ext: '.vtt' },
                    { report: 'subtitle.srt', ext: 'srt' },
                    // { report: 'subtitle.txt', ext: '.txt' }
                ]
            }
        },
        computed: {
            formTitle() {
                return this.typeInput
            },
        },
        methods: {
            close() {
                this.dialog = false
                this.typeInput = 'Tambah';
            },
            clear() {
                this.resetForm();
            },
            readData() {
                var uri = this.$apiUrl + '/live/'+this.$route.params.id
                this.$http.get(uri).then(response => {
                    var item = response.data[0]
                    this.dialogDetail = true
                    this.detail.subname = item.subname;
                    this.detail.urlvid = this.$baseUrl+item.video
                    this.detail.urlsub = this.$baseUrl+"/uploads/subtitles/"+item.subname
                    this.detail.title = item.title
                    this.detail.name = item.detail_user.name
                    this.detail.date_only = item.date_only
                    this.detail.description = item.description
                })
            },
            setRole() {
                this.role = localStorage.getItem('role');
            },
            getVideo(){
                this.videoUrl = this.$apiUrl+"/../uploads/demo_subtically.mp4";
            },
            changeExt(ext){
                var wow = ".srt"+ext
                this.subExt = this.$apiUrl+"/../uploads/demo_subtically"+wow;
            },
            getSubtitle(){
                this.subUrl = this.$apiUrl+"/../uploads/demo_subtically.vtt";
            }
        },
        mounted() {
            this.setRole();
            this.readData();
            this.getVideo();
        },
    }
</script>