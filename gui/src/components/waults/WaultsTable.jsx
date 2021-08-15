import React, { useMemo, useState } from "react";
import { useSelector, connect } from "react-redux";
import PropTypes from "prop-types";
import { useTable, useFilters, useRowSelect } from "react-table";
import { Icon, Input, Button } from "semantic-ui-react";
import Spinner from "react-bootstrap/Spinner";
import { matchSorter } from "match-sorter";
import { getWaultStatus } from "../../redux/actions";
import { FormattedMessage } from "react-intl";
import { getWaultContract } from "../../ethereum/instances/factory";
import {getWaultDetails} from "../../backend-api"
import moment from "moment";
import web3 from "../../ethereum/web3";

const Table = (props) => {
  const address = useSelector((state) => state.waults.active);

  const waults = useSelector((state) => state.waults.status);

  console.log(address)

  useState(async () => {
    if (address !== undefined) {
      let waultArr = [];

      await Promise.all(
        address.map(async (i, index) => {
          const wault = await getWaultDetails(i)

          waultArr.push({
            reason: wault.reason,
            time: wault.time,
            amount: wault.amount,
            saved: wault.saved,
          });
        })
      );

      console.log(waultArr)
      props.setWaultsData(waultArr);
    }
  }, [address]);

  const filterByColumn = "recepient";

  const filterTypes = useMemo(
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

  let renderedWaults;

  if (waults !== undefined) {
    renderedWaults = waults;
  } else {
    renderedWaults = [];
  }

  const data = useMemo(() => [...props.waultsData], [props.waultsData]);

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

  const defaultColumn = useMemo(
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
          <FormattedMessage id="wault.table.reason" defaultMessage="Reason" />
        ),
        accessor: "reason",
      },
      {
        Header: (
          <FormattedMessage id="wault.table.time" defaultMessage="Time" />
        ),
        accessor: "time",
      },
      {
        Header: (
          <FormattedMessage id="wault.table.amount" defaultMessage="Amount" />
        ),
        accessor: "amount",
      },
      {
        Header: (
          <FormattedMessage id="wault.table.saved" defaultMessage="Saved" />
        ),
        accessor: "saved",
      },
      {
        Header: (
          <FormattedMessage id="wault.table.created" defaultMessage="Created" />
        ),
        accessor: "created",
        Cell: <Icon name="check" size="large" color="green" />,
      },
      {
        Header: (
          <FormattedMessage id="wault.actions" defaultMessage="Actions" />
        ),
        accessor: "actions",
        Cell: ({ row }) => (
          <div>
            <Button
              basic
              color="green"
              size="mini"
              onClick={() => {
                props.setTitle(
                  <FormattedMessage
                    id="wault.actions.dialog.deposit"
                    defaultMessage="Deposit money to your wault"
                  />
                );
                props.setActionShow(true);
                props.setOwner(row);
                props.setOption("deposit");
              }}
            >
              <FormattedMessage
                id="wault.actions.deposit"
                defaultMessage="Deposit"
              />
            </Button>
            <Button
              basic
              color="red"
              size="mini"
              onClick={() => {
                props.setTitle(
                  <FormattedMessage
                    id="wault.actions.dialog.withdraw"
                    defaultMessage="Withdraw money from your wault"
                  />
                );
                props.setActionShow(true);
                props.setOwner(row);
                props.setOption("withdraw");
              }}
            >
              <FormattedMessage
                id="wault.actions.withdraw"
                defaultMessage="Withdraw"
              />
            </Button>
          </div>
        ),
      },
    ],
    []
  );

  const getTrProps = (row) => {
    console.log(row);
  };

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
    { columns, data, defaultColumn, filterTypes, getTrProps },
    useFilters,
    useRowSelect
  );
  console.log(selectedFlatRows);
  return waults === undefined ? (
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
                  <tr {...getTrProps(row.getRowProps())}>
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
