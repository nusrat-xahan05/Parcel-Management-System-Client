import ProfileMenu from "@/components/ProfileMenu"
import { Button } from "@/components/ui/button"
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, } from "@/components/ui/navigation-menu"
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover"
import { useUserInfoQuery } from "@/redux/features/auth/auth.api"
import { Link } from "react-router"
import HamburgerMenu from "@/assets/icons/HamburgerMenu"
import React from "react"
import { ModeToggle } from "./ModeToggler"
import Logo from "@/assets/icons/Logo"
import { Role } from "@/constants/User"

// Navigation links array to be used in both desktop and mobile menus
const navigationLinks = [
  { href: "/", label: "Home", role: "PUBLIC" },
  { href: "/about", label: "About", role: "PUBLIC" },
  { href: "/services", label: "Services", role: "PUBLIC" },
  { href: "/faq", label: "FAQ", role: "PUBLIC" },
  { href: "/contact", label: "Contact", role: "PUBLIC" },
  { href: "/admin", label: "Dashboard", role: Role.ADMIN },
  { href: "/admin", label: "Dashboard", role: Role.SENDER },
  { href: "/admin", label: "Dashboard", role: Role.RECEIVER },
]

export default function Navbar() {
  const { data, isLoading } = useUserInfoQuery(undefined);


  return (
    <header className="border-b px-4 md:px-6">
      <div className="flex h-16 items-center justify-between">
        {/* Left side */}
        <Link className="text-primary hover:text-primary/90" to="/"><Logo /></Link>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* Main nav */}
          <div className="flex items-center gap-6">
            {/* Navigation menu */}
            <NavigationMenu className="max-md:hidden">
              <NavigationMenuList className="gap-2">
                {navigationLinks.map((link, index) => (
                  <React.Fragment key={index}>
                    {link.role === "PUBLIC" && (
                      <NavigationMenuItem>
                        <NavigationMenuLink
                          asChild
                          className="text-muted-foreground hover:text-primary py-1.5 font-medium"
                        >
                          <Link to={link.href}>{link.label}</Link>
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    )}
                    {link.role === data?.data?.role && (
                      <NavigationMenuItem>
                        <NavigationMenuLink
                          asChild
                          className="text-muted-foreground hover:text-primary py-1.5 font-medium"
                        >
                          <Link to={link.href}>{link.label}</Link>
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    )}
                  </React.Fragment>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {data?.data?.email && !isLoading && (
            <ProfileMenu userInfo={data.data} />
          )}
          {!data?.data?.email && (
            <Button asChild className="text-sm">
              <Link to="/login">Login</Link>
            </Button>
          )}

          <ModeToggle></ModeToggle>

          {/* Mobile menu trigger */}
          <Popover>
            <PopoverTrigger asChild>
              <Button className="group size-8 md:hidden" variant="ghost" size="icon">
                <HamburgerMenu></HamburgerMenu>
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-36 p-1 md:hidden">
                <NavigationMenu className="max-w-none *:w-full">
                  <NavigationMenuList className="gap-2 grid">
                    {navigationLinks.map((link, index) => (
                      <React.Fragment key={index}>
                        {link.role === "PUBLIC" && (
                          <NavigationMenuItem>
                            <NavigationMenuLink
                              asChild
                              className="text-muted-foreground hover:text-primary py-1.5 font-medium"
                            >
                              <Link to={link.href}>{link.label}</Link>
                            </NavigationMenuLink>
                          </NavigationMenuItem>
                        )}
                        {link.role === data?.data?.role && (
                          <NavigationMenuItem>
                            <NavigationMenuLink
                              asChild
                              className="text-muted-foreground hover:text-primary py-1.5 font-medium"
                            >
                              <Link to={link.href}>{link.label}</Link>
                            </NavigationMenuLink>
                          </NavigationMenuItem>
                        )}
                      </React.Fragment>
                    ))}
                  </NavigationMenuList>
                </NavigationMenu>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </header>
  )
}
