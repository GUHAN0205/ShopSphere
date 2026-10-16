import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Smartphone, ShieldCheck, Lock, CheckCircle2, AlertCircle, Truck, DollarSign } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { formatPrice, generateOrderId } from '../../utils/formatters';
import { Button } from '../common/Button';

export function CheckoutForm() {
  const { cart, subtotal, discountAmount, shippingCharge, taxAmount, total, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(() => {
    const names = user?.name ? user.name.split(' ') : ['', ''];
    const savedAddr = user?.savedAddresses?.[0];

    return {
      firstName: names[0] || '',
      lastName: names.slice(1).join(' ') || '',
      email: user?.email || '',
      phone: '',
      address: savedAddr?.address || '',
      apartment: '',
      city: savedAddr?.city || '',
      state: savedAddr?.state || '',
      postalCode: savedAddr?.postalCode || '',
      country: 'United States',
      paymentMethod: 'card',
      shippingMethod: 'standard',
      // Card simulation fields
      cardName: user?.name || '',
      cardNumber: '',
      cardExpiry: '',
      cardCvc: ''
    };
  });

  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.firstName.trim()) errs.firstName = 'First name is required';
    if (!formData.lastName.trim()) errs.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please provide a valid email format';
    }
    if (!formData.phone.trim()) errs.phone = 'Contact telephone is required';
    if (!formData.address.trim()) errs.address = 'Street address is required';
    if (!formData.city.trim()) errs.city = 'City is required';
    if (!formData.state.trim()) errs.state = 'State / Region is required';
    if (!formData.postalCode.trim()) errs.postalCode = 'Postal / ZIP code is required';

    if (formData.paymentMethod === 'card') {
      if (!formData.cardName.trim()) errs.cardName = 'Name on card is required';
      if (!formData.cardNumber.trim()) {
        errs.cardNumber = 'Card number is required';
      } else if (formData.cardNumber.replace(/\s/g, '').length < 15) {
        errs.cardNumber = 'Valid 15-16 digit card number is required';
      }
      if (!formData.cardExpiry.trim()) errs.cardExpiry = 'Expiry (MM/YY) is required';
      if (!formData.cardCvc.trim()) errs.cardCvc = '3 or 4 digit CVC is required';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      window.scrollTo({ top: 150, behavior: 'smooth' });
      return;
    }

    setIsProcessing(true);

    // Simulate order placement
    setTimeout(() => {
      const orderId = generateOrderId();
      const orderDetails = {
        orderId,
        date: new Date().toISOString(),
        customer: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          apartment: formData.apartment,
          city: formData.city,
          state: formData.state,
          postalCode: formData.postalCode,
          country: formData.country
        },
        paymentMethod: formData.paymentMethod,
        shippingMethod: formData.shippingMethod,
        items: [...cart],
        pricing: {
          subtotal,
          discountAmount,
          shippingCharge,
          taxAmount,
          total
        }
      };

      try {
        localStorage.setItem('shopsphere_last_order', JSON.stringify(orderDetails));
      } catch {
        // quota
      }

      clearCart();
      setIsProcessing(false);
      navigate('/order-success', { state: { order: orderDetails } });
    }, 1200);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Customer Contact Details */}
      <div className="rounded-3xl bg-white dark:bg-[#12141c] border border-[#e7e2d9] dark:border-white/10 p-6 sm:p-8 space-y-5 shadow-xs">
        <h3 className="text-xl font-bold font-editorial text-stone-900 dark:text-white flex items-center gap-2">
          <span className="w-7 h-7 rounded-full bg-stone-100 dark:bg-white/10 text-stone-900 dark:text-white text-xs font-mono font-bold flex items-center justify-center border border-[#e7e2d9] dark:border-white/15">
            1
          </span>
          <span>Contact & Client Details</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-stone-600 dark:text-stone-400 mb-1.5">
              First Name *
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Elena"
              className={`w-full px-3.5 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-900 border text-sm text-stone-900 dark:text-white focus:outline-none transition-colors ${
                errors.firstName ? 'border-rose-500' : 'border-[#e7e2d9] dark:border-white/10 focus:border-stone-500'
              }`}
            />
            {errors.firstName && (
              <span className="text-xs text-rose-500 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.firstName}
              </span>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-600 dark:text-stone-400 mb-1.5">
              Last Name *
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Rostova"
              className={`w-full px-3.5 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-900 border text-sm text-stone-900 dark:text-white focus:outline-none transition-colors ${
                errors.lastName ? 'border-rose-500' : 'border-[#e7e2d9] dark:border-white/10 focus:border-stone-500'
              }`}
            />
            {errors.lastName && (
              <span className="text-xs text-rose-500 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.lastName}
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-stone-600 dark:text-stone-400 mb-1.5">
              Email Address *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="elena.rostova@atelier.design"
              className={`w-full px-3.5 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-900 border text-sm text-stone-900 dark:text-white focus:outline-none transition-colors ${
                errors.email ? 'border-rose-500' : 'border-[#e7e2d9] dark:border-white/10 focus:border-stone-500'
              }`}
            />
            {errors.email && (
              <span className="text-xs text-rose-500 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.email}
              </span>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-600 dark:text-stone-400 mb-1.5">
              Phone Number *
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+1 (555) 019-2834"
              className={`w-full px-3.5 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-900 border text-sm text-stone-900 dark:text-white focus:outline-none transition-colors ${
                errors.phone ? 'border-rose-500' : 'border-[#e7e2d9] dark:border-white/10 focus:border-stone-500'
              }`}
            />
            {errors.phone && (
              <span className="text-xs text-rose-500 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.phone}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Delivery Address */}
      <div className="rounded-3xl bg-white dark:bg-[#12141c] border border-[#e7e2d9] dark:border-white/10 p-6 sm:p-8 space-y-5 shadow-xs">
        <h3 className="text-xl font-bold font-editorial text-stone-900 dark:text-white flex items-center gap-2">
          <span className="w-7 h-7 rounded-full bg-stone-100 dark:bg-white/10 text-stone-900 dark:text-white text-xs font-mono font-bold flex items-center justify-center border border-[#e7e2d9] dark:border-white/15">
            2
          </span>
          <span>Delivery Destination</span>
        </h3>

        <div>
          <label className="block text-xs font-semibold text-stone-600 dark:text-stone-400 mb-1.5">
            Street Address *
          </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="128 Sullivan Street, Suite 4B"
            className={`w-full px-3.5 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-900 border text-sm text-stone-900 dark:text-white focus:outline-none transition-colors ${
              errors.address ? 'border-rose-500' : 'border-[#e7e2d9] dark:border-white/10 focus:border-stone-500'
            }`}
          />
          {errors.address && (
            <span className="text-xs text-rose-500 mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {errors.address}
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-stone-600 dark:text-stone-400 mb-1.5">
              City *
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="New York"
              className={`w-full px-3.5 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-900 border text-sm text-stone-900 dark:text-white focus:outline-none transition-colors ${
                errors.city ? 'border-rose-500' : 'border-[#e7e2d9] dark:border-white/10 focus:border-stone-500'
              }`}
            />
            {errors.city && (
              <span className="text-xs text-rose-500 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.city}
              </span>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-600 dark:text-stone-400 mb-1.5">
              State / Region *
            </label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              placeholder="NY"
              className={`w-full px-3.5 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-900 border text-sm text-stone-900 dark:text-white focus:outline-none transition-colors ${
                errors.state ? 'border-rose-500' : 'border-[#e7e2d9] dark:border-white/10 focus:border-stone-500'
              }`}
            />
            {errors.state && (
              <span className="text-xs text-rose-500 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.state}
              </span>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-600 dark:text-stone-400 mb-1.5">
              Postal / ZIP Code *
            </label>
            <input
              type="text"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              placeholder="10012"
              className={`w-full px-3.5 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-900 border text-sm text-stone-900 dark:text-white focus:outline-none transition-colors ${
                errors.postalCode ? 'border-rose-500' : 'border-[#e7e2d9] dark:border-white/10 focus:border-stone-500'
              }`}
            />
            {errors.postalCode && (
              <span className="text-xs text-rose-500 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.postalCode}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Payment Selection (Simulated) */}
      <div className="rounded-3xl bg-white dark:bg-[#12141c] border border-[#e7e2d9] dark:border-white/10 p-6 sm:p-8 space-y-5 shadow-xs">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold font-editorial text-stone-900 dark:text-white flex items-center gap-2">
            <span className="w-7 h-7 rounded-full bg-stone-100 dark:bg-white/10 text-stone-900 dark:text-white text-xs font-mono font-bold flex items-center justify-center border border-[#e7e2d9] dark:border-white/15">
              3
            </span>
            <span>Simulated Payment Instrument</span>
          </h3>
          <span className="text-xs text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 px-2.5 py-1 rounded-full border border-blue-200 dark:border-blue-500/20 font-semibold">
            Demo Sandbox
          </span>
        </div>

        {/* Method Switcher */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { id: 'card', label: 'Credit Card', icon: CreditCard },
            { id: 'apple', label: 'Digital Pay', icon: Smartphone },
            { id: 'cod', label: 'Bank Wire', icon: DollarSign }
          ].map(m => {
            const Icon = m.icon;
            return (
              <button
                type="button"
                key={m.id}
                onClick={() => setFormData(prev => ({ ...prev, paymentMethod: m.id }))}
                className={`p-3.5 rounded-2xl border text-center flex flex-col items-center gap-2 transition-all cursor-pointer ${
                  formData.paymentMethod === m.id
                    ? 'bg-[#121316] text-white dark:bg-white dark:text-[#121316] border-[#121316] dark:border-white shadow-xs'
                    : 'bg-stone-50 dark:bg-white/5 border-[#e7e2d9] dark:border-white/10 text-stone-600 dark:text-stone-400 hover:text-stone-900'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs font-semibold">{m.label}</span>
              </button>
            );
          })}
        </div>

        {formData.paymentMethod === 'card' && (
          <div className="p-5 rounded-2xl bg-stone-50 dark:bg-stone-900/60 border border-[#e7e2d9] dark:border-white/10 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-stone-600 dark:text-stone-400 mb-1.5">
                Cardholder Name *
              </label>
              <input
                type="text"
                name="cardName"
                value={formData.cardName}
                onChange={handleChange}
                placeholder="Elena Rostova"
                className={`w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#12141c] border text-sm text-stone-900 dark:text-white focus:outline-none ${
                  errors.cardName ? 'border-rose-500' : 'border-[#e7e2d9] dark:border-white/10 focus:border-stone-500'
                }`}
              />
              {errors.cardName && (
                <span className="text-xs text-rose-500 mt-1">{errors.cardName}</span>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-600 dark:text-stone-400 mb-1.5">
                Card Number (Simulated) *
              </label>
              <input
                type="text"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleChange}
                placeholder="4000 1234 5678 9010"
                maxLength="19"
                className={`w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#12141c] border text-sm text-stone-900 dark:text-white font-mono focus:outline-none ${
                  errors.cardNumber ? 'border-rose-500' : 'border-[#e7e2d9] dark:border-white/10 focus:border-stone-500'
                }`}
              />
              {errors.cardNumber && (
                <span className="text-xs text-rose-500 mt-1">{errors.cardNumber}</span>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-600 dark:text-stone-400 mb-1.5">
                  Expiry Date (MM/YY) *
                </label>
                <input
                  type="text"
                  name="cardExpiry"
                  value={formData.cardExpiry}
                  onChange={handleChange}
                  placeholder="08/29"
                  maxLength="5"
                  className={`w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#12141c] border text-sm text-stone-900 dark:text-white font-mono focus:outline-none ${
                    errors.cardExpiry ? 'border-rose-500' : 'border-[#e7e2d9] dark:border-white/10 focus:border-stone-500'
                  }`}
                />
                {errors.cardExpiry && (
                  <span className="text-xs text-rose-500 mt-1">{errors.cardExpiry}</span>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-600 dark:text-stone-400 mb-1.5">
                  Security CVC *
                </label>
                <input
                  type="password"
                  name="cardCvc"
                  value={formData.cardCvc}
                  onChange={handleChange}
                  placeholder="•••"
                  maxLength="4"
                  className={`w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#12141c] border text-sm text-stone-900 dark:text-white font-mono focus:outline-none ${
                    errors.cardCvc ? 'border-rose-500' : 'border-[#e7e2d9] dark:border-white/10 focus:border-stone-500'
                  }`}
                />
                {errors.cardCvc && (
                  <span className="text-xs text-rose-500 mt-1">{errors.cardCvc}</span>
                )}
              </div>
            </div>
          </div>
        )}

        {formData.paymentMethod === 'apple' && (
          <div className="p-6 rounded-2xl bg-stone-50 dark:bg-white/5 border border-[#e7e2d9] dark:border-white/10 text-center space-y-2">
            <Smartphone className="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto" />
            <h4 className="text-sm font-bold text-stone-900 dark:text-white">Biometric Pass Simulation</h4>
            <p className="text-xs text-stone-500 dark:text-stone-400 max-w-sm mx-auto font-normal">
              Biometric token simulation will be authorized instantly when you place your order.
            </p>
          </div>
        )}

        {formData.paymentMethod === 'cod' && (
          <div className="p-6 rounded-2xl bg-stone-50 dark:bg-white/5 border border-[#e7e2d9] dark:border-white/10 text-center space-y-2">
            <DollarSign className="w-8 h-8 text-stone-700 dark:text-stone-300 mx-auto" />
            <h4 className="text-sm font-bold text-stone-900 dark:text-white">Direct Wire / Pro-Forma Invoice</h4>
            <p className="text-xs text-stone-500 dark:text-stone-400 max-w-sm mx-auto font-normal">
              A simulated transaction invoice will be generated upon confirmation with zero financial risk.
            </p>
          </div>
        )}
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          isLoading={isProcessing}
          className="w-full text-base font-bold py-4 shadow-lg"
        >
          Confirm & Simulate Order • {formatPrice(total)}
        </Button>

        <p className="text-[11px] text-center text-stone-500 dark:text-stone-400 mt-3 font-normal">
          Portfolio Demonstration Notice: This is an architectural frontend demonstration. No real charges will be made.
        </p>
      </div>
    </form>
  );
}
