const USD_PER_RUPEE = 83;

export function isIndia() {
  if (typeof Intl !== 'undefined') {
    try {
      const zone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (zone) return zone === 'Asia/Kolkata' || zone === 'Asia/Calcutta';
    } catch (err) {
      /* timezone lookup can fail in locked-down browsers */
    }
  }
  if (typeof navigator === 'undefined') return true;
  const locales = navigator.languages && navigator.languages.length
    ? navigator.languages
    : [navigator.language];
  return locales.some((locale) => /-IN\b/i.test(locale || ''));
}

export function usdFromInr(inr) {
  if (!inr) return 0;
  return Math.round(inr / USD_PER_RUPEE);
}

export function formatPlanPrice(inr, india = isIndia()) {
  if (india) return inr ? `₹${inr.toLocaleString('en-IN')}` : '₹0';
  const usd = usdFromInr(inr);
  return usd ? `$${usd.toLocaleString('en-US')}` : '$0';
}

export function planPriceNote(india = isIndia()) {
  return india
    ? 'Prices are in Indian rupees, per month.'
    : 'Prices are in US dollars, per month.';
}
