import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {showNotifi} from 'actionNotification';
export default function(ComposedComponent,allowedRoles) {
  class Authenticate extends React.Component {
    constructor(props) {
      super(props)

      // In this case the user is hardcoded, but it could be loaded from anywhere.
      // Redux, MobX, RxJS, Backbone...
      this.state = {
        user: {
          name: 'vcarl',
          role: 'a'
        }
      }
    }
    componentWillMount() {
      if (!this.props.isAuthenticated) {

        this.context.router.history.push('/login');
        this.props.dispatch(showNotifi("bạn chưa đăng nhập"));
      }
    }

    componentWillUpdate(nextProps) {
      console.log(nextProps);
      if (!nextProps.isAuthenticated) {
        this.context.router.history.push('/');
      }
    }

    render() {

      const  role = this.props.role
      console.log(role);
      if (allowedRoles.includes(role)) {
        return (

          <ComposedComponent {...this.props} />
        );
      }
      else{
         return(
            <div className="row">
             <div className="col-md-4 col-md-offset-3">
              <div className="alert alert-danger">
                  <strong>!</strong> Bạn không có quyền truy nhập trang này
             </div>
             </div>
             </div>
         )
      }
    }
  }

  // Authenticate.propTypes = {
  //   isAuthenticated: React.PropTypes.bool.isRequired,
  //   addFlashMessage: React.PropTypes.func.isRequired
  // }
  //
  Authenticate.contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  function mapStateToProps(state) {
    return {
      isAuthenticated: state.auth.isAuthenticated,
      role : state.auth.user.username
    };
  }

  return connect(mapStateToProps)(Authenticate);
}
