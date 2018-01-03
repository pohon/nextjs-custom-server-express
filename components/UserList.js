import { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, ButtonToolbar } from 'react-bootstrap';
import Link from '/components/LinkWithLocale';
import Pagination from './Pagination';
import SearchBar from '/components/SearchBar';
import alert from '/helpers/alert';
import confirm from '/helpers/confirm';

class UserList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      items: [],
      pageOfItems: []
    }

    this.confirmDelete = this.confirmDelete.bind(this);
    this.onChangePage = this.onChangePage.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
  }

  onChangePage(pageOfItems) {
    this.setState({
      pageOfItems
    });
  }

  onSearchChange(items) {
    this.setState( {
      items
    });
  }

  confirmDelete(id) {
    confirm('Are you sure to delete?')
      .then(() => {
        this.props.deleteUser(id)
        alert("User has been deleted.").then(() => {})
      }, () => {
        // canceled
      });
  }

  render() {
    const { users } = this.props;
    const { items } = this.state;

    return (
      <div>
        <div className="row">
          <Pagination items={items} onChangePage={this.onChangePage} />
          <SearchBar items={users} onChange={this.onSearchChange} properties={['first_name', 'last_name']} className="col-md-4 col-xs-4 pull-right" style={{ margin: '20px 0'}}/>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Avatar</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {(!users || users.length === 0) &&
              <tr><td colSpan="4" className="text-center">No user data yet.</td></tr>
            }
            {this.state.pageOfItems.map((user, idx) => 
              <tr key={idx}>
                <td><img src={user.avatar} /></td>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>
                  <ButtonToolbar>
                    <Link route={`/users/${user.id}`} prefetch><Button bsStyle="primary">Detail</Button></Link>
                    <Button bsStyle="danger" onClick={() => this.confirmDelete(user.id)}>Delete</Button>
                  </ButtonToolbar>
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <Pagination items={items} onChangePage={this.onChangePage} />
      </div>
    );
  }
}

UserList.propTypes = {
  users: PropTypes.array.isRequired,
  deleteUser: PropTypes.func.isRequired
}

export default UserList;