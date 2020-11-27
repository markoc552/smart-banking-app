import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { useTable, useFilters } from "react-table";
import { Icon, Input } from "semantic-ui-react";
import Spinner from "react-bootstrap/Spinner";
import { matchSorter } from "match-sorter";
import { FormattedMessage } from "react-intl";

const Table = (props) => {
  const filterByColumn = "recepient";

  const filterTypes = React.useMemo(
    () => ({
      fuzzyText: fuzzyTextFilterFn,

      text: (rows, id, filterValue) => {
        return rows.filter((row) => {
          const rowValue = row.values[id];
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true;
        });
      },
    }),
    []
  );

  const handleFilterChange = (e) => {
    setFilter(filterByColumn, props.filter);
  };

  const transactions = useSelector((state) => state.transactions.failed);

  console.log("Failed transactions: ", transactions);

  let renderedTransactions;

  if (transactions !== undefined) {
    renderedTransactions = transactions;
  } else {
    renderedTransactions = [];
  }

  const data = useMemo(() => [...renderedTransactions], []);

  function DefaultColumnFilter({
    column: { filterValue, preFilteredRows, setFilter },
  }) {
    const count = preFilteredRows.length;

    return (
      <Input
        circular
        size="mini"
        icon={<Icon name="search" />}
        value={filterValue || ""}
        onChange={(e) => {
          setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
        }}
        placeholder={`Search...`}
      />
    );
  }

  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
    }),
    []
  );

  function fuzzyTextFilterFn(rows, id, filterValue) {
    return matchSorter(rows, filterValue, { keys: [(row) => row.values[id]] });
  }

  const columns = useMemo(
    () => [
      {
        Header: (
          <FormattedMessage
            id="transactions.table.recepient"
            defaultMessage="Recepient"
          />
        ),
        accessor: "recepient",
      },
      {
        Header: (
          <FormattedMessage
            id="transactions.table.time"
            defaultMessage="Time"
          />
        ),
        accessor: "time",
      },
      {
        Header: (
          <FormattedMessage
            id="transactions.table.amount"
            defaultMessage="Amount"
          />
        ),
        accessor: "amount",
      },
      {
        Header: "Mined",
        accessor: "mined",
        Cell: <Icon name="x" size="large" color="red" />,
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
    setFilter,
  } = useTable({ columns, data, defaultColumn, filterTypes }, useFilters);

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
                      <div>
                        {column.canFilter &&
                        column.id !== "time" &&
                        column.id !== "mined"
                          ? column.render("Filter")
                          : null}
                      </div>
                    </th>
                  ))
                }
              </tr>
            ))
          }
        </thead>
        {/* Apply the table body props */}
        {renderedTransactions !== undefined && (
          <tbody
            {...getTableBodyProps()}
            style={{ fontFamily: "'Bree Serif', serif" }}
          >
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
        )}
      </table>
    </>
  );
};

export default Table;
