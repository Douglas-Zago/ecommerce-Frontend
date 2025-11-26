import { useState, useEffect } from "react";
import { Product } from "@/types/product";
import api from "@/services/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

export default function Admin() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    category: "eletronicos",
    stock: "",
  });

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      image: "",
      category: "eletronicos",
      stock: "",
    });
    setEditingProduct(null);
  };

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get("/products");
        setProducts(res.data || []);
      } catch (err) {
        // ignore for now
      }
    };
    load();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  (async () => {
    // validação mínima
    if (!formData.name || !formData.description || !formData.price || !formData.stock) {
      toast.error("Preencha todos os campos obrigatórios!");
      return;
    }

    const productData = {
      name: formData.name.trim(),
      description: formData.description.trim(),
      price: Number(formData.price),
      image:
        formData.image.trim() ||
         "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg",
      category: formData.category,
      stock: Number(formData.stock),
    };

    try {
      if (editingProduct) {
        const res = await api.put(`/products/${editingProduct.id}`, productData);
        setProducts((prev) =>
          prev.map((p) => (p.id === editingProduct.id ? res.data : p))
        );
        toast.success("Produto atualizado com sucesso!");
      } else {
        const res = await api.post("/products", productData);
        setProducts((prev) => [...prev, res.data]);
        toast.success("Produto criado com sucesso!");
      }
    } catch (err) {
      toast.error("Erro ao salvar produto.");
    } finally {
      setIsDialogOpen(false);
      resetForm();
    }
  })();
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      image: product.image,
      category: product.category,
      stock: product.stock.toString(),
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    (async () => {
      try {
        await api.delete(`/products/${id}`);
        setProducts((p) => p.filter((x) => x.id !== id));
        toast.success("Produto removido com sucesso!");
      } catch (err) {
        toast.error("Erro ao remover produto.");
      }
    })();
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Painel Administrativo</h1>
            <p className="text-muted-foreground">
              Gerencie os produtos da sua loja
            </p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm}>
                <Plus className="h-4 w-4 mr-2" />
                Novo Produto
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingProduct ? "Editar Produto" : "Novo Produto"}
                </DialogTitle>
                <DialogDescription>
                  {editingProduct
                    ? "Atualize as informações do produto"
                    : "Preencha os dados do novo produto"}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome do Produto *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Descrição *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="price">Preço (R$) *</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) =>
                        setFormData({ ...formData, price: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="stock">Estoque *</Label>
                    <Input
                      id="stock"
                      type="number"
                      value={formData.stock}
                      onChange={(e) =>
                        setFormData({ ...formData, stock: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Categoria *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) =>
                      setFormData({ ...formData, category: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="eletronicos">Eletrônicos</SelectItem>
                      <SelectItem value="moda">Moda</SelectItem>
                      <SelectItem value="casa">Casa</SelectItem>
                      <SelectItem value="esportes">Esportes</SelectItem>
                      <SelectItem value="livros">Livros</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="image">URL da Imagem</Label>
                  <Input
                    id="image"
                    type="url"
                    placeholder="https://exemplo.com/imagem.jpg"
                    value={formData.image}
                    onChange={(e) =>
                      setFormData({ ...formData, image: e.target.value })
                    }
                  />
                  <p className="text-xs text-muted-foreground">
                    Deixe em branco para usar imagem padrão
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button type="submit" className="flex-1">
                    {editingProduct ? "Atualizar" : "Criar"} Produto
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setIsDialogOpen(false);
                      resetForm();
                    }}
                  >
                    Cancelar
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        
        <div className="grid gap-4">
          {products.map((product) => (
            <Card key={product.id}>
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-24 w-24 rounded-md object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {product.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="font-bold text-primary">
                        R$ {product.price.toFixed(2)}
                      </span>
                      <span className="text-muted-foreground">
                        Estoque: {product.stock}
                      </span>
                      <span className="capitalize text-muted-foreground">
                        {product.category}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleEdit(product)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="text-destructive hover:text-destructive"
                      onClick={() => handleDelete(product.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
