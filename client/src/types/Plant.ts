export interface PlantDataTypes {
    id: string
    nickname: string
    imageUrl: string
    imageName: string
    location: string
    species: string
    environment: string
    growthLogs: { imageUrl: string; date: string; notes: string; height: number; leafCount: number; }[]
    careGuide: string;
}

export interface PlantsDataTypes {
    plants: PlantDataTypes[]
}