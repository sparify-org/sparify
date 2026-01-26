import React, { useState } from 'react';
import { X, Eye, EyeOff, Lock, Check } from 'lucide-react';

interface PasswordResetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (oldPassword: string, newPassword: string) => Promise<void>;
  isLoading?: boolean;
  error?: string;
}

export const PasswordResetModal: React.FC<PasswordResetModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  isLoading = false,
  error = ''
}) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [localError, setLocalError] = useState('');
  const [success, setSuccess] = useState(false);

  const validatePasswords = () => {
    setLocalError('');
    
    if (!oldPassword) {
      setLocalError('Altes Passwort ist erforderlich');
      return false;
    }
    if (!newPassword) {
      setLocalError('Neues Passwort ist erforderlich');
      return false;
    }
    if (newPassword.length < 6) {
      setLocalError('Passwort muss mindestens 6 Zeichen lang sein');
      return false;
    }
    if (newPassword !== confirmPassword) {
      setLocalError('Passwörter stimmen nicht überein');
      return false;
    }
    if (oldPassword === newPassword) {
      setLocalError('Neues Passwort muss sich vom alten unterscheiden');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validatePasswords()) return;

    try {
      await onSubmit(oldPassword, newPassword);
      setSuccess(true);
      setTimeout(() => {
        resetForm();
        onClose();
      }, 2000);
    } catch (err) {
      setLocalError(error || 'Ein Fehler ist aufgetreten');
    }
  };

  const resetForm = () => {
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setLocalError('');
    setSuccess(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-6">
      <div className="bg-[#1e1e2e] border-2 border-slate-700 w-full max-w-md rounded-3xl p-8 relative animate-in zoom-in-95 duration-200 shadow-2xl">
        <button
          onClick={() => {
            resetForm();
            onClose();
          }}
          className="absolute -top-4 -right-4 bg-slate-700 text-white p-3 rounded-full border-4 border-[#1e1e2e] hover:bg-slate-600 transition-colors"
        >
          <X size={24} />
        </button>

        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center bg-slate-700 text-white">
            <Lock size={32} />
          </div>
          <h3 className="text-2xl font-black text-white">Passwort ändern</h3>
          <p className="text-slate-400 text-sm mt-2">Gib dein altes und neues Passwort ein</p>
        </div>

        {success ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center bg-emerald-500/10 border-2 border-emerald-500">
              <Check size={32} className="text-emerald-500" />
            </div>
            <p className="text-emerald-400 font-bold">Passwort erfolgreich geändert!</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Old Password */}
            <div>
              <label className="block text-white font-bold text-sm mb-2">Altes Passwort</label>
              <div className="relative">
                <input
                  type={showOld ? 'text' : 'password'}
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  disabled={isLoading}
                  className="w-full bg-slate-800 border-2 border-slate-700 text-white placeholder-slate-500 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors disabled:opacity-50"
                  placeholder="Dein aktuelles Passwort"
                />
                <button
                  type="button"
                  onClick={() => setShowOld(!showOld)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300"
                >
                  {showOld ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* New Password */}
            <div>
              <label className="block text-white font-bold text-sm mb-2">Neues Passwort</label>
              <div className="relative">
                <input
                  type={showNew ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  disabled={isLoading}
                  className="w-full bg-slate-800 border-2 border-slate-700 text-white placeholder-slate-500 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors disabled:opacity-50"
                  placeholder="Wähle ein neues Passwort"
                />
                <button
                  type="button"
                  onClick={() => setShowNew(!showNew)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300"
                >
                  {showNew ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-white font-bold text-sm mb-2">Passwort wiederholen</label>
              <div className="relative">
                <input
                  type={showConfirm ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={isLoading}
                  className="w-full bg-slate-800 border-2 border-slate-700 text-white placeholder-slate-500 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors disabled:opacity-50"
                  placeholder="Wiederhole dein neues Passwort"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300"
                >
                  {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {newPassword && confirmPassword && newPassword === confirmPassword && (
                <p className="text-emerald-400 text-xs mt-1 flex items-center gap-1">
                  <Check size={12} /> Passwörter stimmen überein
                </p>
              )}
            </div>

            {/* Error Message */}
            {(localError || error) && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3">
                <p className="text-red-400 text-sm font-bold">{localError || error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || !oldPassword || !newPassword || !confirmPassword}
              className="w-full bg-[#58cc02] text-white font-black text-lg py-4 rounded-2xl shadow-[0_6px_0_#46a302] active:translate-y-1 active:shadow-none uppercase tracking-wide transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#5ab600]"
            >
              {isLoading ? 'Wird gespeichert...' : 'Passwort ändern'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
