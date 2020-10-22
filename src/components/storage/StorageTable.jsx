import React, { useMemo, useState } from "react";
import { useSelector, connect } from "react-redux";
import PropTypes from "prop-types";
import { useTable, useFilters, useRowSelect } from "react-table";
import { Icon, Input, Button } from "semantic-ui-react";
import Spinner from "react-bootstrap/Spinner";
import { matchSorter } from "match-sorter";
import { getWaultStatus } from "../../redux/actions";

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

  let renderedWaults = [];

  const data = useMemo(() => [...renderedWaults], []);

  console.log(data);

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
        Header: "Reason",
        accessor: "reason",
      },
      {
        Header: "Time",
        accessor: "time",
      },
      {
        Header: "Amount",
        accessor: "amount",
      },
      {
        Header: "Saved",
        accessor: "saved",
      },
      {
        Header: "Created",
        accessor: "created",
        Cell: <Icon name="check" size="large" color="green" />,
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: ({ row }) => (
          <div>
            {console.log(row.getToggleRowSelectedProps())}
            <Button
              basic
              color="green"
              size="mini"
              onClick={() => {
                props.setTitle("Deposit money to your wault");
                props.setActionShow(true);
              }}
            >
              Deposit
            </Button>
            <Button
              basic
              color="red"
              size="mini"
              onClick={() => {
                props.setTitle("Withdraw money from your wault");
                props.setActionShow(true);
              }}
            >
              Withdraw
            </Button>
          </div>
        ),
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
    selectedFlatRows,
    state: { selectedRowIds },
  } = useTable(
    { columns, data, defaultColumn, filterTypes },
    useFilters,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        // Let's make a column for selection
        {
          id: "selection",
          // The header can use the table's getToggleAllRowsSelectedProps method
          // to re a checkboxnder
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <div>
              {console.log(getToggleAllRowsSelectedProps())}
            </div>
          ),
          // The cell can use the individual row's getToggleRowSelectedProps method
          // to the render a checkbox
          Cell: ({ row }) => (
            <div>
              {console.log(row.getToggleRowSelectedProps())}
            </div>
          ),
        },
        ...columns,
      ]);
    }
  );
  console.log(selectedFlatRows);
  return renderedWaults === undefined ? (
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
                        column.id !== "created" &&
                        column.id !== "saved" &&
                        column.id !== "amount" &&
                        column.id !== "actions"
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
        {
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
        }
      </table>
    </>
  );
};

export default connect(null, { getWaultStatus })(Table);
