(this.webpackJsonpcarpool=this.webpackJsonpcarpool||[]).push([[0],{50:function(e,t,a){e.exports=a.p+"static/media/logo.0902b57b.png"},55:function(e,t,a){e.exports=a(93)},61:function(e,t,a){},93:function(e,t,a){"use strict";a.r(t);var r=a(1),n=a.n(r),s=a(25),i=a.n(s),o=a(15),l=a(17),c=a(18),u=a(20),m=a(19),d=a(21),f=(a(60),a(61),a(28)),p=a(22),h=a(16),v=a(113),g=a(95),E=a(96),y=a(97),b=a(98),w=a(99),_=a(100),k=a(101),j=a(50),O=a.n(j),S=function(e){var t=Object(r.useState)(!1),a=Object(o.a)(t,2),s=a[0],i=a[1];return n.a.createElement("div",null,n.a.createElement(g.a,{light:!0,expand:"md",style:{backgroundColor:"#FFAA00",borderColor:"#FFF8EB",marginBottom:"40px"}},n.a.createElement(E.a,{className:"d-flex align-items-center"},n.a.createElement(y.a,{className:"font-weight-bold",href:"/"},n.a.createElement("img",{src:O.a,alt:"logo",className:"img-fluid",style:{width:100}})),n.a.createElement(b.a,{className:"d-inline-block p-0  align-items-left",href:"/"},n.a.createElement("h1",{style:{font:"36px Arial Black"}},"arcpool beta"))),n.a.createElement(w.a,{onClick:function(){return i(!s)}}),n.a.createElement(_.a,{isOpen:s,navbar:!0},n.a.createElement(k.a,{className:"ml-auto",navbar:!0},n.a.createElement(E.a,{className:"d-flex align-items-center"},n.a.createElement(y.a,{className:"font-weight-bold",href:"/results"},"Results")),n.a.createElement(E.a,{className:"d-flex align-items-center"},n.a.createElement(y.a,{className:"font-weight-bold",href:"/settings"},"Settings"))))))},x=a(6),C=a(102),N=a(103),F=a(104),I=a(105),D=a(106),R=a(107),T=a(114),W=a(108),U=a(14),J=a.n(U),B=function(e){function t(){var e,a;Object(l.a)(this,t);for(var r=arguments.length,n=new Array(r),s=0;s<r;s++)n[s]=arguments[s];return(a=Object(u.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(n)))).state={new_user:!0,form_complete:!1,searchWidget:null,name:a.props.n,email:a.props.e,point_id:null,line_id:null,driver:1,office_id:1,office_old:null,arrive_work:"09:00",leave_work:"17:00",lat:null,lon:null,start_addr:null,route:null},a.addUser=function(){if(a.state.route){var e=[{geometry:a.state.route.geometry,attributes:{email:a.state.email,travel_minutes:a.state.route.attributes.Total_TravelTime,travel_miles:a.state.route.attributes.Total_Miles}}],t="features="+JSON.stringify(e);J.a.post("https://belan2.esri.com/DotNet/proxy.ashx?https://services.arcgis.com/Wl7Y1m92PbjtJs5n/arcgis/rest/services/carpoolData/FeatureServer/1/addFeatures?f=json",t).catch((function(e){console.error(e)}))}var r="https://belan2.esri.com/DotNet/proxy.ashx?https://services.arcgis.com/Wl7Y1m92PbjtJs5n/arcgis/rest/services/carpoolData/FeatureServer/0/addFeatures?f=json&features=",n=[{geometry:{x:a.state.lon,y:a.state.lat,spatialReference:{wkid:4326}},attributes:{name:a.state.name,email:a.state.email,arrive_work:a.state.arrive_work,leave_work:a.state.leave_work,driver:parseInt(a.state.driver),office_id:parseInt(a.state.office_id),start_addr:encodeURIComponent(a.state.start_addr)}}];r+=JSON.stringify(n),J.a.post(r,JSON.stringify(n)).then((function(){a.setState({form_complete:!0})})).catch((function(e){console.error(e)}))},a.updateUser=function(){if(a.state.route){var e=[{geometry:a.state.route.geometry,attributes:{OBJECTID:a.state.line_id,email:a.state.email,travel_minutes:a.state.route.attributes.Total_TravelTime,travel_miles:a.state.route.attributes.Total_Miles}}],t="features="+JSON.stringify(e);J.a.post("https://belan2.esri.com/DotNet/proxy.ashx?https://services.arcgis.com/Wl7Y1m92PbjtJs5n/arcgis/rest/services/carpoolData/FeatureServer/1/updateFeatures?f=json",t).catch((function(e){console.error(e)})).catch((function(e){console.log(e)}))}var r="https://belan2.esri.com/DotNet/proxy.ashx?https://services.arcgis.com/Wl7Y1m92PbjtJs5n/arcgis/rest/services/carpoolData/FeatureServer/0/updateFeatures?f=json&features=",n=[{geometry:{x:a.state.lon,y:a.state.lat,spatialReference:{wkid:4326}},attributes:{OBJECTID:a.state.point_id,name:a.state.name,email:a.state.email,arrive_work:a.state.arrive_work,leave_work:a.state.leave_work,driver:parseInt(a.state.driver),office_id:parseInt(a.state.office_id),start_addr:encodeURIComponent(a.state.start_addr)}}];r+=JSON.stringify(n),J.a.post(r,JSON.stringify(n)).then((function(){a.setState({form_complete:!0})})).catch((function(e){console.error(e)})).catch((function(e){console.log(e)}))},a.getUserByEmail=function(){var e="https://belan2.esri.com/DotNet/proxy.ashx?https://services.arcgis.com/Wl7Y1m92PbjtJs5n/arcgis/rest/services/carpoolData/FeatureServer/0/query?",t={f:"json",where:"email='"+a.state.email+"'",outFields:"*"};e+=Object.keys(t).map((function(e){return encodeURIComponent(e)+"="+encodeURIComponent(t[e])})).join("&"),J.a.get(e).then((function(e){var t=e.data.features;Object(h.loadModules)(["esri/widgets/Search"]).then((function(e){var r=Object(o.a)(e,1)[0];if(t.length>0){var n=t[0].attributes;a.setState({point_id:n.OBJECTID,office_id:n.office_id,office_old:n.office_id,driver:n.driver,arrive_work:n.arrive_work,leave_work:n.leave_work,new_user:!1,start_addr:n.start_addr,searchWidget:r({container:document.getElementById("startLoc"),searchTerm:n.start_addr})}),document.getElementById("officeSelect").value=n.office_id,document.getElementById("driverSelect").value=n.driver,document.getElementById("arriveTime").value=n.arrive_work,document.getElementById("leaveTime").value=n.leave_work}else a.setState({searchWidget:r({container:document.getElementById("startLoc")})})}))})).catch((function(e){console.log(e)}));var r="https://belan2.esri.com/DotNet/proxy.ashx?https://services.arcgis.com/Wl7Y1m92PbjtJs5n/arcgis/rest/services/carpoolData/FeatureServer/1/query?",n={f:"json",where:"email='"+a.state.email+"'",outFields:"*"};r+=Object.keys(n).map((function(e){return encodeURIComponent(e)+"="+encodeURIComponent(n[e])})).join("&"),J.a.get(r).then((function(e){var t=e.data.features;if(t.length>0){var r=t[0].attributes;a.setState({line_id:r.OBJECTID})}})).catch((function(e){console.log(e)}))},a.submitF=function(){Object(h.loadModules)(["esri/widgets/Search","esri/tasks/RouteTask","esri/tasks/support/RouteParameters","esri/tasks/support/FeatureSet","esri/Graphic"]).then((function(e){var t=Object(o.a)(e,5),r=(t[0],t[1]),n=t[2],s=t[3],i=t[4],l=Object(x.a)(a),c=document.getElementById("startLoc").value;a.state.searchWidget.search(c).then((function(e){var t=e.results[0].results[0].feature.geometry.latitude,a=e.results[0].results[0].feature.geometry.longitude,o=e.results[0].results[0].feature.attributes.Match_addr;if(o===l.state.start_addr&&l.state.office_id===l.state.office_old)l.setState({lat:t,lon:a,start_addr:o}),l.state.new_user?l.addUser():l.updateUser();else{l.setState({lat:t,lon:a,start_addr:o});var c=new r({url:"https://utility.arcgis.com/usrsvcs/appservices/w2zxoNZu0ai45kI5/rest/services/World/Route/NAServer/Route_World/solve"}),u=new n({stops:new s,outSpatialReference:{wkid:4326}}),m=new i({geometry:{type:"point",longitude:a,latitude:t,spatialReference:{wkid:4326}}}),d={1:[-117.1946114,34.057267],2:[-117.2180851,34.0692566],3:[-80.7835061,35.100138],4:[-77.0714945,38.897275],5:[-73.9947568,40.7542076]},f={type:"point",longitude:d[l.state.office_id][0],latitude:d[l.state.office_id][1],spatialReference:{wkid:4326}},p=new i({geometry:f});u.stops.features.push(m),u.stops.features.push(p),c.solve(u).then((function(e){l.setState({route:e.routeResults[0].route}),l.state.new_user?l.addUser():l.updateUser()})).catch((function(e){alert(e.message)}))}}))}))},a}return Object(d.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){Object(h.loadCss)(),this.getUserByEmail()}},{key:"componentWillUnmount",value:function(){this.setState({searchWidget:null})}},{key:"render",value:function(){var e=this;return!0===this.state.form_complete?n.a.createElement(p.a,{to:"/results"}):n.a.createElement(C.a,{className:"justify-content-md-center",style:{margin:"20px"}},n.a.createElement(N.a,{md:8},n.a.createElement(C.a,null,n.a.createElement(N.a,{md:12},n.a.createElement("p",null,n.a.createElement("b",null,"This information will be used to match you with a carpool buddy!")))),n.a.createElement(C.a,{form:!0},n.a.createElement(N.a,{md:6},n.a.createElement(F.a,null,n.a.createElement(I.a,{for:"userName"},"Name"),n.a.createElement(D.a,{type:"name",name:"name",id:"userName",readOnly:!0,defaultValue:this.props.n}))),n.a.createElement(N.a,{md:6},n.a.createElement(F.a,null,n.a.createElement(I.a,{for:"userEmail"},"Email"),n.a.createElement(D.a,{type:"email",name:"email",id:"userEmail",readOnly:!0,defaultValue:this.props.e})))),n.a.createElement(C.a,{form:!0},n.a.createElement(N.a,{md:6},n.a.createElement(F.a,null,n.a.createElement(I.a,{for:"arriveTime"},"Arrive at Work"),n.a.createElement(D.a,{type:"time",name:"time",id:"arriveTime",onChange:function(t){return e.setState({arrive_work:t.target.value})},defaultValue:this.state.arrive_work}))),n.a.createElement(N.a,{md:6},n.a.createElement(F.a,null,n.a.createElement(I.a,{for:"leaveTime"},"Leave Work"),n.a.createElement(D.a,{type:"time",name:"time",id:"leaveTime",onChange:function(t){return e.setState({leave_work:t.target.value})},defaultValue:this.state.leave_work})))),n.a.createElement(C.a,{form:!0},n.a.createElement(N.a,{md:6},n.a.createElement(F.a,null,n.a.createElement(I.a,{for:"driver"},"Select"),n.a.createElement(D.a,{type:"select",name:"select",id:"driverSelect",onChange:function(t){return e.setState({driver:t.target.value})}},n.a.createElement("option",{value:1},"Driver"),n.a.createElement("option",{value:2},"Passenger"),n.a.createElement("option",{value:3},"Either")))),n.a.createElement(N.a,{md:6},n.a.createElement(F.a,null,n.a.createElement(I.a,{for:"exampleSelect"},"Office Location"),n.a.createElement(D.a,{type:"select",name:"office",id:"officeSelect",onChange:function(t){return e.setState({office_id:t.target.value})},defaultValue:this.state.office_id},n.a.createElement("option",{value:1},"Redlands Main Campus"),n.a.createElement("option",{value:2},"Redlands V Buildings"),n.a.createElement("option",{value:3},"Charlotte"),n.a.createElement("option",{value:4},"Washington D.C."),n.a.createElement("option",{value:5},"New York City"))))),n.a.createElement(C.a,null,n.a.createElement(N.a,{md:8},n.a.createElement(F.a,null,n.a.createElement(I.a,{for:"startLocation"},"Pickup Location"),n.a.createElement(R.a,{id:"PopoverFocus",size:"sm",color:"link",style:{margin:"0 0 0 5px"}},"help"),n.a.createElement(T.a,{trigger:"focus",placement:"auto",target:"PopoverFocus"},n.a.createElement(W.a,null," Use the search bar below and select a dropdown option. If you have privacy concerns, you can use a cross street or store")),n.a.createElement("div",{id:"startLoc",style:{backgroundColor:"white",padding:"1px",border:"1px solid lightgrey",borderRadius:"4px",width:"75%"},className:"form-control"}))),n.a.createElement(N.a,{md:4},n.a.createElement(R.a,{color:"success",style:{position:"absolute",bottom:"15px",right:"20px"},className:"float-right",onClick:function(){return e.submitF()}},"Save")))))}}]),t}(r.Component),A=function(e){function t(){return Object(l.a)(this,t),Object(u.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return n.a.createElement("div",{style:{margin:"20px"}},n.a.createElement(C.a,null,n.a.createElement(N.a,{md:12},n.a.createElement("h2",{className:"text-center"},"Welcome ",this.props.n),n.a.createElement(N.a,{md:4},n.a.createElement("p",null,"If this is your first time visiting this app, fill out the ",n.a.createElement(R.a,{outline:!0,color:"success",size:"sm",href:"/settings"},"Settings")," "," to get started. "),n.a.createElement("p",null,"Otherwise, you can skip directly to the ",n.a.createElement(R.a,{outline:!0,color:"success",size:"sm",href:"/results"},"Results")," "," to find a carpool buddy.")))))}}]),t}(r.Component),P=a(109),M=a(110),L=a(111),Y=a(54),q=a(112),V=a(31),z=a.n(V),G=a(53),Q=Object(G.extendMoment)(z.a);function Z(e){e=e.split(":");var t,a=Number(e[0]),r=Number(e[1]);return a>0&&a<=12?t=""+a:a>12?t=""+(a-12):0===a&&(t="12"),t+=r<10?":0"+r:":"+r,t+=a>=12?" PM":" AM"}var $=function(e){function t(){var e,a;Object(l.a)(this,t);for(var r=arguments.length,n=new Array(r),s=0;s<r;s++)n[s]=arguments[s];return(a=Object(u.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(n)))).state={data:[],name:a.props.n,email:a.props.e,new_user_p:!1,new_user_l:!1,point_id:null,line_id:null,office_id:null,driver:null,arrive_work:null,leave_work:null,user_route:null,distance:5,units:1,time:30},a.getData=function(){var e="https://belan2.esri.com/DotNet/proxy.ashx?https://services.arcgis.com/Wl7Y1m92PbjtJs5n/arcgis/rest/services/carpoolData/FeatureServer/0/query?",t={f:"json",returnGeometry:!0,where:"1=1",outFields:"*"};e+=Object.keys(t).map((function(e){return encodeURIComponent(e)+"="+encodeURIComponent(t[e])})).join("&"),J.a.get(e).then((function(e){a.setState({data:e.data.features})})).catch((function(e){console.log(e)}))},a.getUserByEmail=function(){var e="https://belan2.esri.com/DotNet/proxy.ashx?https://services.arcgis.com/Wl7Y1m92PbjtJs5n/arcgis/rest/services/carpoolData/FeatureServer/0/query?",t={f:"json",where:"email='"+a.state.email+"'",outFields:"*"};e+=Object.keys(t).map((function(e){return encodeURIComponent(e)+"="+encodeURIComponent(t[e])})).join("&"),J.a.get(e).then((function(e){var t=e.data.features;if(t.length>0){var r=t[0].attributes;a.setState({point_id:r.OBJECTID,office_id:r.office_id,driver:r.driver,arrive_work:r.arrive_work,leave_work:r.leave_work}),a.filterF()}else a.setState({new_user_p:!0})})).catch((function(e){console.log(e)}));var r="https://belan2.esri.com/DotNet/proxy.ashx?https://services.arcgis.com/Wl7Y1m92PbjtJs5n/arcgis/rest/services/carpoolData/FeatureServer/1/query?",n={f:"json",where:"email='"+a.state.email+"'",outFields:"*",returnGeometry:!0};r+=Object.keys(n).map((function(e){return encodeURIComponent(e)+"="+encodeURIComponent(n[e])})).join("&"),J.a.get(r).then((function(e){var t=e.data.features;if(t.length>0){var r=t[0];a.setState({line_id:r.attributes.OBJECTID,user_route:{spatialReference:e.data.spatialReference,paths:r.geometry.paths,type:"polyline"}}),a.filterF()}else a.setState({new_user_l:!0})})).catch((function(e){console.log(e)}))},a.filterF=function(){var e={1:"miles",2:"feet",3:"kilometers",4:"meters"};Object(h.loadModules)(["esri/layers/FeatureLayer","esri/config"]).then((function(t){var r=Object(o.a)(t,2),n=r[0];r[1].request.proxyUrl="https://belan2.esri.com/DotNet/proxy.ashx?";var s=new n("https://services.arcgis.com/Wl7Y1m92PbjtJs5n/arcgis/rest/services/carpoolData/FeatureServer/0/"),i=s.createQuery();i.geometry=a.state.user_route,i.distance=Math.abs(a.state.distance),i.units=e[a.state.units],i.spatialRelationship="intersects",i.returnGeometry=!0,i.outFields=["*"],i.where="(office_id="+a.state.office_id+") AND (NOT driver="+a.state.driver+" OR driver=3) AND (NOT OBJECTID="+a.state.point_id+")";var l=Object(x.a)(a);s.queryFeatures(i).then((function(e){l.setState({data:e.features})})).catch((function(e){alert(e.message)}))}))},a}return Object(d.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){this.getUserByEmail()}},{key:"componentWillUnmount",value:function(){}},{key:"render",value:function(){var e=this,t=this.state.data,a={margin:"0 50px 0 0"};return!0===this.state.new_user_l&&!0===this.state.new_user_p?(alert("Fill out your Settings in order to find a carpool buddy"),n.a.createElement(p.a,{to:"/settings"})):n.a.createElement("div",null,n.a.createElement(C.a,{className:"justify-content-md-center"},n.a.createElement(N.a,{md:8},n.a.createElement(C.a,{style:{margin:"20px"}},n.a.createElement(P.a,{inline:!0},n.a.createElement(F.a,null,n.a.createElement(D.a,{type:"number",name:"distF",id:"distF",bsSize:"sm",style:{width:"130px"},onChange:function(t){e.setState({distance:Math.abs(t.target.value)}),e.filterF()},defaultValue:this.state.distance})),n.a.createElement("div",{style:a},n.a.createElement(F.a,null,n.a.createElement(D.a,{type:"select",name:"unitF",id:"unitF",bsSize:"sm",onChange:function(t){e.setState({units:t.target.value}),e.filterF()},defaultValue:this.state.units},n.a.createElement("option",{value:1},"miles"),n.a.createElement("option",{value:2},"feet"),n.a.createElement("option",{value:3},"kilometers"),n.a.createElement("option",{value:4},"meters")))),n.a.createElement("div",{style:a},n.a.createElement(F.a,null,n.a.createElement(M.a,{size:"sm"},n.a.createElement(D.a,{type:"number",name:"timeF",id:"timeF",bsSize:"sm",onChange:function(t){return e.setState({time:Math.abs(t.target.value)})},defaultValue:this.state.time}),n.a.createElement(L.a,{addonType:"append"},n.a.createElement(Y.a,null,"minutes"))))))),n.a.createElement(C.a,{style:{backgroundColor:"white",border:"1px solid lightgrey",borderRadius:"4px",margin:"20px"}},n.a.createElement(N.a,{md:12},n.a.createElement(q.a,{hover:!0,responsive:!0},n.a.createElement("thead",null,n.a.createElement("tr",null,n.a.createElement("th",null,"Name"),n.a.createElement("th",null,"Arrive At Work"),n.a.createElement("th",null,"Leave Work"),n.a.createElement("th",null,"Ride Preference"),n.a.createElement("th",null,"Email"))),n.a.createElement("tbody",null,t.filter((function(t){return function(e,t,a,r,n){var s=6e4*n,i=new Date("01/01/1970 "+a).getTime(),o=new Date("01/01/1970 "+r).getTime(),l=new Date("01/01/1970 "+e).getTime()-s,c=new Date("01/01/1970 "+e).getTime()+s,u=new Date("01/01/1970 "+t).getTime()-s,m=new Date("01/01/1970 "+t).getTime()+s,d=Q.range(l,c),f=Q.range(u,m);return d.contains(i)&&f.contains(o)}(e.state.arrive_work,e.state.leave_work,t.attributes.arrive_work,t.attributes.leave_work,e.state.time)})).map((function(e){return n.a.createElement("tr",{key:e.attributes.OBJECTID},n.a.createElement("td",null,e.attributes.name),n.a.createElement("td",null,Z(e.attributes.arrive_work)),n.a.createElement("td",null,Z(e.attributes.leave_work)),n.a.createElement("td",null,function(e){switch(e){case 1:return"Driver";case 2:return"Passenger";default:return"Either"}}(e.attributes.driver)),n.a.createElement("td",null,e.attributes.email))})))),n.a.createElement("div",{id:"msg"}))))))}}]),t}(r.Component),H=function(e){function t(){var e,a;Object(l.a)(this,t);for(var r=arguments.length,n=new Array(r),s=0;s<r;s++)n[s]=arguments[s];return(a=Object(u.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(n)))).state={name:null,email:null},a}return Object(d.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){var e=this;Object(h.loadModules)(["esri/portal/Portal","esri/identity/OAuthInfo","esri/identity/IdentityManager"]).then((function(t){var a=Object(o.a)(t,3),r=a[0],n=a[1],s=a[2],i=new n({appId:"n5A1575tmQq5eFPd",popup:!1}),l=e;s.registerOAuthInfos([i]),s.getCredential(i.portalUrl+"/sharing"),s.checkSignInStatus(i.portalUrl+"/sharing").then((function(e){var t=new r;t.authMode="immediate",t.load().then((function(){l.setState({name:t.user.fullName,email:t.user.email})}))}))})).catch((function(e){console.error(e)}))}},{key:"componentWillUnmount",value:function(){Object(h.loadModules)(["esri/identity/OAuthInfo","esri/identity/IdentityManager"]).then((function(e){var t=Object(o.a)(e,2),a=t[0],r=t[1],n=new a({appId:"n5A1575tmQq5eFPd",popup:!1});r.registerOAuthInfos([n]),r.destroyCredentials()})),window.location.reload()}},{key:"render",value:function(){var e=this.state,t=e.name,a=e.email;return n.a.createElement("div",null,n.a.createElement(S,null),n.a.createElement("div",null,a&&t?n.a.createElement(f.a,null,n.a.createElement(p.d,null,n.a.createElement(p.b,{exact:!0,path:"/"},n.a.createElement(A,{n:this.state.name,e:this.state.email})),n.a.createElement(p.b,{exact:!0,path:"/settings"},n.a.createElement(B,{n:this.state.name,e:this.state.email})),n.a.createElement(p.b,{exact:!0,path:"/results"},n.a.createElement($,{n:this.state.name,e:this.state.email})))):n.a.createElement("div",{className:"center"},n.a.createElement(v.a,{color:"warning",style:{width:"3rem",height:"3rem"}}))))}}]),t}(r.Component),K=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function X(e,t){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var a=e.installing;null!=a&&(a.onstatechange=function(){"installed"===a.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}})).catch((function(e){console.error("Error during service worker registration:",e)}))}i.a.render(n.a.createElement(H,null),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(function(){var t="".concat("","/service-worker.js");K?(!function(e,t){fetch(e).then((function(a){var r=a.headers.get("content-type");404===a.status||null!=r&&-1===r.indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):X(e,t)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(t,e),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")}))):X(t,e)}))}}()}},[[55,1,2]]]);
//# sourceMappingURL=main.c637b7fd.chunk.js.map