(()=>{'use strict';
const get=(id)=>document.getElementById(id);
const copy=JSON.parse(get('site-copy')?.textContent||'{}');
const services=JSON.parse(get('site-services')?.textContent||'[]');
const stored=(()=>{try{return localStorage.getItem('sauer-lang')}catch{return null}})();
let lang=location.pathname.startsWith('/ru/')?'ru':(location.pathname.startsWith('/de/')?'de':(stored==='ru'?'ru':'de'));
const slugs=Object.fromEntries(services.map(s=>[s.slug,s]));
function changeLanguage(l){
 lang=l==='ru'?'ru':'de';document.documentElement.lang=lang;
 try{localStorage.setItem('sauer-lang',lang)}catch{}
 document.querySelectorAll('[data-i18n]').forEach(el=>{const value=copy[lang]?.[el.dataset.i18n];if(value!==undefined)el.innerHTML=value});
 document.querySelectorAll('[data-service-title]').forEach(el=>{const s=slugs[el.dataset.serviceTitle];if(s)el.textContent=s[lang]});
 document.querySelectorAll('[data-service-short]').forEach(el=>{const s=slugs[el.dataset.serviceShort];if(s)el.textContent=s[lang+'_short']});
 document.querySelectorAll('[data-service-intro]').forEach(el=>{const s=slugs[el.dataset.serviceIntro];if(s)el.textContent=s[lang+'_intro']});
 document.querySelectorAll('[data-service-why]').forEach(el=>{const s=slugs[el.dataset.serviceWhy];if(s)el.textContent=s[lang+'_why']});
 document.querySelectorAll('[data-step]').forEach(el=>{const [slug,num]=el.dataset.step.match(/^(.*)-(\d+)$/)?.slice(1)||[];const s=slugs[slug];if(s)el.textContent=s[lang+'_steps'][Number(num)]});
 const switcher=get('lang');if(switcher)switcher.innerHTML=lang==='de'?'DE <span>/ RU</span>':'<span>DE /</span> RU';
 document.title=(document.querySelector('h1')?.textContent?.trim()||'Zahnarztpraxis')+' | Familienzahnarztpraxis Svetlana Sauer';
}
const navList=get('nav-services');if(navList)navList.innerHTML=services.map(s=>`<a href="/?page=leistungen/${s.slug}" data-service-title="${s.slug}">${s.de}</a>`).join('');
get('lang')?.addEventListener('click',()=>changeLanguage(lang==='de'?'ru':'de'));
get('mobile-menu')?.addEventListener('click',()=>{const nav=get('nav');const open=!nav.classList.contains('is-open');nav.classList.toggle('is-open',open);get('mobile-menu').setAttribute('aria-expanded',String(open))});
get('nav')?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>get('nav')?.classList.remove('is-open')));
changeLanguage(lang);
const form=get('booking-form');
form?.addEventListener('submit',e=>{e.preventDefault();const name=form.elements.name.value.trim();const phone=form.elements.phone.value.trim();const email=form.elements.email.value.trim();const consent=form.querySelector('[type=checkbox]').checked;const status=get('form-status');if(!name||!phone||!consent||(email&&!form.elements.email.checkValidity())){status.textContent=lang==='de'?'Bitte Name, Telefonnummer und Einwilligung prüfen.':'Проверьте имя, телефон и согласие.';return;}
// Never transmit personal or health details to a backend in this unapproved demonstration. Email program handles explicit sending.
const body=`Name: ${name}\nTelefon: ${phone}\nE-Mail: ${email||'-'}\nErreichbarkeit: ${form.elements.time.value}\n\nBitte nehmen Sie Kontakt mit mir auf, um einen Termin zu vereinbaren.\n\n(Demo-Anfrage ohne medizinische Angaben)`;
const mailto='mailto:zahnarztpraxis.sauer@yahoo.com?subject='+encodeURIComponent('Terminanfrage | Familienzahnarztpraxis Sauer')+'&body='+encodeURIComponent(body);
status.textContent=lang==='de'?'Ihr E-Mail-Programm wird geöffnet. Bitte senden Sie die Nachricht dort selbst ab.':'Открывается ваша почтовая программа. Отправьте письмо самостоятельно.';
window.location.href=mailto;
});
if('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches){const obs=new IntersectionObserver((entries)=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('enter');obs.unobserve(e.target)}})},{threshold:.12});document.querySelectorAll('.reveal').forEach(x=>obs.observe(x))}

/* Privacy banner: choice is local; no optional tracking scripts are loaded. */
const consentBox=get('cookie-consent');
const privacyCopy={
 de:{title:'Ihre Privatsphäre ist uns wichtig',text:'Wir speichern nur technisch notwendige Einstellungen, etwa Ihre Sprachauswahl. Optionale Analyse ist derzeit nicht aktiv. Informationen finden Sie in unserer ',link:'Datenschutzerklärung',necessary:'Nur notwendige',all:'Alle akzeptieren'},
 ru:{title:'Ваша конфиденциальность важна для нас',text:'Мы сохраняем только необходимые настройки, например выбранный язык. Дополнительная аналитика сейчас не используется. Подробнее в ',link:'Политике конфиденциальности',necessary:'Только необходимые',all:'Принять все'}
};
function translatePrivacy(l){if(!consentBox)return;const t=privacyCopy[l];get('cookie-title').textContent=t.title;const p=get('cookie-explain');p.textContent=t.text;const a=document.createElement('a');a.href='/?page=datenschutz';a.textContent=t.link;p.append(a);get('cookie-necessary').textContent=t.necessary;get('cookie-accept').textContent=t.all;}
if(consentBox){translatePrivacy(lang);const originalLanguage=changeLanguage;changeLanguage=function(l){originalLanguage(l);translatePrivacy(lang)};let choice=null;try{choice=localStorage.getItem('sauer-privacy-choice')}catch{}
if(!choice){consentBox.hidden=false;requestAnimationFrame(()=>consentBox.classList.add('is-visible'))}
function choosePrivacy(value){try{localStorage.setItem('sauer-privacy-choice',value)}catch{};consentBox.classList.remove('is-visible');setTimeout(()=>{consentBox.hidden=true},750)}
get('cookie-necessary')?.addEventListener('click',()=>choosePrivacy('necessary'));get('cookie-accept')?.addEventListener('click',()=>choosePrivacy('all'));
}
})();
