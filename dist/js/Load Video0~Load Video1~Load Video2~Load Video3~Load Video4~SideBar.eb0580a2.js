(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["Load Video0~Load Video1~Load Video2~Load Video3~Load Video4~SideBar"],{"0fd9":function(t,e,i){"use strict";i("99af"),i("4160"),i("caad"),i("13d5"),i("4ec9"),i("b64b"),i("d3b7"),i("ac1f"),i("2532"),i("3ca3"),i("5319"),i("159b"),i("ddb0");var n=i("ade3"),s=i("5530"),a=(i("4b85"),i("2b0e")),r=i("d9f7"),l=i("80d2"),o=["sm","md","lg","xl"],c=["start","end","center"];function u(t,e){return o.reduce((function(i,n){return i[t+Object(l["E"])(n)]=e(),i}),{})}var d=function(t){return[].concat(c,["baseline","stretch"]).includes(t)},h=u("align",(function(){return{type:String,default:null,validator:d}})),f=function(t){return[].concat(c,["space-between","space-around"]).includes(t)},v=u("justify",(function(){return{type:String,default:null,validator:f}})),p=function(t){return[].concat(c,["space-between","space-around","stretch"]).includes(t)},m=u("alignContent",(function(){return{type:String,default:null,validator:p}})),g={align:Object.keys(h),justify:Object.keys(v),alignContent:Object.keys(m)},b={align:"align",justify:"justify",alignContent:"align-content"};function y(t,e,i){var n=b[t];if(null!=i){if(e){var s=e.replace(t,"");n+="-".concat(s)}return n+="-".concat(i),n.toLowerCase()}}var O=new Map;e["a"]=a["a"].extend({name:"v-row",functional:!0,props:Object(s["a"])(Object(s["a"])(Object(s["a"])({tag:{type:String,default:"div"},dense:Boolean,noGutters:Boolean,align:{type:String,default:null,validator:d}},h),{},{justify:{type:String,default:null,validator:f}},v),{},{alignContent:{type:String,default:null,validator:p}},m),render:function(t,e){var i=e.props,s=e.data,a=e.children,l="";for(var o in i)l+=String(i[o]);var c=O.get(l);return c||function(){var t,e;for(e in c=[],g)g[e].forEach((function(t){var n=i[t],s=y(e,t,n);s&&c.push(s)}));c.push((t={"no-gutters":i.noGutters,"row--dense":i.dense},Object(n["a"])(t,"align-".concat(i.align),i.align),Object(n["a"])(t,"justify-".concat(i.justify),i.justify),Object(n["a"])(t,"align-content-".concat(i.alignContent),i.alignContent),t)),O.set(l,c)}(),t(i.tag,Object(r["a"])(s,{staticClass:"row",class:c}),a)}})},"166a":function(t,e,i){},1800:function(t,e,i){"use strict";i("4de4");var n=i("2b0e");e["a"]=n["a"].extend({name:"v-list-item-action",functional:!0,render:function(t,e){var i=e.data,n=e.children,s=void 0===n?[]:n;i.staticClass=i.staticClass?"v-list-item__action ".concat(i.staticClass):"v-list-item__action";var a=s.filter((function(t){return!1===t.isComment&&" "!==t.text}));return a.length>1&&(i.staticClass+=" v-list-item__action--stack"),t("div",i,s)}})},"2fa4":function(t,e,i){"use strict";i("20f6");var n=i("80d2");e["a"]=Object(n["h"])("spacer","div","v-spacer")},3408:function(t,e,i){},"34c3":function(t,e,i){"use strict";i("498a");var n=i("2b0e");e["a"]=n["a"].extend({name:"v-list-item-icon",functional:!0,render:function(t,e){var i=e.data,n=e.children;return i.staticClass="v-list-item__icon ".concat(i.staticClass||"").trim(),t("div",i,n)}})},"3ad0":function(t,e,i){},"56b0":function(t,e,i){"use strict";i("ac1f"),i("466d");var n=i("5530"),s=i("ade3"),a=(i("db42"),i("9d26")),r=i("da13"),l=i("34c3"),o=i("7e2b"),c=i("9d65"),u=i("a9ad"),d=i("f2e7"),h=i("3206"),f=i("5607"),v=i("0789"),p=i("58df"),m=i("80d2"),g=Object(p["a"])(o["a"],c["a"],u["a"],Object(h["a"])("list"),d["a"]);e["a"]=g.extend().extend({name:"v-list-group",directives:{ripple:f["a"]},props:{activeClass:{type:String,default:""},appendIcon:{type:String,default:"$expand"},color:{type:String,default:"primary"},disabled:Boolean,group:String,noAction:Boolean,prependIcon:String,ripple:{type:[Boolean,Object],default:!0},subGroup:Boolean},computed:{classes:function(){return{"v-list-group--active":this.isActive,"v-list-group--disabled":this.disabled,"v-list-group--no-action":this.noAction,"v-list-group--sub-group":this.subGroup}}},watch:{isActive:function(t){!this.subGroup&&t&&this.list&&this.list.listClick(this._uid)},$route:"onRouteChange"},created:function(){this.list&&this.list.register(this),this.group&&this.$route&&null==this.value&&(this.isActive=this.matchRoute(this.$route.path))},beforeDestroy:function(){this.list&&this.list.unregister(this)},methods:{click:function(t){var e=this;this.disabled||(this.isBooted=!0,this.$emit("click",t),this.$nextTick((function(){return e.isActive=!e.isActive})))},genIcon:function(t){return this.$createElement(a["a"],t)},genAppendIcon:function(){var t=!this.subGroup&&this.appendIcon;return t||this.$slots.appendIcon?this.$createElement(l["a"],{staticClass:"v-list-group__header__append-icon"},[this.$slots.appendIcon||this.genIcon(t)]):null},genHeader:function(){return this.$createElement(r["a"],{staticClass:"v-list-group__header",attrs:{"aria-expanded":String(this.isActive),role:"button"},class:Object(s["a"])({},this.activeClass,this.isActive),props:{inputValue:this.isActive},directives:[{name:"ripple",value:this.ripple}],on:Object(n["a"])(Object(n["a"])({},this.listeners$),{},{click:this.click})},[this.genPrependIcon(),this.$slots.activator,this.genAppendIcon()])},genItems:function(){var t=this;return this.showLazyContent((function(){return[t.$createElement("div",{staticClass:"v-list-group__items",directives:[{name:"show",value:t.isActive}]},Object(m["r"])(t))]}))},genPrependIcon:function(){var t=this.subGroup&&null==this.prependIcon?"$subgroup":this.prependIcon;return t||this.$slots.prependIcon?this.$createElement(l["a"],{staticClass:"v-list-group__header__prepend-icon"},[this.$slots.prependIcon||this.genIcon(t)]):null},onRouteChange:function(t){if(this.group){var e=this.matchRoute(t.path);e&&this.isActive!==e&&this.list&&this.list.listClick(this._uid),this.isActive=e}},toggle:function(t){var e=this,i=this._uid===t;i&&(this.isBooted=!0),this.$nextTick((function(){return e.isActive=i}))},matchRoute:function(t){return null!==t.match(this.group)}},render:function(t){return t("div",this.setTextColor(this.isActive&&this.color,{staticClass:"v-list-group",class:this.classes}),[this.genHeader(),t(v["a"],this.genItems())])}})},"5d23":function(t,e,i){"use strict";i.d(e,"a",(function(){return O})),i.d(e,"c",(function(){return j})),i.d(e,"b",(function(){return I}));var n=i("80d2"),s=i("8860"),a=i("56b0"),r=i("da13"),l=i("5530"),o=(i("899c"),i("604c")),c=i("a9ad"),u=i("58df"),d=Object(u["a"])(o["a"],c["a"]).extend({name:"v-list-item-group",provide:function(){return{isInGroup:!0,listItemGroup:this}},computed:{classes:function(){return Object(l["a"])(Object(l["a"])({},o["a"].options.computed.classes.call(this)),{},{"v-list-item-group":!0})}},methods:{genData:function(){return this.setTextColor(this.color,Object(l["a"])(Object(l["a"])({},o["a"].options.methods.genData.call(this)),{},{attrs:{role:"listbox"}}))}}}),h=i("1800"),f=(i("a9e3"),i("3408"),i("24b2")),v=i("a236"),p=Object(u["a"])(c["a"],f["a"],v["a"]).extend({name:"v-avatar",props:{left:Boolean,right:Boolean,size:{type:[Number,String],default:48}},computed:{classes:function(){return Object(l["a"])({"v-avatar--left":this.left,"v-avatar--right":this.right},this.roundedClasses)},styles:function(){return Object(l["a"])({height:Object(n["g"])(this.size),minWidth:Object(n["g"])(this.size),width:Object(n["g"])(this.size)},this.measurableStyles)}},render:function(t){var e={staticClass:"v-avatar",class:this.classes,style:this.styles,on:this.$listeners};return t("div",this.setBackgroundColor(this.color,e),this.$slots.default)}}),m=p,g=m.extend({name:"v-list-item-avatar",props:{horizontal:Boolean,size:{type:[Number,String],default:40}},computed:{classes:function(){return Object(l["a"])(Object(l["a"])({"v-list-item__avatar--horizontal":this.horizontal},m.options.computed.classes.call(this)),{},{"v-avatar--tile":this.tile||this.horizontal})}},render:function(t){var e=m.options.render.call(this,t);return e.data=e.data||{},e.data.staticClass+=" v-list-item__avatar",e}}),b=i("34c3"),y=Object(n["h"])("v-list-item__action-text","span"),O=Object(n["h"])("v-list-item__content","div"),j=Object(n["h"])("v-list-item__title","div"),I=Object(n["h"])("v-list-item__subtitle","div");s["a"],a["a"],r["a"],h["a"],b["a"]},"604c":function(t,e,i){"use strict";i.d(e,"a",(function(){return o}));i("4de4"),i("7db0"),i("c740"),i("4160"),i("caad"),i("c975"),i("fb6a"),i("a434"),i("a9e3"),i("2532"),i("159b");var n=i("5530"),s=(i("166a"),i("a452")),a=i("7560"),r=i("58df"),l=i("d9bd"),o=Object(r["a"])(s["a"],a["a"]).extend({name:"base-item-group",props:{activeClass:{type:String,default:"v-item--active"},mandatory:Boolean,max:{type:[Number,String],default:null},multiple:Boolean},data:function(){return{internalLazyValue:void 0!==this.value?this.value:this.multiple?[]:void 0,items:[]}},computed:{classes:function(){return Object(n["a"])({"v-item-group":!0},this.themeClasses)},selectedIndex:function(){return this.selectedItem&&this.items.indexOf(this.selectedItem)||-1},selectedItem:function(){if(!this.multiple)return this.selectedItems[0]},selectedItems:function(){var t=this;return this.items.filter((function(e,i){return t.toggleMethod(t.getValue(e,i))}))},selectedValues:function(){return null==this.internalValue?[]:Array.isArray(this.internalValue)?this.internalValue:[this.internalValue]},toggleMethod:function(){var t=this;if(!this.multiple)return function(e){return t.internalValue===e};var e=this.internalValue;return Array.isArray(e)?function(t){return e.includes(t)}:function(){return!1}}},watch:{internalValue:"updateItemsState",items:"updateItemsState"},created:function(){this.multiple&&!Array.isArray(this.internalValue)&&Object(l["c"])("Model must be bound to an array if the multiple property is true.",this)},methods:{genData:function(){return{class:this.classes}},getValue:function(t,e){return null==t.value||""===t.value?e:t.value},onClick:function(t){this.updateInternalValue(this.getValue(t,this.items.indexOf(t)))},register:function(t){var e=this,i=this.items.push(t)-1;t.$on("change",(function(){return e.onClick(t)})),this.mandatory&&!this.selectedValues.length&&this.updateMandatory(),this.updateItem(t,i)},unregister:function(t){if(!this._isDestroyed){var e=this.items.indexOf(t),i=this.getValue(t,e);this.items.splice(e,1);var n=this.selectedValues.indexOf(i);if(!(n<0)){if(!this.mandatory)return this.updateInternalValue(i);this.multiple&&Array.isArray(this.internalValue)?this.internalValue=this.internalValue.filter((function(t){return t!==i})):this.internalValue=void 0,this.selectedItems.length||this.updateMandatory(!0)}}},updateItem:function(t,e){var i=this.getValue(t,e);t.isActive=this.toggleMethod(i)},updateItemsState:function(){var t=this;this.$nextTick((function(){if(t.mandatory&&!t.selectedItems.length)return t.updateMandatory();t.items.forEach(t.updateItem)}))},updateInternalValue:function(t){this.multiple?this.updateMultiple(t):this.updateSingle(t)},updateMandatory:function(t){if(this.items.length){var e=this.items.slice();t&&e.reverse();var i=e.find((function(t){return!t.disabled}));if(i){var n=this.items.indexOf(i);this.updateInternalValue(this.getValue(i,n))}}},updateMultiple:function(t){var e=Array.isArray(this.internalValue)?this.internalValue:[],i=e.slice(),n=i.findIndex((function(e){return e===t}));this.mandatory&&n>-1&&i.length-1<1||null!=this.max&&n<0&&i.length+1>this.max||(n>-1?i.splice(n,1):i.push(t),this.internalValue=i)},updateSingle:function(t){var e=t===this.internalValue;this.mandatory&&e||(this.internalValue=e?void 0:t)}},render:function(t){return t("div",this.genData(),this.$slots.default)}});o.extend({name:"v-item-group",provide:function(){return{itemGroup:this}}})},"61d2":function(t,e,i){},8860:function(t,e,i){"use strict";i("c740"),i("0481"),i("a434"),i("4069");var n=i("b85c"),s=i("5530"),a=(i("3ad0"),i("8dd9"));e["a"]=a["a"].extend().extend({name:"v-list",provide:function(){return{isInList:!0,list:this}},inject:{isInMenu:{default:!1},isInNav:{default:!1}},props:{dense:Boolean,disabled:Boolean,expand:Boolean,flat:Boolean,nav:Boolean,rounded:Boolean,subheader:Boolean,threeLine:Boolean,twoLine:Boolean},data:function(){return{groups:[]}},computed:{classes:function(){return Object(s["a"])(Object(s["a"])({},a["a"].options.computed.classes.call(this)),{},{"v-list--dense":this.dense,"v-list--disabled":this.disabled,"v-list--flat":this.flat,"v-list--nav":this.nav,"v-list--rounded":this.rounded,"v-list--subheader":this.subheader,"v-list--two-line":this.twoLine,"v-list--three-line":this.threeLine})}},methods:{register:function(t){this.groups.push(t)},unregister:function(t){var e=this.groups.findIndex((function(e){return e._uid===t._uid}));e>-1&&this.groups.splice(e,1)},listClick:function(t){if(!this.expand){var e,i=Object(n["a"])(this.groups);try{for(i.s();!(e=i.n()).done;){var s=e.value;s.toggle(t)}}catch(a){i.e(a)}finally{i.f()}}}},render:function(t){var e={staticClass:"v-list",class:this.classes,style:this.styles,attrs:Object(s["a"])({role:this.isInNav||this.isInMenu?void 0:"list"},this.attrs$)};return t(this.tag,this.setBackgroundColor(this.color,e),[this.$slots.default])}})},"899c":function(t,e,i){},"8ce9":function(t,e,i){},a434:function(t,e,i){"use strict";var n=i("23e7"),s=i("23cb"),a=i("a691"),r=i("50c4"),l=i("7b0b"),o=i("65f0"),c=i("8418"),u=i("1dde"),d=i("ae40"),h=u("splice"),f=d("splice",{ACCESSORS:!0,0:0,1:2}),v=Math.max,p=Math.min,m=9007199254740991,g="Maximum allowed length exceeded";n({target:"Array",proto:!0,forced:!h||!f},{splice:function(t,e){var i,n,u,d,h,f,b=l(this),y=r(b.length),O=s(t,y),j=arguments.length;if(0===j?i=n=0:1===j?(i=0,n=y-O):(i=j-2,n=p(v(a(e),0),y-O)),y+i-n>m)throw TypeError(g);for(u=o(b,n),d=0;d<n;d++)h=O+d,h in b&&c(u,d,b[h]);if(u.length=n,i<n){for(d=O;d<y-n;d++)h=d+n,f=d+i,h in b?b[f]=b[h]:delete b[f];for(d=y;d>y-n+i;d--)delete b[d-1]}else if(i>n)for(d=y-n;d>O;d--)h=d+n-1,f=d+i-1,h in b?b[f]=b[h]:delete b[f];for(d=0;d<i;d++)b[d+O]=arguments[d+2];return b.length=y-n+i,u}})},c740:function(t,e,i){"use strict";var n=i("23e7"),s=i("b727").findIndex,a=i("44d2"),r=i("ae40"),l="findIndex",o=!0,c=r(l);l in[]&&Array(1)[l]((function(){o=!1})),n({target:"Array",proto:!0,forced:o||!c},{findIndex:function(t){return s(this,t,arguments.length>1?arguments[1]:void 0)}}),a(l)},ce7e:function(t,e,i){"use strict";var n=i("5530"),s=(i("8ce9"),i("7560"));e["a"]=s["a"].extend({name:"v-divider",props:{inset:Boolean,vertical:Boolean},render:function(t){var e;return this.$attrs.role&&"separator"!==this.$attrs.role||(e=this.vertical?"vertical":"horizontal"),t("hr",{class:Object(n["a"])({"v-divider":!0,"v-divider--inset":this.inset,"v-divider--vertical":this.vertical},this.themeClasses),attrs:Object(n["a"])({role:"separator","aria-orientation":e},this.$attrs),on:this.$listeners})}})},da13:function(t,e,i){"use strict";var n=i("5530"),s=(i("61d2"),i("a9ad")),a=i("1c87"),r=i("4e82"),l=i("7560"),o=i("f2e7"),c=i("5607"),u=i("80d2"),d=i("d9bd"),h=i("58df"),f=Object(h["a"])(s["a"],a["a"],l["a"],Object(r["a"])("listItemGroup"),Object(o["b"])("inputValue"));e["a"]=f.extend().extend({name:"v-list-item",directives:{Ripple:c["a"]},inject:{isInGroup:{default:!1},isInList:{default:!1},isInMenu:{default:!1},isInNav:{default:!1}},inheritAttrs:!1,props:{activeClass:{type:String,default:function(){return this.listItemGroup?this.listItemGroup.activeClass:""}},dense:Boolean,inactive:Boolean,link:Boolean,selectable:{type:Boolean},tag:{type:String,default:"div"},threeLine:Boolean,twoLine:Boolean,value:null},data:function(){return{proxyClass:"v-list-item--active"}},computed:{classes:function(){return Object(n["a"])(Object(n["a"])({"v-list-item":!0},a["a"].options.computed.classes.call(this)),{},{"v-list-item--dense":this.dense,"v-list-item--disabled":this.disabled,"v-list-item--link":this.isClickable&&!this.inactive,"v-list-item--selectable":this.selectable,"v-list-item--three-line":this.threeLine,"v-list-item--two-line":this.twoLine},this.themeClasses)},isClickable:function(){return Boolean(a["a"].options.computed.isClickable.call(this)||this.listItemGroup)}},created:function(){this.$attrs.hasOwnProperty("avatar")&&Object(d["e"])("avatar",this)},methods:{click:function(t){t.detail&&this.$el.blur(),this.$emit("click",t),this.to||this.toggle()},genAttrs:function(){var t=Object(n["a"])({"aria-disabled":!!this.disabled||void 0,tabindex:this.isClickable&&!this.disabled?0:-1},this.$attrs);return this.$attrs.hasOwnProperty("role")||this.isInNav||(this.isInGroup?(t.role="listitem",t["aria-selected"]=String(this.isActive)):this.isInMenu?(t.role=this.isClickable?"menuitem":void 0,t.id=t.id||"list-item-".concat(this._uid)):this.isInList&&(t.role="listitem")),t}},render:function(t){var e=this,i=this.generateRouteLink(),s=i.tag,a=i.data;a.attrs=Object(n["a"])(Object(n["a"])({},a.attrs),this.genAttrs()),a[this.to?"nativeOn":"on"]=Object(n["a"])(Object(n["a"])({},a[this.to?"nativeOn":"on"]),{},{keydown:function(t){t.keyCode===u["x"].enter&&e.click(t),e.$emit("keydown",t)}}),this.inactive&&(s="div"),this.inactive&&this.to&&(a.on=a.nativeOn,delete a.nativeOn);var r=this.$scopedSlots.default?this.$scopedSlots.default({active:this.isActive,toggle:this.toggle}):this.$slots.default;return t(s,this.setTextColor(this.color,a),r)}})},db42:function(t,e,i){}}]);
//# sourceMappingURL=Load Video0~Load Video1~Load Video2~Load Video3~Load Video4~SideBar.eb0580a2.js.map