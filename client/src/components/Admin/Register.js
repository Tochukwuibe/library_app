import React from 'react';



const showUsers = (users) => {
    let view = null;
    if (users) {
        view = users.map((user) => (
            <tr key={user._id}>
                <td>{user.firstname}</td>
                <td>{user.lastname}</td>
                <td>{user.email}</td>
            </tr>
        ))
    }

    return view;
}
const Register = ({ onSubmit, onInputChange, form, users }) => {
    return (
        <div className="rl_container">
            <form onSubmit={onSubmit}>
                <h2>Add User</h2>
                <div className="form_element">
                    <input
                        type="text"
                        name="firstname"
                        placeholder="Enter your firstname"
                        value={form.firstname}
                        onChange={onInputChange}
                    />
                </div>

                <div className="form_element">
                    <input
                        type="text"
                        name="lastname"
                        placeholder="Enter your lastname"
                        value={form.lastname}
                        onChange={onInputChange}
                    />
                </div>

                <div className="form_element">
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email..."
                        value={form.email}
                        onChange={onInputChange}
                    />
                </div>

                <div className="form_element">
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter your password..."
                        value={form.password}
                        onChange={onInputChange}
                    />
                </div>

                    <button type="submit">Add User</button>

            </form>

            <div className="current_users">
                <h4>Current Users</h4>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Lastname</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {showUsers(users)}
                    </tbody>
                </table>
            </div>
        </div>


    );
}

export default Register;
