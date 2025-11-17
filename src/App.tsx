import { PartitionContextProvider }  from "components/IncomePartition";
import IncomePartition from "components/IncomePartition"
import ElementsStyling from "components/ElementsStyling"
import "./App.css";

function App() {
  return (
    <div>
    	<ElementsStyling />
    	<IncomePartition/>
    </div>
  );
}

export default App;
