import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Shell, { FAQ } from '../Marketing/Shell';

const FAQ_ITEMS = [
  {
    q: 'I already use Servya and need help. Where should I write?',
    a: 'Email support@buildnaya.com with your venue name and a short description of the issue. A screenshot helps.',
  },
  {
    q: 'Can I see Servya before deciding?',
    a: 'Yes. Choose Book a demo or send us a message, and we’ll walk you through Servya with your own menu.',
  },
];

const EMPTY = { name: '', email: '', phone: '', business: '', message: '' };

function validate(formData) {
  const next = {};
  if (!formData.name.trim()) next.name = 'Please enter your name.';
  if (!formData.email.trim()) next.email = 'Please enter your email address.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) next.email = 'Enter a valid email address, like name@venue.com.';
  if (formData.phone.trim() && !/^\+\d[\d\s-]{7,}$/.test(formData.phone.trim())) {
    next.phone = 'Enter a valid phone number, including the country code.';
  }
  if (!formData.business) next.business = 'Please choose your business type.';
  if (!formData.message.trim()) next.message = 'Please add a short message.';
  return next;
}

const ContactPage = () => {
  const [formData, setFormData] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const tag = document.querySelector('meta[name="description"]');
    if (tag) {
      tag.setAttribute('content', 'Talk to the Servya team about your restaurant, cafe, bar or hotel. Book a demo, ask about plans or get support. Write to hello@buildnaya.com.');
    }
  }, []);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
    setErrors((current) => ({ ...current, [event.target.name]: undefined }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const next = validate(formData);
    setErrors(next);
    if (Object.keys(next).length) return;
    const subject = encodeURIComponent(`Servya enquiry from ${formData.name.trim()}`);
    const body = encodeURIComponent(
      `Name: ${formData.name.trim()}\nEmail: ${formData.email.trim()}\nPhone: ${formData.phone.trim() || '—'}\nBusiness: ${formData.business}\n\n${formData.message.trim()}`
    );
    window.location.href = `mailto:hello@buildnaya.com?subject=${subject}&body=${body}`;
    setSent(true);
  };

  const field = (name) => `field${errors[name] ? ' invalid' : ''}`;

  const focusBusiness = (event) => {
    event.preventDefault();
    document.getElementById('enquiry')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    document.getElementById('business')?.focus();
  };

  return (
    <Shell active="contact" title="Contact Servya: Book a Demo or Ask Us">
      <header className="mk-pagehead">
        {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
        <img src="/images/hospitality/bar-pour.png?v=3" alt="A bartender pouring an amber cocktail with a flamed orange peel in front of a lit back bar" />
        <div className="mk-scrim">
          <div className="mk-wrap">
            <div className="mk-kicker">Contact</div>
            <h1>Let’s talk about <em>your venue.</em></h1>
            <p className="mk-lead">Questions, a demo, or a plan for a hotel or group: tell us a little about your venue and we’ll get back to you.</p>
          </div>
        </div>
      </header>

      <section className="mk-section">
        <div className="mk-wrap mk-contact">
          <div>
            <h2>Send us a message</h2>
            <p className="mk-lead">Fields marked * are required.</p>
            {sent ? (
              <div className="mk-status" role="status" style={{ marginTop: 18 }}>
                <h3>Thank you.</h3>
                <p className="mk-lead">Your email app should open with this message addressed to hello@buildnaya.com. Send it, and we’ll reply from there.</p>
                <div className="mk-row"><Link className="mk-ghost" to="/">Back to home</Link></div>
              </div>
            ) : (
              <form id="enquiry" className="mk-form" style={{ marginTop: 18 }} onSubmit={handleSubmit} noValidate>
                {Object.keys(errors).length > 0 && (
                  <p className="err" role="alert">Please check the highlighted fields and try again.</p>
                )}
                <div className="mk-grid-2">
                  <div className={field('name')}>
                    <label htmlFor="name">Full name *</label>
                    <input id="name" name="name" placeholder="Your full name" autoComplete="name" value={formData.name} onChange={handleChange} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'name-error' : undefined} />
                    {errors.name && <p className="err" id="name-error">{errors.name}</p>}
                  </div>
                  <div className={field('email')}>
                    <label htmlFor="email">Email address *</label>
                    <input id="email" name="email" type="email" placeholder="you@yourvenue.com" autoComplete="email" value={formData.email} onChange={handleChange} aria-invalid={Boolean(errors.email)} aria-describedby="email-help" />
                    <p className="mk-note" id="email-help">We’ll reply to this address.</p>
                    {errors.email && <p className="err">{errors.email}</p>}
                  </div>
                  <div className={field('phone')}>
                    <label htmlFor="phone">Phone number (optional)</label>
                    <input id="phone" name="phone" placeholder="+91 98765 43210" autoComplete="tel" value={formData.phone} onChange={handleChange} aria-invalid={Boolean(errors.phone)} aria-describedby="phone-help" />
                    <p className="mk-note" id="phone-help">Add it if you’d prefer a call.</p>
                    {errors.phone && <p className="err">{errors.phone}</p>}
                  </div>
                  <div className={field('business')}>
                    <label htmlFor="business">Business type *</label>
                    <select id="business" name="business" value={formData.business} onChange={handleChange} aria-invalid={Boolean(errors.business)} aria-describedby={errors.business ? 'business-error' : undefined}>
                      <option value="">Select your business type</option>
                      <option value="restaurant">Restaurant</option>
                      <option value="cafe">Cafe</option>
                      <option value="bar-lounge">Bar / lounge</option>
                      <option value="hotel">Hotel</option>
                      <option value="food-cart">Cloud kitchen / food cart</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.business && <p className="err" id="business-error">{errors.business}</p>}
                  </div>
                </div>
                <div className={field('message')}>
                  <label htmlFor="message">Message *</label>
                  <textarea id="message" name="message" rows={5} placeholder="Tell us about your venue, how many tables you have, and what you’d like help with." value={formData.message} onChange={handleChange} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? 'message-error' : undefined} />
                  {errors.message && <p className="err" id="message-error">{errors.message}</p>}
                </div>
                <button className="mk-gold" type="submit" style={{ width: 'fit-content', paddingInline: 22 }}>
                  Send message
                </button>
                <p className="mk-note">We use your details only to reply to your message. <Link to="/privacy">Privacy Policy</Link></p>
              </form>
            )}
          </div>
          <aside className="mk-side">
            <article className="mk-info">
              <h2>Contact information</h2>
              <p className="mk-lead" style={{ fontSize: 15 }}>New enquiries and demos</p>
              <p><a href="mailto:hello@buildnaya.com">hello@buildnaya.com</a></p>
              <p className="mk-lead" style={{ fontSize: 15, marginTop: 12 }}>Existing customers and support</p>
              <p><a href="mailto:support@buildnaya.com">support@buildnaya.com</a></p>
              <p className="mk-lead" style={{ fontSize: 15, marginTop: 12 }}>General information</p>
              <p><a href="mailto:info@buildnaya.com">info@buildnaya.com</a></p>
              <p className="mk-lead" style={{ fontSize: 15, marginTop: 12 }}>Office</p>
              <p>BuildNaya, Sector 62, Noida 201308, India</p>
            </article>
            <a className="mk-gold" href="#enquiry" onClick={focusBusiness}>Book a demo</a>
          </aside>
        </div>
      </section>

      <section className="mk-section" style={{ background: '#120D0A' }}>
        <div className="mk-wrap">
          <div className="mk-kicker">Frequently asked</div>
          <h2>Before you write to us.</h2>
          <FAQ items={FAQ_ITEMS} />
        </div>
      </section>

      <section className="mk-section">
        <div className="mk-wrap">
          <div className="mk-kicker">Ready when you are</div>
          <h2>Your kitchen. Your guests. <em>Your growth.</em></h2>
          <p className="mk-lead">See how Servya fits your service.</p>
          <div className="mk-row">
            <a className="mk-gold" href="#enquiry" onClick={focusBusiness}>Book a demo</a>
            <Link className="mk-ghost" to="/pricing">See plans</Link>
          </div>
        </div>
      </section>
    </Shell>
  );
};

export default ContactPage;
