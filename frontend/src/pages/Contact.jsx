import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Clock, Phone, Home, Mail } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="h-screen flex overflow-hidden">
      {/* Left Side - Form */}
      <div className="w-1/2 bg-white px-16 py-8">
        {/* Logo */}
        

        {/* Contact Us Heading */}
        <h1 className="text-3xl font-bold text-gray-900 mb-6">CONTACT US</h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
          {/* Name */}
          <div>
            <label className="block text-xl font-serif italic text-gray-900 mb-2">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full h-12 px-4 bg-[#E8DCDC] rounded-sm focus:outline-none focus:ring-2 focus:ring-[#8B4555]"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-xl font-serif italic text-gray-900 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full h-12 px-4 bg-[#E8DCDC] rounded-sm focus:outline-none focus:ring-2 focus:ring-[#8B4555]"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-xl font-serif italic text-gray-900 mb-2">
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full h-12 px-4 bg-[#E8DCDC] rounded-sm focus:outline-none focus:ring-2 focus:ring-[#8B4555]"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-xl font-serif italic text-gray-900 mb-2">
              Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-3 bg-[#E8DCDC] rounded-sm focus:outline-none focus:ring-2 focus:ring-[#8B4555] resize-none"
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full h-12 mt-8 bg-[#8B4555] hover:bg-[#6B3545] text-black font-serif italic text-xl rounded-full"
          >
            Submit
          </Button>
        </form>
      </div>

      {/* Right Side - Contact Info */}
      <div className="w-1/2 bg-white px-16 py-24">
        {/* Atelier Online Heading */}
        <h2 className="text-5xl font-serif italic text-[#8B4555] mb-8">
          Atelier Online
        </h2>

        {/* Description */}
        <p className="text-sm text-gray-700 mb-2">
          For any inquiries, please send us a message and we will reply to you as soon as possible.
        </p>
        <p className="text-sm text-gray-700 mb-12">
          We would like to remind you that you should not send or provide your card details via e-mail or social networks
        </p>

        {/* Contact Details */}
        <div className="space-y-8">
          {/* Hours */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-5 h-5 text-gray-700" />
              <span className="text-sm font-medium text-gray-700">MONDAY - SATURDAY</span>
            </div>
            <p className="text-base text-gray-900 ml-7">09:00 - 18:00</p>
          </div>

          {/* Phone */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Phone className="w-5 h-5 text-gray-700" />
              <span className="text-sm font-medium text-gray-700">PHONE</span>
            </div>
            <p className="text-base text-gray-900 ml-7">0117 444 444</p>
          </div>

          {/* Address */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Home className="w-5 h-5 text-gray-700" />
              <span className="text-sm font-medium text-gray-700">ADDRESS</span>
            </div>
            <p className="text-base text-gray-900 ml-7">No 420, High Level Rd, Kottawa , Maharagama.</p>
          </div>

          {/* Email */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Mail className="w-5 h-5 text-gray-700" />
              <span className="text-sm font-medium text-gray-700">EMAIL</span>
            </div>
            <a
              href="mailto:ONLINE@Atelier.LK"
              className="text-base text-[#8B4555] underline ml-7 hover:text-[#6B3545]"
            >
              ONLINE@Atelier.LK
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
