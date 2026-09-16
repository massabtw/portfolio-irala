const sharp = require('C:/Users/m84832/AppData/Local/npm-cache/_npx/76dc10efc80ca823/node_modules/sharp');
const fs = require('node:fs/promises');
const path = require('node:path');
(async () => {
 let before=0,after=0;
 for (const dir of await fs.readdir('public/projects')) {
  for (const file of await fs.readdir(path.join('public/projects', dir))) {
   if(!file.endsWith('.jpeg')) continue;
   const input=path.join('public/projects',dir,file);
   const output=input.replace('.jpeg','.webp');
   before += (await fs.stat(input)).size;
   await sharp(input).rotate().resize({width:1600,height:1600,fit:'inside',withoutEnlargement:true}).webp({quality:84}).toFile(output);
   await sharp(input).rotate().resize({width:640,height:640,fit:'inside',withoutEnlargement:true}).webp({quality:80}).toFile(input.replace('.jpeg','-preview.webp'));
   after += (await fs.stat(output)).size;
  }
 }
 for(const file of ['src/data/projects.ts','src/components/Hero.tsx','src/components/About.tsx']){
  const contents=await fs.readFile(file,'utf8');
  await fs.writeFile(file,contents.replaceAll('.jpeg','.webp'));
 }
 const hero='src/components/Hero.tsx';
 await fs.writeFile(hero,(await fs.readFile(hero,'utf8')).replaceAll('1-cover.webp','1-cover-preview.webp'));
 console.log(JSON.stringify({originalBytes:before,webpBytes:after,reduction:Math.round((1-after/before)*100)+'%'}));
})().catch(e=>{console.error(e);process.exit(1)});
