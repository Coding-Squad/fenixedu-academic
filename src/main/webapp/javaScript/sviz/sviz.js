(function(e,t,n,r){var i={};e.SViz=i;var s=true;var o=true;var u={fallbackLng:"en",lng:"en",localesRelPath:"/locales/__lng__/__ns__.json",localesBasePath:"/js",getAsync:false,debug:true};var a={info:function(e,t){console.log("[SViz Info] - "+e);if(typeof t!=="undefined"){console.log(t)}},debug:function(e,t){if(o){console.log("[SViz Debug] - "+e);if(typeof t!=="undefined"){console.log(t)}}},error:function(e,t){console.log("[SViz Error] - "+e);if(typeof t!=="undefined"){console.log(t)}}};var f={valuesInsideDomainOnly:function(e){return function(t){if(t.grade>=e.minGrade&&t.grade<=e.maxGrade){return t.grade}}},computeMinMaxAndQuartiles:function(e,t){var r=[];e.forEach(function(e){var n=e[t];r.push(n)});var i=r.sort(n.ascending);var s=n.round(n.quantile(i,0),2);var o=n.round(n.quantile(i,.25),2);var u=n.round(n.quantile(i,.5),2);var f=n.round(n.quantile(i,.75),2);var l=n.round(n.quantile(i,1),2);var c={min:s,q1:o,q2:u,q3:f,max:l,median:u};a.debug("Computed Quantiles",c);return c},binData:function(e,t){var r=n.layout.histogram().range([e.minGrade-.5,e.maxGrade+.5]).bins(e.maxGrade-e.minGrade+1).frequency(t).value(function(e){return e.grade})(e.grades);var i=e.ranks?e.ranks.length:0;var s=e.grades.length;if(i>0){var o=[],u,a,f=t?1:1/s;for(var l=0;l<i;l++){u=o[l]=[];u.x=e.minGrade-i+l-.5;u.dx=1;u.y=0;u.label=e.ranks[l]}for(var l=0;l<s;l++){a=e.grades[l];for(var c=0;c<i;c++){if(a.grade===e.ranks[c]){u=o[c];u.y+=f;u.push(a);break}}}r=o.concat(r)}r.forEach(this.sortBinElements);return r},truncate:function(e,t,n){if(e.length>t){e=e.substring(0,t+1);e=e.substring(0,Math.min(e.length,e.lastIndexOf(" ")));e=e+n}return e},comparator:function(e,t){if(e.grade>t.grade)return 1;if(e.grade<t.grade)return-1;if(e.id>t.id)return 1;if(e.id<t.id)return-1;return 0},sortBinElements:function(e,t,n){e.sort(this.comparator)}};var l={};l.extend=function(e){var r={};var i=typeof e.update==="function"?e.update:function(){a.info("No method to update this visualization was defined.")};var s=function(e,t){if(typeof e==="object"){i.call(r,e,t)}else{n.json(e,function(e){i.call(r,e,t)})}};t.extend(r,e);return function(e,t,n){r.initialize(e,t,n);r.render();return{update:s}}};var c=l.extend({initialize:function(e,t,n){this.data=e;this.selector=t;this.opts=n},render:function(){var e=this.data;var t=this.selector;var i=i;if(!i)var i={};var s=r.t("evaluation-statistics",{returnObjectTrees:true});n.select(t).append("h4").text(s["title"]);var o=e.grades.length;var u=n.sum(e.grades,function(t){return t.grade>=e.minRequiredGrade});var a=n.sum(e.grades,function(t){return t.grade===e.notAttended});if(i.total!=false){n.select(t).append("p").text(s["total-students"]+o)}if(i.approved!=false){n.select(t).append("p").text(s["approved"]+n.round(u*100/o,1)+"%  ("+u+" "+r.t("students")+")")}if(e.notAttended&&i.noattend!=false){n.select(t).append("p").text(s["no-attends"]+n.round(a*100/o,1)+"%  ("+a+" "+r.t("students")+")")}if(i.mean!=false){n.select(t).append("p").text(s["mean"]+n.round(n.mean(e.grades,f.valuesInsideDomainOnly(e)),2))}if(i.extent!=false){n.select(t).append("p").text(s["extent"]+n.extent(e.grades,f.valuesInsideDomainOnly(e)))}if(i.median!=false){n.select(t).append("p").text(s["median"]+n.round(n.median(e.grades,f.valuesInsideDomainOnly(e)),2))}}});var h=l.extend({initialize:function(e,t,n){this.data=e;this.selector=t;this.opts=n},render:function(){var e=this.data;var i=this.selector;var s=this.opts;if(!s)var s={};if(!s.barWidth){s.barWidth=.9}else if(s.barWidth>1||s.barWidth<=0){s.barWidth=.9;a.info("[Histogram] Option barWidth has an impossible value. It must be between ]0;1]. Setting to default value of "+s.barWidth+".")}if(!s.barNumbers){s.barNumbers="count"}if(!s.tipNumbers){s.tipNumbers="percent"}var o=function(t,n){if(n==="count"){return s.barNumbers==="count"?t:t*e.grades.length/100}else if(n==="percent"){return s.barNumbers==="count"?t*100/e.grades.length:t}};var u=function(t){return t*e.grades.length/100};var l=function(t){return t*100/e.grades.length};var c=r.t("histogram",{returnObjectTrees:true});var h={top:10,right:10,bottom:20,left:30},p=60,d=570-h.left-p/2,v=240-p/2-h.right,m=260-h.top-h.bottom;var g=n.select(i).append("svg").attr("width",d+v+p+h.left+h.right).attr("height",m+h.top+h.bottom);var y=g.append("g").attr("transform","translate("+h.left+","+h.top+")");var b=n.scale.linear();var w=n.scale.ordinal();if(e.ranks){w.domain(e.ranks)}var E=n.scale.linear().rangeRound([m,0]);var S,x,T,N;var C=function(e){S=e.ranks?e.ranks.length:0;x=e.maxGrade-e.minGrade+1+S;T=Math.floor(d/x);N=T*s.barWidth;var t=d-T*x;b.domain([e.minGrade-.5,e.maxGrade+.5]).rangeRound([S*T+t,d]);w.rangeRoundBands([t,S*T+t],1-s.barWidth)};C(e);var k=f.binData(e,s.barNumbers!=="percent");E.domain([0,n.max(k,function(e){return e.y})]);if(e.minRequiredGrade&&s.showMinGrade!=false){y.append("g").append("rect").attr("class","minRect").attr("x",0).attr("width",b(e.minRequiredGrade)).attr("height",m)}var L=function(e){return function(t){if(e.student.id&&s.highlightStudent!=false){for(var n in t){if(!(n in{x:1,dx:1,y:1,label:1})){if(t[n].id==e.student.id){return"tip bar you"}}}}return"tip bar"}};var A=y.selectAll(".bar").data(k).enter().append("g").attr("class",L(e)).attr("title",function(e){if(s.tooltip!=false&&s.tipNumbers!="none"){return s.tipNumbers=="count"?u(e.y):n.round(l(e.y),2)+"%"}}).attr("transform",function(e){return"translate("+b(e.x+.5)+","+E(e.y)+")"}).on("mouseover",function(e){if(s.details!=false){z.remove();X(e,W.range([e.x,e.x+1])(e))}if(s.table!=false){Y.remove();Z(e)}});A.append("rect").attr("x",-N/2).attr("width",N).attr("height",function(e){return m-E(e.y)});if(s.barNumbers!="none"){A.append("text").attr("dy",".75em").attr("y",6).attr("x",0).attr("text-anchor","middle").text(function(e){if(e.y!=0){return s.barNumbers=="percent"?n.round(e.y,1)+"%":e.y}})}if(s.tooltip!=false&&s.tipNumbers!="none"){t(".tip").qtip({style:"qtip-tipsy",position:{my:"bottom middle",at:"top middle"}})}if(e.minRequiredGrade&&s.showMinGrade!=false){y.append("g").attr("class","line").attr("transform",function(t){return"translate("+b(e.minRequiredGrade)+", 0)"}).append("line").attr("x1",0).attr("x2",0).attr("y1",0).attr("y2",m)}if(s.showMean!=false){var O=n.round(n.mean(e.grades,f.valuesInsideDomainOnly(e)),2);y.append("g").attr("class","mean").attr("transform",function(e){return"translate("+b(O)+", 0)"}).append("line").attr("x1",0).attr("x2",0).attr("y1",0).attr("y2",m)}if(s.xAxis!=false){var M=n.svg.axis().scale(b).tickValues(n.range(e.minGrade,e.maxGrade+1)).orient("bottom").tickFormat(n.format("d")).outerTickSize(0);var _=y.append("g").attr("class","x axis").attr("transform","translate(0,"+m+")").call(M);if(s.xAxisLabel!=false){_.append("text").attr("class","label").attr("x",d).attr("y",-6).text("Grade")}var D=n.svg.axis().scale(w).orient("bottom").outerTickSize(0);y.append("g").attr("class","xr axis").attr("transform","translate(0,"+m+")").call(D)}if(s.yAxis!=false){var P=n.svg.axis().scale(E).orient("left").tickFormat(function(e){return s.barNumbers==="percent"?n.round(e*100):e});var _=y.append("g").attr("class","y axis").call(P);if(s.yAxisLabel!=false){if(s.barNumbers==="percent"){_.append("text").attr("class","label").attr("x",15).attr("dy",".71em").text("%")}else{_.append("text").attr("class","label").attr("transform","rotate(-90)").attr("y",6).attr("dy",".71em").text(c["y-label"])}}}if(s.legend!=false){var H=y.append("g").attr("class","legend").attr("transform","translate(0,0)");var B=0;if(e.minRequiredGrade&&s.showMinGrade!=false){var j=H.append("g").attr("transform","translate("+(d-18)+","+B+")");j.append("line").attr("x2",18).attr("y1",9).attr("y2",9).attr("class","line");j.append("text").attr("x",-6).attr("y",9).attr("dy",".35em").style("text-anchor","end").text(c["min-grade"]);B+=20}if(s.showMean!=false){var j=H.append("g").attr("transform","translate("+(d-18)+","+B+")");j.append("line").attr("x2",18).attr("y1",9).attr("y2",9).attr("class","mean");j.append("text").attr("x",-6).attr("y",9).attr("dy",".35em").style("text-anchor","end").text(c["mean"]);B+=20}if(e.student.id&&s.highlightStudent!=false){var j=H.append("g").attr("transform","translate("+(d-18)+","+B+")");j.append("rect").attr("width",18).attr("height",18).style("fill","purple");j.append("text").attr("x",-6).attr("y",9).attr("dy",".35em").style("text-anchor","end").text(c["self-id"])}}if(s.details!=false){var F=g.append("g").attr("transform","translate("+(h.left+d+p)+","+h.top+")");var I=n.scale.linear().domain([]).rangeRound([0,v]);var q=v/10/2;if(s.detailsBarWidth){if(s.detailsBarWidth>=3&&s.detailsBarWidth<=v/10){q=s.detailsBarWidth}else{a.info("[Histogram] Option detailsBarWidth has an impossible value. It must be between "+3+" and "+v/10+". Setting to default value of "+q+".")}}var R=n.svg.axis().scale(I).ticks(10).orient("bottom");F.append("g").attr("class","x2 axis").attr("transform","translate(0,"+m+")").call(R);var U=F.append("foreignObject").attr("width",v).attr("height",m).attr("class","temporary").attr("y",m/2-14*2);var z=U.append("xhtml:div").style("text-align","center").html(c["hover-text"]);var W=n.layout.histogram().range([e.minGrade,e.maxGrade]).bins(10).frequency(s.barNumbers!=="percent").value(function(e){return e.grade});function X(t,r){I.domain([t.x,t.x+1]);R.tickFormat(function(n){if((n===t.x||n===t.x+.5||n===t.x+.9)&&n>=e.minGrade&&n<=e.maxGrade){return n}});var i=t.x>=e.minGrade?t.x:e.minGrade;var s=t.x+1>=e.maxGrade?e.maxGrade+.1:t.x+1.1;R.tickValues(n.range(i,s,.1));F.select(".x2").call(R);var o=F.selectAll(".bar").data(r);o.enter().append("g").attr("transform",function(e){return"translate("+I(e.x)+",0)"}).append("rect").attr("x",1-q/2).attr("width",q-2);o.attr("class",L(e));o.select("rect").attr("y",function(e){return E(e.y)}).attr("height",function(e){return m-E(e.y)});o.exit().remove()}function V(){I.domain([]);F.select(".x.axis").call(R);F.selectAll(".bar").remove();U.append("xhtml:div").append(function(){return z.remove()[0][0]})}}if(s.table!=false){var J=n.select(i).append("table").attr("class","table table-hover table-bordered table-condensed");var K=s.tableColumns||["ID","photo","name","grade"];var Q=J.append("thead");Q.append("tr").selectAll("th").data(function(){return K.map(function(e){return{column:e,value:c["table-columns"][e]}})}).enter().append("th").text(function(e){return e.value});var G=J.append("tbody");var Y=G.append("tr").append("td").attr("colspan",K.length).attr("class","temporary").style("text-align","center").text(c["hover-text"]);function Z(e){var t=G.selectAll("tr").data(e);t.enter().append("tr");t.selectAll("td").data(function(e){return K.map(function(t){return{column:t,value:e[t]}})}).enter().append("td");t.selectAll("td").html(function(e){return e.column=="photo"?"<img src='"+e.value+"' width='25px' alt='photo'/>":e.value});t.exit().remove()}function et(){G.selectAll("tr").remove();G.append("tr").append(function(){return Y.remove()[0][0]})}}this.myUpdate=function(t){this.data=t;C(t);k=f.binData(t,s.barNumbers!=="percent");M.tickValues(n.range(t.minGrade,t.maxGrade+1));w.domain(t.ranks?t.ranks:[]);D.scale(w);E.domain([0,n.max(k,function(e){return e.y})]);var r=750;var i=25;var o=function(e,t){return t*i};var a=y.transition().duration(r+i*x);a.select(".x").call(M);a.select(".xr").call(D);a.select(".y").call(P);var c=y.selectAll(".bar").data(k);var h=c.enter().append("g").attr("class",L(t)).attr("title",function(e){if(s.tooltip!=false&&s.tipNumbers!="none"){return s.tipNumbers=="count"?u(e.y):n.round(l(e.y),2)+"%"}}).attr("transform",function(e){return"translate("+b(e.x+.5)+","+E(e.y)+")"}).on("mouseover",function(e){if(s.details!=false){z.remove();X(e,W.range([e.x,e.x+1])(e))}if(s.table!=false){Y.remove();Z(e)}});h.append("rect");if(s.barNumbers!="none"){h.append("text").attr("dy",".75em").attr("y",6).attr("x",0).attr("text-anchor","middle")}c.transition().delay(o).duration(r).attr("class",L(t)).attr("transform",function(e){return"translate("+b(e.x+.5)+","+E(e.y)+")"});c.select("rect").attr("x",1-N/2).attr("width",N-2).attr("height",function(e){return m-E(e.y)});c.select("text").text(function(t){if(t.y!=0){return s.barNumbers=="percent"?n.round(t.y*100/e.grades.length)+"%":t.y}});c.exit().remove();if(e.minRequiredGrade&&s.showMinGrade!=false){a.select(".minRect").attr("width",b(t.minRequiredGrade));a.select(".line").attr("transform",function(e){return"translate("+b(t.minRequiredGrade)+", 0)"})}if(s.showMean!=false){var p=n.round(n.mean(t.grades,f.valuesInsideDomainOnly(t)),2);a.select(".mean").attr("transform",function(e){return"translate("+b(p)+", 0)"})}if(s.details!=false){V()}if(s.table!=false){et()}}},update:function(e,t){this.myUpdate(e)}});var p=l.extend({initialize:function(e,t,n){this.data=e;this.selector=t;this.opts=n},render:function(){var e=this.data;var i=this.selector;var s=this.opts;var o=r.t("donuts",{returnObjectTrees:true});a.debug("Invoked Multiple Donuts Visualization with opts",s);var u=3/4;var f=60;var l=40;var c=s?s.radius||f:f;var h=s?s.innerRadius||l:l;var p=s?s.width||t(i).width():t(i).width();var d=s?s.height||p*u:p*u;var v=s?s.showLegend===true:true;var m=s?s.legendSelector||i:i;var g=n.svg.arc().outerRadius(c).innerRadius(h);var y=n.layout.pie().sort(null).value(function(e){return e.population});e.entries.forEach(function(r){var i=0;t.each(e.domain,function(e,t){i+=+r[t]});r.total=i;r.values=e.domain.map(function(e){var t=n.round(+r[e]/+r["total"]*100,1)+"%";return{name:e,population:+r[e],total:i,perc:t}})});if(v){var b=n.select(m).append("svg").attr("class","legend-text").attr("width",150).attr("height",c*2).selectAll("g").data(e.domain.slice().reverse()).enter().append("g").attr("transform",function(e,t){return"translate("+0+","+t*20+")"});b.append("rect").attr("width",12).attr("height",12).attr("class",function(e){return"donut-"+e});b.append("text").attr("x",16).attr("y",6).attr("dy",".35em").text(function(e){return o[e]})}var w=n.select(i).selectAll(".donut").data(e.entries).enter().append("svg").attr("class","donut").attr("width",c*2).attr("height",c*2).append("g").attr("transform","translate("+c+","+c+")");w.selectAll(".donut-arc").data(function(e){return y(e.values)}).enter().append("path").attr("title",function(e){return"<center>"+o[e.data.name]+"<br>"+e.data.perc+"<br/>"+e.data["population"]+"/"+e.data["total"]+"</center>"}).attr("class",function(e){return"tip donut-arc donut-"+e.data.name}).attr("d",g);w.append("text").attr("dy",".35em").attr("class","donut-center-text tip").attr("title",function(e){return e.description}).style("text-anchor","middle").text(function(e){return e.text});t(".tip").qtip({style:"qtip-tipsy",position:{target:"mouse",adjust:{x:15,y:15}}})}});var d=l.extend({initialize:function(e,t,n){this.data=e;this.selector=t;this.opts=n},render:function(){var e=this.data;var t=this.selector;var r=this.opts;var i=f.computeMinMaxAndQuartiles(e.grades,"grade");var s=3/4;var o=20;var u=o*5;var a=300;var l=r?r.width||u:u;var c=r?r.height||a:a;var h=r?r.boxWidth||o:o;var p=n.select(t).append("svg").attr("width",l).attr("height",c);p.append("line").attr("class","boxplot-line").attr("x1",l/2).attr("x2",l/2).attr("y1",0).attr("y2",c);var d=function(e,t,n){return c-c*e/(n-t)};var v=function(e,t){e.append("line").attr("class","boxplot-quantile-line").attr("x1",l/2-h/2).attr("x2",l/2+h/2).attr("y1",t).attr("y2",t)};var m=function(e,t,n,r){e.append("text").attr("class","boxplot-quantile-text "+r).attr("x",0).attr("y",n).text(t)};var g=d(i.q1,i.min,i.max);var y=d(i.q2,i.min,i.max);var b=d(i.q3,i.min,i.max);p.append("rect").attr("stroke","black").attr("fill","white").attr("x",l/2-h/2).attr("y",b).attr("width",h).attr("height",g-b);v(p,0);v(p,y);v(p,c);m(p,i.max,10,"boxplot-max-text");m(p,i.q3,b+5,"boxplot-q3-text");m(p,i.q2,y+5,"boxplot-q2-text");m(p,i.q1,g+5,"boxplot-q1-text");m(p,i.min,c,"boxplot-min-text")}});var v=l.extend({initialize:function(e,t,n){this.data=e;this.selector=t;this.opts=n},render:function(){var e=this.data;var i=this.selector;var s=this.opts;var o=300;var u=250;var a=s?s.width||o:o;var f=s?s.height||u:u;var l=Math.min(a,f)/2;var c=e.grades.length;var h=r.t("sunburst",{returnObjectTrees:true});var p=function(e,t,n){if(t){e.studentGrade=true;e.studentGradeValue=n}};var d=function(e,r){var i=false;var s={name:"root",children:[]};var o={name:"approved",children:[]};var u={name:"flunked",children:[]};var a={name:"not-evaluated",children:[]};var f={name:"10-14",children:[]};var l={name:"15-20",children:[]};var c={name:"0-4",children:[]};var h={name:"5-9",children:[]};t.each(e,function(e,t){var s=t.grade;var o=t.id===r;if(s==="NE"){a.children.push(t);p(a,o,s)}else if(s==="RE"||n.round(s,0)<10){if(s==="RE"){i=true;u.children.push(t);p(u,o,s)}else if(n.round(s,0)<=4){p(c,o,s);c.children.push(t)}else{p(h,o,s);h.children.push(t)}}else{if(n.round(s,0)<=14){p(f,o,s);f.children.push(t)}else{p(l,o,s);l.children.push(t)}}});f.size=f.children.length;l.size=l.children.length;c.size=c.children.length;h.size=h.children.length;f.data=f.children;f.data=l.children;c.data=c.children;h.data=h.children;f.children=undefined;l.children=undefined;c.children=undefined;h.children=undefined;o.children.push(l);o.children.push(f);o.size=f.size+l.size;if(i){u.size=u.children.length;u.children=undefined}else{u.children.push(h);u.children.push(c);u.size=c.size+h.size}a.size=a.children.length;a.children=undefined;s.children.push(o);s.children.push(u);s.children.push(a);return s};var v=n.select(i).append("svg").attr("width",a).attr("height",f).append("g").attr("id","container").attr("transform","translate("+a/2+","+f/2+")");var m=n.layout.partition().size([2*Math.PI,l*l]).value(function(e){return e.size});var g=n.svg.arc().startAngle(function(e){return e.x}).endAngle(function(e){return e.x+e.dx}).innerRadius(function(e){return Math.sqrt(e.y)}).outerRadius(function(e){return Math.sqrt(e.y+e.dy)});var y=n.svg.arc().startAngle(function(e){return e.x+5}).endAngle(function(e){return e.x+e.dx+5}).innerRadius(function(e){return Math.sqrt(e.y)}).outerRadius(function(e){return Math.sqrt(e.y+e.dy)});v.append("circle").attr("r",l).style("opacity",0);var b=undefined;var w=undefined;var E=d(e.grades,e.student.id);var S=m.nodes(E);var x=v.data([E]).selectAll("path").data(S).enter().append("path").attr("display",function(e){return e.depth?null:"none"}).attr("d",g).attr("title",function(e){return"<center>"+h[e.name]+"<br>"+e.size+" "+h["of"]+" "+c+" "+h["students"]+"</center>"}).attr("class",function(e){var t="sunburst-path tip sunburst-path-"+e.name;if(e.studentGrade){b=e;t=t+" sunburst-own-grade"}return t}).attr("fill-rule","evenodd").style("opacity",function(e){return e.studentGrade?1:.3}).on("mouseover",function(e){t(".sunburst-path").attr("style","opacity: 0.3");t(this).attr("style","opacity: 1");t(".sunburst-percentage",i).text(n.round(e.value/c*100,1)+"%");t(".sunburst-percentage",i).attr("y",0);t(".sunburst-text",i).text(h[e.name])}).on("mouseout",function(e){t(this).attr("style","opacity: 0.3");t(".sunburst-own-grade").attr("style","opacity: 1");var n=b.studentGradeValue!=="RE"&&b.studentGradeValue!=="NE"?b.studentGradeValue:h[b.name];t(".sunburst-percentage",i).text(n);t(".sunburst-percentage",i).attr("y",10);t(".sunburst-text",i).text("")});v.append("text").attr("class","sunburst-percentage").attr("text-anchor","middle");v.append("text").attr("y",20).attr("class","sunburst-text").attr("text-anchor","middle");var T=b.studentGradeValue!=="RE"&&b.studentGradeValue!=="NE"?b.studentGradeValue:h[b.name];t(".sunburst-percentage",i).text(T);t(".sunburst-percentage",i).attr("y",10);t(".sunburst-text",i).text("");t(".tip").qtip({style:"qtip-tipsy",position:{target:"mouse",adjust:{x:10,y:10}}})},update:function(e,n){this.data=e;t(this.selector).empty();this.render()}});var m=l.extend({initialize:function(e,t,n){this.data=e;this.selector=t;this.opts=n},render:function(){var e=this.data;var i=this.selector;var s=this.opts;var o=r.t("progress-bars",{returnObjectTrees:true});var u=600;var a=e.length*50;var f=s?s.width||u:u;var l=s?s.height||a:a;var c=n.select(i).append("svg").attr("width",f).attr("height",l);var h=function(e,t,r,i,s,u,a,l,c,h){var p=e.append("g").attr("transform","translate("+t+","+r+")").attr("y",r).attr("class","tip").attr("title",function(e){var t=i>s?100:n.round(i/s*100,1);return"<center>"+l+"<br>("+t+"%) "+i+" "+o["ects-of"]+" "+s+" "+o["required-ects"]+"</center>"});p.append("rect").attr("x",0).attr("y",0).attr("width",f-t).attr("height",a).attr("class","progress-bar progress-outer-bar "+h);p.append("rect").attr("x",0).attr("y",(a-u)/2).attr("width",i/s*(f-t)).attr("height",u).attr("class",function(){return"progress-bar progress-inner-bar "+c+(i>=s?"-completed":"-incomplete")});p.append("text").attr("x",-t).attr("y",a/2+5).style("cursor","pointer").text(l);return p};e.sort(function(e,t){return e.year-t.year});t.each(e,function(e,t){h(c,100,(e+1)*25+20,t["credits"],t["required-credits"],10,20,t["degree"],"progress-main","progress-main")});t(".tip").qtip({style:"qtip-tipsy",position:{target:"mouse",adjust:{x:10,y:10}}})}});var g=l.extend({initialize:function(e,t,n){this.data=e;this.selector=t;this.opts=n},render:function(){function T(e){return function(t){console.log(e);console.log(t)}}function N(e){var t=n.select(this).node().parentNode;n.select(t).selectAll("circle").style("display","none");n.select(t).selectAll("text.value").style("display","block")}function C(e){var t=n.select(this).node().parentNode;n.select(t).selectAll("circle").style("display","block");n.select(t).selectAll("text.value").style("display","none")}var e=this.data;var i=this.selector;var s=this.opts;var o=r.t("bubbles",{returnObjectTrees:true});var u={top:20,right:400,bottom:0,left:20};var a=800;var l=e.entries.length*20+15;var c=e["start-year"],h=e["end-year"];var p=n.scale.category20c();var d=n.scale.linear().range([0,a]);var v=n.svg.axis().scale(d).orient("top");var m=n.format("dddd");v.tickFormat(m).tickValues(n.range(c,h+1));var g=n.select(i).append("svg").attr("width",a+u.left+u.right).attr("height",l+u.top+u.bottom).append("g").attr("transform","translate("+u.left+","+u.top+")");d.domain([c,h]);var y=n.scale.linear().domain([c,h]).range([0,a]);g.append("g").attr("class","x axis").attr("transform","translate(0,"+0+")").call(v);for(var b=0;b<e.entries.length;b++){var w=g.append("g").attr("class","journal");var E=w.selectAll("circle").data(e.entries[b]["years"]).enter().append("circle");var S=w.selectAll("text").data(e.entries[b]["years"]).enter().append("text");var x=n.scale.linear().domain([0,n.max(e.entries[b]["years"],function(e){return e[1]})]).range([3,9]);E.attr("cx",function(e,t){return y(e[0])}).attr("cy",b*20+20).attr("r",function(e){return x(e[1])}).attr("class","tip").attr("title",function(e){var t=n.round(e[1]/(e[1]+e[2]+e[3])*100,0);return"<center>"+t+"%<br>"+o["approved"]+"</center>"}).style("cursor","pointer").style("fill",function(e){return p(b)}).on("mouseover",T(e.entries[b]));S.attr("y",b*20+25).attr("x",function(e,t){return y(e[0])-5}).attr("class","value").text(function(e){var t=n.round(e[1]/(e[1]+e[2]+e[3])*100,0);return t}).style("fill",function(e){return p(b)}).style("display","none");w.append("text").attr("y",b*20+25).attr("x",a+20).attr("class","bubbles-label").text(f.truncate(e.entries[b]["name"],50,"...")).style("fill",function(e){return p(b)}).style("cursor","pointer").on("mouseover",N).on("mouseout",C)}t(".tip").qtip({style:"qtip-tipsy",position:{target:"mouse",adjust:{x:10,y:10}}})}});var y=l.extend({initialize:function(e,t,n){this.data=e;this.selector=t;this.opts=n},render:function(){var e=this.data;var t=this.selector;var i=this.opts;if(!i)var i={};var s=r.t("overall-statistics",{returnObjectTrees:true});n.select(t).append("h4").text(s["title"]);if(i.mean!=false){n.select(t).append("p").text(s["mean"]+e.mean)}if(i.extent!=false){n.select(t).append("p").text(s["extent"]+e.minGrade+" , "+e.maxGrade)}if(i.approved!=false){n.select(t).append("p").text(s["approved"]+e.approved)}if(i.flunked!=false){n.select(t).append("p").text(s["flunked"]+e.flunked)}if(i.noattend!=false){n.select(t).append("p").text(s["no-attends"]+e.notAttended)}}});var b={showEvaluationStatistics:function(e,t,n){return c(e,t,n)},showHistogram:function(e,t,n){return h(e,t,n)},showCourses:function(e,t,n){return p(e,t,n)},showCourseOvertime:function(e,t,n){return p(e,t,n)},showEvaluationBoxPlot:function(e,t,n){return d(e,t,n)},showEvaluationSunburst:function(e,t,n){return v(e,t,n)},showStudentProgress:function(e,t,n){return m(e,t,n)},showOverallStatistics:function(e,t,n){return y(e,t,n)},showCurricularCoursesOvertime:function(e,t,n){return g(e,t,n)}};i.init=function(e){if(e){if(e.lang){u.lng=e.lang}if(e.localesBasePath){u.localesBasePath=e.localesBasePath}if(e.debug){o=e.debug}}w()};var w=function(){u.resGetPath=u.localesBasePath+u.localesRelPath;r.init(u,function(){a.debug("i18n initialized")});s=false};i.loadViz=function(e,t,r,i){if(s){a.debug("SViz is not initialized. Initializing...");w()}if(b[e]!=="undefined"){if(typeof t==="object"){return b[e](t,r,i)}else{n.json(t,function(t){return b[e](t,r,i)})}}else{a.error("Visualization named '"+e+"' not found.")}}})(this,jQuery,d3,i18n)