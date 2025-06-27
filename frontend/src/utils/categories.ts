export interface Category {
    id :number,
    name: string;
    searchword: string;
    description: string;
    url: string;

}

export const categories : Category[] = [ { id : 1, url: "/neo", name : "NEO", searchword : "asteroids", description : "NASA's Near-Earth Object (NEO) APIs provide real-time and historical data on asteroids and comets that approach Earth, using observations tracked by NASA's Jet Propulsion Laboratory (JPL)" }]