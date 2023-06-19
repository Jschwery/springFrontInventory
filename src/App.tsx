import CardContainer from "./components/cardContainer";

function App() {
  return (
    <div className="bg-slate-700 h-screen flex justify-center items-center">
      <div className="bg-teal-200 flex flex-1">
        <img src="/public/orangeoffice.jpeg" alt="Office Image" />
      </div>
      <div className="w-7/12 h-full flex items-start">
        <CardContainer />
      </div>
    </div>
  );
}

export default App;
