# Aerodrome facts used in scenarios

Scenarios use only the facts below. Items marked **unverified** are placeholders that must
be checked against the current Polish AIP (or provided by the team) before release.
After a fact changes, update the scenarios that use it and run `npm run content:check`.

As of 2026-10-18.

## Aircraft

| Item | Value |
| --- | --- |
| Registration | SP-TFA (Sierra Papa Tango Foxtrot Alpha) |
| Type | Cessna 172 |

## EPPO — Poznań-Ławica (controlled)

| Item | Value | Status |
| --- | --- | --- |
| Runway | 10/28, 2504 × 50 m | [learn-atc](https://www.learn-atc.com/tools/aerodrome/EPPO) |
| Runway in use in scenarios | 28 | assumption (westerly wind) |
| Poznań Delivery | 121.805 | [learn-atc](https://www.learn-atc.com/tools/aerodrome/EPPO), [PLVACC](https://plvacc.pl/pilots/airports/EPPO) |
| Poznań Ground | 124.140 | [PLVACC](https://plvacc.pl/pilots/airports/EPPO) |
| Poznań Tower | 119.980 | [learn-atc](https://www.learn-atc.com/tools/aerodrome/EPPO), [PLVACC](https://plvacc.pl/pilots/airports/EPPO) |
| Poznań Approach | 128.925 | [learn-atc](https://www.learn-atc.com/tools/aerodrome/EPPO) |
| ATIS | 124.705 | [learn-atc](https://www.learn-atc.com/tools/aerodrome/EPPO) |
| Transition altitude | 6500 ft | [PLVACC](https://plvacc.pl/pilots/airports/EPPO) |
| GA parking | "general aviation apron" | **unverified** name |
| Taxiways | Alpha (apron ↔ holding point runway 28, runway exit) | **unverified** |
| CTR entry/exit points | November (north), Whiskey (west) | **unverified** |
| Pattern | right-hand circuit runway 28 | **unverified** |

## EPPI — Piła (uncontrolled, A/G radio)

| Item | Value | Status |
| --- | --- | --- |
| Station | Piła Radio, 122.405 | [dlapilota.pl](https://dlapilota.pl/wiadomosci/aeroklub-ziemi-pilskiej/od-nowego-roku-nowa-czestotliwosc-operacyjna-na-ladowisku-pila-ep) |
| Runway | 03/21 concrete, 2400 × 60 m | [Aeroklub Ziemi Pilskiej](https://www.azp.pila.pl/lotnisko/) |
| Runway in use in scenarios | 21 | assumption |
| Taxiways | not named in scenarios ("apron", "holding point runway 21") | **unverified** |
| Pattern | circuit side not specified in scenarios | **unverified** |

## En route

| Item | Value | Status |
| --- | --- | --- |
| FIS | Poznań Information | **unverified** name, frequency not used |
| Reporting point | Oborniki (town between Piła and Poznań) | **unverified** as a VFR point |
| VFR squawk assigned by FIS | 5201 | example value |
