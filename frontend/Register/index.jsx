import React, {Component} from 'react'
import PropTypes from 'prop-types'
import I18n from '@shopgate/pwa-common/components/I18n';
import connect from './connector.js'
import styles from './style.js'

// @TODO Move theme form elements into dedicated repo pwa-form and inject as dependency here
import RippleButton from './../../../../themes/theme-gmd/components/RippleButton'
import TextField from './../../../../themes/theme-gmd/components/TextField'

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
            <I18n.Text string="register.title" />
          </div>
          <div className={styles.subline}>
            <I18n.Text string="register.subTitle" />
          </div>
          <form onSubmit={this.handleSubmitForm}>
            <TextField
              type="email"
              name="mail"
              className={styles.input}
              label={<I18n.Text string="register.mail" />}
              onChange={this.handleMailChange}
              value={this.state.mail}
            />
            <TextField
              type="password"
              name="password"
              className={styles.input}
              label={<I18n.Text string="register.password" />}
              minLength={8}
              onChange={this.handlePasswordChange}
              value={this.state.password}
            />
            <TextField
              type="text"
              name="firstName"
              className={styles.input}
              label={<I18n.Text string="register.firstName" />}
              onChange={this.handleFirstNameChange}
              value={this.state.firstName}
            />
            <TextField
              type="text"
              name="lastName"
              className={styles.input}
              label={<I18n.Text string="register.lastName" />}
              onChange={this.handleLastNameChange}
              value={this.state.lastName}
            />
            <div className={styles.buttonWrapper} data-test-id="LoginButton">
              <RippleButton className={styles.button} type="secondary" disabled={this.props.isLoading}>
                <I18n.Text string="register.button" />
              </RippleButton>
            </div>
          </form>
        </section>
      </View>
    )
  }
}

export default connect(Register)
