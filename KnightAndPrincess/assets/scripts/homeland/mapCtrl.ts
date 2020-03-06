const {ccclass, property} = cc._decorator;

@ccclass
export default class mapCtrl extends cc.Component {
    speed=1.0

    @property(cc.Camera)
    cameNode=null

    onLoad () {
        this.node.on(cc.Node.EventType.TOUCH_START,this.onTouchStart,this)
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove,this)
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd,this)
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEnd,this)
    }
    onDestroy(){
        this.node.targetOff(this)
    }

    onTouchStart(e){
        // this.node._touchListener.setSwallowTouches(false)
        return true
    
    }
    onTouchMove(e){
       const {x:lx,y:ly} = e.getDelta()
       const x=this.cameNode.node.x-lx * this.speed
       const y=this.cameNode.node.y-ly * this.speed
       const {width,height}=cc.view.getVisibleSize()

       const deltaWid=(1024*3- width)>>1
       const deltaHei=(1024*2- height)>>1
       
       if(x<deltaWid&&x>-deltaWid){
        this.cameNode.node.x=x
       }
       if(y<deltaHei&&y>-deltaHei){
        this.cameNode.node.y=y
       }
        
    }

    onTouchEnd(e){
        
     }
    start () {
        
    }

    // update (dt) {}
}
