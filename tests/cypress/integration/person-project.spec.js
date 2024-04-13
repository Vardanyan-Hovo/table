/// <reference types="cypress" />


describe("test example projec", ()=>{
    it ("home click",()=>{
        cy.pause()
        cy.visit("http://localhost:3001");                  // go to home

        cy.get("[name=homeToTable]").click();
        cy.location("pathname").should("equal", "/table");
        cy.get("[name=tableGoHome]").click();
        cy.location("pathname").should("equal", "/");

        cy.get("[name=homeToForm]").click();
        cy.location("pathname").should("equal", "/form");

        cy.get("[name=formToGoHome]").click();
        cy.location("pathname").should("equal", "/");
    })

    it("form test", () => {
        cy.pause()
        cy.visit("http://localhost:3001/form");              // go to linck
        cy.get("[name=Popup]").click();
        cy.get("[name=IdPost]").type(Math.random() + "");
        cy.get("[name=titlePost]").type("hello");
        cy.get("[name=buttonPost]").click();

        cy.location("pathname").should("equal", "/home");
    });

    it("form comments test", () => {
        cy.pause()
        cy.visit("http://localhost:3001/form");              // go to linck
        cy.get("[name=Popup]").click();
        cy.get("[id=InputTextMethod]").clear();
        cy.get("[id=InputTextMethod]").type("comments");

    
        cy.get("[id=firstname5]").type("8");
        cy.get("[id=lastname5]").type("Hello World");

        cy.get("[id=postIdComments]").type("4");

        cy.get("[name=submitComments]").click();

        cy.location("pathname").should("equal", "/home");
    });


    it("form test", () => {
        cy.pause()
        cy.visit("http://localhost:3001/form");              // go to linck
        cy.get("[name=Popup]").click();
        cy.get("[id=InputTextMethod]").clear();
        cy.get("[id=InputTextMethod]").type("usersX");

        cy.get("[id=inputFormKey]").type("name");
        cy.get("[id=inputFormValue]").type("User1");
        cy.get("[name=AddKeyValuePair]").click();


        cy.get("[id=inputFormKey]").type("age");
        cy.get("[id=inputFormValue]").type("25");
        cy.get("[name=AddKeyValuePair]").click();
       
        cy.get("[name=buttonSubmitForm]").click();

        cy.get("[id=errorRespons]").should('contain.html', 'HTTP');
    });



    //white my db.json in github
    // it("table test ",()=>{
    //     cy.pause()
    //     cy.visit("http://localhost:3001/table");              //go to table
    //     cy.get("[aria-label=profile]").click();
    //     cy.get("[id=errorTable]").should("contain.text","Error fetching data: A table that can contain an arbitrary number of fields (from 5 to 15).")
    //     cy.get("[aria-label=comments]").click();
    //     cy.get("[id=errorTable]").should("contain.text","Error fetching data: A table that can contain an arbitrary number of fields (from 5 to 15).")
    //     cy.get("[aria-label=posts]").click();
    //     cy.get("[id=errorTable]").should("contain.text","Error fetching data: A table that can contain an arbitrary number of fields (from 5 to 15).")
    // })

    // white my db.json it save in public/db/bdb.json
    // it("table test ",()=>{
    //     cy.pause()
    //     cy.visit("http://localhost:3001/table");              //go to table
    //     cy.get("[aria-label=profile]").click();
    //     cy.get("tbody[data-pc-section=bodyrow]").should('not.be.empty');
        
    //     cy.get("[aria-label=comments]").click();
    //     cy.get("[class=p-column-header-content]").should('not.be.empty');

    //     cy.get("[aria-label=posts]").click();
    //     cy.get("[id=errorTable]").should("contain.text","Error fetching data: A table that can contain an arbitrary number of fields (from 5 to 15).")
    // })


    // white my db.json it save in public/db/bdb.json
    // it("form test", () => {
    //     cy.pause()
    //     cy.visit("http://localhost:3001/form");              // go to linck
    //     cy.get("[name=Popup]").click();
    //     cy.get("[id=InputTextMethod]").clear();
    //     cy.get("[id=InputTextMethod]").type("users");

    //     cy.get("[id=inputFormKey]").type("name");
    //     cy.get("[id=inputFormValue]").type("User1");
    //     cy.get("[name=AddKeyValuePair]").click();


    //     cy.get("[id=inputFormKey]").type("age");
    //     cy.get("[id=inputFormValue]").type("25");
    //     cy.get("[name=AddKeyValuePair]").click();

    //     cy.get("[id=inputFormKey]").type("email");
    //     cy.get("[id=inputFormValue]").type("user@gmmail.com");
    //     cy.get("[name=AddKeyValuePair]").click();

    //     cy.get("[id=inputFormKey]").type("nickname");
    //     cy.get("[id=inputFormValue]").type("userX");
    //     cy.get("[name=AddKeyValuePair]").click();

    //     cy.get("[id=inputFormKey]").type("password");
    //     cy.get("[id=inputFormValue]").type("bcrypt");
    //     cy.get("[name=AddKeyValuePair]").click();
       
    //     cy.get("[name=buttonSubmitForm]").click();
    //     cy.location("pathname").should("equal", "/home");
    // });



});

