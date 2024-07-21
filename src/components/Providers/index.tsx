"use client"; // Ensure this component is a client component

import { store } from '@/store';
import { Provider} from 'react-redux';


export default function Providers({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}