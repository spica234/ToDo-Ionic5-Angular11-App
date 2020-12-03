#!/bin/sh
#
# Author: Anukool Naik
# Language: BASH Scripting
# Purpose: Optimized build required Git Bash to be installed.
#
alias ng.cmd="ng.cmd --es2020=true --hmr=true --progress=true --deleteOutputPath=true --experimentalRollupPass=true";
(if adb devices >/dev/null;
then
adb uninstall com.demo.todo.app &
cordova clean browser &
rm -Rfv www/* &
fi;
) &
cordova clean android;
# ionic cordova run browser --livereload --live-reload --external --es2020=true --hmr=true --progress=true --deleteOutputPath=true --experimentalRollupPass=true
ionic cordova build android --sourcemaps=false --watch=true --verbose=true "$@" --no-vendor-chunk --output-hashing=none --verbose -dop &&
adb install platforms/android/app/build/outputs/apk/release/app-release.apk ||
adb install platforms/android/app/build/outputs/apk/debug/app-debug.apk