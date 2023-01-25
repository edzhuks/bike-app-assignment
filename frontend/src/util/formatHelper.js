export function metersToKilometers(meters){
    return Math.round((meters / 1000 + Number.EPSILON) * 100) / 100
}

export function secondsToMinutes(seconds){
    return Math.round(seconds / 60)
}