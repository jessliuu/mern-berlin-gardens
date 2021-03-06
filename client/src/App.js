import { Routes, Route } from "react-router-dom";
import "./App.css";
import { AuthContextProvider } from "./Contexts/AuthContext";
import { GardensContextProvider } from "./Contexts/GardensContext";
import ViewBrowse from "./Views/ViewBrowse";
import ViewDetails from "./Views/ViewDetails";
import ViewHome from "./Views/ViewHome";
import ViewLogin from "./Views/ViewLogin";
import ViewProfile from "./Views/ViewProfile";
import ViewRegister from "./Views/ViewRegister";
import ViewNoMatch from "./Views/ViewNoMatch";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import themeLightSettings from "./Utils/muiThemesSettings";

function App() {
  const themeLight = createTheme(themeLightSettings);

  return (
    <ThemeProvider theme={themeLight}>
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
              <Route path="/browse/:gardenid" element={<ViewDetails />} />
              <Route path="/login" element={<ViewLogin />} />
              <Route path="/register" element={<ViewRegister />} />
              <Route path="*" element={<ViewNoMatch />} />
            </Routes>
          </GardensContextProvider>
        </AuthContextProvider>
      </div>
    </ThemeProvider>
  );
}

export default App;
