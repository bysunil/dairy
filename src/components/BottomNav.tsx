import React from 'react';
import ReceiptCapture from './ReceiptCapture';
import { useTranslation } from '@/i18n/useTranslation';

interface BottomNavProps {
  language: 'EN' | 'TE';
  currentTab: 'home' | 'records' | 'profile';
  setCurrentTab: (tab: 'home' | 'records' | 'profile') => void;
  handleSaveReceipt: (data: any) => void;
}

export default function BottomNav({ 
  language, 
  currentTab, 
  setCurrentTab, 
  handleSaveReceipt 
}: BottomNavProps) {
  const { t } = useTranslation(language);

  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 bg-surface-container-lowest border-t-[3px] border-outline">
      <div className="max-w-lg mx-auto h-[76px] px-space-md flex justify-between items-center relative">
        {/* Left Tab: Home */}
        <button 
          onClick={() => setCurrentTab('home')}
          aria-label="Home" 
          className={`flex flex-col items-center justify-center min-w-[64px] min-h-[58px] active:translate-y-0.5 transition-transform ${currentTab === 'home' ? 'bg-primary-container text-on-primary rounded-xl px-3 py-1.5 border-2 border-outline' : 'text-on-surface-variant hover:bg-surface-container rounded-xl px-3 py-1.5'}`}
        >
          <span className="material-symbols-outlined text-[26px]" data-weight={currentTab === 'home' ? 'fill' : 'regular'}>home</span>
          <span className="font-label-sm text-label-sm mt-0.5">{t('nav.home')}</span>
        </button>
        
        {/* Center Elevated OCR Camera Button */}
        <div className="relative flex flex-col items-center justify-center -top-5">
           <ReceiptCapture onSave={handleSaveReceipt} language={language} />
        </div>

        {/* Right Tab: Records */}
        <button 
          onClick={() => setCurrentTab('records')}
          aria-label="Records" 
          className={`flex flex-col items-center justify-center min-w-[64px] min-h-[58px] active:translate-y-0.5 transition-transform ${currentTab === 'records' ? 'bg-primary-container text-on-primary rounded-xl px-3 py-1.5 border-2 border-outline' : 'text-on-surface-variant hover:bg-surface-container rounded-xl px-3 py-1.5'}`}
        >
          <span className="material-symbols-outlined text-[26px]" data-weight={currentTab === 'records' ? 'fill' : 'regular'}>receipt_long</span>
          <span className="font-label-sm text-label-sm mt-0.5">{t('nav.records')}</span>
        </button>
      </div>
    </nav>
  );
}
