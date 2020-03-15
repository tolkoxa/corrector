document.querySelector('.settings-button').onclick = function(e) {
    e.preventDefault();
    document.getElementById('check').checked ? chText.mainCheck(1) : chText.mainCheck(0);
};

document.getElementById('copyText').onclick = function(e) {
    let strCopy = document.getElementById("resultData");

    strCopy.focus();
    strCopy.select();
    strCopy.setSelectionRange(0, 99999);

    document.execCommand("copy");
    e.preventDefault();
}

class Change {
    constructor(check) {
        this.check = check;
    }

    mainCheck(check) {
        if (check == 0) {
            var leftAquo = '«';
            var rightAquo = '»';
        } else {
            var leftAquo = '„';
            var rightAquo = '“';
        }
        this.mainChange(leftAquo, rightAquo);
    }

    mainChange(leftAquo, rightAquo) {
        let setChange = [/ '\.| "\./gm,
            / '\,| "\,/gm,
            / ' | " | '| "/gm,
            /\.'|\."/gm,
            /\?'|\?"/gm,
            /' |" /gm,
            / - /gm,
            /'\.|"\./gm,
            /^'|^"/gm,
            /'$|"$/gm,
            /- | -|-/gm,
            /руб(?!л)|руб\./gm,
            / +/gm,
            / \./gm,
            / $|^ /gm,
            / \,/gm
        ];
        let propChange = [rightAquo + '.',
            rightAquo + ',',
            ' ' + leftAquo,
            rightAquo + '.',
            '?' + rightAquo + '.',
            rightAquo + ' ',
            ' — ',
            rightAquo + '.',
            leftAquo,
            rightAquo,
            '–',
            '&#8381;',
            ' ',
            '.',
            '',
            ','
        ];

        let str = document.getElementById('insertData').value;
        let strNew = str.replace(setChange[0], propChange[0]);

        for (let i = 0; i < setChange.length; i++) {
            strNew = strNew.replace(setChange[i], propChange[i]);
        }

        this.render(strNew);
    }

    render(strNew) {
        document.getElementById('resultData').innerHTML = strNew;
    }
}

let chText = new Change();