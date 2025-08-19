import { shopingHeaderMenuItems } from '@/config'
import { HousePlug, LogOutIcon, MenuIcon, ShoppingCart, UserCog } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'
import { Button } from '../ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { AvatarFallback } from '@radix-ui/react-avatar'
import { Avatar } from '../ui/avatar'
import { logOutUser } from '@/store/authSlice'
import UserCartWrapper from './userCartWrapper'
import { fetchCart } from '@/store/cartSlice'


function MenuItems() {
  return (
    <nav className='flex flex-col mb-3  lg:flex-row lg:gap-4 lg:mb-0 pb-3'>
      {shopingHeaderMenuItems.map(item =>
        <Link key={item.id} to={item.path} className='font-medium hover:text-blue-300 transition-all mt-5 pl-4'>{item.label}</Link>
      )}
    </nav>
  )
}

function HeaderContentRight() {
  const { user } = useSelector((state) => state.auth)
  const { cart } = useSelector((state) => state.cart)
  const [openCartSheet, setOpenCartSheet] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  function handleLogout() {
    dispatch(logOutUser())
    navigate("/auth/login")
    localStorage.removeItem('user')
  }
  console.log("userid", user?.id);

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchCart(user.id))
    }
  }, [dispatch, user?.id])




  const itemInCart = cart && cart.item && cart.item.length > 0 ? cart.item.length : null

  return (
    <div className='flex lg:flex-row flex-col pl-4 gap-2 '>
      <Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(!openCartSheet)}>
        <SheetTrigger asChild>
          <Button className="relative" variant='outline' size='icon'>
            <ShoppingCart className='w-6 h-6' />
            <span className='sr-only'>User Cart</span>
            <span className='absolute bottom-7 left-6 px-1 text-white text-[12px]  bg-red-500 rounded-full'>{itemInCart}</span>
          </Button>
        </SheetTrigger>

        <UserCartWrapper setOpenCartSheet={setOpenCartSheet} cart={cart && cart.item && cart.item.length > 0 ? cart.item : null} />
      </Sheet>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className='bg-black flex items-center justify-center'>
            <AvatarFallback className='text-white font-extrabold'>
              YH
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>
            Logined as {user.userName}
          </DropdownMenuLabel>

          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => navigate("/shop/account")}>
              <UserCog />
              Account
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout}>
              <LogOutIcon />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

const ShopHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <header className={`sticky top-0 w-full border transition-all duration-300 ${isScrolled ? "bg-amber-50 shadow-lg z-50" : "bg-transparent"
      }`}>
      <div className='flex h-16 items-center justify-between px-4'>
        <Link to="/shop/home" className='flex items-center gap-2'>
          <HousePlug />
          <span className='font-bold text-sm'>Ecommerce</span>
        </Link>

        {/* Menu for mobile */}
        <div className='lg:hidden'>
          <Sheet>
            <SheetTrigger>
              <MenuIcon />
            </SheetTrigger>
            <SheetContent side='left'>
              <MenuItems />
              <HeaderContentRight />
            </SheetContent>
          </Sheet>
        </div>

        {/* Menu for mobile */}

        {/* Menu for pc */}
        <div className='hidden lg:block'>
          <MenuItems />
        </div>
        {/* Menu for pc */}
        <div className='max-lg:hidden'>
          <HeaderContentRight />
        </div>

      </div>
    </header>
  )
}

export default ShopHeader