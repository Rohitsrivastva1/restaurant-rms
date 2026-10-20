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

export const printKot = (order) => {
  const items = (order.items || [])
    .map((item) => `<li>${item.quantity} × ${item.itemName || item.name}</li>`)
    .join('');
  const html = `<!doctype html><html><head><title>KOT ${order.orderNumber}</title>
    <style>body{font-family:system-ui,sans-serif;padding:16px}h1{font-size:18px;margin:0 0 8px}
    p{margin:4px 0}ul{padding-left:18px}</style></head><body>
    <h1>KOT · ${order.orderNumber}</h1>
    <p>${order.customerName || 'Guest'}${order.tableNumber ? ` · Table ${order.tableNumber}` : ''}</p>
    <p>${STATUS_COPY[order.status] || order.status}</p>
    ${order.specialInstructions ? `<p>Note: ${order.specialInstructions}</p>` : ''}
    <ul>${items}</ul>
    <script>window.print()</script></body></html>`;
  const win = window.open('', '_blank', 'noopener,noreferrer,width=420,height=640');
  if (win) {
    win.document.write(html);
    win.document.close();
  }
};

export const printBill = (bill, tableLabel) => {
  const rows = (bill?.orders || [])
    .filter((order) => order.status !== 'cancelled')
    .map(
      (order) =>
        `<tr><td>${order.orderNumber}</td><td>${(order.items || [])
          .map((item) => `${item.quantity}×${item.name || item.itemName}`)
          .join(', ')}</td><td>${rupee(order.finalAmount)}</td></tr>`
    )
    .join('');
  const html = `<!doctype html><html><head><title>Bill Table ${tableLabel}</title>
    <style>body{font-family:system-ui,sans-serif;padding:16px}table{width:100%;border-collapse:collapse}
    td,th{border-bottom:1px solid #ddd;padding:6px;text-align:left;font-size:13px}</style></head><body>
    <h1>Table ${tableLabel}</h1>
    <p>Total ${rupee(bill?.bill || 0)}</p>
    <table><thead><tr><th>Order</th><th>Items</th><th>Amount</th></tr></thead>
    <tbody>${rows}</tbody></table>
    <script>window.print()</script></body></html>`;
  const win = window.open('', '_blank', 'noopener,noreferrer,width=480,height=720');
  if (win) {
    win.document.write(html);
    win.document.close();
  }
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
