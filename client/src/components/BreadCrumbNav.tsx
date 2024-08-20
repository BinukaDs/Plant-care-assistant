import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { useLocation } from "react-router-dom"

const BreadCrumbNav = () => {
    const location = useLocation()
    console.log("location:", location.pathname.split("/"))

    const breadCrumbLocation = location.pathname.split("/")
    return (
        <Breadcrumb className="mb-5">
            <BreadcrumbList>
                {breadCrumbLocation.map((item, index) => {
                    if (item === "") {
                        return null
                    } else {
                        return (
                            <BreadcrumbItem key={index}>
                                {index == 1 ?
                                    <BreadcrumbLink>
                                        <a href={`/${item}`}>{item}</a>
                                    </BreadcrumbLink> :
                                    <BreadcrumbPage>{item}</BreadcrumbPage>}
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