import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AlumniNavbar from "../components/AlumniNavbar";
import "./StudentProfileView.css";

const StudentProfileView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadMockStudentData(id);
    }
  }, [id]);

  const generateMockStudentData = (studentId) => {
    const firstNames = ["Sakshi", "Sanika", "Rahul", "Sneha", "Vikram", "Anjali", "Karan", "Neha"];
    const lastNames = ["Bhosale", "Patil", "Kumar", "Singh", "Verma", "Reddy", "Joshi", "Malhotra"];
    const branches = ["Computer Science", "Mechanical", "Electrical", "Civil", "IT", "Electronics", "Chemical"];
    const companies = ["Google", "Microsoft", "Amazon", "Infosys", "TCS", "Wipro", "Meta", "Apple"];
    const positions = ["Software Engineer", "Data Scientist", "Product Manager", "DevOps Engineer", "Frontend Developer", "Backend Developer"];

    const firstName = firstNames[studentId % firstNames.length];
    const lastName = lastNames[studentId % lastNames.length];
    const branch = branches[studentId % branches.length];
    const company = companies[studentId % companies.length];
    const position = positions[studentId % positions.length];

    return {
      id: studentId,
      firstName: firstName,
      lastName: lastName,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${studentId}@walchand.edu`,
      phone: `+91 9${Math.floor(10000000 + Math.random() * 90000000)}`,
      graduationYear: `${2020 + (studentId % 5)}`,
      degree: "B.Tech",
      branch: branch,
      currentCompany: company,
      position: position,
      about: `Passionate ${branch} graduate from Walchand College of Engineering. Currently working as a ${position} at ${company}. Strong problem-solving skills and eager to learn new technologies. Interested in AI, machine learning, and software development.`,
      profilePhoto: null
    };
  };

  const loadMockStudentData = (studentId) => {
    try {
      setLoading(true);

      setTimeout(() => {
        const mockData = generateMockStudentData(studentId);
        setStudent(mockData);
        setLoading(false);
      }, 800);

    } catch (err) {
      console.error('Error loading student data:', err);
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="student-profile-view-container">
        <AlumniNavbar />
        <div className="student-profile-view-content">
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <p>Loading student profile...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="student-profile-view-container">
        <AlumniNavbar />
        <div className="student-profile-view-content">
          <div className="not-found-state">
            <svg className="not-found-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h2>Student Not Found</h2>
            <p>The student profile you're looking for doesn't exist.</p>
            <button onClick={handleBack} className="back-btn">Go Back</button>
          </div>
        </div>
      </div>
    );
  }

  const initials = `${student?.firstName?.charAt(0) || ""}${student?.lastName?.charAt(0) || ""}`.toUpperCase() || "S";

  return (
    <div className="student-profile-view-container">
      <AlumniNavbar />

      <div className="student-profile-view-content">
        <div className="profile-view-header">
          <button className="back-button" onClick={handleBack}>
            <svg className="back-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Connections
          </button>
        </div>

        <div className="student-profile-view-card">
          <div className="profile-view-avatar-section">
            <div className="profile-view-avatar">
              {student.profilePhoto ? (
                <img src={student.profilePhoto} alt={`${student.firstName} ${student.lastName}`} />
              ) : (
                <div className="avatar-placeholder">{initials}</div>
              )}
            </div>
            <div className="profile-view-basic-info">
              <h1 className="profile-view-name">
                {student.firstName} {student.lastName}
              </h1>
              <p className="profile-view-email">{student.email}</p>
              {student.graduationYear && (
                <p className="profile-view-batch">Batch of {student.graduationYear}</p>
              )}
              <p style={{
                fontSize: '0.8rem',
                opacity: 0.8,
                marginTop: '0.5rem',
                background: 'rgba(255,255,255,0.2)',
                padding: '0.3rem 0.8rem',
                borderRadius: '20px',
                display: 'inline-block'
              }}>
                Demo Profile Data
              </p>
            </div>
          </div>

          <div className="profile-view-details">
            <div className="details-grid">
              <div className="details-section">
                <h3 className="section-title">
                  <svg className="section-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Personal Information
                </h3>
                <div className="detail-item">
                  <span className="detail-label">First Name</span>
                  <span className="detail-value">{student.firstName}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Last Name</span>
                  <span className="detail-value">{student.lastName}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Email</span>
                  <span className="detail-value">{student.email}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Phone</span>
                  <span className="detail-value">{student.phone || "Not provided"}</span>
                </div>
              </div>

              <div className="details-section">
                <h3 className="section-title">
                  <svg className="section-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                  </svg>
                  Academic Information
                </h3>
                <div className="detail-item">
                  <span className="detail-label">Graduation Year</span>
                  <span className="detail-value">{student.graduationYear || "Not specified"}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Degree</span>
                  <span className="detail-value">{student.degree || "Not specified"}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Branch</span>
                  <span className="detail-value">{student.branch || "Not specified"}</span>
                </div>
              </div>

              <div className="details-section">
                <h3 className="section-title">
                  <svg className="section-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Professional Information
                </h3>
                <div className="detail-item">
                  <span className="detail-label">Current Company</span>
                  <span className="detail-value">{student.currentCompany || "Not specified"}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Position</span>
                  <span className="detail-value">{student.position || "Not specified"}</span>
                </div>
              </div>
            </div>

            {student.about && (
              <div className="details-section full-width">
                <h3 className="section-title">
                  <svg className="section-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  About
                </h3>
                <div className="about-content">
                  <p>{student.about}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfileView;