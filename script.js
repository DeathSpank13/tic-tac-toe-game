/* Pixel Parlour — Tic-Tac-Toe
 * Vanilla JS. No dependencies, no backend, no storage of personal data.
 * Modes: 2-player (human vs human) and vs-Computer (unbeatable minimax).
 */

(function () {
    "use strict";

    // ----- State -----
    var WIN_LINES = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
        [0, 4, 8], [2, 4, 6]             // diagonals
    ];

    var board = ["", "", "", "", "", "", "", "", ""];
    var current = "X";        // whose turn it is
    var mode = "cpu";         // "cpu" | "human"
    var humanMark = "X";      // the mark the player controls in cpu mode
    var cpuMark = "O";
    var gameOver = false;
    var busy = false;         // blocks input while the computer "thinks"
    var scores = { X: 0, O: 0, D: 0 };

    // ----- DOM -----
    var boardEl = document.getElementById("board");
    var cells = Array.prototype.slice.call(boardEl.querySelectorAll(".cell"));
    var statusEl = document.getElementById("status");
    var markGroup = document.getElementById("markGroup");
    var scoreXEl = document.getElementById("scoreX");
    var scoreOEl = document.getElementById("scoreO");
    var scoreDEl = document.getElementById("scoreD");
    var labelXEl = document.getElementById("labelX");
    var labelOEl = document.getElementById("labelO");

    // ----- Helpers -----
    function winnerInfo(b) {
        for (var i = 0; i < WIN_LINES.length; i++) {
            var line = WIN_LINES[i];
            var a = b[line[0]];
            if (a && a === b[line[1]] && a === b[line[2]]) {
                return { mark: a, line: line };
            }
        }
        if (b.indexOf("") === -1) return { mark: "draw", line: null };
        return null;
    }

    function setStatus(text) {
        statusEl.textContent = text;
    }

    function labelFor(mark) {
        if (mode === "human") return "Player " + mark;
        return mark === humanMark ? "You" : "Computer";
    }

    function render() {
        for (var i = 0; i < 9; i++) {
            var cell = cells[i];
            var val = board[i];
            cell.textContent = val;
            cell.classList.remove("x", "o", "win");
            if (val === "X") cell.classList.add("x");
            if (val === "O") cell.classList.add("o");
            cell.disabled = gameOver || val !== "";
        }
    }

    function highlightWin(line) {
        if (!line) return;
        for (var i = 0; i < line.length; i++) {
            cells[line[i]].classList.add("win");
        }
    }

    function updateScoreboard() {
        scoreXEl.textContent = scores.X;
        scoreOEl.textContent = scores.O;
        scoreDEl.textContent = scores.D;
    }

    // ----- Minimax (unbeatable computer) -----
    // Returns a score from the perspective of the cpu.
    function minimax(b, isCpuTurn, depth) {
        var result = winnerInfo(b);
        if (result) {
            if (result.mark === cpuMark) return 10 - depth;
            if (result.mark === humanMark) return depth - 10;
            return 0; // draw
        }

        var mark = isCpuTurn ? cpuMark : humanMark;
        var best = isCpuTurn ? -Infinity : Infinity;

        for (var i = 0; i < 9; i++) {
            if (b[i] !== "") continue;
            b[i] = mark;
            var score = minimax(b, !isCpuTurn, depth + 1);
            b[i] = "";
            if (isCpuTurn) {
                if (score > best) best = score;
            } else {
                if (score < best) best = score;
            }
        }
        return best;
    }

    function bestCpuMove() {
        var bestScore = -Infinity;
        var move = -1;
        for (var i = 0; i < 9; i++) {
            if (board[i] !== "") continue;
            board[i] = cpuMark;
            var score = minimax(board, false, 0);
            board[i] = "";
            if (score > bestScore) {
                bestScore = score;
                move = i;
            }
        }
        return move;
    }

    // ----- Game flow -----
    function finishRound(result) {
        gameOver = true;
        busy = false;
        render();
        if (result.mark === "draw") {
            scores.D += 1;
            setStatus("It's a draw!");
        } else {
            scores[result.mark] += 1;
            highlightWin(result.line);
            setStatus(labelFor(result.mark) + " win" + (labelFor(result.mark) === "You" ? "" : "s") + "!");
        }
        updateScoreboard();
    }

    function advanceTurn() {
        var result = winnerInfo(board);
        if (result) {
            finishRound(result);
            return;
        }
        current = current === "X" ? "O" : "X";
        render();
        setStatus(labelFor(current) + "'s turn");
        maybeCpuMove();
    }

    function maybeCpuMove() {
        if (mode !== "cpu" || gameOver) return;
        if (current !== cpuMark) return;
        busy = true;
        render(); // cells already disabled via busy check below
        // small delay so the move feels natural
        setTimeout(function () {
            var move = bestCpuMove();
            if (move >= 0) {
                board[move] = cpuMark;
            }
            busy = false;
            advanceTurn();
        }, 320);
    }

    function handleCellClick(e) {
        if (gameOver || busy) return;
        var index = parseInt(e.currentTarget.getAttribute("data-index"), 10);
        if (board[index] !== "") return;
        if (mode === "cpu" && current !== humanMark) return;

        board[index] = current;
        advanceTurn();
    }

    function newRound() {
        board = ["", "", "", "", "", "", "", "", ""];
        current = "X";
        gameOver = false;
        busy = false;
        render();
        setStatus(labelFor(current) + "'s turn");
        // If the computer plays X, let it open.
        maybeCpuMove();
    }

    function resetScores() {
        scores = { X: 0, O: 0, D: 0 };
        updateScoreboard();
    }

    // ----- Control wiring -----
    function setMode(newMode) {
        mode = newMode;
        var modeBtns = document.querySelectorAll(".mode-btn");
        for (var i = 0; i < modeBtns.length; i++) {
            modeBtns[i].classList.toggle("is-active", modeBtns[i].getAttribute("data-mode") === newMode);
        }
        markGroup.classList.toggle("is-hidden", newMode !== "cpu");
        applyMarks();
        resetScores();
        newRound();
    }

    function setHumanMark(mark) {
        humanMark = mark;
        cpuMark = mark === "X" ? "O" : "X";
        var markBtns = document.querySelectorAll(".mark-btn");
        for (var i = 0; i < markBtns.length; i++) {
            markBtns[i].classList.toggle("is-active", markBtns[i].getAttribute("data-mark") === mark);
        }
        applyMarks();
        resetScores();
        newRound();
    }

    function applyMarks() {
        if (mode === "cpu") {
            labelXEl.textContent = humanMark === "X" ? "YOU" : "CPU";
            labelOEl.textContent = humanMark === "O" ? "YOU" : "CPU";
        } else {
            labelXEl.textContent = "X";
            labelOEl.textContent = "O";
        }
    }

    // ----- Events -----
    cells.forEach(function (cell) {
        cell.addEventListener("click", handleCellClick);
    });

    document.querySelectorAll(".mode-btn").forEach(function (btn) {
        btn.addEventListener("click", function () {
            setMode(btn.getAttribute("data-mode"));
        });
    });

    document.querySelectorAll(".mark-btn").forEach(function (btn) {
        btn.addEventListener("click", function () {
            setHumanMark(btn.getAttribute("data-mark"));
        });
    });

    document.getElementById("newRound").addEventListener("click", newRound);
    document.getElementById("resetScore").addEventListener("click", resetScores);

    // ----- Init -----
    applyMarks();
    updateScoreboard();
    newRound();
})();
