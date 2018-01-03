import { Component } from 'react';
import { Button, Form, FormControl, FormGroup, InputGroup, OverlayTrigger, Popover } from 'react-bootstrap';

export default class ChatInput extends Component {
  render() {
    const { onSubmit, onChange, field, users } = this.props;

    const popoverOnlineUser = (
      <Popover id="popover-positioned-top" title="Online Users">
        {users.length === 0 && <p>No user</p>}
        {users.length > 0 && users.map(user => (<p>{user}</p>))}
      </Popover>
    );

    return (
      <Form onSubmit={onSubmit} className="chat-input">
        <FormGroup className="col-md-10 col-xs-10">
          <InputGroup>
            <FormControl type="text" bsSize="lg" placeholder="Enter your message.." onChange={onChange} value={field}/>
            <InputGroup.Button>
              <Button bsSize="lg">Send</Button>
            </InputGroup.Button>
          </InputGroup>
        </FormGroup>
        <div className="col-md-2 col-xs-2">
          <OverlayTrigger trigger="click" placement="top" overlay={popoverOnlineUser}>
            <Button bsSize="lg" bsStyle="success"><i className="fa fa-circle"></i> {users.length} online</Button>
          </OverlayTrigger>
        </div>
      </Form>
    );
  }
}