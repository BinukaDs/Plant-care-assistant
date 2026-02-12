import { useState, useEffect, useContext } from "react"
import { getAllSpecies } from "@/services/Species.service"
import { PlantsContextDataTypes, SpeciesDataTypes } from "@/types/Plant"
import ReactMarkdown from "react-markdown"
import { PlantsContext, UserContext } from "@/App"
import { LiaInfoCircleSolid } from "react-icons/lia"
import SpeciesSkeleton from "@/components/skeletons/Settings-species-skeleton"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog"
import { toast } from "sonner"
import { LiaLeafSolid } from "react-icons/lia"
const Species = () => {
  const BASE = useContext(UserContext)
  const { isLoading, setisLoading } = useContext(PlantsContext) as PlantsContextDataTypes
  const [species, setSpecies] = useState<SpeciesDataTypes[]>([])
  const loadGetAllSpecies = async () => {
    setisLoading(true)
    try {
      const payload: SpeciesDataTypes[] = await getAllSpecies(BASE)
      setSpecies(payload)
      setisLoading(false)
    }
    catch (error) {
      console.error(error)
      toast.error("Error loading species!")
      setisLoading(false)
    }
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

      <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6 mt-5">
        {isLoading ? <SpeciesSkeleton /> : species.length > 0 ? species.map((doc: SpeciesDataTypes) => (
          <div key={doc.id}>
            <Card className="h-full ">
              <CardHeader>
                <CardTitle className="text-start text-lg topic w-full flex justify-between">
                  <ReactMarkdown>{doc.scientificName + ` (${doc.name})`}</ReactMarkdown>

                  <Dialog>
                    <DialogTrigger asChild>
                      <LiaInfoCircleSolid className="text-primary cursor-pointer" size={24} />
                    </DialogTrigger>
                    <DialogContent className="lg:w-1/2 h-5/6 ">

                      <div className="flex flex-col gap-2 mt-2 overflow-y-scroll">
                        <h1 className="topic text-2xl font-semibold"><ReactMarkdown>{doc.scientificName}</ReactMarkdown></h1>
                        <div className='flex justify-start items-end gap-2 mt-1 mb-1'>
                          <LiaLeafSolid size={24} className='text-primary' />
                          <p className='text-sm text-secondary'>{doc.name}</p>
                        </div>
                        
                          <h2 className="font-bold">Description</h2>
                          <p className="text-secondary">{doc.description}</p>
                          <h2 className="font-bold mt-5">Care Guide</h2>
                          <ReactMarkdown className="text-secondary">{doc.careGuide}</ReactMarkdown>
                       
                      </div>
                      <DialogFooter className="w-full">
                        <DialogClose className="w-full" asChild><Button type="submit" className="w-full">Close</Button></DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardTitle>

              </CardHeader>
              <CardContent>
                <CardDescription className="text-start text-secondary"><ReactMarkdown>{doc.description}</ReactMarkdown></CardDescription>
              </CardContent>

            </Card>
          </div>
        )): <p>No Species Found. Start by adding new species.</p>}
      </div>
    </section>
  )
}

export default Species