import QRCode from 'qrcode';
import { safeHtmlText } from './safeText';

/** Shared status vocabulary for staff + guest (BUG-013). */
export const COLUMNS = [
  { key: 'new', title: 'New', statuses: ['pending'] },
  { key: 'accepted', title: 'Accepted', statuses: ['accepted'] },
  { key: 'cooking', title: 'Cooking', statuses: ['cooking', 'cooking_done'] },
  { key: 'ready', title: 'Ready', statuses: ['ready_for_pickup'] },
  { key: 'served', title: 'Served', statuses: ['delivered', 'completed'] },
];

export const NEXT = {
  pending: { status: 'accepted', label: 'Accept' },
  accepted: { status: 'cooking', label: 'Start cooking' },
  cooking: { status: 'ready_for_pickup', label: 'Mark ready' },
  cooking_done: { status: 'ready_for_pickup', label: 'Mark ready' },
  ready_for_pickup: { status: 'delivered', label: 'Mark served' },
};

export const STATUS_COPY = {
  pending: 'New',
  accepted: 'Accepted',
  cooking: 'Cooking',
  cooking_done: 'Cooking',
  ready_for_pickup: 'Ready',
  delivered: 'Served',
  completed: 'Served',
  cancelled: 'Cancelled',
};

/** Same labels as staff — guests should not see a different vocabulary. */
export const GUEST_STATUS_COPY = { ...STATUS_COPY };

export const rupee = (value) => `₹${Number(value || 0).toLocaleString('en-IN')}`;

export const isClosedStatus = (status) =>
  ['completed', 'cancelled', 'delivered'].includes(status);

export const countOpenOrders = (orders) =>
  orders.filter((order) => !isClosedStatus(order.status)).length;

export const countActiveTickets = (orders) =>
  orders.filter((order) => order.status !== 'cancelled').length;

export const ticketAge = (createdAt) => {
  if (!createdAt) return '';
  const ms = Date.now() - new Date(createdAt).getTime();
  if (Number.isNaN(ms) || ms < 0) return '';
  const minutes = Math.floor(ms / 60000);
  if (minutes < 1) return '<1m';
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  return `${hours}h ${minutes % 60}m`;
};

export const ticketAgeClass = (createdAt) => {
  if (!createdAt) return '';
  const minutes = Math.floor((Date.now() - new Date(createdAt).getTime()) / 60000);
  return minutes > 10 ? 'ro-age-hot' : '';
};

const escapeHtml = (value) => safeHtmlText(value, '');

const formatWhen = (value) => {
  const date = value ? new Date(value) : new Date();
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
};

const receiptStyles = `
  * { box-sizing: border-box; }
  body {
    margin: 0;
    padding: 10px 8px;
    color: #111;
    background: #fff;
    font-family: "Courier New", Courier, ui-monospace, monospace;
    font-size: 12px;
    line-height: 1.35;
  }
  .slip {
    width: 72mm;
    max-width: 100%;
    margin: 0 auto;
  }
  .center { text-align: center; }
  .right { text-align: right; }
  .muted { color: #444; font-size: 11px; }
  .brand {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 16px;
    font-weight: 800;
    letter-spacing: 0.02em;
    margin: 0 0 4px;
    text-transform: uppercase;
  }
  .title {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 14px;
    font-weight: 800;
    margin: 8px 0 4px;
    letter-spacing: 0.08em;
  }
  .dash {
    border: 0;
    border-top: 1px dashed #222;
    margin: 8px 0;
  }
  .block {
    border: 0;
    border-top: 2px dashed #222;
    margin: 8px 0;
  }
  .meta {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2px 8px;
    font-size: 11px;
  }
  .meta .full { grid-column: 1 / -1; }
  table.items {
    width: 100%;
    border-collapse: collapse;
    margin: 4px 0;
  }
  table.items th, table.items td {
    padding: 3px 0;
    vertical-align: top;
    font-size: 11px;
  }
  table.items th {
    font-weight: 700;
    border-bottom: 1px dashed #222;
  }
  table.items .n { width: 18px; }
  table.items .q { width: 28px; text-align: center; }
  table.items .r, table.items .t { width: 52px; text-align: right; }
  .row { display: flex; justify-content: space-between; gap: 8px; margin: 3px 0; }
  .grand {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 15px;
    font-weight: 800;
    text-align: center;
    margin: 8px 0;
  }
  .qr {
    display: block;
    width: 120px;
    height: 120px;
    margin: 8px auto 4px;
  }
  .thanks {
    font-family: Arial, Helvetica, sans-serif;
    font-weight: 700;
    margin: 10px 0 4px;
  }
  @media print {
    @page { margin: 4mm; size: 80mm auto; }
    body { padding: 0; }
  }
`;

const openPrintHtml = (html, title = 'Print') => {
  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const frame = document.createElement('iframe');
  frame.setAttribute('title', title);
  frame.setAttribute('aria-hidden', 'true');
  frame.style.cssText = 'position:fixed;right:0;bottom:0;width:0;height:0;border:0;opacity:0;pointer-events:none';
  document.body.appendChild(frame);

  const cleanup = (delayMs = 1500) => {
    window.setTimeout(() => {
      try {
        frame.remove();
      } catch {
        /* ignore */
      }
      URL.revokeObjectURL(url);
    }, delayMs);
  };

  frame.onload = () => {
    const win = frame.contentWindow;
    if (!win) {
      cleanup(0);
      window.alert('Could not open print preview. Try again.');
      return;
    }
    try {
      win.focus();
      win.print();
      cleanup(2000);
    } catch {
      const popup = window.open(url, '_blank');
      if (!popup) {
        cleanup(0);
        window.alert('Allow pop-ups to print KOT / bill.');
        return;
      }
      cleanup(60_000);
    }
  };

  frame.src = url;
  return true;
};

const venueFromCaches = (cartId) => {
  const id = Number(cartId);
  const bundles = [
    cachePeek('worker-dashboard')?.carts,
    cachePeek('owner-dashboard')?.carts,
  ];
  for (const carts of bundles) {
    const hit = (carts || []).find((cart) => Number(cart.id) === id);
    if (hit) {
      return {
        name: hit.name,
        location: hit.location,
        description: hit.description,
        id: hit.id,
      };
    }
  }
  return { id: cartId };
};

const cachePeek = (key) => {
  try {
    const raw = sessionStorage.getItem(`servya-cache:${key}`);
    if (!raw) return null;
    return JSON.parse(raw)?.data ?? null;
  } catch {
    return null;
  }
};

const resolveVenue = (orderOrCartId, venue) => {
  if (venue?.name) return venue;
  const cartId = typeof orderOrCartId === 'object' ? orderOrCartId?.cartId : orderOrCartId;
  return { ...venueFromCaches(cartId), ...(venue || {}) };
};

const itemRate = (item) => {
  if (item.unitPrice != null) return Number(item.unitPrice);
  if (item.totalPrice != null && item.quantity) return Number(item.totalPrice) / Number(item.quantity || 1);
  return 0;
};

const itemTotal = (item) => {
  if (item.totalPrice != null) return Number(item.totalPrice);
  return itemRate(item) * Number(item.quantity || 0);
};

const buildItemRows = (items, { withRates = true } = {}) => {
  const list = items || [];
  if (!list.length) {
    return `<tr><td colspan="${withRates ? 4 : 2}">No items</td></tr>`;
  }
  return list
    .map((item, index) => {
      const name = escapeHtml(item.itemName || item.name || 'Item');
      const qty = escapeHtml(item.quantity || 0);
      if (!withRates) {
        return `<tr><td class="n">${index + 1}.</td><td>${name}</td><td class="q">${qty}</td></tr>`;
      }
      return `<tr>
        <td>${index + 1}. ${name}</td>
        <td class="q">${qty}</td>
        <td class="r">${escapeHtml(rupee(itemRate(item)))}</td>
        <td class="t">${escapeHtml(rupee(itemTotal(item)))}</td>
      </tr>`;
    })
    .join('');
};

const receiptShell = ({
  venue,
  docTitle,
  slipTitle,
  metaHtml,
  bodyHtml,
  footerHtml = '',
}) => `<!doctype html><html><head><meta charset="utf-8"/><title>${escapeHtml(docTitle)}</title>
<style>${receiptStyles}</style></head><body>
  <div class="slip">
    <div class="center">
      <p class="muted">Powered by Servya</p>
      <h1 class="brand">${escapeHtml(venue.name || 'Restaurant')}</h1>
      ${venue.location ? `<p class="muted">${escapeHtml(venue.location)}</p>` : ''}
      ${venue.description ? `<p class="muted">${escapeHtml(venue.description)}</p>` : ''}
      <p class="title">${escapeHtml(slipTitle)}</p>
    </div>
    <hr class="dash"/>
    ${metaHtml}
    <hr class="block"/>
    ${bodyHtml}
    ${footerHtml}
  </div>
  <script>
    window.addEventListener('load', function () {
      setTimeout(function () { window.focus(); window.print(); }, 80);
    });
  </script>
</body></html>`;

export const printKot = async (order, venue = {}) => {
  if (!order) return false;
  const place = resolveVenue(order, venue);
  const when = formatWhen(order.createdAt);
  const items = order.items || [];
  const qtyTotal = items.reduce((sum, item) => sum + Number(item.quantity || 0), 0);
  const metaHtml = `
    <div class="meta">
      <div><strong>KOT No:</strong> ${escapeHtml(order.orderNumber || '—')}</div>
      <div class="right"><strong>Table:</strong> ${escapeHtml(order.tableNumber || '—')}</div>
      <div class="full"><strong>Guest:</strong> ${escapeHtml(order.customerName || 'Guest')}</div>
      <div class="full muted">${escapeHtml(when)}</div>
      <div class="full muted">Status: ${escapeHtml(STATUS_COPY[order.status] || order.status || '')}</div>
      ${order.specialInstructions ? `<div class="full"><strong>Note:</strong> ${escapeHtml(order.specialInstructions)}</div>` : ''}
    </div>`;
  const bodyHtml = `
    <table class="items">
      <thead><tr><th class="n">#</th><th>Item</th><th class="q">Qty</th></tr></thead>
      <tbody>${buildItemRows(items, { withRates: false })}</tbody>
    </table>
    <hr class="dash"/>
    <div class="row"><span>Total Qty</span><strong>${escapeHtml(qtyTotal)}</strong></div>
    <p class="center thanks">*** KITCHEN COPY ***</p>
    <p class="center muted">Thank you!</p>`;

  const html = receiptShell({
    venue: place,
    docTitle: `KOT ${order.orderNumber || ''}`,
    slipTitle: 'KOT',
    metaHtml,
    bodyHtml,
  });
  return openPrintHtml(html, `KOT ${order.orderNumber || ''}`);
};

export const printBill = async (bill, tableLabel, venue = {}) => {
  const orders = (bill?.orders || []).filter((order) => order.status !== 'cancelled');
  const place = resolveVenue(orders[0]?.cartId || venue.id, venue);
  const when = formatWhen(orders[0]?.createdAt || Date.now());
  const billNo = orders.map((order) => order.orderNumber).filter(Boolean).join(', ') || tableLabel || '—';

  const lines = [];
  orders.forEach((order) => {
    (order.items || []).forEach((item) => {
      lines.push({
        name: item.name || item.itemName || 'Item',
        quantity: item.quantity,
        unitPrice: item.unitPrice ?? itemRate(item),
        totalPrice: item.totalPrice ?? itemTotal(item),
      });
    });
  });

  const qtyTotal = lines.reduce((sum, item) => sum + Number(item.quantity || 0), 0);
  const amount = Number(bill?.bill ?? lines.reduce((sum, item) => sum + itemTotal(item), 0));

  let qrImg = '';
  const payUrl =
    place.id != null
      ? `${window.location.origin}/guest/${place.id}${tableLabel ? `?table=${encodeURIComponent(tableLabel)}` : ''}`
      : '';
  if (payUrl) {
    try {
      const dataUrl = await QRCode.toDataURL(payUrl, {
        margin: 1,
        width: 160,
        errorCorrectionLevel: 'M',
      });
      qrImg = `<img class="qr" alt="Pay QR" src="${dataUrl}" />
        <p class="center muted">Scan for menu / table bill</p>`;
    } catch {
      qrImg = '';
    }
  }

  const guestNames = Array.from(
    new Set(
      orders
        .map((order) => String(order.customerName || '').trim())
        .filter(Boolean)
    )
  );
  const guestLine = guestNames.length ? guestNames.join(', ') : 'Guest';

  const metaHtml = `
    <div class="meta">
      <div><strong>Bill No:</strong> ${escapeHtml(billNo)}</div>
      <div class="right"><strong>Table:</strong> ${escapeHtml(tableLabel || '—')}</div>
      <div class="full"><strong>Guest:</strong> ${escapeHtml(guestLine)}</div>
      <div class="full muted">${escapeHtml(when)}</div>
      <div class="full"><strong>Pay Mode:</strong> Cash / Counter</div>
    </div>`;

  const bodyHtml = `
    <table class="items">
      <thead>
        <tr>
          <th>Item</th>
          <th class="q">Qty</th>
          <th class="r">Rate</th>
          <th class="t">Total</th>
        </tr>
      </thead>
      <tbody>${buildItemRows(lines, { withRates: true })}</tbody>
    </table>
    <hr class="dash"/>
    <div class="row"><span>Total Qty</span><span>${escapeHtml(qtyTotal)}</span></div>
    <div class="row"><span>Total Amount</span><span>${escapeHtml(rupee(amount))}</span></div>
    <hr class="block"/>
    <div class="grand">Grand Total : ${escapeHtml(rupee(amount))}</div>
    <hr class="block"/>
    ${qrImg}
    <p class="center thanks">Thank you!</p>
    <p class="center muted">Please visit again</p>`;

  const html = receiptShell({
    venue: place,
    docTitle: `Bill Table ${tableLabel || ''}`,
    slipTitle: 'Restaurant Bill',
    metaHtml,
    bodyHtml,
  });
  return openPrintHtml(html, `Bill ${tableLabel || ''}`);
};

/** Single-order customer bill (Done column / KOT companion). */
export const printOrderBill = async (order, venue = {}) => {
  if (!order) return false;
  const amount = Number(order.finalAmount || order.totalAmount || 0);
  return printBill(
    {
      bill: amount,
      orders: [order],
    },
    order.tableNumber || '—',
    resolveVenue(order, venue)
  );
};

const guestOrdersKey = (cartId) => `servya-guest-orders:${cartId}`;

export const loadGuestOrderNumbers = (cartId) => {
  try {
    const raw = localStorage.getItem(guestOrdersKey(cartId));
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter(Boolean) : [];
  } catch {
    return [];
  }
};

export const rememberGuestOrderNumber = (cartId, orderNumber) => {
  if (!cartId || !orderNumber) return;
  const next = Array.from(new Set([...loadGuestOrderNumbers(cartId), orderNumber]));
  localStorage.setItem(guestOrdersKey(cartId), JSON.stringify(next));
};
