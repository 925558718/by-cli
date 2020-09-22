import React from 'react'
import './index.stylus'
class Form extends React.Component {
    constructor(props){
        super(props);
        this.state={
            value:''
        }
        this.click=this.click.bind(this);
        this.change=this.change.bind(this);
    }
    render() {
        return (
            <div className={'form'}>
                <input className={'input'} value={this.state.value} onChange={this.change}/>
                <button className={'btn'} onClick={this.click}>click</button>
            </div>
        )
    }
    click(){
        const value=this.state.value.trim();
        if(!value) {return;}
        this.props.add(this.state.value)
    }
    change(e){
        this.setState({
            value:e.target.value
        })
    }
}

export default Form