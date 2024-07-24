import { useNavigate } from "react-router-dom";
import { SlOptionsVertical } from "react-icons/sl";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { useContext } from "react";
import { UserContext } from "@/App";
const Menu = ({ plantId }) => {
    const BASE = useContext(UserContext);
    const navigate = useNavigate()

    function deletePlant() {
        fetch(BASE + "/plants/delete", {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ plantId: plantId })
        }).then(res => {
            if (res.ok) {
                console.log("Plant Deleted!")
                window.location.reload()
            }
            return res.json();
        }).then(data => {
            console.log(data)

        })
    }

    return (
        <div>
            <Dialog>
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <SlOptionsVertical />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DialogTrigger asChild>
                            <DropdownMenuLabel>
                                <button>
                                    Delete Plant
                                </button>
                            </DropdownMenuLabel>
                        </DialogTrigger>
                    </DropdownMenuContent>
                </DropdownMenu>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Are you sure?</DialogTitle>
                        <DialogDescription>
                            This action cannot be undone. This will permanently delete this plant from our servers.
                        </DialogDescription>
                        <div className="flex w-full gap-6">
                            <Button onClick={deletePlant} variant={"destructive"} className="w-full">Yes</Button>
                            <DialogClose className="w-full"><Button variant={"outline"} className="w-full">No</Button></DialogClose>
                        </div>
                    </DialogHeader>
                </DialogContent>
            </Dialog >
        </div>
    )
}

export default Menu