export type ClientInfoType = {
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
    languages?: string[];
    about?: string;
    services: ClientServiceProp[];
  };
  
 
  export type ClientServiceProp = {
    name: string;
    description: string;
    price: string;
    duration: string;
  };
 