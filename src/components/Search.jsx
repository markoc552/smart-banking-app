import React, { useState, useEffect } from "react";
import _ from "lodash";
import faker from "faker";
import { Search, Grid, Header, Segment } from "semantic-ui-react";
import { connect } from "react-redux";
import { getAllAccounts } from "../redux/actions";

const SearchForm = props => {
  const [isLoading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [value, setValue] = useState("");

  const handleResultSelect = (e, { result }) => setValue(result.title);

  const handleSearchChange = (e, { value }) => {
    setLoading(true);
    setValue(value);

    if (value.length < 1) {
      setLoading(false);
      setResults([]);
      setValue("");
      return;
    }

    const arr = _.mapKeys(props.users, "id");
    const users = _.mapKeys(arr, "username");

    const re = new RegExp(_.escapeRegExp(value), "i");
    const isMatch = result => re.test(result.title);

    const source = _.times(5, () => ({
      title: faker.company.companyName(),
      description: faker.company.catchPhrase(),
      price: faker.finance.amount(0, 100, 2, "$")
    }));

    setLoading(false);
    setResults(_.filter(source, isMatch));
  };

  return (
    <Grid>
      <Grid.Column width={5}>
        <Search
          aligned="right"
          loading={isLoading}
          onResultSelect={handleResultSelect}
          onSearchChange={_.debounce(handleSearchChange, 1000, {
            leading: true
          })}
          results={results}
          value={value}
          {...props}
        />
      </Grid.Column>
    </Grid>
  );
};

const mapStateToProps = state => {
  return { users: state.accounts.users };
};

export default connect(mapStateToProps, { getAllAccounts })(SearchForm);
