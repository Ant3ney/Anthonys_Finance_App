import { useContext } from 'react'
import partitionContext from '../partitionContext'
import PartitionTreeManager from './PartitionTreeManager'
import NamePartitionTree from './NamePartitionTree';

//Node names for reference
//Node View
//Add Sibling View
//Add Child View
//
//Dropship Sibling View
//Dropship Child View 

function IncomePartitionStepper() {
  const { step }: any = useContext(partitionContext);

  	switch(step) {
		case("namePartitionTree"):
			return <NamePartitionTree />;
			break;
		case("partitionTreeManager"):
			return <PartitionTreeManager />;
			break;
		default:
			return <h1>An error has accoured. I'm so sorry.</h1>

	}
}

export default IncomePartitionStepper;
