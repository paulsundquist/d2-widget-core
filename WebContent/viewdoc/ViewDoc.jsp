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


if (DOCBASE==null || USER==null || TICKET==null ){
	%>
	You must supply parameters:  DOCBASE, USER, TICKET;
	<%
    return;
	}
%>

<html>
<head>
<title>ViewDoc</title>
<script language='javascript' src="../OpenAjaxManagedHub-all.js"></script>
<script language='javascript' src="../D2-OAH.js"></script>
<script type="text/javascript">
var d2OpenAjaxHub = new D2OpenAjaxHub();

var DOCBASE="<%=DOCBASE%>";
var USER="<%=USER%>";
var TICKET="<%=TICKET%>";
 

///////////////////////////////
//
//	OPEN AJAX HUB CONNECTION
//
//////////////////////////////

/* Callback that is invoked upon successful connection to the Managed Hub
 */
function connectCompleted(hubClient, success, error) {
	if (success) {

		logit("Hub client connected");

		// subscribe to events 
		subscribeEvents();


	} else
		logit("Hub client NOT connected - please check console");
}

/* Callback that is invoked on widget activation -- Framework automatically subscribes to D2_EVENT_IFRAME_ACTIVE
 */
function onActiveWidget(bActiveFlag) {
	logit("onWidgetActive: activate iframe widget, state=" + (bActiveFlag ? "active" : "inactive"));
}

/* Callback that is invoked on widget initialization -- Framework automatically subscribes to D2_EVENT_IFRAME_INIT
 */
function onInitWidget(message) {
	logit("onWidgetInit: init iframe widget" );
}

/* Application initializes in response to document load event
 */
function loadEventHandler() {
	logit("Widget/Open Ajax Iframe loaded");

	//connecting hubclient 
	d2OpenAjaxHub.connectHub(connectCompleted, onInitWidget, onActiveWidget);

}

///////////////////////////////
//
//	OPEN AJAX SUBSCRIBE EVENT
//
//////////////////////////////

/** Subscribe to events -- Subscribe to D2_EVENT_SELECT_OBJECT to get the selected object type and update out form (if checkbox is checked)
 *   
 */
function subscribeEvents() {
	logit("subscribe to events...");
	d2OpenAjaxHub.subscribeToChannel ("D2_EVENT_SELECT_OBJECT", selectObjectCallback, true);
}

/** Event Handler for "D2_EVENT_SELECT_OBJECT" -- Called when the event arrives.
 */
function selectObjectCallback(name, msg) {
	logit("selectObjectCallback() called");
	logit(" name: " + name);
	logit("msg:" + msg);
	logit(" msg.getId(): " + msg.getId());
	logit(" msg.get(\"type\"): " + msg.get("type"));
	
	if (msg.get("type") != "dm_cabinet" && msg.get("type") != "dm_folder"){
		var url = "http://dv4-ls-d2-cs:8080/D2/servlet/Download?" + 
		      "_docbase=" + DOCBASE + 
	          "&_locale=en&_username=" + USER +
	          "&_password="+TICKET +
	          "&id="+msg.getId() +
	          "&format=_DEFAULT_"+
	          "&event_name=d2_view"+
	          "&content_disposition=inline";
		
		window.open(url,'ViewDoc_target');
	}
	

}


/** console log wrapper */
function logit(s) {
	console.log("[ViewDoc Widget] " + s);
}
</script>
</head>
<body onload="loadEventHandler();">
ViewDoc
</body>
</html>