import ProductFilter from "@/components/common/productFilter"
import ShopingProduct from "@/components/shop-view/product-title"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { sortOptions } from "@/config"
import { ArrowUpDownIcon } from "lucide-react"
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllProductFilter, fetchProductDetails } from '@/store/productSlice'
import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import ProductDetail from "@/components/shop-view/product-detail"
import { addCart, fetchCart } from "@/store/cartSlice"
import { toast } from 'sonner'


function createSearchParamHelper(filterParam) {
  const queryParam = [];

  for (const [key, value] of Object.entries(filterParam)) {
    if (Array.isArray(value) && value.length > 0) {
      const paramValue = value.join(',')

      queryParam.push(`${key}=${encodeURIComponent(paramValue)}`)
    }
    console.log("queryParam", queryParam);
  }
  return queryParam.join('&')
}
const ShopListing = () => {
  const { productList, productDetail } = useSelector(state => state.product)
  const { user } = useSelector((state) => state.auth)
  const [sort, setSort] = useState(null)
  const [filters, setFilters] = useState({})
  const [searchParams, setSearchParams] = useSearchParams()
  const [openProductDetail, setOpenProductDetail] = useState(false)
  const dispatch = useDispatch()

  const handleAddCart = (getCurrentProductId) => {
    dispatch(addCart({ userId: user?.id, productId: getCurrentProductId, quantity: 1 }))
      .then((data) => {
        if (data.payload.success) {
          dispatch(fetchCart(user?.id))
          toast.success("Added product successfully!")
        }
      })
  }
  const handleSort = (value) => {
    setSort(value)
  }

  const handleFilter = (keyItem, option) => {
    const newFilter = { ...filters }
    if (!newFilter[keyItem]) {
      newFilter[keyItem] = [option]
    }
    else {
      const isEsist = newFilter[keyItem].includes(option)
      if (isEsist) {
        newFilter[keyItem] = newFilter[keyItem].filter(item => item != option)
      }
      else {
        newFilter[keyItem].push(option)
      }
    }
    setFilters(newFilter)
    sessionStorage.setItem("filters", JSON.stringify(newFilter))
  }

  function handleCLickProductDetail(getCurrentIdProduct) {
    dispatch(fetchProductDetails(getCurrentIdProduct))
    setOpenProductDetail(true)
  }

  useEffect(() => {
    setSort("price-lowtohigh")
    setFilters(JSON.parse(sessionStorage.getItem("filters")) || {})
  }, [])

  useEffect(() => {
    if (filters && Object.keys(filters).length > 0) {
      const createQueryString = createSearchParamHelper(filters)
      setSearchParams(new URLSearchParams(createQueryString))
    }

  }, [filters])

  useEffect(() => {
    if (filters !== null && sort !== null) {
      dispatch(fetchAllProductFilter({ filterParams: filters, sortParams: sort }))
    }

  }, [dispatch, filters, sort])

  return (
    <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-2 p-4 md:p-6">
      <ProductFilter handleFilter={handleFilter} filters={filters} />
      <div className="w-full rounded-lg">
        <div className="p-4  flex items-center justify-between">
          <h2 className="text-lg font-bold">All Product</h2>
          <div className="flex items-center gap-2">
            <span>{productList.length} products</span>
            <DropdownMenu >
              <DropdownMenuTrigger >
                <Button variant="outline">
                  <ArrowUpDownIcon />
                  <span>Sort by</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                  {sortOptions.map((item) => (
                    <DropdownMenuRadioItem value={item.id} key={item.id}>
                      {item.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>

              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4">
          {productList.map((product) => (<ShopingProduct handleCLickProductDetail={handleCLickProductDetail} handleAddCart={handleAddCart} key={product._id} product={product} />))}
        </div>
      </div>
      <ProductDetail product={productDetail} open={openProductDetail} setOpen={setOpenProductDetail} />
    </div>

  )
}

export default ShopListing