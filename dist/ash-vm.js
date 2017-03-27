!function(n){"use strict";function t(n){return Object.keys(n).forEach(function(t){var r=n[t];m(r)&&(n[t]=n[r])}),n}function r(n){return{"@loop":function(t){var r=t.operations,e=t.error,o=r.pop();h(o)?n.fork(null,t,["@forever",o]):e("@loop",M,o)},"@fork":function(t){var r=t.operations,e=t.error,o=r.pop();h(o)?n.fork(null,t,o):e("@fork",M,o)},"@spawn":function(t){var r=t.stack,e=t.operations,o=t.error,i=r.pop(),a=e.pop();m(i)?h(a)?(n.stop(i),n.fork(i,t,["@forever",a])):o("@spawn",M,a):o("@spawn",j,i)},"@stop-all":function(t){return n.stopAll()},"@stop":function(t){var r=t.stack;return n.stop(r.pop())}}}function e(n,t){for(var r=t.length-1;r>=0&&t[r]!==n;)r--;r!==-1&&t.splice(r,1)}function o(n,t){if(0===t.length)t.push(n);else{for(var r=t.length-1,e=t[r];e&&e.time<=n.time;)r--,e=t[r];t.splice(r+1,0,n)}return n}function i(n){var t=n.length;return t?n[t-1].time:1/0}function a(n){n.context||n.init();var t=K(n);return t.instruments=u(T(n)),t.commands=I(t),n.sequencers.push(c(t)),function(n){return t.vms.push(n),n.audio=t,t.commands}}function u(n){return Object.keys(n).forEach(function(t){var r=n[t];if(!r.prepare){var e=r.params||[];r.prepare=function(n,t){e.forEach(function(r){var e=t.get(r);d(e)&&(n[r]=e)})}}}),n}function c(n){var t=n.vms,r=n.bpm2bpa;return{tick:function(){var e=n.vms.length;if(0!==e)for(var o=n.bpm*r,i=0;i<e;i++)t[i].resume(o)}}}function s(n){var t=n||Math.random,r=function(n){return z(t()*n)};return{"@random":function(n){return n.stack.push(t())},"@rand":"@random","@srandom":function(n){return n.stack.push(2*t()-1)},"@srand":"@srandom","@randi":function(n){var t=n.stack;return t.push(r(t.pop()))},"@pick":function(n){var t=n.operations,e=n.error,o=t.pop();if(h(o)){var i=r(o.length);t.push(o[i])}else t.push(o),e("Can't pick an element if is not an array",o)},"@chance":function(n){var r=n.stack,e=n.operations,o=r.pop(),i=e.pop();t()<o&&(e.pop(),e.push(i))}}}function p(n){return n=n||console.log.bind(console),{"@print":function(t){var r=t.stack;n("@print",r.length?g(r):"<Empty Stack>","(id, time)",t.id,t.time)},"@log":function(t){var r=t.stack;n("@log",r.pop(),r.length?g(r):"<Empty Stack>","(id, time)",t.id,t.time)},"@debug":function(t){n("@debug",t.stack,t.id,t.time)}}}function f(){return{"@pluck":F("pluck"),"@pluck-note":G("pluck","freq","amp"),"@bass":F("bass"),"@bass-note":G("bass","freq","amp"),"@hat":F("hat"),"@hat-note":G("hat","amp"),"@kick":F("kick"),"@kick-note":G("kick","amp"),"@snare":F("snare"),"@snare-note":G("snare","amp"),"@conga":F("conga"),"@conga-note":G("conga","amp"),"@tom":F("tom"),"@tom-note":G("tom","amp")}}function l(n){var t=new R({amp:.5,freq:440});t.addCommands(a(n)),t.addCommands(s()),t.addCommands(p()),t.addCommands(f());for(var r=arguments.length,e=Array(r>1?r-1:0),o=1;o<r;o++)e[o-1]=arguments[o];return e.forEach(function(n){return t.addCommands(n)}),t}var h=Array.isArray,m=function(n){return"string"==typeof n},v=function(n){return"function"==typeof n},d=function(n){return void 0!==n},k=function(n){return n[n.length-1]},g=k,y=function(n,t){return(n%t+t)%t},b=function(n,t){if(!(n instanceof t))throw new TypeError("Cannot call a class as a function")},w=function(){function n(n,t){for(var r=0;r<t.length;r++){var e=t[r];e.enumerable=e.enumerable||!1,e.configurable=!0,"value"in e&&(e.writable=!0),Object.defineProperty(n,e.key,e)}}return function(t,r,e){return r&&n(t.prototype,r),e&&n(t,e),t}}(),x=function(n){return"string"==typeof n&&"@"===n[0]},C=Array.isArray,q=1,E=function(){function n(t,r,e,o){b(this,n),this.id="proc-"+q++,this.stack=[],this.operations=t?[t]:[],this.context=new A(r),this.time="number"==typeof e?e:0,this.rate="number"==typeof o?o:1,this.error=this.error.bind(this)}return w(n,[{key:"wait",value:function(n){this.time+=this.rate*n}},{key:"step",value:function(n){var t=this.operations;if(t.length){var r=t.pop();if(null===r||void 0===r);else if("function"==typeof instruction)r();else if(C(r))for(var e=r.length-1;e>=0;e--)t.push(r[e]);else if(x(r)){var o=n[r];"function"==typeof o?o(this):this.error("","Instruction not recognized.",r)}else this.stack.push(r)}}},{key:"resume",value:function(n){for(var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1/0,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1e4,e=this.operations;--r>0&&this.time<t&&e.length;)this.step(n);if(0===r)throw Error("Limit reached. Probably an infinity loop.");return e.length>0}},{key:"error",value:function(n,t,r){console.error(n,t,r,"id",this.id,"time",this.time)}}]),n}(),A=function(){function n(t){b(this,n),t instanceof n?this.parent=t:t&&(this.local=Object.assign({},t))}return w(n,[{key:"child",value:function(t){var r=new n(this);return r.local=Object.assign({},t),r}},{key:"get",value:function(n){for(var t=this;void 0===t.value(n)&&t.parent;)t=t.parent;return t.value(n)}},{key:"set",value:function(n,t){for(var r=this;void 0===r.value(n)&&r.parent;)r=r.parent;r.let(n,t)}},{key:"value",value:function(n){return this.local?this.local[n]:void 0}},{key:"let",value:function(n,t){this.local||(this.local={}),this.local[n]=t}}]),n}(),M="Expected a pattern, but found:",j="Expected a string, but found:",O=function(n){return function(t){var r=t.stack;r.push(n(r.pop()))}},N=function(n){return function(t){var r=t.stack;r.push(n(r.pop(),r.pop()))}},S={"@+":N(function(n,t){return t+n}),"@add":"@+","@-":N(function(n,t){return t-n}),"@sub":"@-","@*":N(function(n,t){return t*n}),"@mul":"@*","@/":N(function(n,t){return 0===n?0:t/n}),"@div":"@/","@%":N(function(n,t){return 0===n?0:y(t,n)}),"@wrap":"@%","@mod":N(function(n,t){return 0===n?0:t%n}),"@neg":O(function(n){return-n}),"@cond":function(n){var t=n.stack,r=n.operations,e=t.pop(),o=r.pop();e&&(r.pop(),r.push(o))},"@>":N(function(n,t){return t>n}),"@>=":N(function(n,t){return t>=n}),"@<":N(function(n,t){return t<n}),"@<=":N(function(n,t){return t<=n}),"@==":N(function(n,t){return t===n}),"@!=":N(function(n,t){return t!==n}),"@!":O(function(n){return!n}),"@not":"@!","@&&":N(function(n,t){return t&&n}),"@and":"@&&","@||":N(function(n,t){return t||n}),"@or":"@||","@let":function(n){var t=n.stack;return n.context.let(t.pop(),t.pop())},"@set":function(n){var t=n.stack;return n.context.set(t.pop(),t.pop())},"@get":function(n){var t=n.stack,r=n.context;return t.push(r.get(t.pop()))},"@wait":function(n){return n.wait(Math.abs(Number(n.stack.pop())))},"@sync":function(n){return n.wait(Math.floor(n.time)+1-n.time)},"@dup":function(n){var t=n.stack;return t.push(k(t))},"@execute":function(n){var t=n.operations,r=n.error,e=t.pop();m(e)?t.push("@instr"):r("@execute",j,e)},"@":"@execute","@repeat":function(n){var t=n.stack,r=n.operations,e=t.pop(),o=k(r);if(!h(o))throw Error("Can't repeat: "+o);for(var i=1;i<e;i++)r.push(o)},"@forever":function(n){var t=n.operations,r=k(t);if(!h(r))throw Error("Can't forover: "+r);r.length&&(t.push("@forever"),t.push(r))},"@iter":function(n){var t=n.operations,r=n.error,e=t.pop();if(h(e)&&e.length){var o=e.splice(0,1);t.push(o),e.push(o)}else r("@iter",M,e)},"@reverse":function(n){n.operations}},B=Object.assign,R=function(){function n(t){b(this,n),this.context=t,this.procs=[],this.procsByName={},this.time=0,this.commands=r(this),this.addCommands(S)}return w(n,[{key:"run",value:function(n){(!(arguments.length>1&&void 0!==arguments[1])||arguments[1])&&this.procs.length&&(n=["@sync",n]),this.fork(null,this.context,n)}},{key:"addCommands",value:function(n){v(n)&&(n=n(this)),n&&B(this.commands,t(n))}},{key:"fork",value:function(n,t,r){var e=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0,i=arguments[4],a=this.time+e;!i&&t&&(i=t.rate);var u=t?t.context||t:void 0,c=new E(r,u,a,i);return o(c,this.procs),n&&(this.procsByName[n]=c),c}},{key:"resume",value:function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1/0,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1e4,r=this.procs;if(0===r.length)return!1;for(var e=this.time+n;--t>0&&i(r)<e;){var a=r.pop();a.resume(this.commands,e)&&o(a,this.procs)}return this.time=e,r.length>0}},{key:"stopAll",value:function(){this.procs.length=0}},{key:"stop",value:function(n){if("string"==typeof n){var t=n;n=this.procsByName[t],this.procsByName[t]=null}e(n,this.procs)}}]),n}(),P=function(n){return'Instrument "'+n+'" not found.'},T=function(n){return{kick:{params:["amp","pitch","decay","tone"],init:function(){return new n.Kick({decay:.2}).connect()}},snare:{params:["amp","tune","cutoff","snappy"],init:function(){return new n.Snare({snappy:1.5}).connect()}},hat:{params:["amp","pitch"],init:function(){return new n.Hat({amp:1.5}).connect()}},conga:{params:["amp","pitch"],init:function(){return new n.Conga({amp:.25,freq:400}).connect()}},clave:{params:["amp","pitch"],init:function(){return new n.Clave({amp:1}).connect()}},tom:{params:["amp","pitch"],init:function(){return new n.Tom({amp:.25,freq:400}).connect()}},clap:{params:["amp"],init:function(){return new n.Clap({amp:.5}).connect()}},cowbell:{params:["amp","pitch"],init:function(){return new n.Cowbell({amp:.5}).connect()}},pluck:{params:["freq","amp","blend","damping","velocity"],init:function(){return new n.PolyKarplusStrong({maxVoices:32}).connect()},prepare:function(t,r){var e=r.get("freq");e>0&&(t.freq=e,t.damping=1- -6/Math.log(e/n.sampleRate));var o=r.get("amp");o&&(t.amp=o*o*.5);var i=r.get("blend");i&&(t.blend=i)}},bass:{params:["freq","amp","resonance"],init:function(){return new n.MonoSynth({attack:44,decay:n.Time.beats(.25),filterMult:.25,octave2:0,octave3:0}).connect()}}}},V=function(n,t){var r=t.instruments,e=n.get("inst"),o=r[e];if(!o)return P(e);o.instance||(o.instance=o.init());var i=o.instance;o.prepare(i,n),i.freq?i.note(i.freq):i.note()},I=function(n){return{"@play":function(t){var r=t.context,e=t.error,o=V(r,n);o&&e("@play",o)},"@play-note":function(t){var r=t.stack,e=t.context,o=t.error,i=r.pop(),a=V(e.child(i),n);a&&o("@play-note",a)},"@bpm":function t(r){var e=r.stack,t=parseFloat(e.pop(),10);n.bpm=t}}},K=function(n){return{Gibberish:n,bpm:100,sampleRate:n.context.sampleRate,bpm2bpa:1/(60*n.context.sampleRate),vms:[]}},z=Math.floor,F=function(n){return function(t){t.operations.push([{inst:n},"@play-note"])}},G=function(n,t,r){return function(e){var o=e.stack,i=e.operations,a={inst:n};r&&(a[r]=o.pop()),a[t]=o.pop(),i.push([a,"@play-note"])}};n.init=l}(this.AshVM=this.AshVM||{});
//# sourceMappingURL=ash-vm.js.map
