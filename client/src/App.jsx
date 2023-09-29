import "./App.css";
import Header from "./components/Header/Header";
import { AddImage } from "./pages/FormData/AddImage";

function App() {
  return (
    <>
      <Header />
      <section>
        <AddImage />
      </section>
    </>
  );
}

export default App;
