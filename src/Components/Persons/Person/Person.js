import React, { Component } from 'react';
import Aux from '../../../hoc/Auxilary'
import withClass from '../../../hoc/withClass';
import classes from './Person.css';
import AuthContext from '../../../context/auth-context';

class Person extends Component {
  constructor(props) {
    super(props);
    this.inputElementRef = React.createRef();
  }

  static contextType = AuthContext;

  componentDidMount() {
    // this.inputElement.focus();
    this.inputElementRef.current.focus();
    console.log(this.context.authenticated);
  }
  
  render() {
    console.log('[Person.js] rendering....');

    return (
      <Aux>
        <AuthContext.Consumer>
          {(context) =>
            context.authenticated ? <p>Authenticated!</p> : <p>Please log in</p>
          }
        </AuthContext.Consumer>

        <p onClick={this.props.click}>
          I'm {this.props.name} and I am {this.props.age} years old!
        </p>
        <p>{this.props.children}</p>
        <input
          type="text"
          ref={this.inputElementRef}
          // ref={(inputEl) => { this.inputElement = inputEl }}
          onChange={this.props.changed}
          value={this.props.name}
        />
      </Aux>
      //if dont want to use div we can return the elements by wraping with [] and spacing with commas
      //using key value to as the unique identifier
    );
  }
};

export default withClass(Person, classes.Person);
