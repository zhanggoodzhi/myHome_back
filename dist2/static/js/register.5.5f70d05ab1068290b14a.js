webpackJsonp([5],{bqOp:function(e,s,t){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var a=t("mvHQ"),o=t.n(a),c=t("fZjL"),n=t.n(c),l=t("Au9i"),i={data:function(){return{account:"",alias:"",psd:"",rePsd:""}},methods:{onCreate:function(){var e=this;if(""!==this.account)if(""!==this.alias)if(""!==this.psd)if(""!==this.rePsd)if(this.rePsd===this.psd){var s={account:this.account,alias:this.alias,psd:this.psd};this.$http.post("account/register",s).then(function(s){if(s.body.success){Object(l.Toast)({message:s.body.message});var t={};n()(s.body).forEach(function(e){"message"!==e&&"success"!==e&&(t[e]=s.body[e])}),window.localStorage.setItem("authData",o()(t)),e.$router.push("/home")}else Object(l.Toast)({message:s.body.message})},function(e){Object(l.Toast)({message:"出现错误"})})}else Object(l.Toast)({message:"两次输入密码不一致"});else Object(l.Toast)({message:"请再次输入密码"});else Object(l.Toast)({message:"请输入密码"});else Object(l.Toast)({message:"请输入昵称"});else Object(l.Toast)({message:"请输入用户名"})}}},r={render:function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("div",{staticClass:"page-wrap"},[t("mt-field",{attrs:{label:"用户名",placeholder:"请输入用户名"},model:{value:e.account,callback:function(s){e.account=s},expression:"account"}}),e._v(" "),t("mt-field",{attrs:{label:"昵称",placeholder:"请输入昵称"},model:{value:e.alias,callback:function(s){e.alias=s},expression:"alias"}}),e._v(" "),t("mt-field",{attrs:{label:"密码",placeholder:"请输入密码",type:"password"},model:{value:e.psd,callback:function(s){e.psd=s},expression:"psd"}}),e._v(" "),t("mt-field",{attrs:{label:"确认密码",placeholder:"请再次输入密码",type:"password"},nativeOn:{keyup:function(s){if(!("button"in s)&&e._k(s.keyCode,"enter",13,s.key))return null;e.onCreate(s)}},model:{value:e.rePsd,callback:function(s){e.rePsd=s},expression:"rePsd"}}),e._v(" "),t("mt-button",{staticClass:"button",attrs:{type:"primary"},on:{click:e.onCreate}},[e._v("注册并登录")])],1)},staticRenderFns:[]};var d=t("VU/8")(i,r,!1,function(e){t("lThq")},"data-v-135d4f90",null);s.default=d.exports},lThq:function(e,s){}});
//# sourceMappingURL=register.5.5f70d05ab1068290b14a.js.map