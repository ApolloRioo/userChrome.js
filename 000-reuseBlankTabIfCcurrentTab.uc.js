// ==UserScript==
// @name           000-reuseBlankTabIfCcurrentTab.uc.js
// @namespace      http://space.geocities.yahoo.co.jp/gl/alice0775
// @description    Reuse Blank Tab If CcurrentTab is Blank Tab and NewTab
// @include        *
// @exclude        about:*
// @exclude        chrome://mozapps/content/downloads/unknownContentType.xul
// @compatibility  60
// @version        2018/09/23 16:00 
// ==/UserScript==
if (window.openLinkIn && !/reuseBlankTabIfCcurrentTab_org/.test(window.openLinkIn.toString())) {
  window.openLinkIn_reuseBlankTabIfCcurrentTab_org = window.openLinkIn;
  window.openLinkIn = function(url, where, params) {
    var mainWindow = (typeof BrowserWindowTracker != "undefined") ? BrowserWindowTracker.getTopWindow(): Services.wm.getMostRecentWindow("navigator:browser");
    if ((mainWindow.gBrowser.currentURI.spec == "about:blank"
      /*|| mainWindow.gBrowser.currentURI.spec == "about:home"*/
      ||   mainWindow.gBrowser.currentURI.spec == "about:newtab") && 
        (where == "tab" || where == "tabshifted")) {
      where  = "current";
    }
    window.openLinkIn_reuseBlankTabIfCcurrentTab_org(url, where, params);
  }
}
if (window.gBrowser && !/reuseBlankTabIfCcurrentTab_org/.test(window.gBrowser.loadTabs.toString())) {
  window.gBrowser.loadTabs_reuseBlankTabIfCcurrentTab_org = window.gBrowser.loadTabs;
  gBrowser.loadTabs = function (aURIs, {
      allowThirdPartyFixup,
      inBackground,
      newIndex,
      postDatas,
      replace,
      targetTab,
      triggeringPrincipal,
      userContextId,
    }){
    var mainWindow = (typeof BrowserWindowTracker != "undefined") ? BrowserWindowTracker.getTopWindow(): Services.wm.getMostRecentWindow("navigator:browser");
    if ((mainWindow.gBrowser.currentURI.spec == "about:blank" ||
         mainWindow.gBrowser.currentURI.spec == "about:newtab")) {
      replace  = true;
    }
    gBrowser.loadTabs_reuseBlankTabIfCcurrentTab_org(aURIs, {
      allowThirdPartyFixup,
      inBackground,
      newIndex,
      postDatas,
      replace,
      targetTab,
      triggeringPrincipal,
      userContextId,
    })
  }
}