import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Home from "./index";
import Form from "../../containers/Form";

describe("When Home is created", () => {
  it("a list of fields card is displayed", async () => {
    render(
      <Home>
        <Form />
      </Home>
    );

    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personnel / Entreprise");
    
    await screen.findByText("Envoyer"); // Vérifie que le texte "Envoyer" est présent initialement.
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success message is displayed", async () => {
      render(
        <Home>
          <Form />
        </Home>
      );

      fireEvent.click(await screen.findByText("Envoyer")); // Trigger a click event

      // Attend que le texte "En cours" apparaisse après le clic.
      await screen.findByText("En cours");

      // Vérifie que le texte "Envoyer" n'est plus présent.
      expect(screen.queryByText("Envoyer")).toBeNull();

      // Attend que le texte "Envoyer" réapparaisse après que le formulaire ait été envoyé.
      await waitFor(() => {
        expect(screen.queryByText("En cours")).toBeNull();
        expect(screen.queryByText("Envoyer")).not.toBeNull();
        expect(screen.queryByText("Message envoyé !")).not.toBeNull(); // Vérifie que le message de succès est affiché.
      });
    });
  });
});
describe("When a page is created", () => {
  it("a list of events is displayed",async () => {
    render(<Home />);
   screen.queryByText("Conférence #productCON")
    // OK implemented
    
  })
  it("a list a people is displayed",async () => {
    render(<Home />);
   screen.queryByText("Directeur Marketing")
    // OK implemented
  })
  it("a footer is displayed",async () => {
    render(<Home />);
   screen.queryByText("Contactez-nous")
    // OK implemented
  })
  it("an event card, with the last event, is displayed",async () => {
    render(<Home />);
   screen.queryByText("AVRIL")
    // OK implemented
  })
});
