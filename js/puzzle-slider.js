var app = document.getElementById('puzzle-app');
var arr = [];

function mkTag(tag, clss, id, style, cont) {
    let html = document.createElement(tag);
    html.setAttribute('class', clss);
    html.setAttribute('id', id);
    html.setAttribute('style', style);
    html.textContent = cont;
    return html;
}

function find(location) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].loc == location) {
            return i;
        }
    }
}

function getH(id) {
    return document.getElementById(id);
}

function gSwap(cur) {
    var tar = arr[0].loc;
    let curI = find(cur);
    let tarI = find(tar);
    arr[curI].loc = tar;
    arr[tarI].loc = cur;
    arr[find(cur)].render();
    arr[find(tar)].render();

}

function locMap(rLoc) {
    // this function receives a location id as a number
    let j = rLoc % 4; // get a remainder for the column location
    let i = parseInt(rLoc / 4); // get a number for the row location
    return [i, j];  // return an array with the remainder and int
}

function proxCheck(cur) {
    let curC = locMap(cur);
    let tarC = locMap(arr[0].loc);
    if (curC[0] == tarC[0] && Math.abs(curC[1] - tarC[1]) == 1) {
        return true;
    } else if (curC[1] == tarC[1] && Math.abs(curC[0] - tarC[0]) == 1) {
        return true;
    } else {
        return false;
    }

}

function shuffle() {
    do {
        for (let j = 0; j < 500; j++) {
            let canMov = [];
            for (let i = 1; i < arr.length; i++) {
                if (proxCheck(arr[i].loc)) {
                    canMov.push(arr[i]);
                }
            }
            gSwap(canMov[Math.floor(Math.random() * canMov.length)].loc);
        }
    } while (winCheck());
}


class Tile {
    constructor(tileId, loc) {
        this.tileId = tileId;
        this.loc = loc;
        this.content = mkTag('img', '', 'c' + tileId, '', 'C' + tileId);
        this.content.addEventListener('click', function () {
            
            let FRESHLoc = parseInt(this.parentElement.id);

            if (proxCheck(FRESHLoc)) {

                gSwap(FRESHLoc);
                if (winCheck()) {
                    winAlert();
                }
            }

        });

    }

    render() {
        // console.log(this);
        let ht = document.getElementById(this.loc);
        ht.innerHTML = '';
        ht.appendChild(this.content);
    }
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function winAlert() {
    alert('YOU WON!');
}

function winCheck() {
    let win = 0;
    for (let i = 0; i < arr.length; i++) {
        
        if (arr[i].loc != arr[i].tileId) {
            win++;
        }
    }

    if (win == 0) {
        return true;
    } else {
        return false;
    }
}

function applyImg() {
    let img = document.getElementById('upload').files[0];
    let imgUrl = window.URL.createObjectURL(img);

    for (let i = 1; i < arr.length; i++) {
        arr[i].content.setAttribute('src', imgUrl);
    }
}

function puzzle_init() {
    app.innerHTML = '';

    for (let i = 0; i < 4; i++) {
        let row = mkTag('div', 'row', '', 'width:300px');
        for (let j = 0; j < 4; j++) {
            let id = i * 4 + j;
            row.appendChild(mkTag('div', 'col p-0', id, 'height:75px; width:75px; overflow: hidden;', ''))
        }
        app.appendChild(row);

    }

    // make tiles
    for (let i = 0; i < 16; i++) {
        let tile = new Tile(i, i);
        tile.render();
        arr.push(tile);
    }
    // add images
    for (let i = 1; i < arr.length; i++) {
        let coords = locMap(i);
        arr[i].content.setAttribute('src', '/images/jdh_coal_pile_puzzle.png');
        arr[i].content.setAttribute('style', `width: 300px; margin: -${coords[0] * 75}px 0 0 -${coords[1] * 75}px; object-fit: contain`)
        // arr[i].content.setAttribute('style', `margin: 0px 0 0 -100px; object-fit: contain`)
    }

    // reset btn
    let lastRow = mkTag('div', 'row mt-3', '', '', '');
    let btnCol = mkTag('div', 'col text-center', '', '', '');
    let reset = mkTag('button', 'btn btn-primary', 'reset', '', 'Shuffle');
    reset.addEventListener('click', shuffle)
    btnCol.appendChild(reset);
    lastRow.appendChild(btnCol);

    let page = document.getElementById('puzzle-slider');


    page.appendChild(lastRow);
    // console.log(arr);
    shuffle();
}
