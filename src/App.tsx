import { Suspense, lazy } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import routes from "tempo-routes";
import AppLayout from "./components/layout/AppLayout";
import { ErrorBoundary } from "./components/common/ErrorBoundary";
import { LoadingSpinner } from "./components/common/LoadingSpinner";

// Lazy load components for better performance
const Home = lazy(() => import("./components/home"));
const MaterialityAssessment = lazy(
  () => import("./pages/MaterialityAssessment"),
);
const Implementation = lazy(() => import("./pages/Implementation"));

// Placeholder components for future implementation
const DataGaps = () => (
  <div className="p-6">
    <h1 className="text-3xl font-bold">Data Gap Intelligence</h1>
    <p className="text-muted-foreground mt-2">Coming soon...</p>
  </div>
);
const Reports = () => (
  <div className="p-6">
    <h1 className="text-3xl font-bold">Reports</h1>
    <p className="text-muted-foreground mt-2">Coming soon...</p>
  </div>
);
const Stakeholders = () => (
  <div className="p-6">
    <h1 className="text-3xl font-bold">Stakeholder Management</h1>
    <p className="text-muted-foreground mt-2">Coming soon...</p>
  </div>
);
const Settings = () => (
  <div className="p-6">
    <h1 className="text-3xl font-bold">Settings</h1>
    <p className="text-muted-foreground mt-2">Coming soon...</p>
  </div>
);

function App() {
  return (
    <ErrorBoundary>
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-screen">
            <LoadingSpinner size="lg" text="Loading application..." />
          </div>
        }
      >
        <>
          <Routes>
            <Route element={<AppLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/materiality" element={<MaterialityAssessment />} />
              <Route path="/implementation" element={<Implementation />} />
              <Route path="/data-gaps" element={<DataGaps />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/stakeholders" element={<Stakeholders />} />
              <Route path="/settings" element={<Settings />} />
            </Route>
          </Routes>
          {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
        </>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
