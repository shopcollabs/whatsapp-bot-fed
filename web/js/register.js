// Registration form handling
// Israeli phone number validation and form submission

// Get API base URL from environment or default to local
const API_BASE_URL = window.location.hostname === 'localhost'
  ? 'http://localhost:8080'
  : 'https://whatsapp-bot-1095034461620.us-central1.run.app';

document.addEventListener('DOMContentLoaded', function() {
  // Get form elements
  const form = document.getElementById('registerForm');
  const phoneInput = document.getElementById('phone');
  const emailInput = document.getElementById('email');
  const planSelect = document.getElementById('plan');
  const termsCheckbox = document.getElementById('terms');
  const submitBtn = document.getElementById('submitBtn');

  // Check if plan is pre-selected from URL
  const urlParams = new URLSearchParams(window.location.search);
  const planParam = urlParams.get('plan');
  if (planParam && planSelect) {
    planSelect.value = planParam;
  }

  // Format phone number as user types
  if (phoneInput) {
    phoneInput.addEventListener('input', function(e) {
      let value = e.target.value.replace(/\D/g, ''); // Remove non-digits

      // Format as XXX-XXXXXXX or 0XX-XXXXXXX
      if (value.length > 3) {
        if (value.startsWith('0')) {
          value = value.slice(0, 3) + '-' + value.slice(3, 10);
        } else {
          value = value.slice(0, 3) + '-' + value.slice(3, 10);
        }
      }

      e.target.value = value;

      // Clear error when user starts typing
      clearError('phone');
    });
  }

  // Clear error on email input
  if (emailInput) {
    emailInput.addEventListener('input', function() {
      clearError('email');
    });
  }

  // Clear error on terms checkbox
  if (termsCheckbox) {
    termsCheckbox.addEventListener('change', function() {
      clearError('terms');
    });
  }

  // Handle form submission
  if (form) {
    form.addEventListener('submit', async function(e) {
      e.preventDefault();

      // Validate form
      if (!validateForm()) {
        return;
      }

      // Disable submit button
      submitBtn.disabled = true;
      submitBtn.textContent = getCurrentLang() === 'he' ? 'שולח...' : 'Submitting...';

      // Get form data
      const formData = {
        phone_number: normalizePhoneNumber(phoneInput.value),
        email: emailInput.value.trim(),
        plan: planSelect.value
      };

      try {
        // Submit to API
        const response = await fetch(`${API_BASE_URL}/api/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData)
        });

        const data = await response.json();

        if (response.ok) {
          // Show success message
          showSuccess(data);
        } else {
          // Show error message
          showAlert(data.error || 'Registration failed. Please try again.', 'error');
          submitBtn.disabled = false;
          submitBtn.textContent = t('register.submit');
        }
      } catch (error) {
        console.error('Registration error:', error);
        showAlert(
          getCurrentLang() === 'he'
            ? 'אירעה שגיאה. אנא נסה שנית.'
            : 'An error occurred. Please try again.',
          'error'
        );
        submitBtn.disabled = false;
        submitBtn.textContent = t('register.submit');
      }
    });
  }
});

// Validate form
function validateForm() {
  let isValid = true;

  const phoneInput = document.getElementById('phone');
  const emailInput = document.getElementById('email');
  const termsCheckbox = document.getElementById('terms');

  // Validate phone number
  if (!validateIsraeliPhone(phoneInput.value)) {
    showError('phone', t('register.error.phone'));
    isValid = false;
  }

  // Validate email
  if (!validateEmail(emailInput.value)) {
    showError('email', t('register.error.email'));
    isValid = false;
  }

  // Validate terms
  if (!termsCheckbox.checked) {
    showError('terms', t('register.error.terms'));
    isValid = false;
  }

  return isValid;
}

// Validate Israeli phone number
function validateIsraeliPhone(phone) {
  // Remove all non-digits
  const digits = phone.replace(/\D/g, '');

  // Israeli phone numbers:
  // - Mobile: 05X-XXXXXXX (10 digits starting with 05)
  // - Landline: 0X-XXXXXXX (9 digits starting with 0)
  // - International: +972-5X-XXXXXXX or 972-5X-XXXXXXX

  if (digits.startsWith('972')) {
    // International format
    return digits.length === 12 && digits[3] === '5';
  } else if (digits.startsWith('05')) {
    // Mobile format
    return digits.length === 10;
  } else if (digits.startsWith('0')) {
    // Landline or mobile
    return digits.length === 9 || digits.length === 10;
  }

  return false;
}

// Normalize phone number to international format
function normalizePhoneNumber(phone) {
  let digits = phone.replace(/\D/g, '');

  // Convert to international format +972XXXXXXXXX
  if (digits.startsWith('0')) {
    digits = '972' + digits.slice(1);
  } else if (!digits.startsWith('972')) {
    digits = '972' + digits;
  }

  return '+' + digits;
}

// Validate email
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}

// Show error message
function showError(fieldName, message) {
  const input = document.getElementById(fieldName);
  const errorElement = document.getElementById(`${fieldName}Error`);

  if (input) {
    input.classList.add('error');
  }

  if (errorElement) {
    errorElement.textContent = message;
    errorElement.classList.add('show');
  }
}

// Clear error message
function clearError(fieldName) {
  const input = document.getElementById(fieldName);
  const errorElement = document.getElementById(`${fieldName}Error`);

  if (input) {
    input.classList.remove('error');
  }

  if (errorElement) {
    errorElement.classList.remove('show');
  }
}

// Show alert message
function showAlert(message, type) {
  // Remove existing alerts
  const existingAlert = document.querySelector('.alert');
  if (existingAlert) {
    existingAlert.remove();
  }

  // Create alert element
  const alert = document.createElement('div');
  alert.className = `alert alert-${type}`;
  alert.textContent = message;

  // Insert at top of form
  const form = document.getElementById('registerForm');
  form.insertBefore(alert, form.firstChild);

  // Auto-remove after 5 seconds
  setTimeout(() => {
    alert.remove();
  }, 5000);
}

// Show success message
function showSuccess(data) {
  const formContainer = document.querySelector('.container-narrow');

  // WhatsApp bot number and message
  const botNumber = '972502309248';
  const message = encodeURIComponent('עזרה קבוצות');
  const whatsappUrl = `https://wa.me/${botNumber}?text=${message}`;

  // Create success content
  const successHTML = `
    <div class="text-center" style="padding: 3rem 0;">
      <div style="font-size: 4rem; margin-bottom: 2rem;">✅</div>
      <h2 data-i18n="register.success.title">${t('register.success.title')}</h2>
      <p style="font-size: 1.25rem; margin: 2rem 0;" data-i18n="register.success.message">
        ${t('register.success.message')}
      </p>
      <div class="alert alert-info" style="margin-bottom: 2rem;">
        <p data-i18n="register.success.next">${t('register.success.next')}</p>
      </div>
      <a href="${whatsappUrl}" target="_blank" class="btn btn-primary" style="margin-bottom: 1rem; display: inline-block; background: #25D366; border-color: #25D366;">
        <span style="font-size: 1.2rem; margin-right: 0.5rem;">💬</span>
        <span data-i18n="register.success.whatsapp.button">${t('register.success.whatsapp.button')}</span>
      </a>
      <br>
      <a href="/index.html" class="btn btn-secondary" style="margin-top: 1rem; background: var(--secondary); color: var(--text);">
        ${getCurrentLang() === 'he' ? 'חזור לדף הבית' : 'Back to Home'}
      </a>
    </div>
  `;

  formContainer.innerHTML = successHTML;
}
