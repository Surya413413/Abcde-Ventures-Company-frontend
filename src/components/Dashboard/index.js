import { Component } from "react";
import Cookies from "js-cookie";
import { Navigate, Link } from "react-router-dom";
import "./index.css";

class Dashboard extends Component {
  state = { profile: {}, redirect: false };

  componentDidMount() {
    this.getProfile();
  }

  getProfile = async () => {
    const jwtToken = Cookies.get("jwtToken");
    if (!jwtToken) {
      this.setState({ redirect: true });
      return;
    }

    const url = "http://localhost:3000/users/profile";
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error("Failed to fetch profile");
      }
      const data = await response.json();
      this.setState({ profile: data });
    } catch (error) {
      console.error("Error fetching profile:", error);
      this.setState({ redirect: true });
    }
  };

  handleLogout = () => {
    Cookies.remove("jwtToken");
    this.setState({ redirect: true });
  };

  render() {
    const { profile, redirect } = this.state;

    if (redirect) {
      return <Navigate to="/login" replace />;
    }

    return (
      <div className="dashboard-container">
        <header className="dashboard-header">
          <h1>Welcome, {profile.name}</h1>
          <button className="logout-btn" onClick={this.handleLogout}>
            Logout
          </button>
        </header>

        <main className="dashboard-content">
          <div className="profile-card">
            <h2>Profile Details</h2>
            <p>
              <strong>Name:</strong> {profile.name}
            </p>
            <p>
              <strong>Email:</strong> {profile.email}
            </p>
          </div>

          <div className="links-card">
            <h2>Quick Links</h2>
            <ul>
              <li>
                <Link to="/tasks">My Tasks</Link>
              </li>
              <li>
                <Link to="/settings">Settings</Link>
              </li>
              <li>
                <Link to="/help">Help Center</Link>
              </li>
            </ul>
          </div>
        </main>
      </div>
    );
  }
}

export default Dashboard;
