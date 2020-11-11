<template>
    <v-container dark>
        <v-container grid-list-md mb-0>
            <h1 class="text-md-center" style="font-family: 'Share Tech Mono';text-shadow: -2px 4px 4px silver">Add User</h1>
            <v-layout row wrap style="margin:10px">
                <v-dialog v-model="dialog" persistent max-width="500px">
                    <template v-slot:activator="{ on }">
                        <v-flex class="flex" xs8 style="float:right;widht:300">
                            <v-btn class="mx-2" fab color="blue lighten-1" v-on="on" router to="/users">
                                Back
                            </v-btn>
                        </v-flex>
                        <v-divider class="mx-1" inset vertical></v-divider>
                        <v-flex xs4 >
                            <v-text-field v-model="keyword" append-icon="mdi-magnify" label="Cari" single-line hide-details></v-text-field>
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
                        <v-row>
                            <v-col cols="4" sm="6" md="12">
                                <v-text-field v-model="form.name" label="Name"></v-text-field>
                            </v-col>
                            <v-col cols="4" sm="6" md="12">
                                <v-text-field v-model="form.username" label="Username"></v-text-field>
                            </v-col>
                            <v-col cols="4" sm="6" md="12">
                                <v-text-field v-model="form.email" label="Email"></v-text-field>
                            </v-col>
                            <v-col cols="4" sm="6" md="12">
                                <v-radio-group
                                v-model="form.role"
                                row
                                >
                                <v-radio
                                    label="Admin"
                                    value=1
                                ></v-radio>
                                <v-radio
                                    label="Dosen"
                                    value=2
                                ></v-radio>
                                <v-radio
                                    label="Siswa"
                                    value=3
                                ></v-radio>
                                </v-radio-group>
                            </v-col>
                            <v-col cols="4" sm="6" md="12">
                                <v-text-field v-model="form.password" label="Password"></v-text-field>
                            </v-col>
                            <v-col cols="4" sm="6" md="12">
                                <v-text-field v-model="form.repassword" label="Retype Password"></v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue accent-2" text @click="close">Reset</v-btn>
                    <v-btn color="green lighten-1" text @click="setForm()">Submit</v-btn>
                </v-card-actions>
            </v-card>
        </v-container>
    </v-container>
</template>

<style>
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
                typeInput: 'Add',
                role: '',
                keyword: '',
                video: [],
                jenisHewan: [],
                customer: [],
                form: {
                    id_jenis: '',
                    id_customer: '',
                    name: '',
                    tanggal_lahir: '',
                    created_by: '',
                    updated_by: '',
                    delete_by: '',
                },
                detail: {
                    name: '',
                    diubah: '',
                    diubaholeh: '',
                    dibuat: '',
                    dibuatoleh: '',
                },
                updatedId: '',
                errors: '',
                user: new FormData,
                menu2: false,
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
            readDetail(item) {
                this.dialogDetail = true
                this.detail.name = item.name
                this.detail.dibuat = item.created_at
                this.detail.dibuatoleh = item.created_by
                this.detail.diubah = item.updated_at
                this.detail.diubaholeh = item.updated_by
            },
            readData() {
                var uri = this.$apiUrl + '/videos'
                this.$http.get(uri).then(response => {
                    this.video = response.data
                })
            },
            setForm() {
                if (this.typeInput === 'Tambah') {
                    this.createData()
                } else {
                    this.updateData()
                }
            },
            setRole() {
                this.role = localStorage.getItem('role');
            },
        },
        mounted() {
            this.readData();
            this.setRole();
        },
    }
</script>