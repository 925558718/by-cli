import React from 'react'
import './index.stylus'
class FormItem extends React.Component {
    constructor(props){
        super(props);
        this.delete=this.delete.bind(this);
    }
    render() {
        return (
            <div className={'formitem'}>
                <div className={'text'}>
                    {this.props.value}
                </div>
                <button className={'btn'} onClick={this.delete}>删除</button>
            </div>
        )
    }
    delete(){
        this.props.delete(this.props.index)
    }
}

export default FormItem