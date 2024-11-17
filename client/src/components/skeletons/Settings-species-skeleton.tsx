import { Skeleton } from "../ui/skeleton"

const SpeciesSkeleton = () => {
    const skeletons = Array.from({ length: 6 });

    return (
        <>
            {skeletons.map((_, index) => (
                <div key={index} className="flex flex-col space-y-3 w-[350px]">
                  
                    <div className="space-y-6">
                        <div className='flex w-full justify-between'>
                            <Skeleton className="h-5 w-[100px]"/>   
                            <Skeleton className="h-6 w-[20px]"/>
                        </div>
                        <div className="flex w-full justify-between items-end">
                            <div className="flex flex-col gap-2 w-full">
                                <Skeleton className="h-4 w-[350px]" />
                                <Skeleton className="h-4 w-[350px]" />
                                <Skeleton className="h-4 w-[350px]" />
                                <Skeleton className="h-4 w-[350px]" />
                            </div>
                            
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
}

export default SpeciesSkeleton