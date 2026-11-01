import React from 'react';
import HospImg from './HospImg';

const ITEMS = [
  ['hero-steak', 'Seared ribeye', 'Bone marrow jus, charred shallot', '₹1,950'],
  ['bar-cocktail', 'Smoked old fashioned', 'Orange peel, aged bourbon', '₹850'],
  ['dessert-gold', 'Gold-leaf sphere', 'Warm caramel, dark chocolate', '₹690'],
  ['rooftop', 'Rooftop small plates', 'Chef’s selection, to share', '₹720'],
];

export default function PhoneMock() {
  return (
    <div className="hm-phone" role="img" aria-label="The Servya guest menu on a phone, with dishes and prices.">
      <header><span>Scan · Browse · Order</span></header>
      <p className="hm-display" style={{ fontSize: 28, margin: '8px 0 4px' }}>Tonight’s menu</p>
      {ITEMS.map(([name, dish, detail, price]) => (
        <div className="hm-dish" key={dish}>
          <HospImg name={name} alt="" width={44} height={44} />
          <div><strong>{dish}</strong><small>{detail}</small></div>
          <span className="hm-dish-price">{price}</span>
        </div>
      ))}
      <div className="hm-cart">View order · 2 items →</div>
    </div>
  );
}
