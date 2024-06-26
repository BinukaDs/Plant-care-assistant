
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
const Home = () => {
  return (
    <section className='flex justify-center items-center'>
      <div className='container'>
        <Dialog>
          <DialogTrigger>
            <Button>Add Plant</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Plant</DialogTitle>
              <DialogDescription>Fill in the details below to add a plant</DialogDescription>
              <div className="flex items-center space-x-2 my-5">
                <div className="grid flex-1 gap-2">
                  <Label htmlFor="nickname" >
                    NickName
                  </Label>
                  <Input
                    id="nickname"
                    placeholder='Baby Rosa'
                  />
                </div>
                <div className="grid flex-1 gap-2">
                  <Label htmlFor="location" >
                    Location
                  </Label>
                  <Input
                    id="location"
                    placeholder='Living Room'
                  />
                </div>
              </div>
              <div className="w-full">
                <Label htmlFor="location" >
                  Species
                </Label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a fruit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="apple">Apple</SelectItem>
                      <SelectItem value="banana">Banana</SelectItem>
                      <SelectItem value="blueberry">Blueberry</SelectItem>
                      <SelectItem value="grapes">Grapes</SelectItem>
                      <SelectItem value="pineapple">Pineapple</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </DialogHeader>
            <DialogFooter>
              <Button>Add Plant</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  )
}

export default Home