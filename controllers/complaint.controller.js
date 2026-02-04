let complaints = [];
let idCounter = 1;

export const getAllComplaints = (req, res) => {
  res.json(complaints);
};

export const createComplaint = (req, res) => {
  const { title, description } = req.body;

  const newComplaint = {
    id: idCounter++,
    title,
    description,
    status: "open"
  };

  complaints.push(newComplaint);
  res.status(201).json(newComplaint);
};

export const resolveComplaint = (req, res) => {
  const id = Number(req.params.id);

  const complaint = complaints.find(c => c.id === id);

  if (!complaint) {
    return res.status(404).json({ message: "Complaint not found" });
  }

  complaint.status = "resolved";
  res.json(complaint);
};

export const deleteComplaint = (req, res) => {
  const id = Number(req.params.id);

  const index = complaints.findIndex(c => c.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Complaint not found" });
  }

  complaints.splice(index, 1);
  res.json({ message: "Complaint deleted" });
};
