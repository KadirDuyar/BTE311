// Strict Mode
"use strict";

// Sayfa tamamen yüklendiğinde çalıştır
window.onload = function() {

    // Canvas ve skor etiketleri
    const canvas = document.getElementById('canvas');
    const scoreLabel = document.getElementById('current-score');
    const targetLabel = document.getElementById('target-score');

    // UI Elementleri
    const startBtn = document.querySelector('.start-btn'); // HTML'de class="start start-btn"
    const gameSettings = document.querySelector('.game-settings');
    const gameOverScreen = document.querySelector('.game-over');
    const gameOverTitle = document.querySelector('.game-over h1');
    const retryBtn = document.querySelector('.retry-btn');
    const langBtn = document.getElementById('langBtn');

    // Görseller
    const catImg = new Image();  catImg.src = 'kedi.png';
    const dogImg = new Image();  dogImg.src = 'kopek.png';
    const mouseImg = new Image(); mouseImg.src = 'fare.png';

    // 2D context
    const context = canvas.getContext('2d');

    // Oyun değişkenleri
    let enemies = [];
    let mice = [];
    let score = 0;
    let targetScore = 10;
    let gameEnds = false;
    let gameWins = false;
    let animationId;

    // Kedi / hareket ayarları
    let player;
    let playerSpeed = 5;
    let enemySpeedMax = 2.5;

    canvas.width  = 1200;
    canvas.height = 550;

    let player_is_immortal = true;

    let keys = {
        up: false, down: false, left: false, right: false,
        w: false, a: false, s: false, d: false
    };

    // Ölümsüzlük süresi
    function startImmortality() {
        player_is_immortal = true;
        setTimeout(() => {
            player_is_immortal = false;
        }, 3000);
    }

    // Mesafe
    function getDistance(x1, y1, x2, y2) {
        let xDistance = x2 - x1;
        let yDistance = y2 - y1;
        return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
    }

    // Güvenli doğma noktası
    function isSafeSpawn(x, y, playerX, playerY, safeRadius) {
        return getDistance(x, y, playerX, playerY) > safeRadius;
    }

    // Formdan ayarları al
    function getSettings() {
        let enemyInput = document.getElementById('enemy_numbers').value;
        let targetInput = document.getElementById('target_input').value;

        let enemyCount = (enemyInput && parseInt(enemyInput) >= 2) ? parseInt(enemyInput) : 10;
        targetScore = (targetInput && parseInt(targetInput) >= 1) ? parseInt(targetInput) : 10;

        return { enemyCount, targetScore };
    }

    // -------- SINIFLAR --------

    const Enemy = function(x, y, dx, dy, radius) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = radius;
    };

    Enemy.prototype.draw = function() {
        context.drawImage(
            dogImg,
            this.x - this.radius,
            this.y - this.radius,
            this.radius * 2,
            this.radius * 2
        );
    };

    Enemy.prototype.update = function() {
        if (this.x + this.dx > canvas.width - this.radius || this.x + this.dx < this.radius) {
            this.dx = -this.dx;
        }
        if (this.y + this.dy > canvas.height - this.radius || this.y + this.dy < this.radius) {
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;
        this.draw();
    };

    const Mouse = function(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
    };

    Mouse.prototype.draw = function() {
        context.drawImage(
            mouseImg,
            this.x - this.radius,
            this.y - this.radius,
            this.radius * 2,
            this.radius * 2
        );
    };

    const Player = function(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.radius = size - 5;
        this.angle = 0;
    };

    Player.prototype.draw = function() {
        context.save();
        context.translate(this.x, this.y);

        // Ölümsüzse saydam olsun
        context.globalAlpha = player_is_immortal ? 0.5 : 1.0;

        // Sola doğru gidiyorsa (angle = π) aynala
        if (this.angle === Math.PI) {
            context.scale(-1, 1);
        }

        context.drawImage(
            catImg,
            -this.size,
            -this.size,
            this.size * 2,
            this.size * 2
        );

        context.restore();
        context.globalAlpha = 1;
    };

    Player.prototype.update = function() {
        // Sınırlar
        if (this.x > canvas.width - this.size) this.x = canvas.width - this.size;
        if (this.x < this.size) this.x = this.size;
        if (this.y > canvas.height - this.size) this.y = canvas.height - this.size;
        if (this.y < this.size) this.y = this.size;
        this.draw();
    };

    // -------- OYUN FONKSİYONLARI --------

    function spawnEnemies(count) {
        enemies = [];
        for (let i = 0; i < count; i++) {
            let radius = Math.random() * (25 - 15) + 15;
            let x, y, safe = false;

            while (!safe) {
                x = Math.floor(Math.random() * (canvas.width - radius * 2) + radius);
                y = Math.floor(Math.random() * (canvas.height - radius * 2) + radius);
                if (isSafeSpawn(x, y, player.x, player.y, 200)) safe = true;
            }

            let xVelocity = (Math.random() - 0.5) * enemySpeedMax * 2;
            let yVelocity = (Math.random() - 0.5) * enemySpeedMax * 2;
            if (Math.abs(xVelocity) < 0.5) xVelocity = 1;
            if (Math.abs(yVelocity) < 0.5) yVelocity = 1;

            enemies.push(new Enemy(x, y, xVelocity, yVelocity, radius));
        }
    }

    function spawnMice(count) {
        while (mice.length < count) {
            let radius = 15;
            let x = Math.floor(Math.random() * (canvas.width - 50) + 25);
            let y = Math.floor(Math.random() * (canvas.height - 50) + 25);
            mice.push(new Mouse(x, y, radius));
        }
    }

    function checkEnemyCollision() {
        if (player_is_immortal) return;
        for (let enemy of enemies) {
            if (getDistance(enemy.x, enemy.y, player.x, player.y) < enemy.radius + player.radius) {
                gameEnds = true;
            }
        }
    }

    function checkMouseCollection() {
        if (player_is_immortal) return;
        for (let i = 0; i < mice.length; i++) {
            let m = mice[i];
            if (getDistance(m.x, m.y, player.x, player.y) < m.radius + player.radius) {
                score++;
                scoreLabel.textContent = score;
                mice.splice(i, 1);
                spawnMice(5);   // Her zaman sahnede 5 fare olsun
                if (score >= targetScore) gameWins = true;
                break;
            }
        }
    }

    function update() {
        if (gameEnds) { showGameOver(); return; }
        if (gameWins) { showGameWin();  return; }

        context.clearRect(0, 0, canvas.width, canvas.height);

        // Hareket
        if (keys.up || keys.w) {
            player.y -= playerSpeed;
            player.angle = -Math.PI / 2;
        }
        if (keys.down || keys.s) {
            player.y += playerSpeed;
            player.angle = Math.PI / 2;
        }
        if (keys.left || keys.a) {
            player.x -= playerSpeed;
            player.angle = Math.PI;
        }
        if (keys.right || keys.d) {
            player.x += playerSpeed;
            player.angle = 0;
        }

        enemies.forEach(e => e.update());
        mice.forEach(m => m.draw());
        player.update();

        checkEnemyCollision();
        checkMouseCollection();

        animationId = requestAnimationFrame(update);
    }

    function startGame() {
        const settings = getSettings();

        score = 0;
        gameEnds = false;
        gameWins = false;
        scoreLabel.textContent = "0";
        targetLabel.textContent = settings.targetScore;
        targetScore = settings.targetScore;

        player = new Player(canvas.width / 2, canvas.height / 2, 20);
        enemies = [];
        mice = [];
        spawnEnemies(settings.enemyCount);
        spawnMice(5);

        startImmortality();
        update();
    }

    // -------- EVENT LISTENERS --------

    if (startBtn) {
        startBtn.addEventListener('click', (e) => {
            e.preventDefault();
            startGame();
            gameSettings.style.display = 'none';

            // Tuşları sıfırla
            keys = {
                up: false, down: false, left: false, right: false,
                w: false, a: false, s: false, d: false
            };

            window.addEventListener("keydown", (e) => {
                if ([37, 38, 39, 40].indexOf(e.keyCode) > -1) e.preventDefault();
                switch (e.keyCode) {
                    case 37: keys.left = true;  break;
                    case 38: keys.up   = true;  break;
                    case 39: keys.right= true;  break;
                    case 40: keys.down = true;  break;
                    case 87: keys.w    = true;  break;
                    case 65: keys.a    = true;  break;
                    case 83: keys.s    = true;  break;
                    case 68: keys.d    = true;  break;
                }
            });

            window.addEventListener("keyup", (e) => {
                switch (e.keyCode) {
                    case 37: keys.left = false;  break;
                    case 38: keys.up   = false;  break;
                    case 39: keys.right= false;  break;
                    case 40: keys.down = false;  break;
                    case 87: keys.w    = false;  break;
                    case 65: keys.a    = false;  break;
                    case 83: keys.s    = false;  break;
                    case 68: keys.d    = false;  break;
                }
            });
        });
    }

    function showGameWin() {
        cancelAnimationFrame(animationId);
        gameOverScreen.style.display = 'flex';

        // langBtn EN ise ekranda TR var demektir
        if (langBtn.textContent === "EN") {
            gameOverTitle.textContent = "Tebrikler! Kazandın.";
            retryBtn.textContent = "Tekrar Avlan";
        } else {
            gameOverTitle.textContent = "Victory! You Win.";
            retryBtn.textContent = "Hunt Again";
        }
    }

    function showGameOver() {
        cancelAnimationFrame(animationId);
        gameOverScreen.style.display = 'flex';

        if (langBtn.textContent === "EN") {
            gameOverTitle.textContent = "Yakalandın!";
            retryBtn.textContent = "Tekrar Dene";
        } else {
            gameOverTitle.textContent = "Busted!";
            retryBtn.textContent = "Try Again";
        }
    }

    // --- Dil değiştirme ---
    let isTurkish = false;
    langBtn.addEventListener('click', () => {
        isTurkish = !isTurkish;
        let enElements = document.querySelectorAll('.lang-en');
        let trElements = document.querySelectorAll('.lang-tr');

        if (isTurkish) {
            enElements.forEach(el => el.style.display = 'none');
            trElements.forEach(el => el.style.display = 'inline');
            langBtn.textContent = "EN";
        } else {
            enElements.forEach(el => el.style.display = 'inline');
            trElements.forEach(el => el.style.display = 'none');
            langBtn.textContent = "TR";
        }
    });

};
