import { API_BASE } from './apiBase';

/**
 * Schoolabe public agency leads API (same endpoint BuildNaya uses).
 * Production: https://api.schoolabe.com/api/v1/agency/leads
 * Local: derived from REACT_APP_API_URL (…/api/v1/rms → …/api/v1/agency/leads)
 */
export function agencyLeadsUrl() {
  if (process.env.REACT_APP_LEADS_URL) {
    return process.env.REACT_APP_LEADS_URL.replace(/\/$/, '');
  }
  const root = API_BASE.replace(/\/rms\/?$/, '');
  return `${root}/agency/leads`;
}

const BUSINESS_LABEL = {
  restaurant: 'Restaurant',
  cafe: 'Cafe',
  'bar-lounge': 'Bar / lounge',
  hotel: 'Hotel',
  'food-cart': 'Cloud kitchen / food cart',
  other: 'Other',
};

/** Map Servya venue type → agency service enum. */
export function serviceForBusiness(business) {
  if (business === 'other') return 'not-sure';
  return 'web';
}

/**
 * Submit a Servya demo / contact enquiry to Schoolabe.
 * @returns {{ ok: true, id?: number, message?: string } | { ok: false, error: string, status?: number }}
 */
export async function submitServyaLead({
  name,
  email,
  phone = '',
  business = '',
  message,
  website = '',
}) {
  const venue = BUSINESS_LABEL[business] || business || '—';
  const lines = [
    'Servya demo / contact enquiry',
    `Business type: ${venue}`,
  ];
  if (phone.trim()) lines.push(`Phone: ${phone.trim()}`);
  lines.push('', message.trim());
  const brief = lines.join('\n').slice(0, 4000);

  let response;
  try {
    response = await fetch(agencyLeadsUrl(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        name: name.trim(),
        email: email.trim(),
        company: venue === '—' ? null : venue,
        service: serviceForBusiness(business),
        message: brief,
        website: website || '',
        source: 'servya.buildnaya.com',
      }),
    });
  } catch {
    return { ok: false, error: 'The message didn’t send. Check your connection and try again.' };
  }

  if (response.status === 429) {
    return { ok: false, status: 429, error: 'Too many messages just now. Wait a little, then send again.' };
  }

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const detail = typeof data.detail === 'string'
      ? data.detail
      : Array.isArray(data.detail)
        ? 'Please check the form and try again.'
        : null;
    return {
      ok: false,
      status: response.status,
      error: detail || data.message || data.error || 'The message didn’t send. Your words are still in the form.',
    };
  }

  return {
    ok: true,
    id: data.id,
    message: data.message || 'Thanks — we’ll reply within 1 business day.',
  };
}
