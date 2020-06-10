import React, { useState, useEffect } from "react";
import _ from "lodash";
import { Search, Grid, Loader } from "semantic-ui-react";
import { connect } from "react-redux";
import { getAllAccounts } from "../../redux/actions";
import history from "../../history"

const SearchForm = props => {
  const [isLoading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [selected, setSelected] = useState("");
  const [value, setValue] = useState("");

  useEffect(() => {
    props.getAllAccounts();
  }, []);

  const handleResultSelect = (e, { result }) => {
    history.push(`/home/${selected}/profile`);
    history.go();
  };

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

    const filter = _.find(users, { firstname: value });

    if (filter !== undefined) {
      const name =
        filter.firstname + " " + filter.lastname;

      const source = _.times(1, () => ({
        title: name,
        description: filter.email
      }));

      setLoading(false);
      setResults(_.filter(source, isMatch));
      setSelected(filter.username)
    }
  };

  if (props.users === undefined) {
    return <Loader />;
  } else {
    return (
      <Grid>
        <Grid.Column width={5}>
          <Search
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
  }
};

const mapStateToProps = state => {
  return { users: state.accounts.users };
};

export default connect(mapStateToProps, { getAllAccounts })(SearchForm);
