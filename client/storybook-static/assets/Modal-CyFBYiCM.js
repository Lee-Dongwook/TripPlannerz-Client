import{W as Wt,c as v}from"./axios-ivWSt1AI.js";import{r as a,R as G}from"./index-4g5l5LRQ.js";import{j as u}from"./index-WbHCIC1x.js";import{P as F}from"./index-tvtfaFq4.js";import{R as Q}from"./index-qTf6isfD.js";import{_ as Ut}from"./inheritsLoose-gZlOhxRM.js";const Ht=["xxl","xl","lg","md","sm","xs"],Gt="xs",Ce=a.createContext({prefixes:{},breakpoints:Ht,minBreakpoint:Gt});function E(e,t){const{prefixes:n}=a.useContext(Ce);return e||n[t]||t}function Kt(){const{breakpoints:e}=a.useContext(Ce);return e}function Vt(){const{minBreakpoint:e}=a.useContext(Ce);return e}function Xt(){const{dir:e}=a.useContext(Ce);return e==="rtl"}function Re(e){return e&&e.ownerDocument||document}function zt(e){var t=Re(e);return t&&t.defaultView||window}function Yt(e,t){return zt(e).getComputedStyle(e,t)}var qt=/([A-Z])/g;function Zt(e){return e.replace(qt,"-$1").toLowerCase()}var Jt=/^ms-/;function ge(e){return Zt(e).replace(Jt,"-ms-")}var Qt=/^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i;function Pt(e){return!!(e&&Qt.test(e))}function K(e,t){var n="",o="";if(typeof t=="string")return e.style.getPropertyValue(ge(t))||Yt(e).getPropertyValue(ge(t));Object.keys(t).forEach(function(r){var s=t[r];!s&&s!==0?e.style.removeProperty(ge(r)):Pt(r)?o+=r+"("+s+") ":n+=ge(r)+": "+s+";"}),o&&(n+="transform: "+o+";"),e.style.cssText+=";"+n}const Ve={disabled:!1},et=G.createContext(null);var en=function(t){return t.scrollTop},ae="unmounted",U="exited",D="entering",H="entered",Oe="exiting",S=function(e){Ut(t,e);function t(o,r){var s;s=e.call(this,o,r)||this;var i=r,l=i&&!i.isMounting?o.enter:o.appear,d;return s.appearStatus=null,o.in?l?(d=U,s.appearStatus=D):d=H:o.unmountOnExit||o.mountOnEnter?d=ae:d=U,s.state={status:d},s.nextCallback=null,s}t.getDerivedStateFromProps=function(r,s){var i=r.in;return i&&s.status===ae?{status:U}:null};var n=t.prototype;return n.componentDidMount=function(){this.updateStatus(!0,this.appearStatus)},n.componentDidUpdate=function(r){var s=null;if(r!==this.props){var i=this.state.status;this.props.in?i!==D&&i!==H&&(s=D):(i===D||i===H)&&(s=Oe)}this.updateStatus(!1,s)},n.componentWillUnmount=function(){this.cancelNextCallback()},n.getTimeouts=function(){var r=this.props.timeout,s,i,l;return s=i=l=r,r!=null&&typeof r!="number"&&(s=r.exit,i=r.enter,l=r.appear!==void 0?r.appear:i),{exit:s,enter:i,appear:l}},n.updateStatus=function(r,s){if(r===void 0&&(r=!1),s!==null)if(this.cancelNextCallback(),s===D){if(this.props.unmountOnExit||this.props.mountOnEnter){var i=this.props.nodeRef?this.props.nodeRef.current:Q.findDOMNode(this);i&&en(i)}this.performEnter(r)}else this.performExit();else this.props.unmountOnExit&&this.state.status===U&&this.setState({status:ae})},n.performEnter=function(r){var s=this,i=this.props.enter,l=this.context?this.context.isMounting:r,d=this.props.nodeRef?[l]:[Q.findDOMNode(this),l],c=d[0],f=d[1],p=this.getTimeouts(),h=l?p.appear:p.enter;if(!r&&!i||Ve.disabled){this.safeSetState({status:H},function(){s.props.onEntered(c)});return}this.props.onEnter(c,f),this.safeSetState({status:D},function(){s.props.onEntering(c,f),s.onTransitionEnd(h,function(){s.safeSetState({status:H},function(){s.props.onEntered(c,f)})})})},n.performExit=function(){var r=this,s=this.props.exit,i=this.getTimeouts(),l=this.props.nodeRef?void 0:Q.findDOMNode(this);if(!s||Ve.disabled){this.safeSetState({status:U},function(){r.props.onExited(l)});return}this.props.onExit(l),this.safeSetState({status:Oe},function(){r.props.onExiting(l),r.onTransitionEnd(i.exit,function(){r.safeSetState({status:U},function(){r.props.onExited(l)})})})},n.cancelNextCallback=function(){this.nextCallback!==null&&(this.nextCallback.cancel(),this.nextCallback=null)},n.safeSetState=function(r,s){s=this.setNextCallback(s),this.setState(r,s)},n.setNextCallback=function(r){var s=this,i=!0;return this.nextCallback=function(l){i&&(i=!1,s.nextCallback=null,r(l))},this.nextCallback.cancel=function(){i=!1},this.nextCallback},n.onTransitionEnd=function(r,s){this.setNextCallback(s);var i=this.props.nodeRef?this.props.nodeRef.current:Q.findDOMNode(this),l=r==null&&!this.props.addEndListener;if(!i||l){setTimeout(this.nextCallback,0);return}if(this.props.addEndListener){var d=this.props.nodeRef?[this.nextCallback]:[i,this.nextCallback],c=d[0],f=d[1];this.props.addEndListener(c,f)}r!=null&&setTimeout(this.nextCallback,r)},n.render=function(){var r=this.state.status;if(r===ae)return null;var s=this.props,i=s.children;s.in,s.mountOnEnter,s.unmountOnExit,s.appear,s.enter,s.exit,s.timeout,s.addEndListener,s.onEnter,s.onEntering,s.onEntered,s.onExit,s.onExiting,s.onExited,s.nodeRef;var l=Wt(s,["children","in","mountOnEnter","unmountOnExit","appear","enter","exit","timeout","addEndListener","onEnter","onEntering","onEntered","onExit","onExiting","onExited","nodeRef"]);return G.createElement(et.Provider,{value:null},typeof i=="function"?i(r,l):G.cloneElement(G.Children.only(i),l))},t}(G.Component);S.contextType=et;S.propTypes={};function q(){}S.defaultProps={in:!1,mountOnEnter:!1,unmountOnExit:!1,appear:!1,enter:!0,exit:!0,onEnter:q,onEntering:q,onEntered:q,onExit:q,onExiting:q,onExited:q};S.UNMOUNTED=ae;S.EXITED=U;S.ENTERING=D;S.ENTERED=H;S.EXITING=Oe;const tn=S,P=!!(typeof window<"u"&&window.document&&window.document.createElement);var Le=!1,De=!1;try{var Fe={get passive(){return Le=!0},get once(){return De=Le=!0}};P&&(window.addEventListener("test",Fe,Fe),window.removeEventListener("test",Fe,!0))}catch{}function tt(e,t,n,o){if(o&&typeof o!="boolean"&&!De){var r=o.once,s=o.capture,i=n;!De&&r&&(i=n.__once||function l(d){this.removeEventListener(t,l,s),n.call(this,d)},n.__once=i),e.addEventListener(t,i,Le?o:s)}e.addEventListener(t,n,o)}function Be(e,t,n,o){var r=o&&typeof o!="boolean"?o.capture:o;e.removeEventListener(t,n,r),n.__once&&e.removeEventListener(t,n.__once,r)}function ye(e,t,n,o){return tt(e,t,n,o),function(){Be(e,t,n,o)}}function nn(e,t,n,o){if(n===void 0&&(n=!1),o===void 0&&(o=!0),e){var r=document.createEvent("HTMLEvents");r.initEvent(t,n,o),e.dispatchEvent(r)}}function on(e){var t=K(e,"transitionDuration")||"",n=t.indexOf("ms")===-1?1e3:1;return parseFloat(t)*n}function rn(e,t,n){n===void 0&&(n=5);var o=!1,r=setTimeout(function(){o||nn(e,"transitionend",!0)},t+n),s=ye(e,"transitionend",function(){o=!0},{once:!0});return function(){clearTimeout(r),s()}}function nt(e,t,n,o){n==null&&(n=on(e)||0);var r=rn(e,n,o),s=ye(e,"transitionend",t);return function(){r(),s()}}function Xe(e,t){const n=K(e,t)||"",o=n.indexOf("ms")===-1?1e3:1;return parseFloat(n)*o}function sn(e,t){const n=Xe(e,"transitionDuration"),o=Xe(e,"transitionDelay"),r=nt(e,s=>{s.target===e&&(r(),t(s))},n+o)}function an(e){e.offsetHeight}const ze=e=>!e||typeof e=="function"?e:t=>{e.current=t};function ln(e,t){const n=ze(e),o=ze(t);return r=>{n&&n(r),o&&o(r)}}function Te(e,t){return a.useMemo(()=>ln(e,t),[e,t])}function cn(e){return e&&"setState"in e?Q.findDOMNode(e):e??null}const un=G.forwardRef(({onEnter:e,onEntering:t,onEntered:n,onExit:o,onExiting:r,onExited:s,addEndListener:i,children:l,childRef:d,...c},f)=>{const p=a.useRef(null),h=Te(p,d),C=R=>{h(cn(R))},x=R=>N=>{R&&p.current&&R(p.current,N)},k=a.useCallback(x(e),[e]),T=a.useCallback(x(t),[t]),B=a.useCallback(x(n),[n]),I=a.useCallback(x(o),[o]),$=a.useCallback(x(r),[r]),j=a.useCallback(x(s),[s]),A=a.useCallback(x(i),[i]);return u.jsx(tn,{ref:f,...c,onEnter:k,onEntered:B,onEntering:T,onExit:I,onExited:j,onExiting:$,addEndListener:A,nodeRef:p,children:typeof l=="function"?(R,N)=>l(R,{...N,ref:C}):G.cloneElement(l,{ref:C})})}),dn=un;function fn(e){const t=a.useRef(e);return a.useEffect(()=>{t.current=e},[e]),t}function b(e){const t=fn(e);return a.useCallback(function(...n){return t.current&&t.current(...n)},[t])}const pn=e=>a.forwardRef((t,n)=>u.jsx("div",{...t,ref:n,className:v(t.className,e)}));function mn(){return a.useState(null)}function hn(){const e=a.useRef(!0),t=a.useRef(()=>e.current);return a.useEffect(()=>(e.current=!0,()=>{e.current=!1}),[]),t.current}function vn(e){const t=a.useRef(null);return a.useEffect(()=>{t.current=e}),t.current}const gn=typeof global<"u"&&global.navigator&&global.navigator.product==="ReactNative",En=typeof document<"u",Ye=En||gn?a.useLayoutEffect:a.useEffect,yn=["as","disabled"];function xn(e,t){if(e==null)return{};var n={},o=Object.keys(e),r,s;for(s=0;s<o.length;s++)r=o[s],!(t.indexOf(r)>=0)&&(n[r]=e[r]);return n}function Cn(e){return!e||e.trim()==="#"}function ot({tagName:e,disabled:t,href:n,target:o,rel:r,role:s,onClick:i,tabIndex:l=0,type:d}){e||(n!=null||o!=null||r!=null?e="a":e="button");const c={tagName:e};if(e==="button")return[{type:d||"button",disabled:t},c];const f=h=>{if((t||e==="a"&&Cn(n))&&h.preventDefault(),t){h.stopPropagation();return}i==null||i(h)},p=h=>{h.key===" "&&(h.preventDefault(),f(h))};return e==="a"&&(n||(n="#"),t&&(n=void 0)),[{role:s??"button",disabled:void 0,tabIndex:t?void 0:l,href:n,target:e==="a"?o:void 0,"aria-disabled":t||void 0,rel:e==="a"?r:void 0,onClick:f,onKeyDown:p},c]}const Rn=a.forwardRef((e,t)=>{let{as:n,disabled:o}=e,r=xn(e,yn);const[s,{tagName:i}]=ot(Object.assign({tagName:n,disabled:o},r));return u.jsx(i,Object.assign({},r,s,{ref:t}))});Rn.displayName="Button";const Tn={[D]:"show",[H]:"show"},rt=a.forwardRef(({className:e,children:t,transitionClasses:n={},onEnter:o,...r},s)=>{const i={in:!1,timeout:300,mountOnEnter:!1,unmountOnExit:!1,appear:!1,...r},l=a.useCallback((d,c)=>{an(d),o==null||o(d,c)},[o]);return u.jsx(dn,{ref:s,addEndListener:sn,...i,onEnter:l,childRef:t.ref,children:(d,c)=>a.cloneElement(t,{...c,className:v("fade",e,t.props.className,Tn[d],n[d])})})});rt.displayName="Fade";const st=rt,Nn={"aria-label":F.string,onClick:F.func,variant:F.oneOf(["white"])},Ae=a.forwardRef(({className:e,variant:t,"aria-label":n="Close",...o},r)=>u.jsx("button",{ref:r,type:"button",className:v("btn-close",t&&`btn-close-${t}`,e),"aria-label":n,...o}));Ae.displayName="CloseButton";Ae.propTypes=Nn;const wn=Ae,at=a.forwardRef(({as:e,bsPrefix:t,variant:n="primary",size:o,active:r=!1,disabled:s=!1,className:i,...l},d)=>{const c=E(t,"btn"),[f,{tagName:p}]=ot({tagName:e,disabled:s,...l}),h=p;return u.jsx(h,{...f,...l,ref:d,disabled:s,className:v(i,c,r&&"active",n&&`${c}-${n}`,o&&`${c}-${o}`,l.href&&s&&"disabled")})});at.displayName="Button";const No=at;function bn(e){const t=a.useRef(e);return t.current=e,t}function it(e){const t=bn(e);a.useEffect(()=>()=>t.current(),[])}function kn(e,t){return a.Children.toArray(e).some(n=>a.isValidElement(n)&&n.type===t)}function Fn({as:e,bsPrefix:t,className:n,...o}){t=E(t,"col");const r=Kt(),s=Vt(),i=[],l=[];return r.forEach(d=>{const c=o[d];delete o[d];let f,p,h;typeof c=="object"&&c!=null?{span:f,offset:p,order:h}=c:f=c;const C=d!==s?`-${d}`:"";f&&i.push(f===!0?`${t}${C}`:`${t}${C}-${f}`),h!=null&&l.push(`order${C}-${h}`),p!=null&&l.push(`offset${C}-${p}`)}),[{...o,className:v(n,...i,...l)},{as:e,bsPrefix:t,spans:i}]}const lt=a.forwardRef((e,t)=>{const[{className:n,...o},{as:r="div",bsPrefix:s,spans:i}]=Fn(e);return u.jsx(r,{...o,ref:t,className:v(n,!i.length&&s)})});lt.displayName="Col";const Mn=lt;var Sn=Function.prototype.bind.call(Function.prototype.call,[].slice);function Z(e,t){return Sn(e.querySelectorAll(t))}function qe(e,t){if(e.contains)return e.contains(t);if(e.compareDocumentPosition)return e===t||!!(e.compareDocumentPosition(t)&16)}const $n="data-rr-ui-";function jn(e){return`${$n}${e}`}const ct=a.createContext(P?window:void 0);ct.Provider;function _e(){return a.useContext(ct)}const On={type:F.string,tooltip:F.bool,as:F.elementType},We=a.forwardRef(({as:e="div",className:t,type:n="valid",tooltip:o=!1,...r},s)=>u.jsx(e,{...r,ref:s,className:v(t,`${n}-${o?"tooltip":"feedback"}`)}));We.displayName="Feedback";We.propTypes=On;const ut=We,Ln=a.createContext({}),M=Ln,dt=a.forwardRef(({id:e,bsPrefix:t,className:n,type:o="checkbox",isValid:r=!1,isInvalid:s=!1,as:i="input",...l},d)=>{const{controlId:c}=a.useContext(M);return t=E(t,"form-check-input"),u.jsx(i,{...l,ref:d,type:o,id:e||c,className:v(n,t,r&&"is-valid",s&&"is-invalid")})});dt.displayName="FormCheckInput";const ft=dt,pt=a.forwardRef(({bsPrefix:e,className:t,htmlFor:n,...o},r)=>{const{controlId:s}=a.useContext(M);return e=E(e,"form-check-label"),u.jsx("label",{...o,ref:r,htmlFor:n||s,className:v(t,e)})});pt.displayName="FormCheckLabel";const Ie=pt,mt=a.forwardRef(({id:e,bsPrefix:t,bsSwitchPrefix:n,inline:o=!1,reverse:r=!1,disabled:s=!1,isValid:i=!1,isInvalid:l=!1,feedbackTooltip:d=!1,feedback:c,feedbackType:f,className:p,style:h,title:C="",type:x="checkbox",label:k,children:T,as:B="input",...I},$)=>{t=E(t,"form-check"),n=E(n,"form-switch");const{controlId:j}=a.useContext(M),A=a.useMemo(()=>({controlId:e||j}),[j,e]),R=!T&&k!=null&&k!==!1||kn(T,Ie),N=u.jsx(ft,{...I,type:x==="switch"?"checkbox":x,ref:$,isValid:i,isInvalid:l,disabled:s,as:B});return u.jsx(M.Provider,{value:A,children:u.jsx("div",{style:h,className:v(p,R&&t,o&&`${t}-inline`,r&&`${t}-reverse`,x==="switch"&&n),children:T||u.jsxs(u.Fragment,{children:[N,R&&u.jsx(Ie,{title:C,children:k}),c&&u.jsx(ut,{type:f,tooltip:d,children:c})]})})})});mt.displayName="FormCheck";const xe=Object.assign(mt,{Input:ft,Label:Ie}),ht=a.forwardRef(({bsPrefix:e,type:t,size:n,htmlSize:o,id:r,className:s,isValid:i=!1,isInvalid:l=!1,plaintext:d,readOnly:c,as:f="input",...p},h)=>{const{controlId:C}=a.useContext(M);return e=E(e,"form-control"),u.jsx(f,{...p,type:t,size:o,ref:h,readOnly:c,id:r||C,className:v(s,d?`${e}-plaintext`:e,n&&`${e}-${n}`,t==="color"&&`${e}-color`,i&&"is-valid",l&&"is-invalid")})});ht.displayName="FormControl";const Dn=Object.assign(ht,{Feedback:ut}),vt=a.forwardRef(({className:e,bsPrefix:t,as:n="div",...o},r)=>(t=E(t,"form-floating"),u.jsx(n,{ref:r,className:v(e,t),...o})));vt.displayName="FormFloating";const Bn=vt,gt=a.forwardRef(({controlId:e,as:t="div",...n},o)=>{const r=a.useMemo(()=>({controlId:e}),[e]);return u.jsx(M.Provider,{value:r,children:u.jsx(t,{...n,ref:o})})});gt.displayName="FormGroup";const Et=gt,yt=a.forwardRef(({as:e="label",bsPrefix:t,column:n=!1,visuallyHidden:o=!1,className:r,htmlFor:s,...i},l)=>{const{controlId:d}=a.useContext(M);t=E(t,"form-label");let c="col-form-label";typeof n=="string"&&(c=`${c} ${c}-${n}`);const f=v(r,t,o&&"visually-hidden",n&&c);return s=s||d,n?u.jsx(Mn,{ref:l,as:"label",className:f,htmlFor:s,...i}):u.jsx(e,{ref:l,className:f,htmlFor:s,...i})});yt.displayName="FormLabel";const In=yt,xt=a.forwardRef(({bsPrefix:e,className:t,id:n,...o},r)=>{const{controlId:s}=a.useContext(M);return e=E(e,"form-range"),u.jsx("input",{...o,type:"range",ref:r,className:v(t,e),id:n||s})});xt.displayName="FormRange";const An=xt,Ct=a.forwardRef(({bsPrefix:e,size:t,htmlSize:n,className:o,isValid:r=!1,isInvalid:s=!1,id:i,...l},d)=>{const{controlId:c}=a.useContext(M);return e=E(e,"form-select"),u.jsx("select",{...l,size:n,ref:d,className:v(o,e,t&&`${e}-${t}`,r&&"is-valid",s&&"is-invalid"),id:i||c})});Ct.displayName="FormSelect";const _n=Ct,Rt=a.forwardRef(({bsPrefix:e,className:t,as:n="small",muted:o,...r},s)=>(e=E(e,"form-text"),u.jsx(n,{...r,ref:s,className:v(t,e,o&&"text-muted")})));Rt.displayName="FormText";const Wn=Rt,Tt=a.forwardRef((e,t)=>u.jsx(xe,{...e,ref:t,type:"switch"}));Tt.displayName="Switch";const Un=Object.assign(Tt,{Input:xe.Input,Label:xe.Label}),Nt=a.forwardRef(({bsPrefix:e,className:t,children:n,controlId:o,label:r,...s},i)=>(e=E(e,"form-floating"),u.jsxs(Et,{ref:i,className:v(t,e),controlId:o,...s,children:[n,u.jsx("label",{htmlFor:o,children:r})]})));Nt.displayName="FloatingLabel";const Hn=Nt,Gn={_ref:F.any,validated:F.bool,as:F.elementType},Ue=a.forwardRef(({className:e,validated:t,as:n="form",...o},r)=>u.jsx(n,{...o,ref:r,className:v(e,t&&"was-validated")}));Ue.displayName="Form";Ue.propTypes=Gn;const wo=Object.assign(Ue,{Group:Et,Control:Dn,Floating:Bn,Check:xe,Switch:Un,Label:In,Text:Wn,Range:An,Select:_n,FloatingLabel:Hn});var Ee;function Ze(e){if((!Ee&&Ee!==0||e)&&P){var t=document.createElement("div");t.style.position="absolute",t.style.top="-9999px",t.style.width="50px",t.style.height="50px",t.style.overflow="scroll",document.body.appendChild(t),Ee=t.offsetWidth-t.clientWidth,document.body.removeChild(t)}return Ee}function Me(e){e===void 0&&(e=Re());try{var t=e.activeElement;return!t||!t.nodeName?null:t}catch{return e.body}}function Kn(e=document){const t=e.defaultView;return Math.abs(t.innerWidth-e.documentElement.clientWidth)}const Je=jn("modal-open");class Vn{constructor({ownerDocument:t,handleContainerOverflow:n=!0,isRTL:o=!1}={}){this.handleContainerOverflow=n,this.isRTL=o,this.modals=[],this.ownerDocument=t}getScrollbarWidth(){return Kn(this.ownerDocument)}getElement(){return(this.ownerDocument||document).body}setModalAttributes(t){}removeModalAttributes(t){}setContainerStyle(t){const n={overflow:"hidden"},o=this.isRTL?"paddingLeft":"paddingRight",r=this.getElement();t.style={overflow:r.style.overflow,[o]:r.style[o]},t.scrollBarWidth&&(n[o]=`${parseInt(K(r,o)||"0",10)+t.scrollBarWidth}px`),r.setAttribute(Je,""),K(r,n)}reset(){[...this.modals].forEach(t=>this.remove(t))}removeContainerStyle(t){const n=this.getElement();n.removeAttribute(Je),Object.assign(n.style,t.style)}add(t){let n=this.modals.indexOf(t);return n!==-1||(n=this.modals.length,this.modals.push(t),this.setModalAttributes(t),n!==0)||(this.state={scrollBarWidth:this.getScrollbarWidth(),style:{}},this.handleContainerOverflow&&this.setContainerStyle(this.state)),n}remove(t){const n=this.modals.indexOf(t);n!==-1&&(this.modals.splice(n,1),!this.modals.length&&this.handleContainerOverflow&&this.removeContainerStyle(this.state),this.removeModalAttributes(t))}isTopModal(t){return!!this.modals.length&&this.modals[this.modals.length-1]===t}}const He=Vn,Se=(e,t)=>P?e==null?(t||Re()).body:(typeof e=="function"&&(e=e()),e&&"current"in e&&(e=e.current),e&&("nodeType"in e||e.getBoundingClientRect)?e:null):null;function Xn(e,t){const n=_e(),[o,r]=a.useState(()=>Se(e,n==null?void 0:n.document));if(!o){const s=Se(e);s&&r(s)}return a.useEffect(()=>{t&&o&&t(o)},[t,o]),a.useEffect(()=>{const s=Se(e);s!==o&&r(s)},[e,o]),o}function zn({children:e,in:t,onExited:n,mountOnEnter:o,unmountOnExit:r}){const s=a.useRef(null),i=a.useRef(t),l=b(n);a.useEffect(()=>{t?i.current=!0:l(s.current)},[t,l]);const d=Te(s,e.ref),c=a.cloneElement(e,{ref:d});return t?c:r||!i.current&&o?null:c}function Yn({in:e,onTransition:t}){const n=a.useRef(null),o=a.useRef(!0),r=b(t);return Ye(()=>{if(!n.current)return;let s=!1;return r({in:e,element:n.current,initial:o.current,isStale:()=>s}),()=>{s=!0}},[e,r]),Ye(()=>(o.current=!1,()=>{o.current=!0}),[]),n}function qn({children:e,in:t,onExited:n,onEntered:o,transition:r}){const[s,i]=a.useState(!t);t&&s&&i(!1);const l=Yn({in:!!t,onTransition:c=>{const f=()=>{c.isStale()||(c.in?o==null||o(c.element,c.initial):(i(!0),n==null||n(c.element)))};Promise.resolve(r(c)).then(f,p=>{throw c.in||i(!0),p})}}),d=Te(l,e.ref);return s&&!t?null:a.cloneElement(e,{ref:d})}function Qe(e,t,n){return e?u.jsx(e,Object.assign({},n)):t?u.jsx(qn,Object.assign({},n,{transition:t})):u.jsx(zn,Object.assign({},n))}function Zn(e){return e.code==="Escape"||e.keyCode===27}const Jn=["show","role","className","style","children","backdrop","keyboard","onBackdropClick","onEscapeKeyDown","transition","runTransition","backdropTransition","runBackdropTransition","autoFocus","enforceFocus","restoreFocus","restoreFocusOptions","renderDialog","renderBackdrop","manager","container","onShow","onHide","onExit","onExited","onExiting","onEnter","onEntering","onEntered"];function Qn(e,t){if(e==null)return{};var n={},o=Object.keys(e),r,s;for(s=0;s<o.length;s++)r=o[s],!(t.indexOf(r)>=0)&&(n[r]=e[r]);return n}let $e;function Pn(e){return $e||($e=new He({ownerDocument:e==null?void 0:e.document})),$e}function eo(e){const t=_e(),n=e||Pn(t),o=a.useRef({dialog:null,backdrop:null});return Object.assign(o.current,{add:()=>n.add(o.current),remove:()=>n.remove(o.current),isTopModal:()=>n.isTopModal(o.current),setDialogRef:a.useCallback(r=>{o.current.dialog=r},[]),setBackdropRef:a.useCallback(r=>{o.current.backdrop=r},[])})}const wt=a.forwardRef((e,t)=>{let{show:n=!1,role:o="dialog",className:r,style:s,children:i,backdrop:l=!0,keyboard:d=!0,onBackdropClick:c,onEscapeKeyDown:f,transition:p,runTransition:h,backdropTransition:C,runBackdropTransition:x,autoFocus:k=!0,enforceFocus:T=!0,restoreFocus:B=!0,restoreFocusOptions:I,renderDialog:$,renderBackdrop:j=g=>u.jsx("div",Object.assign({},g)),manager:A,container:R,onShow:N,onHide:ie=()=>{},onExit:le,onExited:ee,onExiting:ce,onEnter:ue,onEntering:de,onEntered:Ne}=e,we=Qn(e,Jn);const O=_e(),V=Xn(R),y=eo(A),fe=hn(),te=vn(n),[_,L]=a.useState(!n),w=a.useRef(null);a.useImperativeHandle(t,()=>y,[y]),P&&!te&&n&&(w.current=Me(O==null?void 0:O.document)),n&&_&&L(!1);const pe=b(()=>{if(y.add(),z.current=ye(document,"keydown",ke),X.current=ye(document,"focus",()=>setTimeout(me),!0),N&&N(),k){var g,ve;const se=Me((g=(ve=y.dialog)==null?void 0:ve.ownerDocument)!=null?g:O==null?void 0:O.document);y.dialog&&se&&!qe(y.dialog,se)&&(w.current=se,y.dialog.focus())}}),ne=b(()=>{if(y.remove(),z.current==null||z.current(),X.current==null||X.current(),B){var g;(g=w.current)==null||g.focus==null||g.focus(I),w.current=null}});a.useEffect(()=>{!n||!V||pe()},[n,V,pe]),a.useEffect(()=>{_&&ne()},[_,ne]),it(()=>{ne()});const me=b(()=>{if(!T||!fe()||!y.isTopModal())return;const g=Me(O==null?void 0:O.document);y.dialog&&g&&!qe(y.dialog,g)&&y.dialog.focus()}),be=b(g=>{g.target===g.currentTarget&&(c==null||c(g),l===!0&&ie())}),ke=b(g=>{d&&Zn(g)&&y.isTopModal()&&(f==null||f(g),g.defaultPrevented||ie())}),X=a.useRef(),z=a.useRef(),oe=(...g)=>{L(!0),ee==null||ee(...g)};if(!V)return null;const he=Object.assign({role:o,ref:y.setDialogRef,"aria-modal":o==="dialog"?!0:void 0},we,{style:s,className:r,tabIndex:-1});let re=$?$(he):u.jsx("div",Object.assign({},he,{children:a.cloneElement(i,{role:"document"})}));re=Qe(p,h,{unmountOnExit:!0,mountOnEnter:!0,appear:!0,in:!!n,onExit:le,onExiting:ce,onExited:oe,onEnter:ue,onEntering:de,onEntered:Ne,children:re});let W=null;return l&&(W=j({ref:y.setBackdropRef,onClick:be}),W=Qe(C,x,{in:!!n,appear:!0,mountOnEnter:!0,unmountOnExit:!0,children:W})),u.jsx(u.Fragment,{children:Q.createPortal(u.jsxs(u.Fragment,{children:[W,re]}),V)})});wt.displayName="Modal";const to=Object.assign(wt,{Manager:He});function no(e,t){return e.classList?!!t&&e.classList.contains(t):(" "+(e.className.baseVal||e.className)+" ").indexOf(" "+t+" ")!==-1}function oo(e,t){e.classList?e.classList.add(t):no(e,t)||(typeof e.className=="string"?e.className=e.className+" "+t:e.setAttribute("class",(e.className&&e.className.baseVal||"")+" "+t))}function Pe(e,t){return e.replace(new RegExp("(^|\\s)"+t+"(?:\\s|$)","g"),"$1").replace(/\s+/g," ").replace(/^\s*|\s*$/g,"")}function ro(e,t){e.classList?e.classList.remove(t):typeof e.className=="string"?e.className=Pe(e.className,t):e.setAttribute("class",Pe(e.className&&e.className.baseVal||"",t))}const J={FIXED_CONTENT:".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",STICKY_CONTENT:".sticky-top",NAVBAR_TOGGLER:".navbar-toggler"};class so extends He{adjustAndStore(t,n,o){const r=n.style[t];n.dataset[t]=r,K(n,{[t]:`${parseFloat(K(n,t))+o}px`})}restore(t,n){const o=n.dataset[t];o!==void 0&&(delete n.dataset[t],K(n,{[t]:o}))}setContainerStyle(t){super.setContainerStyle(t);const n=this.getElement();if(oo(n,"modal-open"),!t.scrollBarWidth)return;const o=this.isRTL?"paddingLeft":"paddingRight",r=this.isRTL?"marginLeft":"marginRight";Z(n,J.FIXED_CONTENT).forEach(s=>this.adjustAndStore(o,s,t.scrollBarWidth)),Z(n,J.STICKY_CONTENT).forEach(s=>this.adjustAndStore(r,s,-t.scrollBarWidth)),Z(n,J.NAVBAR_TOGGLER).forEach(s=>this.adjustAndStore(r,s,t.scrollBarWidth))}removeContainerStyle(t){super.removeContainerStyle(t);const n=this.getElement();ro(n,"modal-open");const o=this.isRTL?"paddingLeft":"paddingRight",r=this.isRTL?"marginLeft":"marginRight";Z(n,J.FIXED_CONTENT).forEach(s=>this.restore(o,s)),Z(n,J.STICKY_CONTENT).forEach(s=>this.restore(r,s)),Z(n,J.NAVBAR_TOGGLER).forEach(s=>this.restore(r,s))}}let je;function ao(e){return je||(je=new so(e)),je}const bt=a.forwardRef(({className:e,bsPrefix:t,as:n="div",...o},r)=>(t=E(t,"modal-body"),u.jsx(n,{ref:r,className:v(e,t),...o})));bt.displayName="ModalBody";const io=bt,lo=a.createContext({onHide(){}}),kt=lo,Ft=a.forwardRef(({bsPrefix:e,className:t,contentClassName:n,centered:o,size:r,fullscreen:s,children:i,scrollable:l,...d},c)=>{e=E(e,"modal");const f=`${e}-dialog`,p=typeof s=="string"?`${e}-fullscreen-${s}`:`${e}-fullscreen`;return u.jsx("div",{...d,ref:c,className:v(f,t,r&&`${e}-${r}`,o&&`${f}-centered`,l&&`${f}-scrollable`,s&&p),children:u.jsx("div",{className:v(`${e}-content`,n),children:i})})});Ft.displayName="ModalDialog";const Mt=Ft,St=a.forwardRef(({className:e,bsPrefix:t,as:n="div",...o},r)=>(t=E(t,"modal-footer"),u.jsx(n,{ref:r,className:v(e,t),...o})));St.displayName="ModalFooter";const co=St,uo=a.forwardRef(({closeLabel:e="Close",closeVariant:t,closeButton:n=!1,onHide:o,children:r,...s},i)=>{const l=a.useContext(kt),d=b(()=>{l==null||l.onHide(),o==null||o()});return u.jsxs("div",{ref:i,...s,children:[r,n&&u.jsx(wn,{"aria-label":e,variant:t,onClick:d})]})}),fo=uo,$t=a.forwardRef(({bsPrefix:e,className:t,closeLabel:n="Close",closeButton:o=!1,...r},s)=>(e=E(e,"modal-header"),u.jsx(fo,{ref:s,...r,className:v(t,e),closeLabel:n,closeButton:o})));$t.displayName="ModalHeader";const po=$t,mo=pn("h4"),jt=a.forwardRef(({className:e,bsPrefix:t,as:n=mo,...o},r)=>(t=E(t,"modal-title"),u.jsx(n,{ref:r,className:v(e,t),...o})));jt.displayName="ModalTitle";const ho=jt;function vo(e){return u.jsx(st,{...e,timeout:null})}function go(e){return u.jsx(st,{...e,timeout:null})}const Ot=a.forwardRef(({bsPrefix:e,className:t,style:n,dialogClassName:o,contentClassName:r,children:s,dialogAs:i=Mt,"aria-labelledby":l,"aria-describedby":d,"aria-label":c,show:f=!1,animation:p=!0,backdrop:h=!0,keyboard:C=!0,onEscapeKeyDown:x,onShow:k,onHide:T,container:B,autoFocus:I=!0,enforceFocus:$=!0,restoreFocus:j=!0,restoreFocusOptions:A,onEntered:R,onExit:N,onExiting:ie,onEnter:le,onEntering:ee,onExited:ce,backdropClassName:ue,manager:de,...Ne},we)=>{const[O,V]=a.useState({}),[y,fe]=a.useState(!1),te=a.useRef(!1),_=a.useRef(!1),L=a.useRef(null),[w,pe]=mn(),ne=Te(we,pe),me=b(T),be=Xt();e=E(e,"modal");const ke=a.useMemo(()=>({onHide:me}),[me]);function X(){return de||ao({isRTL:be})}function z(m){if(!P)return;const Y=X().getScrollbarWidth()>0,Ke=m.scrollHeight>Re(m).documentElement.clientHeight;V({paddingRight:Y&&!Ke?Ze():void 0,paddingLeft:!Y&&Ke?Ze():void 0})}const oe=b(()=>{w&&z(w.dialog)});it(()=>{Be(window,"resize",oe),L.current==null||L.current()});const he=()=>{te.current=!0},re=m=>{te.current&&w&&m.target===w.dialog&&(_.current=!0),te.current=!1},W=()=>{fe(!0),L.current=nt(w.dialog,()=>{fe(!1)})},g=m=>{m.target===m.currentTarget&&W()},ve=m=>{if(h==="static"){g(m);return}if(_.current||m.target!==m.currentTarget){_.current=!1;return}T==null||T()},se=m=>{C?x==null||x(m):(m.preventDefault(),h==="static"&&W())},Lt=(m,Y)=>{m&&z(m),le==null||le(m,Y)},Dt=m=>{L.current==null||L.current(),N==null||N(m)},Bt=(m,Y)=>{ee==null||ee(m,Y),tt(window,"resize",oe)},It=m=>{m&&(m.style.display=""),ce==null||ce(m),Be(window,"resize",oe)},At=a.useCallback(m=>u.jsx("div",{...m,className:v(`${e}-backdrop`,ue,!p&&"show")}),[p,ue,e]),Ge={...n,...O};Ge.display="block";const _t=m=>u.jsx("div",{role:"dialog",...m,style:Ge,className:v(t,e,y&&`${e}-static`,!p&&"show"),onClick:h?ve:void 0,onMouseUp:re,"aria-label":c,"aria-labelledby":l,"aria-describedby":d,children:u.jsx(i,{...Ne,onMouseDown:he,className:o,contentClassName:r,children:s})});return u.jsx(kt.Provider,{value:ke,children:u.jsx(to,{show:f,ref:ne,backdrop:h,container:B,keyboard:!0,autoFocus:I,enforceFocus:$,restoreFocus:j,restoreFocusOptions:A,onEscapeKeyDown:se,onShow:k,onHide:T,onEnter:Lt,onEntering:Bt,onEntered:R,onExit:Dt,onExiting:ie,onExited:It,manager:X(),transition:p?vo:void 0,backdropTransition:p?go:void 0,renderBackdrop:At,renderDialog:_t})})});Ot.displayName="Modal";const bo=Object.assign(Ot,{Body:io,Header:po,Title:ho,Footer:co,Dialog:Mt,TRANSITION_DURATION:300,BACKDROP_TRANSITION_DURATION:150});export{No as B,wo as F,bo as M,pn as d,E as u};