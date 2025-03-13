# Accident Data Analysis Dashboard

## Introduction

The **Accident Data Analysis Dashboard** is an interactive web application designed for traffic analysts to visualize and analyze accident data in Germany. It's got an easy-to-use interface for filtering and exploring accident statistics, identifying high-risk areas, and deriving insights for traffic safety improvements.

## Technologies Used

- **Frontend:** HTML, CSS, JavaScript  
- **Backend:** PHP, SQL (MySQL)  
- **Libraries & Tools:**  
  - [Leaflet.js](https://leafletjs.com/) for interactive map rendering  
  - [Chart.js](https://www.chartjs.org/) for data visualization  
  - AJAX for dynamic data fetching  
- **Data sources:** Accident data from [Unfallatlas](https://unfallatlas.statistikportal.de)  

## Team
Developed by Matey Radkov (Contact: matey20043@gmail.com)

## Features

- **Interactive Map with Accident Data**
  - Displays accident locations using Leaflet.js
  - Clustered accident markers for better visualization
  - Ability to search and zoom in on specific cities

- **Data Filtering & Custom Queries**
  - Filter accidents based on severity, type, and involved parties
  - Search accidents by year, month, and day
  - Apply traffic conditions like road surface status

- **Dynamic Data Visualization**
  - Accident statistics displayed in bar charts using Chart.js
  - Real-time data retrieval from a MySQL database
  - Clickable markers to show detailed accident metadata

- **User-Friendly Web Interface**
  - Simple and intuitive layout with filtering options
  - No user authentication required for access

  ## Non-Deliverables

1. **Real-time live accident tracking:** The system relies on static datasets and does not provide live accident monitoring.  
2. **Mobile Application:** This project is designed as a web-based application only.  
3. **On-Premise Installation Services:** Users are responsible for setting up and hosting the dashboard on their infrastructure.  

## Constraints

- The application uses only accident data from a fixed period from the **Unfallatlas** database.  
- Requires a MySQL database and a web server to function properly.  

### Prerequisites

- A web server with PHP support (e.g., XAMPP, Apache)
- MySQL database setup