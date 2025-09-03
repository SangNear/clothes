import React, { useEffect, useRef, useState } from 'react'
import banner1 from "../../assets/banner/banner-1.webp"
import banner2 from "../../assets/banner/banner-2.webp"
import banner3 from "../../assets/banner/banner-3.webp"
import { Button } from '@/components/ui/button'
import { Atom, BabyIcon, ChevronLeft, ChevronRight, CloudLightning, Disc, Drill, Droplet, Flower, Landmark, ShirtIcon, UmbrellaIcon, WatchIcon } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllProductFilter } from '@/store/productSlice'
import ShopingProduct from '@/components/shop-view/product-title'
import { useNavigate } from 'react-router-dom'
import { addCart, fetchCart } from '@/store/cartSlice'
import { toast } from 'sonner'
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger)
const HomePage = () => {
  const cardsRef = useRef([]);
  const cardsRef2 = useRef([]);
  const banners = [banner1, banner2, banner3]
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { productList, productDetail } = useSelector((state) => state.product)
  const { user } = useSelector((state) => state.auth)
  const category = [
    { id: "men", label: "Men", icon: ShirtIcon },
    { id: "women", label: "Women", icon: CloudLightning },
    { id: "kids", label: "Kids", icon: BabyIcon },
    { id: "accessories", label: "Accessories", icon: WatchIcon },
    { id: "footwear", label: "Footwear", icon: UmbrellaIcon },
  ]
  const brand = [
    { id: "nike", label: "Nike", icon: Atom },
    { id: "adidas", label: "Adidas", icon: Drill },
    { id: "puma", label: "Puma", icon: Disc },
    { id: "levi", label: "Levi's", icon: Droplet },
    { id: "zara", label: "Zara", icon: Flower },
    { id: "h&m", label: "H&M", icon: Landmark },
  ]
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    gsap.fromTo(
      cardsRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.1,
        stagger: 0.2, // từng card xuất hiện cách nhau 0.2s
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardsRef.current[0]?.parentNode, // trigger toàn bộ grid
          start: "top 85%", // khi grid vào 85% viewport
        },
      }
    );
     gsap.fromTo(
      cardsRef2.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.1,
        stagger: 0.2, // từng card xuất hiện cách nhau 0.2s
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardsRef2.current[0]?.parentNode, // trigger toàn bộ grid
          start: "top 85%", // khi grid vào 85% viewport
        },
      }
    );
  }, []);


  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % banners.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    dispatch(fetchAllProductFilter({ filterParams: {}, sortParams: "price-lowtohigh" }))
  }, [dispatch])


  function handleNagativeOnlisting(item, section) {
    console.log("listing navigate:", { item, section });
    sessionStorage.removeItem('filters')
    const currentFilters = {
      [section]: [item]
    }
    sessionStorage.setItem('filters', JSON.stringify(currentFilters))
    navigate(`/shop/listing`)
  }
  function handleAddCart(productId) {
    dispatch(addCart({ userId: user?.id, productId: productId, quantity: 1 }))
      .then((data) => {
        if (data.payload.success) {
          dispatch(fetchCart(user?.id))
          toast.success("Added product successfully!")
        }
      })
  }
  function handleCLickProductDetail(productId) {
    console.log("productId:", productId);
  }

  return (
    <div className='flex flex-col min-h-screen'>
      <div className='relative w-full h-[200px] sm:h-[300px] md:h-[500px] lg:h-[700px]'>
        {banners.map((banner, index) => (
          <img
            src={banner}
            key={index}
            alt=""
            className={`${index === currentSlide ? "opacity-100" : "opacity-0"} absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`}
          />
        ))}
        <Button
          onClick={() => setCurrentSlide((prevSlide) => (prevSlide - 1 + banners.length) % banners.length)}
          variant='outline'
          className="absolute top-1/2 left-5 -translate-y-1/2 z-10"
        >
          <ChevronLeft />
        </Button>

        <Button
          variant='outline'
          onClick={() => setCurrentSlide((prevSlide) => (prevSlide + 1) % banners.length)}
          className="absolute top-1/2 right-5 -translate-y-1/2 z-10"
        >
          <ChevronRight />
        </Button>
      </div>
      <section className='bg-gray-50 py-12 px-4'>
        <div className='container mx-auto'>
          <h2 className='text-3xl text-center font-bold'>Shop by Category</h2>
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-15 py-5'>
            {category.map((item, index) => (
              <Card ref={(el) => (cardsRef.current[index] = el)} onClick={() => handleNagativeOnlisting(item.id, 'category')} key={item.id} className="cursor-pointer hover:scale-90 transition-all duration-200" >
                <CardContent className="flex flex-col justify-center items-center">
                  <item.icon className='w-12 h-12 text-primary' />
                  <span>{item.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

      </section>
      <section className='bg-gray-50 py-12 px-4'>
        <div className='container mx-auto'>
          <h2 className='text-3xl text-center font-bold'>Shop by Brands</h2>
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-15 py-5'>
            {brand.map((item,index) => (
              <Card ref={(el) => (cardsRef2.current[index] = el)} onClick={() => handleNagativeOnlisting(item.id, 'brand')} key={item.id} className="cursor-pointer hover:scale-90 transition-all duration-200" >
                <CardContent className="flex flex-col justify-center items-center">
                  <item.icon className='w-12 h-12 text-primary' />
                  <span>{item.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

      </section>

      <section className='py-12 px-4'>
        <div className='container mx-auto'>
          <h2 className='text-3xl text-center font-bold'>Feature Products</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4'>
            {productList.map((product) => (<ShopingProduct key={product._id} product={product} handleAddCart={handleAddCart} handleCLickProductDetail={handleCLickProductDetail} />))}
          </div>
        </div>
      </section>
    </div>

  )
}

export default HomePage