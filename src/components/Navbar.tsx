import { Link } from "react-router-dom";
import { ShoppingCart, User, Home, Package, LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { useCart } from "@/contexts/CartContext";

interface NavbarProps {
  isAuthenticated?: boolean;
  onLogout?: () => void;
}

export const Navbar = ({ isAuthenticated = false, onLogout }: NavbarProps) => {
  const { items } = useCart();
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center space-x-2">
          <Package className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            ZagoExpress
          </span>
        </Link>

        <div className="flex items-center gap-2 md:gap-4">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/">
              <Home className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Início</span>
            </Link>
          </Button>

          <Button variant="ghost" size="sm" asChild>
            <Link to="/products">
              <Package className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Produtos</span>
            </Link>
          </Button>

          <Button variant="ghost" size="sm" asChild className="relative">
            <Link to="/cart">
              <ShoppingCart className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Carrinho</span>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-accent text-accent-foreground text-xs font-bold rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>
          </Button>

          {isAuthenticated ? (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/admin">
                  <User className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Admin</span>
                </Link>
              </Button>
              <Button variant="ghost" size="sm" onClick={onLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Sair</span>
              </Button>
            </>
          ) : (
            <Button size="sm" asChild>
              <Link to="/login">
                <User className="h-4 w-4 mr-2" />
                Login
              </Link>
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};
