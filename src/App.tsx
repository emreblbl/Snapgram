import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthLayout from "./_auth/AuthLayout";
import RootLayout from "./_root/RootLayout";
import SigninForm from "./_auth/forms/SigninForm";
import SignupForm from "./_auth/forms/SignupForm";
import { Home } from "./_root/pages";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster"

const App = () => { 
    return (
    <main className="flex h-screen">
        <Routes>
            <Route element={<AuthLayout />} > 
            {/*public routes*/}
                <Route path="/sign-in" element={<SigninForm />} />
                <Route path="/sign-up" element={<SignupForm />} />
            </Route>

            <Route element={<RootLayout />}>
                <Route index element={<Home />} />
            </Route>
                        {/*private routes*/}

        </Routes>
        <Toaster />
      </main>
    )
}


export default App;