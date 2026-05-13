// SUNX Sense — Beta Consent Flow (EK J — BETA AÇIK RIZA AKIŞI UX ŞABLONU)
// 8 screens implementing the spec from the user agreement appendix.
// Same format as gamification.jsx / tiers.jsx.

const C_PRIMARY = 'oklch(0.65 0.14 230)';
const C_ACCENT  = 'oklch(0.72 0.14 155)';
const C_AMBER   = 'oklch(0.78 0.14 75)';
const C_RED     = 'oklch(0.62 0.18 25)';
const C_VIOLET  = 'oklch(0.62 0.18 295)';

const CONSENT_COPY = {
  tr: {
    headerEyebrow: 'SUNX SENSE · BETA AÇIK RIZA AKIŞI · EK J',
    headerTitle: 'Sekiz ekranda KVKK + GDPR uyumlu Beta onayı.',
    headerSub: 'Karşılama, aydınlatma, yaş, sözleşme, sınır ötesi, granüler rıza, sistem izinleri, özet.',
    screens: [
      { id: 'welcome',   eyebrow: 'J.2.1 · KARŞILAMA',          label: 'Beta uyarısı' },
      { id: 'inform',    eyebrow: 'J.2.2 · AYDINLATMA',          label: 'KVKK m.10 / GDPR Art.13' },
      { id: 'age',       eyebrow: 'J.2.3 · YAŞ & ÜLKE',          label: 'COPPA / TMK 18+' },
      { id: 'contract',  eyebrow: 'J.2.4 · SÖZLEŞME',            label: 'Zorunlu kabul' },
      { id: 'transfer',  eyebrow: 'J.2.5 · YURTDIŞI AKTARIM',    label: 'KVKK m.9 açık rıza' },
      { id: 'granular',  eyebrow: 'J.2.6 · GRANÜLER RIZA',       label: 'Hepsi default kapalı' },
      { id: 'system',    eyebrow: 'J.2.7 · SİSTEM İZİNLERİ',     label: 'iOS / Android prompts' },
      { id: 'ready',     eyebrow: 'J.2.8 · HAZIRSIN',            label: 'Özet ve giriş' },
    ],
    welcome: {
      title: "Sense Beta'ya hoş geldin",
      sub: 'Hyperlocal hava kalitesi haritası — şu an Beta aşamasında',
      bullets: [
        { icon: '📍', t: 'Bulunduğun yerin çevresel verilerini gerçek zamanlı gör' },
        { icon: '🤖', t: 'AI destekli öneriler ve trend analizleri' },
        { icon: '🌍', t: 'Senin gibi binlerce kullanıcının verisiyle güçlenen bir ağ' },
      ],
      warnTitle: 'Beta uyarısı',
      warn: [
        'Sense şu an Beta aşamasında. Özellikler değişebilir, hatalar oluşabilir, ölçümler her zaman doğru olmayabilir.',
        'Beta ücretsizdir. Beta sırasında verdiğin veriler, ürünü iyileştirmek için kullanılabilir.',
        'Beta’yı dilediğin zaman bırakabilirsin.',
      ],
      primary: 'Devam Et',
      secondary: 'Daha Sonra',
    },
    inform: {
      title: 'Bilgilerin nasıl kullanılır?',
      sub: 'Sadece bilgilendirme — bu ekranda rıza alınmaz.',
      items: [
        { icon: '📍', h: 'KONUM',          t: 'Bulunduğun bölgenin hava kalitesini göstermek için konumun gerekli.' },
        { icon: '🌡️', h: 'ÇEVRESEL VERİ', t: 'CarboStar veya çevredeki sensörlerden gelen veriler haritalanır.' },
        { icon: '🤖', h: 'AI MODELLERİ',   t: 'Verilerin (anonimleştirilmiş olarak) çevresel tahmin modellerini iyileştirmek için kullanılabilir.' },
        { icon: '☁️', h: 'BULUT İŞLEME',   t: 'Verilerin global bulut sağlayıcılarda (AB ve ABD) güvenli olarak saklanır.' },
      ],
      link: 'Detaylı Gizlilik Politikası →',
      primary: 'Anladım, Devam Et',
    },
    age: {
      title: 'Devam etmeden önce birkaç soru',
      birthLabel: 'Doğum yılı',
      countryLabel: 'Bulunduğun ülke',
      note: 'Bulunduğun ülkeye göre uygulanacak veri koruma yasaları değişir.',
      birthValue: '1996',
      countryValue: 'Türkiye',
      primary: 'Devam Et',
    },
    contract: {
      title: 'Sözleşme ve Gizlilik',
      sub: 'Sözleşme özeti · tam metne aşağıdan ulaşabilirsin.',
      summary: [
        'Beta ücretsizdir ve gönüllü katılıma dayanır.',
        'Verilerin Hizmetlerin sunulması ve geliştirilmesi için işlenir.',
        'KVKK / GDPR hakların eksiksiz uygulanır.',
        'Beta’dan ayrılma ve hesap silme hakkın saklıdır.',
      ],
      boxes: [
        'Kullanıcı Sözleşmesini okudum ve kabul ediyorum',
        'Gizlilik Politikasını okudum ve verilerimin Sözleşmede açıklanan amaçlarla işlenmesini anladım',
        '18 yaşından büyük olduğumu beyan ederim',
      ],
      link: 'Tam Sözleşme Metni →',
      primary: 'İlerle',
    },
    transfer: {
      title: 'Verilerinin Yurtdışında İşlenmesi',
      body: "Sense'in çalışabilmesi için verilerin AB (Frankfurt, Dublin) ve ABD (Virginia, Oregon) bölgelerindeki bulut sunucularda işlenmesi gerekir. AWS / GCP / Azure tarafından sağlanır, TLS 1.3 ile şifrelenir. Tüm aktarımlar AB Standart Sözleşme Hükümleri (SCC) çerçevesinde yapılır.",
      box: 'Verilerimin bu kapsamda yurtdışına aktarılmasına açık rıza veriyorum',
      foot: "Bu rıza Sense’in temel işlevi için zorunludur. Kabul etmezsen Sense’i kullanamazsın. Türkiye içi sunucularla çalışan bir sürüm gelecekte sunulabilir.",
      primary: 'Kabul Et ve Devam',
      secondary: "Sense'i Kullanamıyorum",
    },
    granular: {
      title: 'Bunlardan hangilerine onay veriyorsun?',
      sub: "İsteğe bağlı. Hepsini reddetsen de Sense'i kullanabilirsin. İstediğin zaman Ayarlardan değiştirebilirsin.",
      toggles: [
        { k: 'gps',       h: 'Hassas GPS konumu',         t: 'Daha doğru harita ve hyperlocal öneri için.' },
        { k: 'ai',        h: 'AI modeli eğitimi',         t: "Anonimleştirilmiş verilerimle Sense’in tahmin modelleri iyileştirilebilir." },
        { k: 'analytics', h: 'Ticari analitik',           t: 'Anonim ve toplulaştırılmış verilerimin belediyeler, ESG, araştırma kurumlarıyla paylaşılması.' },
        { k: 'email',     h: 'Pazarlama e-postaları',     t: 'Yenilikler, ipuçları ve özel teklifler.' },
        { k: 'push',      h: 'Pazarlama push bildirim',   t: 'Yenilik ve kampanya bildirimleri.' },
        { k: 'research',  h: 'Araştırma programlarına katılım', t: 'Anonim akademik ve halk sağlığı katkısı (EK F).' },
      ],
      primary: 'Seçili Onayları Ver',
      secondary: 'Hiçbirine Vermiyorum',
    },
    system: {
      title: 'Birkaç son izin',
      sub: 'Bunlar sözleşmesel rızadan ayrıdır — işletim sistemi tarafından sunulur.',
      perms: [
        { icon: '📍', h: 'Konum',     t: 'Sense, çevredeki hava kalitesini gösterebilmek için konumuna ihtiyaç duyar.', when: 'Şimdi' },
        { icon: '🔔', h: 'Bildirim',  t: 'Hava kalitesi uyarıları ve önemli güncellemeler için.',                      when: 'Şimdi' },
        { icon: '📶', h: 'Bluetooth', t: 'CarboStar / SX Miner eşleştirme sırasında.',                                 when: 'Sonra' },
        { icon: '📷', h: 'Kamera',    t: 'Sadece QR kod taraması anında.',                                              when: 'Sonra' },
        { icon: '🛰', h: 'Takip Şeffaflığı (iOS)', t: 'Reklam yok — sadece pazarlama analitiği için gerekirse.',       when: 'Opsiyonel' },
      ],
      primary: 'İzinleri Aç',
    },
    ready: {
      title: 'Hazırsın!',
      sub: "Sense Beta’ya hoşgeldin.",
      summaryLabel: 'Verdiğin onaylar',
      note: 'Bu onayları istediğin zaman Profil → Gizlilik Ayarları → Açık Rızalar menüsünden değiştirebilirsin.',
      primary: "Sense'e Başla",
    },
    btnTrue: 'Verildi',
    btnFalse: 'Verilmedi',
  },
  en: {
    headerEyebrow: 'SUNX SENSE · BETA CONSENT FLOW · ANNEX J',
    headerTitle: 'Eight screens, KVKK + GDPR compliant Beta consent.',
    headerSub: 'Welcome, notice, age, contract, cross-border, granular, system perms, summary.',
    screens: [
      { id: 'welcome',   eyebrow: 'J.2.1 · WELCOME',         label: 'Beta warning' },
      { id: 'inform',    eyebrow: 'J.2.2 · NOTICE',           label: 'KVKK Art.10 / GDPR Art.13' },
      { id: 'age',       eyebrow: 'J.2.3 · AGE & REGION',     label: 'COPPA / 18+' },
      { id: 'contract',  eyebrow: 'J.2.4 · CONTRACT',         label: 'Required acceptance' },
      { id: 'transfer',  eyebrow: 'J.2.5 · CROSS-BORDER',     label: 'KVKK Art.9 explicit' },
      { id: 'granular',  eyebrow: 'J.2.6 · GRANULAR CONSENT', label: 'All default off' },
      { id: 'system',    eyebrow: 'J.2.7 · SYSTEM PERMS',     label: 'iOS / Android prompts' },
      { id: 'ready',     eyebrow: 'J.2.8 · YOU’RE READY', label: 'Summary & entry' },
    ],
    welcome: {
      title: 'Welcome to Sense Beta',
      sub: 'A hyperlocal air-quality map — currently in Beta',
      bullets: [
        { icon: '📍', t: 'See real-time environmental data around you' },
        { icon: '🤖', t: 'AI-powered suggestions and trend analysis' },
        { icon: '🌍', t: 'A network powered by thousands of users like you' },
      ],
      warnTitle: 'Beta notice',
      warn: [
        'Sense is currently in Beta. Features may change, errors may occur, measurements may not always be accurate.',
        'Beta is free. Data you share during Beta may be used to improve the product.',
        'You can leave Beta at any time.',
      ],
      primary: 'Continue',
      secondary: 'Later',
    },
    inform: {
      title: 'How your information is used',
      sub: 'Information only — no consent collected on this screen.',
      items: [
        { icon: '📍', h: 'LOCATION',         t: 'Your location is needed to show air quality for your area.' },
        { icon: '🌡️', h: 'ENVIRONMENTAL',    t: 'Data from CarboStar and nearby sensors is mapped.' },
        { icon: '🤖', h: 'AI MODELS',         t: 'Your (anonymised) data may improve environmental prediction models.' },
        { icon: '☁️', h: 'CLOUD PROCESSING',  t: 'Data is stored securely on global cloud providers (EU and US).' },
      ],
      link: 'Full Privacy Policy →',
      primary: 'Got it, continue',
    },
    age: {
      title: 'A few questions before you continue',
      birthLabel: 'Year of birth',
      countryLabel: 'Country of residence',
      note: 'Data protection laws applied depend on your country of residence.',
      birthValue: '1996',
      countryValue: 'Türkiye',
      primary: 'Continue',
    },
    contract: {
      title: 'Agreement & Privacy',
      sub: 'A short summary — full text available below.',
      summary: [
        'Beta is free and participation is voluntary.',
        'Your data is processed to provide and improve the Services.',
        'Your KVKK / GDPR rights apply in full.',
        'You retain the right to leave Beta and delete your account.',
      ],
      boxes: [
        'I have read and accept the User Agreement',
        'I have read the Privacy Policy and understand my data will be processed for the purposes stated in the Agreement',
        'I confirm I am 18 years or older',
      ],
      link: 'Full Agreement Text →',
      primary: 'Continue',
    },
    transfer: {
      title: 'Cross-border processing of your data',
      body: 'For Sense to function, your data must be processed on cloud servers in the EU (Frankfurt, Dublin) and US (Virginia, Oregon), provided by AWS / GCP / Azure, encrypted with TLS 1.3. International transfers are made under EU Standard Contractual Clauses (SCC).',
      box: 'I give explicit consent for my data to be transferred internationally as described',
      foot: 'This consent is required for Sense to function. If you decline, you cannot use Sense. A Türkiye-only version may be offered in the future.',
      primary: 'Accept & Continue',
      secondary: "Don't use Sense",
    },
    granular: {
      title: 'Which of these do you consent to?',
      sub: "Optional. You can use Sense even if you decline them all. Change anytime in Settings.",
      toggles: [
        { k: 'gps',       h: 'Precise GPS location',         t: 'For more accurate maps and hyperlocal suggestions.' },
        { k: 'ai',        h: 'AI model training',            t: "My anonymised data may improve Sense’s prediction models." },
        { k: 'analytics', h: 'Commercial analytics',         t: 'Anonymised aggregated data shared with municipalities, ESG, research institutions.' },
        { k: 'email',     h: 'Marketing emails',             t: 'Product updates, tips, and special offers.' },
        { k: 'push',      h: 'Marketing push notifications', t: 'Updates and campaign notifications.' },
        { k: 'research',  h: 'Research program participation', t: 'Anonymous contribution to academic and public-health research (Annex F).' },
      ],
      primary: 'Grant selected',
      secondary: 'Decline all',
    },
    system: {
      title: 'A few final permissions',
      sub: 'Separate from contractual consent — handled by your OS.',
      perms: [
        { icon: '📍', h: 'Location',  t: 'Sense needs your location to show ambient air quality around you.', when: 'Now' },
        { icon: '🔔', h: 'Notifications', t: 'For air-quality alerts and important updates.',                  when: 'Now' },
        { icon: '📶', h: 'Bluetooth', t: 'When pairing a CarboStar / SX Miner device.',                        when: 'Later' },
        { icon: '📷', h: 'Camera',    t: 'Only when scanning a QR code.',                                       when: 'Later' },
        { icon: '🛰', h: 'App Tracking (iOS)', t: 'No ads — only if marketing analytics requires it.',         when: 'Optional' },
      ],
      primary: 'Grant permissions',
    },
    ready: {
      title: "You’re ready!",
      sub: 'Welcome to Sense Beta.',
      summaryLabel: 'Your consents',
      note: 'You can change these anytime under Profile → Privacy Settings → Explicit Consents.',
      primary: 'Open Sense',
    },
    btnTrue: 'Granted',
    btnFalse: 'Declined',
  },
};

// --- Small shared bits ---

function Eyebrow({ children, dark }) {
  return (
    <div style={{
      fontFamily: 'Geist Mono, ui-monospace, monospace',
      fontSize: 10, letterSpacing: 1.8, fontWeight: 500,
      color: C_PRIMARY, margin: '14px 24px 0',
    }}>{children}</div>
  );
}

function ScreenTitle({ title, sub, dark }) {
  return (
    <div style={{ padding: '8px 24px 0' }}>
      <h1 style={{
        fontFamily: 'Geist', fontWeight: 600, fontSize: 22, lineHeight: 1.18, letterSpacing: -0.6,
        color: dark ? '#fff' : '#0a1420', margin: '0 0 6px', textWrap: 'balance',
      }}>{title}</h1>
      {sub && (
        <p style={{
          fontFamily: 'Geist', fontSize: 13, lineHeight: 1.5,
          color: dark ? 'rgba(255,255,255,0.6)' : 'rgba(20,30,50,0.6)',
          margin: 0, textWrap: 'pretty',
        }}>{sub}</p>
      )}
    </div>
  );
}

function PrimaryButton({ children, disabled, dark, fullWidth = true }) {
  return (
    <button disabled={disabled} style={{
      width: fullWidth ? '100%' : 'auto',
      height: 50, border: 'none', borderRadius: 14,
      background: disabled
        ? (dark ? 'rgba(255,255,255,0.08)' : 'rgba(20,30,50,0.08)')
        : 'linear-gradient(135deg, oklch(0.65 0.14 230), oklch(0.58 0.16 220))',
      color: disabled ? (dark ? 'rgba(255,255,255,0.3)' : 'rgba(20,30,50,0.3)') : '#fff',
      fontFamily: 'Geist', fontSize: 14, fontWeight: 600,
      cursor: disabled ? 'not-allowed' : 'pointer',
      boxShadow: disabled ? 'none' : '0 8px 20px rgba(20,90,200,0.3)',
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
    }}>
      {children}
    </button>
  );
}

function GhostButton({ children, dark, fullWidth = true }) {
  return (
    <button style={{
      width: fullWidth ? '100%' : 'auto', height: 46, marginTop: 8,
      border: `1px solid ${dark ? 'rgba(255,255,255,0.16)' : 'rgba(20,30,50,0.16)'}`,
      borderRadius: 14, background: 'transparent',
      color: dark ? 'rgba(255,255,255,0.8)' : 'rgba(20,30,50,0.8)',
      fontFamily: 'Geist', fontSize: 13, fontWeight: 500, cursor: 'pointer',
    }}>{children}</button>
  );
}

function Checkbox({ checked, label, dark, sub }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '10px 0' }}>
      <div style={{
        width: 22, height: 22, flexShrink: 0, borderRadius: 6, marginTop: 2,
        border: `1.5px solid ${checked ? C_PRIMARY : (dark ? 'rgba(255,255,255,0.25)' : 'rgba(20,30,50,0.25)')}`,
        background: checked ? C_PRIMARY : 'transparent',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {checked && <svg width="12" height="12" viewBox="0 0 12 12"><path d="M2 6l3 3 5-6" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: 'Geist', fontSize: 13, lineHeight: 1.4, color: dark ? '#fff' : '#0a1420' }}>{label}</div>
        {sub && <div style={{ fontFamily: 'Geist', fontSize: 11, marginTop: 2,
          color: dark ? 'rgba(255,255,255,0.5)' : 'rgba(20,30,50,0.5)' }}>{sub}</div>}
      </div>
    </div>
  );
}

function Toggle({ on, dark }) {
  return (
    <div style={{
      width: 38, height: 22, borderRadius: 999, flexShrink: 0,
      background: on ? C_PRIMARY : (dark ? 'rgba(255,255,255,0.16)' : 'rgba(20,30,50,0.16)'),
      position: 'relative', transition: 'background 0.2s',
    }}>
      <div style={{
        position: 'absolute', top: 2, left: on ? 18 : 2,
        width: 18, height: 18, borderRadius: 999, background: '#fff',
        transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
      }}/>
    </div>
  );
}

// --- Screen layouts ---

function WelcomeScreen({ dark, lang, device, copy }) {
  const c = copy.welcome;
  return (
    <Shell dark={dark} device={device}>
      <Eyebrow dark={dark}>{copy.screens[0].eyebrow}</Eyebrow>
      <ScreenTitle title={c.title} sub={c.sub} dark={dark} />
      <div style={{ padding: '14px 24px 0', flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {c.bullets.map((b, i) => (
          <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start',
            padding: 12, borderRadius: 12,
            background: dark ? 'rgba(255,255,255,0.04)' : 'rgba(20,30,50,0.04)' }}>
            <span style={{ fontSize: 18 }}>{b.icon}</span>
            <span style={{ fontFamily: 'Geist', fontSize: 13, lineHeight: 1.45,
              color: dark ? 'rgba(255,255,255,0.85)' : 'rgba(20,30,50,0.85)' }}>{b.t}</span>
          </div>
        ))}
        <div style={{
          marginTop: 10, padding: 14, borderRadius: 14,
          border: `1.5px solid ${C_AMBER}`,
          background: dark ? 'oklch(0.25 0.04 75 / 0.25)' : 'oklch(0.97 0.05 75 / 0.7)',
        }}>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8 }}>
            <span style={{ fontSize: 16 }}>⚠️</span>
            <span style={{ fontFamily: 'Geist Mono, ui-monospace, monospace', fontSize: 10,
              letterSpacing: 1.6, color: C_AMBER, fontWeight: 600,
              textTransform: 'uppercase' }}>{c.warnTitle}</span>
          </div>
          {c.warn.map((w, i) => (
            <div key={i} style={{ fontFamily: 'Geist', fontSize: 12, lineHeight: 1.45, marginTop: i ? 6 : 0,
              color: dark ? 'rgba(255,255,255,0.78)' : 'rgba(20,30,50,0.78)' }}>
              <span style={{ color: i ? C_ACCENT : C_AMBER, marginRight: 6 }}>{i ? '✓' : '•'}</span>{w}
            </div>
          ))}
        </div>
      </div>
      <Footer device={device}>
        <PrimaryButton dark={dark}>{c.primary} →</PrimaryButton>
        <GhostButton dark={dark}>{c.secondary}</GhostButton>
      </Footer>
    </Shell>
  );
}

function InformScreen({ dark, device, copy }) {
  const c = copy.inform;
  return (
    <Shell dark={dark} device={device}>
      <Eyebrow dark={dark}>{copy.screens[1].eyebrow}</Eyebrow>
      <ScreenTitle title={c.title} sub={c.sub} dark={dark} />
      <div style={{ padding: '14px 24px 0', flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {c.items.map((it, i) => (
          <div key={i} style={{ display: 'flex', gap: 12, padding: 12, borderRadius: 12,
            background: dark ? 'rgba(255,255,255,0.04)' : 'rgba(20,30,50,0.04)' }}>
            <div style={{ fontSize: 22, flexShrink: 0 }}>{it.icon}</div>
            <div>
              <div style={{ fontFamily: 'Geist Mono, ui-monospace, monospace', fontSize: 10,
                letterSpacing: 1.6, color: C_PRIMARY, fontWeight: 600 }}>{it.h}</div>
              <div style={{ fontFamily: 'Geist', fontSize: 12.5, lineHeight: 1.45, marginTop: 4,
                color: dark ? 'rgba(255,255,255,0.78)' : 'rgba(20,30,50,0.78)' }}>{it.t}</div>
            </div>
          </div>
        ))}
        <div style={{ marginTop: 4, fontFamily: 'Geist', fontSize: 12, color: C_PRIMARY, fontWeight: 500 }}>{c.link}</div>
      </div>
      <Footer device={device}>
        <PrimaryButton dark={dark}>{c.primary} →</PrimaryButton>
      </Footer>
    </Shell>
  );
}

function AgeScreen({ dark, device, copy }) {
  const c = copy.age;
  return (
    <Shell dark={dark} device={device}>
      <Eyebrow dark={dark}>{copy.screens[2].eyebrow}</Eyebrow>
      <ScreenTitle title={c.title} dark={dark} />
      <div style={{ padding: '20px 24px 0', flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
        <FieldRow label={c.birthLabel} value={c.birthValue} dark={dark} />
        <FieldRow label={c.countryLabel} value={c.countryValue} dark={dark} flag="🇹🇷" />
        <div style={{
          padding: 12, borderRadius: 12,
          background: dark ? 'oklch(0.22 0.04 230 / 0.4)' : 'oklch(0.96 0.03 230 / 0.7)',
          border: `1px solid ${dark ? 'rgba(110,160,220,0.25)' : 'rgba(110,160,220,0.35)'}`,
        }}>
          <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
            <span style={{ fontSize: 14 }}>ℹ️</span>
            <span style={{ fontFamily: 'Geist', fontSize: 12, lineHeight: 1.45,
              color: dark ? 'rgba(255,255,255,0.78)' : 'rgba(20,30,50,0.78)' }}>{c.note}</span>
          </div>
        </div>
      </div>
      <Footer device={device}><PrimaryButton dark={dark}>{c.primary} →</PrimaryButton></Footer>
    </Shell>
  );
}

function FieldRow({ label, value, dark, flag }) {
  return (
    <div>
      <div style={{ fontFamily: 'Geist Mono, ui-monospace, monospace', fontSize: 10,
        letterSpacing: 1.6, color: dark ? 'rgba(255,255,255,0.5)' : 'rgba(20,30,50,0.5)',
        textTransform: 'uppercase', marginBottom: 6 }}>{label}</div>
      <div style={{
        height: 50, padding: '0 14px', borderRadius: 12,
        background: dark ? 'rgba(255,255,255,0.06)' : 'rgba(20,30,50,0.05)',
        border: `1px solid ${dark ? 'rgba(255,255,255,0.1)' : 'rgba(20,30,50,0.08)'}`,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        fontFamily: 'Geist', fontSize: 14, color: dark ? '#fff' : '#0a1420',
      }}>
        <span>{flag ? `${flag}  ` : ''}{value}</span>
        <svg width="14" height="14" viewBox="0 0 14 14"><path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </div>
    </div>
  );
}

function ContractScreen({ dark, device, copy }) {
  const c = copy.contract;
  return (
    <Shell dark={dark} device={device}>
      <Eyebrow dark={dark}>{copy.screens[3].eyebrow}</Eyebrow>
      <ScreenTitle title={c.title} sub={c.sub} dark={dark} />
      <div style={{ padding: '14px 24px 0', flex: 1 }}>
        <div style={{ padding: 12, borderRadius: 12, marginBottom: 14,
          background: dark ? 'rgba(255,255,255,0.04)' : 'rgba(20,30,50,0.04)' }}>
          {c.summary.map((s, i) => (
            <div key={i} style={{
              fontFamily: 'Geist', fontSize: 12, lineHeight: 1.45, marginTop: i ? 6 : 0,
              color: dark ? 'rgba(255,255,255,0.78)' : 'rgba(20,30,50,0.78)',
            }}>
              <span style={{ color: C_ACCENT, marginRight: 6 }}>•</span>{s}
            </div>
          ))}
          <div style={{ marginTop: 10, fontFamily: 'Geist', fontSize: 12, color: C_PRIMARY, fontWeight: 500 }}>{c.link}</div>
        </div>
        {c.boxes.map((b, i) => (
          <Checkbox key={i} checked={i < 2} label={b} dark={dark} />
        ))}
      </div>
      <Footer device={device}><PrimaryButton dark={dark} disabled>{c.primary} →</PrimaryButton></Footer>
    </Shell>
  );
}

function TransferScreen({ dark, device, copy }) {
  const c = copy.transfer;
  return (
    <Shell dark={dark} device={device}>
      <Eyebrow dark={dark}>{copy.screens[4].eyebrow}</Eyebrow>
      <ScreenTitle title={c.title} dark={dark} />
      <div style={{ padding: '14px 24px 0', flex: 1 }}>
        <p style={{ fontFamily: 'Geist', fontSize: 12.5, lineHeight: 1.55,
          color: dark ? 'rgba(255,255,255,0.78)' : 'rgba(20,30,50,0.78)', margin: 0 }}>{c.body}</p>
        <div style={{ display: 'flex', gap: 8, marginTop: 14, flexWrap: 'wrap' }}>
          {['🇩🇪 Frankfurt', '🇮🇪 Dublin', '🇺🇸 Virginia', '🇺🇸 Oregon', 'TLS 1.3', 'SCC'].map((t, i) => (
            <span key={i} style={{
              fontFamily: 'Geist Mono, ui-monospace, monospace', fontSize: 10, letterSpacing: 1,
              padding: '6px 10px', borderRadius: 999,
              background: dark ? 'rgba(255,255,255,0.06)' : 'rgba(20,30,50,0.06)',
              color: dark ? 'rgba(255,255,255,0.8)' : 'rgba(20,30,50,0.8)',
            }}>{t}</span>
          ))}
        </div>
        <div style={{ marginTop: 18, padding: 12, borderRadius: 12,
          border: `1.5px solid ${C_PRIMARY}`,
          background: dark ? 'oklch(0.22 0.04 230 / 0.3)' : 'oklch(0.97 0.03 230 / 0.5)' }}>
          <Checkbox checked={true} label={c.box} dark={dark} />
        </div>
        <p style={{ marginTop: 14, fontFamily: 'Geist', fontSize: 11.5, lineHeight: 1.5,
          color: dark ? 'rgba(255,255,255,0.55)' : 'rgba(20,30,50,0.55)' }}>{c.foot}</p>
      </div>
      <Footer device={device}>
        <PrimaryButton dark={dark}>{c.primary} →</PrimaryButton>
        <GhostButton dark={dark}>{c.secondary}</GhostButton>
      </Footer>
    </Shell>
  );
}

function GranularScreen({ dark, device, copy }) {
  const c = copy.granular;
  return (
    <Shell dark={dark} device={device}>
      <Eyebrow dark={dark}>{copy.screens[5].eyebrow}</Eyebrow>
      <ScreenTitle title={c.title} sub={c.sub} dark={dark} />
      <div style={{ padding: '12px 24px 0', flex: 1, overflow: 'hidden' }}>
        {c.toggles.map((t, i) => {
          const on = i === 0 || i === 5; // illustrative
          return (
            <div key={t.k} style={{
              display: 'flex', alignItems: 'flex-start', gap: 12,
              padding: '10px 0',
              borderTop: i ? `1px solid ${dark ? 'rgba(255,255,255,0.06)' : 'rgba(20,30,50,0.06)'}` : 'none',
            }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: 'Geist', fontSize: 13, fontWeight: 500,
                  color: dark ? '#fff' : '#0a1420' }}>{t.h}</div>
                <div style={{ fontFamily: 'Geist', fontSize: 11.5, lineHeight: 1.4, marginTop: 2,
                  color: dark ? 'rgba(255,255,255,0.55)' : 'rgba(20,30,50,0.55)' }}>{t.t}</div>
              </div>
              <Toggle on={on} dark={dark} />
            </div>
          );
        })}
      </div>
      <Footer device={device}>
        <PrimaryButton dark={dark}>{c.primary}</PrimaryButton>
        <GhostButton dark={dark}>{c.secondary}</GhostButton>
      </Footer>
    </Shell>
  );
}

function SystemScreen({ dark, device, copy }) {
  const c = copy.system;
  return (
    <Shell dark={dark} device={device}>
      <Eyebrow dark={dark}>{copy.screens[6].eyebrow}</Eyebrow>
      <ScreenTitle title={c.title} sub={c.sub} dark={dark} />
      <div style={{ padding: '12px 24px 0', flex: 1 }}>
        {c.perms.map((p, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 12, padding: 12, marginBottom: 8,
            borderRadius: 12,
            background: dark ? 'rgba(255,255,255,0.04)' : 'rgba(20,30,50,0.04)',
          }}>
            <div style={{ fontSize: 20 }}>{p.icon}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: 'Geist', fontSize: 13, fontWeight: 500,
                color: dark ? '#fff' : '#0a1420' }}>{p.h}</div>
              <div style={{ fontFamily: 'Geist', fontSize: 11.5, lineHeight: 1.4, marginTop: 2,
                color: dark ? 'rgba(255,255,255,0.55)' : 'rgba(20,30,50,0.55)' }}>{p.t}</div>
            </div>
            <span style={{
              fontFamily: 'Geist Mono, ui-monospace, monospace', fontSize: 9, letterSpacing: 1.4,
              padding: '4px 8px', borderRadius: 999,
              background: dark ? 'rgba(255,255,255,0.08)' : 'rgba(20,30,50,0.08)',
              color: dark ? 'rgba(255,255,255,0.7)' : 'rgba(20,30,50,0.7)',
              textTransform: 'uppercase',
            }}>{p.when}</span>
          </div>
        ))}
      </div>
      <Footer device={device}><PrimaryButton dark={dark}>{c.primary} →</PrimaryButton></Footer>
    </Shell>
  );
}

function ReadyScreen({ dark, device, copy }) {
  const c = copy.ready;
  const summary = [
    { k: copy.granular.toggles[0].h, on: true },
    { k: copy.granular.toggles[1].h, on: false },
    { k: copy.granular.toggles[2].h, on: false },
    { k: copy.granular.toggles[3].h, on: false },
    { k: copy.granular.toggles[4].h, on: false },
    { k: copy.granular.toggles[5].h, on: true },
  ];
  return (
    <Shell dark={dark} device={device}>
      <Eyebrow dark={dark}>{copy.screens[7].eyebrow}</Eyebrow>
      <ScreenTitle title={c.title} sub={c.sub} dark={dark} />
      <div style={{ padding: '14px 24px 0', flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '6px 0 14px' }}>
          <div style={{
            width: 88, height: 88, borderRadius: 999,
            background: 'linear-gradient(135deg, oklch(0.72 0.14 155), oklch(0.65 0.14 230))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 8px 28px rgba(20,90,200,0.3)',
          }}>
            <svg width="42" height="42" viewBox="0 0 42 42">
              <path d="M10 22l8 8 14-18" stroke="#fff" strokeWidth="3.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
        <div style={{ fontFamily: 'Geist Mono, ui-monospace, monospace', fontSize: 10,
          letterSpacing: 1.6, color: dark ? 'rgba(255,255,255,0.5)' : 'rgba(20,30,50,0.5)',
          textTransform: 'uppercase', marginBottom: 8 }}>{c.summaryLabel}</div>
        <div style={{ padding: 10, borderRadius: 12,
          background: dark ? 'rgba(255,255,255,0.04)' : 'rgba(20,30,50,0.04)' }}>
          {summary.map((s, i) => (
            <div key={i} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '6px 4px',
              borderTop: i ? `1px solid ${dark ? 'rgba(255,255,255,0.06)' : 'rgba(20,30,50,0.06)'}` : 'none',
            }}>
              <span style={{ fontFamily: 'Geist', fontSize: 12,
                color: dark ? 'rgba(255,255,255,0.8)' : 'rgba(20,30,50,0.8)' }}>{s.k}</span>
              <span style={{ fontFamily: 'Geist Mono, ui-monospace, monospace', fontSize: 10,
                letterSpacing: 1, color: s.on ? C_ACCENT : (dark ? 'rgba(255,255,255,0.4)' : 'rgba(20,30,50,0.4)'),
                fontWeight: 600 }}>
                {s.on ? `✓ ${copy.btnTrue}` : `✗ ${copy.btnFalse}`}
              </span>
            </div>
          ))}
        </div>
        <p style={{ marginTop: 14, fontFamily: 'Geist', fontSize: 11.5, lineHeight: 1.5,
          color: dark ? 'rgba(255,255,255,0.55)' : 'rgba(20,30,50,0.55)' }}>{c.note}</p>
      </div>
      <Footer device={device}><PrimaryButton dark={dark}>{c.primary} →</PrimaryButton></Footer>
    </Shell>
  );
}

// --- Shell + footer ---

function Shell({ dark, device, children }) {
  return (
    <div style={{
      width: '100%', height: '100%', position: 'relative',
      display: 'flex', flexDirection: 'column',
      background: dark ? 'oklch(0.14 0.015 225)' : 'oklch(0.985 0.008 220)',
      animation: 'fadeSlide 0.5s ease-out',
      fontFamily: 'Geist, Inter, -apple-system, system-ui, sans-serif',
      paddingTop: device === 'ios' ? 58 : 48,
    }}>
      {children}
    </div>
  );
}

function Footer({ device, children }) {
  return (
    <div style={{
      padding: '16px 24px',
      paddingBottom: device === 'ios' ? 40 : 32,
      display: 'flex', flexDirection: 'column',
    }}>{children}</div>
  );
}

// --- Dispatcher ---

function ConsentScreen({ dark, lang, device, idx }) {
  const copy = window.CONSENT_COPY[lang];
  const id = copy.screens[idx].id;
  switch (id) {
    case 'welcome':  return <WelcomeScreen  dark={dark} lang={lang} device={device} copy={copy} />;
    case 'inform':   return <InformScreen   dark={dark}             device={device} copy={copy} />;
    case 'age':      return <AgeScreen      dark={dark}             device={device} copy={copy} />;
    case 'contract': return <ContractScreen dark={dark}             device={device} copy={copy} />;
    case 'transfer': return <TransferScreen dark={dark}             device={device} copy={copy} />;
    case 'granular': return <GranularScreen dark={dark}             device={device} copy={copy} />;
    case 'system':   return <SystemScreen   dark={dark}             device={device} copy={copy} />;
    case 'ready':    return <ReadyScreen    dark={dark}             device={device} copy={copy} />;
    default:         return null;
  }
}

window.ConsentScreen = ConsentScreen;
window.CONSENT_COPY = CONSENT_COPY;
