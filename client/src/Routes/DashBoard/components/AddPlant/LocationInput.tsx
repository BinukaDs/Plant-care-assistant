import { useState, useEffect, useContext, useRef } from "react";
import { PlantsContext } from "../../DashBoard"
import CreatableSelect from 'react-select/creatable';
import { addLocation } from "@/services/LocationsService";
import { UserContext } from "@/App";

interface Option {
    readonly label: string;
    readonly value: string;
}


const LocationInput = ({ onValueChange }: { onValueChange: (location: string, environment: string | null) => void }) => {

    const { Locations } = useContext(PlantsContext)
    const [options, setOptions] = useState([]);
    const [value, setValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const createOption = (label: string) => ({
        label,
        value: label.toLowerCase(),
    });

    const filterLocations = () => {
        const uniqueLocations = [...new Set([...Locations, ...Locations])];
        //console.log(Locations)
        uniqueLocations.map((Location) => {
            const newOption = createOption(Location.location);
            setOptions((prev) => [...prev, newOption]);
        })

    }
    const handleCreate = async (inputValue: string) => {
        setIsLoading(true);
        console.log("input:", inputValue)
        const newOption = createOption(inputValue);
        setOptions((prev) => [...prev, newOption]);
        setValue(newOption);

    };


    useEffect(() => {
        const matchingObject = Locations.find((Object) => Object.location === value.label);
        if (matchingObject) {
            hasRunfilter.current = true;
            onValueChange(value.label, matchingObject.environment);
        } else {
            onValueChange(value.label, null);
        }
    }, [value])

    const hasRunfilter = useRef(false);

    useEffect(() => {
        if (!hasRunfilter.current) {
            filterLocations();
            hasRunfilter.current = true;
        }
    }, []);
    return (
        <CreatableSelect
            options={options}
            onChange={(newValue) => { setValue(newValue) }}
            onCreateOption={handleCreate}
            isDisabled={isLoading}
            value={value}
        />
    )
}

export default LocationInput