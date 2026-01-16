import { create } from 'zustand';
import * as cartService from '../services/cartService';
import { getSessionId } from '../utils/session';

export const useCartStore = create((set, get) => ({
  items: [],
  loading: false,
  error: null,

  // Set loading state
  setLoading: (loading) => set({ loading }),

  // Set error state
  setError: (error) => set({ error }),

  // Fetch cart from backend
  fetchCart: async () => {
    set({ loading: true, error: null });
    try {
      const sessionId = getSessionId();
      const cart = await cartService.fetchCart(sessionId);

      // Map backend cart items to frontend format
      const mappedItems = cart.items.map((item) => ({
        id: item.productId,
        name: item.productName,
        price: Number.parseFloat(item.unitPrice),
        image: item.imageUrl,
        size: item.size,
        color: item.color,
        quantity: item.quantity,
        selected: true, // Default to selected
      }));

      set({ items: mappedItems, loading: false });
    } catch (err) {
      console.error('Error fetching cart:', err);
      set({ error: err.message, loading: false });
    }
  },

  // Add item to cart
  addToCart: async (item) => {
    set({ loading: true, error: null });
    try {
      const sessionId = getSessionId();
      const updatedCart = await cartService.addItemToCart(sessionId, item);

      // Map and update items from response
      const mappedItems = updatedCart.items.map((cartItem) => ({
        id: cartItem.productId,
        name: cartItem.productName,
        price: Number.parseFloat(cartItem.unitPrice),
        image: cartItem.imageUrl,
        size: cartItem.size,
        color: cartItem.color,
        quantity: cartItem.quantity,
        selected: true,
      }));

      set({ items: mappedItems, loading: false });
    } catch (err) {
      console.error('Error adding to cart:', err);
      set({ error: err.message, loading: false });
    }
  },

  // Remove item from cart
  removeFromCart: async (productId) => {
    set({ loading: true, error: null });
    try {
      const sessionId = getSessionId();
      const updatedCart = await cartService.removeItemFromCart(sessionId, productId);

      // Map and update items from response
      const mappedItems = updatedCart.items.map((item) => ({
        id: item.productId,
        name: item.productName,
        price: Number.parseFloat(item.unitPrice),
        image: item.imageUrl,
        size: item.size,
        color: item.color,
        quantity: item.quantity,
        selected: true,
      }));

      set({ items: mappedItems, loading: false });
    } catch (err) {
      console.error('Error removing from cart:', err);
      set({ error: err.message, loading: false });
    }
  },

  // Update item quantity
  updateQuantity: async (productId, quantity) => {
    set({ loading: true, error: null });
    try {
      const sessionId = getSessionId();
      const updatedCart = await cartService.updateCartItemQuantity(sessionId, productId, quantity);

      // Map and update items from response
      const mappedItems = updatedCart.items.map((item) => ({
        id: item.productId,
        name: item.productName,
        price: Number.parseFloat(item.unitPrice),
        image: item.imageUrl,
        size: item.size,
        color: item.color,
        quantity: item.quantity,
        selected: true,
      }));

      set({ items: mappedItems, loading: false });
    } catch (err) {
      console.error('Error updating quantity:', err);
      set({ error: err.message, loading: false });
    }
  },

  // Toggle item selection
  toggleSelection: (id) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    })),

  // Clear cart
  clearCart: async () => {
    set({ loading: true, error: null });
    try {
      const sessionId = getSessionId();
      await cartService.clearCart(sessionId);
      set({ items: [], loading: false });
    } catch (err) {
      console.error('Error clearing cart:', err);
      set({ error: err.message, loading: false });
    }
  },

  // Get selected items
  getSelectedItems: () => {
    const state = get();
    return state.items.filter((item) => item.selected);
  },

  // Get total price of selected items
  getTotal: () => {
    const state = get();
    return state.items
      .filter((item) => item.selected)
      .reduce((total, item) => total + item.price * item.quantity, 0);
  },

  // Get discount (10% of total)
  getDiscount: () => {
    const state = get();
    const total = state.items
      .filter((item) => item.selected)
      .reduce((total, item) => total + item.price * item.quantity, 0);
    return Math.round(total * 0.1 * 100) / 100;
  },

  // Get final total (total - discount)
  getFinalTotal: () => {
    const state = get();
    const total = state.items
      .filter((item) => item.selected)
      .reduce((total, item) => total + item.price * item.quantity, 0);
    const discount = Math.round(total * 0.1 * 100) / 100;
    return Math.round((total - discount) * 100) / 100;
  },

  // Get count of selected items
  getSelectedCount: () => {
    const state = get();
    return state.items.filter((item) => item.selected).length;
  }
}));
