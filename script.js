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
      <p class="dsub">In compliance with the Bar Council of India Rules,</p>
        <p class="dtext">Advocates and law firms are prohibited from advertising or soliciting work. The information on this website is provided solely for informational purposes and does not constitute legal advice or solicitation.By accessing this website, you acknowledge that you are seeking information about ELS Advocates ​[a unit of Enlarge Law Solutions​ ("ELS")​] on your own initiative, without any solicitation or inducement. Accessing or using this website does not create an attorney-client relationship.</p>
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
