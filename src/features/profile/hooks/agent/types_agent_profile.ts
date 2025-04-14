export type AgentInfoType = {
    avatar: string;
    title: string;
    review: string;
    phone: string;
    email?: string;
    name?: string;
    location?: string;
    rating?: string;
    reviewCount?: string;
    experience?: string;
    availability?: string[];
    specialties?: string[];
    languages?: string[];
    about?: string;
    education: EducationProp[];
    services: AgentServiceProp[];
  };
  
  export type EducationProp = {
    degree: string;
    institution: string;
    year: string;
  };
  export type AgentServiceProp = {
    name: string;
    description: string;
    price: string;
    duration: string;
  };
 