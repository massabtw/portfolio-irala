const {chromium}=require('C:/Users/m84832/AppData/Local/npm-cache/_npx/420ff84f11983ee5/node_modules/playwright');
const assert=require('node:assert/strict');
(async()=>{
const browser=await chromium.launch({channel:'chrome'});
const page=await browser.newPage({viewport:{width:1440,height:1000}});
const errors=[];page.on('pageerror',e=>errors.push(e.message));
await page.goto('http://127.0.0.1:5173/',{waitUntil:'networkidle'});
await page.addStyleTag({content:'html{scroll-behavior:auto!important}'});
await page.waitForTimeout(1600);
const progress=()=>page.locator('.immersive-hero').evaluate(e=>Number(e.style.getPropertyValue('--scene-progress')));
assert.equal(await progress(),0);
await page.screenshot({path:'.preview/immersive-start.png'});
const start=await page.locator('.scene-album').evaluate(e=>getComputedStyle(e).transform);
await page.evaluate(()=>scrollTo(0,500));await page.waitForTimeout(100);
assert.ok(await progress()>.5);
assert.notEqual(await page.locator('.scene-album').evaluate(e=>getComputedStyle(e).transform),start);
await page.screenshot({path:'.preview/immersive-progress.png'});
await page.evaluate(()=>scrollTo(0,0));await page.waitForTimeout(100);
assert.equal(await progress(),0);
await page.getByRole('link',{name:'Explore meus trabalhos',exact:true}).click();
await page.waitForTimeout(1000);
assert.ok(await page.locator('#trabalhos').evaluate(e=>e.getBoundingClientRect().top<300));
for(const [width,height] of [[320,667],[390,844],[768,1024],[1440,700]]){
await page.setViewportSize({width,height});await page.evaluate(()=>scrollTo(0,0));await page.waitForTimeout(100);
assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,'overflow '+width);
if(width===390){
await page.screenshot({path:'.preview/immersive-mobile.png'});
await page.evaluate(()=>scrollTo(0,400));await page.waitForTimeout(100);
assert.ok(await progress()>.5);
await page.screenshot({path:'.preview/immersive-mobile-progress.png'});
}
}
await page.emulateMedia({reducedMotion:'reduce'});await page.waitForTimeout(100);
assert.equal(await page.locator('.scene-stage').evaluate(e=>getComputedStyle(e).position),'relative');
assert.equal(await progress(),0);
assert.deepEqual(errors,[]);
await browser.close();
console.log('PASS: scroll-linked transforms, reverse scroll, project skip link, 4 viewport sizes, reduced motion, no runtime errors.');
})().catch(e=>{console.error(e);process.exit(1)});
