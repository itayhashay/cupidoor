const errorFormatter = ({location,msg,param,value,nestedErrors}) =>{
    return {
        field: param,
        value,
        msg
    }
}

module.exports = errorFormatter;