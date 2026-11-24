// reseau-maison-card — schéma réseau animé (v4)
const OK = '#2bff9e', KO = '#ff4d4d', NA = '#8a93a6';
const P = 'binary_sensor.ping_';

const NODES = [
  { id: 'internet', l: 'Internet', s: '1.1.1.1', x: 430, y: 40, e: P + 'internet' },
  { id: 'modem', l: 'Modem Proximus', s: '.1', x: 430, y: 110, e: P + 'modem' },
  { id: 'sw1', l: 'Switch 1', s: 'salon', x: 180, y: 200, d: ['nas', 'ha', 'ikea', 'cpl1'] },
  { id: 'nas', l: 'NAS', s: '.6', x: 10, y: 290, e: P + 'nas' },
  { id: 'ha', l: 'HA · minipc', s: '.15', x: 150, y: 290, e: P + 'minipc' },
  { id: 'ikea', l: 'Passerelle IKEA', s: '.30', x: 290, y: 290, e: P + 'passerelle_ikea' },
  { id: 'kallax', l: 'Kallax', s: 'zigbee', x: 200, y: 380, w: 90, h: 36, e: 'light.kallax' },
  { id: 'telec', l: 'Télécom.', s: 'zigbee', x: 295, y: 380, w: 90, h: 36, e: 'sensor.telecommande_cuisine_batterie' },
  { id: 'sonde', l: 'Sonde', s: 'zigbee', x: 390, y: 380, w: 90, h: 36, e: 'sensor.salon_tmp_hum_salon_temperature' },
  { id: 'cpl1', l: 'CPL salon 1', s: 'maître', x: 700, y: 290, d: ['cpl_salon', 'cpl_sam', 'cpl_ch'] },
  { id: 'cpl_salon', l: 'CPL salon 2', s: '', x: 520, y: 380, d: ['sw2'] },
  { id: 'cpl_sam', l: 'CPL SAM', s: 'salle à manger', x: 700, y: 380, d: ['sw3'] },
  { id: 'cpl_ch', l: 'CPL chambre', s: 'parents', x: 880, y: 380, d: ['tvand'] },
  { id: 'sw2', l: 'Switch 2', s: 'salon', x: 520, y: 470, d: ['sniper', 'stream', 'tv'] },
  { id: 'sw3', l: 'Switch 3', s: 'salle à manger', x: 700, y: 470, d: ['pc', 'mac'] },
  { id: 'tvand', l: 'TV Android', s: '.22', x: 880, y: 470, e: P + 'tv_chambre' },
  { id: 'sniper', l: 'Sniper 2', s: '.7', x: 370, y: 560, w: 110, e: P + 'decodeur' },
  { id: 'stream', l: 'Stream 4K', s: '.9', x: 490, y: 560, w: 110, e: P + 'stream_4k' },
  { id: 'tv', l: 'TV salon', s: '.21', x: 610, y: 560, w: 110, e: P + 'tv_salon' },
  { id: 'pc', l: 'PC Taz', s: '.70', x: 740, y: 560, w: 110, e: P + 'tazoube_pc' },
  { id: 'mac', l: 'Mac mini', s: '.73', x: 860, y: 560, w: 110, e: P + 'mac_mini_laura' },
  { id: 'rep_bas', l: 'Répéteur bas', s: '.11', x: 1060, y: 200, w: 120, e: P + 'repeteur_bas' },
  { id: 'rep_haut', l: 'Répéteur haut', s: '.12', x: 1220, y: 200, w: 120, e: P + 'repeteur_haut' },
  { id: 'thermo_rep', l: 'Thermo (rép.)', s: '.110', x: 900, y: 290, w: 110, e: P + 'thermostat_repeteur' },
  { id: 'thermo', l: 'Thermostat', s: '.29', x: 1030, y: 290, w: 110, e: P + 'thermostat' },
  { id: 'sonos_ch', l: 'Sonos ch.', s: '.25', x: 1150, y: 290, w: 80, e: P + 'sonos_chambre' },
  { id: 'plaf_rep', l: 'Plaf. SDB', s: '.111', x: 1236, y: 290, w: 80, e: P + 'plafonnier_sdb_repeteur' },
  { id: 'clim_et', l: 'Clim étage', s: '.92', x: 1322, y: 290, w: 76, e: P + 'clim_etage' },
];

const GROUPS = [
  { id: 'domo', t: 'Domotique Wi-Fi 2,4 GHz', y: 360, items: [
    ['Lampe salon', '.31', P + 'lampe_fauteuil'], ['Prise étoile', '.32', P + 'prise_etoile'], ['Prise table', '.33', P + 'prise_table'],
    ['Prise galet', '.34', P + 'prise_galet'], ['Ruban salon', '.35', P + 'ruban_salon'], ['Ruban PC', '.36', P + 'ruban_pc'],
    ['Multiprise', '.37', P + 'multiprise'], ['Ruban cuisine', '.38', P + 'ruban_cuisine'], ['Prise cuisine', '.41', P + 'prise_cuisine'],
    ['Prise sapin', '.42', P + 'prise_sapin'], ['Clim cuisine', '.90', P + 'clim_cuisine'], ['Clim salon', '.91', P + 'clim_salon'],
    ['Four', '.26', 'sensor.four_etat'], ['Caméra garage', '.39', P + 'camera_garage'], ['Sonnette', '.40', P + 'sonnette'], ['Plafonnier SDB', '.43', P + 'plafonnier_sdb']] },
  { id: 'media', t: 'Multimédia Wi-Fi', y: 616, items: [
    ['Sonos salon', '.23', P + 'sonos_salon'], ['Sonos cuisine', '.24', P + 'sonos_cuisine'], ['Imprimante', '.14', P + 'imprimante'],
    ['Nintendo Switch', '.19', P + 'switch'], ['Toonie (Aelin)', '.27', P + 'toonie'], ['RetroPie', '.28', P + 'retropie']] },
  { id: 'mob', t: 'Mobiles Wi-Fi', y: 726, items: [
    ['MacBook Laura', '.71/.72', null], ['iPhone Laura', '.80/.81', null], ['Redmi Math', '.84', P + 'gsm_taz']] },
];
const GX = 1040, GW = 350, CW = 110, CH = 30;

const LINKS = [
  ['internet', 'modem', 'eth'], ['modem', 'sw1', 'eth'],
  ['sw1', 'nas', 'eth'], ['sw1', 'ha', 'eth'], ['sw1', 'ikea', 'eth'], ['sw1', 'cpl1', 'eth'],
  ['ikea', 'kallax', 'zig'], ['ikea', 'telec', 'zig'], ['ikea', 'sonde', 'zig'],
  ['cpl1', 'cpl_salon', 'cpl'], ['cpl1', 'cpl_sam', 'cpl'], ['cpl1', 'cpl_ch', 'cpl'],
  ['cpl_salon', 'sw2', 'eth'], ['cpl_sam', 'sw3', 'eth'], ['cpl_ch', 'tvand', 'eth'],
  ['sw2', 'sniper', 'eth'], ['sw2', 'stream', 'eth'], ['sw2', 'tv', 'eth'],
  ['sw3', 'pc', 'eth'], ['sw3', 'mac', 'eth'],
  ['rep_bas', 'thermo_rep', 'wifi'], ['rep_bas', 'thermo', 'wifi'], ['rep_haut', 'sonos_ch', 'wifi'], ['rep_haut', 'plaf_rep', 'wifi'], ['rep_haut', 'clim_et', 'wifi'],
];

const esc = (t) => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;');

class ReseauMaisonCard extends HTMLElement {
  setConfig(c) { this._c = c || {}; }
  getCardSize() { return 12; }
  getGridOptions() { return { columns: 'full', rows: 'auto' }; }

  _st(e) {
    if (!e || !this._h) return 'na';
    const s = this._h.states[e];
    if (!s) return 'na';
    if (e.startsWith(P)) return s.state === 'on' ? 'ok' : s.state === 'off' ? 'ko' : 'na';
    return ['unavailable', 'unknown'].includes(s.state) ? 'ko' : 'ok';
  }
  _ns(n, seen = 0) {
    if (n.e) return this._st(n.e);
    if (n.d && seen < 6) {
      const r = n.d.map((id) => this._ns(this._n[id], seen + 1));
      if (r.includes('ok')) return 'ok';
      if (r.includes('ko')) return 'ko';
    }
    return 'na';
  }

  set hass(h) {
    this._h = h;
    if (!this._n) { this._n = {}; NODES.forEach((n) => (this._n[n.id] = { w: 130, h: 44, ...n })); }
    const ents = [...NODES.map((n) => n.e), ...GROUPS.flatMap((g) => g.items.map((i) => i[2]))].filter(Boolean);
    const key = ents.map((e) => (h.states[e] || {}).state).join('|');
    if (key === this._k) return;
    this._k = key;
    this._render();
  }

  _render() {
    if (!this.shadowRoot) {
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.addEventListener('click', (ev) => {
        const g = ev.composedPath().find((el) => el.dataset && el.dataset.e);
        if (!g) return;
        const e = new Event('hass-more-info', { bubbles: true, composed: true });
        e.detail = { entityId: g.dataset.e };
        this.dispatchEvent(e);
      });
    }
    const col = { ok: OK, ko: KO, na: NA };
    let links = '', nodes = '', groups = '';
    let up = 0, tot = 0;
    const cnt = (s) => { if (s !== 'na') { tot++; if (s === 'ok') up++; } };

    for (const [a, b, t] of LINKS) {
      const A = this._n[a], B = this._n[b];
      const s = this._ns(B);
      const x1 = A.x + A.w / 2, y1 = A.y + A.h, x2 = B.x + B.w / 2, y2 = B.y, my = (y1 + y2) / 2;
      const d = `M${x1},${y1} V${my} H${x2} V${y2}`;
      links += this._link(d, t, s);
    }
    const M = this._n.modem, by = M.y + M.h / 2, bx = GX - 20;
    const wifiS = this._ns(this._n.rep_bas) === 'ok' || this._ns(this._n.rep_haut) === 'ok' ? 'ok' : 'na';
    links += this._link(`M${M.x + M.w},${by} H${bx} V${GROUPS[2].y + 30}`, 'wifi', wifiS);
    for (const id of ['rep_bas', 'rep_haut']) {
      const R = this._n[id];
      links += this._link(`M${bx},${by} H${R.x + R.w / 2} V${R.y}`, 'wifi', this._ns(R));
    }

    for (const n of Object.values(this._n)) {
      const s = this._ns(n); if (n.e) cnt(s);
      const c = col[s];
      nodes += `<g class="node ${s}" ${n.e ? `data-e="${n.e}"` : ''}>
        <rect x="${n.x}" y="${n.y}" width="${n.w}" height="${n.h}" rx="9" stroke="${c}" />
        <circle cx="${n.x + 11}" cy="${n.y + 12}" r="4" fill="${c}" />
        <text x="${n.x + n.w / 2}" y="${n.y + n.h / 2 - 2}" class="l">${esc(n.l)}</text>
        <text x="${n.x + n.w / 2}" y="${n.y + n.h / 2 + 12}" class="s">${esc(n.s)}</text></g>`;
    }

    for (const g of GROUPS) {
      const rows = Math.ceil(g.items.length / 3), gh = 28 + rows * (CH + 6) + 4;
      groups += `<rect class="grp" x="${GX}" y="${g.y}" width="${GW}" height="${gh}" rx="12"/>
        <text class="gt" x="${GX + 12}" y="${g.y + 18}">${esc(g.t)}</text>`;
      links += this._link(`M${bx},${g.y + gh / 2} H${GX}`, 'wifi', 'na');
      g.items.forEach(([l, ip, e], i) => {
        const x = GX + 8 + (i % 3) * (CW + 6), y = g.y + 28 + Math.floor(i / 3) * (CH + 6);
        const s = this._st(e); cnt(s);
        const c = col[s];
        groups += `<g class="node chip ${s}" ${e ? `data-e="${e}"` : ''}>
          <rect x="${x}" y="${y}" width="${CW}" height="${CH}" rx="7" stroke="${c}"/>
          <circle cx="${x + 9}" cy="${y + CH / 2}" r="3.5" fill="${c}"/>
          <text x="${x + 17}" y="${y + 13}" class="cl">${esc(l)}</text>
          <text x="${x + 17}" y="${y + 25}" class="cs">${esc(ip)}</text></g>`;
      });
    }

    const legend = `<g class="lg" transform="translate(12,14)">
      <text class="title" x="0" y="4">Réseau maison · 192.168.1.0/24</text>
      <text class="cnt" x="0" y="24">${up} / ${tot} appareils en ligne</text>
      <g transform="translate(0,42)">
        <line x1="0" y1="0" x2="28" y2="0" class="ln eth ok"/><text x="34" y="4">Ethernet</text>
        <line x1="100" y1="0" x2="128" y2="0" class="ln cpl ok"/><text x="134" y="4">CPL</text>
        <line x1="180" y1="0" x2="208" y2="0" class="ln wifi na"/><text x="214" y="4">Wi-Fi</text>
        <line x1="262" y1="0" x2="290" y2="0" class="ln zig na"/><text x="296" y="4">Zigbee</text>
        <circle cx="0" cy="22" r="5" fill="${OK}"/><text x="10" y="26">répond</text>
        <circle cx="80" cy="22" r="5" fill="${KO}"/><text x="90" y="26">ne répond pas</text>
        <circle cx="200" cy="22" r="5" fill="${NA}"/><text x="210" y="26">non surveillé</text>
      </g></g>`;

    this.shadowRoot.innerHTML = `<style>
      ha-card{background:rgba(14,22,48,0.45);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);
        border:1px solid rgba(0,220,255,0.45);border-radius:18px;box-shadow:0 0 14px rgba(0,220,255,0.22);padding:8px;color:#fff}
      svg{width:100%;height:auto;display:block;font-family:var(--ha-font-family-body,Roboto,sans-serif)}
      text{fill:#fff;text-anchor:middle;pointer-events:none}
      .l{font-size:12px;font-weight:600}.s{font-size:10px;fill:rgba(255,255,255,.65)}
      .cl{font-size:9.5px;font-weight:600;text-anchor:start}.cs{font-size:8.5px;fill:rgba(255,255,255,.6);text-anchor:start}
      .lg text{text-anchor:start;font-size:11px;fill:rgba(255,255,255,.8)}
      .lg .title{font-size:15px;font-weight:700;fill:#fff}.lg .cnt{font-size:12px;fill:${OK}}
      .node rect{fill:rgba(10,16,38,.85);stroke-width:1.6}
      .node[data-e]{cursor:pointer}
      .node.ok rect{filter:drop-shadow(0 0 5px ${OK}66)}
      .node.ko rect{filter:drop-shadow(0 0 6px ${KO}88)}
      .node.ko circle{animation:blink 1.2s ease-in-out infinite}
      .grp{fill:rgba(255,255,255,.03);stroke:rgba(0,220,255,.35);stroke-width:1;stroke-dasharray:4 4}
      .gt{text-anchor:start;font-size:11px;font-weight:700;fill:rgba(0,220,255,.9)}
      .ln{fill:none;stroke-linecap:round}
      .eth{stroke-width:2.4}.cpl{stroke-width:2.8}.wifi{stroke-width:1.4;stroke-dasharray:6 5}.zig{stroke-width:1.6;stroke-dasharray:2 3}
      .ln.ok{stroke:${OK}}.ln.ko{stroke:${KO};opacity:.75}.ln.na{stroke:${NA};opacity:.6}
      .ln.wifi.ok,.ln.wifi.na{stroke:#3aa0ff;opacity:.8}.ln.zig.ok{stroke:#2e9e44}
      .cpl.ok{stroke:#ff9a1f}
      .flow{fill:none;stroke:#fff;stroke-linecap:round;stroke-dasharray:3 14;animation:flow 1.1s linear infinite;opacity:.9}
      .flow.cpl{stroke:#ffe0a8;stroke-dasharray:2 10;animation-duration:1.6s}
      @keyframes flow{to{stroke-dashoffset:-34}}
      @keyframes blink{50%{opacity:.25}}
    </style>
    <ha-card><svg viewBox="0 0 1400 800" xmlns="http://www.w3.org/2000/svg">
      ${legend}<g>${links}</g><g>${groups}</g><g>${nodes}</g>
    </svg></ha-card>`;
  }

  _link(d, t, s) {
    let out = `<path d="${d}" class="ln ${t} ${s}"/>`;
    if ((t === 'eth' || t === 'cpl') && s === 'ok') out += `<path d="${d}" class="flow ${t}"/>`;
    return out;
  }
}
customElements.define('reseau-maison-card', ReseauMaisonCard);
window.customCards = window.customCards || [];
window.customCards.push({ type: 'reseau-maison-card', name: 'Réseau maison', description: 'Schéma réseau animé (pings)' });
