import React, { useState } from 'react';

const sessionOptions = [
  {
    id: 'single',
    name: 'Single Session',
    price: 25,
    description: 'One-time session access'
  },
  {
    id: 'monthly',
    name: 'Monthly Pass',
    price: 150,
    description: 'Unlimited sessions for one month'
  },
  {
    id: 'seasonal',
    name: 'Seasonal Pass',
    price: 400,
    description: 'Unlimited sessions for the entire season'
  }
];

export default function AcademyRegistrationModal({ isOpen, onClose }) {
  const [selectedSession, setSelectedSession] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    age: '',
    experienceLevel: 'beginner',
    emergencyContact: '',
    medicalInfo: ''
  });

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Here we'll add Stripe payment integration
    console.log('Form submitted:', { ...formData, selectedSession });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-[#1a1a1a] rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Register for Academy</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Session Selection */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {sessionOptions.map((session) => (
                <div
                  key={session.id}
                  onClick={() => setSelectedSession(session)}
                  className={`p-4 rounded-xl cursor-pointer transition-all ${
                    selectedSession?.id === session.id
                      ? 'bg-orange-500 border-2 border-orange-500'
                      : 'bg-[#2a2a2a] border-2 border-transparent hover:border-orange-500/50'
                  }`}
                >
                  <h3 className="font-bold text-white mb-2">{session.name}</h3>
                  <p className="text-2xl font-bold text-orange-500 mb-2">${session.price}</p>
                  <p className="text-sm text-gray-400">{session.description}</p>
                </div>
              ))}
            </div>

            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg bg-[#2a2a2a] text-white border border-gray-700 focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg bg-[#2a2a2a] text-white border border-gray-700 focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg bg-[#2a2a2a] text-white border border-gray-700 focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg bg-[#2a2a2a] text-white border border-gray-700 focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Age
                </label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg bg-[#2a2a2a] text-white border border-gray-700 focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Experience Level
                </label>
                <select
                  name="experienceLevel"
                  value={formData.experienceLevel}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg bg-[#2a2a2a] text-white border border-gray-700 focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                  required
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Emergency Contact
              </label>
              <input
                type="text"
                name="emergencyContact"
                value={formData.emergencyContact}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg bg-[#2a2a2a] text-white border border-gray-700 focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Medical Information
              </label>
              <textarea
                name="medicalInfo"
                value={formData.medicalInfo}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg bg-[#2a2a2a] text-white border border-gray-700 focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                rows="3"
                placeholder="Please list any medical conditions, allergies, or special requirements"
              />
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition-colors"
                disabled={!selectedSession}
              >
                Proceed to Payment
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 