document.addEventListener("DOMContentLoaded", function () {
  const navButtons = Array.from(document.querySelectorAll(".nav-button"));
  const sections = Array.from(document.querySelectorAll(".section"));
  const menuToggle = document.querySelector(".menu-toggle");
  const overlay = document.querySelector("[data-close-menu]");
  const mainContent = document.querySelector("#main-content");

  function closeMenu() {
    document.body.classList.remove("menu-open");
    menuToggle.setAttribute("aria-expanded", "false");
    overlay.classList.remove("show");
  }

  function showSection(sectionId) {
    sections.forEach(function (section) {
      section.classList.toggle("active", section.id === sectionId);
    });

    navButtons.forEach(function (button) {
      const isActive = button.dataset.target === sectionId;
      button.classList.toggle("active", isActive);
      if (isActive) {
        button.setAttribute("aria-current", "page");
      } else {
        button.removeAttribute("aria-current");
      }
    });

    closeMenu();
    mainContent.focus({ preventScroll: true });

    if (sectionId === "calendar-section" && window.classCalendar) {
      window.setTimeout(function () {
        window.classCalendar.updateSize();
      }, 80);
    }
  }

  navButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      showSection(button.dataset.target);
    });
  });

  menuToggle.addEventListener("click", function () {
    const willOpen = !document.body.classList.contains("menu-open");
    document.body.classList.toggle("menu-open", willOpen);
    menuToggle.setAttribute("aria-expanded", String(willOpen));
    overlay.classList.toggle("show", willOpen);
  });

  overlay.addEventListener("click", closeMenu);

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  injectAlbumImages("donghu-album", window.DONGHU_ALBUM_IMAGES, "东湖团建");
  injectAlbumImages("meeting-album", window.MEETING_ALBUM_IMAGES, "班会留影");

  if (window.Fancybox) {
    Fancybox.bind("[data-fancybox]", {
      Thumbs: false,
      Toolbar: {
        display: {
          left: [],
          middle: [],
          right: ["close"]
        }
      }
    });
  }

  initCalendar();
  initLocalMessageBoard();
});

function injectAlbumImages(groupName, imagePaths, caption) {
  if (!Array.isArray(imagePaths) || imagePaths.length <= 1) {
    return;
  }

  const coverLink = document.querySelector("[data-fancybox='" + groupName + "']");
  if (!coverLink) {
    return;
  }

  let insertAfter = coverLink;
  imagePaths.slice(1).forEach(function (path) {
    const hiddenLink = document.createElement("a");
    hiddenLink.className = "album-hidden";
    hiddenLink.href = path;
    hiddenLink.dataset.fancybox = groupName;
    hiddenLink.dataset.caption = caption;
    insertAfter.insertAdjacentElement("afterend", hiddenLink);
    insertAfter = hiddenLink;
  });
}

function initCalendar() {
  const calendarEl = document.getElementById("calendar");
  const storageKey = "ai2501-calendar-events";
  const baseEvents = [
    {
      id: "exam-mental-health",
      title: "大学生心理健康考试",
      start: "2026-05-16",
      backgroundColor: "#c76b4f"
    },
    {
      id: "exam-military-theory",
      title: "军事理论考试",
      start: "2026-06-07",
      backgroundColor: "#7a9e7e"
    },
    {
      id: "exam-english-2",
      title: "综合英语（二）考试",
      start: "2026-06-27",
      backgroundColor: "#d59b42"
    },
    {
      id: "exam-calculus-b-2",
      title: "微积分（B）（下）考试",
      start: "2026-06-29",
      backgroundColor: "#b66d8a"
    },
    {
      id: "exam-physics-lab-1",
      title: "物理实验（上）考试",
      start: "2026-06-30",
      backgroundColor: "#6f8fbf"
    },
    {
      id: "exam-college-physics-a-1",
      title: "大学物理（A）（上）考试",
      start: "2026-07-01",
      backgroundColor: "#9a7bb8"
    },
    {
      id: "exam-probability-statistics-b",
      title: "概率论与数理统计（B）考试",
      start: "2026-07-03",
      backgroundColor: "#c48a46"
    },
    {
      id: "exam-modern-history",
      title: "中国近现代史纲要考试",
      start: "2026-07-04",
      backgroundColor: "#8d6e63"
    },
    {
      id: "exam-circuit-theory",
      title: "电路理论考试",
      start: "2026-07-06",
      backgroundColor: "#5f9ea0"
    }
  ];

  function loadSavedEvents() {
    try {
      return JSON.parse(localStorage.getItem(storageKey)) || [];
    } catch (error) {
      console.warn("读取日历事件失败，已使用空列表。", error);
      return [];
    }
  }

  function saveEvents(events) {
    localStorage.setItem(storageKey, JSON.stringify(events));
  }

  const savedEvents = loadSavedEvents();

  window.classCalendar = new FullCalendar.Calendar(calendarEl, {
    locale: "zh-cn",
    initialView: "dayGridMonth",
    height: "auto",
    firstDay: 1,
    selectable: true,
    nowIndicator: true,
    headerToolbar: {
      left: "prev,next today",
      center: "title",
      right: "dayGridMonth,listMonth"
    },
    buttonText: {
      today: "今天",
      month: "月",
      list: "列表"
    },
    events: baseEvents.concat(savedEvents),
    dateClick: function (info) {
      const sameDayEvents = window.classCalendar.getEvents().filter(function (event) {
        return event.startStr === info.dateStr;
      });
      const promptText = sameDayEvents.length
        ? "当天已有：" + sameDayEvents.map(function (event) { return event.title; }).join("、") + "\n请输入要合并显示的新事件："
        : "请输入要添加的班级事件：";
      const title = window.prompt(promptText);
      if (!title || !title.trim()) {
        return;
      }

      const eventTitle = title.trim();
      const newEvent = {
        id: "local-" + Date.now(),
        title: eventTitle,
        start: info.dateStr,
        backgroundColor: "#b66d8a"
      };

      savedEvents.push(newEvent);
      saveEvents(savedEvents);
      window.classCalendar.addEvent(newEvent);
    }
  });

  window.classCalendar.render();
}

function initLocalMessageBoard() {
  // 备用本地留言板开关：需要启用时改为 true。
  const ENABLE_LOCAL_MESSAGE_BOARD = false;
  const board = document.getElementById("local-board");
  if (!ENABLE_LOCAL_MESSAGE_BOARD || !board) {
    return;
  }

  const form = document.getElementById("message-form");
  const nameInput = document.getElementById("message-name");
  const contentInput = document.getElementById("message-content");
  const list = document.getElementById("message-list");
  const storageKey = "ai2501-local-messages";

  board.classList.add("enabled");

  function loadMessages() {
    try {
      return JSON.parse(localStorage.getItem(storageKey)) || [];
    } catch (error) {
      console.warn("读取本地留言失败，已使用空列表。", error);
      return [];
    }
  }

  function saveMessages(messages) {
    localStorage.setItem(storageKey, JSON.stringify(messages));
  }

  function renderMessages(messages) {
    list.innerHTML = "";
    messages.forEach(function (message) {
      const item = document.createElement("li");
      item.className = "message-item";

      const meta = document.createElement("div");
      meta.className = "message-meta";
      meta.textContent = message.name + " · " + message.time;

      const content = document.createElement("div");
      content.textContent = message.content;

      item.append(meta, content);
      list.appendChild(item);
    });
  }

  const messages = loadMessages();
  renderMessages(messages);

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const name = nameInput.value.trim() || "匿名同学";
    const content = contentInput.value.trim();
    if (!content) {
      contentInput.focus();
      return;
    }

    messages.unshift({
      name: name,
      content: content,
      time: new Date().toLocaleString("zh-CN", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
      })
    });

    saveMessages(messages);
    renderMessages(messages);
    form.reset();
  });
}
