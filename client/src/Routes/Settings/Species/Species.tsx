import { useState, useEffect, useContext } from "react"
import { getAllSpecies } from "@/services/Species.service"
import { SpeciesDataTypes } from "@/types/Plant"
import ReactMarkdown from "react-markdown"
import { UserContext } from "@/App"
import { LiaInfoCircleSolid } from "react-icons/lia"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
const Species = () => {
  const BASE = useContext(UserContext)
  const [species, setSpecies] = useState<SpeciesDataTypes[]>([])
  const loadGetAllSpecies = async () => {
    const payload: SpeciesDataTypes[] = await getAllSpecies(BASE)
    setSpecies(payload)
  }
  useEffect(() => {
    loadGetAllSpecies()
  }, [])
  return (
    <section className='mt-3 w-full'>
      <div className='flex flex-col items-start w-full border-b pb-2'>
        <p className='topic'>Species</p>
        <p className='text-secondary text-sm'>Manage Your Plants' Species</p>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-2 gap-6 mt-5">
        {species.length > 0 && species.map((doc: SpeciesDataTypes) => (
          <div key={doc.id}>
            <Card>
              <CardHeader>
                <CardTitle className="text-start text-lg topic w-full flex justify-between">
                  <ReactMarkdown>{doc.scientificName + ` (${doc.name})`}</ReactMarkdown>

                  <button><LiaInfoCircleSolid className="text-primary" size={24} /></button>
                </CardTitle>

              </CardHeader>
              <CardContent>
                <CardDescription className="text-start text-secondary"><ReactMarkdown>{doc.description}</ReactMarkdown></CardDescription>
              </CardContent>

            </Card>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Species