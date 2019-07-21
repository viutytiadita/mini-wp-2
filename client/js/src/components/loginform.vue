<template>
  <div class="content">
    <div class="row">
      <div class="col-sm-4 offset-sm-4">
        <!--login form-->
        <div id="loginForm" v-if="!isRegisForm">
          <form class="text-center border border-light p-5" @submit.prevent="login">
            <h1>
              <img src="https://img.icons8.com/ios/50/000000/medium-logo-filled.png" />
            </h1>
            <p class="h4 mb-4">Sign in</p>

            <input
              type="email"
              id="email"
              class="form-control mb-4"
              placeholder="E-mail"
              v-model="datauser.email"
            />

            <input
              type="password"
              id="password"
              class="form-control mb-4"
              placeholder="Password"
              v-model="datauser.password"
            />

            <button class="btn btn-info btn-block my-4" type="submit" id="login">Sign in</button>
            <p class="error" style="color:red;">{{ error.login }}</p>

            <p>or sign in with:</p>
            <!-- <div class="g-signin2 center" data-onsuccess="onSignIn"></div> -->
            <div id="google-signin-button"></div>
            <div class="pt-3">
              <a href="#" @click="isRegisForm=true">Don't have an account?</a>
            </div>
          </form>
        </div>
        <regisform id="regisform" v-if="isRegisForm" />
      </div>
    </div>
  </div>
</template>

<script>
import regisform from "./regisform";
const Toast = Swal.mixin({
  toast: true,
  position: "center",
  showConfirmButton: false,
  timer: 3000
});
let baseUrl = `http://localhost:3000`;

export default {
  components: {
    regisform
  },
  data() {
    return {
      isRegisForm: false,
      datauser: {
        username: "",
        email: "",
        password: ""
      },
      isLogin: false,
      error: {
        login: ""
      }
    };
  },
  mounted() {
    gapi.signin2.render("google-signin-button", {
      onsuccess: this.onSignIn
    });
  },
  methods: {
    onSignIn(googleUser) {
      //   const profile = user.getBasicProfile();
      var id_token = googleUser.getAuthResponse().id_token;
      console.log(id_token);

      axios({
        method: "POST",
        url: `${baseUrl}/users/tokensignin`,
        data: {
          id_token: id_token
        }
      })
        .then(({ data }) => {
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", data.user);
          localStorage.setItem("username", data.username);
          Toast.fire({
            type: "success",
            title: "Logged in successfully"
          });
          this.isLogin = true;
          this.$emit("login-type", true);
          this.error.login = "";
        })
        .catch(err => {
          console.log(err);
          this.error.login = `${err.response.data.message}`;
        });
    },
    login() {
      axios({
        method: "POST",
        url: `${baseUrl}/users/login`,
        data: {
          email: this.datauser.email,
          password: this.datauser.password
        }
      })
        .then(({ data }) => {
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", data.user);
          localStorage.setItem("username", data.username);
          Toast.fire({
            type: "success",
            title: "Logged in successfully"
          });
          this.isLogin = true;
          this.$emit("login-type", true);
          this.error.login = "";
        })
        .catch(err => {
          console.log(err);
          this.error.login = `${err.response.data.message}`;
        });
    }
  }
};

</script>

<style>
#loginForm {
  background-color: white;
}
#regisform {
  background-color: white;
}
</style>
