import { Breadcrumbs, Typography } from "@mui/material";
import CategoryGrid from "../components/categoryGrid";
import { categories } from "../utils/categories";

export default function Homepage() {

        return(
            <main className="flex w-full h-full justify-center items-center px-4">
            <div className="w-full">
                <CategoryGrid categories={categories}/>
            </div>
        </main>
        )


}