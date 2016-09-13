<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ page import="java.util.*"%>

<%@ page import="java.io.InputStream" %>
<%@ page import="java.util.Properties" %>
<%@ page import="com.documentum.fc.client.*"%><%@page import="com.documentum.fc.common.*"%>


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
<title>VdocExport</title>
<script language='javascript' src="../OpenAjaxManagedHub-all.js"></script>
<script language='javascript' src="../D2-OAH.js"></script>
<script language='javascript' src="../date.format.js"></script>
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
	
	// update the screen with the object name:
	document.getElementById("object_name").value =  msg.get("object_name");
	document.getElementById("object_name").title =  msg.getId();
	var now = new Date();
	document.getElementById("folder_name").value =  msg.get("object_name") + "-" + now.format("yyyymmdd-hhMMss")
	}
	




/** console log wrapper */
function logit(s) {
	console.log("[ViewDoc Widget] " + s);
}

function runExport() {
	logit("runExport");
	
	var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            var data = xhr.responseText;
            alert(data);
        }
    }
    var r_object_id = document.getElementById("object_name").title;
    var folder_name = document.getElementById("folder_name").value;
    var url='exportVdoc?DOCBASE=' + DOCBASE + '&USER=' + USER + '&TICKET=' + TICKET + "&r_object_id=" + r_object_id + "&export_dir=" + folder_name;
    xhr.open('GET', url , true);
    xhr.send(null);
}

</script>
</head>
<body onload="loadEventHandler();">



<form style="width: 800px">
   <table>
     <tr><td>Top Document:</td><td><input type="text" id="object_name" name="object_name" disabled value="Select a Virtual Document" title="no object id" size="50"></td></tr>
     <tr><td>Exported Folder name</td><td> <input type="text" id="folder_name" name="folder_name" size="50"></td></tr>
   </table>
   
   
   <input type="button" value="Export" onClick="runExport()">
</form>


</body>
</html>