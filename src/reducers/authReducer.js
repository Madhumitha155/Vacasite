const initState={}
const authReducer=(state=initState,action)=>{
    if(action.type==="REGISTER_ACTION"){
        return action.payload;
    }
    else if(action.type==="LOGOUT"){
        return initState;
    }
    else{
    return state;
    }
}
export default authReducer;