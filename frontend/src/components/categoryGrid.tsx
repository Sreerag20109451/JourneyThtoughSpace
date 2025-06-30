import {  Grid } from "@mui/material";
import type { Category } from "../utils/categories";
import CategoryCard from "./categoryCard";

interface CategoryGridProps {
  categories: Category[];
}

export default function CategoryGrid({ categories }: CategoryGridProps) {




    return (
  
      <>
   
      <Grid container spacing={{xs : 2, sm: 4, md :8, lg:24}} sx={{ justifyContent: 'center' }}>
        {categories.map((category) => (
          <Grid size={{ xs: 12, sm: 8, md: 6, lg: 3 }} key={category.id}>
            <CategoryCard
              name={category.name}
              url={category.url}
              searchWord={category.searchword}
              description={category.description}
            />
          </Grid>
        ))}
      </Grid>

      </>
      
    );
  }