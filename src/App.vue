<template>
<v-app class="full-height">
    <main class="full-height">
        <router-view></router-view>
    </main>
</v-app>
</template>

<script>
export default {
    name: 'app'
}
</script>

<style>
html, body {
    height: 100vh;
}

.full-height {
    height: 100vh;
}
</style>