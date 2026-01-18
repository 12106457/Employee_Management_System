const Employee = require('../models/Employee');

const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createEmployee = async (req, res) => {
  try {
    const { fullName, gender, dob, state, active } = req.body;

    const profileImage = req.file ? req.file.buffer : null;

    const newEmployee = await Employee.create({
      fullName,
      gender,
      dob,
      state,
      active: active === 'true' || active === true,
      profileImage
    });

    res.status(201).json(newEmployee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { fullName, gender, dob, state, active } = req.body;

    const employee = await Employee.findOne({ id });

    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    const profileImage = req.file ? req.file.buffer : employee.profileImage;

    const updatedEmployee = await Employee.findOneAndUpdate(
      { id },
      {
        fullName,
        gender,
        dob,
        state,
        active: active === 'true' || active === true,
        profileImage
      },
      { new: true }
    );

    res.json(updatedEmployee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    const employee = await Employee.findOne({ id });

    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    const deletedEmployee = await Employee.findOneAndDelete({ id });

    res.json(deletedEmployee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee
};
