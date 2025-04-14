// use_agent_profile.js
import { useState, useEffect } from "react";

export const useAgentProfile = () => {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    // Simulating API call to fetch agent profile data
    const fetchAgentProfile = async () => {
      try {
        // In a real app, this would be an API call
        // await api.getAgentProfile()

        // Simulated delay
        setTimeout(() => {
          setProfile({
            id: "agent-sarah-johnson",
            name: "Dr. Sarah Johnson",
            title: "Medical Doctor",
            avatar: "/path/to/agent-avatar.jpg",
            location: "New York, NY",
            rating: "4.9",
            reviewCount: "127",
            experience: "10+",
            availability: "next week",
            specialties: ["General Medicine", "Pediatrics", "Preventive Care"],
            languages: ["English", "Spanish"],
            about:
              "Dr. Sarah Johnson is a board-certified physician with over 10 years of experience in family medicine. She specializes in preventive care, pediatrics, and women's health. Dr. Johnson takes a holistic approach to healthcare, focusing on the whole person rather than just treating symptoms.",
            education: [
              {
                degree: "M.D.",
                institution: "Harvard Medical School",
                year: "2010",
              },
              {
                degree: "B.S. Biology",
                institution: "Stanford University",
                year: "2006",
              },
            ],
            services: [
              {
                name: "General Consultation",
                description:
                  "Comprehensive health assessment and personalized care plan.",
                price: "150",
                duration: "60",
              },
              {
                name: "Follow-up Visit",
                description:
                  "Review of treatment progress and adjustments to care plan.",
                price: "100",
                duration: "30",
              },
              {
                name: "Pediatric Check-up",
                description:
                  "Complete assessment of child's growth, development, and overall health.",
                price: "130",
                duration: "45",
              },
            ],
            accountSettings: [
              {
                title: "Email",
                info: "dr.sarah.johnson@example.com",
                action: "Change",
              },
              {
                title: "Password",
                info: "••••••••",
                action: "Change",
              },
              {
                title: "Phone",
                info: "+1 (212) 555-6789",
                action: "Change",
              },
            ],
            deviceInfo: [
              {
                title: "Current device",
                info: "Chrome on MacOS",
                action: null,
              },
              {
                title: "Last logged in",
                info: "April 12, 2025",
                action: null,
              },
            ],
          });
          setLoading(false);
        }, 1500);
      } catch (error) {
        console.error("Error fetching agent profile:", error);
        setLoading(false);
      }
    };

    fetchAgentProfile();
  }, []);

  // Return formatted data for the component
  return {
    loading,
    ...profile,
    // Default empty arrays to prevent errors
    specialties: profile?.specialties || [],
    languages: profile?.languages || [],
    education: profile?.education || [],
    services: profile?.services || [],
    accountSettings: profile?.accountSettings || [],
    deviceInfo: profile?.deviceInfo || [],
  };
};
