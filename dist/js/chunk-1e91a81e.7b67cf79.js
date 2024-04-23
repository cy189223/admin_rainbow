(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1e91a81e"],{"3b25":function(t,e,a){"use strict";a("cb23")},"7bd2":function(t,e,a){"use strict";a.r(e);a("7f7f");var n=function(){var t=this,e=t._self._c;return e("div",{staticClass:"list"},[e("div",{staticClass:"content-head",staticStyle:{"margin-bottom":"20px"}},[e("div",{staticClass:"sort-keys"},[e("a-input",{staticStyle:{width:"180px","margin-right":"10px"},attrs:{placeholder:"用户名/手机号",allowClear:"",size:t.size},on:{input:t.onSearch},model:{value:t.key,callback:function(e){t.key=e},expression:"key"}}),e("a-button",{staticStyle:{"margin-right":"10px"},attrs:{size:t.size,type:"primary"},on:{click:t.refreshData}},[t._v("刷新")]),e("span",[t._v("\n        总存余:  "),e("span",{staticClass:"value-font"},[t._v(" "+t._s(t.assetInfo.balance)+" ")])]),e("span",{staticStyle:{"margin-left":"20px"}},[t._v("\n        总收入:  "),e("span",{staticClass:"value-font"},[t._v(" "+t._s(t.assetInfo.in)+" ")])]),e("span",{staticStyle:{"margin-left":"20px"}},[t._v("\n        总支出: "),e("span",{staticClass:"value-font"},[t._v(" "+t._s(t.assetInfo.out)+" ")])])],1)]),e("a-table",{staticClass:"table",attrs:{rowKey:function(t){return t.uuid},dataSource:t.list,pagination:t.pagination,size:t.size}},[e("a-table-column",{attrs:{title:"用户",width:"40px"},scopedSlots:t._u([{key:"default",fn:function(a){return[e("div",{staticClass:"user"},[e("img",{attrs:{src:a.user.headimg,alt:"用户头像"}}),e("span",[t._v(t._s(a.user.name))]),"男"===a.gender?e("a-icon",{staticClass:"gender-man",attrs:{type:"man"}}):e("a-icon",{staticClass:"gender-woman",attrs:{type:"woman"}}),t._v("\n          "+t._s(a.user.phone)+"\n        ")],1)]}}])}),e("a-table-column",{attrs:{title:"变动数额",width:"60px"},scopedSlots:t._u([{key:"default",fn:function(a){return[0===a.type?e("div",{staticStyle:{color:"red"}},[t._v("\n          - "+t._s(a.value)+"\n        ")]):e("div",{staticStyle:{color:"#2BA246"}},[t._v("\n           + "+t._s(a.value)+"\n        ")])]}}])}),e("a-table-column",{attrs:{title:"操作人",width:"80px"},scopedSlots:t._u([{key:"default",fn:function(a){return[e("div",[t._v("\n          "+t._s(a.admin&&a.admin.name||"-")+"\n        ")])]}}])}),e("a-table-column",{attrs:{title:"变动描述",width:"80px"},scopedSlots:t._u([{key:"default",fn:function(a){return[e("div",[t._v("\n          "+t._s(a.description)+"\n        ")]),e("div",{staticStyle:{"margin-top":"4px"}},[t._v(t._s(a.order_number))])]}}])}),e("a-table-column",{attrs:{title:"变动后余额",width:"80px"},scopedSlots:t._u([{key:"default",fn:function(a){return[e("div",[t._v("\n          "+t._s(a.after)+"\n        ")])]}}])}),e("a-table-column",{attrs:{title:"变动类型",width:"80px"},scopedSlots:t._u([{key:"default",fn:function(a){return[1===a.sub_type?e("span",[t._v("系统变动")]):2===a.sub_type?e("span",[t._v("后台单个修改")]):3===a.sub_type?e("span",[t._v("批量导入修改")]):t._e()]}}])}),e("a-table-column",{attrs:{title:"变动日期",dataIndex:"created_at",width:"80px"},scopedSlots:t._u([{key:"default",fn:function(a){return[e("span",[t._v(t._s(t._f("onlyDay")(a)))])]}}])})],1),e("a-modal",{staticStyle:{top:"100px"},attrs:{title:(t.editUuid?"编辑":"创建")+t.resourceTypeText,visible:t.isEdit,width:"1000px",footer:null},on:{cancel:function(e){t.isEdit=!1}}},[e("EditForm",{attrs:{uuid:t.editUuid},on:{cancel:function(e){t.isEdit=!1},success:t.fetchData}})],1)],1)},i=[],s=(a("8e6e"),a("ac6a"),a("456d"),a("ade3")),o=(a("c1df"),a("7cc6"));function c(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,n)}return a}function r(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?c(Object(a),!0).forEach((function(e){Object(s["a"])(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):c(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}var u="asset-records/score",l="积分操作记录",d={components:{ISwitch:o["a"]},props:{selectMode:{type:Boolean},params:{type:Object},size:{type:String,default:"default"}},data:function(){return{isEdit:!1,editUuid:"",resourceTypeText:l,exportOptions:{status:"all",startTime:"",endTime:"",type:"normal"},list:[],page:1,per_page:10,total:0,key:"",category_id:void 0,assetInfo:{}}},watch:{params:function(){this.refreshData()},category_id:function(){this.refreshData()}},computed:{pagination:function(){var t=this;return{defaultPageSize:this.per_page,defaultCurrent:this.page,total:this.total,onChange:function(e){t.page=e,t.fetchData()}}}},filters:{},created:function(){this.fetchData()},methods:{handleDelete:function(t){var e=this;this.$confirm({title:"提示",content:"确认删除吗？",onOk:function(){e.$http.delete("/".concat(u,"/").concat(t.uuid)).then((function(t){e.fetchData()}))}})},updateItem:function(t,e){return this.$http.patch("/".concat(u,"/").concat(t.uuid),{type:"update",attributes:r({},e)})},recommendStatusChange:function(t,e){var a=this;this.updateItem(e,{is_recommend:t}).then((function(t){a.fetchData()}))},listedStatusChange:function(t,e){var a=this;this.updateItem(e,{status:t}).then((function(t){a.fetchData()}))},handleEditListWeight:function(t){var e=this;this.$globalForm.show({title:"编辑排序",items:[{type:"number",key:"list_weight",title:"排序",default:t.list_weight,required:!0}],success:function(a){e.updateItem(t,r({},a)).then((function(t){e.$message.success("保存成功"),e.$globalForm.hide(),e.fetchData()}))}})},handleCreate:function(){this.editUuid="",this.isEdit=!0},handleEdit:function(t){this.editUuid=t.uuid,this.isEdit=!0},refreshData:function(){this.page=1,this.key="",this.fetchData()},onSearch:function(t){this.fetchData()},fetchData:function(){var t=this;this.isEdit=!1,this.$http.get("/".concat(u),{params:r(r({},this.params),{},{page:this.page,per_page:this.per_page,key:this.key,category_id:this.category_id})}).then((function(e){t.list=e.data.list,t.total=e.data.item_total})).finally((function(){t.loading=!1})),this.$http.get("/assets/score").then((function(e){t.assetInfo=e.data.info}))},getCategoryList:function(){var t=this;this.$api.emit("category.list","article").then((function(e){t.category=e.data.list}))}}},p=d,f=(a("3b25"),a("2877")),h=Object(f["a"])(p,n,i,!1,null,"5ead702d",null);e["default"]=h.exports},cb23:function(t,e,a){}}]);