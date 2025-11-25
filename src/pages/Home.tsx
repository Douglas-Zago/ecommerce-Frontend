import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { mockProducts } from "@/services/mockData";
import { ArrowRight, ShoppingBag, Truck, Shield } from "lucide-react";
import { Link } from "react-router-dom";

export default function Home() {
  const featuredProducts = mockProducts.slice(0, 4);

  return (
    <div className="min-h-screen">
      
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-primary-foreground">
        <div className="container px-4 py-20 md:py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
              Bem-vindo ao E-Shop
            </h1>
            <p className="text-lg md:text-xl mb-8 opacity-90 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-150">
              Encontre os melhores produtos com preços incríveis. 
              Qualidade, variedade e entrega rápida em um só lugar!
            </p>
            <Button
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300"
              asChild
            >
              <Link to="/products">
                Ver Todos os Produtos
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
        <div className="absolute -bottom-1 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              fill="hsl(var(--background))"
            />
          </svg>
        </div>
      </section>

      
      <section className="py-16 bg-muted/50">
        <div className="container px-4">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center text-center p-6 rounded-lg bg-background shadow-sm hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <ShoppingBag className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Ampla Variedade</h3>
              <p className="text-sm text-muted-foreground">
                Milhares de produtos em diversas categorias
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-lg bg-background shadow-sm hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Truck className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Entrega Rápida</h3>
              <p className="text-sm text-muted-foreground">
                Receba seus produtos com agilidade e segurança
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-lg bg-background shadow-sm hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Compra Segura</h3>
              <p className="text-sm text-muted-foreground">
                Transações protegidas e dados criptografados
              </p>
            </div>
          </div>
        </div>
      </section>

      
      <section className="py-16">
        <div className="container px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Produtos em Destaque</h2>
              <p className="text-muted-foreground">
                Confira nossa seleção especial de produtos
              </p>
            </div>
            <Button variant="outline" asChild className="hidden md:flex">
              <Link to="/products">
                Ver Todos
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Button variant="outline" asChild>
              <Link to="/products">
                Ver Todos os Produtos
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
