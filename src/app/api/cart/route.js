import { CART } from "./data/data";

export async function GET() {
  try {
    return Response.json(CART)
  } catch (error) {
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { product } = body;

    if (!product?.id) {
      return Response.json(
        { success: false, message: "Product data is required" },
        { status: 400 }
      );
    }

    const existingIndex = CART.findIndex(item => item.id === product.id);

    if (existingIndex !== -1) {
      // ✅ If product already exists, ignore it and return same cart
      return Response.json({
        success: true,
        message: "Product already in cart",
        cart: CART,
      });
    } else {
      // ✅ If product doesn't exist, add it
      CART.push({ ...product, quantity: 1 });
    }

    return Response.json({
      success: true,
      message: "Product added to cart",
      cart: CART,
    });

  } catch (error) {
    console.error("Add to cart failed:", error);
    return Response.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
export async function DELETE(req) {
  try {
    const body = await req.json();
    const { product } = body;

    if (!product) {
      return Response.json({ error: "Product ID is required" }, { status: 400 });
    }

    const index = CART.findIndex(item => item.id === product);
    if (index !== -1) {
      CART.splice(index, 1);  
    } else {
      return Response.json({ error: "Product not found in cart" }, { status: 404 });
    }

    return Response.json(CART);

  } catch (error) {
    console.error("Delete from cart failed:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const body = await req.json();
    const { productId, delta } = body;
    if (!productId || typeof delta !== "number") {
      return Response.json({ error: "productId and delta are required" }, { status: 400 });
    }

    const index = CART.findIndex(item => item.id === productId);

    if (index === -1) {
      return Response.json({ error: "Product not found in cart" }, { status: 404 });
    }

    CART[index].quantity = Math.max(1, CART[index].quantity + delta);

    return Response.json(CART);

  } catch (error) {
    console.error("Error updating quantity:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}