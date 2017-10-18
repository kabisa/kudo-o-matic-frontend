module.exports = function(context) {
  var fs = require('fs');
  var ROOT_DIR = context.opts.projectRoot;
  if(ROOT_DIR.substr(0, 1) === '/' && fs.existsSync(ROOT_DIR + "/platforms/ios")) {


    var srcFile = ROOT_DIR + "/platforms/ios/My App.xcodeproj/project.pbxproj";

    var projectPbxproj = fs.readFileSync(srcFile, "utf8");

    if(projectPbxproj.indexOf("TargetAttributes") === -1) {
      console.log("Adding TargetAttributes to pbxproj");
      var targetAttributes = "\n\t\t\t\tTargetAttributes = {\n\t\t\t\t\t1D6058900D05DD3D006BFB54 = {\n\t\t\t\t\t\tDevelopmentTeam = F72EKUASP5;\n\t\t\t\t\t\tSystemCapabilities = {\n\t\t\t\t\t\t\tcom.apple.Push = {\n\t\t\t\t\t\t\t\tenabled = 1;\n\t\t\t\t\t\t\t};\n\t\t\t\t\t\t};\n\t\t\t\t\t};\n\t\t\t\t};";
      var searchString = "LastUpgradeCheck = 510;";
      var lastUpgradeCheckIndex = projectPbxproj.indexOf(searchString);

      projectPbxproj = projectPbxproj.substr(0, lastUpgradeCheckIndex + searchString.length) + targetAttributes + projectPbxproj.substr(lastUpgradeCheckIndex + searchString.length);
    }

    fs.writeFileSync(srcFile, projectPbxproj);
  }
};
