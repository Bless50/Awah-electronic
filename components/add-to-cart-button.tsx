"use client"

import { useState } from "react"
import { ShoppingCart, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/contexts/cart-context"
import { cn } from "@/lib/utils"

interface AddToCartButtonProps {
  product: {
    productId: string
    name: string
    price: number
    image: string
    quantity: number
    inStock: boolean
  }
  variant?: "default" | "icon"
  className?: string
}

export function AddToCartButton({ product, variant = "default", className }: AddToCartButtonProps) {
  const { addItem } = useCart()
  const [isAdding, setIsAdding] = useState(false)
  const [isAdded, setIsAdded] = useState(false)

  const handleAddToCart = async () => {
    if (!product.inStock || isAdding) return

    setIsAdding(true)
    try {
      await addItem(product)
      setIsAdded(true)
      setTimeout(() => setIsAdded(false), 2000)
    } catch (error) {
      console.error("Error adding to cart:", error)
    } finally {
      setIsAdding(false)
    }
  }

  if (variant === "icon") {
    return (
      <Button
        size="icon"
        variant="secondary"
        className={cn("h-8 w-8", className)}
        onClick={handleAddToCart}
        disabled={!product.inStock || isAdding}
      >
        {isAdding ? (
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
        ) : isAdded ? (
          <Check className="h-4 w-4" />
        ) : (
          <ShoppingCart className="h-4 w-4" />
        )}
      </Button>
    )
  }

  return (
    <Button
      className={className}
      onClick={handleAddToCart}
      disabled={!product.inStock || isAdding}
      variant={product.inStock ? "default" : "secondary"}
    >
      {isAdding ? (
        <>
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
          Adding...
        </>
      ) : isAdded ? (
        <>
          <Check className="h-4 w-4 mr-2" />
          Added to Cart
        </>
      ) : product.inStock ? (
        <>
          <ShoppingCart className="h-4 w-4 mr-2" />
          Add to Cart
        </>
      ) : (
        "Out of Stock"
      )}
    </Button>
  )
}
