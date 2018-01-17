#!/usr/bin/env ruby
# share_schemes.rb

require 'xcodeproj'
require 'nokogiri'
require 'fileutils'

cordova_folder = File.expand_path("")
cordova_config = Nokogiri::XML((File.read("#{cordova_folder}/config.xml")))
app_name = cordova_config.xpath("//xmlns:name").text


FileUtils.cp_r("#{cordova_folder}/platforms/ios/#{app_name}.xcworkspace/.", "#{cordova_folder}/platforms/ios/#{app_name}.xcodeproj")
