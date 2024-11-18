import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { useLocation } from "react-router-dom"

interface BreadCrumbNavProps {
    className?: string;
}

const BreadCrumbNav: React.FC<BreadCrumbNavProps> = ({ className }) => {
    const location = useLocation()
    const breadCrumbLocation = location.pathname.split("/")
    return (
        <Breadcrumb className={`mb-5`}>
            <BreadcrumbList>
                {breadCrumbLocation.map((item, index) => {
                    if (item === "") {
                        return null
                    } else {
                        return (
                            <BreadcrumbItem key={index} className={className}>
                                {index == 1 ?
                                    <BreadcrumbLink asChild>
                                        <a href={`/${item}`} >{item}</a>
                                    </BreadcrumbLink> :
                                    <BreadcrumbPage className={className}>{item}</BreadcrumbPage>}
                                <BreadcrumbSeparator />
                            </BreadcrumbItem>
                        )
                    }
                })}
            </BreadcrumbList>
        </Breadcrumb>
    )
}

export default BreadCrumbNav