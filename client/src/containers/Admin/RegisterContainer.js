import React, { Component } from 'react'
import Register from '../../components/Admin/Register';
import { connect } from 'react-redux';
import { Actions } from '../../store/actions/user.actions'

class RegisterContainer extends Component {

    initialForm = {
        firstname: '',
        lastname: '',
        email: '',
        password: ''
    };

    state = {
        form: this.initialForm,
        error: ''
    }




    componentDidMount() {
        this.props.dispatch(Actions.getUsers())
    }



    onSubmit = (e) => {
        e.preventDefault();
        this.props.dispatch(Actions.addUser(this.state.form, () => this.setState({form: this.initialForm, error: ''}) ))

    }

    onInputChange = ({ target: { name, value } }) => {
        const form = { ...this.state.form, [name]: value };
        this.setState({ form })
    }


    render() {
        return <Register
            form={this.state.form}
            onSubmit={this.onSubmit}
            onInputChange={this.onInputChange}
            users={this.props.users}
        />
    }
}

const mapStateToProps = ({ user: { users } }) => ({ users })

export default connect(mapStateToProps, null)(RegisterContainer);