import React, { useEffect } from 'react'
import { Button } from '@/components/ui/button';
import { LiaCheckSolid, LiaPenSolid } from "react-icons/lia";

const UpdateLocation = ({ id, setUpdate }: { id: string, setUpdate:() => void }) => {
    
    return (
        <Button variant={"ghost"} onClick={() => setUpdate(true)}>
            <LiaPenSolid />
        </Button>
    )
}

export default UpdateLocation