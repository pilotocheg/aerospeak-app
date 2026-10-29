// Simplified from AIP AD 2 EPPO 13-1 "VFR arrival and departure routes" (PANSA, AIRAC AMDT 08/26).
// Coordinates are metres from the ARP (52°25'16"N 016°49'35"E), x east, y south (SVG space).
// VFR points come from the AIP coordinate table; CTR and MCTR outlines are traced from the chart (± ~100 m).
import type { AirspaceChartData } from '../types'

export const eppoAirspace: AirspaceChartData = {
  icao: 'EPPO',
  name: 'Poznań-Ławica',
  viewBox: '-27000 -18000 65000 51000',
  runway: 'M-1128 -354 L1128 355',
  areas: [
    {
      label: 'CTR POZNAŃ/Ławica D 2300',
      d: 'M-20546 -14972 L18529 1354 L16651 8933 L-7798 3406 L-24126 -2036 Z',
      labelPosition: {
        x: -13500,
        y: -10300,
        angle: 23,
      },
    },
    {
      label: 'MCTR KRZESINY D 2300',
      d: 'M-7798 3406 L16651 8933 L35206 12763 L30098 30622 L-11160 16909 Z',
      labelPosition: {
        x: 14000,
        y: 24200,
        angle: 18,
      },
    },
  ],
  routes: [
    'M-3960 -9092 L-2433 -5652 L-1980 -2273',
    'M10070 -9982 L4224 -4822 L1377 -1229',
    'M10428 -3532 L4224 -4822',
    'M-14860 2795 L-6827 1474 L-2225 1075',
    'M2301 5928 L2150 2611',
  ],
  towns: [
    {
      label: 'Poznań',
      x: 7134,
      y: 3273,
    },
    {
      label: 'Swarzędz',
      x: 20057,
      y: 134,
    },
    {
      label: 'Luboń',
      x: 2244,
      y: 9458,
    },
    {
      label: 'Mosina',
      x: 3422,
      y: 19128,
    },
    {
      label: 'Kórnik',
      x: 19620,
      y: 18079,
    },
    {
      label: 'Buk',
      x: -20808,
      y: 5934,
    },
    {
      label: 'Kostrzyn',
      x: 27610,
      y: 1309,
    },
  ],
  points: {
    delta: {
      name: 'Delta',
      x: -3960,
      y: -9092,
    },
    echo: {
      name: 'Echo',
      x: 31191,
      y: 23190,
    },
    foxtrot: {
      name: 'Foxtrot',
      x: 2150,
      y: 2611,
    },
    golf: {
      name: 'Golf',
      x: 1377,
      y: -1229,
    },
    hotel: {
      name: 'Hotel',
      x: -1980,
      y: -2273,
    },
    india: {
      name: 'India',
      x: -2225,
      y: 1075,
      labelBearing: 180,
    },
    juliett: {
      name: 'Juliett',
      x: -6827,
      y: 1474,
    },
    kilo: {
      name: 'Kilo',
      x: 23403,
      y: 9921,
    },
    mike: {
      name: 'Mike',
      x: 471,
      y: 20763,
    },
    quebec: {
      name: 'Quebec',
      x: 10070,
      y: -9982,
    },
    romeo: {
      name: 'Romeo',
      x: 15237,
      y: 10136,
    },
    tango: {
      name: 'Tango',
      x: 10428,
      y: -3532,
    },
    uniform: {
      name: 'Uniform',
      x: 2301,
      y: 5928,
    },
    victor: {
      name: 'Victor',
      x: -2433,
      y: -5652,
    },
    'x-ray': {
      name: 'X-ray',
      x: -14860,
      y: 2795,
    },
    yankee: {
      name: 'Yankee',
      x: 4224,
      y: -4822,
    },
    zulu: {
      name: 'Zulu',
      x: 23101,
      y: 28135,
    },
  },
}
