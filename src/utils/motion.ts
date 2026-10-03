export const checkPrefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  try {
    const params = new URLSearchParams(window.location.search);
    return params.get('reduced-motion') === 'true';
  } catch {
    return false;
  }
};

export default checkPrefersReducedMotion;

