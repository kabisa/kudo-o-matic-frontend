//
//  ui_snapshots.swift
//  ui-snapshots
//
//  Created by Adrian Regan on 07/04/2017.
//
//

import XCTest

class ui_snapshots: XCTestCase {

    override func setUp() {
        super.setUp()

        let app = XCUIApplication()

        setupSnapshot(app)

        app.launch()

    }

    override func tearDown() {
        super.tearDown()
    }

    func waitForElementToAppear(_ element: XCUIElement, file: String = #file, line: UInt = #line) {
        let existsPredicate = NSPredicate(format: "exists == true")
        expectation(for: existsPredicate, evaluatedWith: element, handler: nil)

        waitForExpectations(timeout: 5) { (error) -> Void in
            if (error != nil) {
                let message = "Failed to find \(element) after 5 seconds."
                self.recordFailure(withDescription: message, inFile: file, atLine: line, expected: true)
            }
        }
    }

    func waitAndTapLink(_ webViewsQuery: XCUIElementQuery,_ linkName: String) {
        let disambiguationLink = webViewsQuery.links[linkName]
        waitForElementToAppear(disambiguationLink)
        XCTAssert(disambiguationLink.exists)
        disambiguationLink.tap()
    }

    func testSnapshots() {

        let webViewsQuery = XCUIApplication().webViews
        let button = webViewsQuery/*@START_MENU_TOKEN@*/.buttons["₭"]/*[[".otherElements[\"kudo-o-matic\"]",".otherElements[\"navigation\"].buttons[\"₭\"]",".buttons[\"₭\"]"],[[[-1,2],[-1,1],[-1,0,1]],[[-1,2],[-1,1]]],[0]]@END_MENU_TOKEN@*/
        button.tap()
        snapshot("home")

        waitAndTapLink(webViewsQuery, "Statistics")
        snapshot("statistics")

        waitAndTapLink(webViewsQuery, "Profile")
        snapshot("profile")

        waitAndTapLink(webViewsQuery, "Feed")
        snapshot("feed")

        waitAndTapLink(webViewsQuery, "Goal")
        snapshot("goal")

    }

}
