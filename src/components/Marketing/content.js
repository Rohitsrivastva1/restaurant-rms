/** Shared marketing copy. Unverified claims stay visible as placeholders. */

export const TRIAL = '/cart-owner-signup';

export const VALUES = [
  {
    title: 'Empowerment',
    body: 'We believe in giving every foodpreneur the tools and confidence to succeed.',
  },
  {
    title: 'Simplicity',
    body: 'We make complex technology simple and accessible for everyone.',
  },
  {
    title: 'Trust',
    body: 'We build reliable, secure solutions that you can depend on.',
  },
  {
    // TODO(verify): fifth value name. The previous About page listed Community, not this title.
    title: 'Purposeful Innovation',
    body: 'We add a feature only when it makes service clearer for guests and the team.',
  },
  {
    // TODO(verify): previous page titled this “Community”.
    title: 'Community Growth',
    body: 'We foster a supportive community where everyone grows together.',
  },
];

export const PLANS = [
  {
    name: 'Free Trial',
    price: '₹0',
    period: '/month',
    description: 'Perfect for trying out Servya',
    features: [
      'Up to 50 orders/month',
      'Basic QR menu',
      'Email support',
      'Basic analytics',
      '1 cart location',
    ],
    limitations: ['Limited customization', 'Basic reporting only'],
    cta: 'Start Free Trial',
    hot: false,
  },
  {
    name: 'Starter',
    price: '₹999',
    period: '/month',
    // TODO(verify): hospitality wording. Previous site said “Great for small food businesses”.
    description: 'Great for a single restaurant, bar or lounge',
    features: [
      'Up to 500 orders/month',
      'Advanced QR menu with themes',
      'Priority email support',
      'Detailed analytics dashboard',
      'Up to 3 cart locations',
      'Order notifications',
      'Menu customization',
      'Basic reporting',
    ],
    limitations: [],
    cta: 'Get Started',
    hot: true,
  },
  {
    name: 'Pro',
    price: '₹1999',
    period: '/month',
    // TODO(verify): hospitality wording. Previous site said “For growing food businesses”.
    description: 'For growing venues and busier floors',
    features: [
      'Unlimited orders',
      'Premium QR menu themes',
      '24/7 phone & email support',
      'Advanced analytics & insights',
      'Unlimited cart locations',
      'Real-time notifications',
      'Full menu customization',
      'Advanced reporting',
      'Team management',
      'API access',
      'Custom integrations',
    ],
    limitations: [],
    cta: 'Go Pro',
    hot: false,
  },
];

export const INCLUDED = [
  { title: 'Quick setup', body: 'Get started in minutes, not hours.' },
  {
    title: 'Secure & reliable',
    // TODO(verify): previous page claimed 99.9% uptime. That figure is not shown.
    body: 'Secure, cloud-based infrastructure.',
  },
  { title: 'Team management', body: 'Manage your staff and assign roles easily.' },
  { title: 'Advanced analytics', body: 'Track sales, popular items, and growth.' },
];

export const PRICING_FAQ = [
  {
    q: 'Can I change my plan anytime?',
    a: "Yes. You can upgrade or downgrade at any time. Changes take effect immediately, and we'll prorate any billing differences.",
  },
  {
    q: 'What happens if I exceed my order limit?',
    a: "We'll notify you when you're approaching your limit. You can upgrade your plan or purchase additional orders as needed.",
  },
  {
    q: 'Do you offer discounts for annual payments?',
    // TODO(verify): 20% annual discount.
    a: 'The current site says you save 20% when you pay annually. Confirm that rate before launch.',
  },
  {
    q: 'Is there a setup fee?',
    // TODO(verify): 14-day trial length and “no setup fees”.
    a: 'The current site says there are no setup fees, and that a 14-day free trial is included. Confirm both before launch.',
  },
  {
    q: 'What payment methods do you accept?',
    // TODO(verify): cards, UPI, net banking, wallets.
    a: 'The current site lists major credit cards, UPI, net banking, and digital wallets. Confirm the live list before launch.',
  },
];

export const CONTACT_FAQ = [
  {
    q: 'How quickly can I get started with Servya?',
    a: 'You can set up your account and create your first QR menu in under 10 minutes.',
  },
  {
    q: 'Do I need any technical knowledge to use Servya?',
    a: 'Servya is designed to be user-friendly. If you can use a smartphone, you can use Servya.',
  },
];
