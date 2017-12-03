#!/usr/bin/env ruby
# prepare_screengrab.rb

require 'fileutils'

cordova_folder = File.expand_path("")
fastlane_folder = File.expand_path("../fastlane")

FileUtils.cp_r("#{fastlane_folder}/ionic/config/android/ui-tests/androidTest/.", "#{cordova_folder}/platforms/android/androidTest/")
FileUtils.cp("#{fastlane_folder}/ionic/config/android/ui-tests/build-extras.gradle", "#{cordova_folder}/platforms/android/build-extras.gradle")
