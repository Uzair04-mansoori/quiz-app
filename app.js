const Qs = [{
        q: 'What does HTML stand for?',
        o: ['Hyperlinks and Text Markup Language', 'Hypertext Markup Language', 'Home Tool Markup Language'],
        a: 'Hypertext Markup Language'
    },
    {
        q: 'Who is making the Web standards?',
        o: ['Google', 'The World Wide Web Consortium', 'Microsoft'],
        a: 'The World Wide Web Consortium'
    },
    {
        q: 'Correct HTML element for the largest heading:',
        o: ['<heading>', '<h6>', '<h1>'],
        a: '<h1>'
    },
    {
        q: 'Correct HTML element for inserting a line break?',
        o: ['<linebreak>', '<br>', '<break>'],
        a: '<br>'
    },
    {
        q: 'Correct HTML for adding a background color?',
        o: ['<body bg="yellow">', '<background>yellow</background>', '<body style="background-color:yellow;">'],
        a: '<body style="background-color:yellow;">'
    },
    {
        q: 'Correct HTML element to define important text:',
        o: ['<strong>', '<b>', '<i>'],
        a: '<strong>'
    },
    {
        q: 'Correct HTML element to define emphasized text:',
        o: ['<italic>', '<i>', '<em>'],
        a: '<em>'
    },
    {
        q: 'Correct HTML for creating a hyperlink?',
        o: [
            '<a>http://www.w3schools.com</a>',
            '<a href="http://www.w3schools.com">W3Schools</a>',
            '<a url="http://www.w3schools.com">W3Schools.com</a>'
        ],
        a: '<a href="http://www.w3schools.com">W3Schools</a>'
    }
];

let cur = 0,
    score = 0,
    done = false,
    tid = null,
    tl = 60;

function escapeHTML(str) {
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

function setT(n) {
    const el = document.getElementById('tmr-val');
    el.textContent = n;
    el.classList.toggle('hot', n <= 10);
}

function startTimer() {
    clearInterval(tid);
    tl = 60;
    setT(60);
    tid = setInterval(() => {
        tl--;
        setT(tl);
        if (tl <= 0) {
            clearInterval(tid);
            if (!done) autoEnd();
        }
    }, 1000);
}

function autoEnd() {
    done = true;
    document.querySelectorAll('.opt-row').forEach(o => {
        o.classList.add('lock');
        if (o.dataset.v === Qs[cur].a) o.classList.add('correct');
    });
    const fb = document.getElementById('fb-text');
    fb.className = 'bad';
    fb.textContent = "Time's up — correct answer highlighted.";
    document.getElementById('next-btn').disabled = false;
}

function loadQ() {
    done = false;
    const q = Qs[cur];
    const pct = Math.round(((cur + 1) / Qs.length) * 100);

    document.getElementById('q-text').textContent = q.q;
    document.getElementById('q-counter-badge').textContent = 'Question ' + (cur + 1) + ' of ' + Qs.length;
    document.getElementById('prog-fill').style.width = pct + '%';
    document.getElementById('fb-text').textContent = '';
    document.getElementById('fb-text').className = '';

    const nb = document.getElementById('next-btn');
    nb.disabled = true;
    nb.innerHTML = cur === Qs.length - 1 ? 'See Results &rarr;' : 'Next &rarr;';

    const list = document.getElementById('opts-list');
    list.innerHTML = '';

    q.o.forEach(op => {
        const d = document.createElement('div');
        d.className = 'opt-row';
        d.dataset.v = op;

        const ring = document.createElement('span');
        ring.className = 'radio-ring';
        const dot = document.createElement('span');
        dot.className = 'radio-inner';
        ring.appendChild(dot);

        const txt = document.createElement('span');
        txt.className = 'opt-txt';
        txt.innerHTML = escapeHTML(op);

        d.appendChild(ring);
        d.appendChild(txt);
        d.onclick = () => pick(d, op, q.a);
        list.appendChild(d);
    });

    startTimer();
}

function pick(el, val, ans) {
    if (done) return;
    done = true;
    clearInterval(tid);

    document.querySelectorAll('.opt-row').forEach(o => o.classList.add('lock'));

    const fb = document.getElementById('fb-text');
    if (val === ans) {
        el.classList.add('sel', 'correct');
        fb.className = 'good';
        fb.textContent = 'Correct!';
        score++;
    } else {
        el.classList.add('sel', 'wrong');
        fb.className = 'bad';
        fb.textContent = 'Incorrect — correct answer highlighted.';
        document.querySelectorAll('.opt-row').forEach(o => {
            if (o.dataset.v === ans) o.classList.add('correct');
        });
    }
    document.getElementById('next-btn').disabled = false;
}

function nextQ() {
    cur++;
    if (cur >= Qs.length) showResult();
    else loadQ();
}

function showResult() {
    clearInterval(tid);
    document.getElementById('quiz-section').style.display = 'none';
    document.getElementById('result-wrap').style.display = 'block';

    const pct = Math.round((score / Qs.length) * 100);
    document.getElementById('res-score').textContent = score;
    document.getElementById('s-cor').textContent = score;
    document.getElementById('s-wrg').textContent = Qs.length - score;
    document.getElementById('s-pct').textContent = pct + '%';

    const t = pct === 100 ? 3 : pct >= 75 ? 2 : pct >= 50 ? 1 : 0;
    const msgs = ['Maybe try a little harder.', 'Better luck next time.', 'You did alright.', 'Great job!'];
    const subs = [
        'Review the basics and give it another shot.',
        'A little revision and you\'ll ace it.',
        'Good effort — almost there!',
        'Every single question right. Impressive.'
    ];
    document.getElementById('res-msg').textContent = msgs[t];
    document.getElementById('res-sub').textContent = subs[t];
}

function restart() {
    cur = 0;
    score = 0;
    done = false;
    document.getElementById('quiz-section').style.display = 'block';
    loadQ();
}

loadQ();
