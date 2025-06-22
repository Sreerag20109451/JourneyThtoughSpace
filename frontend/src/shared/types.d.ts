export interface Data {
    center: string;
    date_created: string; // ISO timestamp
    description: string;
    description_508: string;
    keywords: string[];
    media_type: 'image' | 'video' | 'audio'; // assuming these are the types used by NASA API
    nasa_id: string;
    secondary_creator?: string; // optional in case it's sometimes missing
    title: string;
  }
  
  export interface NasaAssetLink {
    href: string;
    rel: string;
    render: string;
    width: number;
    height: number;
    size: number;
  }

 export interface CollectionItems {
    "href": string;
    "data": Data[];
    "links": NasaAssetLink[];

 }

 export interface CollectionLinks {

    "rel": string;
    "prompt": string;
    "href": string;
   
 }

 export interface NasaCollection {
    "version": string;
    "href": string;
    "items": CollectionItems[];
    "metadata": {
        "total_hits": number;
        "description": string;
        "title": string;
    };
    "links": CollectionLinks[];

 }

 export interface NasaImageSearchResponse {
    "collection" : NasaCollection
 }

 export interface CloseApproachData {
   close_approach_date: string; 
   close_approach_date_full: string; 
   epoch_date_close_approach: number; 
   relative_velocity: {
     kilometers_per_second: string;
     kilometers_per_hour: string;
     miles_per_hour: string;
   };
   miss_distance: {
     astronomical: string;
     lunar: string;
     kilometers: string;
     miles: string;
   };
   orbiting_body: string; 
 }

 export interface OrbitClass {
   orbit_class_type: string;
   orbit_class_description: string;
   orbit_class_range: string;
 }
 
 export interface OrbitalData {
   orbit_id: string;
   orbit_determination_date: string; 
   first_observation_date: string;   
   last_observation_date: string;    
   data_arc_in_days: number;
   observations_used: number;
   orbit_uncertainty: string;
   minimum_orbit_intersection: string;
   jupiter_tisserand_invariant: string;
   epoch_osculation: string;
   eccentricity: string;
   semi_major_axis: string;
   inclination: string;
   ascending_node_longitude: string;
   orbital_period: string;
   perihelion_distance: string;
   perihelion_argument: string;
   aphelion_distance: string;
   perihelion_time: string;
   mean_anomaly: string;
   mean_motion: string;
   equinox: string;
   orbit_class: OrbitClass;
 }
 
 export interface DiameterRange {
   estimated_diameter_min: number;
   estimated_diameter_max: number;
 }
 
 export interface EstimatedDiameter {
   kilometers: DiameterRange;
   meters: DiameterRange;
   miles: DiameterRange;
   feet: DiameterRange;
 }

 export interface Links {
   self: string;
 }
 
 export interface NeoLookupResponse {
   links: Links,
   id: string,
   neo_reference_id: string,
   name: string,
   designation: string,
   nasa_jpl_url: string,
   absolute_magnitude_h: number,
   estimated_diameter: EstimatedDiameter,
   is_potentially_hazardous_asteroid : boolean,
   close_approach_data: CloseApproachData[],
   orbital_data: OrbitalData,
   is_sentry_object: boolean,
 }

 export interface NeoMultiplePageLinks{
   next: string | null,
   previous: string | null, 
   self: string
 }


 export interface NeoFeedResponse{
   links: NeoMultiplePageLinks,
   element_count: number,
 near_earth_objects: {
   [date: string]: NeoObject[];
 };
 }


 export interface PageProperties{
     "size": number,
     "total_elements": number,
     "total_pages": number,
     "number": number
   
 }

 export interface NeoBrowseResponse{

   links: NeoMultiplePageLinks,
   page: PageProperties,
   near_earth_objects: NeoLookupResponse[];

 }