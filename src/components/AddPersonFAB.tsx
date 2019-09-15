import { PhoneNumberUtil } from 'google-libphonenumber';
import { inject } from 'mobx-react';
import React, { PureComponent } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { FAB } from 'react-native-paper';
import { Contact } from 'react-native-select-contact';
import { NavigationInjectedProps } from 'react-navigation';
import { cypGreen, materialUILayout } from '../lib/Constants';
import Contacts from '../lib/Contacts';
import Fremium from '../lib/Fremium';
import { formatPhoneNumber } from '../lib/Helpers';
import { Store } from '../lib/Store';
import { Frequency, Person } from '../Types';

interface Props extends NavigationInjectedProps {
  onPress: (person: Person) => void;
  store?: Store;
}

export default inject('store')(
  class AddPersonFAB extends PureComponent<Props> {
    private phoneNumberUtil = PhoneNumberUtil.getInstance();

    public render() {
      return (
        <View style={styles.view}>
          <FAB
            icon='person-add'
            onPress={this.fremiumAddPerson}
            style={styles.fab}
            accessibilityLabel={'Add Contact'}
          />
        </View>
      );
    }

    private fremiumAddPerson = async (): Promise<any> => {
      const fremium = new Fremium(this.props.store!);

      if (await fremium.canAddContacts()) {
        this.addPerson();
      } else {
        await fremium.check();
      }
    }

    private addPerson = (): void => {
      Contacts().then((selectedContact) => {
        if (selectedContact) {
          if (!selectedContact.phones || selectedContact.phones.length === 0) {
            Alert.alert('This contact has no phone number.');

            return;
          }

          const newPerson = new Person(
            this.formatPhones(selectedContact),
            Frequency.once_A_Week,
            [],
            [],
            [],
            '',
          );

          this.props.onPress(newPerson);
        }
      });
    }

    private formatPhones = (contact: Contact): Contact => {
      const phones = contact.phones.map((phoneEntry) => ({
        number: formatPhoneNumber(this.phoneNumberUtil, phoneEntry.number),
        type: phoneEntry.type,
      }));

      return { ...contact, phones };
    }
  },
);

const styles = StyleSheet.create({
  fab: {
    backgroundColor: cypGreen,
    color: 'black',
  },
  view: {
    bottom: 0,
    margin: materialUILayout.margin,
    position: 'absolute',
    right: 0,
  },
});
