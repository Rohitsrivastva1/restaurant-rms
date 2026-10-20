import React from 'react';

/** Strip tags / control chars — always treat user text as plain. */
export function plainText(value, fallback = '') {
  if (value == null) return fallback;
  let text = String(value);
  // Repeat to defeat nested/partial encodings like <scr<script>ipt>
  for (let i = 0; i < 3; i += 1) {
    text = text.replace(/<[^>]*>/g, '');
  }
  text = text
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&amp;/gi, '&');
  // After entity decode, strip any tags that appeared.
  for (let i = 0; i < 2; i += 1) {
    text = text.replace(/<[^>]*>/g, '');
  }
  text = text.trim();
  return text || fallback;
}

/** For HTML string templates (bill print). Never skip this. */
export function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** Escape after plainText for print templates. */
export function safeHtmlText(value, fallback = '') {
  return escapeHtml(plainText(value, fallback));
}

/**
 * Render user-controlled strings as React text children only.
 * Never use dangerouslySetInnerHTML / innerHTML for guest name, notes, etc.
 */
export function SafeText({ value, fallback = '', as: Tag = 'span', className, ...rest }) {
  return (
    <Tag className={className} {...rest}>
      {plainText(value, fallback)}
    </Tag>
  );
}
