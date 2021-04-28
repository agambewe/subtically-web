<template>
<v-container dark>
    <v-container grid-list-md mb-0>
        <v-data-iterator :items="videos" :items-per-page.sync="itemsPerPage" :page="page" :search="search" :sort-by="sortBy.toLowerCase()" :sort-desc="sortDesc" hide-default-footer>
            <template v-slot:header>
                <v-toolbar color="#9DB7B0" class="mb-1">
                    <v-text-field v-model="search" clearable flat solo-inverted hide-details label="Search" prepend-inner-icon="mdi-magnify"></v-text-field>
                    <template v-if="$vuetify.breakpoint.mdAndUp">
                        <v-spacer></v-spacer>
                        <v-btn-toggle v-model="sortDesc" mandatory>
                            <v-btn large depressed color="#9DB7B0" :value="false">
                                <v-icon>mdi-arrow-up</v-icon>
                            </v-btn>
                            <v-btn large depressed color="#9DB7B0" :value="true">
                                <v-icon>mdi-arrow-down</v-icon>
                            </v-btn>
                        </v-btn-toggle>
                    </template>
                </v-toolbar>
            </template>

            <template v-slot:default="props">
                <v-row>
                    <v-col v-for="item in props.items" :key="item.id" cols="12" sm="12">
                        <!-- <v-card> -->
                        <router-link class="readMore" :to="{ name: 'viewController', params: { id: item.id } }">
                            <v-card color="white" class="cardView black--text">
                                <v-layout row wrap>
                                    <v-flex xs3>
                                        <v-img
                                            :src="$apiUrl+'/../uploads/images/'+item.thumbnail"
                                            height="225px"
                                            contain
                                        ></v-img>
                                    </v-flex>
                                    <v-flex xs9>
                                        <v-card-title primary-title>
                                                {{ item.title }}
                                            <v-card-text>
                                                <span class="grey--text">@{{item.detail_user.name}} - {{item.date_only}}</span>
                                                <div>{{ item.description }}</div>
                                            </v-card-text>
                                            <v-card-actions>
                                                <v-spacer></v-spacer>
                                                <v-btn text color="blue lighten-2">
                                                        <span>Read More</span>
                                                </v-btn>
                                            </v-card-actions>
                                        </v-card-title>
                                    </v-flex>
                                </v-layout>
                                <v-divider light></v-divider>
                            </v-card>
                        </router-link>
                    </v-col>
                </v-row>
            </template>

            <template v-slot:footer>
                <v-row class="mt-2" align="center" justify="center">
                    <v-spacer></v-spacer>
                    <span class="mr-4 grey--text">Page {{ page }} of {{ numberOfPages }}</span>
                    <v-btn fab color="primary" class="mr-1" @click="formerPage">
                    prev
                    </v-btn>
                    <v-btn fab color="primary" class="ml-1" @click="nextPage">
                    next
                    </v-btn>
                </v-row>
            </template>
        </v-data-iterator>
    </v-container>
</v-container>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Share+Tech+Mono");

table th+th {
    border-left: 1px solid #dddddd;
}

table td+td {
    border-left: 1px solid #dddddd;
}

tbody tr:nth-of-type(odd) {
    background-color: rgba(0, 0, 0, .05);
}

.readMore{
    text-decoration: none;
    color: inherit;
    font-size: 12px;
}

.cardView{
    margin: 5px;
}

.v-data-table
    /deep/
    tbody
    /deep/
    tr:hover:not(.v-data-table__expanded__content) {
        background: #8797a8 !important;
    }
    
.flex {
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
}

.black--text:hover{
    color: red;
}
</style>

<script>
export default {
    data() {
        return {
            load: false,
            videos: [],
            filter: {},
            sortDesc: true,
            page: 1,
            itemsPerPage: 3,
            sortBy: 'created_at',
            checkDelete: [],
            search: "",
            editedIndex: -1,
            selectedCard: -1
        }
    },
    computed: {
        numberOfPages() {
            return Math.ceil(this.videos.length / this.itemsPerPage)
        },
    },
    watch: {
    },
    methods: {
        nextPage() {
            if (this.page + 1 <= this.numberOfPages) this.page += 1
        },
        formerPage() {
            if (this.page - 1 >= 1) this.page -= 1
        },
        updateItemsPerPage(number) {
            this.itemsPerPage = number
        },
        readData() {
            var uri = this.$apiUrl + '/videos'
            this.$http.get(uri, {
                            headers: {
                                'Authorization': 'Bearer ' + localStorage.getItem('token')
                            }
                        }).then(response => {
                this.videos = response.data
                // this.typeHeader='Daftar Produk Tersedia'
            })
        },
    },
    mounted() {
        this.readData();
    },
}
</script>
