import React from 'react'
import FormItem from "../FormItem";
class List extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        const list=this.props.list.map((item,index)=>{
            return <FormItem value={item} key={index} delete={this.props.delete} index={index}></FormItem>
        })
        return list;
    }
}

export default List;