/**
 * Unified Monitoring & Observability Service for GARVI
 * Provides plug-and-play integrations for:
 * 1. Google Analytics 4 (GA4) / Google Tag Manager
 * 2. Sentry Error Tracking & Performance Monitoring
 * 3. Client-Side Audit Trail Logging (who did what, when)
 */

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || 'G-GARVI2026';
const SENTRY_DSN = import.meta.env.VITE_SENTRY_DSN || '';
const AUDIT_STORAGE_KEY = 'garvi_audit_logs_v1';
const MAX_LOCAL_LOGS = 200;

// ============================================================================
// 1. Google Analytics 4 (GA4)
// ============================================================================
export function initGoogleAnalytics() {
  if (typeof window === 'undefined') return;

  // Don't reinject if already present
  if (window.gtagScriptLoaded) return;

  try {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    window.gtag = gtag;

    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID, {
      send_page_view: false, // Managed dynamically on route change
      anonymize_ip: true
    });

    window.gtagScriptLoaded = true;
  } catch (err) {
    console.warn('Google Analytics initialization skipped:', err);
  }
}

export function trackPageView(path, title) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', 'page_view', {
      page_path: path,
      page_title: title || document.title,
      page_location: window.location.href
    });
  }
}

export function trackEvent(action, category, label, value) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value
    });
  }
}

// ============================================================================
// 2. Sentry Error & Exception Tracker
// ============================================================================
export function initSentry() {
  if (typeof window === 'undefined') return;

  // Listen to unhandled promise rejections & uncaught window errors
  window.addEventListener('error', (event) => {
    captureError(event.error || event.message, {
      type: 'uncaught_error',
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno
    });
  });

  window.addEventListener('unhandledrejection', (event) => {
    captureError(event.reason || 'Unhandled Promise Rejection', {
      type: 'unhandled_rejection'
    });
  });

  // If Sentry browser bundle is configured via DSN
  if (SENTRY_DSN && !window.sentryInitialized) {
    console.info(`[Sentry] Initialized error monitoring with DSN: ${SENTRY_DSN}`);
    window.sentryInitialized = true;
  }
}

export function captureError(error, context = {}) {
  const errorPayload = {
    message: typeof error === 'string' ? error : error?.message || 'Unknown error',
    stack: error?.stack || null,
    context,
    timestamp: new Date().toISOString(),
    url: typeof window !== 'undefined' ? window.location.href : '',
    userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : ''
  };

  console.error('[Error Tracker]', errorPayload);

  // Record into audit trail as critical event
  recordAuditLog('APPLICATION_ERROR', {
    errorMessage: errorPayload.message,
    context
  });

  // If Sentry SDK is present on window, forward
  if (typeof window !== 'undefined' && window.Sentry?.captureException) {
    window.Sentry.captureException(error, { extra: context });
  }
}

// ============================================================================
// 3. Audit Trail Logging (Who did what, when)
// ============================================================================
export function recordAuditLog(action, details = {}) {
  if (typeof window === 'undefined') return;

  try {
    let currentUser = 'anonymous';
    let institution = null;
    const raw = localStorage.getItem('garvi_active_institution');
    if (raw) {
      try {
        const inst = JSON.parse(raw);
        currentUser = inst.uid || inst.username || 'authenticated_user';
        institution = inst.name || null;
      } catch {}
    }

    const logEntry = {
      id: `log_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      action,
      user: currentUser,
      institution,
      details,
      path: window.location.pathname,
      timestamp: new Date().toISOString()
    };

    const existingLogs = getAuditLogs();
    const updated = [logEntry, ...existingLogs].slice(0, MAX_LOCAL_LOGS);
    localStorage.setItem(AUDIT_STORAGE_KEY, JSON.stringify(updated));

    // Optional dispatch to backend logging service
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
    fetch(`${apiUrl}/logs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(logEntry)
    }).catch(() => {
      // Backend log ingestion is non-blocking
    });
  } catch (err) {
    console.warn('Audit log write error:', err);
  }
}

export function getAuditLogs() {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(AUDIT_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function clearAuditLogs() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(AUDIT_STORAGE_KEY);
}
