<template>
    <div>
        <div id="regisForm">
              <form class="text-center border border-light p-5" @submit.prevent="register">
                <p class="h4 mb-4">Sign up</p>
                <input
                  type="email"
                  id="Email1"
                  class="form-control mb-4"
                  placeholder="E-mail"
                  v-model="datauser.email"
                >

                <input
                  type="password"
                  id="Password1"
                  class="form-control mb-4"
                  placeholder="Password"
                  v-model="datauser.password"
                  aria-describedby="defaultRegisterFormPasswordHelpBlock"
                >

                <input
                  type="text"
                  id="Username1"
                  class="form-control"
                  placeholder="Username"
                  v-model="datauser.username"
                >

                <button class="btn btn-info my-4 btn-block" type="submit" id="register">Sign Up</button>

                <hr>

                <div id="errorRegister">
                  <p class="error" style="color:red;">{{ error.register }}</p>
                </div>
                <p>
                  By clicking
                  <em>Sign up</em> you agree to our
                  <a href target="_blank">terms of service</a>
                </p>
              </form>
            </div>
    </div>
</template>

<script>
let baseUrl = `http://localhost:3000`;
// let baseUrl ="http://34.66.117.208"

const Toast = Swal.mixin({
  toast: true,
  position: "center",
  showConfirmButton: false,
  timer: 3000
});

export default {
data() {
    return {
      datauser: {
        username: "",
        email: "",
        password: ""
      },
      isRegis: false,
      error: {
        register: ""
      }
    };
},
methods: {
    register() {
      axios({
        method: "POST",
        url: `${baseUrl}/users/register`,
        data: {
          username: this.datauser.username,
          email: this.datauser.email,
          password: this.datauser.password
        }
      })
        .then(({ data }) => {
          Toast.fire({
            type: "success",
            title: "register successfully, please login ^^"
          });
          console.log(data, "regis");
        })
        .catch(err => {
          console.log(err);
          this.error.register = `${err.response.data.message}`;
        });
    }
}
}
</script>

<style>

</style>
