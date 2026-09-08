for (const href of ['mobile.css', 'companies.css']) { const stylesheet = document.createElement('link'); stylesheet.rel = 'stylesheet'; stylesheet.href = href; document.head.append(stylesheet); }
document.addEventListener('DOMContentLoaded', () => {
  const menuButton = document.querySelector('#menu');
  const menu = document.querySelector('#mobileMenu');
  const closeMenu = () => { menu.classList.remove('open'); menuButton.setAttribute('aria-expanded', 'false'); };
  menuButton.addEventListener('click', () => { const open = menu.classList.toggle('open'); menuButton.setAttribute('aria-expanded', String(open)); });
  menu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
  document.addEventListener('click', event => { if (!menu.contains(event.target) && !menuButton.contains(event.target)) closeMenu(); });
  const form = document.querySelector('#form');
  const companies = ['شركة المركز العالمي الدولي للبولينج','مؤسسة عيد الجود التجارية','شركة أعلى تك المحدودة','شركة دزاين للتجارة شركة شخص واحد','شركة الفرات للانظمة الالكترونية','شركة ناقل','شركة الحل المتقدم للصناعة','شركة آفاق الاتحاد','شركة الشملول التجارية شركة شخص واحد','شركة ميراس السعودية للمقاولات شركة شخص واحد','شركة الأندلس للتجارة','شركة صلاح الدين الأيوبي وشريكه للمقاولات','شركة تلمسان للتجارة','شركة إي جي تي لوجيستيكس','مصنع الشرق والخليج للصناعة','شركة تشييد الشرق للتجارة والمقاولات','شركة لواء الصحراء للملابس العسكرية','مؤسسة الأناقة الطبية التجارية','شركة مودرن للتجارة','شركة اجتياز دبي','شركة المصنع السعودي للحقن والمنتجات البلاستيكية','شركة إبراهيم عبدالعزيز العليان','مؤسسة رزام الحديثة للتجارة','مؤسسة سعيد محمد الشهراني للتجارة','شركة مصنع فش فاش للمواد الغذائية','فرع مصنع ماس العالمية للصناعة','مطابخ مي الذهب','مؤسسة مصنع عطر الجزيرة للعطورات','شركة مصنع بيت التصنيع البلاستيكي المحدودة','شركة خدمات وتقنية التحلية للتجارة','شركة آفاق التميز للتجارة','شركة مواني الخليج التجارية','شركة الرحاب كود','شركة التاج الفضية للتجارة شركة شخص واحد','شركة منيف للتعبئة والتغليف','مصنع شركة نون الخليج للصناعة','شركة بروكنيكت السعودية','معمل ركاز الشام','شركة اتحاد الخليج للأغذية مساهمة مقفلة','شركة عالم سيدار للمستائر','مطاعم شاورما البلد للوجبات السريعة','مؤسسة درر الهفوف التجارية','حمد بن محمد بن عبدالرحمن الرقيب','شركة صفوة الساعات التجارية','شركة الجمال والصحة للتجارة','الشركة السعودية للألومنيوم','شركة مصنع الوطن للخرسانة','مؤسسة حصين رئيس للتجارة','شركة النظرة الأنيقة المحدودة','مؤسسة عراب الجزيرة للتجارة','مؤسسة الركن الممتاز للتجارة','شركة زمردة عجمان المحدودة','شركة شلال الغذاء للتجارة شركة شخص واحد','شركة علامات المنزل المحدودة','شركة واجهات ذكية للتجارة شركة شخص واحد','شركة المعادن الذكية الصناعية شركة شخص واحد','مصنع الروضة للبيوت المحمية الزراعية','مؤسسة مشاريع امبيا','شركة محمد معزي بن عميره للتجاره','شركة فورس ستيل بروفايلز العربيه الصناعيه شركة شخص واحد','شركة امتياز الجزيرة للتجارة','شركة لوازم العمارة الحديثة للتجارة','مؤسسة المحيط المتوسط التجارية','حور الألوان للتجارة','مؤسسة الأجواء المميزة للتجارة','شركة ركن الرصيد التجارية','شركة دار الحاني للتجارة','شركة تجديف للتجارة','شركة تنمية الإعمار التجارية','شركة بصمة داري التجارية شخص واحد','شركة الدعم والأعمال للتجارة شركة شخص واحد','مؤسسة حجر المرمر للتجارة','مؤسسة عمر يونس البراك للتجارة','شركة إبراهيم الجفالي وأخوانه للمنتجات الكيماوية شركة شخص واحد','شركة منارت الثقة التجارية','شركة أزرق وأخضر','شركة المنزل العائلي للتجارة','شركة آل منيف للتجارة والصناعة والزراعة والمقاولات','مصنع صخور نجد للرخام والحجر والجرانيت الطبيعي','مؤسسة حنان سعيد محمد معروف التجارية','مصنع ماسات المايا للصناعة','مؤسسة وادي النحل التجارية','مؤسسة سليمان علي الحناكي للتجارة','مؤسسة جي ستون للمقاولات','شركة ميراس السعودية للخدمات اللوجستية شركة شخص واحد','شركة ميراس السعودية للخدمات اللوجيستية','مؤسسة يوسف جاسم النحو التجارية','شركة الفلزات الحديثة للتجارة','مؤسسة بندر عبدالمحسن عبدالله الحسن للفحم','مؤسسة أواني المصباح للتجارة','مؤسسة عبدالرحمن عبدالكريم المهيدب للتجارة','شركة تاين الخليج الصناعية شركة شخص واحد','شركة خالد عبدالله الشتري وشركاه للتجارة والمقاولات','شركة شروق التربية لتشغيل المدارس','شركة عبدالله صالح البلال للتجارة','شركة عبدالله حسن المروتي الزراعية','مؤسسة الجوهره عبدالعزيز بن رشيد الرشيد للتجارة','مؤسسة منارة الخليج التجارية'];
  const clientsGrid = document.querySelector('#track .clients');
  clientsGrid.setAttribute('aria-label', 'Companies and institutions we have worked with');
  clientsGrid.innerHTML = companies.map(name => `<article lang="ar" dir="rtl">${name}</article>`).join('');
  const renderCompanies = () => {
    const english = document.documentElement.lang === 'en';
    clientsGrid.dir = 'rtl';
    document.querySelector('#track [data-t="track"]').textContent = english ? 'Previous Work' : 'سابقة الأعمال';
    document.querySelector('#track [data-t="trackTitle"]').textContent = english ? 'Experience We Are Proud Of.' : 'خبرة نفخر بها.';
  };
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
  new MutationObserver(() => { applyLanguageDetails(); renderCompanies(); }).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
  applyLanguageDetails(); renderCompanies();
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
