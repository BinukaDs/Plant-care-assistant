import { FC } from 'react'
interface PlantCardProps {
    id: string
    nickname: string
    location: string
    species: string
    environment: string
}

const PlantCard: FC<PlantCardProps> = (plant): JSX.Element => {
    return (
        <div>
            <p className="text-black">{plant.nickname}</p>
        </div>
    )
}

export default PlantCard