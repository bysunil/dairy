'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from '@/i18n/useTranslation';

export default function ReceiptCapture({ onSave, language = 'EN' }: { onSave?: (data: any) => void, language?: 'EN' | 'TE' }) {
  const { t } = useTranslation(language);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showRetryMessage, setShowRetryMessage] = useState(false);
  const [extractedData, setExtractedData] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (isProcessing) {
      timeoutId = setTimeout(() => {
        setShowRetryMessage(true);
      }, 5000); // Show after 5 seconds
    } else {
      setShowRetryMessage(false);
    }
    return () => clearTimeout(timeoutId);
  }, [isProcessing]);

  const handleCapture = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);
    setImagePreview(URL.createObjectURL(file));
    setIsProcessing(true);

    const formData = new FormData();
    formData.append('image', file);

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || '';
      const res = await fetch(`${baseUrl}/api/receipts/extract`, {
        method: 'POST',
        body: formData,
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.detail || json.error || 'Failed to extract');

      setExtractedData(json.data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSave = () => {
    if (onSave) onSave(extractedData);
    setImagePreview(null);
    setExtractedData(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleCancel = () => {
    setImagePreview(null);
    setExtractedData(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <input
          type="file"
          accept="image/*"
          capture="environment"
          ref={fileInputRef}
          className="hidden"
          onChange={handleCapture}
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          aria-label="Scan Milk Slip"
          className="w-[72px] h-[72px] rounded-full bg-primary-container text-on-primary border-[3.5px] border-outline tactile-shadow flex flex-col items-center justify-center ring-4 ring-surface-container-lowest active:translate-y-1 active:shadow-none transition-transform"
        >
          <span className="material-symbols-outlined text-[32px] leading-none text-on-primary" data-weight="fill">document_scanner</span>
          <span className="font-label-sm text-[11px] text-on-primary font-bold mt-0.5">{t('scanner.scan')}</span>
        </button>
      </div>

      {/* Verification Modal in Kisan Dairy Bold Style */}
      {(imagePreview || isProcessing) && (
        <div className="fixed inset-0 z-[100] flex flex-col bg-inverse-surface/80 justify-end animate-in fade-in">
          <div className="bg-surface-container-lowest w-full rounded-t-[16px] overflow-hidden border-t-4 border-outline flex flex-col max-h-[90vh]">
            {/* Header */}
            <div className="p-4 border-b-2 border-outline flex justify-between items-center bg-surface">
              <h2 className="font-headline-md text-headline-md text-on-surface">{t('scanner.verify_details')}</h2>
              <button onClick={handleCancel} className="text-on-surface hover:text-error">
                <span className="material-symbols-outlined text-[28px]">cancel</span>
              </button>
            </div>

            {/* Content Area */}
            <div className="overflow-y-auto p-4 flex flex-col gap-4">
              {/* Image Preview */}
              {imagePreview && (
                <div className="w-full h-40 bg-surface-container-high rounded-xl overflow-hidden relative border-2 border-outline tactile-shadow">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={imagePreview} alt="Receipt" className="w-full h-full object-cover" />
                </div>
              )}

              {/* Loading State */}
              {isProcessing && (
                <div className="flex flex-col items-center justify-center py-10">
                  <span className="material-symbols-outlined text-[48px] text-primary animate-spin mb-4">progress_activity</span>
                  <p className="font-headline-sm text-headline-sm text-on-surface text-center px-4">
                    {showRetryMessage ? t('scanner.retrying') : t('scanner.analyzing')}
                  </p>
                </div>
              )}

              {/* Error State */}
              {!isProcessing && error && (
                <div className="bg-error-container border-2 border-error text-on-error-container p-4 rounded-xl flex items-start gap-3 tactile-shadow">
                  <span className="material-symbols-outlined text-[24px]">error</span>
                  <p className="font-body-md text-body-md">{error}</p>
                </div>
              )}

              {/* Form Data */}
              {!isProcessing && extractedData && !error && (
                <div className="flex flex-col gap-4">
                  <div className="bg-surface-container-high border-2 border-outline p-3 rounded-xl tactile-shadow">
                    <p className="font-label-md text-label-md text-on-surface mb-1">
                      {extractedData.date} | Shift: {extractedData.shift}
                    </p>
                    <p className="font-label-sm text-[11px] text-on-surface-variant uppercase">
                      {extractedData.center_name}
                    </p>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-label-sm text-label-sm text-on-surface-variant uppercase">{t('scanner.liters')}</label>
                    <input 
                      type="number" 
                      value={extractedData.quantity}
                      onChange={(e) => setExtractedData({...extractedData, quantity: parseFloat(e.target.value)})}
                      className="w-full font-headline-xl text-[32px] p-3 border-2 border-outline rounded-xl focus:outline-none focus:border-primary tactile-shadow bg-surface-container-lowest"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="font-label-sm text-label-sm text-on-surface-variant uppercase">{t('scanner.rate')}</label>
                      <input 
                        type="number" 
                        value={extractedData.rate}
                        onChange={(e) => setExtractedData({...extractedData, rate: parseFloat(e.target.value)})}
                        className="w-full font-headline-md text-[20px] p-3 border-2 border-outline rounded-xl focus:outline-none focus:border-primary tactile-shadow bg-surface-container-lowest"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="font-label-sm text-label-sm text-on-surface-variant uppercase">{t('scanner.amount')}</label>
                      <input 
                        type="number" 
                        value={extractedData.total_amount}
                        onChange={(e) => setExtractedData({...extractedData, total_amount: parseFloat(e.target.value)})}
                        className="w-full font-headline-md text-[20px] p-3 border-2 border-outline bg-primary-container text-on-primary rounded-xl focus:outline-none tactile-shadow"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mt-2">
                     <div className="bg-surface border-2 border-outline p-3 rounded-xl flex justify-between items-center tactile-shadow">
                        <span className="font-label-sm text-label-sm text-on-surface-variant">FAT</span>
                        <span className="font-headline-sm text-headline-sm">{extractedData.fat}</span>
                     </div>
                     <div className="bg-surface border-2 border-outline p-3 rounded-xl flex justify-between items-center tactile-shadow">
                        <span className="font-label-sm text-label-sm text-on-surface-variant">SNF</span>
                        <span className="font-headline-sm text-headline-sm">{extractedData.snf}</span>
                     </div>
                  </div>
                </div>
              )}
            </div>

            {/* Sticky Action Footer */}
            {!isProcessing && extractedData && !error && (
              <div className="p-4 border-t-2 border-outline bg-surface-container-lowest">
                <button
                  onClick={handleSave}
                  className="w-full py-4 bg-primary text-on-primary font-headline-md text-headline-md rounded-xl border-2 border-outline tactile-shadow flex items-center justify-center gap-2 active:translate-y-1 active:shadow-none transition-all"
                >
                  <span className="material-symbols-outlined text-[24px]">save</span>
                  {t('scanner.save_sync')}
                </button>
              </div>
            )}
            
            {/* Action Footer for Error */}
            {!isProcessing && error && (
               <div className="p-4 border-t-2 border-outline bg-surface-container-lowest">
               <button
                 onClick={() => fileInputRef.current?.click()}
                 className="w-full py-4 bg-secondary text-on-secondary font-headline-md text-headline-md rounded-xl border-2 border-outline tactile-shadow flex items-center justify-center gap-2 active:translate-y-1 active:shadow-none transition-all"
               >
                 <span className="material-symbols-outlined text-[24px]">upload</span>
                 {t('scanner.try_again')}
               </button>
             </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
