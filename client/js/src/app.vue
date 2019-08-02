<template>
  <div id="app">
    <div>
      <navigation />
    </div>
    <div>
      <!-- <footer class="page-footer font-small blue "> --> -->
        <!-- <div class="footer-copyright text-center py-3 vuefooter">
          © {{new Date().getFullYear()}} Copyright:
          <b>Viuty Tiadita</b>
        </div> -->
       <!-- </footer> -->
    </div>
  </div>
</template>


<script>
import navigation from "./components/nav";

export default {
  name: "app",
  components: {
    navigation
  }
};
</script>

<style>
.vuefooter{
    background-color: #49ecb3;
    margin-top: 5rem;
    position: fixed;
}
</style>
