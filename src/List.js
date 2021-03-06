import React from 'react';
import { View, TextInput, ScrollView, StyleSheet } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';

import defaultProfilePicture from './default-profile-pic.png';

let filterList = (list, filterText) => {
  let lowerCasedFilterText = filterText.toLowerCase();
  return list.filter(name => name.toLowerCase().includes(lowerCasedFilterText));
};
export default class List extends React.Component {
  state = {
    list: filterList(this.props.list, 'Al'),
    searchInput: 'Al',
  };

  componentWillUnmount() {
    this._filterTimeout && clearTimeout(this._filterTimeout);
  }

  render = () => {
    let { searchInput, list } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Search by name"
            value={searchInput}
            onChangeText={this._handleInputChanges}
            autoCorrect={false}
          />
          <Icon name="search" size={26} color="#476DC5" />
        </View>
        <ScrollView>
          {list.map((name, index) => {
            return (
              <ListItem
                key={index} // please pardon this one
                roundAvatar
                avatar={defaultProfilePicture}
                title={name}
              />
            );
          })}
        </ScrollView>
      </View>
    );
  };

  _handleInputChanges = searchInput => {
    this.setState({ searchInput });

    if (this._filterTimeout) {
      clearTimeout(this._filterTimeout);
    }

    this._filterTimeout = setTimeout(this._filterList, 400);
  };

  _filterList = () => {
    this.setState({
      list: filterList(this.props.list, this.state.searchInput),
    });
  };
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  searchContainer: {
    height: 50,
    flexDirection: 'row',
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.08)',
  },
  textInput: {
    flex: 1,
    fontSize: 20,
  },
});
