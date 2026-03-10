
(function () {
    'use strict';

    const CV_FLAGS = {
        uk: `<svg viewBox="0 0 200 270" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice"><rect width="200" height="270" fill="#00247D"/><line x1="0" y1="0" x2="200" y2="270" stroke="white" stroke-width="36"/><line x1="200" y1="0" x2="0" y2="270" stroke="white" stroke-width="36"/><line x1="0" y1="0" x2="200" y2="270" stroke="#CF142B" stroke-width="22"/><line x1="200" y1="0" x2="0" y2="270" stroke="#CF142B" stroke-width="22"/><line x1="100" y1="0" x2="100" y2="270" stroke="white" stroke-width="54"/><line x1="0" y1="135" x2="200" y2="135" stroke="white" stroke-width="54"/><line x1="100" y1="0" x2="100" y2="270" stroke="#CF142B" stroke-width="32"/><line x1="0" y1="135" x2="200" y2="135" stroke="#CF142B" stroke-width="32"/></svg>`,
        ca: `<svg viewBox="0 0 200 270" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice"><rect width="200" height="270" fill="white"/><rect x="0" width="50" height="270" fill="#FF0000"/><rect x="150" width="50" height="270" fill="#FF0000"/><polygon points="100,50 112,88 152,88 120,112 132,150 100,126 68,150 80,112 48,88 88,88" fill="#FF0000"/></svg>`,
        de: `<svg viewBox="0 0 200 270" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice"><rect y="0" width="200" height="90" fill="#000"/><rect y="90" width="200" height="90" fill="#DD0000"/><rect y="180" width="200" height="90" fill="#FFCE00"/></svg>`,
        gl: `<div class="cv-globe-bg">🌐</div>`,
        us: `<svg viewBox="0 0 200 270" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice"><rect width="200" height="270" fill="white"/><rect y="0" width="200" height="20.77" fill="#B22234"/><rect y="41.54" width="200" height="20.77" fill="#B22234"/><rect y="83.08" width="200" height="20.77" fill="#B22234"/><rect y="124.62" width="200" height="20.77" fill="#B22234"/><rect y="166.15" width="200" height="20.77" fill="#B22234"/><rect y="207.69" width="200" height="20.77" fill="#B22234"/><rect y="249.23" width="200" height="20.77" fill="#B22234"/><rect width="80" height="145" fill="#3C3B6E"/><text x="6" y="22" font-size="13" fill="white" letter-spacing="3">★★★★★</text><text x="6" y="46" font-size="13" fill="white" letter-spacing="3">★★★★</text><text x="6" y="70" font-size="13" fill="white" letter-spacing="3">★★★★★</text><text x="6" y="94" font-size="13" fill="white" letter-spacing="3">★★★★</text><text x="6" y="118" font-size="13" fill="white" letter-spacing="3">★★★★★</text><text x="6" y="140" font-size="13" fill="white" letter-spacing="3">★★★★</text></svg>`,
        au: `<svg viewBox="0 0 200 270" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice"><rect width="200" height="270" fill="#00008B"/><line x1="0" y1="0" x2="100" y2="135" stroke="white" stroke-width="18"/><line x1="100" y1="0" x2="0" y2="135" stroke="white" stroke-width="18"/><line x1="0" y1="0" x2="100" y2="135" stroke="#C8102E" stroke-width="10"/><line x1="100" y1="0" x2="0" y2="135" stroke="#C8102E" stroke-width="10"/><line x1="50" y1="0" x2="50" y2="135" stroke="white" stroke-width="28"/><line x1="0" y1="67" x2="100" y2="67" stroke="white" stroke-width="28"/><line x1="50" y1="0" x2="50" y2="135" stroke="#C8102E" stroke-width="17"/><line x1="0" y1="67" x2="100" y2="67" stroke="#C8102E" stroke-width="17"/><text x="150" y="160" text-anchor="middle" font-size="30" fill="white">✦</text><text x="138" y="72" text-anchor="middle" font-size="16" fill="white">✦</text><text x="170" y="82" text-anchor="middle" font-size="16" fill="white">✦</text><text x="138" y="110" text-anchor="middle" font-size="16" fill="white">✦</text><text x="170" y="110" text-anchor="middle" font-size="16" fill="white">✦</text></svg>`
    };

    const CV_DESTS = [
        {
            label: 'the UK', color: '#C8102E', accentColor: '#CF142B', flagKey: 'uk',
            cardBg: 'linear-gradient(160deg,#0d1f3c,#0F1E35)', location: 'London, UK', pill: 'UK CV Ready',
            bullets: ['Architected Spring Boot microservices for banking platform, reducing latency 40%', 'Led team of 6; CI/CD halved release cycle to 2 days', 'Q3 2022 Employee of the Quarter — client delivery'],
            skills: ['Java', 'Spring Boot', 'Python', 'React', 'Oracle', 'MongoDB'],
            floaters: [
                { type: 'chip', label: '🇬🇧 UK Format', dot: '#CF142B', top: '5%', right: '-30px' },
                { type: 'chip', label: '✓ No Photo', dot: '#0A9396', bottom: '24%', left: '-40px' },
                { type: 'chip', label: '2 Pages Max', dot: '#00247D', bottom: '6%', right: '10px' },
                { type: 'orb', color: '#CF142B', size: 12, top: '18%', left: '4px' },
                { type: 'orb', color: '#00247D', size: 8, bottom: '38%', right: '2px' },
                { type: 'orb', color: '#E9C46A', size: 14, top: '52%', left: '-12px' }
            ]
        },
        {
            label: 'Canada', color: '#CC0000', accentColor: '#FF0000', flagKey: 'ca',
            cardBg: 'linear-gradient(160deg,#2a0e0e,#0F1E35)', location: 'Toronto, ON', pill: 'Express Entry',
            bullets: ['Delivered Spring Boot platform; improved throughput 40%', 'Team of 6; CI/CD reduced deploy time 50%', 'Employee of the Quarter Q3 2022'],
            skills: ['Java', 'Spring Boot', 'Python', 'React', 'SQL', 'Agile', 'NOC 21232'],
            floaters: [
                { type: 'chip', label: '🇨🇦 Express Entry', dot: '#FF0000', top: '5%', right: '-38px' },
                { type: 'chip', label: 'NOC Code Ready', dot: '#0A9396', bottom: '24%', left: '-44px' },
                { type: 'chip', label: 'IELTS Friendly', dot: '#CC0000', bottom: '6%', right: '10px' },
                { type: 'orb', color: '#FF0000', size: 14, top: '18%', left: '4px' },
                { type: 'orb', color: '#CC0000', size: 8, bottom: '38%', right: '2px' },
                { type: 'orb', color: '#E9C46A', size: 11, top: '52%', left: '-10px' }
            ]
        },
        {
            label: 'Germany', color: '#CC0000', accentColor: '#DD0000', flagKey: 'de',
            cardBg: 'linear-gradient(160deg,#1a1000,#0F1E35)', location: 'Berlin, DE', pill: 'Lebenslauf',
            bullets: ['Spring-Boot-Microservices für Bankensystem; Latenz −40%', '6-köpfiges Team; CI/CD-Pipeline implementiert', 'Mitarbeiter des Quartals Q3 2022'],
            skills: ['Java', 'Spring Boot', 'Python', 'React', 'Oracle', 'Git', 'Scrum'],
            floaters: [
                { type: 'chip', label: '🇩🇪 Lebenslauf', dot: '#DD0000', top: '5%', right: '-30px' },
                { type: 'chip', label: 'Foto erforderlich', dot: '#FFCE00', bottom: '24%', left: '-52px' },
                { type: 'chip', label: 'Tabellarisch', dot: '#333', bottom: '6%', right: '10px' },
                { type: 'orb', color: '#DD0000', size: 12, top: '18%', left: '4px' },
                { type: 'orb', color: '#FFCE00', size: 10, bottom: '38%', right: '2px' },
                { type: 'orb', color: '#333', size: 7, top: '52%', left: '-10px' }
            ]
        },
        {
            label: 'Remote', color: '#0A9396', accentColor: '#0A9396', flagKey: 'gl',
            cardBg: 'linear-gradient(160deg,#071d28,#0F1E35)', location: 'Remote — Global', pill: 'Remote Ready',
            bullets: ['Distributed platform across 3 time zones; 99.9% uptime', 'Async-first lead; doc-driven culture for 6 engineers', '1.2k GitHub stars on open-source tooling library'],
            skills: ['Java', 'Spring Boot', 'Python', 'React', 'Docker', 'Async', 'Notion'],
            floaters: [
                { type: 'chip', label: '🌐 Remote-Ready', dot: '#0A9396', top: '5%', right: '-34px' },
                { type: 'chip', label: 'Async Friendly', dot: '#94D2BD', bottom: '24%', left: '-38px' },
                { type: 'chip', label: 'ATS Optimised', dot: '#0A9396', bottom: '6%', right: '10px' },
                { type: 'orb', color: '#0A9396', size: 14, top: '18%', left: '4px' },
                { type: 'orb', color: '#94D2BD', size: 9, bottom: '38%', right: '2px' },
                { type: 'orb', color: '#E9C46A', size: 11, top: '52%', left: '-10px' }
            ]
        },
        {
            label: 'the USA', color: '#B22234', accentColor: '#B22234', flagKey: 'us',
            cardBg: 'linear-gradient(160deg,#200b12,#0F1E35)', location: 'New York, NY', pill: 'ATS-Parsed',
            bullets: ['Platform serving 2M daily users; P99 latency <120ms', 'Team of 6; deployment cycle cut from 14 days to 48 hours', 'Employee of the Quarter Q3 2022; promoted ahead of cycle'],
            skills: ['Java', 'Spring Boot', 'Python', 'React', 'AWS', 'Docker', 'SQL'],
            floaters: [
                { type: 'chip', label: '🇺🇸 ATS Parsed', dot: '#B22234', top: '5%', right: '-28px' },
                { type: 'chip', label: '1 Page Resume', dot: '#3C3B6E', bottom: '24%', left: '-38px' },
                { type: 'chip', label: 'Keywords Matched', dot: '#0A9396', bottom: '6%', right: '10px' },
                { type: 'orb', color: '#B22234', size: 13, top: '18%', left: '4px' },
                { type: 'orb', color: '#3C3B6E', size: 8, bottom: '38%', right: '2px' },
                { type: 'orb', color: '#E9C46A', size: 11, top: '52%', left: '-10px' }
            ]
        },
        {
            label: 'Australia', color: '#00008B', accentColor: '#00008B', flagKey: 'au',
            cardBg: 'linear-gradient(160deg,#08102a,#0F1E35)', location: 'Sydney, NSW', pill: 'AU CV Ready',
            bullets: ['Spring Boot microservices for banking; throughput +40%', 'Agile team of 6 in APAC; CI/CD with Jenkins', 'Employee of the Quarter Q3 2022 — global client recognition'],
            skills: ['Java', 'Spring Boot', 'Python', 'React', 'Oracle', 'Jenkins', 'Agile'],
            floaters: [
                { type: 'chip', label: '🇦🇺 Aussie Format', dot: '#00008B', top: '5%', right: '-32px' },
                { type: 'chip', label: 'Skills Assessment', dot: '#C8102E', bottom: '24%', left: '-50px' },
                { type: 'chip', label: '3 Pages OK', dot: '#0A9396', bottom: '6%', right: '10px' },
                { type: 'orb', color: '#00008B', size: 14, top: '18%', left: '4px' },
                { type: 'orb', color: '#C8102E', size: 9, bottom: '38%', right: '2px' },
                { type: 'orb', color: '#E9C46A', size: 12, top: '52%', left: '-10px' }
            ]
        }
    ];

    const slotWrap = document.getElementById('cvSlotWrap');
    const slotTrack = document.getElementById('cvSlotTrack');
    const cvZone = document.getElementById('cvZone');
    const cvDoc = document.getElementById('cvDoc');
    const cvBefore = document.getElementById('cvBefore');
    const cvAfter = document.getElementById('cvAfter');
    const scanner = document.getElementById('cvScanner');
    const scannerCore = document.getElementById('cvScannerCore');
    const scannerGlow = document.getElementById('cvScannerGlow');
    const aftBullets = document.getElementById('cvAftBullets');
    const aftSkills = document.getElementById('cvAftSkills');
    const aftPillText = document.getElementById('cvAftPillText');
    const pgNum = document.getElementById('cvPgNum');

    const N = CV_DESTS.length;
    const INTERVAL = 4200;
    let current = 0, busy = false, lineH = 0;

    function loadAfter(dest) {
        document.getElementById('cvAftFlag').innerHTML = CV_FLAGS[dest.flagKey];
        document.getElementById('cvAftLocation').textContent = dest.location;
        cvAfter.style.background = dest.cardBg;
        aftBullets.innerHTML = dest.bullets.map(b => `<li>${b}</li>`).join('');
        aftSkills.innerHTML = dest.skills.map(s => `<span class="cv-aft-skill">${s}</span>`).join('');
        aftPillText.textContent = dest.pill;
    }

    let floaterEls = [], floaterTweens = [];
    function buildFloaters(dest) {
        floaterTweens.forEach(t => t.kill()); floaterTweens = [];
        floaterEls.forEach(el => el.remove()); floaterEls = [];
        dest.floaters.forEach((f, i) => {
            let el;
            if (f.type === 'chip') {
                el = document.createElement('div');
                el.className = 'cv-floater cv-chip';
                el.innerHTML = `<span class="cv-chip-dot" style="background:${f.dot}"></span>${f.label}`;
            } else {
                el = document.createElement('div');
                el.className = 'cv-floater cv-orb';
                el.style.cssText = `width:${f.size}px;height:${f.size}px;background:${f.color};`;
            }
            if (f.top) el.style.top = f.top;
            if (f.bottom) el.style.bottom = f.bottom;
            if (f.left) el.style.left = f.left;
            if (f.right) el.style.right = f.right;
            el.style.opacity = '0'; el.style.zIndex = '30';
            cvZone.appendChild(el); floaterEls.push(el);
            gsap.to(el, { opacity: 1, y: -4, duration: .4, ease: 'power2.out', delay: i * .09 });
            floaterTweens.push(
                gsap.to(el, { y: f.type === 'chip' ? -10 : -6, duration: 2.2 + i * .4, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: i * .3 })
            );
        });
    }

    function runScan(dest, onComplete) {
        const docH = cvDoc.getBoundingClientRect().height;
        gsap.set(cvAfter, { clipPath: 'inset(0 0 100% 0)' });
        gsap.set(cvBefore, { opacity: 1 });
        scannerCore.style.background = dest.accentColor;
        scannerGlow.style.background = `linear-gradient(to bottom,transparent,${dest.accentColor}55,transparent)`;
        gsap.set(scanner, { y: 0, opacity: 1 });

        const tl = gsap.timeline({ onComplete });
        tl.to(scanner, {
            y: docH, duration: 1.9, ease: 'power1.inOut',
            onUpdate() {
                const y = gsap.getProperty(scanner, 'y');
                const rem = Math.max(0, 100 - (y / docH) * 100);
                cvAfter.style.clipPath = `inset(0 0 ${rem.toFixed(1)}% 0)`;
                cvBefore.style.opacity = Math.max(0, 1 - (y / docH) * 1.5);
            }
        });
        tl.to(scanner, { opacity: 0, duration: .25, ease: 'power2.out' }, '-=0.25');
        tl.to({}, {
            duration: .5,
            onStart() {
                gsap.to(pgNum, {
                    innerText: 1, duration: .6, ease: 'power2.out', snap: { innerText: 1 },
                    onUpdate() { pgNum.style.color = parseInt(pgNum.textContent) <= 1 ? dest.accentColor : '#1C2B3A'; }
                });
            }
        }, '-=0.8');
    }

    function resetDoc() {
        gsap.set(cvAfter, { clipPath: 'inset(0 0 100% 0)' });
        gsap.set(cvBefore, { opacity: 1 });
        gsap.set(scanner, { y: 0, opacity: 0 });
        pgNum.textContent = '3';
        pgNum.style.color = '#1C2B3A';
    }

    function scrollSlot(idx) {
        const target = idx === 0 ? -(N * 1.2) + 'em' : -(idx * 1.2) + 'em';
        gsap.to(slotTrack, {
            y: target, duration: .5, ease: 'power3.inOut',
            onComplete() { if (idx === 0) gsap.set(slotTrack, { y: 0 }); }
        });
        const targetWidth = CV_DESTS[idx].widthEm + 'em';
        gsap.to(slotWrap, { width: targetWidth, duration: .5, ease: 'power3.inOut' });
        gsap.fromTo(slotWrap, { scaleY: .85, opacity: .6 }, { scaleY: 1, opacity: 1, duration: .35, ease: 'back.out(2)', delay: .08 });
    }

    function advance() {
        if (busy) return; busy = true;
        const nextIdx = (current + 1) % N;
        const dest = CV_DESTS[nextIdx];
        loadAfter(dest);
        scrollSlot(nextIdx);
        buildFloaters(dest);
        gsap.delayedCall(.3, () => {
            runScan(dest, () => {
                current = nextIdx;
                gsap.delayedCall(1.0, () => { resetDoc(); busy = false; });
            });
        });
    }

    const measure = document.createElement('span');
    measure.style.cssText = `font-family:'Fraunces',serif;font-style:italic;font-weight:700;line-height:1.2;visibility:hidden;position:absolute;white-space:nowrap;`;
    document.body.appendChild(measure);

    document.fonts.ready.then(() => {
        const h1 = document.querySelector('.hero h1');
        const fs = parseFloat(getComputedStyle(h1).fontSize);
        lineH = Math.round(fs * 1.2);
        measure.style.fontSize = fs + 'px';

        CV_DESTS.forEach(d => {
            measure.textContent = d.label;
            d.widthEm = measure.getBoundingClientRect().width / fs;
        });
        document.body.removeChild(measure);

        slotWrap.style.height = '1.2em';
        slotWrap.style.width = CV_DESTS[0].widthEm + 'em';
        slotWrap.style.fontSize = 'inherit';

        [...CV_DESTS, CV_DESTS[0]].forEach(d => {
            const el = document.createElement('div');
            el.className = 'cv-slot-item';
            el.style.cssText = `height:1.2em;line-height:1.2em;color:${d.color};font-size:inherit;`;
            el.textContent = d.label;
            slotTrack.appendChild(el);
        });
        gsap.set(slotTrack, { y: 0 });

        loadAfter(CV_DESTS[0]);
        buildFloaters(CV_DESTS[0]);
        resetDoc();

        gsap.from('.hero-left', { opacity: 0, y: 20, duration: .7, ease: 'power2.out', delay: .15 });
        gsap.from('.hero-right', { opacity: 0, x: 30, duration: .7, ease: 'back.out(1.3)', delay: .35 });

        gsap.to('.cv-wrap', { y: -10, duration: 3.2, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 1.4 });

        gsap.delayedCall(1.6, () => {
            runScan(CV_DESTS[0], () => {
                gsap.delayedCall(1.0, () => { resetDoc(); busy = false; });
            });
        });

        setInterval(advance, INTERVAL);
    });

})(); // end IIFE