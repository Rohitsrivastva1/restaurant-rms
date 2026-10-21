import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Shell from '../Marketing/Shell';
import { POSTS } from './posts';

export default function BlogIndex() {
  useEffect(() => {
    const tag = document.querySelector('meta[name="description"]');
    if (tag) {
      tag.setAttribute('content', 'Guides for restaurant owners on QR table ordering, kitchen boards, menu updates, and closing the night. Written by the Servya team.');
    }
  }, []);

  return (
    <Shell title="Servya Blog: QR Ordering and Kitchen Guides">
      <header className="mk-pagehead">
        <img src="/images/hospitality/bar-pour.png?v=3" alt="An amber cocktail being poured at a lit back bar" />
        <div className="mk-scrim">
          <div className="mk-wrap">
            <div className="mk-kicker">Journal</div>
            <h1>Guides for QR ordering, the kitchen, and the menu.</h1>
            <p className="mk-lead">Plain answers for restaurants, cafes, bars, and hotel dining rooms. Each guide says what to do, when it helps, and when it does not.</p>
          </div>
        </div>
      </header>

      <section className="mk-section">
        <div className="mk-wrap">
          <div className="mk-blog-grid">
            {POSTS.map((post) => (
              <Link className="mk-blog-card" key={post.slug} to={`/blog/${post.slug}`}>
                <img src={post.image} alt="" />
                <div className="mk-blog-body">
                  <div className="mk-blog-meta">{post.kicker} · {post.dateLabel}</div>
                  <h2>{post.title}</h2>
                  <p>{post.excerpt}</p>
                  <span className="mk-blog-more">Read the guide</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Shell>
  );
}
