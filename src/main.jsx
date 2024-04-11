import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx'
import './index.css'
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

// const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  // <QueryClientProvider client={queryClient}>
    <ThirdwebProvider 
      desiredChainId={'polygon-amoy-testnet'}
      clientId='_fIrrQqmf22FodHNEI4FP0QvmGOerWxgfIYqWWS_2Hg94f8Rlpg24SmHlwaWItal31szcXmDYXP5XOTltRqhHg'
      >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThirdwebProvider>
  // </QueryClientProvider>
)
