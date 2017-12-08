#!/usr/bin/env ruby
# prepare_screengrab.rb

require 'fileutils'
require 'nokogiri'

cordova_folder = File.expand_path("")
fastlane_folder = File.expand_path("../fastlane")
cordova_config = Nokogiri::XML((File.read("#{cordova_folder}/config.xml")))
package_name = cordova_config.xpath("/*/@id").first.value

target_path = "#{cordova_folder}/platforms/android/androidTest/java/androidTest/#{package_name.gsub(".", "/")}/"

FileUtils.mkdir_p(target_path)

FileUtils.cp_r("#{fastlane_folder}/ionic/config/android/ui-tests/MainActivityTest.java", target_path)
FileUtils.cp("#{fastlane_folder}/ionic/config/android/ui-tests/build-extras.gradle", "#{cordova_folder}/platforms/android/build-extras.gradle")
