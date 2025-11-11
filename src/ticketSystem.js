// src/ticketSystem.js

/**
 * Calculate total fare.
 * @param {number} seats - number of seats requested
 * @param {number} pricePerSeat - price for one seat
 * @returns {number} total fare
 */
function calculateFare(seats, pricePerSeat) {
  if (!Number.isFinite(seats) || !Number.isFinite(pricePerSeat)) {
    throw new Error("Invalid numeric input for seats or pricePerSeat");
  }
  if (seats < 0 || pricePerSeat < 0) {
    throw new Error("Seats and price must be non-negative");
  }
  return seats * pricePerSeat;
}

/**
 * Check seat availability.
 * @param {number} availableSeats - seats currently available
 * @param {number} requestedSeats - seats requested by the user
 * @returns {boolean} true if available, false otherwise
 */
function isSeatAvailable(availableSeats, requestedSeats) {
  if (!Number.isFinite(availableSeats) || !Number.isFinite(requestedSeats)) {
    throw new Error("Invalid numeric input for availableSeats or requestedSeats");
  }
  if (availableSeats < 0 || requestedSeats < 0) {
    throw new Error("Seat numbers must be non-negative");
  }
  return requestedSeats <= availableSeats;
}

/**
 * Attempt booking and return a booking result object.
 * This function only encapsulates logic (no DOM).
 * @param {Object} params
 * @param {string} params.name
 * @param {string} params.destination
 * @param {number} params.seats
 * @param {number} params.pricePerSeat
 * @param {number} params.availableSeats
 * @returns {Object} { success: boolean, message: string, totalFare?: number }
 */
function bookTicket({ name, destination, seats, pricePerSeat, availableSeats }) {
  // Basic validation
  if (!name || !destination || !Number.isFinite(seats) || !Number.isFinite(pricePerSeat)) {
    return { success: false, message: "Please fill in all fields correctly." };
  }
  if (seats <= 0) {
    return { success: false, message: "Number of seats must be greater than 0." };
  }
  if (!isSeatAvailable(availableSeats, seats)) {
    return { success: false, message: "Requested seats not available." };
  }
  const totalFare = calculateFare(seats, pricePerSeat);
  return {
    success: true,
    message: `Booking confirmed for ${name} to ${destination}. Seats: ${seats}. Total fare: $${totalFare}.`,
    totalFare
  };
}

module.exports = {
  calculateFare,
  isSeatAvailable,
  bookTicket
};
