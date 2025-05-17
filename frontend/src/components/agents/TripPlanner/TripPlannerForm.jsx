import React, { useState } from 'react';
import { api } from '../../../services/api';

const TRAVEL_STYLES = [
    "Luxury",
    "Budget",
    "Adventure",
    "Relaxation",
    "Cultural"
];

const ACTIVITY_OPTIONS = [
    "Sightseeing",
    "Food & Dining",
    "Shopping",
    "Museums",
    "Outdoor Activities",
    "Nightlife",
    "Beach",
    "Historical Sites"
];

const INTEREST_OPTIONS = [
    "History",
    "Art",
    "Food",
    "Nature",
    "Photography",
    "Sports",
    "Music",
    "Local Culture"
];

const TripPlannerForm = ({ onPlanCreated }) => {
    const [formData, setFormData] = useState({
        destination: '',
        start_date: '',
        end_date: '',
        interests: [],
        travel_style: '',
        preferred_activities: [],
        daily_budget: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const validateForm = () => {
        if (!formData.interests.length) {
            throw new Error('Please select at least one interest');
        }
        if (!formData.preferred_activities.length) {
            throw new Error('Please select at least one preferred activity');
        }
        if (formData.daily_budget && isNaN(Number(formData.daily_budget))) {
            throw new Error('Daily budget must be a valid number');
        }
        const start = new Date(formData.start_date);
        const end = new Date(formData.end_date);
        if (end < start) {
            throw new Error('End date cannot be before start date');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            validateForm();
            // Convert daily_budget to number if it exists
            const dataToSend = {
                ...formData,
                daily_budget: formData.daily_budget ? Number(formData.daily_budget) : null
            };
            console.log('Submitting form data:', dataToSend); // Debug log
            const response = await api.tripPlanner.planTrip(dataToSend);
            onPlanCreated(response);
        } catch (err) {
            setError(err.message || 'Failed to create trip plan. Please try again.');
            console.error('Form submission error:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        
        if (type === 'checkbox') {
            const array = name === 'interests' ? formData.interests : formData.preferred_activities;
            const newArray = e.target.checked 
                ? [...array, value]
                : array.filter(item => item !== value);
            
            setFormData(prev => ({
                ...prev,
                [name]: newArray
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-lg mx-auto">
            <div>
                <label htmlFor="destination" className="block text-sm font-medium text-gray-700">
                    Destination
                </label>
                <input
                    type="text"
                    id="destination"
                    name="destination"
                    value={formData.destination}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Enter destination"
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label htmlFor="start_date" className="block text-sm font-medium text-gray-700">
                        Start Date
                    </label>
                    <input
                        type="date"
                        id="start_date"
                        name="start_date"
                        value={formData.start_date}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label htmlFor="end_date" className="block text-sm font-medium text-gray-700">
                        End Date
                    </label>
                    <input
                        type="date"
                        id="end_date"
                        name="end_date"
                        value={formData.end_date}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Travel Style
                </label>
                <select
                    name="travel_style"
                    value={formData.travel_style}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                    <option value="">Select a travel style</option>
                    {TRAVEL_STYLES.map(style => (
                        <option key={style} value={style}>{style}</option>
                    ))}
                </select>
            </div>

            <div>
                <label htmlFor="daily_budget" className="block text-sm font-medium text-gray-700">
                    Daily Budget (USD)
                </label>
                <input
                    type="number"
                    id="daily_budget"
                    name="daily_budget"
                    value={formData.daily_budget}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Enter your daily budget"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Interests
                </label>
                <div className="grid grid-cols-2 gap-2">
                    {INTEREST_OPTIONS.map(interest => (
                        <label key={interest} className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                name="interests"
                                value={interest}
                                checked={formData.interests.includes(interest)}
                                onChange={handleChange}
                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-sm text-gray-700">{interest}</span>
                        </label>
                    ))}
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Activities
                </label>
                <div className="grid grid-cols-2 gap-2">
                    {ACTIVITY_OPTIONS.map(activity => (
                        <label key={activity} className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                name="preferred_activities"
                                value={activity}
                                checked={formData.preferred_activities.includes(activity)}
                                onChange={handleChange}
                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-sm text-gray-700">{activity}</span>
                        </label>
                    ))}
                </div>
            </div>

            {error && (
                <div className="text-red-600 text-sm">
                    {error}
                </div>
            )}

            <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
                {loading ? 'Planning...' : 'Plan Trip'}
            </button>
        </form>
    );
};

export default TripPlannerForm; 