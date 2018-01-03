import { Component } from 'react';
import PropTypes from 'prop-types';

class SearchBar extends Component {

  constructor(props) {
    super(props);

    this.state = {
      keyword: ''
    }

    this._onChange = this._onChange.bind(this);
  }

  componentWillMount() {
    this.updateItems();
  }

  _onChange(event) {
    this.setState({ keyword: event.target.value }, this.updateItems);
  }

  updateItems() {
    let filteredItems = [];
    if(this.props.items && this.props.items.length) {
      filteredItems = this.filter(this.props.items, this.state.keyword, this.props.properties);
    }
    this.props.onChange(filteredItems);
  }

  filter(items, keyword, properties = []) {
    if(keyword === '') return items;
    if(properties.length === 0){
      const objKeys = Object.keys(item);
      return items.filter((item) => {
        for(let p in objKeys) {
          if(item[p].toString().toLowerCase().indexOf(keyword.toLowerCase()) > -1)
            return item;
        }
      });
    }
    else{
      return items.filter((item) => {
        for(let i = 0; i <= properties.length; i++) {
          const p = properties[i];
          if(item.hasOwnProperty(p) && item[p].toString().toLowerCase().indexOf(keyword.toLowerCase()) > -1)
            return item;
        }
      });
    }
  }

  render() {
    const { className, style } = this.props;
    const { keyword } = this.state;
    return (
      <div className={className} style={style} >
        <div className="form-group has-feedback">
          <input type="text" className="form-control" value={keyword} onChange={this._onChange} />
          <span className="form-control-feedback">
            <i className="fa fa-search"></i>
          </span>
      </div>
      </div>
    );
  }
}

SearchBar.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  items: PropTypes.array.isRequired,
  properties: PropTypes.array,
  onChange: PropTypes.func.isRequired
}

export default SearchBar;