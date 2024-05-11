# Rojgar Sabailai

Rojgar Sabailai is a freelancing platform designed to connect unskilled and semi-skilled workers with job opportunities. The platform is built using Node.js, HTML, CSS, JavaScript, Bootstrap, and EJS.

## Features

- **User Authentication**: Users can sign up, log in, and log out securely.
- **Role-based Authorization**: Different roles such as admin, employer, and employee have different levels of access to the platform.
- **Job Posting**: Employers can post job opportunities, and employees can browse and apply for jobs.
- **Job Posting: Employers can post job opportunities, including job title, description, location, and application deadline.
- **View Posted Jobs: Employers can view a list of jobs they have posted, along with details such as the number of applicants.
- **Job Applications: Job seekers can browse job listings and apply for jobs by submitting their application details.
- **View Job Applications: Employers can view a list of job applications received for their posted jobs, including applicant details and application status.
- **Responsive Design: The platform is responsive and works well on various devices, including desktops, tablets, and smartphones.
- **Profile Management**: Users can update their profiles, including personal information.
- **Responsive Design**: The platform is responsive and works well on various devices, including desktops, tablets, and smartphones.
- **This project is currently under active development, and more features are planned for future releases.

## Technologies Used

- **Backend**: Node.js, Express.js, MongoDB
- **Frontend**: HTML, CSS, JavaScript, Bootstrap, EJS
- **Database**: MongoDB
- **Session Management**: Express Session, Connect MongoDB Session
- **Authentication**: bcrypt
- **Deployment**: Azure

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/rojgarsabailai/api-v1.git
   ```

2. Install dependencies:

   ```bash
   cd rojgar-sabailai
   npm install
   ```

3. Set up environment variables:

   Create a `.env` file in the root directory and define the following variables:

   ```plaintext
      PORT=
      MAILAPIKEY=
      MAILDOMAIN=
      MONGO_URI=
      MAILPUBLICKEY=
      MAILGUNUSER=
      MAILGUNPASSWORD=
      TESTMAILAPI=
      TESTEMAIL=
      SESSIONKEY=
      etheralUSER=
      etheralPassword=
   ```

4. Start the server:

   ```bash
   npm start
   ```

## Usage

1. Open your web browser and navigate to `http://localhost:5500`.
2. Sign up for a new account or log in if you already have one.
3. Explore the platform, post jobs, apply for jobs, and manage your profile.

## Contributors

- [Naitik Kumar Rauniyar](https://github.com/naitik0009)
- [Abishek Neupane](https://github.com/virtualabishek)

## License

This project is licensed under the [MIT License](LICENSE).
```

Feel free to customize it further to better fit your project's specific features and requirements.
