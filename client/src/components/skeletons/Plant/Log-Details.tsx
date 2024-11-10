import { Skeleton } from "../../ui/skeleton"

const LogSkeleton = () => {

    return (
        <>
            <div className='bg-accent flex gap-4 p-4 px-6 rounded-xl w-full h-full'>
                <div className='flex w-full justify-between items-center gap-4'>
                    <div>
                        <Skeleton className="h-[180px] w-[120px] rounded-xl" />
                    </div>
                    <div className='flex flex-col w-full h-full justify-between items-start'>
                        <div className='flex w-full justify-between items-start'>
                            <div className='flex flex-col w-full gap-4 justify-start items-start'>
                                <Skeleton className="h-6 w-1/6" />
                                <div className='w-full'>
                                    <Skeleton className="h-3 my-3 w-full" />
                                    <Skeleton className="h-3 my-3 w-full" />
                                </div>
                            </div>
                            <div className='flex justify-start gap-2 items-center'>
                                
                            </div>
                        </div>
                        <div className='flex justify-start'>
                            <div className='flex flex-col gap-1 justify-start items-start'>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default LogSkeleton