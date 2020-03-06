
const {ccclass, property} = cc._decorator;

// import {http} from '../utils/HTTP.js'

// cc['vv']={}

// interface IUser {
//     name: string;
//     password: string;
//     url: string;
// }

function initManager() {
    //   _http=http
    let vv:any={}
     
}

// namespace ddff{
//    export var __name:String
//     export var agegeg:String
// }



// export namespace  cc{
// var session = new aa();

// (cc as any).aa = 'papapapa';
// }

@ccclass
export  class CheckVersion extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    onConfigDataLoaded(){

    }
    // LIFE-CYCLE CALLBACKS:


    onLoad () {
        initManager()
        // cc.vv.http.sendRequest('/test',{version:'1.0.0.1'},(data)=>{

        //     console.log('服务器过来的数据为:-->'+ data.version)

        // })
    }

    start () {

    }

}
