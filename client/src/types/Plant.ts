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

export interface PlantsDataTypes {
  nickname: string;
  species: string;
  plants: PlantDataTypes[];
}

export interface LocationDataTypes {
  id: string;
  location:string;
  environment: string;
}

export interface responseDataTypes {
  message: string;
  status: number | string;
  token: string;
  code?: string;
}
