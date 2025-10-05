import { CART } from "../data/data";

export async function GET(req) {
     try {
   
    const totalItems = CART.reduce((sum, item) => sum + item.quantity, 0);

    return Response.json({
      success: true,
      totalItems,
    });
  } catch (error) {
    console.error("Error fetching total items:", error);
    return Response.json(
      { success: false, message: "Failed to get total cart items" },
      { status: 500 }
    );
  }
} 