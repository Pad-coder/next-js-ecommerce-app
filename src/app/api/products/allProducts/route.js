import { PRODUCTS } from "../data/data";

export async function GET() {
  return Response.json(PRODUCTS);
}

