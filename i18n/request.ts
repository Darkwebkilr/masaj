import {getRequestConfig} from 'next-intl/server';
import {notFound} from 'next/navigation';

// Desteklenen diller
export const locales = ['tr', 'en', 'de', 'ru', 'ar'] as const;

export default getRequestConfig(async ({requestLocale}) => {
  const locale = await requestLocale;
  
  // Locale kontrolü ve tip koruması
  if (!locale || !locales.includes(locale as any)) notFound();

  return {
    locale: locale as string,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});
