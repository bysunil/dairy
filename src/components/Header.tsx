import React from 'react';
import { User } from '@/types';
import { useTranslation } from '@/i18n/useTranslation';

interface HeaderProps {
  user: User;
  language: 'EN' | 'TE';
  setCurrentTab: (tab: 'profile') => void;
  isLangMenuOpen: boolean;
  setIsLangMenuOpen: (open: boolean) => void;
  changeLanguage: (lang: 'EN' | 'TE') => void;
}

export default function Header({ 
  user, 
  language, 
  setCurrentTab, 
  isLangMenuOpen, 
  setIsLangMenuOpen, 
  changeLanguage 
}: HeaderProps) {
  const { t } = useTranslation(language);

  return (
    <header className="sticky top-0 z-40 bg-surface border-b-2 border-outline px-space-md py-space-sm shadow-sm flex justify-between items-center w-full">
      <div className="flex items-center gap-3">
        <button onClick={() => setCurrentTab('profile')} className="w-11 h-11 bg-primary-container text-on-primary border-2 border-outline flex items-center justify-center rounded-xl font-label-lg text-label-lg shadow-sm">
          <span className="material-symbols-outlined text-[24px]">account_circle</span>
        </button>
        <div className="flex flex-col text-left">
          <span className="font-label-sm text-label-sm text-tertiary">
            {user.center_name ? user.center_name : t('nav.no_society')}
          </span>
          <span className="font-label-md text-label-md text-on-surface font-bold">{user.name}</span>
        </div>
      </div>
      <div className="relative">
        <button onClick={() => setIsLangMenuOpen(!isLangMenuOpen)} className="flex items-center bg-surface-container-lowest border-2 border-outline px-3 py-1.5 rounded-full tactile-shadow active:translate-y-0.5 transition-transform">
          <span className="material-symbols-outlined text-[18px] text-primary mr-1">translate</span>
          <span className="font-label-sm text-label-sm text-on-surface">{language}</span>
        </button>
        {isLangMenuOpen && (
          <div className="absolute right-0 mt-2 w-36 bg-surface-container-lowest border-2 border-outline rounded-xl shadow-lg z-50 overflow-hidden">
            <button 
              onClick={() => changeLanguage('EN')}
              className={`w-full text-left px-4 py-3 font-label-md ${language === 'EN' ? 'bg-primary-container text-on-primary' : 'text-on-surface hover:bg-surface-bright'}`}
            >
              English (EN)
            </button>
            <button 
              onClick={() => changeLanguage('TE')}
              className={`w-full text-left px-4 py-3 font-label-md border-t-2 border-outline ${language === 'TE' ? 'bg-primary-container text-on-primary' : 'text-on-surface hover:bg-surface-bright'}`}
            >
              తెలుగు (TE)
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
