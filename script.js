$(document).ready(function() {
    const fridgeImage = $('#fridge-image');
    
    fridgeImage.on('mouseenter', function() {
        $(this).attr('src', '/icons/fridge2.png');
    });
    
    fridgeImage.on('mouseleave', function() {
        $(this).attr('src', '/icons/fridge1.png');
    });
});

$(document).ready(function() {
    const fridgeImage = $('#fridge-inside');
    
    fridgeImage.on('mouseenter', function() {
        $(this).attr('src', '/icons/fridge1.png');
    });
    
    fridgeImage.on('mouseleave', function() {
        $(this).attr('src', '/icons/fridge2.png');
    });
});

// Update time display
function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString();
    $('#time-display').text(timeString);
}

$(document).ready(function() {
    updateTime();
    setInterval(updateTime, 1000);
});

// Handle item clicks to display and position images
$(document).ready(function() {
    let itemCount = 0;
    const openItems = {}; // Track which items are open
    
    $('.item').on('click', function() {
        const imageSrc = $(this).data('image');
        const itemName = $(this).text();
        const itemText = $(this).text().toLowerCase().trim();
        
        if (imageSrc) {
            // Check if item is already open
            if (openItems[itemText]) {
                // Close the item if clicked again
                $('#' + openItems[itemText]).remove();
                delete openItems[itemText];
            } else {
                // Create new item
                itemCount++;
                const itemId = 'draggable-item-' + itemCount;
                
                // Create draggable item element (no close button)
                const $draggableItem = $('<div class="draggable-item" id="' + itemId + '"><img src="' + imageSrc + '" alt="' + itemName + '"></div>');
                
                // Randomize position within the right side of the screen
                const minTop = 100;
                const maxTop = window.innerHeight - 200;
                const minLeft = window.innerWidth * 0.55;
                const maxLeft = window.innerWidth - 250;
                
                const randomTop = minTop + Math.random() * (maxTop - minTop);
                const randomLeft = minLeft + Math.random() * (maxLeft - minLeft);
                
                $draggableItem.css({
                    'position': 'fixed',
                    'top': randomTop + 'px',
                    'left': randomLeft + 'px',
                    'z-index': 1000
                });
                
                $('body').append($draggableItem);
                
                // Make the item draggable with jQuery UI
                $('#' + itemId).draggable({
                    cursor: 'move',
                    containment: 'window'
                });
                
                openItems[itemText] = itemId;
            }
        }
    });
    
    // Close items when parent details are closed
    $('details').on('toggle', function() {
        if (!this.open) {
            // Details is closing, close all items in this details
            const $details = $(this);
            $details.find('.item').each(function() {
                const itemText = $(this).text().toLowerCase().trim();
                if (openItems[itemText]) {
                    $('#' + openItems[itemText]).remove();
                    delete openItems[itemText];
                }
            });
        }
    });
});

// Make beefless bulgogi draggable
$(document).ready(function() {
    const beeflessImg = document.getElementById('beefless-bulgogi');
    
    if (beeflessImg) {
        beeflessImg.addEventListener('dragstart', function(e) {
            e.dataTransfer.effectAllowed = 'move';
        });
    }
});

