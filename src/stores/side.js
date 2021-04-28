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
        pengajar: [
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
        ],
        siswa: [
            { 
                title: 'Video',
                icon: 'mdi-view-dashboard', 
                active: true,
                items: [
                    { 
                        title: 'Video List', 
                        path: '/videos',
                    },
                ]
            },  
        ],
    },

    getters: {
        getAdmin: state => state.admin,
        getPengajar: state => state.pengajar,
        getSiswa: state => state.siswa,
    },
};
