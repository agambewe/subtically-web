<template> 
    <div class="sideBar"> 
        <v-navigation-drawer
        v-model="drawer"
        :expand-on-hover="expandOnHover"
        :mini-variant="miniVariant"
        color="#F5F5F5"
        height="150%"
        absolute
        >
        <!-- :src="bg" -->
            <v-list-item> 
                <v-list-item-content> 
                    <v-list-item-title class="title"> Subtically </v-list-item-title> 
                    <v-list-item-subtitle> .. </v-list-item-subtitle> 
                </v-list-item-content> 
            </v-list-item> 
            <v-divider></v-divider> 
            <v-list shaped> 
                <v-list-group
                    v-for="sub in items"
                    :key="sub.title"
                    v-model="sub.active"
                    :prepend-icon="sub.icon"
                    no-action
                >
                <template v-slot:activator>
                    <v-list-item-content>
                        <v-list-item-title v-text="sub.title"></v-list-item-title>
                    </v-list-item-content>
                </template>
                
                    <v-list-item 
                        v-for="item in sub.items"
                        :key="item.title" link 
                        @click="item.path"
                    >
                        <v-list-item-content> 
                            <router-link :to="item.path" tag="ul" exact>
                                <v-list-item-title v-text="item.title"></v-list-item-title>
                            </router-link>
                        </v-list-item-content> 
                    </v-list-item> 
                </v-list-group>
            </v-list>
        </v-navigation-drawer>
        <v-dialog v-model="dialog" persistent max-width="528px">
            <v-card>
                <v-card-title>
                    <span class="headline text-md-center">User Info</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <tbody>
                            <ul>
                                <ul># <strong>Nama : </strong>{{ this.userData.name }}</ul>
                                <ul># <strong>Username : </strong>{{ this.userData.username }}</ul>
                                <ul># <strong>Email : </strong>{{ this.userData.alamat }}</ul>
                                <ul># <strong>Role : </strong>{{ this.userData.tanggal_lahir }}</ul>
                            </ul>
                        </tbody>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-btn class="text-md-right" color="blue accent-2" text @click="dialog = false">Tutup</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-app-bar app fixed height="75px" color="#F5F5F5"> 
            <!-- :src="bg" -->
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon> 
            <v-toolbar-title style="font-family: 'Jolly Lodger';font-size: 45px;" > Subtically </v-toolbar-title>
            <VSpacer /> 
            <v-toolbar-items>
                <v-btn text router @click="dialog = true"><v-icon>mdi-face</v-icon></v-btn>
                <v-btn text router @click="submitLogout()"><v-icon>mdi-power</v-icon></v-btn>
            </v-toolbar-items>
        </v-app-bar> 
        <VContent > 
            <router-view /> 
        </VContent> 
    </div> 
</template> 

<style scoped>
    @import url("https://fonts.googleapis.com/css?family=Jolly%20Lodger");

    .sideBar {
        color:black;
    }
</style>

<script>
import { mapGetters, mapActions } from "vuex";
export default { 
    data () { 
        return {
            dialog: false,
            drawer: true,
            expandOnHover: true,
            miniVariant: true,
            username: '',
            role: '',
            items: [],
            userData: [],
            allNotifications: [],
            unreadNotifications: [],
        } 
    }, 
    created() {
    },
    mounted () {
        this.setUsername();
        this.setRole();
        this.cekRole();

    },
    methods: {
        setRole() {
            this.role = localStorage.getItem('role');
        },
        setUsername() {
            this.username = localStorage.getItem('user_id');
        },
        cekRole(){
            var role = this.role;
            if(role == 'ADMIN'){
                this.items = this.admin;
            }else if(role == 'DOSEN'){
                this.items = this.dosen;
            }else if(role == 'SISWA'){
                this.items = this.siswa;
            }
        },
        submitLogout() {
            localStorage.removeItem('user_id');
            localStorage.removeItem('role');
            this.username = '';
            this.role = '';
            this.$router.push({
                    name: 'login'
                })
        },
        initUser(){
            this.userData = this.user;
        },
        ...mapActions({
            user: "user/readData",
        }),
    },
    computed: {
    ...mapGetters({
        admin: "side/getAdmin",
        dosen : "side/getDosen",
        siswa : "side/getSiswa"
    }),
},
} 
</script>