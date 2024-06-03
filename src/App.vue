<template>
  <div class="container">
    <MenuPage></MenuPage>
    <Indexpage></Indexpage>
  </div>
</template>

<script>
import MenuPage from "@/components/Menupage.vue";
import Indexpage from "@/components/Indexpage.vue";

export default {
  name: 'App',
  components: {
    Indexpage,
    MenuPage,
  }
}
</script>

<style>
</style>
