<template>
    <v-container dark>
        <v-container grid-list-md mb-0>
            <h1 class="text-md-center" style="font-family: 'Share Tech Mono';text-shadow: -2px 4px 4px silver">Users List</h1>
            <v-layout row wrap style="margin:10px">
                <v-dialog v-model="dialog" persistent max-width="500px">
                    <template v-slot:activator="{ on }">
                        <v-flex class="flex" xs8 style="float:right;widht:300">
                            <v-btn class="mx-2" color="primary" v-on="on" router to="/users/store">
                                New User
                            </v-btn>
                        </v-flex>
                        <v-divider class="mx-1" inset vertical></v-divider>
                        <v-flex xs4 >
                            <v-text-field v-model="keyword" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
                        </v-flex>
                    </template>
                </v-dialog>
                <v-dialog v-model="dialogDetail" max-width="524px">
                    <v-card>
                        <v-card-title>
                            <span class="headline text-md-center">Detail Data {{ this.detail.username }}</span>
                        </v-card-title>
                        <v-card-text>
                            <v-container>
                                <tbody>
                                    <ul>
                                        <ul># <strong>Created at : </strong>{{ this.detail.created_at }}</ul>
                                        <ul># <strong>Updated at : </strong>{{ this.detail.updated_at?this.detail.updated_at:'-' }}</ul>
                                        <!-- <ul># <strong>Deleted at : </strong>{{ this.detail.deleted_at?this.detail.deleted_at:'-' }}</ul> -->
                                    </ul>
                                </tbody>
                            </v-container>
                        </v-card-text>
                        <v-card-actions>
                            <v-btn class="text-md-right" color="primary" text @click="dialogDetail = false">Close</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-layout>
            <v-data-table :headers="headers" :items-per-page="5" :items="users" :sort-by="'updated_at'" :sort-desc="true" :search="keyword" :loading="load" no-data-text="Data kosong" light>
                <template v-slot:body="{ items }">
                    <tbody v-if="items.length!=0">
                        <tr v-for="item in items" :key="item.id">
                            <td>{{ item.name }}</td>
                            <td>{{ item.username }}</td>
                            <td>{{ item.email }}</td>
                            <td v-if="item.role=='1'"> Admin </td>
                            <td v-if="item.role=='2'"> Pengajar </td>
                            <td v-if="item.role=='3'"> Siswa </td>
                            <td >
                                <div class="text-center">
                                    <v-btn icon color="blue lighten-2" @click="readDetail(item)">
                                        <v-icon>mdi-arrow-down</v-icon>
                                    </v-btn>    
                                    <v-btn v-if="role!='OWNER'" icon color="amber accent-3">
                                        <router-link class="routerLink" :to="{ name: 'updateUser', params: { id: item.id } }">
                                            <v-icon>mdi-pencil</v-icon>
                                        </router-link>
                                    </v-btn>
                                    <v-btn v-if="role!='OWNER'" icon color="red accent-2" @click="deleteData(item.id)">
                                        <v-icon>mdi-delete-empty</v-icon>
                                    </v-btn>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                    <tbody v-else>
                        <td :colspan="headers.length" class="text-center">Empty Data</td>
                    </tbody>
                </template>
            </v-data-table>
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
    
    .routerLink{
        text-decoration: none;
        color: inherit;
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
                        text: 'Name',
                        value: 'name'
                    },
                    {
                        text: 'Username',
                        value: 'username'
                    },
                    {
                        text: 'Email',
                        value: 'email'
                    },
                    {
                        text: 'Role',
                        value: 'role'
                    },
                    {
                        text: 'Action',
                        value: null,
                        sortable: false,
                        align: 'center',
                        width: 150
                    },
                ],
                users: [],
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
                this.detail.created_at = item.created_at
                this.detail.updated_at = item.updated_at
            },
            readData() {
                var uri = this.$apiUrl + '/users'
                this.$http.get(uri, {
                            headers: {
                                'Authorization': 'Bearer ' + localStorage.getItem('token')
                            }
                        }).then(response => {
                    this.users = response.data
                })
            },
            deleteData(deleteId) {
                var uri = this.$apiUrl + '/users/' + deleteId;
                this.$swal({
                    title: 'Warning!',
                    text: 'Are you sure?',
                    icon: 'warning',
                    cancelButtonColor: '#FF5252',
                    confirmButtonColor: '#BDBDBD',
                    cancelButtonText: 'Yes!',
                    confirmButtonText: 'No',
                    showCancelButton: true,
                    allowEscapeKey: false,
                    // reverseButtons: true,
                    allowOutsideClick: false,
                    dangerMode: true,
                }).then((result) => {
                    if (!result.value) {
                        this.load = true
                        this.$http.delete(uri, {
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
                        this.readData();
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
                    }
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
            // this.setRole();
        },
    }
</script>