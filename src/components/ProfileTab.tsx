import React from 'react';
import { User } from '@/types';
import { useTranslation } from '@/i18n/useTranslation';

interface ProfileTabProps {
  user: User;
  language: 'EN' | 'TE';
  handleLogout: () => void;
}

export default function ProfileTab({ user, language, handleLogout }: ProfileTabProps) {
  const { t } = useTranslation(language);

  return (
    <section className="space-y-4">
      <h2 className="font-headline-lg text-headline-lg text-on-surface">{t('profile.title')}</h2>
      <div className="bg-surface-container-lowest border-2 border-outline rounded-xl p-4 tactile-shadow">
        <div className="flex items-center gap-4 border-b-2 border-outline pb-4 mb-4">
          <div className="w-16 h-16 rounded-xl bg-primary-container text-on-primary flex items-center justify-center border-2 border-outline flex-shrink-0 font-headline-xl text-headline-xl">
            <span className="material-symbols-outlined text-[36px]">person</span>
          </div>
          <div>
            <h3 className="font-headline-md text-headline-md">{user.name}</h3>
            <p className="font-body-md text-on-surface-variant">{t('profile.mobile')}: {user.mobile_number}</p>
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between items-center bg-surface-bright p-3 border-2 border-outline rounded-lg">
            <span className="font-label-md">{t('profile.society_name')}</span>
            <span className="font-headline-sm">{user.center_name ? user.center_name : t('profile.no_society_set')}</span>
          </div>
          
          <div className="pt-4 border-t-2 border-outline">
            <button 
              onClick={handleLogout} 
              className="w-full py-3 border-2 border-error text-error font-headline-sm text-headline-sm rounded-xl hover:bg-error-container tactile-shadow active:translate-y-1 active:shadow-none transition-all"
            >
              {t('profile.sign_out')}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
