import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import Field, { FIELD_TYPES } from "../../components/Field";
import Select from "../../components/Select";
import Button, { BUTTON_TYPES } from "../../components/Button";

const mockContactApi = () => new Promise((resolve) => {
  setTimeout(() => {
    resolve(); 
  }, 1000);
});

const Form = ({ onSuccess, onError }) => {
  const [sending, setSending] = useState(false);
  const [errors, setErrors] = useState({});

 //  la fonction validEmail permet de vérifier si une adresse e-mail est bien formatée
  const validEmail = (email) => {
    //  Cette ligne crée une expression régulière qui correspond au format attendu d'une adresse e-mail. 
    const emailFormat = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    //  Cette ligne utilise la méthode test de l'expression régulière pour vérifier si la chaîne 
    //   de caractères email correspond au modèle défini
    return emailFormat.test(email);
  };

  const sendContact = useCallback(
    async (evt) => {
      evt.preventDefault();
      setSending(true);
      setErrors({});

      const { nom, prenom, email, message } = evt.target;

      const newAddErrors = {};

      if (!nom.value) {
        newAddErrors.nom = "Veuillez remplir ce champ.";
      }

      if (!prenom.value) {
        newAddErrors.prenom = "Veuillez remplir ce champ.";
      }

      if (!validEmail(email.value)) {
        newAddErrors.email = "Veuillez entrer une adresse e-mail valide (ex. exemple@email.com).";
      }

      if (!message.value) {
        newAddErrors.message = "Veuillez entrer un message.";
      }

      setErrors(newAddErrors);

      try {
        await mockContactApi();
        setSending(false);
        evt.target.reset();
        onSuccess();
      } catch (err) {
        setSending(false);
        onError(err);
      }
    },
    [onSuccess, onError]
  );

  return (
    <form onSubmit={sendContact}>
      <div className="row">
        <div className="col">
          <Field name="nom" placeholder="" label="Nom" />
          {errors.nom && <div className="error-message">{errors.nom}</div>}
          <Field name="prenom" placeholder="" label="Prénom" />
          {errors.prenom && <div className="error-message">{errors.prenom}</div>}
          <Select
            selection={["Personnel", "Entreprise"]}
            onChange={() => null}
            label="Personnel / Entreprise"
            type="large"
            titleEmpty
          />
          <Field name="email" placeholder="" label="Email" />
          {errors.email && <div className="error-message">{errors.email}</div>}
          <Button
            type={BUTTON_TYPES.SUBMIT}
            data-testid="button-test-id"
            disabled={sending}
          >
            {sending ? "En cours" : "Envoyer"}
          </Button>
        </div>
        <div className="col">
          <Field
            name="message"
            placeholder="Message"
            label="Message"
            type={FIELD_TYPES.TEXTAREA}
          />
          {errors.message && <div className="error-message">{errors.message}</div>}
        </div>
      </div>
    </form>
  );
};

Form.propTypes = {
  onError: PropTypes.func,
  onSuccess: PropTypes.func,
};

Form.defaultProps = {
  onError: () => null,
  onSuccess: () => null,
};

export default Form;
