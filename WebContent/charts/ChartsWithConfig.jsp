<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ page import="java.util.*"%>

<%@ page import="java.io.InputStream" %>
<%@ page import="java.util.Properties" %>
<%@ page import="com.documentum.fc.client.*"%>
<%@ page import="com.documentum.fc.common.*"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<%

String DOCBASE=request.getParameter("DOCBASE");
String USER=request.getParameter("USER");
String TICKET=request.getParameter("TICKET");
String CONFIG=request.getParameter("CONFIG");

if (DOCBASE==null || USER==null || TICKET==null || CONFIG==null){
	%>
	You must supply parameters:  DOCBASE, USER, TICKET, CONFIG;
	<%
    return;
}

String sQueryForm = "";
String sQuery = "";
String sChartType = "pie";
String sParamName = "";

try {  
InputStream is = getServletContext().getResourceAsStream("/WEB-INF/chart_config/" + CONFIG + ".properties");  
Properties props = new Properties();
System.out.println("is=" + is);  
props.load(is);  

 sQuery = props.getProperty("query");
 sQueryForm = props.getProperty("queryForm");
  sChartType = props.getProperty("chartType");
  sParamName = props.getProperty("paramName");
}  
catch (Exception e) {e.printStackTrace();}

System.out.println("query=" + sQuery);  
%>




<html>
<head>
<title>Dashboard</title>
<script language='javascript' src="../OpenAjaxManagedHub-all.js"></script>
<script language='javascript' src="../D2-OAH.js"></script>
<script type="text/javascript" src="https://www.google.com/jsapi"></script>
<script type="text/javascript">
	// -------------------- D2 Widget stuff
	var d2OpenAjaxHub = new D2OpenAjaxHub();
	var messageToSend = new OpenAjaxMessage();
	var eventList = new Array();
	var queryForm = "<%=sQueryForm%>";
///////////////////////////////
	//
	//	OPEN AJAX HUB CONNECTION
	//
	//////////////////////////////

	/* Callback that is invoked upon successful connection to the Managed Hub */
	function connectCompleted(hubClient, success, error) {
		if (success) {
			this.addLog("Hub client connected");
		} else
			this.addLog("Hub client NOT connected - please check console");
	}

	/* Callback that is invoked widget init */
	function widgetInit(oMessage) {

		//this.onData("---init---", oMessage);

		//getting events supported by the portal
		this.eventList = oMessage.get("channels").split(oMessage.PARAM_SPLIT_SEPARATOR);
		//init ui with this list
		this.populateSelectEvents(document.getElementById("eventListSub"));
		this.populateSelectEvents(document.getElementById("eventListSend"));
		this.changeSelectParam();
	}

	/* Application initializes in response to document load event */
	function loadEventHandler() {
		console.log("Open Ajax Iframe loaded ");

		//connecting hubclient 
		d2OpenAjaxHub.connectHub(connectCompleted, widgetInit, onActiveWidget);

		//changeSelectParam();	
	}
	///////////////////////////////
	//
	//	OPEN AJAX HUB SUBSCRIPTION
	//
	//////////////////////////////

	/* Callback that is invoked upon data receiving*/
	function onData(event, oMessage) {
		addLog("-----------");

		function addKeyValueToLog(key, value, hasNext) {
			addLog("-> " + key + " = " + value);
		}
		oMessage.each(addKeyValueToLog);

		addLog("received data for channel :" + event);
	}

	/* Callback that is invoked upon widget activation*/
	function onActiveWidget(bActiveFlag) {
		addLog("setting iframe widget " + this.getWidgetId() + " to " + (bActiveFlag ? "active" : "inactive"));
	}

	function subscribe() {
		var index = document.getElementById("eventListSub").selectedIndex;
		if (index != -1) {
			var channel = this.eventList[index];
			d2OpenAjaxHub.subscribeToChannel(channel, onData);
			this.addLog("Subscribed to channel : " + channel);
		}
	}

	function send() {
		var index = document.getElementById("eventListSend").selectedIndex;
		if (index != -1) {
			var channel = this.eventList[index];
			d2OpenAjaxHub.sendMessage(channel, messageToSend);
			this.addLog("sent to channel : " + channel + "  - message : " + messageToSend.toString());
		}
	}

	///////////////////////////////
	//
	//	UI
	//
	//////////////////////////////

	function addLog(text) {
		var consoleTextObject = document.getElementById("consoleText");
		consoleTextObject.value = text + "\n" + consoleTextObject.value;
	}

	function populateSelectEvents(oSelect) {
		var eventListOptions = this.eventList;
		for ( var i = 0; i < eventListOptions.length; i++) {
			var option = document.createElement("option");
			option.text = eventListOptions[i];
			oSelect.add(option, null);
		}
	}

	function changeSelectParam() {
		var mdiv = document.getElementById('selectParamKeyOther');
		var cdiv = document.getElementById('selectParamKey');
		if (cdiv.options[cdiv.selectedIndex].value == 'other') {
			mdiv.style.visibility = 'visible';
		} else {
			mdiv.style.visibility = 'hidden';
		}
	}
	
	function setGlobal(oCheckbox) {
		messageToSend.setGlobal(oCheckbox.checked);
	}

	function addParam() {
		var key = "";
		var mdiv = document.getElementById('selectParamKeyOther');
		var cdiv = document.getElementById('selectParamKey');
		if (cdiv.options[cdiv.selectedIndex].value == 'other') {
			key = mdiv.value;
		} else {
			key = cdiv.value;
		}

		messageToSend.put(key, document.getElementById('inputParamValue').value);
		displayMessage();
	}
	function clearMessage() {
		this.messageToSend = new OpenAjaxMessage();
		displayMessage();
	}

	function displayMessage() {
		var paramsTextObject = document.getElementById("params");
		paramsTextObject.value = "";

		function addKeyValueToParam(key, value, hasNext) {
			paramsTextObject.value = paramsTextObject.value + "\n" + key + " : " + value;
		}
		messageToSend.each(addKeyValueToParam);

	}

	function clearConsole() {
		var consoleTextObject = document.getElementById("consoleText");
		consoleTextObject.value = "";
	}

	function updateDoclist(param_name,param_value,queryFormConfigName) {

		/*
			This function allows to update the D2 doclist from an external widget.
			This widget posts an event D2_ACTION_EXECUTE that allows calling easily a web service. 
			The service used here (Search) is the one called when a query form is executed. 
			This service receives property names and property values which will be used in the query form to replace the $values.
			It updates the user's last search object by attaching the sent property values to it.
			
			When posting the D2_ACTION_EXECUTE event, it is possible to define what action or event will be triggered when the web service will be finished. 
			In our case, this will trigger a D2_ACTION_SEARCH_DOCUMENT that will display the user's last search results in the doclist.

		
		 */
		//Query form configuration name is defined below
		//var queryFormConfigName = "QF INV Lifecycle State";

		//To update the doclist a new OpenAjax message will be build to be posted in the Hub using the D2-OAH API
		var messageToSend = new OpenAjaxMessage();

		//In the message, we need to define what properties will be sent. Here a_status and r_object_type
		messageToSend.put("list", param_name);

		//We set the a_status value
		messageToSend.put(param_name, param_value);

		//set the query form config name which will be used to update the doclist
		messageToSend.put("config", queryFormConfigName);

		//Then we define what service and what method in the service will be called. We call the Search service and the runQueryFormSearch method.
		//Calling this service will update the user's last search object
		messageToSend.put("eService", "Search");
		messageToSend.put("eMethod", "runQueryFormSearch");

		//When the service call will be finished, we can define what action will be executed. Here, an event will be posted.
		messageToSend.put("rType", "EVENT");
		//As the last search has been updated by the web service call, we will post the D2_ACTION_SEARCH_DOCUMENT event to display the search results
		messageToSend.put("rAction",
				"D2_ACTION_SEARCH_DOCUMENT::oam_id==node_last_search");

		//The message is now ready, it can be posted in the Hub
		d2OpenAjaxHub.sendMessage("D2_ACTION_EXECUTE", messageToSend);
	}

	// --------------------------------------------
	// this script

	google.load("visualization", "1", {
		packages : [ "corechart" ]
	});
	google.setOnLoadCallback(drawChart);
	var chart;
	var data;

	function drawChart() {

		data = google.visualization
				.arrayToDataTable([
						[ 'State', 'Count' ],
<%

						
			IDfClient client = DfClient.getLocalClient();
			DfLoginInfo loginInfo = new DfLoginInfo();
	
			loginInfo.setUser(USER);
			IDfSessionManager m_sessionMgr = client.newSessionManager();
			m_sessionMgr.setIdentity(DOCBASE, loginInfo);
			loginInfo.setPassword(TICKET);
			IDfSession idfSession =client.newSession(DOCBASE, loginInfo);			
						

			//String sQuery = "select inv_dept as param1,count(*) as cnt from inv_document group by inv_dept";
			DfQuery query = new DfQuery();
			query.setDQL(sQuery);
			IDfCollection colObjects = query.execute(idfSession,
					DfQuery.DF_READ_QUERY);

			//ServletOutputStream out = response.getOutputStream();

			boolean isFirst = true;

			while (colObjects.next()) {
				String value = colObjects.getString("param1");
				String count = colObjects.getString("cnt");
				if (!isFirst){
					out.print(",");
				}
				out.println("['" + value + "'," + count + "]");
				isFirst = false;
			}
			
			colObjects.close();
			idfSession.disconnect();
			%>
	]);

		var options = {
			pieSliceText : 'value',
			height : '300'
		};

		if ("<%=sChartType%>" == "bar") {
			chart = new google.visualization.BarChart(document
				.getElementById('chart_div'));
		}else if ("<%=sChartType%>" == "column") {
				chart = new google.visualization.ColumnChart(document
					.getElementById('chart_div'));
		} else {
			chart = new google.visualization.PieChart(document
				.getElementById('chart_div'));
		}
		chart.draw(data, options);
		google.visualization.events.addListener(chart, 'select', selectHandler);
	}

	function selectHandler() {

		var selectedItem = chart.getSelection()[0];
		var value = data.getValue(selectedItem.row, 0);
		var param_name = "<%=sParamName%>";
		//alert('The user selected ' + value);
		updateDoclist(param_name,value,queryForm);
	}
</script>
</head>
<body onload="loadEventHandler();">
	<div id="chart_div" style="width: 900px; height: 500px;"></div>
</body>
</html>