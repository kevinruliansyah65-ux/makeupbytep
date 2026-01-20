// script.js
document.addEventListener("DOMContentLoaded", function () {
  // Inisialisasi tanggal sekarang (REAL TIME)
  let currentDate = new Date(); // Gunakan tanggal saat ini

  const monthElement = document.getElementById("current-month-year");
  const daysGridElement = document.getElementById("days-grid");
  const prevBtn = document.getElementById("prev-month");
  const nextBtn = document.getElementById("next-month");

  // Ambil semua section
  const homeSection = document.querySelector(".hero");
  const aboutSection = document.getElementById("about-us");
  const portfolioSection = document.getElementById("portfolio");
  const calendarSection = document.querySelector(".calendar");
  const servicesSection = document.querySelector(".services");
  const clientsSection = document.querySelector(".clients");
  const productsSection = document.querySelector(".products");
  const contactSection = document.getElementById("contact-us"); // Tambahkan section contact
  const footerSection = document.querySelector("footer");

  // Ambil semua nav link
  const navLinks = document.querySelectorAll(".nav-link");

  // Ambil elemen chat
  const consultButton = document.getElementById("consult-button");
  const chatRoom = document.getElementById("chat-room");
  const chatMessages = document.getElementById("chat-messages");
  const chatInput = document.getElementById("chat-input");
  const sendButton = document.getElementById("send-message");
  const addMediaButton = document.getElementById("add-media");

  // Fungsi untuk menampilkan section tertentu
  function showSection(sectionId) {
    // Sembunyikan semua section utama
    homeSection.style.display = "none";
    aboutSection.style.display = "none";
    portfolioSection.style.display = "none";
    calendarSection.style.display = "none";
    servicesSection.style.display = "none";
    clientsSection.style.display = "none";
    productsSection.style.display = "none";
    contactSection.style.display = "none"; // Tambahkan penutupan section contact

    // Tampilkan section yang dipilih
    if (sectionId === "home") {
      homeSection.style.display = "block";
      servicesSection.style.display = "block";
      clientsSection.style.display = "block";
      productsSection.style.display = "block";
      calendarSection.style.display = "block";
    } else if (sectionId === "about") {
      aboutSection.style.display = "block";
    } else if (sectionId === "portfolio") {
      portfolioSection.style.display = "block";
    } else if (sectionId === "contact") {
      contactSection.style.display = "block";
      // Penting: JANGAN menyembunyikan chat room di sini!
      // Kita biarkan chat room tetap seperti statusnya sebelumnya.
    }
    // Tambahkan else if untuk section lainnya (Contact Us) jika diperlukan
  }

  // Event listener untuk setiap nav link
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault(); // Cegah reload halaman
      const sectionId = this.getAttribute("data-section");
      if (sectionId) {
        // Pastikan data-section ada
        showSection(sectionId);

        // Optional: Update active state di menu
        navLinks.forEach((nav) => nav.classList.remove("active"));
        this.classList.add("active");
      }
    });
  });

  // Inisialisasi: Tampilkan Home saat pertama kali load
  showSection("home");

  // Kalender Function (Diperbarui untuk Real Time dan Penandaan)
  function updateCalendar(date) {
    // Update judul bulan dan tahun
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    monthElement.textContent = `${
      monthNames[date.getMonth()]
    } ${date.getFullYear()}`;

    // Kosongkan grid sebelum diisi ulang
    daysGridElement.innerHTML = "";

    // Dapatkan hari pertama bulan dan jumlah hari dalam bulan tersebut
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    // Penyesuaian untuk memulai dari Senin (0) daripada Minggu (0)
    let startDay = firstDayOfMonth.getDay();
    let adjustedStartDay = startDay === 0 ? 6 : startDay - 1; // Senin = 0, Selasa = 1, ..., Minggu = 6

    // Hari ini untuk penanda (REAL TIME)
    const today = new Date(); // Gunakan tanggal saat ini

    // Tambahkan kotak kosong untuk hari sebelum tanggal 1
    for (let i = 0; i < adjustedStartDay; i++) {
      const emptySpan = document.createElement("span");
      emptySpan.textContent = "";
      emptySpan.style.visibility = "hidden"; // Agar tetap memakan ruang tapi tidak terlihat
      daysGridElement.appendChild(emptySpan);
    }

    // Tambahkan tanggal dari 1 hingga akhir bulan
    for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
      const daySpan = document.createElement("span");
      daySpan.textContent = day;

      // Cek apakah ini tanggal hari ini (REAL TIME)
      if (
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear() &&
        day === today.getDate()
      ) {
        daySpan.classList.add("today");
      } else {
        // Contoh logika untuk tanggal "booked" (bisa diganti dengan data dinamis)
        // Misalnya: tanggal ganjil di bulan saat ini adalah booked (hanya contoh)
        // Pastikan tidak menandai tanggal hari ini sebagai booked
        if (
          date.getMonth() === today.getMonth() && // Hanya di bulan saat ini
          date.getFullYear() === today.getFullYear() && // Hanya di tahun saat ini
          day !== today.getDate() && // Jangan tandai hari ini
          day % 2 === 1 // Contoh: tanggal ganjil
        ) {
          daySpan.classList.add("booked");
        }
      }

      daysGridElement.appendChild(daySpan);
    }
  }

  // Event listener untuk tombol navigasi kalender
  prevBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    updateCalendar(currentDate);
  });

  nextBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    updateCalendar(currentDate);
  });

  // Inisialisasi kalender dengan bulan saat ini
  updateCalendar(currentDate);

  // --- Fungsi Baru: Animated Counters ---
  const counters = document.querySelectorAll(".counter");
  const speed = 200; // Lower is faster

  const animateCounter = (el) => {
    const target = parseInt(el.getAttribute("data-target"));
    const count = parseInt(el.innerText);

    if (count < target) {
      el.innerText = Math.ceil(count + target / speed);
      setTimeout(() => animateCounter(el), 1);
    } else {
      el.innerText = target;
    }
  };

  // Aktifkan counter saat elemen masuk ke viewport
  const counterSection = document.querySelector(".hero-text"); // Atau section yang relevan
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          counters.forEach((counter) => animateCounter(counter));
          observer.unobserve(entry.target); // Matikan observer setelah pertama kali
        }
      });
    },
    { threshold: 0.5 },
  ); // Aktifkan saat 50% elemen terlihat

  if (counterSection) {
    observer.observe(counterSection);
  }

  // --- Fungsi Baru: Dark Mode Toggle ---
  const darkModeToggle = document.getElementById("dark-mode-toggle");
  const body = document.body;

  // Cek preferensi pengguna di localStorage
  if (localStorage.getItem("darkMode") === "enabled") {
    body.classList.add("dark-mode");
    feather.replace(); // Perbarui ikon Feather untuk mode gelap jika perlu (warna ikon bisa diubah via CSS)
  }

  darkModeToggle.addEventListener("click", () => {
    body.classList.toggle("dark-mode");

    // Simpan preferensi ke localStorage
    if (body.classList.contains("dark-mode")) {
      localStorage.setItem("darkMode", "enabled");
    } else {
      localStorage.setItem("darkMode", null);
    }
    feather.replace(); // Perbarui ikon Feather
  });

  // --- Fungsi Baru: Custom Cursor (Opsional) ---
  // const cursor = document.querySelector('.cursor-follower');
  // document.addEventListener('mousemove', (e) => {
  //     cursor.style.top = e.pageY + 'px';
  //     cursor.style.left = e.pageX + 'px';
  // });

  // document.addEventListener('mousedown', () => {
  //     cursor.classList.add('hovering');
  // });

  // document.addEventListener('mouseup', () => {
  //     cursor.classList.remove('hovering');
  // });

  // document.querySelectorAll('a, button, .portfolio-item').forEach(el => {
  //     el.addEventListener('mouseenter', () => {
  //         cursor.classList.add('hovering');
  //     });
  //     el.addEventListener('mouseleave', () => {
  //         cursor.classList.remove('hovering');
  //     });
  // });

  // --- Fungsi Baru: Chat Room Real-Time ---
  // Event listener untuk tombol "Konsultasi"
  consultButton.addEventListener("click", () => {
    // Tampilkan chat room
    chatRoom.style.display = "block";

    // Scroll ke bawah
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Fokus pada input
    chatInput.focus();
  });

  // Fungsi untuk membuat pesan baru
  function createMessage(text, isUser = false) {
    const messageDiv = document.createElement("div");
    messageDiv.className = isUser ? "message user" : "message bot";

    // Format waktu
    const now = new Date();
    const timeString = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    messageDiv.innerHTML = `
      <p>${text}</p>
      <span class="time">${timeString}</span>
    `;

    return messageDiv;
  }

  // Fungsi untuk mengirim pesan
  function sendMessage() {
    const messageText = chatInput.value.trim();
    if (messageText) {
      // Tampilkan pesan pengguna
      const userMessage = createMessage(messageText, true);
      chatMessages.appendChild(userMessage);
      chatInput.value = ""; // Kosongkan input

      // Scroll ke bawah
      chatMessages.scrollTop = chatMessages.scrollHeight;

      // Simulasi balasan bot setelah 1 detik
      setTimeout(() => {
        const botReplies = [
          "Terima kasih atas pesan Anda!",
          "Saya akan segera merespons.",
          "Apakah ada hal lain yang bisa saya bantu?",
          "Untuk konsultasi lebih lanjut, silakan hubungi saya di nomor WhatsApp.",
          "Saya senang bisa membantu Anda!",
        ];

        const randomReply =
          botReplies[Math.floor(Math.random() * botReplies.length)];
        const botMessage = createMessage(randomReply, false);
        chatMessages.appendChild(botMessage);

        // Scroll ke bawah
        chatMessages.scrollTop = chatMessages.scrollHeight;
      }, 1000);
    }
  }

  // Event listener untuk tombol kirim
  sendButton.addEventListener("click", sendMessage);

  // Event listener untuk Enter key
  chatInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  });

  // Event listener untuk tombol tambah media (simulasi)
  addMediaButton.addEventListener("click", () => {
    alert(
      "Fitur unggah gambar akan segera hadir! Untuk saat ini, Anda dapat mengirim pesan teks.",
    );
  });
});
