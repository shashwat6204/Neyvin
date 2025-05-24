import { ReactNode, forwardRef, ComponentPropsWithoutRef } from "react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "../../lib/utils";
import DarkModeToggle from "./darkmode-toggle";
import MobileMenu from "./mobile-menu";
import Image from "next/image";
import CompanyLogo from "@/public/images/neyvinLogo.jpg";
const DropdownNavItem = ({
  trigger,
  children,
}: {
  trigger: string;
  children: ReactNode;
}) => (
  <NavigationMenuItem>
    <NavigationMenuTrigger className="inline-flex h-10 items-center justify-center rounded-full px-4 py-2 text-md font-medium transition-colors hover:bg-secondary-300/10 hover:text-accent-foreground">
      {trigger}
    </NavigationMenuTrigger>
    <NavigationMenuContent>{children}</NavigationMenuContent>
  </NavigationMenuItem>
);

const ListItem = forwardRef<
  HTMLAnchorElement,
  ComponentPropsWithoutRef<"a"> & { title: string; href: string }
>(({ className, title, children, href, ...props }, ref) => (
  <li>
    <NavigationMenuLink asChild>
      <Link
        ref={ref}
        href={href}
        className={cn(
          "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-secondary-300/10 hover:text-accent-foreground focus:bg-secondary-300/10 focus:text-accent-foreground",
          className
        )}
        {...props}
      >
        <div className="text-sm font-medium leading-none">{title}</div>
        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
          {children}
        </p>
      </Link>
    </NavigationMenuLink>
  </li>
));
ListItem.displayName = "ListItem";

const HeroTitle = () => (
  <>
    <div className="hidden items-start sm:inline-block">
      <Image
        src={CompanyLogo}
        width={35}
        alt="Neyvin Logo"
        className="mb-1 mr-2 inline-flex"
      />
    </div>
    <div className="block items-start sm:hidden">
      <Image
        src={CompanyLogo}
        width={35}
        alt="Neyvin Logo"
        className="mb-1 mr-2 inline-flex"
      />
    </div>
  </>
);

export default function Header() {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 p-3 transition-all duration-300 ease-in-out">
      <div className="mx-auto max-w-6xl">
        <nav
          className="rounded-full border border-border/50 bg-background shadow-md transition-all duration-300 ease-in-out"
          aria-label="Main navigation"
        >
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <Link
                  href="/"
                  className="flex flex-shrink-0 items-center"
                  aria-label="Neyvin Home"
                >
                  <HeroTitle />
                  <div className="h4 ml-1">Neyvin</div>
                </Link>
                <nav className="ml-6 hidden md:block" aria-label="Main menu">
                  <NavigationMenu>
                    <NavigationMenuList className="space-x-1">
                      <NavigationMenuItem>
                        <NavigationMenuLink asChild>
                          <Link
                            href="/"
                            className="group inline-flex h-10 items-center justify-center rounded-full px-4 py-2 text-md font-medium transition-colors hover:bg-secondary-300/10 hover:text-accent-foreground"
                          >
                            Home
                          </Link>
                        </NavigationMenuLink>
                      </NavigationMenuItem>

                      <DropdownNavItem trigger="Services">
                        <div className="grid grid-cols-2 gap-4 bg-background p-4 w-[600px]">
                          <div>
                            <h4 className="mb-2 text-sm font-semibold text-muted-foreground">
                              Core Services
                            </h4>
                            <ul className="space-y-2">
                              <ListItem
                                href="/services/business-consulting"
                                title="Business Consulting & Advisory"
                              >
                                Strategic guidance across IT, HR, finance, and
                                more.
                              </ListItem>
                              <ListItem
                                href="/services/manpower-recruitment"
                                title="Manpower Recruitment"
                              >
                                Permanent and global staffing solutions.
                              </ListItem>
                            </ul>
                          </div>
                          <div>
                            <h4 className="mb-2 text-sm font-semibold text-muted-foreground invisible">
                              Placeholder
                            </h4>
                            <ul className="space-y-2">
                              <ListItem
                                href="/services/project-management"
                                title="Project Management"
                              >
                                End-to-end delivery for complex initiatives.
                              </ListItem>
                              {/* Add more items here as needed */}
                            </ul>
                          </div>
                        </div>
                      </DropdownNavItem>

                      <NavigationMenuItem>
                        <NavigationMenuLink asChild>
                          <Link
                            href="/careers"
                            className="group inline-flex h-10 items-center justify-center rounded-full px-4 py-2 text-md font-medium transition-colors hover:bg-secondary-300/10 hover:text-accent-foreground"
                          >
                            Careers
                          </Link>
                        </NavigationMenuLink>
                      </NavigationMenuItem>

                      <NavigationMenuItem>
                        <NavigationMenuLink asChild>
                          <Link
                            href="/contact"
                            className="group inline-flex h-10 items-center justify-center rounded-full px-4 py-2 text-md font-medium transition-colors hover:bg-secondary-300/10 hover:text-accent-foreground"
                          >
                            Contact
                          </Link>
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    </NavigationMenuList>
                  </NavigationMenu>
                </nav>
              </div>

              <div className="hidden items-center space-x-4 md:flex">
                <DarkModeToggle />
              </div>
              <div className="flex xl:hidden">
                <MobileMenu />
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
