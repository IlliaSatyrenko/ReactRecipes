import AllItemsPage from "./AllItemsPage/AllItemsPage";
import InvalidPath from "./InvalidPath";
import ItemPage from "./ItemPage/ItemPage";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function Main() {
    return (
        <main style={{ minHeight: "100vh", backgroundColor: "#fff6ea" }}>
            <BrowserRouter basename="/Recipes">
                <Routes>
                    <Route path="/Recipes" element={<Navigate to="/all-items" />} />
                    <Route path="/item/:id" element={<ItemPage />} />
                    <Route path="/all-items" element={<AllItemsPage />} />
                    <Route path="*" element={<InvalidPath />} />
                </Routes>
            </BrowserRouter>
        </main>
    );
}

export default Main;
