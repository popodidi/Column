function setDimmer(dispatch, active, type,  title, message){
    dispatch({
        type: 'SET_DIMMER',
        dimmer: {
            active: active,
            type: type,
            title: title,
            message: message
        }
    })
}

function setLoading(dispatch, loading){
    dispatch({
        type: 'SET_LOADING',
        loading: loading
    });
}

function setAlert(dispatch, active, title, message){
    dispatch({
        type: 'SET_ALERT',
        alert: {
            active: active,
            title: title,
            message: message
        }
    })
}

export default {setDimmer, setLoading, setAlert};