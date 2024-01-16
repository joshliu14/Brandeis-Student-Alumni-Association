<div class="data-form">
  <form method="POST" action="<%=`/jobs/${job._id}/update?_method=PUT`%>">
    <h2>Edit job:</h2>
  description: { type: String, required: true },
  requirements: { type: String, required: true },
  salary: { type: Number, required: true },
  contactEmail: { type: String, required: true },
  contactPhone: { type: String, required: true },
  postDate: { type: Date, default: Date.now },
  deadlineDate: { type: Date, required: true },
  isActive: { type: Boolean, default: true },
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
    <label for="inputGraduationYear">Graduation Year</label>
    <input
      type="Number"
      name="graduationYear"
      id="inputGraduationYear"
      value="<%= job.graduationYear %>"
      placeholder="Graduation Year"
      required
    />
    <label for="inputMajor">Major</label>
    <input
      type="text"
      name="major"
      id="inputMajor"
      value="<%= job.major %>"
      placeholder="Major"
      required
    />
    <label for="inputJob">Job</label>
    <input
      type="text"
      name="job"
      id="inputJob"
      value="<%= job.job %>"
      placeholder="Job"
      required
    />
    <label for="inputCity">City</label>
    <input
      type="text"
      name="city"
      id="inputCity"
      value="<%= job.city %>"
      placeholder="City"
      required
    />
    <label for="inputState">State</label>
    <input
      type="text"
      name="state"
      id="inputState"
      value="<%= job.state %>"
      placeholder="State"
      required
    />
    <label for="inputCountry">Country</label>
    <input
      type="text"
      name="country"
      id="inputCountry"
      value="<%= job.country %>"
      placeholder="Country"
      required
    />
    <label for="inputZipCode">Zip Code</label>
    <input
      type="text"
      name="zipCode"
      id="inputZipCode"
      pattern="\d*"
      value="<%= job.zipCode %>"
      placeholder="Zip Code"
      required
    />
    <label for="inputBio">Bio</label>
    <input
      type="text"
      name="bio"
      id="inputBio"
      value="<%= job.bio %>"
      placeholder="Bio"
      required
    />
    <label for="inputInterests">Interests</label>
    <input
      type="text"
      name="interests"
      id="inputInterests"
      value="<%= job.interests %>"
      placeholder="Interests"
      required
    />
    <button type="submit">Update</button>
  </form>
</div>;
