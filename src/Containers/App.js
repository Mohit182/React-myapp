import React, { PureComponent } from 'react';
import Cockpit from '../Components/Cockpit/Cockpit';
import classes from './App.css';
import Persons from '../Components/Persons/Persons';
import withClass from '../hoc/withClass';
import Aux from '../hoc/Auxilary';
import AuthContext from '../context/auth-context';

class App extends PureComponent {
  constructor(props) {
    super(props);
    console.log('[App.js] constructor');
  }

  state = {
    persons: [
      { id: 'asfa1', name: 'Max', age: 28 },
      { id: 'vasdf1', name: 'Manu', age: 29 },
      { id: 'asdf11', name: 'Stephanie', age: 26 }
    ],
    otherState: 'some other value',
    showPersons: false,
    showCockpit: true,
    authenticated: false
  };

  static getDerivedStateFromProps(props, state) {
    console.log('[App.js] get derived state from props');
    return state;
  }

  componentDidMount() {
    console.log('[Ap.js] componentDidMount');
  }

  // componentWillMount() {
  //   console.log('[Ap.js] componentWillMount');
  // }

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log('[App.js]shouldComponentUpdate');
  //   if (
  //     nextProps.persons !== this.props.persons ||
  //     nextProps.changed != this.props.changed ||
  //     nextProps.clicked !== this.props.clicked
  //    ) {
  //     return true;
  //   } else {
  //     return false;
  //   }                  done with purecomponent

  // }

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    const person = {
      ...this.state.persons[personIndex]
    };

    // const person = Object.assign({}, this.state.persons[personIndex]);

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({ persons: persons });
  };

  deletePersonHandler = personIndex => {
    // const persons = this.state.persons.slice();
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({ persons: persons });
  };

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({ showPersons: !doesShow });
  };

  loginHandler = () => {
    this.setState({ authenticated: true })
  }
  render() {
    console.log('[App.js] render');
    let persons = null;

    if (this.state.showPersons) {
      persons =
        <Persons
          persons={this.state.persons}
          clicked={this.deletePersonHandler}
          changed={this.nameChangedHandler}
          isAuthenticated={this.state.authenticated}
        />;
    }

    return (
      <Aux>
        <button onClick={
          () => {
            this.setState({ showCockpit: false })
          }
        }>
          Remove Cockpit
        </button>
        <AuthContext.Provider
          value={{
            authenticated: this.state.authenticated,
            login: this.loginHandler
          }}
        >
            {this.state.showCockpit ? <Cockpit
            title={this.props.appTitle} 
            showPersons={this.state.showPersons}
            personsLength={this.state.persons.length}
            clicked={this.togglePersonsHandler}
          /> : null}
          {persons}
        </AuthContext.Provider>
      </Aux>
    );
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now?'));
  }
}

export default withClass(App, classes.App);
