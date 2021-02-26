import React from 'react';
const defaultProps = {
    loading: <p>loading</p>,
    error: <p>error</p>
}
function Async(loadComponent) {
    class AsyncComponent extends React.Component {
        constructor(props) {
            super(props);
            this.state={
                module:null
            }
        }
        componentWillMount() {
            this.load(defaultProps)
        }
        load(props) {
            this.setState({
                module:props.loading
            })
            loadComponent().then(res=>{
                let M=res.default?res.default:res;
                this.setState({
                    module:<M {...props}></M>
                })
            }).catch(err=>{
                this.module=props.error;
            })
        }
        render() {
            return this.state.module
        }
    }
    return AsyncComponent;
}

export default Async;