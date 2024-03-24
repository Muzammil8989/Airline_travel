document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("signupForm")
    .addEventListener("submit", async function (event) {
      event.preventDefault();

      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;
      const confirmPassword = document.getElementById("confirmPassword").value;
      const email = document.getElementById("email").value;

      // Additional password validation
      if (password.length < 8) {
        showModal("Password must be at least 8 characters long");
        return;
      }

      const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[\W_]).{8,}$/;
      if (!passwordRegex.test(password)) {
        showModal(
          "Password must contain a mix of numbers, alphabets, and special characters"
        );
        return;
      }

      if (password !== confirmPassword) {
        showModal("Password and Confirm Password do not match");
        return;
      }

      const formData = {
        userName: username,
        userEmail: email,
        userPassword: password,
      };

      try {
        const response = await fetch("http://localhost:3000/users/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          const responseData = await response.json();

          if (responseData.message) {
            showSuccessModal();

            if (responseData.success) {
              showSuccessModal();
              document.getElementById("signupForm").reset();
            }
          } else {
            console.error("Unexpected response format");
          }
        } else {
          const errorMessage = await response.text();

          if (response.status === 409) {
            showUserExistsModal();
          } else {
            console.error(
              "Failed to register user. Status:",
              response.status,
              "Error:",
              errorMessage
            );
          }
        }
      } catch (error) {
        console.error("Network error:", error);
      }
    });
  function showModal(message) {
            const modalMessage = document.getElementById("modalMessage");
            modalMessage.innerText = message;
            const messageModal = new bootstrap.Modal(document.getElementById('messageModal'));
            messageModal.show();
        }
    

  function showSuccessModal() {
    const successModal = new bootstrap.Modal(
      document.getElementById("successModal")
    );
    successModal.show();
  }

  function showUserExistsModal() {
    const userExistsModal = new bootstrap.Modal(
      document.getElementById("userExistsModal")
    );
    userExistsModal.show();
  }
});

$(document).ready(function () {
  function fetchData() {
    $.ajax({
      url: "http://localhost:3000/flights",
      method: "GET",
      dataType: "json",
      success: function (data) {
        console.log("Received data:", data);
        displayDataInTable(data);
      },
      error: function (error) {
        console.error("Error fetching data:", error);
      },
    });
  }

  function displayDataInTable(data) {
    var tableBody = $("#flightTable tbody");
    tableBody.empty();

    if (Array.isArray(data.flights)) {
      data.flights.forEach(function (flight) {
        var row = $("<tr>");
        row.append($('<td class="d-none d-sm-table-cell">').text(flight.from));
        row.append($("<td>").text(flight.to));
        row.append($("<td>").text(flight.date));
        row.append($('<td class="d-none d-sm-table-cell">').text(flight.time));
        row.append($('<td class="d-none d-sm-table-cell">').text(flight.type));
        row.append(
          $('<td class="d-none d-sm-table-cell">').text(flight.duration)
        );
        row.append(
          $('<td class="d-none d-sm-table-cell">').text(flight.airline)
        );
        row.append($('<td class="d-none d-sm-table-cell">').text(flight.price));
        row.append(
          $('<td class="d-none d-sm-table-cell">').text(flight.availableSeat)
        );

        var bookButton = $('<button class="btn btn-primary">Book</button>');
        var buttonCell = $("<td>").append(bookButton);
        row.append(buttonCell);

        tableBody.append(row);
        bookButton.click(function () {
          // Redirect to ticketreservation.html
          window.location.href = "ticketRegistration.html";
        });
      });
    } else {
      console.error("Data.flights is not an array:", data);
    }
  }

  // Call the fetchData function when the document is ready
  fetchData();
});
