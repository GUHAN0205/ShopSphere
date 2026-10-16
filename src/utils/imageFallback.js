export const DEFAULT_FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop';

export function handleImageError(e, fallback = DEFAULT_FALLBACK_IMAGE) {
  if (e?.currentTarget && e.currentTarget.src !== fallback) {
    e.currentTarget.onerror = null;
    e.currentTarget.src = fallback;
  }
}
