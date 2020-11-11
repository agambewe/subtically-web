const item = {
    name: '',
    username: '',
    email: '',
    role: '',
}

export default {
    namespaced: true,

    state: {
        item: Object.assign({}, item),
    },

    getters: {
        getAdmin: state => state.admin,
        getDosen: state => state.dosen,
        getSiswa: state => state.siswa,
    },
    mutations: {
        setItem(state, source) {
            state.item = source.data;
        }
    },
    actions: {
        async readData(context) {
            return new Promise((resolve) => {
                var uri = this.$apiUrl + '/user-profile'
                this.$http.get(uri).then(response => {
                    context.commit('setItem',response.data.user)
                    resolve(response.data);
                })
            });
        }
    }
};
