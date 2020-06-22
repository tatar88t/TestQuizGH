import {useState, useEffect} from 'react';


function useDebounced(value, timeout) {
    let [debouncedValue, setDebouncedValue] = useState(value)

    useEffect(() => {
        let timeOutFunc = setTimeout(() => {
            setDebouncedValue(value)
        }, timeout)

        return() => {
            clearTimeout(timeOutFunc)
        }
    }, [value, timeout])
    return debouncedValue
}

export default useDebounced;