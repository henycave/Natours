/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';
const stripe = Stripe(
  'pk_test_51P8zyL082InnKqIgxQnj3bIqXQUMldQV7te7k0rY64bKP93xABc8Sf5MaupDzkhP7ytGAO27SXn6xXQ1m6e4xrrD00OuggNh9x',
);

export const bookTour = async (tourId) => {
  try {
    const session = await axios(
      `http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}`,
    );
    console.log(session);

    await stripe.redirectToCheckout({ sessionId: session.data.session.id });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
