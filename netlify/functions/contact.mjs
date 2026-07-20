// Contact form handler (Netlify Function, v2). Keeps the site fully static — only
// this endpoint runs serverless. It:
//   1. drops bot submissions via a honeypot (no email, no cost),
//   2. validates the required fields,
//   3. emails the Markly team (the critical path) with Reply-To = the client,
//   4. sends the client a best-effort confirmation.
//
// Env (Netlify → Site settings → Environment variables):
//   RESEND_API_KEY   required — from resend.com, with marklyafrica.com verified as a sender domain
//   CONTACT_FROM     optional — default "Markly Africa <hello@marklyafrica.com>"
//   CONTACT_TEAM     optional — comma-separated, default "hello@…,woye.famojuro@…"

const FROM = process.env.CONTACT_FROM || 'Markly Africa <hello@marklyafrica.com>';
const TEAM = (process.env.CONTACT_TEAM || 'hello@marklyafrica.com,woye.famojuro@marklyafrica.com')
	.split(',').map((s) => s.trim()).filter(Boolean);

const esc = (s = '') =>
	String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
const json = (status, body) =>
	new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json' } });

async function sendEmail(apiKey, payload) {
	const res = await fetch('https://api.resend.com/emails', {
		method: 'POST',
		headers: { Authorization: `Bearer ${apiKey}`, 'content-type': 'application/json' },
		body: JSON.stringify(payload),
	});
	if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text().catch(() => '')}`);
	return res.json();
}

export default async (req) => {
	if (req.method !== 'POST') return json(405, { error: 'Method not allowed' });

	let data;
	try {
		data = await req.json();
	} catch {
		return json(400, { error: 'Invalid request.' });
	}

	// Honeypot: real users never see/fill `website`. Bots do → silently accept and drop.
	if (data.website) return json(200, { ok: true });

	const name = (data.name || '').trim();
	const email = (data.email || '').trim();
	const service = (data.service || '').trim();
	const company = (data.company || '').trim();
	const phone = (data.phone || '').trim();
	const message = (data.message || '').trim();

	if (!name || !service || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
		return json(422, { error: 'Please provide your name, a valid email, and the service you need.' });
	}

	const apiKey = process.env.RESEND_API_KEY;
	if (!apiKey) {
		console.error('RESEND_API_KEY is not set');
		return json(500, { error: 'Email service is not configured.' });
	}

	const rows = [
		['Name', name], ['Email', email], ['Company', company || '—'],
		['Phone', phone || '—'], ['Service', service], ['Message', message || '—'],
	]
		.map(
			([k, v]) =>
				`<tr><td style="padding:6px 14px 6px 0;color:#57607a;font-weight:600;vertical-align:top">${esc(k)}</td><td style="padding:6px 0;color:#1d0e42">${esc(v).replace(/\n/g, '<br>')}</td></tr>`,
		)
		.join('');

	const teamHtml = `<div style="font-family:Arial,Helvetica,sans-serif;max-width:560px">
		<h2 style="color:#2d106c;margin:0 0 4px">New consultation request</h2>
		<p style="color:#57607a;margin:0 0 18px">Submitted via marklyafrica.com/contact</p>
		<table style="border-collapse:collapse;font-size:15px">${rows}</table>
		<p style="color:#8a90a6;font-size:13px;margin-top:22px">Reply to this email to respond directly to ${esc(name)}.</p>
	</div>`;

	const clientHtml = `<div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;color:#1d0e42">
		<h2 style="color:#2d106c;margin:0 0 12px">Thank you, ${esc(name)} — we've got your message.</h2>
		<p style="line-height:1.6;margin:0 0 14px">Your request has reached the Markly Africa advisory team. We typically respond within one business day.</p>
		<p style="line-height:1.6;margin:0 0 14px">For your records, here's what you sent us:</p>
		<table style="border-collapse:collapse;font-size:14px;margin-bottom:18px">${rows}</table>
		<p style="line-height:1.6;margin:0">Warm regards,<br><strong>Markly Africa</strong><br>
			<span style="color:#57607a">Compliance &middot; IP &middot; Advisory</span></p>
	</div>`;

	// Team notification is the critical path — fail the request only if this fails.
	try {
		await sendEmail(apiKey, {
			from: FROM,
			to: TEAM,
			reply_to: email,
			subject: `New consultation request — ${name}`,
			html: teamHtml,
		});
	} catch (err) {
		console.error('team notification failed:', err);
		return json(502, { error: 'We could not send your message right now. Please email us directly.' });
	}

	// Client confirmation is best-effort — a bounce here shouldn't error the user.
	try {
		await sendEmail(apiKey, {
			from: FROM,
			to: [email],
			reply_to: 'hello@marklyafrica.com',
			subject: "We've received your message — Markly Africa",
			html: clientHtml,
		});
	} catch (err) {
		console.error('client confirmation failed:', err);
	}

	return json(200, { ok: true });
};
