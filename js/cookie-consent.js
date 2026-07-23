(function () {
  var CONSENT_KEY = 'mmtm_cookie_consent';

  function getConsent() {
    try {
      return localStorage.getItem(CONSENT_KEY);
    } catch (e) {
      return null;
    }
  }

  function setConsent(value) {
    try {
      localStorage.setItem(CONSENT_KEY, value);
    } catch (e) {
      /* localStorage unavailable, ignore */
    }
  }

  function hideBanner() {
    var el = document.getElementById('cookie-consent-banner');
    if (el && el.parentNode) {
      el.parentNode.removeChild(el);
    }
  }

  function showBanner() {
    if (document.getElementById('cookie-consent-banner')) return;

    var banner = document.createElement('div');
    banner.id = 'cookie-consent-banner';
    banner.setAttribute('role', 'region');
    banner.setAttribute('aria-label', 'Cookie consent');

    var inner = document.createElement('div');
    inner.className = 'cookie-consent-inner';

    var text = document.createElement('p');
    text.className = 'cookie-consent-text';
    text.textContent = 'We use cookies to help this site work properly and to understand site usage. You can accept or reject non-essential cookies. See our ';
    var link = document.createElement('a');
    link.href = 'privacy-policy.html';
    link.textContent = 'Privacy Policy';
    text.appendChild(link);
    var period = document.createTextNode(' for more information.');
    text.appendChild(period);

    var actions = document.createElement('div');
    actions.className = 'cookie-consent-actions';

    var rejectBtn = document.createElement('button');
    rejectBtn.type = 'button';
    rejectBtn.id = 'cookie-consent-reject';
    rejectBtn.className = 'cookie-consent-btn cookie-consent-btn-outline';
    rejectBtn.textContent = 'Reject Non-Essential';

    var acceptBtn = document.createElement('button');
    acceptBtn.type = 'button';
    acceptBtn.id = 'cookie-consent-accept';
    acceptBtn.className = 'cookie-consent-btn cookie-consent-btn-solid';
    acceptBtn.textContent = 'Accept';

    actions.appendChild(rejectBtn);
    actions.appendChild(acceptBtn);

    inner.appendChild(text);
    inner.appendChild(actions);
    banner.appendChild(inner);
    document.body.appendChild(banner);

    acceptBtn.addEventListener('click', function () {
      setConsent('accepted');
      hideBanner();
    });

    rejectBtn.addEventListener('click', function () {
      setConsent('rejected');
      hideBanner();
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    if (!getConsent()) {
      showBanner();
    }
  });
})();
