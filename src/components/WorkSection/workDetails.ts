import examplePage from "../../../public/examplePage.png";
import kalkulator from "../../../public/kalkulator.png";
import mailingSystemPreview from "../../../public/mailingSystemPreview.png";
import pokemons from "../../../public/pokemony.png";
import reduxPreview from "../../../public/redux-preview.png";

export const projectsDetails = [
  {
    heading: "latest work",
    header: "Users App",
    tags: ["TypeScript", "redux-toolkit", "react"],
    paragraph:
      "Retrieving users with Redux. \n Application has 3 buttons: \n •load - reloads 10 users to the state that stores users; \n •reset - resetting the list of users; \n •add - retrieves the list again, but only adds one user to the existing one. \nDepending on which button is pressed, a different snackbar is displayed. In the contacts tab, depending on the success or failure, a different message is also displayed.",
    image: reduxPreview,
    linkToGithub: "https://github.com/Agnieszka26/ReduxSzkolaReacta",
    linkToLive: "https://app-redux-toolkit.web.app",
  },
  {
    heading: "latest work",
    header: "Landing Page",
    tags: ["TypeScript", "react", "sass"],
    paragraph: "Web page of non existing company. Create with vanilla sass.",
    image: examplePage,
    linkToGithub: "https://github.com/Agnieszka26/examplePage",
    linkToLive: "https://landing-page-expertify.web.app",
  },
  {
    heading: "latest work",
    header: "Mailing System",
    tags: ["JavaScript", "react", "Airtable", "material-ui"],
    paragraph:
      "Application for sending e-mails to people who are in our database (Airtable). \nIMPORTANT! password: lubiePlacki \nThe application consists of: \n-lists of recipients (subscribers) in our database. The list includes: email, name and date of adding the subscriber \n- the ability to add a new subscriber via a form created using react-hook-form with validation, which contains two fields: email and name. The date should save automatically. The application allows you to send e-mails to all people who are in the Subscribers table. This is done by setting up a new Campaign object. Subscriber details are available. This is done by clicking on the e-mail address or name on the list. Then we will be transferred to a page that will download only this one record from the database and display it on the screen. Campaigns after sending should be available in the Campaigns table. Posted campaigns cannot be edited. Unsent campaigns can be deleted.",
    image: mailingSystemPreview,
    linkToGithub: "https://github.com/Agnieszka26/sendingMailsApp",
    linkToLive: "https://mailing-system-aga.web.app/",
  },
  {
    heading: "latest work",
    header: "Expense Calculator",
    tags: ["JavaScript", "react", "bootstrap"],
    paragraph:
      "The application contains two lists: \nthe first list presents expenses (name, amount, category); \nthe second list is revenue (name, amount, category);\nIn addition, the application has an add form that has:\n-radio field specifying whether it is an expense or income\n- input field of text type with name\n- input field of the number type with the amount\n-select field with category\n-add button.\nDepending on whether you are in the plus or minus, the Summary field changes color.",
    image: kalkulator,
    linkToGithub: "https://github.com/Agnieszka26/kalkulatorWydatkow",
    linkToLive: "https://expense-calculator-aga.web.app",
  },
  {
    heading: "latest work",
    header: "Pokédex App",
    tags: ["JavaScript", "react", "API communication"],
    paragraph:
      "Who does not like pokémos? After entering the main page, you can see the input in which the user will enter the number of pokemons to be displayed. Input has been protected against entering a number greater than 1118 (this is the maximum number of Pokemon available from the external API, if a number greater than 1118 is entered, a message about entering a number greater than 1118 will be displayed), and less than 0. There is a button next to loads the entered number of pokemons. After clicking, a list of the given number of pokemons is rendered in the form of tiles. There is a pokemon finder. The tiles consist of a picture, name and type of pokemon. When hovering the mouse, the tile enlarges smoothly (scale, 1.1), the cursor changes. After clicking on the tile, we are transferred to the page with the details of the pokemon.",
    image: pokemons,
    linkToGithub: "https://github.com/Agnieszka26/pokemon",
    linkToLive: "https://pokemons-aga.web.app/",
  },
];
