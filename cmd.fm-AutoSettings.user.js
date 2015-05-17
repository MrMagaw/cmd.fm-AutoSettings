// ==UserScript==
// @name         cmd.fm AutoSettings
// @namespace    https://github.com/MrMagaw/cmd.fm-AutoSettings/blob/master/cmd.fm-AutoSettings.user.js
// @version      0.1
// @description  Automatically sets some settings for cmd.fm
// @author       MrMagaw
// @match        https://cmd.fm/
// @grant        none
// ==/UserScript==

// ==Settings==
var cmdDelay = 200; // Delay between commands
var typedCmd = 'pause'; // Command that will be typed, but not executed
var cmdList = [ // List of commands to execute
    'layout terminal',
    'comments off',
    'volume 60',
    'play chillout'
];
// ==/Settings==

function delayCmds(list) {
    if(list.length === 0) return;
    setTimeout(function() {
        term_obj.exec(list.shift());
        delayCmds(list);
    }, cmdDelay);
}

function typeCmd(cmd) {
    for(i = 0; i < cmd.length; ++i)
        $('div.cmd').trigger({type: 'keypress', which: cmd.charCodeAt(i)});
}

$(function() {
    setTimeout(delayCmds(cmdList), cmdDelay);
        // Double the first delay (as cmd.fm also uses this method to change the display)
    typeCmd(typedCmd);
});
