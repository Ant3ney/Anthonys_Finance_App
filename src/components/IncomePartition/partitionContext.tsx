import { useState, createContext, ReactNode } from 'react'


export type AmmoutType = 'ammount' | 'percent';

export type Partition = {
	name: string;
	ammoutType: AmmoutType;
	ammount: number
}

export type Node = {
	id: string;
	parentID: string;
	partition: Partition;
	childNode: string[] | Node[];
}


//TODO: Find how to give this a proper type that is not any
export type PartitionContext = any; 

const partitionContext = createContext<PartitionContext>({});

function PartitionContextProvider({ children }: { children: ReactNode }) {
	const [partitionTrees, usePartitionTrees] = useState<Node[] | null>(null); // This is simply an array of root nodes
	const [step, useStep] = useState<string>('namePartitionTree');
	const [partitionTree, setPartitionTree] = useState<Node | null>(); // This is simply the root node

	function onSetPartitionTreeName(name: string) {
		
	}

	return <partitionContext.Provider
			value={{
				step
				onSetPartitionTreeName
			}}
		>
			{children}
		</partitionContext.Provider>
}

export { PartitionContextProvider };

export default partitionContext;
