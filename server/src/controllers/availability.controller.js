const Availability = require("../models/Avaibility");


const createAvailability = async (req, res) => {
  try {
    const { date, slots, isHoliday } = req.body;

    // Basic validation
    if (!date) {
      return res.status(400).json({
        message: "Date is required",
      });
    }

    if (!isHoliday && (!slots || slots.length === 0)) {
      return res.status(400).json({
        message: "Slots are required unless it is a holiday",
      });
    }

    //prevent duplicate availability criteia

    // Prevent duplicate availability for same doctor and date
const existingAvailability = await Availability.findOne({
  doctor: req.user._id,
  date: new Date(date),
});

if (existingAvailability) {
  return res.status(400).json({
    message: "Availability already exists for this date",
  });
}

const availability = await Availability.create({
  doctor: req.user._id,
  date: new Date(date),
  slots: isHoliday ? [] : slots,
  isHoliday: isHoliday || false,
});

return res.status(201).json({
  message: "Availability created successfully",
  availability,
});



    
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};


const getAvailabilityByDoctor = async (req, res) => {
  try {
    const { doctorId } = req.params;

    const availability = await Availability.find({
      doctor: doctorId,
    }).sort({ date: 1 });

    return res.status(200).json({
      availability,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};


module.exports = {
  createAvailability,
  getAvailabilityByDoctor,
};
