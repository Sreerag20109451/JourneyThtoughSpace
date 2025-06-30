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
    <thead >
      <tr>
        <th className="text-white text-xl md:text-2xl border-2">Reference Id</th>
        <th className="text-white text-xl md:text-2xl border-2 ">Name</th>
        <th className="text-white text-xl md:text-2xl border-2 ">Magnitude</th>
        <th className="text-white text-xl md:text-2xl border-2 ">Max Diameter(km)</th>
        <th className="text-white text-xl md:text-2xl border-2 ">Min Diameter(km)</th>
      </tr>
    </thead>
    <tbody >

      { neoObjects.map((neo) => (
  <tr>
  <th className="text-sm md:text-md border-1" >{neo.id}</th>
  <td className="text-sm md:text-md border-1">{neo.name}</td>
  <td className="text-sm md:text-md border-1" >{neo.absolute_magnitude_h}</td>
  <td className="text-sm md:text-md border-1">{neo.estimated_diameter.kilometers.estimated_diameter_max}</td>
  <td className="text-sm md:text-md border-1 ">{neo.estimated_diameter.kilometers.estimated_diameter_min}</td>
  <td className="text-sm md:text-md "><a href={neo.nasa_jpl_url}><Chip label="View in JPL"  color="secondary"  ></Chip></a></td>
  <td className="text-sm md:text-md  "><a href={`/neo/${neo.neo_reference_id}`}><Chip label="View in Explorer"  color="primary" ></Chip></a></td>
</tr>
 ))
    
}
    </tbody>
  </table>
</div>

    </main>
)
   
    


}