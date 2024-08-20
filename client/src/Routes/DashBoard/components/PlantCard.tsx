import { PlantDataTypes } from '@/types/Plant'
import "../../../App.css"

const PlantCard = ({ plant }: PlantDataTypes) => {
    return (
        <div className='container relative flex flex-col w-full'>
            <a href={`dashboard/plant/${plant.id}`}>
                <div className='relative bg-white border rounded-md h-48 w-48 my-12 '>
                    <div className='absolute bottom-24 p-6'>
                        <img src={plant.imageUrl} alt={plant.imageName} className='rounded-md' />
                    </div>
                    <div className='mt-20'>
                        <h1 className='topic text-lg'>{plant.nickname}</h1>
                        <p className='text-sm'>{plant.location}</p>
                    </div>
                </div>
            </a>
        </div>
    )
}

export default PlantCard