export interface ITourType {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface IAddTourType {
  name: string;
}

export interface ITour {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  images?: string[];
  location?: string;
  departureLocation?: string;
  arrivalLocation?: string;
  costFrom?: number;
  startDate?: Date;
  endDate?: Date;
  included?: string[];
  excluded?: string[];
  amenities?: string[];
  tourPlan?: string[];
  maxGuest?: number;
  minAge?: number;
  division: string;
  tourType: string;
  deleteImages?: string[];
  createdAt: string;
  updatedAt: string;
}


