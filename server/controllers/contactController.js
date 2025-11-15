import Contact from '../models/Contact.js';

// Create new contact submission
export const createContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    
    if (!name || !email || !message) {
      return res.status(400).json({ 
        success: false, 
        message: 'Name, email, and message are required' 
      });
    }
    
    const newContact = new Contact({ name, email, message });
    await newContact.save();
    
    console.log('📧 Contact form submission saved:', { name, email });
    
    res.json({ 
      success: true, 
      message: 'Thank you for your message! We\'ll get back to you soon.' 
    });
  } catch (error) {
    console.error('❌ Error saving contact:', error);
    res.status(500).json({ success: false, message: 'Error saving contact form' });
  }
};

// Get all contact submissions
export const getAllContacts = async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    let query = {};
    
    if (status) query.status = status;
    
    const skip = (page - 1) * limit;
    const contacts = await Contact.find(query)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(skip);
    
    const total = await Contact.countDocuments(query);
    
    res.json({ 
      success: true, 
      data: contacts,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        itemsPerPage: parseInt(limit)
      }
    });
  } catch (error) {
    console.error('❌ Error fetching contacts:', error);
    res.status(500).json({ success: false, message: 'Error fetching contacts' });
  }
};

// Get single contact by ID
export const getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ success: false, message: 'Contact not found' });
    }
    res.json({ success: true, data: contact });
  } catch (error) {
    console.error('❌ Error fetching contact:', error);
    res.status(500).json({ success: false, message: 'Error fetching contact' });
  }
};

// Update contact status
export const updateContactStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['new', 'read', 'replied', 'resolved'];
    
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid status. Must be one of: ' + validStatuses.join(', ')
      });
    }
    
    const updatedContact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    
    if (!updatedContact) {
      return res.status(404).json({ success: false, message: 'Contact not found' });
    }
    
    res.json({ success: true, data: updatedContact });
  } catch (error) {
    console.error('❌ Error updating contact:', error);
    res.status(500).json({ success: false, message: 'Error updating contact' });
  }
};

// Delete contact
export const deleteContact = async (req, res) => {
  try {
    const deletedContact = await Contact.findByIdAndDelete(req.params.id);
    
    if (!deletedContact) {
      return res.status(404).json({ success: false, message: 'Contact not found' });
    }
    
    res.json({ success: true, message: 'Contact deleted successfully' });
  } catch (error) {
    console.error('❌ Error deleting contact:', error);
    res.status(500).json({ success: false, message: 'Error deleting contact' });
  }
};