import { inject } from 'mobx-react';
import React, { PureComponent } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { FAB } from 'react-native-paper';
import { Contact } from 'react-native-select-contact';
import { NavigationInjectedProps } from 'react-navigation';
import { cypGreen, defaultReminder, materialUILayout } from '../lib/Constants';
import Contacts from '../lib/Contacts';
import Format from '../lib/Format';
import Fremium from '../lib/Fremium';
import { PeopleStore } from '../lib/store/People';
import { SettingsStore } from '../lib/store/Settings';
import { Frequency, Person } from '../Types';

interface Props extends NavigationInjectedProps {
  peopleStore?: PeopleStore;
  settingsStore?: SettingsStore;
  onPress: (person: Person) => void;
}

export default inject('peopleStore', 'settingsStore')(
  class AddPersonFAB extends PureComponent<Props> {
    private format = new Format();

    public render() {
      return (
        <View style={styles.view}>
          <FAB
            icon='account-plus'
            onPress={this.fremiumAddPerson}
            style={styles.fab}
            accessibilityLabel={'Add Contact'}
          />
        </View>
      );
    }

    private fremiumAddPerson = async (): Promise<any> => {
      const fremium = new Fremium(this.props.peopleStore!, this.props.settingsStore!);

      if (fremium.canAddContacts()) {
        this.addPerson();
      } else {
        await fremium.upgrade();
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
            Frequency.onceAWeek,
            [],
            [],
            [],
            '',
            defaultReminder,
          );

          this.props.onPress(newPerson);
        }
      });
    }

    private formatPhones = (contact: Contact): Contact => {
      const phones = contact.phones.map((phoneEntry) => ({
        number: this.format.formatPhoneNumber(phoneEntry.number),
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
