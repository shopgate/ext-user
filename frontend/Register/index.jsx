import React, {Component} from 'react'
import PropTypes from 'prop-types'
import connect from './connector.js'
import RippleButton from './../../../../themes/theme-gmd/components/RippleButton'
import TextField from './../../../../themes/theme-gmd/components/TextField'
import styles from './style.js'

class Register extends Component {
  static propTypes = {
    register: PropTypes.func
  }

  static defaultProps = {
    register: () => {}
  }

  constructor(props) {
    super(props)

    this.state = {
      mail: '',
      password: '',
      firstName: '',
      lastName: '',
    }
  }

  handleMailChange = (mail) => {
    this.setState({mail})
  }
  handlePasswordChange = (password) => {
    this.setState({password})
  }
  handleFirstNameChange = (firstName) => {
    this.setState({firstName})
  }
  handleLastNameChange = (lastName) => {
    this.setState({lastName})
  }

  handleSubmitForm = (event) => {
    event.preventDefault()
    this.props.register(this.state)
  }

  render() {
    const {View} = this.props
    return (
      <View>
        <section className={styles.container} data-test-id="RegisterPage">
          <div className={styles.headline}>
            Register
          </div>
          <div className={styles.subline}>
            create new account
          </div>
          <form onSubmit={this.handleSubmitForm}>
            <TextField
              type="email"
              name="mail"
              className={styles.input}
              label="register.mail"
              onChange={this.handleMailChange}
              value={this.state.mail}
            />
            <TextField
              type="password"
              name="password"
              className={styles.input}
              label="register.password"
              onChange={this.handlePasswordChange}
              value={this.state.password}
            />
            <TextField
              type="text"
              name="firstName"
              className={styles.input}
              label="register.firstName"
              onChange={this.handleFirstNameChange}
              value={this.state.firstName}
            />
            <TextField
              type="text"
              name="lastName"
              className={styles.input}
              label="register.lastName"
              onChange={this.handleLastNameChange}
              value={this.state.lastName}
            />
            <div className={styles.buttonWrapper} data-test-id="LoginButton">
              <RippleButton className={styles.button} type="secondary" disabled={this.props.isLoading}>
                register.button
              </RippleButton>
            </div>
          </form>
        </section>
      </View>
    )
  }
}

export default connect(Register)
