import { Routes, Route } from "react-router-dom";
import "./App.css";
import { AuthContextProvider } from "./Contexts/AuthContext";
import { GardensContextProvider } from "./Contexts/GardensContext";
import ViewBrowse from "./Views/ViewBrowse";
import ViewDetail from "./Views/ViewDetail";
import ViewHome from "./Views/ViewHome";
import ViewLogin from "./Views/ViewLogin";
import ViewProfile from "./Views/ViewProfile";
import ViewRegister from "./Views/ViewRegister";

function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <GardensContextProvider>
          <Routes>
            <Route path="/" element={<ViewHome />} />
            <Route
              path="/profile"
              element={
                // <ProtectedRoute>
                <ViewProfile />
                // </ProtectedRoute>
              }
            />
            <Route path="/browse" element={<ViewBrowse />} />
            <Route path="/browse/:title" element={<ViewDetail />} />
            <Route path="/login" element={<ViewLogin />} />
            <Route path="/register" element={<ViewRegister />} />
            {/* <Route path="*" element={<ViewNoMatch />} /> */}
          </Routes>
        </GardensContextProvider>
      </AuthContextProvider>
    </div>
  );
}

export default App;
