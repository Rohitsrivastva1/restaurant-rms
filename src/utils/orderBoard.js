export const COLUMNS = [
  { key: 'new', title: 'New', statuses: ['pending'] },
  { key: 'kitchen', title: 'Kitchen', statuses: ['accepted', 'cooking', 'cooking_done'] },
  { key: 'ready', title: 'Ready', statuses: ['ready_for_pickup'] },
  { key: 'done', title: 'Done', statuses: ['delivered', 'completed'] },
];

export const NEXT = {
  pending: { status: 'accepted', label: 'Accept' },
  accepted: { status: 'cooking', label: 'Start cooking' },
  cooking: { status: 'ready_for_pickup', label: 'Ready' },
  cooking_done: { status: 'ready_for_pickup', label: 'Ready' },
  ready_for_pickup: { status: 'delivered', label: 'Served' },
};

export const STATUS_COPY = {
  pending: 'New',
  accepted: 'Kitchen',
  cooking: 'Kitchen',
  cooking_done: 'Kitchen',
  ready_for_pickup: 'Ready',
  delivered: 'Done',
  completed: 'Done',
  cancelled: 'Cancelled',
};

export const GUEST_STATUS_COPY = {
  pending: 'With the kitchen',
  accepted: 'Kitchen',
  cooking: 'Cooking',
  cooking_done: 'Cooked',
  ready_for_pickup: 'Ready',
  delivered: 'Served',
  completed: 'Served',
  cancelled: 'Cancelled',
};

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

const escapeHtml = (value) =>
  String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

/** Open printable HTML without about:blank. noopener + document.write = blank tab. */
const openPrintHtml = (html, title = 'Print') => {
  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);

  // Hidden iframe keeps the user on the kitchen board (no blank tab).
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
      // Last resort: real tab with blob URL (has content, not about:blank).
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

export const printKot = (order) => {
  if (!order) return false;
  const items = (order.items || [])
    .map((item) => `<li>${escapeHtml(item.quantity)} × ${escapeHtml(item.itemName || item.name || 'Item')}</li>`)
    .join('');
  const html = `<!doctype html><html><head><meta charset="utf-8"/><title>KOT ${escapeHtml(order.orderNumber)}</title>
    <style>
      body{font-family:system-ui,sans-serif;padding:16px;color:#111}
      h1{font-size:18px;margin:0 0 8px}
      p{margin:4px 0}ul{padding-left:18px}
      .muted{color:#666;font-size:13px}
      @media print{body{padding:0}}
    </style></head><body>
    <h1>KOT · ${escapeHtml(order.orderNumber)}</h1>
    <p>${escapeHtml(order.customerName || 'Guest')}${order.tableNumber ? ` · Table ${escapeHtml(order.tableNumber)}` : ''}</p>
    <p class="muted">${escapeHtml(STATUS_COPY[order.status] || order.status || '')}</p>
    ${order.specialInstructions ? `<p>Note: ${escapeHtml(order.specialInstructions)}</p>` : ''}
    <ul>${items || '<li>No items on ticket</li>'}</ul>
    <script>
      window.addEventListener('load', function () {
        setTimeout(function () { window.focus(); window.print(); }, 50);
      });
    </script></body></html>`;
  return openPrintHtml(html, `KOT ${order.orderNumber || ''}`);
};

export const printBill = (bill, tableLabel) => {
  const rows = (bill?.orders || [])
    .filter((order) => order.status !== 'cancelled')
    .map(
      (order) =>
        `<tr><td>${escapeHtml(order.orderNumber)}</td><td>${escapeHtml((order.items || [])
          .map((item) => `${item.quantity}×${item.name || item.itemName}`)
          .join(', '))}</td><td>${escapeHtml(rupee(order.finalAmount))}</td></tr>`
    )
    .join('');
  const html = `<!doctype html><html><head><meta charset="utf-8"/><title>Bill Table ${escapeHtml(tableLabel)}</title>
    <style>body{font-family:system-ui,sans-serif;padding:16px;color:#111}table{width:100%;border-collapse:collapse}
    td,th{border-bottom:1px solid #ddd;padding:6px;text-align:left;font-size:13px}
    @media print{body{padding:0}}</style></head><body>
    <h1>Table ${escapeHtml(tableLabel)}</h1>
    <p>Total ${escapeHtml(rupee(bill?.bill || 0))}</p>
    <table><thead><tr><th>Order</th><th>Items</th><th>Amount</th></tr></thead>
    <tbody>${rows || '<tr><td colspan="3">No orders</td></tr>'}</tbody></table>
    <script>
      window.addEventListener('load', function () {
        setTimeout(function () { window.focus(); window.print(); }, 50);
      });
    </script></body></html>`;
  return openPrintHtml(html, `Bill ${tableLabel || ''}`);
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
