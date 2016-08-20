// import React from 'react';
// import ReactDOM from 'react-dom';
//
// import $ from 'jquery';
// import _ from 'lodash';
//
// class Modal extends React.Component {
//     render() {
//         return <ProtoModal onHidden={this.props.onHidden}
//                            onApprove={this.props.onApprove}
//                            onDeny={this.props.onDeny}
//                            onHide={this.props.onHide}
//                            onShow={this.props.onShow}>
//             {this.props.children}
//         </ProtoModal>;
//     }
// }
//
// export default Modal;
//
// class ProtoModal extends React.Component {
//     componentDidMount() {
//         $(ReactDOM.findDOMNode(this)).modal({
//             detachable: false,
//             allowMultiple: true,
//             onHidden: _.get(this, ["props", "onHidden"], _.noop),
//             onApprove: _.get(this, ["props", "onApprove"], _.noop),
//             onDeny: _.get(this, ["props", "onDeny"], _.noop),
//             onHide: _.get(this, ["props", "onHide"], _.noop),
//             onShow: _.get(this, ["props", "onShow"], _.noop),
//             selector: {
//                 close: '.close',
//                 approve: '.command .ok',
//                 deny: '.command .cancel'
//             }
//         });
//     }
//
//     render() {
//         return <div className="ui basic modal  m-dimmer" onClick={_.bind(_.invoke, _, _, 'stopPropagation')}>
//             {this.props.children}
//         </div>
//     }
// }