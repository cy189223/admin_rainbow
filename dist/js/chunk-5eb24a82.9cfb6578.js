(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5eb24a82"],{"2fcca":function(t,e,a){},"455b":function(t,e,a){"use strict";a("ff0d")},"5b86":function(t,e,a){"use strict";a("2fcca")},b0a5:function(t,e,a){"use strict";var i=a("b6c9");e["a"]=i["a"]},ccf2:function(t,e,a){"use strict";a.r(e);a("7f7f");var i=function(){var t=this,e=t._self._c;return e("div",{staticClass:"list"},[e("div",{staticClass:"content-head",staticStyle:{"margin-bottom":"20px"}},[e("div",{staticClass:"sort-keys"},[e("div",{staticClass:"tab-list"},t._l(t.statusList,(function(a,i){return e("div",{staticClass:"item",class:{actived:t.status===a.key},on:{click:function(e){t.status=a.key}}},[t._v("\n           "+t._s(a.text)+"\n           ("+t._s(t.statusTotal[a.key])+")\n         ")])})),0),e("a-input",{staticStyle:{width:"180px","margin-right":"10px"},attrs:{placeholder:"标题/用户名/手机号",allowClear:"",size:t.size},on:{input:t.onSearch},model:{value:t.key,callback:function(e){t.key=e},expression:"key"}}),e("a-button",{staticStyle:{"margin-right":"10px"},attrs:{size:t.size,type:"primary"},on:{click:t.refreshData}},[t._v("刷新")])],1)]),e("a-table",{staticClass:"table",attrs:{rowKey:function(t){return t.uuid},dataSource:t.list,pagination:t.pagination,size:t.size}},[e("a-table-column",{attrs:{title:"ID",width:"10px"},scopedSlots:t._u([{key:"default",fn:function(a){return[e("span",[t._v(t._s(a.id))])]}}])}),e("a-table-column",{attrs:{title:"用户",width:"10px"},scopedSlots:t._u([{key:"default",fn:function(a){return[e("div",{staticClass:"user"},[e("img",{attrs:{src:a.user.headimg,alt:"用户头像"}}),e("div",[e("div",[t._v(t._s(a.user.name))]),e("div",[t._v(t._s(a.user.phone))])])])]}}])}),e("a-table-column",{attrs:{title:"物品",width:"100px"},scopedSlots:t._u([{key:"default",fn:function(a){return[t._l(a.package_skus,(function(a,i){return e("div",{staticStyle:{display:"flex","align-items":"center"}},[e("img",{staticClass:"thumb",staticStyle:{"margin-right":"10px"},attrs:{src:a.thumb+"?x-oss-process=image/resize,w_400"}}),e("div",[e("div",{staticStyle:{"font-weight":"500","font-size":"110%"}},[t._v("\n              "+t._s(a.title)+" "),"virtual_asset"===a.sku_type_text?e("a-tag",{attrs:{color:"orange"}},[t._v("虚拟资产")]):t._e()],1),e("div",[e("PriceDisplay",{attrs:{info:a}})],1)])])})),e("div",{staticStyle:{"margin-top":"10px"}},t._l(a.images,(function(a,i){return e("img",{staticClass:"content-image",attrs:{src:a},on:{click:function(e){return t.$viewImage(a)}}})})),0)]}}])}),e("a-table-column",{attrs:{title:"置换商品",width:"100px"},scopedSlots:t._u([{key:"default",fn:function(a){return[e("div",{staticStyle:{display:"flex","align-items":"center"}},[e("img",{staticClass:"thumb",staticStyle:{"margin-right":"10px"},attrs:{src:a.product_sku.thumb+"?x-oss-process=image/resize,w_400"}}),e("div",[e("div",{staticStyle:{"font-weight":"500","font-size":"110%"}},[t._v("\n              "+t._s(a.product_sku.title)+"\n            ")]),e("div",[e("PriceDisplay",{attrs:{info:a.product_sku}})],1)])])]}}])}),e("a-table-column",{attrs:{title:"置换抵扣",width:"40px"},scopedSlots:t._u([{key:"default",fn:function(t){return[e("PriceDisplay",{attrs:{info:t,moneyKey:"source_money_price",scoreKey:"source_score_price"}})]}}])}),e("a-table-column",{attrs:{title:"订单编号",width:"10px"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n        "+t._s(e.order_number)+"\n      ")]}}])}),e("a-table-column",{attrs:{title:"状态",width:"60px"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n        "+t._s(e.union_status_text)+"\n      ")]}}])}),e("a-table-column",{attrs:{title:"发起日期",dataIndex:"created_at",width:"80px"},scopedSlots:t._u([{key:"default",fn:function(a){return[e("span",[t._v(t._s(t._f("onlyDay")(a)))])]}}])}),t.selectMode?t._e():e("a-table-column",{attrs:{title:"操作",width:"80px"},scopedSlots:t._u([{key:"default",fn:function(a){return[e("span",[t._v("\n          -\n        ")])]}}],null,!1,30655014)})],1),e("ExportPopup",{attrs:{isShow:t.isExport},on:{hide:function(e){t.isExport=!1}}})],1)},n=[],s=(a("8e6e"),a("ac6a"),a("456d"),a("ade3")),o=(a("c1df"),a("7cc6")),r=function(){var t=this,e=t._self._c;return e("a-modal",{staticStyle:{top:"100px"},attrs:{title:"导出物品记录数据",visible:t.isShow,width:"800px",okText:"确认导出"},on:{ok:t.handleOk,cancel:t.handleCancel}},[e("IForm",{staticClass:"form-container",attrs:{formFrame:t.frame,formData:t.form},on:{"update:formData":function(e){t.form=e},"update:form-data":function(e){t.form=e}}}),t._v("\n  共查询到 "+t._s(t.itemTotal)+" 条物品记录\n")],1)},c=[],u=a("b0a5");function l(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);e&&(i=i.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,i)}return a}function p(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?l(Object(a),!0).forEach((function(e){Object(s["a"])(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):l(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}var f={components:{IForm:u["a"]},props:{isShow:{type:Boolean}},computed:{frame:function(){return[{title:"所属用户手机号",key:"user_phone",tips:"填入手机号筛选特定用户，不填则导出所有记录"},{type:"select",key:"status",title:"物品状态",options:[{title:"全部",value:"all"},{title:"待处理",value:"pending"},{title:"已提货",value:"picked"},{title:"已返售",value:"return_saled"},{title:"已转让",value:"resaled"},{title:"转售中",value:"resale_pending"}],default:"all"},{type:"number",key:"per_page",title:"每页条数",default:2e3},{type:"number",key:"page",title:"要导出的页码",tips:"填5则导出第5页",default:1}]}},data:function(){return{form:{},itemTotal:0}},watch:{form:{handler:function(t,e){var a=this;this.$http.post("/export/package-sku/total",this.form).then((function(t){a.itemTotal=t.data.total}))},deep:!0}},mounted:function(){var t=this;this.$http.post("/export/package-sku/total",this.form).then((function(e){t.itemTotal=e.data.total}))},methods:{handleChange:function(t){t.file,t.fileList},handleOk:function(){this.$http.post("/export/package-sku",p({},this.form)).then((function(t){var e=window.open();e.location=Object({NODE_ENV:"production",BASE_URL:"/"}).VUE_APP_BASE_URL+"".concat(t.data.url)})).finally((function(){}))},handleCancel:function(){this.$emit("hide")}}},h=f,d=(a("5b86"),a("2877")),m=Object(d["a"])(h,r,c,!1,null,"4d2b59b8",null),y=m.exports;function g(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);e&&(i=i.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,i)}return a}function _(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?g(Object(a),!0).forEach((function(e){Object(s["a"])(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):g(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}var b="market/exchange/records",v="置换记录",k={components:{ISwitch:o["a"],ExportPopup:y},props:{selectMode:{type:Boolean},params:{type:Object},size:{type:String,default:"default"},isAutoMatch:{type:Boolean}},data:function(){return{isEdit:!1,editUuid:"",resourceTypeText:v,exportOptions:{status:"all",startTime:"",endTime:"",type:"normal"},list:[],page:1,per_page:10,total:0,key:"",status:"pending",statusList:[{text:"待支付",key:"pending"},{text:"已置换",key:"completed"},{text:"全部",key:"all"}],statusTotal:{pending:0,completed:0,all:0},isExport:!1,tenantList:[]}},watch:{params:function(){this.refreshData()},category_id:function(){this.refreshData()},status:function(){this.refreshData()},isAutoMatch:function(){this.refreshData()}},computed:{pagination:function(){var t=this;return{defaultPageSize:this.per_page,defaultCurrent:this.page,total:this.total,onChange:function(e){t.page=e,t.fetchData()}}},tenantOptions:function(){return this.tenantList.map((function(t){return{title:t.title,value:t.id}}))},defaultTenant:function(){return this.tenantList&&this.tenantList[0]||{}}},filters:{},created:function(){var t=this;this.fetchData(),this.$http("/market/tenants").then((function(e){t.tenantList=e.data.list}))},methods:{handleGetPath:function(t){this.$getPathPopup.show({page:"/pages/resale/detail",param:"uuid="+t.uuid})},batchBuy:function(t){var e=this;this.$iForm.show({title:"批量购买所有使用建议价挂售中的商品",frame:[{title:"使用商户",key:"tenant_id",type:"select",options:this.tenantOptions,tips:"指定商户进行购买 <br/> 请确保商户绑定的用户有足够的积分或红包余额",required:!0,default:this.defaultTenant.id}],success:function(t){e.$http.post("/market/batch-buy",_({},t)).then((function(t){e.fetchData(),e.$iForm.hide(),e.$message.success("成功购买"+t.data.total+"个转售")}))}})},handleBuy:function(t){var e=this;this.$iForm.show({title:"购买转售",frame:[{title:"使用商户",key:"tenant_id",type:"select",options:this.tenantOptions,tips:"指定商户进行购买 <br/> 请确保商户绑定的用户有足够的积分或红包余额",required:!0,default:this.defaultTenant.id}],success:function(a){e.$http.post("/market/transactions",_({resale_id:t.id},a)).then((function(t){e.fetchData(),e.$iForm.hide(),e.$message.success("购买成功")}))}})},handleDelete:function(t){var e=this;this.$confirm({title:"提示",content:"确认删除吗？删除后无法撤消，请谨慎考虑后操作!",onOk:function(){e.$http.delete("/".concat(b,"/").concat(t.uuid)).then((function(t){e.fetchData()}))}})},updateItem:function(t,e){return this.$http.patch("/".concat(b,"/").concat(t.uuid),{type:"update",attributes:_({},e)})},listedStatusChange:function(t,e){var a=this;this.updateItem(e,{status:t}).then((function(t){a.fetchData()}))},handleEditListWeight:function(t){var e=this;this.$globalForm.show({title:"编辑排序",items:[{type:"number",key:"list_weight",title:"排序",default:t.list_weight,required:!0}],success:function(a){e.updateItem(t,_({},a)).then((function(t){e.$message.success("保存成功"),e.$globalForm.hide(),e.fetchData()}))}})},handleCreate:function(){this.editUuid="",this.isEdit=!0},handleEdit:function(t){this.editUuid=t.uuid,this.isEdit=!0},refreshData:function(){this.page=1,this.key="",this.fetchData()},onSearch:function(t){this.page=1,this.fetchData()},fetchTotalData:function(){var t=this;this.$http("/market/exchange/record/status",{params:_(_({},this.params),{},{key:this.key,match_type:this.isAutoMatch?2:1})}).then((function(e){t.statusTotal=e.data.total}))},fetchData:function(){var t=this;this.isEdit=!1,this.$http.get("/".concat(b),{params:_(_({},this.params),{},{page:this.page,per_page:this.per_page,key:this.key,status:this.status,category_id:this.category_id,match_type:this.isAutoMatch?2:1})}).then((function(e){t.list=e.data.list,t.total=e.data.item_total})).finally((function(){t.fetchTotalData()}))},getCategoryList:function(){var t=this;this.$api.emit("category.list","article").then((function(e){t.category=e.data.list}))}}},w=k,O=(a("455b"),Object(d["a"])(w,i,n,!1,null,"664a47c4",null));e["default"]=O.exports},ff0d:function(t,e,a){}}]);