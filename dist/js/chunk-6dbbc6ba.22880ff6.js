(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6dbbc6ba"],{"28d1":function(t,e,i){},"2f6e":function(t,e,i){"use strict";i("28d1")},"4bd1":function(t,e,i){"use strict";i("6f69")},"5ae1":function(t,e,i){},"607c":function(t,e,i){"use strict";i("f3d8")},"6f69":function(t,e,i){},"7e43":function(t,e,i){"use strict";i.r(e);var n=function(){var t=this,e=t._self._c;return e("div",{staticClass:"list"},[e("div",{staticClass:"content-head",staticStyle:{"margin-bottom":"20px"}},[e("div",{staticClass:"sort-keys"},[e("div",{staticClass:"tab-list"},t._l(t.statusList,(function(i,n){return e("div",{staticClass:"item",class:{actived:t.status===i.key},on:{click:function(e){t.status=i.key}}},[t._v("\n           "+t._s(i.text)+"\n           ("+t._s(t.statusTotal[i.key])+")\n         ")])})),0),e("a-input-search",{staticStyle:{width:"180px","margin-right":"10px"},attrs:{placeholder:"输入关键字","enter-button":"",allowClear:"",size:t.size},on:{input:t.onSearch,search:t.onSearch},model:{value:t.key,callback:function(e){t.key=e},expression:"key"}})],1),t.selectMode?t._e():e("a-button",{attrs:{type:"primary",icon:"plus"},on:{click:t.handleCreate}},[t._v("创建"+t._s(t.resourceTypeText))])],1),e("a-table",{staticClass:"table",attrs:{rowKey:function(t){return t.uuid},dataSource:t.list,pagination:t.pagination,size:t.size}},[e("a-table-column",{attrs:{title:"标题",width:"240px"},scopedSlots:t._u([{key:"default",fn:function(i){return[e("div",{staticClass:"title-c"},[e("img",{staticClass:"thumb",attrs:{src:i.thumb}}),e("div",{staticClass:"right"},[e("div",{staticClass:"title"},[t._v(t._s(i.title))]),e("PriceDisplay",{attrs:{info:i}})],1)])]}}])}),e("a-table-column",{attrs:{title:"开奖条件",width:"160px"},scopedSlots:t._u([{key:"default",fn:function(i){return[e("div",[e("span",[t._v("第"+t._s(i.current_session)+"期")]),t._v("\n          /\n          "),e("span",[t._v("共"+t._s(i.session_total)+"期")])]),"time"==i.emit_type?e("span",[t._v(t._s(t.$tool.formatDate(i.emit_time,"MM-dd hh:mm"))+"开奖")]):"user_total"==i.emit_type?e("span",[t._v("用户数达"+t._s(i.emit_user_total)+"时开奖")]):"ticket_total"==i.emit_type?e("span",[t._v("抽奖码达"+t._s(i.emit_ticket_total)+"个时开奖")]):t._e()]}}])}),e("a-table-column",{attrs:{title:"次数库存",width:"120px"},scopedSlots:t._u([{key:"default",fn:function(i){return[e("div",[t._v("\n            剩 "+t._s(i.stock)+" 次\n        ")])]}}])}),e("a-table-column",{attrs:{title:"奖品池",width:"120px"},scopedSlots:t._u([{key:"default",fn:function(i){return[e("div",[e("a",{attrs:{href:"javascript:;"},on:{click:function(e){return t.handleEditSku(i)}}},[t._v("\n            "+t._s(i.skus_count)+" 种奖品\n          ")])]),e("div",[t._v(t._s(i.sku_stock)+"件库存")])]}}])}),e("a-table-column",{attrs:{title:"人数/抽奖码",width:"120px"},scopedSlots:t._u([{key:"default",fn:function(i){return[e("div",[e("a",{attrs:{href:"javascript:;"},on:{click:function(e){return t.showUserList(i)}}},[t._v(t._s(i.sales)+"人参与")])]),e("div",[t._v(t._s(i.tickets_count)+"张抽奖码")])]}}])}),e("a-table-column",{attrs:{title:"阅读量",width:"80px"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n        "+t._s(e.visit_total)+"\n      ")]}}])}),t.selectMode?t._e():e("a-table-column",{attrs:{title:"排序",width:"100px"},scopedSlots:t._u([{key:"default",fn:function(i){return[t._v("\n        "+t._s(i.list_weight)+"\n        "),e("span",{staticStyle:{"margin-left":"10px"},on:{click:function(e){return t.handleEditListWeight(i)}}},[e("a",{attrs:{href:"javascript:;"}},[e("a-icon",{attrs:{type:"edit"}})],1)])]}}],null,!1,3403708818)}),e("a-table-column",{attrs:{title:"状态",width:"60px"},scopedSlots:t._u([{key:"default",fn:function(i){return["working"===i.union_status?e("a-tag",{attrs:{color:"blue"}},[t._v("\n          "+t._s(i.union_status_text)+"\n        ")]):e("a-tag",{attrs:{color:"red"}},[t._v("\n          "+t._s(i.union_status_text)+"\n        ")])]}}])}),t.selectMode?t._e():e("a-table-column",{attrs:{title:"上/下架",width:"60px"},scopedSlots:t._u([{key:"default",fn:function(i){return[e("ISwitch",{attrs:{value:i.status,active:1,unactive:0},on:{change:function(e){return t.listedStatusChange(e,i)}}})]}}],null,!1,1077108743)}),e("a-table-column",{attrs:{title:"创建日期",width:"100px"},scopedSlots:t._u([{key:"default",fn:function(i){return[e("span",[t._v(t._s(t.$tool.showShortTime(i.created_at)))])]}}])}),t.selectMode?t._e():e("a-table-column",{attrs:{title:"操作",width:"180px"},scopedSlots:t._u([{key:"default",fn:function(i){return[e("span",[e("a",{attrs:{href:"javascript:;"},on:{click:function(e){return t.getPath(i)}}},[t._v("预览/路径")]),e("a-divider",{attrs:{type:"vertical"}}),e("a",{attrs:{href:"javascript:;"},on:{click:function(e){return t.handleEdit(i)}}},[t._v("编辑")]),e("a-divider",{attrs:{type:"vertical"}}),e("a",{attrs:{href:"javascript:;"},on:{click:function(e){return t.handleDelete(i)}}},[t._v("删除")])],1)]}}],null,!1,2471534683)})],1),e("a-modal",{staticStyle:{top:"100px"},attrs:{maskClosable:!1,title:(t.editUuid?"编辑":"创建")+t.resourceTypeText,visible:t.isEdit,width:"1000px",footer:null},on:{cancel:function(e){t.isEdit=!1}}},[t.isEdit?e("Edit",{attrs:{uuid:t.editUuid},on:{cancel:function(e){t.isEdit=!1},success:t.editSuccess}}):t._e()],1),t.isEditSku?e("EditSku",{attrs:{info:t.current},on:{refresh:t.fetchData,close:function(e){t.isEditSku=!1}}}):t._e(),t.isShowUserList?e("UserList",{attrs:{uuid:t.editUuid},on:{refresh:t.fetchData,close:function(e){t.isShowUserList=!1}}}):t._e()],1)},s=[],a=(i("8e6e"),i("ac6a"),i("456d"),i("ade3")),r=(i("c1df"),i("7cc6")),o=function(){var t=this,e=t._self._c;return e("div",{staticClass:"container"},[e("IForm",{staticClass:"form-container",attrs:{formFrame:t.frame,formData:t.form},on:{"update:formData":function(e){t.form=e},"update:form-data":function(e){t.form=e}}}),e("div",{staticStyle:{display:"flex","justify-content":"flex-end"},attrs:{slot:"action"},slot:"action"},[e("a-button",{staticClass:"btn",on:{click:t.cancel}},[t._v("取消")]),e("a-button",{staticClass:"btn",attrs:{type:"primary"},on:{click:t.submit}},[t._v("提交")])],1)],1)},c=[],u=i("b0a5");function l(t,e){var i=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),i.push.apply(i,n)}return i}function p(t){for(var e=1;e<arguments.length;e++){var i=null!=arguments[e]?arguments[e]:{};e%2?l(Object(i),!0).forEach((function(e){Object(a["a"])(t,e,i[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(i)):l(Object(i)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(i,e))}))}return t}var d="lotteries",f={components:{IForm:u["a"]},data:function(){return{form:{},categoryList:[]}},props:{uuid:{type:String}},computed:{categoryOptions:function(){return this.categoryList.map((function(t){return{title:t.title,value:t.id}}))},frame:function(){return[{title:"活动标题",key:"title",newline:!0,required:!0},{title:"副标题",key:"sub_title",placeholder:"例如: 直播中随机抽取10位幸运儿",newline:!0},{title:"参与码",key:"join_codes",tips:"选填。参与码可设置多个，可在公众号或微信群中发放给用户",type:"tags",newline:!0},{title:"封面",key:"thumb",type:"image",sizeLimit:200,isShowImageTips:!1,tips:"800*800",newline:!0,required:!0},{title:"详情图",key:"images",isShowImageTips:!1,tips:"宽度1000px，长图建议切成多张小图上传",type:"images",newline:!0},{type:"blank",newline:!0},{title:"开放参与时间",key:"start_at",type:"date",newline:!0,required:!0},{title:"价格",type:"mix_price",key_prefix:"",tips:"请尽量避免使用人民币抽奖，有违规的风险!",newline:!0},{type:"blank",newline:!0},{title:"奖品设置",type:"text",text:"创建后在列表中设置奖品"},{title:"开奖期数",key:"session_total",type:"number",default:1,newline:!0,required:!0,tips:"默认为开1期，如设置多期，每期结束后会自动开启下一期抽奖"},{title:"总库存",key:"stock",type:"number",newline:!0,required:!0,tips:"整个活动允许参与的总人数库存"},{title:"开奖设置",key:"emit_type",type:"radio",default:"time",options:[{title:"按时间开奖",value:"time"},{title:"按参与人数开奖",value:"user_total"},{title:"按抽奖码数量开奖",value:"ticket_total"}],newline:!0,tips:"如设置为多期开奖，则此处不能选择“按固定时间开奖“"},{title:"按时间开奖",prefix:"达到",suffix:"自动开奖",key:"emit_time",type:"date",newline:!0,required:!0,where:{emit_type:"time"}},{title:"按人数开奖",key:"emit_user_total",type:"number",prefix:"每期参与人数达到",suffix:"人自动开奖",tips:"每个用户参与抽奖后自动获得一个抽奖码，通过分享助力可获得更多抽奖码提高中奖概率",newline:!0,required:!0,where:{emit_type:"user_total"}},{title:"按抽奖码数量开奖",key:"emit_ticket_total",type:"number",prefix:"每期抽奖码数量达到",suffix:"个自动开奖",tips:"每个用户参与抽奖后自动获得一个抽奖码，通过分享助力可获得更多抽奖码提高中奖概率",newline:!0,required:!0,where:{emit_type:"ticket_total"}},{type:"blank"},{title:"绑定手机号",key:"is_need_phone",type:"boolean",tips:"开启后，用户参与活动前需要绑定手机号 （助力不受此限制）",newline:!0,required:!0},{title:"新用户助力",key:"new_user_reward_ticket",type:"number",default:2,prefix:"奖励",suffix:"个抽奖码",tips:"抽奖码是奖励给邀请人",newline:!0,required:!0},{title:"老用户助力",key:"old_user_reward_ticket",type:"number",default:1,prefix:"奖励",suffix:"个抽奖码",tips:"抽奖码是奖励给邀请人",newline:!0,required:!0},{title:"规则文字",key:"rule",type:"textarea",placeholder:"一行一个说明",newline:!0,tips:"不填则使用默认。 一行一个说明，不需要加序号。"}]}},created:function(){},mounted:function(){this.uuid=this.uuid||this.$route.params.uuid,this.initForm()},watch:{uuid:function(){this.initForm()}},methods:{initForm:function(){var t=this;this.uuid?this.$http("/".concat(d,"/").concat(this.uuid)).then((function(e){t.form=e.data.info})):this.form=this.$initForm(this.frame)},cancel:function(){this.uuid="",this.$emit("cancel")},create:function(){var t=this;this.$http.post("/".concat(d),p({},this.form)).then((function(e){t.$message.success("创建成功"),t.$emit("success")}))},update:function(){var t=this;this.$http.patch("/".concat(d,"/").concat(this.uuid),{type:"update",attributes:this.form}).then((function(e){t.$message.success("更新成功"),t.$emit("success")}))},submit:function(){this.uuid?this.update():this.create()}}},h=f,_=(i("4bd1"),i("2877")),y=Object(_["a"])(h,o,c,!1,null,"5428995c",null),m=y.exports,v=function(){var t=this,e=t._self._c;return e("a-modal",{staticStyle:{top:"100px"},attrs:{title:"编辑奖品",visible:!0,width:"1000px"},on:{cancel:t.handleCancel}},[e("div",{staticClass:"tips"},[t._v("\n    中奖奖品会发放到用户的盒柜仓库中\n  ")]),e("a-table",{staticClass:"product-table",attrs:{rowKey:function(t){return t.id},dataSource:t.list,bordered:"",pagination:!1,size:"small"}},[e("a-table-column",{attrs:{title:"序号",width:"20px"},scopedSlots:t._u([{key:"default",fn:function(i,n,s){return[e("div",[t._v(t._s(s+1))])]}}])}),e("a-table-column",{key:"thumb",attrs:{title:"图片",width:"80px"},scopedSlots:t._u([{key:"default",fn:function(i){return[e("div",{staticStyle:{display:"flex","align-items":"center"}},[e("img",{staticClass:"thumb",staticStyle:{"margin-right":"10px"},attrs:{src:i.thumb}}),e("div",[t._v("\n            "+t._s(i.title)+" "),e("br"),t._v("\n            "+t._s(i.number)+"\n          ")])])]}}])}),e("a-table-column",{key:"number",attrs:{title:"价值",width:"100px"},scopedSlots:t._u([{key:"default",fn:function(t){return[e("div",[e("PriceDisplay",{attrs:{info:t}})],1)]}}])}),e("a-table-column",{attrs:{title:"总库存",width:"50px"},scopedSlots:t._u([{key:"default",fn:function(i){return[e("span",[t._v("\n          "+t._s(i.stock)+"件\n          ")])]}}])}),e("a-table-column",{attrs:{title:"每期抽取",width:"50px"},scopedSlots:t._u([{key:"default",fn:function(i){return[e("span",[t._v("\n          "+t._s(i.per_session_stock)+"件\n          ")])]}}])}),e("a-table-column",{attrs:{title:"SKU类型",width:"80px"},scopedSlots:t._u([{key:"default",fn:function(t){return[e("ISkuType",{attrs:{info:t}})]}}])}),e("a-table-column",{attrs:{title:"操作",width:"80px"},scopedSlots:t._u([{key:"default",fn:function(i){return[e("a",{attrs:{href:"javascript:;"},on:{click:function(e){return t.handleEdit(i)}}},[t._v("编辑")]),e("a-divider",{attrs:{type:"vertical"}}),e("a",{attrs:{href:"javascript:;"},on:{click:function(e){return t.handleDelete(i)}}},[t._v("删除")])]}}])})],1),e("template",{slot:"footer"},[e("div",{staticClass:"btn-c"},[e("a-button",{staticClass:"add",attrs:{type:"primary"},on:{click:t.handleCreate}},[t._v("\n        新增一款\n      ")]),e("div",{staticStyle:{"flex-grow":"1"}}),e("a-button",{key:"back",on:{click:t.handleCancel}},[t._v("关闭")])],1)])],2)},k=[],b=i("7971"),g=i("c685");function w(t,e){var i=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),i.push.apply(i,n)}return i}function S(t){for(var e=1;e<arguments.length;e++){var i=null!=arguments[e]?arguments[e]:{};e%2?w(Object(i),!0).forEach((function(e){Object(a["a"])(t,e,i[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(i)):w(Object(i)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(i,e))}))}return t}var x={components:{UploadImages:b["a"],iSwitch:r["a"],ISkuType:g["a"]},props:{info:{type:Object,default:function(){return{}}}},data:function(){return{list:[],frame:[{title:"SKU类型",key:"sku_type",type:"radio",default:1,required:!0,options:[{title:"无绑定",value:1},{title:"绑定商城中的商品",value:2},{title:"平台虚拟资产",value:3}],tips:""},{title:"绑定商品",key:"product_id",type:"product_id",auto_fill_fields:{title:"title",thumb:"thumb",number:"number",money_price:"money_price",score_price:"score_price"},where:{sku_type:2}},{title:"绑定虚拟资产",key:"assets",type:"assets",where:{sku_type:3}},{title:"奖品名称",key:"title",required:!0,placeholder:'如"积分礼包1"'},{title:"编号",key:"number",placeholder:"填写编号方便在订单中对应货物"},{title:"封面",key:"thumb",type:"image",isShowImageTips:!1,required:!0,tips:"建议800*800，发放后会显示在中奖者的物品仓库中"},{title:"价值",key_prefix:"",type:"mix_price",tips:"价值用于返售时作为返售原价进行折扣计算",newline:!0,required:!0},{title:"总库存",key:"stock",type:"number",tips:"总库存应该大于等于 每期抽取数量 * 期数",suffix:"份",required:!0},{title:"每期抽取",key:"per_session_stock",type:"number",suffix:"份",required:!0}]}},watch:{uuid:function(){this.initList()}},created:function(){this.initList()},methods:{initList:function(){var t=this;this.$http.get("/lottery/skus",{params:{activity_id:this.info.id}}).then((function(e){t.list=e.data.list}))},handleCreate:function(){var t=this;this.$iForm.show({title:"新增活动奖品",frame:this.frame,success:function(e){t.$http.post("/lottery/skus",S({activity_id:t.info.id},e)).then((function(e){t.initList(),t.$iForm.hide()}))}})},handleEdit:function(t){var e=this;this.$iForm.show({title:"编辑活动奖品",frame:this.frame,form:t,success:function(i){e.$http.put("/lottery/skus/".concat(t.uuid),{type:"update",attributes:i}).then((function(t){e.initList(),e.$iForm.hide()}))}})},handleCancel:function(){this.$emit("refresh"),this.$emit("close")},handleSave:function(){this.$emit("refresh"),this.$emit("close")},handleDelete:function(t){var e=this;this.$confirm({title:"提示",content:"确认删除吗？",onOk:function(){e.$http.delete("/lottery/skus/".concat(t.uuid)).then((function(t){e.$message.success("删除成功"),e.initList()}))}})}}},O=x,j=(i("2f6e"),Object(_["a"])(O,v,k,!1,null,"31d79135",null)),D=j.exports,$=(i("7f7f"),function(){var t=this,e=t._self._c;return e("a-modal",{staticStyle:{top:"100px"},attrs:{title:"参与用户",visible:!0,width:"1100px"},on:{cancel:t.handleCancel}},[e("div",[e("div",{staticClass:"content-head",staticStyle:{"margin-bottom":"20px"}},[e("a-radio-group",{staticStyle:{"margin-right":"10px"},attrs:{buttonStyle:"solid"},model:{value:t.type,callback:function(e){t.type=e},expression:"type"}},[e("a-radio-button",{attrs:{value:"all"}},[t._v("全部("+t._s(t.total)+")")]),e("a-radio-button",{attrs:{value:"lucky"}},[t._v("已中奖")])],1),e("a-select",{staticStyle:{width:"100px","margin-left":"20px"},attrs:{placeholder:"选择期数",allowClear:""},model:{value:t.session,callback:function(e){t.session=e},expression:"session"}},[e("a-select-option",{attrs:{value:"current"}},[t._v("当期")]),e("a-select-option",{attrs:{value:"last"}},[t._v("上一期")]),e("a-select-option",{attrs:{value:"all"}},[t._v("所有期")])],1),e("a-input",{staticStyle:{width:"100px","margin-left":"10px"},attrs:{placeholder:"自定义期数"},model:{value:t.customSession,callback:function(e){t.customSession=e},expression:"customSession"}}),e("iDatePicker",{staticStyle:{"margin-left":"30px",float:"right"},attrs:{placeholder:"筛选参与时间"},model:{value:t.joinDay,callback:function(e){t.joinDay=e},expression:"joinDay"}})],1)]),e("a-table",{staticClass:"product-table table",attrs:{pagination:t.pagination,rowKey:function(t){return t.id},dataSource:t.list,bordered:"",size:"small"}},[e("a-table-column",{attrs:{title:"序号",width:"20px"},scopedSlots:t._u([{key:"default",fn:function(i,n,s){return[e("div",[t._v(t._s(s+1))])]}}])}),e("a-table-column",{key:"thumb",attrs:{title:"用户",width:"80px"},scopedSlots:t._u([{key:"default",fn:function(i){return[e("div",{staticClass:"user"},[e("img",{attrs:{src:i.user.headimg,alt:"用户头像"}}),e("span",[t._v(t._s(i.user.name))]),"ali"===i.user.client_type?e("a-tag",{staticStyle:{"margin-left":"10px"},attrs:{color:"red"}},[t._v("天猫用户")]):t._e()],1)]}}])}),e("a-table-column",{key:"number",attrs:{title:"参与期数",width:"40px"},scopedSlots:t._u([{key:"default",fn:function(i){return[e("span",[t._v("\n          第"+t._s(i.session)+"期\n          ")])]}}])}),e("a-table-column",{key:"number",attrs:{title:"签号数量",width:"50px"},scopedSlots:t._u([{key:"default",fn:function(i){return[e("span",[t._v("\n          "+t._s(i.tickets_count)+" 张\n          ")])]}}])}),e("a-table-column",{key:"number",attrs:{title:"助力次数",width:"50px"},scopedSlots:t._u([{key:"default",fn:function(i){return[e("span",[t._v("\n          "+t._s(i.invitees_count)+" 次\n          ")])]}}])}),e("a-table-column",{attrs:{title:"是否中奖",width:"40px"},scopedSlots:t._u([{key:"default",fn:function(i){return[i.is_lucky_user?e("span",[t._v(" 已中奖 ")]):e("span",[t._v(" - ")])]}}])}),e("a-table-column",{attrs:{title:"奖品",width:"100px"},scopedSlots:t._u([{key:"default",fn:function(i){return[i.lucky_ticket?e("div",[i.lucky_ticket.package_sku?e("span",[t._v("\n            【"+t._s(i.lucky_ticket.package_sku.sid)+"】\n            "+t._s(i.lucky_ticket.package_sku.title)+"\n          ")]):t._e()]):e("span",[t._v(" - ")])]}}])}),e("a-table-column",{attrs:{title:"参与时间",width:"50px"},scopedSlots:t._u([{key:"default",fn:function(i){return[e("span",[t._v("\n          "+t._s(i.created_at)+"\n          ")])]}}])})],1),e("template",{slot:"footer"},[e("div",{staticClass:"btn-c"},[e("div",{staticStyle:{"flex-grow":"1"}}),e("a-button",{key:"back",on:{click:t.handleCancel}},[t._v("关闭")])],1)])],2)}),C=[],P=i("e37f"),L={components:{UploadImages:b["a"],iSwitch:r["a"],IDatePicker:P["a"]},props:{uuid:{type:String,default:function(){return""}}},data:function(){return{list:[],type:"all",per_page:10,page:1,total:0,session:"current",customSession:"",joinDay:""}},watch:{uuid:function(){this.initList()},type:function(){this.page=1,this.initList()},session:function(){this.page=1,this.initList()},customSession:function(){this.page=1,this.initList()},joinDay:function(){this.page=1,this.initList()}},created:function(){this.initList()},computed:{pagination:function(){var t=this;return{defaultPageSize:this.per_page,defaultCurrent:this.page,total:this.total,onChange:function(e){console.log(e),t.page=e,t.initList()}}}},methods:{initList:function(){var t=this;this.$http.get("/lotteries/".concat(this.uuid,"/users"),{params:{type:this.type,page:this.page,session:this.customSession||this.session,join_day:this.joinDay,per_page:this.per_page}}).then((function(e){t.total=e.data.item_total,t.list=e.data.list}))},handleCancel:function(){this.$emit("refresh"),this.$emit("close")},handleSave:function(){this.$emit("refresh"),this.$emit("close")},handleDelete:function(t){var e=this;this.$http.delete("/activities/".concat(this.uuid,"/skus/").concat(t.uuid)).then((function(t){e.$message.success("删除成功"),e.initList()}))}}},E=L,U=(i("e574"),Object(_["a"])(E,$,C,!1,null,"6ff63158",null)),T=U.exports;function q(t,e){var i=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),i.push.apply(i,n)}return i}function I(t){for(var e=1;e<arguments.length;e++){var i=null!=arguments[e]?arguments[e]:{};e%2?q(Object(i),!0).forEach((function(e){Object(a["a"])(t,e,i[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(i)):q(Object(i)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(i,e))}))}return t}var F="lotteries",z="抽奖",M={components:{ISwitch:r["a"],Edit:m,EditSku:D,UserList:T},props:{selectMode:{type:Boolean},params:{type:Object},size:{type:String,default:"default"},type:{type:String,default:""}},data:function(){var t;return t={isEdit:!1,editUuid:"",current:{},isEditSku:!1,resourceTypeText:z,exportOptions:{status:"all",startTime:"",endTime:"",type:"normal"},status:"unexpired",list:[],page:1,per_page:10,total:0,key:"",category_id:void 0,isShowUserList:!1,statusList:[{text:"上架中",key:"on_stock"},{text:"已下架",key:"off_stock"},{text:"售罄",key:"sell_out"}]},Object(a["a"])(t,"status","on_stock"),Object(a["a"])(t,"statusTotal",{on_stock:0,off_stock:0,sell_out:0,marked:0}),t},watch:{params:function(){this.refreshData()},category_id:function(){this.refreshData()},type:function(){this.refreshData()},status:function(){this.page=1,this.refreshData()}},computed:{pagination:function(){var t=this;return{defaultPageSize:this.per_page,defaultCurrent:this.page,total:this.total,onChange:function(e){t.page=e.current,t.per_page=e.pageSize,t.fetchData()}}}},filters:{},created:function(){this.fetchData()},methods:{editSuccess:function(){this.fetchData(),this.editUuid||(this.status="off_stock")},fetchTotalData:function(){var t=this;this.$http("/status-total/activity/lottery").then((function(e){t.statusTotal=e.data.total}))},getPath:function(t){this.$getPathPopup.show({page:"/pages/lottery/detail",param:"uuid="+t.uuid})},handleCopy:function(t){var e=this;this.$confirm({title:"确认要复制吗?",content:"复制后将创建一个全新的未上架的活动，当前活动不爱影响",onOk:function(){e.$http.patch("/".concat(F,"/").concat(t.uuid),{type:"copy"}).then((function(t){e.$message.success("复制成功，请在“已下架”列表中编辑活动"),e.status="off_stock",e.fetchData()}))}})},handleDelete:function(t){var e=this;this.$confirm({title:"提示",content:"确认删除吗？",onOk:function(){e.$http.delete("/".concat(F,"/").concat(t.uuid)).then((function(t){e.fetchData()}))}})},updateItem:function(t,e){return this.$http.patch("/".concat(F,"/").concat(t.uuid),{type:"update",attributes:I({},e)})},showUserList:function(t){this.editUuid=t.uuid,this.isShowUserList=!0},listedStatusChange:function(t,e){var i=this;this.updateItem(e,{status:t}).then((function(t){i.fetchData()}))},handleEditListWeight:function(t){var e=this;this.$globalForm.show({title:"编辑排序",items:[{type:"number",key:"list_weight",title:"排序",default:t.list_weight,required:!0}],success:function(i){e.updateItem(t,I({},i)).then((function(t){e.$message.success("保存成功"),e.$globalForm.hide(),e.fetchData()}))}})},handleCreate:function(){this.editUuid="",this.isEdit=!0},handleEditSku:function(t){this.editUuid=t.uuid,this.current=t,this.isEditSku=!0},handleEdit:function(t){this.editUuid=t.uuid,this.isEdit=!0},refreshData:function(){this.page=1,this.key="",this.fetchData()},onSearch:function(t){this.page=1,this.fetchData()},fetchData:function(){var t=this;this.isEdit=!1,this.$http.get("/".concat(F),{params:I(I({status:this.status},this.params),{},{page:this.page,per_page:this.per_page,key:this.key,category_id:this.category_id})}).then((function(e){t.list=e.data.list,t.total=e.data.item_total})).finally((function(){t.fetchTotalData(),t.loading=!1}))},getCategoryList:function(){var t=this;this.$api.emit("category.list","article").then((function(e){t.category=e.data.list}))}}},K=M,J=(i("607c"),Object(_["a"])(K,n,s,!1,null,"678756e1",null));e["default"]=J.exports},b0a5:function(t,e,i){"use strict";var n=i("b6c9");e["a"]=n["a"]},c685:function(t,e,i){"use strict";var n=function(){var t=this,e=t._self._c;return e("div",[1===t.info.sku_type?e("span",[t._v("-")]):2===t.info.sku_type?e("div",[t._v("\n    商城商品\n    "),t.info.product?e("div",[t._v("\n      【"+t._s(t.info.product.title)+"】\n    ")]):t._e()]):3===t.info.sku_type?e("span",[t._v("虚拟资产")]):t._e()])},s=[],a={name:"ISwitch",props:{info:{type:Object,default:function(){return{}}}},data:function(){return{}},watch:{},methods:{}},r=a,o=i("2877"),c=Object(o["a"])(r,n,s,!1,null,"c7676646",null);e["a"]=c.exports},e574:function(t,e,i){"use strict";i("5ae1")},f3d8:function(t,e,i){}}]);