import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Shell from '../Marketing/Shell';
import { AUTHOR, getPost, relatedPosts } from './posts';

function Paragraph({ value }) {
  if (typeof value === 'string') return <p>{value}</p>;
  return (
    <p>
      {value.map((part, index) => (
        typeof part === 'string'
          ? <React.Fragment key={index}>{part}</React.Fragment>
          : <Link key={index} to={part.to}>{part.label}</Link>
      ))}
    </p>
  );
}

export default function BlogPost() {
  const { slug } = useParams();
  const post = getPost(slug);
  const related = post ? relatedPosts(post.slug) : [];

  useEffect(() => {
    window.scrollTo(0, 0);
    const tag = document.querySelector('meta[name="description"]');
    if (tag && post) tag.setAttribute('content', post.description);
  }, [post]);

  if (!post) {
    return (
      <Shell title="Article not found · Servya">
        <section className="mk-section">
          <div className="mk-wrap mk-article">
            <Link className="mk-back" to="/blog">← All notes</Link>
            <h1>We can’t find that note.</h1>
            <p className="mk-lead">It may have moved. The journal is still here.</p>
            <div className="mk-row">
              <Link className="mk-gold" to="/blog">Read the journal</Link>
            </div>
          </div>
        </section>
      </Shell>
    );
  }

  return (
    <Shell title={`${post.title} · Servya`}>
      <header className="mk-pagehead mk-posthead">
        <img src={post.image} alt={post.imageAlt} />
        <div className="mk-scrim">
          <div className="mk-wrap">
            <Link className="mk-back" to="/blog">← All notes</Link>
            <div className="mk-kicker">{post.kicker}</div>
            <h1>{post.title}</h1>
            <p className="mk-blog-meta mk-post-meta">By the {AUTHOR.name} · {post.dateLabel} · {post.read}</p>
          </div>
        </div>
      </header>

      <article className="mk-section" style={{ paddingTop: 48 }}>
        <div className="mk-wrap mk-article">
          <p className="mk-author-note">{AUTHOR.note}</p>
          {post.sections.map((section) => (
            <section key={section.heading || (typeof section.paragraphs?.[0] === 'string' ? section.paragraphs[0] : section.paragraphs?.[0]?.[0])}>
              {section.heading ? <h2>{section.heading}</h2> : null}
              {section.paragraphs?.map((paragraph) => (
                <Paragraph key={typeof paragraph === 'string' ? paragraph : paragraph.map((part) => (typeof part === 'string' ? part : part.label)).join('')} value={paragraph} />
              ))}
              {section.list ? (
                <ul>
                  {section.list.map((item) => <li key={item}>{item}</li>)}
                </ul>
              ) : null}
              {section.steps ? (
                <ol>
                  {section.steps.map((item) => <li key={item}>{item}</li>)}
                </ol>
              ) : null}
            </section>
          ))}
          {post.faq?.length ? (
            <section className="mk-faq-block">
              <h2>Questions people ask</h2>
              {post.faq.map((item) => (
                <div key={item.q}>
                  <h3>{item.q}</h3>
                  <p>{item.a}</p>
                </div>
              ))}
            </section>
          ) : null}
        </div>
      </article>

      <section className="mk-section" style={{ paddingTop: 0 }}>
        <div className="mk-wrap">
          <div className="mk-kicker">Keep reading</div>
          <div className="mk-blog-grid mk-blog-related">
            {related.map((item) => (
              <Link className="mk-blog-card" key={item.slug} to={`/blog/${item.slug}`}>
                <img src={item.image} alt="" />
                <div className="mk-blog-body">
                  <div className="mk-blog-meta">{item.kicker}</div>
                  <h2>{item.title}</h2>
                  <span className="mk-blog-more">Read the guide</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mk-section" style={{ paddingTop: 0 }}>
        <div className="mk-wrap">
          <div className="mk-band mk-close">
            <img src="/images/hospitality/bar-pour.png?v=3" alt="An amber cocktail being poured at a back bar" />
            <div className="mk-scrim">
              <div className="mk-kicker">See it on your menu</div>
              <h2>Bring your <em>Friday with you.</em></h2>
              <p className="mk-lead">We’ll walk through Servya with your dishes, your tables, and the way your room actually runs.</p>
              <div className="mk-row">
                <Link className="mk-gold" to="/contact">Book a demo</Link>
                <Link className="mk-ghost" to="/pricing">See plans</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Shell>
  );
}
