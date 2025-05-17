const API_BASE_URL = 'http://localhost:8000';

export const tripPlannerApi = {
    getPlannerStatus: async () => {
        const response = await fetch(`${API_BASE_URL}/agents/trip-planner/`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    },
    
    planTrip: async (tripData) => {
        try {
            console.log('Sending trip data:', tripData); // Debug log
            const response = await fetch(`${API_BASE_URL}/agents/trip-planner/generate-itinerary/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(tripData),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => null);
                console.error('Server error response:', errorData); // Debug log
                throw new Error(errorData?.detail || `HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Server response:', data); // Debug log
            return data;
        } catch (error) {
            console.error('API error:', error); // Debug log
            throw error;
        }
    },
};

// Template for adding new agent APIs
export const createAgentApi = (agentPath) => ({
    getStatus: async () => {
        const response = await fetch(`${API_BASE_URL}/agents/${agentPath}/`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    },
    
    // Add more generic methods as needed
});

// Export a combined API object
export const api = {
    tripPlanner: tripPlannerApi,
    // Add more agents here as they are created
}; 