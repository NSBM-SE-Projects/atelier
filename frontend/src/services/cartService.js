import api from '@/lib/api';

// Fetch cart from backend
export async function fetchCart(sessionId) {
  try {
    const response = await api.get(`/cart/${sessionId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching cart:', error);
    throw error;
  }
}

// Add item to cart
export async function addItemToCart(sessionId, item) {
  try {
    const response = await api.post(`/cart/${sessionId}/add`, {
      productId: item.id,
      quantity: item.quantity,
    });
    return response.data;
  } catch (error) {
    console.error('Error adding item to cart:', error);
    throw error;
  }
}

// Remove item from cart
export async function removeItemFromCart(sessionId, productId) {
  try {
    const response = await api.delete(`/cart/${sessionId}/remove/${productId}`);
    return response.data;
  } catch (error) {
    console.error('Error removing item from cart:', error);
    throw error;
  }
}

// Update cart item quantity
export async function updateCartItemQuantity(sessionId, productId, quantity) {
  try {
    const response = await api.put(`/cart/${sessionId}/update/${productId}?quantity=${quantity}`);
    return response.data;
  } catch (error) {
    console.error('Error updating cart item:', error);
    throw error;
  }
}

// Clear cart
export async function clearCart(sessionId) {
  try {
    await api.delete(`/cart/${sessionId}/clear`);
    return true;
  } catch (error) {
    console.error('Error clearing cart:', error);
    throw error;
  }
}
