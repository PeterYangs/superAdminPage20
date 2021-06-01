
const common=(app,store)=>{

    app.config.globalProperties.test=function (){


        console.log('test')

    }


    app.config.globalProperties.store=function (){


        console.log(store.state.count)

    }

}


export default common