import { Package } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="border-t bg-muted/50 mt-auto">
      <div className="container px-4 py-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Package className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold">ZagoExpress</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Sua loja online completa com os melhores produtos e preços.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Sobre Nós</li>
              <li>Contato</li>
              <li>Política de Privacidade</li>
              <li>Termos de Uso</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Atendimento</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>FAQ</li>
              <li>Trocas e Devoluções</li>
              <li>Formas de Pagamento</li>
              <li>Entrega</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} ZagoExpress – Desenvolvido por Douglas Zago.</p>
        </div>
      </div>
    </footer>
  );
};
