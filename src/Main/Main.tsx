import AllItemsPage from "./AllItemsPage/AllItemsPage";
import InvalidPath from "./InvalidPath";
import ItemPage from "./ItemPage/ItemPage";
import { Routes, Route, Navigate, HashRouter } from "react-router-dom";

function Main() {
    return (
        <main style={{ minHeight: "100vh", backgroundColor: "#fff6ea" }}>
            <HashRouter basename="/Recipes">
                <Routes>
                    <Route path="/" element={<Navigate to={"all-items"} />} />
                    <Route path="item/:id" element={<ItemPage />} />
                    <Route path="all-items" element={<AllItemsPage />} />
                    <Route path="*" element={<InvalidPath />} />
                </Routes>
            </HashRouter>
        </main>
    );
}

export default Main;
