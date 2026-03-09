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

            // Client-side validations (matching server logic)
            const blockedDomains = [
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

            if (email.includes('+') || blockedDomains.includes(domain) || uuidPattern.test(email) || localPart.length > 40) {
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

            try {
                const response = await fetch(APPS_SCRIPT_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'text/plain' },
                    body: JSON.stringify({
                        email: email,
                        date: new Date().toISOString()
                    })
                });

                const data = await response.json();

                if (data.result === 'success' || data.result === 'duplicate') {
                    formSection.style.display = 'none';
                    success.classList.add('show');
                    const current = parseInt(document.getElementById('signup-count').textContent) || 0;
                    if (data.result === 'success') {
                        document.getElementById('signup-count').textContent = current + 1;
                        localStorage.setItem('signupCount', current + 1);
                    }
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
                const displayCount = liveCount + 47;
                document.getElementById('signup-count').textContent = displayCount;
                localStorage.setItem('signupCount', displayCount);
            } catch (err) {
                document.getElementById('signup-count').textContent = cached || '';
            }
        }

        loadSignupCount();
        setInterval(loadSignupCount, 60000);

        document.getElementById('email').addEventListener('keydown', function (e) {
            if (e.key === 'Enter') submitEmail();
        });
    </script>

    <script>
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
    </script>
