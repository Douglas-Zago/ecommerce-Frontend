import { Product } from "@/types/product";
export const mockProducts: Product[] = [
  {
    id: "1",
    name: "Smartphone Galaxy Pro",
    description: "Smartphone de última geração com câmera 108MP e 5G",
    price: 2499.90,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500",
    category: "eletronicos",
    stock: 15
  },
  {
    id: "2",
    name: "Notebook Ultra 15",
    description: "Notebook profissional com Intel i7 e 16GB RAM",
    price: 4299.00,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500",
    category: "eletronicos",
    stock: 8
  },
  {
    id: "3",
    name: "Fone de Ouvido Bluetooth",
    description: "Fone com cancelamento de ruído ativo",
    price: 349.90,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
    category: "eletronicos",
    stock: 25
  },
  {
    id: "4",
    name: "Camiseta Básica Premium",
    description: "Camiseta 100% algodão com qualidade superior",
    price: 79.90,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
    category: "moda",
    stock: 50
  },
  {
    id: "5",
    name: "Tênis Esportivo Runner",
    description: "Tênis ideal para corrida com amortecimento avançado",
    price: 299.90,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
    category: "esportes",
    stock: 20
  },
  {
    id: "6",
    name: "Kit Panelas Inox",
    description: "Conjunto com 5 panelas de aço inoxidável",
    price: 459.90,
    image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=500",
    category: "casa",
    stock: 12
  },
  {
    id: "7",
    name: "Livro: Tecnologia e Futuro",
    description: "Bestseller sobre inovação tecnológica",
    price: 49.90,
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500",
    category: "livros",
    stock: 30
  },
  {
    id: "8",
    name: "Smartwatch Fitness",
    description: "Relógio inteligente com monitor cardíaco",
    price: 799.90,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
    category: "eletronicos",
    stock: 18
  }
];

export const mockLogin = (username: string, password: string): boolean => {
  return username === "admin" && password === "admin";
};
