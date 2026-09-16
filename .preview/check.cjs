const { chromium } = require('C:/Users/m84832/AppData/Local/npm-cache/_npx/420ff84f11983ee5/node_modules/playwright');
const assert = require('node:assert/strict');
(async () => {
 const browser = await chromium.launch({executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true});
 const page = await browser.newPage({viewport:{width:1440,height:1000}});
 const errors = [];
 page.on('pageerror', e => errors.push(e.message));
 await page.goto('http://127.0.0.1:5173/', {waitUntil:'networkidle'});
 await page.screenshot({path:'.preview/desktop.png'});
 await page.locator('#trabalhos').scrollIntoViewIfNeeded();
 await page.waitForTimeout(950);
 await page.screenshot({path:'.preview/gallery.png'});
 assert.equal(await page.locator('.project-button').count(), 4);
 await page.getByRole('button', {name:'Fotografia',exact:true}).click();
 assert.equal(await page.locator('.project-button').count(), 1);
 await page.getByRole('button', {name:'Ver projeto Fotografia de Rua',exact:true}).click();
 await page.waitForTimeout(300);
 assert.equal(await page.locator('dialog').evaluate(e=>e.open),true);
 await page.getByRole('button',{name:'Próxima imagem',exact:true}).click();
 assert.match(await page.locator('.gallery-stage img').getAttribute('src'), /2-luz/);
 await page.keyboard.press('ArrowLeft');
 assert.match(await page.locator('.gallery-stage img').getAttribute('src'), /1-cover/);
 await page.screenshot({path:'.preview/modal.png'});
 await page.keyboard.press('Escape');
 assert.equal(await page.locator('dialog').count(),0);
 assert.equal(await page.evaluate(()=>document.activeElement?.getAttribute('aria-label')), 'Ver projeto Fotografia de Rua');
 await page.getByRole('button',{name:'Todos',exact:true}).click();
 for (const width of [320,390,768,1440]) {
   await page.setViewportSize({width,height:900});
   await page.goto('http://127.0.0.1:5173/',{waitUntil:'networkidle'});
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth <= innerWidth),true, 'Overflow at '+width);
   if(width===390){
     await page.screenshot({path:'.preview/mobile.png'});
     await page.getByRole('button',{name:'Abrir menu',exact:true}).click();
     await page.getByRole('navigation').getByRole('link',{name:'Sobre mim'}).click();
     assert.equal(await page.getByRole('button',{name:'Abrir menu',exact:true}).getAttribute('aria-expanded'),'false');
   }
 }
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.goto('http://127.0.0.1:5173/?projeto=ritmo-doce',{waitUntil:'networkidle'});
 assert.equal(await page.locator('dialog').evaluate(e=>e.open),true);
 await page.keyboard.press('Escape');
 assert.equal(await page.locator('.is-waiting').count(),0);
 await page.locator('#contato').scrollIntoViewIfNeeded();
 await page.screenshot({path:'.preview/contact.png'});
 assert.deepEqual(errors,[]);
 console.log('PASS: build UI, 4 widths without overflow, category filters, modal, arrows, Escape, focus restoration, mobile navigation, project deep link, reduced motion, no runtime errors.');
 await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
