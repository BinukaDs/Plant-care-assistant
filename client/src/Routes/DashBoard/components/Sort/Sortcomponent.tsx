import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useContext, useEffect, useState } from "react"
import { PlantsContext } from "@/App"
import { PlantsContextDataTypes } from "@/types/Plant"
export const SortComponent = () => {
    const [sortType, setSortType] = useState<string>("")
    const { setData, Plants } = useContext(PlantsContext) as PlantsContextDataTypes
    useEffect(() => {
        switch (sortType) {
            case "nickname":
                setData([...Plants].sort((a, b) => (a.nickname >= b.nickname) ? 1 : -1));
                break;
            case "location":
                setData([...Plants].sort((a, b) => (a.location >= b.location) ? 1 : -1));
                break;
            case "species":
                setData([...Plants].sort((a, b) => (a.species >= b.species) ? 1 : -1));
                break;
            default:
                break;
        }
    }, [sortType, setData, Plants])

    return (

        <Select onValueChange={(value: string) => setSortType(value)}>
            <SelectTrigger className="w-[180px] text-secondary rounded-xl">
                <SelectValue placeholder="Sort Plants By..." />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectItem value="nickname">Name | A-Z</SelectItem>
                    <SelectItem value="location">Location | A-Z</SelectItem>
                    <SelectItem value="species">Species | A-Z</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>

    )
}
