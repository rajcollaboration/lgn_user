import React from 'react';
import './App.css';
import RootRouting from './Routing/RootRouting';
import { QueryClient, QueryClientProvider } from 'react-query';
import "bootstrap/dist/css/bootstrap.min.css";
import 'swiper/swiper-bundle.css';
import './StyleSheet/Style.css';


const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <main>
          <RootRouting/>
      </main>
    </QueryClientProvider>
  );
}

export default App;
