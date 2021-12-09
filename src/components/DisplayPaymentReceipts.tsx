import NoRecordsCard from './NoRecordsCard';

const DisplayPaymentReceipts = ({
	receipts,
	previewPrintable,
	isLoadingSelection,
}: {
	receipts: any[];
	previewPrintable: (printable: string) => void;
	isLoadingSelection: boolean;
}) => {
	const previewReceipt = async (receipt: any) => {
		await previewPrintable(receipt.href);
	};

	return (
		<div>
			{receipts && receipts.length > 0 ? (
				<table className='table w-full table-compact mt-4'>
					<thead>
						<tr className='text-gray-500 font-bold'>
							<th></th>
							<th>Session</th>
							<th>Name</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{receipts.map((receipt, index) => {
							return (
								<tr key={index} className='font-bold'>
									<th>{index + 1}</th>
									<td className='text-success'>{receipt.session}</td>
									<th>{receipt.name}</th>
									<td>
										<button
											className='btn btn-accent w-full'
											onClick={(e) => {
												previewReceipt(receipt);
											}}
											disabled={isLoadingSelection}>
											Print
										</button>
									</td>
								</tr>
							);
						})}
					</tbody>
					<tfoot>
						<tr className='text-gray-500 font-bold'>
							<th></th>
							<th>Session</th>
							<th>Name</th>
							<th></th>
						</tr>
					</tfoot>
				</table>
			) : (
				<div className='mt-4'>
					<NoRecordsCard message='No receipts available for printing' />
				</div>
			)}
		</div>
	);
};

export default DisplayPaymentReceipts;
