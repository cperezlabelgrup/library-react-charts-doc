import ChartsView from "./components/ChartsView"
import PropsTable from "./components/PropsTable"


function App() {


  return (
    <div className="lg:w-[50%] w-[80%] m-auto py-10">
      <h1 className="font-bold text-center text-2xl py-5"> Doc. Library React Charts</h1>
      <PropsTable />
      <ChartsView />
    </div>
  )
}

export default App
