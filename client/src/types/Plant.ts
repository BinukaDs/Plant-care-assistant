export interface PlantDataTypes {
  id: string;
  nickname: string;
  imageUrl: string;
  imageName: string;
  location: string;
  species: string;
  environment: string;
  growthLogs: {
    imageUrl: string;
    imageName: string;
    date: string;
    notes: string;
    height: number;
    leafCount: number;
  }[];
  careGuide: string;
  userId: string;
  favourite: boolean;
}

export interface PlantsContextDataTypes {
  setData: React.Dispatch<React.SetStateAction<PlantsDataTypes>>;
  Data: PlantsDataTypes;
  Plants: PlantsDataTypes;
  setPlants: React.Dispatch<React.SetStateAction<PlantsDataTypes>>;
  Locations: LocationDataTypes[];
  setLocations: React.Dispatch<React.SetStateAction<LocationDataTypes[]>>;
  loadFetchPlants: () => Promise<void>;
  loadFetchLocations: () => Promise<void>;
  loadAuthentication: () => Promise<void>;
  isLoading: boolean;
  Wallpapers: WallpaperDataTypes[];
}

export interface WallpaperDataTypes {
  urls: {
    full: string;
    thumb: string;
    small: string;
  };
}

export type PlantsDataTypes = PlantDataTypes[];  
 

export interface LocationDataTypes {
  id: string;
  location: string;
  environment: string;
}

export interface responseDataTypes {
  message: string;
  status: number | string;
  token: string;
  code?: string;
}
