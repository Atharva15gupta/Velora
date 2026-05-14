(function(){"use strict";const n={WIDGET_URL:typeof document<"u"&&document.currentScript&&document.currentScript.src?new URL(document.currentScript.src).origin:"http://localhost:3001",DEFAULT_POSITION:"bottom-right"},w=r=>`<img src="${`${new URL(r).origin}/velora-logo.svg?v=202605142258`}" alt="Velora" style="width: 38px; height: 38px; object-fit: contain; display: block;" />`,y=`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <line x1="18" y1="6" x2="6" y2="18"></line>
  <line x1="6" y1="6" x2="18" y2="18"></line>
</svg>`;(function(){let r=null,t=null,e=null,c=!1,l=null,d=n.DEFAULT_POSITION,i="#406AAF";const h=w(n.WIDGET_URL),p=document.currentScript;if(p)l=p.getAttribute("data-workspace-id"),d=p.getAttribute("data-position")||n.DEFAULT_POSITION,i=p.getAttribute("data-theme-color")||i;else{const o=document.querySelectorAll('script[src*="embed"]'),s=Array.from(o).find(a=>a.hasAttribute("data-workspace-id"));s&&(l=s.getAttribute("data-workspace-id"),d=s.getAttribute("data-position")||n.DEFAULT_POSITION,i=s.getAttribute("data-theme-color")||i)}if(!l){console.error("Velora Widget: data-workspace-id attribute is required");return}function m(){document.readyState==="loading"?document.addEventListener("DOMContentLoaded",g):g()}function g(){e=document.createElement("button"),e.id="velora-widget-button",e.innerHTML=h,e.style.cssText=`
      position: fixed;
      ${d==="bottom-right"?"right: 20px;":"left: 20px;"}
      bottom: 20px;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: ${i};
      color: white;
      border: none;
      cursor: pointer;
      z-index: 999999;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 24px ${i}59;
      transition: all 0.2s ease, background 0.3s ease, box-shadow 0.3s ease;
    `,e.addEventListener("click",k),e.addEventListener("mouseenter",()=>{e&&(e.style.transform="scale(1.05)")}),e.addEventListener("mouseleave",()=>{e&&(e.style.transform="scale(1)")}),document.body.appendChild(e),t=document.createElement("div"),t.id="velora-widget-container",t.style.cssText=`
      position: fixed;
      ${d==="bottom-right"?"right: 20px;":"left: 20px;"}
      bottom: 90px;
      width: 410px;
      height: 730px;
      max-width: calc(100vw - 40px);
      max-height: calc(100vh - 110px);
      z-index: 999998;
      border-radius: 24px;
      overflow: hidden;
      box-shadow: 0 4px 24px rgba(0, 0, 0, 0.15);
      display: none;
      opacity: 0;
      transform: translateY(10px);
      transition: all 0.3s ease;
    `,r=document.createElement("iframe"),r.src=L(),r.style.cssText=`
      width: 100%;
      height: 100%;
      border: none;
    `,r.allow="microphone; clipboard-read; clipboard-write",t.appendChild(r),document.body.appendChild(t),window.addEventListener("message",f)}function L(){const o=new URLSearchParams;return o.append("workspaceId",l),`${n.WIDGET_URL}?${o.toString()}`}function f(o){if(o.origin!==new URL(n.WIDGET_URL).origin)return;const{type:s,payload:a}=o.data;switch(s){case"close":u();break;case"resize":a.height&&t&&(t.style.height=`${a.height}px`);break;case"theme_update":a.color&&(i=a.color,e&&(e.style.background=i,e.style.boxShadow=`0 4px 24px ${i}59`));break}}function k(){c?u():x()}function x(){t&&e&&(c=!0,t.style.display="block",setTimeout(()=>{t&&(t.style.opacity="1",t.style.transform="translateY(0)")},10),e.innerHTML=y)}function u(){t&&e&&(c=!1,t.style.opacity="0",t.style.transform="translateY(10px)",setTimeout(()=>{t&&(t.style.display="none")},300),e.innerHTML=h,e.style.background=i,e.style.boxShadow=`0 4px 24px ${i}59`)}function b(){window.removeEventListener("message",f),t&&(t.remove(),t=null,r=null),e&&(e.remove(),e=null),c=!1}function v(o){b(),o.workspaceId&&(l=o.workspaceId),o.position&&(d=o.position),o.themeColor&&(i=o.themeColor),m()}window.VeloraWidget={init:v,show:x,hide:u,destroy:b},m()})()})();
