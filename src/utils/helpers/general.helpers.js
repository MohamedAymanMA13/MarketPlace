export function moneyRenderer(locale, currencyCode, amount) {
  let localeToUse = locale === 'ar' ? 'ar-EG' : 'en-US';
  return new Intl.NumberFormat(localeToUse, {
    style: 'currency',
    currency: currencyCode,
    maximumFractionDigits: 0,
  }).format(Math.round(amount));
}
