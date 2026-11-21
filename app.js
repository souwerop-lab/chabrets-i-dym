'use strict';
/* ===== Настройки ===== */
// 3D-модель пачки. Когда файл assets/pack.glb лежит в папке, поставьте enabled: true.
const MODEL = { enabled: false, src: 'assets/pack.glb', poster: 'assets/pack-kostrovoy.webp' };
const PROMO = { code: 'ЧАБРЕЦ10', pct: 10 };
const FREE_FROM = 2500, DELIVERY = 300;

/* ===== Данные ===== */
const PRODUCTS = [
  { id:'kostrovoy', name:'Костровой', cat:'tea', kind:'Чёрный чай', price:690, w:80, badge:'Хит',
    desc:'Чёрный чай, прокопчённый над яблоневыми щепками. Тёмный настой, мягкая горчинка, дымный оттенок.',
    comp:'Чёрный чай, копчение яблоневыми щепками', brew:'95 °C, 4 мин, 4 г на 200 мл',
    time:['morning'], mood:['energy','focus'], str:3, extra:['none','spice'], note:'Крепкий и бодрящий, подходит вместо кофе.' },
  { id:'lugovoy', name:'Луговой рассвет', cat:'tea', kind:'Зелёный чай', price:590, w:60,
    desc:'Зелёный чай с липовым цветом и мятой. Лёгкий, слегка сладковатый.',
    comp:'Зелёный чай, липовый цвет, мята', brew:'80 °C, 2,5 мин, 3 г на 200 мл',
    time:['morning','day'], mood:['focus','calm'], str:1, extra:['none','citrus'], note:'Лёгкий, без тяжести, подходит для рабочего утра.' },
  { id:'chabrets', name:'Чабрец и мёд', cat:'herb', kind:'Травяной сбор', price:540, w:50,
    desc:'Чабрец, душица и сушёное яблоко. Мёд в пакет не добавляется, его кладут в чашку по вкусу.',
    comp:'Чабрец, душица, сушёное яблоко', brew:'100 °C, 7 мин, 5 г на 200 мл',
    time:['evening','day'], mood:['cozy','calm'], str:2, extra:['sweet','none'], note:'Тёплый травяной вкус, хорошо сочетается с мёдом.' },
  { id:'storozh', name:'Ночной сторож', cat:'herb', kind:'Травяной сбор', price:560, w:50,
    desc:'Мелисса, хмель, ромашка, мята и лист малины. Без кофеина, подходит на вечер.',
    comp:'Мелисса, хмель, ромашка, мята, лист малины', brew:'100 °C, 7 мин, 5 г на 200 мл',
    time:['night','evening'], mood:['calm','cozy'], str:1, extra:['none','sweet'], note:'Мягкий сбор без кофеина, удобен перед сном.' },
  { id:'oktyabr', name:'Пряный октябрь', cat:'tea', kind:'Чёрный чай', price:620, w:80,
    desc:'Чёрный чай с имбирём, корицей и кардамоном. Хорошо сочетается с молоком и сахаром.',
    comp:'Чёрный чай, имбирь, корица, кардамон', brew:'95 °C, 4 мин, 4 г на 200 мл',
    time:['evening','morning'], mood:['cozy','energy'], str:3, extra:['spice','sweet'], note:'Согревает, с молоком получается десертный вкус.' },
  { id:'oblepiha', name:'Облепиха и шторм', cat:'herb', kind:'Ягодный сбор', price:580, w:60,
    desc:'Облепиха, шиповник, лист смородины и цедра апельсина. Кислый, яркий, подходит горячим и со льдом.',
    comp:'Облепиха, шиповник, лист смородины, цедра апельсина', brew:'90 °C, 6 мин, 6 г на 200 мл',
    time:['day','morning'], mood:['energy','focus'], str:2, extra:['citrus','sweet'], note:'Кислый и яркий, хорошо освежает днём.' },
  { id:'tuman', name:'Улун «Туман»', cat:'tea', kind:'Улун', price:760, w:50,
    desc:'Светлый улун, выдерживает до пяти проливов. Сливочный вкус, цветочное послевкусие.',
    comp:'Светлый улун', brew:'90 °C, 3 мин, 5 г на 200 мл, до 5 проливов',
    time:['day','morning'], mood:['focus','calm'], str:2, extra:['none'], note:'Сливочный вкус, один и тот же чай можно заваривать до пяти раз.' },
  { id:'probnik', name:'Набор «Пробник»', cat:'set', kind:'Набор', price:1490, w:'4 × 15', badge:'Подарок',
    desc:'По 15 г четырёх вкусов: Костровой, Луговой рассвет, Чабрец и мёд, Ночной сторож. Коробка с открыткой.',
    comp:'Костровой, Луговой рассвет, Чабрец и мёд, Ночной сторож', brew:'по инструкции на каждом пакете', quiz:false }
];
const BY_ID = Object.fromEntries(PRODUCTS.map(p => [p.id, p]));
const CATS = [['all','Всё'],['tea','Чай'],['herb','Травяные сборы'],['set','Наборы']];
const photo = id => `assets/pack-${id}.webp`;
const BREW = [
  ['Чёрный чай','95 °C','4 мин','4 г','Костровой, Пряный октябрь'],
  ['Зелёный чай','80 °C','2,5 мин','3 г','Луговой рассвет'],
  ['Улун','90 °C','3 мин, до 5 проливов','5 г','Улун «Туман»'],
  ['Травяной сбор','100 °C','7 мин','5 г','Чабрец и мёд, Ночной сторож'],
  ['Ягодный сбор','90 °C','6 мин','6 г','Облепиха и шторм']
];

/* ===== Утилиты ===== */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const money = n => Math.round(n).toLocaleString('ru-RU').replace(/ | /g, ' ') + ' ₽';
const esc = s => String(s).replace(/[<>&"]/g, c => ({ '<':'&lt;', '>':'&gt;', '&':'&amp;', '"':'&quot;' }[c]));
const store = {
  get(k, d){ try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch { return d; } },
  set(k, v){ try { localStorage.setItem(k, JSON.stringify(v)); } catch {} }
};
const img = (id, alt, extra = '') => `<img src="${photo(id)}" srcset="assets/pack-${id}-400.webp 400w, ${photo(id)} 800w" sizes="(max-width: 900px) 50vw, 25vw" width="600" height="600" alt="${esc(alt)}" loading="lazy" ${extra}>`;

/* ===== Корзина ===== */
let cart = store.get('chd3-cart', {});
let promoOn = store.get('chd3-promo', false);
let drawerView = 'cart';
cart = Object.fromEntries(Object.entries(cart).filter(([id, q]) => BY_ID[id] && q > 0));
const count = () => Object.values(cart).reduce((a, b) => a + b, 0);
function totals(){
  const sub = Object.entries(cart).reduce((s, [id, q]) => s + BY_ID[id].price * q, 0);
  const disc = promoOn ? Math.round(sub * PROMO.pct / 100) : 0;
  const after = sub - disc;
  const ship = after === 0 ? 0 : (after >= FREE_FROM ? 0 : DELIVERY);
  return { sub, disc, ship, after, total: after + ship };
}
function save(){ store.set('chd3-cart', cart); store.set('chd3-promo', promoOn); }
function addToCart(id, n = 1, quiet){
  cart[id] = Math.min((cart[id] || 0) + n, 20);
  if (!quiet) flyToCart(id);
  save(); renderCount(); renderDrawer();
  if (!quiet) toast(`В корзине: «${BY_ID[id].name}»`);
}
/* маленькая пачка летит из карточки в корзину (по дуге), корзина «подпрыгивает» */
function flyToCart(id){
  const btn = $('#cartOpen');
  if (!btn || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const srcEl = document.activeElement?.closest?.('.tile, .story-card, .res, .modal-box, .pick-row')?.querySelector('img');
  const from = (srcEl || btn).getBoundingClientRect(), to = btn.getBoundingClientRect();
  const fly = new Image(); fly.src = photo(id); fly.alt = ''; fly.className = 'fly';
  const size = Math.min(110, from.width || 80);
  fly.style.cssText = `left:${from.left + from.width / 2 - size / 2}px;top:${from.top + from.height / 2 - size / 2}px;width:${size}px;height:${size}px`;
  document.body.append(fly);
  const dx = to.left + to.width / 2 - (from.left + from.width / 2), dy = to.top + to.height / 2 - (from.top + from.height / 2);
  fly.animate([
    { transform: 'translate(0,0) scale(1) rotate(0deg)', opacity: 1 },
    { transform: `translate(${dx * .45}px, ${dy * .45 - 120}px) scale(.7) rotate(-14deg)`, opacity: 1, offset: .5 },
    { transform: `translate(${dx}px, ${dy}px) scale(.18) rotate(-30deg)`, opacity: .6 }
  ], { duration: 900, easing: 'cubic-bezier(.2,.7,.1,1)' }).onfinish = () => {
    fly.remove();
    btn.animate([{ transform: 'scale(1)' }, { transform: 'scale(1.12)' }, { transform: 'scale(1)' }], { duration: 420, easing: 'cubic-bezier(.34,1.4,.64,1)' });
  };
}
function setQty(id, q){
  if (q <= 0) delete cart[id]; else cart[id] = Math.min(q, 20);
  save(); renderCount(); renderDrawer();
}
function renderCount(){ $('#cartCount').textContent = count(); }
let toastT;
function toast(msg){
  const t = $('#toast'); t.textContent = msg; t.classList.add('on');
  clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('on'), 2200);
}
function openDrawer(){
  drawerView = 'cart'; renderDrawer();
  $('#drawer').classList.add('on'); $('#overlay').classList.add('on'); $('#drawer').setAttribute('aria-hidden', 'false');
  $('#cartClose').focus();
}
function closeDrawer(){
  $('#drawer').classList.remove('on'); $('#overlay').classList.remove('on'); $('#drawer').setAttribute('aria-hidden', 'true');
}
function renderDrawer(){
  const body = $('#drawerBody');
  if (drawerView === 'done') return;
  if (drawerView === 'form'){ renderForm(); return; }
  $('#drawerTitle').textContent = 'Корзина';
  const ids = Object.keys(cart);
  if (!ids.length){
    body.innerHTML = `<div class="empty"><p>В корзине пусто.</p><a class="btn btn-red" href="#catalog" id="toCat">Перейти в каталог</a></div>`;
    $('#toCat').onclick = closeDrawer; return;
  }
  const t = totals(), left = FREE_FROM - t.after;
  body.innerHTML = ids.map(id => { const p = BY_ID[id], q = cart[id]; return `
    <div class="line" data-id="${id}">
      <img src="${photo(id)}" alt="">
      <div><h4>${p.name}</h4><small>${p.w} г · ${money(p.price)}</small>
        <div class="qty"><button data-d="-1" aria-label="Меньше">−</button><span>${q}</span><button data-d="1" aria-label="Больше">+</button></div></div>
      <div class="sum">${money(p.price * q)}<button class="rm" data-rm>убрать</button></div>
    </div>`; }).join('') + `
    <form class="promo" id="promoForm"><input id="promoInp" placeholder="Промокод" value="${promoOn ? PROMO.code : ''}" autocomplete="off" aria-label="Промокод"><button type="submit">Применить</button></form>
    <p class="pmsg ${promoOn ? 'ok' : ''}" id="pmsg">${promoOn ? 'Скидка 10% применена' : 'Для примера работает код ' + PROMO.code}</p>
    <div class="totals">
      <div><span>Товары</span><span>${money(t.sub)}</span></div>
      ${t.disc ? `<div><span>Скидка ${PROMO.pct}%</span><span>−${money(t.disc)}</span></div>` : ''}
      <div><span>Доставка</span><span>${t.ship ? money(t.ship) : 'бесплатно'}</span></div>
      ${left > 0 ? `<div class="hint">До бесплатной доставки не хватает ${money(left)}</div>` : ''}
      <div class="grand"><span>Итого</span><span id="grand">${money(t.total)}</span></div>
    </div>
    <div class="drawer-foot"><button class="btn btn-red" id="checkout">Оформить заказ</button></div>`;
  $$('.line', body).forEach(l => {
    const id = l.dataset.id;
    $$('.qty button', l).forEach(b => b.onclick = () => setQty(id, cart[id] + +b.dataset.d));
    $('[data-rm]', l).onclick = () => setQty(id, 0);
  });
  $('#promoForm').onsubmit = e => {
    e.preventDefault();
    const v = $('#promoInp').value.trim().toUpperCase();
    if (v === PROMO.code){ promoOn = true; save(); renderDrawer(); return; }
    if (v === ''){ promoOn = false; save(); renderDrawer(); return; }
    const m = $('#pmsg'); m.textContent = 'Такого промокода нет'; m.className = 'pmsg err';
  };
  $('#checkout').onclick = () => { drawerView = 'form'; renderDrawer(); };
}
function renderForm(){
  const t = totals();
  $('#drawerTitle').textContent = 'Оформление';
  $('#drawerBody').innerHTML = `
    <form class="form" id="orderForm" novalidate>
      <p class="meta">${count()} шт. на сумму ${money(t.total)}. Это демо, заказ никуда не отправляется.</p>
      <label><span>Имя</span><input name="name" autocomplete="name" required><div class="err"></div></label>
      <label><span>Телефон</span><input name="phone" type="tel" placeholder="+7 900 000-00-00" autocomplete="tel" required><div class="err"></div></label>
      <label><span>Адрес доставки</span><input name="addr" autocomplete="street-address" required><div class="err"></div></label>
      <label><span>Комментарий (необязательно)</span><textarea name="comment" rows="2"></textarea></label>
      <button class="btn btn-red" type="submit">Заказать на ${money(t.total)}</button>
      <button class="q-back" type="button" id="formBack">Вернуться в корзину</button>
    </form>`;
  $('#formBack').onclick = () => { drawerView = 'cart'; renderDrawer(); };
  $('#orderForm').onsubmit = e => {
    e.preventDefault();
    const f = e.target, v = n => f.elements[n].value.trim();
    const errs = {
      name: v('name').length < 2 ? 'Введите имя' : '',
      phone: v('phone').replace(/\D/g, '').length < 10 ? 'Телефон: 10–11 цифр' : '',
      addr: v('addr').length < 6 ? 'Укажите адрес' : ''
    };
    Object.entries(errs).forEach(([k, m]) => f.elements[k].parentElement.querySelector('.err').textContent = m);
    if (Object.values(errs).some(Boolean)) return;
    const btn = $('button[type=submit]', f); btn.disabled = true; btn.textContent = 'Отправка…';
    setTimeout(() => {
      const num = 'ЧД-' + String(Math.floor(1000 + Math.random() * 9000));
      cart = {}; promoOn = false; save(); renderCount(); drawerView = 'done';
      $('#drawerTitle').textContent = 'Заказ принят';
      $('#drawerBody').innerHTML = `<div class="done-box">
        <h3>Заказ ${num}</h3>
        <p>Спасибо, ${esc(v('name'))}. Мы позвоним, чтобы подтвердить время доставки.</p>
        <p class="meta">Демо: заказ имитируется, данные никуда не уходят.</p>
        <button class="btn btn-line" id="doneClose">Закрыть</button></div>`;
      $('#doneClose').onclick = closeDrawer;
    }, 800);
  };
}

/* ===== Каталог ===== */
let filter = 'all';
function renderFilters(){
  $('#filters').innerHTML = CATS.map(([k, t]) => `<button class="chip" role="tab" aria-selected="${k === filter}" data-k="${k}">${t}</button>`).join('');
  $$('#filters .chip').forEach(c => c.onclick = () => { filter = c.dataset.k; renderFilters(); renderGrid(); });
}
function renderGrid(){
  const list = PRODUCTS.filter(p => filter === 'all' || p.cat === filter);
  $('#grid').innerHTML = list.map(p => `
    <article class="tile" data-id="${p.id}">
      ${p.badge ? `<span class="badge">${p.badge}</span>` : ''}
      <button class="tile-photo" data-open="${p.id}" aria-label="Подробнее: ${esc(p.name)}">${img(p.id, p.name + ', ' + p.w + ' г')}</button>
      <h3><a href="products/${p.id}.html" data-open="${p.id}">${p.name}</a></h3>
      <p class="tile-meta">${p.kind} · ${p.w} г</p>
      <div class="tile-row"><span class="price price-tag">${money(p.price)}</span><button class="btn btn-line btn-sm" data-add="${p.id}">В корзину</button></div>
    </article>`).join('');
  // у названия есть настоящая ссылка на страницу товара (для поисковиков), а клик открывает карточку на месте
  $$('#grid [data-open]').forEach(b => b.onclick = e => { e.preventDefault(); openProduct(b.dataset.open); });
  $$('#grid [data-add]').forEach(b => b.onclick = () => addToCart(b.dataset.add));
}
/* карточка товара */
let lastFocus = null;
function openProduct(id){
  const p = BY_ID[id]; lastFocus = document.activeElement;
  $('#pmBox').innerHTML = `
    <button class="modal-x" id="pmClose" aria-label="Закрыть">Закрыть</button>
    <div class="pm-photo"><img src="${photo(id)}" width="800" height="800" alt="${esc(p.name)}, ${p.w} г"></div>
    <div class="pm-info">
      <h2 id="pmTitle">${p.name}</h2>
      <p>${p.desc}</p>
      <dl class="pm-dl">
        <div><dt>Вид</dt><dd>${p.kind}</dd></div>
        <div><dt>Состав</dt><dd>${p.comp}</dd></div>
        <div><dt>Заваривание</dt><dd>${p.brew}</dd></div>
        <div><dt>Вес</dt><dd>${p.w} г</dd></div>
      </dl>
      <div class="pm-buy"><span class="price">${money(p.price)}</span><button class="btn btn-red" id="pmAdd">В корзину</button></div>
    </div>`;
  $('#pm').hidden = false;
  $('#pmClose').onclick = closePM;
  $('#pmAdd').onclick = () => { addToCart(id); closePM(); };
  $('#pmClose').focus();
}
function closePM(){ $('#pm').hidden = true; if (lastFocus) lastFocus.focus?.(); }

/* ===== Подбор ===== */
const QS = [
  { key:'time', q:'Когда будете пить?', opts:[['morning','Утром','чтобы проснуться'],['day','Днём','между делами'],['evening','Вечером','после работы'],['night','Перед сном','без кофеина']] },
  { key:'mood', q:'Что нужно от чашки?', opts:[['focus','Сосредоточиться',''],['calm','Успокоиться',''],['cozy','Согреться',''],['energy','Взбодриться','']] },
  { key:'str', q:'Какая крепость?', opts:[[1,'Лёгкий','прозрачный настой'],[2,'Средний','насыщенный'],[3,'Крепкий','тёмный и плотный']] },
  { key:'extra', q:'Что добавите в чашку?', opts:[['none','Ничего','чистый вкус'],['sweet','Мёд или сахар',''],['citrus','Цитрус, ягоды',''],['spice','Пряности','имбирь, корица']] }
];
const LABEL = { time:{morning:'утро',day:'день',evening:'вечер',night:'ночь'}, mood:{focus:'сосредоточенность',calm:'спокойствие',cozy:'тепло',energy:'бодрость'}, str:{1:'лёгкая крепость',2:'средняя крепость',3:'крепкий настой'}, extra:{none:'без добавок',sweet:'сладкое',citrus:'цитрус и ягоды',spice:'пряности'} };
let qStep = 0, qAns = {};
function score(p){
  const m = []; let s = 0;
  if (p.time.includes(qAns.time)){ s += p.time[0] === qAns.time ? 3.2 : 2.6; m.push(LABEL.time[qAns.time]); }
  if (p.mood.includes(qAns.mood)){ s += p.mood[0] === qAns.mood ? 3.2 : 2.6; m.push(LABEL.mood[qAns.mood]); }
  const d = Math.abs(p.str - qAns.str); s += 2 - d; if (d === 0) m.push(LABEL.str[qAns.str]);
  if (p.extra.includes(qAns.extra)){ s += p.extra[0] === qAns.extra ? 2 : 1.4; m.push(LABEL.extra[qAns.extra]); }
  return { p, s, m };
}
function renderQuiz(){
  const card = $('#quizCard');
  if (qStep >= QS.length){
    const ranked = PRODUCTS.filter(p => p.quiz !== false).map(score).sort((a, b) => b.s - a.s);
    const top = [ranked[0]]; if (ranked[1].s >= ranked[0].s - 3.5) top.push(ranked[1]);
    card.innerHTML = `<div class="quiz-label">
      <p class="res-intro">Подходит по вашим ответам</p>
      <div class="res-grid">${top.map(({ p, m }) => `
        <div class="res"><div class="ph">${img(p.id, p.name)}</div>
          <div><h3>${p.name}</h3>
            <div class="match">${m.length ? 'Совпало: ' + m.join(', ') : 'Для разнообразия'}</div>
            <p>${p.note}</p>
            <div class="row"><span class="price">${money(p.price)}</span><button class="btn btn-red btn-sm" data-add="${p.id}">В корзину</button></div></div></div>`).join('')}</div>
      <button class="q-back" id="qRestart">Пройти заново</button></div>`;
    $$('[data-add]', card).forEach(b => b.onclick = () => { addToCart(b.dataset.add); b.textContent = 'Добавлено'; });
    $('#qRestart').onclick = () => { qStep = 0; qAns = {}; renderQuiz(); };
    return;
  }
  const Q = QS[qStep];
  card.innerHTML = `<div class="quiz-label">
    <div class="q-top"><div class="q-bar"><i style="width:${qStep / QS.length * 100}%"></i></div><span class="q-step">${qStep + 1} из ${QS.length}</span></div>
    <h3 class="q-title">${Q.q}</h3>
    <div class="q-opts">${Q.opts.map(([v, t, sub]) => `<button class="q-opt" data-v="${v}"><b>${t}</b>${sub ? `<small>${sub}</small>` : ''}</button>`).join('')}</div>
    <button class="q-back" id="qBack" ${qStep ? '' : 'hidden'}>Назад</button></div>`;
  $$('.q-opt', card).forEach(b => b.onclick = () => { qAns[Q.key] = Q.key === 'str' ? +b.dataset.v : b.dataset.v; qStep++; renderQuiz(); });
  const back = $('#qBack'); if (back) back.onclick = () => { qStep--; renderQuiz(); };
}

/* ===== Набор из трёх ===== */
function initSet(){
  const slots = [null, null, null], pickIds = PRODUCTS.filter(p => p.quiz !== false).map(p => p.id);
  const sl = $('#slots'), pk = $('#pick'), btn = $('#setAdd'), hint = $('#setHint');
  function draw(){
    sl.innerHTML = slots.map((id, i) => `<div class="slot${id ? ' full' : ''}">${id ? `${img(id, BY_ID[id].name)}<button class="slot-x" data-x="${i}" aria-label="Убрать ${esc(BY_ID[id].name)}">×</button>` : `Слот ${i + 1}`}</div>`).join('');
    $$('[data-x]', sl).forEach(b => b.onclick = () => { slots[+b.dataset.x] = null; draw(); });
    const n = slots.filter(Boolean).length, sum = slots.reduce((s, id) => s + (id ? BY_ID[id].price : 0), 0);
    btn.disabled = n < 3;
    hint.textContent = n < 3 ? `Выбрано ${n} из 3` : `Три пакета, ${money(sum)}`;
  }
  pk.innerHTML = pickIds.map(id => `<div class="pick-row">${img(id, '')}<div><b>${BY_ID[id].name}</b><small>${BY_ID[id].kind} · ${BY_ID[id].w} г</small></div><span class="price price-tag">${money(BY_ID[id].price)}</span><button class="btn btn-line btn-sm" data-p="${id}">Выбрать</button></div>`).join('');
  $$('[data-p]', pk).forEach(b => b.onclick = () => {
    const i = slots.indexOf(null);
    if (i < 0){ hint.textContent = 'Три слота заняты, уберите один'; return; }
    slots[i] = b.dataset.p; draw();
  });
  btn.onclick = () => {
    slots.forEach(id => addToCart(id, 1, true));
    toast('Набор из трёх добавлен в корзину');
    slots.fill(null); draw();
  };
  draw();
}

/* ===== Заваривание ===== */
function renderBrew(){
  const H = ['Вид', 'Вода', 'Время', 'На 200 мл', 'Что из каталога'];
  $('#brewRows').innerHTML = BREW.map(r => `<tr>${r.map((c, i) => `<td data-l="${H[i]}">${c}</td>`).join('')}</tr>`).join('');
}


/* ===== Эффекты ===== */
/* Стабильная высота экрана. Встроенный браузер Telegram (и некоторые другие) меняет высоту экрана, когда прячет/показывает
   свои панели при прокрутке; если длины секций считать от неё, страница на ходу укорачивается и экран «телепортируется».
   Поэтому высоту запоминаем один раз и пересчитываем только при смене ширины (поворот телефона, окно ПК). */
let VH = innerHeight, VW = innerWidth;
document.documentElement.style.setProperty('--vh', VH / 100 + 'px');
addEventListener('resize', () => {
  if (innerWidth === VW) return;
  VW = innerWidth; VH = innerHeight;
  document.documentElement.style.setProperty('--vh', VH / 100 + 'px');
});
const REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const ease = t => 1 - Math.pow(1 - t, 3);
function rng(seed){ let s = seed % 2147483647 || 1; return () => (s = s * 16807 % 2147483647) / 2147483647; }

/* рваные края: clip-path из случайных зубцов */
function tornClip(){
  const mobile = matchMedia('(max-width: 900px)').matches;
  $$('[data-torn], [data-torn-d]').forEach(el => {
    const mode = el.dataset.tornD ? (mobile ? el.dataset.tornM : el.dataset.tornD) : el.dataset.torn;
    const amp = +el.dataset.amp || 8, w = el.offsetWidth, h = el.offsetHeight;
    const r = rng(11 + (el.id ? el.id.length * 17 : 5) + (amp | 0) * 3 + Math.round(w) % 89);
    const nx = Math.max(10, Math.round(w / 14)), ny = Math.max(10, Math.round(h / 14));
    const jag = n => Array.from({ length: n + 1 }, (_, i) => [i / n * 100, Math.round(1 + r() * amp)]);
    const P = [];
    if (mode.includes('t')) jag(nx).forEach(([x, a]) => P.push(`${x.toFixed(2)}% ${a}px`)); else P.push('0 0', '100% 0');
    if (mode.includes('r')) jag(ny).forEach(([y, a]) => P.push(`calc(100% - ${a}px) ${y.toFixed(2)}%`));
    else if (!mode.includes('b')) P.push('100% 100%');
    if (mode.includes('b')) jag(nx).reverse().forEach(([x, a]) => P.push(`${x.toFixed(2)}% calc(100% - ${a}px)`)); else P.push('0 100%');
    el.style.setProperty('--clip', `polygon(${P.join(',')})`);
  });
}

/* заголовки «пропечатываются» при появлении */
let stampCheck = () => {};
function initStamps(){
  const hs = $$('.sec-head h2, .flip-text h2');
  hs.forEach(h => h.classList.add('stampable'));
  if (REDUCED || !('IntersectionObserver' in window)){ hs.forEach(h => h.classList.add('in')); return; }
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .3 });
  hs.forEach(h => io.observe(h));
  stampCheck = () => hs.forEach(h => { if (!h.classList.contains('in') && h.getBoundingClientRect().top < innerHeight * .85) h.classList.add('in'); });
}

/* бечёвка прорисовывается по мере прокрутки */
let twine = null;
function setupTwine(){
  const svg = $('#twine'); if (!svg || getComputedStyle(svg).display === 'none'){ twine = null; return; }
  const hero = $('#hero'), main = $('#main');
  const top = hero.offsetHeight, H = main.scrollHeight - top;
  svg.style.top = top + 'px'; svg.style.height = H + 'px'; svg.setAttribute('viewBox', `0 0 140 ${H}`);
  const step = 560; let d = 'M 74 0', y = 0, left = true;
  while (y < H){
    const x = left ? 34 : 104, y2 = Math.min(y + step, H);
    d += ` C ${left ? 120 : 24} ${y + step * .3}, ${left ? 20 : 124} ${y + step * .7}, ${x} ${y2}`;
    y = y2; left = !left;
  }
  const p = $('#twineBase'); p.setAttribute('d', d);
  const len = p.getTotalLength(); p.style.strokeDasharray = len; twine = { p, len, top };
  updateTwine();
}
function updateTwine(){
  if (!twine) return;
  const H = $('#main').scrollHeight - twine.top;
  const prog = clamp((scrollY + innerHeight * .7 - twine.top) / H);
  twine.p.style.strokeDashoffset = twine.len * (1 - prog);
}

/* этикетка пропечатывается строка за строкой, в конце штамп; листья разлетаются из-под неё */
let flip = null;
function setupFlip(){
  const sec = $('#about'), track = $('#flipTrack'), pack = $('#pack3d'), stage = $('#flipStage'), box = $('#leaves');
  if (REDUCED || /static/.test(location.search)){ sec.classList.add('static'); return; }
  const cols = ['#5f7a3a', '#7a9448', '#3f5a2c', '#4a3524', '#6b4a2a', '#8a6f9a'];
  const r = rng(5);
  const leaves = Array.from({ length: 18 }, (_, i) => {
    const el = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    el.setAttribute('viewBox', '0 0 24 40'); el.setAttribute('class', 'leaf');
    el.style.color = cols[i % cols.length];
    el.innerHTML = '<use href="#leaf"/>';
    box.append(el);
    return { el, ang: i / 18 * Math.PI * 2 + r() * .5, dist: .55 + r() * .55, rot: (r() - .5) * 900, fall: 30 + r() * 110, s: .7 + r() * .7 };
  });
  flip = { track, pack, stage, leaves, mv: null, rows: $$('.pr', pack), stamp: $('.stamp-mark', pack) };
  if (MODEL.enabled) setupModel();
  updateFlip();
}
function setupModel(){
  const s = document.createElement('script');
  s.type = 'module'; s.src = 'https://unpkg.com/@google/model-viewer@3.5.0/dist/model-viewer.min.js';
  document.head.append(s);
  const mv = document.createElement('model-viewer');
  mv.setAttribute('src', MODEL.src); mv.setAttribute('poster', MODEL.poster);
  mv.setAttribute('alt', 'Пакет чая «Костровой», 3D-модель'); mv.setAttribute('camera-orbit', '0deg 80deg auto');
  mv.setAttribute('shadow-intensity', '0.8'); mv.setAttribute('interaction-prompt', 'none'); mv.setAttribute('camera-controls', '');
  mv.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;background:transparent;--poster-color:transparent';
  mv.addEventListener('load', () => { flip.pack.style.display = 'none'; flip.mv = mv; }, { once: true });
  mv.addEventListener('error', () => mv.remove());
  flip.stage.append(mv);
}
function updateFlip(){
  if (!flip) return;
  const rect = flip.track.getBoundingClientRect();
  const total = rect.height - VH;
  const p = clamp(-rect.top / total);
  const e = p < .5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
  // строки «печатаются» по очереди слева направо, штамп ставится в конце
  const n = flip.rows.length;
  flip.rows.forEach((el, i) => {
    const t = clamp((p - .06 - i * .1) / .12);
    el.style.clipPath = `inset(0 ${((1 - t) * 100).toFixed(1)}% 0 0)`;
    el.style.opacity = (.15 + t * .85).toFixed(2);
  });
  flip.stamp.classList.toggle('on', p > .06 + n * .1 + .04);
  if (flip.mv) flip.mv.setAttribute('camera-orbit', `${e * 360}deg 80deg auto`);
  const q = clamp((p - .12) / .75), eq = ease(q), W = flip.stage.offsetWidth;
  flip.leaves.forEach(l => {
    const x = Math.cos(l.ang) * l.dist * W * .62 * eq, y = Math.sin(l.ang) * l.dist * W * .42 * eq + q * q * l.fall;
    const o = q <= 0 ? 0 : q < .1 ? q / .1 : q > .82 ? (1 - q) / .18 : 1;
    l.el.style.transform = `translate(${x}px, ${y}px) rotate(${l.rot * eq}deg) scale(${l.s})`;
    l.el.style.opacity = o.toFixed(2);
  });
}

/* телефон: название текущего раздела полосой под шапкой; меняется, когда начинается следующий раздел */
let secBar = null;
function setupSecBar(){
  const top = $('#top'); if (!top) return;
  const el = document.createElement('div'); el.className = 'sec-bar'; el.setAttribute('aria-hidden', 'true');
  el.innerHTML = '<span></span>'; top.append(el);
  secBar = { el, top, secs: $$('section[data-label]'), cur: '' };
  updateSecBar();
}
function updateSecBar(){
  if (!secBar || innerWidth > 900) return;
  const line = secBar.top.getBoundingClientRect().bottom + 36;
  let label = '';
  for (const s of secBar.secs){
    const r = s.getBoundingClientRect(), h2 = $('.sec-head h2', s);
    // показываем, когда большой заголовок раздела уже ушёл под шапку, и пока раздел не кончился
    if (r.top < line && r.bottom > line && h2 && h2.getBoundingClientRect().bottom < line) { label = s.dataset.label; break; }
  }
  if (label === secBar.cur) return;
  const old = secBar.el.querySelector('span:not(.out)');
  secBar.cur = label;
  secBar.el.classList.toggle('on', !!label);
  if (!label) return;
  if (old && old.textContent){
    const nu = document.createElement('span'); nu.className = 'in'; nu.textContent = label; secBar.el.append(nu);
    old.classList.add('out'); setTimeout(() => old.remove(), 400);
    requestAnimationFrame(() => requestAnimationFrame(() => nu.classList.remove('in')));
  } else if (old) old.textContent = label;
}

/* история: видео перематывается прокруткой */
let story = null;
function setupStory(){
  const sec = $('#story'); if (!sec) return;
  const v = $('#storyVideo'), mobile = matchMedia('(max-width: 900px)').matches;
  const src = mobile ? 'assets/video/story-m.mp4' : 'assets/video/story-d.mp4';
  $('#storyAdd').onclick = () => addToCart('kostrovoy');
  if (REDUCED || /static/.test(location.search)){ sec.classList.add('static'); v.src = src; v.controls = true; return; }
  // AV1 (WebM) в 2–3 раза легче — только для Chrome/Firefox/Edge. Safari (iPhone, Mac) всегда получает mp4 H.264:
  // AV1 в Safari есть не на всех устройствах, и на iPhone он показывал пустой экран при перемотке.
  const ua = navigator.userAgent;
  const safari = /iP(hone|ad|od)/.test(ua) || (/Safari/.test(ua) && !/Chrome|Chromium|CriOS|FxiOS|Edg|Android/.test(ua));
  const av1 = !safari && v.canPlayType('video/webm; codecs="av01.0.05M.08"') === 'probably';
  const file = av1 ? src.replace('.mp4', '.webm') : src;
  // iPhone не рисует кадры при перемотке, пока ролик ни разу не запускался: один раз play → pause
  const prime = () => { const p = v.play(); if (p && p.then) p.then(() => v.pause()).catch(() => {}); };
  // (по loadedmetadata: дальше описания ролика iPhone сам ничего не грузит, loadeddata не наступит)
  v.addEventListener('loadedmetadata', prime, { once: true });
  // ролик грузится, только когда до секции осталось около экрана, и целиком (fetch → blob):
  // так первый экран открывается быстро, а перемотка плавная на любом хостинге
  const load = () => fetch(file).then(r => { if (!r.ok) throw 0; return r.blob(); })
    .then(b => { v.src = URL.createObjectURL(b); })
    .catch(() => { v.src = src; });
  // ?debug — состояние видео поверх страницы (для проверки на телефонах без консоли)
  if (/debug/.test(location.search)){
    const d = document.createElement('pre');
    d.style.cssText = 'position:fixed;left:8px;top:120px;z-index:999;background:#000c;color:#0f0;font:11px/1.3 monospace;padding:6px;margin:0;max-width:95vw;white-space:pre-wrap';
    document.body.append(d);
    // скачки прокрутки и смена высоты экрана (панель Safari) — для поиска «телепортов»
    const jumps = []; let ly = scrollY, lh = innerHeight, lH = document.documentElement.scrollHeight;
    const watchJ = () => { const y = scrollY, h = innerHeight, H = document.documentElement.scrollHeight;
      if (Math.abs(y - ly) > 180) jumps.push(`y ${Math.round(ly)}→${Math.round(y)} h ${lh}→${h} H ${lH}→${H}`);
      ly = y; lh = h; lH = H; requestAnimationFrame(watchJ); };
    requestAnimationFrame(watchJ);
    setInterval(() => { d.textContent = `file ${file.split('/').pop()} safari ${safari}\nready ${v.readyState} t ${v.currentTime.toFixed(2)} p ${story && story.p.toFixed(3)}\ny ${Math.round(scrollY)} ih ${innerHeight} H ${document.documentElement.scrollHeight}\nскачки: ${jumps.length}\n${jumps.slice(-3).join('\n')}`; }, 250);
    ['loadedmetadata', 'loadeddata', 'canplay', 'seeked', 'error', 'stalled'].forEach(e => v.addEventListener(e, () => console.log('video', e)));
  }
  // если ролик не смог открыться (формат), пробуем mp4 напрямую
  v.addEventListener('error', () => { if (!v.dataset.fallback){ v.dataset.fallback = 1; v.src = src; } });
  // и не раньше, чем загрузится первый экран, — чтобы не отнимать у него скорость
  const watch = () => {
    if (!('IntersectionObserver' in window)) return load();
    const io = new IntersectionObserver(es => { if (es[0].isIntersecting){ io.disconnect(); load(); } }, { rootMargin: '150% 0px' });
    io.observe(sec);
  };
  if (document.readyState === 'complete') watch(); else addEventListener('load', watch, { once: true });
  // настоящие чаинки, бутоны и щепки из наших кадров пролетают поверх видео с разной скоростью
  const box = $('#storyFloats'), r = rng(23);
  const n = mobile ? 7 : 12;
  const floats = Array.from({ length: n }, (_, i) => {
    const el = new Image(); el.alt = ''; el.decoding = 'async'; el.loading = 'lazy';
    el.src = `assets/cut/${BITS[i % BITS.length]}.webp`;
    // на ПК справа и полосами сверху/снизу, чтобы не лезть на подписи слева
    const right = i % 3 !== 0;
    el.style.left = (mobile ? (i % 2 ? 2 + r() * 14 : 82 + r() * 12) : right ? 48 + r() * 48 : 4 + r() * 38) + '%';
    el.style.top = (mobile ? 12 + r() * 22 : right ? 4 + r() * 88 : (r() < .5 ? 6 + r() * 12 : 82 + r() * 8)) + '%';
    el.style.width = (mobile ? 34 + r() * 30 : 48 + r() * 60) + 'px';
    box.append(el);
    return { el, sp: (260 + r() * 520) * (mobile ? .1 : 1), rot: (r() - .5) * 400, s: .7 + r() * .6, sway: 14 + r() * 30, ph: r() * 6, blur: r() < .25 };
  });
  floats.forEach(f => { if (f.blur && !mobile) f.el.style.filter = 'blur(2px)'; });
  const steps = $$('.story-step', sec), labels = $$('.story-bar span', sec);
  story = { track: $('#storyTrack'), v, floats, steps, labels, fill: $('#storyFill'), card: $('#storyCard'), p: 0, cur: 0, run: false };
  updateStory();
}
const BITS = ['leaf-a', 'flower-a', 'chip-a', 'leaf-d', 'bud-a', 'green-a', 'leaf-b', 'flower-c', 'chip-b', 'leaf-e', 'bud-b', 'flower-b', 'leaf-c', 'chip-c'];
function updateStory(){
  if (!story) return;
  const rect = story.track.getBoundingClientRect();
  const p = clamp(-rect.top / (rect.height - VH));
  story.p = p;
  // ролик занимает 0..0.94 прогресса, в конце появляется карточка товара
  const vp = clamp(p / .94);
  story.steps.forEach((el, i) => {
    const from = +el.dataset.from, to = +el.dataset.to, on = vp >= from && vp < to;
    el.classList.toggle('on', on); el.classList.toggle('past', !on && vp >= to);
    story.labels[i].classList.toggle('on', vp >= from);
  });
  story.fill.style.transform = `scaleX(${vp})`;
  story.card.classList.toggle('on', p > .9);
  story.card.closest('.story').classList.toggle('card-on', p > .9);
  story.floats.forEach(f => {
    const y = (.5 - p) * f.sp * 2, x = Math.sin(p * 6 + f.ph) * f.sway;
    f.el.style.transform = `translate(${x}px, ${y}px) rotate(${f.rot * p}deg) scale(${f.s})`;
  });
  if (!story.run && rect.top < innerHeight && rect.bottom > 0){ story.run = true; requestAnimationFrame(scrubStory); }
}
function scrubStory(){
  const v = story.v, d = v.duration;
  if (d){
    const target = clamp(story.p / .94) * (d - .05);
    story.cur += (target - story.cur) * .18;
    if (Math.abs(target - story.cur) < .004) story.cur = target;
    if (!v.seeking && Math.abs(v.currentTime - story.cur) > .02) v.currentTime = story.cur;
  }
  const rect = story.track.getBoundingClientRect();
  if (rect.top < innerHeight && rect.bottom > 0) requestAnimationFrame(scrubStory); else story.run = false;
}

/* первый экран: чаинки парят вокруг пачки, слои сдвигаются за мышью и при прокрутке (приём Hozon) */
let hero = null;
function setupHero(){
  const sec = $('#hero'); if (!sec) return;
  const pack = $('#heroPack'), word = $('#heroWord'), box = $('#heroFloats');
  const start = () => sec.classList.add('ready');
  if (pack.complete) start(); else { pack.onload = start; setTimeout(start, 1500); }
  // [картинка, x%, y%, ширина px, глубина]
  const spots = [
    ['flower-a', 14, 22, 120, 1.4], ['leaf-a', 8, 52, 150, .8], ['chip-a', 22, 70, 120, 1.1], ['bud-b', 30, 14, 70, .6],
    ['leaf-d', 80, 18, 170, 1.2], ['flower-c', 88, 46, 140, .9], ['leaf-e', 74, 66, 140, 1.5], ['bud-a', 66, 10, 80, .7],
    ['green-a', 95, 52, 130, .5], ['chip-c', 38, 82, 80, .9], ['leaf-c', 60, 84, 110, 1.3], ['flower-b', 4, 30, 120, .7]
  ];
  const mobile = matchMedia('(max-width: 900px)').matches;
  const r = rng(7);
  const items = (mobile ? spots.filter((_, i) => i % 2 === 0) : spots).map(([n, x, y, w, z]) => {
    // на телефоне кусочки мельче и только у пачки, не на тексте
    const el = new Image(); el.alt = ''; el.decoding = 'async'; el.src = `assets/cut/${n}.webp`;
    el.style.left = x + '%'; el.style.top = (mobile ? y * .42 : y) + '%'; el.style.width = (mobile ? w * .45 : w) + 'px';
    if (z < .7) el.style.filter = 'blur(1.5px)';
    box.append(el);
    return { el, z, rot: (r() - .5) * 60, ph: r() * 6.28, sp: .4 + r() * .5 };
  });
  hero = { sec, pack, word, items, mobile, mx: 0, my: 0, cx: 0, cy: 0, t0: performance.now(), on: true };
  if (REDUCED) { renderHero(0); return; }
  if (matchMedia('(pointer: fine)').matches){
    addEventListener('mousemove', e => { hero.mx = e.clientX / innerWidth - .5; hero.my = e.clientY / innerHeight - .5; }, { passive: true });
  }
  new IntersectionObserver(es => { hero.on = es[0].isIntersecting; if (hero.on) requestAnimationFrame(tickHero); }, { threshold: 0 }).observe(sec);
}
function renderHero(t){
  const h = hero, s = Math.min(scrollY, innerHeight);
  h.cx += (h.mx - h.cx) * .05; h.cy += (h.my - h.cy) * .05;
  const o = h.mobile ? '0px' : '-50%';
  h.word.style.transform = `translate(calc(${o} + ${h.cx * -18}px), ${h.mobile ? 0 : s * .25 + h.cy * -10}px)`;
  h.pack.style.transform = `translate(calc(${o} + ${h.cx * 14}px), ${h.mobile ? 0 : s * -.08 + h.cy * 8}px) rotate(${h.cx * 1.2}deg)`;
  h.items.forEach(it => {
    const bob = Math.sin(t / 1000 * it.sp + it.ph) * 10 * it.z;
    const x = h.cx * 50 * it.z, y = h.cy * 36 * it.z + bob - (h.mobile ? 0 : s * .45 * it.z);
    it.el.style.transform = `translate(${x}px, ${y}px) rotate(${it.rot + Math.sin(t / 1600 + it.ph) * 8}deg)`;
  });
}
function tickHero(t){
  if (!hero.on) return;
  renderHero(t);
  requestAnimationFrame(tickHero);
}
function updateHero(){ $('#top').classList.toggle('scrolled', scrollY > 10); }

let ticking = false;
function onScroll(){
  if (ticking) return; ticking = true;
  requestAnimationFrame(() => { ticking = false; updateTwine(); updateFlip(); updateStory(); stampCheck(); updateHero(); updateSecBar(); });
}
function initSmooth(){
  if (REDUCED || !window.Lenis || !matchMedia('(pointer: fine)').matches) return;
  const lenis = new Lenis({ duration: 1.1, easing: t => 1 - Math.pow(1 - t, 3) });
  const raf = t => { lenis.raf(t); requestAnimationFrame(raf); }; requestAnimationFrame(raf);
  // якорные ссылки — тоже плавно, с поправкой на шапку
  $$('a[href^="#"]').forEach(a => a.addEventListener('click', e => {
    const id = a.getAttribute('href'); if (id.length < 2) return;
    const t = document.querySelector(id); if (!t) return;
    e.preventDefault(); lenis.scrollTo(t, { offset: -76 });
  }));
  window.lenis = lenis;
}
function initFx(){
  initSmooth();
  tornClip(); initStamps(); setupHero(); setupStory(); setupFlip(); setupTwine(); setupSecBar();
  addEventListener('scroll', onScroll, { passive: true });
  let t;
  addEventListener('resize', () => { clearTimeout(t); t = setTimeout(() => { tornClip(); setupTwine(); updateFlip(); }, 150); });
  addEventListener('load', () => { tornClip(); setupTwine(); updateFlip(); });
  if (document.fonts) document.fonts.ready.then(() => { tornClip(); setupTwine(); });
  onScroll();
}


/* ===== Старт ===== */
function init(){
  // для скриншотов: index.html#cart открывает корзину, index.html?demo=cart подставляет пример
  if (/demo=cart/.test(location.search) && !count()){ cart = { kostrovoy:2, tuman:1, chabrets:1 }; promoOn = true; }
  renderFilters(); renderGrid(); renderQuiz(); renderBrew(); renderCount(); renderDrawer(); initSet(); initFx();
  $('#cartOpen').onclick = openDrawer; $('#cartClose').onclick = closeDrawer; $('#overlay').onclick = closeDrawer;
  $('#pm').onclick = e => { if (e.target.id === 'pm') closePM(); };
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape'){ closeDrawer(); if (!$('#pm').hidden) closePM(); }
    if (e.key === 'Tab'){ // фокус ходит по кругу внутри открытого окна
      const box = !$('#pm').hidden ? $('#pmBox') : $('#drawer').classList.contains('on') ? $('#drawer') : null;
      if (!box) return;
      const f = $$('a[href], button:not([disabled]), input, textarea, [tabindex]:not([tabindex="-1"])', box).filter(x => x.offsetParent !== null);
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first){ e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last){ e.preventDefault(); first.focus(); }
      else if (!box.contains(document.activeElement)){ e.preventDefault(); first.focus(); }
    }
  });
  if (location.hash === '#cart') openDrawer();
  const ph = location.hash.match(/^#product-(\w+)/); if (ph && BY_ID[ph[1]]) openProduct(ph[1]);
  // логотип — наверх (раньше ссылка вела на саму шапку, а она всегда на экране, и на телефоне ничего не происходило)
  $('#logoTop').addEventListener('click', e => {
    e.preventDefault();
    $('#nav').classList.remove('on'); $('#menuBtn').setAttribute('aria-expanded', 'false');
    if (window.lenis) window.lenis.scrollTo(0); else window.scrollTo({ top: 0, behavior: REDUCED ? 'auto' : 'smooth' });
    history.replaceState(null, '', location.pathname + location.search);
  });
  const nav = $('#nav'), mb = $('#menuBtn');
  const closeNav = () => { if (nav.classList.contains('on')){ nav.classList.remove('on'); mb.setAttribute('aria-expanded', 'false'); } };
  mb.onclick = e => { e.stopPropagation(); const on = nav.classList.toggle('on'); mb.setAttribute('aria-expanded', on); };
  document.addEventListener('click', e => { if (!nav.contains(e.target)) closeNav(); });
  addEventListener('scroll', () => { if (nav.classList.contains('on') && Math.abs(scrollY - (nav._y ?? scrollY)) > 40) closeNav(); nav._y = nav.classList.contains('on') ? (nav._y ?? scrollY) : undefined; }, { passive: true });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeNav(); });
  $$('a', nav).forEach(a => a.onclick = () => { nav.classList.remove('on'); mb.setAttribute('aria-expanded', 'false'); });
}
init();
