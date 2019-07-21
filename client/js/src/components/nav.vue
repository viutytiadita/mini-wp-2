<template>
  <div>
    <div class="header">
      <nav class="navbar navbar-expand-lg navbar-body fixed-top">
        <!-- Navbar brand -->
        <a class="navbar-brand js-scroll-trigger logo" href="#" @click.prevent="isMyPost=false; isLoginForm=false" >
          <img
            src="https://img.icons8.com/ios/50/000000/medium-logo-filled.png"
            
          />MiniWordpress
        </a>
        <!-- Collapsible content -->
        <div class="collapse navbar-collapse" id="basicExampleNav">
          <!-- Links -->
          <ul class="navbar-nav col-lg-11">
            <!-- <li class="nav-item">
          <a class="nav-link" href="#">Logout</a>
            </li>-->

            <!-- Dropdown -->
            <li class="nav-item dropdown" v-if="isLogin">
              <a
                class="nav-link dropdown-toggle"
                id="navbarDropdownMenuLink"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >{{name}}</a>
              <div class="dropdown-menu dropdown-primary" aria-labelledby="navbarDropdownMenuLink">
                <a class="dropdown-item" href="#" @click="isMyPost = true">My Dashboard</a>
                <a class="dropdown-item" href="#" @click="logout">Logout</a>
              </div>
            </li>
          </ul>
          <!-- Links -->
          <div class="md-form my-0 pr-3" v-if="!isLogin">
            
            <div @click="isLoginForm=true; isMyPost=false">
              <b>Sign In</b>
            </div>
          </div>
          <!-- Collapsible content -->
        </div>
      </nav>

      <home v-if="!isMyPost && !isLoginForm"/>
    </div>
    <div v-if="isMyPost && isLogin">
    <myArticle />
    </div>
  
    <loginform v-if="isLoginForm" @login-type="checkLogin" />

  </div>
  <!--/header-->
</template>

<script>
import loginform from "./loginform";
import home from "./home";
import myArticle from "./myArticles";

export default {
  components: {
    loginform,
    home,
    myArticle
  },
  data() {
    return {
      isLoginForm: false,
      isLogin: false,
      isMyPost: false,
    };
  },
  computed: {
    name() {
      return localStorage.getItem("username");
    }
  },
  created() {
    if (localStorage.token) {
      this.isLogin = true;
    } else {
      this.isLogin = false;
    }
  },
  methods: {
    checkLogin(payload) {
      this.isLogin = payload;
      this.isLoginForm = false;
    },
    logout() {
      Swal.fire({
        title: "Gotta go?",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes !"
      }).then(result => {
        if (result.value) {
          console.log("signout");
          // var auth2 = gapi.auth2.getAuthInstance();
          localStorage.clear();
          // auth2.signOut().then(function() {
          //   console.log("User signed out.");
          // });
          this.isLogin = false;
          this.isMyPost = false;
          Swal.mixin({
            title: "Logged out successfully",
            toast: true,
            position: "center",
            showConfirmButton: false,
            timer: 3000
          });
        }
      });
    }
  }
};
</script>
<style>
body {
  background-color: rgb(59, 58, 58);
}

.navbar-body {
  background-color: white;
  margin-bottom: 2rem;
}
.header {
  position: relative;
  margin-top: 6rem;
}
.logo {
  font-family: "Varela Round";
  font-size: 1.5rem;
  font-weight: 700;
  color: black;
  padding-left: 1.5rem;
}

.nav-link:hover {
  background: #5cf0bc;
  color: black;
}
.dropdown-item:hover {
  background: #5cf0bc;
  color: black;
}

.nav-item a {
  color: black;
  align-items: center;
}

#foot{
  background-color: #5cf0bc;
  position: relative
}
</style>
