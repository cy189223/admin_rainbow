(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-75b10765"],{"387b":function(t,e,i){},"4d18":function(t,e,i){"use strict";i.r(e);var n=function(){var t=this,e=t._self._c;return e("div",{staticClass:"list"},[e("div",{staticClass:"content-head",staticStyle:{"margin-bottom":"20px"}},[e("div",{staticClass:"sort-keys"},[e("a-input",{staticStyle:{width:"180px","margin-right":"10px"},attrs:{placeholder:"输入关键字",allowClear:"",size:t.size},on:{input:t.onSearch},model:{value:t.key,callback:function(e){t.key=e},expression:"key"}}),e("a-button",{staticStyle:{"margin-right":"10px"},attrs:{size:t.size,type:"primary"},on:{click:t.refreshData}},[t._v("刷新")])],1),t.selectMode?t._e():e("a-button",{attrs:{type:"primary",icon:"plus"},on:{click:t.handleCreate}},[t._v("创建"+t._s(t.resourceTypeText))])],1),e("a-table",{staticClass:"table",attrs:{rowKey:function(t){return t.uuid},dataSource:t.list,pagination:t.pagination,size:t.size}},[e("a-table-column",{attrs:{title:"封面",width:"40px"},scopedSlots:t._u([{key:"default",fn:function(t){return[e("img",{staticClass:"thumb",attrs:{src:t.thumb}})]}}])}),e("a-table-column",{attrs:{title:"面值",width:"100px"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n        "+t._s(e.redpack/100)+"元\n      ")]}}])}),e("a-table-column",{attrs:{title:"售价",width:"100px"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n        "+t._s(e.money_price/100)+"元\n      ")]}}])}),e("a-table-column",{attrs:{title:"库存",width:"100px"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n        "+t._s(e.stock)+"份\n      ")]}}])}),e("a-table-column",{attrs:{title:"销量",width:"100px"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n        "+t._s(e.sales)+"\n      ")]}}])}),t.selectMode?t._e():e("a-table-column",{attrs:{title:"排序",width:"60px"},scopedSlots:t._u([{key:"default",fn:function(i){return[t._v("\n        "+t._s(i.list_weight)+"\n        "),e("span",{staticStyle:{"margin-left":"10px"},on:{click:function(e){return t.handleEditListWeight(i)}}},[e("a",{attrs:{href:"javascript:;"}},[e("a-icon",{attrs:{type:"edit"}})],1)])]}}],null,!1,3403708818)}),t.selectMode?t._e():e("a-table-column",{attrs:{title:"是否上架",width:"40px"},scopedSlots:t._u([{key:"default",fn:function(i){return[e("ISwitch",{attrs:{value:i.status,active:1,unactive:0},on:{change:function(e){return t.listedStatusChange(e,i)}}})]}}],null,!1,1077108743)}),e("a-table-column",{attrs:{title:"创建日期",dataIndex:"created_at",width:"80px"},scopedSlots:t._u([{key:"default",fn:function(i){return[e("span",[t._v(t._s(t._f("onlyDay")(i)))])]}}])}),t.selectMode?t._e():e("a-table-column",{attrs:{title:"操作",width:"100px"},scopedSlots:t._u([{key:"default",fn:function(i){return[e("span",[e("a",{attrs:{href:"javascript:;"},on:{click:function(e){return t.handleEdit(i)}}},[t._v("编辑")]),e("a-divider",{attrs:{type:"vertical"}}),e("a",{attrs:{href:"javascript:;"},on:{click:function(e){return t.handleDelete(i)}}},[t._v("删除")])],1)]}}],null,!1,2441080398)})],1),e("a-modal",{staticStyle:{top:"100px"},attrs:{title:(t.editUuid?"编辑":"创建")+t.resourceTypeText,visible:t.isEdit,width:"1000px",footer:null},on:{cancel:function(e){t.isEdit=!1}}},[t.isEdit?e("EditForm",{attrs:{uuid:t.editUuid},on:{cancel:function(e){t.isEdit=!1},success:t.fetchData}}):t._e()],1)],1)},a=[],s=(i("8e6e"),i("ac6a"),i("456d"),i("ade3")),r=(i("c1df"),i("7cc6")),c=function(){var t=this,e=t._self._c;return e("div",{staticClass:"container"},[e("IForm",{staticClass:"form-container",attrs:{formFrame:t.frame,formData:t.form},on:{"update:formData":function(e){t.form=e},"update:form-data":function(e){t.form=e}}}),e("div",{staticStyle:{display:"flex","justify-content":"flex-end"},attrs:{slot:"action"},slot:"action"},[e("a-button",{staticClass:"btn",on:{click:t.cancel}},[t._v("取消")]),e("a-button",{staticClass:"btn",attrs:{type:"primary"},on:{click:t.submit}},[t._v("提交")])],1)],1)},o=[],u=i("b0a5");function l(t,e){var i=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),i.push.apply(i,n)}return i}function f(t){for(var e=1;e<arguments.length;e++){var i=null!=arguments[e]?arguments[e]:{};e%2?l(Object(i),!0).forEach((function(e){Object(s["a"])(t,e,i[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(i)):l(Object(i)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(i,e))}))}return t}var p="asset/redpack-skus",d={components:{IForm:u["a"]},data:function(){return{form:{},categoryList:[]}},props:{uuid:{type:String}},computed:{categoryOptions:function(){return this.categoryList.map((function(t){return{title:t.title,value:t.id}}))},frame:function(){return[{title:"封面",key:"thumb",type:"image",tips:"封面会显示在用户订单列表中",newline:!0,required:!0},{title:"充值余额",key:"redpack",type:"price",required:!0,newline:!0},{title:"售价",key:"money_price",type:"price",required:!0,newline:!0},{title:"库存",key:"stock",type:"number",suffix:"份",required:!0,newline:!0}]}},created:function(){},mounted:function(){this.uuid=this.uuid||this.$route.params.uuid,this.initForm()},watch:{uuid:function(){this.initForm()}},methods:{initForm:function(){var t=this;this.uuid?this.$http("/".concat(p,"/").concat(this.uuid)).then((function(e){t.form=e.data.info})):this.form={}},cancel:function(){this.$emit("cancel")},create:function(){var t=this;this.$http.post("/".concat(p),f({},this.form)).then((function(e){t.$message.success("创建成功"),t.$emit("success"),t.uuid="",t.form={}}))},update:function(){var t=this;this.$http.patch("/".concat(p,"/").concat(this.uuid),{type:"update",attributes:this.form}).then((function(e){t.$message.success("更新成功"),t.$emit("success"),t.uuid="",t.form={}}))},submit:function(){this.uuid?this.update():this.create()}}},h=d,m=(i("ac86"),i("2877")),y=Object(m["a"])(h,c,o,!1,null,"7a8939bf",null),b=y.exports;function g(t,e){var i=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),i.push.apply(i,n)}return i}function _(t){for(var e=1;e<arguments.length;e++){var i=null!=arguments[e]?arguments[e]:{};e%2?g(Object(i),!0).forEach((function(e){Object(s["a"])(t,e,i[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(i)):g(Object(i)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(i,e))}))}return t}var v="asset/redpack-skus",k="套餐",w={components:{ISwitch:r["a"],EditForm:b},props:{selectMode:{type:Boolean},params:{type:Object},size:{type:String,default:"default"}},data:function(){return{isEdit:!1,editUuid:"",resourceTypeText:k,exportOptions:{status:"all",startTime:"",endTime:"",type:"normal"},list:[],page:1,per_page:10,total:0,key:"",category_id:void 0}},watch:{params:function(){this.refreshData()},category_id:function(){this.refreshData()}},computed:{pagination:function(){var t=this;return{defaultPageSize:this.per_page,defaultCurrent:this.page,total:this.total,onChange:function(e){t.page=e.current,t.per_page=e.pageSize,t.fetchData()}}}},filters:{},created:function(){this.fetchData()},methods:{handleDelete:function(t){var e=this;this.$confirm({title:"提示",content:"确认删除吗？",onOk:function(){e.$http.delete("/".concat(v,"/").concat(t.uuid)).then((function(t){e.fetchData()}))}})},updateItem:function(t,e){return this.$http.patch("/".concat(v,"/").concat(t.uuid),{type:"update",attributes:_({},e)})},recommendStatusChange:function(t,e){var i=this;this.updateItem(e,{is_recommend:t}).then((function(t){i.fetchData()}))},listedStatusChange:function(t,e){var i=this;this.updateItem(e,{status:t}).then((function(t){i.fetchData()}))},handleEditListWeight:function(t){var e=this;this.$globalForm.show({title:"编辑排序",items:[{type:"number",key:"list_weight",title:"排序",default:t.list_weight,required:!0}],success:function(i){e.updateItem(t,_({},i)).then((function(t){e.$message.success("保存成功"),e.$globalForm.hide(),e.fetchData()}))}})},handleCreate:function(){this.editUuid="",this.isEdit=!0},handleEdit:function(t){this.editUuid=t.uuid,this.isEdit=!0},refreshData:function(){this.page=1,this.key="",this.fetchData()},onSearch:function(t){this.fetchData()},fetchData:function(){var t=this;this.isEdit=!1,this.$http.get("/".concat(v),{params:_(_({},this.params),{},{page:this.page,per_page:this.per_page,key:this.key,category_id:this.category_id})}).then((function(e){t.list=e.data.list,t.total=e.data.item_total})).finally((function(){t.loading=!1}))},getCategoryList:function(){var t=this;this.$api.emit("category.list","article").then((function(e){t.category=e.data.list}))}}},O=w,j=(i("e169"),Object(m["a"])(O,n,a,!1,null,"652be60e",null));e["default"]=j.exports},"97b2":function(t,e,i){},ac86:function(t,e,i){"use strict";i("97b2")},b0a5:function(t,e,i){"use strict";var n=i("b6c9");e["a"]=n["a"]},e169:function(t,e,i){"use strict";i("387b")}}]);