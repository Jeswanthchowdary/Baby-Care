import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Onboarding from "./pages/Onboarding";
import Home from "./pages/Home";
import SplashScreen from "./pages/SplashScreen";
import Scanner from "./pages/Scanner";
import ReportCard from "./pages/ReportCard";
import Lists from "./pages/Lists";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import OnboardingName from "./pages/OnboardingName";
import Notifications from "./pages/Notifications";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<SplashScreen />} />
                <Route path="/onboarding-name" element={<OnboardingName />} />

        <Route path="/onboarding" element={<Onboarding />} />
        {/* <Route path="/" element={<Onboarding />} /> */}
        <Route path="/home" element={<Home />} />
        <Route path="/scanner" element={<Scanner />} />
        <Route path="/report/:id" element={<ReportCard />} />
        <Route path="/lists" element={<Lists />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
