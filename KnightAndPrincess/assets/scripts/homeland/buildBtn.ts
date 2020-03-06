const {ccclass, property} = cc._decorator;
@ccclass
export default class BuildBtn extends cc.Component {

    //所有按钮 预制体
    @property(cc.Prefab)
    btnPrefabs=[]

    //所有建筑 父节点
    @property(cc.Node)
    buildRoot=null

    // 升级 详情 出兵  等弄能 按钮
    @property(cc.Node)
    mark_build_btns=null


    //主摄像机
    @property(cc.Camera)
    mainCamera=null

    //按钮数据
    btnData={
        ID_4283:{
         prefabIndex:0,
         nickName:'升级'
        },
        ID_4284:{
            prefabIndex:1,
            nickName:'加速'
         },
         ID_4286:{
            prefabIndex:2,
            nickName:'详情'
        },
        ID_4288:{
            prefabIndex:3,
            nickName:'征税'
        },
        ID_42812:{
            prefabIndex:4,
            nickName:'募兵'
        },
        ID_42814:{
            prefabIndex:5,
            nickName:'研究'
        },
        ID_42816:{
            prefabIndex:6,
            nickName:'训练'
        }
    }

  // 每个建筑对应按钮列表
      buildBtnList={
        castle:[0,1,2],
        school:[0,1,2],
        corps:[0,1,2],
        arena:[0,1,2],
        rune:[0,1,2],
        warehouse_one:[0,1,2],
        warehouse_two:[0,1,2],
        warehouse_three:[0,1,2],
        prisoner:[0,1,2],
        barracks_two:[0,1,2],
        barracks_one:[0,1,2],
        trainning:[0,1,2],
        tavern:[0,1,2],
        wonder:[0,1,2],
        army:[0,1,2],
        workshop:[0,1,2],
        shop:[0,1,2],
        smithy:[0,1,2],
        house:[0,1,2],
        tower:[0,1,2],
        war:[0,1,2],
        field:[0,1,2],
        hood:[0,1,2],
        stone:[0,1,2],
        iron:[0,1,2]
      }
    


    onLoad(){}

    start () {
        this.buildRoot.children.forEach((element:cc.Node) => {
            //    let btn =element.addComponent(cc.Button)
            //         /** !#en Transition type
            //     !#zh 按钮状态改变时过渡方式。 */
            //     btn.transition = cc.Button.Transition.COLOR;
            //     /** !#en Normal state color.
            //     !#zh 普通状态下按钮所显示的颜色。 */
            //     btn.normalColor=cc.Color.WHITE	
            //     /** !#en Pressed state color
            //     !#zh 按下状态时按钮所显示的颜色。 */
            //     btn.pressedColor=cc.Color.RED		
            //     /** !#en Hover state color
            //     !#zh 悬停状态下按钮所显示的颜色。 */
            //     btn.hoverColor=cc.Color.GRAY
            //     // console.log(element.name)
            //     element.on("click",　()=>{
            //         this.buttonclick(element,element.name)
            //     },element,true)
              
            

            element.on(cc.Node.EventType.TOUCH_START,()=>{
                this.buttonclick(element,element.name)
                element.color= cc.Color.GRAY.clone()
                return false
            },element)

            element.on(cc.Node.EventType.TOUCH_MOVE, ()=>{
                // this.closeAllbtns()
                element.color= cc.Color.GRAY.clone()
            },element)


            element.on(cc.Node.EventType.TOUCH_END, ()=>{
                // this.closeAllbtns()
                element.color= cc.Color.WHITE.clone()

            },element)

            element.on(cc.Node.EventType.TOUCH_CANCEL, ()=>{
                this.closeAllbtns()
                element.color= cc.Color.WHITE.clone()

            },element)

            if(element['_touchListener']){
                element['_touchListener'].setSwallowTouches(false);
            }
            


        });

    }

   

    closeAllbtns(){
        this.mark_build_btns.removeAllChildren(true)
    }
    //获取建筑的 mark坐标
    getTouchNode(target){
        
        let targetV2=target.parent.convertToWorldSpaceAR(target.getPosition())
        let result=this.mark_build_btns.convertToNodeSpaceAR(cc.v2(targetV2.x,targetV2.y))

        // result.y+=20
        return result
    }

    //根据点击建筑 创建对应按钮列表
    creatBtns(target,pos){
        console.log(target.name)
        // const buildName=target.name
        if(!target.name||!this.buildBtnList[target.name]) {
            console.error('未找到建筑名字 或 未知建筑数据')
            return
        }

       
        this.closeAllbtns()

        // for (let index = 0; index < array.length; index++) {
        //     const element = array[index];
            
        // }
        //获取btn数量
        let  allCount=this.buildBtnList[target.name].length
        //每一个 按钮宽度
        let   wid=65+20
        let   allWid=allCount*wid
        let   staroffx=-allWid/2
        let   offyHei={
            'count_1':[0],
            'count_2':[100,100],
            'count_3':[80,100,80],
            'count_4':[80,100,100,80],
            'count_5':[60,80,100,80,60],
        }

        this.buildBtnList[target.name].forEach((key,_index)=> {
        //  const key=element
         const index=parseInt(_index)
         console.log("我是 -key>"+key+" 我是index"+ index+ "一共几个->"+allCount)
         console.log(staroffx+"   "+wid+"   "+offyHei['count_'+allCount][index])

         let child_btn_barrack=cc.instantiate(this.btnPrefabs[key])
         child_btn_barrack.position=pos
         child_btn_barrack.y=child_btn_barrack.position.y+offyHei['count_'+allCount][index]
         child_btn_barrack.x=child_btn_barrack.position.x+staroffx+index*wid
         this.mark_build_btns.addChild(child_btn_barrack)
           
       });

        return true
    }

    //-->获取建筑目标-->转化到mark坐标
    buttonclick(target,data){
        if(!target) return 
        //没创建成功
        this.creatBtns(target,this.getTouchNode(target))



      
    }
    update (dt) {}
}
