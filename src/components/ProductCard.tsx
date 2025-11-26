import { Product } from "@/types/product";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart, items } = useCart();

  // Quantidade já existente no carrinho
  const existing = items.find((i) => i.id === product.id);
  const alreadyInCart = existing?.quantity ?? 0;

  // Estoque real considerando o que está no carrinho
  const remainingStock = product.stock - alreadyInCart;

  const handleAdd = () => {
    if (remainingStock <= 0) {
      toast.error("Produto esgotado!");
      return;
    }

    addToCart(product);
    toast.success("Produto adicionado ao carrinho!");
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1">
      
      <CardHeader className="p-0 relative">

        {/* BADGE ESGOTADO */}
        {remainingStock <= 0 && (
          <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
            ESGOTADO
          </div>
        )}

        {/* BADGE ÚLTIMAS UNIDADES */}
        {remainingStock > 0 && remainingStock <= 3 && (
          <div className="absolute top-2 right-2 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded">
            ⚠️ Últimas unidades!
          </div>
        )}

        <div className="aspect-square overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className={`h-full w-full object-cover transition-transform hover:scale-105 
              ${remainingStock <= 0 ? "opacity-60" : ""}`}
          />
        </div>
      </CardHeader>

      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-1">{product.name}</h3>

        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-primary">
            R$ {product.price.toFixed(2)}
          </span>

          <span className="text-xs text-muted-foreground">
            Estoque: {remainingStock <= 0 ? 0 : remainingStock}
          </span>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button
          className="w-full"
          onClick={handleAdd}
          disabled={remainingStock <= 0}
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          {remainingStock <= 0 ? "Sem Estoque" : "Adicionar ao Carrinho"}
        </Button>
      </CardFooter>

    </Card>
  );
};
