import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Clock, Phone, Home, Mail, CheckCircle } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Phone validation
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    } else if (formData.phone.replace(/\D/g, '').length < 7) {
      newErrors.phone = 'Phone number must have at least 7 digits';
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log('Form submitted:', formData);
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', message: '' });

      // Reset success message after 5 seconds
      setTimeout(() => setSubmitted(false), 5000);
    }
  };

  return (
    <div className="w-full bg-gray-100 py-6 sm:py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6">
                  {/* Success Message */}
        {!submitted && (
          <div className=" mb-2 sm:mb-10 mt-2 sm:-mt-7 p-4 sm:p-6 bg-green-200 border border-green-500 rounded-lg flex items-start gap-3 sm:gap-4">
            <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 flex-shrink-0 mt-0.5" strokeWidth={3} />
            <div>
              <h3 className="font-black font-serif italic text-green-800 text-sm sm:text-base">Message Sent Successfully!</h3>
              <p className="text-green-700 text-xs sm:text-sm mt-1 font-serif">Thank you for reaching out. We'll get back to you soon!</p>
            </div>
          </div>
        )}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 font-serif">

          {/* Left Side - Form */}
          <div className="p-6 sm:p-8 md:p-0">
            {/* Contact Us Heading */}
            <h1 className="text-3xl sm:text-4xl font-black text-gray-700 mb-2">Contact Us</h1>
            <p className="text-gray-600 mb-8 font-black text-sm sm:text-base">We'd love to hear from you. Send us a message!</p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm sm:text-base font-black text-gray-700 mb-2">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className={`w-full px-4 py-3 sm:py-3.5 bg-gray-200 border rounded-lg transition-all text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-offset-0 ${
                    errors.name
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-200 focus:ring-gray-200'
                  }`}
                />
                {errors.name && (
                  <p className="text-red-500 text-xs sm:text-sm mt-1.5">{errors.name}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm sm:text-base font-black text-gray-700 mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  className={`w-full px-4 py-3 sm:py-3.5 bg-gray-200 border rounded-lg transition-all text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-offset-0 ${
                    errors.email
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-200 focus:ring-gray-200'
                  }`}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs sm:text-sm mt-1.5">{errors.email}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm sm:text-base font-black text-gray-700 mb-2">
                  Phone <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="123 456 789"
                  className={`w-full px-4 py-3 sm:py-3.5 bg-gray-200 border rounded-lg transition-all text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-offset-0 ${
                    errors.phone
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-200 focus:ring-gray-200'
                  }`}
                />
                {errors.phone && (
                  <p className="text-red-500 text-xs sm:text-sm mt-1.5">{errors.phone}</p>
                )}
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm sm:text-base font-black text-gray-700 mb-2">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us how we can help..."
                  rows={4}
                  className={`w-full px-4 py-3 sm:py-3.5 bg-gray-200 border rounded-lg transition-all text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-offset-0 resize-none ${
                    errors.message
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-200 focus:ring-gray-200'
                  }`}
                />
                {errors.message && (
                  <p className="text-red-500 text-xs sm:text-sm mt-1.5">{errors.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <div className="flex justify-center sm:block">
                <Button
                  type="submit"
                  variant="thamindu"
                  className="w-60 sm:w-full mt-6 sm:mt-8 py-6 sm:py-7 text-base sm:text-lg bg-red-700 text-white hover:bg-gray-950"
                >
                  Send Message
                </Button>
              </div>
            </form>
          </div>

          {/* Right Side - Contact Info */}
          <div className="p-6 sm:p-8 md:p-0 pt-12 md:pt-12 lg:pt-0 lg:pl-16 border-t md:border-t lg:border-t-0 lg:border-l border-gray-300 pb-7 md:-mb-4 lg:-mb-0">
            {/* Atelier Online Heading */}
            <h2 className="text-3xl sm:text-4xl font-black text-red-700 mb-4">
              Atelier Online
            </h2>

            {/* Description */}
            <p className="text-gray-600 text-sm sm:text-base mb-2">
              For any inquiries, please send us a message and we will reply to you as soon as possible.
            </p>
            <p className="text-gray-600 text-sm sm:text-base mb-8 sm:mb-12">
              We would like to remind you that you should not send or provide your card details via e-mail or social networks.
            </p>

            {/* Contact Details */}
            <div className="space-y-6 sm:space-y-8">
              {/* Hours */}
              <div className="flex items-start gap-4">
                <div className="bg-gray-100 p-3 rounded-lg flex-shrink-0">
                  <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-gray-900" strokeWidth={3} />
                </div>
                <div>
                  <h3 className="font-black text-gray-900 text-sm sm:text-base mb-1 italic">Business Hours</h3>
                  <p className="text-gray-600 text-sm sm:text-base italic">Monday - Saturday</p>
                  <p className="text-gray-900 font-medium text-sm sm:text-base italic">09:00 - 18:00</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="bg-gray-100 p-3 rounded-lg flex-shrink-0">
                  <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-gray-900" strokeWidth={3} />
                </div>
                <div>
                  <h3 className="text-gray-900 text-sm font-black sm:text-base mb-1 italic">Phone</h3>
                  <a href="tel:01174444444" className="text-gray-900 font-medium italic text-sm sm:text-base hover:text-gray-700">
                    +94 117 444 444
                  </a>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="bg-gray-100 p-3 rounded-lg flex-shrink-0">
                  <Home className="w-5 h-5 sm:w-6 sm:h-6 text-gray-900" strokeWidth={3} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm sm:text-base mb-1">Address</h3>
                  <p className="text-gray-600 text-sm sm:text-base italic">No 420, High Level Rd, Kottawa, Maharagama</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="bg-gray-100 p-3 rounded-lg flex-shrink-0">
                  <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-gray-900" strokeWidth={3} />
                </div>
                <div>
                  <h3 className="text-gray-900 text-sm font-black italic sm:text-base mb-1">Email</h3>
                  <a
                    href="mailto:ONLINE@Atelier.LK"
                    className="text-gray-900 font-medium text-sm sm:text-base hover:text-gray-700 break-all"
                  >
                    inquiries@atelier.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
