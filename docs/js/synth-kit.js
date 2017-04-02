!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t(e.SynthKit=e.SynthKit||{})}(this,function(e){"use strict";function t(e){var t={},n=Object.keys(e);return n.forEach(function(n){var a=C(e[n],2),r=a[0],i=a[1];t[n]=r,"output"===i?o(t,r):u(r,e[i][0])}),t.update=function(e){return e&&n.forEach(function(n){t[n].update(e[n])}),t},t.inspect=function(){return n.reduce(function(e,n){return e[n]=t[n].inspect(),e},{})},t}function n(e,t,n,u){var o=e["create"+t](u);return o.update=function(e){return e&&n.forEach(function(t){r(o,t,e[t])}),o},o.inspect=function(){return n.reduce(function(e,t){return e[t]=a(o,t),e},{})},o}function a(e,t){var n=e[t];return n&&void 0!==n.value?n.value:n}function r(e,t,n){var a=e[t];M(n)&&(n=n()),void 0===n||void 0===a||(void 0!==a.value?M(n.connect)?n.connect(a):(a.value=n,a.setValueAtTime(n,0)):e[t]=n)}function u(e,t){t&&e.connect(t)}function o(e,t){e.connect=function(n){return n===!0&&(n=t.context.destination),t.connect(n),e}}function i(e,t){return e?Object.assign({},t,e):t}function c(e,t,n){t.cancelScheduledValues(0);var a=n.attack||.01,r=n.peak||1;t.setValueAtTime(0,e),e+=a,console.log("attack",a,r,e),t.linearRampToValueAtTime(r,e);var u=n.decay||.01,o=n.sustain||0;e+=u,t.linearRampToValueAtTime(o,e);var i=n.hold||0;i&&(e+=i,t.setValueAtTime(o,e));var c=function(e){if(o){t.setValueAtTime(e,o);var a=n.release||0;console.log("Trigger release",a,e),e+=a,t.exponentialRampToValueAtTime(1e-5,e)}};return i&&c(e),c}function s(e,t){return n(e,"Gain",s.params).update(t)}function l(e,t){var n=s(e,B);return t=Object.assign({},l.defaultState,t),n.update=function(e){return t=Object.assign(t,e),n},n.inspect=function(){return t},n.trigger=function(a,r){a||(a=e.currentTime);var u=c(a,n.gain,t);return r&&u(a+r),u},n}function p(e,t,n){for(var a=arguments.length>3&&void 0!==arguments[3]&&arguments[3],r=e.createBuffer(1,t,e.sampleRate),u=r.getChannelData(0),o=0;o<t;o++)u[o]=n(a?t-o:o);return r}function f(e,t,a){var r=n(e,"BufferSource",f.params);return r.update(a),r.buffer=t,r}function v(e,t){t=Object.assign({},v.defaults,t);var n=t.duration*e.sampleRate,a=p(e,n,function(){return 2*Math.random()-1}),r=f(e,a,{loop:!0});return r.start(),r}function d(e,t,n){var a=s(e);return a.trigger=function(r,u){r||(r=e.currentTime);var o=f(e,t,n);o.connect(a),o.onended=function(){a.onended&&a.onended(),o.disconnect()},o.start(r)},a}function g(e,t){return t=Object.assign({},g.defaults,t),d(e,p(e,t.duration*e.sampleRate,function(){return 2*Math.random()-1}))}function m(e,t){return s(e,t)}function y(e,t){var a=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],r=n(e,"Oscillator",y.params);return a&&r.start(+a),r}function h(e,t){return y(e,t)}function b(e,t){var a=n(e,"BiquadFilter",b.params);return a.attack=.01,a.decay=.1,a.octaves=2,a.trigger=function(t,n){t||(t=e.currentTime),this.base=this.frequency.value,this.peak=this.base*this.octaves;var r=c(t,a.frequency,a);return n&&r(t+n),r},a.update(t)}function k(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"none",a=e.createWaveShaper();return a.curve=t,a.oversample=n,a}function T(e,t){var a=n(e,"Gain",T.params);a.drive=a.gain,D||(D=q());var r=k(e,D,"2x");return a.connect(r),a.connect=r.connect.bind(r),a.update(t)}function q(){for(var e=65536,t=new Float32Array(e),n=0;n<e;n++){var a=(n-e/2)/(e/2);t[n]=Math.tanh(a)}return t}function O(e,n){n=Object.assign({},O.defaults,n);var a=t({oscillator:[y(e),"envelope"],click:[g(e),"envelope"],envelope:[l(e),"vcf"],vcf:[b(e),"clipper"],clipper:[T(e),"amp"],amp:[s(e),"output"]}).update(n);return a.trigger=function(e){a.click.trigger(e),a.envelope.trigger(e)},a}function S(e,n){n=Object.assign({},S.defaults,n);var a=t({osc1:[y(e),"oscEnv"],osc2:[y(e),"oscEnv"],oscEnv:[l(e),"amp"],noise:[v(e),"noiseEnv"],noiseEnv:[l(e),"amp"],amp:[s(e),"output"]}).update(n);return a.trigger=function(e){a.oscEnv.trigger(e),a.noiseEnv.trigger(e)},a}function j(e,n){n=Object.assign({},j.defaults,n);var a=t({noise:[v(e),"envelope"],envelope:[l(e),"amp"],amp:[s(e),"output"]}).update(n);return a.trigger=a.envelope.trigger,a}function E(e,t){return n(e,"BiquadFilter",E.params).update(t)}function A(e,n){n=n?Object.assign({},A.defaultState,n):A.defaultState;var a=t({osc1:[y(e),"env1"],env1:[l(e),"filter"],osc2:[y(e),"env2"],env2:[l(e),"filter"],filter:[E(e),"amp"],amp:[s(e),"output"]}).update(n);return a.trigger=function(e){a.env1.trigger(e),a.env2.trigger(e)},a}function V(e,n){var a=i(n,V.defaults),r=t({oscillator:[y(e),"envelope"],envelope:[l(e),"amp"],pulse:[g(e),"amp"],amp:[s(e),"output"]}).update(a);return r.trigger=r.envelope.trigger,r}function w(e,n){var a=i(n,w.defaults),r=t({oscillator:[y(e),"envelope"],envelope:[l(e),"amp"],pulse:[g(e),"amp"],amp:[s(e),"output"]}).update(a);return r.trigger=function(e){r.pulse.trigger(e),r.envelope.trigger(e)},r}function x(e,n){n=Object.assign({},x.defaults,n);var a=t({oscillator:[h(e),"vcf"],vcf:[b(e),"envelope"],envelope:[l(e),"amp"],amp:[m(e),"output"]}).update(n);return a.trigger=function(t,n,r){n=n||e.currentTime,t&&(a.oscillator.frequency.setValueAtTime(t,n),a.vcf.frequency.setValueAtTime(t/2,n)),a.vcf.trigger(n,r),a.envelope.trigger(n,r)},a}function F(e,t){t=Object.assign({},F.defaults,t);var a=s(e,t),r=n(e,"Delay",F.params,t.maxDelay);return r.resonance=a.gain,r.connect(a),a.connect(r),r.update(t)}function R(e,n){var a=t({noise:[v(e),"envelope"],envelope:[l(e),"combFilter"],combFilter:[F(e),"amp"],amp:[s(e),"output"]}).update(n);return a.trigger=function(e,t,n){var r=1/e;a.combFilter.delayTime.setValueAtTime(r,t),a.envelope.trigger(t)},a}var C=function(){function e(e,t){var n=[],a=!0,r=!1,u=void 0;try{for(var o,i=e[Symbol.iterator]();!(a=(o=i.next()).done)&&(n.push(o.value),!t||n.length!==t);a=!0);}catch(e){r=!0,u=e}finally{try{!a&&i.return&&i.return()}finally{if(r)throw u}}return n}return function(t,n){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return e(t,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),M=function(e){return"function"==typeof e};s.params=["gain"];var B={gain:0};l.params=["base","peak","attack","decay","sustain","release"],l.defaultState={peak:1,attack:.01,decay:.2},f.params=["detune","loop","loopStart","loopEnd","playbackRate"],v.defaults={duration:1,loop:!0},d.state={gain:.8},g.defaults={duration:.001},y.params=["type","frequency","detune"],b.params=["type","frequency","detune","Q","attack","decay","octaves"],b.defaults={type:"lowpass",frequency:880,attack:.1,decay:.5,octaves:2};var D=null;T.params=["drive"],O.defaults={oscillator:{type:"sine",frequency:48},envelope:{attack:.1,decay:.2},vcf:{type:"lowpass",frequency:48,envelope:{base:48,peak:100,attack:.001,decay:.6}},amp:{gain:1}},S.defaults={osc1:{type:"sine",frequency:238},osc2:{type:"sine",frequency:476},oscEnv:{gain:.5,attack:.01,release:.4},noise:{type:"white"},noiseEnv:{attack:.01,decay:.1},amp:{gain:.5}},j.defaults={noise:{type:"white"},envelope:{attack:.01,release:.1},amp:{gain:.1}},E.params=["type","frequency","detune","Q"],A.defaultState={osc1:{type:"triangle",frequency:587},env1:{gain:.6,attack:.01,decay:.05,sustain:0},osc2:{type:"triangle",frequency:845},env2:{gain:.8,attack:.1,decay:.1},filter:{type:"bandpass",frequency:2640,Q:3.5},amp:{gain:.2}},V.defaults={oscillator:{frequency:310},pulse:{gain:.8},envelope:{decay:.31},amp:{gain:.4}},w.defaults={oscillator:{frequency:165},pulse:{gain:.1},envelope:{decay:.31},amp:{gain:1}},x.defaults={oscillator:{type:"sawtooth"},vcf:{type:"lowpass",Q:2,attack:.1,octaves:2,decay:1},envelope:{attack:.1,decay:.5,sustain:.8,release:2},amp:{gain:.5}},F.params=["delayTime","resonance"],F.defaults={maxDelay:1,delayTime:.1,resonance:.5},R.defaults={noise:{type:"white"},envelope:{attack:.1,decay:.1},combFilter:{delayTime:.2,resonance:.9}},e.Gain=s,e.GainEnvelope=l,e.Noise=v,e.Sample=d,e.Pulse=g,e.VCA=m,e.VCO=h,e.VCF=b,e.Kick=O,e.Snare=S,e.Hat=j,e.Cowbell=A,e.Conga=V,e.Tom=w,e.MonoSynth=x,e.Pluck=R,Object.defineProperty(e,"__esModule",{value:!0})});
//# sourceMappingURL=synth-kit.js.map