import puppeteer from 'puppeteer-core';
const b = await puppeteer.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox'] });
const p = await b.newPage();
await p.setViewport({ width: 1440, height: 900 });
await p.goto('http://127.0.0.1:4240/lash-potolki/', { waitUntil: 'networkidle2' });
await p.evaluate(() => { document.documentElement.style.scrollBehavior = 'auto'; });
await p.evaluate(() => document.fonts.ready);
await new Promise(r => setTimeout(r, 700));
const pre = await p.evaluate(() => Math.round(document.querySelector('.samples').getBoundingClientRect().top + window.scrollY));
await p.evaluate(y => window.scrollTo({ top: y, behavior: 'instant' }), pre - 500);
await new Promise(r => setTimeout(r, 1200));
console.log('after approach', await p.evaluate(() => ({ cls: document.querySelector('.samples').className, stageTop: Math.round(document.querySelector('.samples__stage').getBoundingClientRect().top) })));
const stage = await p.evaluate(() => Math.round(document.querySelector('.samples__stage').getBoundingClientRect().top + window.scrollY));
for (const off of [50, 700, 1400]) {
  await p.evaluate(y => window.scrollTo({ top: y, behavior: 'instant' }), stage + off);
  await new Promise(r => setTimeout(r, 900));
  const st = await p.evaluate(() => ({
    bg: getComputedStyle(document.querySelector('.samples')).backgroundColor,
    y: Math.round(document.querySelector('.samples__stage').getBoundingClientRect().top),
    cap: document.querySelector('.plane__cap').innerText,
    planeH: Math.round(document.querySelector('.plane').getBoundingClientRect().height),
  }));
  console.log(off, st);
  await p.screenshot({ path: `shots/l-samp-${off}.png` });
}
await b.close();
