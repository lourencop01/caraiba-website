import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ locale }) => {
  const validLocale = locale || routing.defaultLocale;

  const [common, content, pages, legal, metadata, faqs] = await Promise.all([
    import(`../../locales/${validLocale}/common.json`),
    import(`../../locales/${validLocale}/content.json`),
    import(`../../locales/${validLocale}/pages.json`),
    import(`../../locales/${validLocale}/legal.json`),
    import(`../../locales/${validLocale}/metadata.json`),
    import(`../../locales/${validLocale}/faqs.json`),
  ]);

  return {
    locale: validLocale,
    messages: {
      ...common.default,
      ...content.default,
      ...pages.default,
      ...legal.default,
      ...metadata.default,
      ...faqs.default,
    },
  };
});
