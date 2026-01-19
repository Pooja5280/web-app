import React, { useState } from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, User, MessageSquare } from 'lucide-react';

const Footer = React.forwardRef((props, ref) => {
  const [formData, setFormData] = useState({ fullName: '', email: '', phone: '', message: '' });
  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};
    if (!formData.fullName) newErrors.fullName = "Full name is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Invalid email address";
    if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = "Enter exactly 10 digits";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert("Message Sent!");
    }
  };

  return (
    <footer ref={ref} className="bg-[#0f172a] text-white pt-24 pb-12 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* LEFT SIDE: CONTACT INFO */}
          <div className="space-y-10">
            <div>
              <h2 className="text-5xl font-serif font-bold mb-6">
                Let's Work <span className="text-[#f0653d]">Together</span>
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed max-w-md">
                Have a project in mind? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-5">
                <div className="bg-blue-600/20 p-4 rounded-xl text-blue-500">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">Email us at</p>
                  <p className="text-lg font-medium text-white">contact@luxora.com</p>
                </div>
              </div>

              <div className="flex items-center gap-5">
                <div className="bg-blue-600/20 p-4 rounded-xl text-blue-500">
                  <Phone size={24} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">Call us at</p>
                  <p className="text-lg font-medium text-white">+1 (234) 567-890</p>
                </div>
              </div>

              <div className="flex items-center gap-5">
                <div className="bg-blue-600/20 p-4 rounded-xl text-blue-500">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">Visit us at</p>
                  <p className="text-lg font-medium text-white">123 Innovation Street, Tech City</p>
                </div>
              </div>
            </div>

            <div>
              <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-6">Follow us on</p>
              <div className="flex gap-4">
                {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => (
                  <button key={i} className="bg-white/5 hover:bg-blue-600 p-3 rounded-full transition-all border border-white/10">
                    <Icon size={20} />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: CONTACT FORM CARD */}
          <div className="bg-white rounded-[2.5rem] p-10 text-slate-900 shadow-2xl">
            <h3 className="text-2xl font-bold mb-8">Send us a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    type="text" 
                    placeholder="John Doe" 
                    className="w-full pl-12 pr-4 py-4 rounded-xl bg-slate-50 border border-slate-200 outline-none focus:border-blue-500 transition-all"
                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                  />
                </div>
                {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    type="email" 
                    placeholder="john@company.com" 
                    className="w-full pl-12 pr-4 py-4 rounded-xl bg-slate-50 border border-slate-200 outline-none focus:border-blue-500 transition-all"
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    type="text" 
                    placeholder="(555) 123-4567" 
                    className="w-full pl-12 pr-4 py-4 rounded-xl bg-slate-50 border border-slate-200 outline-none focus:border-blue-500 transition-all"
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
                <p className="text-[10px] text-slate-400 font-medium">Enter exactly 10 digits</p>
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Message</label>
                <div className="relative">
                  <MessageSquare className="absolute left-4 top-4 text-slate-400" size={18} />
                  <textarea 
                    rows="4"
                    placeholder="Tell us about your project..." 
                    className="w-full pl-12 pr-4 py-4 rounded-xl bg-slate-50 border border-slate-200 outline-none focus:border-blue-500 transition-all resize-none"
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  ></textarea>
                </div>
              </div>

              <button className="w-full bg-[#f0653d] text-white py-5 rounded-xl font-bold text-lg hover:bg-[#d94e2a] transition-all shadow-lg hover:shadow-orange-500/20">
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* COPYRIGHT LINE */}
        <div className="mt-20 pt-8 border-t border-white/5 text-center">
          <p className="text-sm text-gray-500 font-medium tracking-wide">
            © 2026 Luxora Digital Agency. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
});

export default Footer;