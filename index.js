/* =========================================================
   PROFILE IMAGE CIRCLE EFFECT
========================================================= */

const photoStack = document.querySelector(".photo-stack");
const circlePreview = document.querySelector(".circle-preview");

if (photoStack && circlePreview) {

    photoStack.addEventListener("mousemove", (event) => {

        const rect = photoStack.getBoundingClientRect();

        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        circlePreview.style.setProperty(
            "--mouse-x",
            `${x}px`
        );

        circlePreview.style.setProperty(
            "--mouse-y",
            `${y}px`
        );

    });

}


/* =========================================================
   PROJECT SLIDER
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const projectSection =
        document.querySelector("#project");

    if (!projectSection) {
        return;
    }


    /* =====================================================
       ELEMENTS
    ===================================================== */

    const projects = Array.from(
        projectSection.querySelectorAll(".project-card")
    );

    const track =
        projectSection.querySelector(".projects-track");

    const prevButton =
        projectSection.querySelector(".prev-project");

    const nextButton =
        projectSection.querySelector(".next-project");

    const dots = Array.from(
        projectSection.querySelectorAll(".project-dot")
    );

    const currentProject =
        projectSection.querySelector("#current-project");

    const totalProject =
        projectSection.querySelector("#total-project");


    if (!projects.length || !track) {
        return;
    }


    /* =====================================================
       SETTINGS
    ===================================================== */

    let currentIndex = 0;

    const totalProjects = projects.length;

    const AUTO_SLIDE_TIME = 2000;

    let autoSlideTimer = null;

    let isAnimating = false;


    /* =====================================================
       PROJECT DETAILS
    ===================================================== */

    const projectDetails = {

        attendance: {

            number: "01",

            title: "Smart Attendance System",

            description:
                "Face recognition based attendance system using Python, OpenCV and MySQL.",

            about:
                "A smart attendance system created to automate the attendance process using face recognition technology.",

            features: [
                "Face recognition",
                "Automatic attendance",
                "Database integration",
                "User friendly interface"
            ],

            technologies: [
                "Python",
                "OpenCV",
                "MySQL"
            ],

            role:
                "Developed the main application logic, face recognition system and database integration.",

            learning:
                "Learned about computer vision, face recognition and database integration.",

            github: "#",

            live: "#"

        },


        fire: {

            number: "02",

            title: "Fire Detection System",

            description:
                "Real-time fire detection using OpenCV and HSV color detection.",

            about:
                "A computer vision based project designed to detect possible fire conditions in real time.",

            features: [
                "Real-time detection",
                "Camera based monitoring",
                "Fire color detection",
                "Alert system"
            ],

            technologies: [
                "Python",
                "OpenCV",
                "Tkinter"
            ],

            role:
                "Worked on image processing, fire detection logic and interface.",

            learning:
                "Learned about image processing, HSV color detection and real-time computer vision.",

            github: "#",

            live: "#"

        },


        pizza: {

            number: "03",

            title: "Pizza Management System",

            description:
                "A pizza management system designed to simplify pizza ordering and management.",

            about:
                "A management project focused on handling pizza information and making the ordering process easier.",

            features: [
                "Pizza management",
                "Order management",
                "Simple interface",
                "Easy navigation"
            ],

            technologies: [
                "HTML",
                "CSS",
                "JavaScript"
            ],

            role:
                "Designed the interface and implemented the main frontend functionality.",

            learning:
                "Improved my frontend development, UI design and JavaScript skills.",

            github: "#",

            live: "#"

        },


        portfolio: {

            number: "04",

            title: "Personal Portfolio",

            description:
                "A personal portfolio website showcasing skills, projects and experience.",

            about:
                "A personal portfolio website created to showcase projects, skills and professional information.",

            features: [
                "Responsive design",
                "Project showcase",
                "Skills section",
                "Contact section",
                "Interactive UI"
            ],

            technologies: [
                "HTML",
                "CSS",
                "JavaScript"
            ],

            role:
                "Designed and developed the website structure, styling and interactive components.",

            learning:
                "Learned more about responsive design, UI development and JavaScript interactions.",

            github: "#",

            live: "#"

        }

    };


    /* =====================================================
       TOTAL PROJECTS
    ===================================================== */

    if (totalProject) {

        totalProject.textContent =
            String(totalProjects).padStart(2, "0");

    }


    /* =====================================================
       GET POSITION
    ===================================================== */

    function getRelativePosition(index) {

        let position =
            index - currentIndex;


        /*
         * Example with 4 projects:
         *
         * current = 0
         *
         * 03 = left
         * 00 = center
         * 01 = right
         * 02 = hidden
         */


        if (position > totalProjects / 2) {

            position -= totalProjects;

        }


        if (position < -totalProjects / 2) {

            position += totalProjects;

        }


        return position;

    }


    /* =====================================================
       UPDATE SLIDER
    ===================================================== */

    function updateSlider() {

        projects.forEach((project, index) => {

            const position =
                getRelativePosition(index);


            /*
             * Remove old classes
             */

            project.classList.remove(
                "active-project",
                "side-left",
                "side-right",
                "hidden-project"
            );


            /*
             * CENTER
             */

            if (position === 0) {

                project.classList.add(
                    "active-project"
                );

            }


            /*
             * LEFT
             */

            else if (position === -1) {

                project.classList.add(
                    "side-left"
                );

            }


            /*
             * RIGHT
             */

            else if (position === 1) {

                project.classList.add(
                    "side-right"
                );

            }


            /*
             * HIDDEN
             */

            else {

                project.classList.add(
                    "hidden-project"
                );

            }

        });


        /* =================================================
           DOTS
        ================================================= */

        dots.forEach((dot, index) => {

            dot.classList.toggle(
                "active",
                index === currentIndex
            );

            dot.setAttribute(
                "aria-current",
                index === currentIndex
                    ? "true"
                    : "false"
            );

        });


        /* =================================================
           COUNTER
        ================================================= */

        if (currentProject) {

            currentProject.textContent =
                String(currentIndex + 1).padStart(2, "0");

        }

    }


    /* =====================================================
       NEXT PROJECT
    ===================================================== */

    function nextProject() {

        if (isAnimating) {
            return;
        }

        isAnimating = true;


        currentIndex =
            (currentIndex + 1) % totalProjects;


        updateSlider();


        setTimeout(() => {

            isAnimating = false;

        }, 650);

    }


    /* =====================================================
       PREVIOUS PROJECT
    ===================================================== */

    function previousProject() {

        if (isAnimating) {
            return;
        }

        isAnimating = true;


        currentIndex--;

        if (currentIndex < 0) {

            currentIndex =
                totalProjects - 1;

        }


        updateSlider();


        setTimeout(() => {

            isAnimating = false;

        }, 650);

    }


    /* =====================================================
       AUTO SLIDER
    ===================================================== */

    function startAutoSlide() {

        stopAutoSlide();


        autoSlideTimer = setInterval(() => {

            if (
                !document.hidden &&
                !projectModalIsOpen()
            ) {

                nextProject();

            }

        }, AUTO_SLIDE_TIME);

    }


    function stopAutoSlide() {

        if (autoSlideTimer !== null) {

            clearInterval(autoSlideTimer);

            autoSlideTimer = null;

        }

    }


    function resetAutoSlide() {

        stopAutoSlide();

        startAutoSlide();

    }


    /* =====================================================
       NEXT BUTTON
    ===================================================== */

    if (nextButton) {

        nextButton.addEventListener("click", (event) => {

            event.preventDefault();

            event.stopPropagation();

            nextProject();

            resetAutoSlide();

        });

    }


    /* =====================================================
       PREVIOUS BUTTON
    ===================================================== */

    if (prevButton) {

        prevButton.addEventListener("click", (event) => {

            event.preventDefault();

            event.stopPropagation();

            previousProject();

            resetAutoSlide();

        });

    }


    /* =====================================================
       DOTS
    ===================================================== */

    dots.forEach((dot, index) => {

        dot.addEventListener("click", (event) => {

            event.preventDefault();

            event.stopPropagation();


            if (index === currentIndex) {
                return;
            }


            currentIndex = index;

            updateSlider();

            resetAutoSlide();

        });

    });


    /* =====================================================
       MODAL ELEMENTS
    ===================================================== */

    const modal =
        document.querySelector("#projectModal");

    const modalOverlay =
        modal?.querySelector(".project-modal-overlay");

    const modalClose =
        modal?.querySelector(".project-modal-close");

    const modalImage =
        document.querySelector("#modalProjectImage");

    const modalNumber =
        document.querySelector("#modalProjectNumber");

    const modalTitle =
        document.querySelector("#modalProjectTitle");

    const modalDescription =
        document.querySelector("#modalProjectDescription");

    const modalAbout =
        document.querySelector("#modalProjectAbout");

    const modalFeatures =
        document.querySelector("#modalProjectFeatures");

    const modalTech =
        document.querySelector("#modalProjectTech");

    const modalRole =
        document.querySelector("#modalProjectRole");

    const modalLearning =
        document.querySelector("#modalProjectLearning");

    const modalGithub =
        document.querySelector("#modalGithub");

    const modalLive =
        document.querySelector("#modalLive");


    /* =====================================================
       MODAL STATE
    ===================================================== */

    function projectModalIsOpen() {

        return (
            modal &&
            modal.classList.contains("active")
        );

    }


    /* =====================================================
       OPEN MODAL
    ===================================================== */

    function openModal(index) {

        if (!modal) {
            return;
        }


        const project =
            projects[index];

        if (!project) {
            return;
        }


        const projectKey =
            project.dataset.project;

        const details =
            projectDetails[projectKey];

        if (!details) {
            return;
        }


        /* =================================================
           IMAGE
        ================================================= */

        const image =
            project.querySelector(".project-image img");

        if (image && modalImage) {

            modalImage.src =
                image.src;

            modalImage.alt =
                image.alt || details.title;

        }


        /* =================================================
           BASIC DETAILS
        ================================================= */

        if (modalNumber) {

            modalNumber.textContent =
                details.number;

        }


        if (modalTitle) {

            modalTitle.textContent =
                details.title;

        }


        if (modalDescription) {

            modalDescription.textContent =
                details.description;

        }


        if (modalAbout) {

            modalAbout.textContent =
                details.about;

        }


        if (modalRole) {

            modalRole.textContent =
                details.role;

        }


        if (modalLearning) {

            modalLearning.textContent =
                details.learning;

        }


        /* =================================================
           FEATURES
        ================================================= */

        if (modalFeatures) {

            modalFeatures.innerHTML = "";


            details.features.forEach((feature) => {

                const li =
                    document.createElement("li");

                li.textContent =
                    feature;

                modalFeatures.appendChild(li);

            });

        }


        /* =================================================
           TECHNOLOGIES
        ================================================= */

        if (modalTech) {

            modalTech.innerHTML = "";


            details.technologies.forEach((technology) => {

                const span =
                    document.createElement("span");

                span.textContent =
                    technology;

                modalTech.appendChild(span);

            });

        }


        /* =================================================
           LINKS
        ================================================= */

        if (modalGithub) {

            modalGithub.href =
                details.github || "#";

        }


        if (modalLive) {

            modalLive.href =
                details.live || "#";

        }


        /* =================================================
           SHOW MODAL
        ================================================= */

        modal.classList.add("active");

        modal.setAttribute(
            "aria-hidden",
            "false"
        );


        document.body.classList.add(
            "modal-open"
        );

        document.body.style.overflow =
            "hidden";


        stopAutoSlide();

    }


    /* =====================================================
       CLOSE MODAL
    ===================================================== */

    function closeModal() {

        if (!modal) {
            return;
        }


        modal.classList.remove("active");

        modal.setAttribute(
            "aria-hidden",
            "true"
        );


        document.body.classList.remove(
            "modal-open"
        );

        document.body.style.overflow =
            "";


        startAutoSlide();

    }


    /* =====================================================
       CARD CLICK
    ===================================================== */

    projects.forEach((project, index) => {

        project.addEventListener("click", (event) => {

            /*
             * GitHub / Live Demo click par
             * modal open nahi hoga.
             */

            if (
                event.target.closest(".project-btn")
            ) {

                return;

            }


            currentIndex = index;

            updateSlider();

            openModal(index);

        });

    });


    /* =====================================================
       MODAL CLOSE BUTTON
    ===================================================== */

    if (modalClose) {

        modalClose.addEventListener("click", (event) => {

            event.preventDefault();

            closeModal();

        });

    }


    /* =====================================================
       MODAL OUTSIDE CLICK
    ===================================================== */

    if (modalOverlay) {

        modalOverlay.addEventListener("click", () => {

            closeModal();

        });

    }


    /* =====================================================
       ESCAPE KEY
    ===================================================== */

    document.addEventListener("keydown", (event) => {

        if (
            event.key === "Escape" &&
            projectModalIsOpen()
        ) {

            closeModal();

        }

    });


    /* =====================================================
       KEYBOARD ARROWS
    ===================================================== */

    document.addEventListener("keydown", (event) => {

        if (projectModalIsOpen()) {
            return;
        }


        if (event.key === "ArrowRight") {

            nextProject();

            resetAutoSlide();

        }


        if (event.key === "ArrowLeft") {

            previousProject();

            resetAutoSlide();

        }

    });


    /* =====================================================
       MOBILE SWIPE
    ===================================================== */

    let touchStartX = 0;
    let touchStartY = 0;


    track.addEventListener("touchstart", (event) => {

        if (!event.touches.length) {
            return;
        }


        touchStartX =
            event.touches[0].clientX;

        touchStartY =
            event.touches[0].clientY;


        stopAutoSlide();

    }, {
        passive: true
    });


    track.addEventListener("touchend", (event) => {

        if (!event.changedTouches.length) {

            startAutoSlide();

            return;

        }


        const touchEndX =
            event.changedTouches[0].clientX;

        const touchEndY =
            event.changedTouches[0].clientY;


        const differenceX =
            touchEndX - touchStartX;

        const differenceY =
            touchEndY - touchStartY;


        /*
         * Vertical movement ko swipe
         * nahi maana jayega.
         */

        if (
            Math.abs(differenceX) < 50 ||
            Math.abs(differenceX) <= Math.abs(differenceY)
        ) {

            startAutoSlide();

            return;

        }


        if (differenceX < 0) {

            nextProject();

        }
        else {

            previousProject();

        }


        startAutoSlide();

    }, {
        passive: true
    });


    /* =====================================================
       PAUSE ON HOVER
    ===================================================== */

    projectSection.addEventListener("mouseenter", () => {

        stopAutoSlide();

    });


    projectSection.addEventListener("mouseleave", () => {

        if (!projectModalIsOpen()) {

            startAutoSlide();

        }

    });


    /* =====================================================
       PAGE VISIBILITY
    ===================================================== */

    document.addEventListener("visibilitychange", () => {

        if (document.hidden) {

            stopAutoSlide();

        }
        else if (!projectModalIsOpen()) {

            startAutoSlide();

        }

    });


    /* =====================================================
       INITIALIZE
    ===================================================== */

    updateSlider();

    startAutoSlide();

});


/* =========================================
   SCROLL REVEAL ANIMATION
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const sections = document.querySelectorAll(
        ".page2, .page3, .project-section, .page5"
    );

    sections.forEach(section => {
        section.classList.add("reveal");
    });

    const observer = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {
                    entry.target.classList.add("show");

                    // Ek baar show hone ke baad dobara hide nahi hoga
                    observer.unobserve(entry.target);
                }

            });

        },
        {
            threshold: 0.15
        }
    );

    sections.forEach(section => {
        observer.observe(section);
    });

});