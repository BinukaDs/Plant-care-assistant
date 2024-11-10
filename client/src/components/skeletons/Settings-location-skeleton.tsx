import { Skeleton } from "../ui/skeleton"

const LocationSkeleton = () => {
    const skeletons = Array.from({ length: 6 });
    return (

        skeletons.map((_, index) => (
           <Skeleton key={index} className="w-full h-10 m-5"/>
        ))

    )
}

export default LocationSkeleton