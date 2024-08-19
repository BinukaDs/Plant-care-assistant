import { useState, useEffect, useContext, useRef } from "react";
import { PlantsContext } from "../../DashBoard"
import CreatableSelect from 'react-select/creatable';
import { addLocation } from "@/services/LocationsService";
import { UserContext } from "@/App";

interface Option {
    readonly label: string;
    readonly value: string;
}


const LocationInput = ({ onValueChange }: { onValueChange: (Value: Option | null) => void }) => {


    const { Plants, Locations } = useContext(PlantsContext)
    const BASE = useContext(UserContext)
    const defaultOptions = []
    const [options, setOptions] = useState([]);
    const [value, setValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const createOption = (label: string) => ({
        label,
        value: label.toLowerCase(),
    });

    const filterLocations = () => {
        const uniqueLocations = [...new Set([...Locations, ...Locations])];
         console.log(uniqueLocations)
        uniqueLocations.map((Location) => {
            const newOption = createOption(Location);
            setOptions((prev) => [...prev, newOption]);
        })

    }
    const handleCreate = async (inputValue: string) => {
        setIsLoading(true);
        // setTimeout(() => {
        //     const newOption = createOption(inputValue);
        //     setIsLoading(false);
        //     setOptions((prev) => [...prev, newOption]);
        //     setValue(newOption);
        // }, 500);
        console.log("input:", inputValue)
        await addLocation(BASE, inputValue)
            .then((response) => {
                const newOption = createOption(inputValue);
                setIsLoading(false);
                setOptions((prev) => [...prev, newOption]);
                setValue(newOption);
                console.log(response)
            })
            .catch((error) => {
                console.error("Error adding Location:", error);
                setIsLoading(false)
            });
    };

    useEffect(() => {
        onValueChange(value)
    }, [value])

    const hasRunRef = useRef(false);

    useEffect(() => {
        if (!hasRunRef.current) {
            filterLocations();
            hasRunRef.current = true;
        }
    }, []);
    return (
        <CreatableSelect
            options={options}
            onChange={(newValue) => setValue(newValue)}
            onCreateOption={handleCreate}
            isDisabled={isLoading}
            value={value}
        />
    )
}

export default LocationInput