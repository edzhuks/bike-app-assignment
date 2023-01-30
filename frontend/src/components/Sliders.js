import {useState} from "react";
import {Box, Slider, Typography} from "@mui/material";

const DistanceSlider = ({updateValue}) => {
    const [internalValue, setInternalValue] = useState([0, 5])

    const handleSmallChange = (e, newValue) => {
        setInternalValue(newValue)
    }
    const calculateValue = (value) => {
        if (value === 0) return "0m"
        let scaled = 10 ** value
        if (scaled > 1000) {
            return `${(scaled / 1000).toFixed(2)}km`
        } else {
            return `${scaled.toFixed(2)}m`
        }
    }

    return (
        <Box sx={{px: 2}}>
            <Typography variant="caption">
                Filter distance
            </Typography>
            <Slider
                getAriaLabel={() => 'Distance range'}
                value={internalValue}
                onChange={handleSmallChange}
                onChangeCommitted={updateValue}
                valueLabelDisplay="auto"
                valueLabelFormat={calculateValue}
                marks={[{
                    value: 0, label: '0m',
                }, {
                    value: 1, label: '10m',
                }, {
                    value: 2, label: '100m',
                }, {
                    value: 3, label: '1km',
                }, {
                    value: 4, label: '10km',
                }, {
                    value: 5, label: '100km+',
                }]}
                min={0}
                step={0.001}
                max={5}
            />
        </Box>)
}

const DurationSlider = ({updateValue}) => {
    const [internalValue, setInternalValue] = useState([0, 3])

    const handleSmallChange = (e, newValue) => {
        setInternalValue(newValue)
    }
    const calculateValue = (value) => {
        if (value === 0) return "0s"
        let scaled = 60 ** value
        if (scaled > 3600) {
            return `${(scaled / 3600).toFixed(2)}h`
        }
        if (scaled > 60) {
            return `${(scaled / 60).toFixed(2)}min`
        } else {
            return `${scaled.toFixed(2)}s`
        }
    }

    return (
        <Box sx={{px: 2}}>
            <Typography variant="caption">
                Filter duration
            </Typography>
            <Slider
                getAriaLabel={() => 'Duration range'}
                value={internalValue}
                onChange={handleSmallChange}
                onChangeCommitted={updateValue}
                valueLabelDisplay="auto"
                valueLabelFormat={calculateValue}
                marks={[{
                    value: 0, label: '0s',
                }, {
                    value: 1, label: '1min',
                }, {
                    value: 2, label: '1h',
                }, {
                    value: 3, label: '60h+',
                }]}
                min={0}
                step={0.001}
                max={3}
            />
        </Box>)
}

export {DurationSlider, DistanceSlider}