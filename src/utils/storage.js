const STORAGE_KEY = 'wyze_bundle_config';

/**
 * Save bundle configuration to localStorage.
 * @param {object} config - { selectedProducts, activeStep }
 */
export function saveConfiguration(config) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  } catch (err) {
    console.warn('Failed to save configuration:', err);
  }
}

/**
 * Load bundle configuration from localStorage.
 * @returns {object|null}
 */
export function loadConfiguration() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (err) {
    console.warn('Failed to load configuration:', err);
    return null;
  }
}

/**
 * Clear bundle configuration from localStorage.
 */
export function clearConfiguration() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.warn('Failed to clear configuration:', err);
  }
}
