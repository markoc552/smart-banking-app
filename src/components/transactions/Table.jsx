import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { useTable } from "react-table";
import {Icon} from "semantic-ui-react"

const Table = (props) => {
  const data = useMemo(
    () => [
      {
        hash: "Hello",
        recepient: "World",
        amount: "10",
        mined: <Icon name="check" color="green" size="large"/>
      },
      {
        hash: "Hello",
        recepient: "World",
        amount: "10",
      },
      {
        hash: "Hello",
        recepient: "World",
        amount: "10",
      },
    ],
    []
  );

  const columns = useMemo(
    () => [
      {
        Header: "Transaction hash",
        accessor: "hash",
      },
      {
        Header: "Recepient",
        accessor: "recepient",
      },
      {
        Header: "Amount",
        accessor: "amount",
      },
      {
        Header: "Mined",
        accessor: "mined",
      },
    ],
    []
  );

  const tableInstance = useTable({ columns, data });

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance;

  return (
    <table {...getTableProps()} style={{width: "55vw", height: "15vh", borderCollapse: "collapse"}}>
      <thead>
        {
          // Loop over the header rows
          headerGroups.map((headerGroup) => (
            // Apply the header row props
            <tr
              {...headerGroup.getHeaderGroupProps()}
              style={{
                padding: "10px",
                backgroundColor: "#fafafa",
                color: "#bababa",
                fontWeight: "bold",
              }}
            >
              {
                // Loop over the headers in each row
                headerGroup.headers.map((column) => (
                  // Apply the header cell props
                  <th {...column.getHeaderProps()} style={{padding: "5px"}}>
                    {
                      // Render the header
                      column.render("Header")
                    }
                  </th>
                ))
              }
            </tr>
          ))
        }
      </thead>
      {/* Apply the table body props */}
      <tbody {...getTableBodyProps()}>
        {
          // Loop over the table rows
          rows.map((row) => {
            // Prepare the row for display
            prepareRow(row);
            return (
              // Apply the row props
              <tr {...row.getRowProps()}>
                {
                  // Loop over the rows cells
                  row.cells.map((cell) => {
                    // Apply the cell props
                    return (
                      <td
                        {...cell.getCellProps()}
                      >
                        {
                          // Render the cell contents
                          cell.render("Cell")
                        }
                      </td>
                    );
                  })
                }
              </tr>
            );
          })
        }
      </tbody>
    </table>
  );
};

export default Table;
