import { AppRoutes } from './AppRoutes';
import { AppContextProvider } from './AppContext';

function App() {
  return (
    <AppContextProvider>
      <div className="App min-h-screen bg-slate-100 ">
        <AppRoutes />
      </div>
    </AppContextProvider>
  );
}

export default App;
