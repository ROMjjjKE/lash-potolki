import puppeteer from 'puppeteer-core';
const URL = 'https://romjjjke.github.io/lash-potolki/';
const b = await puppeteer.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox'] });
const p = await b.newPage();
await p.setViewport({ width: 1440, height: 900 });
await p.goto(URL, { waitUntil: 'networkidle2' });
await p.evaluate(() => { document.documentElement.style.scrollBehavior = 'auto'; });
await p.evaluate(() => document.fonts.ready);
await new Promise(r => setTimeout(r, 1000));
await p.screenshot({ path: 'screenshots/desktop-1440.png' });

const jump = async (sel, off) => {
  await p.evaluate((s, o) => { const el = document.querySelector(s); window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - o, behavior: 'instant' }); }, sel, off);
  await new Promise(r => setTimeout(r, 800));
};
await jump('#komnaty', 80);
await p.screenshot({ path: 'screenshots/desktop-komnaty.png' });

// образцы: сначала подходим к сцене, чтобы пин успел включиться
await jump('.samples', 400);
await new Promise(r => setTimeout(r, 900));
const stage = await p.evaluate(() => Math.round(document.querySelector('.samples__stage').getBoundingClientRect().top + window.scrollY));
await p.evaluate(y => window.scrollTo({ top: y + 700, behavior: 'instant' }), stage);
await new Promise(r => setTimeout(r, 1000));
console.log('samples', await p.evaluate(() => ({ cls: document.querySelector('.samples').className, cap: document.querySelector('.plane__cap').innerText })));
await p.screenshot({ path: 'screenshots/desktop-obrazcy.png' });

await jump('#poryadok', 80);
await p.screenshot({ path: 'screenshots/desktop-poryadok.png' });
await jump('#garantiya', 80);
await p.screenshot({ path: 'screenshots/desktop-garantiya.png' });
await jump('#zayavka', 70);
await p.screenshot({ path: 'screenshots/desktop-zayavka.png' });
await p.close();

const m = await b.newPage();
await m.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
await m.goto(URL, { waitUntil: 'networkidle2' });
await m.evaluate(() => { document.documentElement.style.scrollBehavior = 'auto'; });
await m.evaluate(() => document.fonts.ready);
await new Promise(r => setTimeout(r, 1000));
await m.screenshot({ path: 'screenshots/mobile-390.png' });
const mj = async (sel, off) => {
  await m.evaluate((s, o) => { const el = document.querySelector(s); window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - o, behavior: 'instant' }); }, sel, off);
  await new Promise(r => setTimeout(r, 800));
};
await mj('#obrazcy', 60);
await m.screenshot({ path: 'screenshots/mobile-390-obrazcy.png' });
await mj('#zayavka', 60);
await m.screenshot({ path: 'screenshots/mobile-390-zayavka.png' });
await m.close();
await b.close();
console.log('shots ok');
