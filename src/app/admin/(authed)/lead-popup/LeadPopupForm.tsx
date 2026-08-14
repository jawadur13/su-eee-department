'use client';

import { useState } from 'react';
import { toast } from 'sonner';

interface Settings {
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

export default function LeadPopupForm({ initialData }: { initialData: Settings }) {
  const [formData, setFormData] = useState(initialData);
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, type, value } = e.target as HTMLInputElement;

    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseInt(value) : type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const response = await fetch('/api/admin/lead-popup/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success('Settings saved successfully');
      } else {
        toast.error('Failed to save settings');
      }
    } catch (error) {
      toast.error('An error occurred');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 rounded-lg border border-gray-200 bg-white p-6">
      {/* Enabled toggle */}
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          id="isEnabled"
          name="isEnabled"
          checked={formData.isEnabled}
          onChange={handleChange}
          className="rounded"
        />
        <label htmlFor="isEnabled" className="font-medium text-gray-900">
          Enable popup
        </label>
      </div>

      {/* Delay seconds */}
      <div>
        <label htmlFor="delaySeconds" className="block text-sm font-semibold text-gray-900 mb-2">
          Delay before showing (seconds)
        </label>
        <input
          type="number"
          id="delaySeconds"
          name="delaySeconds"
          value={formData.delaySeconds}
          onChange={handleChange}
          min="1"
          max="300"
          className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm"
        />
        <p className="text-xs text-gray-500 mt-1">Default: 15 seconds</p>
      </div>

      <hr className="border-gray-200" />

      {/* Popup content */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-4">Popup Content</h3>
        <div className="space-y-4">
          <div>
            <label htmlFor="heading" className="block text-sm font-medium text-gray-900 mb-2">
              Heading
            </label>
            <input
              type="text"
              id="heading"
              name="heading"
              value={formData.heading}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm"
            />
          </div>

          <div>
            <label htmlFor="subheading" className="block text-sm font-medium text-gray-900 mb-2">
              Subheading
            </label>
            <textarea
              id="subheading"
              name="subheading"
              value={formData.subheading}
              onChange={handleChange}
              rows={2}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm"
            />
          </div>
        </div>
      </div>

      <hr className="border-gray-200" />

      {/* Form labels */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-4">Form Field Labels</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="fullNameLabel" className="block text-sm font-medium text-gray-900 mb-2">
                Full Name Label
              </label>
              <input
                type="text"
                id="fullNameLabel"
                name="fullNameLabel"
                value={formData.fullNameLabel}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm"
              />
            </div>
            <div>
              <label htmlFor="fullNamePlaceholder" className="block text-sm font-medium text-gray-900 mb-2">
                Full Name Placeholder
              </label>
              <input
                type="text"
                id="fullNamePlaceholder"
                name="fullNamePlaceholder"
                value={formData.fullNamePlaceholder}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="mobileLabel" className="block text-sm font-medium text-gray-900 mb-2">
                Mobile Label
              </label>
              <input
                type="text"
                id="mobileLabel"
                name="mobileLabel"
                value={formData.mobileLabel}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm"
              />
            </div>
            <div>
              <label htmlFor="mobilePlaceholder" className="block text-sm font-medium text-gray-900 mb-2">
                Mobile Placeholder
              </label>
              <input
                type="text"
                id="mobilePlaceholder"
                name="mobilePlaceholder"
                value={formData.mobilePlaceholder}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="programLabel" className="block text-sm font-medium text-gray-900 mb-2">
                Program Label
              </label>
              <input
                type="text"
                id="programLabel"
                name="programLabel"
                value={formData.programLabel}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm"
              />
            </div>
            <div>
              <label htmlFor="programPlaceholder" className="block text-sm font-medium text-gray-900 mb-2">
                Program Placeholder
              </label>
              <input
                type="text"
                id="programPlaceholder"
                name="programPlaceholder"
                value={formData.programPlaceholder}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm"
              />
            </div>
          </div>
        </div>
      </div>

      <hr className="border-gray-200" />

      {/* CTA Button */}
      <div>
        <label htmlFor="ctaButtonText" className="block text-sm font-medium text-gray-900 mb-2">
          CTA Button Text
        </label>
        <input
          type="text"
          id="ctaButtonText"
          name="ctaButtonText"
          value={formData.ctaButtonText}
          onChange={handleChange}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm"
        />
      </div>

      {/* Success Message */}
      <div>
        <label htmlFor="successMessage" className="block text-sm font-medium text-gray-900 mb-2">
          Success Message
        </label>
        <textarea
          id="successMessage"
          name="successMessage"
          value={formData.successMessage}
          onChange={handleChange}
          rows={2}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSaving}
        className="w-full rounded-lg bg-primary text-white px-6 py-3 font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50"
      >
        {isSaving ? 'Saving...' : 'Save Settings'}
      </button>
    </form>
  );
}
