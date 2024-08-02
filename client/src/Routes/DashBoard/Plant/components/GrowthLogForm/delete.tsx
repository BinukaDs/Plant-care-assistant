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
import { DeleteGrowthLog } from "@/services/GrowthLogService";
const DeleteLog = ({plantId, index, imageName, userId, loadPlant}: {plantId: string, index: string, imageName:string, userId:string, loadPlant: () => Promise<void>}) => {
    const BASE = useContext(UserContext);

    async function deleteLog() {
        try {
            const response = await DeleteGrowthLog(BASE, plantId, index, imageName, userId)
            console.log("response:",response)
            if (response.status == "200") {
                console.log("✅ Log Deleted Successfully!")
                toast.success("Log Deleted Successfully!")
                loadPlant()  
            } else if (response.status == "401") {
                console.log("ℹ️ Error deleting log")
                toast.error("Error Deleting Log!")
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
                <DialogTrigger><TrashIcon /></DialogTrigger>
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