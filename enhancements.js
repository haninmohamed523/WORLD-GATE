const mobileStyles = document.createElement('link'); mobileStyles.rel = 'stylesheet'; mobileStyles.href = 'mobile.css'; document.head.append(mobileStyles);
document.addEventListener('DOMContentLoaded', () => {
  const menuButton = document.querySelector('#menu');
  const menu = document.querySelector('#mobileMenu');
  const closeMenu = () => { menu.classList.remove('open'); menuButton.setAttribute('aria-expanded', 'false'); };
  menuButton.addEventListener('click', () => { const open = menu.classList.toggle('open'); menuButton.setAttribute('aria-expanded', String(open)); });
  menu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
  document.addEventListener('click', event => { if (!menu.contains(event.target) && !menuButton.contains(event.target)) closeMenu(); });
  const form = document.querySelector('#form');
  document.querySelectorAll('a[target="_blank"]').forEach(link => link.rel = 'noopener noreferrer');
  const applyLanguageDetails = () => {
    const english = document.documentElement.lang === 'en';
    document.querySelector('#language').textContent = english ? 'العربية' : 'English';
    form.elements.fullName.placeholder = english ? 'Your full name' : 'الاسم الكامل';
    form.elements.companyName.placeholder = english ? 'Company name (optional)' : 'اسم الشركة (اختياري)';
    form.elements.phone.placeholder = english ? 'Phone number' : 'رقم الهاتف';
    form.elements.email.placeholder = english ? 'Email address (optional)' : 'البريد الإلكتروني (اختياري)';
    form.elements.message.placeholder = english ? 'Tell us how we can help' : 'اكتب تفاصيل طلبك';
  };
  new MutationObserver(applyLanguageDetails).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
  applyLanguageDetails();
  const status = document.querySelector('#status');
  new MutationObserver(() => {
    if (!status.textContent || !status.classList.contains('request-failure')) return;
    if (status.querySelector('a')) return;
    const arabic = document.documentElement.lang !== 'en';
    const link = document.createElement('a');
    link.href = 'https://wa.me/966504681287'; link.target = '_blank'; link.rel = 'noopener noreferrer';
    link.className = 'error-whatsapp'; link.textContent = arabic ? 'التواصل عبر واتساب' : 'Contact via WhatsApp';
    status.append(document.createElement('br'), link);
  }).observe(status, { childList: true, characterData: true, subtree: true });
});
