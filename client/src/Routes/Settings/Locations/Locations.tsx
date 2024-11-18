import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { toast } from 'sonner';
import { useEffect, useState, useContext, useCallback } from 'react';
import { PlantsContext, UserContext } from '@/App';
import AddLocation from './AddLocation';
import { FetchAuthentication } from '@/services/Authentication.service';
import DeleteLocation from './DeleteLocation';
import { updateLocation } from '@/services/Locations.service';
import { LocationDataTypes, PlantDataTypes, PlantsContextDataTypes, responseDataTypes } from '@/types/Plant';
import { Input } from '@/components/ui/input';
import LocationSkeleton from "@/components/skeletons/Settings-location-skeleton";
import Cookies from 'universal-cookie'
const Locations = () => {
  const { Plants, Locations, loadFetchLocations, isLoading } = useContext(PlantsContext) as PlantsContextDataTypes
  const cookies = new Cookies()
  const BASE = useContext(UserContext)
  const [plantsCount, setplantsCount] = useState<number[]>([])
  const [userId, setUserId] = useState("")

  const loadAuthentication = async () => {
    try {
      const data = await FetchAuthentication(BASE, cookies.get("token"))
      if (data.id) {
        if (data.isLoggedin === true) {
          return setUserId(data.id)
        }
      }
    } catch (error) {
      console.error(error)
    }
  }

  const countPlantsByLocation = (locations: LocationDataTypes[], plants: PlantDataTypes[]) => {
    return locations.map(location => {
      const count = plants.filter(plant => plant.location === location.location).length;
      return count;
    });

  };


  const debounce = (func: (id: string, value: string, environment: string) => void, delay: number) => {
    let timeoutId: NodeJS.Timeout;
    return (...args: [string, string, string]) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const debouncedOnValueChange = useCallback(
    debounce((id: string, value: string, environment: string) => {
      onValueChange(id, value, environment);
    }, 1000),
    []
  );

  const onValueChange = async (id: string, location: string, environment: string) => {
    if (location && environment && id) {

      try {
        const response: responseDataTypes = await updateLocation(BASE, id, location, environment)
        if (response.status == 200) {
          console.log("✅", response.message)
          toast.success(response.message)
          loadFetchLocations()
        } else if (response.status != 200) {
          console.log("ℹ️", response.message)
          toast.error(response.message)
          loadFetchLocations()
        }
      } catch (error) {
        console.error(error)
      }
    }
  }

  useEffect(() => {
    loadFetchLocations()
    const counts = countPlantsByLocation(Locations, Plants);
    setplantsCount(counts);
  }, []);

  useEffect(() => {
    loadAuthentication()
  }, [userId])

  return (
    <section className='mt-3 w-full'>
      <div className='flex items-center justify-between w-full border-b pb-2'>
        <div className='flex flex-col items-start w-full'>
          <p className='topic'>Locations</p>
          <p className='text-secondary text-sm'>Manage Your Plants' Locations</p>
        </div>
        <div className='flex items-center justify-center h-full pr-4'>
          <AddLocation userId={userId} />
        </div>
      </div>
      <div className='py-5 w-full'>
        <Table className='w-full'>
          <TableHeader>
            <TableRow>
              <TableHead>Location</TableHead>
              <TableHead>Environment</TableHead>
              <TableHead className='text-center px-5'>Available Plants</TableHead>
              <TableHead className='flex justify-center items-center text-right'>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="w-full">
            {
              isLoading ? <TableRow><TableCell><LocationSkeleton /></TableCell></TableRow> : Locations.length > 0 ? Locations.map((location, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell className='text-left'>
                      <Input defaultValue={location.location} id="location" onChange={(e) => {

                        if (e.target.value.length > 2) {
                          debouncedOnValueChange(location.id, e.target.value, location.environment)
                        }

                      }} />
                    </TableCell>
                    <TableCell className='text-left'>
                      <select name="environment" id="environment" className='flex my-1 p-2 rounded-md border w-full' value={location.environment} onChange={(e) => onValueChange(location.id, location.location, e.target.value)}>
                        <option value="Indoor">Indoor</option>
                        <option value="Outdoor">Outdoor</option>
                      </select>
                    </TableCell>
                    <TableCell className='text-center px-5'>
                      <p>{plantsCount[index] > 0 ? plantsCount[index] : "--"}</p>
                    </TableCell>
                    <TableCell >
                      <div className='flex items-center justify-center'>
                        <DeleteLocation id={location.id} plantsCount={plantsCount[index]} />
                      </div>
                    </TableCell>
                  </TableRow>
                )
              }) : (
                <TableRow>
                  <TableCell colSpan={4} className='text-center text-secondary'>No Locations Found! Please Add Locations.</TableCell>
                </TableRow>
              )
            }

            { }
          </TableBody>
        </Table>
      </div>
    </section>
  )
}

export default Locations