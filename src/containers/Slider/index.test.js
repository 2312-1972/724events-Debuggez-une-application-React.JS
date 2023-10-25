import React from 'react';
import { act, render, screen } from "@testing-library/react";
import Slider, { getSortedData } from "./index";
import {api, DataProvider } from "../../contexts/DataContext"; 


const data = {
  focus: [
    {
      "id": 101,
      "title": "World economic forum",
      "description": "Oeuvre à la coopération entre le secteur public et le privé.",
      "date": "2022-01-29T20:28:45.744Z",
      "cover": "/images/evangeline-shaw-nwLTVwb7DbU-unsplash1.png"
    },
    {
      "id": 102,
      "title": "Nordic design week",
      "description": "Conférences sur le design de demain dans le digital",
      "date": "2022-03-29T20:28:45.744Z",
      "cover": "/images/teemu-paananen-bzdhc5b3Bxs-unsplash1.png"
    },
    {
      "id": 103,
      "title": "Sneakercraze market",
      "description": "Rencontres de spécialistes des Sneakers Européens.",
      "date": "2022-05-29T20:28:45.744Z",
      "cover": "/images/jakob-dalbjorn-cuKJre3nyYc-unsplash 1.png"
    }
  ],
};

describe("When slider is created", () => {
  it("a list card is displayed", async () => {
    // Mocke api.loadData pour qu'il renvoie les données simulées
    api.loadData = jest.fn().mockReturnValue(data);

    act(() => {
      render(
        <DataProvider>
          <Slider />
        </DataProvider>
      );
    });

    const sortedData = getSortedData(); // Utilisez getSortedData pour obtenir les données triées

    console.log("Sorted Data:", sortedData); // Affiche les données triées dans la console


    //  waitFor pour attendre que le texte "World economic forum" soit présent.
    await screen.findByText("World economic forum");
    //  waitFor pour attendre que le texte "janvier" soit présent.
    await screen.findByText("janvier");
    //  waitFor pour attendre que la description soit présente.
    await screen.findByText(
      "Oeuvre à la coopération entre le secteur public et le privé."
    );
  });
});
