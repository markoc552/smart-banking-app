import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { useTable } from "react-table";
import { Icon, Input } from "semantic-ui-react";
import Spinner from "react-bootstrap/Spinner";

const Table = (props) => {
  let renderedTransactions = [];

  // const [filterInput, setFilterInput] = useState("");
  //
  // const filterByColumn = "recepient";
  //
  // const handleFilterChange = (e) => {
  //   const value = e.target.value || undefined;
  //   setFilter(filterByColumn, value);
  //   setFilterInput(value);
  // };

  const transactions = useSelector((state) => {
    if (state.accounts[props.id] !== undefined) {
      const transactions = state.accounts[props.id].transactions;

      renderedTransactions = [
        {
          sender: transactions[0].sender,
          recepient: transactions[0].recepient,
          amount: transactions[0].amount,
          mined: transactions[0].mined,
        },
        {
          sender: transactions[1].sender,
          recepient: transactions[1].recepient,
          amount: transactions[1].amount,
          mined: transactions[1].mined,
        },
        {
          sender: transactions[2].sender,
          recepient: transactions[2].recepient,
          amount: transactions[2].amount,
          mined: transactions[2].mined,
        },
        {
          sender: transactions[3].sender,
          recepient: transactions[3].recepient,
          amount: transactions[3].amount,
          mined: transactions[3].mined,
        },
        {
          sender: transactions[4].sender,
          recepient: transactions[4].recepient,
          amount: transactions[4].amount,
          mined: transactions[4].mined,
        },
      ];

      return transactions;
    }
  });

  const data = useMemo(() => [...renderedTransactions], [transactions]);

  console.log(data);

  const columns = useMemo(
    () => [
      {
        Header: "Sender",
        accessor: "sender",
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

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  return renderedTransactions === undefined ? (
    <Spinner animation="border" role="status">
      <span className="sr-only">Loading...</span>
    </Spinner>
  ) : (
    <>
      <table
        {...getTableProps()}
        style={{ width: "55vw", height: "15vh", borderCollapse: "collapse" }}
      >
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
                    <th {...column.getHeaderProps()} style={{ padding: "5px" }}>
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
        <tbody {...getTableBodyProps()} style={{fontFamily: "'Bree Serif', serif"}}>
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
                        <td {...cell.getCellProps()}>
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
    </>
  );
};

export default Table;
