
import { Sparkles, Trophy, Snowflake, TrendingUp, ShieldCheck, Gift, Landmark, ShieldAlert, Crown, Rainbow, Zap, Star, Gem, Ticket, Shield, Frame, BadgeCheck } from 'lucide-react';

export type ThemeColor = 
  | 'red' | 'orange' | 'yellow' | 'green' | 'blue' | 'purple' | 'pink' | 'teal' 
  | 'cyan' | 'indigo' | 'lime' | 'rose' | 'fuchsia' | 'violet' | 'sky' | 'amber' | 'zinc'
  | 'mint' | 'gold' | 'black'
  | 'slate' | 'stone' | 'emerald' | 'cocoa' | 'lilac' | 'salmon' | 'ocean' | 'forest' | 'night' | 'berry';

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
    label: '50% Rabatt-Gutschein',
    description: 'Halbiert den Preis deines nächsten Einkaufs!',
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
    label: 'Holz-Rahmen',
    description: 'Ein rustikaler Rahmen für dein Profilbild.',
    price: 150,
    category: 'frame',
    icon: Frame,
    color: 'text-amber-700'
  },
  {
    id: 'frame_silver',
    label: 'Silber-Rahmen',
    description: 'Glänze mit diesem edlen Silber-Rahmen.',
    price: 300,
    category: 'frame',
    icon: Shield,
    color: 'text-slate-400'
  },
  {
    id: 'frame_gold',
    label: 'Gold-Rahmen',
    description: 'Der ultimative Status für Spar-Könige.',
    price: 600,
    category: 'frame',
    icon: Crown,
    color: 'text-yellow-500'
  },
  {
    id: 'tag_saver_pro',
    label: 'Titel: Spar-Profi',
    description: 'Zeige allen, dass du dein Geld im Griff hast.',
    price: 100,
    category: 'tag',
    icon: BadgeCheck,
    color: 'text-blue-500'
  },
  {
    id: 'tag_money_magnet',
    label: 'Titel: Münz-Magnet',
    description: 'Du ziehst das Geld förmlich an!',
    price: 200,
    category: 'tag',
    icon: Zap,
    color: 'text-yellow-400'
  },
  {
    id: 'tag_future_boss',
    label: 'Titel: Zukunfts-Boss',
    description: 'Große Träume erfordern große Disziplin.',
    price: 400,
    category: 'tag',
    icon: Star,
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
  red: 'bg-red-500', orange: 'bg-orange-500', yellow: 'bg-yellow-400', green: 'bg-green-500', blue: 'bg-blue-500', purple: 'bg-purple-500', pink: 'bg-pink-500', teal: 'bg-teal-500', cyan: 'bg-cyan-500', indigo: 'bg-indigo-500', lime: 'bg-lime-500', rose: 'bg-rose-500', fuchsia: 'bg-fuchsia-500', violet: 'bg-violet-600', sky: 'bg-sky-500', amber: 'bg-amber-500', zinc: 'bg-zinc-600', mint: 'bg-emerald-300', gold: 'bg-yellow-600', black: 'bg-slate-900', slate: 'bg-slate-500', stone: 'bg-stone-500', emerald: 'bg-emerald-600', cocoa: 'bg-amber-800', lilac: 'bg-purple-300', salmon: 'bg-rose-400', ocean: 'bg-cyan-700', forest: 'bg-green-800', night: 'bg-blue-950', berry: 'bg-pink-700'
};

export const TRANSLATIONS: Record<Language, any> = {
  de: {
    login: { slogan: 'Schlau sparen, Träume erfüllen.', title: 'Willkommen zurück', email: 'E-Mail', password: 'Passwort', button: 'Einloggen', registerBtn: 'Konto erstellen', forgotPassword: 'Passwort vergessen?', resetTitle: 'Passwort zurücksetzen', resetButton: 'Link senden', backToLogin: 'Zurück zum Login', resetSuccess: 'E-Mail gesendet!', loginError: 'Das hat nicht geklappt. Bitte prüfe deine Daten.', resetError: 'Fehler beim Senden der Email.', registerTitle: 'Neues Konto', alreadyHaveAccount: 'Ich habe schon ein Konto', createNewAccount: 'Neues Konto erstellen', verifyTitle: 'Fast geschafft!', verifySentTo: 'Wir haben eine E-Mail geschickt an:', verifyHint: 'Bitte klicke auf den Link in der E-Mail, um dein Sparschwein zu aktivieren!', goToLogin: 'Zum Login' },
    age: { title: 'Fast fertig!', subtitle: 'Wann hast du Geburtstag?', hint: 'Dies hat keinen Einfluss auf die Funktionen, es passt lediglich das Design der App an dich an.', confirm: 'Los geht\'s', years: 'Jahre', birthdate: 'Geburtsdatum' },
    dashboard: { balance: 'Kontostand', newPig: 'Neues Schwein', myPigs: 'Meine Schweine', praiseMessages: ['Super!', 'Klasse!', 'Spitze!'], adLabel: 'Tipp', adTitle: 'Spar-Experte', adSubtitle: 'Jeder Cent zählt', moreSavings: 'Mehr sparen', noPigs: 'Keine Schweine vorhanden', watchedPigs: 'Beobachtete Schweine', removeGuestConfirm: 'Beobachtung beenden?', pigs: 'Schweinchen' },
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
    common: { showLess: 'Weniger', showAll: 'Alle', showAllColors: 'Farben', greeting: 'Hallo', next: 'Weiter', prev: 'Zurück', skip: 'Überspringen', finish: 'Fertig' },
    sidebar: { dashboard: 'Übersicht', learn: 'Lernen & Spielen', shop: 'Shop', settings: 'Einstellungen', addAccount: 'Neues Schwein', streakProtected: 'Streak geschützt' },
    help: { appTutorial: 'App Hilfe', boxTutorial: 'Box Hilfe' },
    boxTutorial: [
      {
        heading: "Wach auf, kleiner Freund!",
        bodyText: "Schließe dein Schweinchen per USB-C an den Strom an. Sobald das Display hell leuchtet, ist es bereit für seine erste Mahlzeit!",
      },
      {
        heading: "Wir werden ein Team",
        bodyText: "Deine App sucht nun nach deinem Sparschwein. Achte auf den fröhlichen Piep-Ton – er verrät dir, dass die Verbindung steht!",
      },
      {
        heading: "Fütterungszeit!",
        bodyText: "Schiebe Münzen oder Scheine in den Schlitz. Das Display erkennt den Wert sofort und zählt in Echtzeit für dich hoch.",
      },
      {
        heading: "Sicher wie im Tresor",
        bodyText: "Dank deines digitalen Schlosses bleibt dein Erspartes geschützt. Das Display zeigt dir immer an, ob alles sicher verschlossen ist.",
      },
      {
        heading: "Bau dir deine Welt",
        bodyText: "Nutze bunte Bausteine, um dein Schweinchen einzigartig zu machen. Drücke jetzt auf Start und erfülle dir deine ersten Träume!",
      }
    ],
    tutorial: {
      step0: { title: 'Willkommen bei Sparify!', text: 'Wir zeigen dir kurz, wie du mit deinem digitalen Sparschwein Träume erfüllen kannst.' },
      step1: { title: 'Dein Kontostand', text: 'Hier siehst du, wie viel Geld du insgesamt in all deinen Sparschweinen gespart hast.' },
      step2: { title: 'Deine Schweinchen', text: 'In dieser Liste findest du alle deine Schweine. Tippe auf eines, um Details zu sehen oder Geld auszuzahlen.' },
      step3: { title: 'Scanner & Hinzufügen', text: 'Tippe auf das Plus, um ein neues Sparschwein zu scannen oder per Code hinzuzufügen.' },
      step4: { title: 'Navigation', text: 'Nutze die Leiste unten, um zum Shop, zu den Spielen oder den Einstellungen zu gelangen.' }
    },
    learn: { sections: { basics: 'Basics', earning: 'Verdienen', spending: 'Ausgeben', saving: 'Sparen', safety: 'Sicherheit' }, start: 'Start', streakFrozen: 'Streak geschützt!' },
    shop: { title: 'Shop', subtitle: 'Items kaufen', specials: 'Specials', owned: 'Besitzt', sectionAvatars: 'Avatare', sectionThemes: 'Themes', balance: 'Guthaben', discountActive: '50% Rabatt aktiv!', couponAvailableTitle: 'Rabatt-Gutschein verfügbar!', couponAvailableHintOn: 'Wird beim nächsten Kauf eingelöst', couponAvailableHintOff: 'Klicke hier, um 50% zu sparen' }
  },
  en: {
    login: { slogan: 'Smart saving, big dreams.', title: 'Welcome back', email: 'Email', password: 'Password', button: 'Login', registerBtn: 'Register', forgotPassword: 'Forgot password?', resetTitle: 'Reset password', resetButton: 'Send link', backToLogin: 'Back to login', resetSuccess: 'Email sent!', loginError: 'That didn’t work. Please check your details.', resetError: 'Failed to send email.', registerTitle: 'Create account', alreadyHaveAccount: 'I already have an account', createNewAccount: 'Create new account', verifyTitle: 'Almost done!', verifySentTo: 'We sent an email to:', verifyHint: 'Please click the link in the email to activate your piggy bank!', goToLogin: 'Go to login' },
    age: { title: 'Almost there!', subtitle: 'When is your birthday?', hint: 'This doesn\'t affect features, it only adjusts the app design for you.', confirm: 'Let\'s go', years: 'years', birthdate: 'Birthdate' },
    dashboard: { balance: 'Balance', newPiggy: 'New Pig', myPigs: 'My Piggies', praiseMessages: ['Great!', 'Awesome!', 'Nice!'], adLabel: 'Ad', adTitle: 'Savings Expert', adSubtitle: 'Every cent counts', moreSavings: 'Save more', noPigs: 'No piggies yet', watchedPigs: 'Watched Piggies', removeGuestConfirm: 'Stop watching?', pigs: 'Piggies' },
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
    common: { showLess: 'Show less', showAll: 'Show all', showAllColors: 'Show colors', greeting: 'Hello', next: 'Next', prev: 'Back', skip: 'Skip', finish: 'Finish' },
    sidebar: { dashboard: 'Dashboard', learn: 'Learn & Play', shop: 'Shop', settings: 'Settings', addAccount: 'Add account', streakProtected: 'Streak protected' },
    help: { appTutorial: 'App Tutorial', boxTutorial: 'Box Tutorial' },
    boxTutorial: [
        { heading: "Wake up, little friend!", bodyText: "Connect your piggy to power via USB-C. As soon as the display lights up, it's ready for its first meal!" },
        { heading: "Becoming a Team", bodyText: "Your app is now searching for your piggy bank. Listen for the happy beep – it tells you that the connection is established!" },
        { heading: "Feeding Time!", bodyText: "Slide coins or bills into the slot. The display recognizes the value immediately and counts up for you in real time." },
        { heading: "Safe like a Vault", bodyText: "Thanks to your digital lock, your savings stay protected. The display always shows you if everything is securely locked." },
        { heading: "Build your World", bodyText: "Use colorful building blocks to make your piggy unique. Press Start now and fulfill your first dreams!" }
    ],
    tutorial: {
      step0: { title: 'Welcome to Sparify!', text: 'Let us show you how to fulfill your dreams with your digital piggy bank.' },
      step1: { title: 'Your Balance', text: 'Here you can see the total amount saved across all your piggy banks.' },
      step2: { title: 'Your Piggies', text: 'This list shows all your piggies. Tap one to see details or withdraw money.' },
      step3: { title: 'Scan & Add', text: 'Tap the Plus button to scan a new piggy bank or add one via code.' },
      step4: { title: 'Navigation', text: 'Use the bottom bar to visit the shop, play games, or change settings.' }
    },
    learn: { sections: { basics: 'Basics', earning: 'Earning', spending: 'Spending', saving: 'Saving', safety: 'Safety' }, start: 'Start', streakFrozen: 'Streak Protected!' },
    shop: { title: 'Shop', subtitle: 'Buy items', specials: 'Specials', owned: 'Owned', sectionAvatars: 'Avatars', sectionThemes: 'Themes', balance: 'Balance', discountActive: '50% Discount active!', couponAvailableTitle: 'Discount coupon available!', couponAvailableHintOn: 'Will be applied to your next purchase', couponAvailableHintOff: 'Click here to save 50%' }
  },
  hr: { login: { slogan: 'Pametna štednja, veliki snovi.', title: 'Dobrodošli natrag' }, age: { title: 'Skoro spremni!' }, dashboard: { balance: 'Saldo' }, common: { next: 'Dalje' }, help: { appTutorial: 'Pomoć' }, tutorial: { step0: { title: 'Dobrodošli!' } }, learn: { start: 'Kreni' }, shop: { title: 'Trgovina' } },
  tr: { login: { slogan: 'Akıllı tasarruf, bükük hayaller.', title: 'Tekrar hoş geldiniz' }, age: { title: 'Neredeyse bitti!' }, dashboard: { balance: 'Bakiye' }, common: { next: 'İleri' }, help: { appTutorial: 'Yardım' }, tutorial: { step0: { title: 'Hoş geldiniz!' } }, learn: { start: 'Başla' }, shop: { title: 'Mağaza' } },
  ru: { login: { slogan: 'Умная экономия, большие мечты.', title: 'С возвращением' }, age: { title: 'Почти готово!' }, dashboard: { balance: 'Баланс' }, common: { next: 'Далее' }, help: { appTutorial: 'Помощь' }, tutorial: { step0: { title: 'Добро пожаловать!' } }, learn: { start: 'Начать' }, shop: { title: 'Магазиn' } },
  hu: { login: { slogan: 'Okos megtakarítás, nagy álmok.', title: 'Üdvözöljük újra' }, age: { title: 'Majdnem kész!' }, dashboard: { balance: 'Egyenleg' }, common: { next: 'Tovább' }, help: { appTutorial: 'Súgó' }, tutorial: { step0: { title: 'Üdvözöljük!' } }, learn: { start: 'Indítás' }, shop: { title: 'Bolt' } }
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
