document.addEventListener("DOMContentLoaded", function () {
  const elementsPerPage = 6; 
  const caseContents = document.querySelectorAll(".case-content");
  const pagination = document.querySelector(".pagination");

  // Function to hide all case contents
  function hideAllContents() {
    caseContents.forEach((content) => {
      content.style.display = "none";
    });
  }

  // Function to show elements for a specific page
  function showPage(pageNumber) {
    hideAllContents();
    const startIndex = (pageNumber - 1) * elementsPerPage;
    const endIndex = startIndex + elementsPerPage;
    for (let i = startIndex; i < endIndex && i < caseContents.length; i++) {
      caseContents[i].style.display = "block";
    }
  }

  // Calculate total pages
  const totalPages = Math.ceil(caseContents.length / elementsPerPage);

  // Generate pagination links for mobile devices
  function generateMobilePaginationLinks(currentPage) {
    let html = "";
    if (totalPages > 1) {
      html += `<li class="page-item previous-page ${
        currentPage === 1 ? "disabled" : ""
      }"><a class="page-link" href="#" data-page="${
        currentPage - 1
      }">Previous</a></li>`;

      // Display current page number with green background
      html += `<li class="page-item active" ><span class="page-link" style="background-color: green; border: none">${currentPage} / ${totalPages}</span></li>`;

      html += `<li class="page-item next-page ${
        currentPage === totalPages ? "disabled" : ""
      }"><a class="page-link" href="#" data-page="${
        currentPage + 1
      }">Next</a></li>`;
    }
    return html;
  }

  // Generate pagination links for larger screens
  function generateDesktopPaginationLinks(currentPage) {
    let html = "";
    if (totalPages > 1) {
      html += `<li class="page-item first-page ${
        currentPage === 1 ? "disabled" : ""
      }"><a class="page-link" href="#" data-page="1"><i class="fas fa-angle-double-left"></i></a></li>`;
      html += `<li class="page-item previous-page ${
        currentPage === 1 ? "disabled" : ""
      }"><a class="page-link" href="#" data-page="${
        currentPage - 1
      }"><i class="fas fa-angle-left"></i></a></li>`;

      // Display page numbers dynamically
      let startPage = 1;
      let endPage = totalPages;
      if (totalPages > 5) {
        startPage = Math.max(currentPage - 2, 1);
        endPage = Math.min(currentPage + 2, totalPages);
        if (endPage - startPage < 4) {
          if (currentPage < totalPages / 2) {
            endPage = Math.min(startPage + 4, totalPages);
          } else {
            startPage = Math.max(endPage - 4, 1);
          }
        }
      }
      for (let i = startPage; i <= endPage; i++) {
        html += `<li class="page-item ${
          currentPage === i ? "active" : ""
        }"><a class="page-link" href="#" data-page="${i}">${i}</a></li>`;
      }

      html += `<li class="page-item next-page ${
        currentPage === totalPages ? "disabled" : ""
      }"><a class="page-link" href="#" data-page="${
        currentPage + 1
      }"><i class="fas fa-angle-right"></i></a></li>`;
      html += `<li class="page-item last-page ${
        currentPage === totalPages ? "disabled" : ""
      }"><a class="page-link" href="#" data-page="${totalPages}"><i class="fas fa-angle-double-right"></i></a></li>`;
    }
    return html;
  }

  // Initialize pagination links
  function initPagination() {
    if (window.innerWidth <= 768) {
      pagination.innerHTML = generateMobilePaginationLinks(1);
    } else {
      pagination.innerHTML = generateDesktopPaginationLinks(1);
    }
  }

  initPagination();

  // Show the first page initially
  showPage(1);

  // Event listener for pagination links
  pagination.addEventListener("click", function (event) {
    event.preventDefault(); // Prevent default behavior of anchor links

    const target = event.target;
    if (target.classList.contains("page-link")) {
      const nextPage = parseInt(target.dataset.page);
      if (!isNaN(nextPage)) {
        if (window.innerWidth <= 768) {
          pagination.innerHTML = generateMobilePaginationLinks(nextPage);
        } else {
          pagination.innerHTML = generateDesktopPaginationLinks(nextPage);
        }
        showPage(nextPage);

        // Scroll to the top of the page
        window.scrollTo({ top: 565, behavior: "smooth" });
      }
    }
  });

  // Update pagination on window resize for responsiveness
  window.addEventListener("resize", function () {
    initPagination();
  });
});
