let turnstileToken = null;

function onTurnstileSuccess(token) {
    turnstileToken = token;
}

const formLoadTime = Date.now();
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxNa6un_LfyXSbS7kKzYtntHA212mFlwXqI4dK-Rt6cMEKDFYAjn4-uhoKNazyrSKmX/exec';

async function submitEmail() {
    const emailInput = document.getElementById('email');
    const btn = document.getElementById('submit-btn');
    const errorMsg = document.getElementById('error-msg');
    const success = document.getElementById('success');
    const formSection = document.getElementById('form-section');

    const email = emailInput.value.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        errorMsg.textContent = 'Please enter a valid email address.';
        errorMsg.classList.add('show');
        emailInput.focus();
        return;
    }

    if (!turnstileToken) {
        errorMsg.textContent = 'Please complete the security check.';
        errorMsg.classList.add('show');
        return;
    }

    // Time-based honeypot: check if form was filled too quickly (under 2 seconds)
    const timeSpent = Date.now() - formLoadTime;
    if (timeSpent < 2000) {
        // Fake a successful submission
        formSection.style.display = 'none';
        success.classList.add('show');
        return;
    }
    // Client-side validations (matching server logic)
    const blockedDomains = [
        // Test and placeholder domains
        'example.com', 'example.org', 'example.net',
        'test.com', 'test.org', 'testing.com',
        'placeholder.com', 'domain.com', 'email.com',
        'fake.com', 'noemail.com', 'nodomain.com',
        'invalid.com', 'null.com', 'none.com',

        // Disposable email services
        'mailinator.com', 'guerrillamail.com', 'tempmail.com',
        'throwaway.email', 'sharklasers.com', 'guerrillamailblock.com',
        'grr.la', 'guerrillamail.info', 'spam4.me', 'trashmail.com',
        'yopmail.com', 'maildrop.cc', 'dispostable.com', 'fakeinbox.com',
        'tempinbox.com', 'mailnull.com', 'spamgourmet.com', 'trashmail.me',
        'discard.email', 'spamex.com', 'mailexpire.com', 'filzmail.com'
    ];

    const domain = email.split('@')[1];
    const localPart = email.split('@')[0];
    const uuidPattern = /[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}/i;

    const blockedLocalParts = [
        'test', 'testing', 'fake', 'null', 'none',
        'noreply', 'no-reply', 'donotreply', 'placeholder',
        'example', 'sample', 'demo', 'trial', 'temp',
        'temporary', 'disposable', 'throwaway', 'trash',
        'spam', 'invalid', 'admin', 'root'
    ];

    if (email.includes('+') || blockedDomains.includes(domain) || uuidPattern.test(email) || localPart.length > 40 || blockedLocalParts.includes(localPart.toLowerCase())) {
        errorMsg.textContent = 'Please use a valid permanent email address.';
        errorMsg.classList.add('show');
        emailInput.focus();
        return;
    }

    // Spam prevention timeout (60 seconds)
    const lastSubmit = localStorage.getItem('lastSubmitTime');
    const now = Date.now();
    if (lastSubmit) {
        const timePassed = now - parseInt(lastSubmit);
        if (timePassed < 60000) {
            const timeLeft = Math.ceil((60000 - timePassed) / 1000);
            errorMsg.textContent = `Please wait ${timeLeft} seconds before trying again.`;
            errorMsg.classList.add('show');
            return;
        }
    }
    localStorage.setItem('lastSubmitTime', now.toString());

    errorMsg.classList.remove('show');
    btn.classList.add('loading');
    btn.disabled = true;
    emailInput.disabled = true;

    // Fetch user IP address and anonymize it via one-way cryptographic hash
    let userIp = 'unknown';
    try {
        const ipResponse = await fetch('https://api.ipify.org?format=json');
        const ipData = await ipResponse.json();

        // Hash the IP immediately for GDPR/CCPA privacy compliance
        const encoder = new TextEncoder();
        const data = encoder.encode(ipData.ip + "salt_to_prevent_rainbow_tables");
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        userIp = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    } catch (e) {
        console.warn('IP fetch failed');
    }

    try {
        const response = await fetch(APPS_SCRIPT_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'text/plain' },
            body: JSON.stringify({
                email: email,
                date: new Date().toISOString(),
                token: turnstileToken,
                ip: userIp
            })
        });

        const data = await response.json();

        if (data.result === 'success' || data.result === 'duplicate') {
            formSection.style.display = 'none';
            success.classList.add('show');
            turnstile.reset();
            turnstileToken = null;
            const current = parseInt(document.getElementById('signup-count').textContent) || 0;
            if (data.result === 'success') {
                document.getElementById('signup-count').textContent = current + 1;
                localStorage.setItem('signupCount', current + 1);
            }
        } else if (data.result === 'bot' || data.result === 'rate_limited') {
            btn.classList.remove('loading');
            btn.disabled = false;
            emailInput.disabled = false;
            errorMsg.textContent = data.result === 'rate_limited' ? 'Too many requests from this network. Try again later.' : 'Security check failed. Please try again.';
            errorMsg.classList.add('show');
            turnstile.reset();
            turnstileToken = null;
        } else if (data.result === 'invalid') {
            btn.classList.remove('loading');
            btn.disabled = false;
            emailInput.disabled = false;
            errorMsg.textContent = 'Please use a valid permanent email address.';
            errorMsg.classList.add('show');
        } else {
            throw new Error('Failed');
        }

    } catch (err) {
        btn.classList.remove('loading');
        btn.disabled = false;
        emailInput.disabled = false;
        errorMsg.textContent = 'Something went wrong, please try again.';
        errorMsg.classList.add('show');
    }
}

async function loadSignupCount() {
    const cached = localStorage.getItem('signupCount');
    if (cached) {
        document.getElementById('signup-count').textContent = cached;
    }

    try {
        const response = await fetch(APPS_SCRIPT_URL);
        const data = await response.json();
        const liveCount = data.rows || 0;
        const displayCount = liveCount + 93;
        document.getElementById('signup-count').textContent = displayCount;
        localStorage.setItem('signupCount', displayCount);
    } catch (err) {
        document.getElementById('signup-count').textContent = cached || '';
    }
}

// Load count on page open
loadSignupCount();

// Refresh count every 60 seconds
setInterval(loadSignupCount, 60000);

// Add event listener for Enter key
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('email').addEventListener('keydown', function (e) {
        if (e.key === 'Enter') submitEmail();
    });
});
