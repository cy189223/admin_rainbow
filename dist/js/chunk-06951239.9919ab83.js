(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-06951239"],{"0813":function(t,e,a){"use strict";a("375c")},"280f":function(t,e,a){"use strict";a("5363")},3029:function(t,e,a){"use strict";a("7f7f");var s=function(){var t=this,e=t._self._c;return e("div",{staticClass:"multi-k-v-input"},[t._l(t.listdata,(function(a,s){return e("div",{key:s,staticClass:"k-v-item"},[e("a-input",{staticClass:"input",attrs:{placeholder:"属性"},on:{change:t.updateValue},model:{value:a[t.options.name?t.options.name:"name"],callback:function(e){t.$set(a,t.options.name?t.options.name:"name",e)},expression:"item[options.name ? options.name : 'name']"}}),e("a-input",{staticClass:"input",attrs:{placeholder:"值"},on:{change:t.updateValue},model:{value:a[t.options.value?t.options.value:"value"],callback:function(e){t.$set(a,t.options.value?t.options.value:"value",e)},expression:"item[options.value ? options.value : 'value']"}}),e("a-button",{staticClass:"button",attrs:{size:"small",icon:"plus"},on:{click:function(e){return t.handlePlus(s)}}}),e("a-button",{staticClass:"button",attrs:{size:"small",icon:"delete"},on:{click:function(e){return t.handleDelete(s)}}})],1)})),e("a-button",{attrs:{icon:"plus"},on:{click:function(e){return t.handlePlus(t.listdata.length-1)}}},[t._v("添加一行")])],2)},l=[],i={name:"MultiKVInput",props:{value:{type:Array,default:function(){return[]}},options:{type:Object,default:function(){return{name:"name",value:"value"}}}},data:function(){return{listdata:[]}},watch:{value:{handler:function(t){t&&(this.listdata=JSON.parse(JSON.stringify(t)))},immediate:!0,deep:!0}},methods:{updateValue:function(){this.$emit("input",this.listdata)},handlePlus:function(t){var e={};e[this.options.name?this.options.name:"name"]="",e[this.options.value?this.options.value:"name"]="",this.listdata.splice(t+1,0,e)},handleDelete:function(t){this.listdata.splice(t,1),this.updateValue()}}},r=i,n=(a("0813"),a("2877")),o=Object(n["a"])(r,s,l,!1,null,"6badcddc",null);e["a"]=o.exports},"375c":function(t,e,a){},5363:function(t,e,a){},"92dd":function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t._self._c;return e("div",{staticClass:"content-wrap"},[e("a-spin",{attrs:{spinning:t.loading}},[e("div",{staticClass:"content"},[e("div",{staticClass:"side-left"},[e("div",{staticClass:"item",class:{active:0===t.current},on:{click:function(e){return t.currentChange(0)}}},[t._v("基本信息")]),e("div",{staticClass:"item",class:{active:1===t.current},on:{click:function(e){return t.currentChange(1)}}},[t._v("商品SKU")]),e("div",{staticClass:"item",class:{active:2===t.current},on:{click:function(e){return t.currentChange(2)}}},[t._v("商品详情")]),e("div",{staticStyle:{"text-align":"center",margin:"100px auto"}},[e("a-button",{attrs:{type:"primary"},on:{click:t.handleRelease}},[t._v("发布商品")])],1)]),e("div",{staticClass:"side-right"},[e("div",{staticClass:"base-content"},[0==t.current?[e("a-form",[e("a-form-item",{attrs:{label:"标题(必填)","label-col":{span:3},"wrapper-col":{span:12}}},[e("a-input",{staticStyle:{width:"400px"},attrs:{placeholder:"请输入",allowClear:""},model:{value:t.form.title,callback:function(e){t.$set(t.form,"title",e)},expression:"form.title"}})],1),e("a-form-item",{attrs:{label:"搜索关键词","label-col":{span:3},"wrapper-col":{span:12}}},[e("a-input",{staticStyle:{width:"400px"},attrs:{placeholder:"请输入",allowClear:""},model:{value:t.form.search_key,callback:function(e){t.$set(t.form,"search_key",e)},expression:"form.search_key"}}),e("div",{staticClass:"tips"},[t._v("搜索关键词用于搜索时匹配，每个关键词可用空格隔开，60字以内")])],1),e("a-form-item",{attrs:{label:"封面图(必填)","label-col":{span:3},"wrapper-col":{span:12}}},[e("UploadImages",{attrs:{tips:"建议尺寸: 480*480",size:"small"},model:{value:t.form.thumb,callback:function(e){t.$set(t.form,"thumb",e)},expression:"form.thumb"}})],1),e("a-form-item",{attrs:{label:"轮播图(必填)","label-col":{span:3},"wrapper-col":{span:12}}},[e("UploadImages",{attrs:{multiple:"",tips:"建议尺寸: 960*960",size:"small"},model:{value:t.form.images,callback:function(e){t.$set(t.form,"images",e)},expression:"form.images"}})],1),e("a-form-item",{attrs:{label:"编号","label-col":{span:3},"wrapper-col":{span:12}}},[e("a-input",{staticStyle:{width:"400px"},attrs:{placeholder:"请输入",allowClear:""},model:{value:t.form.number,callback:function(e){t.$set(t.form,"number",e)},expression:"form.number"}})],1),e("a-form-item",{attrs:{label:"划线价(人民币)","label-col":{span:3},"wrapper-col":{span:12}}},[e("PriceInput",{staticStyle:{width:"400px"},attrs:{placeholder:"请输入",allowClear:""},model:{value:t.form.line_money_price,callback:function(e){t.$set(t.form,"line_money_price",e)},expression:"form.line_money_price"}})],1),e("a-form-item",{attrs:{label:"售价(人民币)","label-col":{span:3},"wrapper-col":{span:12}}},[e("PriceInput",{staticStyle:{width:"400px"},attrs:{placeholder:"请输入",allowClear:""},model:{value:t.form.money_price,callback:function(e){t.$set(t.form,"money_price",e)},expression:"form.money_price"}})],1),e("a-form-item",{attrs:{label:"售价(积分)","label-col":{span:3},"wrapper-col":{span:12}}},[e("a-input",{staticStyle:{width:"400px"},attrs:{placeholder:"请输入",allowClear:""},model:{value:t.form.score_price,callback:function(e){t.$set(t.form,"score_price",e)},expression:"form.score_price"}})],1),e("a-form-item",{attrs:{label:"所属IP/分类","label-col":{span:3},"wrapper-col":{span:12}}},[e("a-select",{staticStyle:{width:"400px"},attrs:{mode:"multiple",placeholder:"请选择",allowClear:""},model:{value:t.form.category_ids,callback:function(e){t.$set(t.form,"category_ids",e)},expression:"form.category_ids"}},[t._l(t.allCategoryList,(function(a){return[e("a-select-opt-group",{key:a.id},[e("span",{attrs:{slot:"label"},slot:"label"},[t._v(t._s(a.title))]),t._l(a.sub_categories,(function(a){return e("a-select-option",{key:a.id,attrs:{value:a.id}},[t._v(t._s(a.title))])}))],2)]}))],2)],1),e("a-form-item",{attrs:{label:"标签","label-col":{span:3},"wrapper-col":{span:12}}},[e("div",{staticClass:"attr-item"},[e("div",{staticClass:"attr-item-value"},[e("Labels",{model:{value:t.form.tags,callback:function(e){t.$set(t.form,"tags",e)},expression:"form.tags"}})],1)])]),e("a-form-item",{attrs:{label:"备注(仅后台可见)","label-col":{span:3},"wrapper-col":{span:18}}},[e("a-input",{attrs:{placeholder:"选填"},model:{value:t.form.remark,callback:function(e){t.$set(t.form,"remark",e)},expression:"form.remark"}})],1),e("a-form-item",{attrs:{label:"是否预售","label-col":{span:3},"wrapper-col":{span:12}}},[e("ISwitch",{attrs:{active:1,unactive:0},model:{value:t.form.is_presell,callback:function(e){t.$set(t.form,"is_presell",e)},expression:"form.is_presell"}}),t.form.is_presell?e("iDatePicker",{staticStyle:{"margin-left":"30px"},attrs:{showTime:""},model:{value:t.form.presell_date,callback:function(e){t.$set(t.form,"presell_date",e)},expression:"form.presell_date"}}):t._e()],1),t.form.is_presell?e("a-form-item",{attrs:{label:"预售前是否开放购买","label-col":{span:3},"wrapper-col":{span:12}}},[e("ISwitch",{attrs:{active:1,unactive:0},model:{value:t.form.presell_mode,callback:function(e){t.$set(t.form,"presell_mode",e)},expression:"form.presell_mode"}}),e("div",{staticClass:"tips"},[t._v("默认为关闭，即倒计时结束前仅可浏览信息，不可购买。")])],1):t._e(),e("a-form-item",{attrs:{label:"要求填写收货地址","label-col":{span:3},"wrapper-col":{span:12}}},[e("ISwitch",{attrs:{active:1,unactive:0},model:{value:t.form.is_need_address,callback:function(e){t.$set(t.form,"is_need_address",e)},expression:"form.is_need_address"}})],1),e("a-form-item",{attrs:{label:"运费类型","label-col":{span:3},"wrapper-col":{span:12}}},[e("a-radio-group",{staticStyle:{"margin-top":"4px"},attrs:{name:"radioGroup"},model:{value:t.form.carriage_type,callback:function(e){t.$set(t.form,"carriage_type",e)},expression:"form.carriage_type"}},[e("a-radio",{attrs:{value:0}},[t._v("按统一设置")]),e("a-radio",{attrs:{value:1}},[t._v("包邮")]),e("a-radio",{attrs:{value:2}},[t._v("到付")]),e("a-radio",{attrs:{value:3}},[t._v("单独设置")])],1),3===t.form.carriage_type?[e("IPrice",{attrs:{placeholder:"输入运费"},model:{value:t.form.carriage,callback:function(e){t.$set(t.form,"carriage",e)},expression:"form.carriage"}}),t._v(" 元\n                 ")]:t._e(),e("div",{staticClass:"tips"},[t._v("统一设置见“系统设置 -> 订单设置”")])],2),e("a-form-item",{attrs:{label:"可线下核销","label-col":{span:3},"wrapper-col":{span:12}}},[e("ISwitch",{attrs:{active:1,unactive:0},model:{value:t.form.is_offline_useable,callback:function(e){t.$set(t.form,"is_offline_useable",e)},expression:"form.is_offline_useable"}})],1),e("a-form-item",{attrs:{label:"是否上架","label-col":{span:3},"wrapper-col":{span:12}}},[e("ISwitch",{attrs:{active:1,unactive:0},model:{value:t.form.status,callback:function(e){t.$set(t.form,"status",e)},expression:"form.status"}})],1)],1)]:t._e(),1==t.current?[e("a-form",[e("div",{staticClass:"sub-item-title"},[t._v("SKU属性")]),e("a-form-item",{attrs:{label:"SKU属性","label-col":{span:0},"wrapper-col":{span:24}}},[t._l(t.form.sku_attrs,(function(a,s){return e("div",{key:s,staticClass:"attr-item"},[e("div",{staticClass:"number-index"},[t._v("属性"+t._s(s+1))]),e("a-input",{ref:"input"+s,refInFor:!0,staticClass:"key",attrs:{placeholder:"标题,如颜色"},model:{value:a.key,callback:function(e){t.$set(a,"key",e)},expression:"item.key"}}),e("div",{staticClass:"attr-item-value"},[e("Labels",{model:{value:a.value,callback:function(e){t.$set(a,"value",e)},expression:"item.value"}}),e("a-button",{staticClass:"button",attrs:{icon:"delete",type:"dashed"},on:{click:function(e){return t.handleSubAttrs(s)}}})],1)],1)})),e("a-button",{attrs:{icon:"plus"},on:{click:t.handlePlusAttrs}},[t._v("添加一行")])],2),e("div",{staticClass:"sub-item-title"},[t._v("SKU库存")]),e("a-form-item",{attrs:{label:"SKU","label-col":{span:0},"wrapper-col":{span:12}}},[e("div",{staticClass:"attrs-table"},[e("div",{staticClass:"tr tr-header"},[e("div",{staticClass:"cell"},[t._v("商品规格")]),e("div",{staticClass:"cell"},[t._v("图片")]),e("div",{staticClass:"cell"},[t._v("编号")]),e("div",{staticClass:"cell"},[e("a-popover",{attrs:{title:"批量修改价格",trigger:"click"}},[e("template",{slot:"content"},[e("div",{staticStyle:{display:"flex"}},[e("a-input",{staticStyle:{"margin-right":"10px",width:"120px"},attrs:{placeholder:"请输入",autofocus:"",size:"small"},model:{value:t.fillPrice,callback:function(e){t.fillPrice=e},expression:"fillPrice"}}),e("a-button",{attrs:{type:"primary",size:"small"},on:{click:t.handleSetAllPrice}},[t._v("填充")])],1)]),e("span",[t._v("价格(人民币)\n                          "),e("a-icon",{attrs:{type:"edit"}})],1)],2)],1),e("div",{staticClass:"cell"},[e("a-popover",{attrs:{title:"批量修改价格",trigger:"click"}},[e("template",{slot:"content"},[e("div",{staticStyle:{display:"flex"}},[e("a-input",{staticStyle:{"margin-right":"10px",width:"120px"},attrs:{placeholder:"请输入",autofocus:"",size:"small"},model:{value:t.fillScorePrice,callback:function(e){t.fillScorePrice=e},expression:"fillScorePrice"}}),e("a-button",{attrs:{type:"primary",size:"small"},on:{click:t.handleSetAllScorePrice}},[t._v("填充")])],1)]),e("span",[t._v("价格(积分)\n                          "),e("a-icon",{attrs:{type:"edit"}})],1)],2)],1),e("div",{staticClass:"cell"},[e("a-popover",{attrs:{title:"填充库存",trigger:"click"}},[e("template",{slot:"content"},[e("div",{staticStyle:{display:"flex"}},[e("a-input",{staticStyle:{"margin-right":"10px",width:"120px"},attrs:{placeholder:"请输入",autofocus:"",size:"small"},model:{value:t.fillStock,callback:function(e){t.fillStock=e},expression:"fillStock"}}),e("a-button",{attrs:{type:"primary",size:"small"},on:{click:t.handleSetAllStock}},[t._v("填充")])],1)]),e("span",[t._v("库存\n                          "),e("a-icon",{attrs:{type:"edit"}})],1)],2)],1),e("div",{staticClass:"cell"},[t._v("是否上架")])]),t._l(t.skus,(function(a,s){return e("div",{key:s,staticClass:"tr"},[e("div",{staticClass:"cell text-value"},[t._v(t._s(t.getAttrs(a.attrs)))]),e("div",{staticClass:"cell"},[e("UploadImages",{attrs:{isShowTips:!1,size:"small"},model:{value:a.thumb,callback:function(e){t.$set(a,"thumb",e)},expression:"item.thumb"}})],1),e("div",{staticClass:"cell"},[e("a-input",{attrs:{placeholder:"编号"},model:{value:a.number,callback:function(e){t.$set(a,"number",e)},expression:"item.number"}})],1),e("div",{staticClass:"cell"},[e("a-input",{attrs:{placeholder:"人民币价"},model:{value:a.money_price,callback:function(e){t.$set(a,"money_price",e)},expression:"item.money_price"}})],1),e("div",{staticClass:"cell"},[e("a-input",{attrs:{placeholder:"积分价"},model:{value:a.score_price,callback:function(e){t.$set(a,"score_price",e)},expression:"item.score_price"}})],1),e("div",{staticClass:"cell"},[e("a-input",{attrs:{placeholder:"库存"},model:{value:a.stock,callback:function(e){t.$set(a,"stock",e)},expression:"item.stock"}})],1),e("div",{staticClass:"cell"},[e("ISwitch",{attrs:{active:1,unactive:0},model:{value:a.status,callback:function(e){t.$set(a,"status",e)},expression:"item.status"}})],1)])}))],2)])],1)]:t._e(),2===t.current?[e("IPage",{model:{value:t.form.page,callback:function(e){t.$set(t.form,"page",e)},expression:"form.page"}})]:t._e()],2)])])])],1)},l=[],i=(a("8e6e"),a("456d"),a("28a5"),a("ade3")),r=(a("ac6a"),a("2909")),n=a("7971"),o=a("3029"),c=a("dd08"),u=a("b699"),p=a("e37f"),m=a("a9c4"),f=a("7cc6");function d(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(t);e&&(s=s.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,s)}return a}function v(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?d(Object(a),!0).forEach((function(e){Object(i["a"])(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):d(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}var h={name:"ReleaseProduct",components:{UploadImages:n["a"],MultiKVInput:o["a"],Labels:u["a"],IPage:m["a"],ISwitch:f["a"],PriceInput:c["a"],IDatePicker:p["a"],IPrice:c["a"]},data:function(){return{current:0,categoryList:[],ipList:[],brands:[],shops:[],carriageList:[],form:{title:"",search_key:"",thumb:"",number:"",images:[],ean:"",category_ids:void 0,brand_id:void 0,tags:[],normal_attrs:[],sku_attrs:[],page:{modules:[],style:{}},is_need_address:1,is_offline_useable:1,is_free_carriage:0,is_presell:0,presell_mode:0,presell_date:"",remark:"",status:0,carriage_type:0,carriage:0,carriage_template_id:void 0},skus:[],currentInput:0,inputValue:"",inputVisible:!1,valueKey:"__",attrKey:"###",loading:!1,push:!1,attrsError:!1,fillPrice:0,fillScorePrice:"",fillStock:""}},created:function(){this.getCategoryList()},computed:{allCategoryList:function(){return[{id:0,title:"所有IP",sub_categories:this.ipList}].concat(Object(r["a"])(this.categoryList))}},watch:{"form.sku_attrs":{handler:function(t){var e=this.attrToString(t);this.createSkus(e)},deep:!0}},methods:{handleSetAllPrice:function(){var t=this;this.skus.forEach((function(e){e.money_price=t.fillPrice}))},handleSetAllScorePrice:function(){var t=this;this.skus.forEach((function(e){e.score_price=t.fillScorePrice}))},handleSetAllStock:function(){var t=this;this.skus.forEach((function(e){e.stock=t.fillStock}))},handleRelease:function(){var t=this;if(!this.form.title||!this.form.thumb)return this.$warning({title:"提示",content:"标题或封面图不能为空"}),this.push=!0,void(this.current=0);if(0!==this.skus.length){for(var e=JSON.parse(JSON.stringify(this.skus)),a=0;a<this.skus.length;a++){if(""===this.skus[a].stock)return this.$info({title:"提示",content:"商品SKU库存不能为空"}),void(this.current=1);if(""===this.skus[a].money_price&&""===this.skus[a].score_price)return this.$info({title:"提示",content:"商品SKU人民币和积分价最少需要填1个"}),void(this.current=1);e[a].money_price=100*this.skus[a].money_price}var s=v(v({},this.form),{},{skus:e});this.loading=!0,this.$api.emit("product.store",s).then((function(e){t.$notification.success({message:"提示",description:"商品发布成功"}),t.$router.push({name:"productList"})})).finally((function(){t.loading=!1}))}else this.$warning({title:"提示",content:"商品属性下的SKU属性不能为空"})},getAttrs:function(t){var e=[];return t.forEach((function(t){e.push(t.value)})),e.join("，")},createSkus:function(t){var e=this,a=[];t.forEach((function(t){var s=t.split(e.attrKey),l={thumb:"",number:"",money_price:"",score_price:"",stock:"",status:1,attrs:[]};s.forEach((function(t){var a=t.split(e.valueKey);l.attrs.push({key:a[0],value:a[1]})})),a.push(l)})),this.skus=a},attrToString:function(t){var e=this,a=t.filter((function(t){return t.value.length}));return a.reduce((function(t,a,s){var l=a.value.map((function(t){return a.key+e.valueKey+t}));if(t.length){for(var i=[],r=l.length,n=0;n<t.length;n++)for(var o=0;o<r;o++)i.push(t[n]+e.attrKey+l[o]);return i}return l}),[])},handlePlusAttrs:function(){this.form.sku_attrs.length>=3?this.$info({title:"提示",content:"最多添加三行"}):this.form.sku_attrs.push({key:"",value:[]})},handleSubAttrs:function(t){this.form.sku_attrs.splice(t,1)},currentChange:function(t){this.current=t},getCategoryList:function(){var t=this;this.$http("/normal/categories","GET").then((function(e){t.categoryList=e.data.list})),this.$http("/ip/categories","GET").then((function(e){t.ipList=e.data.list}))}}},b=h,_=(a("280f"),a("2877")),k=Object(_["a"])(b,s,l,!1,null,"b93e5740",null);e["default"]=k.exports}}]);