export const requireAuth = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({ message: 'Authentication required' });
    }
    next();
};

export const validateSwapRequest = (req, res, next) => {
    const { subjectCode, fromRollNumber, fromClass, currentSlot, desiredSlot } = req.body;
    
    if (!subjectCode || !fromRollNumber || !fromClass || !currentSlot || !desiredSlot) {
        return res.status(400).json({ 
            message: 'Missing required fields' 
        });
    }
    next();
};