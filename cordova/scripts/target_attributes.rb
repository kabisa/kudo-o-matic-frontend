require 'nokogiri'
require 'JSON'
require 'pbxplorer'

cordova_folder = File.expand_path("")
cordova_config = Nokogiri::XML((File.read("#{cordova_folder}/config.xml")))
app_name = cordova_config.xpath("//xmlns:name").text
team_id = cordova_config.xpath("//xmlns:team_id").text

pbxproj = "#{cordova_folder}/platforms/ios/#{app_name}.xcodeproj/project.pbxproj"

proj_obj = XCProjectFile.new pbxproj

product_reference = JSON.parse(proj_obj.project.targets[0].to_json)["productReference"]

target_attributes = {"#{product_reference}"=>{"SystemCapabilities"=>{"com.apple.Push"=>{"enabled"=>"1"}}, "DevelopmentTeam"=>"#{team_id}"}}
proj_obj.project["attributes"]["TargetAttributes"] = target_attributes

proj_obj.save
