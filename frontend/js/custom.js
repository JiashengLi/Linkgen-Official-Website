jQuery(document).ready(function($){
  $("#asset-detail-table").hide();
  $("#asset-detail").hide();
  // ////////console.log("height:"+$(document).height());
  $("#about-value-content").hide();
  $("#about-trd-content").hide();
  $("#about-adv-content").hide();
  $("#about-a-our").css("background-color","#612fb3");
  $("#about-a-our").css("font-weight","bold");
  $("#about-a-our").css("color","white");
  $("#recruit-job2-content").hide();
  $("#recruit-job1-content").hide();
  $("#recruit-job3-content").hide();
  $("#recruit-job4-content").hide();
  $("#recruit-job5-content").hide();

})
// var xhr =new XMLHttpRequest()
// xhr.open("GET", "test.txt", true);//注意路径问题读取data.txt文件的内容。
// xhr.send(null);
// xhr.onreadystatechange = function() {
//   if (xhr.readyState == 4) {
//     if (xhr.status == 200||xhr.status==0) {//请求本地txt文件时状态码是0。
//       ////////console.log("200||0::"+xhr.responseText);
//     } else {
//       ////////console.log("else:"+xhr.status);
//     }
//   }
// }


// var xbioURL = "https://192.168.2.93:8083/findByPaging"
// var xbioURL = "https://192.168.2.93:8083/getInfo"
// var xbioURL = "https://192.168.2.93:8083/getContact"
var xbioURL = "https://linkgen.ltd:8081/chemistry-2.5.3/findByPaging";
var contactURL = "https://linkgen.ltd:8081/chemistry-2.5.3/getContact";
var infoURL = "https://linkgen.ltd:8081/chemistry-2.5.3/getInfo";


var contactdata;
var contentCh='';
var contentEn = '';


var getContact =$.ajax({
    type: "POST",
    url: contactURL,
    dataType: "json",
    data:{
          advType:1,         
      },
    success: function(data){
        if (data.data.length != 0){
          contactdata = data;
        
          activeContact();
        }else{
          //////////console.log("空")
        }
          
      },

    complete: function(XMLHttpRequest, textStatus){
      },
    error: function(){
      ////////////console.log("error")
      }
    });


function activeContact(){//生成联系方式列表
  
    var contacttext =           '<div class="row" id="contactbox">';
    contacttext = contacttext+            '<table class="table table-condensed col-md-4">';
    contacttext = contacttext+            '<thead><tr><th>'+(contactdata.data[0]).companyCh+'</th></tr></thead>';
    contacttext = contacttext+            '<tbody class="contactbody">';
    contacttext = contacttext+                  '<tr><td>地址：'+(contactdata.data[0]).addressCh+'</td></tr><tr>';
    contacttext = contacttext+                  '<td>邮箱：'+(contactdata.data[0]).email+'</td></tr><tr>';
    contacttext = contacttext+                   '<td>移动电话： '+(contactdata.data[0]).molbiphone+'</td></tr><tr>';
    contacttext = contacttext+                   '<td> 电话：'+(contactdata.data[0]).telphone+'</td></tr></tbody></table>';
    contacttext = contacttext+          '<div class="col-md-3"></div>';
    contacttext = contacttext+            '<table class="table table-condensed col-md-5">';
    contacttext = contacttext+             ' <thead><tr><th>'+(contactdata.data[0]).companyEn+'</th></tr></thead>';
    contacttext = contacttext+            '<tbody class="contactbody">';
    contacttext = contacttext+                 '<tr><td>Address : '+(contactdata.data[0]).addressEn+'</td></tr>';
    contacttext = contacttext+             '<tr><td>Email : '+(contactdata.data[0]).email+'</td></tr>';
    contacttext = contacttext+            '<tr><td>Mobile : '+(contactdata.data[0]).molbiphone+'</td></tr>';
    contacttext = contacttext+           '<tr><td>Tel : '+(contactdata.data[0]).telphone+'</td></tr></tbody></table></div>';
    // //////////console.log(contacttext);
    document.getElementById("contact-innerbox").outerHTML=contacttext;
}

function toEn(){   //在函数里设置一个localstorage，用于所有需要英文替换字段的生成函数中。
  //////////console.log(localStorage.getItem("langStatus"));
  if (localStorage.getItem("langStatus") == null){
    localStorage.setItem("langStatus","en");
  }else if (localStorage.getItem("langStatus") == "en"){
    localStorage.setItem("langStatus","ch");
  }else if (localStorage.getItem("langStatus") == "ch"){
    localStorage.setItem("langStatus","en");
  }
  //////////console.log(localStorage.getItem("langStatus"));
  window.location.reload();
  
}

//生成分子式卡片
function activeDemotable(){
    var demotable ='<div class="row col-md-12 col-lg-12 col-sm-12" style="margin:0 auto;">';
    (currentpage == totalpage)?(cardscount = totalDataCount -(totalpage-1)*9):cardscount = cardsPerPage;
    for(i=0;i<cardscount;i++){
        var proEnCheck = 10;
        if ($(document).width() < 1200){
          proEnCheck = 20;
        }
        var proEn = ((datalog.data.data)[i]).proEn;
        if (proEn == ""){
            proEn = "NoName";
        }
        var imgroute = ((datalog.data.data)[i]).imgRoute;
        if (imgroute == ""){
          imgroute = tempimg;
        }


        var cardcode =                  '<div class="panel panel-default col-md-8  col-lg-3 col-sm-10 xbiocard " id=card'+((datalog.data.data)[i]).rid+'>'  ;
        cardcode = cardcode +                   '<hr style="margin-top:5px;">'
        cardcode = cardcode +                   '<div class="row">'                   ;
        //cardcode = cardcode +                   '<div class="row">                   <div>';
        cardcode = cardcode +                           '<div class="col-md-5 col5-box">';
        cardcode = cardcode +                               '<div class="img-box">'
        cardcode = cardcode +                                   '<img src="data:image/png;base64,'+imgroute+'" alt="">';
        cardcode = cardcode +                               '</div>';
        cardcode = cardcode +                           '</div>';
        cardcode = cardcode +                           '<div class="col-md-6 about-text-container">';
        cardcode = cardcode +                               '<div class="detail-box">';
        if (localStorage.getItem("langStatus") == "en"){
          cardcode = cardcode +                                       '<p class="about-p detail-overflow" ><a href="#asset-detail-table" onclick="activeDetail(this)" id="xbiolink'+i+'" class="proEn-p">'+proEn+'</a></p>';
          cardcode = cardcode +                                       '<p class="about-p detail-overflow" style="font-size:small !important;">cas No.:'+((datalog.data.data)[i]).proCasno+'</p>';
          cardcode = cardcode +                                       '<p class="about-p detail-overflow" style="font-size:small !important;">catlogno No.：'+((datalog.data.data)[i]).proCatalogno+'</p>';
          cardcode = cardcode +                                       '<p class="about-p detail-overflow" style="font-size:small !important;">Formula：'+((datalog.data.data)[i]).proFormula+'</p>';
        }else{
          cardcode = cardcode +                                       '<p class="about-p detail-overflow" ><a href="#asset-detail-table" onclick="activeDetail(this)" id="xbiolink'+i+'" class="proEn-p">'+proEn+'</a></p>';
          cardcode = cardcode +                                       '<p class="about-p detail-overflow" style="font-size:small !important;">cas号:'+((datalog.data.data)[i]).proCasno+'</p>';
          cardcode = cardcode +                                       '<p class="about-p detail-overflow" style="font-size:small !important;">catlogno号：'+((datalog.data.data)[i]).proCatalogno+'</p>';
          cardcode = cardcode +                                       '<p class="about-p detail-overflow" style="font-size:small !important;">分子式：'+((datalog.data.data)[i]).proFormula+'</p>';
        }

        cardcode = cardcode +                               '</div>';
        cardcode = cardcode +                           '</div>';
        cardcode = cardcode +                   '</div>';
        cardcode = cardcode +             '</div>';
        demotable = demotable + cardcode;
    }

    demotable = demotable + '</div> ';
    // //////////console.log(demotable);
    document.getElementById("demotable").innerHTML=demotable;
}


//生成详情页，弹窗性质。
function activeDetail(obj){
  $("#asset-detail-table").show();
  $("#asset-detail").show();
  var dataIndex = parseInt((obj.id.split("k"))[1]);
  var detailedData = datalog.data.data[dataIndex];

  var detailcode =                                '<div class="row detail-titleName">'
  detailcode = detailcode +                          '<p>'+detailedData.proEn+'</p>'
  detailcode = detailcode +                        '</div>'
  detailcode = detailcode +                       '<div class="row detail-row1">'
  detailcode = detailcode +                         ' <div class="col-md-12 detail-row1-box">'
  detailcode = detailcode +                              '<div class="detail-row1img-box">'
  detailcode = detailcode +                                '<img src="data:image/png;base64,'+detailedData.imgRoute+'" alt="" style="max-width: 100%;height:100%;">'
  detailcode = detailcode +                              '</div>'
  detailcode = detailcode +                           '</div>'    
  detailcode = detailcode +                      '</div>'
  detailcode = detailcode +                      '<div class="row detail-row2">'
  detailcode = detailcode +                      '<div class="col-md-12 " style="height: 100%;">'
  detailcode = detailcode +                        '<div class="detail-nid-box">'
  if (localStorage.getItem("langStatus") == "en"){
    detailcode = detailcode +                           '<div class="row detail-msg-row"><p class="detail-p">Chinese Name:'+detailedData.proCh+'</p></div>'
    detailcode = detailcode +                           '<div class="row detail-msg-row"><p class="detail-p">Casno:'+detailedData.proCasno+'</p></div>'
    detailcode = detailcode +                           '<div class="row detail-msg-row"><p class="detail-p">Catalogno:'+detailedData.proCatalogno+'</p></div>'
    detailcode = detailcode +                           '<div class="row detail-msg-row"><p class="detail-p">Formula:'+detailedData.proFormula+'</p></div>'
    detailcode = detailcode +                           '<div class="row detail-msg-row"><p class="detail-p">MW:'+detailedData.proMw+'</p></div>'
  }else{
    detailcode = detailcode +                           '<div class="row detail-msg-row"><p class="detail-p">中文名:'+detailedData.proCh+'</p></div>'
    detailcode = detailcode +                           '<div class="row detail-msg-row"><p class="detail-p">Cas号:'+detailedData.proCasno+'</p></div>'
    detailcode = detailcode +                           '<div class="row detail-msg-row"><p class="detail-p">Catalogno号:'+detailedData.proCatalogno+'</p></div>'
    detailcode = detailcode +                           '<div class="row detail-msg-row"><p class="detail-p">分子式:'+detailedData.proFormula+'</p></div>'
    detailcode = detailcode +                           '<div class="row detail-msg-row"><p class="detail-p">分子重量:'+detailedData.proMw+'</p></div>'
  }
 
  detailcode = detailcode +                        '</div>'
  detailcode = detailcode +                       '</div>'
  detailcode = detailcode +                      '</div>'
  // detailcode = detailcode +                     '<div class="row detail-row3">'
  // detailcode = detailcode +                            '<div style="margin:0 auto;">'
  detailcode = detailcode +                              '<div  style="text-align: center;">'
  detailcode = detailcode +                                  '<a id="exitbtn" href="#asset-detail-table" onclick="exitDetail()">关闭</a>'
  detailcode = detailcode +                              '</div>'
  // detailcode = detailcode +                          ' </div>'
  // detailcode = detailcode +                     '</div>'


  document.getElementById("asset-detail-table").innerHTML=detailcode;
}

function exitDetail(){
  $("#asset-detail-table").hide();
  $("#asset-detail").hide();
}

//生成分页按钮栏。page：number类型，选中当前的页数，默认为1。 pagecount：number类型，总的页数，用于生成尾页。
function activePagination(page,pagecount){
    var pagicode =                   '<div class="row" id="pagination-table" style="margin:0 auto;text-align: center;">'
    pagicode = pagicode +                   '<ul class="pagination" id="xbio-pagination">'
    if (page > 2){
    pagicode = pagicode +                    '<li class="pagination-li"><a href="#asset-detail-table" class="pagination-a" onclick="firstspage()">'+1+'</a></li>'
    }
    pagicode = pagicode +                    '<li class="pagination-li"><a href="#asset-detail-table" class="pagination-a" onclick="previouspage(1)">&laquo;</a></li>'
    if (page > 3){
      pagicode = pagicode +                    '<li class="pagination-li"><a href="#asset-detail-table" class="pagination-a" onclick="previouspage(2)">'+(page-2)+'</a></li>'
      pagicode = pagicode +                    '<li class="pagination-li"><a href="#asset-detail-table" class="pagination-a" onclick="previouspage(1)">'+(page-1)+'</a></li>'
      }
    pagicode = pagicode +                    '<li class="pagination-li current-paginate" id="page'+page+'"><a href="#asset-detail-table" class="pagination-a">'+page+'</a></li>'
    pagicode = pagicode +                    '<li class="pagination-li" id="page'+(page+1)+'"onclick="nextpage(1)"><a href="#asset-detail-table" class="pagination-a">'+(page+1)+'</a></li>'
    pagicode = pagicode +                    '<li class="pagination-li" id="page'+(page+2)+'"onclick="nextpage(2)"><a href="#asset-detail-table" class="pagination-a">'+(page+2)+'</a></li>'
    pagicode = pagicode +                    '<li class="pagination-li" id="page'+(page+3)+'"onclick="nextpage(3)"><a href="#asset-detail-table" class="pagination-a">'+(page+3)+'</a></li>'
    pagicode = pagicode +                    '<li class="pagination-li" id="page'+(page+4)+'"onclick="nextpage(4)"><a href="#asset-detail-table" class="pagination-a">'+(page+4)+'</a></li>'
    pagicode = pagicode +                    '<li class="pagination-li"><a>...</a></li>'
    pagicode = pagicode +                    '<li class="pagination-li" style="width:70px;"><a href="#" onclick="lastpage()" class="pagination-a">'+pagecount+'</a></li>'
    pagicode = pagicode +                  '</ul>'
    pagicode = pagicode +            '</div>'
    // //////////console.log("当前申请页数为：第"+currentpage+"页");
    if (page == 1){//特殊页数检测 包含1、倒数、尾页
        pagicode = pagicode.replace('<li class="pagination-li"><a href="#asset-detail-table" class="pagination-a" onclick="previouspage(1)">&laquo;</a></li>',' ');
    }else if (page == pagecount){
      pagicode = pagicode.replace('<li class="pagination-li" id="page'+(page+1)+'"onclick="nextpage(1)"><a href="#asset-detail-table" class="pagination-a">'+(page+1)+'</a></li>',' ');
      pagicode = pagicode.replace('<li class="pagination-li" id="page'+(page+2)+'"onclick="nextpage(2)"><a href="#asset-detail-table" class="pagination-a">'+(page+2)+'</a></li>',' ');
      pagicode = pagicode.replace('<li class="pagination-li" id="page'+(page+3)+'"onclick="nextpage(3)"><a href="#asset-detail-table" class="pagination-a">'+(page+3)+'</a></li>',' ');
      pagicode = pagicode.replace('<li class="pagination-li" id="page'+(page+4)+'"onclick="nextpage(4)"><a href="#asset-detail-table" class="pagination-a">'+(page+4)+'</a></li>',' ');
      pagicode = pagicode.replace('<li class="pagination-li"><a>...</a></li>',' ');
      pagicode = pagicode.replace('<li class="pagination-li" style="width:70px;"><a href="#" onclick="lastpage()" class="pagination-a">'+pagecount+'</a></li>',' ');
    }else if (page >= (pagecount-5)){
      pagicode = pagicode.replace('<li class="pagination-li"><a>...</a></li>',' ');
      var diff = (pagecount-page);
      for (i=0;i<(5-diff);i++){
        pagicode = pagicode.replace('<li class="pagination-li" id="page'+(page+diff+i)+'"onclick="nextpage('+(diff+i)+')"><a href="#asset-detail-table" class="pagination-a">'+(page+diff+i)+'</a></li>',' ');
      }
    }
    document.getElementById("pagination-table").outerHTML = pagicode;
    
}


function nextpage(period){//向下翻页，period：翻页的跨度
    currentpage = currentpage+period;
    var findByPaging =$.ajax({//获取函数 成功后执行生成函数
        type: "POST",
        url: xbioURL,
        dataType: "json",
        data:{
              pageNum: currentpage,
              pageSize: cardsPerPage,        
          },
        success: function(data){
          if (data.data.length != 0){
            datalog = data;
            //////////console.log(data);
            totalpage = data.data.page;
            activeDemotable();   
            activePagination(currentpage,totalpage);
          }else{
            //////////console.log("空");
          }
              
          },
        complete: function(XMLHttpRequest, textStatus){
          },
        error: function(){
          ////////console.log("errorerror");     
          }
        });
}


function previouspage(period){//向上翻页，period：翻页的跨度
    currentpage = currentpage-period;
    var findByPaging =$.ajax({//获取函数 成功后执行生成函数
        type: "POST",
        url: xbioURL,
        dataType: "json",
        data:{
              pageNum: currentpage,
              pageSize: cardsPerPage,        
          },
        success: function(data){
          if (data.data.length != 0){
            datalog = data;
            ////////console.log(data);
            totalpage = data.data.page;
            activeDemotable();   
            activePagination(currentpage,totalpage);
          }else{
            ////////console.log("空");
          }
          },
        complete: function(XMLHttpRequest, textStatus){
          },
        error: function(){
          ////////console.log("errorerror");     
          }
        });
}


function firstspage(){//直接返回第一页
    currentpage = 1;
    var findByPaging =$.ajax({//获取函数 成功后执行生成函数
        type: "POST",
        url: xbioURL,
        dataType: "json",
        data:{
              pageNum: currentpage,
              pageSize: cardsPerPage,        
          },
        success: function(data){
          if (data.data.length != 0){
            datalog = data;
            ////////console.log(data);
            totalpage = data.data.page;
            activeDemotable();   
            activePagination(currentpage,totalpage);
          }else{
            ////////console.log("空");
          }
          },
        complete: function(XMLHttpRequest, textStatus){
          },
        error: function(){
          ////////console.log("errorerror");     
          }
        });
}


function lastpage(){//直接前往最后一页
    currentpage = totalpage;
    var findByPaging =$.ajax({//获取函数 成功后执行生成函数
        type: "POST",
        url: xbioURL,
        dataType: "json",
        data:{
              pageNum: currentpage,
              pageSize: cardsPerPage,        
          },
        success: function(data){
          if (data.data.length != 0){
            datalog = data;
            ////////console.log(data);
            totalpage = data.data.page;
            activeDemotable();   
            activePagination(currentpage,totalpage);
          }else{
            ////////console.log("空");
          }
          },
        complete: function(XMLHttpRequest, textStatus){
          },
        error: function(){
          ////////console.log("errorerror");     
          }
        });
}


function activeCompany(){//关于公司
    document.getElementById("about-company-p").innerHTML=(contentCh+"<br><br>"+contentEn);
  
}


function activeAdv(){//我们的优势,html代码太长，放在后方的静态数据区直接调用。

  var section_code;
  for(i=0;i<4;i++){
    
    if (localStorage.getItem("langStatus") == "en"){
      if ((i+1)%2 == 1){
        section_code = leftside_code.replace('title-inner',(infolog.data)[i].titleEn);
        section_code = section_code.replace('about-p-inner',(infolog.data)[i].contentEn);//这部分没有imgroute可用路径，所以没有这里替换img url，导致图片重复。
      }else{
        section_code = rightside_code.replace('title-inner',(infolog.data)[i].titleEn);
        section_code = section_code.replace('about-p-inner',(infolog.data)[i].contentEn);
      }
    }else{
      if ((i+1)%2 == 1){
        section_code = leftside_code.replace('title-inner',(infolog.data)[i].titleCh);
        section_code = section_code.replace('about-p-inner',(infolog.data)[i].contentCh);//这部分没有imgroute可用路径，所以没有这里替换img url，导致图片重复。
      }else{
        section_code = rightside_code.replace('title-inner',(infolog.data)[i].titleCh);
        section_code = section_code.replace('about-p-inner',(infolog.data)[i].contentCh);
      }
    }
    document.getElementById("about-adv-section"+(i+1).toString()).innerHTML = section_code;
  }
}







function getwidth(){
    if(innerWidth >= 1025){
        $(".header_section").css("position","fixed");
        $(".container-fluid").css("position","fixed");
        //////////console.log("宽度检测触发");
        return true;
    }else{
        ////////console.log("false");

        return false;
    }
 }


//静态数据

//负责生成所有静态字段,中英文互换。web:执行的页面名，字符串
function staticLangSwitch(web){
  if(localStorage.getItem("langStatus") == "en"){
      document.getElementById("toIndex").innerHTML="Homepage";
      document.getElementById("companyHead").innerHTML="About Linkgen";
      document.getElementById("toXBIO").innerHTML="Our products";
      document.getElementById("advHead").innerHTML="Why choose us";
      document.getElementById("langSwitch").innerHTML="English/中文";
      if(web == "index"){
              document.getElementById("Linkgen-title-1").innerHTML="Linkgen Bio Tech Lab";
              document.getElementById("Linkgen-subtitle-1").innerHTML="established in 2016, based in the field of biotechnology, focusing on biological products and biotechnology services.";
              document.getElementById("Linkgen-title-2").innerHTML="International Resources Support";
              document.getElementById("Linkgen-subtitle-2").innerHTML="We have professional laboratories in the US and China, aiming to provide customers with professional, convenient and efficient services.";
              document.getElementById("LinkgenLab-sm-title").innerHTML="<span>Linkgen Lab</span>.";
              document.getElementById("LinkgenCover-title").innerHTML="Linkgen Covers:";
              document.getElementById("LinkgenCover-p").innerHTML="";
              document.getElementById("cdmoBox").innerHTML="<h3>CDMO</h3><p>Pharmaceutical CDMO is a deep penetration of the entire industrial chain from pre-clinical research, clinical trials to product production. It provides enterprises with innovative process development and production services, and replaces pure production capacity with high value-added technology output.</p>";
              document.getElementById("xbioBox").innerHTML="<h3>Xcess BIO Web</h3><p>Xcess Biosciences Inc (XcessBio or Xbio) was established in 2008. Scientists from academia and the biopharmaceutical industry have extensive expertise in chemistry and biology.<br> We are committed to developing high-quality products and providing our customers with the best service.</p>";
              document.getElementById("xyBox").innerHTML="<h3>Medical health care platform</h3><p>the latest international HRP (Hospital Resource Planning) model, which based on the microservice architecture and the privatized SaaS system.</p>";
              document.getElementById("allgenBox").innerHTML="<h3>Allgen Platform</h3><p>Aojing Biotechnology is an innovative biotechnology platform company with high-end reagent research and development as its core, with more than 6,000 square meters of various lab in chemical, biological, and medical laboratories and 10,000 and 100,000 The level GMP production workshop is 1200 square meters, which can carry out the research and development and production of medical devices and in vitro diagnostic reagents Ⅰ, Ⅱ, and Ⅲ.</p>";
      }else if (web=="aboutcompany"){
              document.getElementById("Linkgen-title-1").innerHTML="Linkgen Bio Tech Lab";
              document.getElementById("Linkgen-subtitle-1").innerHTML="established in 2016, based in the field of biotechnology, focusing on biological products and biotechnology services.";
              document.getElementById("Linkgen-title-2").innerHTML="International Resources Support";
              document.getElementById("Linkgen-subtitle-2").innerHTML="We have professional laboratories in the US and China, aiming to provide customers with professional, convenient and efficient services.";
              document.getElementById("LinkgenLab-sm-title").innerHTML="<span>Linkgen Lab</span>.";
      }
  }else{
      document.getElementById("toIndex").innerHTML="首页";
      document.getElementById("companyHead").innerHTML="关于我们";
      document.getElementById("toXBIO").innerHTML="产品展示";
      document.getElementById("advHead").innerHTML="广纳贤士";
      document.getElementById("langSwitch").innerHTML="联系我们";
      if(web == "index"){
              document.getElementById("Linkgen-title-1").innerHTML="临景生物科技";
              document.getElementById("Linkgen-subtitle-1").innerHTML="上海临景生物科技有限公司成立于2016年，立足于化学科技领域，专注于化学产品和化学技术服务。";
              document.getElementById("Linkgen-title-2").innerHTML="中外双方资源扶持";
              document.getElementById("Linkgen-subtitle-2").innerHTML="公司在美国和中国分别设有专业实验室，旨在为客户提供专业、便捷和高效的服务。";
              document.getElementById("LinkgenLab-sm-title").innerHTML="临景生物科技-<span>Linkgen Lab</span>";
              document.getElementById("LinkgenCover-title").innerHTML="临景拥有的";
              document.getElementById("LinkgenCover-p").innerHTML="Linkgen Covers:";
              document.getElementById("cdmoBox").innerHTML="<h3>CDMO</h3><p>医药CDMO是对临床前研究、临床试验到产品生产等整个产业链的深度贯通，为企业提供创新性的工艺研发及生产服务，以高附加值技术输出取代单纯的产能输出。</p>";
              document.getElementById("xbioBox").innerHTML="<h3>XBIO小分子平台</h3><p>Xcess Biosciences Inc（XcessBio 或 Xbio）成立于 2008 年，由来自学术界和生物制药行业的科学家在化学和生物学方面拥有丰富的专业知识。<br> 我们致力于开发高质量的产品并为我们的客户提供最好的服务。</p>";
              document.getElementById("xyBox").innerHTML="<h3>医疗康养平台</h3><p>基于微服务架构和私有化SaaS体系，引入国际最新的HRP（Hospital Resource Planning，医院综合运营管理系统）模型，为中国各类医疗机构精心打造的一体化医疗康养运管云平台新一代整体解决方案。 </p>";
              document.getElementById("allgenBox").innerHTML="<h3>奥景平台</h3><p>奥景生物科技公司是以高端试剂研发为核心的创新型生物科技平台公司。<br>公司拥有化学，生物，医学检验所各类实验室六千多平方米；并建有万级和十万级GMP生产车间1200平方米，可进行医疗器械和体外诊断试剂Ⅰ、Ⅱ、Ⅲ类的研发生产。</p>";
      }
  }
}
$("#recruit-job1-a").click(function(){
  $("#recruit-job1-content").show();
  $("#recruit-job2-content").hide();
  $("#recruit-job3-content").hide();
  $("#recruit-job4-content").hide();
  $("#recruit-job5-content").hide();
});
$("#recruit-job2-a").click(function(){
  $("#recruit-job2-content").show();
  $("#recruit-job1-content").hide();
  $("#recruit-job3-content").hide();
  $("#recruit-job4-content").hide();
  $("#recruit-job5-content").hide();
});
$("#recruit-job3-a").click(function(){
  $("#recruit-job3-content").show();
  $("#recruit-job2-content").hide();
  $("#recruit-job1-content").hide();
  $("#recruit-job4-content").hide();
  $("#recruit-job5-content").hide();
});
$("#recruit-job4-a").click(function(){
  $("#recruit-job4-content").show();
  $("#recruit-job2-content").hide();
  $("#recruit-job3-content").hide();
  $("#recruit-job1-content").hide();
  $("#recruit-job5-content").hide();
});
$("#recruit-job5-a").click(function(){
  $("#recruit-job5-content").show();
  $("#recruit-job2-content").hide();
  $("#recruit-job3-content").hide();
  $("#recruit-job4-content").hide();
  $("#recruit-job1-content").hide();
});







$("#about-a-our").click(function(){
  $("#about-company-content").show();
  $("#about-trd-content").hide();
  $("#about-value-content").hide();
  $("#about-adv-content").hide();
  $(".about-a-controller").css("background-color","white");
  $(".about-a-controller").css("font-weight","normal");
  $(".about-a-controller").css("color","#0c0c0c");
  $("#about-a-our").css("background-color","#612fb3");
  $("#about-a-our").css("font-weight","bold");
  $("#about-a-our").css("color","white");
})
$("#about-a-value").click(function(){
  $("#about-value-content").show();
  $("#about-trd-content").hide();
  $("#about-company-content").hide();
  $("#about-adv-content").hide();
  $(".about-a-controller").css("background-color","white");
  $(".about-a-controller").css("font-weight","normal");
  $(".about-a-controller").css("color","#0c0c0c");
  $("#about-a-value").css("background-color","#612fb3");
  $("#about-a-value").css("font-weight","bold");
  $("#about-a-value").css("color","white");
})
$("#about-a-trd").click(function(){
  $("#about-trd-content").show();
  $("#about-company-content").hide();
  $("#about-value-content").hide();
  $("#about-adv-content").hide();
  $(".about-a-controller").css("background-color","white");
  $(".about-a-controller").css("font-weight","normal");
  $(".about-a-controller").css("color","#0c0c0c");
  $("#about-a-trd").css("background-color","#612fb3");
  $("#about-a-trd").css("font-weight","bold");
  $("#about-a-trd").css("color","white");
})
$("#about-a-adv").click(function(){
  $("#about-adv-content").show();
  $("#about-trd-content").hide();
  $("#about-value-content").hide();
  $("#about-company-content").hide();
  $(".about-a-controller").css("background-color","white");
  $(".about-a-controller").css("font-weight","normal");
  $(".about-a-controller").css("color","#0c0c0c");
  $("#about-a-adv").css("background-color","#612fb3");
  $("#about-a-adv").css("font-weight","bold");
  $("#about-a-adv").css("color","white");
})
$(".slide-one").click(function(){
  $("#carouselExampleIndicators").carousel(0);
});
$(".slide-two").click(function(){
  $("#carouselExampleIndicators").carousel(1);
});
$(".slide-three").click(function(){
  $("#carouselExampleIndicators").carousel(2);
});
$(".slide-four").click(function(){
  $("#carouselExampleIndicators").carousel(3);
});


var leftside_code =            '<div class="container  about-adv-container">'
leftside_code = leftside_code +     '<div class="row">'
leftside_code = leftside_code +         '<div class="col-md-6 about-text-container" >'
leftside_code = leftside_code +             '<div class="detail-box">'
leftside_code = leftside_code +                 '<div class="heading_container">'
leftside_code = leftside_code +                     '<h2>'
leftside_code = leftside_code +                     '<span>title-inner</span>'
leftside_code = leftside_code +                     '</h2>'
leftside_code = leftside_code +                 '</div>'
leftside_code = leftside_code +                 '<p class="about-p">about-p-inner</p>'
leftside_code = leftside_code +             '</div>'
leftside_code = leftside_code +         '</div>'
leftside_code = leftside_code +         '<div class="col-md-6 ">'
leftside_code = leftside_code +             '<div class="img-box">'
leftside_code = leftside_code +                 '<img src=" images/cdmoAD2.png" alt="">'
leftside_code = leftside_code +             '</div>'
leftside_code = leftside_code +         '</div>'
leftside_code = leftside_code +     '</div>'
leftside_code = leftside_code + '</div>'


var rightside_code =                '<div class="container  about-adv-container">'
rightside_code = rightside_code +         '<div class="row">'
rightside_code = rightside_code +               '<div class="col-md-6 ">'
rightside_code = rightside_code +                   '<div class="img-box">'
rightside_code = rightside_code +                       '<img src=" images/XBIOAD.png" alt="">'
rightside_code = rightside_code +                   '</div>'
rightside_code = rightside_code +               '</div>'
rightside_code = rightside_code +               '<div class="col-md-6 about-text-container">'
rightside_code = rightside_code +                   '<div class="detail-box">'
rightside_code = rightside_code +                       '<div class="heading_container">'
rightside_code = rightside_code +                           '<h2>'
rightside_code = rightside_code +                               '<span>title-inner</span>'
rightside_code = rightside_code +                           '</h2>'
rightside_code = rightside_code +                       '</div>'
rightside_code = rightside_code +                       '<p class="about-p">about-p-inner</p>'     
rightside_code = rightside_code +                   '</div>'
rightside_code = rightside_code +               '</div>'
rightside_code = rightside_code +           '</div>'
rightside_code = rightside_code +   '</div>'


var fakeObject = {
count:122,
data:[
    {'rid':31,'pro_ch':'中文名1','pro_en':'english name','casno':1,'pro_mw':'1','pro_formula':'x11','pro_catalogno':'13','img_route':'images/XBIOAD.png','create_time':'2021-12-14','update_time':'2021-12-14','create_author':'admin','update_author':'updater','intro_use':'true'},
    {'rid':32,'pro_ch':'中文名2','pro_en':'english name','casno':2,'pro_mw':'2','pro_formula':'x12','pro_catalogno':'14','img_route':'images/XBIOAD.png','create_time':'2021-12-14','update_time':'2021-12-2346','create_author':'admin','update_author':'updater','intro_use':'true'},
    {'rid':33,'pro_ch':'中文名3','pro_en':'english name','casno':3,'pro_mw':'3','pro_formula':'x13','pro_catalogno':'15','img_route':'images/XBIOAD.png','create_time':'2021-12-14','update_time':'2021-12-34','create_author':'admin','update_author':'updater','intro_use':'true'},
    {'rid':34,'pro_ch':'中文名4','pro_en':'english name','casno':4,'pro_mw':'4','pro_formula':'x14','pro_catalogno':'16','img_route':'images/XBIOAD.png','create_time':'2021-12-14','update_time':'2021-12-72','create_author':'admin','update_author':'updater','intro_use':'true'},
    {'rid':35,'pro_ch':'中文名5','pro_en':'english name','casno':5,'pro_mw':'5','pro_formula':'x15','pro_catalogno':'1414','img_route':'images/XBIOAD.png','create_time':'2021-12-14','update_time':'2021-12-165','create_author':'admin','update_author':'updater','intro_use':'true'},
    {'rid':36,'pro_ch':'中文名6','pro_en':'english name','casno':6,'pro_mw':'6','pro_formula':'x18','pro_catalogno':'141414','img_route':'images/XBIOAD.png','create_time':'2021-12-14','update_time':'2021-12-62','create_author':'admin','update_author':'updater','intro_use':'true'},
    {'rid':37,'pro_ch':'中文名7','pro_en':'english name','casno':7,'pro_mw':'7','pro_formula':'x18','pro_catalogno':'1613423','img_route':'images/XBIOAD.png','create_time':'2021-12-14','update_time':'2021-12-23','create_author':'admin','update_author':'updater','intro_use':'true'},
    {'rid':38,'pro_ch':'中文名8','pro_en':'english name','casno':8,'pro_mw':'8','pro_formula':'x19','pro_catalogno':'1246346','img_route':'images/XBIOAD.png','create_time':'2021-12-14','update_time':'2021-12-124','create_author':'admin','update_author':'updater','intro_use':'true'},
    {'rid':39,'pro_ch':'中文名9','pro_en':'english name','casno':9,'pro_mw':'9','pro_formula':'x1a','pro_catalogno':'1357','img_route':'images/XBIOAD.png','create_time':'2021-12-14','update_time':'2021-12-52','create_author':'admin','update_author':'updater','intro_use':'true'},
],
};
//请求图片路径为空时加载此路径
var tempimg =       "/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0a";
tempimg = tempimg + "HBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIy";
tempimg = tempimg + "MjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCACPAMADASIA";
tempimg = tempimg + "AhEBAxEB/8QAGgABAQEBAQEBAAAAAAAAAAAAAAIDBAEFB//EAC4QAAICAAMIAQMEAwEAAAAAAAAC";
tempimg = tempimg + "AQMRE1IEEiExM3GRoUEiMlEUQmGBscHR8P/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAA";
tempimg = tempimg + "AAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwD95REmtfpjlHwVlppXwK+mvaCgJy00r4GWmlfBQAnL";
tempimg = tempimg + "TSvgZaaV8FACctNK+BlppXwUAJy00r4GWmlfBQAnLTSvgZaaV8FACctNK+BlppXwUAJy00r4GWml";
tempimg = tempimg + "fBQAnLTSvgZaaV8FACctNK+BlppXwUAJy00r4GWmlfBQAnLTSvgl0XLb6V5T8GhL9Nu0gK+mvaCi";
tempimg = tempimg + "U6a9oKAAAAAAAAAAAAAAAAAAAAAAAAAAAAS/TbtJRL9Nu0gE6a9oKJTpr2goAAAAAAAHkzERjM4Q";
tempimg = tempimg + "B6Dnfaljgsb0kY7RbyiYjwB1SyrzmIIm+uP3GMbK0/c0FxsifLTIHv6mv8z4PY2iqf3Yf0efpa/5";
tempimg = tempimg + "8nk7LX+WA1V0bk0T/ZRyzsml/MHmG0VcvqjyB1gwTaVng8bsm8TjGMAAAAAAAl+m3aSiX6bdpAJ0";
tempimg = tempimg + "17QUSnTXtBQAAAAeNMLGM8jKUe37/pTT8yAe/ju1xvN6Iih7Jxtf+oOhUVIwWIiD0CEqRPtWO5YA";
tempimg = tempimg + "AAAAAAAAEtWr/csSY5T1capxjTJ0ADOu2LOHJo5xJoRZVD8eTRymAjzOKtGDR7AsAACX6bdpKJfp";
tempimg = tempimg + "t2kAnTXtBRKdNe0FAAAAManlbGqaeMcVx+YNjl2xZhVtXgyTz/gCtq2hqd2FiMZ/JpnLFEWtwiYx";
tempimg = tempimg + "OF9pW1YzasZjlMTgepLbXcqtwReOEcogDsoZ3WXfhvTwj8QankzCxjMxEQZ/qqccMyANQQ9qVx9b";
tempimg = tempimg + "RArtrt+xonACwZNtFSNus8YlTdWqQ8vG7PKfyBYM0ursx3XicOZx1XRO0NZY+C/EYgfQBK2K67yt";
tempimg = tempimg + "Ex+TCl2e52zYZI5RHwB0jCMcfkxnaFiftaV/OBtExMYxyAAAAS/TbtJRL9Nu0gE6a9oKJTpr2goA";
tempimg = tempimg + "AABF0RNL46ZLObbbN2rcjm3+APnHXsDRFjx8zHAV7CzLi7bv8YGb12bLarc4x4THyBptTb21Qjzh";
tempimg = tempimg + "XGBuibNjEJCS0cYw4mm7XtCK0rDRPI9SmuucUWImQPn1423MzOkNGs2qRUta6bUmI57scDpbZ6nb";
tempimg = tempimg + "FkiZPcquE3NyN38AfOwWm79tqt/f/pNdqWvhKOv0RhuSda0VI28qREnjbPS04zXGIHLmLGyM8JCu";
tempimg = tempimg + "308Pk8rihNmmX3WeY5fJ2tTW6wrJExHKCY2alZxiuAONN6rZHaeG/wAI/wCm1SbmxTPy3Gex0PUl";
tempimg = tempimg + "kRDrE4FYRhhhwA4JWyb5efsj5+MDtqiVqWJ54HkU1rOMKaAAAAJfpt2kol+m3aQCdNe0FEp017QU";
tempimg = tempimg + "AAAA5akzrpvb7Y4JH+zqERERhHCABNlcWJKNykoAcmyNNdjUPzjjB1nPtFUyy21x9azy/MHQAAAA";
tempimg = tempimg + "AAAAAAAAAAAAAJfpt2kol+m3aQCdNe0FEp017QUAAAAAAAAAAAAAAAAAAAAAAAAAAAAl+m3aSiX6";
tempimg = tempimg + "bdpAV9Ne0FGSXVwixLfEfB7nV6vQGgM86vV6GdXq9AaAzzq9XoZ1er0BoDPOr1ehnV6vQGgM86vV";
tempimg = tempimg + "6GdXq9AaAzzq9XoZ1er0BoDPOr1ehnV6vQGgM86vV6GdXq9AaAzzq9XoZ1er0BoDPOr1ehnV6vQG";
tempimg = tempimg + "gM86vV6GdXq9AaEv027STnV6vR491co0Q3x+AP/ZAA==";
//////////console.log(tempimg)

// $("#recruit-collapse1").click(function(){  
//   $("#collapseOne").show();
//   $("#collapseTwo").hide();
//   $("#collapseThree").hide();
//   $("#collapsefour").hide();
//   $("#collapseFive").hide();
// });
// $("#recruit-collapse2").click(function(){  
//   $("#collapseTwo").show();
//   $("#collapseOne").hide();
//   $("#collapseThree").hide();
//   $("#collapsefour").hide();
//   $("#collapseFive").hide();
// });
// $("#recruit-collapse3").click(function(){  
//   $("#collapseThree").show();
//   $("#collapseTwo").hide();
//   $("#collapseOne").hide();
//   $("#collapsefour").hide();
//   $("#collapseFive").hide();
// });
// $("#recruit-collapse4").click(function(){  
//   $("#collapsefour").show();
//   $("#collapseTwo").hide();
//   $("#collapseThree").hide();
//   $("#collapseOne").hide();
//   $("#collapseFive").hide();
// });
// $("#recruit-collapse5").click(function(){  
//   $("#collapseFive").show();
//   $("#collapseTwo").hide();
//   $("#collapseThree").hide();
//   $("#collapsefour").hide();
//   $("#collapseOne").hide();
// });


