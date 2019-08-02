<template>
  <div class="container content">
    <div class="row">
      <div class="col-lg-3 col-sm-12 mt-5 sidebar">
        <h5>What Are You Looking For</h5>
        <b-form-select v-model="selected" :options="options"></b-form-select>
        <br />
        <br />
        <div class="d-flex">
          <b-form-input v-model="search" placeholder="Enter search word" @keyup.enter="FindByTag"></b-form-input>
          <i class="fa fa-lg fa-search pl-2 pt-2" aria-hidden="true"></i>
        </div>
        <!-- category -->
        <div>
          <br />
          <br />
          <h5>Categories</h5>
          <b-list-group v-for="cate in categories" :key="cate._id">
            <b-list-group-item id="category" @click="findByCate(cate)">{{cate.name}}</b-list-group-item>
          </b-list-group>
        </div>
      </div>
      <!-- list -->
      <div class="col-lg-9 col-sm-12 mt-5" v-if="isHomeFeed">
        <eachArticle
          v-for="article in articles"
          :key="article._id"
          :articleList="article"
          @delete-article="deleteArticle"
          @klik-tag="detailTag"
        />
      </div>
      <div class="col-lg-9 col-sm-12 mt-5" v-if="isSearching">
        <h4 style="color:white">the found page for <em>{{search}}</em><em>{{tag}}</em></h4><br><br>
        <h2 v-if="results.length <= 0" style="color:white">Article Not Found</h2>
        <eachArticle
          v-for="result in results"
          :key="result._id"
          :articleList="result"
          @delete-article="deleteArticle"
          @klik-tag="detailTag"
        />
      </div>
    </div>
  </div>
</template>

<script>
let baseUrl = `http://localhost:3000`;
// let baseUrl ="http://34.66.117.208"
import eachArticle from "./eachArticle";

export default {
  name: "home",
  components: {
    eachArticle
  },
  data() {
    return {
      selected: null,
      options: [
        { value: null, text: "search by" },
        { value: "tag", text: "Tag" },
        { value: "title", text: "Title" }
      ],
      articles: [],
      results: [],
      search: "",
      isSearching: false,
      isHomeFeed: true,
      categories: [],
      tag: ""
    };
  },
  watch: {
    search() {
      if (this.search == "") {
        this.isHomeFeed = true;
        this.isSearching = false;
      }
    }
  },
  methods: {
    getTag(word) {
      axios({
        method: "GET",
        url: `${baseUrl}/articles/find?tag=${word}`
      })
        .then(({ data }) => {
          this.results = data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    detailTag(tag) {
      this.tag = tag;
      if (this.tag !== "") {
        this.isHomeFeed = false;
        this.isSearching = true;
        this.getTag(this.tag);
      }
    },
    findByCate(data) {
      this.isHomeFeed = false;
      this.isSearching = true;
      this.search = data.name
      axios({
        method: "GET",
        url: `${baseUrl}/articles/category/${data._id}`
      })
        .then(({ data }) => {
          this.results = data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    FindByTag() {
      this.isHomeFeed = false;
      this.isSearching = true;
      if (this.selected == "tag") {
        this.getTag(this.search);
      } else if (this.selected == "title") {
        axios({
          method: "GET",
          url: `${baseUrl}/articles/title/${this.search}`
        })
          .then(({ data }) => {
            this.results = data;
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    deleteArticle(payload) {
      let index = this.articles.findIndex(i => i._id === payload._id);
      console.log(index, "ind");

      this.articles.splice(index, 1);
    },
    findAllCategory() {
      axios({
        method: "GET",
        url: `${baseUrl}/categories/all`,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          this.categories = data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    this.findAllCategory();
    this.isHomeFeed = true;
    axios({
      method: "GET",
      url: `${baseUrl}/articles/all`
    })
      .then(({ data }) => {
        console.log(data, "all");

        this.articles = data;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style>
#category {
  background-color: rgb(252, 239, 235);
  color: black;
  margin-bottom: 1rem;
}
#category:hover {
  background-color: #49ecb3;
}
</style>
