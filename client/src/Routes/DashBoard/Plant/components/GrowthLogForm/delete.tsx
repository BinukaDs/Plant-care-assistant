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
import { useContext } from "react";
import { UserContext } from "@/App";

const DeleteLog = ({ plantId, index, imageName, userId }) => {
    const BASE = useContext(UserContext);
    function deleteLog() {
        fetch(BASE + "/growthlogs/delete", {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId: userId, plantId: plantId, index: index, imageName: imageName })
        }).then(res => {
            if (res.ok) {
                console.log("Log Deleted!")
                window.location.reload()
            }
            return res.json();

        }).catch((err) => {
            console.log(err)

        })
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
                            <Button onClick={deleteLog} variant={"destructive"} className="w-full">Yes</Button>
                            <DialogClose className="w-full"><Button variant={"outline"} className="w-full">No</Button></DialogClose>
                        </div>
                    </DialogHeader>
                </DialogContent>
            </Dialog >
        </div>
    )
}

export default DeleteLog