$(document).ready(() => {
    $("#modal-button").click(() => {
        $(".modal-body").html('');
        $.get("/events?format=json", (data) => {
            data.forEach((event) => {
                $(".modal-body").append(
                    `<div>
                    <span class="event-title">
                    ${event.title}
                    </span>
                    <div class="event-description">
                    ${event.description}
                    </div>
                    </div>`
                )
            });
        });
    });
};