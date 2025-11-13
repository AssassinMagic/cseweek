// RSVP functionality
document.addEventListener('DOMContentLoaded', function() {
    const rsvpForm = document.getElementById('rsvpForm');
    const confirmationMessage = document.getElementById('confirmationMessage');
    const rsvpListContainer = document.getElementById('rsvpListContainer');
    const rsvpCount = document.getElementById('rsvpCount');

    // Load RSVPs from localStorage
    loadRSVPs();

    // Handle form submission
    rsvpForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form data
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const affiliation = document.getElementById('affiliation').value;
        const dietary = document.getElementById('dietary').value.trim();

        // Get selected events
        const eventCheckboxes = document.querySelectorAll('input[name="events"]:checked');
        const events = Array.from(eventCheckboxes).map(cb => cb.value);

        // Validate at least one event is selected
        if (events.length === 0) {
            alert('Please select at least one event to attend.');
            return;
        }

        // Create RSVP object
        const rsvp = {
            name: name,
            email: email,
            affiliation: affiliation,
            events: events,
            dietary: dietary,
            timestamp: new Date().toISOString()
        };

        // Save RSVP
        saveRSVP(rsvp);

        // Show confirmation message
        rsvpForm.classList.add('hidden');
        confirmationMessage.classList.remove('hidden');

        // Scroll to confirmation
        confirmationMessage.scrollIntoView({ behavior: 'smooth' });

        // Reset form and show it again after 3 seconds
        setTimeout(function() {
            rsvpForm.reset();
            rsvpForm.classList.remove('hidden');
            confirmationMessage.classList.add('hidden');
        }, 3000);

        // Reload RSVP list
        loadRSVPs();
    });

    function saveRSVP(rsvp) {
        // Get existing RSVPs from localStorage
        let rsvps = JSON.parse(localStorage.getItem('cseweek_rsvps') || '[]');
        
        // Add new RSVP
        rsvps.push(rsvp);
        
        // Save back to localStorage
        localStorage.setItem('cseweek_rsvps', JSON.stringify(rsvps));
    }

    function loadRSVPs() {
        // Get RSVPs from localStorage
        const rsvps = JSON.parse(localStorage.getItem('cseweek_rsvps') || '[]');
        
        // Update count
        rsvpCount.textContent = `${rsvps.length} attendee${rsvps.length !== 1 ? 's' : ''} registered`;
        
        // Clear existing list
        rsvpListContainer.innerHTML = '';
        
        if (rsvps.length === 0) {
            rsvpListContainer.innerHTML = '<p style="text-align: center; color: #888;">No RSVPs yet. Be the first to register!</p>';
            return;
        }
        
        // Display RSVPs (most recent first)
        rsvps.reverse().forEach(function(rsvp) {
            const rsvpItem = document.createElement('div');
            rsvpItem.className = 'rsvp-item';
            
            const eventLabels = {
                'monday': 'Opening Ceremony',
                'tuesday': 'Tech Talk',
                'wednesday': 'Hackathon',
                'thursday': 'Career Fair',
                'friday': 'Closing Celebration'
            };
            
            const eventsText = rsvp.events.map(e => eventLabels[e]).join(', ');
            
            rsvpItem.innerHTML = `
                <div class="name">${escapeHtml(rsvp.name)}</div>
                <div class="affiliation">${escapeHtml(getAffiliationLabel(rsvp.affiliation))}</div>
                <div class="events">Attending: ${escapeHtml(eventsText)}</div>
            `;
            
            rsvpListContainer.appendChild(rsvpItem);
        });
    }

    function getAffiliationLabel(value) {
        const labels = {
            'student': 'Student',
            'faculty': 'Faculty',
            'alumni': 'Alumni',
            'industry': 'Industry Professional',
            'other': 'Other'
        };
        return labels[value] || value;
    }

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
});
