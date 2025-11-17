import { PartitionContextProvider } from '../partitionContext'
import IncomePartitionStepper from './IncomePartitionStepper'
function IncomePartition() {
	return <PartitionContextProvider>
			<IncomePartitionStepper />
		</PartitionContextProvider>
}

export default IncomePartition;
