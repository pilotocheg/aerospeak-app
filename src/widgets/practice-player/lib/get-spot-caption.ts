/** "Holding point A", or "Holding point A (off chart)" when the chart has no such spot. */
export const getSpotCaption = (caption: string, isOnChart: boolean) => (isOnChart ? caption : `${caption} (off chart)`)
