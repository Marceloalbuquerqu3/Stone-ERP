
export const mockProductionJobs = [
  { id: 1, company_id: '1', client: 'Construtora ABC', project: 'Bancada Cozinha', startDate: '2026-02-01', deliveryDate: '2026-02-15', value: 3500, status: 'Em corte', notes: 'Granito Preto São Gabriel' },
  { id: 2, company_id: '1', client: 'Maria Souza', project: 'Lavatório Banheiro', startDate: '2026-02-05', deliveryDate: '2026-02-10', value: 1200, status: 'Concluído', notes: 'Mármore Carrara' },
  { id: 3, company_id: '1', client: 'João Silva', project: 'Escada', startDate: '2026-02-10', deliveryDate: '2026-02-25', value: 8500, status: 'Aguardando material', notes: 'Travertino Romano' },
  { id: 4, company_id: '1', client: 'Office Tower', project: 'Recepção', startDate: '2026-02-08', deliveryDate: '2026-02-20', value: 15000, status: 'Em acabamento', notes: 'Quartzo Branco' },
  { id: 5, company_id: '1', client: 'Casa Verde', project: 'Área Gourmet', startDate: '2026-02-12', deliveryDate: '2026-02-28', value: 6200, status: 'Instalação agendada', notes: 'Granito Café Imperial' },
];

export const mockTransactions = [
  { id: 1, company_id: '1', date: '2026-02-01', client: 'Construtora ABC', description: 'Entrada 50% Bancada', type: 'Entrada', value: 1750, paymentMethod: 'Transferência' },
  { id: 2, company_id: '1', date: '2026-02-02', client: 'Fornecedor Pedras Sul', description: 'Compra chapa Granito', type: 'Saída', value: 2500, paymentMethod: 'Boleto' },
  { id: 3, company_id: '1', date: '2026-02-03', client: 'Maria Souza', description: 'Pagamento Integral', type: 'Entrada', value: 1200, paymentMethod: 'Cartão' },
  { id: 4, company_id: '1', date: '2026-02-05', client: 'Energia Elétrica', description: 'Conta de Luz Jan', type: 'Saída', value: 850, paymentMethod: 'Débito' },
  { id: 5, company_id: '1', date: '2026-02-06', client: 'Office Tower', description: 'Sinal 30%', type: 'Entrada', value: 4500, paymentMethod: 'Transferência' },
];

export const mockMaterials = [
  { id: 1, company_id: '1', name: 'Granito Preto São Gabriel', supplier: 'Pedras Sul', quantity: 15, unit: 'm²', cost: 250, date: '2026-01-15' },
  { id: 2, company_id: '1', name: 'Mármore Carrara', supplier: 'Mármores Import', quantity: 3, unit: 'm²', cost: 850, date: '2026-01-20' },
  { id: 3, company_id: '1', name: 'Quartzo Branco', supplier: 'Tech Stone', quantity: 8, unit: 'm²', cost: 600, date: '2026-02-01' },
  { id: 4, company_id: '1', name: 'Travertino Romano', supplier: 'Mármores Import', quantity: 12, unit: 'm²', cost: 550, date: '2026-01-25' },
  { id: 5, company_id: '1', name: 'Granito Café Imperial', supplier: 'Pedras Sul', quantity: 4, unit: 'm²', cost: 280, date: '2026-02-05' },
];

export const mockClients = [
  { id: '1', company_id: '1', name: 'João Silva', email: 'joao@construtora.com', phone: '(11) 99999-1234', address: 'Av. Paulista, 1000 - SP', status: 'Ativo' },
  { id: '2', company_id: '1', name: 'Maria Souza', email: 'maria@arquitetura.com', phone: '(21) 98888-5678', address: 'Rua das Flores, 123 - RJ', status: 'Ativo' },
  { id: '3', company_id: '1', name: 'Carlos Oliveira', email: 'carlos@reformas.com', phone: '(31) 97777-9012', address: 'Av. Amazonas, 500 - MG', status: 'Inativo' },
];

export const mockQuotes = [
  { id: '1', company_id: '1', quoteNumber: 'ORC-001', client: 'João Silva', date: '2026-02-10', status: 'Aprovado', stoneType: 'Granito Preto', width: 2.0, length: 0.6, squareMeters: 1.2, pricePerMeter: 400, totalValue: 4500, notes: 'Cliente solicitou urgência.' },
  { id: '2', company_id: '1', quoteNumber: 'ORC-002', client: 'Maria Souza', date: '2026-02-12', status: 'Enviado', stoneType: 'Mármore Carrara', width: 1.5, length: 0.5, squareMeters: 0.75, pricePerMeter: 800, totalValue: 8200, notes: '' },
];

export const mockSettings = {
  company: {
    id: '1',
    name: 'Stone ERP Marmoraria',
    phone: '(11) 99999-9999',
    email: 'contato@stoneerp.com.br',
    address: 'Av. das Rochas, 1000 - Distrito Industrial',
    logo: null,
    defaultMargin: 30,
    plan: 'Freemium',
    subscriptionStatus: 'Ativo',
    trialStartDate: '2026-02-01',
    createdAt: '2025-01-01',
    expiresAt: null
  },
  user: {
    name: 'Admin User',
    email: 'admin@stoneerp.com.br',
    company_id: '1'
  }
};
