import React from 'react';
class ClassComponent extends React.Component {
    constructor(props){
        super(props);
        this.state={
            list:[1,2,3]
        }
    }
    render() {
        return (
            <div>
                123
            </div>
        )
    }
    static getDerivedStateFromProps(props,state){
        console.log(props,state)
        return {
            list:[1,2]
        };
    }
}

export default ClassComponent