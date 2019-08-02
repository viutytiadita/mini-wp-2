<template>
  <div>
    <div class="container content">
      <div>
        <addingArticles @new-article="addNewArticle" />
      </div>
      <div class="row">
        <div class="col-lg-3 col-sm-12 mt-5 sidebar">
          <h1>We Create</h1>
          <h1>Like</h1>
          <h1>Share</h1>
          <h1>With You</h1>
        </div>
        <div class="col-lg-9 col-sm-12 mt-5" v-if="isMyPage">
          <eachArticle v-for="article in articles" :key="article._id" :articleList="article" @delete-article="deleteArticle"   @klik-tag="detailTag"/>
        </div>
        <div class="col-lg-9 col-sm-12 mt-5" v-if="isTagPage">
          <eachArticle v-for="article in articles" :key="article._id" :articleList="article" @delete-article="deleteArticle"   @klik-tag="detailTag"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import addingArticles from "./addingArticle.vue";
import eachArticle from "./eachArticle";

let baseUrl = `http://localhost:3000`;
// let baseUrl ="http://34.66.117.208"

const Toast = Swal.mixin({
  toast: true,
  position: "center",
  showConfirmButton: false,
  timer: 3000
});

export default {
  components: {
    addingArticles,
    eachArticle
  },
  data() {
    return {
      articles: [],
      tag: '',
      isMyPage: true,
      isTagPage: false
    };
  },
  created() {
    this.isMyPage = true
    axios({
      method: "GET",
      url: `${baseUrl}/articles/my`,
      headers: {
        token: localStorage.getItem("token")
      }
    })
      .then(({ data }) => {
        this.articles = data;
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    addNewArticle(newdata) {
          axios({
      method: "GET",
      url: `${baseUrl}/articles/my`,
      headers: {
        token: localStorage.getItem("token")
      }
    })
      .then(({ data }) => {
        this.articles = data;
      })
      .catch(err => {
        console.log(err);
      });
    },
    deleteArticle(payload) {
      let index = this.articles.findIndex(i => i._id === payload._id)
      console.log(index,'ind');
      
      this.articles.splice(index, 1);
    },
    detailTag(tag) {
      alert(tag)
      this.tag = tag;
      if (this.tag !== "") {
        this.isMyPage = false;
        this.isTagPage = true;
        axios({
        method: "GET",
        url: `${baseUrl}/articles/find?tag=${this.tag}`
      })
        .then(({ data }) => {
          this.tag = ''
          this.articles = data;
        })
        .catch(err => {
          console.log(err);
        });
      }
    }
  }
};
</script>

<style>
.sidebar {
  color: aliceblue;
  position: relative;
}

.card-body {
  background-color: rgba(255, 255, 255, 0.932);
  text-align: left;
}

.card img {
  padding-top: 1rem;
  padding-bottom: 2rem;
  width: 46.3rem;
}

.card span {
  color: #49ecb3;
}

.growup {
  padding-left: 43rem;
  text-align: right;
  font-size: 1.5rem;
}

.delete,
.edit {
  padding-top: 3rem;
}
</style>