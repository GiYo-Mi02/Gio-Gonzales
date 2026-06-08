const STORAGE_KEY = 'introPlayed';

export function useIntroPlayed() {
  const hasPlayed =
    typeof window !== 'undefined'
      ? sessionStorage.getItem(STORAGE_KEY) === 'true'
      : false;

  const markPlayed = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(STORAGE_KEY, 'true');
    }
  };

  return { hasPlayed, markPlayed };
}
