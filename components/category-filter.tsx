"use client"

import { useState, useEffect } from "react"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

interface CategoryFilterProps {
  categories: Array<{ id: string; name: string; count: number }>
  brands: Array<{ id: string; name: string; count: number }>
  priceRange: [number, number]
  selectedCategory?: string // Added selectedCategory prop to handle URL params
  onCategoryChange: (categories: string[]) => void
  onBrandChange: (brands: string[]) => void
  onPriceChange: (range: [number, number]) => void
}

export function CategoryFilter({
  categories,
  brands,
  priceRange,
  selectedCategory, // Added selectedCategory prop
  onCategoryChange,
  onBrandChange,
  onPriceChange,
}: CategoryFilterProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [currentPriceRange, setCurrentPriceRange] = useState(priceRange)
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(true)
  const [isBrandsOpen, setIsBrandsOpen] = useState(true)
  const [isPriceOpen, setIsPriceOpen] = useState(true)

  useEffect(() => {
    if (selectedCategory && !selectedCategories.includes(selectedCategory)) {
      setSelectedCategories([selectedCategory])
    }
  }, [selectedCategory])

  const handleCategoryToggle = (categoryId: string) => {
    const updated = selectedCategories.includes(categoryId)
      ? selectedCategories.filter((id) => id !== categoryId)
      : [...selectedCategories, categoryId]

    setSelectedCategories(updated)
    onCategoryChange(updated)
  }

  const handleBrandToggle = (brandId: string) => {
    const updated = selectedBrands.includes(brandId)
      ? selectedBrands.filter((id) => id !== brandId)
      : [...selectedBrands, brandId]

    setSelectedBrands(updated)
    onBrandChange(updated)
  }

  const handlePriceChange = (value: number[]) => {
    const range: [number, number] = [value[0], value[1]]
    setCurrentPriceRange(range)
    onPriceChange(range)
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "XAF",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const clearAllFilters = () => {
    setSelectedCategories([])
    setSelectedBrands([])
    setCurrentPriceRange(priceRange)
    onCategoryChange([])
    onBrandChange([])
    onPriceChange(priceRange)
  }

  return (
    <div className="space-y-6">
      {/* Filter Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-serif font-semibold text-lg">Filters</h3>
        <Button variant="ghost" size="sm" onClick={clearAllFilters}>
          Clear All
        </Button>
      </div>

      {/* Categories */}
      <Collapsible open={isCategoriesOpen} onOpenChange={setIsCategoriesOpen}>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="w-full justify-between p-0 h-auto">
            <span className="font-medium">Categories</span>
            <ChevronDown className={`h-4 w-4 transition-transform ${isCategoriesOpen ? "rotate-180" : ""}`} />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-3 mt-3">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center space-x-2">
              <Checkbox
                id={category.id}
                checked={selectedCategories.includes(category.id)}
                onCheckedChange={() => handleCategoryToggle(category.id)}
                className="border-2 border-muted-foreground data-[state=checked]:border-primary data-[state=checked]:bg-primary"
              />
              <Label htmlFor={category.id} className="flex-1 text-sm cursor-pointer flex items-center justify-between">
                <span>{category.name}</span>
                <span className="text-muted-foreground">({category.count})</span>
              </Label>
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>

      {/* Brands */}
      <Collapsible open={isBrandsOpen} onOpenChange={setIsBrandsOpen}>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="w-full justify-between p-0 h-auto">
            <span className="font-medium">Brands</span>
            <ChevronDown className={`h-4 w-4 transition-transform ${isBrandsOpen ? "rotate-180" : ""}`} />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-3 mt-3">
          {brands.map((brand) => (
            <div key={brand.id} className="flex items-center space-x-2">
              <Checkbox
                id={brand.id}
                checked={selectedBrands.includes(brand.id)}
                onCheckedChange={() => handleBrandToggle(brand.id)}
                className="border-2 border-muted-foreground data-[state=checked]:border-primary data-[state=checked]:bg-primary"
              />
              <Label htmlFor={brand.id} className="flex-1 text-sm cursor-pointer flex items-center justify-between">
                <span>{brand.name}</span>
                <span className="text-muted-foreground">({brand.count})</span>
              </Label>
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>

      {/* Price Range */}
      <Collapsible open={isPriceOpen} onOpenChange={setIsPriceOpen}>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="w-full justify-between p-0 h-auto">
            <span className="font-medium">Price Range</span>
            <ChevronDown className={`h-4 w-4 transition-transform ${isPriceOpen ? "rotate-180" : ""}`} />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-4 mt-3">
          <Slider
            value={currentPriceRange}
            onValueChange={handlePriceChange}
            max={priceRange[1]}
            min={priceRange[0]}
            step={1000}
            className="w-full"
          />
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>{formatPrice(currentPriceRange[0])}</span>
            <span>{formatPrice(currentPriceRange[1])}</span>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
}
