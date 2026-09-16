const {chromium}=require('C:/Users/m84832/AppData/Local/npm-cache/_npx/420ff84f11983ee5/node_modules/playwright');
const assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({channel:'chrome'});
 const page=await browser.newPage({viewport:{width:1440,height:1000}});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://127.0.0.1:5173/',{waitUntil:'networkidle'});
 assert.equal(await page.locator('.service').count(),3);
 assert.ok(await page.locator('#habilidades .is-waiting').count()>0);
 await page.locator('#habilidades').scrollIntoViewIfNeeded();
 await page.waitForTimeout(1300);
 assert.equal(await page.locator('#habilidades .is-waiting').count(),0);
 await page.screenshot({path:'.preview/services-desktop.png'});
 await page.locator('#contato').scrollIntoViewIfNeeded();await page.waitForTimeout(1300);
 const whatsapp=page.locator('.whatsapp-contact');
 assert.match(await whatsapp.getAttribute('href'),/^https:\/\/wa.me\/554191941108/);
 assert.match(await whatsapp.innerText(),/WhatsApp/);
 await page.screenshot({path:'.preview/contacts-desktop.png'});
 for(const theme of ['light','dark']){
  await page.evaluate(t=>document.documentElement.dataset.theme=t,theme);
  for(const width of [320,390,768,1440]){
   await page.setViewportSize({width,height:900});
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,theme+' '+width);
  }
 }
 await page.setViewportSize({width:390,height:844});
 await page.locator('#habilidades').scrollIntoViewIfNeeded();
 await page.screenshot({path:'.preview/services-mobile.png'});
 await page.locator('#contato').scrollIntoViewIfNeeded();
 await page.screenshot({path:'.preview/contacts-mobile.png'});
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.reload({waitUntil:'networkidle'});
 assert.equal(await page.locator('.is-waiting').count(),0);
 assert.equal(await page.locator('.about-photo img').evaluate(e=>getComputedStyle(e).animationName),'none');
 assert.deepEqual(errors,[]);
 await browser.close();console.log('PASS: services, scroll reveals, WhatsApp URL, 4 widths in both themes, reduced motion, no runtime errors.');
})().catch(e=>{console.error(e);process.exit(1)});
