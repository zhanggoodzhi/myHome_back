webpackJsonp([6],{"QKq/":function(e,t){},md3T:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n={data:function(){var e=this;return{tableData:[],sheetVisible:!1,currentRow:null,actions:[{name:"删除",method:function(){e.handleDelete(e.currentRow._id)}}]}},created:function(){this.reload()},methods:{press:function(e){this.sheetVisible=!0,this.currentRow=e},handleDelete:function(e){var t=this;MessageBox.confirm("确定要删除该留言吗?").then(function(){t.$http.post("api/deleteUser",{id:e}).then(function(s){console.log("删除成功",e),t.reload(),Toast({message:s.body.message})},function(e){Toast({message:"出现错误"})})})},reload:function(){var e=this;this.$http.get("api/getUsers").then(function(t){e.tableData=t.body})}}},a={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"router-content user"},[s("mt-cell",{staticClass:"list-header",attrs:{title:"用户名",value:"昵称"}}),e._v(" "),s("ul",{staticClass:"scroll-wrap"},e._l(e.tableData,function(t,n){return s("li",{directives:[{name:"finger",rawName:"v-finger:long-tap",value:e.press.bind(this,t),expression:"press.bind(this,item)",arg:"long-tap"}],key:n,staticClass:"item"},[s("mt-cell",{attrs:{title:t.account,value:t.alias}})],1)})),e._v(" "),s("mt-actionsheet",{attrs:{actions:e.actions},model:{value:e.sheetVisible,callback:function(t){e.sheetVisible=t},expression:"sheetVisible"}})],1)},staticRenderFns:[]};var i=s("VU/8")(n,a,!1,function(e){s("QKq/")},null,null);t.default=i.exports}});
//# sourceMappingURL=user.6.a2608d88252ab9585221.js.map