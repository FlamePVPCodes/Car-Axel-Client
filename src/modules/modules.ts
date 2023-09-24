function NoForceReload(active, options) {
    if (active) {
        // Prevent page reload prompt
        window.onbeforeunload = function (e) {
            return "Please don't leave!";
        };
    } else {
        // Disable the page reload prompt
        window.onbeforeunload = null;
    }
}

function none(active, options) {
    return;
}

function changeGame(game) {
    const gamesIframe = document.getElementById('cac__games__iframe');
    if (gamesIframe) {
        gamesIframe.src = game;
    }
}

function game2048(active, options) {
    if (active) {
        // Load the 2048 game
        changeGame('https://penguinify-web-dev.github.io/2048/');
    }
}

function bb(active, options) {
    if (active) {
        // Load the Basketball game
        changeGame('https://penguinify-web-dev.github.io/bb/index.html');
    }
}

function ducklife4(active, options) {
    if (active) {
        // Load the Duck Life 4 game
        changeGame('https://penguinify-web-dev.github.io/ducklife4/index.html');
    }
}

function bloons4(active, options) {
    if (active) {
        // Load the Bloons TD 4 game
        changeGame('https://penguinify-web-dev.github.io/btd4.html');
    }
}

function motoxm3(active, options) {
    if (active) {
        // Load the Moto XM3 game
        changeGame('https://penguinify-web-dev.github.io/motox3m/index.html');
    }
}

function rom(active, options) {
    if (active) {
        // Load the ROM game
        changeGame('https://penguinify-web-dev.github.io/temptations/index.html');
    }
}

function slope(active, options) {
    if (active) {
        // Load the Slope game
        changeGame('https://penguinify-web-dev.github.io/slope/index.html');
    }
}

function motoxm3winter(active, options) {
    if (active) {
        // Load the Moto XM3 Winter game
        changeGame('https://penguinify-web-dev.github.io/wintermotox3m/index.html');
    }
}

function agario(active, options) {
    if (active) {
        // Load the Agar IO game
        changeGame('https://penguinify-web-dev.github.io/agario-minigame/dots.html');
    }
}

function gameretrobowl(active, options) {
    if (active) {
        // Load the Retro Bowl game
        changeGame('https://penguinify-web-dev.github.io/retro-bowl/retro.html');
    }
}

function bbs(active, options) {
    if (active) {
        // Load the Basketball Stars game
        changeGame('https://penguinify-web-dev.github.io/basketball-stars/index.html');
    }
}

function none(active, options) {
    return;
}

function mouseTrail(active, options) {
    if (active) {
        // Create a mouse trail
        const div = document.createElement('div');
        div.id = 'cac__mouseTrail';
        div.style.position = 'fixed';
        div.style.width = '30px';
        div.style.height = '30px';
        div.style.borderRadius = '50%';
        div.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
        div.style.zIndex = '9999999999999999999999';
        div.style.transition = 'border 0.5s ease';
        div.style.pointerEvents = 'none';

        document.body.appendChild(div);

        document.addEventListener('mousemove', (e) => {
            // Animate the mouse trail
            div.animate([{ left: `${e.clientX - 15}px`, top: `${e.clientY - 15}px` }], { duration: 1000, fill: 'forwards', easing: 'ease' });
        });
    } else {
        const div = document.getElementById('cac__mouseTrail');
        if (div) div.remove();
    }
}

function editPageText(active, options) {
    if (active) {
        // Enable page text editing
        document.body.contentEditable = 'true';
    } else {
        // Disable page text editing
        document.body.contentEditable = 'false';
    }
}

function adremover(active, options) {
    if (active) {
        // Implement your ad removal logic here
    }
}

function betterforceselect(active, options) {
    if (active) {
        // Improve element selection functionality
        const allElements = document.body.querySelectorAll('*');
        allElements.forEach(function (element) {
            element.style.setProperty('user-select', 'auto', 'important');
        });
    }
}

function uhoh(active, options) {
    if (active) {
        // Implement "Uh-oh" functionality here
    }
}

function suggestfeature(active, options) {
    if (active) {
        // Open the feature suggestion page
        window.open('https://github.com/car-axle-client/car-axle-client/issues/new?assignees=&labels=enhancement&projects=&template=new_feature.md&title=Feature');
    }
}

function checkupdate(active, options) {
    if (active) {
        // Check for updates
        import('../updater').then((updater) => {
            updater.getUpdate(document.getElementById('cac__CONATAINER'));
        });
    }
}

const functions = {
    NoForceReload,
    game2048,
    gameretrobowl,
    mouseTrail,
    adremover,
    editPageText,
    none,
    betterforceselect,
    bloons1,
    bloons2,
    agario,
    motoxm3winter,
    slope,
    rom,
    yohoho,
    uhoh,
    bbs,
    minecraft,
    motoxm3,
    ducklife4,
    checkupdate,
    bb,
    bloons4,
    suggestfeature,
};

export default functions;
