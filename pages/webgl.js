import { Component } from 'react';
import withRedux from 'next-redux-wrapper';
import { initStore } from '/store';
import { pageWithGuest } from '/hocs';
import Canvas from '/components/Canvas';

class webGLPage extends Component {

    constructor(props){
        super(props);
    }

    render(){
        return(
            <div>
                <Canvas text="blonde blonde"/>
            </div>
        );
    }

}

export default withRedux(initStore, null, null)(pageWithGuest(webGLPage));