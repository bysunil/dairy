import React, { useState } from 'react';
import { useTranslation } from '@/i18n/useTranslation';

interface LoginScreenProps {
  language: 'EN' | 'TE';
  loginName: string;
  setLoginName: (name: string) => void;
  loginMobile: string;
  setLoginMobile: (mobile: string) => void;
  handleAuth: (e: React.FormEvent, isSignup: boolean) => void;
  toggleLanguage: () => void;
}

export default function LoginScreen({ 
  language, 
  loginName, 
  setLoginName, 
  loginMobile, 
  setLoginMobile, 
  handleAuth, 
  toggleLanguage 
}: LoginScreenProps) {
  const { t } = useTranslation(language);
  const [isSignup, setIsSignup] = useState(false);

  return (
    <main className="min-h-screen bg-surface flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-sm bg-surface-container-lowest border-2 border-outline rounded-2xl p-6 tactile-shadow-lg">
        <div className="flex flex-col items-center gap-3 mb-8 text-center">
          <div className="w-16 h-16 bg-primary-container text-on-primary rounded-2xl border-2 border-outline flex items-center justify-center tactile-shadow">
            <span className="material-symbols-outlined text-[36px]" data-weight="fill">water_drop</span>
          </div>
          <h1 className="font-headline-xl text-headline-xl text-on-surface">DairyBill</h1>
          <p className="font-body-md text-on-surface-variant">
            {isSignup ? t('auth.signup_prompt') : t('auth.login_prompt')}
          </p>
        </div>
        
        <form onSubmit={(e) => handleAuth(e, isSignup)} className="space-y-4">
          <div className="space-y-1.5">
            <label className="font-label-md text-label-md text-on-surface">
              {t('auth.farmer_name')}
            </label>
            <input 
              type="text" 
              value={loginName}
              onChange={(e) => setLoginName(e.target.value)}
              placeholder={t('auth.farmer_name_placeholder')}
              className="w-full font-body-lg text-[18px] p-3 border-2 border-outline rounded-xl focus:outline-none focus:border-primary tactile-shadow bg-surface-bright"
              required
            />
          </div>
          <div className="space-y-1.5">
            <label className="font-label-md text-label-md text-on-surface">
              {t('auth.mobile_number')}
            </label>
            <input 
              type="tel" 
              value={loginMobile}
              onChange={(e) => setLoginMobile(e.target.value)}
              placeholder={t('auth.mobile_number_placeholder')}
              className="w-full font-body-lg text-[18px] p-3 border-2 border-outline rounded-xl focus:outline-none focus:border-primary tactile-shadow bg-surface-bright"
              required
            />
          </div>
          <button 
            type="submit"
            className="w-full py-4 mt-4 bg-primary text-on-primary font-headline-md text-headline-md rounded-xl border-2 border-outline tactile-shadow flex items-center justify-center gap-2 active:translate-y-1 active:shadow-none transition-all"
          >
            {isSignup ? t('auth.sign_up') : t('auth.sign_in')}
          </button>
        </form>
        
        <div className="mt-4 text-center">
          <button 
            onClick={() => setIsSignup(!isSignup)}
            className="text-primary font-label-md underline underline-offset-4"
          >
            {isSignup ? t('auth.have_account') : t('auth.no_account')}
          </button>
        </div>

        <div className="mt-6 flex justify-center">
          <button onClick={toggleLanguage} className="flex items-center gap-1.5 text-white font-label-md bg-primary-container px-4 py-2 rounded-full border-2 border-outline tactile-shadow active:translate-y-0.5">
            <span className="material-symbols-outlined text-[18px] text-white">translate</span>
            {t('auth.switch_lang')}
          </button>
        </div>
      </div>
    </main>
  );
}
