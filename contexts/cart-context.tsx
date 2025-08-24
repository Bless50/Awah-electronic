"use client"

import type React from "react"
import { createContext, useContext, useReducer, useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"

interface CartItem {
  id: string
  productId: string
  name: string
  price: number
  image: string
  quantity: number
  inStock: boolean
}

interface CartState {
  items: CartItem[]
  total: number
  itemCount: number
  isLoading: boolean
}

type CartAction =
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_CART"; payload: CartItem[] }
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "UPDATE_QUANTITY"; payload: { id: string; quantity: number } }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "CLEAR_CART" }

const initialState: CartState = {
  items: [],
  total: 0,
  itemCount: 0,
  isLoading: false,
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, isLoading: action.payload }

    case "SET_CART":
      const items = action.payload
      return {
        ...state,
        items,
        total: items.reduce((sum, item) => sum + item.price * item.quantity, 0),
        itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
        isLoading: false,
      }

    case "ADD_ITEM":
      const existingItem = state.items.find((item) => item.productId === action.payload.productId)
      let updatedItems: CartItem[]

      if (existingItem) {
        updatedItems = state.items.map((item) =>
          item.productId === action.payload.productId
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item,
        )
      } else {
        updatedItems = [...state.items, action.payload]
      }

      return {
        ...state,
        items: updatedItems,
        total: updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
        itemCount: updatedItems.reduce((sum, item) => sum + item.quantity, 0),
      }

    case "UPDATE_QUANTITY":
      const itemsAfterUpdate = state.items.map((item) =>
        item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item,
      )

      return {
        ...state,
        items: itemsAfterUpdate,
        total: itemsAfterUpdate.reduce((sum, item) => sum + item.price * item.quantity, 0),
        itemCount: itemsAfterUpdate.reduce((sum, item) => sum + item.quantity, 0),
      }

    case "REMOVE_ITEM":
      const itemsAfterRemoval = state.items.filter((item) => item.id !== action.payload)

      return {
        ...state,
        items: itemsAfterRemoval,
        total: itemsAfterRemoval.reduce((sum, item) => sum + item.price * item.quantity, 0),
        itemCount: itemsAfterRemoval.reduce((sum, item) => sum + item.quantity, 0),
      }

    case "CLEAR_CART":
      return {
        ...state,
        items: [],
        total: 0,
        itemCount: 0,
      }

    default:
      return state
  }
}

interface CartContextType extends CartState {
  addItem: (item: Omit<CartItem, "id">) => Promise<void>
  updateQuantity: (id: string, quantity: number) => Promise<void>
  removeItem: (id: string) => Promise<void>
  clearCart: () => Promise<void>
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState)
  const [isHydrated, setIsHydrated] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    setIsHydrated(true)
    loadCart()
  }, [])

  // Save cart to localStorage whenever it changes (only after hydration)
  useEffect(() => {
    if (isHydrated && state.items.length >= 0) {
      saveCart()
    }
  }, [state.items, isHydrated])

  const loadCart = async () => {
    try {
      dispatch({ type: "SET_LOADING", payload: true })

      // Only access localStorage on client side
      if (typeof window !== 'undefined') {
        const savedCart = localStorage.getItem("awah-cart")
        if (savedCart) {
          const cartItems = JSON.parse(savedCart)
          dispatch({ type: "SET_CART", payload: cartItems })
        }
      }
      
      dispatch({ type: "SET_LOADING", payload: false })
    } catch (error) {
      console.error("Error loading cart:", error)
      dispatch({ type: "SET_LOADING", payload: false })
    }
  }

  const saveCart = async () => {
    try {
      // Save to localStorage as fallback (only on client side)
      if (typeof window !== 'undefined') {
        localStorage.setItem("awah-cart", JSON.stringify(state.items))
      }

      // TODO: Save to Supabase when user is authenticated
      // const { data: { user } } = await supabase.auth.getUser()
      // if (user) {
      //   await supabase.from('cart_items').upsert(...)
      // }
    } catch (error) {
      console.error("Error saving cart:", error)
    }
  }

  const addItem = async (item: Omit<CartItem, "id">) => {
    // Check if item already exists in cart
    const existingItemIndex = state.items.findIndex((i) => i.productId === item.productId)

    if (existingItemIndex > -1) {
      // Update quantity of existing item
      const updatedItems = [...state.items]
      updatedItems[existingItemIndex].quantity += item.quantity
      dispatch({ type: "SET_CART", payload: updatedItems })
    } else {
      // Add new item with consistent ID generation
      const cartItem: CartItem = {
        ...item,
        id: `${item.productId}-${Math.random().toString(36).substr(2, 9)}`,
      }
      dispatch({ type: "ADD_ITEM", payload: cartItem })
    }
  }

  const updateQuantity = async (id: string, quantity: number) => {
    if (quantity <= 0) {
      await removeItem(id)
      return
    }
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } })
  }

  const removeItem = async (id: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: id })
  }

  const clearCart = async () => {
    dispatch({ type: "CLEAR_CART" })
    if (typeof window !== 'undefined') {
      localStorage.removeItem("awah-cart")
    }
  }

  // Prevent hydration mismatch by not rendering children until hydrated
  if (!isHydrated) {
    return (
      <CartContext.Provider
        value={{
          ...initialState,
          addItem: async () => {},
          updateQuantity: async () => {},
          removeItem: async () => {},
          clearCart: async () => {},
        }}
      >
        {children}
      </CartContext.Provider>
    )
  }

  return (
    <CartContext.Provider
      value={{
        ...state,
        addItem,
        updateQuantity,
        removeItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
