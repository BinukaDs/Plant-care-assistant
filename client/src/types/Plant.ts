export interface PlantDataTypes {
  id: string;
  nickname: string;
  imageUrl: string;
  imageName: string;
  location: string;
  environment: string;
  speciesId:string;
  growthLogs: {
    imageUrl: string;
    imageName: string;
    date: string;
    notes: string;
    height: number;
    leafCount: number;
  }[];
  speciesData: {
    description: string;
    careGuide: string;
    name: string;
    scientificName: string;
    id: string;
  };
  userId: string;
  favourite: boolean;
}

export interface PlantsContextDataTypes {
  UserId: string;
  BASE: string;
  setData: React.Dispatch<React.SetStateAction<PlantsDataTypes>>;
  Data: PlantsDataTypes;
  Plants: PlantsDataTypes;
  setPlants: React.Dispatch<React.SetStateAction<PlantsDataTypes>>;
  Locations: LocationDataTypes[];
  setLocations: React.Dispatch<React.SetStateAction<LocationDataTypes[]>>;
  loadFetchPlants: () => Promise<PlantsDataTypes>;
  loadFetchLocations: () => Promise<void>;
  loadAuthentication: () => Promise<void>;
  setisLoading: React.Dispatch<React.SetStateAction<boolean>>;
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

export interface SpeciesDataTypes {
  name: string;
  scientificName: string;
  id: string;
  description?: string;
  careGuide?: string;
}
