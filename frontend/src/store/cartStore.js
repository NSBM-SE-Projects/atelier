import { create } from 'zustand';

export const useCartStore = create((set, get) => ({
  items: [
    {
      id: 1,
      name: "Men's Button-Up Shirt",
      price: 35.0,
      image: null,
      size: 'M',
      quantity: 1,
      selected: true
    },
    {
      id: 2,
      name: 'Black Heels',
      price: 50.0,
      image: null,
      size: '38',
      quantity: 1,
      selected: true
    },
    {
      id: 3,
      name: 'Gold Luxury Watches Classic for Men',
      price: 40.0,
      image: null,
      size: 'One Size',
      quantity: 1,
      selected: false
    },
    {
      id: 4,
      name: "Women's Fashionable Casual Sports White Shoes",
      price: 35.0,
      image: null,
      size: '36',
      quantity: 1,
      selected: false
    },
    {
      id: 5,
      name: "Men's Casual Comfortable Crew Neck Short Sleeve T-Shirt",
      price: 20.0,
      image: null,
      size: 'L',
      quantity: 1,
      selected: false
    },
    {
      id: 6,
      name: 'Rose Off-Shoulder Ruffle Romantic Dresses For Women',
      price: 45.0,
      image: null,
      size: 'M',
      quantity: 1,
      selected: false
    },
    {
      id: 7,
      name: 'Medium Almond Nails',
      price: 18.0,
      image: null,
      size: '10pcs',
      quantity: 1,
      selected: false
    }
  ],

  // Add item to cart
  addToCart: (item) =>
    set((state) => {
      const existingItem = state.items.find((i) => i.id === item.id);
      if (existingItem) {
        return {
          items: state.items.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
          )
        };
      }
      return { items: [...state.items, { ...item, quantity: 1, selected: true }] };
    }),

  // Remove item from cart
  removeFromCart: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id)
    })),

  // Update item quantity
  updateQuantity: (id, quantity) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    })),

  // Toggle item selection
  toggleSelection: (id) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    })),

  // Clear cart
  clearCart: () => set({ items: [] }),

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
