$(document).ready(function () {
  $("#applyBtn").click(function () {
    $(this).animate({ opacity: 0, width: 0, padding: 0 }, 500, function () {
      $(this).hide();
    });
    $("#form-container").fadeIn(300);
  });

  $("#closeBtn").click(function () {
    $("#form-container").fadeOut(300, function () {
      $("#applyBtn")
        .show()
        .animate({ opacity: 1, width: "200px", padding: "15px 30px" }, 500);
    });
  });

  $("#phone").mask("(999) 999-9999");

  $("#jobForm").validate({
    rules: {
      name: "required",
      surname: "required",
      email: {
        required: true,
        email: true,
      },
      phone: {
        required: true,
        minlength: 14,
      },
      position: "required",
    },
    messages: {
      name: "Please enter your first name",
      surname: "Please enter your last name",
      email: "Please enter a valid email",
      phone: "Phone format: (555) 555-5555",
      position: "Please enter the position",
    },
    errorPlacement: function (error, element) {
      error.appendTo(element.closest(".input-group").find(".error-message"));
    },
    submitHandler: function (form) {
      $("#success-message")
        .fadeIn(400)
        .delay(3000)
        .fadeOut(400, function () {
          $("#applyBtn")
            .show()
            .animate({ opacity: 1, width: "200px", padding: "15px 30px" }, 500);
        });
      form.reset();
    },
  });
});