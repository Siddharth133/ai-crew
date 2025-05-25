import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight, FaArrowLeft, FaCheck, FaRobot, FaChartLine, FaUsers, FaShieldAlt } from 'react-icons/fa';

const steps = [
  { id: 'requirements', title: 'Requirements' },
  { id: 'capabilities', title: 'Capabilities' },
  { id: 'integration', title: 'Integration' },
  { id: 'review', title: 'Review' }
];

const capabilityOptions = [
  {
    category: 'Data Processing',
    options: [
      'Data analysis and visualization',
      'Natural language processing',
      'Image recognition',
      'Pattern detection',
      'Predictive analytics'
    ]
  },
  {
    category: 'Automation',
    options: [
      'Task automation',
      'Workflow optimization',
      'Process monitoring',
      'Scheduled tasks',
      'Event-driven actions'
    ]
  },
  {
    category: 'Communication',
    options: [
      'Multi-channel support',
      'Language translation',
      'Content generation',
      'Email automation',
      'Chat integration'
    ]
  },
  {
    category: 'Security',
    options: [
      'Access control',
      'Data encryption',
      'Threat detection',
      'Compliance monitoring',
      'Audit logging'
    ]
  }
];

const integrationOptions = [
  'REST API',
  'GraphQL',
  'Webhooks',
  'Database',
  'Cloud Storage',
  'CRM Systems',
  'Communication Platforms',
  'Custom Integration'
];

const CustomAgentPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    requirements: {
      name: '',
      description: '',
      useCase: '',
      expectedVolume: '',
      timeline: ''
    },
    capabilities: [],
    integrations: [],
    additionalNotes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleCapabilityToggle = (capability) => {
    setFormData(prev => ({
      ...prev,
      capabilities: prev.capabilities.includes(capability)
        ? prev.capabilities.filter(c => c !== capability)
        : [...prev.capabilities, capability]
    }));
  };

  const handleIntegrationToggle = (integration) => {
    setFormData(prev => ({
      ...prev,
      integrations: prev.integrations.includes(integration)
        ? prev.integrations.filter(i => i !== integration)
        : [...prev.integrations, integration]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // TODO: Implement API call
    setTimeout(() => {
      setIsSubmitting(false);
      // TODO: Show success message and redirect
    }, 2000);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-white font-medium mb-2">Agent Name</label>
              <input
                type="text"
                value={formData.requirements.name}
                onChange={(e) => handleInputChange('requirements', 'name', e.target.value)}
                placeholder="e.g., Customer Support Assistant"
                className="w-full px-4 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg
                  text-white placeholder-purple-300 focus:outline-none focus:border-purple-500"
              />
            </div>
            <div>
              <label className="block text-white font-medium mb-2">Description</label>
              <textarea
                value={formData.requirements.description}
                onChange={(e) => handleInputChange('requirements', 'description', e.target.value)}
                placeholder="Describe what you want your agent to do..."
                rows={4}
                className="w-full px-4 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg
                  text-white placeholder-purple-300 focus:outline-none focus:border-purple-500"
              />
            </div>
            <div>
              <label className="block text-white font-medium mb-2">Use Case</label>
              <textarea
                value={formData.requirements.useCase}
                onChange={(e) => handleInputChange('requirements', 'useCase', e.target.value)}
                placeholder="Describe your specific use case and how you plan to use the agent..."
                rows={4}
                className="w-full px-4 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg
                  text-white placeholder-purple-300 focus:outline-none focus:border-purple-500"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white font-medium mb-2">Expected Volume</label>
                <input
                  type="text"
                  value={formData.requirements.expectedVolume}
                  onChange={(e) => handleInputChange('requirements', 'expectedVolume', e.target.value)}
                  placeholder="e.g., 1000 requests/day"
                  className="w-full px-4 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg
                    text-white placeholder-purple-300 focus:outline-none focus:border-purple-500"
                />
              </div>
              <div>
                <label className="block text-white font-medium mb-2">Timeline</label>
                <input
                  type="text"
                  value={formData.requirements.timeline}
                  onChange={(e) => handleInputChange('requirements', 'timeline', e.target.value)}
                  placeholder="e.g., Within 2 weeks"
                  className="w-full px-4 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg
                    text-white placeholder-purple-300 focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-8">
            {capabilityOptions.map((category) => (
              <div key={category.category}>
                <h3 className="text-xl font-semibold text-white mb-4">{category.category}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {category.options.map((option) => (
                    <button
                      key={option}
                      onClick={() => handleCapabilityToggle(option)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                        formData.capabilities.includes(option)
                          ? 'bg-purple-500/20 border-purple-500 text-white'
                          : 'bg-white/5 border-white/10 text-purple-100 hover:bg-white/10'
                      } border`}
                    >
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center
                        ${formData.capabilities.includes(option)
                          ? 'border-purple-500 bg-purple-500'
                          : 'border-purple-300'
                        }`}
                      >
                        {formData.capabilities.includes(option) && (
                          <FaCheck className="w-3 h-3 text-white" />
                        )}
                      </div>
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Integration Requirements</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {integrationOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleIntegrationToggle(option)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      formData.integrations.includes(option)
                        ? 'bg-purple-500/20 border-purple-500 text-white'
                        : 'bg-white/5 border-white/10 text-purple-100 hover:bg-white/10'
                    } border`}
                  >
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center
                      ${formData.integrations.includes(option)
                        ? 'border-purple-500 bg-purple-500'
                        : 'border-purple-300'
                      }`}
                    >
                      {formData.integrations.includes(option) && (
                        <FaCheck className="w-3 h-3 text-white" />
                      )}
                    </div>
                    {option}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-white font-medium mb-2">Additional Notes</label>
              <textarea
                value={formData.additionalNotes}
                onChange={(e) => setFormData(prev => ({ ...prev, additionalNotes: e.target.value }))}
                placeholder="Any specific requirements or preferences for integration..."
                rows={4}
                className="w-full px-4 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg
                  text-white placeholder-purple-300 focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-8">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Requirements Summary</h3>
              <dl className="space-y-4">
                <div>
                  <dt className="text-purple-200">Agent Name</dt>
                  <dd className="text-white">{formData.requirements.name}</dd>
                </div>
                <div>
                  <dt className="text-purple-200">Description</dt>
                  <dd className="text-white">{formData.requirements.description}</dd>
                </div>
                <div>
                  <dt className="text-purple-200">Use Case</dt>
                  <dd className="text-white">{formData.requirements.useCase}</dd>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <dt className="text-purple-200">Expected Volume</dt>
                    <dd className="text-white">{formData.requirements.expectedVolume}</dd>
                  </div>
                  <div>
                    <dt className="text-purple-200">Timeline</dt>
                    <dd className="text-white">{formData.requirements.timeline}</dd>
                  </div>
                </div>
              </dl>
            </div>

            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Selected Capabilities</h3>
              <div className="flex flex-wrap gap-2">
                {formData.capabilities.map((capability) => (
                  <span
                    key={capability}
                    className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm"
                  >
                    {capability}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Integration Requirements</h3>
              <div className="flex flex-wrap gap-2">
                {formData.integrations.map((integration) => (
                  <span
                    key={integration}
                    className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm"
                  >
                    {integration}
                  </span>
                ))}
              </div>
              {formData.additionalNotes && (
                <div className="mt-4">
                  <dt className="text-purple-200">Additional Notes</dt>
                  <dd className="text-white mt-1">{formData.additionalNotes}</dd>
                </div>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Request Custom Agent
          </h1>
          <p className="text-xl text-purple-100">
            Tell us about your requirements and we'll create a custom AI agent for your needs
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <React.Fragment key={step.id}>
                <div className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center
                    ${index <= currentStep
                      ? 'bg-purple-500 text-white'
                      : 'bg-white/5 text-purple-200'
                    }`}
                  >
                    {index < currentStep ? (
                      <FaCheck className="w-5 h-5" />
                    ) : (
                      <span>{index + 1}</span>
                    )}
                  </div>
                  <span className={`ml-2 text-sm font-medium ${
                    index <= currentStep ? 'text-white' : 'text-purple-200'
                  }`}>
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-4 ${
                    index < currentStep ? 'bg-purple-500' : 'bg-white/10'
                  }`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {renderStep()}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-8">
            {currentStep > 0 ? (
              <button
                type="button"
                onClick={() => setCurrentStep(prev => prev - 1)}
                className="flex items-center gap-2 px-6 py-3 bg-white/5 backdrop-blur-xl border border-white/10
                  rounded-lg text-white hover:bg-white/10 transition-colors"
              >
                <FaArrowLeft />
                Back
              </button>
            ) : (
              <div />
            )}
            {currentStep < steps.length - 1 ? (
              <button
                type="button"
                onClick={() => setCurrentStep(prev => prev + 1)}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500
                  text-white rounded-lg font-semibold shadow-lg hover:shadow-xl hover:shadow-purple-500/25
                  hover:scale-[1.02] transition-all duration-300"
              >
                Next
                <FaArrowRight />
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className={`flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500
                  text-white rounded-lg font-semibold shadow-lg hover:shadow-xl hover:shadow-purple-500/25
                  hover:scale-[1.02] transition-all duration-300 ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Request'}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomAgentPage; 