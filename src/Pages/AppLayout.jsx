import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

function AppLayout() {
  return (
    <div div className="grid h-screen grid-rows-[auto_1fr_auto]">
      <Header />
      <div className="overflow-scroll">
        <main className="mx-auto max-w-4xl">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default AppLayout;
