<template>
    <div class="container center flex">
        <div class="logo">
            <img src="http://www.laraphp.com/wp-content/uploads/2017/10/material-css-laraphp.png" />
        </div>
    </div>
</template>
<script>
export default{
    mounted(){
        this.$q.loadingBar.start()
        setTimeout(() => {
            this.$router.push({path : '/Home'})
            this.$q.loadingBar.stop()
        }, 2000)
    }
}
</script>
