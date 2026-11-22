/** ARLEKO loader: two restrained edge-on 3D image swaps, static caption, quick reveal. */
(()=>{'use strict';
const root=document.querySelector('[data-ar-loader]');if(!root)return;
const symbol=root.querySelector('[data-ar-symbol]');
const image=root.querySelector('[data-ar-image]');
const sources=['./assets/loader/texture-01.png','./assets/loader/texture-02.png','./assets/loader/texture-03.png'];
const reduceMotion=matchMedia('(prefers-reduced-motion: reduce)').matches;
const delay=ms=>new Promise(resolve=>setTimeout(resolve,ms));
const nextFrame=()=>new Promise(resolve=>requestAnimationFrame(resolve));
const preload=src=>new Promise(resolve=>{const item=new Image();item.onload=item.onerror=resolve;item.src=src});
let finished=false;
async function exit(){if(finished)return;finished=true;root.classList.add('is-exiting');document.body.classList.remove('is-loading');await delay(reduceMotion?0:470);root.hidden=true;root.dispatchEvent(new CustomEvent('arleko:loader-complete',{bubbles:true}))}
async function flip(index){
const first=symbol.animate([{transform:'rotateY(0deg)'},{transform:'rotateY(90deg)'}],{duration:355,easing:'cubic-bezier(.55,.05,.7,.42)',fill:'forwards'});
await first.finished.catch(()=>{});
symbol.style.transform='rotateY(-90deg)';first.cancel();image.src=sources[index];await nextFrame();
const second=symbol.animate([{transform:'rotateY(-90deg)'},{transform:'rotateY(0deg)'}],{duration:355,easing:'cubic-bezier(.2,.65,.25,1)',fill:'forwards'});
await second.finished.catch(()=>{});symbol.style.transform='rotateY(0deg)';second.cancel();
}
async function run(){
document.body.classList.add('is-loading');
if(reduceMotion){await delay(350);await exit();return}
const failsafe=setTimeout(exit,6000);
try{await Promise.race([Promise.all(sources.map(preload)),delay(750)]);await delay(320);await flip(1);await delay(480);await flip(2);await delay(580)}
finally{clearTimeout(failsafe);await exit()}
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run,{once:true});else run();
})();