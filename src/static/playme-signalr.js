/*!
 * ASP.NET SignalR JavaScript Library v2.0.1
 * http://signalr.net/
 *
 * Copyright Microsoft Open Technologies, Inc. All rights reserved.
 * Licensed under the Apache 2.0
 * https://github.com/SignalR/SignalR/blob/master/LICENSE.md
 *
 */

/// <reference path="..\..\SignalR.Client.JS\Scripts\jquery-1.6.4.js" />
/// <reference path="jquery.signalR.js" />
(function ($, window, undefined) {
    /// <param name="$" type="jQuery" />
    "use strict";

    if (typeof ($.signalR) !== "function") {
        throw new Error("SignalR: SignalR is not loaded. Please ensure jquery.signalR-x.js is referenced before ~/signalr/js.");
    }

    var signalR = $.signalR;

    function makeProxyCallback(hub, callback) {
        return function () {
            // Call the client hub method
            callback.apply(hub, $.makeArray(arguments));
        };
    }

    function registerHubProxies(instance, shouldSubscribe) {
        var key, hub, memberKey, memberValue, subscriptionMethod;

        for (key in instance) {
            if (instance.hasOwnProperty(key)) {
                hub = instance[key];

                if (!(hub.hubName)) {
                    // Not a client hub
                    continue;
                }

                if (shouldSubscribe) {
                    // We want to subscribe to the hub events
                    subscriptionMethod = hub.on;
                } else {
                    // We want to unsubscribe from the hub events
                    subscriptionMethod = hub.off;
                }

                // Loop through all members on the hub and find client hub functions to subscribe/unsubscribe
                for (memberKey in hub.client) {
                    if (hub.client.hasOwnProperty(memberKey)) {
                        memberValue = hub.client[memberKey];

                        if (!$.isFunction(memberValue)) {
                            // Not a client hub function
                            continue;
                        }

                        subscriptionMethod.call(hub, memberKey, makeProxyCallback(hub, memberValue));
                    }
                }
            }
        }
    }

    $.hubConnection.prototype.createHubProxies = function () {
        var proxies = {};
        this.starting(function () {
            // Register the hub proxies as subscribed
            // (instance, shouldSubscribe)
            registerHubProxies(proxies, true);

            this._registerSubscribedHubs();
        }).disconnected(function () {
            // Unsubscribe all hub proxies when we "disconnect".  This is to ensure that we do not re-add functional call backs.
            // (instance, shouldSubscribe)
            registerHubProxies(proxies, false);
        });

        proxies.queueHub = this.createHubProxy('queueHub'); 
        proxies.queueHub.client = { };
        proxies.queueHub.server = {
            decreaseVolume: function () {
                return proxies.queueHub.invoke.apply(proxies.queueHub, $.merge(["DecreaseVolume"], $.makeArray(arguments)));
             },

            forgetTrack: function (id) {
                return proxies.queueHub.invoke.apply(proxies.queueHub, $.merge(["ForgetTrack"], $.makeArray(arguments)));
             },

            getCurrentTrack: function () {
                return proxies.queueHub.invoke.apply(proxies.queueHub, $.merge(["GetCurrentTrack"], $.makeArray(arguments)));
             },

            getCurrentVolume: function () {
                return proxies.queueHub.invoke.apply(proxies.queueHub, $.merge(["GetCurrentVolume"], $.makeArray(arguments)));
             },

            getPlayingSoon: function () {
                return proxies.queueHub.invoke.apply(proxies.queueHub, $.merge(["GetPlayingSoon"], $.makeArray(arguments)));
             },

            getRecentlyPlayed: function () {
                return proxies.queueHub.invoke.apply(proxies.queueHub, $.merge(["GetRecentlyPlayed"], $.makeArray(arguments)));
             },

            increaseVolume: function () {
                return proxies.queueHub.invoke.apply(proxies.queueHub, $.merge(["IncreaseVolume"], $.makeArray(arguments)));
             },

            likeTrack: function (id) {
                return proxies.queueHub.invoke.apply(proxies.queueHub, $.merge(["LikeTrack"], $.makeArray(arguments)));
             },

            nextTrack: function (id) {
                return proxies.queueHub.invoke.apply(proxies.queueHub, $.merge(["NextTrack"], $.makeArray(arguments)));
             },

            pauseTrack: function () {
                return proxies.queueHub.invoke.apply(proxies.queueHub, $.merge(["PauseTrack"], $.makeArray(arguments)));
             },

            resumeTrack: function () {
                return proxies.queueHub.invoke.apply(proxies.queueHub, $.merge(["ResumeTrack"], $.makeArray(arguments)));
             },

            vetoTrack: function (id) {
                return proxies.queueHub.invoke.apply(proxies.queueHub, $.merge(["VetoTrack"], $.makeArray(arguments)));
             }
        };

        return proxies;
    };

    signalR.hub = $.hubConnection("http://music.trademe.local/sst/2/signalr", { useDefaultPath: false });
    $.extend(signalR, signalR.hub.createHubProxies());

}(window.jQuery, window));