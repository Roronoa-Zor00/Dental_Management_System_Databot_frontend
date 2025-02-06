import React from 'react'
import DataTable from 'react-data-table-component';


const DataTable = ({columns,data}) => {
  const paginationComponentOptions = {
    selectAllRowsItem: true,
    selectAllRowsItemText: "ALL"
  };
  return (
    <div>
        <DataTable
			columns={columns}
			data={data}
            pagination
            paginationPerPage={5} // Number of rows per page
            paginationRowsPerPageOptions={[5, 10, 20]}
           
           
		/>
    </div>
  )
}

export default DataTable