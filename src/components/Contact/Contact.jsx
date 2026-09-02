import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { fadeUpVariant, staggerContainer } from '../../hooks/useAnimations';
import s from './Contact.module.css';

// ─── EmailJS Setup ────────────────────────────────────────────────────────────
// 1. Sign up free at https://www.emailjs.com (200 emails/month)
// 2. Add a Gmail Email Service → copy the Service ID below
// 3. Create a Template with vars: {{from_name}} {{from_email}} {{subject}} {{message}}
// 4. Account → API Keys → copy your Public Key
const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID';   // ← replace
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';  // ← replace
const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY';    // ← replace
// ─────────────────────────────────────────────────────────────────────────────

const CONTACTS = [
  { icon: '✉',  label: 'Email',    value: 'moorthychetan06@gmail.com',  href: 'mailto:moorthychetan06@gmail.com', color: 'red'    },
  { icon: '💼', label: 'LinkedIn', value: 'linkedin.com/in/moorthy-chetan', href: 'https://www.linkedin.com/in/moorthy-chetan-38a176325', color: 'blue'   },
  { icon: '🐙', label: 'GitHub',   value: 'github.com/Chetan0246',         href: 'https://github.com/Chetan0246',                        color: 'green'  },
  { icon: '📞', label: 'Phone',    value: '+91 94415 22812',              href: 'tel:+919441522812',               color: 'yellow' },
];

function Toast({ msg, type }) {
  return (
    <AnimatePresence>
      {msg && (
        <motion.div
          className={`toast ${type}`}
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.25 }}
        >
          {type === 'success' ? '✅' : '❌'} {msg}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Field({ label, name, type, value, onChange, placeholder }) {
  const sharedStyle = {
    width: '100%',
    background: 'var(--bg-secondary)',
    border: '1.5px solid var(--border-medium)',
    borderRadius: 'var(--radius-md)',
    padding: '11px 15px',
    color: 'var(--text-primary)',
    fontSize: '0.9rem',
    outline: 'none',
    transition: 'border-color 200ms ease, box-shadow 200ms ease',
    resize: 'vertical',
  };
  const focus = (e) => {
    e.target.style.borderColor = 'var(--yellow)';
    e.target.style.boxShadow = '0 0 0 3px rgba(255,204,68,0.12)';
  };
  const blur = (e) => {
    e.target.style.borderColor = 'var(--border-medium)';
    e.target.style.boxShadow = 'none';
  };

  return (
    <label style={{ display: 'block' }}>
      <span style={{ display:'block', fontSize:'0.73rem', fontWeight:700, color:'var(--text-muted)', letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:6 }}>
        {label}
      </span>
      {type === 'textarea' ? (
        <textarea
          name={name} value={value} onChange={onChange} placeholder={placeholder}
          rows={5} style={{ ...sharedStyle, minHeight: 120 }}
          onFocus={focus} onBlur={blur}
        />
      ) : (
        <input
          name={name} type={type} value={value} onChange={onChange} placeholder={placeholder}
          style={sharedStyle} onFocus={focus} onBlur={blur}
        />
      )}
    </label>
  );
}

function Spinner() {
  return (
    <span style={{
      display: 'inline-block', width: 14, height: 14, flexShrink: 0,
      border: '2px solid rgba(255,255,255,0.25)',
      borderTop: '2px solid #fff',
      borderRadius: '50%',
      animation: 'spin 0.7s linear infinite',
    }} />
  );
}

export default function Contact() {
  const [form, setForm]     = useState({ name:'', email:'', subject:'', message:'' });
  const [status, setStatus] = useState({ loading: false, toast: '', type: '' });

  const onChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setStatus({ loading: false, toast: 'Please fill in all required fields.', type: 'error' });
      setTimeout(() => setStatus(s => ({ ...s, toast: '' })), 4000);
      return;
    }
    setStatus({ loading: true, toast: '', type: '' });
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID,
        { from_name: form.name, from_email: form.email, subject: form.subject || 'Portfolio Contact', message: form.message },
        EMAILJS_PUBLIC_KEY
      );
      setStatus({ loading: false, toast: "Message sent! I'll get back to you soon 🚀", type: 'success' });
      setForm({ name:'', email:'', subject:'', message:'' });
    } catch {
      setStatus({ loading: false, toast: 'Send failed — please email me directly.', type: 'error' });
    }
    setTimeout(() => setStatus(s => ({ ...s, toast: '' })), 5000);
  };

  return (
    <section id="contact" className={`${s.contact} section`}>
      <div className="container">

        {/* Heading */}
        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden" whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.p variants={fadeUpVariant} className="section-label">Get in touch</motion.p>
          <motion.h2 variants={fadeUpVariant} className="section-title">
            Let's Build Something <span style={{ color: 'var(--yellow)' }}>Great</span>
          </motion.h2>
          <motion.div variants={fadeUpVariant} className="section-line yellow" />
        </motion.div>

        <div className={s.grid}>
          {/* Contact method cards */}
          <motion.div
            className={s.cards}
            variants={staggerContainer(0.09, 0.05)}
            initial="hidden" whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
          >
            {CONTACTS.map((c) => (
              <motion.a
                key={c.label}
                href={c.href}
                target={c.href.startsWith('http') ? '_blank' : undefined}
                rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                variants={fadeUpVariant}
                className={`${s.contactCard} ${s[c.color]}`}
              >
                <span className={s.contactIcon}>{c.icon}</span>
                <div style={{ minWidth: 0 }}>
                  <span className={s.contactLabel}>{c.label}</span>
                  <span className={s.contactValue}>{c.value}</span>
                </div>
                <span className={s.contactArrow}>↗</span>
              </motion.a>
            ))}
          </motion.div>

          {/* Form */}
          <motion.form
            onSubmit={onSubmit} className={s.form}
            variants={fadeUpVariant}
            initial="hidden" whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
          >
            <div className={s.row}>
              <Field label="Name *"  name="name"  type="text"  value={form.name}  onChange={onChange} placeholder="Your name" />
              <Field label="Email *" name="email" type="email" value={form.email} onChange={onChange} placeholder="your@email.com" />
            </div>
            <Field label="Subject" name="subject" type="text" value={form.subject} onChange={onChange} placeholder="What's this about?" />
            <Field label="Message *" name="message" type="textarea" value={form.message} onChange={onChange} placeholder="Tell me about your project, question, or just say hello…" />

            <button
              type="submit"
              className={`btn btn-primary ${s.submitBtn}`}
              disabled={status.loading}
            >
              {status.loading ? <><Spinner /> Sending…</> : 'Send Message →'}
            </button>
          </motion.form>
        </div>
      </div>

      <Toast msg={status.toast} type={status.type} />
    </section>
  );
}
