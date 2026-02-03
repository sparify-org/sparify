
import { Sparkles, Trophy, Snowflake, TrendingUp, ShieldCheck, Gift, Landmark, ShieldAlert, Crown, Rainbow, Zap, Star, Gem, Ticket, Shield, Frame, BadgeCheck } from 'lucide-react';

export type ThemeColor = 
  | 'red' | 'orange' | 'yellow' | 'green' | 'blue' | 'purple' | 'pink' | 'teal' 
  | 'cyan' | 'indigo' | 'lime' | 'rose' | 'fuchsia' | 'violet' | 'sky' | 'amber' | 'zinc'
  | 'mint' | 'gold' | 'black'
  | 'slate' | 'stone' | 'emerald' | 'cocoa' | 'lilac' | 'salmon' | 'ocean' | 'forest' | 'night' | 'berry' | 'primary';

export type Language = 'de' | 'en' | 'hr' | 'tr' | 'ru' | 'hu';
export type AppMode = 'kids' | 'adult';

export const CUSTOM_LOGO_URL = 'https://bejlqwebcujfklavoecm.supabase.co/storage/v1/object/public/Logo/SparifyLogo.png'; 
export const LOGIN_LOGO_URL = 'https://bejlqwebcujfklavoecm.supabase.co/storage/v1/object/public/Logo/SparifyLogoBlau.png';

export interface User {
  name: string;
  avatarId: number;
  email: string;
  trophies: number;
  coins: number;
  streak: number; 
  lastCompletedDate: string | null; 
  inventory: string[]; 
  unseenItems: string[]; 
  completedLevels: string[]; 
  claimedAchievements: string[]; 
  activeSpecials: string[]; 
  streakFreezeUntil?: string | null; 
  language: Language;
  age: number | null;
  birthdate: string | null;
  hasSeenTutorial: boolean;
  // Individual frame/title visibility preferences (stored locally; safe defaults if missing)
  activeFrames: string[]; // e.g. ['frame_wood', 'frame_silver', 'frame_gold']
  activeTitles: string[]; // e.g. ['tag_saver_pro', 'tag_money_magnet']
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
    category: 'profile' | 'piggy' | 'coupon' | 'tag' | 'frame' | 'streak';
    icon: any;
    color: string;
}

export const SPECIALS_DATABASE: SpecialItem[] = [
  {
    id: 'item_discount_coupon',
    // label/description moved to translations
    label: 'item_discount_coupon',
    description: 'item_discount_coupon',
    price: 80,
    category: 'coupon',
    icon: Ticket,
    color: 'text-orange-500'
  },
  {
    id: 'item_streak_freeze',
    label: 'Streakfreezer',
    description: 'Friert deine Streak für 24h ein. Schutz vor Verlust!',
    price: 120,
    category: 'streak',
    icon: Snowflake,
    color: 'text-blue-400'
  },
  {
    id: 'frame_wood',
    label: 'frame_wood',
    description: 'frame_wood',
    price: 150,
    category: 'frame',
    icon: Frame,
    color: 'text-amber-800'
  },
  {
    id: 'frame_silver',
    label: 'frame_silver',
    description: 'frame_silver',
    price: 300,
    category: 'frame',
    icon: Shield,
    color: 'text-slate-500'
  },
  {
    id: 'frame_gold',
    label: 'frame_gold',
    description: 'frame_gold',
    price: 600,
    category: 'frame',
    icon: Crown,
    color: 'text-yellow-500'
  },
  {
    id: 'tag_saver_pro',
    label: 'tag_saver_pro',
    description: 'tag_saver_pro',
    price: 100,
    category: 'tag',
    icon: BadgeCheck,
    color: 'text-blue-500'
  },
  {
    id: 'tag_money_magnet',
    label: 'tag_money_magnet',
    description: 'tag_money_magnet',
    price: 200,
    category: 'tag',
    icon: Zap,
    color: 'text-yellow-400'
  },
  {
    id: 'tag_future_boss',
    label: 'tag_future_boss',
    description: 'tag_future_boss',
    price: 400,
    category: 'tag',
    icon: Star,
    color: 'text-purple-500'
  }
];

// Per-item translations keys will be available via getTranslations(lang).shopItems[<id>].label/description

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
    description: 'Besitze deine erste Sparbox.',
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
  | 'SETTINGS' 
  | 'SCANNER' 
  | 'DETAIL'
  | 'BOX_TUTORIAL';

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
  'https://bejlqwebcujfklavoecm.supabase.co/storage/v1/object/public/Profile%20Pictures/avatar_18.png',
  'https://bejlqwebcujfklavoecm.supabase.co/storage/v1/object/public/Profile%20Pictures/avatar_19.png',
  'https://bejlqwebcujfklavoecm.supabase.co/storage/v1/object/public/Profile%20Pictures/avatar_20.png',
  'https://bejlqwebcujfklavoecm.supabase.co/storage/v1/object/public/Profile%20Pictures/avatar_21.png',
  'https://bejlqwebcujfklavoecm.supabase.co/storage/v1/object/public/Profile%20Pictures/avatar_22.png',
  'https://bejlqwebcujfklavoecm.supabase.co/storage/v1/object/public/Profile%20Pictures/avatar_23.png',
  'https://bejlqwebcujfklavoecm.supabase.co/storage/v1/object/public/Profile%20Pictures/avatar_24.png'
];

export const THEME_COLORS: { [key in ThemeColor]: string } = {
  red: 'bg-red-500', orange: 'bg-orange-500', yellow: 'bg-yellow-400', green: 'bg-green-500', blue: 'bg-blue-500', purple: 'bg-purple-500', pink: 'bg-pink-500', teal: 'bg-teal-500', cyan: 'bg-cyan-500', indigo: 'bg-indigo-500', lime: 'bg-lime-500', rose: 'bg-rose-500', fuchsia: 'bg-fuchsia-500', violet: 'bg-violet-600', sky: 'bg-sky-500', amber: 'bg-amber-500', zinc: 'bg-zinc-600', mint: 'bg-emerald-300', gold: 'bg-yellow-600', black: 'bg-slate-900', slate: 'bg-slate-500', stone: 'bg-stone-500', emerald: 'bg-emerald-600', cocoa: 'bg-amber-800', lilac: 'bg-purple-300', salmon: 'bg-rose-400', ocean: 'bg-cyan-700', forest: 'bg-green-800', night: 'bg-blue-950', berry: 'bg-pink-700', primary: 'bg-[#00B1B7]'
};

export const TRANSLATIONS: Record<Language, any> = {
  de: {
    login: {
      slogan: 'Schlau sparen, Träume erfüllen.',
      title: 'Willkommen zurück',
      email: 'E-Mail',
      password: 'Passwort',
      button: 'Einloggen',
      registerBtn: 'Konto erstellen',
      forgotPassword: 'Passwort vergessen?',
      resetTitle: 'Passwort zurücksetzen',
      resetButton: 'Link senden',
      backToLogin: 'Zurück zum Login',
      resetSuccess: 'E-Mail gesendet!',
      loginError: 'Das hat nicht geklappt. Bitte prüfe deine Daten.',
      resetError: 'Fehler beim Senden der Email.',
      registerTitle: 'Neues Konto',
      alreadyHaveAccount: 'Ich habe schon ein Konto',
      createNewAccount: 'Neues Konto erstellen',
      verifyTitle: 'Fast geschafft!',
      verifySentTo: 'Wir haben eine E-Mail geschickt an:',
      verifyHint: 'Bitte klicke auf den Link in der E-Mail, um deine Sparbox zu aktivieren!',
      goToLogin: 'Zum Login'
    },
    age: { title: 'Fast fertig!', subtitle: 'Wann hast du Geburtstag?', hint: 'Dies hat keinen Einfluss auf die Funktionen, es passt lediglich das Design der App an dich an.', confirm: 'Los geht\'s', years: 'Jahre', birthdate: 'Geburtsdatum' },
    dashboard: { balance: 'Kontostand', newPig: 'Neue Sparbox', myPigs: 'Meine Sparboxen', praiseMessages: ['Super!', 'Klasse!', 'Spitze!'], adLabel: 'Tipp', adTitle: 'Spar-Experte', adSubtitle: 'Jeder Cent zählt', moreSavings: 'Mehr sparen', noPigs: 'Keine Sparboxen vorhanden', watchedPigs: 'Beobachtete Sparboxen', removeGuestConfirm: 'Beobachtung beenden?', pigs: 'Sparboxen' },
    detail: { history: 'Verlauf', confirm: 'Bestätigen', cancel: 'Abbrechen', errorNotEnough: 'Guthaben zu niedrig', withdrawal: 'Auszahlung', available: 'Verfügbar', payout: 'Auszahlen', newGoal: 'Neuer Wunsch', share: 'Aufteilung', noGoals: 'Keine Wünsche', transactions: 'Transaktionen', noTransactions: 'Keine Transaktionen', goal: 'Wunsch', achievements: 'Erfolge', achievementsDesc: 'Deine Belohnungen', editGoal: 'Wunsch bearbeiten', settingsTitle: 'Einstellungen', pigName: 'Name', color: 'Farbe', delete: 'Löschen', payoutTitle: 'Auszahlung', successTitle: 'Erfolg!', balanceLabel: 'Kontostand', reasonLabel: 'Wofür ist das?', wishLabel: 'Was wünschst du dir?', costLabel: 'Was kostet das?', save: 'Speichern' },
    scanner: { loading: 'Kamera lädt...', modeGuest: 'Zuschauer', title: 'QR Scan', modeOwner: 'Besitzer', manual: 'Code eingeben' },
    settings: {
      title: 'Einstellungen',
      security: 'Sicherheit',
      newPassword: 'Neues Passwort',
      passwordSaved: 'Passwort gespeichert',
      changePassword: 'Passwort ändern',
      appMode: 'App Modus',
      profile: 'Profil',
      name: 'Name',
      activeSpecials: 'Aktive Items',
      design: 'Design',
      language: 'Sprache',
      info: 'Info',
      version: 'Version',
      logout: 'Abmelden',
      logoutConfirm: 'Abmelden?',
      cancel: 'Abbrechen',
      tags: 'Namens-Tags',
      frames: 'Profil-Rahmen',
      preferences: 'Einstellungen',
      avatarRings: 'Avatar-Rahmen anzeigen',
      shopTitles: 'Titel im Shop anzeigen',
      enabled: 'Aktiviert',
      disabled: 'Deaktiviert'
    },
    common: { showLess: 'Weniger', showAll: 'Alle', showAllColors: 'Farben', greeting: 'Hallo', next: 'Weiter', prev: 'Zurück', skip: 'Überspringen', finish: 'Fertig', close: 'Schließen' },
    sidebar: { dashboard: 'Übersicht', learn: 'Lernen & Spielen', shop: 'Shop', settings: 'Einstellungen', addAccount: 'Neue Sparbox', streakProtected: 'Streak geschützt' },
    help: { appTutorial: 'App-Hilfe', boxTutorial: 'Box-Hilfe' },
    boxTutorial: [
      { heading: "Startklar machen", bodyText: "Verbinde deine Sparbox per USB‑C mit dem Strom. Wenn das Display leuchtet, ist sie bereit." },
      { heading: "Verbinden", bodyText: "Öffne die App – sie sucht automatisch nach deiner Box. Ein kurzer Piepton bestätigt die Verbindung." },
      { heading: "Einzahlen", bodyText: "Stecke Münzen oder Scheine ein. Das Display erkennt den Betrag und zählt live mit." },
      { heading: "Sicher sparen", bodyText: "Dein digitales Schloss schützt dein Guthaben. In der App siehst du jederzeit, ob alles sicher ist." },
      { heading: "Personalisieren", bodyText: "Gestalte deine Sparbox mit Bausteinen und Effekten – und starte gleich mit deinem ersten Sparziel." }
    ],
    tutorial: {
      step0: { title: 'Willkommen bei Sparify!', text: 'In 60 Sekunden zeigen wir dir die wichtigsten Funktionen, damit du sofort loslegen kannst.' },
      step1: { title: 'Kontostand im Blick', text: 'Hier siehst du dein gesamtes Guthaben – ideal, um zu verfolgen, wie dein Sparen wächst.' },
      step2: { title: 'Sparboxen verwalten', text: 'Tippe auf eine Sparbox, um Details zu sehen, Ziele zu bearbeiten oder Geld auszuzahlen.' },
      step3: { title: 'Neue Box hinzufügen', text: 'Über das Plus kannst du eine Sparbox scannen oder einen Code manuell eingeben.' },
      step4: { title: 'Schnellnavigation', text: 'Wechsle unten zwischen Lernen, Shop und Einstellungen – alles mit einem Tipp.' }
    },
    learn: { sections: { basics: 'Basics', earning: 'Verdienen', spending: 'Ausgeben', saving: 'Sparen', safety: 'Sicherheit' }, start: 'Start', streakFrozen: 'Streak geschützt!' },
    shop: { title: 'Shop', subtitle: 'Items kaufen', specials: 'Specials', owned: 'Besitzt', sectionAvatars: 'Avatare', sectionThemes: 'Themes', balance: 'Guthaben', discountActive: '50% Rabatt aktiv!', couponAvailableTitle: 'Rabatt-Gutschein verfügbar!', couponAvailableHintOn: 'Wird beim nächsten Kauf eingelöst', couponAvailableHintOff: 'Klicke hier, um 50% zu sparen' },
    shopItems: {
      item_discount_coupon: { label: '50% Rabatt-Gutschein', description: 'Halbiert den Preis deines nächsten Einkaufs!' },
      item_streak_freeze: { label: 'Streakfreezer', description: 'Friert deine Streak für 24h ein.' },
      frame_wood: { label: 'Holz-Rahmen', description: 'Natürlicher Holzlook mit warmem Rahmen-Effekt.' },
      frame_silver: { label: 'Silber-Rahmen', description: 'Kühler, glänzender Rahmen mit edlem Silber-Look.' },
      frame_gold: { label: 'Gold-Rahmen', description: 'Der ultimative Status für Spar-Könige.' },
      tag_saver_pro: { label: 'Spar-Profi', description: 'Zeige allen, dass du dein Geld im Griff hast.' },
      tag_money_magnet: { label: 'Münz-Magnet', description: 'Du ziehst das Geld förmlich an!' },
      tag_future_boss: { label: 'Zukunfts-Boss', description: 'Große Träume erfordern große Disziplin.' }
    }
  },
  en: {
    login: { slogan: 'Smart saving, big dreams.', title: 'Welcome back', email: 'Email', password: 'Password', button: 'Login', registerBtn: 'Register', forgotPassword: 'Forgot password?', resetTitle: 'Reset password', resetButton: 'Send link', backToLogin: 'Back to login', resetSuccess: 'Email sent!', loginError: 'That didn’t work. Please check your details.', resetError: 'Failed to send email.', registerTitle: 'Create account', alreadyHaveAccount: 'I already have an account', createNewAccount: 'Create new account', verifyTitle: 'Almost done!', verifySentTo: 'We sent an email to:', verifyHint: 'Please click the link in the email to activate your piggy bank!', goToLogin: 'Go to login' },
    age: { title: 'Almost there!', subtitle: 'When is your birthday?', hint: 'This doesn\'t affect features, it only adjusts the app design for you.', confirm: 'Let\'s go', years: 'years', birthdate: 'Birthdate' },
    dashboard: { balance: 'Balance', newPig: 'New Pig', myPigs: 'My Piggies', praiseMessages: ['Great!', 'Awesome!', 'Nice!'], adLabel: 'Ad', adTitle: 'Savings Expert', adSubtitle: 'Every cent counts', moreSavings: 'Save more', noPigs: 'No piggies yet', watchedPigs: 'Watched Piggies', removeGuestConfirm: 'Stop watching?', pigs: 'Piggies' },
    detail: { history: 'History', confirm: 'Confirm', cancel: 'Cancel', errorNotEnough: 'Not enough balance', withdrawal: 'Withdrawal', available: 'Available', payout: 'Withdraw', newGoal: 'New Goal', share: 'Allocation', noGoals: 'No goals', transactions: 'Transactions', noTransactions: 'No transactions', goal: 'Goal', achievements: 'Achievements', achievementsDesc: 'Your rewards', editGoal: 'Edit goal', settingsTitle: 'Settings', pigName: 'Name', color: 'Color', delete: 'Delete', payoutTitle: 'Withdrawal', successTitle: 'Success!', balanceLabel: 'Balance', reasonLabel: 'Reason', wishLabel: 'Wish', costLabel: 'Cost', save: 'Save' },
    scanner: { loading: 'Loading...', modeGuest: 'Guest', title: 'Scan QR', modeOwner: 'Owner', manual: 'Enter code' },
    settings: {
      title: 'Settings',
      security: 'Security',
      newPassword: 'New Password',
      passwordSaved: 'Password saved',
      changePassword: 'Change password',
      appMode: 'App Mode',
      profile: 'Profile',
      name: 'Name',
      activeSpecials: 'Active items',
      design: 'Design',
      language: 'Language',
      info: 'Info',
      version: 'Version',
      logout: 'Logout',
      logoutConfirm: 'Logout?',
      cancel: 'Cancel',
      tags: 'Name Tags',
      frames: 'Profile Frames',
      preferences: 'Preferences',
      avatarRings: 'Show avatar rings',
      shopTitles: 'Show shop titles',
      enabled: 'Enabled',
      disabled: 'Disabled'
    },
    common: { showLess: 'Show less', showAll: 'Show all', showAllColors: 'Show colors', greeting: 'Hello', next: 'Next', prev: 'Back', skip: 'Skip', finish: 'Finish', close: 'Close' },
    sidebar: { dashboard: 'Dashboard', learn: 'Learn & Play', shop: 'Shop', settings: 'Settings', addAccount: 'Add account', streakProtected: 'Streak protected' },
    help: { appTutorial: 'App Guide', boxTutorial: 'Box Guide' },
    boxTutorial: [
      { heading: "Power up", bodyText: "Connect your piggy bank via USB‑C. When the display lights up, it's ready." },
      { heading: "Connect", bodyText: "Open the app and wait for the short beep – it confirms the connection." },
      { heading: "Deposit", bodyText: "Insert coins or bills. The display recognizes the value and counts live." },
      { heading: "Stay secure", bodyText: "Your digital lock protects your savings. The app shows the lock status at a glance." },
      { heading: "Make it yours", bodyText: "Customize your piggy bank with blocks and effects, then start your first savings goal." }
    ],
    tutorial: {
      step0: { title: 'Welcome to Sparify!', text: 'In under a minute, learn the essentials so you can start saving right away.' },
      step1: { title: 'Balance overview', text: 'Track your total savings here and watch your progress grow.' },
      step2: { title: 'Manage piggies', text: 'Tap a piggy bank to view details, edit goals, or withdraw money.' },
      step3: { title: 'Add a new box', text: 'Use the Plus button to scan a new piggy bank or enter a code manually.' },
      step4: { title: 'Quick navigation', text: 'Use the bottom bar to jump between Learn, Shop, and Settings.' }
    },
    learn: { sections: { basics: 'Basics', earning: 'Earning', spending: 'Spending', saving: 'Saving', safety: 'Safety' }, start: 'Start', streakFrozen: 'Streak Protected!' },
    shop: { title: 'Shop', subtitle: 'Buy items', specials: 'Specials', owned: 'Owned', sectionAvatars: 'Avatars', sectionThemes: 'Themes', balance: 'Balance', discountActive: '50% Discount active!', couponAvailableTitle: 'Discount coupon available!', couponAvailableHintOn: 'Will be applied to your next purchase', couponAvailableHintOff: 'Click here to save 50%' },
    shopItems: {
      item_discount_coupon: { label: '50% Discount Coupon', description: 'Halves the price of your next purchase!' },
      item_streak_freeze: { label: 'Streak Freezer', description: 'Freezes your streak for 24h.' },
      frame_wood: { label: 'Wood Frame', description: 'Warm wooden look with a cozy frame effect.' },
      frame_silver: { label: 'Silver Frame', description: 'Clean, shiny silver look with a premium edge.' },
      frame_gold: { label: 'Gold Frame', description: 'The ultimate status frame.' },
      tag_saver_pro: { label: 'Saver Pro', description: 'Show everyone you control your money.' },
      tag_money_magnet: { label: 'Money Magnet', description: 'You attract coins!' },
      tag_future_boss: { label: 'Future Boss', description: 'Big dreams require discipline.' }
    }
  },
  hr: {
    login: {
      slogan: 'Pametna štednja, veliki snovi.',
      title: 'Dobrodošli natrag',
      email: 'E-pošta',
      password: 'Lozinka',
      button: 'Prijava',
      registerBtn: 'Registriraj se',
      forgotPassword: 'Zaboravili ste lozinku?',
      resetTitle: 'Resetiraj lozinku',
      resetButton: 'Pošalji link',
      backToLogin: 'Natrag na prijavu',
      resetSuccess: 'E-pošta poslana!',
      loginError: 'Neuspješno. Provjeri podatke.',
      resetError: 'Slanje e-pošte nije uspjelo.',
      registerTitle: 'Novi račun',
      alreadyHaveAccount: 'Već imam račun',
      createNewAccount: 'Kreiraj novi račun',
      verifyTitle: 'Još malo!',
      verifySentTo: 'Poslali smo e-poštu na:',
      verifyHint: 'Klikni na link u e‑pošti za aktivaciju štedne kutije!',
      goToLogin: 'Na prijavu'
    },
    age: { title: 'Skoro spremni!', subtitle: 'Kada ti je rođendan?', hint: 'Ovo ne mijenja funkcije, samo prilagođava dizajn.', confirm: 'Krenimo', years: 'godina', birthdate: 'Datum rođenja' },
    dashboard: { balance: 'Stanje', newPig: 'Nova štedna kutija', myPigs: 'Moje kutije', praiseMessages: ['Super!', 'Bravo!', 'Odlično!'], adLabel: 'Savjet', adTitle: 'Stručnjak za štednju', adSubtitle: 'Svaki cent vrijedi', moreSavings: 'Štedi više', noPigs: 'Nema štednih kutija', watchedPigs: 'Praćene kutije', removeGuestConfirm: 'Prekinuti praćenje?', pigs: 'Štedne kutije' },
    detail: { history: 'Povijest', confirm: 'Potvrdi', cancel: 'Odustani', errorNotEnough: 'Nedovoljno sredstava', withdrawal: 'Isplata', available: 'Dostupno', payout: 'Isplati', newGoal: 'Nova želja', share: 'Raspodjela', noGoals: 'Nema želja', transactions: 'Transakcije', noTransactions: 'Nema transakcija', goal: 'Želja', achievements: 'Postignuća', achievementsDesc: 'Tvoje nagrade', editGoal: 'Uredi želju', settingsTitle: 'Postavke', pigName: 'Naziv', color: 'Boja', delete: 'Izbriši', payoutTitle: 'Isplata', successTitle: 'Uspjeh!', balanceLabel: 'Stanje', reasonLabel: 'Za što je?', wishLabel: 'Što želiš?', costLabel: 'Koliko košta?', save: 'Spremi' },
    scanner: { loading: 'Učitavanje...', modeGuest: 'Gost', title: 'Skeniraj QR', modeOwner: 'Vlasnik', manual: 'Unesi kod' },
    settings: {
      title: 'Postavke',
      security: 'Sigurnost',
      newPassword: 'Nova lozinka',
      passwordSaved: 'Lozinka spremljena',
      changePassword: 'Promijeni lozinku',
      appMode: 'Način aplikacije',
      profile: 'Profil',
      name: 'Ime',
      activeSpecials: 'Aktivni predmeti',
      design: 'Dizajn',
      language: 'Jezik',
      info: 'Info',
      version: 'Verzija',
      logout: 'Odjava',
      logoutConfirm: 'Odjaviti se?',
      cancel: 'Odustani',
      tags: 'Nazivni tagovi',
      frames: 'Okviri profila',
      preferences: 'Postavke',
      avatarRings: 'Prikaži okvire avatara',
      shopTitles: 'Prikaži naslove u shopu',
      enabled: 'Uključeno',
      disabled: 'Isključeno'
    },
    common: { showLess: 'Manje', showAll: 'Sve', showAllColors: 'Boje', greeting: 'Bok', next: 'Dalje', prev: 'Natrag', skip: 'Preskoči', finish: 'Gotovo', close: 'Zatvori' },
    sidebar: { dashboard: 'Pregled', learn: 'Uči i igraj', shop: 'Shop', settings: 'Postavke', addAccount: 'Dodaj kutiju', streakProtected: 'Streak zaštićen' },
    help: { appTutorial: 'Vodič za aplikaciju', boxTutorial: 'Vodič za kutiju' },
    boxTutorial: [
      { heading: 'Pokreni kutiju', bodyText: 'Spoji štednu kutiju USB‑C kabelom. Kad se zaslon upali, spremna je.' },
      { heading: 'Poveži se', bodyText: 'Otvori aplikaciju i pričekaj kratki zvučni signal – veza je uspostavljena.' },
      { heading: 'Uplata', bodyText: 'Ubaci kovanice ili novčanice. Zaslon prepoznaje iznos i broji uživo.' },
      { heading: 'Sigurnost', bodyText: 'Digitalna brava štiti tvoju ušteđevinu. Status vidiš u aplikaciji.' },
      { heading: 'Personaliziraj', bodyText: 'Uredi kutiju efektima i kreni s prvim ciljem štednje.' }
    ],
    tutorial: {
      step0: { title: 'Dobrodošli u Sparify!', text: 'U manje od minute nauči osnove i odmah kreni štedjeti.' },
      step1: { title: 'Pregled stanja', text: 'Ovdje pratiš ukupnu ušteđevinu i napredak.' },
      step2: { title: 'Upravljanje kutijama', text: 'Dodirni kutiju za detalje, ciljeve ili isplatu.' },
      step3: { title: 'Dodaj novu kutiju', text: 'Plus gumbom skeniraj kutiju ili unesi kod ručno.' },
      step4: { title: 'Brza navigacija', text: 'Donja traka vodi do Učenja, Shopa i Postavki.' }
    },
    learn: { sections: { basics: 'Osnove', earning: 'Zarada', spending: 'Trošenje', saving: 'Štednja', safety: 'Sigurnost' }, start: 'Kreni', streakFrozen: 'Streak zaštićen!' },
    shop: { title: 'Trgovina', subtitle: 'Kupuj predmete', specials: 'Specijali', owned: 'Posjeduješ', sectionAvatars: 'Avatari', sectionThemes: 'Teme', balance: 'Stanje', discountActive: '50% popusta aktivno!', couponAvailableTitle: 'Kupon za popust dostupan!', couponAvailableHintOn: 'Primijenit će se pri sljedećoj kupnji', couponAvailableHintOff: 'Klikni ovdje za 50% popusta' },
    shopItems: {
      item_discount_coupon: { label: 'Kupon za 50% popusta', description: 'Prepolovi cijenu sljedeće kupnje!' },
      item_streak_freeze: { label: 'Zamrzivač streaka', description: 'Zamrzava streak na 24h.' },
      frame_wood: { label: 'Drveni okvir', description: 'Topli drveni izgled s ugodnim okvirom.' },
      frame_silver: { label: 'Srebrni okvir', description: 'Sjajni srebrni izgled s elegantnim rubom.' },
      frame_gold: { label: 'Zlatni okvir', description: 'Ultimativni statusni okvir.' },
      tag_saver_pro: { label: 'Štedni Pro', description: 'Pokaži da imaš kontrolu nad novcem.' },
      tag_money_magnet: { label: 'Magnet za novac', description: 'Novac te jednostavno prati!' },
      tag_future_boss: { label: 'Budući šef', description: 'Veliki snovi traže disciplinu.' }
    }
  },
  tr: {
    login: {
      slogan: 'Akıllı tasarruf, büyük hayaller.',
      title: 'Tekrar hoş geldiniz',
      email: 'E-posta',
      password: 'Şifre',
      button: 'Giriş',
      registerBtn: 'Kayıt ol',
      forgotPassword: 'Şifremi unuttum',
      resetTitle: 'Şifre sıfırla',
      resetButton: 'Bağlantı gönder',
      backToLogin: 'Girişe dön',
      resetSuccess: 'E-posta gönderildi!',
      loginError: 'Başarısız. Bilgileri kontrol edin.',
      resetError: 'E-posta gönderilemedi.',
      registerTitle: 'Yeni hesap',
      alreadyHaveAccount: 'Zaten hesabım var',
      createNewAccount: 'Yeni hesap oluştur',
      verifyTitle: 'Neredeyse bitti!',
      verifySentTo: 'Şu adrese e-posta gönderdik:',
      verifyHint: 'Hesabı etkinleştirmek için e-postadaki bağlantıya tıklayın!',
      goToLogin: 'Girişe git'
    },
    age: { title: 'Neredeyse hazır!', subtitle: 'Doğum günün ne zaman?', hint: 'Bu sadece tasarımı etkiler, özellikleri etkilemez.', confirm: 'Hadi başlayalım', years: 'yaş', birthdate: 'Doğum tarihi' },
    dashboard: { balance: 'Bakiye', newPig: 'Yeni kumbara', myPigs: 'Kumbaralarım', praiseMessages: ['Harika!', 'Süper!', 'Mükemmel!'], adLabel: 'İpucu', adTitle: 'Tasarruf Uzmanı', adSubtitle: 'Her kuruş değerli', moreSavings: 'Daha çok biriktir', noPigs: 'Kumbara yok', watchedPigs: 'İzlenen kumbaralar', removeGuestConfirm: 'İzlemeyi durdur?', pigs: 'Kumbaralar' },
    detail: { history: 'Geçmiş', confirm: 'Onayla', cancel: 'İptal', errorNotEnough: 'Yetersiz bakiye', withdrawal: 'Çekim', available: 'Kullanılabilir', payout: 'Çek', newGoal: 'Yeni hedef', share: 'Dağıtım', noGoals: 'Hedef yok', transactions: 'İşlemler', noTransactions: 'İşlem yok', goal: 'Hedef', achievements: 'Başarılar', achievementsDesc: 'Ödüllerin', editGoal: 'Hedefi düzenle', settingsTitle: 'Ayarlar', pigName: 'İsim', color: 'Renk', delete: 'Sil', payoutTitle: 'Çekim', successTitle: 'Başarılı!', balanceLabel: 'Bakiye', reasonLabel: 'Ne için?', wishLabel: 'Ne istiyorsun?', costLabel: 'Ne kadar?', save: 'Kaydet' },
    scanner: { loading: 'Kamera yükleniyor...', modeGuest: 'Misafir', title: 'QR Tara', modeOwner: 'Sahip', manual: 'Kod gir' },
    settings: {
      title: 'Ayarlar',
      security: 'Güvenlik',
      newPassword: 'Yeni şifre',
      passwordSaved: 'Şifre kaydedildi',
      changePassword: 'Şifre değiştir',
      appMode: 'Uygulama modu',
      profile: 'Profil',
      name: 'İsim',
      activeSpecials: 'Aktif öğeler',
      design: 'Tasarım',
      language: 'Dil',
      info: 'Bilgi',
      version: 'Sürüm',
      logout: 'Çıkış',
      logoutConfirm: 'Çıkış yapılsın mı?',
      cancel: 'İptal',
      tags: 'İsim etiketleri',
      frames: 'Profil çerçeveleri',
      preferences: 'Tercihler',
      avatarRings: 'Avatar çerçevelerini göster',
      shopTitles: 'Mağaza unvanlarını göster',
      enabled: 'Açık',
      disabled: 'Kapalı'
    },
    common: { showLess: 'Daha az', showAll: 'Tümü', showAllColors: 'Renkler', greeting: 'Merhaba', next: 'İleri', prev: 'Geri', skip: 'Geç', finish: 'Bitir', close: 'Kapat' },
    sidebar: { dashboard: 'Gösterge paneli', learn: 'Öğren & Oyna', shop: 'Mağaza', settings: 'Ayarlar', addAccount: 'Kumbara ekle', streakProtected: 'Seri korundu' },
    help: { appTutorial: 'Uygulama Rehberi', boxTutorial: 'Kutu Rehberi' },
    boxTutorial: [
      { heading: 'Gücü bağla', bodyText: 'Kumbrayı USB‑C ile bağla. Ekran yanınca hazırdır.' },
      { heading: 'Bağlan', bodyText: 'Uygulamayı aç ve kısa bip sesini bekle – bağlantı kuruldu.' },
      { heading: 'Para yatır', bodyText: 'Bozuk para ya da banknot yerleştir. Ekran değeri tanır.' },
      { heading: 'Güvende tut', bodyText: 'Dijital kilit birikimini korur. Durum uygulamada görünür.' },
      { heading: 'Kişiselleştir', bodyText: 'Kutunu efektlerle süsle ve ilk hedefini başlat.' }
    ],
    tutorial: {
      step0: { title: 'Sparify’a hoş geldin!', text: '1 dakikadan kısa sürede temel adımları öğren.' },
      step1: { title: 'Bakiye görünümü', text: 'Toplam birikimini burada takip edebilirsin.' },
      step2: { title: 'Kumbaraları yönet', text: 'Detaylar, hedefler ve çekim için kumbaraya dokun.' },
      step3: { title: 'Yeni kutu ekle', text: 'Plus ile yeni kutu tara veya kod gir.' },
      step4: { title: 'Hızlı gezinme', text: 'Alt menüden Öğren, Mağaza ve Ayarlara geç.' }
    },
    learn: { sections: { basics: 'Temeller', earning: 'Kazanma', spending: 'Harcama', saving: 'Birikim', safety: 'Güvenlik' }, start: 'Başla', streakFrozen: 'Seri korundu!' },
    shop: { title: 'Mağaza', subtitle: 'Öğe satın al', specials: 'Özel', owned: 'Sahip', sectionAvatars: 'Avatarlar', sectionThemes: 'Temalar', balance: 'Bakiye', discountActive: '%50 indirim aktif!', couponAvailableTitle: 'İndirim kuponu mevcut!', couponAvailableHintOn: 'Sonraki alışverişte uygulanır', couponAvailableHintOff: '%50 tasarruf için tıkla' },
    shopItems: {
      item_discount_coupon: { label: '%50 İndirim Kuponu', description: 'Bir sonraki alışverişin fiyatını yarıya indirir!' },
      item_streak_freeze: { label: 'Seri Dondurucu', description: 'Serini 24 saat dondurur.' },
      frame_wood: { label: 'Ahşap Çerçeve', description: 'Sıcak ahşap görünümü ve şık çerçeve.' },
      frame_silver: { label: 'Gümüş Çerçeve', description: 'Parlak gümüş görünümü ve premium kenar.' },
      frame_gold: { label: 'Altın Çerçeve', description: 'En üst seviye statü çerçevesi.' },
      tag_saver_pro: { label: 'Tasarruf Pro', description: 'Paranı kontrol ettiğini göster.' },
      tag_money_magnet: { label: 'Para Mıknatısı', description: 'Parayı kendine çekersin!' },
      tag_future_boss: { label: 'Geleceğin Patronu', description: 'Büyük hayaller disiplin ister.' }
    }
  },
  ru: {
    login: {
      slogan: 'Умная экономия, большие мечты.',
      title: 'С возвращением',
      email: 'Эл. почта',
      password: 'Пароль',
      button: 'Войти',
      registerBtn: 'Регистрация',
      forgotPassword: 'Забыли пароль?',
      resetTitle: 'Сбросить пароль',
      resetButton: 'Отправить ссылку',
      backToLogin: 'Назад ко входу',
      resetSuccess: 'Письмо отправлено!',
      loginError: 'Не удалось. Проверьте данные.',
      resetError: 'Не удалось отправить письмо.',
      registerTitle: 'Новый аккаунт',
      alreadyHaveAccount: 'У меня уже есть аккаунт',
      createNewAccount: 'Создать аккаунт',
      verifyTitle: 'Почти готово!',
      verifySentTo: 'Мы отправили письмо на:',
      verifyHint: 'Нажмите на ссылку в письме, чтобы активировать копилку!',
      goToLogin: 'Ко входу'
    },
    age: { title: 'Почти готово!', subtitle: 'Когда у тебя день рождения?', hint: 'Это не влияет на функции, только на дизайн.', confirm: 'Поехали', years: 'лет', birthdate: 'Дата рождения' },
    dashboard: { balance: 'Баланс', newPig: 'Новая копилка', myPigs: 'Мои копилки', praiseMessages: ['Супер!', 'Отлично!', 'Класс!'], adLabel: 'Совет', adTitle: 'Эксперт по экономии', adSubtitle: 'Каждый цент важен', moreSavings: 'Сэкономить больше', noPigs: 'Копилок нет', watchedPigs: 'Наблюдаемые копилки', removeGuestConfirm: 'Прекратить наблюдение?', pigs: 'Копилки' },
    detail: { history: 'История', confirm: 'Подтвердить', cancel: 'Отмена', errorNotEnough: 'Недостаточно средств', withdrawal: 'Снятие', available: 'Доступно', payout: 'Снять', newGoal: 'Новая цель', share: 'Распределение', noGoals: 'Нет целей', transactions: 'Транзакции', noTransactions: 'Нет транзакций', goal: 'Цель', achievements: 'Достижения', achievementsDesc: 'Твои награды', editGoal: 'Редактировать цель', settingsTitle: 'Настройки', pigName: 'Имя', color: 'Цвет', delete: 'Удалить', payoutTitle: 'Снятие', successTitle: 'Успешно!', balanceLabel: 'Баланс', reasonLabel: 'Для чего?', wishLabel: 'Что хочешь?', costLabel: 'Сколько стоит?', save: 'Сохранить' },
    scanner: { loading: 'Камера загружается...', modeGuest: 'Гость', title: 'Сканировать QR', modeOwner: 'Владелец', manual: 'Ввести код' },
    settings: {
      title: 'Настройки',
      security: 'Безопасность',
      newPassword: 'Новый пароль',
      passwordSaved: 'Пароль сохранен',
      changePassword: 'Изменить пароль',
      appMode: 'Режим приложения',
      profile: 'Профиль',
      name: 'Имя',
      activeSpecials: 'Активные предметы',
      design: 'Дизайн',
      language: 'Язык',
      info: 'Информация',
      version: 'Версия',
      logout: 'Выйти',
      logoutConfirm: 'Выйти из аккаунта?',
      cancel: 'Отмена',
      tags: 'Теги имен',
      frames: 'Рамки профиля',
      preferences: 'Настройки',
      avatarRings: 'Показывать рамки аватара',
      shopTitles: 'Показывать титулы из магазина',
      enabled: 'Вкл.',
      disabled: 'Выкл.'
    },
    common: { showLess: 'Меньше', showAll: 'Все', showAllColors: 'Цвета', greeting: 'Привет', next: 'Далее', prev: 'Назад', skip: 'Пропустить', finish: 'Готово', close: 'Закрыть' },
    sidebar: { dashboard: 'Обзор', learn: 'Учиться и играть', shop: 'Магазин', settings: 'Настройки', addAccount: 'Добавить копилку', streakProtected: 'Серия защищена' },
    help: { appTutorial: 'Гид по приложению', boxTutorial: 'Гид по копилке' },
    boxTutorial: [
      { heading: 'Включите питание', bodyText: 'Подключите копилку через USB‑C. Когда загорится экран, она готова.' },
      { heading: 'Подключение', bodyText: 'Откройте приложение и дождитесь короткого сигнала — связь установлена.' },
      { heading: 'Пополнение', bodyText: 'Вставьте монеты или купюры. Экран распознает сумму.' },
      { heading: 'Безопасность', bodyText: 'Цифровой замок защищает сбережения. Статус виден в приложении.' },
      { heading: 'Персонализация', bodyText: 'Украсьте копилку эффектами и начните первую цель.' }
    ],
    tutorial: {
      step0: { title: 'Добро пожаловать в Sparify!', text: 'За минуту освоите базовые функции и начнете копить.' },
      step1: { title: 'Обзор баланса', text: 'Здесь виден общий баланс и рост накоплений.' },
      step2: { title: 'Управление копилками', text: 'Нажмите на копилку для деталей, целей или снятия.' },
      step3: { title: 'Добавить копилку', text: 'Кнопка плюс: сканирование или ручной ввод кода.' },
      step4: { title: 'Быстрая навигация', text: 'Нижняя панель: обучение, магазин, настройки.' }
    },
    learn: { sections: { basics: 'Основы', earning: 'Заработок', spending: 'Траты', saving: 'Сбережения', safety: 'Безопасность' }, start: 'Начать', streakFrozen: 'Серия защищена!' },
    shop: { title: 'Магазин', subtitle: 'Покупка предметов', specials: 'Специальное', owned: 'Есть', sectionAvatars: 'Аватары', sectionThemes: 'Темы', balance: 'Баланс', discountActive: 'Скидка 50% активна!', couponAvailableTitle: 'Доступен купон!', couponAvailableHintOn: 'Применится при следующей покупке', couponAvailableHintOff: 'Нажмите, чтобы сэкономить 50%' },
    shopItems: {
      item_discount_coupon: { label: 'Купон на 50%', description: 'Снижает цену следующей покупки вдвое!' },
      item_streak_freeze: { label: 'Заморозка серии', description: 'Замораживает серию на 24 часа.' },
      frame_wood: { label: 'Деревянная рамка', description: 'Теплый деревянный стиль с уютным эффектом.' },
      frame_silver: { label: 'Серебряная рамка', description: 'Чистый серебряный стиль с премиальным краем.' },
      frame_gold: { label: 'Золотая рамка', description: 'Максимальный статусный стиль.' },
      tag_saver_pro: { label: 'Профи по экономии', description: 'Покажи, что контролируешь деньги.' },
      tag_money_magnet: { label: 'Магнит для денег', description: 'Деньги тянутся к тебе!' },
      tag_future_boss: { label: 'Будущий босс', description: 'Большие мечты требуют дисциплины.' }
    }
  },
  hu: {
    login: {
      slogan: 'Okos megtakarítás, nagy álmok.',
      title: 'Üdvözlünk újra',
      email: 'E-mail',
      password: 'Jelszó',
      button: 'Belépés',
      registerBtn: 'Regisztráció',
      forgotPassword: 'Elfelejtett jelszó?',
      resetTitle: 'Jelszó visszaállítás',
      resetButton: 'Link küldése',
      backToLogin: 'Vissza a belépéshez',
      resetSuccess: 'E-mail elküldve!',
      loginError: 'Nem sikerült. Ellenőrizd az adatokat.',
      resetError: 'Nem sikerült elküldeni az e-mailt.',
      registerTitle: 'Új fiók',
      alreadyHaveAccount: 'Már van fiókom',
      createNewAccount: 'Új fiók létrehozása',
      verifyTitle: 'Már majdnem kész!',
      verifySentTo: 'E-mailt küldtünk ide:',
      verifyHint: 'Kattints az e-mailben lévő linkre a malacpersely aktiválásához!',
      goToLogin: 'Belépéshez'
    },
    age: { title: 'Majdnem kész!', subtitle: 'Mikor van a születésnapod?', hint: 'Ez csak a dizájnt befolyásolja, a funkciókat nem.', confirm: 'Indulás', years: 'év', birthdate: 'Születési dátum' },
    dashboard: { balance: 'Egyenleg', newPig: 'Új persely', myPigs: 'Perselyeim', praiseMessages: ['Szuper!', 'Remek!', 'Ügyes!'], adLabel: 'Tipp', adTitle: 'Megtakarítási szakértő', adSubtitle: 'Minden cent számít', moreSavings: 'Takaríts meg többet', noPigs: 'Nincs persely', watchedPigs: 'Figyelt perselyek', removeGuestConfirm: 'Megfigyelés befejezése?', pigs: 'Perselyek' },
    detail: { history: 'Előzmények', confirm: 'Megerősítés', cancel: 'Mégse', errorNotEnough: 'Nincs elég egyenleg', withdrawal: 'Kifizetés', available: 'Elérhető', payout: 'Kifizet', newGoal: 'Új cél', share: 'Elosztás', noGoals: 'Nincsenek célok', transactions: 'Tranzakciók', noTransactions: 'Nincsenek tranzakciók', goal: 'Cél', achievements: 'Eredmények', achievementsDesc: 'Jutalmaid', editGoal: 'Cél szerkesztése', settingsTitle: 'Beállítások', pigName: 'Név', color: 'Szín', delete: 'Törlés', payoutTitle: 'Kifizetés', successTitle: 'Siker!', balanceLabel: 'Egyenleg', reasonLabel: 'Mire?', wishLabel: 'Mit szeretnél?', costLabel: 'Mennyibe kerül?', save: 'Mentés' },
    scanner: { loading: 'Kamera betöltése...', modeGuest: 'Vendég', title: 'QR beolvasás', modeOwner: 'Tulaj', manual: 'Kód megadása' },
    settings: {
      title: 'Beállítások',
      security: 'Biztonság',
      newPassword: 'Új jelszó',
      passwordSaved: 'Jelszó elmentve',
      changePassword: 'Jelszó módosítása',
      appMode: 'App mód',
      profile: 'Profil',
      name: 'Név',
      activeSpecials: 'Aktív elemek',
      design: 'Dizájn',
      language: 'Nyelv',
      info: 'Infó',
      version: 'Verzió',
      logout: 'Kijelentkezés',
      logoutConfirm: 'Kijelentkezés?',
      cancel: 'Mégse',
      tags: 'Névcímkék',
      frames: 'Profilkeretek',
      preferences: 'Beállítások',
      avatarRings: 'Avatar keretek megjelenítése',
      shopTitles: 'Bolt címek megjelenítése',
      enabled: 'Bekapcsolva',
      disabled: 'Kikapcsolva'
    },
    common: { showLess: 'Kevesebb', showAll: 'Összes', showAllColors: 'Színek', greeting: 'Szia', next: 'Tovább', prev: 'Vissza', skip: 'Kihagy', finish: 'Kész', close: 'Bezárás' },
    sidebar: { dashboard: 'Áttekintés', learn: 'Tanulás és játék', shop: 'Bolt', settings: 'Beállítások', addAccount: 'Persely hozzáadása', streakProtected: 'Streak védett' },
    help: { appTutorial: 'Alkalmazás útmutató', boxTutorial: 'Persely útmutató' },
    boxTutorial: [
      { heading: 'Indítás', bodyText: 'Csatlakoztasd USB‑C‑vel. Ha világít a kijelző, készen áll.' },
      { heading: 'Kapcsolódás', bodyText: 'Nyisd meg az appot és várd meg a rövid hangjelzést.' },
      { heading: 'Befizetés', bodyText: 'Dobj be érmét vagy bankjegyet – a kijelző felismeri az összeget.' },
      { heading: 'Biztonság', bodyText: 'A digitális zár védi a megtakarításodat. Az állapot látszik az appban.' },
      { heading: 'Személyre szabás', bodyText: 'Díszítsd a perselyt és indítsd az első célodat.' }
    ],
    tutorial: {
      step0: { title: 'Üdv a Sparifyban!', text: 'Kevesebb mint egy perc alatt megismered a lényeget.' },
      step1: { title: 'Egyenleg áttekintés', text: 'Itt látod a teljes megtakarításodat.' },
      step2: { title: 'Perselyek kezelése', text: 'Érintsd meg a perselyt részletekhez, célokhoz vagy kifizetéshez.' },
      step3: { title: 'Új persely hozzáadása', text: 'A plusz gombbal szkennelj vagy adj meg kódot.' },
      step4: { title: 'Gyors navigáció', text: 'Az alsó sávon elérhető a Tanulás, Bolt és Beállítások.' }
    },
    learn: { sections: { basics: 'Alapok', earning: 'Kereset', spending: 'Költés', saving: 'Megtakarítás', safety: 'Biztonság' }, start: 'Indítás', streakFrozen: 'Streak védett!' },
    shop: { title: 'Bolt', subtitle: 'Tárgyak vásárlása', specials: 'Különleges', owned: 'Birtokolt', sectionAvatars: 'Avatarok', sectionThemes: 'Témák', balance: 'Egyenleg', discountActive: '50% kedvezmény aktív!', couponAvailableTitle: 'Kupon elérhető!', couponAvailableHintOn: 'A következő vásárlásnál érvényes', couponAvailableHintOff: 'Kattints ide 50% kedvezményért' },
    shopItems: {
      item_discount_coupon: { label: '50% kedvezmény kupon', description: 'Felezi a következő vásárlás árát!' },
      item_streak_freeze: { label: 'Streak fagyasztó', description: '24 órára befagyasztja a streaket.' },
      frame_wood: { label: 'Fa keret', description: 'Meleg fa megjelenés, barátságos kerethatással.' },
      frame_silver: { label: 'Ezüst keret', description: 'Letisztult ezüst stílus prémium szegéllyel.' },
      frame_gold: { label: 'Arany keret', description: 'A végső státusz keret.' },
      tag_saver_pro: { label: 'Megtakarító Profi', description: 'Mutasd meg, hogy kézben tartod a pénzügyeidet.' },
      tag_money_magnet: { label: 'Pénzmágnes', description: 'Te vonzod a pénzt!' },
      tag_future_boss: { label: 'Jövőbeli főnök', description: 'A nagy álmok fegyelmet igényelnek.' }
    }
  }
};

const isObject = (v: any) => typeof v === 'object' && v !== null && !Array.isArray(v);
const deepMerge = (base: any, override: any): any => {
  if (!isObject(base) || !isObject(override)) return override ?? base;
  const out: any = { ...base };
  for (const k of Object.keys(override)) {
    const bv = (base as any)[k];
    const ov = (override as any)[k];
    out[k] = (isObject(bv) && isObject(ov)) ? deepMerge(bv, ov) : (ov ?? bv);
  }
  return out;
};

// Use this everywhere instead of TRANSLATIONS[lang] directly (fallbacks for incomplete languages)
export const getTranslations = (lang: Language) => deepMerge(TRANSLATIONS.de, TRANSLATIONS[lang] || {});
