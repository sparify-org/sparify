import { Sparkles, Trophy, Snowflake, TrendingUp, ShieldCheck, Gift, Landmark, ShieldAlert, Crown, Rainbow, Zap, Star, Gem, Ticket, Shield } from 'lucide-react';

export type ThemeColor = 
  | 'red' | 'orange' | 'yellow' | 'green' | 'blue' | 'purple' | 'pink' | 'teal' | 'cyan' | 'black';

export type VIPColor = 
  | 'vip_sunset' | 'vip_ocean' | 'vip_forest' | 'vip_galaxy' | 'vip_candy' 
  | 'vip_fire' | 'vip_emerald' | 'vip_royal' | 'vip_peach' | 'vip_midnight';

export type Language = 'de' | 'en' | 'hr' | 'tr' | 'ru' | 'hu';
export type AppMode = 'kids' | 'adult';

export const CUSTOM_LOGO_URL = 'https://bejlqwebcujfklavoecm.supabase.co/storage/v1/object/public/Logo/SparifyLogoOrange.png'; 

export interface User {
  name: string;
  avatarId: number;
  email: string;
  trophies: number;
  coins: number;
  streak: number; 
  lastCompletedDate: string | null; 
  inventory: string[]; 
  unseenItems: string[]; // Trackt IDs von Items, die neu gewonnen wurden
  completedLevels: string[]; 
  claimedAchievements: string[]; 
  activeSpecials: string[]; 
  streakFreezeUntil?: string | null; 
  language: Language;
  accentColor?: ThemeColor | VIPColor;
  age: number | null;
  hasSeenTutorial: boolean;
}

export interface PiggyBank {
  id: string;
  name: string;
  balance: number;
  color: ThemeColor;
  connectedDate: string;
  role: 'owner' | 'guest'; 
  history: { day: string; amount: number }[];
  transactions: Transaction[];
  goals: Goal[];
  glitterEnabled?: boolean;
  rainbowEnabled?: boolean;
  safeLockEnabled?: boolean;
  diamondSkinEnabled?: boolean;
}

export interface SpecialItem {
    id: string;
    label: string;
    description: string;
    price: number;
    category: 'profile' | 'piggy' | 'instant';
    icon: any;
    color: string;
}

export const SPECIALS_DATABASE: SpecialItem[] = [
  {
    id: 'item_lucky_bag',
    label: 'Wundertüte',
    description: 'Gewinne Münzen, Avatare oder exklusive Farben!',
    price: 150,
    category: 'instant',
    icon: Gift,
    color: 'text-purple-500'
  }
];

export interface Achievement {
  id: string;
  title: string;
  description: string;
  reward: number;
  condition: (user: User, pigs: PiggyBank[]) => boolean;
  icon: string;
}

export const ACHIEVEMENTS_LIST: Achievement[] = [
  {
    id: 'first_pig',
    title: 'Der erste Schritt',
    description: 'Besitze dein erstes Sparschwein.',
    reward: 20,
    icon: '🐷',
    condition: (u, pigs) => pigs.filter(p => p.role === 'owner').length > 0
  },
  {
    id: 'save_10',
    title: 'Spar-Anfänger',
    description: 'Spare insgesamt mehr als 10 €.',
    reward: 50,
    icon: '💰',
    condition: (u, pigs) => pigs.reduce((acc, p) => acc + p.balance, 0) >= 10
  },
  {
    id: 'save_100',
    title: 'Spar-Meister',
    description: 'Spare insgesamt mehr als 100 €.',
    reward: 250,
    icon: '💎',
    condition: (u, pigs) => pigs.reduce((acc, p) => acc + p.balance, 0) >= 100
  },
  {
    id: 'goals_3',
    title: 'Wunsch-Sammler',
    description: 'Erstelle mindestens 3 Wünsche.',
    reward: 40,
    icon: '🎯',
    condition: (u, pigs) => pigs.reduce((acc, p) => acc + (p.goals?.length || 0), 0) >= 3
  },
  {
    id: 'learn_3',
    title: 'Schlauberger',
    description: 'Schließe 3 Lern-Level ab.',
    reward: 60,
    icon: '🎓',
    condition: (u) => u.completedLevels.length >= 3
  },
  {
    id: 'streak_3',
    title: 'Dranbleiber',
    description: 'Erreiche einen Streak von 3 Tagen.',
    reward: 100,
    icon: '🔥',
    condition: (u) => u.streak >= 3
  }
];

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  date: string;
  type: 'deposit' | 'withdrawal' | 'transfer';
  rawDate?: Date;
}

export interface Goal {
  id: string;
  title: string;
  targetAmount: number;
  savedAmount: number;
  allocationPercent: number;
}

export type ViewState = 
  | 'LOGIN' 
  | 'DASHBOARD' 
  | 'LEARN'
  | 'SHOP'
  | 'ACHIEVEMENTS'
  | 'SETTINGS' 
  | 'SCANNER' 
  | 'DETAIL'
  | 'CASINO';

export const AVATARS = [
  'https://bejlqwebcujfklavoecm.supabase.co/storage/v1/object/public/Profile%20Pictures/avatar_01.png',
  'https://bejlqwebcujfklavoecm.supabase.co/storage/v1/object/public/Profile%20Pictures/avatar_02.png',
  'https://bejlqwebcujfklavoecm.supabase.co/storage/v1/object/public/Profile%20Pictures/avatar_03.png',
  'https://bejlqwebcujfklavoecm.supabase.co/storage/v1/object/public/Profile%20Pictures/avatar_04.png',
  'https://bejlqwebcujfklavoecm.supabase.co/storage/v1/object/public/Profile%20Pictures/avatar_05.png',
  'https://bejlqwebcujfklavoecm.supabase.co/storage/v1/object/public/Profile%20Pictures/avatar_06.png',
  'https://bejlqwebcujfklavoecm.supabase.co/storage/v1/object/public/Profile%20Pictures/avatar_07.png',
  'https://bejlqwebcujfklavoecm.supabase.co/storage/v1/object/public/Profile%20Pictures/avatar_08.png',
  'https://bejlqwebcujfklavoecm.supabase.co/storage/v1/object/public/Profile%20Pictures/avatar_09.png',
  'https://bejlqwebcujfklavoecm.supabase.co/storage/v1/object/public/Profile%20Pictures/avatar_10.png',
  'https://bejlqwebcujfklavoecm.supabase.co/storage/v1/object/public/Profile%20Pictures/avatar_11.png',
  'https://bejlqwebcujfklavoecm.supabase.co/storage/v1/object/public/Profile%20Pictures/avatar_12.png',
  'https://bejlqwebcujfklavoecm.supabase.co/storage/v1/object/public/Profile%20Pictures/avatar_13.png',
  'https://bejlqwebcujfklavoecm.supabase.co/storage/v1/object/public/Profile%20Pictures/avatar_14.png',
  'https://bejlqwebcujfklavoecm.supabase.co/storage/v1/object/public/Profile%20Pictures/avatar_15.png',
  'https://bejlqwebcujfklavoecm.supabase.co/storage/v1/object/public/Profile%20Pictures/avatar_16.png',
  'https://bejlqwebcujfklavoecm.supabase.co/storage/v1/object/public/Profile%20Pictures/avatar_17.png',
  'https://bejlqwebcujfklavoecm.supabase.co/storage/v1/object/public/Profile%20Pictures/avatar_19.png',
  'https://bejlqwebcujfklavoecm.supabase.co/storage/v1/object/public/Profile%20Pictures/avatar_19.png',
  'https://bejlqwebcujfklavoecm.supabase.co/storage/v1/object/public/Profile%20Pictures/avatar_20.png',
  'https://bejlqwebcujfklavoecm.supabase.co/storage/v1/object/public/Profile%20Pictures/avatar_21.png',
  'https://bejlqwebcujfklavoecm.supabase.co/storage/v1/object/public/Profile%20Pictures/avatar_22.png',
  'https://bejlqwebcujfklavoecm.supabase.co/storage/v1/object/public/Profile%20Pictures/avatar_23.png',
  'https://bejlqwebcujfklavoecm.supabase.co/storage/v1/object/public/Profile%20Pictures/avatar_24.png'
];

export const THEME_COLORS: { [key in ThemeColor]: string } = {
  red: 'bg-red-500', 
  orange: 'bg-orange-500', 
  yellow: 'bg-yellow-400', 
  green: 'bg-green-500', 
  blue: 'bg-blue-500', 
  purple: 'bg-purple-500', 
  pink: 'bg-pink-500', 
  teal: 'bg-teal-500', 
  cyan: 'bg-cyan-500', 
  black: 'bg-slate-900'
};

export const VIP_COLORS: { [key in VIPColor]: string } = {
  vip_sunset: 'bg-gradient-to-br from-orange-400 via-red-500 to-pink-600',
  vip_ocean: 'bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600',
  vip_forest: 'bg-gradient-to-br from-green-400 via-emerald-500 to-teal-600',
  vip_galaxy: 'bg-gradient-to-br from-purple-600 via-indigo-700 to-slate-900',
  vip_candy: 'bg-gradient-to-br from-pink-400 via-purple-400 to-blue-400',
  vip_fire: 'bg-gradient-to-br from-yellow-400 via-orange-500 to-red-700',
  vip_emerald: 'bg-gradient-to-br from-emerald-300 via-green-500 to-teal-700',
  vip_royal: 'bg-gradient-to-br from-blue-600 via-purple-700 to-pink-600',
  vip_peach: 'bg-gradient-to-br from-yellow-300 via-orange-400 to-rose-500',
  vip_midnight: 'bg-gradient-to-br from-slate-700 via-blue-900 to-slate-950'
};

export const getAccentColorClass = (color: ThemeColor | VIPColor): string => {
  if (color.startsWith('vip_')) {
    return VIP_COLORS[color as VIPColor];
  }
  return THEME_COLORS[color as ThemeColor];
};

export const TRANSLATIONS: Record<Language, any> = {
  de: {
    login: { slogan: 'Schlau sparen, Träume erfüllen.', title: 'Willkommen zurück', email: 'E-Mail', password: 'Passwort', button: 'Einloggen', registerBtn: 'Konto erstellen', forgotPassword: 'Passwort vergessen?', resetTitle: 'Passwort zurücksetzen', resetButton: 'Link senden', backToLogin: 'Zurück zum Login', resetSuccess: 'E-Mail gesendet!' },
    age: { title: 'Fast fertig!', subtitle: 'Wie alt bist du?', hint: 'Dies hat keinen Einfluss auf die Funktionen, es passt lediglich das Design der App an dich an.', confirm: 'Los geht\'s', years: 'Jahre' },
    dashboard: { balance: 'Kontostand', newPig: 'Neues Schwein', myPigs: 'Meine Schweine', praiseMessages: ['Super!', 'Klasse!', 'Spitze!'], adLabel: 'Tipp', adTitle: 'Spar-Experte', adSubtitle: 'Jeder Cent zählt', moreSavings: 'Mehr sparen', noPigs: 'Keine Schweine vorhanden', watchedPigs: 'Beobachtete Schweine', removeGuestConfirm: 'Beobachtung beenden?', pigs: 'Schweinchen' },
    detail: { history: 'Verlauf', confirm: 'Bestätigen', cancel: 'Abbrechen', errorNotEnough: 'Guthaben zu niedrig', withdrawal: 'Auszahlung', available: 'Verfügbar', payout: 'Auszahlen', newGoal: 'Neuer Wunsch', share: 'Aufteilung', noGoals: 'Keine Wünsche', transactions: 'Transaktionen', noTransactions: 'Keine Transaktionen', goal: 'Wunsch', achievements: 'Erfolge', achievementsDesc: 'Deine Belohnungen', editGoal: 'Wunsch bearbeiten', settingsTitle: 'Einstellungen', pigName: 'Name', color: 'Farbe', delete: 'Löschen', payoutTitle: 'Auszahlung' },
    scanner: { loading: 'Kamera lädt...', modeGuest: 'Zuschauer', title: 'QR Scan', modeOwner: 'Besitzer', manual: 'Code eingeben' },
    settings: { title: 'Einstellungen', security: 'Sicherheit', newPassword: 'Neues Passwort', passwordSaved: 'Passwort gespeichert', changePassword: 'Passwort ändern', appMode: 'App Modus', profile: 'Profil', name: 'Name', activeSpecials: 'Aktive Items', design: 'Design', language: 'Sprache', info: 'Info', version: 'Version', logout: 'Abmelden', logoutConfirm: 'Abmelden?', cancel: 'Abbrechen' },
    common: { showLess: 'Weniger', showAll: 'Alle', showAllColors: 'Farben', greeting: 'Hallo' },
    help: { appTutorial: 'App Hilfe', boxTutorial: 'Box Hilfe' },
    learn: { sections: { basics: 'Basics', earning: 'Verdienen', spending: 'Ausgeben', saving: 'Sparen', safety: 'Sicherheit' }, start: 'Start' },
    shop: { title: 'Shop', subtitle: 'Items kaufen', specials: 'Specials', owned: 'Besitzt', sectionAvatars: 'Avatare', sectionThemes: 'Themes', balance: 'Guthaben' }
    , casino: { title: 'Casino' }
  },
  en: {
    login: { slogan: 'Smart saving, big dreams.', title: 'Welcome back', email: 'Email', password: 'Password', button: 'Login', registerBtn: 'Register', forgotPassword: 'Forgot password?', resetTitle: 'Reset password', resetButton: 'Send link', backToLogin: 'Back to login', resetSuccess: 'Email sent!' },
    age: { title: 'Almost there!', subtitle: 'How old are you?', hint: 'This doesn\'t affect features, it only adjusts the app design for you.', confirm: 'Let\'s go', years: 'years' },
    dashboard: { balance: 'Balance', newPig: 'New Piggy', myPigs: 'My Piggies', praiseMessages: ['Great!', 'Awesome!', 'Nice!'], adLabel: 'Ad', adTitle: 'Savings Adult', adSubtitle: 'Every cent counts', moreSavings: 'Save more', noPigs: 'No piggies yet', watchedPigs: 'Watched Piggies', removeGuestConfirm: 'Stop watching?', pigs: 'Piggies' },
    detail: { history: 'History', confirm: 'Confirm', cancel: 'Cancel', errorNotEnough: 'Not enough balance', withdrawal: 'Withdrawal', available: 'Available', payout: 'Withdraw', newGoal: 'New Goal', share: 'Allocation', noGoals: 'No goals', transactions: 'Transactions', noTransactions: 'No transactions', goal: 'Goal', achievements: 'Achievements', achievementsDesc: 'Your rewards', editGoal: 'Edit goal', settingsTitle: 'Settings', pigName: 'Name', color: 'Color', delete: 'Delete', payoutTitle: 'Withdrawal' },
    scanner: { loading: 'Loading...', modeGuest: 'Guest', title: 'Scan QR', modeOwner: 'Owner', manual: 'Enter code' },
    settings: { title: 'Settings', security: 'Security', newPassword: 'New Password', passwordSaved: 'Password saved', changePassword: 'Change password', appMode: 'App Mode', profile: 'Profile', name: 'Name', activeSpecials: 'Active items', design: 'Design', language: 'Language', info: 'Info', version: 'Version', logout: 'Logout', logoutConfirm: 'Logout?', cancel: 'Cancel' },
    common: { showLess: 'Show less', showAll: 'Show all', showAllColors: 'Show colors', greeting: 'Hello' },
    help: { appTutorial: 'App Tutorial', boxTutorial: 'Box Tutorial' },
    learn: { sections: { basics: 'Basics', earning: 'Earning', spending: 'Spending', saving: 'Saving', safety: 'Safety' }, start: 'Start' },
    // detailed learn content translations
    learnContent: {
      levels: {
        l_base_1: 'Hello Money',
        l_base_2: 'Euro & Cent',
        l_base_3: 'Banknotes',
        l_base_4: 'Money Game',
        l_base_5: 'Pro Quiz'
      },
      contents: {
        c_basics_1: [
          { type: 'slide', title: 'Hello Money!', text: 'Money helps us trade and save.' },
          { type: 'slide', title: 'Trading', text: 'People used to trade chickens for bread.' },
          { type: 'question', question: 'Is bartering always easy?', options: ['No','Yes'], feedbackSuccess: 'Exactly!', feedbackError: 'Not always.' }
        ],
        c_basics_2: [{ type: 'slide', title: 'Euro & Cent', text: 'One euro equals 100 cents.' }],
        c_basics_3: [{ type: 'slide', title: 'Banknotes', text: 'We use banknotes for larger amounts.' }],
        c_basics_quiz: [{ type: 'question', question: 'What do you take to the bakery?', options: ['Stones','Money'], feedbackSuccess: 'Correct.', feedbackError: 'Nope.' }]
      }
    },
    shop: { title: 'Shop', subtitle: 'Buy items', specials: 'Specials', owned: 'Owned', sectionAvatars: 'Avatars', sectionThemes: 'Themes', balance: 'Balance' }
    , casino: { title: 'Casino' }
  },
  hr: {
    login: { slogan: 'Pametno štedi, ostvari snove.', title: 'Dobrodošli natrag', email: 'E-mail', password: 'Lozinka', button: 'Prijava', registerBtn: 'Registracija', forgotPassword: 'Zaboravljena lozinka?', resetTitle: 'Resetiraj lozinku', resetButton: 'Pošalji link', backToLogin: 'Natrag na prijavu', resetSuccess: 'E-mail poslan!' },
    age: { title: 'Skoro gotovo!', subtitle: 'Koliko imaš godina?', hint: 'To ne utječe na funkcije, samo prilagođava dizajn aplikacije tebi.', confirm: 'Krenimo', years: 'godina' },
    dashboard: { balance: 'Stanje', newPig: 'Nova kasica', myPigs: 'Moje kasice', praiseMessages: ['Super!', 'Odlično!', 'Sjajno!'], adLabel: 'Savjet', adTitle: 'Štednja za Odrasle', adSubtitle: 'Svaki cent je važan', moreSavings: 'Štedi više', noPigs: 'Nema kasica', watchedPigs: 'Pratite kasice', removeGuestConfirm: 'Prestati pratiti?', pigs: 'Kasice' },
    detail: { history: 'Povijest', confirm: 'Potvrdi', cancel: 'Odustani', errorNotEnough: 'Nedovoljno sredstava', withdrawal: 'Isplata', available: 'Dostupno', payout: 'Isplati', newGoal: 'Nova želja', share: 'Raspodjela', noGoals: 'Nema želja', transactions: 'Tranakcije', noTransactions: 'Nema transakcija', goal: 'Želja', achievements: 'Postignuća', achievementsDesc: 'Tvoje nagrade', editGoal: 'Uredi želju', settingsTitle: 'Postavke', pigName: 'Ime', color: 'Boja', delete: 'Obriši', payoutTitle: 'Isplata' },
    scanner: { loading: 'Učitavanje...', modeGuest: 'Gost', title: 'Skeniraj QR', modeOwner: 'Vlasnik', manual: 'Unesi kod' },
    settings: { title: 'Postavke', security: 'Sigurnost', newPassword: 'Nova lozinka', passwordSaved: 'Lozinka spremljena', changePassword: 'Promijeni lozinku', appMode: 'Način rada', profile: 'Profil', name: 'Ime', activeSpecials: 'Aktivni predmeti', design: 'Dizajn', language: 'Jezik', info: 'Info', version: 'Verzija', logout: 'Odjava', logoutConfirm: 'Odjava?', cancel: 'Odustani' },
    common: { showLess: 'Manje', showAll: 'Sve', showAllColors: 'Boje', greeting: 'Bok' },
    help: { appTutorial: 'Pomoć za aplikaciju', boxTutorial: 'Pomoć za kasicu' },
    learn: { sections: { basics: 'Osnove', earning: 'Zarada', spending: 'Potrošnja', saving: 'Štednja', safety: 'Sigurnost' }, start: 'Kreni' },
    shop: { title: 'Trgovina', subtitle: 'Kupi predmete', specials: 'Posebno', owned: 'Kupljeno', sectionAvatars: 'Avatari', sectionThemes: 'Teme', balance: 'Novčići' }
    , casino: { title: 'Casino' }
  },
  tr: {
    login: { slogan: 'Akıllıca biriktir, hayallerine ulaş.', title: 'Tekrar hoş geldin', email: 'E-posta', password: 'Şifre', button: 'Giriş Yap', registerBtn: 'Kayıt Ol', forgotPassword: 'Şifremi unuttum?', resetTitle: 'Şifreyi sıfırla', resetButton: 'Link gönder', backToLogin: 'Giriş ekranına dön', resetSuccess: 'E-posta gönderildi!' },
    age: { title: 'Az kaldı!', subtitle: 'Kaç yaşındasın?', hint: 'Bu özellikleri etkilemez, saca uygulama tasarımını sana göre ayarlar.', confirm: 'Haydi başlayalım', years: 'yaş' },
    dashboard: { balance: 'Bakiye', newPig: 'Yeni Kumbara', myPigs: 'Kumbaralarım', praiseMessages: ['Harika!', 'Mükemmel!', 'Çok iyi!'], adLabel: 'İpucu', adTitle: 'Yetişkin Tasarrufu', adSubtitle: 'Her kuruş sayılır', moreSavings: 'Daha fazla biriktir', noPigs: 'Kumbara yok', watchedPigs: 'İzlenen Kumbaralar', removeGuestConfirm: 'İzlemeyi bırak?', pigs: 'Kumbaralar' },
    detail: { history: 'Geçmiş', confirm: 'Onayla', cancel: 'İptal', errorNotEnough: 'Yetersiz bakiye', withdrawal: 'Para Çekme', available: 'Mevcut', payout: 'Para Çek', newGoal: 'Yeni Hedef', share: 'Dağılım', noGoals: 'Hedef yok', transactions: 'İşlemler', noTransactions: 'İşlem yok', goal: 'Hedef', achievements: 'Başarılar', achievementsDesc: 'Ödüllerin', editGoal: 'Hedefi düzenle', settingsTitle: 'Ayarlar', pigName: 'İsim', color: 'Renk', delete: 'Sil', payoutTitle: 'Para Çekme' },
    scanner: { loading: 'Yükleniyor...', modeGuest: 'Misafir', title: 'QR Tara', modeOwner: 'Sahip', manual: 'Kod gir' },
    settings: { title: 'Ayarlar', security: 'Güvenlik', newPassword: 'Yeni Şifre', passwordSaved: 'Şifre kaydedildi', changePassword: 'Şifreyi değiştir', appMode: 'Uygulama Modu', profile: 'Profil', name: 'İsim', activeSpecials: 'Aktif öğeler', design: 'Tasarım', language: 'Dil', info: 'Bilgi', version: 'Versiyon', logout: 'Çıkış Yap', logoutConfirm: 'Çıkış yap?', cancel: 'İptal' },
    common: { showLess: 'Daha az', showAll: 'Hepsini gör', showAllColors: 'Renkler', greeting: 'Merhaba' },
    help: { appTutorial: 'Uygulama Yardımı', boxTutorial: 'Kutu Yardımı' },
    learn: { sections: { basics: 'Temeller', earning: 'Kazanma', spending: 'Harcama', saving: 'Biriktirme', safety: 'Güvenlik' }, start: 'Başla' },
    shop: { title: 'Mağaza', subtitle: 'Öğeleri satın al', specials: 'Özel', owned: 'Sahip olunan', sectionAvatars: 'Avatarlar', sectionThemes: 'Temalar', balance: 'Paralar' }
    , casino: { title: 'Casino' }
  },
  ru: {
    login: { slogan: 'Копи с умом, исполняй мечты.', title: 'С возвращением', email: 'E-mail', password: 'Пароль', button: 'Войти', registerBtn: 'Регистрация', forgotPassword: 'Забыли пароль?', resetTitle: 'Сброс пароля', resetButton: 'Отправить ссылку', backToLogin: 'Назад к входу', resetSuccess: 'E-mail отправлен!' },
    age: { title: 'Почти готово!', subtitle: 'Сколько тебе лет?', hint: 'Это не влияет на функции, а только подстраивает дизайн приложения под тебя.', confirm: 'Поехали', years: 'лет' },
    dashboard: { balance: 'Баланс', newPig: 'Новая копилка', myPigs: 'Мои копилки', praiseMessages: ['Супер!', 'Классно!', 'Отлично!'], adLabel: 'Совет', adTitle: 'Взрослая Копилка', adSubtitle: 'Каждая копейка важна', moreSavings: 'Копить больше', noPigs: 'Копилок нет', watchedPigs: 'Наблюдаемые копилки', removeGuestConfirm: 'Прекратить наблюдение?', pigs: 'Копилки' },
    detail: { history: 'История', confirm: 'Подтвердить', cancel: 'Отмена', errorNotEnough: 'Недостаточно средств', withdrawal: 'Снятие', available: 'Доступно', payout: 'Снять', newGoal: 'Новая цель', share: 'Распределение', noGoals: 'Целей нет', transactions: 'Транзакции', noTransactions: 'Нет транзакций', goal: 'Цель', achievements: 'Достижения', achievementsDesc: 'Твои награды', editGoal: 'Изменить цель', settingsTitle: 'Настройки', pigName: 'Имя', color: 'Цвет', delete: 'Удалить', payoutTitle: 'Снятие' },
    scanner: { loading: 'Загрузка...', modeGuest: 'Гость', title: 'Сканировать QR', modeOwner: 'Владелец', manual: 'Введите код' },
    settings: { title: 'Настройки', security: 'Безопасность', newPassword: 'Новый пароль', passwordSaved: 'Пароль сохранен', changePassword: 'Изменить пароль', appMode: 'Режим приложения', profile: 'Профиль', name: 'Имя', activeSpecials: 'Активные предметы', design: 'Дизайн', language: 'Язык', info: 'Инфо', version: 'Версия', logout: 'Выйти', logoutConfirm: 'Выйти?', cancel: 'Отмена' },
    common: { showLess: 'Меньше', showAll: 'Все', showAllColors: 'Цвета', greeting: 'Привет' },
    help: { appTutorial: 'Помощь по приложению', boxTutorial: 'Помощь по копилке' },
    learn: { sections: { basics: 'Основы', earning: 'Заработок', spending: 'Траты', saving: 'Накопления', safety: 'Безопасность' }, start: 'Начать' },
    shop: { title: 'Магaзин', subtitle: 'Купить предметы', specials: 'Особое', owned: 'Куплено', sectionAvatars: 'Аватары', sectionThemes: 'Темы', balance: 'Монеты' }
    , casino: { title: 'Казино' }
  },
  hu: {
    login: { slogan: 'Spórolj okosan, valósítsd meg az álmaidat.', title: 'Üdvözöljük újra', email: 'E-mail', password: 'Jelszó', button: 'Bejelentkezés', registerBtn: 'Regisztráció', forgotPassword: 'Elfelejtett jelszó?', resetTitle: 'Jelszó visszaállítása', resetButton: 'Link küldése', backToLogin: 'Vissza a belépéshez', resetSuccess: 'E-mail elküldve!' },
    age: { title: 'Majdnem kész!', subtitle: 'Hány éves oder?', hint: 'Ez nicht befolyásolja a funkciókat, nur das App-Design an dich anpassen.', confirm: 'Mehet', years: 'év' },
    dashboard: { balance: 'Egyenleg', newPig: 'Új malac', myPigs: 'Malacaim', praiseMessages: ['Szuper!', 'Nagyszerű!', 'Remek!'], adLabel: 'Tipp', adTitle: 'Felnőtt Megtakarítás', adSubtitle: 'Minden fillér számít', moreSavings: 'Spórolj többet', noPigs: 'Nincs malacod', watchedPigs: 'Megfigyelt malacok', removeGuestConfirm: 'Megfigyelés leállítása?', pigs: 'Malacok' },
    detail: { history: 'Előzmények', confirm: 'Megerősítés', cancel: 'Mégse', errorNotEnough: 'Nincs elég einyenleg', withdrawal: 'Kivétel', available: 'Elérhető', payout: 'Kivétel', newGoal: 'Új cél', share: 'Felosztás', noGoals: 'Nincsenek célok', transactions: 'Tranzakciók', noTransactions: 'Nincsenek tranzakciók', goal: 'Cél', achievements: 'Eredmények', achievementsDesc: 'Jutalmaid', editGoal: 'Cél szerkesztése', settingsTitle: 'Beállítások', pigName: 'Név', color: 'Szín', delete: 'Törlés', payoutTitle: 'Kivétel' },
    scanner: { loading: 'Betöltés...', modeGuest: 'Vendég', title: 'QR szkennelés', modeOwner: 'Tulajdonos', manual: 'Kód megadása' },
    settings: { title: 'Beállítások', security: 'Biztonság', newPassword: 'Új jelszó', passwordSaved: 'Jelszó elmentve', changePassword: 'Jelszó módosítása', appMode: 'App mód', profile: 'Profil', name: 'Név', activeSpecials: 'Aktiv tárgyak', design: 'Design', language: 'Nyelv', info: 'Infó', version: 'Verzió', logout: 'Kijelentkezés', logoutConfirm: 'Kijelentkezés?', cancel: 'Mégse' },
    common: { showLess: 'Kevesebb', showAll: 'Összes', showAllColors: 'Színek', greeting: 'Szia' },
    help: { appTutorial: 'App segítség', boxTutorial: 'Doboz segítség' },
    learn: { sections: { basics: 'Alapok', earning: 'Kereset', spending: 'Költés', saving: 'Megtakarítás', safety: 'Biztonság' }, start: 'Kezdés' },
    shop: { title: 'Bolt', subtitle: 'Tárgyak vásárlása', specials: 'Különleges', owned: 'Megvéve', sectionAvatars: 'Avatarok', sectionThemes: 'Témák', balance: 'Érmék' }
    , casino: { title: 'Casino' }
  }
};
