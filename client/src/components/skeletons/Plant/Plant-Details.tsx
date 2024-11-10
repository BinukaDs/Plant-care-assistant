import { Skeleton } from "../../ui/skeleton"


const DetailsSkeleton = () => {

    return (
        <>
            <div className='relative bg-card rounded-xl h-full w-full p-10 mb-12'>
                <div className='flex gap-32 '>
                    <div className='flex absolute justify-center items-end gap-2 -top-44 p-6'>
                        <Skeleton className="h-[220px] w-[180px] rounded-xl" />
                    </div>
                    <div className='ml-64 flex justify-between w-full'>
                        <div className='flex flex-col gap-2 w-full'>
                            <div className='flex justify-start w-full items-end gap-2 mt-2'>
                                <Skeleton className="h-3 w-1/6" />
                            </div>
                            <div className='flex justify-start items-end gap-2 mt-2'>
                                <Skeleton className="h-3 w-1/6" />
                            </div>
                        </div>
                        <div>
                            <Skeleton className="h-8 w-10 rounded-full" />
                        </div>
                    </div>
                </div>
                <div className='flex justify-start  w-full'>
                    <div className='flex flex-col justify-start w-full gap-4 text-start mx-5'>
                        <div className='flex gap-6 w-full'>
                            <Skeleton className="h-10 w-1/5 rounded-full" />
                            
                        </div>
                        <div className="w-full gap-4">
                            <Skeleton className="h-3 my-2 w-full rounded-full" />
                            <Skeleton className="h-3 my-2 w-full rounded-full" />
                            <Skeleton className="h-3 my-2 w-full rounded-full" />
                            <Skeleton className="h-3 my-2 w-full rounded-full" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DetailsSkeleton