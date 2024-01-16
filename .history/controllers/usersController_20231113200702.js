const User = require("../models/user");

const getUserParams = (body) => {
  return {
    name: body.name,
    email: body.email,
    password: body.password,
    role: body.role,
    graduationYear: body.graduationsYear,
    major: body.major,
    job: body.job,
    company: body.company,
    city: body.city,
    state: body.state,
    country: body.country,
    zipCode: body.zipCode,
    bio: body.bio,
    interests: body.interests,
  };
};
