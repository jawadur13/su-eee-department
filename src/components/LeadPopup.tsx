'use client';

import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { toast } from 'sonner';

interface LeadPopupSettings {
  id: string;
  isEnabled: boolean;
  delaySeconds: number;
  heading: string;
  subheading: string;
  fullNameLabel: string;
  fullNamePlaceholder: string;
  mobileLabel: string;
  mobilePlaceholder: string;
  programLabel: string;
  programPlaceholder: string;
  ctaButtonText: string;
  successMessage: string;
}

interface Program {
  slug: string;
  name: string;
}

export default function LeadPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [settings, setSettings] = useState<LeadPopupSettings | null>(null);
  const [programs, setPrograms] = useState<Program[]>([]);

  const [formData, setFormData] = useState({
    fullName: '',
    mobileNumber: '',
    interestedProgram: '',
  });

  // Fetch settings and programs on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const settingsResponse = await fetch('/api/lead-popup/settings');
        const settingsData = await settingsResponse.json();
        setSettings(settingsData);

        // Fetch programs for dropdown
        const programsResponse = await fetch('/api/programs');
        const programsData = await programsResponse.json();
        setPrograms(programsData || []);
      } catch (error) {
        console.error('Error fetching popup data:', error);
      }
    };

    fetchData();
  }, []);

  // Show popup after delay
  useEffect(() => {
    if (!settings?.isEnabled) return;

    const timer = setTimeout(() => {
      setIsOpen(true);
    }, settings.delaySeconds * 1000);

    return () => clearTimeout(timer);
  }, [settings]);

  const handleClose = () => setIsOpen(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success(settings?.successMessage || 'Thank you! We will contact you shortly.');
        setFormData({ fullName: '', mobileNumber: '', interestedProgram: '' });
        setIsOpen(false);
      } else {
        toast.error('Failed to submit. Please try again.');
      }
    } catch (error) {
      console.error('Submit error:', error);
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!settings?.isEnabled || !isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 p-4">
      <div className="relative w-full max-w-md rounded-2xl bg-white p-8">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 rounded-full p-1 hover:bg-gray-100"
          aria-label="Close"
        >
          <X size={20} className="text-gray-600" />
        </button>

        {/* Content */}
        <h2 className="mb-2 text-2xl font-bold text-gray-900">{settings.heading}</h2>
        <p className="mb-6 text-sm text-gray-600">{settings.subheading}</p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-900">
              {settings.fullNameLabel} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder={settings.fullNamePlaceholder}
              className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-sm placeholder-gray-400 transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              required
            />
          </div>

          {/* Mobile Number */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-900">
              {settings.mobileLabel} <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleInputChange}
              placeholder={settings.mobilePlaceholder}
              className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-sm placeholder-gray-400 transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              required
            />
          </div>

          {/* Program Dropdown */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-900">
              {settings.programLabel} <span className="text-red-500">*</span>
            </label>
            <select
              name="interestedProgram"
              value={formData.interestedProgram}
              onChange={handleInputChange}
              className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-900 transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              required
            >
              <option value="">{settings.programPlaceholder}</option>
              {programs.map(program => (
                <option key={program.slug} value={program.slug}>
                  {program.name}
                </option>
              ))}
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="mt-6 w-full rounded-full bg-gradient-to-r from-primary to-accent py-3 font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {isLoading ? 'Submitting...' : settings.ctaButtonText}
          </button>
        </form>

        {/* Footer Message */}
        <p className="mt-4 text-center text-xs text-gray-500">{settings.successMessage}</p>
      </div>
    </div>
  );
}
