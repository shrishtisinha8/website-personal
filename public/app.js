const toggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#main-nav');
function closeMenu() {
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-label', 'Open navigation');
  navigation.dataset.open = 'false';
}
toggle.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') !== 'true';
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  navigation.dataset.open = String(open);
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    toggle.focus();
  }
});
document.addEventListener('click', event => {
  if (!event.target.closest('.site-header')) closeMenu();
});
window.matchMedia('(min-width: 681px)').addEventListener('change', closeMenu);
document.querySelector('#year').textContent = String(new Date().getFullYear());
const content = window.siteContent || {};
function safeUrl(value, kind) {
  if (!value || typeof value !== 'string') return null;
  try {
    const url = new URL(value, window.location.href);
    if (['resume', 'content'].includes(kind) && url.origin === window.location.origin && ['http:', 'https:', 'file:'].includes(url.protocol)) return url;
    if (url.protocol !== 'https:') return null;
    if (kind === 'calendly' && url.hostname !== 'calendly.com') return null;
    if (kind === 'linkedin' && !['linkedin.com', 'www.linkedin.com'].includes(url.hostname)) return null;
    return url;
  } catch { return null; }
}
function enableLink(id, url, label, symbol) {
  const link = document.getElementById(id);
  link.href = url.href;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.removeAttribute('aria-disabled');
  link.removeAttribute('tabindex');
  link.replaceChildren(document.createTextNode(label + ' '));
  const arrow = document.createElement('span');
  arrow.setAttribute('aria-hidden', 'true');
  arrow.textContent = symbol;
  link.append(arrow);
}
const calendlyUrl = safeUrl(content.calendlyUrl, 'calendly');
if (calendlyUrl) {
  enableLink('calendly-link', calendlyUrl, 'Book a conversation', '↗');
  document.getElementById('booking-note').textContent = 'Choose a time on Calendly. Opens in a new tab.';
}
const resumeUrl = safeUrl(content.resumeUrl, 'resume');
if (resumeUrl) {
  enableLink('resume-link', resumeUrl, 'View my résumé', '↗');
  document.querySelector('.resume-card > p:not(.eyebrow)').textContent = 'A closer look at my experience, skills, and journey.';
}
const contacts = document.getElementById('contact-links');
function appendContact(label, href, external) {
  const link = document.createElement('a');
  link.textContent = label;
  link.href = href;
  if (external) { link.target = '_blank'; link.rel = 'noopener noreferrer'; }
  contacts.append(link);
  contacts.hidden = false;
}
if (typeof content.email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(content.email) && !/[?&#]/.test(content.email)) appendContact('Email me', 'mailto:' + content.email, false);
const linkedinUrl = safeUrl(content.linkedinUrl, 'linkedin');
if (linkedinUrl) appendContact('LinkedIn ↗', linkedinUrl.href, true);

// Render the editable text with textContent, so it stays plain text.
if (Array.isArray(content.aboutParagraphs) && content.aboutParagraphs.some(p => typeof p === 'string' && p.trim())) {
  const about = document.querySelector('.about-copy');
  about.querySelectorAll('p').forEach(p => p.remove());
  const paragraphs = document.createDocumentFragment();
  content.aboutParagraphs.filter(p => typeof p === 'string' && p.trim()).forEach((text, index) => {
    const p = document.createElement('p');
    p.textContent = text;
    if (index === 0) p.className = 'lead';
    paragraphs.append(p);
  });
  about.prepend(paragraphs);
}

const work = Array.isArray(content.work) ? content.work.filter(item => item && typeof item.title === 'string' && item.title.trim() && typeof item.detail === 'string' && item.detail.trim()) : [];
if (work.length) {
  const container = document.querySelector('#work-portfolio .row-body');
  container.replaceChildren();
  work.forEach(item => {
    const article = document.createElement('article');
    article.className = 'portfolio-entry';
    const title = document.createElement('h3');
    title.textContent = item.title;
    const detail = document.createElement('p');
    detail.textContent = item.detail;
    article.append(title, detail);
    const url = safeUrl(item.url, 'content');
    if (url) {
      const link = document.createElement('a');
      link.className = 'text-link';
      link.textContent = 'Read more ↗';
      link.href = url.href;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      article.append(link);
    }
    container.append(article);
  });
}

const posts = Array.isArray(content.writing) ? content.writing.filter(item => item && typeof item.title === 'string' && item.title.trim() && ((typeof item.body === 'string' && item.body.trim()) || safeUrl(item.url, 'content'))) : [];
if (posts.length) {
  const container = document.getElementById('writing-posts');
  document.getElementById('writing-empty').hidden = true;
  const status = document.querySelector('.writing-section .section-top .small-tag');
  status.textContent = posts.length === 1 ? '1 NOTE' : posts.length + ' NOTES';
  posts.forEach(item => {
    const article = document.createElement('details');
    article.className = 'writing-post';
    const summary = document.createElement('summary');
    const title = document.createElement('h3');
    title.textContent = item.title;
    const arrow = document.createElement('span');
    arrow.className = 'post-toggle';
    arrow.textContent = '+';
    arrow.setAttribute('aria-hidden', 'true');
    summary.append(title, arrow);
    article.append(summary);
    const body = document.createElement('div');
    body.className = 'post-body';
    if (typeof item.date === 'string' && item.date.trim()) {
      const date = document.createElement('p');
      date.className = 'eyebrow';
      date.textContent = item.date;
      body.append(date);
    }
    if (typeof item.excerpt === 'string' && item.excerpt.trim()) {
      const excerpt = document.createElement('p');
      excerpt.className = 'post-excerpt';
      excerpt.textContent = item.excerpt;
      body.append(excerpt);
    }
    if (typeof item.body === 'string') {
      item.body.split(/\n\s*\n/).filter(p => p.trim()).forEach(text => {
        const p = document.createElement('p');
        p.textContent = text.trim();
        body.append(p);
      });
    }
    const url = safeUrl(item.url, 'content');
    if (url) {
      const link = document.createElement('a');
      link.className = 'text-link';
      link.textContent = 'Read the full piece ↗';
      link.href = url.href;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      body.append(link);
    }
    article.append(body);
    container.append(article);
  });
  container.hidden = false;
}
