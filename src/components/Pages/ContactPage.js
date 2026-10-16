import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Shell, { FAQ, Placeholder } from '../Marketing/Shell';
import { CONTACT_FAQ, TRIAL } from '../Marketing/content';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    business: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
    setErrors((current) => ({ ...current, [event.target.name]: undefined }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const next = {};
    if (!formData.name.trim()) next.name = 'Enter your full name.';
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      next.email = 'Enter a valid email address.';
    }
    if (!formData.business) next.business = 'Select your business type.';
    setErrors(next);
    if (Object.keys(next).length) return;
    console.log('Form submitted:', formData);
    setSent(true);
  };

  const field = (name) => `field${errors[name] ? ' invalid' : ''}`;

  return (
    <Shell active="contact" title="Contact">
      <header className="mk-pagehead">
        <img src="/images/hospitality/bar-pour.png" alt="AI-generated sample image of a drink being poured" />
        <div className="mk-scrim">
          <div className="mk-wrap">
            <div className="mk-kicker">Contact</div>
            <h1>Let’s talk about <em>your venue.</em></h1>
            <p className="mk-lead">
              Questions, a demo, or a plan for more than one site.
              <span className="mk-confirm">Reply within 24 hours · confirm</span>
            </p>
          </div>
        </div>
      </header>

      <section className="mk-section">
        <div className="mk-wrap mk-contact">
          <div>
            <h2>Send a message</h2>
            {sent ? (
              <div className="mk-status" role="status" style={{ marginTop: 18 }}>
                <h3>Thank you for your message.</h3>
                <p className="mk-lead">We’ll get back to you soon. The current site says that is within 24 hours.</p>
              </div>
            ) : (
              <form className="mk-form" style={{ marginTop: 18 }} onSubmit={handleSubmit} noValidate>
                <div className="mk-grid-2">
                  <div className={field('name')}>
                    <label htmlFor="name">Full name *</label>
                    <input id="name" name="name" value={formData.name} onChange={handleChange} autoComplete="name" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'name-error' : undefined} />
                    {errors.name && <p className="err" id="name-error">{errors.name}</p>}
                  </div>
                  <div className={field('email')}>
                    <label htmlFor="email">Email address *</label>
                    <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} autoComplete="email" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'email-error' : undefined} />
                    {errors.email && <p className="err" id="email-error">{errors.email}</p>}
                  </div>
                  <div>
                    <label htmlFor="phone">Phone number</label>
                    <input id="phone" name="phone" value={formData.phone} onChange={handleChange} autoComplete="tel" />
                  </div>
                  <div className={field('business')}>
                    <label htmlFor="business">Business type *</label>
                    <select id="business" name="business" value={formData.business} onChange={handleChange} aria-invalid={Boolean(errors.business)} aria-describedby={errors.business ? 'business-error' : undefined}>
                      <option value="">Select your business type</option>
                      <option value="street-cart">Street Cart</option>
                      <option value="food-truck">Food Truck</option>
                      <option value="cafe">Café</option>
                      <option value="restaurant">Restaurant</option>
                      <option value="catering">Catering</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.business && <p className="err" id="business-error">{errors.business}</p>}
                  </div>
                </div>
                <div>
                  <label htmlFor="message">Message</label>
                  <textarea id="message" name="message" rows={5} value={formData.message} onChange={handleChange} />
                </div>
                <button className="mk-gold" type="submit" style={{ width: 'fit-content', paddingInline: 22 }}>Send message</button>
              </form>
            )}
          </div>
          <aside className="mk-side">
            <Placeholder tag="Contact details · to verify">
              {/* TODO(verify): phone, email and address are not published */}
              <p style={{ marginTop: 12 }}>Phone</p>
              <div className="mk-dashline">—</div>
              <p style={{ marginTop: 12 }}>Email</p>
              <div className="mk-dashline">—</div>
              <p style={{ marginTop: 12 }}>Address</p>
              <div className="mk-dashline">—</div>
            </Placeholder>
            <article className="mk-info">
              <h3>Hours <span className="mk-confirm">Confirm</span></h3>
              {/* TODO(verify): support hours */}
              <p className="mk-lead" style={{ fontSize: 15 }}>Monday–Friday 9:00–18:00</p>
              <p className="mk-lead" style={{ fontSize: 15 }}>Saturday 10:00–16:00</p>
              <p className="mk-lead" style={{ fontSize: 15 }}>Sunday closed</p>
            </article>
            <Link className="mk-gold" to="/contact">Book a demo</Link>
            <Link className="mk-ghost" to="/contact">Help center</Link>
          </aside>
        </div>
      </section>

      <section className="mk-section" style={{ background: '#120D0A' }}>
        <div className="mk-wrap">
          <div className="mk-head"><h2>Questions</h2></div>
          <FAQ items={CONTACT_FAQ} />
        </div>
      </section>

      <section className="mk-section">
        <div className="mk-wrap">
          <h2>Start with the menu.</h2>
          <div className="mk-row">
            <Link className="mk-gold" to={TRIAL}>Start free trial</Link>
            <Link className="mk-ghost" to="/pricing">See plans</Link>
          </div>
        </div>
      </section>
    </Shell>
  );
};

export default ContactPage;
