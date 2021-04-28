<template>
    <div class="ma-5 pa-15">
        <v-row class="d-flex justify-space-between mb-12">
            <img class="ml-5" src="/assets/uajy.png" height="55" width="250"/>
            <img src="/assets/title.png" height="45" width="180"/>
            <v-btn text id="login" class="mr-5" router to="/login">
            Login
            </v-btn>
        </v-row>
        <v-container fluid fill-height>
            <v-row class="mt-5 d-flex justify-center">
                <v-col>
                    <p id="welcome">
                        Selamat datang,
                    </p>
                    <p id="title">
                        Aplikasi yang memberikan teks ‘subtitle’ pada video Anda
                    </p>
                    <p id="content">
                        Aplikasi ini memberikan kemudahan bagi pengguna untuk memberikan ‘subtitle’ 
                        secara otomatis pada video. Aplikasi ini dikembangkan untuk mendukung proses pembuatan video 
                        pembelajaran, dan secara khusus untuk mendukung kualitas pembelajaran yang inklusif.
                    </p>
                    <v-btn id="contact" class="mt-5 p-5 grey darken-4">
                            Kontak kami: <a class="emailLink" href="mailto:admin@subtically.com">admin@subtically.com</a> 
                            <!-- <v-icon class="ml-2" size="15">mdi-arrow-right</v-icon> -->
                    </v-btn>
                        <p class="text-left" id="footer-text"><b>
                        Dikembangkan oleh Program Studi Sosiologi, Fakultas Ilmu Sosial dan Ilmu Politik bersama Kantor Pengembangan 
                        dan Peningkatan Mutu Akademik Universitas Atma Jaya Yogyakarta.
                        Didukung oleh Direktorat Pembelajaran dan Kemahasiswaan, Direktorat Jenderal Pendidikan Tinggi, 
                        Kementerian Pendidikan dan Kebudayaan.</b>
                        </p>
                </v-col>
                <v-col>
                    <img src="/assets/welcome.png" height="380" width="700"/>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
    export default {

    }
</script>

<style scoped>
    @import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@300;400;700;800;900&display=swap');
    
    html, body {
        margin: 0;
        padding: 0;
    }

    .v-btn {
        text-transform:none !important;
    }

    #login{
        font-family: Nunito Sans;
        font-style: normal;
        font-weight: normal;
        font-size: 18px;
        line-height: 25px;
        color: #000000;
    }

    #contact{
        color: #FAFAFA;
    }

    #contact .emailLink {
        text-decoration: none;
        color: #FAFAFA;
    }

    #welcome{
        font-family: Nunito Sans;
        font-style: normal;
        font-weight: 800;
        font-size: 16px;
        line-height: 25px;
        color: #9DB7B0;
    }

    #footer-text{
        font-size: 12px;
        position: fixed;
        width: 70%;
        bottom: 0%;
    }

    #title{
        font-family: Times New Roman;
        font-style: normal;
        font-weight: bold;
        font-size: 38px;
        line-height: 55px;
        display: flex;
        align-items: center;
        color: #000000;
    }

    #content{
        font-family: Nunito Sans;
        font-style: normal;
        font-weight: 300;
        font-size: 20px;
        line-height: 25px;
        display: flex;
        align-items: center;
        text-align: justify;
        color: rgba(0, 0, 0, 0.6);
    }
</style>