// Simplified from AIP VFR AD 4 EPPI 4-1 "Visual operation chart" (PANSA, AIRAC AMDT VFR 04/26).
// Coordinates are metres from the aerodrome symbol, x east, y south (SVG space).
// The AIP has no coordinate table for EPPI: points are read off the 1:250 000 chart (± ~300 m).
import type { AirspaceChartData } from '../types'

export const eppiAirspace: AirspaceChartData = {
  icao: 'EPPI',
  name: 'Piła',
  viewBox: '-10000 -9000 20000 17000',
  runway: 'M-641 912 L641 -912',
  areas: [
    {
      label: 'FIS GDAŃSK 125.275 / FIS POZNAŃ 126.300',
      d: 'M-15130 -303 L-1602 -7035 L13160 -455',
      labelPosition: {
        x: -6500,
        y: -5600,
        angle: -26,
      },
    },
  ],
  routes: ['M-3939 -2792 L0 0', 'M5195 -5411 L0 0', 'M-4221 4416 L0 0'],
  towns: [
    {
      label: 'Piła',
      x: 3100,
      y: 0,
    },
    {
      label: 'Szydłowo',
      x: -5850,
      y: 1230,
    },
    {
      label: 'Zawada',
      x: -3940,
      y: -1500,
    },
    {
      label: 'Kotuń',
      x: -4300,
      y: 6100,
    },
  ],
  points: {
    zulu: {
      name: 'Zulu',
      x: -3939,
      y: -2792,
    },
    delta: {
      name: 'Delta',
      x: 5195,
      y: -5411,
    },
    kilo: {
      name: 'Kilo',
      x: -4221,
      y: 4416,
    },
  },
}
