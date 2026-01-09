
import React, { useMemo, useState, useEffect } from 'react';
import { ShoppingBag, Check, Clock, Sparkles, Gift, Coins, User, Palette, X, Ticket, Shield, RefreshCw, ChevronDown } from 'lucide-react';
import { Language, TRANSLATIONS, User as UserType, ThemeColor, AVATARS, THEME_COLORS, SPECIALS_DATABASE, SpecialItem } from '../types';

interface ShopScreenProps {
  user: UserType;
  onUpdateUser: (user: UserType) => void;
  language: Language;
}

const sfc32 = (a: number, b: number, c: number, d: number) => {
    return function() {
      a >>>= 0; b >>>= 0; c >>>= 0; d >>>= 0; 
      var t = (a + b) | 0;
      a = b ^ b >>> 9;
      b = c + (c << 3) | 0;
      c = (c << 21 | c >>> 11);
      d = d + 1 | 0;
      t = t + d | 0;
      c = c + t | 0;
      return (t >>> 0) / 4294967296;
    }
}

interface BagReward {
  type: 'coins' | 'avatar' | 'theme';
  value: any;
  icon: any;
}

export const ShopScreen: React.FC<ShopScreenProps> = ({ user, onUpdateUser, language }) => {
  const t = TRANSLATIONS[language].shop;

  const [openingBag, setOpeningBag] = useState(false);
  const [bagReward, setBagReward] = useState<BagReward | null>(null);
  const [slotItems, setSlotItems] = useState<any[]>([]);
  
  // DEV TOOLS
  const [devDateOffset, setDevDateOffset] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [forcedSpecialId, setForcedSpecialId] = useState<string>("");

  if (!user) return null;

  const calculateTimeLeft = () => {
      const now = new Date();
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1 + devDateOffset);
      tomorrow.setHours(0, 0, 0, 0);
      const diff = tomorrow.getTime() - now.getTime();
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      return `${hours}h ${minutes}m`;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  
  const todayStr = useMemo(() => {
      const d = new Date();
      d.setDate(d.getDate() + devDateOffset);
      return d.toISOString().split('T')[0];
  }, [devDateOffset]);

  const hasDiscount = user.inventory.includes('item_discount_coupon');
  
  const dailyShopItems = useMemo(() => {
      let seed1 = 0, seed2 = 0;
      for(let i=0; i<todayStr.length; i++) {
          seed1 += todayStr.charCodeAt(i);
          seed2 += todayStr.charCodeAt(i) * 2;
      }
      const rand = sfc32(seed1, seed2, 12345, 67890);

      // Avatars
      const avatarPool = AVATARS.slice(4).map((_, idx) => idx + 4); 
      for (let i = avatarPool.length - 1; i > 0; i--) {
          const j = Math.floor(rand() * (i + 1));
          [avatarPool[i], avatarPool[j]] = [avatarPool[j], avatarPool[i]];
      }
      const todaysAvatars = avatarPool.slice(0, 4).map(idx => ({
          id: `avatar_${idx}`,
          type: 'avatar' as const,
          value: idx,
          price: 50 + Math.floor(rand() * 3) * 10 
      }));

      // Themes
      const allColors = Object.keys(THEME_COLORS) as ThemeColor[];
      const themePool = allColors.filter(c => c !== 'orange');
      for (let i = themePool.length - 1; i > 0; i--) {
          const j = Math.floor(rand() * (i + 1));
          [themePool[i], themePool[j]] = [themePool[j], themePool[i]];
      }
      const todaysThemes = themePool.slice(0, 3).map(c => ({
          id: `theme_${c}`,
          type: 'theme' as const,
          value: c,
          price: 100
      }));

      // Specials with Force Logic
      let specialsSelection: SpecialItem[] = [];
      const baseSpecials = [...SPECIALS_DATABASE];

      if (forcedSpecialId) {
          const forced = baseSpecials.find(s => s.id === forcedSpecialId);
          if (forced) {
              specialsSelection.push(forced);
              const remaining = baseSpecials.filter(s => s.id !== forcedSpecialId);
              // Shuffle remaining
              for (let i = remaining.length - 1; i > 0; i--) {
                  const j = Math.floor(rand() * (i + 1));
                  [remaining[i], remaining[j]] = [remaining[j], remaining[i]];
              }
              specialsSelection.push(...remaining.slice(0, 3));
          }
      } else {
          for (let i = baseSpecials.length - 1; i > 0; i--) {
              const j = Math.floor(rand() * (i + 1));
              [baseSpecials[i], baseSpecials[j]] = [baseSpecials[j], baseSpecials[i]];
          }
          specialsSelection = baseSpecials.slice(0, 4);
      }

      return { avatars: todaysAvatars, themes: todaysThemes, specials: specialsSelection };
  }, [todayStr, forcedSpecialId]);

  useEffect(() => {
      const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 60000);
      return () => clearInterval(timer);
  }, [devDateOffset]);

  const cycleShopRotation = () => {
      setIsRefreshing(true);
      setDevDateOffset(prev => prev + 1);
      setTimeout(() => setIsRefreshing(false), 300);
  };

  const getEffectivePrice = (basePrice: number) => {
      return hasDiscount ? Math.floor(basePrice * 0.5) : basePrice;
  };

  const handleOpenLuckyBag = () => {
      setOpeningBag(true);
      setBagReward(null);
      
      const potentialRewards: BagReward[] = [
          { type: 'coins', value: 300, icon: <Coins className="text-yellow-500" size={48} /> },
          { type: 'coins', value: 500, icon: <Coins className="text-yellow-500" size={48} /> },
          { type: 'avatar', value: Math.floor(Math.random() * (AVATARS.length - 4)) + 4, icon: <User className="text-blue-500" size={48} /> },
          { type: 'theme', value: 'gold', icon: <Palette className="text-yellow-600" size={48} /> }
      ];

      const displayItems = [];
      for(let i=0; i<20; i++) {
          displayItems.push(potentialRewards[Math.floor(Math.random() * potentialRewards.length)]);
      }
      const finalReward = potentialRewards[Math.floor(Math.random() * potentialRewards.length)];
      displayItems.push(finalReward);
      setSlotItems(displayItems);

      setTimeout(() => {
          setBagReward(finalReward);
          
          let updatedUser = { ...user };
          if (finalReward.type === 'coins') {
              updatedUser.coins += (finalReward.value as number);
          } else if (finalReward.type === 'avatar') {
              const id = `avatar_${finalReward.value}`;
              if (!updatedUser.inventory.includes(id)) updatedUser.inventory.push(id);
          } else if (finalReward.type === 'theme') {
              const id = `theme_${finalReward.value}`;
              if (!updatedUser.inventory.includes(id)) updatedUser.inventory.push(id);
          }
          onUpdateUser(updatedUser);
      }, 3000);
  };

  const handleBuy = (item: any, type: 'special' | 'avatar' | 'theme') => {
    const basePrice = item.price;
    const effectivePrice = getEffectivePrice(basePrice);
    const itemId = item.id;

    if (user.coins >= effectivePrice && !isOwned(itemId)) {
      const currentInventory = Array.isArray(user.inventory) ? user.inventory : [];
      let updatedUser: UserType = {
        ...user,
        coins: user.coins - effectivePrice,
        inventory: [...currentInventory, itemId]
      };

      if (hasDiscount && itemId !== 'item_discount_coupon') {
          updatedUser.inventory = updatedUser.inventory.filter(id => id !== 'item_discount_coupon');
      }

      if (type === 'special' && item.category === 'profile' && itemId !== 'item_discount_coupon') {
          updatedUser.activeSpecials = [...(user.activeSpecials || []), itemId];
      }

      if (itemId === 'item_streak_freeze') {
          const freezeUntil = new Date();
          freezeUntil.setHours(freezeUntil.getHours() + 48);
          updatedUser.streakFreezeUntil = freezeUntil.toISOString();
          updatedUser.inventory = updatedUser.inventory.filter(id => id !== 'item_streak_freeze');
      }

      if (itemId === 'item_streak_shield') {
          const freezeUntil = new Date();
          freezeUntil.setHours(freezeUntil.getHours() + 24);
          updatedUser.streakFreezeUntil = freezeUntil.toISOString();
          updatedUser.inventory = updatedUser.inventory.filter(id => id !== 'item_streak_shield');
      }

      if (itemId === 'item_lucky_bag') {
          updatedUser.inventory = updatedUser.inventory.filter(id => id !== 'item_lucky_bag');
          onUpdateUser(updatedUser);
          handleOpenLuckyBag();
          return;
      }

      onUpdateUser(updatedUser);
    }
  };

  const isOwned = (itemId: string) => {
      const inv = Array.isArray(user.inventory) ? user.inventory : [];
      return inv.includes(itemId);
  };

  return (
    <div className={`flex-1 flex flex-col bg-slate-50 relative overflow-hidden h-screen transition-opacity duration-300 ${isRefreshing ? 'opacity-50' : 'opacity-100'}`}>
      <div className="px-6 pt-12 pb-6 bg-white shadow-sm z-10 sticky top-0 md:px-12 md:pt-10">
          <div className="flex justify-between items-center mb-2 max-w-5xl mx-auto w-full">
            <div>
                <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                <ShoppingBag size={32} className="text-orange-500" strokeWidth={2.5} />
                {t.title}
                </h1>
                <p className="text-slate-400 font-bold text-xs uppercase tracking-wider mb-1">{t.subtitle}</p>
                
                <div className="flex flex-wrap items-center gap-2">
                    <div className="inline-flex items-center gap-1.5 bg-slate-100 px-2 py-1 rounded-lg border border-slate-200">
                        <Clock size={12} className="text-slate-400" />
                        <span className="text-xs font-bold text-slate-600 font-mono">{timeLeft}</span>
                    </div>
                    
                    {/* DEV TOOLS UI */}
                    <div className="flex items-center gap-1 bg-indigo-50 border border-indigo-100 p-1 rounded-lg">
                        <button 
                            onClick={cycleShopRotation}
                            title="Shuffle Shop Rotation"
                            className="p-1 text-indigo-500 hover:bg-indigo-100 rounded transition-colors"
                        >
                            <RefreshCw size={12} />
                        </button>
                        
                        <div className="relative">
                            <select 
                                value={forcedSpecialId}
                                onChange={(e) => setForcedSpecialId(e.target.value)}
                                className="appearance-none bg-transparent text-[10px] font-black text-indigo-600 pl-1 pr-4 outline-none cursor-pointer"
                            >
                                <option value="">Auto-Rotate</option>
                                {SPECIALS_DATABASE.map(s => (
                                    <option key={s.id} value={s.id}>Force: {s.label}</option>
                                ))}
                            </select>
                            <ChevronDown size={8} className="absolute right-1 top-1/2 -translate-y-1/2 text-indigo-400 pointer-events-none" />
                        </div>
                    </div>

                    {devDateOffset !== 0 && (
                        <span className="text-[10px] font-black text-indigo-400 uppercase tracking-tighter">Dev-Day: {todayStr}</span>
                    )}
                </div>
            </div>
            <div className="flex flex-col items-end gap-2">
                <div className="bg-yellow-400 text-yellow-950 px-4 py-2 rounded-2xl font-black shadow-md flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-yellow-100 border-2 border-yellow-950 flex items-center justify-center text-[10px]">€</div>
                    <span className="text-xl">{user.coins}</span>
                </div>
                {hasDiscount && (
                    <div className="flex items-center gap-1.5 bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-[10px] font-black uppercase border border-amber-200 animate-pulse">
                        <Ticket size={12} /> Rabatt aktiv!
                    </div>
                )}
            </div>
          </div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar p-6 pb-32 max-w-5xl mx-auto w-full">
        <div className="mb-12">
            <h2 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-2">
                <Sparkles size={24} className="text-orange-400" />
                {t.specials}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {dailyShopItems.specials.map((item) => {
                    const owned = isOwned(item.id);
                    const Icon = item.icon;
                    const price = getEffectivePrice(item.price);
                    
                    return (
                        <div key={item.id} className="bg-white p-4 rounded-[2rem] shadow-lg shadow-slate-200/50 border-2 border-slate-100 flex flex-col items-center text-center relative overflow-hidden group">
                            <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mb-3 shadow-sm group-hover:scale-110 transition-transform duration-500">
                                <Icon className={item.color} size={24} />
                            </div>
                            <h3 className="font-black text-sm text-slate-800 mb-0.5 leading-tight">{item.label}</h3>
                            <p className="text-slate-400 text-[10px] font-bold mb-4 px-1 leading-tight h-8 flex items-center justify-center">{item.description}</p>
                            
                            {owned ? (
                                <button disabled className="w-full bg-emerald-50 text-emerald-600 font-black py-3 rounded-xl flex items-center justify-center gap-1.5 text-xs">
                                    <Check size={14} strokeWidth={3} /> {t.owned}
                                </button>
                            ) : (
                                <button 
                                    onClick={() => handleBuy(item, 'special')}
                                    disabled={user.coins < price}
                                    className={`w-full font-black py-3 rounded-xl flex items-center justify-center gap-1 text-xs shadow-md transition-all active:scale-95 ${
                                        user.coins >= price 
                                        ? 'bg-slate-900 text-white' 
                                        : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                                    }`}
                                >
                                    {hasDiscount && <span className="text-[8px] line-through opacity-50 mr-1">{item.price}</span>}
                                    {price}
                                    <div className="w-3 h-3 rounded-full bg-yellow-400 flex items-center justify-center text-[7px] font-black text-yellow-900 ml-0.5">€</div>
                                </button>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>

        <div className="mb-12">
            <h2 className="text-xl font-black text-slate-800 mb-4 flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-50 text-blue-500 rounded-lg flex items-center justify-center"><Check size={18} /></div>
                {t.sectionAvatars}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {dailyShopItems.avatars.map((item) => {
                    const price = getEffectivePrice(item.price);
                    return (
                        <div key={item.id} className="bg-white p-4 rounded-[2rem] shadow-xl border border-slate-100 flex flex-col items-center relative overflow-hidden group hover:scale-[1.02] transition-transform">
                            <div className="w-24 h-24 rounded-full bg-slate-50 mb-4 border-4 border-white shadow-sm overflow-hidden">
                                <img src={AVATARS[item.value]} alt="Avatar" className="w-full h-full object-cover" />
                            </div>
                            {isOwned(item.id) ? (
                                <button disabled className="w-full bg-emerald-50 text-emerald-600 font-bold py-3 rounded-xl flex items-center justify-center gap-2 text-sm">
                                    <Check size={18} /> {t.owned}
                                </button>
                            ) : (
                                <button 
                                    onClick={() => handleBuy(item, 'avatar')}
                                    disabled={user.coins < price}
                                    className={`w-full font-black py-3 rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95 text-sm ${
                                        user.coins >= price 
                                        ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white' 
                                        : 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
                                    }`}
                                >
                                    {hasDiscount && <span className="text-[10px] line-through opacity-50">{item.price}</span>}
                                    {price} Münzen
                                </button>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>

        <div className="mb-8">
            <h2 className="text-xl font-black text-slate-800 mb-4 flex items-center gap-2">
                <div className="w-8 h-8 bg-purple-50 text-purple-500 rounded-lg flex items-center justify-center"><Check size={18} /></div>
                {t.sectionThemes}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {dailyShopItems.themes.map((item) => {
                    const price = getEffectivePrice(item.price);
                    return (
                        <div key={item.id} className="bg-white p-4 rounded-[2rem] shadow-xl border border-slate-100 flex items-center justify-between hover:scale-[1.02] transition-transform">
                             <div className="flex items-center gap-4">
                                <div className={`w-16 h-16 rounded-2xl ${THEME_COLORS[item.value as ThemeColor]} shadow-md border-4 border-white`}></div>
                                <h3 className="font-black text-lg text-slate-800 capitalize">{item.value}</h3>
                             </div>
                             <div className="w-32">
                                 {isOwned(item.id) ? (
                                    <button disabled className="w-full bg-emerald-50 text-emerald-600 font-bold py-2 rounded-xl flex items-center justify-center gap-1 text-sm">
                                        <Check size={18} /> {t.owned}
                                    </button>
                                 ) : (
                                    <button onClick={() => handleBuy(item, 'theme')} disabled={user.coins < price} className={`w-full font-bold py-2 rounded-xl flex justify-center items-center text-sm transition-all active:scale-95 ${user.coins >= price ? 'bg-slate-900 text-white shadow-lg' : 'bg-slate-100 text-slate-400 cursor-not-allowed'}`}>
                                        {hasDiscount && <span className="text-[10px] line-through opacity-50 mr-2">{item.price}</span>}
                                        {price}
                                    </button>
                                 )}
                             </div>
                        </div>
                    );
                })}
            </div>
        </div>
      </div>

      {openingBag && (
          <div className="fixed inset-0 z-[200] bg-slate-900/90 backdrop-blur-xl flex items-center justify-center p-6 animate-in fade-in duration-300">
              <div className="bg-white w-full max-w-sm rounded-[3rem] p-8 text-center shadow-2xl relative overflow-hidden flex flex-col items-center">
                  <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-2">
                      <Gift className="text-purple-500 animate-bounce" /> Wundertüte
                  </h2>
                  
                  <div className="w-full h-48 bg-slate-900 rounded-3xl relative overflow-hidden border-4 border-slate-800 shadow-inner flex items-center justify-center">
                      {!bagReward ? (
                          <div className="flex flex-col gap-4 animate-slot-spin">
                              {slotItems.map((item, i) => (
                                  <div key={i} className="flex items-center justify-center opacity-50 scale-75">
                                      {item.icon}
                                  </div>
                              ))}
                          </div>
                      ) : (
                          <div className="animate-in zoom-in-125 duration-500 flex flex-col items-center gap-4">
                              <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center border-2 border-white/20">
                                  {bagReward.icon}
                              </div>
                              <div className="text-white">
                                  <p className="font-bold text-xs uppercase tracking-widest opacity-50">Gewinn!</p>
                                  <p className="text-2xl font-black">
                                      {bagReward.type === 'coins' ? `+${bagReward.value} Münzen` : bagReward.type === 'avatar' ? 'Neuer Avatar!' : 'Neues Theme!'}
                                  </p>
                              </div>
                          </div>
                      )}
                      
                      <div className="absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-black to-transparent pointer-events-none" />
                      <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black to-transparent pointer-events-none" />
                  </div>

                  <p className="text-slate-500 font-bold mt-8 mb-8 text-sm leading-relaxed px-4">
                      {bagReward ? "Dein Gewinn wurde deinem Profil hinzugefügt!" : "Die Walzen drehen sich..."}
                  </p>

                  {bagReward && (
                      <button 
                        onClick={() => setOpeningBag(false)}
                        className="w-full bg-slate-900 text-white font-black py-4 rounded-2xl shadow-xl active:scale-95 transition-all"
                      >
                        Abholen
                      </button>
                  )}
              </div>

              <style>{`
                @keyframes slot-spin {
                    0% { transform: translateY(0); }
                    100% { transform: translateY(-80%); }
                }
                .animate-slot-spin {
                    animation: slot-spin 3s cubic-bezier(0.45, 0.05, 0.55, 0.95) forwards;
                }
              `}</style>
          </div>
      )}
    </div>
  );
};
