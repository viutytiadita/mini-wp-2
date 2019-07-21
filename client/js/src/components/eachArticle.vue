<template>
  <div>
    <div class="card" style="width: auto;">
      <div d-flex flex-row>
        <span
          class="delete"
          @click="removeArticle(articleList)"
          v-show="!editType && !editpic && !edittag && user == articleList.user_id._id"
        >
          <i class="fa fa-lg fa-trash trash-icon" aria-hidden="true"></i> |
        </span>
        <span
          class="edit"
          @click="editType=true"
          v-show="!editType && !editpic && !edittag && user == articleList.user_id._id"
        >
          <i class="fa fa-lg fa-pencil pencil-icon" aria-hidden="true"></i>
        </span>
        <span
          class="check"
          v-show="editType || editpic || edittag"
          @click="editType=false; editpic=false; edittag=false"
        >
          <i class="fa fa-lg fa-times" aria-hidden="true"></i>
        </span>
        <!-- <wysiwyg v-if="editType" v-model="content" /> -->
      </div>
      <div class="card-body" v-show="!editType && !editpic && !edittag">
        <small>{{dateFormat}}</small>
        <span class="growup">
          <i
            class="fa fa-lg fa-sort-down"
            data-toggle="collapse"
            :href="'#collapseExample'+articleList._id"
            aria-expanded="false"
          ></i>
        </span>
        <h1 class="card-title">{{articleList.title}}</h1>
        <div class="collapse" :id="'collapseExample'+articleList._id">
          <div class="card card-body">
            <img :src="articleList.picture" />
            <span
              class="editpic"
              @click="editpic=true"
              v-show="!editType  && user == articleList.user_id._id"
            >
              <i class="fa fa-lg fa-pencil pencil-icon" aria-hidden="true">change picture</i>
            </span>
            <div v-if="articleList.user_id.username === undefined">
              <small>
                Author:
                <em>Owner</em>
              </small>
              <br />
            </div>
            <div v-if="articleList.user_id.username !== undefined">
              <small>
                Author:
                <em>{{articleList.user_id.username}}</em>
              </small>
              <br />
            </div>
            <div>
              <small>
                Category :
                <em>{{articleList.category_id.name}}</em>
              </small>
            </div>
            <p class="card-text mt-4" v-html="articleList.content"></p>
            <!-- edit tag -->
            <span
              class="editpic"
              @click="edittag=true"
              v-show="!editType  && user == articleList.user_id._id"
            >
              <i class="fa fa-lg fa-pencil pencil-icon" aria-hidden="true">Tags</i>
            </span>
            <h3>
              <b-badge
                pill
                variant="secondary"
                v-for="(tag,index) in articleList.tags"
                :key="index"
                @click="FindByTag(tag)"
              >{{tag}}</b-badge>
            </h3>
          </div>
        </div>
      </div>
    </div>
    <!-- edit tag form -->
    <div v-if="edittag" style="color:aqua">
      <b-form-group label="Tags" label-for="name-input">
        <span
          class="badge badge-pill badge-success"
          v-for="(tag,index) in newArticle.tags"
          :key="index"
          @click="deleteTag(tag)"
        >
          {{tag}}
          <i class="fa fa-lg fa-times" aria-hidden="true"></i>
        </span>
      </b-form-group>
      <b-form-group label="Add tags to your article(optional)" label-for="name-input">
        <b-form-input
          id="name-input"
          placeholder="press enter per tag"
          v-model="tag"
          @keyup.enter="addTags"
        ></b-form-input>
        <b-button class="mt-2 mb-4" variant="success" @click="changeTag(articleList)">Save Tags</b-button>
      </b-form-group>
    </div>
    <!-- edit pic -->
    <div v-if="editpic">
      <b-form-file
        v-model="newArticle.picture"
        :state="Boolean(newArticle.picture)"
        placeholder="Choose a picture..."
        drop-placeholder="Drop file here..."
      ></b-form-file>
      <b-button class="mt-2 mb-5" variant="success" @click="changePic(articleList)">Save Picture</b-button>
      <div class="text-center">
        <b-spinner variant="primary" type="grow" label="Spinning" v-if="isLoading"></b-spinner>
      </div>
    </div>
    <!-- edit content -->
    <form
      method="post"
      id="formaddArticle"
      v-if="editType"
      @submit.prevent="editArticle(articleList)"
      style="color: white"
    >
      <div class="form-group">
        <label for="exampleFormControlInput1">Title</label>
        <input
          type="text"
          class="form-control"
          id="title"
          placeholder="title"
          v-model="newArticle.title"
        />
      </div>
      <div class="form-group">
        <label for="exampleFormControlTextarea1">Content</label>
        <wysiwyg v-model="newArticle.content" />
      </div>
      <div class="modal-footer">
        <button type="submit" class="btn btn-success" id="submitEdit">Save</button>
      </div>
    </form>
  </div>
</template>

<script>
var moment = require("moment");
let baseUrl = "http://localhost:3000";
export default {
  name: "each-article",
  props: ["articleList"],
  data() {
    return {
      editType: false,
      editpic: false,
      edittag: false,
      isLoading: false,
      article: this.articleList,
      newArticle: {
        title: this.articleList.title,
        content: this.articleList.content,
        picture: this.articleList.picture,
        tags: this.articleList.tags
      },
      tag: ""
    };
  },
  computed: {
    dateFormat() {
      return moment(this.article.createdAt)
        .startOf("hour")
        .fromNow();
    },
    user() {
      return localStorage.getItem("user");
    }
  },
  created() {
    console.log("masuk each");
  },
  methods: {
    addTags() {
      this.newArticle.tags.push(this.tag);
      this.tag = "";
    },
    deleteTag(tag) {
      let index = this.newArticle.tags.indexOf(tag);
      this.newArticle.tags.splice(index, 1);
    },
    changeTag(post) {
      this.editType = false;
      axios({
        method: "PATCH",
        url: `${baseUrl}/articles/deletetag/${post._id}`,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          this.editType = false;
          return axios({
            method: "PATCH",
            url: `${baseUrl}/articles/tag/${post._id}`,
            headers: {
              token: localStorage.getItem("token")
            },
            data: {
              tag: this.newArticle.tags
            }
          });
        })
        .then(({ data }) => {
          this.edittag = false;
          swal.fire({
            title: "successfully editted",
            type: "success"
          });
        })
        .catch(err => {
          swal.fire({
            title: err.response.data.message,
            type: "error"
          });
        });
    },
    FindByTag(tag) {
      this.$emit("klik-tag",tag)
    },
    changePic(post) {
      this.isLoading = true;
      let newImage = new FormData();
      newImage.append("image", this.newArticle.picture);
      axios({
        method: "PATCH",
        url: `${baseUrl}/articles/pic/${post._id}`,
        data: newImage,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          console.log(data, "afterpic");

          this.editpic = false;
          this.isLoading = false;
          this.articleList.picture = data.picture;
          swal.fire({
            title: "successfully editted",
            type: "success"
          });
        })
        .catch(err => {
          this.isLoading = false;
          swal.fire({
            title: err.response.data.message,
            type: "error"
          });
        });
    },
    removeArticle(post) {
      console.log(post);
      swal
        .fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!"
        })
        .then(result => {
          console.log(post._id, "--===");
          if (result.value) {
            axios({
              method: "DELETE",
              url: `${baseUrl}/articles/${post._id}`,
              headers: {
                token: localStorage.getItem("token")
              }
            })
              .then(({ data }) => {
                console.log(data, "deleted");
                this.$emit("delete-article", data);
              })
              .catch(err => {
                swal.fire({
                  title: err.response.data.message,
                  type: "error"
                });
              });
          } else {
            swal.fire({
              title: "cancel remove article",
              type: "success"
            });
          }
        });
    },
    editArticle(post) {
      console.log(post);
      this.edittag = false;
      axios({
        method: "PUT",
        url: `${baseUrl}/articles/${post._id}`,
        data: {
          title: this.newArticle.title,
          content: this.newArticle.content
        },
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          this.editType = false;
          this.articleList.title = data.title;
          this.articleList.content = data.content;
          swal.fire({
            title: "successfully editted",
            type: "success"
          });
        })
        .catch(err => {
          swal.fire({
            title: err.response.data.message,
            type: "error"
          });
        });
    }
  }
};
</script>

<style>
.editpic {
  padding-top: 0;
  padding-bottom: 1rem;
}
</style>
