<template>
  <div>
    <b-button v-b-modal.modal-prevent-closing>New Article</b-button>
    <b-modal
      size="lg"
      id="modal-prevent-closing"
      ref="modal"
      title="New Article"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form ref="form">
        <b-form-group label="Title" label-for="name-input">
          <b-form-input id="name-input" placeholder="enter title" v-model="newArticle.title"></b-form-input>
        </b-form-group>
        <b-form-group label="Content" label-for="name-input">
          <wysiwyg v-model="newArticle.content" />
        </b-form-group>
        <b-form-file
          v-model="newArticle.picture"
          :state="Boolean(newArticle.picture)"
          placeholder="Choose a picture..."
          drop-placeholder="Drop file here..."
        ></b-form-file>
        <b-form-group label="Category" label-for="name-input">
          <b-form-select v-model="newArticle.category" class="mb-3">
            <option :value="null">Please select an option</option>
            <option v-for="cate in categories" :key="cate._id" :value="cate._id">{{cate.name}}</option>
          </b-form-select>
        </b-form-group>
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
        </b-form-group>
      </form>
      <div class="text-center">
        <b-spinner variant="primary" type="grow" label="Spinning" v-if="isLoading"></b-spinner>
      </div>
    </b-modal>
  </div>
</template>

<script>
const Toast = Swal.mixin({
  toast: true,
  position: "center",
  showConfirmButton: false,
  timer: 3000
});
let baseUrl = "http://localhost:3000";
// let baseUrl ="http://34.66.117.208"
export default {
  components: {},
  data() {
    return {
      newArticle: {
        title: "",
        content: "",
        picture: "",
        category: "",
        tags: []
      },
      tag: "",
      error: "",
      categories: [],
      isLoading: false
    };
  },
  methods: {
    resetModal() {
      this.name = "";
      this.nameState = null;
    },
    handleOk(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.addArticle();
    },
    addTags() {
      this.newArticle.tags.push(this.tag);
      this.tag = "";
    },
    deleteTag(tag) {
      let index = this.newArticle.tags.indexOf(tag);
      this.newArticle.tags.splice(index, 1);
    },
    previewFiles() {
      this.newArticle.picture = this.$refs.myFiles.files[0];
      this.filename = this.$refs.myFiles.files[0].name;
    },
    addArticle() {
      this.isLoading = true;

      let newImage = new FormData();
      newImage.append("image", this.newArticle.picture);
      newImage.append("title", this.newArticle.title);
      newImage.append("content", this.newArticle.content);
      newImage.append("category", this.newArticle.category);
      // newImage.append("tag", this.newArticle.tags);
      console.log(newImage, "==");

      axios({
        method: "POST",
        url: `${baseUrl}/articles`,
        headers: {
          token: localStorage.getItem("token")
        },
        data: newImage
      })
        .then(({ data }) => {
          console.log(data);

          return axios({
            method: "PATCH",
            url: `${baseUrl}/articles/tag/${data._id}`,
            headers: {
              token: localStorage.getItem("token")
            },
            data: {
              tag: this.newArticle.tags
            }
          });
        })
        .then(({ data }) => {
          this.isLoading = false;
          this.$emit("new-article", data);
          Toast.fire({
            type: "success",
            title: "successully posted!"
          });

          this.$refs.modal.hide();
        })
        .catch(err => {
          console.log(err);
          this.isLoading = false;
          Swal.fire({
            type: "error",
            title: "please complete the form"
          });
          this.error = err.response.data.message;
        });
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
          this.error = err.response.data.message;
        });
    }
  },
  created() {
    this.findAllCategory();
  }
};
</script>

<style>
</style>
