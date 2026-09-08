const recipient = 'Bawabtalalem@outlook.com';
const clean = (value, max = 4000) => String(value || '').trim().replace(/[\r\n]+/g, ' ').slice(0, max);
const attempts = new Map();

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const ip = String(req.headers?.['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown').split(',')[0].trim();
  const now = Date.now(), previous = attempts.get(ip) || [];
  const recent = previous.filter(time => now - time < 10 * 60 * 1000);
  if (recent.length >= 5) return res.status(429).json({ error: 'Too many requests' });
  recent.push(now); attempts.set(ip, recent);
  const { fullName, companyName, phone, email, service, message, language, website } = req.body || {};
  if (website) return res.status(400).json({ error: 'Invalid request' });
  const errors = {};
  if (!clean(fullName, 150)) errors.fullName = true;
  if (!clean(phone, 50)) errors.phone = true;
  if (!clean(service, 150)) errors.service = true;
  if (!clean(message, 4000)) errors.message = true;
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email))) errors.email = true;
  if (Object.keys(errors).length) return res.status(422).json({ error: 'Validation failed', fields: errors });

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  if (!apiKey || !from) return res.status(503).json({ error: 'Email service is not configured' });

  const reference = `BA-${new Date().getFullYear()}-${crypto.randomUUID().replace(/-/g, '').slice(0, 8).toUpperCase()}`;
  const submittedAt = new Intl.DateTimeFormat('en-GB', { dateStyle: 'full', timeStyle: 'medium', timeZone: 'Asia/Riyadh' }).format(new Date());
  const row = (label, value) => `<tr><td style="padding:9px 14px;background:#f5f7f8;font-weight:700">${label}</td><td style="padding:9px 14px">${String(value || '—').replace(/[&<>"']/g, c => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c]))}</td></tr>`;
  const html = `<div style="font-family:Arial,sans-serif;color:#12283a;max-width:680px"><h2 style="color:#09233a">New Website Service Request</h2><p><strong>Reference:</strong> ${reference}</p><table style="width:100%;border-collapse:collapse;border:1px solid #dde3e5">${row('Full Name',clean(fullName,150))}${row('Company Name',clean(companyName,150))}${row('Phone Number',clean(phone,50))}${row('Email Address',clean(email,150))}${row('Required Service',clean(service,150))}${row('Message',clean(message,4000))}${row('Submission Date & Time (Riyadh)',submittedAt)}${row('Website language',language === 'en' ? 'English' : 'Arabic')}</table></div>`;

  try {
    const response = await fetch('https://api.resend.com/emails', { method: 'POST', headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ from, to: [recipient], reply_to: email || undefined, subject: `New Website Service Request | مؤسسة بوابة العالم للتخليص الجمركي | ${reference}`, html }) });
    if (!response.ok) throw new Error(await response.text());
    return res.status(200).json({ success: true, reference });
  } catch (error) {
    console.error('Request email failed', error);
    return res.status(502).json({ error: 'Email delivery failed' });
  }
}
