import en from './en.json';
import te from './te.json';

const dictionaries = { EN: en, TE: te };

type Dictionary = typeof en;

export function useTranslation(lang: 'EN' | 'TE') {
  const t = (path: string, ...args: any[]): string => {
    const keys = path.split('.');
    let value: any = dictionaries[lang];

    for (const key of keys) {
      if (value && typeof value === 'object' && key in value) {
        value = value[key as keyof typeof value];
      } else {
        return path; // Fallback to path if missing
      }
    }

    if (typeof value === 'string') {
      let str = value;
      args.forEach((arg, index) => {
        str = str.replace(`{${index}}`, String(arg));
      });
      return str;
    }
    
    return path;
  };

  return { t };
}
