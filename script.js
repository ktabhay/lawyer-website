document.addEventListener('DOMContentLoaded', () => {

  /* ---- BCI Rules disclaimer modal ---- */
  if (!sessionStorage.getItem('bciDisclaimerAccepted')) {
    const overlay = document.createElement('div');
    overlay.className = 'disclaimer-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-labelledby', 'disclaimerTitle');
    overlay.innerHTML = `
      <div class="disclaimer-modal">
        <div class="disclaimer-icon">⚖️</div>
        <h2 id="disclaimerTitle">Important Disclaimer</h2>
        <p class="dsub">Bar Council of India Rules, 1962</p>
        <p class="dtext">As per BCI Rules, advocates &amp; law firms are not permitted to solicit work or advertise. This page is for informational purposes only and does not constitute legal advice or solicitation. By proceeding, you confirm you are seeking information voluntarily and of your own free will, without any inducement from Juris and Justice. No attorney-client relationship is created by accessing this page.</p>
        <div class="dactions">
          <button type="button" class="btn btn-solid" id="disclaimerAgree">I Understand &amp; Agree</button>
        </div>
      </div>`;
    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';

    requestAnimationFrame(() => overlay.classList.add('show'));

    document.getElementById('disclaimerAgree').addEventListener('click', () => {
      sessionStorage.setItem('bciDisclaimerAccepted', 'true');
      overlay.classList.remove('show');
      document.body.style.overflow = '';
      setTimeout(() => overlay.remove(), 250);
    });
  }

  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const toggle = document.getElementById('menuToggle');
  const nav = document.getElementById('siteNav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => nav.classList.toggle('open'));
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));
  }

  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('cf-name').value.trim();
      const email = document.getElementById('cf-email').value.trim();
      const phone = document.getElementById('cf-phone').value.trim();
      const subject = document.getElementById('cf-subject').value.trim();
      const message = document.getElementById('cf-message').value.trim();

      const body = `Name: ${name}%0APhone: ${phone}%0AEmail: ${email}%0A%0A${message}`;
      const mailto = `mailto:adv.mukundm@gmail.com?subject=${encodeURIComponent(subject || 'Consultation Request')}&body=${body}`;
      window.location.href = mailto;
    });
  }
});
