import { PRODUCTS } from "../../data/data";

export async function GET(req, { params }) {
  const { category } = params;
  console.log(category);
  

  if (!category || category === "all") {
    return Response.json(PRODUCTS);
  }

  const filteredProducts = PRODUCTS.filter(
    (product) => product.category.toLowerCase() === category.toLowerCase()
  );

  return Response.json(filteredProducts);
}
