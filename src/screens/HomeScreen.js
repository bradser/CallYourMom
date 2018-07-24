import React, {Component} from 'react';
import { AsyncStorage, Button, Text, View, StyleSheet, TouchableOpacity,
          Alert, TextInput } from 'react-native';
import { Table, Row, Rows, Cell, TableWrapper } from 'react-native-table-component';

const FBSDK = require('react-native-fbsdk');
const {
  LoginManager,
} = FBSDK;

let personList = [
  ['Joe Cool', '10', 'Medium', 'Gear Pic'],
];

let person = [];
let defaultData = [
  ['Name'],
  ['Phone Number'],
  ['Days Remaining'],
  ['Frequency'],
];


export class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ['Name', 'Days Remaining', 'Frequency', 'Edit'],
      tableData: personList,
      addPerson: false,
      changeData: false,
      text: '',
      tableHeadTwo: ['Add Person'],
      tableDataTwo: defaultData,
    }
  }
  
  static navigationOptions = {
    title: 'Call Your Mom!',
  };

    
    
    render() {
      const state = this.state;
      let addTable;
      let confirmButton;
      

      if (this.state.addPerson) {
        addTable = 
        <TouchableOpacity onPress={this._changeDataCheck}>
        <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
          <Row data={state.tableHeadTwo} style={addPersonStyles.head} textStyle={addPersonStyles.text}/>
          <Rows data={state.tableDataTwo} textStyle={addPersonStyles.text} />
        </Table>
        </TouchableOpacity>

        confirmButton = <Button title="Confirm" onPress={this._addPersonCheck}></Button>
      }
      return (
        <View style={styles.container}>
          <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
            <Row data={state.tableHead} style={styles.head} textStyle={styles.text}/>
            <Rows data={state.tableData} textStyle={styles.text}/>
          </Table>


          <Button title="Add" onPress={this._addPersonCheck}></Button>
          <Button title="Delete"></Button>
          <Button title="Show me more of the app" onPress={this._showMoreApp} />
          <Button title="Actually, sign me out :)" onPress={this._signOutAsync} />

          {addTable}
          {confirmButton}
         
          
        </View>
        
      );
    }

    _addPersonCheck = () => {
      if (!this.state.addPerson) {
        this.setState({
          addPerson: true,
        })
      } else {
        for (let i = 0; i < this.state.tableDataTwo.length; i++) {
          person.push(this.state.tableDataTwo[i]);
        }
        personList.push(person);
        person = [];
        this.setState({
          tableData: personList,
          addPerson: false,
        })
      }
    }

  
    _showMoreApp = () => {
      this.props.navigation.navigate('Details');
    };
  
    _signOutAsync = async () => {
      LoginManager.logOut();

      await AsyncStorage.clear();
      
      this.props.navigation.navigate('Auth');
    };
  }

  const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    head: { height: 40, backgroundColor: '#f1f8ff' },
    text: { margin: 6, textAlign: 'center' }
  });

  const addPersonStyles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    head: { height: 40, backgroundColor: 'orange' },
    text: { margin: 6, textAlign: 'center', color: 'black' },
    row: { flexDirection: 'row', backgroundColor: '#FFF1C1' },
    btn: { width: 58, height: 18, backgroundColor: '#78B7BB',  borderRadius: 2 },
    btnText: { textAlign: 'center', color: '#fff' }
  });

  
  
  

 

  

  