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
        <th className="text-white text-xl md:text-2xl">Dangerous</th>
        <th></th>
        <th className="text-white text-xl md:text-2xl">Max Diameter(km)</th>
        <th className="text-white text-xl md:text-2xl">Min Diameter(km)</th>
      </tr>
    </thead>
    <tbody>

      { neoObjects.map((neo) => (
  <tr>
  <th className="text-md md:text-xl" >{neo.id}</th>
  <td className="text-md md:text-xl">{neo.name}</td>
  <td className="text-md md:text-xl" >{neo.absolute_magnitude_h}</td>
  <td className="text-md md:text-xl">{neo.is_potentially_hazardous_asteroid}</td>
  <td className="text-md md:text-xl">{neo.estimated_diameter.kilometers.estimated_diameter_max}</td>
  <td className="text-md md:text-xl">{neo.estimated_diameter.kilometers.estimated_diameter_min}</td>
  <td className="text-md md:text-xl"><a href={neo.nasa_jpl_url} >JPL Link</a></td>
  <td className="text-md md:text-xl"><a href={`/neo/${neo.neo_reference_id}`}>Details</a></td>
</tr>
 ))
    
}
    </tbody>
  </table>
</div>

    </main>
)
   
    


}