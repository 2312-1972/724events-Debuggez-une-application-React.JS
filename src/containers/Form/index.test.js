import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Form from "./index";

describe("When Form is created", () => {
  it("a list of fields card is displayed", async () => {
    render(<Form />);

    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personnel / Entreprise");
    await screen.findByText("Email");
    await screen.findByTestId("button-test-id");
    await screen.findByText("Envoyer"); // Vérifie que le texte "Envoyer" est présent initialement.
  });
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success action is called", async () => {
      const onSuccess = jest.fn();
      render(<Form onSuccess={onSuccess} />);
      fireEvent(
        await screen.findByTestId("button-test-id"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );

      // Attend que le texte "En cours" apparaisse après le clic.
      await screen.findByText("En cours");

      // Vérifie que le texte "Envoyer" n'est plus présent.
      expect(screen.queryByText("Envoyer")).toBeNull();

      // Attend que le texte "Envoyer" réapparaisse après que le formulaire ait été envoyé.
      await waitFor(() => {
        expect(screen.queryByText("En cours")).toBeNull();
        expect(screen.queryByText("Envoyer")).not.toBeNull();
      });

      expect(onSuccess).toHaveBeenCalled();
    });
  });