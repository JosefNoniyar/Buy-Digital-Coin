// Coin packages (Base Coins)
const coinPackages = [
    { coins: 100, discount: 00, popular: false },
    { coins: 200, discount: 10, popular: false },
    { coins: 400, discount: 20, popular: true },
    { coins: 800, discount: 30, popular: false },
    { coins: 1600, discount: 40, popular: false }
];

// Base price per coin
const pricePerCoin = 3.5;

// Function to display coins dynamically
function displayCoins() {
    let container = document.getElementById("coin-list");
    container.innerHTML = "";

    coinPackages.forEach((pkg) => {
        let totalCoins = pkg.coins;
        let originalPrice = pkg.coins * pricePerCoin;
        let discountedPrice = originalPrice - (originalPrice * pkg.discount / 100);

        let coinBox = document.createElement("div");
        coinBox.classList.add("coin-box");
        if (pkg.popular) {
            coinBox.classList.add("popular-plan");
        }

        coinBox.innerHTML = `
            ${pkg.popular ? '<div class="popular-tag">🔥 Popular</div>' : ''}
            <h3>🪙 ${pkg.coins} Coins</h3>
            <p>Price: <span class="old-price">₹${originalPrice.toFixed(2)}</span> → <span class="price">₹${discountedPrice.toFixed(2)}</span></p>
            <button onclick="buyCoins(${totalCoins}, ${discountedPrice.toFixed(2)})">💰 Buy Now</button>
        `;

        container.appendChild(coinBox);
    });
}

// Function to initiate the buying process
function buyCoins(coins, price) {
    // Redirect to the checkout page with selected plan details
    const queryParams = new URLSearchParams({ coins, price });
    window.location.href = `checkout.html?${queryParams.toString()}`;
}

// Load coins on page load
window.onload = displayCoins;