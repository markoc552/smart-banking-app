import _ from "lodash";
import faker from "faker";
import React, { useState, useEffect } from "react";
import { Search, Grid, Header, Segment } from "semantic-ui-react";
import { connect } from "react-redux";
import { getAccountInfo } from "../redux/actions";

const SearchForm = props => {
  const [isLoading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [value, setValue] = useState("");

  useEffect(() => {
    if (props.user !== undefined) {
      setTimeout(() => {
        props.getAccountInfo(value);
      }, 2000);
    }
  }, [props, value]);

  const handleResultSelect = (e, { result }) => setValue(result.title);

  const source = _.times(5, () => ({
    firstName: props.user.firstName,
    lastName: props.user.lastName
  }));

  const handleSearchChange = (e, { value }) => {
    setLoading(true);
    setValue(value);

    setTimeout(() => {
      const re = new RegExp(_.escapeRegExp(value), "i");
      const isMatch = result => re.test(result.title);

      setLoading(false);
      setResults(_.filter(source, isMatch));
    }, 300);
  };

  return (
    <Grid>
      <Grid.Column width={5}>
        <Search
          aligned="right"
          loading={isLoading}
          onResultSelect={handleResultSelect}
          onSearchChange={_.debounce(handleSearchChange, 500, {
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
  return { user: state.accounts.user };
};

export default connect(mapStateToProps, { getAccountInfo })(SearchForm);
