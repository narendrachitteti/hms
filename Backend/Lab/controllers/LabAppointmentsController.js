const Appointment = require('../models/LabAppointmentsModel');

// Controller function to create an appointment
exports.createLabAppointment = async (req, res) => {
  const appointmentData = req.body;

  try {
    const newAppointment = new Appointment(appointmentData);
    await newAppointment.save();
    res.status(200).json({ message: 'Appointment created successfully.' });
  } catch (error) {
    console.error('Error creating appointment:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

// Controller function to update an appointment
exports.updateLabAppointment = async (req, res) => {
  const appointmentId = req.params.id;
  const updatedAppointmentData = req.body;

  try {
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      updatedAppointmentData,
      { new: true }
    );

    if (!updatedAppointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    res.status(200).json({ message: 'Appointment updated successfully' });
  } catch (error) {
    console.error('Error updating appointment:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller function to fetch appointments
exports.fetchLabAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.status(200).json(appointments);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};
