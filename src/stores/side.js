export default {
    namespaced: true,

    state: {
        admin: [
            { 
                title: 'Video',
                icon: 'mdi-view-dashboard', 
                active: true,
                items: [
                    { 
                        title: 'Video List', 
                        path: '/videos',
                    }, 
                    { 
                        title: 'My Video', 
                        path: '/my-videos',
                    },
                ]
            },  
            {
                title: 'User',
                icon: 'mdi-account-group',
                items: [
                    { 
                        title: 'User List', 
                        path: '/users',
                    },
                ],
            },
        ],
        dosen: [
            {
            },
        ],
        siswa: [
            {
            },
        ],
    },

    getters: {
        getAdmin: state => state.admin,
        getDosen: state => state.dosen,
        getSiswa: state => state.siswa,
    },
};
