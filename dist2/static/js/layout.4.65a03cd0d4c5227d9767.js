webpackJsonp([4],{"48gm":function(t,e){},"6f/g":function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=i("XH5V"),s=(i("Au9i"),{data:function(){return{alias:"",popupVisible:!1,headerTitle:""}},created:function(){var t=localStorage.getItem("authData");t?this.alias=JSON.parse(t).alias:this.$router.replace("/login")},beforeRouteEnter:function(t,e,i){i(function(e){e.headerTitle=t.meta.name})},beforeRouteUpdate:function(t,e,i){this.headerTitle=t.meta.name,i()},methods:{onLogout:function(){localStorage.setItem("authData",""),this.$router.replace("/login")},closePopup:function(){this.popupVisible=!1}},computed:{isAdmin:function(){return Object(a.a)()&&Object(a.a)().ifAdmin}}}),n={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"page"},[i("mt-popup",{attrs:{position:"left"},model:{value:t.popupVisible,callback:function(e){t.popupVisible=e},expression:"popupVisible"}},[i("div",{staticClass:"menu-wrap"},[i("div",{staticClass:"head"},[i("img",{staticClass:"gicon",attrs:{src:"/static/logo.jpg"}}),t._v(" "),i("span",{staticClass:"account"},[t._v(t._s(this.alias))])]),t._v(" "),i("div",{staticClass:"menu",on:{click:t.closePopup}},[i("div",{staticClass:"menu-item"},[i("mt-cell",{attrs:{title:"首页","is-link":"",to:"home"}})],1),t._v(" "),i("div",{staticClass:"menu-item"},[i("mt-cell",{attrs:{title:"留言","is-link":"",to:"note"}})],1),t._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:t.isAdmin,expression:"isAdmin"}],staticClass:"menu-item"},[i("mt-cell",{attrs:{title:"用户管理","is-link":"",to:"user"}})],1)]),t._v(" "),i("div",{staticClass:"exit"},[i("mt-button",{attrs:{type:"danger",plain:"",size:"small"},on:{click:t.onLogout}},[t._v("退出")])],1)])]),t._v(" "),i("mt-header",{attrs:{title:t.headerTitle}},[i("mt-button",{attrs:{slot:"left"},on:{click:function(e){t.popupVisible=!t.popupVisible}},slot:"left"},[i("i",{staticClass:"iconfont aicon-other menu-btn"})])],1),t._v(" "),i("div",{staticClass:"main"},[i("transition",{attrs:{name:"slide","enter-active-class":"animated bounceInLeft","leave-active-class":"animated bounceOutRight",mode:"out-in"}},[i("router-view")],1)],1)],1)},staticRenderFns:[]};var o=i("VU/8")(s,n,!1,function(t){i("48gm")},"data-v-53e0d1a7",null);e.default=o.exports}});
//# sourceMappingURL=layout.4.65a03cd0d4c5227d9767.js.map