<template>
    <v-container dark>
        <v-container grid-list-md mb-0>
            <h1 class="text-md-center" style="font-family: 'Share Tech Mono';text-shadow: -2px 4px 4px silver">Watch Video</h1>
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
                        <!-- <vue-plyr :options="options">
                    <video
                        controls
                        crossorigin
                        playsinline
                        data-poster="http://127.0.0.1:8000/uploads/images/april.jpg"
                    >
                        <source
                            size="720"
                            src="http://127.0.0.1:8000/uploads/videos/april.mp4"
                            type="video/mp4"
                        />
                        <track
                            default
                            kind="captions"
                            label="Indonesian captions"
                            src="http://127.0.0.1:8000/uploads/videos/april.vtt"
                            srclang="id"
                        />
                        <a
                            download=""
                            href="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-1080p.mp4"
                        >
                            Download
                        </a>
                    </video>
                </vue-plyr> -->
                        <vue-plyr v-if="detail.urlvid" ref="plyr" style="width: 100%; height: 100%">
                            <video playsinline :crossorigin="true" :src="detail.urlvid" type="video/mp4">
                                <track
                                kind="captions"
                                label="Indonesian captions"
                                :src="subUrl.src"
                                srclang="id"
                                default= true
                                />
                            </video>
                        </vue-plyr>
                        <v-row no-gutters>
                            <v-col>
                                <v-col class="pa-1" tile >
                                </v-col>
                            </v-col>
                            <!-- <v-col md="auto">
                                <v-col class="pa-2" >
                                    <v-select
                                    :items="subUrl"
                                    v-model="select"
                                    single-line
                                    item-text="report"
                                    item-value="ext"
                                    v-on:change="changeExt"
                                    label="Download Sub"
                                    dense
                                    outlined
                                    ></v-select>
                                </v-col>
                            </v-col> -->
                            <v-col lg="2">
                                <v-col class="pa-2">
                                    <!-- <v-btn @click="downloadFile(select.ext)">Download Vid</v-btn> -->
                                    <v-btn @click="downloadFile()">Download Vid</v-btn>
                                </v-col>
                            </v-col>
                        </v-row>
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
                role: '',
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
                // options: 'debug',
                options: { quality: { default: '720p' } },
                videoUrl: { src: '', format: 'mp4' 
                },
                // select: { report: 'subtitle.srt', ext: 'srt' },
                subUrl: {
                    label: "Subtitle",
                    src: "",
                    srclang: "id"
                },
            }
        },
        computed: {
        },
        methods: {
            readData() {
                var uri = this.$apiUrl + '/videos/'+this.$route.params.id
                this.$http.get(uri, {
                        headers: {
                            'Authorization': 'Bearer ' + localStorage.getItem('token')
                        }
                    }).then(response => {
                    var item = response.data[0]
                    this.dialogDetail = true
                    this.detail.subname = item.subname;
                    this.detail.urlvid = this.$baseUrl+item.video
                    this.videoUrl.src = this.$baseUrl+item.video
                    this.detail.urlsub = this.$baseUrl+"/uploads/subtitles/"+item.subname
                    this.subUrl.src = this.$baseUrl+"/uploads/subtitles/"+item.subname+".vtt"
                    this.detail.title = item.title
                    this.detail.name = item.detail_user.name
                    this.detail.date_only = item.date_only
                    this.detail.description = item.description
                })
            },
            setRole() {
                this.role = localStorage.getItem('role');
            },
            downloadFile(){
                this.downloadSub();
                // this.downloadSub(ext);
                this.downloadVid();
            },
            downloadSub(){
                    this.$http({
                            // url: this.detail.urlsub+"."+ext,
                            url: this.detail.urlsub+".srt",
                            method: 'GET',
                            responseType: 'blob',
                        }).then((response) => {
                            var fileURL = window.URL.createObjectURL(new Blob([response.data]));
                            var fileLink = document.createElement('a');

                            fileLink.href = fileURL;
                            // var fileName = this.detail.subname+"."+ext;
                            var fileName = this.detail.subname+".srt";
                            fileLink.setAttribute('download', fileName);
                            document.body.appendChild(fileLink);

                            fileLink.click();
                        });
            },
            downloadVid(){
                    this.$http({
                            url: this.detail.urlvid,
                            method: 'GET',
                            responseType: 'blob',
                        }).then((response) => {
                            var fileURL = window.URL.createObjectURL(new Blob([response.data]));
                            var fileLink = document.createElement('a');

                            fileLink.href = fileURL;
                            var fileName = this.detail.subname+ '.mp4';
                            fileLink.setAttribute('download', fileName);
                            document.body.appendChild(fileLink);

                            fileLink.click();
                        });
            },
            // getVideo(){
            //     this.videoUrl = this.$apiUrl+"/../uploads/demo_subtically.mp4";
            // },
            // changeExt(ext){
            //     var wow = ".srt"+ext
            //     this.subExt = this.$apiUrl+"/../uploads/demo_subtically"+wow;
            // },
            // getSubtitle(){
            //     var uri = this.$apiUrl +"/../uploads/demo_subtically.vtt"
            //     this.$http.get(uri, {
            //             headers: {
            //                 'Authorization': 'Bearer ' + localStorage.getItem('token')
            //             }
            //         }).then(
            //         this.subUrl = uri
            //     )
            // }
        },
        mounted() {
            this.setRole();
            this.readData();
            // this.getVideo();
        },
    }
</script>