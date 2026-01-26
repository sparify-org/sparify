
import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { LogOut, Info, User as UserIcon, Palette, Globe, Lock, ToggleRight, Baby, Briefcase, KeyRound, Check, Sparkles, Crown } from 'lucide-react';
import { ThemeColor, THEME_COLORS, VIP_COLORS, AVATARS, User, Language, TRANSLATIONS, AppMode, SPECIALS_DATABASE, VIPColor } from '../types';

interface SettingsScreenProps {
  user: User;
  onUpdateUser: (user: User) => void;
  accentColor: ThemeColor | VIPColor;
  onUpdateAccent: (color: ThemeColor | VIPColor) => void;
  onLogout: () => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  appMode: AppMode;
  isRecoveryMode?: boolean;
  onUpdatePassword?: (password: string) => Promise<void>;
}

const colors: ThemeColor[] = [
    'red', 'orange', 'yellow', 'green', 'blue', 'purple', 'pink', 'teal', 'cyan', 'black'
];

const vipColors: VIPColor[] = [
    'vip_sunset', 'vip_ocean', 'vip_forest', 'vip_galaxy', 'vip_candy',
    'vip_fire', 'vip_emerald', 'vip_royal', 'vip_peach', 'vip_midnight'
];

const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'hr', label: 'Hrvatski', flag: '🇭🇷' },
    { code: 'tr', label: 'Türkçe', flag: '🇹🇷' },
    { code: 'ru', label: 'Русский', flag: '🇷🇺' },
    { code: 'hu', label: 'Magyar', flag: '🇭🇺' }
];

export const SettingsScreen: React.FC<SettingsScreenProps> = ({
  user,
  onUpdateUser,
  accentColor,
  onUpdateAccent,
  onLogout,
  language,
  setLanguage,
  appMode,
  isRecoveryMode,
  onUpdatePassword
}) => {
  const [editingName, setEditingName] = useState(user.name);
  const [showAllAvatars, setShowAllAvatars] = useState(false);
  const [showAllColors, setShowAllColors] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  
  const [newPassword, setNewPassword] = useState('');
  const [passwordSaved, setPasswordSaved] = useState(false);
  const [isPasswordLoading, setIsPasswordLoading] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const [isResettingPassword, setIsResettingPassword] = useState(false);

  const t = TRANSLATIONS[language].settings;
  const tCommon = TRANSLATIONS[language].common;
  const isFrameActive = user.inventory.includes('frame_gold') && user.activeSpecials.includes('frame_gold');

  const isAvatarOwned = (index: number) => {
      if (index < 4) return true;
      return user.inventory.includes(`avatar_${index}`);
  };

  const isColorOwned = (c: ThemeColor) => {
      const freeColors = ['orange', 'yellow', 'green']; 
      if (freeColors.includes(c)) return true;
      return user.inventory.includes(`theme_${c}`);
  };

  const isVIPColorOwned = (c: VIPColor) => {
      return user.inventory.includes(`vip_${c}`);
  };

  const isUnseen = (itemId: string) => {
      return (user.unseenItems || []).includes(itemId);
  };

  const markAsSeen = (itemId: string) => {
      if (!isUnseen(itemId)) return;
      const newUnseen = (user.unseenItems || []).filter(id => id !== itemId);
      onUpdateUser({ ...user, unseenItems: newUnseen });
  };

  const handleSelectAvatar = (idx: number) => {
      const id = `avatar_${idx}`;
      markAsSeen(id);
      onUpdateUser({ ...user, avatarId: idx, unseenItems: (user.unseenItems || []).filter(uId => uId !== id) });
  };

  const handleSelectColor = (c: ThemeColor | VIPColor) => {
      const id = c.startsWith('vip_') ? `vip_${c}` : `theme_${c}`;
      markAsSeen(id);
      onUpdateAccent(c);
      // Update user profile with new accent color
      onUpdateUser({ ...user, accentColor: c, unseenItems: (user.unseenItems || []).filter(uId => uId !== id) });
  };

  const ownedProfileSpecials = SPECIALS_DATABASE.filter(item => 
      item.category === 'profile' && user.inventory.includes(item.id)
  );
  
  const handleToggleSpecial = (id: string) => {
      const currentActive = [...(user.activeSpecials || [])];
      let newActive;
      if (currentActive.includes(id)) {
          newActive = currentActive.filter(specialId => specialId !== id);
      } else {
          newActive = [...currentActive, id];
      }
      onUpdateUser({ ...user, activeSpecials: newActive });
  };
  
  const handlePasswordSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!onUpdatePassword || newPassword.length < 6) return;
      setIsPasswordLoading(true);
      try {
          await onUpdatePassword(newPassword);
          setNewPassword('');
          setPasswordSaved(true);
          setTimeout(() => setPasswordSaved(false), 3000);
      } catch (err) { console.error(err); }
      setIsPasswordLoading(false);
  };

  const handleResetPassword = async () => {
      setIsResettingPassword(true);
      try {
          const { error } = await supabase.auth.resetPasswordForEmail(user.email, {
              redirectTo: window.location.origin + '/auth/reset'
          });
          if (error) throw error;
          setResetSent(true);
          setTimeout(() => setResetSent(false), 5000);
      } catch (err) {
          console.error('Password reset error:', err);
      }
      setIsResettingPassword(false);
  };

  const displayedAvatars = showAllAvatars ? AVATARS : AVATARS.slice(0, 4); 

    // Developer console state
    const [devEmail, setDevEmail] = useState<string>('');
    const [devAmount, setDevAmount] = useState<number>(0);
    const [devMode, setDevMode] = useState<AppMode>('kids');
    const [devStatus, setDevStatus] = useState<string | null>(null);
    const [devLoading, setDevLoading] = useState(false);
    const [devSetCoins, setDevSetCoins] = useState<number | null>(null);
    const [devAvatarId, setDevAvatarId] = useState<number | null>(null);
    const [devGiveItemId, setDevGiveItemId] = useState<string>('');
    const [devGiveColor, setDevGiveColor] = useState<ThemeColor | ''>('');
    const [devGiveVIPColor, setDevGiveVIPColor] = useState<VIPColor | ''>('');
    const isDevVisible = (user.email === 'vlasdvoranov@gmail.com' || user.email === 'sparify.at@gmail.com' || window.location.hostname === 'localhost');

    const findProfileByEmail = async (email: string) => {
        const { data, error } = await supabase.from('profiles').select('*').eq('email', email).single();
        if (error) throw error;
        return data;
    };

    const handleDevAddCoins = async () => {
        if (!devEmail || !devAmount) return setDevStatus('Please provide email and amount');
        setDevLoading(true); setDevStatus(null);
        try {
            const profile: any = await findProfileByEmail(devEmail);
            if (!profile) throw new Error('Profile not found');
            const currentCoins = profile.coins || 0;
            const newCoins = currentCoins + devAmount;
            const { error } = await supabase.from('profiles').update({ coins: newCoins }).eq('id', profile.id);
            if (error) throw error;
            setDevStatus(`Updated ${devEmail}: +${devAmount} → ${newCoins}`);
            // If we're editing the current user, reflect change locally
            if (user.email === devEmail) onUpdateUser({ ...user, coins: newCoins });
        } catch (e: any) {
            console.error(e);
            setDevStatus('Error: ' + (e.message || String(e)));
        }
        setDevLoading(false);
    };

    const handleDevSetMode = async () => {
        if (!devEmail) return setDevStatus('Please provide email');
        setDevLoading(true); setDevStatus(null);
        try {
            const profile: any = await findProfileByEmail(devEmail);
            if (!profile) throw new Error('Profile not found');
            const newAge = devMode === 'adult' ? 18 : 10;
            const { error } = await supabase.from('profiles').update({ age: newAge }).eq('id', profile.id);
            if (error) throw error;
            setDevStatus(`Set ${devEmail} mode → ${devMode}`);
            if (user.email === devEmail) onUpdateUser({ ...user, age: newAge });
        } catch (e: any) {
            console.error(e);
            setDevStatus('Error: ' + (e.message || String(e)));
        }
        setDevLoading(false);
    };

    const handleDevSetCoins = async () => {
        if (!devEmail || devSetCoins === null) return setDevStatus('Please provide email and coins');
        setDevLoading(true); setDevStatus(null);
        try {
            const profile: any = await findProfileByEmail(devEmail);
            if (!profile) throw new Error('Profile not found');
            const { error } = await supabase.from('profiles').update({ coins: devSetCoins }).eq('id', profile.id);
            if (error) throw error;
            setDevStatus(`Set ${devEmail} coins → ${devSetCoins}`);
            if (user.email === devEmail) onUpdateUser({ ...user, coins: devSetCoins });
        } catch (e: any) {
            console.error(e);
            setDevStatus('Error: ' + (e.message || String(e)));
        }
        setDevLoading(false);
    };

    const handleDevSetAvatar = async () => {
        if (!devEmail || devAvatarId === null) return setDevStatus('Please provide email and avatar id');
        setDevLoading(true); setDevStatus(null);
        try {
            const profile: any = await findProfileByEmail(devEmail);
            if (!profile) throw new Error('Profile not found');
            const { error } = await supabase.from('profiles').update({ avatarId: devAvatarId }).eq('id', profile.id);
            if (error) throw error;
            setDevStatus(`Set ${devEmail} avatar → ${devAvatarId}`);
            if (user.email === devEmail) onUpdateUser({ ...user, avatarId: devAvatarId });
        } catch (e: any) {
            console.error(e);
            setDevStatus('Error: ' + (e.message || String(e)));
        }
        setDevLoading(false);
    };

    const handleDevGiveItem = async () => {
        if (!devEmail || !devGiveItemId) return setDevStatus('Please provide email and item id');
        setDevLoading(true); setDevStatus(null);
        try {
            const profile: any = await findProfileByEmail(devEmail);
            if (!profile) throw new Error('Profile not found');
            const inventory = Array.isArray(profile.inventory) ? profile.inventory : [];
            if (!inventory.includes(devGiveItemId)) inventory.push(devGiveItemId);
            const { error } = await supabase.from('profiles').update({ inventory }).eq('id', profile.id);
            if (error) throw error;
            setDevStatus(`Gave ${devGiveItemId} to ${devEmail}`);
            if (user.email === devEmail) onUpdateUser({ ...user, inventory });
        } catch (e: any) {
            console.error(e);
            setDevStatus('Error: ' + (e.message || String(e)));
        }
        setDevLoading(false);
    };

    const handleDevGiveColor = async () => {
        if (!devEmail || !devGiveColor) return setDevStatus('Please provide email and color');
        setDevLoading(true); setDevStatus(null);
        try {
            const profile: any = await findProfileByEmail(devEmail);
            if (!profile) throw new Error('Profile not found');
            const inventory = Array.isArray(profile.inventory) ? profile.inventory : [];
            const id = `theme_${devGiveColor}`;
            if (!inventory.includes(id)) inventory.push(id);
            const { error } = await supabase.from('profiles').update({ inventory }).eq('id', profile.id);
            if (error) throw error;
            setDevStatus(`Gave color ${devGiveColor} to ${devEmail}`);
            if (user.email === devEmail) onUpdateUser({ ...user, inventory });
        } catch (e: any) {
            console.error(e);
            setDevStatus('Error: ' + (e.message || String(e)));
        }
        setDevLoading(false);
    };

    const handleDevGiveVIPColor = async () => {
        if (!devEmail || !devGiveVIPColor) return setDevStatus('Please provide email and VIP color');
        setDevLoading(true); setDevStatus(null);
        try {
            const profile: any = await findProfileByEmail(devEmail);
            if (!profile) throw new Error('Profile not found');
            const inventory = Array.isArray(profile.inventory) ? profile.inventory : [];
            const id = `vip_${devGiveVIPColor}`;
            if (!inventory.includes(id)) inventory.push(id);
            const { error } = await supabase.from('profiles').update({ inventory }).eq('id', profile.id);
            if (error) throw error;
            setDevStatus(`Gave VIP color ${devGiveVIPColor} to ${devEmail}`);
            if (user.email === devEmail) onUpdateUser({ ...user, inventory });
        } catch (e: any) {
            console.error(e);
            setDevStatus('Error: ' + (e.message || String(e)));
        }
        setDevLoading(false);
    };

    const handleDevGiveAllColors = async () => {
        if (!devEmail) return setDevStatus('Please provide email');
        setDevLoading(true); setDevStatus(null);
        try {
            const profile: any = await findProfileByEmail(devEmail);
            if (!profile) throw new Error('Profile not found');
            const inventory = Array.isArray(profile.inventory) ? profile.inventory : [];
            colors.forEach((c) => {
                const id = `theme_${c}`;
                if (!inventory.includes(id)) inventory.push(id);
            });
            const { error } = await supabase.from('profiles').update({ inventory }).eq('id', profile.id);
            if (error) throw error;
            setDevStatus(`Gave all colors to ${devEmail}`);
            if (user.email === devEmail) onUpdateUser({ ...user, inventory });
        } catch (e: any) {
            console.error(e);
            setDevStatus('Error: ' + (e.message || String(e)));
        }
        setDevLoading(false);
    };

    const handleDevResetUnseen = async () => {
        if (!devEmail) return setDevStatus('Please provide email');
        setDevLoading(true); setDevStatus(null);
        try {
            const profile: any = await findProfileByEmail(devEmail);
            if (!profile) throw new Error('Profile not found');
            const { error } = await supabase.from('profiles').update({ unseenItems: [] }).eq('id', profile.id);
            if (error) throw error;
            setDevStatus(`Reset unseen items for ${devEmail}`);
            if (user.email === devEmail) onUpdateUser({ ...user, unseenItems: [] });
        } catch (e: any) {
            console.error(e);
            setDevStatus('Error: ' + (e.message || String(e)));
        }
        setDevLoading(false);
    };

  return (
    <div className={`flex-1 p-6 pb-32 overflow-y-auto no-scrollbar ${appMode === 'adult' ? 'text-slate-900 bg-slate-100' : ''}`}>
      <div className="flex items-center gap-6 mb-8">
           <div className={`w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-xl ${isFrameActive ? 'ring-4 ring-yellow-400 ring-offset-2' : ''}`}>
               <img src={AVATARS[user.avatarId]} alt="Profile" className="w-full h-full object-cover" />
           </div>
           <div>
               <h2 className={`text-3xl text-slate-900 ${appMode === 'adult' ? 'font-bold' : 'font-black'}`}>{t.title}</h2>
               <div className="flex items-center gap-2 mt-1">
                   <div className={`px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1 ${appMode === 'adult' ? 'bg-slate-900 text-white' : 'bg-orange-500 text-white'}`}>
                       {appMode === 'adult' ? <Briefcase size={10} /> : <Baby size={10} />}
                       {appMode.toUpperCase()} Version
                   </div>
               </div>
           </div>
      </div>

      {isRecoveryMode && onUpdatePassword && (
          <div className="bg-white rounded-[2rem] p-6 mb-6 shadow-xl border border-slate-100 ring-4 ring-orange-500">
             <div className="flex items-center gap-3 mb-4">
                 <div className="p-2 bg-slate-900 rounded-xl text-white"><KeyRound size={20} /></div>
                 <h3 className="font-bold text-slate-800">{t.security}</h3>
             </div>
             <form onSubmit={handlePasswordSubmit} className="flex flex-col gap-3">
                 <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                     <label className="text-xs text-slate-400 font-bold uppercase mb-1 block">{t.newPassword}</label>
                     <input type="password" placeholder="••••••••" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} minLength={6} className="w-full bg-transparent text-xl text-slate-900 focus:outline-none font-bold" />
                 </div>
                 <button type="submit" disabled={isPasswordLoading} className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl shadow-lg active:scale-95">{passwordSaved ? t.passwordSaved : t.changePassword}</button>
             </form>
          </div>
      )}

      {/* Profile Section */}
      <div className="bg-white rounded-[2rem] p-6 mb-6 shadow-xl border border-slate-100">
        <div className="flex items-center gap-3 mb-4">
             <div className="p-2 bg-blue-50 rounded-xl text-blue-500"><UserIcon size={20} /></div>
             <h3 className="font-bold text-slate-800">{t.profile}</h3>
        </div>
        <div className="bg-slate-50 p-4 rounded-2xl mb-6 border border-slate-100">
            <label className="text-xs text-slate-400 font-bold uppercase mb-1 block">{t.name}</label>
            <input type="text" value={editingName} onChange={(e) => { setEditingName(e.target.value); onUpdateUser({...user, name: e.target.value}); }} className="w-full bg-transparent text-xl text-slate-900 focus:outline-none font-black" />
        </div>
        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 mb-4">
          {displayedAvatars.map((avatar, index) => {
            const realIndex = AVATARS.indexOf(avatar);
            const owned = isAvatarOwned(realIndex);
            const isSelected = user.avatarId === realIndex;
            const itemUnseen = isUnseen(`avatar_${realIndex}`);

            return (
                <button 
                  key={realIndex} 
                  onClick={() => owned && handleSelectAvatar(realIndex)} 
                  disabled={!owned} 
                  className={`relative rounded-full transition-all aspect-square p-1 ${isSelected ? 'z-10' : 'z-0'}`}
                >
                    <div className={`transition-all duration-300 w-full h-full flex items-center justify-center rounded-full overflow-hidden ${isSelected ? 'scale-105 ring-4 ring-slate-900 shadow-xl' : 'scale-95 opacity-80'}`}>
                        <img src={avatar} alt={`Avatar ${realIndex}`} className={`w-full h-full object-cover bg-slate-50 ${!owned ? 'grayscale opacity-50' : ''}`} />
                    </div>
                    {!owned && <div className="absolute inset-0 flex items-center justify-center z-20"><div className="bg-slate-900/80 p-1.5 rounded-full text-white"><Lock size={12} /></div></div>}
                    {owned && !isSelected && itemUnseen && (
                        <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 border-2 border-white rounded-full flex items-center justify-center shadow-md animate-bounce z-30">
                            <span className="text-white text-[10px] font-black">!</span>
                        </div>
                    )}
                </button>
            )
          })}
        </div>
        <button onClick={() => setShowAllAvatars(!showAllAvatars)} className="w-full py-3 text-slate-400 font-bold text-sm">{showAllAvatars ? tCommon.showLess : tCommon.showAll}</button>
      </div>

      {/* Profile Specials Toggles */}
      {ownedProfileSpecials.length > 0 && (
          <div className="bg-white rounded-[2rem] p-6 mb-6 shadow-xl border border-slate-100">
            <div className="flex items-center gap-3 mb-6">
                 <div className="p-2 bg-yellow-50 rounded-xl text-yellow-500"><Sparkles size={20} /></div>
                 <h3 className="font-bold text-slate-800">{t.activeSpecials}</h3>
            </div>
            <div className="space-y-3">
                {ownedProfileSpecials.map(item => {
                    const Icon = item.icon;
                    const isActive = (user.activeSpecials || []).includes(item.id);
                    return (
                        <div key={item.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                            <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center ${item.color}`}>
                                    <Icon size={20} />
                                </div>
                                <span className="font-bold text-slate-800">{item.label}</span>
                            </div>
                            <button 
                                onClick={() => handleToggleSpecial(item.id)}
                                className={`w-14 h-8 rounded-full transition-colors relative flex items-center px-1 ${isActive ? 'bg-emerald-500' : 'bg-slate-300'}`}
                            >
                                <div className={`w-6 h-6 bg-white rounded-full shadow-md transition-transform ${isActive ? 'translate-x-6' : 'translate-x-0'}`} />
                            </button>
                        </div>
                    );
                })}
            </div>
          </div>
      )}

      {/* Design / Themes Section */}
      <div className="bg-white rounded-[2rem] p-6 mb-6 shadow-xl border border-slate-100">
        <div className="flex items-center gap-3 mb-4">
             <div className="p-2 bg-orange-50 rounded-xl text-orange-500"><Palette size={20} /></div>
             <h3 className="font-bold text-slate-800">{t.design}</h3>
        </div>
        
        {/* Regular Colors */}
        <div className="mb-6">
          <div className="text-xs font-bold text-slate-400 uppercase mb-3">Standard Colors</div>
          <div className="grid grid-cols-5 md:grid-cols-10 gap-3 mb-4">
            {colors.map((c) => {
              const owned = isColorOwned(c);
              const isSelected = accentColor === c;
              const itemUnseen = isUnseen(`theme_${c}`);

              return (
                  <button 
                    key={c} 
                    onClick={() => owned && handleSelectColor(c)} 
                    disabled={!owned} 
                    title={c}
                    className={`relative aspect-square rounded-2xl transition-all duration-300 ${THEME_COLORS[c]} ${isSelected ? 'ring-4 ring-slate-900 ring-offset-2 scale-105 shadow-lg z-10' : 'scale-90 opacity-70 hover:opacity-100 hover:scale-100'}`}
                  >
                      {!owned && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-2xl backdrop-blur-[1px]">
                              <Lock size={14} className="text-white" />
                          </div>
                      )}
                      {isSelected && (
                          <div className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-md">
                              <Check size={12} className="text-slate-900" strokeWidth={4} />
                          </div>
                      )}
                      {owned && !isSelected && itemUnseen && (
                          <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 border-2 border-white rounded-full flex items-center justify-center shadow-md animate-bounce z-30">
                              <span className="text-white text-[10px] font-black">!</span>
                          </div>
                      )}
                  </button>
              )
            })}
          </div>
        </div>

        {/* VIP Gradient Colors */}
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-amber-600 uppercase mb-3">
            <Crown size={12} /> VIP Colors
          </div>
          <div className="grid grid-cols-5 md:grid-cols-10 gap-3">
            {vipColors.map((c) => {
              const owned = isVIPColorOwned(c);
              const isSelected = accentColor === c;
              const itemUnseen = isUnseen(`vip_${c}`);

              return (
                  <button 
                    key={c} 
                    onClick={() => owned && handleSelectColor(c)} 
                    disabled={!owned} 
                    title={c}
                    className={`relative aspect-square rounded-2xl transition-all duration-300 ${VIP_COLORS[c]} ${isSelected ? 'ring-4 ring-amber-500 ring-offset-2 scale-105 shadow-xl z-10' : 'scale-90 opacity-70 hover:opacity-100 hover:scale-100'}`}
                  >
                      {!owned && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-2xl backdrop-blur-[1px]">
                              <Crown size={16} className="text-amber-300" />
                          </div>
                      )}
                      {isSelected && (
                          <div className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-md">
                              <Check size={12} className="text-slate-900" strokeWidth={4} />
                          </div>
                      )}
                      {owned && !isSelected && itemUnseen && (
                          <div className="absolute -top-2 -right-2 w-6 h-6 bg-amber-500 border-2 border-white rounded-full flex items-center justify-center shadow-md animate-bounce z-30">
                              <Crown size={10} className="text-white" />
                          </div>
                      )}
                  </button>
              )
            })}
          </div>
        </div>
      </div>

            {isDevVisible && (
                <div className="bg-white rounded-[2rem] p-6 mb-6 shadow-xl border border-slate-100">
                    <div className="flex items-center gap-3 mb-4">
                             <div className="p-2 bg-slate-50 rounded-xl text-slate-500"><KeyRound size={20} /></div>
                             <h3 className="font-bold text-slate-800">Developer Console</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                        <input value={devEmail} onChange={(e) => setDevEmail(e.target.value)} placeholder="email@domain" className="p-3 border rounded-2xl" />
                        <input type="number" value={devAmount} onChange={(e) => setDevAmount(parseInt(e.target.value || '0'))} className="p-3 border rounded-2xl" placeholder="Amount to add" />
                        <div className="flex gap-2">
                            <button onClick={() => setDevEmail('vlasdvoranov@gmail.com')} className="p-2 bg-slate-100 rounded-2xl">vlasd...</button>
                            <button onClick={() => setDevEmail('sparify.at@gmail.com')} className="p-2 bg-slate-100 rounded-2xl">sparify...</button>
                        </div>
                    </div>

                    <div className="flex gap-3 mb-4">
                        <button onClick={handleDevAddCoins} disabled={devLoading} className="flex-1 bg-slate-900 text-white py-3 rounded-2xl font-bold">Add Coins</button>
                        <select value={devMode} onChange={(e) => setDevMode(e.target.value as AppMode)} className="p-3 rounded-2xl border">
                            <option value="kids">Kids</option>
                            <option value="adult">Adult</option>
                        </select>
                        <button onClick={handleDevSetMode} disabled={devLoading} className="bg-slate-100 py-3 px-4 rounded-2xl">Set Mode</button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                        <div className="flex gap-2">
                            <input type="number" value={devSetCoins ?? ''} onChange={(e) => setDevSetCoins(e.target.value === '' ? null : parseInt(e.target.value || '0'))} placeholder="Set coins" className="p-3 border rounded-2xl w-full" />
                            <button onClick={handleDevSetCoins} disabled={devLoading} className="p-3 bg-slate-900 text-white rounded-2xl">Set</button>
                        </div>

                        <div className="flex gap-2">
                            <input type="number" value={devAvatarId ?? ''} onChange={(e) => setDevAvatarId(e.target.value === '' ? null : parseInt(e.target.value || '0'))} placeholder="Avatar id" className="p-3 border rounded-2xl w-full" />
                            <button onClick={handleDevSetAvatar} disabled={devLoading} className="p-3 bg-slate-900 text-white rounded-2xl">Set Avatar</button>
                        </div>

                        <div className="flex gap-2">
                            <select value={devGiveItemId} onChange={(e) => setDevGiveItemId(e.target.value)} className="p-3 border rounded-2xl w-full">
                                <option value="">Select item...</option>
                                {SPECIALS_DATABASE.map(s => <option key={s.id} value={s.id}>{s.label} ({s.id})</option>)}
                            </select>
                            <button onClick={handleDevGiveItem} disabled={devLoading} className="p-3 bg-slate-900 text-white rounded-2xl">Give Item</button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4">
                        <div className="flex gap-2">
                            <select value={devGiveColor} onChange={(e) => setDevGiveColor(e.target.value as ThemeColor | '')} className="p-3 border rounded-2xl w-full">
                                <option value="">Select color...</option>
                                {colors.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                            <button onClick={handleDevGiveColor} disabled={devLoading} className="p-3 bg-slate-900 text-white rounded-2xl">Give Color</button>
                        </div>

                        <div className="flex gap-2">
                            <select value={devGiveVIPColor} onChange={(e) => setDevGiveVIPColor(e.target.value as VIPColor | '')} className="p-3 border rounded-2xl w-full">
                                <option value="">Select VIP...</option>
                                {vipColors.map(c => <option key={c} value={c}>{c.replace('vip_', '')}</option>)}
                            </select>
                            <button onClick={handleDevGiveVIPColor} disabled={devLoading} className="p-3 bg-amber-500 text-white rounded-2xl">Give VIP</button>
                        </div>

                        <div className="flex gap-2">
                            <button onClick={handleDevGiveAllColors} disabled={devLoading} className="p-3 bg-amber-400 text-white rounded-2xl">Give All Colors</button>
                        </div>

                        <div className="flex gap-2">
                            <button onClick={handleDevResetUnseen} disabled={devLoading} className="p-3 bg-slate-100 rounded-2xl">Reset Unseen</button>
                        </div>
                    </div>

                    <div className="text-sm text-slate-500">
                        <div>Status: {devStatus ?? 'Idle'}</div>
                    </div>
                </div>
            )}

      <div className="bg-white rounded-[2rem] p-6 mb-6 shadow-xl border border-slate-100">
        <div className="flex items-center gap-3 mb-6">
             <div className="p-2 bg-emerald-50 rounded-xl text-emerald-500"><Globe size={20} /></div>
             <h3 className="font-bold text-slate-800">{t.language}</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {languages.map((l) => (
            <button key={l.code} onClick={() => onUpdateUser({...user, language: l.code})} className={`p-4 rounded-2xl flex items-center gap-3 border transition-all ${language === l.code ? 'bg-slate-900 text-white shadow-lg' : 'bg-slate-50 text-slate-600'}`}>
              <span className="text-2xl">{l.flag}</span>
              <span className="font-bold">{l.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-[2rem] p-6 mb-8 shadow-xl border border-slate-100">
        <div className="flex items-center gap-3 mb-4">
             <div className="p-2 bg-slate-50 rounded-xl text-slate-500"><Info size={20} /></div>
             <h3 className="font-bold text-slate-800">{t.info}</h3>
        </div>
        <div className="flex justify-between items-center text-sm font-medium text-slate-500 mb-2">
            <span>{t.version}</span>
            <span>2.0.0</span>
        </div>
      </div>

      {/* Security / Reset Password Section */}
      <div className="bg-white rounded-[2rem] p-6 mb-6 shadow-xl border border-slate-100">
        <div className="flex items-center gap-3 mb-6">
             <div className="p-2 bg-slate-900 rounded-xl text-white"><Lock size={20} /></div>
             <h3 className="font-bold text-slate-800">{t.security}</h3>
        </div>
        <div className="space-y-3">
            <p className="text-sm text-slate-500 mb-4">Reset your password by sending a recovery email to your registered email address.</p>
            <button 
                onClick={handleResetPassword} 
                disabled={isResettingPassword}
                className="w-full py-3 bg-slate-100 text-slate-700 font-bold rounded-2xl border border-slate-200 hover:bg-slate-200 transition-all active:scale-95"
            >
                {isResettingPassword ? 'Sending...' : resetSent ? '✓ Email Sent' : 'Send Password Reset Email'}
            </button>
            {resetSent && (
                <p className="text-xs text-emerald-600 text-center mt-3 font-medium">Password reset email has been sent to {user.email}</p>
            )}
        </div>
      </div>

      <button onClick={() => setShowLogoutConfirm(true)} className="w-full py-4 bg-red-50 text-red-500 font-black rounded-[2rem] border-2 border-red-100 shadow-sm flex items-center justify-center space-x-2">
        <LogOut size={20} />
        <span>{t.logout}</span>
      </button>

      {showLogoutConfirm && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
              <div className="bg-white w-full max-w-sm rounded-[2.5rem] p-6 text-center shadow-2xl relative">
                   <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4 text-red-500 shadow-xl border-4 border-white">
                       <LogOut size={36} strokeWidth={2.5} />
                   </div>
                   <h3 className="text-xl font-black text-slate-800 mb-2">{t.logoutConfirm}</h3>
                   <div className="flex flex-col gap-3 mt-8">
                       <button onClick={onLogout} className="w-full bg-red-500 text-white font-black py-4 rounded-2xl shadow-xl">{t.logout}</button>
                       <button onClick={() => setShowLogoutConfirm(false)} className="w-full bg-slate-100 text-slate-500 font-bold py-4 rounded-2xl">{t.cancel}</button>
                   </div>
              </div>
          </div>
      )}
    </div>
  );
};
