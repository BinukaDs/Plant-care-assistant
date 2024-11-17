import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { getAllSpeciesFiltered } from "@/services/Species.service"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "@/App"
import ReactMarkdown from "react-markdown"
import { SpeciesDataTypes } from "@/types/Plant"
const SpeciesInput = ({ onValueChange }: { onValueChange: (id: string) => void }) => {
    const BASE = useContext(UserContext)
    const [species, setSpecies] = useState<SpeciesDataTypes[]>([])

    const loadSpecies = async () => {
        const data: SpeciesDataTypes[] = await getAllSpeciesFiltered(BASE)
        if (data) {
            setSpecies(data)
            
        }

    }

    useEffect(() => {
        loadSpecies()
    }, [])
    return (
        <div className="w-full">
            <Select onValueChange={onValueChange}>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Species..." />
                </SelectTrigger>
                <SelectContent>
                    {species.map((species) => {
                        return <SelectItem key={species.id} value={species.id} ><p className="flex gap-1"><ReactMarkdown>{species.scientificName}</ReactMarkdown> ({species.name})</p></SelectItem>
                    })}
                </SelectContent>
            </Select>
        </div>
    )
}

export default SpeciesInput