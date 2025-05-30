// Data Simulasi
let rooms = [
    { id: "M7X9P", name: "Mythic Only", tier: "mythic", role: "any", players: ["ProPlayer123"] },
    { id: "L5T2K", name: "Tank/Support Needed", tier: "legend", role: "tank", players: ["NoobMaster"] }
];

let currentPlayer = null;
let currentRoom = null;

// Login dengan nickname
function login() {
    const playerName = document.getElementById("player-name").value.trim();
    if (!playerName) {
        alert("Nickname tidak boleh kosong!");
        return;
    }
    currentPlayer = playerName;
    document.getElementById("login-popup").style.display = "none";
    document.getElementById("main-app").style.display = "block";
    document.getElementById("welcome-message").textContent = `Halo, ${playerName}!`;
    loadAvailableRooms();
}

// Filter room
function filterRooms() {
    const tier = document.getElementById("filter-tier").value;
    const role = document.getElementById("filter-role").value;
    loadAvailableRooms(tier, role);
}

// Buat room baru
function createRoom() {
    const roomName = document.getElementById("room-name").value.trim();
    const tier = document.getElementById("tier").value;
    const role = document.getElementById("role").value;

    if (!roomName) {
        alert("Nama room harus diisi!");
        return;
    }

    const roomId = generateRoomCode();
    const newRoom = {
        id: roomId,
        name: roomName,
        tier: tier,
        role: role,
        players: [currentPlayer]
    };

    rooms.push(newRoom);
    currentRoom = newRoom;
    alert(`Room "${roomName}" berhasil dibuat!\nKode: ${roomId}`);
    openTab("my-room");
    updateMyRoomUI();
}

// Gabung room
function joinRoom(roomId) {
    const room = rooms.find(r => r.id === roomId);
    if (!room) {
        alert("Room tidak ditemukan!");
        return;
    }

    if (room.players.includes(currentPlayer)) {
        alert("Anda sudah berada di room ini!");
        return;
    }

    room.players.push(currentPlayer);
    currentRoom = room;
    alert(`Anda bergabung ke room: ${room.name}`);
    openTab("my-room");
    updateMyRoomUI();
    addChatMessage(`${currentPlayer} bergabung ke room!`);
}

// Keluar room
function leaveRoom() {
    if (!currentRoom) return;

    const room = rooms.find(r => r.id === currentRoom.id);
    if (room) {
        room.players = room.players.filter(p => p !== currentPlayer);
    }

    addChatMessage(`${currentPlayer} meninggalkan room.`);
    currentRoom = null;
    updateMyRoomUI();
}

// Kirim pesan chat
function sendMessage() {
    if (!currentRoom) return;

    const message = document.getElementById("chat-input").value.trim();
    if (!message) return;

    addChatMessage(`${currentPlayer}: ${message}`);
    document.getElementById("chat-input").value = "";
}

// Tambahkan pesan ke chat
function addChatMessage(message) {
    if (!currentRoom) return;

    const chatBox = document.getElementById("chat-messages");
    const messageElement = document.createElement("div");
    messageElement.textContent = message;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Salin kode room
function copyRoomCode() {
    if (!currentRoom) return;
    navigator.clipboard.writeText(currentRoom.id);
    alert("Kode room disalin!");
}

// Bagikan via WhatsApp
function shareRoom() {
    if (!currentRoom) return;
    const message = `Hai! Ayo main MLBB bersama di room *${currentRoom.name}* (${currentRoom.id}). Tier: ${currentRoom.tier}, Role: ${currentRoom.role}`;
    const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
}

// Update UI Room Saya
function updateMyRoomUI() {
    const noRoomMsg = document.getElementById("no-room-message");
    const roomDetails = document.getElementById("room-details");

    if (currentRoom) {
        noRoomMsg.style.display = "none";
        roomDetails.style.display = "block";
        document.getElementById("current-room-name").textContent = currentRoom.name;
        document.getElementById("current-room-code").textContent = `Kode: ${currentRoom.id}`;
        document.getElementById("chat-messages").innerHTML = "";
    } else {
        noRoomMsg.style.display = "block";
        roomDetails.style.display = "none";
    }
}

// Muat daftar room
function loadAvailableRooms(tier = "any", role = "any") {
    const roomList = document.getElementById("available-rooms");
    roomList.innerHTML = "";

    const filteredRooms = rooms.filter(room => {
        return (tier === "any" || room.tier === tier) && 
               (role === "any" || room.role === role);
    });

    if (filteredRooms.length === 0) {
        roomList.innerHTML = "<p>Tidak ada room yang tersedia.</p>";
        return;
    }

    filteredRooms.forEach(room => {
        const roomItem = document.createElement("div");
        roomItem.className = "room-item";
        roomItem.innerHTML = `
            <h3>${room.name}</h3>
            <p>Tier: ${room.tier} | Role: ${room.role}</p>
            <p>Pemain: ${room.players.length}/5</p>
            <button onclick="joinRoom('${room.id}')"><i class="fas fa-door-open"></i> Gabung</button>
        `;
        roomList.appendChild(roomItem);
    });
}

// Buka tab
function openTab(tabId) {
    document.querySelectorAll(".tab-content").forEach(tab => {
        tab.classList.remove("active");
    });
    document.querySelectorAll(".tab-button").forEach(button => {
        button.classList.remove("active");
    });

    document.getElementById(tabId).classList.add("active");
    event.currentTarget.classList.add("active");

    if (tabId === "join-room") loadAvailableRooms();
    if (tabId === "my-room") updateMyRoomUI();
}

// Generate kode room acak
function generateRoomCode() {
    return Math.random().toString(36).substring(2, 7).toUpperCase();
}

// Auto-refresh setiap 10 detik
setInterval(() => {
    if (document.getElementById("join-room").classList.contains("active")) {
        loadAvailableRooms();
    }
}, 10000);
