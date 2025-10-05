import { CART } from "../data/data";

export async function GET() {
   try {
    const total = CART.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return Response.json({
      success: true,
      total,
    });
  } catch (error) {
    return Response.json(
      { success: false, message: "Error calculating total", error: error.message },
      { status: 500 }
    );
  }
}