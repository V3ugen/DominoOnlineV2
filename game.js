// Домино по-одесски — Phaser 4
const W = 480, H = 800, TL = 52, TH = 28;
const PIPS = {0:[],1:[[0,0]],2:[[-1,-1],[1,1]],3:[[-1,-1],[0,0],[1,1]],4:[[-1,-1],[1,-1],[-1,1],[1,1]],
  5:[[-1,-1],[1,-1],[0,0],[-1,1],[1,1]],6:[[-1,-1],[1,-1],[-1,0],[1,0],[-1,1],[1,1]]};
const SAY = {
  start: ["Ша! Раздали. Таки начинаем!", "Костяшки на столе, нервы в кулаке. Поехали!", "Одесса-мама, благослови эту партию!", "Играем честно. Ну, почти честно. Это же Одесса!", "Садитесь, не стойте над душой. Сейчас будет весело!"],
  coin: ["Орёл или решка? Только без одесских штучек!", "Кидаем монету. Кто первый — тот и красавчик!", "Монетка решает всё. Ну, почти всё!", "Выбирайте, не тяните. Время — деньги, а деньги — монетка!", "Шо выпадет, то и будет. Как на Привозе: как повезёт!"],
  you: ["Ваш ход, не тяните резину!", "Ну шо вы сидите, как на Привозе без товара? Ходите!", "Ваш ход, дорогой. Одесса ждёт!", "Смотрите на костяшки внимательно, они вас не укусят.", "Шо вы так долго думаете? Тут не шахматы, тут домино!", "Ходите уже, у меня чай стынет!", "Ваша очередь. Покажите, на что способны!", "Таки шо вы задумались? Вам подсказать? Не скажу!", "Не спешите, но и не засыпайте. Ваш ход!"],
  bot: ["Бот думает, шо он умный…", "Ход бота. Я вас умоляю, не смотрите ему в карты!", "Бот шевелит мозгами. Слышите, как скрипит?", "Ша, тихо. Бот сосредоточился!", "Бот делает вид, шо у него есть стратегия.", "Бот чешет затылок. Опасный момент!", "Подождите, бот считает. Он у нас медленный, зато старательный."],
  botPlay: ["Бот: «Таки да, и не иначе!»", "Бот: «Шо вы мне тут показываете?»", "Бот: «Я вас умоляю, вот вам!»", "Бот: «Кушайте, не обляпайтесь!»", "Бот: «А шо, так можно было?»", "Бот: «Это вам не на Привозе торговаться!»", "Бот: «Получите и распишитесь!»", "Бот: «Ой, шо я делаю, шо я делаю…»", "Бот: «Один момент — и вы уже в проигрыше!»"],
  botDraw: ["Бот пошёл на Привоз — шо-нибудь да найдёт.", "Бот: «Ой вэй, опять на Привоз!»", "Бот роется в привозе, как на Староконном рынке.", "Бот: «Нет у меня нужного, придётся брать со склада!»", "Бот: «Шо за жизнь, шо за жизнь…» и лезет за костяшкой.", "Бот торгуется с привозом и, кажется, проигрывает.", "Бот: «Дайте мне что-нибудь приличное!»"],
  botPass: ["Бот пасует: «Ша, я не при делах!»", "Бот пропускает ход и делает вид, шо так и надо.", "Бот: «У меня нет, и не спрашивайте!»", "Бот развёл руками: «Шо я могу сделать?»", "Бот пасует. Такого позора Одесса не видела!", "Бот: «Пропускаю. Но я вернусь!»", "Бот в растерянности: ни костяшки, ни привоза."],
  draw: ["Идите на Привоз, там есть всё, кроме совести.", "Берите, берите. Не дорого, для своих!", "Привоз работает без выходных и перерывов на обед.", "Ну шо, взяли? Теперь ищите, куда её приткнуть!", "Костяшка с Привоза — самая свежая, только сегодня завезли!", "Ой, шо-то вы бледный. Берите ещё, полегчает!", "Таки покупайте, покупайте, для вас скидка!"],
  bad: ["Шо вы мне тут суёте? Не подходит!", "Не морочьте мне голову, туда оно не лезет!", "Ой, та не смешите мою бабушку! Не тот край!", "Это не ваша костяшка. Ну, то есть ваша, но не сюда!", "Шо вы творите? Читайте цифры, дорогой!", "Таки нет. Присмотритесь: там другая цифра!", "Вы шо, слепой на оба глаза? Не подходит!", "Ша! Не так быстро. Эта костяшка сюда не годится."],
  pass: ["Привоз пуст. Пропускайте, дорогой.", "Ни костяшки, ни привоза. Пасуйте!", "Тут даже Привоз развёл руками. Пропускаем!", "Нема чого взяти. Передавайте ход!", "Шо поделать, бывает и такое. Ход пропускаем."],
  win: ["Таки вы выиграли! Гуляем на Дерибасовской! 🎉", "Ай, молодец! Бот идёт учить матчасть.", "Победа! Тащите шампанское с Привоза!", "Вы гений домино! Одесса вами гордится!", "Красиво сыграли! Бот в шоке, а я в восторге!", "Шоб вы так жили! Победа за вами!", "Ай да вы! Записывайте в летописи Одессы!"],
  lose: ["Бот выиграл. Не переживайте, на Привозе цены выросли ещё хуже.", "Проиграли? Ша, бывает. Сыграем ещё!", "Бот победил. Но мы ему это ещё припомним!", "Ой, не расстраивайтесь. Одесса и не такое переживала!", "Проигрыш — это не конец света, это повод налить чаю.", "Бот выиграл. Но вы всё равно красавчик!", "Не грустите! Реванш — это святое!"],
  winNet: ["Победа! Соперник в шоке, а Одесса вами гордится! 🎉", "Ай, молодец! Красиво сыграли!", "Вы выиграли! Соперник платит за чай.", "Шоб вы так жили! Победа за вами!"],
  loseNet: ["Соперник выиграл. Ша, бывает! Реванш — это святое!", "Проиграли? Не переживайте, на Привозе и не такое бывает.", "Сегодня не ваш день. Нажмите «Заново» и отыграйтесь!", "Соперник победил. Но вы всё равно красавчик!"],
  winG: ["Победа! Одесса вами гордится! 🎉", "Ай, молодец! Красиво сыграли!", "Шоб вы так жили! Победа за вами!", "Вы выиграли! Остальные платят за чай."],
  loseG: ["Не ваш день. Нажмите «Заново» и отыграйтесь!", "Проиграли? Ша, бывает! Реванш — это святое!", "Не переживайте, на Привозе и не такое бывает.", "Победил другой. Но вы всё равно красавчик!"],
  midG: ["Не первый, но и не последний. Серебро — тоже награда!", "Вы вышли из игры живым и здоровым. Уважаем!", "Проигрывает другой, а вы — молодец!"],
  draw0: ["Ничья! Как в Одессе: все довольны и никто не доволен.", "Ничья, шо тут скажешь. Разошлись мирно!", "Поровну! Такое бывает только в Одессе."]
};
const VER = 'v3';
const TARGET = 101;
// ---------- счёт (хранится на устройстве) ----------
const SCORE_KEY = 'domino-score-v1';
function loadScore() {
  const base = { bot: { w: 0, l: 0, d: 0 }, net: { w: 0, l: 0, d: 0 }, grp: { w: 0, l: 0, d: 0 } };
  try {
    const s = JSON.parse(localStorage.getItem(SCORE_KEY) || 'null');
    if (s) ['bot', 'net', 'grp'].forEach(m => ['w', 'l', 'd'].forEach(k => { if (s[m] && Number.isFinite(s[m][k])) base[m][k] = s[m][k]; }));
  } catch (e) {}
  return base;
}
function saveScore(s) { try { localStorage.setItem(SCORE_KEY, JSON.stringify(s)); } catch (e) {} }
function addResult(mode, key) {
  const s = loadScore(), k = key === 'win' ? 'w' : key === 'lose' ? 'l' : 'd';
  s[mode][k]++; saveScore(s); return s;
}
// Счёт текущего матча (в шапке игры): обнуляется в новом матче и при выходе в меню.
// Общая статистика (в меню) хранится отдельно и не сбрасывается.
const SESS = { bot: { w: 0, l: 0, d: 0 }, net: { w: 0, l: 0, d: 0 }, grp: { w: 0, l: 0, d: 0 } };
function resetSess(m) { (m ? [m] : Object.keys(SESS)).forEach(k => { SESS[k].w = SESS[k].l = SESS[k].d = 0; }); }
function addSess(m, key) { const k = key === 'win' ? 'w' : key === 'lose' ? 'l' : key === 'draw0' ? 'd' : null; if (k) SESS[m][k]++; }
function scoreText(m, short) {
  const r = loadScore()[m];
  return (short ? 'Побед ' : 'побед ') + r.w + ' · ' + (short ? 'Пораж. ' : 'поражений ') + r.l + (r.d ? ' · ' + (short ? 'Ничьих ' : 'ничьих ') + r.d : '');
}
const NAME_KEY = 'domino-name';
function getName() { try { return (localStorage.getItem(NAME_KEY) || '').slice(0, 12); } catch (e) { return ''; } }
function setName(n) { n = String(n || '').replace(/\s+/g, ' ').trim().slice(0, 12); try { localStorage.setItem(NAME_KEY, n); } catch (e) {} return n; }
const FONT = '"Segoe UI", Roboto, Arial, sans-serif';
const pick = a => a[Math.floor(Math.random() * a.length)];
const pips = t => t[0] + t[1];

class Sfx {
  constructor() { this.on = true; this.ctx = null; }
  get c() {
    if (!this.ctx) { const A = window.AudioContext || window.webkitAudioContext; if (A) this.ctx = new A(); }
    if (this.ctx && this.ctx.state === 'suspended') this.ctx.resume();
    return this.ctx;
  }
  tone(f, d, type = 'sine', v = 0.15, f2 = f, delay = 0) {
    const c = this.c; if (!c || !this.on) return;
    const t = c.currentTime + delay, o = c.createOscillator(), g = c.createGain();
    o.type = type; o.frequency.setValueAtTime(f, t); o.frequency.exponentialRampToValueAtTime(f2, t + d);
    g.gain.setValueAtTime(v, t); g.gain.exponentialRampToValueAtTime(0.0001, t + d);
    o.connect(g).connect(c.destination); o.start(t); o.stop(t + d);
  }
  noise(d, v, fc, delay = 0) {
    const c = this.c; if (!c || !this.on) return;
    const n = Math.floor(c.sampleRate * d), b = c.createBuffer(1, n, c.sampleRate), x = b.getChannelData(0);
    for (let i = 0; i < n; i++) x[i] = (Math.random() * 2 - 1) * (1 - i / n);
    const s = c.createBufferSource(), f = c.createBiquadFilter(), g = c.createGain();
    s.buffer = b; f.type = 'bandpass'; f.frequency.value = fc; g.gain.value = v;
    s.connect(f).connect(g).connect(c.destination); s.start(c.currentTime + delay);
  }
  clack() { this.noise(0.07, 0.5, 1800); this.tone(200, 0.09, 'triangle', 0.25, 90); }
  draw() { this.noise(0.18, 0.3, 700); }
  nope() { this.tone(170, 0.22, 'sawtooth', 0.12, 110); }
  coin() { this.tone(1300, 0.12, 'sine', 0.12); this.tone(1700, 0.2, 'sine', 0.12, 1700, 0.12); }
  win() { [523, 659, 784, 1047].forEach((f, i) => this.tone(f, 0.25, 'triangle', 0.18, f, i * 0.14)); }
  lose() { [392, 330, 262].forEach((f, i) => this.tone(f, 0.3, 'triangle', 0.18, f * 0.98, i * 0.2)); }
}

class Screen extends Phaser.Scene {
  btn(x, y, w, label, color, cb, fs) {
    const c = this.add.container(x, y), g = this.add.graphics();
    const t = this.add.text(0, 0, label, { fontFamily: FONT, fontSize: (fs || 17) + 'px', fontStyle: 'bold', color: '#fff' }).setOrigin(0.5);
    c.add([g, t]); c.t = t; c.setSize(w, 44);
    c.setEnabled = e => { g.clear(); g.fillStyle(e ? color : 0x444444).fillRoundedRect(-w / 2, -22, w, 44, 8); t.setColor(e ? '#fff' : '#888'); c.en = e; };
    c.setInteractive({ useHandCursor: true }).on('pointerdown', () => { if (c.en) { (this.game.sfx || (this.game.sfx = new Sfx())).c; cb(); } });
    c.setEnabled(true);
    return c;
  }
}

class Game extends Screen {
  constructor(key) { super(key || 'game'); }

  init(d) { d = d || {}; this.net = d.mode === 'net'; this.role = this.net && this.game.netCtx ? this.game.netCtx.role : null; this.isHost = this.role === 'host'; this.oppName = this.net && this.game.netCtx ? this.game.netCtx.oppName || '' : ''; }

  create() {
    this.sfx = this.game.sfx || (this.game.sfx = new Sfx());
    this.add.rectangle(W / 2, H / 2, W, H, 0x1a1a1f);
    this.add.text(W / 2, 17, 'ДОМИНО ПО-ОДЕССКИ', { fontFamily: FONT, fontSize: '20px', fontStyle: 'bold', color: '#fff' }).setOrigin(0.5);
    const bub = this.add.graphics(); bub.fillStyle(0x2a2a35).fillRoundedRect(16, 40, 448, 88, 8);
    this.stripe = this.add.graphics();
    this.status = this.add.text(W / 2 + 3, 84, '', { fontFamily: FONT, fontSize: '22px', fontStyle: 'bold', color: '#fff', align: 'center', wordWrap: { width: 418 } }).setOrigin(0.5);
    this.botLabel = this.add.text(24, 131, '', { fontFamily: FONT, fontSize: '14px', color: '#aaa' });
    this.scoreW = this.add.text(62, 22, '', { fontFamily: FONT, fontSize: '13px', fontStyle: 'bold', color: '#2ecc40', align: 'center', lineSpacing: 0 }).setOrigin(0.5);
    this.scoreL = this.add.text(418, 22, '', { fontFamily: FONT, fontSize: '13px', fontStyle: 'bold', color: '#ff5c6c', align: 'center', lineSpacing: 0 }).setOrigin(0.5);
    this.scoreD = this.add.text(W / 2, 35, '', { fontFamily: FONT, fontSize: '10px', color: '#aaa' }).setOrigin(0.5);
    this.refreshScore();
    this.botGfx = this.add.graphics();
    const bz = this.add.graphics(); bz.fillStyle(0x111115).fillRoundedRect(10, 190, 460, 380, 8);
    bz.lineStyle(2, 0x3a3a4a).strokeRoundedRect(10, 190, 460, 380, 8);
    this.add.text(24, 600, 'Ваши костяшки' + (getName() ? ' (' + getName() + ')' : '') + ' — нажмите, чтобы сходить:', { fontFamily: FONT, fontSize: '13px', color: '#aaa' });
    this.markL = this.add.text(0, 0, 'ЛЕВ', { fontFamily: FONT, fontSize: '11px', backgroundColor: '#007bff', color: '#fff', padding: { x: 3, y: 1 } }).setOrigin(0.5).setDepth(20).setVisible(false);
    this.markR = this.add.text(0, 0, 'ПРАВ', { fontFamily: FONT, fontSize: '11px', backgroundColor: '#28a745', color: '#fff', padding: { x: 3, y: 1 } }).setOrigin(0.5).setDepth(20).setVisible(false);
    this.bazar = this.btn(90, 762, 170, 'Привоз', 0x28a745, () => this.takeBazar());
    this.passB = this.btn(90, 762, 170, 'Пропустить ход', 0xdc3545, () => this.pass()).setVisible(false);
    this.btn(232, 762, 100, 'Заново', 0x007bff, () => this.again());
    this.btn(340, 762, 90, 'Меню', 0x6f42c1, () => { this.leaveNet(); this.scene.start('menu'); });
    this.snd = this.btn(428, 762, 56, this.sfx.on ? '🔊' : '🔇', 0x555566, () => {
      this.sfx.on = !this.sfx.on; this.snd.t.setText(this.sfx.on ? '🔊' : '🔇');
    });
    this.recorded = false; this.sideBtns = []; this.myPassPips = null; this.oppPassPips = null; this.lastHl = null;
    if (this.net) this.netStart(); else this.newGame();
  }

  refreshScore() {
    const r = SESS[this.scoreKey || (this.net ? 'net' : 'bot')];
    this.scoreW.setText('ПОБЕДЫ\n' + r.w).setFontSize('13px'); this.scoreL.setText('ПОРАЖЕНИЯ\n' + r.l);
    this.scoreD.setText(r.d ? 'ничьих: ' + r.d : '');
  }

  again() {
    if (!this.net) return this.scene.restart({ mode: 'bot' });
    if (this.isHost) return this.rematch();
    this.sendNet({ type: 'rematch' }); this.setMsg('Просим соперника начать новую партию…');
  }
  rematch() { this.sendNet({ type: 'restart' }); this.game.netCtx.inbox.length = 0; this.scene.restart({ mode: 'net' }); }
  leaveNet() {
    const c = this.game.netCtx; if (!c) return;
    try { c.conn.close(); } catch (e) {} try { c.peer.destroy(); } catch (e) {}
    this.game.netCtx = null;
  }
  sendNet(m) { const c = this.game.netCtx; if (c && c.conn && c.conn.open) c.conn.send(m); }

  setMsg(txt) {
    // крупный шрифт; если текст длинный — уменьшаем, пока не влезет в рамку
    let fs = 22;
    this.status.setFontSize(fs + 'px').setText(txt);
    while (this.status.height > 80 && fs > 15) { fs--; this.status.setFontSize(fs + 'px'); }
  }

  say(k, extra = '') { this.setMsg(typeof k === 'string' && SAY[k] ? pick(SAY[k]) + extra : k); }

  makeTile(l, r, x, y) {
    const c = this.add.container(x, y), g = this.add.graphics();
    g.fillStyle(0xfdfdfd).fillRoundedRect(-TL / 2, -TH / 2, TL, TH, 5);
    g.lineStyle(1, 0x111111).strokeRoundedRect(-TL / 2, -TH / 2, TL, TH, 5);
    g.lineStyle(2, 0x777777).lineBetween(0, -TH / 2 + 4, 0, TH / 2 - 4);
    g.fillStyle(0x111115);
    [[l, -TL / 4], [r, TL / 4]].forEach(([n, cx]) => PIPS[n].forEach(([gx, gy]) => g.fillCircle(cx + gx * 6, gy * 6, 2.3)));
    c.add(g); c.setSize(TL, TH);
    return c;
  }

  makeDeck() {
    const deck = [];
    for (let i = 0; i <= 6; i++) for (let j = i; j <= 6; j++) deck.push([i, j]);
    for (let i = deck.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [deck[i], deck[j]] = [deck[j], deck[i]]; }
    return deck;
  }

  // ---------- сетевой режим ----------
  netStart() {
    this.busy = true; this.turn = null; this.over = false;
    this.board = []; this.hobj = []; this.hp = []; this.hb = []; this.pool = [];
    this.drawBot(); this.updateButtons();
    this.time.addEvent({ delay: 80, loop: true, callback: () => this.pump() });
    if (this.isHost) {
      const deck = this.makeDeck(), hp = deck.splice(0, 7), hb = deck.splice(0, 7);
      const first = Math.random() < 0.5 ? 'p' : 'b';
      this.sendNet({ type: 'init', hand: hb, pool: deck.length, first: first === 'p' ? 'h' : 'g' });
      this.startRound(hp, hb, deck, first);
    } else this.setMsg('Ждём раздачу костяшек…');
  }

  startRound(hp, hb, pool, first) {
    this.hp = hp; this.hb = hb; this.pool = pool; this.board = []; this.hobj = []; this.lastHl = null;
    this.over = false; this.turn = first; this.busy = true; this.myPassPips = null; this.oppPassPips = null;
    this.hp.forEach(t => this.hobj.push(this.makeHandObj(t)));
    this.layoutHand(); this.drawBot(); this.updateButtons();
    this.setMsg(first === 'p' ? 'Жребий брошен: вы ходите первым, таки везёт!' : 'Жребий брошен: первым ходит соперник.');
    this.sfx.coin();
    this.time.delayedCall(2600, () => { this.busy = false; this.next(true); });
  }

  pump() {
    const c = this.game.netCtx; if (!c || !c.inbox.length) return;
    const m = c.inbox[0], urgent = ['init', 'restart', 'rematch', 'bye', 'drew', 'draw'].includes(m.type);
    if (this.busy && !urgent) return;
    c.inbox.shift(); this.onNet(m);
  }

  onNet(m) {
    switch (m.type) {
      case 'init': if (!this.isHost) this.startRound(m.hand, Array(7).fill(null), Array(m.pool).fill(null), m.first === 'g' ? 'p' : 'b'); break;
      case 'restart': this.scene.restart({ mode: 'net' }); break;
      case 'rematch': if (this.isHost) this.rematch(); break;
      case 'bye':
        if (this.over) break;
        this.over = true; this.turn = null; this.busy = false;
        this.setMsg('Соперник отключился. Нажмите «Меню».'); this.updateButtons(); this.layoutHand(); break;
      case 'play': {
        if (this.over || this.turn !== 'b') break;
        const t = m.tile, e = this.ends();
        this.lastOpp = '➜ Соперник поставил [' + t[0] + '|' + t[1] + ']' + (e ? (m.side === 'l' ? ' слева' : ' справа') : '');
        this.setMsg(this.lastOpp);
        const ho = this.makeTile(t[0], t[1], W / 2, 168).setVisible(false); ho.tile = t;
        this.place('b', ho, m.side); break;
      }
      case 'draw': { // гость просит костяшку с Привоза (только хост)
        if (!this.isHost || !this.pool.length) break;
        const t = this.pool.pop(); this.hb.push(t); this.drawBot(); this.updateButtons(); this.sfx.draw();
        this.setMsg('Соперник идёт на Привоз…');
        this.sendNet({ type: 'drew', tile: t }); break;
      }
      case 'drew': if (this.drawWait) { this.drawWait.remove(); this.drawWait = null; } this.pool.pop(); this.busy = false; this.gotTile(m.tile); break;
      case 'oppDrew':
        this.pool.pop(); this.hb.push(null); this.drawBot(); this.updateButtons(); this.sfx.draw();
        this.setMsg('Соперник идёт на Привоз…'); break;
      case 'pass':
        this.oppPassPips = m.pips;
        if (this.myPassPips !== null) return void this.finishFish(this.myPassPips, m.pips);
        this.lastOpp = '➜ Соперник пропустил ход.'; this.setMsg(this.lastOpp); this.turn = 'p'; this.busy = true;
        this.time.delayedCall(1500, () => { this.busy = false; this.next(); }); break;
    }
  }

  removeOpp(t) {
    const same = x => x && ((x[0] === t[0] && x[1] === t[1]) || (x[0] === t[1] && x[1] === t[0]));
    let i = this.hb.findIndex(same); if (i < 0) i = this.hb.findIndex(x => x === null); if (i < 0) i = 0;
    this.hb.splice(i, 1);
  }

  finishFish(a, b) {
    const k = a < b ? 'win' : a > b ? 'lose' : 'draw0';
    this.fin('РЫБА! Очки: вы ' + a + ', ' + (this.net ? 'соперник ' : 'бот ') + b + '.', k, () => (k === 'lose' ? this.sfx.lose() : this.sfx.win()));
  }
  fin(msg, key, snd) {
    if (!this.recorded) { this.recorded = true; addResult(this.net ? 'net' : 'bot', key); addSess(this.net ? 'net' : 'bot', key); this.refreshScore(); }
    this.over = true; this.turn = null; this.busy = false;
    const kk = this.net && (key === 'win' || key === 'lose') ? key + 'Net' : key;
    this.say(msg + ' ' + pick(SAY[kk])); snd(); this.updateButtons(); this.layoutHand(); return true;
  }

  newGame() {
    const deck = this.makeDeck();
    this.hp = deck.splice(0, 7); this.hb = deck.splice(0, 7); this.pool = deck;
    this.board = []; this.hobj = []; this.lastHl = null; this.over = false; this.busy = true; this.turn = null;
    this.hp.forEach(t => this.hobj.push(this.makeHandObj(t)));
    this.layoutHand(); this.drawBot(); this.updateButtons();
    this.say('coin');
    const coin = this.add.text(W / 2, 380, '🪙', { fontFamily: FONT, fontSize: '64px' }).setOrigin(0.5);
    const hb = this.btn(150, 470, 140, 'Орёл', 0x007bff, () => flip('h'));
    const tb = this.btn(330, 470, 140, 'Решка', 0x007bff, () => flip('t'));
    const flip = guess => {
      hb.destroy(); tb.destroy(); this.sfx.coin();
      const res = Math.random() < 0.5 ? 'h' : 't';
      this.tweens.add({ targets: coin, scaleX: -1, duration: 150, yoyo: true, repeat: 5, onComplete: () => {
        coin.setText(res === 'h' ? 'О' : 'Р');
        this.turn = guess === res ? 'p' : 'b';
        this.setMsg((res === 'h' ? 'Орёл! ' : 'Решка! ') + (this.turn === 'p' ? 'Вы ходите первым, таки везёт!' : 'Первым ходит бот, шоб он был здоров.'));
        this.time.delayedCall(2600, () => { coin.destroy(); this.busy = false; this.next(true); });
      } });
    };
  }

  makeHandObj(t) {
    const o = this.makeTile(t[0], t[1], W / 2, 700); o.setAngle(90).setScale(1.25); o.tile = t;
    const gl = this.add.graphics();
    gl.fillStyle(0x2ecc40, 0.25).fillRoundedRect(-TL / 2, -TH / 2, TL, TH, 5);
    gl.lineStyle(6, 0x2ecc40, 0.35).strokeRoundedRect(-TL / 2 - 3, -TH / 2 - 3, TL + 6, TH + 6, 8);
    gl.lineStyle(2.5, 0x2ecc40, 1).strokeRoundedRect(-TL / 2 - 1, -TH / 2 - 1, TL + 2, TH + 2, 6);
    gl.setVisible(false); o.add(gl); o.glow = gl;
    this.tweens.add({ targets: gl, alpha: { from: 1, to: 0.5 }, duration: 600, yoyo: true, repeat: -1 });
    o.setInteractive({ useHandCursor: true }).on('pointerdown', () => this.tap(o));
    return o;
  }

  layoutHand() {
    const n = this.hobj.length, sp = Math.min(46, 440 / Math.max(n, 1));
    const mine = this.turn === 'p' && !this.over;
    this.stripe.clear().fillStyle(mine ? 0x2ecc40 : 0x007bff).fillRect(16, 40, 5, 88);
    this.hobj.forEach((o, i) => {
      const ok = mine && this.canPlay(o.tile), lift = ok ? -12 : 0;
      if (o.glow) o.glow.setVisible(ok);
      this.tweens.add({ targets: o, x: W / 2 + (i - (n - 1) / 2) * sp, y: 690 + lift, duration: 250 });
      o.setDepth(i);
    });
  }

  drawBot() {
    this.botLabel.setText((this.net ? (this.oppName || 'Соперник') : 'Соперник (бот)') + ', костяшек: ' + this.hb.length);
    this.botGfx.clear().fillStyle(0x2a2a35).lineStyle(1, 0x555566);
    const n = this.hb.length, sp = Math.min(30, 420 / Math.max(n, 1));
    for (let i = 0; i < n; i++) {
      const x = W / 2 + (i - (n - 1) / 2) * sp;
      this.botGfx.fillRoundedRect(x - 10, 152, 20, 34, 3).strokeRoundedRect(x - 10, 152, 20, 34, 3);
    }
  }

  ends() { return this.board.length ? { l: this.board[0].l, r: this.board[this.board.length - 1].r } : null; }
  canPlay(t) { const e = this.ends(); return !e || t[0] === e.l || t[1] === e.l || t[0] === e.r || t[1] === e.r; }
  hasMove(h) { return h.some(t => this.canPlay(t)); }

  updateButtons() {
    const mine = this.turn === 'p' && !this.busy && !this.over;
    const no = mine && !this.hasMove(this.hp);
    this.bazar.t.setText('Привоз (' + this.pool.length + ')');
    this.bazar.setEnabled(no && this.pool.length > 0);
    this.bazar.setVisible(!(no && this.pool.length === 0));
    this.passB.setEnabled(true); this.passB.setVisible(no && this.pool.length === 0);
  }

  next(first) {
    if (this.over) return;
    this.clearSide();
    if (this.checkEnd()) return;
    this.updateButtons(); this.layoutHand();
    if (this.turn === 'p') { if (this.net && this.lastOpp) this.setMsg(this.lastOpp + '\nВаш ход!'); else this.say('you'); }
    else if (this.net) this.setMsg('Ход соперника… ждём.');
    else { this.say('bot'); this.time.delayedCall(2200, () => this.botMove()); }
  }

  tap(o) {
    if (this.turn !== 'p' || this.busy || this.over) return;
    this.clearSide();
    const t = o.tile;
    if (!this.canPlay(t)) { this.sfx.nope(); this.say('bad'); this.tweens.add({ targets: o, angle: { from: 80, to: 100 }, duration: 60, yoyo: true, repeat: 2, onComplete: () => o.setAngle(90) }); return; }
    const e = this.ends();
    if (!e) return this.place('p', o, 'r');
    const cl = t[0] === e.l || t[1] === e.l, cr = t[0] === e.r || t[1] === e.r;
    if (cl && cr && e.l !== e.r) {
      this.say('Костяшка подходит с обеих сторон. Куда ставим?');
      this.sideBtns = [this.btn(130, 590 - 0, 180, '◀ Влево (' + e.l + ')', 0x007bff, () => this.place('p', o, 'l')),
                       this.btn(350, 590, 180, 'Вправо (' + e.r + ') ▶', 0x28a745, () => this.place('p', o, 'r'))];
      this.sideBtns.forEach(b => b.setDepth(50).y = 584);
    } else this.place('p', o, cl && !cr ? 'l' : 'r');
  }
  clearSide() { this.sideBtns.forEach(b => b.destroy()); this.sideBtns = []; }

  place(who, ho, side) {
    this.clearSide(); this.busy = true; this.myPassPips = null; this.oppPassPips = null;
    if (who === 'p') this.lastOpp = null;
    if (who === 'p' && this.net) this.sendNet({ type: 'play', tile: ho.tile, side });
    const t = ho.tile, e = this.ends(); let l, r;
    if (!e) { l = t[0]; r = t[1]; }
    else if (side === 'r') { l = t[0] === e.r ? t[0] : t[1]; r = l === t[0] ? t[1] : t[0]; }
    else { r = t[1] === e.l ? t[1] : t[0]; l = r === t[1] ? t[0] : t[1]; }
    const from = { x: ho.x, y: ho.y }; if (ho.glow) this.tweens.killTweensOf(ho.glow); ho.destroy();
    if (who === 'p') { this.hobj = this.hobj.filter(x => x !== ho); this.hp = this.hp.filter(x => x !== t); }
    else this.removeOpp(t);
    const obj = this.makeTile(l, r, from.x, from.y).setAngle(90).setScale(who === 'p' ? 1.25 : 1);
    const item = { l, r, obj };
    this.markLast(obj, who);
    side === 'l' && e ? this.board.unshift(item) : this.board.push(item);
    this.drawBot(); this.renderBoard(true);
    this.sfx.draw();
    this.time.delayedCall(320, () => {
      this.sfx.clack(); this.cameras.main.shake(80, 0.002);
      this.tweens.add({ targets: obj, scale: { from: who === 'p' ? 1.15 : 1.6, to: 1 }, duration: who === 'p' ? 150 : 350 });
      this.turn = who === 'p' ? 'b' : 'p'; this.layoutHand();
      // даём прочитать реплику бота; в сети ждём меньше
      this.time.delayedCall(who === 'p' ? 250 : (this.net ? 1200 : 2400), () => { this.busy = false; this.next(); });
    });
    this.layoutHand();
  }

  markLast(obj, who) {
    const col = who === 'p' ? 0xffd400 : 0xff7a1a;
    if (this.lastHl) { this.tweens.killTweensOf(this.lastHl); this.lastHl.destroy(); }
    const hl = this.add.graphics();
    hl.fillStyle(col, 0.18).fillRoundedRect(-TL / 2, -TH / 2, TL, TH, 5);
    hl.lineStyle(6, col, 0.28).strokeRoundedRect(-TL / 2 - 3, -TH / 2 - 3, TL + 6, TH + 6, 8);
    hl.lineStyle(2.5, col, 1).strokeRoundedRect(-TL / 2 - 1, -TH / 2 - 1, TL + 2, TH + 2, 6);
    obj.add(hl); this.lastHl = hl;
    this.tweens.add({ targets: hl, alpha: { from: 1, to: 0.45 }, duration: 600, yoyo: true, repeat: -1 });
  }

  pos(i, n) {
    const row = Math.floor(i / 8), col = i % 8, rev = row % 2, rows = Math.ceil(n / 8);
    return { x: 44 + (rev ? 7 - col : col) * 56, y: 380 + (row - (rows - 1) / 2) * 52, a: rev ? 180 : 0 };
  }

  renderBoard(anim) {
    const n = this.board.length;
    this.board.forEach((it, i) => {
      const p = this.pos(i, n), dbl = it.l === it.r;
      it.obj.setDepth(5);
      // Phaser хранит 180° как −180°, поэтому крутим по кратчайшему пути, без лишнего оборота на 360°
      const cur = it.obj.angle, target = p.a + (dbl ? 90 : 0), delta = (((target - cur) % 360) + 540) % 360 - 180;
      this.tweens.add({ targets: it.obj, x: p.x, y: p.y, angle: cur + delta, scale: 1, duration: anim ? 300 : 0, ease: 'Cubic.easeOut' });
    });
    if (!n) return;
    const a = this.pos(0, n), b = this.pos(n - 1, n);
    const oa = this.board[0].l === this.board[0].r ? 40 : 26, ob = this.board[n - 1].l === this.board[n - 1].r ? 40 : 26;
    this.markL.setPosition(a.x, a.y - oa).setVisible(true); this.markR.setPosition(b.x, b.y + ob).setVisible(true);
  }

  botMove() {
    if (this.over) return;
    const opts = this.hb.filter(t => this.canPlay(t));
    if (opts.length) {
      opts.sort((a, b) => pips(b) - pips(a));
      const t = opts[0], e = this.ends(), cl = e && (t[0] === e.l || t[1] === e.l), cr = !e || t[0] === e.r || t[1] === e.r;
      const side = cr && (!cl || Math.random() < 0.5) ? 'r' : 'l';
      this.say('botPlay', '\n➜ Бот поставил [' + t[0] + '|' + t[1] + ']' + (e ? (side === 'l' ? ' слева' : ' справа') : ''));
      const ho = this.makeTile(t[0], t[1], W / 2, 168).setVisible(false); ho.tile = t;
      return this.place('b', ho, side);
    }
    if (this.pool.length) {
      this.hb.push(this.pool.pop()); this.sfx.draw(); this.drawBot(); this.say('botDraw'); this.updateButtons();
      return void this.time.delayedCall(2200, () => this.botMove());
    }
    this.say('botPass'); this.turn = 'p'; this.busy = true; this.time.delayedCall(2600, () => { this.busy = false; this.next(); });
  }

  takeBazar() {
    if (this.turn !== 'p' || this.busy || !this.pool.length || this.hasMove(this.hp)) return;
    if (this.net && !this.isHost) {
      this.busy = true; this.sendNet({ type: 'draw' }); this.updateButtons(); this.setMsg('Идём на Привоз… ждём костяшку от хозяина.');
      this.drawWait = this.time.delayedCall(6000, () => { this.busy = false; this.updateButtons(); this.setMsg('Нет ответа от хозяина комнаты. Нажмите «Привоз» ещё раз.'); });
      return;
    }
    const t = this.pool.pop(); this.gotTile(t);
    if (this.net) this.sendNet({ type: 'oppDrew' });
  }

  gotTile(t) {
    this.hp.push(t); this.sfx.draw(); this.say('draw');
    const o = this.makeHandObj(t); o.setPosition(90, 762); this.hobj.push(o);
    this.updateButtons(); this.layoutHand();
  }

  pass() {
    if (this.net) {
      const mine = this.hp.reduce((a, t) => a + pips(t), 0);
      this.sendNet({ type: 'pass', pips: mine }); this.myPassPips = mine;
      if (this.oppPassPips !== null) return void this.finishFish(mine, this.oppPassPips);
    }
    this.turn = 'b'; this.busy = true; this.say('pass'); this.updateButtons();
    this.time.delayedCall(2200, () => { this.busy = false; this.next(); });
  }

  checkEnd() {
    if (!this.hp.length) return this.fin('Домино!', 'win', () => this.sfx.win());
    if (!this.hb.length) return this.fin(this.net ? 'Соперник выложил всё!' : 'Бот выложил всё!', 'lose', () => this.sfx.lose());
    if (!this.net && this.board.length && !this.pool.length && !this.hasMove(this.hp) && !this.hasMove(this.hb)) {
      const a = this.hp.reduce((s, t) => s + pips(t), 0), b = this.hb.reduce((s, t) => s + pips(t), 0);
      this.finishFish(a, b); return true;
    }
    return false;
  }
}

// ================= Игра на 3–4 человека по сети =================
// Хозяин комнаты (место 0) ведёт всю партию и рассылает события, гости только ходят и смотрят.
class Table extends Game {
  constructor() { super('table'); }

  init() {
    const c = this.game.netCtx || {};
    this.ctx = c; this.isHost = c.role === 'host'; this.n = c.n || 3; this.teams = !!c.teams;
    this.net = true; this.scoreKey = 'grp'; this.scoreMode = c.score || 'none';
  }

  create() {
    this.sfx = this.game.sfx || (this.game.sfx = new Sfx());
    this.add.rectangle(W / 2, H / 2, W, H, 0x1a1a1f);
    this.add.text(W / 2, 17, 'ДОМИНО ПО-ОДЕССКИ', { fontFamily: FONT, fontSize: '20px', fontStyle: 'bold', color: '#fff' }).setOrigin(0.5);
    const bub = this.add.graphics(); bub.fillStyle(0x2a2a35).fillRoundedRect(16, 40, 448, 88, 8);
    this.stripe = this.add.graphics();
    this.status = this.add.text(W / 2 + 3, 84, '', { fontFamily: FONT, fontSize: '22px', fontStyle: 'bold', color: '#fff', align: 'center', wordWrap: { width: 418 } }).setOrigin(0.5);
    this.scoreW = this.add.text(62, 22, '', { fontFamily: FONT, fontSize: '13px', fontStyle: 'bold', color: '#2ecc40', align: 'center' }).setOrigin(0.5);
    this.scoreL = this.add.text(418, 22, '', { fontFamily: FONT, fontSize: '13px', fontStyle: 'bold', color: '#ff5c6c', align: 'center' }).setOrigin(0.5);
    this.scoreD = this.add.text(W / 2, 35, '', { fontFamily: FONT, fontSize: '10px', color: '#aaa' }).setOrigin(0.5);
    this.refreshScore();
    this.oppGfx = this.add.graphics();
    this.oppT = [0, 1, 2].map(() => this.add.text(0, 0, '', { fontFamily: FONT, fontSize: '12px', fontStyle: 'bold', color: '#ddd' }).setOrigin(0.5));
    const bz = this.add.graphics(); bz.fillStyle(0x111115).fillRoundedRect(10, 190, 460, 380, 8);
    bz.lineStyle(2, 0x3a3a4a).strokeRoundedRect(10, 190, 460, 380, 8);
    this.add.text(24, 600, 'Ваши костяшки' + (getName() ? ' (' + getName() + ')' : '') + ' — нажмите, чтобы сходить:', { fontFamily: FONT, fontSize: '13px', color: '#aaa' });
    this.markL = this.add.text(0, 0, 'ЛЕВ', { fontFamily: FONT, fontSize: '11px', backgroundColor: '#007bff', color: '#fff', padding: { x: 3, y: 1 } }).setOrigin(0.5).setDepth(20).setVisible(false);
    this.markR = this.add.text(0, 0, 'ПРАВ', { fontFamily: FONT, fontSize: '11px', backgroundColor: '#28a745', color: '#fff', padding: { x: 3, y: 1 } }).setOrigin(0.5).setDepth(20).setVisible(false);
    this.bazar = this.btn(90, 762, 170, 'Привоз', 0x28a745, () => this.takeBazar());
    this.passB = this.btn(90, 762, 170, 'Пропустить ход', 0xdc3545, () => this.pass()).setVisible(false);
    this.againB = this.btn(232, 762, 100, 'Заново', 0x007bff, () => this.again());
    this.btn(340, 762, 90, 'Меню', 0x6f42c1, () => { this.leaveNet(); this.scene.start('menu'); });
    this.snd = this.btn(428, 762, 56, this.sfx.on ? '🔊' : '🔇', 0x555566, () => {
      this.sfx.on = !this.sfx.on; this.snd.t.setText(this.sfx.on ? '🔊' : '🔇');
    });
    this.matchT = this.add.text(W / 2, 583, '', { fontFamily: FONT, fontSize: '12px', fontStyle: 'bold', color: '#ffd400' }).setOrigin(0.5);
    this.recorded = false; this.sideBtns = []; this.lastHl = null; this.lastTxt = null; this.match = null;
    this.hobj = []; this.hp = []; this.board = []; this.counts = []; this.poolN = 0;
    this.seat = null; this.names = []; this.outSeats = []; this.cur = null; this.turn = null; this.over = false; this.busy = true; this.waiting = false;
    this.evq = []; this.hs = null;
    this.drawOpps(); this.updateButtons();
    this.time.addEvent({ delay: 80, loop: true, callback: () => this.pump() });
    if (this.isHost) this.hostDeal(); else this.setMsg('Подключились! Ждём остальных игроков…');
  }

  refreshScore() {
    const r = SESS.grp;
    this.scoreW.setText('ПОБЕДЫ\n' + r.w); this.scoreL.setText('ПОРАЖЕНИЯ\n' + r.l);
    this.scoreD.setText(r.d ? 'ничьих: ' + r.d : '');
  }

  baseName(seat) { return (this.names && this.names[seat]) || 'Игрок ' + (seat + 1); }
  isPartner(seat) { return this.teams && this.seat !== null && seat !== this.seat && ((seat - this.seat + this.n) % this.n) === 2; }
  nm(seat) {
    if (seat === this.seat) return 'Вы';
    return this.baseName(seat) + (this.isPartner(seat) ? ' (напарник)' : '');
  }
  nextSeat(seat) { for (let k = 1; k <= this.n; k++) { const x = (seat + k) % this.n; if (!this.hs.out.includes(x)) return x; } return seat; }
  oppX(seat) { const k = (seat - this.seat + this.n) % this.n - 1, cw = 460 / (this.n - 1); return 10 + cw * (k + 0.5); }

  // ---------- соперники сверху ----------
  drawOpps() {
    const g = this.oppGfx.clear(), n = this.n;
    this.oppT.forEach(t => t.setVisible(false)); this.drawMatch();
    if (this.seat === null) return;
    const cw = 460 / (n - 1);
    for (let k = 0; k < n - 1; k++) {
      const seat = (this.seat + 1 + k) % n, x0 = 10 + cw * k, cx = x0 + cw / 2, act = this.cur === seat && !this.over;
      g.fillStyle(act ? 0x1f3a24 : 0x22222b).fillRoundedRect(x0 + 3, 131, cw - 6, 56, 6);
      if (act) g.lineStyle(2, 0x2ecc40).strokeRoundedRect(x0 + 3, 131, cw - 6, 56, 6);
      const partner = this.isPartner(seat), place = this.outSeats.indexOf(seat) + 1, c = place ? 0 : (this.counts[seat] || 0);
      this.oppT[k].setPosition(cx, 143).setText(this.baseName(seat) + ' · ' + (place ? place + '-е место' : c)).setColor(place ? '#2ecc40' : partner ? '#7fd1ff' : '#ddd').setVisible(true);
      const sp = Math.min(13, (cw - 24) / Math.max(c, 1));
      g.fillStyle(0x3a3a4a).lineStyle(1, 0x666677);
      for (let i = 0; i < c; i++) { const x = cx + (i - (c - 1) / 2) * sp; g.fillRoundedRect(x - 4, 156, 8, 26, 2).strokeRoundedRect(x - 4, 156, 8, 26, 2); }
    }
  }

  drawMatch() {
    const m = this.match;
    if (!this.matchT) return;
    if (this.scoreMode === 'none' || !m || this.seat === null) { this.matchT.setText(''); return; }
    let t;
    if (this.teams) t = 'Мы ' + m.totals[this.seat % 2] + ' · Они ' + m.totals[1 - (this.seat % 2)];
    else t = [...Array(this.n).keys()].map(k => (this.seat + k) % this.n).map(st => (st === this.seat ? 'Вы' : this.baseName(st)) + ' ' + m.totals[st]).join(' · ');
    this.matchT.setText('До ' + TARGET + ' (раунд ' + (m.round || 1) + '): ' + t + (m.pending ? ' · зависло ' + m.pending : ''));
  }

  updateButtons() {
    const mine = this.turn === 'p' && !this.busy && !this.over && !this.waiting;
    const no = mine && !this.hasMove(this.hp);
    this.bazar.t.setText('Привоз (' + this.poolN + ')');
    this.bazar.setEnabled(no && this.poolN > 0);
    this.bazar.setVisible(this.n < 4 && !(no && this.poolN === 0));
    this.passB.setEnabled(true); this.passB.setVisible(no && this.poolN === 0);
  }

  // ---------- связь ----------
  leaveNet() {
    const c = this.ctx; if (!c) return;
    try { (c.conns || []).forEach(x => x.close()); } catch (e) {}
    try { if (c.conn) c.conn.close(); } catch (e) {}
    try { c.peer.destroy(); } catch (e) {}
    this.game.netCtx = null; this.ctx = null;
  }
  sendAct(m) { if (this.isHost) this.hostAct(0, m); else if (this.ctx && this.ctx.conn && this.ctx.conn.open) this.ctx.conn.send(Object.assign({ type: 'act' }, m)); }
  waitAct() {
    this.waiting = true; this.updateButtons();
    this.actTimer = this.time.delayedCall(6000, () => { if (!this.over) { this.waiting = false; this.updateButtons(); this.setMsg('Нет ответа. Попробуйте ещё раз.'); } });
  }
  doneWait() { this.waiting = false; if (this.actTimer) { this.actTimer.remove(); this.actTimer = null; } }

  pump() {
    const c = this.ctx; if (!c) return;
    if (this.isHost) while (c.inbox.length) this.hostMsg(c.inbox.shift());
    const q = this.isHost ? this.evq : c.inbox; if (!q.length) return;
    const m = q[0], urgent = ['deal', 'restart', 'bye', 'left', 'lobby'].includes(m.type);
    if (this.busy && !urgent) return;
    q.shift(); this.onEvt(m);
  }

  // ---------- хозяин: правила ----------
  hostCan(t) { const b = this.hs.board; if (!b.length) return true; const l = b[0].l, r = b[b.length - 1].r; return t[0] === l || t[1] === l || t[0] === r || t[1] === r; }

  emit(ev) {
    const c = this.ctx;
    c.conns.forEach((cn, i) => { if (cn.open) cn.send(this.redact(ev, i + 1)); });
    this.evq.push(this.redact(ev, 0));
  }
  redact(ev, seat) { return ev.type === 'drew' && ev.seat !== seat ? { type: 'drew', seat: ev.seat, tile: null } : ev; }

  hostDeal() {
    const n = this.n, deck = this.makeDeck(), hands = [];
    for (let i = 0; i < n; i++) hands.push(deck.splice(0, 7));
    const first = Math.floor(Math.random() * n);
    this.hs = { hands, pool: deck, board: [], turn: first, passes: 0, over: false, out: [] };
    const c = this.ctx; let match = null;
    if (this.scoreMode !== 'none') {
      if (!c.match || c.match.done) c.match = { totals: Array(this.teams ? 2 : n).fill(0), pending: 0, round: 0, done: false };
      c.match.round++; match = { totals: c.match.totals.slice(), pending: c.match.pending, round: c.match.round };
    }
    const names = [getName() || 'Игрок 1']; this.ctx.conns.forEach((cn, i) => names.push(cn._name || 'Игрок ' + (i + 2)));
    this.ctx.conns.forEach((cn, i) => { if (cn.open) cn.send({ type: 'deal', seat: i + 1, n, teams: this.teams, hand: hands[i + 1], first, pool: deck.length, names, score: this.scoreMode, match }); });
    this.evq.push({ type: 'deal', seat: 0, n, teams: this.teams, hand: hands[0].map(t => t.slice()), first, pool: deck.length, names, score: this.scoreMode, match });
  }

  hostMsg(m) {
    const seat = this.ctx.conns.indexOf(m._c) + 1;
    if (m.type === 'bye') { if (seat > 0 && this.hs && !this.hs.over) { this.hs.over = true; this.emit({ type: 'left', seat }); } }
    else if (m.type === 'rematch') this.rematch();
    else if (m.type === 'act' && seat > 0) this.hostAct(seat, m);
  }

  hostAct(seat, m) {
    const s = this.hs; if (!s || s.over || s.turn !== seat) return;
    const n = this.n, hand = s.hands[seat], can = hand.some(t => this.hostCan(t));
    if (m.act === 'play') {
      const t = m.tile, i = hand.findIndex(x => x[0] === t[0] && x[1] === t[1]); if (i < 0 || !this.hostCan(hand[i])) return;
      const tile = hand[i], b = s.board, e = b.length ? { l: b[0].l, r: b[b.length - 1].r } : null;
      let side = m.side === 'l' ? 'l' : 'r';
      if (e) {
        const cl = tile[0] === e.l || tile[1] === e.l, cr = tile[0] === e.r || tile[1] === e.r;
        if (side === 'l' && !cl) side = 'r'; else if (side === 'r' && !cr) side = 'l';
      } else side = 'r';
      hand.splice(i, 1);
      let l, r;
      if (!e) { l = tile[0]; r = tile[1]; }
      else if (side === 'r') { l = tile[0] === e.r ? tile[0] : tile[1]; r = l === tile[0] ? tile[1] : tile[0]; }
      else { r = tile[1] === e.l ? tile[1] : tile[0]; l = r === tile[1] ? tile[0] : tile[1]; }
      side === 'l' && e ? b.unshift({ l, r }) : b.push({ l, r });
      s.passes = 0;
      const ev = { type: 'play', seat, tile, side };
      if (!hand.length) {
        if (this.teams) ev.end = this.hostFinish('domino', seat);
        else { // выбыл один — остальные доигрывают, пока не определится проигравший
          s.out.push(seat); ev.out = seat; ev.place = s.out.length;
          if (n - s.out.length <= 1) ev.end = this.hostFinish('domino', seat); else { s.turn = this.nextSeat(seat); ev.next = s.turn; }
        }
      } else { s.turn = this.nextSeat(seat); ev.next = s.turn; }
      this.emit(ev);
    } else if (m.act === 'draw') {
      if (can || !s.pool.length) return;
      const t = s.pool.pop(); hand.push(t); this.emit({ type: 'drew', seat, tile: t });
    } else if (m.act === 'pass') {
      if (can || s.pool.length) return;
      s.passes++;
      const ev = { type: 'pass', seat };
      if (s.passes >= n - s.out.length) ev.end = this.hostFinish('fish', seat); else { s.turn = this.nextSeat(seat); ev.next = s.turn; }
      this.emit(ev);
    }
  }

  hostFinish(kind, seat) {
    const r = this.hostFinishBase(kind, seat);
    if (this.scoreMode !== 'none') r.match = this.hostScore(r);
    return r;
  }

  // Подсчёт очков раунда (как в «Козле»): проигравший пишет очки, матч идёт до TARGET
  hostScore(r) {
    const mt = this.ctx.match, n = this.n, pips = r.pips, total = pips.reduce((a, b) => a + b, 0), add = Array(mt.totals.length).fill(0);
    if (this.teams) {
      if (r.res[0] === 'draw0') mt.pending += total; // «перерыбье»: очки зависают
      else { add[r.res[0] === 'win' ? 1 : 0] = total + mt.pending; mt.pending = 0; }
    } else if (this.scoreMode === 'B') pips.forEach((p, i) => { add[i] = p; }); // каждый пишет свои
    else { // вариант А: у кого очков больше всех — пишет сумму всех игроков
      const mx = Math.max(...pips), L = pips.map((p, i) => (p === mx ? i : -1)).filter(i => i >= 0);
      if (L.length > 1 || mx === 0) mt.pending += total; else { add[L[0]] = total + mt.pending; mt.pending = 0; }
    }
    add.forEach((a, i) => { mt.totals[i] += a; });
    const mx = Math.max(...mt.totals), done = mx >= TARGET, loser = done ? mt.totals.indexOf(mx) : -1;
    mt.done = done;
    let res = null;
    if (done) { res = Array(n).fill('win'); for (let i = 0; i < n; i++) if ((this.teams ? i % 2 : i) === loser) res[i] = 'lose'; }
    return { totals: mt.totals.slice(), add, pending: mt.pending, done, loser, res };
  }

  hostFinishBase(kind, seat) {
    const s = this.hs, n = this.n; s.over = true;
    const pips = s.hands.map(h => h.reduce((a, t) => a + t[0] + t[1], 0)), res = Array(n).fill('lose');
    if (this.teams) {
      if (kind === 'domino') { for (let i = 0; i < n; i++) if (i % 2 === seat % 2) res[i] = 'win'; }
      else {
        const a = pips[0] + pips[2], b = pips[1] + pips[3];
        if (a === b) res.fill('draw0'); else for (let i = 0; i < n; i++) if ((a < b) === (i % 2 === 0)) res[i] = 'win';
      }
      return { kind, winner: seat, pips, res };
    }
    // каждый сам за себя: места по порядку выбытия, остальные — по очкам (меньше — выше)
    const rest = [...Array(n).keys()].filter(i => !s.out.includes(i)).sort((a, b) => pips[a] - pips[b] || a - b);
    const order = s.out.concat(rest);
    order.forEach((st, k) => { res[st] = k === 0 ? 'win' : k === n - 1 ? 'lose' : 'mid'; });
    return { kind, winner: seat, pips, res, order };
  }

  rematch() {
    if (this.ctx.conns.some(c => !c.open)) { this.setMsg('Кто-то вышел из игры. Нажмите «Меню» и создайте комнату заново.'); return; }
    this.ctx.conns.forEach(c => c.send({ type: 'restart' }));
    this.ctx.inbox.length = 0; this.scene.restart();
  }
  again() {
    if (this.isHost) return this.rematch();
    if (this.ctx && this.ctx.conn && this.ctx.conn.open) this.ctx.conn.send({ type: 'rematch' });
    this.setMsg('Просим хозяина комнаты начать новую партию…');
  }

  // ---------- все: показ событий ----------
  onEvt(m) {
    switch (m.type) {
      case 'lobby': if (this.seat === null) this.setMsg('Ждём игроков: ' + m.count + ' из ' + m.n + '…'); break;
      case 'restart': this.scene.restart(); break;
      case 'deal': {
        this.seat = m.seat; this.n = m.n; this.teams = m.teams; this.hp = m.hand; this.poolN = m.pool; this.names = m.names || []; this.outSeats = []; this.scoreMode = m.score || 'none'; this.match = m.match || null;
        if (this.match && this.match.round === 1) { resetSess('grp'); this.refreshScore(); }
        this.counts = Array(m.n).fill(7); this.board = []; this.hobj = []; this.cur = m.first; this.turn = 'o'; this.busy = true;
        this.hp.forEach(t => this.hobj.push(this.makeHandObj(t)));
        this.layoutHand(); this.drawOpps(); this.updateButtons(); this.sfx.coin(); this.againB.t.setText('Заново');
        let txt = 'Жребий брошен: ' + (m.first === this.seat ? 'вы ходите первым, таки везёт!' : 'первым ходит ' + this.nm(m.first) + '.');
        if (this.teams) txt += '\nВаш напарник — ' + this.baseName((this.seat + 2) % this.n) + '.';
        this.setMsg(txt);
        this.time.delayedCall(2600, () => { this.busy = false; this.setTurn(m.first); });
        break;
      }
      case 'left': case 'bye': {
        if (this.over) break;
        this.over = true; this.turn = null; this.busy = false; this.doneWait();
        this.setMsg((m.seat === undefined ? this.baseName(0) : this.nm(m.seat)) + ' отключился. Нажмите «Меню».');
        this.updateButtons(); this.layoutHand(); this.drawOpps(); break;
      }
      case 'play': {
        this.doneWait();
        const t = m.tile, mine = m.seat === this.seat;
        this.lastTxt = mine ? null : '➜ ' + this.nm(m.seat) + ' поставил [' + t[0] + '|' + t[1] + ']' + (this.board.length ? (m.side === 'l' ? ' слева' : ' справа') : '');
        if (m.out !== undefined && !m.end) {
          this.outSeats.push(m.out);
          this.lastTxt = (mine ? 'Вы выложили всё' : this.nm(m.seat) + ' выложил всё') + ' и занял' + (mine ? 'и' : '') + ' ' + m.place + '-е место! Остальные играют дальше.';
        }
        if (this.lastTxt) this.setMsg(this.lastTxt);
        let ho = mine ? this.hobj.find(o => o.tile[0] === t[0] && o.tile[1] === t[1]) : null;
        if (!ho) { ho = this.makeTile(t[0], t[1], mine ? W / 2 : this.oppX(m.seat), mine ? 700 : 168).setVisible(!mine); ho.tile = t; }
        this.counts[m.seat]--;
        this.placeT(m.seat, ho, m.side, m); break;
      }
      case 'drew':
        this.doneWait(); this.poolN--; this.sfx.draw();
        if (m.seat === this.seat) this.gotTile(m.tile.slice());
        else { this.counts[m.seat]++; this.drawOpps(); this.updateButtons(); this.setMsg(this.nm(m.seat) + ' идёт на Привоз…'); }
        break;
      case 'pass': {
        this.doneWait(); this.busy = true; this.turn = 'o';
        this.lastTxt = '➜ ' + (m.seat === this.seat ? 'Вы пропустили ход.' : this.nm(m.seat) + ' пропустил ход.');
        this.setMsg(this.lastTxt); this.updateButtons(); this.layoutHand();
        this.time.delayedCall(1500, () => { this.busy = false; this.afterEvt(m); }); break;
      }
    }
  }

  afterEvt(m) { if (m.end) this.finishTable(m.end); else this.setTurn(m.next); }

  setTurn(seat) {
    this.cur = seat; this.turn = seat === this.seat ? 'p' : 'o'; this.clearSide();
    this.updateButtons(); this.layoutHand(); this.drawOpps();
    if (this.turn === 'p') this.setMsg(this.lastTxt ? this.lastTxt + '\nВаш ход!' : pick(SAY.you));
    else this.setMsg((this.lastTxt ? this.lastTxt + '\n' : '') + 'Ход: ' + this.nm(seat) + '…');
  }

  finishTable(e) {
    const key = e.res[this.seat], mt = e.match;
    if (mt) this.match = { totals: mt.totals, pending: mt.pending, round: (this.match && this.match.round) || 1 };
    if (!this.recorded) {
      this.recorded = true;
      const k = mt ? (mt.done ? mt.res[this.seat] : null) : key; // со счётом до 101 статистика пишется по итогам всей игры
      if (k && k !== 'mid') addResult('grp', k);
      addSess('grp', key); // в шапке — победы и поражения раундов текущего матча
      this.refreshScore();
    }
    this.over = true; this.turn = null; this.busy = false; this.doneWait();
    let head;
    if (this.teams) {
      if (e.kind === 'domino') head = e.winner === this.seat ? 'Домино! Вы выложили всё!' : 'Домино! ' + this.nm(e.winner) + ' выложил всё!';
      else head = 'РЫБА! Очки: ваша команда ' + (e.pips[this.seat % 2] + e.pips[this.seat % 2 + 2]) + ', соперники ' + (e.pips[1 - (this.seat % 2)] + e.pips[1 - (this.seat % 2) + 2]) + '.';
    } else {
      head = (e.kind === 'fish' ? 'РЫБА! ' : '') + 'Итог: ' + e.order.map((st, k) => (k + 1) + '. ' + this.nm(st)).join('  ');
      if (key === 'mid' && !mt) head += '\nВы на ' + (e.order.indexOf(this.seat) + 1) + '-м месте.';
    }
    let tail;
    if (mt) {
      const my = this.seat % 2;
      if (this.teams) {
        if (e.res[0] === 'draw0') tail = '\nПерерыбье! Очки зависли: ' + mt.pending + '.';
        else { const w = mt.add[my] > 0 ? 'Вам записано' : 'Соперникам записано'; tail = '\n' + w + ' +' + Math.max(mt.add[0], mt.add[1]) + '.'; }
      } else {
        const rows = mt.add.map((a, st) => (a > 0 ? this.nm(st) + ' +' + a : '')).filter(Boolean);
        tail = '\n' + (rows.length ? 'Записано: ' + rows.join(', ') + '.' : 'Очки зависли: ' + mt.pending + '.');
      }
      if (mt.done) {
        const who = this.teams ? (mt.loser === my ? 'Ваша пара набрала' : 'Соперники набрали') : (mt.loser === this.seat ? 'Вы набрали' : this.nm(mt.loser) + ' набрал');
        tail += ' КОНЕЦ: ' + who + ' ' + mt.totals[mt.loser] + ' — козёл!';
      } else tail += ' Нажмите «Дальше».';
      this.againB.t.setText(mt.done ? 'Заново' : 'Дальше');
    } else tail = ' ' + pick(SAY[key === 'win' ? 'winG' : key === 'lose' ? 'loseG' : key === 'mid' ? 'midG' : 'draw0']);
    this.setMsg(head + tail);
    const sk = mt && mt.done ? mt.res[this.seat] : key;
    sk === 'lose' ? this.sfx.lose() : this.sfx.win();
    this.updateButtons(); this.layoutHand(); this.drawOpps();
  }

  // ---------- ходы игрока ----------
  tap(o) {
    if (this.turn !== 'p' || this.busy || this.over || this.waiting) return;
    this.clearSide();
    const t = o.tile;
    if (!this.canPlay(t)) { this.sfx.nope(); this.say('bad'); this.tweens.add({ targets: o, angle: { from: 80, to: 100 }, duration: 60, yoyo: true, repeat: 2, onComplete: () => o.setAngle(90) }); return; }
    const send = side => { this.clearSide(); this.waitAct(); this.sendAct({ act: 'play', tile: t, side }); };
    const e = this.ends();
    if (!e) return send('r');
    const cl = t[0] === e.l || t[1] === e.l, cr = t[0] === e.r || t[1] === e.r;
    if (cl && cr && e.l !== e.r) {
      this.say('Костяшка подходит с обеих сторон. Куда ставим?');
      this.sideBtns = [this.btn(130, 584, 180, '◀ Влево (' + e.l + ')', 0x007bff, () => send('l')),
                       this.btn(350, 584, 180, 'Вправо (' + e.r + ') ▶', 0x28a745, () => send('r'))];
      this.sideBtns.forEach(b => b.setDepth(50));
    } else send(cl && !cr ? 'l' : 'r');
  }

  takeBazar() {
    if (this.turn !== 'p' || this.busy || this.waiting || this.poolN <= 0 || this.hasMove(this.hp)) return;
    this.waitAct(); this.sendAct({ act: 'draw' });
  }
  pass() {
    if (this.turn !== 'p' || this.busy || this.waiting) return;
    this.waitAct(); this.sendAct({ act: 'pass' });
  }

  placeT(who, ho, side, m) {
    this.clearSide(); this.busy = true; this.turn = 'o';
    const mine = who === this.seat, t = ho.tile, e = this.ends(); let l, r;
    if (!e) { l = t[0]; r = t[1]; }
    else if (side === 'r') { l = t[0] === e.r ? t[0] : t[1]; r = l === t[0] ? t[1] : t[0]; }
    else { r = t[1] === e.l ? t[1] : t[0]; l = r === t[1] ? t[0] : t[1]; }
    const from = { x: ho.x, y: ho.y }; if (ho.glow) this.tweens.killTweensOf(ho.glow); ho.destroy();
    if (mine) { this.hobj = this.hobj.filter(x => x !== ho); this.hp = this.hp.filter(x => !(x[0] === t[0] && x[1] === t[1])); }
    const obj = this.makeTile(l, r, from.x, from.y).setAngle(90).setScale(mine ? 1.25 : 1);
    const item = { l, r, obj };
    this.markLast(obj, mine ? 'p' : 'b');
    side === 'l' && e ? this.board.unshift(item) : this.board.push(item);
    this.drawOpps(); this.renderBoard(true); this.sfx.draw();
    this.time.delayedCall(320, () => {
      this.sfx.clack(); this.cameras.main.shake(80, 0.002);
      this.tweens.add({ targets: obj, scale: { from: mine ? 1.15 : 1.6, to: 1 }, duration: mine ? 150 : 350 });
      this.time.delayedCall(mine ? 250 : 1000, () => { this.busy = false; this.afterEvt(m); });
    });
    this.layoutHand();
  }
}

// ================= Меню и лобби =================
class Menu extends Screen {
  constructor() { super('menu'); }
  create() {
    resetSess();
    this.add.rectangle(W / 2, H / 2, W, H, 0x1a1a1f);
    this.add.text(W / 2, 190, 'ДОМИНО', { fontFamily: FONT, fontSize: '64px', fontStyle: 'bold', color: '#fff' }).setOrigin(0.5);
    this.add.text(W / 2, 255, 'по-одесски', { fontFamily: FONT, fontSize: '32px', fontStyle: 'bold', color: '#ffd400' }).setOrigin(0.5);
    const nb = this.btn(W / 2, 322, 260, '', 0x3a3a4a, () => {
      const v = window.prompt('Как вас зовут? (до 12 символов)', getName());
      if (v !== null) { setName(v); upd(); }
    }, 17);
    const upd = () => nb.t.setText(getName() ? '👤 ' + getName() : '👤 Ввести имя');
    upd();
    this.btn(W / 2, 380, 320, '🤖  Играть с ботом', 0x28a745, () => this.scene.start('game', { mode: 'bot' }), 21);
    this.btn(W / 2, 470, 320, '🌐  Играть по сети', 0x007bff, () => this.scene.start('lobby'), 21);
    this.add.text(W / 2, 780, 'версия ' + VER, { fontFamily: FONT, fontSize: '13px', color: '#666' }).setOrigin(0.5);
    // статистика — прямо под кнопкой соответствующего режима
    const sc = (y, m) => this.add.text(W / 2, y, 'Статистика: ' + scoreText(m), { fontFamily: FONT, fontSize: '15px', color: '#ffd400' }).setOrigin(0.5);
    const sBot = sc(418, 'bot'), sNet = sc(508, 'net'), sGrp = sc(534, 'grp');
    sNet.setText('Вдвоём: ' + scoreText('net')); sGrp.setText('Втроём/вчетвером: ' + scoreText('grp'));
    let armed = null;
    const rb = this.btn(W / 2, 660, 200, 'Сбросить статистику', 0x555566, () => {
      if (!armed) {
        rb.t.setText('Точно сбросить?'); armed = this.time.delayedCall(3000, () => { armed = null; rb.t.setText('Сбросить статистику'); });
        return;
      }
      armed.remove(); armed = null; rb.t.setText('Сбросить статистику');
      saveScore({ bot: { w: 0, l: 0, d: 0 }, net: { w: 0, l: 0, d: 0 }, grp: { w: 0, l: 0, d: 0 } });
      sBot.setText('Статистика: ' + scoreText('bot')); sNet.setText('Вдвоём: ' + scoreText('net')); sGrp.setText('Втроём/вчетвером: ' + scoreText('grp'));
    }, 15);
    this.add.text(W / 2, 585, 'Сетевая игра — от 2 до 4 игроков, по коду комнаты.\nНужен интернет у всех игроков.', { fontFamily: FONT, fontSize: '15px', color: '#aaa', align: 'center' }).setOrigin(0.5);
  }
}

const PEER_PREFIX = 'odessa-domino-';
function loadPeer() {
  const add = src => new Promise((ok, no) => { const el = document.createElement('script'); el.src = src; el.onload = ok; el.onerror = () => { el.remove(); no(new Error('load')); }; document.head.appendChild(el); });
  if (window.Peer) return Promise.resolve();
  return add('peerjs.min.js').catch(() => add('https://cdn.jsdelivr.net/npm/peerjs@1.5.4/dist/peerjs.min.js')).then(() => { if (!window.Peer) throw new Error('nopeer'); });
}

class Lobby extends Screen {
  constructor() { super('lobby'); }
  create() {
    this.add.rectangle(W / 2, H / 2, W, H, 0x1a1a1f);
    this.add.text(W / 2, 50, 'ИГРА ПО СЕТИ', { fontFamily: FONT, fontSize: '28px', fontStyle: 'bold', color: '#fff' }).setOrigin(0.5);
    this.add.text(W / 2, 785, 'версия ' + VER, { fontFamily: FONT, fontSize: '13px', color: '#666' }).setOrigin(0.5);
    this.btn(W / 2, 745, 200, '◀ Назад', 0x555566, () => { this.cleanup(); this.scene.start('menu'); });
    this.items = []; this.peer = null; this.launched = false; this.code = '';
    this.events.on('shutdown', () => { if (!this.launched) this.cleanup(); });
    this.showChoice();
  }
  put(o) { this.items.push(o); return o; }
  clear() { this.items.forEach(o => o.destroy()); this.items = []; }
  txt(y, str, size, color, extra) { return this.put(this.add.text(W / 2, y, str, Object.assign({ fontFamily: FONT, fontSize: size + 'px', fontStyle: 'bold', color, align: 'center', wordWrap: { width: 420 } }, extra || {})).setOrigin(0.5)); }
  cleanup() { if (this.peer) { try { this.peer.destroy(); } catch (e) {} this.peer = null; } if (this.timeout) this.timeout.remove(); }

  showChoice(err) {
    this.cleanup(); this.clear();
    if (err) this.txt(130, err, 18, '#ff6b6b');
    this.txt(200, 'Один создаёт игру и получает код,\nостальные вводят этот код.', 18, '#ccc', { fontStyle: 'normal' });
    this.put(this.btn(W / 2, 320, 320, 'Создать игру', 0x28a745, () => this.showSetup(), 21));
    this.put(this.btn(W / 2, 390, 320, 'Войти по коду', 0x007bff, () => this.showJoin(), 21));
  }

  ready(fn) {
    this.txt(300, 'Подключаемся к сети…', 20, '#fff');
    loadPeer().then(() => { if (this.scene.isActive('lobby')) fn(); })
      .catch(() => { if (this.scene.isActive('lobby')) this.showChoice('Не удалось загрузить сетевую библиотеку. Проверьте интернет.'); });
  }

  showSetup() {
    this.cleanup(); this.clear();
    this.txt(160, 'Сколько игроков?', 26, '#fff');
    [2, 3, 4].forEach((n, k) => this.put(this.btn(W / 2, 250 + k * 80, 320, n === 2 ? '2 игрока' : n + ' игрока', n === 2 ? 0x007bff : 0x28a745,
      () => (n === 4 ? this.showTeams() : n === 3 ? this.showScoring(3, false) : this.startHost({ n, teams: false, score: 'none' })), 21)));
    this.txt(500, 'При троих каждый играет сам за себя.\nПри четверых можно парами.', 15, '#aaa', { fontStyle: 'normal' });
  }

  showTeams() {
    this.clear();
    this.txt(160, 'Как играем вчетвером?', 24, '#fff');
    this.put(this.btn(W / 2, 260, 340, 'Каждый сам за себя', 0x28a745, () => this.showScoring(4, false), 20));
    this.put(this.btn(W / 2, 340, 340, 'Парами 2 на 2', 0x007bff, () => this.showScoring(4, true), 20));
    this.txt(430, 'Парами: напарник сидит напротив — это игрок\nчерез одного после вас по очереди хода.', 15, '#aaa', { fontStyle: 'normal' });
  }

  showScoring(n, teams) {
    this.clear();
    this.txt(130, 'Как считаем очки?', 24, '#fff');
    const go = score => this.startHost({ n, teams, score });
    if (teams) {
      this.put(this.btn(W / 2, 230, 380, 'Козёл: играем до 101', 0x28a745, () => go('T'), 19));
      this.txt(275, 'Проигравшая пара пишет очки всех игроков.\nРавные очки («перерыбье») зависают до следующего раунда.', 14, '#aaa', { fontStyle: 'normal' });
    } else {
      this.put(this.btn(W / 2, 230, 380, 'Вариант А: жёсткий', 0x28a745, () => go('A'), 19));
      this.txt(275, 'У кого очков больше всех — пишет сумму очков всех игроков.', 14, '#aaa', { fontStyle: 'normal' });
      this.put(this.btn(W / 2, 345, 380, 'Вариант Б: обычный', 0x007bff, () => go('B'), 19));
      this.txt(390, 'Каждый пишет свои оставшиеся очки.', 14, '#aaa', { fontStyle: 'normal' });
    }
    const y = teams ? 400 : 470;
    this.put(this.btn(W / 2, y, 380, 'Одна партия (без счёта)', 0x555566, () => go('none'), 19));
    this.txt(y + 45, 'Одна партия: победитель и проигравший сразу.', 14, '#aaa', { fontStyle: 'normal' });
  }

  refreshWait() {
    const c = this.ctx; if (!c || !this.waitT || !this.waitT.active) return;
    this.waitT.setText('Подключено: ' + (c.conns.length + 1) + ' из ' + c.n + '\nНе закрывайте эту страницу.');
  }
  broadcastLobby() { const c = this.ctx; if (c) c.conns.forEach(x => { if (x.open) x.send({ type: 'lobby', count: c.conns.length + 1, n: c.n }); }); }

  startHost(cfg, tries) {
    this.cleanup(); this.clear(); cfg = cfg || this.cfg || { n: 2, teams: false }; this.cfg = cfg;
    this.ready(() => {
      this.clear(); this.txt(300, 'Создаём комнату…', 20, '#fff');
      const code = String(1000 + Math.floor(Math.random() * 9000)), peer = new Peer(PEER_PREFIX + code);
      this.peer = peer;
      const ctx = { role: 'host', n: cfg.n, teams: cfg.teams, score: cfg.score || 'none', peer, conns: [], inbox: [] }; this.ctx = ctx;
      peer.on('open', () => {
        this.clear();
        this.txt(120, 'Назовите этот код ' + (cfg.n > 2 ? 'игрокам:' : 'сопернику:'), 20, '#ccc', { fontStyle: 'normal' });
        this.txt(215, code.split('').join(' '), 84, '#ffd400');
        this.txt(300, cfg.n === 2 ? 'Игра вдвоём' : cfg.n + ' игрока · ' + (cfg.teams ? 'парами 2 на 2' : 'каждый сам за себя') + '\n' + ({ A: 'до 101, вариант А', B: 'до 101, вариант Б', T: 'до 101 (козёл)', none: 'одна партия' }[cfg.score || 'none']), 17, '#8ab4ff');
        this.waitT = this.txt(380, '', 18, '#fff', { fontStyle: 'normal' }); this.refreshWait();
      });
      peer.on('connection', conn => {
        conn.on('open', () => {
          if (this.launched || ctx.conns.length >= cfg.n - 1) { conn.close(); return; }
          ctx.conns.push(conn);
          conn.on('data', d => {
            if (d && d.type === 'name') { conn._name = String(d.name || '').slice(0, 12); if (cfg.n === 2) ctx.oppName = conn._name; return; }
            ctx.inbox.push(Object.assign({}, d, { _c: conn }));
          });
          const gone = () => {
            if (this.launched) ctx.inbox.push({ type: 'bye', _c: conn });
            else { const k = ctx.conns.indexOf(conn); if (k >= 0) ctx.conns.splice(k, 1); this.refreshWait(); this.broadcastLobby(); }
          };
          conn.on('close', gone); conn.on('error', gone);
          conn.send({ type: 'room', n: cfg.n, teams: cfg.teams, score: cfg.score || 'none', name: getName() });
          this.refreshWait(); this.broadcastLobby();
          if (ctx.conns.length === cfg.n - 1) this.time.delayedCall(600, () => this.launchHost());
        });
      });
      peer.on('error', err => {
        if (err.type === 'unavailable-id' && (tries || 0) < 5) { this.startHost(cfg, (tries || 0) + 1); return; }
        this.showChoice('Ошибка сети (' + err.type + '). Попробуйте ещё раз.');
      });
    });
  }

  launchHost() {
    const c = this.ctx; if (this.launched || !c || c.conns.length !== c.n - 1) return;
    this.launched = true; this.game.netCtx = c;
    if (c.n === 2) { c.conn = c.conns[0]; this.scene.start('game', { mode: 'net' }); } else this.scene.start('table');
  }

  showJoin(err) {
    this.cleanup(); this.clear();
    this.code = this.code || '';
    this.txt(110, 'Введите код комнаты:', 20, '#ccc', { fontStyle: 'normal' });
    this.codeT = this.txt(190, '', 72, '#ffd400');
    this.errT = this.txt(258, err || '', 17, '#ff6b6b');
    const draw = () => { const c = this.code.padEnd(4, '·'); this.codeT.setText(c.split('').join(' ')); okB.setEnabled(this.code.length === 4); };
    const keys = [['1', '2', '3'], ['4', '5', '6'], ['7', '8', '9'], ['⌫', '0', 'OK']];
    let okB;
    keys.forEach((row, r) => row.forEach((k, c) => {
      const x = 130 + c * 110, y = 340 + r * 66;
      if (k === 'OK') okB = this.put(this.btn(x, y, 96, 'Войти', 0x28a745, () => this.join(), 18));
      else this.put(this.btn(x, y, 96, k, k === '⌫' ? 0xdc3545 : 0x3a3a4a, () => {
        if (k === '⌫') this.code = this.code.slice(0, -1); else if (this.code.length < 4) this.code += k;
        draw();
      }, 26));
    }));
    draw();
  }

  join() {
    const code = this.code; this.clear();
    this.ready(() => {
      this.clear(); this.txt(300, 'Ищем комнату ' + code + '…', 22, '#fff');
      const peer = new Peer(); this.peer = peer;
      const fail = msg => { this.code = ''; this.showJoin(msg); };
      this.timeout = this.time.delayedCall(15000, () => fail('Не удалось подключиться. Проверьте код.'));
      peer.on('open', () => {
        const conn = peer.connect(PEER_PREFIX + code, { reliable: true });
        const ctx = { role: 'guest', peer, conn, inbox: [] };
        let opened = false;
        conn.on('data', d => ctx.inbox.push(d));
        conn.on('close', () => ctx.inbox.push({ type: 'bye' }));
        conn.on('error', () => { if (opened) ctx.inbox.push({ type: 'bye' }); else fail('Ошибка соединения.'); });
        conn.on('open', () => {
          opened = true; this.timeout.remove(); conn.send({ type: 'name', name: getName() });
          this.clear(); this.txt(300, 'Подключились! Входим в комнату…', 20, '#fff');
          this.timeout = this.time.delayedCall(8000, () => fail('Хозяин комнаты не ответил.'));
          this.roomPoll = this.time.addEvent({ delay: 100, loop: true, callback: () => {
            const m = ctx.inbox[0]; if (!m || m.type !== 'room') return;
            ctx.inbox.shift(); this.roomPoll.remove(); this.timeout.remove();
            ctx.n = m.n; ctx.teams = m.teams; ctx.score = m.score || 'none'; ctx.oppName = String(m.name || '').slice(0, 12); this.launched = true; this.game.netCtx = ctx;
            if (m.n === 2) this.scene.start('game', { mode: 'net' }); else this.scene.start('table');
          } });
        });
      });
      peer.on('error', err => fail(err.type === 'peer-unavailable' ? 'Комната с таким кодом не найдена.' : 'Ошибка сети (' + err.type + ').'));
    });
  }
}

const game = new Phaser.Game({
  type: Phaser.AUTO, width: W, height: H, parent: 'game', backgroundColor: '#1a1a1f',
  scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH },
  scene: [Menu, Lobby, Game, Table]
});

// Подгонка холста под реальный размер окна (адресная строка на телефоне меняет высоту)
const refit = () => setTimeout(() => game.scale.refresh(), 50);
window.addEventListener('resize', refit);
window.addEventListener('orientationchange', refit);
refit(); setTimeout(refit, 500);
