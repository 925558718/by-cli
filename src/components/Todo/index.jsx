import React from 'react'
import Form from '@/components/Form'
import List from '@/components/List'
class Todo extends React.Component {
    constructor(props){
        super(props);
        this.state={
            list:[]
        }
        this.addItem=this.addItem.bind(this)
        this.deleteItem=this.deleteItem.bind(this)
    }
    render() {
        return (
            <div>
                <Form add={this.addItem}></Form>
                <List list={this.state.list} delete={this.deleteItem}></List>
            </div>
        )
    }
    addItem(e){
        this.setState({
            list:[...this.state.list,e]
        })
    }
    deleteItem(e){
        const list=this.state.list.filter((item,index)=>{
            return index!=e;
        })
        this.setState({
            list:list
        })
    }
}

export default Todo