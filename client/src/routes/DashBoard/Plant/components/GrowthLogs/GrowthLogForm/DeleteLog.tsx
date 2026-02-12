import { TrashIcon } from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose
} from "@/components/ui/dialog"
import { toast } from "sonner";
import { useContext } from "react";
import { UserContext } from "@/App";
import { DeleteGrowthLog } from "@/services/GrowthLog.service";
import { responseDataTypes } from "@/types/Plant";
const DeleteLog = ({ plantId, index, imageName, userId, loadPlant }: { plantId: string, index: number, imageName: string, userId: string, loadPlant: () => Promise<void> }) => {
    const BASE = useContext(UserContext);

    async function deleteLog() {
        try {
            const response:responseDataTypes = await DeleteGrowthLog(BASE, plantId, index, imageName, userId)
            console.log("response:", response)
            if (response.status == 200) {
                console.log("✅", response.message)
                toast.success(response.message)
                loadPlant()
            } else if (response.status == 401) {
                console.log("ℹ️", response.message)
                toast.error(response.message)
                loadPlant()
            }
            console.log(response)
        } catch (error) {
            console.log("Error deleting Log!", error)

        }
    }

    return (
        <div>
            <Dialog>
                <DialogTrigger><TrashIcon className="text-destructive"/></DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Are you sure?</DialogTitle>
                        <DialogDescription>
                            This action cannot be undone. This will permanently delete this record from our servers.
                        </DialogDescription>
                        <div className="flex w-full gap-6">
                            <Button type="submit" onClick={deleteLog} variant={"destructive"} className="w-full">Yes</Button>
                            <DialogClose className="w-full"><Button variant={"outline"} className="w-full">No</Button></DialogClose>
                        </div>
                    </DialogHeader>
                </DialogContent>
            </Dialog >
        </div>
    )
}

export default DeleteLog