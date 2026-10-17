import React from 'react';
import { Link } from 'react-router-dom';
import './owner.css';

const OwnerChrome = ({ kicker, title, lead, nav, actions, children, home = '/restra-owner' }) => (
  <div className="ro">
    <header className="ro-nav">
      <Link className="ro-logo" to={home}>Servya <i>◆</i></Link>
      <div className="ro-user">{nav}</div>
    </header>
    <main className="ro-main">
      <div className="ro-head">
        <div>
          {kicker && <p className="ro-kicker">{kicker}</p>}
          {title && <h1>{title}</h1>}
          {lead && <p>{lead}</p>}
        </div>
        {actions}
      </div>
      {children}
    </main>
  </div>
);

export default OwnerChrome;
