import { CART } from "../data/data";

export async function DELETE() {
  try {
    
    CART.length = 0;

    return Response.json({
      success: true,
      message: "Cart cleared successfully!",
      cart: CART,
    });
  } catch (error) {
    return Response.json(
      { success: false, message: "Failed to clear cart", error: error.message },
      { status: 500 }
    );
  }
}
