<div class="data-form">
  <form method="POST" action="<%=`/jobs/${job._id}/update?_method=PUT`%>">
    <h2>Edit job:</h2>
    <label for="inputTitle">Title</label>
    <input
      type="text"
      name="title"
      id="inputTitle"
      value="<%= job.title %>"
      placeholder="Title"
      autofocus
      required
    />
    <label for="inputCompany">Company</label>
    <input
      type="text"
      name="company"
      id="inputCompany"
      value="<%= job.company %>"
      placeholder="Company"
      required
    />
    <label for="inputLocation">Location</label>
    <input
      type="text"
      name="location"
      id="inputLocation"
      value="<%= job.location %>"
      placeholder="Location"
      required
    />
    <label for="inputDescription">Description</label>
    <input
      type="text"
      name="description"
      id="inputDescription"
      value="<%= job.description %>"
      placeholder="Description"
      required
    />
    <label for="inputRequirements">Requirements</label>
    <input
      type="text"
      name="requirements"
      id="inputRequirements"
      value="<%= job.requirements %>"
      placeholder="Requirements"
      required
    />
    <label for="inputSalary">Salary</label>
    <input
      type="Number"
      name="salary"
      id="inputSalary"
      value="<%= job.salary %>"
      placeholder="Salary"
      required
    />
    <label for="inputContactEmail">Contact Email</label>
    <input
      type="email"
      name="contactEmail"
      id="inputContactEmail"
      value="<%= job.contactEmail %>"
      placeholder="Contact Email"
      required
    />
    <label for="inputContactPhone">Contact Phone</label>
    <input
      type="text"
      name="contactPhone"
      id="inputContactPhone"
      value="<%= job.contactPhone %>"
      placeholder="Contact Phone"
      required
    />
    <label for="inputPostDate">Post Date</label>
    <input
      type="Date"
      name="postDate"
      id="inputPostDate"
      value="<%= job.postDate %>"
      placeholder="Post Date"
      required
    />
    <label for="inputDeadlineDate">Deadline Date</label>
    <input
      type="Date"
      name="deadlineDate"
      id="inputDeadlineDate"
      value="<%= job.deadlineDate %>"
      placeholder="Deadline Date"
      required
    />
    <label for="inputIsActive">Is Active</label>
    <input
      type="Boolean"
      name="isActive"
      id="inputIsActive"
      value="<%= job.isActive %>"
      placeholder="True"
      required
    />
    <button type="submit">Update</button>
  </form>
</div>;
