import { id } from './id';
import { en } from './en';

export type Language = 'id' | 'en';
export type TranslationKey = keyof typeof id;

export function t(key: TranslationKey, lang: Language = 'id', vars?: Record<string, string | number>): string {
  const dict = lang === 'en' ? en : id;
  let text = dict[key] || id[key] || key;

  if (vars) {
    for (const [k, v] of Object.entries(vars)) {
      text = text.replace(new RegExp(`{{${k}}}`, 'g'), String(v));
    }
  }

  return text;
}
