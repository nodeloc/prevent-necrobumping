module.exports=function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=8)}([function(e,t){e.exports=flarum.core.compat.Component},function(e,t){e.exports=flarum.core.compat.extend},function(e,t){e.exports=flarum.core.compat["components/ReplyComposer"]},function(e,t){e.exports=flarum.core.compat["components/TextEditor"]},,,,,function(e,t,n){"use strict";n.r(t);var r=n(1),o=n(3),i=n.n(o),a=n(2),p=n.n(a);var c=n(0),u=function(e){var t,n;function r(){return e.apply(this,arguments)||this}n=e,(t=r).prototype=Object.create(n.prototype),t.prototype.constructor=t,t.__proto__=n;var o=r.prototype;return o.config=function(e){e||this.props.disable(!0)},o.view=function(){var e=app.data["fof-prevent-necrobumping.message.title"],t=app.data["fof-prevent-necrobumping.message.description"],n=app.data["fof-prevent-necrobumping.message.agreement"],r=moment.duration(this.props.days,"days").humanize();return m("div",null,m("div",{className:"Alert"},m("span",{className:"Alert-body"},m("h4",null,e&&e.replace(/\[time]/i,r)||app.translator.trans("fof-prevent-necrobumping.forum.composer.warning.title",{time:r})),m("p",null,t||app.translator.trans("fof-prevent-necrobumping.forum.composer.warning.description")),m("label",null,m("input",{type:"checkbox",onchange:this.onchange.bind(this)}),n||app.translator.trans("fof-prevent-necrobumping.forum.composer.warning.checkbox_label")))))},o.onchange=function(){this.checked=!this.checked,this.props.set(this.checked),this.props.disable(!this.checked)},r}(n.n(c).a);app.initializers.add("fof/prevent-necrobumping",function(){Object(r.extend)(i.a.prototype,"view",function(e){var t=e.children.find(function(e){return"textarea"===e.tag});this.disabled?t.attrs.disabled=!0:delete t.attrs.disabled}),Object(r.extend)(p.a.prototype,"headerItems",function(e){var t=this,n=Number(app.data["fof-prevent-necrobumping.days"]);Date.now()-this.props.discussion.lastPostedAt().getTime()<864e5*n||e.add("fof-necrobumping",u.component({days:n,editor:this.editor,set:function(e){return t.fofNecrobumping=e},disable:function(e){return t.editor.disabled=e}}))}),Object(r.extend)(p.a.prototype,"data",function(e){e["fof-necrobumping"]=this.fofNecrobumping})})}]);
//# sourceMappingURL=forum.js.map