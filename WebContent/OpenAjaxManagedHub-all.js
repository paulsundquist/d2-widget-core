/*******************************************************************************
 *WARNING
 *
 *This is a manually concatenated files intended to be used only for dev purpose
 *
 *On production you shoud use the official obfuscated file
 *
 ******************************************************************************/

/*******************************************************************************
 * OpenAjax-mashup.js
 *
 * Reference implementation of the OpenAjax Hub, as specified by OpenAjax Alliance.
 * Specification is under development at: 
 *
 *   http://www.openajax.org/member/wiki/OpenAjax_Hub_Specification
 *
 * Copyright 2006-2009 OpenAjax Alliance
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not 
 * use this file except in compliance with the License. You may obtain a copy 
 * of the License at http://www.apache.org/licenses/LICENSE-2.0 . Unless 
 * required by applicable law or agreed to in writing, software distributed 
 * under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR 
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the 
 * specific language governing permissions and limitations under the License.
 *
 ******************************************************************************/

var OpenAjax = OpenAjax || {};

if ( !OpenAjax.hub ) {  // prevent re-definition of the OpenAjax.hub object

OpenAjax.hub = function() {
    var libs = {};
    var ooh = "org.openajax.hub.";

    return /** @scope OpenAjax.hub */ {
        implementer: "http://openajax.org",
        implVersion: "2.0.7",
        specVersion: "2.0",
        implExtraData: {},
        libraries: libs,
    
        registerLibrary: function(prefix, nsURL, version, extra) {
            libs[prefix] = {
                prefix: prefix,
                namespaceURI: nsURL,
                version: version,
                extraData: extra 
            };
            this.publish(ooh+"registerLibrary", libs[prefix]);
        },
        
        unregisterLibrary: function(prefix) {
            this.publish(ooh+"unregisterLibrary", libs[prefix]);
            delete libs[prefix];
        }
    };
}();

/**
 * Error
 * 
 * Standard Error names used when the standard functions need to throw Errors.
 */
OpenAjax.hub.Error = {
    // Either a required argument is missing or an invalid argument was provided
    BadParameters: "OpenAjax.hub.Error.BadParameters",
    // The specified hub has been disconnected and cannot perform the requested
    // operation:
    Disconnected: "OpenAjax.hub.Error.Disconnected",
    // Container with specified ID already exists:
    Duplicate: "OpenAjax.hub.Error.Duplicate",
    // The specified ManagedHub has no such Container (or it has been removed)
    NoContainer: "OpenAjax.hub.Error.NoContainer",
    // The specified ManagedHub or Container has no such subscription
    NoSubscription: "OpenAjax.hub.Error.NoSubscription",
    // Permission denied by manager's security policy
    NotAllowed: "OpenAjax.hub.Error.NotAllowed",
    // Wrong communications protocol identifier provided by Container or HubClient
    WrongProtocol: "OpenAjax.hub.Error.WrongProtocol",
    // A 'tunnelURI' param was specified, but current browser does not support security features
    IncompatBrowser: "OpenAjax.hub.Error.IncompatBrowser"
};

/**
 * SecurityAlert
 * 
 * Standard codes used when attempted security violations are detected. Unlike
 * Errors, these codes are not thrown as exceptions but rather passed into the 
 * SecurityAlertHandler function registered with the Hub instance.
 */
OpenAjax.hub.SecurityAlert = {
    // Container did not load (possible frame phishing attack)
    LoadTimeout: "OpenAjax.hub.SecurityAlert.LoadTimeout",
    // Hub suspects a frame phishing attack against the specified container
    FramePhish: "OpenAjax.hub.SecurityAlert.FramePhish",
    // Hub detected a message forgery that purports to come to a specified
    // container
    ForgedMsg: "OpenAjax.hub.SecurityAlert.ForgedMsg"
};

/**
 * Debugging Help
 *
 * OpenAjax.hub.enableDebug
 *
 *      If OpenAjax.hub.enableDebug is set to true, then the "debugger" keyword
 *      will get hit whenever a user callback throws an exception, thereby
 *      bringing up the JavaScript debugger.
 */
OpenAjax.hub._debugger = function() {
    if ( OpenAjax.hub.enableDebug ) debugger; // REMOVE ON BUILD
}

////////////////////////////////////////////////////////////////////////////////

/**
 * Hub interface
 * 
 * Hub is implemented on the manager side by ManagedHub and on the client side
 * by ClientHub.
 */
//OpenAjax.hub.Hub = function() {}

/**
 * Subscribe to a topic.
 *
 * @param {String} topic
 *     A valid topic string. MAY include wildcards.
 * @param {Function} onData   
 *     Callback function that is invoked whenever an event is 
 *     published on the topic
 * @param {Object} [scope]
 *     When onData callback or onComplete callback is invoked,
 *     the JavaScript "this" keyword refers to this scope object.
 *     If no scope is provided, default is window.
 * @param {Function} [onComplete]
 *     Invoked to tell the client application whether the 
 *     subscribe operation succeeded or failed. 
 * @param {*} [subscriberData]
 *     Client application provides this data, which is handed
 *     back to the client application in the subscriberData
 *     parameter of the onData callback function.
 * 
 * @returns subscriptionID
 *     Identifier representing the subscription. This identifier is an 
 *     arbitrary ID string that is unique within this Hub instance
 * @type {String}
 * 
 * @throws {OpenAjax.hub.Error.Disconnected} if this Hub instance is not in CONNECTED state
 * @throws {OpenAjax.hub.Error.BadParameters} if the topic is invalid (e.g. contains an empty token)
 */
//OpenAjax.hub.Hub.prototype.subscribe = function( topic, onData, scope, onComplete, subscriberData ) {}

/**
 * Publish an event on a topic
 *
 * @param {String} topic
 *     A valid topic string. MUST NOT include wildcards.
 * @param {*} data
 *     Valid publishable data. To be portable across different
 *     Container implementations, this value SHOULD be serializable
 *     as JSON.
 *     
 * @throws {OpenAjax.hub.Error.Disconnected} if this Hub instance is not in CONNECTED state
 * @throws {OpenAjax.hub.Error.BadParameters} if the topic cannot be published (e.g. contains 
 *     wildcards or empty tokens) or if the data cannot be published (e.g. cannot be serialized as JSON)
 */
//OpenAjax.hub.Hub.prototype.publish = function( topic, data ) {}

/**
 * Unsubscribe from a subscription
 *
 * @param {String} subscriptionID
 *     A subscriptionID returned by Hub.subscribe()
 * @param {Function} [onComplete]
 *     Callback function invoked when unsubscribe completes
 * @param {Object} [scope]
 *     When onComplete callback function is invoked, the JavaScript "this"
 *     keyword refers to this scope object.
 *     If no scope is provided, default is window.
 *     
 * @throws {OpenAjax.hub.Error.Disconnected} if this Hub instance is not in CONNECTED state
 * @throws {OpenAjax.hub.Error.NoSubscription} if no such subscription is found
 */
//OpenAjax.hub.Hub.prototype.unsubscribe = function( subscriptionID, onComplete, scope ) {}

/**
 * Return true if this Hub instance is in the Connected state.
 * Else returns false.
 * 
 * This function can be called even if the Hub is not in a CONNECTED state.
 * 
 * @returns Boolean
 * @type {Boolean}
 */
//OpenAjax.hub.Hub.prototype.isConnected = function() {}

/**
 * Returns the scope associated with this Hub instance and which will be used
 * with callback functions.
 * 
 * This function can be called even if the Hub is not in a CONNECTED state.
 * 
 * @returns scope object
 * @type {Object}
 */
//OpenAjax.hub.Hub.prototype.getScope = function() {}

/**
 * Returns the subscriberData parameter that was provided when 
 * Hub.subscribe was called.
 *
 * @param {String} subscriptionID
 *     The subscriberID of a subscription
 * 
 * @returns subscriberData
 * @type {*}
 * 
 * @throws {OpenAjax.hub.Error.Disconnected} if this Hub instance is not in CONNECTED state
 * @throws {OpenAjax.hub.Error.NoSubscription} if there is no such subscription
 */
//OpenAjax.hub.Hub.prototype.getSubscriberData = function(subscriptionID) {}

/**
 * Returns the scope associated with a specified subscription.  This scope will
 * be used when invoking the 'onData' callback supplied to Hub.subscribe().
 *
 * @param {String} subscriberID
 *     The subscriberID of a subscription
 * 
 * @returns scope
 * @type {*}
 * 
 * @throws {OpenAjax.hub.Error.Disconnected} if this Hub instance is not in CONNECTED state
 * @throws {OpenAjax.hub.Error.NoSubscription} if there is no such subscription
 */
//OpenAjax.hub.Hub.prototype.getSubscriberScope = function(subscriberID) {}

/**
 * Returns the params object associated with this Hub instance.
 *
 * @returns params
 *     The params object associated with this Hub instance
 * @type {Object}
 */
//OpenAjax.hub.Hub.prototype.getParameters = function() {}

////////////////////////////////////////////////////////////////////////////////

/**
 * HubClient interface 
 * 
 * Extends Hub interface.
 * 
 * A HubClient implementation is typically specific to a particular 
 * implementation of Container.
 */

/**
 * Create a new HubClient. All HubClient constructors MUST have this 
 * signature.
 * @constructor
 * 
 * @param {Object} params 
 *    Parameters used to instantiate the HubClient.
 *    Once the constructor is called, the params object belongs to the
 *    HubClient. The caller MUST not modify it.
 *    Implementations of HubClient may specify additional properties
 *    for the params object, besides those identified below. 
 * 
 * @param {Function} params.HubClient.onSecurityAlert
 *     Called when an attempted security breach is thwarted
 * @param {Object} [params.HubClient.scope]
 *     Whenever one of the HubClient's callback functions is called,
 *     references to "this" in the callback will refer to the scope object.
 *     If not provided, the default is window.
 * @param {Function} [params.HubClient.log]
 *     Optional logger function. Would be used to log to console.log or
 *     equivalent. 
 *     
 * @throws {OpenAjax.hub.Error.BadParameters} if any of the required
 *     parameters is missing, or if a parameter value is invalid in 
 *     some way.
 */
//OpenAjax.hub.HubClient = function( params ) {}

/**
 * Requests a connection to the ManagedHub, via the Container
 * associated with this HubClient.
 * 
 * If the Container accepts the connection request, the HubClient's 
 * state is set to CONNECTED and the HubClient invokes the 
 * onComplete callback function.
 * 
 * If the Container refuses the connection request, the HubClient
 * invokes the onComplete callback function with an error code. 
 * The error code might, for example, indicate that the Container 
 * is being destroyed.
 * 
 * In most implementations, this function operates asynchronously, 
 * so the onComplete callback function is the only reliable way to
 * determine when this function completes and whether it has succeeded
 * or failed.
 * 
 * A client application may call HubClient.disconnect and then call
 * HubClient.connect.
 * 
 * @param {Function} [onComplete]
 *     Callback function to call when this operation completes.
 * @param {Object} [scope]  
 *     When the onComplete function is invoked, the JavaScript "this"
 *     keyword refers to this scope object.
 *     If no scope is provided, default is window.
 *
 * @throws {OpenAjax.hub.Error.Duplicate} if the HubClient is already connected
 */
//OpenAjax.hub.HubClient.prototype.connect = function( onComplete, scope ) {}

/**
 * Disconnect from the ManagedHub
 * 
 * Disconnect immediately:
 * 
 * 1. Sets the HubClient's state to DISCONNECTED.
 * 2. Causes the HubClient to send a Disconnect request to the 
 * 		associated Container. 
 * 3. Ensures that the client application will receive no more
 * 		onData or onComplete callbacks associated with this 
 * 		connection, except for the disconnect function's own
 * 		onComplete callback.
 * 4. Automatically destroys all of the HubClient's subscriptions.
 *
 * In most implementations, this function operates asynchronously, 
 * so the onComplete callback function is the only reliable way to
 * determine when this function completes and whether it has succeeded
 * or failed.
 * 
 * A client application is allowed to call HubClient.disconnect and 
 * then call HubClient.connect.
 * 	
 * @param {Function} [onComplete]
 *     Callback function to call when this operation completes.
 * @param {Object} [scope]  
 *     When the onComplete function is invoked, the JavaScript "this"
 *     keyword refers to the scope object.
 *     If no scope is provided, default is window.
 *
 * @throws {OpenAjax.hub.Error.Disconnected} if the HubClient is already
 *     disconnected
 */
//OpenAjax.hub.HubClient.prototype.disconnect = function( onComplete, scope ) {}

/**
 * If DISCONNECTED: Returns null
 * If CONNECTED: Returns the origin associated with the window containing the
 * Container associated with this HubClient instance. The origin has the format
 *  
 * [protocol]://[host]
 * 
 * where:
 * 
 * [protocol] is "http" or "https"
 * [host] is the hostname of the partner page.
 * 
 * @returns Partner's origin
 * @type {String}
 */
//OpenAjax.hub.HubClient.prototype.getPartnerOrigin = function() {}

/**
 * Returns the client ID of this HubClient
 *
 * @returns clientID
 * @type {String}
 */
//OpenAjax.hub.HubClient.prototype.getClientID = function() {}

////////////////////////////////////////////////////////////////////////////////

/**
 * OpenAjax.hub.ManagedHub
 *
 * Managed hub API for the manager application and for Containers. 
 * 
 * Implements OpenAjax.hub.Hub.
 */

/**
 * Create a new ManagedHub instance
 * @constructor
 *     
 * This constructor automatically sets the ManagedHub's state to
 * CONNECTED.
 * 
 * @param {Object} params
 *     Parameters used to instantiate the ManagedHub.
 *     Once the constructor is called, the params object belongs exclusively to
 *     the ManagedHub. The caller MUST not modify it.
 *     
 * The params object may contain the following properties:
 * 
 * @param {Function} params.onPublish
 *     Callback function that is invoked whenever a 
 *     data value published by a Container is about
 *     to be delivered to some (possibly the same) Container.
 *     This callback function implements a security policy;
 *     it returns true if the delivery of the data is
 *     permitted and false if permission is denied.
 * @param {Function} params.onSubscribe
 *     Called whenever a Container tries to subscribe
 *     on behalf of its client.
 *     This callback function implements a security policy;
 *     it returns true if the subscription is permitted 
 *     and false if permission is denied.
 * @param {Function} [params.onUnsubscribe]
 *     Called whenever a Container unsubscribes on behalf of its client. 
 *     Unlike the other callbacks, onUnsubscribe is intended only for 
 *     informative purposes, and is not used to implement a security
 *     policy.
 * @param {Object} [params.scope]
 *     Whenever one of the ManagedHub's callback functions is called,
 *     references to the JavaScript "this" keyword in the callback 
 *     function refer to this scope object
 *     If no scope is provided, default is window.
 * @param {Function} [params.log]  Optional logger function. Would
 *     be used to log to console.log or equivalent.
 * 
 * @throws {OpenAjax.hub.Error.BadParameters} if any of the required
 *     parameters are missing
 */
OpenAjax.hub.ManagedHub = function( params )
{
    if ( ! params || ! params.onPublish || ! params.onSubscribe )
        throw new Error( OpenAjax.hub.Error.BadParameters );
    
    this._p = params;
    this._onUnsubscribe = params.onUnsubscribe ? params.onUnsubscribe : null;
    this._scope = params.scope || window;

    if ( params.log ) {
        var that = this;
        this._log = function( msg ) {
            try {
                params.log.call( that._scope, "ManagedHub: " + msg );
            } catch( e ) {
                OpenAjax.hub._debugger();
            }
        };
    } else {
        this._log = function() {};
    }

    this._subscriptions = { c:{}, s:null };
    this._containers = {};

    // Sequence # used to create IDs that are unique within this hub
    this._seq = 0;

    this._active = true;
    
    this._isPublishing = false;
    this._pubQ = [];
}

/**
 * Subscribe to a topic on behalf of a Container. Called only by 
 * Container implementations, NOT by manager applications.
 * 
 * This function:
 * 1. Checks with the ManagedHub's onSubscribe security policy
 *    to determine whether this Container is allowed to subscribe 
 *    to this topic.
 * 2. If the subscribe operation is permitted, subscribes to the
 *    topic and returns the ManagedHub's subscription ID for this
 *    subscription. 
 * 3. If the subscribe operation is not permitted, throws
 *    OpenAjax.hub.Error.NotAllowed.
 * 
 * When data is published on the topic, the ManagedHub's 
 * onPublish security policy will be invoked to ensure that
 * this Container is permitted to receive the published data.
 * If the Container is allowed to receive the data, then the
 * Container's sendToClient function will be invoked.
 * 
 * When a Container needs to create a subscription on behalf of
 * its client, the Container MUST use this function to create
 * the subscription.
 * 
 * @param {OpenAjax.hub.Container} container  
 *     A Container
 * @param {String} topic 
 *     A valid topic
 * @param {String} containerSubID  
 *     Arbitrary string ID that the Container uses to 
 *     represent the subscription. Must be unique within the 
 *     context of the Container
 *
 * @returns managerSubID  
 *     Arbitrary string ID that this ManagedHub uses to 
 *     represent the subscription. Will be unique within the 
 *     context of this ManagedHub
 * @type {String}
 * 
 * @throws {OpenAjax.hub.Error.Disconnected} if this.isConnected() returns false
 * @throws {OpenAjax.hub.Error.NotAllowed} if subscription request is denied by the onSubscribe security policy
 * @throws {OpenAjax.hub.Error.BadParameters} if one of the parameters, e.g. the topic, is invalid
 */
OpenAjax.hub.ManagedHub.prototype.subscribeForClient = function( container, topic, containerSubID )
{
    this._assertConn();
    // check subscribe permission
    if ( this._invokeOnSubscribe( topic, container ) ) {
        // return ManagedHub's subscriptionID for this subscription
        return this._subscribe( topic, this._sendToClient, this, { c: container, sid: containerSubID } );
    }
    throw new Error(OpenAjax.hub.Error.NotAllowed);
}

/**
 * Unsubscribe from a subscription on behalf of a Container. Called only by 
 * Container implementations, NOT by manager application code.
 * 
 * This function:
 * 1. Destroys the specified subscription
 * 2. Calls the ManagedHub's onUnsubscribe callback function
 * 
 * This function can be called even if the ManagedHub is not in a CONNECTED state.
 * 
 * @param {OpenAjax.hub.Container} container  
 *    container instance that is unsubscribing
 * @param {String} managerSubID  
 *    opaque ID of a subscription, returned by previous call to subscribeForClient()
 * 
 * @throws {OpenAjax.hub.Error.NoSubscription} if subscriptionID does not refer to a valid subscription
 */
OpenAjax.hub.ManagedHub.prototype.unsubscribeForClient = function( container, managerSubID )
{
    this._unsubscribe( managerSubID );
    this._invokeOnUnsubscribe( container, managerSubID );
}
  
/**
 * Publish data on a topic on behalf of a Container. Called only by 
 * Container implementations, NOT by manager application code.
 *
 * @param {OpenAjax.hub.Container} container
 *      Container on whose behalf data should be published
 * @param {String} topic
 *      Valid topic string. Must NOT contain wildcards.
 * @param {*} data
 *      Valid publishable data. To be portable across different
 *      Container implementations, this value SHOULD be serializable
 *      as JSON.
 * 
 * @throws {OpenAjax.hub.Error.Disconnected} if this.isConnected() returns false
 * @throws {OpenAjax.hub.Error.BadParameters} if one of the parameters, e.g. the topic, is invalid
 */
OpenAjax.hub.ManagedHub.prototype.publishForClient = function( container, topic, data )
{
    this._assertConn();
    this._publish( topic, data, container );
}

/**
 * Destroy this ManagedHub
 * 
 * 1. Sets state to DISCONNECTED. All subsequent attempts to add containers,
 *  publish or subscribe will throw the Disconnected error. We will
 *  continue to allow "cleanup" operations such as removeContainer
 *  and unsubscribe, as well as read-only operations such as 
 *  isConnected
 * 2. Remove all Containers associated with this ManagedHub
 */
OpenAjax.hub.ManagedHub.prototype.disconnect = function()
{
    this._active = false;
    for (var c in this._containers) {
        this.removeContainer( this._containers[c] );
    }
}

/**
 * Get a container belonging to this ManagedHub by its clientID, or null
 * if this ManagedHub has no such container
 * 
 * This function can be called even if the ManagedHub is not in a CONNECTED state.
 * 
 * @param {String} containerId
 *      Arbitrary string ID associated with the container
 *
 * @returns container associated with given ID
 * @type {OpenAjax.hub.Container}
 */
OpenAjax.hub.ManagedHub.prototype.getContainer = function( containerId ) 
{
    var container = this._containers[containerId];
    return container ? container : null;
}

/**
 * Returns an array listing all containers belonging to this ManagedHub.
 * The order of the Containers in this array is arbitrary.
 * 
 * This function can be called even if the ManagedHub is not in a CONNECTED state.
 * 
 * @returns container array
 * @type {OpenAjax.hub.Container[]}
 */
OpenAjax.hub.ManagedHub.prototype.listContainers = function() 
{
    var res = [];
    for (var c in this._containers) { 
        res.push(this._containers[c]);
    }
    return res;
}

/**
 * Add a container to this ManagedHub.
 *
 * This function should only be called by a Container constructor.
 * 
 * @param {OpenAjax.hub.Container} container
 *      A Container to be added to this ManagedHub
 * 
 * @throws {OpenAjax.hub.Error.Duplicate} if there is already a Container
 *      in this ManagedHub whose clientId is the same as that of container
 * @throws {OpenAjax.hub.Error.Disconnected} if this.isConnected() returns false
 */
OpenAjax.hub.ManagedHub.prototype.addContainer = function( container ) 
{ 
    this._assertConn();
    var containerId = container.getClientID();
    if ( this._containers[containerId] ) {
        throw new Error(OpenAjax.hub.Error.Duplicate);
    }
    this._containers[containerId] = container;
}

/**
 * Remove a container from this ManagedHub immediately
 * 
 * This function can be called even if the ManagedHub is not in a CONNECTED state.
 * 
 * @param {OpenAjax.hub.Container} container  
 *      A Container to be removed from this ManagedHub
 *  
 * @throws {OpenAjax.hub.Error.NoContainer}  if no such container is found
 */
OpenAjax.hub.ManagedHub.prototype.removeContainer = function( container )
{
    var containerId = container.getClientID();
    if ( ! this._containers[ containerId ] ) {
        throw new Error(OpenAjax.hub.Error.NoContainer);
    }
    container.remove();
    delete this._containers[ containerId ];
}

    /*** OpenAjax.hub.Hub interface implementation ***/

/**
 * Subscribe to a topic.
 * 
 * This implementation of Hub.subscribe is synchronous. When subscribe 
 * is called:
 * 
 * 1. The ManagedHub's onSubscribe callback is invoked. The 
 * 		container parameter is null, because the manager application, 
 * 		rather than a container, is subscribing.
 * 2. If onSubscribe returns true, then the subscription is created.
 * 3. The onComplete callback is invoked.
 * 4. Then this function returns.
 * 
 * @param {String} topic
 *     A valid topic string. MAY include wildcards.
 * @param {Function} onData   
 *     Callback function that is invoked whenever an event is 
 *     published on the topic
 * @param {Object} [scope]
 *     When onData callback or onComplete callback is invoked,
 *     the JavaScript "this" keyword refers to this scope object.
 *     If no scope is provided, default is window.
 * @param {Function} [onComplete]
 *     Invoked to tell the client application whether the 
 *     subscribe operation succeeded or failed. 
 * @param {*} [subscriberData]
 *     Client application provides this data, which is handed
 *     back to the client application in the subscriberData
 *     parameter of the onData and onComplete callback functions.
 * 
 * @returns subscriptionID
 *     Identifier representing the subscription. This identifier is an 
 *     arbitrary ID string that is unique within this Hub instance
 * @type {String}
 * 
 * @throws {OpenAjax.hub.Error.Disconnected} if this Hub instance is not in CONNECTED state
 * @throws {OpenAjax.hub.Error.BadParameters} if the topic is invalid (e.g. contains an empty token)
 */
OpenAjax.hub.ManagedHub.prototype.subscribe = function( topic, onData, scope, onComplete, subscriberData ) 
{
    this._assertConn();
    this._assertSubTopic(topic);
    if ( ! onData ) {
        throw new Error( OpenAjax.hub.Error.BadParameters );
    }
    
    scope = scope || window;
    
    // check subscribe permission
    if ( ! this._invokeOnSubscribe( topic, null ) ) {
        this._invokeOnComplete( onComplete, scope, null, false, OpenAjax.hub.Error.NotAllowed );
        return;
    }
    
    // on publish event, check publish permissions
    var that = this;
    function publishCB( topic, data, sd, pcont ) {
        if ( that._invokeOnPublish( topic, data, pcont, null ) ) {
            try {
                onData.call( scope, topic, data, subscriberData );
            } catch( e ) {
                OpenAjax.hub._debugger();
                that._log( "caught error from onData callback to Hub.subscribe(): " + e.message );
            }
        }
    }
    var subID = this._subscribe( topic, publishCB, scope, subscriberData );
    this._invokeOnComplete( onComplete, scope, subID, true );
    return subID;
}

/**
 * Publish an event on a topic
 *
 * This implementation of Hub.publish is synchronous. When publish 
 * is called:
 * 
 * 1. The target subscriptions are identified.
 * 2. For each target subscription, the ManagedHub's onPublish
 * 		callback is invoked. Data is only delivered to a target
 * 		subscription if the onPublish callback returns true.
 * 		The pcont parameter of the onPublish callback is null.
 *      This is because the ManagedHub, rather than a container,
 *      is publishing the data.
 * 
 * @param {String} topic
 *     A valid topic string. MUST NOT include wildcards.
 * @param {*} data
 *     Valid publishable data. To be portable across different
 *     Container implementations, this value SHOULD be serializable
 *     as JSON.
 *     
 * @throws {OpenAjax.hub.Error.Disconnected} if this Hub instance is not in CONNECTED state
 * @throws {OpenAjax.hub.Error.BadParameters} if the topic cannot be published (e.g. contains 
 *     wildcards or empty tokens) or if the data cannot be published (e.g. cannot be serialized as JSON)
 */
OpenAjax.hub.ManagedHub.prototype.publish = function( topic, data ) 
{
    this._assertConn();
    this._assertPubTopic(topic);
    this._publish( topic, data, null );
}

/**
 * Unsubscribe from a subscription
 * 
 * This implementation of Hub.unsubscribe is synchronous. When unsubscribe 
 * is called:
 * 
 * 1. The subscription is destroyed.
 * 2. The ManagedHub's onUnsubscribe callback is invoked, if there is one.
 * 3. The onComplete callback is invoked.
 * 4. Then this function returns.
 * 
 * @param {String} subscriptionID
 *     A subscriptionID returned by Hub.subscribe()
 * @param {Function} [onComplete]
 *     Callback function invoked when unsubscribe completes
 * @param {Object} [scope]
 *     When onComplete callback function is invoked, the JavaScript "this"
 *     keyword refers to this scope object.
 *     If no scope is provided, default is window.
 *     
 * @throws {OpenAjax.hub.Error.Disconnected} if this Hub instance is not in CONNECTED state
 * @throws {OpenAjax.hub.Error.NoSubscription} if no such subscription is found
 */
OpenAjax.hub.ManagedHub.prototype.unsubscribe = function( subscriptionID, onComplete, scope )
{
    this._assertConn();
    if ( ! subscriptionID ) {
        throw new Error( OpenAjax.hub.Error.BadParameters );
    }
    this._unsubscribe( subscriptionID );
    this._invokeOnUnsubscribe( null, subscriptionID );
    this._invokeOnComplete( onComplete, scope, subscriptionID, true );
}

/**
 * Returns true if disconnect() has NOT been called on this ManagedHub, 
 * else returns false
 * 
 * @returns Boolean
 * @type {Boolean}
 */
OpenAjax.hub.ManagedHub.prototype.isConnected = function()
{
    return this._active;
}

/**
* Returns the scope associated with this Hub instance and which will be used
* with callback functions.
* 
* This function can be called even if the Hub is not in a CONNECTED state.
* 
* @returns scope object
* @type {Object}
 */
OpenAjax.hub.ManagedHub.prototype.getScope = function()
{
    return this._scope;
}

/**
 * Returns the subscriberData parameter that was provided when 
 * Hub.subscribe was called.
 *
 * @param subscriberID
 *     The subscriberID of a subscription
 * 
 * @returns subscriberData
 * @type {*}
 * 
 * @throws {OpenAjax.hub.Error.Disconnected} if this Hub instance is not in CONNECTED state
 * @throws {OpenAjax.hub.Error.NoSubscription} if there is no such subscription
 */
OpenAjax.hub.ManagedHub.prototype.getSubscriberData = function( subscriberID )
{
    this._assertConn();
    var path = subscriberID.split(".");
    var sid = path.pop();
    var sub = this._getSubscriptionObject( this._subscriptions, path, 0, sid );
    if ( sub ) 
        return sub.data;
    throw new Error( OpenAjax.hub.Error.NoSubscription );
}

/**
 * Returns the scope associated with a specified subscription.  This scope will
 * be used when invoking the 'onData' callback supplied to Hub.subscribe().
 *
 * @param subscriberID
 *     The subscriberID of a subscription
 * 
 * @returns scope
 * @type {*}
 * 
 * @throws {OpenAjax.hub.Error.Disconnected} if this Hub instance is not in CONNECTED state
 * @throws {OpenAjax.hub.Error.NoSubscription} if there is no such subscription
 */
OpenAjax.hub.ManagedHub.prototype.getSubscriberScope = function( subscriberID )
{
    this._assertConn();
    var path = subscriberID.split(".");
    var sid = path.pop();
    var sub = this._getSubscriptionObject( this._subscriptions, path, 0, sid );
    if ( sub ) 
        return sub.scope;
    throw new Error( OpenAjax.hub.Error.NoSubscription );
}

/**
 * Returns the params object associated with this Hub instance.
 * Allows mix-in code to access parameters passed into constructor that created
 * this Hub instance.
 *
 * @returns params  the params object associated with this Hub instance
 * @type {Object}
 */
OpenAjax.hub.ManagedHub.prototype.getParameters = function()
{
    return this._p;
}


/* PRIVATE FUNCTIONS */

/**
 * Send a message to a container's client. 
 * This is an OAH subscriber's data callback. It is private to ManagedHub
 * and serves as an adapter between the OAH 1.0 API and Container.sendToClient.
 * 
 * @param {String} topic Topic on which data was published
 * @param {Object} data  Data to be delivered to the client
 * @param {Object} sd    Object containing properties 
 *     c: container to which data must be sent
 *     sid: subscription ID within that container
 * @param {Object} pcont  Publishing container, or null if this data was
 *      published by the manager
 */
OpenAjax.hub.ManagedHub.prototype._sendToClient = function(topic, data, sd, pcont) 
{
    if (!this.isConnected()) {
        return;
    }
    if ( this._invokeOnPublish( topic, data, pcont, sd.c ) ) {
        sd.c.sendToClient( topic, data, sd.sid );
    }
}

OpenAjax.hub.ManagedHub.prototype._assertConn = function() 
{
    if (!this.isConnected()) {
        throw new Error(OpenAjax.hub.Error.Disconnected);
    }
}

OpenAjax.hub.ManagedHub.prototype._assertPubTopic = function(topic) 
{
    if ( !topic || topic === "" || (topic.indexOf("*") != -1) ||
        (topic.indexOf("..") != -1) ||  (topic.charAt(0) == ".") ||
        (topic.charAt(topic.length-1) == "."))
    {
        throw new Error(OpenAjax.hub.Error.BadParameters);
    }
}

OpenAjax.hub.ManagedHub.prototype._assertSubTopic = function(topic) 
{
    if ( ! topic ) {
        throw new Error(OpenAjax.hub.Error.BadParameters);
    }
    var path = topic.split(".");
    var len = path.length;
    for (var i = 0; i < len; i++) {
        var p = path[i];
        if ((p === "") ||
           ((p.indexOf("*") != -1) && (p != "*") && (p != "**"))) {
            throw new Error(OpenAjax.hub.Error.BadParameters);
        }
        if ((p == "**") && (i < len - 1)) {
            throw new Error(OpenAjax.hub.Error.BadParameters);
        }
    }
}

OpenAjax.hub.ManagedHub.prototype._invokeOnComplete = function( func, scope, item, success, errorCode )
{
    if ( func ) { // onComplete is optional
        try {
            scope = scope || window;
            func.call( scope, item, success, errorCode );
        } catch( e ) {
            OpenAjax.hub._debugger();
            this._log( "caught error from onComplete callback: " + e.message );
        }
    }
}

OpenAjax.hub.ManagedHub.prototype._invokeOnPublish = function( topic, data, pcont, scont )
{
    try {
        return this._p.onPublish.call( this._scope, topic, data, pcont, scont );
    } catch( e ) {
        OpenAjax.hub._debugger();
        this._log( "caught error from onPublish callback to constructor: " + e.message );
    }
    return false;
}

OpenAjax.hub.ManagedHub.prototype._invokeOnSubscribe = function( topic, container )
{
    try {
        return this._p.onSubscribe.call( this._scope, topic, container );
    } catch( e ) {
        OpenAjax.hub._debugger();
        this._log( "caught error from onSubscribe callback to constructor: " + e.message );
    }
    return false;
}

OpenAjax.hub.ManagedHub.prototype._invokeOnUnsubscribe = function( container, managerSubID )
{
    if ( this._onUnsubscribe ) {
        var topic = managerSubID.slice( 0, managerSubID.lastIndexOf(".") );
        try {
            this._onUnsubscribe.call( this._scope, topic, container );
        } catch( e ) {
            OpenAjax.hub._debugger();
            this._log( "caught error from onUnsubscribe callback to constructor: " + e.message );
        }
    }
}

OpenAjax.hub.ManagedHub.prototype._subscribe = function( topic, onData, scope, subscriberData ) 
{
    var handle = topic + "." + this._seq;
    var sub = { scope: scope, cb: onData, data: subscriberData, sid: this._seq++ };
    var path = topic.split(".");
    this._recursiveSubscribe( this._subscriptions, path, 0, sub );
    return handle;
}

OpenAjax.hub.ManagedHub.prototype._recursiveSubscribe = function(tree, path, index, sub) 
{
    var token = path[index];
    if (index == path.length) {
        sub.next = tree.s;
        tree.s = sub;
    } else { 
        if (typeof tree.c == "undefined") {
             tree.c = {};
         }
        if (typeof tree.c[token] == "undefined") {
            tree.c[token] = { c: {}, s: null }; 
            this._recursiveSubscribe(tree.c[token], path, index + 1, sub);
        } else {
            this._recursiveSubscribe( tree.c[token], path, index + 1, sub);
        }
    }
}

OpenAjax.hub.ManagedHub.prototype._publish = function( topic, data, pcont )
{
    // if we are currently handling a publish event, then queue this request
    // and handle later, one by one
    if ( this._isPublishing ) {
        this._pubQ.push( { t: topic, d: data, p: pcont } );
        return;
    }
    
    this._safePublish( topic, data, pcont );
    
    while ( this._pubQ.length > 0 ) {
        var pub = this._pubQ.shift();
        this._safePublish( pub.t, pub.d, pub.p );
    }
}

OpenAjax.hub.ManagedHub.prototype._safePublish = function( topic, data, pcont )
{
    this._isPublishing = true;
    var path = topic.split(".");
    this._recursivePublish( this._subscriptions, path, 0, topic, data, pcont );
    this._isPublishing = false;
}

OpenAjax.hub.ManagedHub.prototype._recursivePublish = function(tree, path, index, name, msg, pcont) 
{
    if (typeof tree != "undefined") {
        var node;
        if (index == path.length) {
            node = tree;
        } else {
            this._recursivePublish(tree.c[path[index]], path, index + 1, name, msg, pcont);
            this._recursivePublish(tree.c["*"], path, index + 1, name, msg, pcont);
            node = tree.c["**"];
        }
        if (typeof node != "undefined") {
            var sub = node.s;
            while ( sub ) {
                var sc = sub.scope;
                var cb = sub.cb;
                var d = sub.data;
                if (typeof cb == "string") {
                    // get a function object
                    cb = sc[cb];
                }
                cb.call(sc, name, msg, d, pcont);
                sub = sub.next;
            }
        }
    }
}

OpenAjax.hub.ManagedHub.prototype._unsubscribe = function( subscriptionID )
{
    var path = subscriptionID.split(".");
    var sid = path.pop();
    if ( ! this._recursiveUnsubscribe( this._subscriptions, path, 0, sid ) ) {
        throw new Error( OpenAjax.hub.Error.NoSubscription );
    }
}

/**
 * @returns 'true' if properly unsubscribed; 'false' otherwise
 */
OpenAjax.hub.ManagedHub.prototype._recursiveUnsubscribe = function(tree, path, index, sid) 
{
    if ( typeof tree == "undefined" ) {
        return false;
    }
    
    if (index < path.length) {
        var childNode = tree.c[path[index]];
        if ( ! childNode ) {
            return false;
        }
        this._recursiveUnsubscribe(childNode, path, index + 1, sid);
        if ( ! childNode.s ) {
            for (var x in childNode.c) {
                return true;
            }
            delete tree.c[path[index]];    
        }
    } else {
        var sub = tree.s;
        var sub_prev = null;
        var found = false;
        while ( sub ) {
            if ( sid == sub.sid ) {
                found = true;
                if ( sub == tree.s ) {
                    tree.s = sub.next;
                } else {
                    sub_prev.next = sub.next;
                }
                break;
            }
            sub_prev = sub;
            sub = sub.next;
        }
        if ( ! found ) {
            return false;
        }
    }
    
    return true;
}

OpenAjax.hub.ManagedHub.prototype._getSubscriptionObject = function( tree, path, index, sid )
{
    if (typeof tree != "undefined") {
        if (index < path.length) {
            var childNode = tree.c[path[index]];
            return this._getSubscriptionObject(childNode, path, index + 1, sid);
        }

        var sub = tree.s;
        while ( sub ) {
            if ( sid == sub.sid ) {
                return sub;
            }
            sub = sub.next;
        }
    }
    return null;
}


////////////////////////////////////////////////////////////////////////////////

/**
 * Container
 * @constructor
 * 
 * Container represents an instance of a manager-side object that contains and
 * communicates with a single client of the hub. The container might be an inline
 * container, an iframe FIM container, or an iframe PostMessage container, or
 * it might be an instance of some other implementation.
 *
 * @param {OpenAjax.hub.ManagedHub} hub
 *    Managed Hub instance
 * @param {String} clientID
 *    A string ID that identifies a particular client of a Managed Hub. Unique
 *    within the context of the ManagedHub.
 * @param {Object} params  
 *    Parameters used to instantiate the Container.
 *    Once the constructor is called, the params object belongs exclusively to
 *    the Container. The caller MUST not modify it.
 *    Implementations of Container may specify additional properties
 *    for the params object, besides those identified below.
 *    The following params properties MUST be supported by all Container 
 *    implementations:
 * @param {Function} params.Container.onSecurityAlert
 *    Called when an attempted security breach is thwarted.  Function is defined
 *    as follows:  function(container, securityAlert)
 * @param {Function} [params.Container.onConnect]
 *    Called when the client connects to the Managed Hub.  Function is defined
 *    as follows:  function(container)
 * @param {Function} [params.Container.onDisconnect]
 *    Called when the client disconnects from the Managed Hub.  Function is
 *    defined as follows:  function(container)
 * @param {Object} [params.Container.scope]
 *    Whenever one of the Container's callback functions is called, references
 *    to "this" in the callback will refer to the scope object. If no scope is
 *    provided, default is window.
 * @param {Function} [params.Container.log]
 *    Optional logger function. Would be used to log to console.log or
 *    equivalent. 
 *
 * @throws {OpenAjax.hub.Error.BadParameters}   if required params are not
 *   present or null
 * @throws {OpenAjax.hub.Error.Duplicate}   if a Container with this clientID
 *   already exists in the given Managed Hub
 * @throws {OpenAjax.hub.Error.Disconnected}   if ManagedHub is not connected
 */
//OpenAjax.hub.Container = function( hub, clientID, params ) {}

/**
 * Send a message to the client inside this container. This function MUST only
 * be called by ManagedHub. 
 * 
 * @param {String} topic
 *    The topic name for the published message
 * @param {*} data
 *    The payload. Can be any JSON-serializable value.
 * @param {String} containerSubscriptionId
 *    Container's ID for a subscription, from previous call to
 *    subscribeForClient()
 */
//OpenAjax.hub.Container.prototype.sendToClient = function( topic, data, containerSubscriptionId ) {}

/**
 * Shut down a container. remove does all of the following:
 * - disconnects container from HubClient
 * - unsubscribes from all of its existing subscriptions in the ManagedHub
 * 
 * This function is only called by ManagedHub.removeContainer
 * Calling this function does NOT cause the container's onDisconnect callback to
 * be invoked.
 */
//OpenAjax.hub.Container.prototype.remove = function() {}

/**
 * Returns true if the given client is connected to the managed hub.
 * Else returns false.
 *
 * @returns true if the client is connected to the managed hub
 * @type boolean
 */
//OpenAjax.hub.Container.prototype.isConnected = function() {}

/**
 * Returns the clientID passed in when this Container was instantiated.
 *
 * @returns The clientID
 * @type {String}  
 */
//OpenAjax.hub.Container.prototype.getClientID = function() {}

/**
 * If DISCONNECTED:
 * Returns null
 * If CONNECTED:
 * Returns the origin associated with the window containing the HubClient
 * associated with this Container instance. The origin has the format
 *  
 * [protocol]://[host]
 * 
 * where:
 * 
 * [protocol] is "http" or "https"
 * [host] is the hostname of the partner page.
 * 
 * @returns Partner's origin
 * @type {String}
 */
//OpenAjax.hub.Container.prototype.getPartnerOrigin = function() {}

/**
 * Returns the params object associated with this Container instance.
 *
 * @returns params
 *    The params object associated with this Container instance
 * @type {Object}
 */
//OpenAjax.hub.Container.prototype.getParameters = function() {}

/**
 * Returns the ManagedHub to which this Container belongs.
 *
 * @returns ManagedHub
 *         The ManagedHub object associated with this Container instance
 * @type {OpenAjax.hub.ManagedHub}
 */
//OpenAjax.hub.Container.prototype.getHub = function() {}

////////////////////////////////////////////////////////////////////////////////

/*
 * Unmanaged Hub
 */

/**
 * OpenAjax.hub._hub is the default ManagedHub instance that we use to 
 * provide OAH 1.0 behavior. 
 */
OpenAjax.hub._hub = new OpenAjax.hub.ManagedHub({ 
    onSubscribe: function(topic, ctnr) { return true; },
    onPublish: function(topic, data, pcont, scont) { return true; }
});

/**
 * Subscribe to a topic.
 *
 * @param {String} topic
 *     A valid topic string. MAY include wildcards.
 * @param {Function|String} onData
 *     Callback function that is invoked whenever an event is published on the
 *     topic.  If 'onData' is a string, then it represents the name of a
 *     function on the 'scope' object.
 * @param {Object} [scope]
 *     When onData callback is invoked,
 *     the JavaScript "this" keyword refers to this scope object.
 *     If no scope is provided, default is window.
 * @param {*} [subscriberData]
 *     Client application provides this data, which is handed
 *     back to the client application in the subscriberData
 *     parameter of the onData callback function.
 * 
 * @returns {String} Identifier representing the subscription.
 * 
 * @throws {OpenAjax.hub.Error.BadParameters} if the topic is invalid
 *     (e.g.contains an empty token)
 */
OpenAjax.hub.subscribe = function(topic, onData, scope, subscriberData) 
{
    // resolve the 'onData' function if it is a string
    if ( typeof onData === "string" ) {
        scope = scope || window;
        onData = scope[ onData ] || null;
    }
    
    return OpenAjax.hub._hub.subscribe( topic, onData, scope, null, subscriberData );
}

/**
 * Unsubscribe from a subscription.
 *
 * @param {String} subscriptionID
 *     Subscription identifier returned by subscribe()
 *     
 * @throws {OpenAjax.hub.Error.NoSubscription} if no such subscription is found
 */
OpenAjax.hub.unsubscribe = function(subscriptionID) 
{
    return OpenAjax.hub._hub.unsubscribe( subscriptionID );
}

/**
 * Publish an event on a topic.
 *
 * @param {String} topic
 *     A valid topic string. MUST NOT include wildcards.
 * @param {*} data
 *     Valid publishable data.
 *     
 * @throws {OpenAjax.hub.Error.BadParameters} if the topic cannot be published
 *     (e.g. contains wildcards or empty tokens)
 */
OpenAjax.hub.publish = function(topic, data) 
{
    OpenAjax.hub._hub.publish(topic, data);
}

////////////////////////////////////////////////////////////////////////////////

// Register the OpenAjax Hub itself as a library.
OpenAjax.hub.registerLibrary("OpenAjax", "http://openajax.org/hub", "2.0", {});

} // !OpenAjax.hub


//////////////////////////////////////////////////////////////////
//  CONCAT : INLINE.JS
//////////////////////////////////////////////////////////////////

/*

        Copyright 2006-2009 OpenAjax Alliance

        Licensed under the Apache License, Version 2.0 (the "License"); 
        you may not use this file except in compliance with the License. 
        You may obtain a copy of the License at
        
                http://www.apache.org/licenses/LICENSE-2.0

        Unless required by applicable law or agreed to in writing, software 
        distributed under the License is distributed on an "AS IS" BASIS, 
        WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. 
        See the License for the specific language governing permissions and 
        limitations under the License.
*/

/**
 * Create a new Inline Container.
 * @constructor
 * @extends OpenAjax.hub.Container
 *
 * InlineContainer implements the Container interface to provide a container
 * that places components within the same browser frame as the main mashup
 * application. As such, this container does not isolate client components into
 * secure sandboxes.
 * 
 * @param {OpenAjax.hub.ManagedHub} hub
 *    Managed Hub instance to which this Container belongs
 * @param {String} clientID
 *    A string ID that identifies a particular client of a Managed Hub. Unique
 *    within the context of the ManagedHub.
 * @param {Object} params  
 *    Parameters used to instantiate the InlineContainer.
 *    Once the constructor is called, the params object belongs exclusively to
 *    the InlineContainer. The caller MUST not modify it.
 *    The following are the pre-defined properties on params:
 * @param {Function} params.Container.onSecurityAlert
 *    Called when an attempted security breach is thwarted.  Function is defined
 *    as follows:  function(container, securityAlert)
 * @param {Function} [params.Container.onConnect]
 *    Called when the client connects to the Managed Hub.  Function is defined
 *    as follows:  function(container)
 * @param {Function} [params.Container.onDisconnect]
 *    Called when the client disconnects from the Managed Hub.  Function is
 *    defined as follows:  function(container)
 * @param {Object} [params.Container.scope]
 *    Whenever one of the Container's callback functions is called, references
 *    to "this" in the callback will refer to the scope object. If no scope is
 *    provided, default is window.
 * @param {Function} [params.Container.log]
 *    Optional logger function. Would be used to log to console.log or
 *    equivalent. 
 *
 * @throws {OpenAjax.hub.Error.BadParameters}   if required params are not
 *    present or null
 * @throws {OpenAjax.hub.Error.Duplicate}   if a Container with this clientID
 *    already exists in the given Managed Hub
 * @throws {OpenAjax.hub.Error.Disconnected}   if ManagedHub is not connected
 */
OpenAjax.hub.InlineContainer = function( hub, clientID, params )
{
    if ( ! hub || ! clientID || ! params ||
            ! params.Container || ! params.Container.onSecurityAlert ) {
        throw new Error(OpenAjax.hub.Error.BadParameters);
    }
    
    var cbScope = params.Container.scope || window;
    var connected = false;
    var subs = [];
    var subIndex = 0;
    var client = null;
    
    if ( params.Container.log ) {
        var log = function( msg ) {
            try {
                params.Container.log.call( cbScope, "InlineContainer::" + clientID + ": " + msg );
            } catch( e ) {
                OpenAjax.hub._debugger();
            }
        };
    } else {
        log = function() {};
    }
    
    this._init = function() {
        hub.addContainer( this );
    };

  /*** OpenAjax.hub.Container interface implementation ***/
    
    this.getHub = function() {
    	return hub;
    };
    
    this.sendToClient = function( topic, data, subscriptionID ) {
        if ( connected ) {
            var sub = subs[ subscriptionID ];
            try {
                sub.cb.call( sub.sc, topic, data, sub.d );
            } catch( e ) {
                OpenAjax.hub._debugger();
                client._log( "caught error from onData callback to HubClient.subscribe(): " + e.message );
            }
        }
    };
    
    this.remove = function() {
        if ( connected ) {
            finishDisconnect();
        }
    };
    
    this.isConnected = function() {
        return connected;
    };
    
    this.getClientID = function() {
        return clientID;
    };
    
    this.getPartnerOrigin = function() {
        if ( connected ) {
            return window.location.protocol + "//" + window.location.hostname;
        }
        return null;
    };
    
    this.getParameters = function() {
        return params;
    };
    
  /*** OpenAjax.hub.HubClient interface implementation ***/
    
    this.connect = function( hubClient, onComplete, scope ) {
        if ( connected ) {
            throw new Error( OpenAjax.hub.Error.Duplicate );
        }
        
        connected = true;
        client = hubClient;
        
        if ( params.Container.onConnect ) {
            try {
                params.Container.onConnect.call( cbScope, this );
            } catch( e ) {
                OpenAjax.hub._debugger();
                log( "caught error from onConnect callback to constructor: " + e.message );
            }
        }
        
        invokeOnComplete( onComplete, scope, hubClient, true );
    };
    
    this.disconnect = function( hubClient, onComplete, scope ) {
        if ( ! connected ) {
            throw new Error( OpenAjax.hub.Error.Disconnected );
        }
        
        finishDisconnect();
    
        if ( params.Container.onDisconnect ) {
            try {
                params.Container.onDisconnect.call( cbScope, this );
            } catch( e ) {
                OpenAjax.hub._debugger();
                log( "caught error from onDisconnect callback to constructor: " + e.message );
            }
        }
        
        invokeOnComplete( onComplete, scope, hubClient, true );
    };
    
  /*** OpenAjax.hub.Hub interface implementation ***/
    
    this.subscribe = function( topic, onData, scope, onComplete, subscriberData ) {
        assertConn();
        assertSubTopic( topic );
        if ( ! onData ) {
            throw new Error( OpenAjax.hub.Error.BadParameters );
        }
        
        var subID = "" + subIndex++;
        var success = false;
        var msg = null;
        try {
            var handle = hub.subscribeForClient( this, topic, subID );
            success = true;
        } catch( e ) {
            // failure
            subID = null;
            msg = e.message;
        }
        
        scope = scope || window;
        if ( success ) {
            subs[ subID ] = { h: handle, cb: onData, sc: scope, d: subscriberData };
        }
        
        invokeOnComplete( onComplete, scope, subID, success, msg );
        return subID;
    };
    
    this.publish = function( topic, data ) {
        assertConn();
        assertPubTopic( topic );
        hub.publishForClient( this, topic, data );
    };
    
    this.unsubscribe = function( subscriptionID, onComplete, scope ) {
        assertConn();
        if ( typeof subscriptionID === "undefined" || subscriptionID === null ) {
            throw new Error( OpenAjax.hub.Error.BadParameters );
        }
        var sub = subs[ subscriptionID ];
        if ( ! sub ) { 
            throw new Error( OpenAjax.hub.Error.NoSubscription );
        }    
        hub.unsubscribeForClient( this, sub.h );
        delete subs[ subscriptionID ];
        
        invokeOnComplete( onComplete, scope, subscriptionID, true );
    };
    
    this.getSubscriberData = function( subID ) {
        assertConn();
        return getSubscription( subID ).d;
    };
    
    this.getSubscriberScope = function( subID ) {
        assertConn();
        return getSubscription( subID ).sc;
    };
    
  /*** PRIVATE FUNCTIONS ***/
    
    function invokeOnComplete( func, scope, item, success, errorCode ) {
        if ( func ) { // onComplete is optional
            try {
                scope = scope || window;
                func.call( scope, item, success, errorCode );
            } catch( e ) {
                OpenAjax.hub._debugger();
                // invokeOnComplete is only called for client interfaces (Hub and HubClient)
                client._log( "caught error from onComplete callback: " + e.message );
            }
        }
    }
    
    function finishDisconnect() {
        for ( var subID in subs ) {
            hub.unsubscribeForClient( this, subs[subID].h );
        }
        subs = [];
        subIndex = 0;
        connected = false;
    }
    
    function assertConn() {
        if ( ! connected ) {
            throw new Error( OpenAjax.hub.Error.Disconnected );
        }
    }
    
    function assertPubTopic( topic ) {
        if ((topic == null) || (topic === "") || (topic.indexOf("*") != -1) ||
            (topic.indexOf("..") != -1) ||  (topic.charAt(0) == ".") ||
            (topic.charAt(topic.length-1) == "."))
        {
            throw new Error(OpenAjax.hub.Error.BadParameters);
        }
    }
    
    function assertSubTopic( topic ) {
        if ( ! topic ) {
            throw new Error(OpenAjax.hub.Error.BadParameters);
        }
        var path = topic.split(".");
        var len = path.length;
        for (var i = 0; i < len; i++) {
            var p = path[i];
            if ((p === "") ||
               ((p.indexOf("*") != -1) && (p != "*") && (p != "**"))) {
                throw new Error(OpenAjax.hub.Error.BadParameters);
            }
            if ((p == "**") && (i < len - 1)) {
                throw new Error(OpenAjax.hub.Error.BadParameters);
            }
        }
    }
    
    function getSubscription( subID ) {
        var sub = subs[ subID ];
        if ( sub ) {
            return sub;
        }
        throw new Error( OpenAjax.hub.Error.NoSubscription );
    }
    
    
    this._init();
};

////////////////////////////////////////////////////////////////////////////////

/**
 * Create a new InlineHubClient.
 * @constructor
 * @extends OpenAjax.hub.HubClient
 * 
 * @param {Object} params 
 *    Parameters used to instantiate the HubClient.
 *    Once the constructor is called, the params object belongs to the
 *    HubClient. The caller MUST not modify it.
 *    The following are the pre-defined properties on params:
 * @param {Function} params.HubClient.onSecurityAlert
 *     Called when an attempted security breach is thwarted
 * @param {Object} [params.HubClient.scope]
 *     Whenever one of the HubClient's callback functions is called,
 *     references to "this" in the callback will refer to the scope object.
 *     If not provided, the default is window.
 * @param {Function} [params.HubClient.log]
 *     Optional logger function. Would be used to log to console.log or
 *     equivalent. 
 * @param {OpenAjax.hub.InlineContainer} params.InlineHubClient.container
 *     Specifies the InlineContainer to which this HubClient will connect
 *  
 * @throws {OpenAjax.hub.Error.BadParameters} if any of the required
 *     parameters are missing
 */
OpenAjax.hub.InlineHubClient = function( params )
{
    if ( ! params || ! params.HubClient || ! params.HubClient.onSecurityAlert ||
            ! params.InlineHubClient || ! params.InlineHubClient.container ) {
        throw new Error(OpenAjax.hub.Error.BadParameters);
    }
    
    var container = params.InlineHubClient.container;
    var scope = params.HubClient.scope || window;
    
    if ( params.HubClient.log ) {
        var log = function( msg ) {
            try {
                params.HubClient.log.call( scope, "InlineHubClient::" + container.getClientID() + ": " + msg );
            } catch( e ) {
                OpenAjax.hub._debugger();
            }
        };
    } else {
        log = function() {};
    }
    this._log = log;

  /*** OpenAjax.hub.HubClient interface implementation ***/
    
    /**
     * Requests a connection to the ManagedHub, via the InlineContainer
     * associated with this InlineHubClient.
     * 
     * If the Container accepts the connection request, this HubClient's 
     * state is set to CONNECTED and the HubClient invokes the 
     * onComplete callback function.
     * 
     * If the Container refuses the connection request, the HubClient
     * invokes the onComplete callback function with an error code. 
     * The error code might, for example, indicate that the Container 
     * is being destroyed.
     * 
     * If the HubClient is already connected, calling connect will cause
     * the HubClient to immediately invoke the onComplete callback with
     * the error code OpenAjax.hub.Error.Duplicate.
     * 
     * @param {Function} [onComplete]
     *     Callback function to call when this operation completes.
     * @param {Object} [scope]  
     *     When the onComplete function is invoked, the JavaScript "this"
     *     keyword refers to this scope object.
     *     If no scope is provided, default is window.
     *    
     * In this implementation of InlineHubClient, this function operates 
     * SYNCHRONOUSLY, so the onComplete callback function is invoked before 
     * this connect function returns. Developers are cautioned that in  
     * IframeHubClient implementations, this is not the case.
     * 
     * A client application may call InlineHubClient.disconnect and then call
     * InlineHubClient.connect to reconnect to the Managed Hub.
     */
    this.connect = function( onComplete, scope ) {
        container.connect( this, onComplete, scope );
    };
    
    /**
     * Disconnect from the ManagedHub
     * 
     * Disconnect immediately:
     * 
     * 1. Sets the HubClient's state to DISCONNECTED.
     * 2. Causes the HubClient to send a Disconnect request to the 
     * 		associated Container. 
     * 3. Ensures that the client application will receive no more
     * 		onData or onComplete callbacks associated with this 
     * 		connection, except for the disconnect function's own
     * 		onComplete callback.
     * 4. Automatically destroys all of the HubClient's subscriptions.
     * 	
     * @param {Function} [onComplete]
     *     Callback function to call when this operation completes.
     * @param {Object} [scope]  
     *     When the onComplete function is invoked, the JavaScript "this"
     *     keyword refers to the scope object.
     *     If no scope is provided, default is window.
     *    
     * In this implementation of InlineHubClient, the disconnect function operates 
     * SYNCHRONOUSLY, so the onComplete callback function is invoked before 
     * this function returns. Developers are cautioned that in IframeHubClient 
     * implementations, this is not the case.   
     * 
     * A client application is allowed to call HubClient.disconnect and 
     * then call HubClient.connect in order to reconnect.
     */
    this.disconnect = function( onComplete, scope ) {
        container.disconnect( this, onComplete, scope );
    };
    
    this.getPartnerOrigin = function() {
        return container.getPartnerOrigin();
    };
    
    this.getClientID = function() {
        return container.getClientID();
    };
    
  /*** OpenAjax.hub.Hub interface implementation ***/
    
    /**
     * Subscribe to a topic.
     *
     * @param {String} topic
     *     A valid topic string. MAY include wildcards.
     * @param {Function} onData   
     *     Callback function that is invoked whenever an event is 
     *     published on the topic
     * @param {Object} [scope]
     *     When onData callback or onComplete callback is invoked,
     *     the JavaScript "this" keyword refers to this scope object.
     *     If no scope is provided, default is window.
     * @param {Function} [onComplete]
     *     Invoked to tell the client application whether the 
     *     subscribe operation succeeded or failed. 
     * @param {*} [subscriberData]
     *     Client application provides this data, which is handed
     *     back to the client application in the subscriberData
     *     parameter of the onData and onComplete callback functions.
     * 
     * @returns subscriptionID
     *     Identifier representing the subscription. This identifier is an 
     *     arbitrary ID string that is unique within this Hub instance
     * @type {String}
     * 
     * @throws {OpenAjax.hub.Error.Disconnected} if this Hub instance is not in CONNECTED state
     * @throws {OpenAjax.hub.Error.BadParameters} if the topic is invalid (e.g. contains an empty token)
     *
     * In this implementation of InlineHubClient, the subscribe function operates 
     * Thus, onComplete is invoked before this function returns. Developers are 
     * cautioned that in most implementations of HubClient, onComplete is invoked 
     * after this function returns.
     * 
     * If unsubscribe is called before subscribe completes, the subscription is 
     * immediately terminated, and onComplete is never invoked.
     */
    this.subscribe = function( topic, onData, scope, onComplete, subscriberData ) {
        return container.subscribe( topic, onData, scope, onComplete, subscriberData );
    };
    
    /**
     * Publish an event on 'topic' with the given data.
     *
     * @param {String} topic
     *     A valid topic string. MUST NOT include wildcards.
     * @param {*} data
     *     Valid publishable data. To be portable across different
     *     Container implementations, this value SHOULD be serializable
     *     as JSON.
     *     
     * @throws {OpenAjax.hub.Error.Disconnected} if this Hub instance 
     *     is not in CONNECTED state
     * 
     * In this implementation, publish operates SYNCHRONOUSLY. 
     * Data will be delivered to subscribers after this function returns.
     * In most implementations, publish operates synchronously, 
     * delivering its data to the clients before this function returns.
     */
    this.publish = function( topic, data ) {
        container.publish( topic, data );
    };
    
    /**
     * Unsubscribe from a subscription
     *
     * @param {String} subscriptionID
     *     A subscriptionID returned by InlineHubClient.prototype.subscribe()
     * @param {Function} [onComplete]
     *     Callback function invoked when unsubscribe completes
     * @param {Object} [scope]
     *     When onComplete callback function is invoked, the JavaScript "this"
     *     keyword refers to this scope object.
     *     
     * @throws {OpenAjax.hub.Error.NoSubscription} if no such subscription is found
     * 
     * To facilitate cleanup, it is possible to call unsubscribe even 
     * when the HubClient is in a DISCONNECTED state.
     * 
     * In this implementation of HubClient, this function operates SYNCHRONOUSLY. 
     * Thus, onComplete is invoked before this function returns. Developers are 
     * cautioned that in most implementations of HubClient, onComplete is invoked 
     * after this function returns.
     */
    this.unsubscribe = function( subscriptionID, onComplete, scope ) {
        container.unsubscribe( subscriptionID, onComplete, scope );
    };
    
    this.isConnected = function() {
        return container.isConnected();
    };
    
    this.getScope = function() {
        return scope;
    };
    
    this.getSubscriberData = function( subID ) {
        return container.getSubscriberData( subID );
    };
    
    this.getSubscriberScope = function( subID ) {
        return container.getSubscriberScope( subID );
    };
    
    /**
     * Returns the params object associated with this Hub instance.
     * Allows mix-in code to access parameters passed into constructor that created
     * this Hub instance.
     *
     * @returns params  the params object associated with this Hub instance
     * @type {Object}
     */
    this.getParameters = function() {
        return params;
    };
};


//////////////////////////////////////////////////////////////////
//  CONCAT : IFRAME.JS
//////////////////////////////////////////////////////////////////
/*

        Copyright 2006-2009 OpenAjax Alliance

        Licensed under the Apache License, Version 2.0 (the "License"); 
        you may not use this file except in compliance with the License. 
        You may obtain a copy of the License at
        
                http://www.apache.org/licenses/LICENSE-2.0

        Unless required by applicable law or agreed to in writing, software 
        distributed under the License is distributed on an "AS IS" BASIS, 
        WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. 
        See the License for the specific language governing permissions and 
        limitations under the License.
*/

var OpenAjax = OpenAjax || {};
OpenAjax.hub = OpenAjax.hub || {};
OpenAjax.gadgets = typeof OpenAjax.gadgets === 'object' ? OpenAjax.gadgets :
                   typeof gadgets === 'object' ? gadgets :
                   {};
OpenAjax.gadgets.rpctx = OpenAjax.gadgets.rpctx || {};

(function() {
    // For now, we only use "oaaConfig" for the global "gadgets" object.  If the "gadgets" global
    // already exists, then there is no reason to check for "oaaConfig".  In the future, if we use
    // "oaaConfig" for other purposes, we'll need to remove the check for "!window.gadgets".
    if (typeof gadgets === 'undefined') {
        // "oaaConfig" can be specified as a global object.  If not found, then look for it as an
        // attribute on the script line for the OpenAjax Hub JS file.
        if (typeof oaaConfig === 'undefined') {
            var scripts = document.getElementsByTagName("script");
            // match "OpenAjax-mashup.js", "OpenAjaxManagedHub-all*.js", "OpenAjaxManagedHub-core*.js"
            var reHub = /openajax(?:managedhub-(?:all|core).*|-mashup)\.js$/i;
            for ( var i = scripts.length - 1; i >= 0; i-- ) {
                var src = scripts[i].getAttribute( "src" );
                if ( !src ) {
                    continue;
                }
                
                var m = src.match( reHub );
                if ( m ) {
                    var config = scripts[i].getAttribute( "oaaConfig" );
                    if ( config ) {
                        try {
                            oaaConfig = eval( "({ " + config + " })" );
                        } catch (e) {}
                    }
                    break;
                }
            }
        }
        
        if (typeof oaaConfig !== 'undefined' && oaaConfig.gadgetsGlobal) {
            gadgets = OpenAjax.gadgets;
        }
    }
})();


if (!OpenAjax.hub.IframeContainer) {

(function(){

/**
 * Create a new Iframe Container.
 * @constructor
 * @extends OpenAjax.hub.Container
 * 
 * IframeContainer implements the Container interface to provide a container
 * that isolates client components into secure sandboxes by leveraging the
 * isolation features provided by browser iframes.
 * 
 * SECURITY
 * 
 * In order for the connection between the IframeContainer and IframeHubClient
 * to be fully secure, you must specify a valid 'tunnelURI'. Note that if you
 * do specify a 'tunnelURI', then only the WPM and NIX transports are used,
 * covering the following browsers:
 *   IE 6+, Firefox 3+, Safari 4+, Chrome 2+, Opera 9+.
 * 
 * If no 'tunnelURI' is specified, then some security features are disabled:
 * the IframeContainer will not report FramePhish errors, and on some browsers
 * IframeContainer and IframeHubClient will not be able to validate the
 * identity of their partner (i.e. getPartnerOrigin() will return 'null').
 * However, not providing 'tunnelURI' allows the additional use of the RMR
 * and FE transports -- in addition to the above browsers, the Hub code will
 * also work on:
 *   Firefox 1 & 2, Safari 2 & 3, Chrome 1.
 * 
 * @param {OpenAjax.hub.ManagedHub} hub
 *    Managed Hub instance to which this Container belongs
 * @param {String} clientID
 *    A string ID that identifies a particular client of a Managed Hub. Unique
 *    within the context of the ManagedHub.
 * @param {Object} params  
 *    Parameters used to instantiate the IframeContainer.
 *    Once the constructor is called, the params object belongs exclusively to
 *    the IframeContainer. The caller MUST not modify it.
 *    The following are the pre-defined properties on params:
 * @param {Function} params.Container.onSecurityAlert
 *    Called when an attempted security breach is thwarted.  Function is defined
 *    as follows:  function(container, securityAlert)
 * @param {Function} [params.Container.onConnect]
 *    Called when the client connects to the Managed Hub.  Function is defined
 *    as follows:  function(container)
 * @param {Function} [params.Container.onDisconnect]
 *    Called when the client disconnects from the Managed Hub.  Function is
 *    defined as follows:  function(container)
 * @param {Object} [params.Container.scope]
 *    Whenever one of the Container's callback functions is called, references
 *    to "this" in the callback will refer to the scope object. If no scope is
 *    provided, default is window.
 * @param {Function} [params.Container.log]
 *    Optional logger function. Would be used to log to console.log or
 *    equivalent. 
 * @param {Object} params.IframeContainer.parent
 *    DOM element that is to be parent of iframe
 * @param {String} params.IframeContainer.uri
 *    Initial Iframe URI (Container will add parameters to this URI)
 * @param {String} [params.IframeContainer.clientRelay]
 *    URI of the relay file used by the client.  Must be from the same origin
 *    as params.IframeContainer.uri.  This value is only used by the IFPC
 *    transport layer, which is primarily used by IE 6 & 7. This value isn't
 *    required if you don't need to support those browsers.
 * @param {String} [params.IframeContainer.tunnelURI]
 *    URI of the tunnel iframe. Must be from the same origin as the page which
 *    instantiates the IframeContainer. If not specified, connection will not
 *    be fully secure (see SECURITY section).
 * @param {Object} [params.IframeContainer.iframeAttrs]
 *    Attributes to add to IFRAME DOM entity.  For example:
 *              { style: { width: "100%",
 *                         height: "100%" },
 *                className: "some_class" }
 * @param {Number} [params.IframeContainer.timeout]
 *    Load timeout in milliseconds.  If not specified, defaults to 15000.  If
 *    the client at params.IframeContainer.uri does not establish a connection
 *    with this container in the given time, the onSecurityAlert callback is
 *    called with a LoadTimeout error code.
 * @param {Function} [params.IframeContainer.seed]
 *    A function that returns a string that will be used to seed the
 *    pseudo-random number generator, which is used to create the security
 *    tokens.  An implementation of IframeContainer may choose to ignore this
 *    value.
 * @param {Number} [params.IframeContainer.tokenLength]
 *    Length of the security tokens used when transmitting messages.  If not
 *    specified, defaults to 6.  An implementation of IframeContainer may choose
 *    to ignore this value.
 *
 * @throws {OpenAjax.hub.Error.BadParameters}   if required params are not
 *          present or null
 * @throws {OpenAjax.hub.Error.Duplicate}   if a Container with this clientID
 *          already exists in the given Managed Hub
 * @throws {OpenAjax.hub.Error.Disconnected}   if hub is not connected
 */
OpenAjax.hub.IframeContainer = function( hub, clientID, params )
{
    assertValidParams( arguments );
    
    var container = this;
    var scope = params.Container.scope || window;
    var connected = false;
    var subs = {};
    var securityToken;
    var internalID;
    var timeout = params.IframeContainer.timeout || 15000;
    var loadTimer;

    if ( params.Container.log ) {
        var log = function( msg ) {
            try {
                params.Container.log.call( scope, "IframeContainer::" + clientID + ": " + msg );
            } catch( e ) {
                OpenAjax.hub._debugger();
            }
        };
    } else {
        log = function() {};
    }
    
    
    this._init = function() {
        // add to ManagedHub first, to see if clientID is a duplicate
        hub.addContainer( this );
        
        // Create an "internal" ID, which is guaranteed to be unique within the
        // window, not just within the hub.
        internalID = OpenAjax.hub.IframeContainer._rpcRouter.add( clientID, this );
        securityToken = generateSecurityToken( params, scope, log );
        
        var relay = params.IframeContainer.clientRelay;
        var transportName = OpenAjax.gadgets.rpc.getRelayChannel();
        if ( params.IframeContainer.tunnelURI ) {
            if ( transportName !== "wpm" && transportName !== "ifpc" ) {
                throw new Error( OpenAjax.hub.Error.IncompatBrowser );
            }
        } else {
            log( "WARNING: Parameter 'IframeContaienr.tunnelURI' not specified. Connection will not be fully secure." );
            if ( transportName === "rmr" && !relay ) {
                relay = OpenAjax.gadgets.rpc.getOrigin( params.IframeContainer.uri ) + "/robots.txt"; 
            }
        }
        
        // Create IFRAME to hold the client
        createIframe();
        
        OpenAjax.gadgets.rpc.setupReceiver( internalID, relay );
        
        startLoadTimer();
    };

        
  /*** OpenAjax.hub.Container interface ***/
   
    this.sendToClient = function( topic, data, subscriptionID ) {
        OpenAjax.gadgets.rpc.call( internalID, "openajax.pubsub", null, "pub", topic, data,
                                   subscriptionID );
    };

    this.remove = function() {
        finishDisconnect();
        clearTimeout( loadTimer );
        OpenAjax.gadgets.rpc.removeReceiver( internalID );
        var iframe = document.getElementById( internalID );
        iframe.parentNode.removeChild( iframe );
        OpenAjax.hub.IframeContainer._rpcRouter.remove( internalID );
    };

    this.isConnected = function() {
        return connected;
    };
    
    this.getClientID = function() {
        return clientID;
    };

    this.getPartnerOrigin = function() {
        if ( connected ) {
            var origin = OpenAjax.gadgets.rpc.getReceiverOrigin( internalID );
            if ( origin ) {
                // remove port if present
                return ( /^([a-zA-Z]+:\/\/[^:]+).*/.exec( origin )[1] );
            }
        }
        return null;
    };
    
    this.getParameters = function() {
        return params;
    };
    
    this.getHub = function() {
        return hub;
    };
    
    
  /*** OpenAjax.hub.IframeContainer interface ***/
    
    /**
     * Get the iframe associated with this iframe container
     * 
     * This function returns the iframe associated with an IframeContainer,
     * allowing the Manager Application to change its size, styles, scrollbars, etc.
     * 
     * CAUTION: The iframe is owned exclusively by the IframeContainer. The Manager
     * Application MUST NOT destroy the iframe directly. Also, if the iframe is
     * hidden and disconnected, the Manager Application SHOULD NOT attempt to make
     * it visible. The Container SHOULD automatically hide the iframe when it is
     * disconnected; to make it visible would introduce security risks. 
     * 
     * @returns iframeElement
     * @type {Object}
     */
    this.getIframe = function() {
        return document.getElementById( internalID );
    };
    
    
  /*** private functions ***/

    function assertValidParams( args ) {
        var hub = args[0],
            clientID = args[1],
            params = args[2];
        if ( ! hub || ! clientID || ! params || ! params.Container ||
             ! params.Container.onSecurityAlert || ! params.IframeContainer ||
             ! params.IframeContainer.parent || ! params.IframeContainer.uri ) {
            throw new Error( OpenAjax.hub.Error.BadParameters );
        }
    }
    
    this._handleIncomingRPC = function( command, topic, data ) {
        switch ( command ) {
            // publish
            // 'data' is topic message
            case "pub":
                hub.publishForClient( container, topic, data );
                break;
            
            // subscribe
            // 'data' is subscription ID
            case "sub":
                var errCode = "";  // empty string is success
                try {
                    subs[ data ] = hub.subscribeForClient( container, topic, data );
                } catch( e ) {
                    errCode = e.message;
                }
                return errCode;
            
            // unsubscribe
            // 'data' is subscription ID
            case "uns":
                var handle = subs[ data ];
                hub.unsubscribeForClient( container, handle );
                delete subs[ data ];
                return data;
            
            // connect
            case "con":
                finishConnect();
                return true;
            
            // disconnect
            case "dis":
                startLoadTimer();
                finishDisconnect();
                if ( params.Container.onDisconnect ) {
                    try {
                        params.Container.onDisconnect.call( scope, container );
                    } catch( e ) {
                        OpenAjax.hub._debugger();
                        log( "caught error from onDisconnect callback to constructor: " + e.message );
                    }
                }
                return true;
        }
    };
    
    this._onSecurityAlert = function( error ) {
        invokeSecurityAlert( rpcErrorsToOAA[ error ] );
    };
    
    // The RPC code requires that the 'name' attribute be properly set on the
    // iframe.  However, setting the 'name' property on the iframe object
    // returned from 'createElement("iframe")' doesn't work on IE --
    // 'window.name' returns null for the code within the iframe.  The
    // workaround is to set the 'innerHTML' of a span to the iframe's HTML code,
    // with 'name' and other attributes properly set.
    function createIframe() {
        var span = document.createElement( "span" );
        params.IframeContainer.parent.appendChild( span );
        
        var iframeText = '<iframe aria-hidden="true" id="' + internalID + '" name="' + internalID +
                '" src="javascript:\'<html></html>\'"';
        
        // Add iframe attributes
        var styleText = '';
        var attrs = params.IframeContainer.iframeAttrs;
        if ( attrs ) {
            for ( var attr in attrs ) {
                switch ( attr ) {
                    case "style":
                        for ( var style in attrs.style ) {
                            styleText += style + ':' + attrs.style[ style ] + ';';
                        }
                        break;
                    case "className":
                        iframeText += ' class="' + attrs[ attr ] + '"';
                        break;
                    default:
                        iframeText += ' ' + attr + '="' + attrs[ attr ] + '"';
                }
            }
        }
        
        // initially hide IFRAME content, in order to lessen frame phishing impact
        styleText += 'visibility:hidden;';
        iframeText += ' style="' + styleText + '"></iframe>';
        
        span.innerHTML = iframeText;
        
        var tunnelText;
        if ( params.IframeContainer.tunnelURI ) {
            tunnelText = "&parent=" + encodeURIComponent( params.IframeContainer.tunnelURI ) +
                         "&forcesecure=true";
        } else {
            tunnelText = "&oahParent=" +
                         encodeURIComponent( OpenAjax.gadgets.rpc.getOrigin( window.location.href ));
        }
        var idText = "";
        if ( internalID !== clientID ) {
            idText = "&oahId=" + internalID.substring( internalID.lastIndexOf('_') + 1 );
        }
        document.getElementById( internalID ).src = params.IframeContainer.uri +
                "#rpctoken=" + securityToken + tunnelText + idText;
    }
    
    // If the relay iframe used by RPC has not been loaded yet, then we won't have unload protection
    // at this point.  Since we can't detect when the relay iframe has loaded, we use a two stage
    // connection process.  First, the child sends a connection msg and the container sends an ack.
    // Then the container sends a connection msg and the child replies with an ack.  Since the
    // container can only send a message if the relay iframe has loaded, then we know if we get an
    // ack here that the relay iframe is ready.  And we are fully connected.
    function finishConnect() {
        // connect acknowledgement
        function callback( result ) {
            if ( result ) {
                connected = true;
                clearTimeout( loadTimer );
                document.getElementById( internalID ).style.visibility = "visible";
                if ( params.Container.onConnect ) {
                    try {
                        params.Container.onConnect.call( scope, container );
                    } catch( e ) {
                        OpenAjax.hub._debugger();
                        log( "caught error from onConnect callback to constructor: " + e.message );
                    }
                }
            }
        }
        OpenAjax.gadgets.rpc.call( internalID, "openajax.pubsub", callback, "cmd", "con" );
    }
    
    function finishDisconnect() {
        if ( connected ) {
            connected = false;
            document.getElementById( internalID ).style.visibility = "hidden";
        
            // unsubscribe from all subs
            for ( var s in subs ) {
                hub.unsubscribeForClient( container, subs[s] );
            }
            subs = {};
        }
    }
    
    function invokeSecurityAlert( errorMsg ) {
        try {
            params.Container.onSecurityAlert.call( scope, container, errorMsg );
        } catch( e ) {
            OpenAjax.hub._debugger();
            log( "caught error from onSecurityAlert callback to constructor: " + e.message );
        }
    }
    
    function startLoadTimer() {
        loadTimer = setTimeout(
            function() {
                // alert the security alert callback
                invokeSecurityAlert( OpenAjax.hub.SecurityAlert.LoadTimeout );
                // don't receive any more messages from HubClient
                container._handleIncomingRPC = function() {};
            },
            timeout
        );
    }
    
    
    this._init();
};

////////////////////////////////////////////////////////////////////////////////

/**
 * Create a new IframeHubClient.
 * @constructor
 * @extends OpenAjax.hub.HubClient
 * 
 * @param {Object} params
 *    Once the constructor is called, the params object belongs to the
 *    HubClient. The caller MUST not modify it.
 *    The following are the pre-defined properties on params:
 * @param {Function} params.HubClient.onSecurityAlert
 *     Called when an attempted security breach is thwarted
 * @param {Object} [params.HubClient.scope]
 *     Whenever one of the HubClient's callback functions is called,
 *     references to "this" in the callback will refer to the scope object.
 *     If not provided, the default is window.
 * @param {Function} [params.HubClient.log]
 *     Optional logger function. Would be used to log to console.log or
 *     equivalent. 
 * @param {Boolean} [params.IframeHubClient.requireParentVerifiable]
 *     Set to true in order to require that this IframeHubClient use a
 *     transport that can verify the parent Container's identity.
 * @param {Function} [params.IframeHubClient.seed]
 *     A function that returns a string that will be used to seed the
 *     pseudo-random number generator, which is used to create the security
 *     tokens.  An implementation of IframeHubClient may choose to ignore
 *     this value.
 * @param {Number} [params.IframeHubClient.tokenLength]
 *     Length of the security tokens used when transmitting messages.  If
 *     not specified, defaults to 6.  An implementation of IframeHubClient
 *     may choose to ignore this value.
 *     
 * @throws {OpenAjax.hub.Error.BadParameters} if any of the required
 *          parameters is missing, or if a parameter value is invalid in 
 *          some way.
 */
OpenAjax.hub.IframeHubClient = function( params )
{
    if ( ! params || ! params.HubClient || ! params.HubClient.onSecurityAlert ) {
        throw new Error( OpenAjax.hub.Error.BadParameters );
    }
    
    var client = this;
    var scope = params.HubClient.scope || window;
    var connected = false;
    var subs = {};
    var subIndex = 0;
    var clientID;
//    var securityToken;    // XXX still need "securityToken"?
    
    if ( params.HubClient.log ) {
        var log = function( msg ) {
            try {
                params.HubClient.log.call( scope, "IframeHubClient::" + clientID + ": " + msg );
            } catch( e ) {
                OpenAjax.hub._debugger();
            }
        };
    } else {
        log = function() {};
    }
    
    this._init = function() {
        var urlParams = OpenAjax.gadgets.util.getUrlParameters();
        if ( ! urlParams.parent ) {
            // The RMR transport does not require a valid relay file, but does need a URL
            // in the parent's domain. The URL does not need to point to valid file, so just
            // point to 'robots.txt' file. See RMR transport code for more info.
            var parent = urlParams.oahParent + "/robots.txt";
            OpenAjax.gadgets.rpc.setupReceiver( "..", parent );
        }
        
        if ( params.IframeHubClient && params.IframeHubClient.requireParentVerifiable &&
             OpenAjax.gadgets.rpc.getReceiverOrigin( ".." ) === null ) {
            // If user set 'requireParentVerifiable' to true but RPC transport does not
            // support this, throw error.
            OpenAjax.gadgets.rpc.removeReceiver( ".." );
            throw new Error( OpenAjax.hub.Error.IncompatBrowser );
        }
        
        OpenAjax.hub.IframeContainer._rpcRouter.add( "..", this );
// XXX The RPC layer initializes immediately on load, in the child (IframeHubClient). So it is too
//    late here to specify a security token for the RPC layer.  At the moment, only the NIX
//    transport requires a child token (IFPC [aka FIM] is not supported).
//        securityToken = generateSecurityToken( params, scope, log );

        clientID = OpenAjax.gadgets.rpc.RPC_ID;
        if ( urlParams.oahId ) {
            clientID = clientID.substring( 0, clientID.lastIndexOf('_') );
        }
    };
    
  /*** HubClient interface ***/

    this.connect = function( onComplete, scope ) {
        if ( connected ) {
            throw new Error( OpenAjax.hub.Error.Duplicate );
        }
        
        // connect acknowledgement
        function callback( result ) {
            if ( result ) {
                connected = true;
                if ( onComplete ) {
                    try {
                        onComplete.call( scope || window, client, true );
                    } catch( e ) {
                        OpenAjax.hub._debugger();
                        log( "caught error from onComplete callback to connect(): " + e.message );
                    }
                }
            }
        }
        OpenAjax.gadgets.rpc.call( "..", "openajax.pubsub", callback, "con" );
    };
    
    this.disconnect = function( onComplete, scope ) {
        if ( !connected ) {
            throw new Error( OpenAjax.hub.Error.Disconnected );
        }
        
        connected = false;
        
        // disconnect acknowledgement
        var callback = null;
        if ( onComplete ) {
            callback = function( result ) {
                try {
                    onComplete.call( scope || window, client, true );
                } catch( e ) {
                    OpenAjax.hub._debugger();
                    log( "caught error from onComplete callback to disconnect(): " + e.message );
                }
            };
        }
        OpenAjax.gadgets.rpc.call( "..", "openajax.pubsub", callback, "dis" );
    };
    
    this.getPartnerOrigin = function() {
        if ( connected ) {
            var origin = OpenAjax.gadgets.rpc.getReceiverOrigin( ".." );
            if ( origin ) {
                // remove port if present
                return ( /^([a-zA-Z]+:\/\/[^:]+).*/.exec( origin )[1] );
            }
        }
        return null;
    };
    
    this.getClientID = function() {
        return clientID;
    };
    
  /*** Hub interface ***/
    
    this.subscribe = function( topic, onData, scope, onComplete, subscriberData ) {
        assertConn();
        assertSubTopic( topic );
        if ( ! onData ) {
            throw new Error( OpenAjax.hub.Error.BadParameters );
        }
    
        scope = scope || window;
        var subID = "" + subIndex++;
        subs[ subID ] = { cb: onData, sc: scope, d: subscriberData };
        
        // subscribe acknowledgement
        function callback( result ) {
            if ( result !== '' ) {    // error
                delete subs[ subID ];
            }
            if ( onComplete ) {
                try {
                    onComplete.call( scope, subID, result === "", result );
                } catch( e ) {
                    OpenAjax.hub._debugger();
                    log( "caught error from onComplete callback to subscribe(): " + e.message );
                }
            }
        }
        OpenAjax.gadgets.rpc.call( "..", "openajax.pubsub", callback, "sub", topic, subID );
        
        return subID;
    };
    
    this.publish = function( topic, data ) {
        assertConn();
        assertPubTopic( topic );
        OpenAjax.gadgets.rpc.call( "..", "openajax.pubsub", null, "pub", topic, data );
    };
    
    this.unsubscribe = function( subscriptionID, onComplete, scope ) {
        assertConn();
        if ( ! subscriptionID ) {
            throw new Error( OpenAjax.hub.Error.BadParameters );
        }
        
        // if no such subscriptionID, or in process of unsubscribing given ID, throw error
        if ( ! subs[ subscriptionID ] || subs[ subscriptionID ].uns ) {
            throw new Error( OpenAjax.hub.Error.NoSubscription );
        }
        
        // unsubscribe in progress
        subs[ subscriptionID ].uns = true;
        
        // unsubscribe acknowledgement
        function callback( result ) {
            delete subs[ subscriptionID ];
            if ( onComplete ) {
                try {
                    onComplete.call( scope || window, subscriptionID, true );
                } catch( e ) {
                    OpenAjax.hub._debugger();
                    log( "caught error from onComplete callback to unsubscribe(): " + e.message );
                }
            }
        }
        OpenAjax.gadgets.rpc.call( "..", "openajax.pubsub", callback, "uns", null, subscriptionID );
    };
    
    this.isConnected = function() {
        return connected;
    };
    
    this.getScope = function() {
        return scope;
    };
    
    this.getSubscriberData = function( subscriptionID ) {
        assertConn();
        if ( subs[ subscriptionID ] ) {
            return subs[ subscriptionID ].d;
        }
        throw new Error( OpenAjax.hub.Error.NoSubscription );
    };
    
    this.getSubscriberScope = function( subscriptionID ) {
        assertConn();
        if ( subs[ subscriptionID ] ) {
            return subs[ subscriptionID ].sc;
        }
        throw new Error( OpenAjax.hub.Error.NoSubscription );
    };
    
    this.getParameters = function() {
        return params;
    };
    
  /*** private functions ***/
    
    this._handleIncomingRPC = function( command, topic, data, subscriptionID ) {
        if ( command === "pub" ) {
            // if subscription exists and we are not in process of unsubscribing...
            if ( subs[ subscriptionID ] && ! subs[ subscriptionID ].uns ) {
                try {
                    subs[ subscriptionID ].cb.call( subs[ subscriptionID ].sc, topic,
                            data, subs[ subscriptionID ].d );
                } catch( e ) {
                    OpenAjax.hub._debugger();
                    log( "caught error from onData callback to subscribe(): " + e.message );
                }
            }
        }
        // else if command === "cmd"...
        
        // First time this function is called, topic should be "con".  This is the 2nd stage of the
        // connection process.  Simply need to return "true" in order to send an acknowledgement
        // back to container.  See finishConnect() in the container object.
        if ( topic === "con" ) {
          return true;
        }
        return false;
    };
    
    function assertConn() {
        if ( ! connected ) {
            throw new Error( OpenAjax.hub.Error.Disconnected );
        }
    }
    
    function assertSubTopic( topic )
    {
        if ( ! topic ) {
            throw new Error( OpenAjax.hub.Error.BadParameters );
        }
        var path = topic.split(".");
        var len = path.length;
        for (var i = 0; i < len; i++) {
            var p = path[i];
            if ((p === "") ||
               ((p.indexOf("*") != -1) && (p != "*") && (p != "**"))) {
                throw new Error( OpenAjax.hub.Error.BadParameters );
            }
            if ((p == "**") && (i < len - 1)) {
                throw new Error( OpenAjax.hub.Error.BadParameters );
            }
        }
    }
    
    function assertPubTopic( topic ) {
        if ( !topic || topic === "" || (topic.indexOf("*") != -1) ||
            (topic.indexOf("..") != -1) ||  (topic.charAt(0) == ".") ||
            (topic.charAt(topic.length-1) == "."))
        {
            throw new Error( OpenAjax.hub.Error.BadParameters );
        }
    }
    
//    function invokeSecurityAlert( errorMsg ) {
//        try {
//            params.HubClient.onSecurityAlert.call( scope, client, errorMsg );
//        } catch( e ) {
//            OpenAjax.hub._debugger();
//            log( "caught error from onSecurityAlert callback to constructor: " + e.message );
//        }
//    }

    
    this._init();
};

////////////////////////////////////////////////////////////////////////////////

    // RPC object contents:
    //   s: Service Name
    //   f: From
    //   c: The callback ID or 0 if none.
    //   a: The arguments for this RPC call.
    //   t: The authentication token.
OpenAjax.hub.IframeContainer._rpcRouter = function() {
    var receivers = {};
    
    function router() {
        var r = receivers[ this.f ];
        if ( r ) {
            return r._handleIncomingRPC.apply( r, arguments );
        }
    }
    
    function onSecurityAlert( receiverId, error ) {
        var r = receivers[ receiverId ];
        if ( r ) {
          r._onSecurityAlert.call( r, error );
        }
    }
    
    return {
        add: function( id, receiver ) {
            function _add( id, receiver ) {
                if ( id === ".." ) {
                    if ( ! receivers[ ".." ] ) {
                        receivers[ ".." ] = receiver;
                    }
                    return;
                }
                
                var newId = id;
                while ( document.getElementById(newId) ) {
                    // a client with the specified ID already exists on this page;
                    // create a unique ID
                    newId = id + '_' + ((0x7fff * Math.random()) | 0).toString(16);
                };
                receivers[ newId ] = receiver;
                return newId;
            }
            
            // when this function is first called, register the RPC service
            OpenAjax.gadgets.rpc.register( "openajax.pubsub", router );
            OpenAjax.gadgets.rpc.config({
                securityCallback: onSecurityAlert
            });

            rpcErrorsToOAA[ OpenAjax.gadgets.rpc.SEC_ERROR_LOAD_TIMEOUT ] = OpenAjax.hub.SecurityAlert.LoadTimeout;
            rpcErrorsToOAA[ OpenAjax.gadgets.rpc.SEC_ERROR_FRAME_PHISH ] = OpenAjax.hub.SecurityAlert.FramePhish;
            rpcErrorsToOAA[ OpenAjax.gadgets.rpc.SEC_ERROR_FORGED_MSG ] = OpenAjax.hub.SecurityAlert.ForgedMsg;
            
            this.add = _add;
            return _add( id, receiver );
        },
        
        remove: function( id ) {
            delete receivers[ id ];
        }
    };
}();

var rpcErrorsToOAA = {};

////////////////////////////////////////////////////////////////////////////////

function generateSecurityToken( params, scope, log ) {
    if ( ! OpenAjax.hub.IframeContainer._prng ) {
        // create pseudo-random number generator with a default seed
        var seed = new Date().getTime() + Math.random() + document.cookie;
        OpenAjax.hub.IframeContainer._prng = OpenAjax._smash.crypto.newPRNG( seed );
    }
    
    var p = params.IframeContainer || params.IframeHubClient;
    if ( p && p.seed ) {
        try {
            var extraSeed = p.seed.call( scope );
            OpenAjax.hub.IframeContainer._prng.addSeed( extraSeed );
        } catch( e ) {
            OpenAjax.hub._debugger();
            log( "caught error from 'seed' callback: " + e.message );
        }
    }
    
    var tokenLength = (p && p.tokenLength) || 6;
    return OpenAjax.hub.IframeContainer._prng.nextRandomB64Str( tokenLength );
}

})();
}

//////////////////////////////////////////////////////////////////
//  CONCAT : CRYPTO.JS
//////////////////////////////////////////////////////////////////
/*

        Copyright 2006-2009 OpenAjax Alliance

        Licensed under the Apache License, Version 2.0 (the "License"); 
        you may not use this file except in compliance with the License. 
        You may obtain a copy of the License at
        
                http://www.apache.org/licenses/LICENSE-2.0

        Unless required by applicable law or agreed to in writing, software 
        distributed under the License is distributed on an "AS IS" BASIS, 
        WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. 
        See the License for the specific language governing permissions and 
        limitations under the License.
*/
// SMASH.CRYPTO
//
// Small library containing some minimal crypto functionality for a
// - a hash-function: SHA-1 (see FIPS PUB 180-2 for definition)
//     BigEndianWord[5] <- smash.crypto.sha1( BigEndianWord[*] dataWA, int lenInBits)
//
// - a message authentication code (MAC): HMAC-SHA-1 (RFC2104/2202)
//     BigEndianWord[5] <- smash.crypto.hmac_sha1(
//                            BigEndianWord[3-16] keyWA, 
//                            Ascii or Unicode string dataS,
//		 		 		       int chrsz (8 for Asci/16 for Unicode)
//
// - pseudo-random number generator (PRNG): HMAC-SHA-1 in counter mode, following
//   Barak & Halevi, An architecture for robust pseudo-random generation and applications to /dev/random, CCS 2005
//     rngObj <- smash.crypto.newPRNG( String[>=12] seedS)
//   where rngObj has methods
//     addSeed(String seed)
//     BigEndianWord[len] <- nextRandomOctets(int len)
//     Base64-String[len] <- nextRandomB64Str(int len)
//   Note: HMAC-SHA1 in counter-mode does not provide forward-security on corruption. 
//         However, the PRNG state is kept inside a closure. So if somebody can break the closure, he probably could
//         break a whole lot more and forward-security of the prng is not the highest of concerns anymore :-)

if ( typeof OpenAjax._smash == 'undefined' ) { OpenAjax._smash = {}; }

OpenAjax._smash.crypto = {

  // Some utilities
  // convert a string to an array of big-endian words
  'strToWA': function (/* Ascii or Unicode string */ str, /* int 8 for Asci/16 for Unicode */ chrsz){
    var bin = Array();
    var mask = (1 << chrsz) - 1;
    for(var i = 0; i < str.length * chrsz; i += chrsz)
      bin[i>>5] |= (str.charCodeAt(i / chrsz) & mask) << (32 - chrsz - i%32);
    return bin;
  },


  // MAC
  'hmac_sha1' : function(
        /* BigEndianWord[3-16]*/             keyWA,
       /* Ascii or Unicode string */       dataS,
       /* int 8 for Asci/16 for Unicode */ chrsz)
  {
    // write our own hmac derived from paj's so we do not have to do constant key conversions and length checking ...
    var ipad = Array(16), opad = Array(16);
    for(var i = 0; i < 16; i++) {
      ipad[i] = keyWA[i] ^ 0x36363636;
      opad[i] = keyWA[i] ^ 0x5C5C5C5C;
    }

    var hash = this.sha1( ipad.concat(this.strToWA(dataS, chrsz)), 512 + dataS.length * chrsz);
    return     this.sha1( opad.concat(hash), 512 + 160);
  },


  // PRNG factory method
  // see below 'addSeed', 'nextRandomOctets' & 'nextRandomB64Octets' for public methods of returnd prng object
  'newPRNG' : function (/* String[>=12] */ seedS) {
    var that = this;

    // parameter checking
    // We cannot really verify entropy but obviously the string must have at least a minimal length to have enough entropy
    // However, a 2^80 security seems ok, so we check only that at least 12 chars assuming somewhat random ASCII
    if ( (typeof seedS != 'string') || (seedS.length < 12) ) {
      alert("WARNING: Seed length too short ...");
    }

    // constants
    var __refresh_keyWA = [ 0xA999, 0x3E36, 0x4706, 0x816A,
    		 		 		     0x2571, 0x7850, 0xC26C, 0x9CD0,
    		 		 		     0xBA3E, 0xD89D, 0x1233, 0x9525,
    		 		 		     0xff3C, 0x1A83, 0xD491, 0xFF15 ]; // some random key for refresh ...

    // internal state
    var _keyWA = []; // BigEndianWord[5]
    var _cnt = 0;  // int

    function extract(seedS) {
      return that.hmac_sha1(__refresh_keyWA, seedS, 8);
    }

    function refresh(seedS) {
      // HMAC-SHA1 is not ideal, Rijndal 256bit block/key in CBC mode with fixed key might be better
      // but to limit the primitives and given that we anyway have only limited entropy in practise
      // this seems good enough
      var uniformSeedWA = extract(seedS);
      for(var i = 0; i < 5; i++) {
        _keyWA[i] ^= uniformSeedWA[i];
      }
    }

    // inital state seeding
    refresh(seedS);

    // public methods
    return {
      // Mix some additional seed into the PRNG state
      'addSeed'         : function (/* String */ seed) {
        // no parameter checking. Any added entropy should be fine ...
        refresh(seed);
      },


      // Get an array of len random octets
      'nextRandomOctets' : /* BigEndianWord[len] <- */ function (/* int */ len) {
		 var randOctets = [];
		 while (len > 0) {
		   _cnt+=1;
		   var nextBlock = that.hmac_sha1(_keyWA, (_cnt).toString(16), 8);
		   for (i=0; (i < 20) & (len > 0); i++, len--) {
		     randOctets.push( (nextBlock[i>>2] >> (i % 4) ) % 256);
		   }
		   // Note: if len was not a multiple 20, some random octets are ignored here but who cares ..
		 }
		 return randOctets;
      },


      // Get a random string of Base64-like (see below) chars of length len
      // Note: there is a slightly non-standard Base64 with no padding and '-' and '_' for '+' and '/', respectively
      'nextRandomB64Str' : /* Base64-String <- */ function (/* int */ len) {
		 var b64StrMap = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";

		 var randOctets = this.nextRandomOctets(len);
		 var randB64Str = '';
		 for (var i=0; i < len; i++) {
		   randB64Str += b64StrMap.charAt(randOctets[i] & 0x3F);
		 }
        return randB64Str;
      }

    }
  },


  // Digest function:
  // BigEndianWord[5] <- sha1( BigEndianWord[*] dataWA, int lenInBits)
  'sha1' : function(){
    // Note: all Section references below refer to FIPS 180-2.

    // private utility functions

    // - 32bit addition with wrap-around
    var add_wa = function (x, y){
      var lsw = (x & 0xFFFF) + (y & 0xFFFF);
      var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
      return (msw << 16) | (lsw & 0xFFFF);
    }

    // - 32bit rotatate left
    var rol = function(num, cnt) {
      return (num << cnt) | (num >>> (32 - cnt));
    }

    // - round-dependent function f_t from Section 4.1.1
    function sha1_ft(t, b, c, d) {
      if(t < 20) return (b & c) | ((~b) & d);
      if(t < 40) return b ^ c ^ d;
      if(t < 60) return (b & c) | (b & d) | (c & d);
      return b ^ c ^ d;
    }

    // - round-dependent SHA-1 constants from Section 4.2.1
    function sha1_kt(t) {
      return (t < 20) ?  1518500249 :
             (t < 40) ?  1859775393 :
             (t < 60) ? -1894007588 :
          /* (t < 80) */ -899497514 ;
    }

    // main algorithm. 
    return function( /* BigEndianWord[*] */ dataWA, /* int */ lenInBits) {

      // Section 6.1.1: Preprocessing
      //-----------------------------
      // 1. padding:  (see also Section 5.1.1)
      //  - append one 1 followed by 0 bits filling up 448 bits of last (512bit) block
      dataWA[lenInBits >> 5] |= 0x80 << (24 - lenInBits % 32);
      //  - encode length in bits in last 64 bits
      //    Note: we rely on javascript to zero file elements which are beyond last (partial) data-block
      //    but before this length encoding!
      dataWA[((lenInBits + 64 >> 9) << 4) + 15] = lenInBits;

      // 2. 512bit blocks (actual split done ondemand later)
      var W = Array(80);

      // 3. initial hash using SHA-1 constants on page 13
      var H0 =  1732584193;
      var H1 = -271733879;
      var H2 = -1732584194;
      var H3 =  271733878;
      var H4 = -1009589776;

      // 6.1.2 SHA-1 Hash Computation
      for(var i = 0; i < dataWA.length; i += 16) {
        // 1. Message schedule, done below
        // 2. init working variables
        var a = H0; var b = H1; var c = H2; var d = H3; var e = H4;

        // 3. round-functions
        for(var j = 0; j < 80; j++)
        {
      		 // postponed step 2
          W[j] = ( (j < 16) ? dataWA[i+j] : rol(W[j-3] ^ W[j-8] ^ W[j-14] ^ W[j-16], 1));

          var T = add_wa( add_wa( rol(a, 5), sha1_ft(j, b, c, d)),
                          add_wa( add_wa(e, W[j]), sha1_kt(j)) );
          e = d;
          d = c;
          c = rol(b, 30);
          b = a;
          a = T;
        }

		 // 4. intermediate hash
        H0 = add_wa(a, H0);
        H1 = add_wa(b, H1);
        H2 = add_wa(c, H2);
        H3 = add_wa(d, H3);
        H4 = add_wa(e, H4);
      }

      return Array(H0, H1, H2, H3, H4);
    }
  }()

};


//////////////////////////////////////////////////////////////////
//  CONCAT : JSON2.JS
//////////////////////////////////////////////////////////////////
/*
    http://www.JSON.org/json2.js
    2008-11-19

    Public Domain.

    NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.

    See http://www.JSON.org/js.html

    This file creates a global JSON object containing two methods: stringify
    and parse.

        JSON.stringify(value, replacer, space)
            value       any JavaScript value, usually an object or array.

            replacer    an optional parameter that determines how object
                        values are stringified for objects. It can be a
                        function or an array of strings.

            space       an optional parameter that specifies the indentation
                        of nested structures. If it is omitted, the text will
                        be packed without extra whitespace. If it is a number,
                        it will specify the number of spaces to indent at each
                        level. If it is a string (such as '\t' or '&nbsp;'),
                        it contains the characters used to indent at each level.

            This method produces a JSON text from a JavaScript value.

            When an object value is found, if the object contains a toJSON
            method, its toJSON method will be called and the result will be
            stringified. A toJSON method does not serialize: it returns the
            value represented by the name/value pair that should be serialized,
            or undefined if nothing should be serialized. The toJSON method
            will be passed the key associated with the value, and this will be
            bound to the object holding the key.

            For example, this would serialize Dates as ISO strings.

                Date.prototype.toJSON = function (key) {
                    function f(n) {
                        // Format integers to have at least two digits.
                        return n < 10 ? '0' + n : n;
                    }

                    return this.getUTCFullYear()   + '-' +
                         f(this.getUTCMonth() + 1) + '-' +
                         f(this.getUTCDate())      + 'T' +
                         f(this.getUTCHours())     + ':' +
                         f(this.getUTCMinutes())   + ':' +
                         f(this.getUTCSeconds())   + 'Z';
                };

            You can provide an optional replacer method. It will be passed the
            key and value of each member, with this bound to the containing
            object. The value that is returned from your method will be
            serialized. If your method returns undefined, then the member will
            be excluded from the serialization.

            If the replacer parameter is an array of strings, then it will be
            used to select the members to be serialized. It filters the results
            such that only members with keys listed in the replacer array are
            stringified.

            Values that do not have JSON representations, such as undefined or
            functions, will not be serialized. Such values in objects will be
            dropped; in arrays they will be replaced with null. You can use
            a replacer function to replace those with JSON values.
            JSON.stringify(undefined) returns undefined.

            The optional space parameter produces a stringification of the
            value that is filled with line breaks and indentation to make it
            easier to read.

            If the space parameter is a non-empty string, then that string will
            be used for indentation. If the space parameter is a number, then
            the indentation will be that many spaces.

            Example:

            text = JSON.stringify(['e', {pluribus: 'unum'}]);
            // text is '["e",{"pluribus":"unum"}]'


            text = JSON.stringify(['e', {pluribus: 'unum'}], null, '\t');
            // text is '[\n\t"e",\n\t{\n\t\t"pluribus": "unum"\n\t}\n]'

            text = JSON.stringify([new Date()], function (key, value) {
                return this[key] instanceof Date ?
                    'Date(' + this[key] + ')' : value;
            });
            // text is '["Date(---current time---)"]'


        JSON.parse(text, reviver)
            This method parses a JSON text to produce an object or array.
            It can throw a SyntaxError exception.

            The optional reviver parameter is a function that can filter and
            transform the results. It receives each of the keys and values,
            and its return value is used instead of the original value.
            If it returns what it received, then the structure is not modified.
            If it returns undefined then the member is deleted.

            Example:

            // Parse the text. Values that look like ISO date strings will
            // be converted to Date objects.

            myData = JSON.parse(text, function (key, value) {
                var a;
                if (typeof value === 'string') {
                    a =
/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
                    if (a) {
                        return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4],
                            +a[5], +a[6]));
                    }
                }
                return value;
            });

            myData = JSON.parse('["Date(09/09/2001)"]', function (key, value) {
                var d;
                if (typeof value === 'string' &&
                        value.slice(0, 5) === 'Date(' &&
                        value.slice(-1) === ')') {
                    d = new Date(value.slice(5, -1));
                    if (d) {
                        return d;
                    }
                }
                return value;
            });


    This is a reference implementation. You are free to copy, modify, or
    redistribute.

    This code should be minified before deployment.
    See http://javascript.crockford.com/jsmin.html

    USE YOUR OWN COPY. IT IS EXTREMELY UNWISE TO LOAD CODE FROM SERVERS YOU DO
    NOT CONTROL.
*/

/*jslint evil: true */

/*global JSON */

/*members "", "\b", "\t", "\n", "\f", "\r", "\"", JSON, "\\", apply,
    call, charCodeAt, getUTCDate, getUTCFullYear, getUTCHours,
    getUTCMinutes, getUTCMonth, getUTCSeconds, hasOwnProperty, join,
    lastIndex, length, parse, prototype, push, replace, slice, stringify,
    test, toJSON, toString, valueOf
*/

// Create a JSON object only if one does not already exist. We create the
// methods in a closure to avoid creating global variables.

if (!this.JSON) {
    JSON = {};
}
(function () {

    function f(n) {
        // Format integers to have at least two digits.
        return n < 10 ? '0' + n : n;
    }

    if (typeof Date.prototype.toJSON !== 'function') {

        Date.prototype.toJSON = function (key) {

            return this.getUTCFullYear()   + '-' +
                 f(this.getUTCMonth() + 1) + '-' +
                 f(this.getUTCDate())      + 'T' +
                 f(this.getUTCHours())     + ':' +
                 f(this.getUTCMinutes())   + ':' +
                 f(this.getUTCSeconds())   + 'Z';
        };

        String.prototype.toJSON =
        Number.prototype.toJSON =
        Boolean.prototype.toJSON = function (key) {
            return this.valueOf();
        };
    }

    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        gap,
        indent,
        meta = {    // table of character substitutions
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"' : '\\"',
            '\\': '\\\\'
        },
        rep;


    function quote(string) {

// If the string contains no control characters, no quote characters, and no
// backslash characters, then we can safely slap some quotes around it.
// Otherwise we must also replace the offending characters with safe escape
// sequences.

        escapable.lastIndex = 0;
        return escapable.test(string) ?
            '"' + string.replace(escapable, function (a) {
                var c = meta[a];
                return typeof c === 'string' ? c :
                    '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
            }) + '"' :
            '"' + string + '"';
    }


    function str(key, holder) {

// Produce a string from holder[key].

        var i,          // The loop counter.
            k,          // The member key.
            v,          // The member value.
            length,
            mind = gap,
            partial,
            value = holder[key];

// If the value has a toJSON method, call it to obtain a replacement value.

        if (value && typeof value === 'object' &&
                typeof value.toJSON === 'function') {
            value = value.toJSON(key);
        }

// If we were called with a replacer function, then call the replacer to
// obtain a replacement value.

        if (typeof rep === 'function') {
            value = rep.call(holder, key, value);
        }

// What happens next depends on the value's type.

        switch (typeof value) {
        case 'string':
            return quote(value);

        case 'number':

// JSON numbers must be finite. Encode non-finite numbers as null.

            return isFinite(value) ? String(value) : 'null';

        case 'boolean':
        case 'null':

// If the value is a boolean or null, convert it to a string. Note:
// typeof null does not produce 'null'. The case is included here in
// the remote chance that this gets fixed someday.

            return String(value);

// If the type is 'object', we might be dealing with an object or an array or
// null.

        case 'object':

// Due to a specification blunder in ECMAScript, typeof null is 'object',
// so watch out for that case.

            if (!value) {
                return 'null';
            }

// Make an array to hold the partial results of stringifying this object value.

            gap += indent;
            partial = [];

// Is the value an array?

            if (Object.prototype.toString.apply(value) === '[object Array]') {

// The value is an array. Stringify every element. Use null as a placeholder
// for non-JSON values.

                length = value.length;
                for (i = 0; i < length; i += 1) {
                    partial[i] = str(i, value) || 'null';
                }

// Join all of the elements together, separated with commas, and wrap them in
// brackets.

                v = partial.length === 0 ? '[]' :
                    gap ? '[\n' + gap +
                            partial.join(',\n' + gap) + '\n' +
                                mind + ']' :
                          '[' + partial.join(',') + ']';
                gap = mind;
                return v;
            }

// If the replacer is an array, use it to select the members to be stringified.

            if (rep && typeof rep === 'object') {
                length = rep.length;
                for (i = 0; i < length; i += 1) {
                    k = rep[i];
                    if (typeof k === 'string') {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            } else {

// Otherwise, iterate through all of the keys in the object.

                for (k in value) {
                    if (Object.hasOwnProperty.call(value, k)) {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            }

// Join all of the member texts together, separated with commas,
// and wrap them in braces.

            v = partial.length === 0 ? '{}' :
                gap ? '{\n' + gap + partial.join(',\n' + gap) + '\n' +
                        mind + '}' : '{' + partial.join(',') + '}';
            gap = mind;
            return v;
        }
    }

// If the JSON object does not yet have a stringify method, give it one.

    if (typeof JSON.stringify !== 'function') {
        JSON.stringify = function (value, replacer, space) {

// The stringify method takes a value and an optional replacer, and an optional
// space parameter, and returns a JSON text. The replacer can be a function
// that can replace values, or an array of strings that will select the keys.
// A default replacer method can be provided. Use of the space parameter can
// produce text that is more easily readable.

            var i;
            gap = '';
            indent = '';

// If the space parameter is a number, make an indent string containing that
// many spaces.

            if (typeof space === 'number') {
                for (i = 0; i < space; i += 1) {
                    indent += ' ';
                }

// If the space parameter is a string, it will be used as the indent string.

            } else if (typeof space === 'string') {
                indent = space;
            }

// If there is a replacer, it must be a function or an array.
// Otherwise, throw an error.

            rep = replacer;
            if (replacer && typeof replacer !== 'function' &&
                    (typeof replacer !== 'object' ||
                     typeof replacer.length !== 'number')) {
                throw new Error('JSON.stringify');
            }

// Make a fake root object containing our value under the key of ''.
// Return the result of stringifying the value.

            return str('', {'': value});
        };
    }


// If the JSON object does not yet have a parse method, give it one.

    if (typeof JSON.parse !== 'function') {
        JSON.parse = function (text, reviver) {

// The parse method takes a text and an optional reviver function, and returns
// a JavaScript value if the text is a valid JSON text.

            var j;

            function walk(holder, key) {

// The walk method is used to recursively walk the resulting structure so
// that modifications can be made.

                var k, v, value = holder[key];
                if (value && typeof value === 'object') {
                    for (k in value) {
                        if (Object.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v;
                            } else {
                                delete value[k];
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value);
            }


// Parsing happens in four stages. In the first stage, we replace certain
// Unicode characters with escape sequences. JavaScript handles many characters
// incorrectly, either silently deleting them, or treating them as line endings.

            cx.lastIndex = 0;
            if (cx.test(text)) {
                text = text.replace(cx, function (a) {
                    return '\\u' +
                        ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                });
            }

// In the second stage, we run the text against regular expressions that look
// for non-JSON patterns. We are especially concerned with '()' and 'new'
// because they can cause invocation, and '=' because it can cause mutation.
// But just to be safe, we want to reject all unexpected forms.

// We split the second stage into 4 regexp operations in order to work around
// crippling inefficiencies in IE's and Safari's regexp engines. First we
// replace the JSON backslash pairs with '@' (a non-JSON character). Second, we
// replace all simple value tokens with ']' characters. Third, we delete all
// open brackets that follow a colon or comma or that begin the text. Finally,
// we look to see that the remaining characters are only whitespace or ']' or
// ',' or ':' or '{' or '}'. If that is so, then the text is safe for eval.

            if (/^[\],:{}\s]*$/.
test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@').
replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

// In the third stage we use the eval function to compile the text into a
// JavaScript structure. The '{' operator is subject to a syntactic ambiguity
// in JavaScript: it can begin a block or an object literal. We wrap the text
// in parens to eliminate the ambiguity.

                j = eval('(' + text + ')');

// In the optional fourth stage, we recursively walk the new structure, passing
// each name/value pair to a reviver function for possible transformation.

                return typeof reviver === 'function' ?
                    walk({'': j}, '') : j;
            }

// If the text is not JSON parseable, then a SyntaxError is thrown.

            throw new SyntaxError('JSON.parse');
        };
    }
})();

//////////////////////////////////////////////////////////////////
//  CONCAT : RPC-DEPENCIES.JS
//////////////////////////////////////////////////////////////////
/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

/**
 * @fileoverview External functions used by the OpenSocial RPC code.  This file
 *               is for use by OpenAjax only.
 */

    //---   from core.util/util.js   ---//

/**
 * @static
 * @class Provides general-purpose utility functions.
 * @name gadgets.util
 */

OpenAjax.gadgets.util = function() {
  /**
   * Parses URL parameters into an object.
   * @param {string} url - the url parameters to parse
   * @return {Array.<string>} The parameters as an array
   */
  function parseUrlParams(url) {
    // Get settings from url, 'hash' takes precedence over 'search' component
    // don't use document.location.hash due to browser differences.
    var query;
    var queryIdx = url.indexOf("?");
    var hashIdx = url.indexOf("#");
    if (hashIdx === -1) {
      query = url.substr(queryIdx + 1);
    } else {
      // essentially replaces "#" with "&"
      query = [url.substr(queryIdx + 1, hashIdx - queryIdx - 1), "&",
               url.substr(hashIdx + 1)].join("");
    }
    return query.split("&");
  }

  var parameters = null;
  var onLoadHandlers = [];

  return /** @scope gadgets.util */ {

    /**
     * Gets the URL parameters.
     *
     * @param {string=} opt_url Optional URL whose parameters to parse.
     *                         Defaults to window's current URL.
     * @return {Object} Parameters passed into the query string
     * @member gadgets.util
     * @private Implementation detail.
     */
    getUrlParameters : function (opt_url) {
      if (parameters !== null && typeof opt_url === "undefined") {
        // "parameters" is a cache of current window params only.
        return parameters;
      }
      var parsed = {};
      var pairs = parseUrlParams(opt_url || document.location.href);
      var unesc = window.decodeURIComponent ? decodeURIComponent : unescape;
      for (var i = 0, j = pairs.length; i < j; ++i) {
        var pos = pairs[i].indexOf('=');
        if (pos === -1) {
          continue;
        }
        var argName = pairs[i].substring(0, pos);
        var value = pairs[i].substring(pos + 1);
        // difference to IG_Prefs, is that args doesn't replace spaces in
        // argname. Unclear on if it should do:
        // argname = argname.replace(/\+/g, " ");
        value = value.replace(/\+/g, " ");
        parsed[argName] = unesc(value);
      }
      if (typeof opt_url === "undefined") {
        // Cache current-window params in parameters var.
        parameters = parsed;
      }
      return parsed;
    },

    /**
     * Registers an onload handler.
     * @param {function()} callback The handler to run
     *
     * @member gadgets.util
     */
    registerOnLoadHandler : function (callback) {
      onLoadHandlers.push(callback);
    },

    /**
     * Runs all functions registered via registerOnLoadHandler.
     * @private Only to be used by the container, not gadgets.
     */
    runOnLoadHandlers : function () {
      for (var i = 0, j = onLoadHandlers.length; i < j; ++i) {
        onLoadHandlers[i]();
      }
    },

    /**
     * Attach an event listener to given DOM element
     * 
     * @param {object} elem  DOM element on which to attach event.
     * @param {string} eventName  Event type to listen for.
     * @param {function} callback  Invoked when specified event occurs.
     * @param {boolean} useCapture  If true, initiates capture.
     */
    'attachBrowserEvent': function(elem, eventName, callback, useCapture) {
      if (elem.addEventListener) {
        elem.addEventListener(eventName, callback, useCapture);
      } else if (elem.attachEvent) {
        elem.attachEvent('on' + eventName, callback);
      }
    },

    /**
     * Remove event listener
     * 
     * @param {object} elem  DOM element from which to remove event.
     * @param {string} eventName  Event type to remove.
     * @param {function} callback  Listener to remove.
     * @param {boolean} useCapture  Specifies whether listener being removed was added with
     *                              capture enabled.
     */
    'removeBrowserEvent': function(elem, eventName, callback, useCapture) {
      if (elem.removeEventListener) {
        elem.removeEventListener(eventName, callback, useCapture);
      } else if (elem.detachEvent){
        elem.detachEvent('on' + eventName, callback);
      }
    }
  };
}();
// Initialize url parameters so that hash data is pulled in before it can be
// altered by a click.
OpenAjax.gadgets.util.getUrlParameters();


    //---   from core.json/json.js   ---//

OpenAjax.gadgets.json = OpenAjax.gadgets.json || {};
if ( ! OpenAjax.gadgets.json.stringify ) {
  OpenAjax.gadgets.json = {
    parse: function(str) {
      try {
        return window.JSON.parse(str);
      } catch (e) {
        return false;
      }
    },
    stringify: function(obj) {
      try {
        return window.JSON.stringify(obj);
      } catch (e) {
        return null;
      }
    }
  };
}


    //---   from core.log/log.js   ---//

/**
 * Log an informational message
 */
OpenAjax.gadgets.log = function(message) {
  OpenAjax.gadgets.log.logAtLevel(OpenAjax.gadgets.log.INFO, message);
};

 
/**
 * Log a warning
 */
OpenAjax.gadgets.warn = function(message) {
  OpenAjax.gadgets.log.logAtLevel(OpenAjax.gadgets.log.WARNING, message);
};

/**
 * Log an error
 */
OpenAjax.gadgets.error = function(message) {
  OpenAjax.gadgets.log.logAtLevel(OpenAjax.gadgets.log.ERROR, message);
};

/**
 * Sets the log level threshold.
 * @param {Number} logLevel - New log level threshold.
 * @static
 */
OpenAjax.gadgets.setLogLevel = function(logLevel) {
  OpenAjax.gadgets.log.logLevelThreshold_ = logLevel;
};

/**
 * Logs a log message if output console is available, and log threshold is met.
 * @param {Number} level - the level to log with. Optional, defaults to
 * @param {Object} message - The message to log
 * gadgets.log.INFO.
 * @static
 */
OpenAjax.gadgets.log.logAtLevel = function(level, message) {
  if (level < OpenAjax.gadgets.log.logLevelThreshold_ || !OpenAjax.gadgets.log._console) {
    return;
  }

  var logger;
  var gadgetconsole = OpenAjax.gadgets.log._console;

  if (level == OpenAjax.gadgets.log.WARNING && gadgetconsole.warn) {
    gadgetconsole.warn(message)
  } else if (level == OpenAjax.gadgets.log.ERROR && gadgetconsole.error) {
    gadgetconsole.error(message);
  } else if (gadgetconsole.log) {
    gadgetconsole.log(message);
  }
};

/**
 * Log level for informational logging.
 * @static
 */
OpenAjax.gadgets.log.INFO = 1;

/**
 * Log level for warning logging.
 * @static
 */
OpenAjax.gadgets.log.WARNING = 2;

/**
 * Log level for error logging.
 * @static
 */
OpenAjax.gadgets.log.ERROR = 3;

/**
 * Log level for no logging
 * @static
 */
OpenAjax.gadgets.log.NONE = 4;

/**
 * Current log level threshold.
 * @type Number
 * @private
 * @static
 */
OpenAjax.gadgets.log.logLevelThreshold_ = OpenAjax.gadgets.log.INFO;

/**
 * Console to log to
 * @private
 * @static
 */
OpenAjax.gadgets.log._console = window.console ? window.console :
                       window.opera   ? window.opera.postError : undefined;


////////////////////////////////////////////////////////////////////////////////////////////////////
//  onload handler compatibility code
////////////////////////////////////////////////////////////////////////////////////////////////////

(function() {
// XXX What if this script file (iframe.js) is dynamically loaded after the page has loaded.
if ( ! window.__isgadget ) {
    var loaded = false;
    function onload() {
        if ( ! loaded ) {
            loaded = true;
            // This is necessary for the RMR and FE transports.
            OpenAjax.gadgets.util.runOnLoadHandlers();
            // Since the page has now loaded, change registerOnLoadHandler() to immediately fire
            // callback.
            OpenAjax.gadgets.util.registerOnLoadHandler = function( callback ) {
                setTimeout( callback, 0 );
            };
            // prevent IE memory leak
            if ( window.detachEvent ) {
                window.detachEvent( "onload", onload );
            }
        }
    }
    if ( window.addEventListener ) {
        document.addEventListener( "DOMContentLoaded", onload, false );
        window.addEventListener( "load", onload, false );
    } else if ( window.attachEvent ) {
        // XXX use doScroll trick?
        window.attachEvent( "onload", onload );
    }
}
})();

//////////////////////////////////////////////////////////////////
//  CONCAT : FE-TRANSPORT.JS
//////////////////////////////////////////////////////////////////
/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements. See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership. The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 */

OpenAjax.gadgets.rpctx = OpenAjax.gadgets.rpctx || {};

/*
 * For Gecko-based browsers, the security model allows a child to call a
 * function on the frameElement of the iframe, even if the child is in
 * a different domain. This method is dubbed "frameElement" (fe).
 *
 * The ability to add and call such functions on the frameElement allows
 * a bidirectional channel to be setup via the adding of simple function
 * references on the frameElement object itself. In this implementation,
 * when the container sets up the authentication information for that gadget
 * (by calling setAuth(...)) it as well adds a special function on the
 * gadget's iframe. This function can then be used by the gadget to send
 * messages to the container. In turn, when the gadget tries to send a
 * message, it checks to see if this function has its own function stored
 * that can be used by the container to call the gadget. If not, the
 * function is created and subsequently used by the container.
 * Note that as a result, FE can only be used by a container to call a
 * particular gadget *after* that gadget has called the container at
 * least once via FE.
 *
 *   fe: Gecko-specific frameElement trick.
 *      - Firefox 1+
 */
if (!OpenAjax.gadgets.rpctx.frameElement) {  // make lib resilient to double-inclusion

OpenAjax.gadgets.rpctx.frameElement = function() {
  // Consts for FrameElement.
  var FE_G2C_CHANNEL = '__g2c_rpc';
  var FE_C2G_CHANNEL = '__c2g_rpc';
  var process;
  var ready;

  function callFrameElement(targetId, from, rpc) {
    try {
      if (from !== '..') {
        // Call from gadget to the container.
        var fe = window.frameElement;

        if (typeof fe[FE_G2C_CHANNEL] === 'function') {
          // Complete the setup of the FE channel if need be.
          if (typeof fe[FE_G2C_CHANNEL][FE_C2G_CHANNEL] !== 'function') {
            fe[FE_G2C_CHANNEL][FE_C2G_CHANNEL] = function(args) {
              process(OpenAjax.gadgets.json.parse(args));
            };
          }

          // Conduct the RPC call.
          fe[FE_G2C_CHANNEL](OpenAjax.gadgets.json.stringify(rpc));
          return;
        }
      } else {
        // Call from container to gadget[targetId].
        var frame = document.getElementById(targetId);

        if (typeof frame[FE_G2C_CHANNEL] === 'function' &&
            typeof frame[FE_G2C_CHANNEL][FE_C2G_CHANNEL] === 'function') {

          // Conduct the RPC call.
          frame[FE_G2C_CHANNEL][FE_C2G_CHANNEL](OpenAjax.gadgets.json.stringify(rpc));
          return;
        }
      }
    } catch (e) {
    }
    return true;
  }

  return {
    getCode: function() {
      return 'fe';
    },

    isParentVerifiable: function() {
      return false;
    },
  
    init: function(processFn, readyFn) {
      // No global setup.
      process = processFn;
      ready = readyFn;
      return true;
    },

    setup: function(receiverId, token) {
      // Indicate OK to call to container. This will be true
      // by the end of this method.
      if (receiverId !== '..') {
        try {
          var frame = document.getElementById(receiverId);
          frame[FE_G2C_CHANNEL] = function(args) {
            process(OpenAjax.gadgets.json.parse(args));
          };
        } catch (e) {
          return false;
        }
      }
      if (receiverId === '..') {
        ready('..', true);
        var ackFn = function() {
          window.setTimeout(function() {
            OpenAjax.gadgets.rpc.call(receiverId, OpenAjax.gadgets.rpc.ACK);
          }, 500);
        };
        // Setup to container always happens before onload.
        // If it didn't, the correct fix would be in gadgets.util.
        OpenAjax.gadgets.util.registerOnLoadHandler(ackFn);
      }
      return true;
    },

    call: function(targetId, from, rpc) {
      callFrameElement(targetId, from, rpc);
    } 

  };
}();

} // !end of double-inclusion guard

//////////////////////////////////////////////////////////////////
//  CONCAT : IFPC-TRANSPORT.JS
//////////////////////////////////////////////////////////////////
/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements. See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership. The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 */

OpenAjax.gadgets.rpctx = OpenAjax.gadgets.rpctx || {};

/*
 * For all others, we have a fallback mechanism known as "ifpc". IFPC
 * exploits the fact that while same-origin policy prohibits a frame from
 * accessing members on a window not in the same domain, that frame can,
 * however, navigate the window heirarchy (via parent). This is exploited by
 * having a page on domain A that wants to talk to domain B create an iframe
 * on domain B pointing to a special relay file and with a message encoded
 * after the hash (#). This relay, in turn, finds the page on domain B, and
 * can call a receipt function with the message given to it. The relay URL
 * used by each caller is set via the gadgets.rpc.setRelayUrl(..) and
 * *must* be called before the call method is used.
 *
 *   ifpc: Iframe-based method, utilizing a relay page, to send a message.
 *      - No known major browsers still use this method, but it remains
 *        useful as a catch-all fallback for the time being.
 */
if (!OpenAjax.gadgets.rpctx.ifpc) {  // make lib resilient to double-inclusion

OpenAjax.gadgets.rpctx.ifpc = function() {
  var iframePool = [];
  var callId = 0;
  var ready;

  var URL_LIMIT = 2000;
  var messagesIn = {};

  /**
   * Encodes arguments for the legacy IFPC wire format.
   *
   * @param {Object} args
   * @return {string} the encoded args
   */
  function encodeLegacyData(args) {
    var argsEscaped = [];
    for(var i = 0, j = args.length; i < j; ++i) {
      argsEscaped.push(encodeURIComponent(OpenAjax.gadgets.json.stringify(args[i])));
    }
    return argsEscaped.join('&');
  }

  /**
   * Helper function to emit an invisible IFrame.
   * @param {string} src SRC attribute of the IFrame to emit.
   * @private
   */
  function emitInvisibleIframe(src) {
    var iframe;
    // Recycle IFrames
    for (var i = iframePool.length - 1; i >=0; --i) {
      var ifr = iframePool[i];
      try {
        if (ifr && (ifr.recyclable || ifr.readyState === 'complete')) {
          ifr.parentNode.removeChild(ifr);
          if (window.ActiveXObject) {
            // For MSIE, delete any iframes that are no longer being used. MSIE
            // cannot reuse the IFRAME because a navigational click sound will
            // be triggered when we set the SRC attribute.
            // Other browsers scan the pool for a free iframe to reuse.
            iframePool[i] = ifr = null;
            iframePool.splice(i, 1);
          } else {
            ifr.recyclable = false;
            iframe = ifr;
            break;
          }
        }
      } catch (e) {
        // Ignore; IE7 throws an exception when trying to read readyState and
        // readyState isn't set.
      }
    }
    // Create IFrame if necessary
    if (!iframe) {
      iframe = document.createElement('iframe');
      iframe.style.border = iframe.style.width = iframe.style.height = '0px';
      iframe.style.visibility = 'hidden';
      iframe.style.position = 'absolute';
      iframe.onload = function() { this.recyclable = true; };
      iframePool.push(iframe);
    }
    iframe.src = src;
    window.setTimeout(function() { document.body.appendChild(iframe); }, 0);
  }

  function isMessageComplete(arr, total) {
    for (var i = total - 1; i >= 0; --i) {
      if (typeof arr[i] === 'undefined') {
        return false;
      }
    }
    return true;
  }

  return {
    getCode: function() {
      return 'ifpc';
    },

    isParentVerifiable: function() {
      return true;
    },

    init: function(processFn, readyFn) {
      // No global setup.
      ready = readyFn;
      ready('..', true);  // Ready immediately.
      return true;
    },

    setup: function(receiverId, token) {
      // Indicate readiness to send to receiver.
      ready(receiverId, true);
      return true;
    },

    call: function(targetId, from, rpc) {
      // Retrieve the relay file used by IFPC. Note that
      // this must be set before the call, and so we conduct
      // an extra check to ensure it is not blank.
      var relay = OpenAjax.gadgets.rpc.getRelayUrl(targetId);
      ++callId;

      if (!relay) {
        OpenAjax.gadgets.warn('No relay file assigned for IFPC');
        return;
      }

      // The RPC mechanism supports two formats for IFPC (legacy and current).
      var src = null,
          queueOut = [];
      if (rpc.l) {
        // Use legacy protocol.
        // Format: #iframe_id & callId & num_packets & packet_num & block_of_data
        var callArgs = rpc.a;
        src = [relay, '#', encodeLegacyData([from, callId, 1, 0,
               encodeLegacyData([from, rpc.s, '', '', from].concat(
                 callArgs))])].join('');
        queueOut.push(src);
      } else {
        // Format: #targetId & sourceId@callId & packetNum & packetId & packetData
        src = [relay, '#', targetId, '&', from, '@', callId, '&'].join('');
        var message = encodeURIComponent(OpenAjax.gadgets.json.stringify(rpc)),
            payloadLength = URL_LIMIT - src.length,
            numPackets = Math.ceil(message.length/payloadLength),
            packetIdx = 0,
            part;
        while (message.length > 0) {
          part = message.substring(0, payloadLength);
          message = message.substring(payloadLength);
          queueOut.push([src, numPackets, '&', packetIdx, '&', part].join(''));
          packetIdx += 1;
        }
      }

      // Conduct the IFPC call by creating the Iframe with
      // the relay URL and appended message.
      do {
        emitInvisibleIframe(queueOut.shift());
      } while(queueOut.length > 0);
      return true;
    },

    /** Process message from invisible iframe, merging message parts if necessary. */
    _receiveMessage: function(fragment, process) {
      var from = fragment[1],   // in the form of "<from>@<callid>"
          numPackets = parseInt(fragment[2], 10),
          packetIdx = parseInt(fragment[3], 10),
          payload = fragment[fragment.length - 1],
          completed = numPackets === 1;

      // if message is multi-part, store parts in the proper order
      if (numPackets > 1) {
        if (!messagesIn[from]) {
          messagesIn[from] = [];
        }
        messagesIn[from][packetIdx] = payload;
        // check if all parts have been sent
        if (isMessageComplete(messagesIn[from], numPackets)) {
          payload = messagesIn[from].join('');
          delete messagesIn[from];
          completed = true;
        }
      }

      // complete message sent
      if (completed) {
        process(OpenAjax.gadgets.json.parse(decodeURIComponent(payload)));
      }
    }
  };
}();

} // !end of double inclusion guard

//////////////////////////////////////////////////////////////////
//  CONCAT : RMR-TRANSPORT.JS
//////////////////////////////////////////////////////////////////
/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements. See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership. The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 */

OpenAjax.gadgets.rpctx = OpenAjax.gadgets.rpctx || {};

/*
 * For older WebKit-based browsers, the security model does not allow for any
 * known "native" hacks for conducting cross browser communication. However,
 * a variation of the IFPC (see below) can be used, entitled "RMR". RMR is
 * a technique that uses the resize event of the iframe to indicate that a
 * message was sent (instead of the much slower/performance heavy polling
 * technique used when a defined relay page is not avaliable). Simply put,
 * RMR uses the same "pass the message by the URL hash" trick that IFPC
 * uses to send a message, but instead of having an active relay page that
 * runs a piece of code when it is loaded, RMR merely changes the URL
 * of the relay page (which does not even have to exist on the domain)
 * and then notifies the other party by resizing the relay iframe. RMR
 * exploits the fact that iframes in the dom of page A can be resized
 * by page A while the onresize event will be fired in the DOM of page B,
 * thus providing a single bit channel indicating "message sent to you".
 * This method has the added benefit that the relay need not be active,
 * nor even exist: a 404 suffices just as well.
 *
 *   rmr: WebKit-specific resizing trick.
 *      - Safari 2+
 *      - Chrome 1
 */
if (!OpenAjax.gadgets.rpctx.rmr) {  // make lib resilient to double-inclusion

OpenAjax.gadgets.rpctx.rmr = function() {
  // Consts for RMR, including time in ms RMR uses to poll for
  // its relay frame to be created, and the max # of polls it does.
  var RMR_SEARCH_TIMEOUT = 500;
  var RMR_MAX_POLLS = 10;

  // JavaScript references to the channel objects used by RMR.
  // Gadgets will have but a single channel under
  // rmr_channels['..'] while containers will have a channel
  // per gadget stored under the gadget's ID.
  var rmr_channels = {};
  
  var process;
  var ready;

  /**
   * Append an RMR relay frame to the document. This allows the receiver
   * to start receiving messages.
   *
   * @param {Node} channelFrame Relay frame to add to the DOM body.
   * @param {string} relayUri Base URI for the frame.
   * @param {string} data to pass along to the frame.
   * @param {string=} opt_frameId ID of frame for which relay is being appended (optional).
   */
  function appendRmrFrame(channelFrame, relayUri, data, opt_frameId) {
    var appendFn = function() {
      // Append the iframe.
      document.body.appendChild(channelFrame);

      // Set the src of the iframe to 'about:blank' first and then set it
      // to the relay URI. This prevents the iframe from maintaining a src
      // to the 'old' relay URI if the page is returned to from another.
      // In other words, this fixes the bfcache issue that causes the iframe's
      // src property to not be updated despite us assigning it a new value here.
      channelFrame.src = 'about:blank';
      if (opt_frameId) {
        // Process the initial sent payload (typically sent by container to
        // child/gadget) only when the relay frame has finished loading. We
        // do this to ensure that, in processRmrData(...), the ACK sent due
        // to processing can actually be sent. Before this time, the frame's
        // contentWindow is null, making it impossible to do so.
        channelFrame.onload = function() {
          processRmrData(opt_frameId);
        };
      }
      channelFrame.src = relayUri + '#' + data;
    };

    if (document.body) {
      appendFn();
    } else {
      // Common gadget case: attaching header during in-gadget handshake,
      // when we may still be in script in head. Attach onload.
      OpenAjax.gadgets.util.registerOnLoadHandler(function() { appendFn(); });
    }
  }

  /**
   * Sets up the RMR transport frame for the given frameId. For gadgets
   * calling containers, the frameId should be '..'.
   *
   * @param {string} frameId The ID of the frame.
   */
  function setupRmr(frameId) {
    if (typeof rmr_channels[frameId] === "object") {
      // Sanity check. Already done.
      return;
    }

    var channelFrame = document.createElement('iframe');
    var frameStyle = channelFrame.style;
    frameStyle.position = 'absolute';
    frameStyle.top = '0px';
    frameStyle.border = '0';
    frameStyle.opacity = '0';

    // The width here is important as RMR
    // makes use of the resize handler for the frame.
    // Do not modify unless you test thoroughly!
    frameStyle.width = '10px';
    frameStyle.height = '1px';
    channelFrame.id = 'rmrtransport-' + frameId;
    channelFrame.name = channelFrame.id;

    // Use the explicitly set relay, if one exists. Otherwise,
    // Construct one using the parent parameter plus robots.txt
    // as a synthetic relay. This works since browsers using RMR
    // treat 404s as legitimate for the purposes of cross domain
    // communication.
    var relayUri = OpenAjax.gadgets.rpc.getRelayUrl(frameId);
    if (!relayUri) {
      relayUri =
          OpenAjax.gadgets.rpc.getOrigin(OpenAjax.gadgets.util.getUrlParameters()["parent"]) +
          '/robots.txt';
    }

    rmr_channels[frameId] = {
      frame: channelFrame,
      receiveWindow: null,
      relayUri: relayUri,
      searchCounter : 0,
      width: 10,

      // Waiting means "waiting for acknowledgement to be received."
      // Acknowledgement always comes as a special ACK
      // message having been received. This message is received
      // during handshake in different ways by the container and
      // gadget, and by normal RMR message passing once the handshake
      // is complete.
      waiting: true,
      queue: [],

      // Number of non-ACK messages that have been sent to the recipient
      // and have been acknowledged.
      sendId: 0,

      // Number of messages received and processed from the sender.
      // This is the number that accompanies every ACK to tell the
      // sender to clear its queue.
      recvId: 0
    };

    if (frameId !== '..') {
      // Container always appends a relay to the gadget, before
      // the gadget appends its own relay back to container. The
      // gadget, in the meantime, refuses to attach the container
      // relay until it finds this one. Thus, the container knows
      // for certain that gadget to container communication is set
      // up by the time it finds its own relay. In addition to
      // establishing a reliable handshake protocol, this also
      // makes it possible for the gadget to send an initial batch
      // of messages to the container ASAP.
      appendRmrFrame(channelFrame, relayUri, getRmrData(frameId));
    }
     
    // Start searching for our own frame on the other page.
    conductRmrSearch(frameId);
  }

  /**
   * Searches for a relay frame, created by the sender referenced by
   * frameId, with which this context receives messages. Once
   * found with proper permissions, attaches a resize handler which
   * signals messages to be sent.
   *
   * @param {string} frameId Frame ID of the prospective sender.
   */
  function conductRmrSearch(frameId) {
    var channelWindow = null;

    // Increment the search counter.
    rmr_channels[frameId].searchCounter++;

    try {
      var targetWin = OpenAjax.gadgets.rpc._getTargetWin(frameId);
      if (frameId === '..') {
        // We are a gadget.
        channelWindow = targetWin.frames['rmrtransport-' + OpenAjax.gadgets.rpc.RPC_ID];
      } else {
        // We are a container.
        channelWindow = targetWin.frames['rmrtransport-..'];
      }
    } catch (e) {
      // Just in case; may happen when relay is set to about:blank or unset.
      // Catching exceptions here ensures that the timeout to continue the
      // search below continues to work.
    }

    var status = false;

    if (channelWindow) {
      // We have a valid reference to "our" RMR transport frame.
      // Register the proper event handlers.
      status = registerRmrChannel(frameId, channelWindow);
    }

    if (!status) {
      // Not found yet. Continue searching, but only if the counter
      // has not reached the threshold.
      if (rmr_channels[frameId].searchCounter > RMR_MAX_POLLS) {
        // If we reach this point, then RMR has failed and we
        // fall back to IFPC.
        return;
      }

      window.setTimeout(function() {
        conductRmrSearch(frameId);
      }, RMR_SEARCH_TIMEOUT);
    }
  }

  /**
   * Attempts to conduct an RPC call to the specified
   * target with the specified data via the RMR
   * method. If this method fails, the system attempts again
   * using the known default of IFPC.
   *
   * @param {string} targetId Module Id of the RPC service provider.
   * @param {string} serviceName Name of the service to call.
   * @param {string} from Module Id of the calling provider.
   * @param {Object} rpc The RPC data for this call.
   */
  function callRmr(targetId, serviceName, from, rpc) {
    var handler = null;

    if (from !== '..') {
      // Call from gadget to the container.
      handler = rmr_channels['..'];
    } else {
      // Call from container to the gadget.
      handler = rmr_channels[targetId];
    }

    if (handler) {
      // Queue the current message if not ACK.
      // ACK is always sent through getRmrData(...).
      if (serviceName !== OpenAjax.gadgets.rpc.ACK) {
        handler.queue.push(rpc);
      }

      if (handler.waiting ||
          (handler.queue.length === 0 &&
           !(serviceName === OpenAjax.gadgets.rpc.ACK && rpc && rpc.ackAlone === true))) {
        // If we are awaiting a response from any previously-sent messages,
        // or if we don't have anything new to send, just return.
        // Note that we don't short-return if we're ACKing just-received
        // messages.
        return true;
      }

      if (handler.queue.length > 0) {
        handler.waiting = true;
      }

      var url = handler.relayUri + "#" + getRmrData(targetId);

      try {
        // Update the URL with the message.
        handler.frame.contentWindow.location = url;

        // Resize the frame.
        var newWidth = handler.width == 10 ? 20 : 10;
        handler.frame.style.width = newWidth + 'px';
        handler.width = newWidth;

        // Done!
      } catch (e) {
        // Something about location-setting or resizing failed.
        // This should never happen, but if it does, fall back to
        // the default transport.
        return false;
      }
    }

    return true;
  }

  /**
   * Returns as a string the data to be appended to an RMR relay frame,
   * constructed from the current request queue plus an ACK message indicating
   * the currently latest-processed message ID.
   *
   * @param {string} toFrameId Frame whose sendable queued data to retrieve.
   */
  function getRmrData(toFrameId) {
    var channel = rmr_channels[toFrameId];
    var rmrData = {id: channel.sendId};
    if (channel) {
      rmrData.d = Array.prototype.slice.call(channel.queue, 0);
      rmrData.d.push({s:OpenAjax.gadgets.rpc.ACK, id:channel.recvId});
    }
    return OpenAjax.gadgets.json.stringify(rmrData);
  }

  /**
   * Retrieve data from the channel keyed by the given frameId,
   * processing it as a batch. All processed data is assumed to have been
   * generated by getRmrData(...), pairing that method with this.
   *
   * @param {string} fromFrameId Frame from which data is being retrieved.
   */
  function processRmrData(fromFrameId) {
    var channel = rmr_channels[fromFrameId];
    var data = channel.receiveWindow.location.hash.substring(1);

    // Decode the RPC object array.
    var rpcObj = OpenAjax.gadgets.json.parse(decodeURIComponent(data)) || {};
    var rpcArray = rpcObj.d || [];

    var nonAckReceived = false;
    var noLongerWaiting = false;

    var numBypassed = 0;
    var numToBypass = (channel.recvId - rpcObj.id);
    for (var i = 0; i < rpcArray.length; ++i) {
      var rpc = rpcArray[i];

      // If we receive an ACK message, then mark the current
      // handler as no longer waiting and send out the next
      // queued message.
      if (rpc.s === OpenAjax.gadgets.rpc.ACK) {
        // ACK received - whether this came from a handshake or
        // an active call, in either case it indicates readiness to
        // send messages to the from frame.
        ready(fromFrameId, true);

        if (channel.waiting) {
          noLongerWaiting = true;
        }

        channel.waiting = false;
        var newlyAcked = Math.max(0, rpc.id - channel.sendId);
        channel.queue.splice(0, newlyAcked);
        channel.sendId = Math.max(channel.sendId, rpc.id || 0);
        continue;
      }

      // If we get here, we've received > 0 non-ACK messages to
      // process. Indicate this bit for later.
      nonAckReceived = true;

      // Bypass any messages already received.
      if (++numBypassed <= numToBypass) {
        continue;
      }

      ++channel.recvId;
      process(rpc);  // actually dispatch the message
    }

    // Send an ACK indicating that we got/processed the message(s).
    // Do so if we've received a message to process or if we were waiting
    // before but a received ACK has cleared our waiting bit, and we have
    // more messages to send. Performing this operation causes additional
    // messages to be sent.
    if (nonAckReceived ||
        (noLongerWaiting && channel.queue.length > 0)) {
      var from = (fromFrameId === '..') ? OpenAjax.gadgets.rpc.RPC_ID : '..';
      callRmr(fromFrameId, OpenAjax.gadgets.rpc.ACK, from, {ackAlone: nonAckReceived});
    }
  }

  /**
   * Registers the RMR channel handler for the given frameId and associated
   * channel window.
   *
   * @param {string} frameId The ID of the frame for which this channel is being
   *   registered.
   * @param {Object} channelWindow The window of the receive frame for this
   *   channel, if any.
   *
   * @return {boolean} True if the frame was setup successfully, false
   *   otherwise.
   */
  function registerRmrChannel(frameId, channelWindow) {
    var channel = rmr_channels[frameId];

    // Verify that the channel is ready for receiving.
    try {
      var canAccess = false;

      // Check to see if the document is in the window. For Chrome, this
      // will return 'false' if the channelWindow is inaccessible by this
      // piece of JavaScript code, meaning that the URL of the channelWindow's
      // parent iframe has not yet changed from 'about:blank'. We do this
      // check this way because any true *access* on the channelWindow object
      // will raise a security exception, which, despite the try-catch, still
      // gets reported to the debugger (it does not break execution, the try
      // handles that problem, but it is still reported, which is bad form).
      // This check always succeeds in Safari 3.1 regardless of the state of
      // the window.
      canAccess = 'document' in channelWindow;

      if (!canAccess) {
        return false;
      }

      // Check to see if the document is an object. For Safari 3.1, this will
      // return undefined if the page is still inaccessible. Unfortunately, this
      // *will* raise a security issue in the debugger.
      // TODO Find a way around this problem.
      canAccess = typeof channelWindow['document'] == 'object';

      if (!canAccess) {
        return false;
      }

      // Once we get here, we know we can access the document (and anything else)
      // on the window object. Therefore, we check to see if the location is
      // still about:blank (this takes care of the Safari 3.2 case).
      var loc = channelWindow.location.href;

      // Check if this is about:blank for Safari.
      if (loc === 'about:blank') {
        return false;
      }
    } catch (ex) {
      // For some reason, the iframe still points to about:blank. We try
      // again in a bit.
      return false;
    }

    // Save a reference to the receive window.
    channel.receiveWindow = channelWindow;

    // Register the onresize handler.
    function onresize() {
      processRmrData(frameId);
    };

    if (typeof channelWindow.attachEvent === "undefined") {
      channelWindow.onresize = onresize;
    } else {
      channelWindow.attachEvent("onresize", onresize);
    }

    if (frameId === '..') {
      // Gadget to container. Signal to the container that the gadget
      // is ready to receive messages by attaching the g -> c relay.
      // As a nice optimization, pass along any gadget to container
      // queued messages that have backed up since then. ACK is enqueued in
      // getRmrData to ensure that the container's waiting flag is set to false
      // (this happens in the below code run on the container side).
      appendRmrFrame(channel.frame, channel.relayUri, getRmrData(frameId), frameId);
    } else {
      // Process messages that the gadget sent in its initial relay payload.
      // We can do this immediately because the container has already appended
      // and loaded a relay frame that can be used to ACK the messages the gadget
      // sent. In the preceding if-block, however, the processRmrData(...) call
      // must wait. That's because appendRmrFrame may not actually append the
      // frame - in the context of a gadget, this code may be running in the
      // head element, so it cannot be appended to body. As a result, the
      // gadget cannot ACK the container for messages it received.
      processRmrData(frameId);
    }

    return true;
  }

  return {
    getCode: function() {
      return 'rmr';
    },

    isParentVerifiable: function() {
      return true;
    },

    init: function(processFn, readyFn) {
      // No global setup.
      process = processFn;
      ready = readyFn;
      return true;
    },

    setup: function(receiverId, token) {
      try {
        setupRmr(receiverId);
      } catch (e) {
        OpenAjax.gadgets.warn('Caught exception setting up RMR: ' + e);
        return false;
      }
      return true;
    },

    call: function(targetId, from, rpc) {
      return callRmr(targetId, rpc.s, from, rpc);
    }
  };
}();

} // !end of double-inclusion guard

//////////////////////////////////////////////////////////////////
//  CONCAT : WPM-TRANSPORT.JS
//////////////////////////////////////////////////////////////////
/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements. See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership. The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 */

OpenAjax.gadgets.rpctx = OpenAjax.gadgets.rpctx || {};

/**
 * Transport for browsers that support native messaging (various implementations
 * of the HTML5 postMessage method). Officially defined at
 * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html.
 *
 * postMessage is a native implementation of XDC. A page registers that
 * it would like to receive messages by listening the the "message" event
 * on the window (document in DPM) object. In turn, another page can
 * raise that event by calling window.postMessage (document.postMessage
 * in DPM) with a string representing the message and a string
 * indicating on which domain the receiving page must be to receive
 * the message. The target page will then have its "message" event raised
 * if the domain matches and can, in turn, check the origin of the message
 * and process the data contained within.
 *
 *   wpm: postMessage on the window object.
 *      - Internet Explorer 8+
 *      - Safari 4+
 *      - Chrome 2+
 *      - Webkit nightlies
 *      - Firefox 3+
 *      - Opera 9+
 */
if (!OpenAjax.gadgets.rpctx.wpm) {  // make lib resilient to double-inclusion

OpenAjax.gadgets.rpctx.wpm = function() {
  var process, ready;
  var postMessage;
  var pmSync = false;
  var pmEventDomain = false;

  // Some browsers (IE, Opera) have an implementation of postMessage that is
  // synchronous, although HTML5 specifies that it should be asynchronous.  In
  // order to make all browsers behave consistently, we run a small test to detect
  // if postMessage is asynchronous or not.  If not, we wrap calls to postMessage
  // in a setTimeout with a timeout of 0.
  // Also, Opera's "message" event does not have an "origin" property (at least,
  // it doesn't in version 9.64;  presumably, it will in version 10).  If
  // event.origin does not exist, use event.domain.  The other difference is that
  // while event.origin looks like <scheme>://<hostname>:<port>, event.domain
  // consists only of <hostname>.
  //
  function testPostMessage() {
    var hit = false;
    
    function receiveMsg(event) {
      if (event.data == "postmessage.test") {
        hit = true;
        if (typeof event.origin === "undefined") {
          pmEventDomain = true;
        }
      }
    }
    
    OpenAjax.gadgets.util.attachBrowserEvent(window, "message", receiveMsg, false);
    window.postMessage("postmessage.test", "*");
    
    // if 'hit' is true here, then postMessage is synchronous
    if (hit) {
      pmSync = true;
    }
    
    OpenAjax.gadgets.util.removeBrowserEvent(window, "message", receiveMsg, false);
  }

  function onmessage(packet) {
    var rpc = OpenAjax.gadgets.json.parse(packet.data);
    if (!rpc || !rpc.f) {
      return;
    }
    
    // for security, check origin against expected value
    var origRelay = OpenAjax.gadgets.rpc.getRelayUrl(rpc.f) ||
                    OpenAjax.gadgets.util.getUrlParameters()["parent"];
    var origin = OpenAjax.gadgets.rpc.getOrigin(origRelay);
    if (!pmEventDomain ? packet.origin !== origin :
                         packet.domain !== /^.+:\/\/([^:]+).*/.exec( origin )[1]) {
      return;
    }

    process(rpc);
  }

  return {
    getCode: function() {
      return 'wpm';
    },

    isParentVerifiable: function() {
      return true;
    },

    init: function(processFn, readyFn) {
      process = processFn;
      ready = readyFn;

      testPostMessage();
      if (!pmSync) {
        postMessage = function(win, msg, origin) {
          win.postMessage(msg, origin);
        };
      } else {
        postMessage = function(win, msg, origin) {
          window.setTimeout( function() {
            win.postMessage(msg, origin);
          }, 0);
        };
      }
 
      // Set up native postMessage handler.
      OpenAjax.gadgets.util.attachBrowserEvent(window, 'message', onmessage, false);

      ready('..', true);  // Immediately ready to send to parent.
      return true;
    },

    setup: function(receiverId, token, forcesecure) {
      // If we're a gadget, send an ACK message to indicate to container
      // that we're ready to receive messages.
      if (receiverId === '..') {
        if (forcesecure) {
          OpenAjax.gadgets.rpc._createRelayIframe(token);
        } else {
          OpenAjax.gadgets.rpc.call(receiverId, OpenAjax.gadgets.rpc.ACK);
        }
      }
      return true;
    },

    call: function(targetId, from, rpc) {
      var targetWin = OpenAjax.gadgets.rpc._getTargetWin(targetId);
      // targetOrigin = canonicalized relay URL
      var origRelay = OpenAjax.gadgets.rpc.getRelayUrl(targetId) ||
                      OpenAjax.gadgets.util.getUrlParameters()["parent"];
      var origin = OpenAjax.gadgets.rpc.getOrigin(origRelay);
      if (origin) {
        postMessage(targetWin, OpenAjax.gadgets.json.stringify(rpc), origin);
      } else {
        OpenAjax.gadgets.error("No relay set (used as window.postMessage targetOrigin)" +
            ", cannot send cross-domain message");
      }
      return true;
    },

    relayOnload: function(receiverId, data) {
      ready(receiverId, true);
    }
  };
}();

} // !end of double-inclusion guard

//////////////////////////////////////////////////////////////////
//  CONCAT : RPC.JS
//////////////////////////////////////////////////////////////////

/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements. See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership. The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 */

/**
 * @fileoverview Remote procedure call library for gadget-to-container,
 * container-to-gadget, and gadget-to-gadget (thru container) communication.
 */

/**
 * gadgets.rpc Transports
 *
 * All transports are stored in object gadgets.rpctx, and are provided
 * to the core gadgets.rpc library by various build rules.
 * 
 * Transports used by core gadgets.rpc code to actually pass messages.
 * each transport implements the same interface exposing hooks that
 * the core library calls at strategic points to set up and use
 * the transport.
 *
 * The methods each transport must implement are:
 * + getCode(): returns a string identifying the transport. For debugging.
 * + isParentVerifiable(): indicates (via boolean) whether the method
 *     has the property that its relay URL verifies for certain the
 *     receiver's protocol://host:port.
 * + init(processFn, readyFn): Performs any global initialization needed. Called
 *     before any other gadgets.rpc methods are invoked. processFn is
 *     the function in gadgets.rpc used to process an rpc packet. readyFn is
 *     a function that must be called when the transport is ready to send
 *     and receive messages bidirectionally. Returns
 *     true if successful, false otherwise.
 * + setup(receiverId, token): Performs per-receiver initialization, if any.
 *     receiverId will be '..' for gadget-to-container. Returns true if
 *     successful, false otherwise.
 * + call(targetId, from, rpc): Invoked to send an actual
 *     message to the given targetId, with the given serviceName, from
 *     the sender identified by 'from'. Payload is an rpc packet. Returns
 *     true if successful, false otherwise.
 */

if (!OpenAjax.gadgets.rpc) { // make lib resilient to double-inclusion

/**
 * @static
 * @namespace Provides operations for making rpc calls.
 * @name gadgets.rpc
 */

OpenAjax.gadgets.rpc = function() {
  /** 
   * @const
   * @private
   */
  var CALLBACK_NAME = '__cb';

  /** 
   * @const
   * @private
   */
  var DEFAULT_NAME = '';

  /** Exported constant, for use by transports only.
   * @const
   * @type {string}
   * @member gadgets.rpc
   */
  var ACK = '__ack';

  /** 
   * Timeout and number of attempts made to setup a transport receiver.
   * @const
   * @private
   */
  var SETUP_FRAME_TIMEOUT = 500;

  /** 
   * @const
   * @private
   */
  var SETUP_FRAME_MAX_TRIES = 10;

  var services = {};
  var relayUrl = {};
  var useLegacyProtocol = {};
  var authToken = {};
  var callId = 0;
  var callbacks = {};
  var setup = {};
  var sameDomain = {};
  var params = {};
  var receiverTx = {};
  var earlyRpcQueue = {};

  // isGadget =~ isChild for the purposes of rpc (used only in setup).
  var isChild = (window.top !== window.self);

  // Set the current rpc ID from window.name immediately, to prevent
  // shadowing of window.name by a "var name" declaration, or similar.
  var rpcId = window.name;

  var securityCallback = function() {};
  var LOAD_TIMEOUT = 0;
  var FRAME_PHISH = 1;
  var FORGED_MSG = 2;

  // Fallback transport is simply a dummy impl that emits no errors
  // and logs info on calls it receives, to avoid undesired side-effects
  // from falling back to IFPC or some other transport.
  var fallbackTransport = (function() {
    function logFn(name) {
      return function() {
        OpenAjax.gadgets.log("gadgets.rpc." + name + "(" +
                    OpenAjax.gadgets.json.stringify(Array.prototype.slice.call(arguments)) +
                    "): call ignored. [caller: " + document.location +
                    ", isChild: " + isChild + "]");
      };
    }
    return {
      getCode: function() {
        return "noop";
      },
      isParentVerifiable: function() {
        return true;  // Not really, but prevents transport assignment to IFPC.
      },
      init: logFn("init"),
      setup: logFn("setup"),
      call: logFn("call")
    };
  })();

  // Load the authentication token for speaking to the container
  // from the gadget's parameters, or default to '0' if not found.
  if (OpenAjax.gadgets.util) {
    params = OpenAjax.gadgets.util.getUrlParameters();
  }

  /**
   * Return a transport representing the best available cross-domain
   * message-passing mechanism available to the browser.
   *
   * <p>Transports are selected on a cascading basis determined by browser
   * capability and other checks. The order of preference is:
   * <ol>
   * <li> wpm: Uses window.postMessage standard.
   * <li> dpm: Uses document.postMessage, similar to wpm but pre-standard.
   * <li> nix: Uses IE-specific browser hacks.
   * <li> rmr: Signals message passing using relay file's onresize handler.
   * <li> fe: Uses FF2-specific window.frameElement hack.
   * <li> ifpc: Sends messages via active load of a relay file.
   * </ol>
   * <p>See each transport's commentary/documentation for details.
   * @return {Object}
   * @member gadgets.rpc
   */
  function getTransport() {
    return typeof window.postMessage === 'function' ? OpenAjax.gadgets.rpctx.wpm :
           typeof window.postMessage === 'object' ? OpenAjax.gadgets.rpctx.wpm :
//           window.ActiveXObject ? OpenAjax.gadgets.rpctx.nix :
           navigator.userAgent.indexOf('WebKit') > 0 ? OpenAjax.gadgets.rpctx.rmr :
           navigator.product === 'Gecko' ? OpenAjax.gadgets.rpctx.frameElement :
           OpenAjax.gadgets.rpctx.ifpc;
  }

  /**
   * Function passed to, and called by, a transport indicating it's ready to
   * send and receive messages.
   */
  function transportReady(receiverId, readySuccess) {
    var tx = transport;
    if (!readySuccess) {
      tx = fallbackTransport;
    }
    receiverTx[receiverId] = tx;

    // If there are any early-queued messages, send them now directly through
    // the needed transport.
    var earlyQueue = earlyRpcQueue[receiverId] || [];
    for (var i = 0; i < earlyQueue.length; ++i) {
      var rpc = earlyQueue[i];
      // There was no auth/rpc token set before, so set it now.
      rpc.t = getAuthToken(receiverId);
      tx.call(receiverId, rpc.f, rpc);
    }

    // Clear the queue so it won't be sent again.
    earlyRpcQueue[receiverId] = [];
  }

  //  Track when this main page is closed or navigated to a different location
  // ("unload" event).
  //  NOTE: The use of the "unload" handler here and for the relay iframe
  // prevents the use of the in-memory page cache in modern browsers.
  // See: https://developer.mozilla.org/en/using_firefox_1.5_caching
  // See: http://webkit.org/blog/516/webkit-page-cache-ii-the-unload-event/
  var mainPageUnloading = false,
      hookedUnload = false;
  
  function hookMainPageUnload() {
    if ( hookedUnload ) {
      return;
    }
    function onunload() {
      mainPageUnloading = true;
    }
    OpenAjax.gadgets.util.attachBrowserEvent(window, 'unload', onunload, false);
    hookedUnload = true;
  }

  function relayOnload(targetId, sourceId, token, data, relayWindow) {
    // Validate auth token.
    if (!authToken[sourceId] || authToken[sourceId] !== token) {
      OpenAjax.gadgets.error("Invalid auth token. " + authToken[sourceId] + " vs " + token);
      securityCallback(sourceId, FORGED_MSG);
    }
    
    relayWindow.onunload = function() {
      if (setup[sourceId] && !mainPageUnloading) {
        securityCallback(sourceId, FRAME_PHISH);
        OpenAjax.gadgets.rpc.removeReceiver(sourceId);
      }
    };
    hookMainPageUnload();
    
    data = OpenAjax.gadgets.json.parse(decodeURIComponent(data));
    transport.relayOnload(sourceId, data);
  }

  /**
   * Helper function to process an RPC request
   * @param {Object} rpc RPC request object
   * @private
   */
  function process(rpc) {
    //
    // RPC object contents:
    //   s: Service Name
    //   f: From
    //   c: The callback ID or 0 if none.
    //   a: The arguments for this RPC call.
    //   t: The authentication token.
    //
    if (rpc && typeof rpc.s === 'string' && typeof rpc.f === 'string' &&
        rpc.a instanceof Array) {

      // Validate auth token.
      if (authToken[rpc.f]) {
        // We don't do type coercion here because all entries in the authToken
        // object are strings, as are all url params. See setupReceiver(...).
        if (authToken[rpc.f] !== rpc.t) {
          OpenAjax.gadgets.error("Invalid auth token. " + authToken[rpc.f] + " vs " + rpc.t);
          securityCallback(rpc.f, FORGED_MSG);
        }
      }

      if (rpc.s === ACK) {
        // Acknowledgement API, used to indicate a receiver is ready.
        window.setTimeout(function() { transportReady(rpc.f, true); }, 0);
        return;
      }

      // If there is a callback for this service, attach a callback function
      // to the rpc context object for asynchronous rpc services.
      //
      // Synchronous rpc request handlers should simply ignore it and return a
      // value as usual.
      // Asynchronous rpc request handlers, on the other hand, should pass its
      // result to this callback function and not return a value on exit.
      //
      // For example, the following rpc handler passes the first parameter back
      // to its rpc client with a one-second delay.
      //
      // function asyncRpcHandler(param) {
      //   var me = this;
      //   setTimeout(function() {
      //     me.callback(param);
      //   }, 1000);
      // }
      if (rpc.c) {
        rpc.callback = function(result) {
          OpenAjax.gadgets.rpc.call(rpc.f, CALLBACK_NAME, null, rpc.c, result);
        };
      }

      // Call the requested RPC service.
      var result = (services[rpc.s] ||
                    services[DEFAULT_NAME]).apply(rpc, rpc.a);

      // If the rpc request handler returns a value, immediately pass it back
      // to the callback. Otherwise, do nothing, assuming that the rpc handler
      // will make an asynchronous call later.
      if (rpc.c && typeof result !== 'undefined') {
        OpenAjax.gadgets.rpc.call(rpc.f, CALLBACK_NAME, null, rpc.c, result);
      }
    }
  }

  /**
   * Helper method returning a canonicalized protocol://host[:port] for
   * a given input URL, provided as a string. Used to compute convenient
   * relay URLs and to determine whether a call is coming from the same
   * domain as its receiver (bypassing the try/catch capability detection
   * flow, thereby obviating Firebug and other tools reporting an exception).
   *
   * @param {string} url Base URL to canonicalize.
   * @memberOf gadgets.rpc
   */

  function getOrigin(url) {
    if (!url) {
      return "";
    }
    url = url.toLowerCase();
    if (url.indexOf("//") == 0) {
      url = window.location.protocol + url;
    }
    if (url.indexOf("://") == -1) {
      // Assumed to be schemaless. Default to current protocol.
      url = window.location.protocol + "//" + url;
    }
    // At this point we guarantee that "://" is in the URL and defines
    // current protocol. Skip past this to search for host:port.
    var host = url.substring(url.indexOf("://") + 3);

    // Find the first slash char, delimiting the host:port.
    var slashPos = host.indexOf("/");
    if (slashPos != -1) {
      host = host.substring(0, slashPos);
    }

    var protocol = url.substring(0, url.indexOf("://"));

    // Use port only if it's not default for the protocol.
    var portStr = "";
    var portPos = host.indexOf(":");
    if (portPos != -1) {
      var port = host.substring(portPos + 1);
      host = host.substring(0, portPos);
      if ((protocol === "http" && port !== "80") ||
          (protocol === "https" && port !== "443")) {
        portStr = ":" + port;
      }
    }

    // Return <protocol>://<host>[<port>]
    return protocol + "://" + host + portStr;
  }

  function getTargetWin(id) {
    if (typeof id === "undefined" ||
        id === "..") {
      return window.parent;
    }

    // Cast to a String to avoid an index lookup.
    id = String(id);
    
    // Try window.frames first
    var target = window.frames[id];
    if (target) {
      return target;
    }
    
    // Fall back to getElementById()
    target = document.getElementById(id);
    if (target && target.contentWindow) {
      return target.contentWindow;
    }

    return null;
  }

  // Pick the most efficient RPC relay mechanism.
  var transport = getTransport();

  // Create the Default RPC handler.
  services[DEFAULT_NAME] = function() {
    OpenAjax.gadgets.warn('Unknown RPC service: ' + this.s);
  };

  // Create a Special RPC handler for callbacks.
  services[CALLBACK_NAME] = function(callbackId, result) {
    var callback = callbacks[callbackId];
    if (callback) {
      delete callbacks[callbackId];
      callback(result);
    }
  };

  /**
   * Conducts any frame-specific work necessary to setup
   * the channel type chosen. This method is called when
   * the container page first registers the gadget in the
   * RPC mechanism. Gadgets, in turn, will complete the setup
   * of the channel once they send their first messages.
   */
  function setupFrame(frameId, token, forcesecure) {
    if (setup[frameId] === true) {
      return;
    }

    if (typeof setup[frameId] === 'undefined') {
      setup[frameId] = 0;
    }

    var tgtFrame = document.getElementById(frameId);
    if (frameId === '..' || tgtFrame != null) {
      if (transport.setup(frameId, token, forcesecure) === true) {
        setup[frameId] = true;
        return;
      }
    }

    if (setup[frameId] !== true && setup[frameId]++ < SETUP_FRAME_MAX_TRIES) {
      // Try again in a bit, assuming that frame will soon exist.
      window.setTimeout(function() { setupFrame(frameId, token, forcesecure) },
                        SETUP_FRAME_TIMEOUT);
    } else {
      // Fail: fall back for this gadget.
      receiverTx[frameId] = fallbackTransport;
      setup[frameId] = true;
    }
  }

  /**
   * Attempts to make an rpc by calling the target's receive method directly.
   * This works when gadgets are rendered on the same domain as their container,
   * a potentially useful optimization for trusted content which keeps
   * RPC behind a consistent interface.
   *
   * @param {string} target Module id of the rpc service provider
   * @param {Object} rpc RPC data
   * @return {boolean}
   */
  function callSameDomain(target, rpc) {
    if (typeof sameDomain[target] === 'undefined') {
      // Seed with a negative, typed value to avoid
      // hitting this code path repeatedly.
      sameDomain[target] = false;
      var targetRelay = OpenAjax.gadgets.rpc.getRelayUrl(target);
      if (getOrigin(targetRelay) !== getOrigin(window.location.href)) {
        // Not worth trying -- avoid the error and just return.
        return false;
      }

      var targetEl = getTargetWin(target);
      try {
        // If this succeeds, then same-domain policy applied
        sameDomain[target] = targetEl.OpenAjax.gadgets.rpc.receiveSameDomain;
      } catch (e) {
        // Shouldn't happen due to origin check. Caught to emit
        // more meaningful error to the caller.
        OpenAjax.gadgets.error("Same domain call failed: parent= incorrectly set.");
      }
    }

    if (typeof sameDomain[target] === 'function') {
      // Call target's receive method
      sameDomain[target](rpc);
      return true;
    }

    return false;
  }

  /**
   * Sets the relay URL of a target frame.
   * @param {string} targetId Name of the target frame.
   * @param {string} url Full relay URL of the target frame.
   * @param {boolean=} opt_useLegacy True if this relay needs the legacy IFPC
   *     wire format.
   *
   * @member gadgets.rpc
   * @deprecated
   */
  function setRelayUrl(targetId, url, opt_useLegacy) {
    // make URL absolute if necessary
    if (!/http(s)?:\/\/.+/.test(url)) {
      if (url.indexOf("//") == 0) {
        url = window.location.protocol + url;
      } else if (url.charAt(0) == '/') {
        url = window.location.protocol + "//" + window.location.host + url;
      } else if (url.indexOf("://") == -1) {
        // Assumed to be schemaless. Default to current protocol.
        url = window.location.protocol + "//" + url;
      }
    }
    relayUrl[targetId] = url;
    useLegacyProtocol[targetId] = !!opt_useLegacy;
  }

  /**
   * Helper method to retrieve the authToken for a given gadget.
   * Not to be used directly.
   * @member gadgets.rpc
   * @return {string}
   */
  function getAuthToken(targetId) {
    return authToken[targetId];
  }

  /**
   * Sets the auth token of a target frame.
   * @param {string} targetId Name of the target frame.
   * @param {string} token The authentication token to use for all
   *     calls to or from this target id.
   *
   * @member gadgets.rpc
   * @deprecated
   */
  function setAuthToken(targetId, token, forcesecure) {
    token = token || "";

    // Coerce token to a String, ensuring that all authToken values
    // are strings. This ensures correct comparison with URL params
    // in the process(rpc) method.
    authToken[targetId] = String(token);

    setupFrame(targetId, token, forcesecure);
  }

  function setupContainerGadgetContext(rpctoken, opt_forcesecure) {
    /**
     * Initializes gadget to container RPC params from the provided configuration.
     */
    function init(config) {
      var configRpc = config ? config.rpc : {};
      var parentRelayUrl = configRpc.parentRelayUrl;

      // Allow for wild card parent relay files as long as it's from a
      // white listed domain. This is enforced by the rendering servlet.
      if (parentRelayUrl.substring(0, 7) !== 'http://' &&
          parentRelayUrl.substring(0, 8) !== 'https://' &&
          parentRelayUrl.substring(0, 2) !== '//') {
        // Relative path: we append to the parent.
        // We're relying on the server validating the parent parameter in this
        // case. Because of this, parent may only be passed in the query, not fragment.
        if (typeof params.parent === "string" && params.parent !== "") {
          // Otherwise, relayUrl['..'] will be null, signaling transport
          // code to ignore rpc calls since they cannot work without a
          // relay URL with host qualification.
          if (parentRelayUrl.substring(0, 1) !== '/') {
            // Path-relative. Trust that parent is passed in appropriately.
            var lastSlash = params.parent.lastIndexOf('/');
            parentRelayUrl = params.parent.substring(0, lastSlash + 1) + parentRelayUrl;
          } else {
            // Host-relative.
            parentRelayUrl = getOrigin(params.parent) + parentRelayUrl;
          }
        }
      }

      var useLegacy = !!configRpc.useLegacyProtocol;
      setRelayUrl('..', parentRelayUrl, useLegacy);

      if (useLegacy) {
        transport = OpenAjax.gadgets.rpctx.ifpc;
        transport.init(process, transportReady);
      }

      // Sets the auth token and signals transport to setup connection to container.
      var forceSecure = opt_forcesecure || params.forcesecure || false;
      setAuthToken('..', rpctoken, forceSecure);
    }

    var requiredConfig = {
      parentRelayUrl : OpenAjax.gadgets.config.NonEmptyStringValidator
    };
    OpenAjax.gadgets.config.register("rpc", requiredConfig, init);
  }

  function setupContainerGenericIframe(rpctoken, opt_parent, opt_forcesecure) {
    // Generic child IFRAME setting up connection w/ its container.
    // Use the opt_parent param if provided, or the "parent" query param
    // if found -- otherwise, do nothing since this call might be initiated
    // automatically at first, then actively later in IFRAME code.
    var forcesecure = opt_forcesecure || params.forcesecure || false;
    var parent = opt_parent || params.parent;
    if (parent) {
      setRelayUrl('..', parent);
      setAuthToken('..', rpctoken, forcesecure);
    }
  }

  function setupChildIframe(gadgetId, opt_frameurl, opt_authtoken, opt_forcesecure) {
    if (!OpenAjax.gadgets.util) {
      return;
    }
    var childIframe = document.getElementById(gadgetId);
    if (!childIframe) {
      throw new Error("Cannot set up gadgets.rpc receiver with ID: " + gadgetId +
          ", element not found.");
    }

    // The "relay URL" can either be explicitly specified or is set as
    // the child IFRAME URL verbatim.
    var relayUrl = opt_frameurl || childIframe.src;
    setRelayUrl(gadgetId, relayUrl);

    // The auth token is parsed from child params (rpctoken) or overridden.
    var childParams = OpenAjax.gadgets.util.getUrlParameters(childIframe.src);
    var rpctoken = opt_authtoken || childParams.rpctoken;
    var forcesecure = opt_forcesecure || childParams.forcesecure;
    setAuthToken(gadgetId, rpctoken, forcesecure);
  }

  /**
   * Sets up the gadgets.rpc library to communicate with the receiver.
   * <p>This method replaces setRelayUrl(...) and setAuthToken(...)
   *
   * <p>Simplified instructions - highly recommended:
   * <ol>
   * <li> Generate &lt;iframe id="&lt;ID&gt;" src="...#parent=&lt;PARENTURL&gt;&rpctoken=&lt;RANDOM&gt;"/&gt;
   *      and add to DOM.
   * <li> Call gadgets.rpc.setupReceiver("&lt;ID>");
   *      <p>All parent/child communication initializes automatically from here.
   *         Naturally, both sides need to include the library.
   * </ol>
   *
   * <p>Detailed container/parent instructions:
   * <ol>
   * <li> Create the target IFRAME (eg. gadget) with a given &lt;ID> and params
   *    rpctoken=<token> (eg. #rpctoken=1234), which is a random/unguessbable
   *    string, and parent=&lt;url>, where &lt;url> is the URL of the container.
   * <li> Append IFRAME to the document.
   * <li> Call gadgets.rpc.setupReceiver(&lt;ID>)
   * <p>[Optional]. Strictly speaking, you may omit rpctoken and parent. This
   *             practice earns little but is occasionally useful for testing.
   *             If you omit parent, you MUST pass your container URL as the 2nd
   *             parameter to this method.
   * </ol>
   *
   * <p>Detailed gadget/child IFRAME instructions:
   * <ol>
   * <li> If your container/parent passed parent and rpctoken params (query string
   *    or fragment are both OK), you needn't do anything. The library will self-
   *    initialize.
   * <li> If "parent" is omitted, you MUST call this method with targetId '..'
   *    and the second param set to the parent URL.
   * <li> If "rpctoken" is omitted, but the container set an authToken manually
   *    for this frame, you MUST pass that ID (however acquired) as the 2nd param
   *    to this method.
   * </ol>
   *
   * @member gadgets.rpc
   * @param {string} targetId
   * @param {string=} opt_receiverurl
   * @param {string=} opt_authtoken
   * @param {boolean=} opt_forcesecure
   */
  function setupReceiver(targetId, opt_receiverurl, opt_authtoken, opt_forcesecure) {
    if (targetId === '..') {
      // Gadget/IFRAME to container.
      var rpctoken = opt_authtoken || params.rpctoken || params.ifpctok || "";
      if (window['__isgadget'] === true) {
        setupContainerGadgetContext(rpctoken, opt_forcesecure);
      } else {
        setupContainerGenericIframe(rpctoken, opt_receiverurl, opt_forcesecure);
      }
    } else {
      // Container to child.
      setupChildIframe(targetId, opt_receiverurl, opt_authtoken, opt_forcesecure);
    }
  }

  return /** @scope gadgets.rpc */ {
    config: function(config) {
      if (typeof config.securityCallback === 'function') {
        securityCallback = config.securityCallback;
      }
    },
    
    /**
     * Registers an RPC service.
     * @param {string} serviceName Service name to register.
     * @param {function(Object,Object)} handler Service handler.
     *
     * @member gadgets.rpc
     */
    register: function(serviceName, handler) {
      if (serviceName === CALLBACK_NAME || serviceName === ACK) {
        throw new Error("Cannot overwrite callback/ack service");
      }

      if (serviceName === DEFAULT_NAME) {
        throw new Error("Cannot overwrite default service:"
                        + " use registerDefault");
      }

      services[serviceName] = handler;
    },

    /**
     * Unregisters an RPC service.
     * @param {string} serviceName Service name to unregister.
     *
     * @member gadgets.rpc
     */
    unregister: function(serviceName) {
      if (serviceName === CALLBACK_NAME || serviceName === ACK) {
        throw new Error("Cannot delete callback/ack service");
      }

      if (serviceName === DEFAULT_NAME) {
        throw new Error("Cannot delete default service:"
                        + " use unregisterDefault");
      }

      delete services[serviceName];
    },

    /**
     * Registers a default service handler to processes all unknown
     * RPC calls which raise an exception by default.
     * @param {function(Object,Object)} handler Service handler.
     *
     * @member gadgets.rpc
     */
    registerDefault: function(handler) {
      services[DEFAULT_NAME] = handler;
    },

    /**
     * Unregisters the default service handler. Future unknown RPC
     * calls will fail silently.
     *
     * @member gadgets.rpc
     */
    unregisterDefault: function() {
      delete services[DEFAULT_NAME];
    },

    /**
     * Forces all subsequent calls to be made by a transport
     * method that allows the caller to verify the message receiver
     * (by way of the parent parameter, through getRelayUrl(...)).
     * At present this means IFPC or WPM.
     * @member gadgets.rpc
     */
    forceParentVerifiable: function() {
      if (!transport.isParentVerifiable()) {
        transport = OpenAjax.gadgets.rpctx.ifpc;
      }
    },

    /**
     * Calls an RPC service.
     * @param {string} targetId Module Id of the RPC service provider.
     *                          Empty if calling the parent container.
     * @param {string} serviceName Service name to call.
     * @param {function()|null} callback Callback function (if any) to process
     *                                 the return value of the RPC request.
     * @param {*} var_args Parameters for the RPC request.
     *
     * @member gadgets.rpc
     */
    call: function(targetId, serviceName, callback, var_args) {
      targetId = targetId || '..';
      // Default to the container calling.
      var from = '..';

      if (targetId === '..') {
        from = rpcId;
      }

      ++callId;
      if (callback) {
        callbacks[callId] = callback;
      }

      var rpc = {
        s: serviceName,
        f: from,
        c: callback ? callId : 0,
        a: Array.prototype.slice.call(arguments, 3),
        t: authToken[targetId],
        l: useLegacyProtocol[targetId]
      };

      if (targetId !== '..' && !document.getElementById(targetId)) {
        // The target has been removed from the DOM. Don't even try.
        OpenAjax.gadgets.log("WARNING: attempted send to nonexistent frame: " + targetId);
        return;
      }

      // If target is on the same domain, call method directly
      if (callSameDomain(targetId, rpc)) {
        return;
      }

      // Attempt to make call via a cross-domain transport.
      // Retrieve the transport for the given target - if one
      // target is misconfigured, it won't affect the others.
      var channel = receiverTx[targetId];

      if (!channel) {
        // Not set up yet. Enqueue the rpc for such time as it is.
        if (!earlyRpcQueue[targetId]) {
          earlyRpcQueue[targetId] = [ rpc ];
        } else {
          earlyRpcQueue[targetId].push(rpc);
        }
        return;
      }

      // If we are told to use the legacy format, then we must
      // default to IFPC.
      if (useLegacyProtocol[targetId]) {
        channel = OpenAjax.gadgets.rpctx.ifpc;
      }

      if (channel.call(targetId, from, rpc) === false) {
        // Fall back to IFPC. This behavior may be removed as IFPC is as well.
        receiverTx[targetId] = fallbackTransport;
        transport.call(targetId, from, rpc);
      }
    },

    /**
     * Gets the relay URL of a target frame.
     * @param {string} targetId Name of the target frame.
     * @return {string|undefined} Relay URL of the target frame.
     *
     * @member gadgets.rpc
     */
    getRelayUrl: function(targetId) {
      var url = relayUrl[targetId];
      // Some RPC methods (wpm, for one) are unhappy with schemeless URLs.
      if (url && url.substring(0,1) === '/') {
        if (url.substring(1,2) === '/') {    // starts with '//'
          url = document.location.protocol + url;
        } else {    // relative URL, starts with '/'
          url = document.location.protocol + '//' + document.location.host + url;
        }
      }
      
      return url;
    },

    setRelayUrl: setRelayUrl,
    setAuthToken: setAuthToken,
    setupReceiver: setupReceiver,
    getAuthToken: getAuthToken,
    
    // Note: Does not delete iframe
    removeReceiver: function(receiverId) {
      delete relayUrl[receiverId];
      delete useLegacyProtocol[receiverId];
      delete authToken[receiverId];
      delete setup[receiverId];
      delete sameDomain[receiverId];
      delete receiverTx[receiverId];
    },

    /**
     * Gets the RPC relay mechanism.
     * @return {string} RPC relay mechanism. See above for
     *   a list of supported types.
     *
     * @member gadgets.rpc
     */
    getRelayChannel: function() {
      return transport.getCode();
    },

    /**
     * Receives and processes an RPC request. (Not to be used directly.)
     * Only used by IFPC.
     * @param {Array.<string>} fragment An RPC request fragment encoded as
     *        an array. The first 4 elements are target id, source id & call id,
     *        total packet number, packet id. The last element stores the actual
     *        JSON-encoded and URI escaped packet data.
     *
     * @member gadgets.rpc
     * @deprecated
     */
    receive: function(fragment, otherWindow) {
      if (fragment.length > 4) {
        transport._receiveMessage(fragment, process);
      } else {
        relayOnload.apply(null, fragment.concat(otherWindow));
      }
    },

    /**
     * Receives and processes an RPC request sent via the same domain.
     * (Not to be used directly). Converts the inbound rpc object's
     * Array into a local Array to pass the process() Array test.
     * @param {Object} rpc RPC object containing all request params
     * @member gadgets.rpc
     */
    receiveSameDomain: function(rpc) {
      // Pass through to local process method but converting to a local Array
      rpc.a = Array.prototype.slice.call(rpc.a);
      window.setTimeout(function() { process(rpc); }, 0);
    },

    // Helper method to get the protocol://host:port of an input URL.
    // see docs above
    getOrigin: getOrigin,

    getReceiverOrigin: function(receiverId) {
      var channel = receiverTx[receiverId];
      if (!channel) {
        // not set up yet
        return null;
      }
      if (!channel.isParentVerifiable(receiverId)) {
        // given transport cannot verify receiver origin
        return null;
      }
      var origRelay = OpenAjax.gadgets.rpc.getRelayUrl(receiverId) ||
                      OpenAjax.gadgets.util.getUrlParameters().parent;
      return OpenAjax.gadgets.rpc.getOrigin(origRelay);
    },

    /**
     * Internal-only method used to initialize gadgets.rpc.
     * @member gadgets.rpc
     */
    init: function() {
      // Conduct any global setup necessary for the chosen transport.
      // Do so after gadgets.rpc definition to allow transport to access
      // gadgets.rpc methods.
      if (transport.init(process, transportReady) === false) {
        transport = fallbackTransport;
      }
      if (isChild) {
        setupReceiver('..');
      }
    },

    /** Returns the window keyed by the ID. null/".." for parent, else child */
    _getTargetWin: getTargetWin,

    /** Create an iframe for loading the relay URL. Used by child only. */ 
    _createRelayIframe: function(token, data) {
      var relay = OpenAjax.gadgets.rpc.getRelayUrl('..');
      if (!relay) {
        return;
      }
      
      // Format: #targetId & sourceId & authToken & data
      var src = relay + '#..&' + rpcId + '&' + token + '&' +
          encodeURIComponent(OpenAjax.gadgets.json.stringify(data));
  
      var iframe = document.createElement('iframe');
      iframe.style.border = iframe.style.width = iframe.style.height = '0px';
      iframe.style.visibility = 'hidden';
      iframe.style.position = 'absolute';
      iframe.setAttribute('aria-hidden', 'true');
      function appendFn() {
        // Append the iframe.
        document.body.appendChild(iframe);
  
        // Set the src of the iframe to 'about:blank' first and then set it
        // to the relay URI. This prevents the iframe from maintaining a src
        // to the 'old' relay URI if the page is returned to from another.
        // In other words, this fixes the bfcache issue that causes the iframe's
        // src property to not be updated despite us assigning it a new value here.
        iframe.src = 'javascript:"<html></html>"';
        iframe.src = src;
      }
      
      if (document.body) {
        appendFn();
      } else {
        OpenAjax.gadgets.util.registerOnLoadHandler(function() { appendFn(); });
      }
      
      return iframe;
    },

    ACK: ACK,

    RPC_ID: rpcId,
    
    SEC_ERROR_LOAD_TIMEOUT: LOAD_TIMEOUT,
    SEC_ERROR_FRAME_PHISH: FRAME_PHISH,
    SEC_ERROR_FORGED_MSG : FORGED_MSG
  };
}();

// Initialize library/transport.
OpenAjax.gadgets.rpc.init();

} // !end of double-inclusion guard


