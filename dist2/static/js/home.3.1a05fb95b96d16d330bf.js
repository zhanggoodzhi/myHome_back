webpackJsonp([3],{KR8f:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s={render:function(){var t=this.$createElement,e=this._self._c||t;return e("ul",this._l(this.logs,function(t,n){return e("li",{key:n,staticClass:"item"},[e("mt-cell",{attrs:{title:t.text,label:t.date}})],1)}))},staticRenderFns:[]};var i=n("VU/8")({data:function(){return{logs:""}},created:function(){var t=this;this.$http.get("api/getLogs").then(function(e){t.logs=e.body.reverse()})}},s,!1,function(t){n("mFjv")},null,null);e.default=i.exports},mFjv:function(t,e){}});
//# sourceMappingURL=home.3.1a05fb95b96d16d330bf.js.map