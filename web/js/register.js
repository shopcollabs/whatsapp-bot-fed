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

  // WhatsApp logo SVG
  const whatsappLogo = `<svg viewBox="0 0 24 24" width="24" height="24" style="vertical-align: middle; margin-left: 0.5rem; fill: white;">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>`;

  // Create success content
  const successHTML = `
    <div class="text-center" style="padding: 3rem 0;">
      <div style="font-size: 4rem; margin-bottom: 1.5rem;">✅</div>
      <h2 data-i18n="register.success.title" style="margin-bottom: 1rem;">${t('register.success.title')}</h2>
      <p style="font-size: 1.25rem; color: var(--text-light); margin-bottom: 2.5rem;" data-i18n="register.success.subtitle">
        ${t('register.success.subtitle')}
      </p>
      <p style="margin-bottom: 1.5rem; font-size: 1.1rem;" data-i18n="register.success.next">${t('register.success.next')}</p>
      <a href="${whatsappUrl}" target="_blank" class="btn btn-primary" style="margin-bottom: 1rem; display: inline-flex; align-items: center; justify-content: center; background: #25D366; border-color: #25D366; font-size: 1.1rem; padding: 1rem 2rem; box-shadow: 0 4px 12px rgba(37, 211, 102, 0.3);">
        ${whatsappLogo}
        <span data-i18n="register.success.whatsapp.button" style="margin: 0 0.5rem;">${t('register.success.whatsapp.button')}</span>
      </a>
      <br>
      <a href="/index.html" class="btn btn-secondary" style="margin-top: 1rem; background: transparent; color: var(--text-light); border: 1px solid var(--border);">
        ${getCurrentLang() === 'he' ? 'חזור לדף הבית' : 'Back to Home'}
      </a>
    </div>
  `;

  formContainer.innerHTML = successHTML;
}
