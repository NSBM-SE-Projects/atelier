const API_BASE_URL = 'http://localhost:8080/api/cart';

// Fetch cart from backend
export async function fetchCart(sessionId) {
  try {
    const response = await fetch(`${API_BASE_URL}/${sessionId}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch cart: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching cart:', error);
    throw error;
  }
}

// Add item to cart
export async function addItemToCart(sessionId, item) {
  try {
    const response = await fetch(`${API_BASE_URL}/${sessionId}/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        productId: item.id,
        quantity: item.quantity,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to add item to cart: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error adding item to cart:', error);
    throw error;
  }
}

// Remove item from cart
export async function removeItemFromCart(sessionId, productId) {
  try {
    const response = await fetch(`${API_BASE_URL}/${sessionId}/remove/${productId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`Failed to remove item from cart: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error removing item from cart:', error);
    throw error;
  }
}

// Update cart item quantity
export async function updateCartItemQuantity(sessionId, productId, quantity) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/${sessionId}/update/${productId}?quantity=${quantity}`,
      {
        method: 'PUT',
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to update cart item: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error updating cart item:', error);
    throw error;
  }
}

// Clear cart
export async function clearCart(sessionId) {
  try {
    const response = await fetch(`${API_BASE_URL}/${sessionId}/clear`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`Failed to clear cart: ${response.statusText}`);
    }
    return response.ok;
  } catch (error) {
    console.error('Error clearing cart:', error);
    throw error;
  }
}
