import { PlantDataTypes } from '@/types/Plant'


const PlantCard = ({plant}: PlantDataTypes) => {
    return (
        <div className='container relative flex flex-col'>
            <div className='relative bg-black h-12 w-12 m-12'>
                <h1>{plant.nickname}</h1>
                <p>{plant.location}</p>
            </div>
            <div className='absolute'>
                <img src={plant.imageUrl} alt={plant.imageName} />
            </div>
        </div>
    )
}

export default PlantCard