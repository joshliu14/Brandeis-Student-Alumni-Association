<div class="data-form">
  <form method="POST" action="<%=`/users/${user._id}/update?_method=PUT`%>">
    <h2>Edit user:</h2>
    <label for="inputName">Name</label>
    <input
      type="text"
      name="name"
      id="inputName"
      value="<%= user.name %>"
      placeholder="Name"
      autofocus
    />
    <label for="inputEmail">Email Address</label>
    <input
      type="email"
      name="email"
      id="inputEmail"
      value="<%= user.email %>"
      placeholder="Email address"
      required
    />
    <label for="inputPassword">Password</label>
    <input
      type="password"
      name="password"
      id="inputPassword"
      value="<%= user.password %>"
      placeholder="Password"
      required
    />
    <label for="inputRole">Role</label>
    <input
      type="text"
      name="role"
      id="inputRole"
      value="<%= user.role %>"
      placeholder="Role"
      required
    />
    <label for="inputGraduationYear">Graduation Year</label>
    <input
      type="Number"
      name="graduationYear"
      id="inputGraduationYear"
      value="<%= user.graduationYear %>"
      placeholder="Graduation Year"
      required
    />
    <label for="inputMajor">Major</label>
    <input
      type="text"
      name="major"
      id="inputMajor"
      value="<%= user.major %>"
      placeholder="Major"
      required
    />
    <label for="inputJob">Job</label>
    <input
      type="text"
      name="job"
      id="inputJob"
      value="<%= user.job %>"
      placeholder="Job"
      required
    />
    <label for="inputCompany">Company</label>
    <input
      type="text"
      name="company"
      id="inputCompany"
      value="<%= user.company %>"
      placeholder="Company"
      required
    />
    <label for="inputCity">City</label>
    <input
      type="text"
      name="city"
      id="inputCity"
      value="<%= user.city %>"
      placeholder="City"
      required
    />
    <label for="inputState">State</label>
    <input
      type="text"
      name="state"
      id="inputState"
      value="<%= user.state %>"
      placeholder="State"
      required
    />
    <label for="inputCountry">Country</label>
    <input
      type="text"
      name="country"
      id="inputCountry"
      value="<%= user.country %>"
      placeholder="Country"
      required
    />
    <label for="inputZipCode">Zip Code</label>
    <input
      type="text"
      name="zipCode"
      id="inputZipCode"
      pattern="\d*"
      value="<%= user.zipCode %>"
      placeholder="Zip Code"
      required
    />
    <label for="inputBio">Bio</label>
    <input
      type="text"
      name="bio"
      id="inputBio"
      value="<%= user.bio %>"
      placeholder="Bio"
      required
    />
    <label for="inputInterests">Interests</label>
    <input
      type="text"
      name="interests"
      id="inputInterests"
      value="<%= user.interests %>"
      placeholder="Interests"
      required
    />
    <button type="submit">Update</button>
  </form>
</div>;
