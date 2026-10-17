import React from 'react';

const ITEMS = [
  ['/images/hospitality/hero-steak.png', 'Seared ribeye', 'Bone marrow jus, charred shallot', '₹1,950'],
  ['/images/hospitality/bar-cocktail.png', 'Smoked old fashioned', 'Orange peel, aged bourbon', '₹850'],
  ['/images/hospitality/dessert-gold.png?v=3', 'Gold-leaf sphere', 'Warm caramel, dark chocolate', '₹690'],
  ['/images/hospitality/rooftop.png?v=3', 'Rooftop small plates', 'Chef’s selection, to share', '₹720'],
];

export default function PhoneMock() {
  return (
    <div className="hm-phone" role="img" aria-label="The Servya guest menu on a phone, with dishes and prices.">
      <header><span>Scan · Browse · Order</span></header>
      <p className="hm-display" style={{ fontSize: 28, margin: '8px 0 4px' }}>Tonight’s menu</p>
      {ITEMS.map(([src, name, detail, price]) => (
        <div className="hm-dish" key={name}>
          <img src={src} alt="" />
          <div><strong>{name}</strong><small>{detail}</small></div>
          <span className="hm-dish-price">{price}</span>
        </div>
      ))}
      <div className="hm-cart">View order · 2 items →</div>
    </div>
  );
}
