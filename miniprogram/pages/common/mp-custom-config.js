/**
 * @author 1215618342@qq.com
 * mp自定义配置
 */
export default class MpCuConfig {
  
  constructor(type){
    this.type = type;
  }


  /**
   * @author 1215618342@qq.com
   * 默认主题配置1
   */
  defaultConfig(){

    let config = {
      myStyle:{
        tagStyle:{
          table: 'border-collapse:collapse;border-top:1px solid gray;border-left:1px solid gray;margin: 28rpx 0;',
          th: 'border-right:1px solid gray;border-bottom:1px solid gray;background: #ccc;',
          td: 'border-right:1px solid gray;border-bottom:1px solid gray;',
          blockquote: ' display: block;padding: 15px 1rem;font-size: 0.8em;padding-right: 15px;margin: 0.5em 0;border-left: 6px solid #dce6f0;background: #f2f7fb;overflow: auto;overflow-scrolling: touch; word-wrap: normal;word-break: normal;',
          ul: 'padding-left: 15px;line-height: 1.85;',
          ol: 'padding-left: 15px;line-height: 1.85;',
          li: 'margin-bottom: 12px;line-height: 1.85;',
          h1: 'font-size: 1.5em;line-height: 50px;font-weight: normal;text-align: center;',
          h2: 'text-align: left;margin: 20px 10px 0px 0px;font-size: 18px;font-weight: 700;color: #222;display: inline-block;padding-left: 10px;border-left: 5px solid rgb(248, 57, 41);',
          h3: 'font-size: 0.83em;line-height: 30px;margin-top:5px',
          h4: 'font-size: 0.67em;line-height: 30px;',
          h5: 'font-size: 0.50em;line-height: 30px;',
          p: 'line-height: 1.85;margin: 0.8em 0;font-size: 16px;color: #353535;',
          'code': 'word-wrap:break-word;color:#EA5455 ;font-size:14px',
          strong:'font-weight: 700;color: rgb(248, 57, 41);',
          video: 'width: 100%'
        },
        containStyle:'font-family: Optima-Regular, Optima, PingFangSC-light, PingFangTC-light, "PingFang SC", Cambria, Cochin, Georgia, Times, "Times New Roman", serif;margin: 10px;padding:10px;font-size: 16px;color: #353535;word-spacing: 0.8px;letter-spacing: 0.8px;border-radius: 16px;background-color:#FFFFFF;'
        
      }
    }

    if(this.type === 'journal'){
      return this.journalConfig();
    }else{
      return config;
    }
  }

  /**
   * 日志随笔自定义渲染配置
   */
  journalConfig(){
    let config = {
      myStyle:{
        tagStyle:{
          table: 'border-collapse:collapse;border-top:1px solid gray;border-left:1px solid gray;margin: 28rpx 0;',
          th: 'border-right:1px solid gray;border-bottom:1px solid gray;background: #ccc;',
          td: 'border-right:1px solid gray;border-bottom:1px solid gray;',
          blockquote: ' display: block;padding: 15px 1rem;font-size: 0.8em;padding-right: 15px;margin: 0.5em 0;border-left: 6px solid #dce6f0;background: #f2f7fb;overflow: auto;overflow-scrolling: touch; word-wrap: normal;word-break: normal;',
          ul: 'padding-left: 15px;line-height: 1.85;',
          ol: 'padding-left: 15px;line-height: 1.85;',
          li: 'margin-bottom: 12px;line-height: 1.85;',
          h1: 'font-size: 1.5em;line-height: 50px;font-weight: normal;text-align: center;',
          h2: 'text-align: left;margin: 20px 10px 0px 0px;font-size: 18px;font-weight: 700;color: #222;display: inline-block;padding-left: 10px;border-left: 5px solid rgb(248, 57, 41);',
          h3: 'font-size: 0.83em;line-height: 30px;margin-top:5px',
          h4: 'font-size: 0.67em;line-height: 30px;',
          h5: 'font-size: 0.50em;line-height: 30px;',
          p: 'line-height: 1.85;margin: 0.2em 0;font-size: 16px;color: #353535;',
          'code': 'word-wrap:break-word;color:#EA5455 ;font-size:14px',
          strong:'font-weight: 700;color: rgb(248, 57, 41);',
          video: 'width: 100%',
          img:'width:190rpx;height:130rpx;border-radius: 12rpx !important;margin:10rpx;'
        },
        containStyle:'font-family: Optima-Regular, Optima, PingFangSC-light, PingFangTC-light, "PingFang SC", Cambria, Cochin, Georgia, Times, "Times New Roman", serif;margin: 0px;padding:5px;font-size: 16px;color: #353535;word-spacing: 0.8px;letter-spacing: 0.8px;border-radius: 16px;background-color:#FFFFFF;'
        
      }
    }
    return config;
  }




}