import Calculator from "./components/Calculator";
import { HashRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import LastEquations from "./components/LastCalculations";

function App() {
    return (
        <HashRouter>
            <Routes>
                <Route path='/' element={<Layout />}>
                    <Route index element={<LastEquations />} />
                    <Route path='calculator' element={<Calculator />} />
                </Route>
            </Routes>
        </HashRouter>
    );
}

export default App;
