import React, { Component, StyleSheet, View } from 'react-native';

import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';

import styles from '.././styles';

module.exports = React.createClass({

  render() {
    return (

        <ActionButton buttonColor="rgba(231,76,160,1)">
          <ActionButton.Item buttonColor='#9b59b6' title="SMS" onPress={() => {}}>
            <Icon name="android-create" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>

    );
  }

});
