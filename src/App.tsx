import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PriceSummaryCard } from './components/PriceSummaryCard';
import { useStockSymbol } from './hooks/useStockSymbol';
import { STOCK_LIST } from './constants/stockSymbols';
import './index.css';

const queryClient = new QueryClient();

const AppContent = () => {
  const { selectedStock, setSelectedStock } = useStockSymbol();

  return (
    <div className="min-h-screen bg-[#1E1E1E] flex items-center justify-center px-4 py-8 w-full">
      <div className="w-full max-w-[480px]">
        <PriceSummaryCard stock={selectedStock} options={STOCK_LIST} onStockChange={setSelectedStock} />
      </div>
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppContent />
  </QueryClientProvider>
);

export default App;
