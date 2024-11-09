import { Skeleton } from '../ui/skeleton';
const DashboardPlantSkeleton = () => {
    const skeletons = Array.from({ length: 6 });

    return (
        <>
            {skeletons.map((_, index) => (
                <div key={index} className="flex flex-col space-y-3 w-[250px]">
                    <Skeleton className="h-[300px] w-[250px] rounded-xl" />
                    <div className="space-y-2">
                        <Skeleton className="h-5 w-[100px]" />
                        <div className="flex w-full justify-between items-end">
                            <div className="flex flex-col gap-2">
                                <Skeleton className="h-4 w-[50px]" />
                                <Skeleton className="h-4 w-[50px]" />
                            </div>
                            <div>
                                <Skeleton className="h-10 w-14 rounded-full" />
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};

export default DashboardPlantSkeleton;