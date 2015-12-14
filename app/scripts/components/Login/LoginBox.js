import React, { PropTypes } from 'react';
import {connect} from 'react-redux';
import LoginForm from './LoginForm';
import LoginButton from './LoginButton';
import {modal} from '../../Actions';
import Modal from 'react-modal';
import cookie from '../../utils/cookie';

const mapStateToProps = (state) => {
    return {
        modalIsOpen: state.modal
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        closeModal : () => {
            modal(dispatch);
        },
        init: () => {
            dispatch({
                type: 'INITIAL_LOGIN',
                token: cookie.get('token'),
                logged: (cookie.get('token') !== undefined)
            })
        }
    }
}

class LoginBox extends React.Component {
    constructor(props) {
        super(props);
        props.init();
    }
    render () {
        return (
            <div className="">
                <LoginButton></LoginButton>
                <Modal className="modal-dialog"
                    style={ {
                        overlay: {
                            zIndex : 5
                        }
                    } }
                    isOpen={this.props.modalIsOpen}
                    onRequestClose={this.props.closeModal} >

                    <LoginForm/>
                </Modal>
            </div>

        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginBox);
