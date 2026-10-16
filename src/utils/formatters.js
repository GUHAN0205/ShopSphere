export function formatPrice(amount) {
  if (typeof amount !== 'number') {
    amount = parseFloat(amount) || 0;
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function calculateDiscount(price, originalPrice) {
  if (!originalPrice || originalPrice <= price) return 0;
  return Math.round(((originalPrice - price) / originalPrice) * 100);
}

export function generateOrderId() {
  const year = new Date().getFullYear();
  const randomPart = Math.floor(100000 + Math.random() * 900000);
  return `SPHERE-${year}-${randomPart}`;
}

export function estimateDeliveryDate(daysFromNow = 3) {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });
}

export function truncateText(str, maxLength = 80) {
  if (!str || str.length <= maxLength) return str;
  return str.slice(0, maxLength) + '...';
}
