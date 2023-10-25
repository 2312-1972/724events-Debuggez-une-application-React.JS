import { fireEvent, render, screen } from "@testing-library/react";
import Home from "./index";

describe("When Form is created", () => {
  it("a list of fields card is displayed", async () => {
    render(<Home />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success message is displayed", async () => {
      render(<Home />);
      fireEvent.click(await screen.findByText("Envoyer")); // Trigger a click event
      await screen.findByText("En cours");
      await screen.findByText("Message envoyé !");
    });
  });
});

// describe("When a page is created", () => {
//   it("a list of events is displayed", () => {
    
//   //   render(<Home />);
//   //  fireEvent(screen.findByText("conférence"));
//     // to implement
//   });
//   it("a list a people is displayed", () => {
//     // render(<Home />);
//     // fireEvent(screen.findByText("Jean-baptiste"));
//     // to implement
//   });
//   it("a footer is displayed", () => {
//   //  render(<Home />);
//    // fireEvent(screen.findByText("Contactez-nous"));
//     // to implement
//   });
//   it("an event card, with the last event, is displayed", () => {
//   //  render(<Home />);
//     // fireEvent(screen.findByText("Notre derniére prestation"));
//     // to implement
//   });
// });
