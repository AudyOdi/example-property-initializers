import React from 'react';
import { View, TextInput, ScrollView, StyleSheet } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';

import defaultProfilePicture from './default-profile-pic.png';

export default class List extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      list: this.props.list,
      searchInput: '',
    };
    this._handleInputChanges = this._handleInputChanges.bind(this);
    this._filterList = this._filterList.bind(this);
  }
  componentWillUnmount() {
    this._filterTimeout && clearTimeout(this._filterTimeout);
  }
  render() {
    let { searchInput } = this.state;
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
          {this.state.list.map((name, index) => {
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
  }

  _handleInputChanges(searchInput: string) {
    this.setState({ searchInput });

    if (this._filterTimeout) {
      clearTimeout(this._filterTimeout);
    }

    this._filterTimeout = setTimeout(this._filterList, 400);
  }

  _filterList() {
    let filterText = this.state.searchInput.toLowerCase();
    let { list } = this.props;
    this.setState({
      list: list.filter(name => name.toLowerCase().includes(filterText)),
    });
  }
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
