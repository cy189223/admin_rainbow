<template>
  <div class="phone-c">
    <Phone v-model="page" @currentChange="currentChange" v-show="canShow"></Phone>
    <div class="right">
      <div class="module-edit-c">
        <IPageGlobalForm :formFrame="baseFrame" v-if="baseFrame.length" title="页面配置" labelWidth="100rpx" class="form-container" :page.sync="page"></IPageGlobalForm>
        <component v-if="currentItem.type && canShowCompont" :uuid="currentItem.uuid" style="margin-top: 30px;" v-model="page.modules[currentIndex]" :is="currentItem.type + 'Editor'"></component>
      </div>
    </div>
  </div>
</template>
<script>
  import Phone from './components/Phone.vue'
  import IForm from "@/components/IForm"
  import IPageGlobalForm from "@/components/IPageGlobalForm"

  import swiperEditor from './components/editorModules/swiperEditor'
  import imagesEditor from './components/editorModules/imagesEditor.vue'
  import imageListEditor from './components/editorModules/imageListEditor.vue'
  import titleEditor from './components/editorModules/titleEditor.vue'
  import searchBarEditor from './components/editorModules/searchBarEditor.vue'
  import multiListEditor from './components/editorModules/multiListEditor.vue'
  import videoEditor from './components/editorModules/videoEditor.vue'
  import htmlEditor from './components/editorModules/htmlEditor.vue'
  import boxesEditor from './components/editorModules/boxesEditor.vue'
  import categoryListEditor from './components/editorModules/categoryListEditor.vue'
  import couponsEditor from './components/editorModules/couponsEditor.vue'
  import ipsEditor from './components/editorModules/ipsEditor.vue'
  import signinEditor from './components/editorModules/signinEditor.vue'
  import productsEditor from './components/editorModules/productsEditor.vue'
  import activitiesEditor from './components/editorModules/activitiesEditor.vue'

  export default {
    components: {
      IForm,
      Phone,
      swiperEditor,
      imagesEditor,
      titleEditor,
      searchBarEditor,
      multiListEditor,
      htmlEditor,
      boxesEditor,
      categoryListEditor,
      couponsEditor,
      ipsEditor,
      signinEditor,
      productsEditor,
      activitiesEditor,
      imageListEditor,
      videoEditor,
      IPageGlobalForm
    },
    props: {
      value: {
        type: Object
      },
      baseFrame: {
        type: Array,
        default () {
          return []
        }
      }
    },
    data() {
      return {
        currentIndex: 0,
        page: {
          modules: []
        },
		canShow:false,
		canShowCompont:false,
      }
    },
    mounted() {
      let page = this.value || this.page
      page.style = page.style || {}
      this.page = page || this.page
    },
    watch: {
      value(val) {
        let page = val || this.page
        page.style = page.style || {}
        this.page = page
      },
      page: {
        handler(val, oldval) {
          this.$emit('input', val)
        },
        deep: true
      },
    },
    computed: {
      currentItem() {
		  console.log(this.page)
		  this.canShow = (this.page.from_type != 'BoxHome' && this.page.from_type != 'shopHome' && this.page.from_type !=  'activityHome') ? true :false
		  this.canShowCompont = (this.page.from_type != 'BoxHome') ? true :false
		  // this.canShow = true
		  //  this.canShowCompont = true
        return this.page.modules[this.currentIndex] || {}
      }
    },
    methods: {
      currentChange(index) {
        this.currentIndex = index
      }
    }
  }
</script>

<style lang="scss" scoped>
  .phone-c {
    display: flex !important;
    flex-direction: row;
  }

  .right {
    flex: 1;
    margin-left: 16px;
  }
</style>
