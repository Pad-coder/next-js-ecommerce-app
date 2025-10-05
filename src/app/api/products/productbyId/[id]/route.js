import { PRODUCTS } from "@/app/api/products/data/data";

export async function GET(request, { params }) {
  const { id } = params;

  const product = PRODUCTS.find(p => p.id === parseInt(id));

  return Response.json(product);
}