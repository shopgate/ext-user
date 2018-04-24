import React, {Component} from 'react'
import PropTypes from 'prop-types'
import I18n from '@shopgate/pwa-common/components/I18n';
import Button from '@shopgate/pwa-common/components/Button';
import Input from '@shopgate/pwa-common/components/Input';
import connect from './connector.js'
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
            <I18n.Text string="register.title" />
          </div>
          <div className={styles.subline}>
            <I18n.Text string="register.subTitle" />
          </div>
          <form onSubmit={this.handleSubmitForm}>
            <label><I18n.Text string={"register.mail"} /></label>
            <Input
              type="email"
              name="mail"
              className={styles.input}
              onChange={this.handleMailChange}
              value={this.state.mail}
            />
            <label><I18n.Text string={"register.password"} /></label>
            <Input
              type="password"
              name="password"
              className={styles.input}
              minLength={8}
              onChange={this.handlePasswordChange}
              value={this.state.password}
            />
            <label><I18n.Text string={"register.firstName"} /></label>
            <Input
              type="text"
              name="firstName"
              className={styles.input}
              onChange={this.handleFirstNameChange}
              value={this.state.firstName}
            />
            <label><I18n.Text string={"register.lastName"} /></label>
            <Input
              type="text"
              name="lastName"
              className={styles.input}
              onChange={this.handleLastNameChange}
              value={this.state.lastName}
            />
            <div className={styles.buttonWrapper} data-test-id="LoginButton">
              <Button className={styles.button} type="secondary" disabled={this.props.isLoading}>
                <I18n.Text string="register.button" />
              </Button>
            </div>
          </form>
        </section>
      </View>
    )
  }
}

export default connect(Register)
