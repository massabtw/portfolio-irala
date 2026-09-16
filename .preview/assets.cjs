const {chromium}=require('C:/Users/m84832/AppData/Local/npm-cache/_npx/420ff84f11983ee5/node_modules/playwright');
const assert=require('node:assert/strict');
(async()=>{const browser=await chromium.launch({channel:'chrome'});const page=await browser.newPage({viewport:{width:390,height:844},reducedMotion:'reduce'});
await page.goto('http://127.0.0.1:5173/',{waitUntil:'networkidle'});
for(const image of await page.locator('img').all()){await image.scrollIntoViewIfNeeded();await image.evaluate(el=>el.decode());}
await page.getByRole('button',{name:'Ver projeto Ritmo Doce',exact:true}).click();
await page.waitForTimeout(200);
assert.equal(await page.locator('dialog').evaluate(e=>e.scrollWidth<=e.clientWidth),true);
for(let i=0;i<14;i++){await page.keyboard.press('Tab');assert.equal(await page.evaluate(()=>document.querySelector('dialog').contains(document.activeElement)),true);}
await page.screenshot({path:'.preview/mobile-modal.png'});
await page.getByRole('button',{name:'Fechar projeto',exact:true}).click();
console.log('PASS: all rendered images decode; mobile modal fits and retains keyboard focus.');
await browser.close();})().catch(e=>{console.error(e);process.exit(1)});
