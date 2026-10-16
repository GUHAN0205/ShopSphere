import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Smartphone, ShieldCheck, Lock, CheckCircle2, AlertCircle, Truck, DollarSign } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { formatPrice, generateOrderId } from '../../utils/formatters';
import { Button } from '../common/Button';

export function CheckoutForm() {
  const { cart, subtotal, discountAmount, shippingCharge, taxAmount, total, clearCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'United States',
    paymentMethod: 'card',
    shippingMethod: 'standard',
    // Card simulation fields
    cardName: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: ''
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
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Customer Contact Details */}
      <div className="rounded-3xl glass-panel bg-slate-900/60 border border-white/10 p-6 sm:p-8 space-y-5 shadow-xl">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <span className="w-7 h-7 rounded-full bg-cyan-500/20 text-cyan-400 text-xs font-mono font-bold flex items-center justify-center border border-cyan-500/30">
            1
          </span>
          <span>Contact & Client Profile</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5">
              First Name *
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Alex"
              className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border text-sm text-white focus:outline-none transition-colors ${
                errors.firstName ? 'border-rose-500 focus:border-rose-400' : 'border-white/10 focus:border-cyan-400'
              }`}
            />
            {errors.firstName && (
              <span className="text-xs text-rose-400 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.firstName}
              </span>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5">
              Last Name *
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Vance"
              className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border text-sm text-white focus:outline-none transition-colors ${
                errors.lastName ? 'border-rose-500 focus:border-rose-400' : 'border-white/10 focus:border-cyan-400'
              }`}
            />
            {errors.lastName && (
              <span className="text-xs text-rose-400 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.lastName}
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5">
              Email Address *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="alex.vance@sphere.network"
              className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border text-sm text-white focus:outline-none transition-colors ${
                errors.email ? 'border-rose-500 focus:border-rose-400' : 'border-white/10 focus:border-cyan-400'
              }`}
            />
            {errors.email && (
              <span className="text-xs text-rose-400 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.email}
              </span>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5">
              Phone Number *
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+1 (555) 019-2834"
              className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border text-sm text-white focus:outline-none transition-colors ${
                errors.phone ? 'border-rose-500 focus:border-rose-400' : 'border-white/10 focus:border-cyan-400'
              }`}
            />
            {errors.phone && (
              <span className="text-xs text-rose-400 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.phone}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Delivery Address */}
      <div className="rounded-3xl glass-panel bg-slate-900/60 border border-white/10 p-6 sm:p-8 space-y-5 shadow-xl">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <span className="w-7 h-7 rounded-full bg-cyan-500/20 text-cyan-400 text-xs font-mono font-bold flex items-center justify-center border border-cyan-500/30">
            2
          </span>
          <span>Delivery Destination</span>
        </h3>

        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-1.5">
            Street Address *
          </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="742 Evergreen Terrace, Suite 400"
            className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border text-sm text-white focus:outline-none transition-colors ${
              errors.address ? 'border-rose-500 focus:border-rose-400' : 'border-white/10 focus:border-cyan-400'
            }`}
          />
          {errors.address && (
            <span className="text-xs text-rose-400 mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {errors.address}
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5">
              City *
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="San Francisco"
              className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border text-sm text-white focus:outline-none transition-colors ${
                errors.city ? 'border-rose-500 focus:border-rose-400' : 'border-white/10 focus:border-cyan-400'
              }`}
            />
            {errors.city && (
              <span className="text-xs text-rose-400 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.city}
              </span>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5">
              State / Province *
            </label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              placeholder="California"
              className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border text-sm text-white focus:outline-none transition-colors ${
                errors.state ? 'border-rose-500 focus:border-rose-400' : 'border-white/10 focus:border-cyan-400'
              }`}
            />
            {errors.state && (
              <span className="text-xs text-rose-400 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.state}
              </span>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5">
              ZIP / Postal Code *
            </label>
            <input
              type="text"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              placeholder="94107"
              className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border text-sm text-white focus:outline-none transition-colors ${
                errors.postalCode ? 'border-rose-500 focus:border-rose-400' : 'border-white/10 focus:border-cyan-400'
              }`}
            />
            {errors.postalCode && (
              <span className="text-xs text-rose-400 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.postalCode}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Payment Selection (Simulated) */}
      <div className="rounded-3xl glass-panel bg-slate-900/60 border border-white/10 p-6 sm:p-8 space-y-5 shadow-xl">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <span className="w-7 h-7 rounded-full bg-cyan-500/20 text-cyan-400 text-xs font-mono font-bold flex items-center justify-center border border-cyan-500/30">
              3
            </span>
            <span>Payment Method (Simulated)</span>
          </h3>
          <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20 font-medium">
            Demo Sandbox Environment
          </span>
        </div>

        {/* Method Switcher */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { id: 'card', label: 'Credit Card', icon: CreditCard },
            { id: 'apple', label: 'Apple / Google Pay', icon: Smartphone },
            { id: 'cod', label: 'Direct / Wire', icon: DollarSign }
          ].map(m => {
            const Icon = m.icon;
            return (
              <button
                type="button"
                key={m.id}
                onClick={() => setFormData(prev => ({ ...prev, paymentMethod: m.id }))}
                className={`p-3.5 rounded-2xl border text-center flex flex-col items-center gap-2 transition-all ${
                  formData.paymentMethod === m.id
                    ? 'bg-cyan-500/15 border-cyan-400 text-cyan-300 shadow-md shadow-cyan-500/20'
                    : 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs font-semibold">{m.label}</span>
              </button>
            );
          })}
        </div>

        {formData.paymentMethod === 'card' && (
          <div className="p-5 rounded-2xl bg-slate-950/80 border border-white/10 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                Cardholder Name *
              </label>
              <input
                type="text"
                name="cardName"
                value={formData.cardName}
                onChange={handleChange}
                placeholder="Alex Vance"
                className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border text-sm text-white focus:outline-none ${
                  errors.cardName ? 'border-rose-500' : 'border-white/10 focus:border-cyan-400'
                }`}
              />
              {errors.cardName && (
                <span className="text-xs text-rose-400 mt-1">{errors.cardName}</span>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                Card Number *
              </label>
              <input
                type="text"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleChange}
                placeholder="4532 •••• •••• 8921"
                maxLength="19"
                className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border text-sm text-white font-mono focus:outline-none ${
                  errors.cardNumber ? 'border-rose-500' : 'border-white/10 focus:border-cyan-400'
                }`}
              />
              {errors.cardNumber && (
                <span className="text-xs text-rose-400 mt-1">{errors.cardNumber}</span>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                  Expiry Date (MM/YY) *
                </label>
                <input
                  type="text"
                  name="cardExpiry"
                  value={formData.cardExpiry}
                  onChange={handleChange}
                  placeholder="08/29"
                  maxLength="5"
                  className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border text-sm text-white font-mono focus:outline-none ${
                    errors.cardExpiry ? 'border-rose-500' : 'border-white/10 focus:border-cyan-400'
                  }`}
                />
                {errors.cardExpiry && (
                  <span className="text-xs text-rose-400 mt-1">{errors.cardExpiry}</span>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                  Security CVC *
                </label>
                <input
                  type="password"
                  name="cardCvc"
                  value={formData.cardCvc}
                  onChange={handleChange}
                  placeholder="•••"
                  maxLength="4"
                  className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border text-sm text-white font-mono focus:outline-none ${
                    errors.cardCvc ? 'border-rose-500' : 'border-white/10 focus:border-cyan-400'
                  }`}
                />
                {errors.cardCvc && (
                  <span className="text-xs text-rose-400 mt-1">{errors.cardCvc}</span>
                )}
              </div>
            </div>
          </div>
        )}

        {formData.paymentMethod === 'apple' && (
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center space-y-2">
            <Smartphone className="w-8 h-8 text-cyan-400 mx-auto" />
            <h4 className="text-sm font-bold text-white">Express Biometric Authentication</h4>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Simulated Touch ID / Face ID payment confirmation will be authorized upon clicking Place Order.
            </p>
          </div>
        )}

        {formData.paymentMethod === 'cod' && (
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center space-y-2">
            <DollarSign className="w-8 h-8 text-violet-400 mx-auto" />
            <h4 className="text-sm font-bold text-white">Direct Commercial Wire / COD</h4>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Invoice and courier routing details will be generated with zero upfront charge simulation.
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
          className="w-full text-base font-bold py-4 glow-cyan"
        >
          Confirm & Place Order • {formatPrice(total)}
        </Button>

        <p className="text-[11px] text-center text-slate-500 mt-3">
          This is a simulated e-commerce portfolio demonstration. No real financial credentials are required or processed.
        </p>
      </div>
    </form>
  );
}
