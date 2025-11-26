import { useState, useEffect } from "react";
import { ProductCard } from "@/components/ProductCard";
import api from "@/services/api";
import { Button } from "@/components/ui/button";
import { Category } from "@/types/product";

const categories: { value: Category; label: string }[] = [
  { value: "todos", label: "Todos" },
  { value: "eletronicos", label: "Eletrônicos" },
  { value: "moda", label: "Moda" },
  { value: "casa", label: "Casa" },
  { value: "esportes", label: "Esportes" },
  { value: "livros", label: "Livros" },
];

export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("todos");
  const [products, setProducts] = useState([] as any[]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await api.get("/products");
        setProducts(res.data || []);
      } catch (err: any) {
        setError("Erro ao carregar produtos.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const filteredProducts =
    selectedCategory === "todos"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <div className="min-h-screen py-8">
      <div className="container px-4">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Nossos Produtos</h1>
          <p className="text-muted-foreground">
            Explore nosso catálogo completo com produtos selecionados
          </p>
        </div>

        
        <div className="mb-8">
          <h2 className="text-sm font-semibold mb-4 uppercase text-muted-foreground">
            Filtrar por Categoria
          </h2>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category.value}
                variant={selectedCategory === category.value ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.value)}
                size="sm"
              >
                {category.label}
              </Button>
            ))}
          </div>
        </div>

        
        {loading ? (
          <div className="text-center py-16">Carregando produtos...</div>
        ) : error ? (
          <div className="text-center py-16 text-destructive">{error}</div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">
              Nenhum produto encontrado nesta categoria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
