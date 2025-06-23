import { Chip } from "@mui/material";
import type { NeoLookupResponse } from "../shared/types"


interface NeoTableProps {
  neoObjects: NeoLookupResponse[];
}

export const NeoTable = ( { neoObjects} : NeoTableProps ) => {

return (

  <main>
        <div className="overflow-x-auto">
  <table className="table table-xs">
    <thead>
      <tr>
        {/* <th className="text-white text-2xl"></th> */}
        <th className="text-white text-xl md:text-2xl">Reference Id</th>
        <th className="text-white text-xl md:text-2xl">Name</th>
        <th className="text-white text-xl md:text-2xl">Magnitude</th>
        <th></th>
        <th className="text-white text-xl md:text-2xl">Max Diameter(km)</th>
        <th className="text-white text-xl md:text-2xl">Min Diameter(km)</th>
      </tr>
    </thead>
    <tbody>

      { neoObjects.map((neo) => (
  <tr>
  <th className="text-sm md:text-md" >{neo.id}</th>
  <td className="text-sm md:text-md">{neo.name}</td>
  <td className="text-sm md:text-md" >{neo.absolute_magnitude_h}</td>
  <td className="text-sm md:text-md">{neo.is_potentially_hazardous_asteroid}</td>
  <td className="text-sm md:text-md">{neo.estimated_diameter.kilometers.estimated_diameter_max}</td>
  <td className="text-sm md:text-md">{neo.estimated_diameter.kilometers.estimated_diameter_min}</td>
  <td className="text-sm md:text-md"><a href={neo.nasa_jpl_url}><Chip label="View in JPL"  color="secondary"  ></Chip></a></td>
  <td className="text-sm md:text-md"><a href={`/neo/${neo.neo_reference_id}`}><Chip label="View in Explorer"  color="primary" ></Chip></a></td>
</tr>
 ))
    
}
    </tbody>
  </table>
</div>

    </main>
)
   
    


}