// Main JavaScript for WhatsApp Expense Tracker
// Handles language switching and common functionality

// Translations
const translations = {
  he: {
    // Navigation
    'nav.home': 'דף הבית',
    'nav.back': '← חזור לדף הבית',
    'nav.features': 'תכונות',
    'nav.pricing': 'מחירים',
    'nav.faq': 'שאלות נפוצות',
    'nav.excel': 'ייבוא אקסל',
    'nav.login': 'התחברות',
    'nav.register': 'הרשמה',

    // Hero
    'hero.title': 'עקוב אחרי ההוצאות שלך בוואטסאפ',
    'hero.subtitle': 'מערכת פשוטה וחכמה למעקב הוצאות משותפות בעברית',
    'hero.cta.primary': 'התחל בחינם',
    'hero.cta.secondary': 'למד עוד',

    // Benefits
    'benefits.title': 'למה לבחור בנו?',
    'benefits.shared.title': 'תקציבים משותפים',
    'benefits.shared.desc': 'נהל תקציבים משותפים עם המשפחה או השותפים בקלות',
    'benefits.hebrew.title': 'ממשק בעברית',
    'benefits.hebrew.desc': 'ממשק ידידותי ומלא בעברית, ללא צורך באנגלית',
    'benefits.realtime.title': 'מעקב בזמן אמת',
    'benefits.realtime.desc': 'עדכון מיידי של כל ההוצאות דרך וואטסאפ',
    'benefits.easy.title': 'קל לשימוש',
    'benefits.easy.desc': 'פשוט שלח הודעה בוואטסאפ - אנחנו נעשה את השאר',

    // How it works
    'howitworks.title': 'איך זה עובד?',
    'howitworks.step1.title': 'הרשמה והתחלה',
    'howitworks.step1.desc': 'הירשם בקלות עם מספר הוואטסאפ שלך והתחל ניסיון חינם',
    'howitworks.step2.title': 'הגדר תקציב',
    'howitworks.step2.desc': 'צור קטגוריות והגדר תקציבים חודשיים לכל קטגוריה',
    'howitworks.step3.title': 'שלח הודעות',
    'howitworks.step3.desc': 'שלח הוצאות דרך וואטסאפ בפורמט פשוט: "קניות 250 סופר"',
    'howitworks.step4.title': 'קבל עדכונים',
    'howitworks.step4.desc': 'קבל סיכומים ועדכונים על מצב התקציב בזמן אמת',

    // Pricing
    'pricing.title': 'בחר את התוכנית המתאימה לך',
    'pricing.free.title': 'ניסיון חינם',
    'pricing.free.price': 'חינם',
    'pricing.free.period': '14 יום',
    'pricing.free.feature1': 'עד 3 קטגוריות',
    'pricing.free.feature2': 'מעקב הוצאות בסיסי',
    'pricing.free.feature3': 'ממשק עברית',
    'pricing.free.feature4': 'דוחות חודשיים',
    'pricing.monthly.title': 'מנוי חודשי',
    'pricing.monthly.price': '₪19',
    'pricing.monthly.period': 'לחודש',
    'pricing.monthly.badge': 'הכי פופולרי',
    'pricing.monthly.feature1': 'קטגוריות ללא הגבלה',
    'pricing.monthly.feature2': 'תקציבים משותפים',
    'pricing.monthly.feature3': 'דוחות מתקדמים',
    'pricing.monthly.feature4': 'התראות חכמות',
    'pricing.monthly.feature5': 'תמיכה מלאה',
    'pricing.yearly.title': 'מנוי שנתי',
    'pricing.yearly.price': '₪190',
    'pricing.yearly.period': 'לשנה (2 חודשים חינם)',
    'pricing.yearly.feature1': 'כל התכונות של החודשי',
    'pricing.yearly.feature2': 'חיסכון של 2 חודשים',
    'pricing.yearly.feature3': 'עדיפות בתמיכה',
    'pricing.yearly.feature4': 'גישה מוקדמת לתכונות',
    'pricing.cta': 'התחל עכשיו',

    // CTA Section
    'cta.title': 'מוכנים להתחיל?',
    'cta.subtitle': 'הצטרף לאלפי משתמשים שכבר מנהלים את התקציב בחוכמה',
    'cta.button': 'הרשמה חינם',

    // Footer
    'footer.privacy': 'מדיניות פרטיות',
    'footer.terms': 'תנאי שימוש',
    'footer.home': 'דף הבית',
    'footer.contact': 'צור קשר',
    'footer.copyright': '© 2024 WhatsApp Expense Tracker. כל הזכויות שמורות.',

    // Registration Page
    'register.title': 'הרשמה לשירות',
    'register.subtitle': 'מלא את הפרטים ותוכל להתחיל מיד',
    'register.phone.label': 'מספר וואטסאפ',
    'register.phone.placeholder': '050-1234567',
    'register.email.label': 'כתובת אימייל',
    'register.email.placeholder': 'example@email.com',
    'register.plan.label': 'בחר תוכנית',
    'register.plan.trial': 'ניסיון חינם (14 יום)',
    'register.plan.monthly': 'מנוי חודשי - ₪19/חודש',
    'register.plan.yearly': 'מנוי שנתי - ₪190/שנה',
    'register.terms.text': 'אני מסכים ל',
    'register.terms.link': 'תנאי השימוש',
    'register.terms.and': 'ול',
    'register.privacy.link': 'מדיניות הפרטיות',
    'register.submit': 'השלם הרשמה',
    'register.error.phone': 'אנא הזן מספר טלפון ישראלי תקין',
    'register.error.email': 'אנא הזן כתובת אימייל תקינה',
    'register.error.terms': 'יש לאשר את תנאי השימוש',
    'register.success.title': 'ההרשמה הושלמה בהצלחה!',
    'register.success.message': 'פרטי ההתחברות נשלחו למספר הוואטסאפ שלך',
    'register.success.next': 'שלח "שלום" לבוט בוואטסאפ כדי להתחיל',

    // Privacy Policy
    'privacy.title': 'מדיניות פרטיות',
    'privacy.updated': 'עודכן לאחרונה:',
    'privacy.date': 'נובמבר 2024',

    // Terms of Service
    'terms.title': 'תנאי שימוש',
    'terms.updated': 'עודכן לאחרונה:',
    'terms.date': 'נובמבר 2024',

    // Excel Import
    'excel.title': 'ייבוא מאקסל',
    'excel.subtitle': 'ייבא בקלות קטגוריות והוצאות קבועות ישירות מקובץ אקסל',
    'excel.download.title': 'הורד קובץ דוגמה',
    'excel.download.desc': 'התחל עם קובץ אקסל מוכן לשימוש - פשוט מלא את הפרטים ושלח לבוט',
    'excel.download.button': 'הורד קובץ דוגמה',
    'excel.structure.title': 'מבנה הקובץ',
    'excel.structure.desc': 'קובץ האקסל מחולק לשני חלקים עיקריים: קטגוריות והוצאות קבועות. מלא את הפרטים בהתאם לצרכים שלך.',
    'excel.structure.categories.title': 'קטגוריות',
    'excel.structure.categories.column_a': 'עמודה A:',
    'excel.structure.categories.column_a_desc': 'שם הקטגוריה',
    'excel.structure.categories.column_b': 'עמודה B:',
    'excel.structure.categories.column_b_desc': 'תקציב חודשי',
    'excel.structure.categories.example': 'דוגמה:',
    'excel.structure.expenses.title': 'הוצאות קבועות',
    'excel.structure.expenses.column_d': 'עמודה D:',
    'excel.structure.expenses.column_d_desc': 'שם ההוצאה',
    'excel.structure.expenses.column_e': 'עמודה E:',
    'excel.structure.expenses.column_e_desc': 'סכום ההוצאה',
    'excel.structure.expenses.column_f': 'עמודה F:',
    'excel.structure.expenses.column_f_desc': 'קטגוריה משויכת',
    'excel.structure.expenses.example': 'דוגמה:',
    'excel.howto.title': 'איך משתמשים?',
    'excel.howto.step1.title': 'הורד את הקובץ',
    'excel.howto.step1.desc': 'לחץ על כפתור ההורדה למעלה כדי לקבל את קובץ הדוגמה',
    'excel.howto.step2.title': 'מלא את הפרטים',
    'excel.howto.step2.desc': 'פתח את הקובץ באקסל ומלא את הקטגוריות וההוצאות הקבועות שלך',
    'excel.howto.step3.title': 'שמור את הקובץ',
    'excel.howto.step3.desc': 'שמור את הקובץ במחשב או בטלפון שלך',
    'excel.howto.step4.title': 'שלח לבוט',
    'excel.howto.step4.desc': 'שלח את הקובץ לבוט בוואטסאפ - הוא יייבא הכל אוטומטית',
    'excel.notes.title': 'נקודות חשובות',
    'excel.notes.point1': 'אל תמחק את שורת הכותרות (שורה 1)',
    'excel.notes.point2': 'הקפד למלא את כל העמודות הנדרשות',
    'excel.notes.point3': 'שם הקטגוריה בהוצאות קבועות חייב להתאים לשם קטגוריה קיימת',
    'excel.notes.point4': 'ניתן להוסיף כמה שורות שתרצה',
    'excel.notes.point5': 'הקובץ חייב להישאר בפורמט .xlsx',
    'excel.faq.title': 'שאלות נפוצות',
    'excel.faq.q1.question': 'מה קורה אם שם הקטגוריה כבר קיים?',
    'excel.faq.q1.answer': 'הבוט יעדכן את התקציב של הקטגוריה הקיימת במקום ליצור אחת חדשה.',
    'excel.faq.q2.question': 'האם אני חייב למלא גם קטגוריות וגם הוצאות קבועות?',
    'excel.faq.q2.answer': 'לא! אפשר למלא רק קטגוריות, רק הוצאות קבועות, או את שניהם. הבוט יייבא רק את מה שמלאת.',
    'excel.faq.q3.question': 'מה קורה אם יש טעות בקובץ?',
    'excel.faq.q3.answer': 'הבוט יודיע לך על שגיאות ויסביר מה צריך לתקן. לא תאבד מידע - פשוט תקן ושלח שוב.',
    'excel.faq.q4.question': 'כמה פעמים אפשר להשתמש בייבוא?',
    'excel.faq.q4.answer': 'ללא הגבלה! אפשר לייבא קבצים כמה פעמים שתרצה, בכל תדירות שנוחה לך.',
    'excel.cta.title': 'מוכנים להתחיל?',
    'excel.cta.subtitle': 'הורד את הקובץ והתחל לנהל את ההוצאות שלך בקלות',
    'excel.cta.download': 'הורד קובץ דוגמה',
    'excel.cta.signup': 'הרשם לשירות'
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.back': '← Back to Home',
    'nav.features': 'Features',
    'nav.pricing': 'Pricing',
    'nav.faq': 'FAQ',
    'nav.excel': 'Excel Import',
    'nav.login': 'Login',
    'nav.register': 'Sign Up',

    // Hero
    'hero.title': 'Track Your Expenses via WhatsApp',
    'hero.subtitle': 'Simple and smart shared expense tracking system in Hebrew',
    'hero.cta.primary': 'Start Free Trial',
    'hero.cta.secondary': 'Learn More',

    // Benefits
    'benefits.title': 'Why Choose Us?',
    'benefits.shared.title': 'Shared Budgets',
    'benefits.shared.desc': 'Manage shared budgets with family or roommates easily',
    'benefits.hebrew.title': 'Hebrew Interface',
    'benefits.hebrew.desc': 'Fully native Hebrew interface, no English required',
    'benefits.realtime.title': 'Real-time Tracking',
    'benefits.realtime.desc': 'Instant updates for all expenses via WhatsApp',
    'benefits.easy.title': 'Easy to Use',
    'benefits.easy.desc': 'Just send a WhatsApp message - we\'ll do the rest',

    // How it works
    'howitworks.title': 'How It Works?',
    'howitworks.step1.title': 'Sign Up & Start',
    'howitworks.step1.desc': 'Easy registration with your WhatsApp number and start free trial',
    'howitworks.step2.title': 'Set Budget',
    'howitworks.step2.desc': 'Create categories and set monthly budgets for each',
    'howitworks.step3.title': 'Send Messages',
    'howitworks.step3.desc': 'Send expenses via WhatsApp in simple format: "groceries 250 supermarket"',
    'howitworks.step4.title': 'Get Updates',
    'howitworks.step4.desc': 'Receive summaries and real-time budget status updates',

    // Pricing
    'pricing.title': 'Choose Your Plan',
    'pricing.free.title': 'Free Trial',
    'pricing.free.price': 'Free',
    'pricing.free.period': '14 days',
    'pricing.free.feature1': 'Up to 3 categories',
    'pricing.free.feature2': 'Basic expense tracking',
    'pricing.free.feature3': 'Hebrew interface',
    'pricing.free.feature4': 'Monthly reports',
    'pricing.monthly.title': 'Monthly Plan',
    'pricing.monthly.price': '₪19',
    'pricing.monthly.period': 'per month',
    'pricing.monthly.badge': 'Most Popular',
    'pricing.monthly.feature1': 'Unlimited categories',
    'pricing.monthly.feature2': 'Shared budgets',
    'pricing.monthly.feature3': 'Advanced reports',
    'pricing.monthly.feature4': 'Smart notifications',
    'pricing.monthly.feature5': 'Full support',
    'pricing.yearly.title': 'Yearly Plan',
    'pricing.yearly.price': '₪190',
    'pricing.yearly.period': 'per year (2 months free)',
    'pricing.yearly.feature1': 'All monthly features',
    'pricing.yearly.feature2': 'Save 2 months',
    'pricing.yearly.feature3': 'Priority support',
    'pricing.yearly.feature4': 'Early access to features',
    'pricing.cta': 'Get Started',

    // CTA Section
    'cta.title': 'Ready to Start?',
    'cta.subtitle': 'Join thousands of users already managing their budget smartly',
    'cta.button': 'Free Sign Up',

    // Footer
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    'footer.home': 'Home',
    'footer.contact': 'Contact',
    'footer.copyright': '© 2024 WhatsApp Expense Tracker. All rights reserved.',

    // Registration Page
    'register.title': 'Sign Up',
    'register.subtitle': 'Fill in your details to get started',
    'register.phone.label': 'WhatsApp Number',
    'register.phone.placeholder': '050-1234567',
    'register.email.label': 'Email Address',
    'register.email.placeholder': 'example@email.com',
    'register.plan.label': 'Choose Plan',
    'register.plan.trial': 'Free Trial (14 days)',
    'register.plan.monthly': 'Monthly Plan - ₪19/month',
    'register.plan.yearly': 'Yearly Plan - ₪190/year',
    'register.terms.text': 'I agree to the',
    'register.terms.link': 'Terms of Service',
    'register.terms.and': 'and',
    'register.privacy.link': 'Privacy Policy',
    'register.submit': 'Complete Registration',
    'register.error.phone': 'Please enter a valid Israeli phone number',
    'register.error.email': 'Please enter a valid email address',
    'register.error.terms': 'You must agree to the terms of service',
    'register.success.title': 'Registration Successful!',
    'register.success.message': 'Login details sent to your WhatsApp number',
    'register.success.next': 'Send "Hello" to the bot on WhatsApp to start',

    // Privacy Policy
    'privacy.title': 'Privacy Policy',
    'privacy.updated': 'Last updated:',
    'privacy.date': 'November 2024',

    // Terms of Service
    'terms.title': 'Terms of Service',
    'terms.updated': 'Last updated:',
    'terms.date': 'November 2024',

    // Excel Import
    'excel.title': 'Excel Import',
    'excel.subtitle': 'Easily import categories and fixed expenses directly from an Excel file',
    'excel.download.title': 'Download Sample File',
    'excel.download.desc': 'Start with a ready-to-use Excel file - just fill in the details and send to the bot',
    'excel.download.button': 'Download Sample File',
    'excel.structure.title': 'File Structure',
    'excel.structure.desc': 'The Excel file is divided into two main sections: categories and fixed expenses. Fill in the details according to your needs.',
    'excel.structure.categories.title': 'Categories',
    'excel.structure.categories.column_a': 'Column A:',
    'excel.structure.categories.column_a_desc': 'Category name',
    'excel.structure.categories.column_b': 'Column B:',
    'excel.structure.categories.column_b_desc': 'Monthly budget',
    'excel.structure.categories.example': 'Example:',
    'excel.structure.expenses.title': 'Fixed Expenses',
    'excel.structure.expenses.column_d': 'Column D:',
    'excel.structure.expenses.column_d_desc': 'Expense name',
    'excel.structure.expenses.column_e': 'Column E:',
    'excel.structure.expenses.column_e_desc': 'Expense amount',
    'excel.structure.expenses.column_f': 'Column F:',
    'excel.structure.expenses.column_f_desc': 'Associated category',
    'excel.structure.expenses.example': 'Example:',
    'excel.howto.title': 'How to Use?',
    'excel.howto.step1.title': 'Download the File',
    'excel.howto.step1.desc': 'Click the download button above to get the sample file',
    'excel.howto.step2.title': 'Fill in the Details',
    'excel.howto.step2.desc': 'Open the file in Excel and fill in your categories and fixed expenses',
    'excel.howto.step3.title': 'Save the File',
    'excel.howto.step3.desc': 'Save the file on your computer or phone',
    'excel.howto.step4.title': 'Send to Bot',
    'excel.howto.step4.desc': 'Send the file to the bot on WhatsApp - it will import everything automatically',
    'excel.notes.title': 'Important Notes',
    'excel.notes.point1': 'Do not delete the header row (row 1)',
    'excel.notes.point2': 'Make sure to fill in all required columns',
    'excel.notes.point3': 'Category name in fixed expenses must match an existing category name',
    'excel.notes.point4': 'You can add as many rows as you want',
    'excel.notes.point5': 'The file must remain in .xlsx format',
    'excel.faq.title': 'Frequently Asked Questions',
    'excel.faq.q1.question': 'What happens if the category name already exists?',
    'excel.faq.q1.answer': 'The bot will update the budget of the existing category instead of creating a new one.',
    'excel.faq.q2.question': 'Do I have to fill in both categories and fixed expenses?',
    'excel.faq.q2.answer': 'No! You can fill in only categories, only fixed expenses, or both. The bot will import only what you filled in.',
    'excel.faq.q3.question': 'What happens if there is an error in the file?',
    'excel.faq.q3.answer': 'The bot will notify you of errors and explain what needs to be fixed. You won\'t lose any data - just fix and send again.',
    'excel.faq.q4.question': 'How many times can I use the import?',
    'excel.faq.q4.answer': 'Unlimited! You can import files as many times as you want, at any frequency that suits you.',
    'excel.cta.title': 'Ready to Start?',
    'excel.cta.subtitle': 'Download the file and start managing your expenses easily',
    'excel.cta.download': 'Download Sample File',
    'excel.cta.signup': 'Sign Up for Service'
  }
};

// Current language
let currentLang = 'he'; // Default to Hebrew

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
  // Check for saved language preference
  const savedLang = localStorage.getItem('preferredLang');
  if (savedLang) {
    currentLang = savedLang;
  }

  // Apply language
  applyLanguage(currentLang);

  // Setup language toggle
  const langToggle = document.getElementById('langToggle');
  if (langToggle) {
    langToggle.addEventListener('click', toggleLanguage);
  }

  // Setup mobile menu toggle
  setupMobileMenu();
});

// Mobile Menu Functionality
function setupMobileMenu() {
  const menuToggle = document.getElementById('mobileMenuToggle');
  const navLinks = document.getElementById('navLinks');

  if (!menuToggle || !navLinks) return;

  // Toggle menu on button click
  menuToggle.addEventListener('click', function(e) {
    e.stopPropagation();
    toggleMobileMenu();
  });

  // Close menu when clicking on a nav link
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', function() {
      closeMobileMenu();
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', function(e) {
    if (navLinks.classList.contains('active') &&
        !navLinks.contains(e.target) &&
        !menuToggle.contains(e.target)) {
      closeMobileMenu();
    }
  });
}

function toggleMobileMenu() {
  const menuToggle = document.getElementById('mobileMenuToggle');
  const navLinks = document.getElementById('navLinks');
  const body = document.body;

  menuToggle.classList.toggle('active');
  navLinks.classList.toggle('active');
  body.classList.toggle('menu-open');
}

function closeMobileMenu() {
  const menuToggle = document.getElementById('mobileMenuToggle');
  const navLinks = document.getElementById('navLinks');
  const body = document.body;

  menuToggle.classList.remove('active');
  navLinks.classList.remove('active');
  body.classList.remove('menu-open');
}

// Toggle language
function toggleLanguage() {
  currentLang = currentLang === 'he' ? 'en' : 'he';
  localStorage.setItem('preferredLang', currentLang);
  applyLanguage(currentLang);
}

// Apply language to page
function applyLanguage(lang) {
  // Update HTML tag direction and language
  const htmlElement = document.documentElement;
  if (lang === 'he') {
    htmlElement.setAttribute('lang', 'he');
    htmlElement.setAttribute('dir', 'rtl');
    document.body.classList.add('rtl');
  } else {
    htmlElement.setAttribute('lang', 'en');
    htmlElement.setAttribute('dir', 'ltr');
    document.body.classList.remove('rtl');
  }

  // Update language toggle button
  const langToggle = document.getElementById('langToggle');
  if (langToggle) {
    langToggle.textContent = lang === 'he' ? 'English' : 'עברית';
  }

  // Update all translatable elements
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    const translation = translations[lang][key];

    if (translation) {
      // Check if element is an input placeholder
      if (element.tagName === 'INPUT' && element.hasAttribute('placeholder')) {
        element.placeholder = translation;
      } else {
        element.textContent = translation;
      }
    }
  });
}

// Get translation
function t(key) {
  return translations[currentLang][key] || key;
}

// Get current language
function getCurrentLang() {
  return currentLang;
}

// Export functions for use in other scripts
window.t = t;
window.getCurrentLang = getCurrentLang;
window.applyLanguage = applyLanguage;
