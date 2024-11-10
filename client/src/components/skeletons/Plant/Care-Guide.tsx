import { Skeleton } from "../../ui/skeleton"

const CareGuideSkeleton = () => {

    return (
        <div className="w-full flex flex-col">
             <Skeleton className="h-4 my-2 w-full" />
             <Skeleton className="h-4 my-2 w-full" />
             <Skeleton className="h-4 my-2 w-full" />
             <Skeleton className="h-4 my-2 w-full" />
             <Skeleton className="h-4 my-2 w-full" />
             <Skeleton className="h-4 my-2 w-full" />
        </div>
    );
}

export default CareGuideSkeleton