const { chromium } = require('C:/Users/m84832/AppData/Local/npm-cache/_npx/420ff84f11983ee5/node_modules/playwright');
const assert = require('node:assert/strict');
(async () => {
 const browser = await chromium.launch({channel:'chrome'});
 const page = await browser.newPage({viewport:{width:390,height:844}, colorScheme:'light', reducedMotion:'reduce'});
 const errors=[]; page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://127.0.0.1:5173/',{waitUntil:'networkidle'});
 assert.equal(await page.locator('html').getAttribute('data-theme'),'light');
 assert.equal(await page.getByText('Fragmentos do meu universo visual').count(),0);
 await page.screenshot({path:'.preview/revision-mobile-hero.png'});
 await page.getByRole('button',{name:'Ativar modo escuro'}).click();
 assert.equal(await page.evaluate(()=>getComputedStyle(document.body).backgroundColor),'rgb(41, 45, 51)');
 await page.reload({waitUntil:'networkidle'});
 assert.equal(await page.locator('html').getAttribute('data-theme'),'dark');
 for(const width of [320,390,760,768,1440]) {
   await page.setViewportSize({width,height:900});
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,'Overflow '+width);
   if(width<=760){
    const cards=await page.locator('.project-card').evaluateAll(items=>items.map(e=>({x:e.getBoundingClientRect().x,y:e.getBoundingClientRect().y})));
    assert.equal(cards[0].y,cards[1].y);
    assert.ok(cards[1].x>cards[0].x);
   }
 }
 await page.setViewportSize({width:390,height:844});
 await page.locator('#trabalhos').scrollIntoViewIfNeeded();
 await page.screenshot({path:'.preview/revision-dark-gallery.png'});
 await page.getByRole('button',{name:'Ver projeto Ritmo Doce',exact:true}).click();
 assert.equal(await page.locator('.dialog-bar').innerText(),'Identidade Visual');
 await page.screenshot({path:'.preview/revision-dark-modal.png'});
 await page.keyboard.press('Escape');
 await page.getByRole('button',{name:'Ativar modo claro'}).click();
 await page.locator('#trabalhos').scrollIntoViewIfNeeded();
 await page.screenshot({path:'.preview/revision-light-gallery.png'});
 await page.getByRole('button',{name:'Fotografia',exact:true}).click();
 assert.equal(await page.locator('.project-card').count(),1);
 await page.getByRole('button',{name:'Abrir menu',exact:true}).click();
 await page.getByRole('navigation').getByRole('link',{name:'Sobre mim'}).click();
 assert.equal(await page.getByRole('button',{name:'Abrir menu',exact:true}).getAttribute('aria-expanded'),'false');
 await page.evaluate(()=>localStorage.removeItem('irala-theme'));
 await page.emulateMedia({colorScheme:'dark'});
 await page.reload({waitUntil:'networkidle'});
 assert.equal(await page.locator('html').getAttribute('data-theme'),'dark');
 await page.setViewportSize({width:1440,height:1000});
 await page.goto('http://127.0.0.1:5173/',{waitUntil:'networkidle'});
 await page.screenshot({path:'.preview/revision-dark-desktop.png'});
 assert.deepEqual(errors,[]);
 await browser.close();
 console.log('PASS: light/dark switch, saved preference, system theme, mobile two-column gallery, 5 widths, filters, modal without dates, menu, no runtime errors.');
})().catch(e=>{console.error(e);process.exit(1)});
