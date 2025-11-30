/**
 * Portal JavaScript - Handles authentication and dashboard functionality
 */

// Check authentication status on page load
document.addEventListener('DOMContentLoaded', () => {
    checkAuthStatus();
    initAuthTabs();
});

/**
 * Initialize authentication tab switching
 */
function initAuthTabs() {
    const tabs = document.querySelectorAll('.auth-tab');
    const forms = document.querySelectorAll('.auth-form');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTab = tab.getAttribute('data-tab');

            // Update tab states
            tabs.forEach(t => {
                t.classList.remove('active');
                t.setAttribute('aria-selected', 'false');
            });
            tab.classList.add('active');
            tab.setAttribute('aria-selected', 'true');

            // Update form visibility
            forms.forEach(form => {
                form.classList.remove('active');
            });
            document.getElementById(`${targetTab}-form`).classList.add('active');
        });
    });
}

/**
 * Check if user is authenticated
 */
function checkAuthStatus() {
    try {
        const user = JSON.parse(localStorage.getItem('eventSentinelUser'));
        if (user && user.email) {
            showDashboard(user);
        } else {
            showAuth();
        }
    } catch (error) {
        console.warn('Error checking auth status:', error);
        showAuth();
    }
}

/**
 * Show authentication section
 */
function showAuth() {
    const authSection = document.getElementById('auth-section');
    const dashboardSection = document.getElementById('dashboard-section');
    
    if (authSection) authSection.style.display = 'block';
    if (dashboardSection) dashboardSection.style.display = 'none';
}

/**
 * Show dashboard section
 */
function showDashboard(user) {
    const authSection = document.getElementById('auth-section');
    const dashboardSection = document.getElementById('dashboard-section');
    
    if (authSection) authSection.style.display = 'none';
    if (dashboardSection) dashboardSection.style.display = 'block';
    
    // Populate user data
    populateDashboard(user);
}

/**
 * Populate dashboard with user data
 */
function populateDashboard(user) {
    try {
        // Update user name
        const userNameEl = document.getElementById('user-name');
        if (userNameEl && user.name) {
            userNameEl.textContent = user.name;
        }

        // Update subscription status
        updateSubscriptionStatus(user);
        
        // Update bot instance status
        updateBotInstanceStatus(user);
        
        // Check if token is submitted
        if (user.botToken) {
            const tokenSubmittedEl = document.getElementById('token-submitted');
            if (tokenSubmittedEl) {
                tokenSubmittedEl.textContent = 'Yes';
            }
            
            // Disable token form if already submitted
            const tokenForm = document.getElementById('token-form');
            const tokenInput = document.getElementById('bot-token');
            const tokenSubmitBtn = document.getElementById('token-submit-btn');
            
            if (tokenForm) {
                tokenForm.style.opacity = '0.6';
                tokenForm.style.pointerEvents = 'none';
            }
            if (tokenInput) {
                tokenInput.value = '••••••••••••••••••••';
                tokenInput.disabled = true;
            }
            if (tokenSubmitBtn) {
                tokenSubmitBtn.textContent = 'Token Already Submitted';
                tokenSubmitBtn.disabled = true;
            }
        }

        // Show invite link if bot is ready
        if (user.botStatus === 'ready' && user.inviteLink) {
            showInviteLink(user.inviteLink);
        }
    } catch (error) {
        console.error('Error populating dashboard:', error);
    }
}

/**
 * Update subscription status display
 */
function updateSubscriptionStatus(user) {
    const planEl = document.getElementById('subscription-plan');
    const statusEl = document.getElementById('subscription-status');
    const badgeEl = document.getElementById('subscription-badge');
    const billingCycleEl = document.getElementById('billing-cycle');
    const nextBillingEl = document.getElementById('next-billing');
    const subscriptionDateEl = document.getElementById('subscription-date');

    if (planEl && user.plan) {
        const planNames = {
            'basic': 'Basic',
            'professional': 'Professional',
            'enterprise': 'Enterprise'
        };
        planEl.textContent = planNames[user.plan] || user.plan;
    }

    if (statusEl) {
        statusEl.textContent = user.subscriptionStatus || 'Active';
    }

    if (badgeEl) {
        badgeEl.textContent = user.subscriptionStatus || 'Active';
        badgeEl.className = 'status-badge';
        if (user.subscriptionStatus === 'Active') {
            badgeEl.classList.add('status-active');
        } else if (user.subscriptionStatus === 'Cancelled') {
            badgeEl.classList.add('status-cancelled');
        }
    }

    if (billingCycleEl) {
        billingCycleEl.textContent = 'Monthly';
    }

    if (nextBillingEl && user.nextBillingDate) {
        nextBillingEl.textContent = formatDate(user.nextBillingDate);
    } else if (nextBillingEl && user.subscriptionDate) {
        // Calculate next billing date (30 days from subscription)
        const nextBilling = new Date(user.subscriptionDate);
        nextBilling.setDate(nextBilling.getDate() + 30);
        nextBillingEl.textContent = formatDate(nextBilling);
    }

    if (subscriptionDateEl && user.subscriptionDate) {
        subscriptionDateEl.textContent = formatDate(user.subscriptionDate);
    }
}

/**
 * Update bot instance status display
 */
function updateBotInstanceStatus(user) {
    const botStatusEl = document.getElementById('bot-status');
    const botStatusBadgeEl = document.getElementById('bot-status-badge');
    const progressEl = document.getElementById('setup-progress');
    const progressTextEl = document.getElementById('progress-text');
    const lastUpdatedEl = document.getElementById('last-updated');

    const status = user.botStatus || 'not_configured';
    const statusText = {
        'not_configured': 'Not Configured',
        'pending': 'Pending Setup',
        'configuring': 'Configuring',
        'ready': 'Ready',
        'error': 'Error'
    };

    if (botStatusEl) {
        botStatusEl.textContent = statusText[status] || status;
    }

    if (botStatusBadgeEl) {
        botStatusBadgeEl.textContent = statusText[status] || status;
        botStatusBadgeEl.className = 'status-badge';
        
        if (status === 'ready') {
            botStatusBadgeEl.classList.add('status-active');
        } else if (status === 'error') {
            botStatusBadgeEl.classList.add('status-error');
        } else {
            botStatusBadgeEl.classList.add('status-pending');
        }
    }

    // Update progress
    const progressMap = {
        'not_configured': 0,
        'pending': 25,
        'configuring': 50,
        'ready': 100,
        'error': 0
    };

    const progress = progressMap[status] || 0;
    if (progressEl) {
        progressEl.style.width = `${progress}%`;
    }
    if (progressTextEl) {
        progressTextEl.textContent = `${progress}%`;
    }

    if (lastUpdatedEl && user.lastUpdated) {
        lastUpdatedEl.textContent = formatDate(user.lastUpdated);
    } else if (lastUpdatedEl) {
        lastUpdatedEl.textContent = 'Never';
    }
}

/**
 * Show invite link card
 */
function showInviteLink(link) {
    const inviteCard = document.getElementById('invite-card');
    const inviteLinkInput = document.getElementById('invite-link');
    
    if (inviteCard) {
        inviteCard.style.display = 'block';
    }
    if (inviteLinkInput) {
        inviteLinkInput.value = link;
    }
}

/**
 * Handle login form submission
 */
function handleLogin(event) {
    event.preventDefault();
    
    const errorEl = document.getElementById('login-error');
    if (errorEl) {
        errorEl.textContent = '';
        errorEl.style.display = 'none';
    }

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    try {
        // Check if user exists in localStorage
        const users = JSON.parse(localStorage.getItem('eventSentinelUsers') || '[]');
        const user = users.find(u => u.email === email);

        if (!user) {
            showError('login-error', 'No account found with this email address.');
            return;
        }

        // In a real application, password would be hashed and verified server-side
        // For demo purposes, we'll do a simple check
        if (user.password !== password) {
            showError('login-error', 'Invalid email or password.');
            return;
        }

        // Store current user session
        const userSession = { ...user };
        delete userSession.password; // Don't store password in session
        localStorage.setItem('eventSentinelUser', JSON.stringify(userSession));

        // Show dashboard
        showDashboard(userSession);
        showToast('Successfully logged in!', 'success');

    } catch (error) {
        console.error('Login error:', error);
        showError('login-error', 'An error occurred. Please try again.');
    }
}

/**
 * Handle register form submission
 */
function handleRegister(event) {
    event.preventDefault();
    
    const errorEl = document.getElementById('register-error');
    if (errorEl) {
        errorEl.textContent = '';
        errorEl.style.display = 'none';
    }

    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const plan = document.getElementById('register-plan').value;

    if (password.length < 8) {
        showError('register-error', 'Password must be at least 8 characters long.');
        return;
    }

    if (!plan) {
        showError('register-error', 'Please select a subscription plan.');
        return;
    }

    try {
        // Check if user already exists
        const users = JSON.parse(localStorage.getItem('eventSentinelUsers') || '[]');
        if (users.find(u => u.email === email)) {
            showError('register-error', 'An account with this email already exists.');
            return;
        }

        // Create new user
        const newUser = {
            id: Date.now().toString(),
            name: name,
            email: email,
            password: password, // In production, this would be hashed
            plan: plan,
            subscriptionStatus: 'Active',
            subscriptionDate: new Date().toISOString(),
            botStatus: 'not_configured',
            botToken: null,
            inviteLink: null,
            lastUpdated: null
        };

        // Save user
        users.push(newUser);
        localStorage.setItem('eventSentinelUsers', JSON.stringify(users));

        // Store current user session (without password)
        const userSession = { ...newUser };
        delete userSession.password;
        localStorage.setItem('eventSentinelUser', JSON.stringify(userSession));

        // Show dashboard
        showDashboard(userSession);
        showToast('Account created successfully!', 'success');

    } catch (error) {
        console.error('Registration error:', error);
        showError('register-error', 'An error occurred. Please try again.');
    }
}

/**
 * Handle token submission
 */
function handleTokenSubmit(event) {
    event.preventDefault();
    
    const tokenInput = document.getElementById('bot-token');
    const tokenStatusEl = document.getElementById('token-status');
    const tokenSubmitBtn = document.getElementById('token-submit-btn');
    
    if (!tokenInput || !tokenInput.value) {
        return;
    }

    const token = tokenInput.value.trim();

    // Basic token validation (Discord bot tokens are typically 59-70 characters)
    if (token.length < 50 || token.length > 100) {
        showTokenStatus('Invalid token format. Please check your Discord bot token.', 'error');
        return;
    }

    try {
        // Get current user
        const user = JSON.parse(localStorage.getItem('eventSentinelUser'));
        if (!user) {
            showTokenStatus('You must be logged in to submit a token.', 'error');
            return;
        }

        // Update user with token
        user.botToken = token;
        user.botStatus = 'pending';
        user.lastUpdated = new Date().toISOString();

        // Update in localStorage
        localStorage.setItem('eventSentinelUser', JSON.stringify(user));

        // Update in users array
        const users = JSON.parse(localStorage.getItem('eventSentinelUsers') || '[]');
        const userIndex = users.findIndex(u => u.email === user.email);
        if (userIndex !== -1) {
            users[userIndex].botToken = token;
            users[userIndex].botStatus = 'pending';
            users[userIndex].lastUpdated = new Date().toISOString();
            localStorage.setItem('eventSentinelUsers', JSON.stringify(users));
        }

        // Disable form
        tokenInput.disabled = true;
        tokenInput.value = '••••••••••••••••••••';
        if (tokenSubmitBtn) {
            tokenSubmitBtn.disabled = true;
            tokenSubmitBtn.textContent = 'Token Submitted';
        }

        // Update dashboard
        updateBotInstanceStatus(user);
        
        showTokenStatus('Token submitted successfully! Your bot instance is being set up. This typically takes 24-48 hours.', 'success');
        showToast('Bot token submitted successfully!', 'success');

        // Simulate bot setup process (in production, this would be handled by backend)
        // After 2 seconds, simulate configuration
        setTimeout(() => {
            user.botStatus = 'configuring';
            user.lastUpdated = new Date().toISOString();
            localStorage.setItem('eventSentinelUser', JSON.stringify(user));
            updateBotInstanceStatus(user);
        }, 2000);

        // After 5 seconds, simulate ready state (in production, this would come from backend)
        setTimeout(() => {
            user.botStatus = 'ready';
            user.inviteLink = generateInviteLink(); // In production, this would come from backend
            user.lastUpdated = new Date().toISOString();
            localStorage.setItem('eventSentinelUser', JSON.stringify(user));
            
            // Update users array
            if (userIndex !== -1) {
                users[userIndex].botStatus = 'ready';
                users[userIndex].inviteLink = user.inviteLink;
                users[userIndex].lastUpdated = user.lastUpdated;
                localStorage.setItem('eventSentinelUsers', JSON.stringify(users));
            }
            
            updateBotInstanceStatus(user);
            showInviteLink(user.inviteLink);
            showTokenStatus('Your bot is ready! Check the invite link below.', 'success');
            showToast('Your bot instance is ready!', 'success');
        }, 5000);

    } catch (error) {
        console.error('Token submission error:', error);
        showTokenStatus('An error occurred. Please try again.', 'error');
    }
}

/**
 * Generate a demo invite link (in production, this would come from backend)
 */
function generateInviteLink() {
    // This is a demo link - in production, this would be generated by the backend
    const clientId = '123456789012345678'; // Would be actual bot client ID
    const permissions = '268446720'; // View Channels, Send Messages, Embed Links, Attach Files, Read Message History, View Audit Log
    return `https://discord.com/api/oauth2/authorize?client_id=${clientId}&permissions=${permissions}&scope=bot`;
}

/**
 * Copy invite link to clipboard
 */
function copyInviteLink() {
    const inviteLinkInput = document.getElementById('invite-link');
    if (!inviteLinkInput || !inviteLinkInput.value) {
        showToast('No invite link available.', 'error');
        return;
    }

    try {
        inviteLinkInput.select();
        inviteLinkInput.setSelectionRange(0, 99999); // For mobile devices

        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(inviteLinkInput.value).then(() => {
                showToast('Invite link copied to clipboard!', 'success');
            });
        } else {
            // Fallback for older browsers
            document.execCommand('copy');
            showToast('Invite link copied to clipboard!', 'success');
        }
    } catch (error) {
        console.error('Copy error:', error);
        showToast('Failed to copy invite link.', 'error');
    }
}

/**
 * Handle logout
 */
function handleLogout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('eventSentinelUser');
        showAuth();
        showToast('Logged out successfully.', 'success');
        
        // Clear forms
        const loginForm = document.getElementById('loginForm');
        const registerForm = document.getElementById('registerForm');
        if (loginForm) loginForm.reset();
        if (registerForm) registerForm.reset();
    }
}

/**
 * Show error message
 */
function showError(elementId, message) {
    const errorEl = document.getElementById(elementId);
    if (errorEl) {
        errorEl.textContent = message;
        errorEl.style.display = 'block';
    }
}

/**
 * Show token status message
 */
function showTokenStatus(message, type) {
    const tokenStatusEl = document.getElementById('token-status');
    if (tokenStatusEl) {
        tokenStatusEl.textContent = message;
        tokenStatusEl.className = `token-status token-status-${type}`;
        tokenStatusEl.style.display = 'block';
    }
}

/**
 * Format date for display
 */
function formatDate(dateString) {
    try {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    } catch (error) {
        return dateString;
    }
}


