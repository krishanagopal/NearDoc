const Appointment = require("../models/Appointment");
const Availability = require("../models/Avaibility");


const bookAppointment = async (req, res) => {
  try {
    const { doctorId, date, time } = req.body;

    // Step 1: Basic validation
    if (!doctorId || !date || !time) {
      return res.status(400).json({
        message: "doctorId, date and time are required",
      });
    }

    // Step 2: Find availability
    const availability = await Availability.findOne({
      doctor: doctorId,
      date: new Date(date),
      isHoliday: false,
    });

    // Step 3: Guard — availability must exist
    if (!availability) {
      return res.status(400).json({
        message: "Doctor is not available on this date",
      });
    }

    // Step 4: Guard — slots must exist and include time
    if (
      !Array.isArray(availability.slots) ||
      !availability.slots.includes(time)
    ) {
      return res.status(400).json({
        message: "Requested time slot is not available",
      });
    }

    // Step 5: Prevent double booking
    const existingAppointment = await Appointment.findOne({
        doctor: doctorId,
        date: new Date(date),
        timeSlot: time,
    });



    if (existingAppointment) {
      return res.status(400).json({
        message: "This slot is already booked",
      });
    }

    // Step 6: Create appointment
    const appointment = await Appointment.create({
        doctor: doctorId,
        patient: req.user._id,
        date: new Date(date),
        timeSlot: time,
     });


    // Final success response
    return res.status(201).json({
      message: "Appointment booked successfully",
      appointment,
    });
  } catch (error) {
    console.error("BOOK APPOINTMENT ERROR:", error);
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};


const getMyAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({
      patient: req.user._id,
    })
      .populate("doctor", "name specialization city")
      .sort({ date: 1, timeSlot: 1 });

    return res.status(200).json({
      appointments,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};
const getDoctorAppointments = async (req, res) => {
  try {
    res.status(200).json({
      message: "Get doctor appointments placeholder",
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};


module.exports = {
  bookAppointment,
  getMyAppointments,
  getDoctorAppointments,
};
