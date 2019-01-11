import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import HomeContainer from './containers/HomeContainer';
import Layout from './hoc/Layout';
import auth from './hoc/auth';

const BookDetails = React.lazy(() => import('./containers/BookDetaileContainer'));
const Login = React.lazy(() => import('./containers/Admin/Login'));
const User = React.lazy(() => import('./containers/Admin/User'));
const AddReview = React.lazy(() => import('./containers/Admin/AddReview'));
const UserPosts = React.lazy(() => import('./containers/Admin/UserPostsContainer'));
const EditReview = React.lazy(() => import('./containers/Admin/EditReview'));
const Register = React.lazy(() => import('./containers/Admin/RegisterContainer'));
const Logout = React.lazy(() => import('./containers/Admin/Logout'));


class Routes extends React.Component {






    render() {
        console.log('the props in render ', this.props);
        return (
            <BrowserRouter>
                <Layout>
                    <React.Suspense fallback={<div>Loading...</div>}>
                        <Switch >
                            <Route path="/books" exact={true} render={(props) => <HomeContainer {...props} />} />
                            <Route path="/books/:id" exact={true} component={auth(BookDetails)} />
                            <Route path="/login" exact={true} component={auth(Login)} />
                            <Route path="/user" exact={true} component={auth(User)} />
                            <Route path="/user/add-reviews" exact={true} component={auth(AddReview)} />
                            <Route path="/user/edit/:id" exact={true} component={auth(EditReview)} />
                            <Route path="/user/user-reviews" exact={true} component={auth(UserPosts)} />
                            <Route path="/user/register" exact={true} component={auth(Register)} />
                            <Route path="/logout" exact={true} render={(props) => <Logout {...props} />} />
                            <Redirect from="/" exact={true} to="/books" />
                            <Redirect exact={true} to="/" />
                        </Switch>
                    </React.Suspense>
                </Layout>

            </BrowserRouter>
        )
    }
}


export default Routes;



