/* eslint-disable no-return-assign */
import Button from "../../components/Button";
import Logo from "../../components/Logo";

import "./style.scss";

const Menu = () => (
  <nav>
    <Logo />
    <ul>
      <li>
        <a href="#nos-services">Nos services</a>
      </li>
      <li>
        <a href="#nos-realisations">Nos réalisations</a>
      </li>
      <li>
        <a href="#notre-equipe">Notre équipe</a>
      </li>
    </ul>
    <Button title="contact" onClick={(event) => {
  event.preventDefault();
  console.log("Bouton 'Contact' cliqué");
  console.log("window.location.hash avant : ", window.location.hash);
  window.location.hash = "#contactForm";
  console.log("window.location.hash après : ", window.location.hash);
}}>
  Contact
</Button>



  </nav>
);


export default Menu;
